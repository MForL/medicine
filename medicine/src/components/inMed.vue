<template>
	<div class="inMed">
		<button @click="show = ! show">进药</button>
		<ul v-show="show" class="inmed">
			<li>
				<span>单据号</span><input type="text" name="">
			</li>
			<li>
				<span>药品编码</span><input type="text" name="" v-model="mednum">
			</li>
			<li>
				<span>采购价</span><input type="text" name="" v-model="inPrice">
			</li>
			<li>
				<span>采购数量</span><input type="text" name="" v-model="inCount">
			</li>
			<li>
				<span>采购日期</span><input type="text" name="">
			</li>
			<li>
				<span>供应商</span><input type="text" name="" v-model="provider">
			</li>
			<li>
				<button @click="create">保存</button>
			</li>
		</ul>
		
		<table>
			<tbody>
				<tr>
					<td>单据号</td>
					<td>药品编码</td>
					<td>采购价</td>
					<td>采购数量</td>
					<td>采购日期</td>
					<td>供应商</td>
				</tr>
				<tr v-if="data" v-for="(item, index) in data">
					<td>1</td>
					<td>{{item.mednum}}</td>
					<td>{{item.inPrice}}</td>
					<td>{{item.inCount}}</td>
					<td>{{item.inDate}}</td>
					<td>{{item.provider}}</td>
				</tr>
			</tbody>
		</table>
		
	</div>
</template>
<script>
export default {
  name: 'inMed',
  data () {
    return {
     	show:false,
     	showceng:false,
		mednum:"",
		inPrice:"",
		inCount:"",
		provider:"",
		data:null
    }
  },
  methods:{

	create:function(){
		this.$http.post('/inMed/create',{
			show:this.show,
			showceng:this.showceng,
			mednum:this.mednum,
			inPrice:this.inPrice,
			inCount:this.inCount,
			provider:this.provider
		}).then((res)=>{
			console.log(res.data);
		})
	},
	getInMed:function(){
		var that= this;
		this.$http.get('/inMed/getIn').then((res)=>{
			console.log(res);
			that.data = res.data
		})
	}
  },
  mounted(){
  	this.getInMed();
  }
}	
</script>
<style>
table{
	width: 900px;
	height: auto;
	background:hotpink;
	margin: 20px auto;
}
tr{
	height: 40px;
	width: 100%;
}
tr td{
	width: 150px;
	height: 40px;
	text-align: center;
	line-height: 40px;
}
.inmed{
	width: 400px;
	height: 350px;
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
.ceng{
	position:fixed;
	display: none;
	top: 0;
	left: 0;
	width:100%;
	height: 100%;
	background:rgba(0,0,0,.6);
}
li{
	width: 100%;
	height: 50px;
}
li span{
	display: block;
	width: 100px;
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
	display: block;
	width: 50px;
	height: 30px;
	outline: none;
	border:1px solid red;
	background: deepskyblue;
	border-radius: 5px;
	margin: 0 auto;
}
</style>