<template>
	<view style="background-color: #f5f5f5;height: 100vh;">
		<search v-if="searchIf" ref="sea" @confirm="confirmSearch" />
		<view class="all">
			<view class="sheng">
				<view class="title">
					<scroll-view scroll-x @scroll="scroll" style="width: 100%;white-space: nowrap;" :scroll-left="scrollLeft" >
						<view v-for="(item,index) in parent" style="display:inline-block" :key="index">
							<view style='display:inline-block' v-if="index==0" @click="backTree(item,-1)" :class="index==parent.length-1&&!isre?'none':'active'">全部</view>
							<view style='display:inline-block' v-if="index==0&&isre" @click="backTree(item,-2)" :class="index==parent.length-1&&isre?'none':'active'">
								<text style='display:inline-block;margin: 0 6px;color: #D0D4DB;font-size: 14px;' class="iconfont icon-z043"></text>
								搜索结果
							</view>
							<view style='display:inline-block' @click="backTree(item,index)" v-if="index!=0">
								<text style='display:inline-block;margin: 0 6px;color: #D0D4DB;font-size: 14px;' v-if="index!=0" class="iconfont icon-z043"></text>
								<text style='display:inline-block' :class="index==parent.length-1?'none':'active'">
									{{item[props.label]}}
								</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="common" v-for="(item, index) in tree" @click="toChildren(item)" :key="index">
					<label class="content">
						<view class="checkbox" v-if="isCheck&&props.multiple" @click.stop="checkboxChange(item,index)">
							<text style="color: #0095F2;font-size: 18px;" v-if="item.checked" class="iconfont icon-xuanzhong txt colors"></text>
							<text style="font-size: 18px;color: #b8b8b8;" v-else class="iconfont icon-weixuanzhong txt"></text>
						</view>
						<view class="checkbox" v-else @click.stop="checkbox(item,index)">
							<!-- <text style="color: #0095F2;font-size: 18px;" v-if="item.checked" class="iconfont icon-xuanzhong txt colors"></text> -->
							<text style="font-size: 18px;color: #b8b8b8;" v-if="item.checked" class="txt">
								<svg t="1602944167153" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1158" width="20" height="20"><path d="M 511.998 65.7531 C 270.129 65.7531 74.0558 261.587 74.0558 503.166 C 74.0558 744.739 270.129 940.573 511.998 940.573 C 753.871 940.573 949.944 744.739 949.944 503.166 C 949.944 261.587 753.871 65.7531 511.998 65.7531 L 511.998 65.7531 Z M 748.233 391.328 L 452.01 687.186 C 446.167 693.022 436.031 692.359 429.364 685.701 L 409.509 665.87 C 409.509 665.865 409.505 665.865 409.505 665.861 L 276.786 533.308 C 270.125 526.651 270.125 515.863 276.786 509.206 L 312.981 473.056 C 319.646 466.398 330.447 466.398 337.112 473.056 L 441.431 577.247 L 687.907 331.075 C 693.75 325.239 703.886 325.902 710.548 332.561 L 746.746 368.71 C 753.412 375.364 754.076 385.492 748.233 391.328 L 748.233 391.328 Z" fill="#1e95ff" p-id="1159"></path></svg>
							</text>
							<text style="font-size: 18px;color: #b8b8b8;" v-else class="txt">
								<svg t="1602944240536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1299" width="20" height="20"><path d="M512 30.117647c265.035294 0 481.882353 216.847059 481.882353 481.882353s-216.847059 481.882353-481.882353 481.882353-481.882353-216.847059-481.882353-481.882353 216.847059-481.882353 481.882353-481.882353z" fill="#FFFFFF" p-id="1300"></path><path d="M512 1024c-283.105882 0-512-228.894118-512-512s228.894118-512 512-512 512 228.894118 512 512-228.894118 512-512 512z m0-963.764706c-246.964706 0-451.764706 204.8-451.764706 451.764706s204.8 451.764706 451.764706 451.764706c252.988235 0 451.764706-204.8 451.764706-451.764706s-198.776471-451.764706-451.764706-451.764706z" fill="#9fa8ad" p-id="1301"></path></svg>
							</text>
						</view>
						<view class="person" v-if="item.user" >
							{{item[props.label].substring(item[props.label].length-2)}}
						</view>
						<view class="word">{{item[props.label]}}</view>
						<view class="right">
							<text  v-if="!item.user&&item.children.length>0" class="iconfont icon-z043"></text>
						</view>
					</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import search from './components/search/index.vue'
	export default {
		props: {
			trees: {
				type: Array,
				default: () => []
			},
			isCheck: {
				type: Boolean,
				default: () => false
			},
			checkList: {
				type: Array,
				default: () => []
			},
			searchIf:{
				type:Boolean,
				default:()=>true
			},
			props: {
				type: Object,
				default: () => {
					return {
						label: 'name',
						children: 'children',
						multiple:true
					}
				}
			}
		},
		data() {
			return {
				isre: false,
				tree: this.trees,
				allData: this.trees,
				parent: [1],
				searchResult: [],
				party_current: 100000,
				newCheckList:this.checkList,
				scrollLeft:999,
				old: {
					scrollTop: 0
				}
			}
		},
		components: {
			search
		},
		methods: {
			//多选
			checkboxChange: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked
				that.$set(that.tree[index], 'checked', status)
				if (that.newCheckList.length <= 0) {
					that.newCheckList.push(that.tree[index])
				} else {
					let status = false
					for (var i = 0, len = that.newCheckList.length; i < len; i++) {
						if (that.newCheckList[i].id === that.tree[index].id) {
							that.newCheckList.splice(i, 1)
							status = true
							break
						}
					}
					if (!status) {
						that.newCheckList.push(that.tree[index])
					}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			//单选
			checkbox: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked
				that.$set(that.tree[index], 'checked', status)
				if (that.newCheckList.length <= 0) {
					that.newCheckList=[that.tree[index]]
				} 
				else if(that.newCheckList.length==1){
						this.tree.forEach(item=>{
							if(item.id!=this.tree[index].id){
								item.checked=false
							}
						})
						that.newCheckList=[]
						if(that.tree[index].checked){
							that.newCheckList.push(that.tree[index])
						}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			//到下一级
			toChildren(item) {
				var that = this;
				let children = that.props.children
				if (!item.user && item[children].length > 0) {
					that.tree = item[children]
					that.checkIf()
					if (that.parent[0].id == item.id) {

					} else {
						that.parent.push(item)
					}	
				}
			},
			// 校验哪些选中了。单选
			checkIf(){
				let that=this;
				for (var i = 0, len = that.tree.length; i < len; i++) {
					for (var j = 0, lens = that.newCheckList.length; j < lens; j++) {
						if (that.newCheckList[j].id === that.tree[i].id) {
							that.$set(that.tree[i], 'checked', true)
							break
						} else {
							that.$set(that.tree[i], 'checked', false)
						}
					}
				}
			},
			//搜索
			confirmSearch(val) {
				this.searchResult = []
				this.search(this.allData, val)
				this.isre = true
				this.parent.splice(1, 6666)
				uni.showLoading({
					title: '正在查找'
				})
				setTimeout(() => {
					this.tree = this.searchResult
					uni.hideLoading()
				}, 300)
			},
			search(data, keyword) {
				var that = this
				let children = that.props.children
				for (var i = 0, len = data.length; i < len; i++) {
					if (data[i].name.indexOf(keyword) >= 0) {
						that.searchResult.push(data[i])
					}
					if (!data[i].user && data[i][children].length > 0) {
						that.search(data[i][children], keyword)
					}
				}
			},
			//返回其它层
			backTree(item, index) {
				let that=this;
				if (index == -1) {
					this.tree = this.allData
					this.parent.splice(1, 6666)
					this.isre = false
					this.$refs.sea.clears()
				} else if (index == -2) {
					this.tree = this.searchResult
					this.parent.splice(1, 6666)
				} else {
					var t = this
					if (this.parent.length - index > 2) {
						this.parent.forEach((item, i) => {
							if (i > index) {
								this.parent.splice(i, 6666)
							}
						})
					} else if (index == this.parent.length - 1) {
						console.log('不操作')
					} else {
						this.parent.splice(this.parent.length - 1, 1)
					}
					this.tree = item[this.props.children]
				}
				if(that.props.multiple)return
				that.checkIf()
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.flex_between_center {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.checkbox {
		position: relative;
		height: 18px;
		margin-left: 5px;
		margin-right: 0px;
		width: 18px;
		.color{
			color: #00aaff;
			background-color: #00aaff;
		}
		.txt {
			line-height: 18px;
			width: 100%;
			height: 100%;
			display: flex;
		}
	}
	.checkBorder {
		border: 1px solid #ecdee4;
	}
	.all {
		padding-bottom: 68px;
		background-color: #f5f5f5;

		.sheng {
			margin-bottom: 10px;

			.title {
				height: 45px;
				padding: 0 16px;
				line-height: 45px;
				font-size: 15px;
				color: #606064;
			}
		}
	}
	.common {
		background-color: #fff;

		.content {
			display: flex;
			align-items: center;
			padding-left: 5px;
			border-bottom: 1px solid #fafafa;
			height: 50px;
			width: 100%;
			line-height: 50px;
			position: relative;
			font-size: 16px;
			.right{
				position: absolute;
				right: 15px;
				color: #babdc3;
				font-size: 16px;
			}
			.word {
				margin-left: 6px;
			}
		}
	}
	.person {
		height: 32px;
		width: 32px;
		border-radius: 50%;
		border: 1px solid #ff9f44;
		background-color: #fff9f4;
		margin-left: 0px;
		color: #f57a00;
		line-height: 32px;
		font-size: 11px;
		text-align: center;
		margin-left: 10px;
	}

	.active {
		color: #4297ED;
	}

	.none {

		color: #666666;

	}

	 @import url("./css/icon.css");
	//@import url("https://at.alicdn.com/t/font_2009600_07r9regf6vmw.css");
</style>
