<template>
<div >
<myheader ></myheader>
<el-form :inline="true"  class="demo-form-inline">
  <el-form-item label="按姓名查找">
    <el-input v-model="searchName" placeholder="请输入姓名"></el-input>
  </el-form-item>
    <el-form-item label="按工号查找">
    <el-input v-model="searchWorkNum" placeholder="请输入工号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="searchInfo()">查询</el-button>
    <el-button type="success"  @click="outputExcel()"><i class="el-icon-download"></i>导出xlsx</el-button>
  </el-form-item>
</el-form>
    <el-table
      :data="tableData"
       stripe
       border
       v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
       height="720"
      >

      
         <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="department"
        align='center'
        label="部门"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        align='center'                
        label="姓名"
        >
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
       <el-table-column  align='center' label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          loading2: false,
          department:'',
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
        }
      },
    methods: {
       outputExcel(){
          this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',        
                      excelData:JSON.stringify(this.tableData),
                      sessionID:this.sessionID,department:this.department
                   }).then((res)=> {
                       console.log(res.data.file)
                       //正常情况下返回值是excel文件的下载路径
                      
                       this.excelpath="http://localhost:3000/download/"+res.data.file;
                       window.open(this.excelpath)
                   })
        },
      infoSubmit(obj){
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.isEdit=true;
        this.currentPerson=row;
        this.currentPersonIndex=index;
        //console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
        for(var i=0;i<this.totalData.length;i++){//循环查找原始数据（totalData）
          //console.log(this.totalData[i][keyword])
          if(this.totalData[i][keyword]==target)//如果找到了查找的对象
          {
            this.tableData=[this.totalData[i]]; //赋值给表格列表数据
            break;//这里用break跳出循环
          }//没找到不做处理，继续查找
        }
        console.log(this.tableData);
         if(this.tableData.length==1){ //如果查找到相关信息，此时的tableData长度为1，否则没有找到相关信息
        
         }else{//如果没找到，弹出一条消息，提示无相关信息
            this.tableData=[];
            this.$notify({
            title: '提示',
            message: '暂无相关信息',
            duration: 0,
            type:'warning',
            offset: 100
          });
         }
      },
      loadInfo(data){
           this.loading2=true;
           this.table_select=data;
          console.log('发起getInfo请求')
           this.$message({
                message: '正在加载数据',
                type:'warning'
                });
          // bus.$emit('noticer',{n_type:'',n_content:'正在加载数据'})
            console.log(this.sessionID)
            this.$http.post('/getInfo',{
                      //Content_Type:'Authorization',
                     department:this.department,
                      field:this.table_select,
                      sessionID:this.sessionID
                   }).then((res)=> {
                      this.totalData=res.data;
                      this.loading2=false;
                      if(!!res.data.checkLogin){
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
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
      }
     
    },
    components:{
        myheader:myheader,
        pagination:pagination,
        dialog_edit:dialog_edit
    },
    mounted(){
      this.sessionID=this.$route.params.sessionID;
      this.department=this.$route.params.department;
            console.log(this.$route.params)
      //先将会话id保存
         this.loadInfo(this.department)
            
            //console.log(this.$route.params.username)
        bus.$on('loadInfo',(data)=>{
          this.loadInfo(data)
          console.log(data+'出发load事件')
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
    },
     beforeDestroy () {
       console.log('组件indexpage已销毁')
      bus.$off('loadInfo');
      bus.$off('tablePageSize');
      bus.$off('changePage');
       //bus.$off('loadInfo', ()=>{})
      }
      
  }
</script>