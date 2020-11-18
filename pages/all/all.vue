<template>
	<view class="o">
		
		<view v-for="(item,index) in query" style="margin: 10px;" :key="index">
			<text  :class="index%2==0?'color':''">{{item.name}}--</text>
		</view>
		<button style="position: absolute;bottom: 10px;width: 100%;" @click="toChoose(query)" type="primary">选择对象</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query:[],
				detail:{
					userIds:[],
					organizeIds:[]
					
				},
				sendObj:[],
				uoData:[],
				isChoose:[]
			}
		},
		methods: {
			toChoose(item){
				let items=this.isChoose.length>0?JSON.stringify(this.isChoose):JSON.stringify(this.query)
				uni.navigateTo({
					url:'../index/index?item='+items
				})
			}
		}
	}
</script>

<style>
.color{
	color: #07BB07;
}
.o{
	/* transform: scale(1.5); */
}
.are{
	transform: scale(1);
	position: relative;
	background-color: #33333330;
	height: 80vh;
	width: 100%;
	overflow: scroll;
}
.a{
	background-color: #0077AA;
}
</style>
