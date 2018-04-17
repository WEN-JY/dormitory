<template>
<div >
<myheader ></myheader>
<el-form :inline="true"  class="demo-form-inline">
   <el-form-item label="起始时间">
 <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  v-model="startTime" style="width: 100%;"></el-date-picker>
  </el-form-item>
<el-form-item label="终止时间" >
 <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  v-model="endTime" style="width: 100%;"></el-date-picker>
  </el-form-item>
<el-form-item>
   <el-button  @click="searchInfoAll()" type="info" round>查找全部</el-button>
</el-form-item>
  <el-form-item label="按姓名查找">
    <el-input v-model="searchName" placeholder="请输入姓名"></el-input>
  </el-form-item>
    <el-form-item label="按工号查找">
    <el-input v-model="searchWorkNum" placeholder="请输入工号"></el-input>
  </el-form-item >
 
  <el-form-item>
    <el-button type="primary" @click="searchInfo()">表内查询</el-button>
    <el-button type="success" @click="outputExcel()"><i class="el-icon-download"></i>导出xlsx</el-button>
  </el-form-item>
</el-form>
    <el-table
      :data="tableData"
       :row-class-name="tableRowClassName"
       stripe
       border
       v-loading="loading2"
        element-loading-text="玩命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
       height="720"
      >
      <el-table-column
        prop="changeType"
        align='center'
        label="变动类别">
      </el-table-column>
      <el-table-column
        prop="changeTime"
         align='center' 
         sortable   
        label="变更时间">
      </el-table-column>
      <el-table-column
        prop="department"
        align='center'
        label="部门">
      </el-table-column>
      <el-table-column
        prop="name"
        align='center'                
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="worknum"
         align='center'    
        label="工号">
      </el-table-column>
      <el-table-column
        prop="sex"
         align='center'    
        label="性别">
      </el-table-column>
       <el-table-column
        prop="dormitory"
         align='center' 
         sortable   
        label="宿舍">
      </el-table-column>
      <el-table-column
        prop="dormitory_type"
         align='center'    
        label="宿舍性质">
      </el-table-column>
      <el-table-column
        prop="room"
         align='center'    
        label="房型">
      </el-table-column>
      <el-table-column
        prop="room_num"
         align='center'    
        label="房间号"
        sortable
         width="220">
      </el-table-column>
      <el-table-column
        prop="room_fee"
         align='center'    
        label="房租">
      </el-table-column>
      <el-table-column
        prop="check_inTime"
         align='center'    
        label="入住时间">
      </el-table-column>
      <el-table-column
        prop="check_outTime"
         align='center'    
        label="退宿时间">
      </el-table-column>
      <el-table-column
        prop="birth_place"
         align='center'    
        label="户籍所在地">
      </el-table-column>
      <el-table-column
        prop="note"
         align='center'    
        label="备注">
        
      </el-table-column>
      
       <el-table-column  align='center' label="操作"  width="180">
      <template slot-scope="scope">
        <el-button  v-show="getAuth(scope.row.department)"
          size="mini"
          type="primary"
          @click="handleedit(scope.$index, scope.row)">修改</el-button>
        <el-button  v-show="getAuth(scope.row.department)"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
<pagination :total="totalTableRow"></pagination>
 <dialog_edit :formVisibal="isEdit" :personinfo="currentPerson" @info-submit="infoSubmit" @edit-change="editChange" @info-change="infoChange"></dialog_edit>
<div v-show="ashow">出于技术原因，暂将下载链接置于此处，点击“导出excel”后请点击<a :href="excelpath">此链接</a>下载文件。</div>

</div>
</template>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -60px;
}
.nameBtn{
    position: fixed;
    right: 30px;
    top: 10px;
}
.el-form{
  margin-top:10px
}

