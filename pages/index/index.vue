<template>
	<view>
		<tree :checkList="checkList" :props="prop" @sendValue="confirm" :isCheck="true" :trees="tree" />
		<view class="btn box_sizing">
			<button class="sureBtn" type="primary" @click="backConfirm">确认</button>
		</view>
	</view>
</template>

<script>
	import tree from '@/components/tree/tree.vue';
	export default {
		components: {
			tree
		},
		data() {
			return {
				tree: [{
						checked: false,
						children: [{
								children: [{
									children: [{
										children: [{
											children: [{
													children: "",
													id: "10",
													name: "学生b挥",
													pid: "",
													checked: false,
													user: true
												},

												{
													children: "",
													id: "1281778375907655681",
													name: "学生",
													checked: false,
													pid: "",
													user: true
												},
												{
													children: "",
													id: 9965,
													name: "小陆",
													checked: false,
													pid: "",
													user: true
												},
												{
													children: [{
														children: "",
														id: 26,
														checked: false,
														name: "学生a",
														pid: "",
														user: true
													}, ],
													id: 15,
													checked: false,
													name: "助班",
													pid: "14",
													user: false
												}
											],
											id: 7,
											checked: false,
											name: "班长",
											pid: "4",
											user: false
										}],
										id: 4,
										checked: false,
										name: "教职工",
										pid: "3",
										user: false
									}],
									id: 3,
									name: "教师团队",
									checked: false,
									pid: "2",
									user: false
								}],
								id: 2,
								name: "系主任",
								checked: false,
								pid: "1",
								user: false
							},
							{
								children: [{
									children: [{
										children: [],
										id: 1566,
										checked: false,
										name: "ni党总支",
										pid: "14",
										user: false
									}],
									id: 1455,
									checked: false,
									name: "mi机构党委",
									pid: "13",
									user: false
								}],
								id: 1355,
								checked: false,
								level: 2,
								name: "系副主任",
								pid: "1",
								user: false
							}
						],
						id: 1,
						memberCount: 66,
						name: "副校长",
						checked: false,
						pid: "-1",
						user: false
					},
					{
						id: 6666998,
						name: "校长",
						pid: "-1",
						checked: false,
						user: false,
						children: [{
							id: 888,
							name: "小陆",
							checked: false,
							pid: "-1",
							user: true
						}]
					}
				],
				checkList: [],
				prop:{
					label:'name',
					children:'children'
				}
			}
		},
		onLoad(o) {
			var that = this
			that.checkList = JSON.parse(o.item),
			that.checks()
		},
		methods: {
			//检查默认选中,要是字段钟本身包含了checked字段就不需要这个
			checks(){
				var that=this;
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
				this.checkList=val
			},
			backConfirm(){
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			var prevPage = pages[pages.length - 2]; //上一个页面
			//h5写法
			prevPage.query =this.checkList
			//小程序写法
			//prevPage.$vm.query =this.checkList
			uni.navigateBack();
		}
		}
	}
</script>

<style>
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
