function svgRingButton(obj) {
    this.version = "0.0.1";
    let f1 = function () {
        alert(1)
    };
    let f2 = function () {
        alert(2)
    };
    let f3 = function () {
        alert(3)
    };
    let defaultOption = {
        target: '',
        showButtonsName: true,
        buttonsName: ["button1", "button2", "button3"],
        buttonsNameSize: 'auto',
        buttonsNameColor: 'black',
        showButtonsIcon: false,
        buttonsIcon: [],
        buttonsIconSize: 'auto',
        showButtonsTitle: false,
        buttonsTitle: [],
        animation: false,
        animationDuration: 500,
        callbacks: [f1, f2, f3],
        innerRadius: 'auto',
        outerRadius: 'auto',
        buttonColor: 'skyblue',
        strokeColor: 'white',
        strockWidth: 'auto',
        event: 'click',
        buttonsHideItme: 1000,
        buttonsEvent: 'click'
    };
    let appenText = function (SVG, data, arcInner, arcOut, getRotate, obj, x, y, innerRadius, outerRadius, strockWidth, domHash) {
        let _appenText = function () {
            SVG.selectAll().data(d3.layout.pie()(data))
                .enter()
                .append('text')
                .attr('x', d => arcOut.centroid(d)[0])
                .attr('y', d => arcOut.centroid(d)[1])
                .attr("text-anchor", "middle")
                .text((d, i) => { return obj.buttonsName[i] })
                .attr("transform", (d, i) => "translate(" + x + "," + y + ") rotate(" + getRotate(i) + ',' + arcOut.centroid(d)[0] + ',' + arcOut.centroid(d)[1] + ")").attr("class", domHash)
                .attr('dy', 0.10 * innerRadius)
                .style("pointer-events", "none")
                .style('font-size', 0.3 * innerRadius)
                .style('fill', obj.buttonsNameColor)
        };
        if (obj.animation) {
            setTimeout(_appenText, obj.animationDuration)
        } else {
            _appenText()
        }
    };
    let appendTitle = function (Arc, obj) {
        Arc.append('title').text((d, i) => {
            return obj.buttonsTitle[i]
        })
    };
    let appendIcon = function (SVG, data, arcInner, arcOut, getRotate, obj, x, y, innerRadius, outerRadius, strockWidth, domHash) {
        let _appendIcon = function () {
            SVG.selectAll().data(d3.layout.pie()(data))
                .enter()
                .append('image')
                .attr('x', d => arcOut.centroid(d)[0])
                .attr('y', d => arcOut.centroid(d)[1])
                .attr("xlink:href", (d, i) => {
                    return obj.buttonsIcon[i]
                })
                .attr("transform", (d, i) => "translate(" + (x - (0.5 * innerRadius) / 2) + "," + (y - (0.5 * innerRadius) / 2) + ")").attr("class", domHash)
                .attr('width', 0.5 * innerRadius)
                .attr('height', 0.5 * innerRadius)
                .style("pointer-events", "none")
        };
        if (obj.animation) {
            setTimeout(_appendIcon, obj.animationDuration)
        } else {
            _appendIcon()
        }
    };
    let appendArc = function (SVG, data, arcInner, arcOut, getRotate, obj, x, y, innerRadius, outerRadius, strockWidth, domHash) {
        let Arc = undefined;
        if (obj.animation) {
            Arc = SVG.selectAll().data(d3.layout.pie()(data))
                .enter()
                .append('path')
                .attr("d", arcInner)
                .attr("transform", "translate(" + x + "," + y + ")")
                .attr("fill", obj.buttonColor)
                .attr("stroke", obj.strokeColor)
                .attr("stroke-width", strockWidth)
                .attr("class", domHash);
            Arc.transition()
                .duration(obj.animationDuration)
                .attr("d", arcOut)
        } else {
            Arc = SVG.selectAll().data(d3.layout.pie()(data))
                .enter()
                .append('path')
                .attr("d", arcOut)
                .attr("transform", "translate(" + x + "," + y + ")")
                .attr("fill", obj.buttonColor)
                .attr("stroke", obj.strokeColor)
                .attr("stroke-width", strockWidth)
                .attr("class", domHash)
        }
        return Arc
    };
    let appendButtonDom = function (Dom, obj, domHash) {
        let svg = Dom.parentNode;
        let box = Dom.getBBox();
        let innerRadius = undefined;
        let outerRadius = undefined;
        let strockWidth = undefined;
        let x = (box.width) / 2 + box.x;
        let y = (box.height) / 2 + box.y;
        if (obj.innerRadius == 'auto') {
            innerRadius = Math.max(box.width, box.height) / 2 * 1.03;
            outerRadius = (Math.max(box.width, box.height) / 2) * 1.8
        } else {
            if (isNumber(obj.innerRadius) && isNumber(obj.outerRadius)) {
                innerRadius = obj.innerRadius;
                outerRadiusR = obj.outerRadius
            }
        }
        if (obj.strockWidth == 'auto') {
            strockWidth = Math.max(box.width, box.height) / 30;
            if (strockWidth > 5) {
                strockWidth = 5
            }
        } else {
            if (isNumber(obj.strockWidth)) {
                strockWidth = obj.strockWidth
            }
        }
        let arcInner = d3.svg.arc().outerRadius(innerRadius).innerRadius(innerRadius);
        let arcOut = d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius);
        let getRotate = function (i) {
            let _r = (i + 0.5) / data.length * 360;
            if (_r <= 90) {
                return _r
            } else if (_r <= 270) {
                return _r - 180
            } else {
                return _r - 360
            }
        };
        let data = new Array(obj.callbacks.length);
        for (let i = 0; i < data.length; i++) {
            let _d = {};
            _d.value = 1;
            _d.name = obj.buttonsName[i];
            data[i] = 1
        }
        let SVG = d3.select(svg);
        let Arc = appendArc(SVG, data, arcInner, arcOut, getRotate, obj, x, y, 0, 0, strockWidth, domHash);
        if (obj.showButtonsName) {
            appenText(SVG, data, arcInner, arcOut, getRotate, obj, x, y, innerRadius, outerRadius, strockWidth, domHash)
        }
        if (obj.showButtonsTitle) {
            appendTitle(Arc, obj)
        }
        if (obj.showButtonsIcon) {
            appendIcon(SVG, data, arcInner, arcOut, getRotate, obj, x, y, innerRadius, outerRadius, strockWidth, domHash)
        }
    };
    let appendButtonEvent = function (dom, obj, domHash) {
        if (dom.domHash) {
            let _dom = document.getElementsByClassName(dom.domHash);
            let _len = _dom.length;
            if (obj.buttonsEvent == 'click') {
                for (let i = 0; i < _len; i++) {
                    _dom[i].addEventListener('click', function () {
                        return obj.callbacks[i](dom)
                    }, false)
                }
            }
            if (obj.buttonsEvent == 'mouseover') {
                for (let i = 0; i < _len; i++) {
                    _dom[i].addEventListener('mouseover', function () {
                        return obj.callbacks[i](dom)
                    }, false)
                }
            }
        }
    };
    let removeButtonDom = function (Dom, obj) {
        if (Dom.domHash) {
            let _dom = document.getElementsByClassName(Dom.domHash);
            let _len = _dom.length;
            for (let i = 0; i < _len; i++) {
                _dom[0].remove()
            }
        }
    };
    let reoveButtonEvent = function (Dom, obj) {
        if (Dom.domHash) {
            let _dom = document.getElementsByClassName(Dom.domHash);
            let _len = _dom.length;
            for (let i = 0; i < _len; i++) {
                if (obj.buttonsEvent == 'click') {
                    for (let i = 0; i < _len; i++) {
                        _dom[i].removeEventListener('click', obj.callbacks[i], false)
                    }
                }
            }
        }
    };
    let show = function (dom, obj, domHash) {
        appendButtonDom(dom, obj, domHash);
        appendButtonEvent(dom, obj, domHash)
    };
    let hide = function (dom, obj) {
        reoveButtonEvent(dom, obj);
        removeButtonDom(dom, obj)
    };
    let onMouseOver = function (dom, obj) {
        if (!dom.avtive) {
            dom.avtive = true;
            let domHash = new Date().getTime();
            dom.domHash = domHash;
            show(dom, obj, domHash)
        }
    };
    let onMouseOut = function (dom, obj) {
        setTimeout(function () {
            hide(dom, obj), dom.avtive = false
        }, obj.buttonsHideItme)
    };
    let onClick = function (dom, obj) {
        if (dom.avtive) {
            dom.avtive = false;
            hide(dom, obj)
        } else {
            let domHash = new Date().getTime();
            dom.domHash = domHash;
            dom.avtive = true;
            show(dom, obj, domHash)
        }
    };
    let appendDomEvent = function (dom, obj) {
        if (obj.event == 'click') {
            dom.addEventListener('click', function () {
                return onClick(dom, this.obj)
            }, false)
        }
        if (obj.event == 'mouseover') {
            dom.addEventListener('mouseover', function () {
                return onMouseOver(dom, obj)
            }, false);
            dom.addEventListener('mouseout', function () {
                return onMouseOut(dom, obj)
            }, false)
        }
    };
    this.start = function (obj) {
        let _dom = undefined;
        if (obj.target[0] == '.') {
            let _className = obj.target.substring(1, obj.target.length);
            _dom = document.getElementsByClassName(_className)
        } else if (obj.target[0] == '#') {
            let _id = obj.target.substring(1, obj.target.length);
            _dom = document.getElementById(_id)
        }
        if (!(_dom.length)) {
            _dom.obj = obj;
            appendDomEvent(_dom, obj)
        } else {
            for (let i = 0; i < _dom.length; i++) {
                _dom[i].obj = obj;
                appendDomEvent(_dom[i], obj)
            }
        }
    };
    this.option = Object.assign(defaultOption, obj);
    this.start(this.option)
}