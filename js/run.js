function mian() {
    this.svg = d3.select("body").append("svg")
        .attr("width", 800)
        .attr("height", 500)
        .style("background-color", "#cccccc");

    this.circle = this.svg.selectAll('circle')
        .data([{ x: 100, y: 100, r: 20, c: "black" }, { x: 300, y: 300, r: 50, c: "red" }, { x: 300, y: 100, r: 35, c: "blue" }])
        .enter()
        .append("circle")
        .attr("r", d => d.r)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", d => d.c)
        .attr("class", "circle");
    this.rect = this.svg.selectAll('rect')
        .data([{ x: 100, y: 300, width: 80, height: 80, c: "yellow" }])
        .enter()
        .append("rect")
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", d => d.c)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("id", 'rect');

    this.triangle = this.svg.selectAll('triangle')
        .data([{ path: "600,200 675,300 525,300 ", c: "green" }])
        .enter()
        .append('polygon')
        .attr("points", d => d.path)
        .attr("fill", d => d.c)
        .attr("id", "triangle");
    let f1 = function () {
        alert('1')
    };
    let f2 = function () {
        alert('2')
    };
    let f3 = function () {
        alert('3')
    };
    let f4 = function () {

    }
    let f5 = function () {

    }
    let f6 = function () {

    }
    let f7 = function () {

    }
    let f8 = function () {

    }
    svgRingButton.setOption({ target: '#triangle' });
    svgRingButton.setOption({ target: '#rect', buttonsName: ['alart 1', 'alart 2', 'alart 3'], callbacks: [f1, f2, f3] });
    svgRingButton.setOption({ target: '.circle', buttonsName: ['颜色', '大小', '位置', '图形'], callbacks: [f4, f5, f6, f7] });

}
mian();