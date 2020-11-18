<template>
	<view style="background-color: #f5f5f5;height: 100vh;overflow: hidden;">
		<search v-if="searchIf" ref="sea" @confirm="confirmSearch" />
		<view class="all">
			<view class="sheng">
				<view class="title">
					<view id="scroll" >
						<view v-for="(item,index) in parent" style="display:inline-block" :key="index">
							<view style='display:inline-block' v-if="index==0" @click="backTree(item,-1)" >
								<text v-if="index==parent.length-1&&!isre" class="none">全部</text>
								<text v-else class="active">全部</text>
							</view>
							<view style='display:inline-block' v-if="index==0&&isre" @click="backTree(item,-2)" :class="[index==parent.length-1&&isre]?'none':'active'">
								<text style='display:inline-block;margin: 0 6px;color: #D0D4DB;font-size: 14px;' class="iconfont icon-z043"></text>
								搜索结果
							</view>
							<view style='display:inline-block' @click="backTree(item,index)" v-if="index!=0">
								<text style='display:inline-block;margin: 0 6px;color: #D0D4DB;font-size: 14px;' v-if="index!=0" class="iconfont icon-z043"></text>
								<text style='display:inline-block' v-if="index==parent.length-1" class="none">
									{{item[props.label]}}
								</text>
								<text style='display:inline-block' v-else class="active">
									{{item[props.label]}}
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="common" v-for="(item, index) in tree" @click="toChildren(item)" :key="index">
					<label class="content">
						<view class="checkbox" v-if="isCheck&&props.multiple" @click.stop="checkboxChange(item,index)">
							<text style="color: #0095F2;" v-if="item.checked" class="iconfont icon-xuanzhong txt colors"></text>
							<text style="color: #b8b8b8;" v-else class="iconfont icon-weixuanzhong txt"></text>
						</view>
						<view class="checkbox" v-if="isCheck&&!props.multiple&&props.nodes&&item.user" @click.stop="checkbox(item,index)">
								</text><text style="color: #0ec7ff;" v-if="item.checked" class="txt iconfont icon-selected">
								</text>
								<text style="color: #b8b8b8;" v-else class="txt iconfont icon-weixuanzhong1">						
								</text>
						</view>
						<view class="checkbox" v-if="isCheck&&!props.multiple&&!props.nodes" @click.stop="checkbox(item,index)">
								<text style="color: #0ec7ff;" v-if="item.checked" class="txt iconfont icon-selected">
								</text>
								<text style="color: #b8b8b8;" v-else class="txt iconfont icon-weixuanzhong1">						
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
					<!-- <tree v-if="item.children&&tochild"  v-for="(item,index) in item.children"></tree> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import search from './components/search/index.vue'
	export default {
		name:"tree",
		props: {
			trees: {
				type: Array,
				default: () => {
					return []
				}
			},
			isCheck: {
				type: Boolean,
				default: () => {
					return false
				}
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
						multiple:false,
						checkStrictly:false
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
				tochild:false,
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
		mounted() {
			console.log(this.tree,66)
		},
		methods: {
			//多选
			checkboxChange: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked,temp=Object.assign({},item)
				if(item.checked){//反选
					if(this.props.checkStrictly){
						if(item.user){
							that.$set(that.tree[index], 'checked', false)
							this.delUser(item.id)
						}
						else{
							that.$set(that.tree[index], 'checked', false)
							for(var index=0,n=this.newCheckList.length;index<n;index++){
								let temp=this.newCheckList[index];
								if(temp.id==item.id){
									this.newCheckList.splice(index,1)
									break
								}
							}
							this.delChild(item)
						}
					}else{
						that.$set(that.tree[index], 'checked', false)
						for(var index=0,n=this.newCheckList.length;index<n;index++){
							let temp=this.newCheckList[index];
							if(temp.id==item.id){
								this.newCheckList.splice(index,1)
								break
							}
						}
					}
				}else{//选中
					that.newCheckList.push(item)
					that.$set(that.tree[index], 'checked', true)
					if(this.props.checkStrictly){
						 this.chooseChild(item)
					}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			delUser(id){
			let that=this;
					for (var i = 0, len = that.newCheckList.length; i < len; i++) {
						if (that.newCheckList[i].id === id) {
							that.newCheckList.splice(i, 1)
							console.log('删user')
							return
						}
					}
			},
			chooseChild(arr){
				let that=this;
				if(!arr.user){
					for(var i=0,len=arr.children.length;i<len;i++){
						let item=arr.children[i];
						item.checked=true
						that.newCheckList.push(item)
						if(!item.user){
							 this.chooseChild(item)
						}
					}
				}
				that.newCheckList=Array.from(new Set(that.newCheckList))
			},
			delChild(arr){
				console.log(this.newCheckList)
				if(!arr.user){
					for(var i=0,len=arr.children.length;i<len;i++){
						let item=arr.children[i];
						item.checked=false
						for(var index=0,n=this.newCheckList.length;index<n;index++){
							let temp=this.newCheckList[index];
							if(temp.id==item.id){
								this.newCheckList.splice(index,1)
									break
							}
						}
						if(!item.user){
							this.delChild(item)
						}
					}
				}
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
			//到下一级
			toChildren(item) {
				let scroll=document.getElementById('scroll')	
				var that = this;
				this.tochild=true
				let children = that.props.children
				if (!item.user && item[children].length > 0) {
					that.tree = item[children]
					that.checkIf()
					if (that.parent[0].id == item.id) {

					} else {
						that.parent.push(item)
					}	
				}
				that.$nextTick(()=>{
					scroll.scrollLeft=100000
				})
			},
			// 校验哪些选中了。单选
			checkIf(){
				let that=this;
				console.log(this.newCheckList,'new')
				for (var i = 0, len = that.tree.length; i < len; i++) {
					for (var j = 0, lens = that.newCheckList.length; j < lens; j++) {
						if (that.newCheckList[j].id === that.tree[i].id) {
							that.$set(that.tree[i], 'checked', true)
							break
						}
						else{
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
			font-size: 20px;
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
		color: #4297ED!important;
	}

	.none {

		color: #666666;

	}
	#scroll{
		overflow-x: scroll;
		width: 100%;white-space: nowrap;
	}
	 @import url("./css/icon.css");
	//@import url("https://at.alicdn.com/t/font_2009600_07r9regf6vmw.css");
</style>
