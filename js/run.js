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
    let f4 = function (d) {
        alert('颜色: ' + d.getAttribute('fill'));
    }
    let f5 = function (d) {
        alert('width: ' + d.getBBox().width + ' height: ' + d.getBBox().height)
    }
    let f6 = function (d) {
        alert('x: ' + d.getBBox().x + ' y: ' + d.getBBox().y)
    }
    let f7 = function (d) {
        alert('图形: ' + d.tagName);
    }
    let triangleWithRingButtons = new svgRingButton({
        target: '#triangle',
        event: 'mouseover',
        buttonsEvent: 'mouseover',
        animation: true
    })
    new svgRingButton({
        animation: true,
        animationDuration: 300,
        target: '#rect',
        showButtonsName: false,
        showButtonsIcon: true,
        showButtonsTitle: true,
        buttonsIcon: ['img/color.png', 'img/size.png', 'img/position.png', 'img/shape.png'],
        buttonsTitle: ['颜色', '大小', '位置', '图形'],
        callbacks: [f4, f5, f6, f7]
    })
    new svgRingButton({
        target: '.circle',
        buttonsName: ['颜色', '大小', '位置', '图形'],
        callbacks: [f4, f5, f6, f7]
    })
}
mian();