<template>
<div >
<myheader ></myheader>
<el-row >
  <el-col :span="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
  <el-col :span="16">
<el-form ref="form" label-width="80px">
  <el-tabs v-model="activeName" @tab-click="handleClick" type="card" tabPosition="left">
    <el-tab-pane>
    <span slot="label"><i class="el-icon-tickets"></i> 住宿申请</span>
    <checkin :sessionID="sessionID" :department="department"></checkin>
  </el-tab-pane>
    <el-tab-pane >
      <span slot="label"><i class="el-icon-edit"></i>退宿申请</span>
      <checkout :sessionID="sessionID" :department="department"></checkout>
    </el-tab-pane>
    <el-tab-pane  >
    <span slot="label" @click="loadapps"><el-badge value="new" class="item"><i class="el-icon-edit-outline"></i>申请审批</el-badge></span>
    <checkexam :sessionIDs="sessionID" :user="user"></checkexam>
    </el-tab-pane>
  </el-tabs>
 
  <el-form-item>
    <!-- <el-button type="primary" @click="searchInfo()">查询</el-button>
    <el-button type="success" @click="outputExcel()"><i class="el-icon-download"></i>导出xlsx</el-button> -->
  </el-form-item>
</el-form>

  </el-col>
  <el-col :span="4">
    
  </el-col>
</el-row>

</div>
</template>
<style scoped>
.el-tabs--left, .el-tabs--right {
    overflow: hidden;
    background: white;
    border-radius: 5px;
    padding: 20px;
}
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
</style>
<script>
import router from '../router'
import myheader from './myheader'
import  bus  from './bus'//这里的import是重点
import checkin from "./checkin"
import checkout from "./checkout"
import checkexam from './checkexam'
  export default {
     data() {
        return {
          labelPosition: 'LEFT',
            activeName: 'second',
            sessionID:'',
            user:'',
            department:''
        }
      },
    methods: {
      loadapps(){
        console.log('loading')
        if(this.department=='办公室'||this.department=='行政办公室'||this.department=="管理员"){
          bus.$emit('loadapps',{sessionID:this.sessionID,department:this.department})
        }else{
           this.$notify({
            title: '提示',
            message: '无权限进行此操作',
            duration: 0,
            type:'warning',
            offset: 100
             });
        }
        
      },
       handleClick(tab, event) {
        console.log(tab, event);
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
        if(this.searchName==''&&this.searchWoekNum==''){//如果无输入查找信息（姓名或者工号），则return
          return;
        }
        var keyword='';
        var target=''
        if(!!this.searchName){//如果输入的是姓名
          keyword='name';//选取数据对象的name属性
          target=this.searchName;//输入的职工姓名
        }else{//如果输入的是工号
          keyword='worknum';//选取数据对象的worknumshuxing
          target=this.searchWoekNum;//target是输入的工号
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
       checkin:checkin,
        checkout:checkout,
        checkexam:checkexam
    },
    mounted(){
      //先将会话id保存
             this.user=this.$route.params.user
            this.sessionID=this.$route.params.sessionID
            this.department=this.$route.params.department
            console.log(this.$route.params)
            //console.log(this.$route.params.username)
      
        // bus.$on('tablePageSize',(val)=>{
        //   console.log(val)
        //   this.tablePageSize=val;
        //   this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)

        // })
        //  bus.$on('changePage',(val)=>{
        //  // console.log(this.totalData)
        //   this.currentPage=val;
        //   this.tableData=this.totalData.slice((this.currentPage-1)*this.tablePageSize,this.currentPage*this.tablePageSize)

        // })
       
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
    
       //bus.$off('loadInfo', ()=>{})
      }
      
  }
</script>