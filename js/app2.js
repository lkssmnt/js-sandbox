const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

new EasyPZ(document.getElementById("canvas2"), function(transform) {
  drawShape(transform.scale, transform.translateX, transform.translateY)
});

const path1 = "M0,0V1000H1000V0ZM940,587.57,727.62,509.64l103.9,66.64-375,185.22S795.38,659.85,879,775.05,775.05,958,775.05,958L409.12,824.75l169.42,142.3L278.11,944.46l131-365.92c-63.24,13.55-103.9,124.23-103.9,124.23s72.28-196.52-70-176.19S63.53,958,63.53,958L68,395.57,325.55,434,79.34,176.47c266.54,40.66,384-63.25,384-63.25l-424.66-61H657.59L815.71,443s110.68-74.54,76.8-187.48S741.17,129,741.17,129L940,61.27Z"

function drawShape(scale, translateX, translateY) {
  ctx.clearRect(0, 0, 1000, 1000);
  ctx.save(); 				
  ctx.transform(scale, 0, 0, scale, translateX, translateY);
  const path = new Path2D(path1)
  ctx.fill(path)
  ctx.restore();

  console.log(scale);
}
ctx.fillStyle = 'red';
drawShape(1,0,0)