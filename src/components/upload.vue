<template>
 <div id="app">
<myheader ></myheader>
<!-- <selectpanel></selectpanel> -->
<el-upload
  class="upload-demo"
  ref="upload"
  action="https://localhost:3000/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-change="handleChange"
  :file-list="fileList" 
  :auto-upload="false" list-type="text" header="'Content-Type'= 'Authorization';">
  <el-button slot="trigger" size="small" type="primary"><i class="el-icon-search
"></i>选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="default" @click="submitUpload"><i class="el-icon-sort-up
"></i>上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传.xls/.xlsx文件</div>
</el-upload>
</div>
</template>
<style scoped>
.upload-demo{
    height: 100px;
    width: 300px;
    margin:0 auto;
    margin-top: 200px
}
</style>
<script>
import router from '../router'
import myheader from './myheader'
  export default {
    data() {
      return {
        fileList: [],
        file:'',
        tip:'用于测试的一条tip',
        sessionID:''
       };
    },
    methods: {
      submitUpload() {
        console.log(this.file)
        this.$http({
            url:'/upload',
            method:'post',
            data:this.file,

          } ).then((res)=>{
             this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功上传数据',
                      type: 'success'
                    });
              console.log(res)
        })
         router.push({name:'indexPage',params:{username:this.username,sessionID:this.sessionID,department:this.department}})
        //console.log(this.fileList)
      },
      handleChange(){
 
            // 文件元素
            var file = document.querySelector('[type=file]');
           
            // 通过FormData将文件转成二进制数据
            var formData = new FormData();
            // 将文件转二进制
         
            formData.append('file', file.files[0]);
            formData.append('user','wenjiyong')
            formData.append('sessionID',this.sessionID)
            this.fileList=[];
            this.fileList.push({
                name:file.files[0].name,
            })
           this.file=formData
           
         
        
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    components:{
      //selectpanel:selectpanel,
        myheader:myheader
    },
    mounted(){
      console.log(this.$route.params)
      this.sessionID=this.$route.params.sessionID;
      this.department=this.$route.params.department;
        if(this.$route.params.username){
            this.username=this.$route.params.username
        }
    },
     beforeDestroy () {
     
        console.log('组件upload已销毁')
      
       //bus.$off('loadInfo', ()=>{})
      }
  }
</script>