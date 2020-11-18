<template>
	<view>
		<tree :checkList="checkList" v-if="tree.length>0" :props="prop" @sendValue="confirm" :isCheck="true" :trees="tree" />
		<view class="btn box_sizing">
			<button class="sureBtn" type="primary" @click="backConfirm">确认</button>
		</view>
	</view>
</template>

<script>
	import tree from '@/components/tree/tree.vue';
	import dataList from './data.js'
	export default {
		components: {
			tree
		},
		data() {
			return {
				tree: [],
				checkList: [],
				prop: {
					label: 'name',
					children: 'children',
					multiple:false
				}
			}
		},
		onLoad(o) {
			this.checkList = JSON.parse(o.item)
			this.checks()
			
		},
		onReady() {
			uni.showLoading({
				title:"加载中"
			})
			setTimeout(()=>{
				this.tree=dataList;
				uni.hideLoading()
			},800)
		},
		methods: {
			//检查默认选中,要是字段钟本身包含了checked字段就不需要这个
			checks() {
				var that = this;
				for (var i = 0, len = that.tree.length; i < len; i++) {
					for (var j = 0, lens = that.checkList.length; j < lens; j++) {
						if (that.checkList[j].id === that.tree[i].id) {
							that.$set(that.tree[i], 'checked', true)
							break
						} else {
							that.$set(that.tree[i], 'checked', false)
						}
					}
				}
			},
			//获取选中的
			confirm(val) {
				this.checkList = val
			},
			backConfirm() {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//小程序写法
				//prevPage.query = this.checkList
				//h5写法
				prevPage.$vm.query =this.checkList
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.box_sizing {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.btn {
		position: fixed;
		bottom: 0;
		padding: 10px;
		background-color: #fff;
		width: 100%;

		.sureBtn {
			background-color: #f57a00;
			color: #fff;
		}
	}
</style>