.el-table .warning-row {
  background: red;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-form--inline .el-form-item__label {
    float: none;
    display: inline-block;
    color: white;
}
</style>
<script>
import router from '../router'
import myheader from './myheader'
import  bus  from './bus'//这里的import是重点
import noticer from './notice'
import pagination from './pagination'
import dialog_edit from './dialog_edit'
  export default {
     data() {
        return {
          loading2:true,
          ashow:false,
          sessionID:'',
          table_select:'all',
          totalData:[],//总的加载数据
          tableData: [],//分页展示后当前页面的数据
          tablePageSize:100,
          totalTableRow:0,
          pages:'',
          currentPage:1,
          lastPage:'',
          nextPage:'',
          searchName:'',
          searchWorkNum:'',
          isEdit:false,
          currentPerson:{},
          currentPersonIndex:'',
          excelpath:'',
          startTime:'',
          endTime:''
        }
      },
    methods: {
      infoSubmit(obj){
        if(obj.name&&obj.sex){

        }else{
           this.$notify({
                          title: '提示',
                          message: '请输入姓名和性别',
                          duration: 0,
                          type:'warning',
                          offset: 100
                        });
          return false;
        }
          this.$http.post('/updateInfo',{
                      //Content_Type:'Authorization',
                      info:obj,
                      sessionID:this.sessionID,
                      department:this.department
                   }).then((res)=> {
                     if(res.data.updateState=='success'){
                       this.$notify({
                          title: '提示',
                          message: '更新成功',
                          duration: 0,
                          type:'success',
                          offset: 100
                        });
                     }
                     console.log(res)
                   })
      },
      infoChange(obj){//子组件修改信息事件
          this.tableData[this.currentPersonIndex]=obj;
          //修改完界面之后提交至服务器
         
      },
      editChange(val){//监听子组件状态变化
        //  console.log(val)
          this.isEdit=val
      },

      handleDelete(index,row){
        this.$http.post('/changeEdit',{
                      //Content_Type:'Authorization',        
                      index:row._id,
                      apiname:'delete',
                      department:this.department,
                      sessionID:this.sessionID
                   }).then((res)=> {
                       console.info(res.data)
                       if(res.data.state=='success'){
                         this.$notify({//数据接收成功通知
                        title: '成功',
                          message: '删除记录',
                          type: 'success'
                        });
                        this.tableData.splice(index,1)
                       }else{
                          this.$notify({//数据接收成功通知
                        title: '失败',
                          message: '删除失败，请稍后再试',
                          type: 'danger'
                        });
                       }
                    //未写完
                   })
      },
      getAuth(cc){
          if(this.department=='办公室'||this.department=='行政办公室'||this.department=="管理员"||this.department==cc){
            return true;
          }else{
              return false;
           
          }
      },
      searchInfoAll(){
        this.$http.post('/getchange',{
                      //Content_Type:'Authorization',
                      field:'start_end',
                      start:this.startTime,
                      end:this.endTime,
                      sessionID:this.sessionID,
                      department:this.department
                   }).then((res)=> {
                      this.totalData=res.data;
                      if(!!res.data.checkLogin){
                        this.loading2=false;
                        this.$alert('尚未登陆', '出错啦', {
                              confirmButtonText: '确定',
                              callback: () => {
                                this.$message({
                                  type: 'info',
                                  message: '请返回首页登陆后再使用',
                                });
                              }
                            });
                             return;
                          }
                       
                      
                      //下面将按照默认30条内容一页进行分页
                      this.totalTableRow=this.totalData.length;
                      this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)
                      this.pages=Math.round(this.totalTableRow/this.tablePageSize)
                      console.log('这里将提示消息')
                      this.loading2=false;
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
      },
      tableRowClassName({row, rowIndex}) {
        if (row.note== '由于种种原因，申请失败。') {
          return 'warning-row';
        } else {
          return 'success-row';
        }
        return '';
      },
      outputExcel(){
          this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',        
                      excelData:JSON.stringify(this.tableData),
                      department:this.department,
                      sessionID:this.sessionID
                   }).then((res)=> {
                       console.log(res.data.file)
                       //正常情况下返回值是excel文件的下载路径
                      
                       this.excelpath="/download/"+res.data.file;
                       window.open(this.excelpath)
                   })
        },

      handleedit(index, row) {
        this.isEdit=true;
        this.currentPerson=row;
        this.currentPersonIndex=index;
        //console.log(index, row);
      },
   
      searchInfo(){//表内查找对应数据
        if(this.searchName==''&&this.searchWorkNum==''){//如果无输入查找信息（姓名或者工号），则return
          return;
        }
        var keyword='';
        var target=''
        if(!!this.searchName){//如果输入的是姓名
          keyword='name';//选取数据对象的name属性
          target=this.searchName;//输入的职工姓名
        }else{//如果输入的是工号
          keyword='worknum';//选取数据对象的worknumshuxing
          target=this.searchWorkNum;//target是输入的工号
        }
        var reArr=new Array();
        for(var i=0;i<this.totalData.length;i++){//循环查找原始数据（totalData）
          //console.log(this.totalData[i][keyword])
          if(this.totalData[i][keyword]==target)//如果找到了查找的对象
          {
            reArr.push(this.totalData[i]); //赋值给表格列表数据
           // break;//这里不用break跳出循环
          }//没找到不做处理，继续查找
        }
        this.tableData=reArr;
         if(this.tableData.length==0){ //如果没查找到相关信息，此时的tableData长度为0，否则没有找到相关信息
            this.$notify({
            title: '提示',
            message: '暂无相关信息',
            duration: 0,
            type:'warning',
            offset: 100
             });
         }else{//如果没找到，弹出一条消息，提示无相关信息
            
         }
      }
     
    },
    components:{
        myheader:myheader,
        pagination:pagination,
       dialog_edit:dialog_edit
    },
    mounted(){
      //先将会话id保存
            this.sessionID=this.$route.params.sessionID;
            this.department=this.$route.params.department;
            console.log(this.$route.params)
            //console.log(this.$route.params.username)
      
           bus.$emit('noticer',{n_type:'',n_content:'正在加载数据'})
            this.$http.post('/getchange',{
                      //Content_Type:'Authorization',
                     department:this.department,
                      field:'all_change',
                      sessionID:this.sessionID
                   }).then((res)=> {
                      this.totalData=res.data;
                      if(!!res.data.checkLogin){
                        this.loading2=false;
                        this.$alert('尚未登陆', '出错啦', {
                              confirmButtonText: '确定',
                              callback: () => {
                                this.$message({
                                  type: 'info',
                                  message: '请返回首页登陆后再使用',
                                });
                              }
                            });
                             return;
                          }
                       
                      
                      //下面将按照默认30条内容一页进行分页
                      this.totalTableRow=this.totalData.length;
                      this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)
                      this.pages=Math.round(this.totalTableRow/this.tablePageSize)
                      console.log('这里将提示消息')
                      this.loading2=false;
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
     
        bus.$on('tablePageSize',(val)=>{
          console.log(val)
          this.tablePageSize=val;
          this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)

        })
         bus.$on('changePage',(val)=>{
         // console.log(this.totalData)
          this.currentPage=val;
          this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)

        })
        bus.$on('loadInfoChange' ,(val)=>{
          this.loading2=true;
          console.log("mgs--来自bus.infochanges")
            //bus.$emit('noticer',{n_type:'',n_content:'正在加载数据'})
            this.$http.post('/getchange',{
                      //Content_Type:'Authorization',
                     department:this.department,
                      field:'all_change',
                      sessionID:this.sessionID
                   }).then((res)=> {
                      this.totalData=res.data;
                      if(!!res.data.checkLogin){
                        this.loading2=false;
                        this.$alert('尚未登陆', '出错啦', {
                              confirmButtonText: '确定',
                              callback: () => {
                                this.$message({
                                  type: 'info',
                                  message: '请返回首页登陆后再使用',
                                });
                              }
                            });
                             return;
                          }
                       
                      
                      //下面将按照默认30条内容一页进行分页
                      this.totalTableRow=this.totalData.length;
                      this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)
                      this.pages=Math.round(this.totalTableRow/this.tablePageSize)
                      console.log('这里将提示消息')
                      this.loading2=false;
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
        })
    },
    filters:{
      getDate(val){
        return new Date(parseInt(data[i].changeTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    },
     beforeDestroy () {
       console.log('组件infochanges已销毁')
      bus.$off('loadInfo');
      bus.$off('tablePageSize');
      bus.$off('changePage');
      bus.$off('loadInfoChange')
       //bus.$off('loadInfo', ()=>{})
      },

      
  }
</script>