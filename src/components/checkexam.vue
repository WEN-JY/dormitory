<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
     height="780"
    >
    <el-table-column
      fixed
      prop="appTime"
       align='center'
      label="申请时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
       align='center'
      width="200">
    </el-table-column>
    <el-table-column
      prop="worknum"
       align='center'
      label="工号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="birth_place"
       align='center'
      label="籍贯"
      width="200">
    </el-table-column>

    <el-table-column
      prop="dormitory"
       align='center'
      label="入住/退宿地点"
      width="200">
    </el-table-column>
    
        <el-table-column label="操作"
         align='center'
        >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleClick(scope.$index, scope.row)"><i class="el-icon-edit"></i>审核</el-button>
      
      </template>
        </el-table-column>
  </el-table>
  <el-dialog title="入住申请审核" :visible.sync="dialogTableVisible_in">
    <el-card class="box-card">

 <div class="eldiv"><span style="color:red">申请时间：</span>{{currentItem.appTime}}</div>
  <div class="eldiv"><span style="color:red">申请人：</span>{{currentItem.name}}</div>
   <div  class="eldiv" ><span style="color:red">申请人工号：</span>{{currentItem.worknum}}</div>
   <div  class="eldiv" ><span style="color:red">申请人联系方式：</span>{{currentItem.contact}}</div>
   <div  class="eldiv" ><span style="color:red">申请人车间（科室）：</span>{{currentItem.department}}</div>
   <div  class="eldiv" ><span style="color:red">申请人职务：</span>{{currentItem.job}}</div>
   <div  class="eldiv" ><span style="color:red">户籍所在地：</span>{{currentItem.birth_place}}</div>
    <div  class="eldiv" ><span style="color:red">申请理由：</span>
    <el-alert
    type="default"
    :closable="false"
    title=""
    :description="currentItem.appReason"
    >
  </el-alert></div>
   <div  class="eldiv" ><span style="color:red">所在车间部门意见：</span>
   <el-alert
   title=""
    type="default"
    :closable="false"
    :description="currentItem.departmentOpinion"
    >
  </el-alert>
 </div>

<el-form :inline="true"  class="demo-form-inline" style="margin-top:20px">
  <el-form-item label="审核意见">
  <el-select v-model="currentItem.manageDepartOpinion" clearable placeholder="请选择">
    <el-option
      v-for="item in moptions"
      :key="item.value"
      :label="item.label"
      :title="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="分配宿舍">
    <el-select v-model="currentItem.dormitory" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :title="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-form-item label="宿舍号">
    <el-input v-model="currentItem.room_num" placeholder="宿舍号"></el-input>
  </el-form-item>
  </el-form-item>
  <el-form-item>
    
  </el-form-item>
  <el-form-item label="入住时间">
     <el-date-picker type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" v-model="currentItem.check_inTime" style="width: 100%;"></el-date-picker>
  </el-form-item>
</el-form>
<el-button type="primary"  @click="submitIN()">提交</el-button>
</el-card>
  </el-dialog>
    <el-dialog title="退宿申请审核" :visible.sync="dialogTableVisible_out">
    <el-card class="box-card">

 <div class="eldiv"><span style="color:red">申请时间：</span>{{currentItem.appTime}}</div>
  <div class="eldiv"><span style="color:red">申请人：</span>{{currentItem.name}}
  </div>
   <div  class="eldiv" ><span style="color:red">申请人工号：</span>{{currentItem.worknum}}</div>
   <div  class="eldiv" ><span style="color:red">申请人联系方式：</span>{{currentItem.contact}}</div>
   <div  class="eldiv" ><span style="color:red">申请人车间（科室）：</span>{{currentItem.department}}</div>
   <div  class="eldiv" ><span style="color:red">申请人职务：</span>{{currentItem.job}}</div>
   <div  class="eldiv" ><span style="color:red">户籍所在地：</span>{{currentItem.birth_place}}</div>
   <div  class="eldiv" ><span style="color:red">现住宿舍</span>{{currentItem.dormitory}}</div>
    <div  class="eldiv" ><span style="color:red">申请理由：</span>
    <el-alert
    type="default"
    :closable="false"
    title=""
    :description="currentItem.appReason"
    >
  </el-alert>
  <el-form :inline="true"  class="demo-form-inline" style="margin-top:20px">
  <el-form-item label="审核意见">
  <el-select v-model="currentItem.manageDepartOpinion" clearable placeholder="请选择">
    <el-option
      v-for="item in moptions"
      :key="item.value"
      :label="item.label"
      :title="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  </el-form>
  <el-button type="primary"  @click="submitOUT()">提交</el-button>
    </div>
