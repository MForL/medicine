<template>
	<div class="haveMed">
	<el-table
	    :data="tableData"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="mednum"
	      label="药品编码"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="medname"
	      label="药品名称"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="haveCount"
	      label="库存量"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="company"
	      label="生产厂家"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="guige"
	      label="规格"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="havePrice"
	      label="零售价"
	      width="150">
	    </el-table-column>
	  </el-table>			
	</div>

</template>
<script>
export default {
  name: 'haveMed',
  data () {
    return {
		data:null,
		tableData:[]
    }
  },
  computed:{
	// getTime:function(){
	// 	var date = new Date();
	// 	var time = date.getTime() + 8*60*1000*60;
	// 	var currTime = new Date(time);
	// 	return currTime;
	// }
  },
  methods:{
  	indexMethod(index) {
  	  return index * 1 + 1;
  	},
	getHaveMed:function(){
		var that= this;
		this.$http.get('/haveMed/getHave').then((res)=>{
			console.log(res);
			that.tableData = res.data
		})
	}             
  },
  mounted(){
  	this.getHaveMed();
  	console.log(new Date());
  }
}	
</script>
<style scoped>
.el-table{
	position: static !important;
	width: 900px !important;
	height: auto;
	border-collapse:collapse;
	margin: 20px auto;
}
tr{
	height: 40px;
	width: 100%;
}
tr:nth-of-type(1){
	background: deepskyblue;
}
tr td{
	width: 150px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	border: 1px solid #ccc;
}
.outmed{
	width: 400px;
	height: 395px;
	background:#ccc;
	display: block;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -200px;
	margin-left: -200px;
	list-style: none;
	z-index: 666;
}

li{
	width: 100%;
	height: 50px;
	text-align: center;
	line-height: 50px;
}
li:nth-of-type(1){
	width: 100%;
	height: 45px;
}
li h3{
	line-height: 45px;
	text-align: center;
}
li span{
	display: block;
	width: 120px;
	height: 50px;
	text-align: right;
	line-height: 50px;
	float: left;
}
li input{
	margin-top: 16px;
	margin-left: 20px;
}
li>button{
	display: inline-block;
	width: 50px;
	height: 30px;
	outline: none;
	border:1px solid red;
	background: deepskyblue;
	border-radius: 5px;
	margin-right: 10px;
	

}
.createMed{
	width: 50px;
	height: 50px;
	display: block;
	position: fixed;
	top: 100px;
	right: 10px;
}
.outMed>span{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 666;
}
</style>