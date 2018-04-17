<template>
  <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible"  width="400px">
  <el-form :model="form" label-position="left">
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitPs">确 定</el-button>
    <el-button type="warning"  v-show="getAuth" @click="createNewUser">创建新用户</el-button>
  </div>
  <el-card class="box-card" v-show="getAuth">
  <div slot="header" class="clearfix">
    <span>添加新用户</span>
 
  </div>
  <el-form :model="form" label-position="left">
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.new_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.new_password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门" :label-width="formLabelWidth">
      <el-input v-model="form.new_department" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
</el-card>
</el-dialog>
</template>
<style scoped>
    .el-dialog{
        padding: 60px;
        border-radius: 50px;
    }
</style>

<script>
import  bus from './bus'
  export default {
    props:['dialogState'],
    data() {
      return {
        dialogFormVisible: false,
        department:'',
        form: {
          name: '',
          password:''
        },
        formLabelWidth: '50px',
        getAuth:false
      };
    },
    mounted(){
      
        bus.$on('userinfo',(obj)=>{
          console.log(obj)
          this.form.name=obj.name;
          this.department=obj.department
        })
          console.log(this.name)
        if(this.department=='办公室'||this.department=='行政办公室'||this.department=="管理员"){
            this.getAuth= true;
          }else{
              console.log(this.departments)
              this.getAuth= false;
              console.log(this.getAuth)
          }
    },
    watch:{
        
        dialogState(){
          if(this.department=='办公室'||this.department=='行政办公室'||this.department=="管理员"){
            this.getAuth= true;
          }else{
          
              this.getAuth= false;
          }
            this.dialogFormVisible=this.dialogState
           console.log('change detected'+this.department)
        },
        dialogFormVisible(){
          if(this.department=='办公室'||this.department=='行政办公室'||this.department=="管理员"){
            this.getAuth= true;
          }else{
          
              this.getAuth= false;
          }
                if(this.dialogFormVisible==false){
                      this.$emit('closeInfoDialog','')
                }
         console.log('change detected'+this.department)   
        }
    },
    methods:{

        submitPs(){
            this.dialogFormVisible = false,
            console.log('正在提交')
            this.$emit('submitps',this.form)
        },
        createNewUser(){
          this.dialogFormVisible = false,
            console.log('正在提交')
            this.$emit('createNewUser',this.form)
        }
    }
  };
</script>