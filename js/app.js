let dataExample = [];

for (let i= 0; i < 10000; i++) {
    const x = Math.floor(Math.random() * 999999) + 1; 
    const y = Math.floor(Math.random() * 999999) + 1; 
    dataExample.push([x, y]);
}

const pointColor = '#3585ff'

const margin = {top: 20, right: 15, bottom: 60, left: 70};
const outerWidth = 800;
const outerHeight = 600;
const width = outerWidth - margin.left - margin.right;
const height = outerHeight - margin.top - margin.bottom;

const container = d3.select('.scatter-container');

const path1 = "M0,0V1000H1000V0ZM940,587.57,727.62,509.64l103.9,66.64-375,185.22S795.38,659.85,879,775.05,775.05,958,775.05,958L409.12,824.75l169.42,142.3L278.11,944.46l131-365.92c-63.24,13.55-103.9,124.23-103.9,124.23s72.28-196.52-70-176.19S63.53,958,63.53,958L68,395.57,325.55,434,79.34,176.47c266.54,40.66,384-63.25,384-63.25l-424.66-61H657.59L815.71,443s110.68-74.54,76.8-187.48S741.17,129,741.17,129L940,61.27Z"

// Init SVG
const svgChart = container.append('svg:svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight)
    .attr('class', 'svg-plot')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Init Canvas
const canvasChart = container.append('canvas')
    .attr('width', width)
    .attr('height', height)
    .style('margin-left', margin.left + 'px')
    .style('margin-top', margin.top + 'px')
    .attr('class', 'canvas-plot');

// Prepare buttons
const toolsList = container.select('.tools')
    .style('margin-top', margin.top + 'px')
    .style('visibility', 'visible');

toolsList.select('#reset').on('click', () => {
    const t = d3.zoomIdentity.translate(0, 0).scale(1);
    canvasChart.transition()
      .duration(200)
      .ease(d3.easeLinear)
      .call(zoom_function.transform, t)
});

const context = canvasChart.node().getContext('2d');

// Init Scales
const x = d3.scaleLinear().domain([0, d3.max(dataExample, (d) => d[0])]).range([0, width]).nice();
const y = d3.scaleLinear().domain([0, d3.max(dataExample, (d) => d[1])]).range([height, 0]).nice();


// Draw plot on canvas
function draw(transform) {
    const scaleX = transform.rescaleX(x);
    const scaleY = transform.rescaleY(y);

    context.clearRect(0, 0, width, height);
    context.transform(scaleX, 0, 0, scaleY, translateX, translateY);

    // dataExample.forEach( point => {
    //     drawPoint(scaleX, scaleY, point, transform.k);
    // });
    drawShape()
}

// Initial draw made with no zoom
draw(d3.zoomIdentity)



function drawShape() {
  var path = new Path2D(path1)
  context.fill(path)
}

function drawPoint(scaleX, scaleY, point, k) {
  context.beginPath();
  context.fillStyle = pointColor;
  const px = scaleX(point[0]);
  const py = scaleY(point[1]);

  context.arc(px, py, 1.2 * k, 0, 2 * Math.PI, true);
  context.fill();
}

// Zoom/Drag handler
const zoom_function = d3.zoom().scaleExtent([1, 1000])
    .on('zoom', () => {
      const transform = d3.event.transform;
      context.save();
      draw(transform);
      context.restore();
    })
    // .on('wheel.zoom', () => {
    //   const transform = d3.event.transform;
    //   if (d3.event.ctrlKey) {
    //     console.log("jo!");
    //   }
    // })

canvasChart.call(zoom_function);


