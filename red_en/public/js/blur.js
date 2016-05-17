var canvasWidth=window.innerWidth
var canvasHeight=window.innerHeight
var canvas=document.getElementById("canvas")
var context=canvas.getContext("2d")
canvas.width=canvasWidth
canvas.height=canvasHeight
var image=new Image()
var radius=100
var leftMargin=0,
    topMargin=0
var clippingRegion={x:-1,y:-1,r:radius}
image.src="public/imgs/image.jpg"
image.onload=function(e){
  initCanvas()
  $('#blur-div').css("width",canvasWidth+"px")
  $('#blur-div').css("height",canvasHeight+"px")
  $("#blur-image").css("width",canvasWidth+"px")
  $("#blur-image").css("height",canvasHeight+"px")
  /*裁剪多余尺寸以便屏幕自适应
  leftMargin=(image.width-canvasWidth)/2
  topMargin=(image.height-canvasHeight)/2
  $("#blur-image").css("width",image.width+"px")
  $("#blur-image").css("height",image.height+"px")
  $("#blur-image").css("top","-"+topMargin+"px")
  $("#blur-image").css("left","-"+leftMargin+"px")
  */
}
function initCanvas(){
  clippingRegion={x:Math.random()*(canvas.width-2*radius)+radius,
                  y:Math.random()*(canvas.height-2*radius)+radius,r:0}
  draw(image,clippingRegion)
}
function setClippingRegion(clippingRegion){
  context.beginPath()
  context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false)
  context.clip()
}
function draw(image,clippingRegion){
  context.clearRect(0,0,canvas.width,canvas.height)
  context.save()
  setClippingRegion(clippingRegion)
  //图像裁剪
  //context.drawImage(image,leftMargin,topMargin,canvas.width,canvas.height,0,0,canvas.width,canvas.height)
  //调整图像尺寸
  context.drawImage(image,0,0,canvas.width,canvas.height)
  context.restore()
}
function reset(){
  initCanvas()
  var theAnimation=setInterval(
    function(){
      clippingRegion.r += 5
      if(clippingRegion.r>radius){
        clearInterval(theAnimation)
      }
      draw(image,clippingRegion)
    },
    100
  )
}
function show(){
  var theAnimation=setInterval(
    function(){
      clippingRegion.r += 20
      if(clippingRegion.r>2*Math.max(canvas.width,canvas.height)){
        clearInterval(theAnimation)
      }
      draw(image,clippingRegion)
    },
    30
  )
}