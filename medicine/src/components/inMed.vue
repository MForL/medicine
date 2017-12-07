<template>
	<div class="inMed">
		<el-button type="primary" @click="show = ! show" class="createMed">进药</el-button>
		<span v-show="show" @click="show = !show"></span>
		<el-form :label-position="labelPosition" label-width="120px" v-show="show" class="outmed">
			<h3>进药记录</h3>
		  <el-form-item label="药品编码">
		    <el-input v-model="mednum" autofocus @blur="change"></el-input>
		  </el-form-item>
		  <el-form-item label="药品名称">
		    <el-input v-model="medname"></el-input>
		  </el-form-item>
		  <el-form-item label="采购价">
		    <el-input v-model="inPrice"></el-input>
		  </el-form-item>
		  <el-form-item label="采购数量">
		    <el-input v-model="inCount"></el-input>
		  </el-form-item>
		  <el-form-item label="采购日期">
		    <div id="pbut">{{getTime}}</div>
		  </el-form-item>
		  <el-form-item label="供应商">
		    <el-input v-model="provider"></el-input>
		  </el-form-item>
		  <el-form-item label="生产厂家">
		    <el-input v-model="company"></el-input>
		  </el-form-item>
		  <el-form-item label="规格">
		    <el-input v-model="guige"></el-input>
		  </el-form-item>
		  <el-form-item label="零售价">
		    <el-input v-model="havePrice"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="create" class="save">保存</el-button>
		  <el-button type="primary" @click="show = ! show" class="quxiao">取消</el-button>
		  </el-form-item>
		  
		</el-form>
		<!-- <ul v-show="show" class="inmed">
			<li>
				<h3>进药记录</h3>
			</li>
			<li>
				<span>药品编码</span><input type="text" name="" v-model="mednum" @blur="change">
			</li>
			<li>
				<span>药品名称</span><input type="text" name="" v-model="medname">
			</li>
			<li>
				<span>采购价</span><input type="text" name="" v-model="inPrice">
			</li>
			<li>
				<span>采购数量</span><input type="text" name="" v-model="inCount">
			</li>
			<li>
				<span>采购日期</span><p id="pbut">{{getTime}}</p>
			</li>
			<li>
				<span>供应商</span><input type="text" name="" v-model="provider">
			</li>
			<li>
				<span>生产厂家</span><input type="text" name="" v-model="company">
			</li>
			<li>
				<span>规格</span><input type="text" name="" v-model="guige">
			</li>
			<li>
				<span>零售价</span><input type="text" name="" v-model="havePrice">
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
		      label="单据号"
		      width="150"
		      :index="indexMethod">
		    </el-table-column>
		    <el-table-column
		      prop="mednum"
		      label="药品编码"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="inPrice"
		      label="采购价"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="inCount"
		      label="采购数量"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="inDate"
		      label="采购日期"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="provider"
		      label="供应商"
		      width="150">
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
    	tableData: [],
     	show:false,
     	showceng:false,
		mednum:"",
		inPrice:"",
		inCount:"",
		provider:"",
		data:null,
		inDate:null,
		guige:"",
		havePrice:"",
		company:"",
		medname:""
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
		var that = this;
		var data = {
			mednum:this.mednum,
			medname:this.medname,
			provider:this.provider,
			guige:this.guige,
			inPrice:this.inPrice,
			inCount:this.inCount,
			company:this.company,
			inDate: document.getElementById('pbut').innerHTML
		}
		this.$http.post('/haveMed/create',data).then((res)=>{
			console.log(res);
		}).then(
			this.$http.post('/inMed/create',data).then((res)=>{
				if(res.data == "商品保存成功"){
					location.reload(true);
				}else{
					alert(res.data);
				}
			})    
		)
	},
	change:function(){
		console.log(this.mednum);
		var that = this;
		this.$http.post('/haveMed/findmednum',{mednum:this.mednum}).then((res)=>{
			if(res.data){
				console.log(res)
				that.medname = res.data[0].medname;
				that.company = res.data[0].company;
				that.guige = res.data[0].guige;
				that.guige = res.data[0].guige;
				that.havePrice = res.data[0].havePrice;
			}
		})
	},

	// create:function(){
	// 	var that = this;
	// 	this.$http.post('/inMed/create',{
	// 		mednum:this.mednum,
	// 		inPrice:this.inPrice,
	// 		inCount:this.inCount,
	// 		provider:this.provider,
	// 		inDate: document.getElementById('pbut').innerHTML
	// 	}).then((res)=>{
	// 		console.log(res.data);
	// 		if (res.data == "商品保存成功") {
	// 			console.log("ok");
	// 			that.$http.post('/haveMed/create',{
	// 				mednum:that.mednum,
	// 				medname:"999感冒灵",
	// 				inPrice:that.inPrice,
	// 				inCount:that.inCount,
	// 				provider:that.provider,
	// 				guige:"100"
	// 			}).then((res)=>{
	// 				console.log(res);
	// 				location.reload(true);
	// 			})
				
	// 		}else{
	// 			alert(res.data)
	// 		}
	// 	})
	// },
	
	getInMed:function(){
		var that= this;
		this.$http.get('/inMed/getIn').then((res)=>{
			// console.log(res);
			that.tableData = res.data
		})
	}
  },
  mounted(){
  	this.getInMed();
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
	background: #cfc;
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
	height: 548px;
	display: block;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -274px;
	margin-left: -200px;
	list-style: none;
	z-index: 666;
	background: #fff;
	border: 1px solid #ccc;
}
.el-form-item{
	margin-top: 10px;
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

.save,.quxiao{
	display: inline-block;
	width: 50px;
	height: 30px;
	border-radius: 5px;
	margin-right: 10px;
	padding:0;
	

}
/*li{
	width: 100%;
	height: 40px;
	text-align: center;
	line-height: 40px;
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
	height: 40px;
	text-align: right;
	line-height: 40px;
	float: left;
}
li input{
	margin-top: 13px;
	margin-left: 20px;
}
li>button{
	display: inline-block;
	width: 40px;
	height: 30px;
	outline: none;
	border:1px solid red;
	background: deepskyblue;
	border-radius: 5px;
	margin-right: 10px;
	

}*/
.createMed{
	width: 40px;
	height: 40px;
	display: block;
	position: fixed;
	padding: 0 !important;
	top: 100px;
	right: 10px;
}
.inMed>span{
	content: "";
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 666;
}
</style>