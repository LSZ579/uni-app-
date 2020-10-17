<template>
	<view class="tmp-box">
		<view class='filterBox'>
			<view class='filter-input'>
				<text class='iconfont icon-guanbi'></text>
				<input class="text" type='text' v-model="inputVal" confirm-type="搜索" @confirm='handleFllter' placeholder='搜索'></input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputVal: "",

			};
		},
		methods: {
			handleFllter(e) {
				// console.log(e.detail.value)
				this.$emit("confirm", e.detail.value)
			},
			clears(){
				console.log(this.inputVal)
				this.inputVal=""
				console.log('清除了内容')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.filterBox {
		padding: 8px 16px;
		background-color: #fff;
		.filter-input {
			height: 40px;
			background-color: #eeeff0;
			border-radius: 20px;
			display: flex;
			align-items: center;
			padding-left: 20px;
			.filterImg {
				width: 16px;
				height: 16px;
				margin-right: 10px;
			}
			.filterImgs {
				width: 16px;
				height: 16px;
				
			}
			.text {
				width: 84%;
				background-color: #eeeff0;
				font-size: 16px;
				color: #000;
			}
		}
	}
	@import url("../../css/icon.css");
</style>
