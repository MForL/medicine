<template>
	<div class="outMed">
		<el-button type="primary" @click="show = ! show" class="createMed">售药</el-button>
		<span v-show="show" @click="show = !show"></span>
		<el-form :label-position="labelPosition" label-width="120px" v-show="show" class="outmed">
			<h3>售药记录</h3>
		  <el-form-item label="药品编码">
		    <el-input v-model="mednum" autofocus></el-input>
		  </el-form-item>
		  <el-form-item label="销售数量">
		    <el-input v-model="outCount"></el-input>
		  </el-form-item>
		  <el-form-item label="销售日期">
		    <div id="pbut">{{getTime}}</div>
		  </el-form-item>
		  <el-form-item label="单价">
		    <el-input v-model="outPrice"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="create" class="save">保存</el-button>
		  <el-button type="primary" @click="show = ! show" class="quxiao">取消</el-button>
		  </el-form-item>
		  
		</el-form>
		<!-- <ul v-show="show" class="outmed">
			<li>
				<h3>售药记录</h3>
			</li>
			<li>
				<span>药品编码</span><input type="text" name="" v-model="mednum">
			</li>
			<li>
				<span>销售数量</span><input type="text" name="" v-model="outCount">
			</li>
			<li>
				<span>销售日期</span><p id="pbut">{{getTime}}</p>
			</li>
			<li>
				<span>单价</span><input type="text" name="" v-model="outPrice">
			</li>
			<li>
				<button @click="create">保存</button>
				<button @click="show = !show">取消</button>
			</li>
		</ul> -->
		<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      type="index"
		      label="顾客号"
		      width="180"
		      :index="indexMethod">
		    </el-table-column>
		    <el-table-column
		      prop="mednum"
		      label="药品编码"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="outCount"
		      label="销售数量"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="outDate"
		      label="销售日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="outPrice"
		      label="单价"
		      width="180">
		    </el-table-column>
		  </el-table>		
	</div>

</template>
<script>
export default {
  name: 'inMed',
  data () {
    return {
    	labelPosition: 'right',
    	tableData:[],
     	show:false,
		mednum:"",
		outPrice:"",
		outCount:"",
		outDate:"",
		data:null,
		kucun:"",
		calCount:""
    }
  },
  computed:{
	getTime:function(){
		var date = new Date();
		var time = date.getTime() ;
		var currTime = new Date(time);
		var year = currTime.getFullYear();
		var month = currTime.getMonth() + 1;
		var date = currTime.getDate();
		var hour = currTime.getHours();
		var minutes = currTime.getMinutes();
		return `${year}/${month}/${date} ${hour}:${minutes}`;
	}
  },
  methods:{
	indexMethod(index) {
	  return index * 1 + 1;
	},
	create:function(){
		console.log(this.kucun);
		var that = this;
		this.$http.post('/outMed/create',{
			mednum:this.mednum,
			outPrice:this.outPrice,
			outCount:this.outCount,
			outDate: document.getElementById('pbut').innerHTML
		}).then((res)=>{
			if (res.data == "售药信息保存成功") {
				// console.log("ok");
				console.log("进入");
				that.$http.post('/haveMed/findOnly',{mednum:that.mednum,outPrice:that.outPrice}).then((res)=>{
					console.log("找到固定单价的库存数据",res)
					that.kucun = res.data[0].haveCount;
					console.log(that.kucun)
					that.$http.post('/haveMed/change',{
						mednum:that.mednum,
						outPrice:that.outPrice,
						haveCount: (parseInt(that.kucun) - parseInt(that.outCount)).toString()
					}).then((res)=>{
						console.log(res);
						location.reload(true);
					})
				})

				
			}else{
				alert(res.data)
			}
		})
	},
	getOutMed:function(){
		var that= this;
		this.$http.get('/outMed/getOut').then((res)=>{
			console.log(res);
			that.tableData = res.data
		})
	}
  },
  mounted(){
  	this.getOutMed();
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

.outmed{
	width: 400px;
	height: 394px;
	display: block;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -182px;
	margin-left: -200px;
	list-style: none;
	z-index: 666;
	background: #fff;
	border: 1px solid #ccc;
}
.el-form-item{
	margin-top: 22px;
	margin-bottom: 0;
}
.el-input{
	width: 200px;
}
h3{
	line-height: 45px;
	font-weight: 100;
	text-align: center;
}
/*li{
	width: 100%;
	height: 50px;
	text-align: center;
	line-height: 50px;
}
li:nth-of-type(1){
	width: 100%;
	height: 45px;
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
*/

.save,.quxiao{
	display: inline-block;
	width: 50px;
	height: 30px;
	border-radius: 5px;
	margin-right: 10px;
	padding:0;
	

}
.createMed{
	width: 40px;
	height: 40px;
	display: block;
	position: fixed;
	padding: 0 !important;
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