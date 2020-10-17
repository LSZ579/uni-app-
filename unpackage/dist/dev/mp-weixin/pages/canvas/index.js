// pages/canvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startPath:{},//开始位置
    movePath:[],//移动位置集
    endPath:{},//结束位置
    ctx:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ctx = wx.createCanvasContext('canvas')
    console.log(ctx)
    this.setData({
      ctx
    })
  },
  start(e){
    let {x,y}=e.changedTouches[0]
    this.setData({
      startPath:{x,y}
    })
  },
  move(e){
    let {x,y}=e.changedTouches[0]
    let that=this;
    that.setData({
      movePath:[{x,y}].concat(that.data.movePath)
    })
  },
  end(e){
    let {x,y}=e.changedTouches[0]
    this.setData({
      endPath:{x,y}
    })
    let t=this.data
   // console.log(t.startPath)
   // console.log(t.movePath)
   // console.log(t.endPath)
    this.fill()
  }
  ,fill(){
   // console.log(123)
    let data=this.data,
   ctx=data.ctx,
  start=data.startPath;
  let x0=start.x,y0=start.y,end=data.endPath,x1=end.x,y1=end.y,move=data.movePath;
  // ctx.save()
  ctx.beginPath()
  ctx.moveTo(move[0].x,move[0].y)
    // ctx.lineTo(x1,y1)
    let arr=[[]]
    for(var i=0,len=move.length;i<len;i=i+1){
      ctx.lineTo(move[i].x,move[i].y)
      ctx.lineWidth=5
      // let newArr=[];
      // for(var j=i;j<i+6;j++){
      //  newArr.push(move[j])
      // }
      // arr[i/6]=newArr
    }
    // console.log(arr)//
    // for(var n=0,lens=arr.length-1;n<lens;n++){
    //    ctx.bezierCurveTo(arr[n][2].x, arr[n][2].y, x1,y1);
    // }
    
    ctx.stroke();
     ctx.draw(true)
     this.data.movePath=[]
   
  }
})  