<template>
	<div class="inMed">
		<button @click="show = ! show" class="createMed">进药</button>
		<span v-show="show" @click="show = !show"></span>
		<ul v-show="show" class="inmed">
			<li>
				<h3>进药记录</h3>
			</li>
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
				<span>采购日期</span><p id="pbut">{{getTime}}</p>
			</li>
			<li>
				<span>供应商</span><input type="text" name="" v-model="provider">
			</li>
			<li>
				<button @click="create">保存</button>
				<button @click="show = !show">取消</button>
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
					<td>{{index+1}}</td>
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
		data:null,
		inDate:null
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
		var seconds = currTime.getSeconds();
		return `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}`;
	}
  },
  methods:{

	create:function(){
		var that = this;
		this.$http.post('/inMed/create',{
			mednum:this.mednum,
			inPrice:this.inPrice,
			inCount:this.inCount,
			provider:this.provider,
			inDate: document.getElementById('pbut').innerHTML
		}).then((res)=>{
			console.log(res.data);
			if (res.data == "商品保存成功") {
				console.log("ok");
				that.$http.post('/haveMed/create',{
					mednum:that.mednum,
					medname:"999感冒灵",
					inPrice:that.inPrice,
					inCount:that.inCount,
					provider:that.provider,
					guige:"100"
				}).then((res)=>{
					console.log(res);
					location.reload(true);
				})
				
			}else{
				alert(res.data)
			}
		})
	},
	getInMed:function(){
		var that= this;
		this.$http.get('/inMed/getIn').then((res)=>{
			// console.log(res);
			that.data = res.data
		})
	}
  },
  mounted(){
  	this.getInMed();
  }
}	
</script>
<style scoped>
table{
	width: 900px;
	height: auto;
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
}
.inmed{
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