</el-card>
  </el-dialog>
  </div>
</template>
 <style  scoped>

.el-card{
  text-align:left;
  padding-left:20px
}
.eldiv{
  padding: 20px;
  text-align:left;
  padding-left:20px;
  border-bottom: 1px solid #ccc;
}
.eldiv span{
display: inline-block;
width:150px;
}
.el-alert{
text-indent: 20px
}
</style>

<script>
import  bus from './bus'//这里的import是重点
  export default {
    props:['sessionIDs','user'],
    methods: {
      checkOpinion(){
        var date=new Date('2018-01-23')
        console.log(Date.parse(date))
          console.log(this.currentItem.manageDepartOpinion)
          if(this.currentItem.manageDepartOpinion&&this.currentItem.manageDepartOpinion.indexOf('同意')>-1){
            return 1;
          }else{
             this.$notify({
            title: '提示',
            message: '请选择意见（是否同意）',
            duration: 0,
            type:'warning',
            offset: 100
             });
             return false;
          }
      }
      ,
      submitOUT(){
         if( this.checkOpinion()){
           this.$http.post('/updateinfo',
          {
            sessionID:this.sessionID,
            info:this.currentItem,
            apiName:'outUpdate'
          }
          ).then(res=>{
            if(res.data.updateState=='success'){
                    this.$notify({
                  title: '提示',
                  message: '信息成功提交',
                  duration: 0,
                  type:'success',
                  offset: 100
                  });
            this.tableData.splice(this.currentIndex,1)     
            this.dialogTableVisible_out=false;  
            }
            console.log(res.data)

          })
         }
          
      },
      submitIN(){
          if( this.checkOpinion()){
           this.$http.post('/updateinfo',
          {
            sessionID:this.sessionID,
            info:this.currentItem,
            apiName:'inUpdate',
            
          }
          ).then(res=>{
           if(res.data.updateState=='success'){
                    this.$notify({
                  title: '提示',
                  message: '信息成功提交',
                  duration: 0,
                  type:'success',
                  offset: 100
                  });
            this.tableData.splice(this.currentIndex,1)     
            this.dialogTableVisible_in=false;  
            }
          })
          }
      },
      handleClick(index,row) {
        this.currentIndex=index;
        this.currentItem=row;
        if(row.applicationType=='入住申请'){
            this.dialogTableVisible_in=true;
            console.log(row);
        }else{
            this.dialogTableVisible_out=true;
            // console.log(row);
        }
        
        
      }
    },

    data() {
      return {
        currentIndex:'',
        moptions:[{
          label:'同意',
          value:'同意'
        },{
          label:'不同意',
          value:'不同意'
        },
        ],
        dialogTableVisible_in:false,
        dialogTableVisible_out:false,
        sessionID:'',
        tableData: [],
        currentItem:'',
         options: [{
          value: '上海动车段公寓',
          label: '上海动车段公寓'
        }, {
          value: '南京南公寓宿舍',
          label: '南京南公寓宿舍'
        }, {
          value: '诚意宾馆',
          label: '诚意宾馆'
        }, {
          value: '大庙村宿舍',
          label: '大庙村宿舍'
        }, {
          value: '梦之香宾馆',
          label: '梦之香宾馆'
        },{
          value: '博客宾馆',
          label: '博客宾馆'
        },{
          value: '戴斯龙宾馆',
          label: '戴斯龙宾馆'
        },{
          value: '油运小区',
          label: '油运小区'
        },{
          value: '合肥新南苑格林豪泰',
          label: '合肥新南苑格林豪泰'
        },{
          value: '合肥海友酒店',
          label: '合肥海友酒店'
        }],
      }
    },
    mounted(){
      
      bus.$on('loadapps',(obj)=>{
       this.sessionID=obj.sessionID
        //console.log(this.sessionIDs+'来自于checkexam')
       this.$http.post('/check_in_out',{
            sessionID:this.sessionID,
            apiName:'getApplications',
            department:obj.department
        } 
        ).then((res)=>{
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
         this.tableData=res.data;
        // console.log(res.data)
        })
      })
      
      
    },
    beforeDestroy(){
      bus.$off('loadapps')
    }
  }
</script>