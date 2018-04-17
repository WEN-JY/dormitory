<!-- Table -->
<template>
<el-dialog title="修改宿舍信息" :visible.sync="dialogformVisibal " width='30%'>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="部门">
    <el-input v-model="formLabelAlign.department"></el-input>
  </el-form-item>
  <el-form-item label="姓名">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="工号">
    <el-input v-model="formLabelAlign.worknum"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-input v-model="formLabelAlign.sex"></el-input>
  </el-form-item>
   <el-form-item label="宿舍">
    <el-col :span="11" >
    <el-select v-model="formLabelAlign.dormitory" placeholder="请选择">
    <el-option
      v-for="item in roomOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  
    </el-col>
    <el-col class="line" :span="2"></el-col>
    <el-col :span="11">
    <el-input v-model="formLabelAlign.dormitory"></el-input>
    </el-col>
       
  </el-form-item>
  <el-form-item label="宿舍性质">
    <el-input v-model="formLabelAlign.dormitory_type"></el-input>
  </el-form-item>
  <el-form-item label="房型">
    <el-input v-model="formLabelAlign.room"></el-input>
  </el-form-item>
  <el-form-item label="房间号">
    <el-input v-model="formLabelAlign.room_num"></el-input>
  </el-form-item>
  <el-form-item label="房租">
    <el-input v-model="formLabelAlign.room_fee"></el-input>
  </el-form-item>
  
  <el-form-item label="户籍地">
    <el-input v-model="formLabelAlign.birth_place"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="formLabelAlign.note"></el-input>
  </el-form-item>
  <el-form-item label="入住时间">
    <el-col :span="11" >
    <el-date-picker type="date" placeholder="选择日期" @change="inTimeChange" value-format="yyyy-MM-dd" v-model="formLabelAlign.check_inTime" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2"></el-col>
    <el-col :span="11">
      
    </el-col>
       
  </el-form-item>
 <el-form-item label="退宿时间">
    <el-col :span="11" >
    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="outTimeChange" v-model="formLabelAlign.check_outTime" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2"></el-col>
    <el-col :span="11">
      
    </el-col>
       
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogformVisibal = false">取 消</el-button>
    <el-button type="primary" @click="submitToParent">确 定</el-button>
  </div>
</el-dialog>
  
</template>

<script>
  export default {
      props:['formVisibal','personinfo'],
    data() {
      return {
        dialogformVisibal:false,
        roomOptions:  [{
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
        labelPosition: 'left',
        formLabelAlign: {
        
        },
        formLabelWidth: '140px'
      };
    },
    methods:{
      inTimeChange(date){
        console.log(date)
       
        
      },
     outTimeChange(date){
       console.log(date)
      
        //console.log(val)
      },
      submitToParent(){
        this.dialogformVisibal = false;
        this.$emit('info-submit',this.formLabelAlign)
      }
    },
    mounted(){
      this.dialogformVisibal=this.formVisible,
      this.formLabelAlign=this.personinfo
     // console.log(this.personinfo)
    },
    watch:{
      formVisibal(val){
        
        this.dialogformVisibal=val//监听外部变化
      },
      personinfo(obj){
        console.log(obj)
        this.formLabelAlign=obj
      },
      dialogformVisibal(val){
        this.$emit('edit-change',val);
      },
      formLabelAlign(obj){
        console.log('infochanged')
        this.$emit('info-change',obj)
      }
    }
  };
</script>