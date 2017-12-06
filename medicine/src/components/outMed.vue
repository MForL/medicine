<template>
	<div class="outMed">
		<button @click="show = ! show" class="createMed">售药</button>
		<span v-show="show" @click="show = !show"></span>
		<ul v-show="show" class="outmed">
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
		</ul>
		
		<table>
			<tbody>
				<tr>
					<td>顾客号</td>
					<td>药品编码</td>
					<td>销售数量</td>
					<td>销售日期</td>
					<td>单价</td>
				</tr>
				<tr v-if="data" v-for="(item, index) in data">
					<td>{{index+1}}</td>
					<td>{{item.mednum}}</td>
					<td>{{item.outCount}}</td>
					<td>{{item.outDate}}</td>
					<td>{{item.outPrice}}</td>
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
		var seconds = currTime.getSeconds();
		return `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}`;
	}
  },
  methods:{

	create:function(){
		console.log(this.kucun);
		var that = this;
		this.$http.post('/outMed/create',{
			mednum:this.mednum,
			outPrice:this.outPrice,
			outCount:this.outCount,
			outDate: document.getElementById('pbut').innerHTML
		}).then((res)=>{
			console.log(this.outCount)
			console.log(res.data);
			if (res.data == "售药信息保存成功") {
				// console.log("ok");
				console.log("进入");
				that.$http.post('/haveMed/findOnly',{mednum:that.mednum}).then((res)=>{
					that.kucun = res.data[0].haveCount;
					console.log(that.kucun)
					that.$http.post('/haveMed/change',{
						mednum:that.mednum,
						haveCount: (parseInt(that.kucun) - parseInt(that.outCount)).toString()
					}).then((res)=>{
						console.log(res);
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
			that.data = res.data
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
table{
	width: 900px;
	height: auto;
	border-collapse:collapse;
	margin: 20px auto;
}
tr{
	height: 40px;
	width: 100%;
}
tr:nth-of-type(1){
	background: #f12572;
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