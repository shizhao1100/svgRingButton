# svgRingButton
基于D3.js的环状Button

目前引用的D3库版本为3.5.17
## 说明
可选择一个svg元素为其创建一个环状按钮组。
## 效果
![](https://github.com/shizhao1100/svgRingButton/blob/master/img/screenshot.gif?raw=ture)
## 引入
```javascript
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script src="js/svgRingButton.min.js" charset="utf-8"></script>
```
## 最简配置
```javascript
    new svgRingButton({
        target: '#rect'
    })
```
## 配置项说明
|配置项|描述|默认值|可选值|
|:-:|:-:|:-:|:-:|
|target|目标|''|'#id'\|\|'.className'|
|showButtonsName|是否显示环状按钮的名称|true|true\|\|false|
|buttonsName|环状按钮的名称|["button1", "button2", "button3"]|['颜色',...]|
|buttonsNameSize|环状按钮名称的大小|'auto'|数值\|\|'auto'|
|buttonsNameColor|环状按钮名称的颜色|black|black\|\|'#000000'|
|showButtonsIcon|是否显示环状按钮的图标|false|true\|\|false|
|buttonsIcon|环状按钮的图标URL列表|[]|['img/color.png',...,]|
|buttonsIconSize|环状按钮的图标大小|'auto'|数值\|\|'auto'|
|showButtonsTitle|是否显示环状按钮的图标提示|false|true|true\|\|false|
|buttonsTitle|环状按钮的提示|[]|['颜色',...]|
|animation|是否开启动画|false|true\|\|false|
|animationDuration|动画时长|500|数值|
|callbacks|环状按钮的触发函数|[function () {alert(1)}, ..., ...]|[f1,f2,...]|
|innerRadius|内环半径|'auto'|数值\|\|'auto'|
|outerRadius|外环半径|'auto'|数值\|\|'auto'|
|buttonColor|环状按钮的颜色|'skyblue'|black\|\|'#000000'|
|strokeColor|环状按钮的边颜色|'white'|black\|\|'#000000'|
|strockWidth|环状按钮边宽度|'auto'|black\|\|'#000000'|
|event|打开环状按钮的触发方式|'click'|'click'\|\|'mouseover'|
|buttonsHideItme|当打开环状按钮触发方式为mouseover时，环状按钮的停留时间|1000|数值|
|buttonsEvent|环状按钮的触发方式|'click'|'click'\|\|'mouseover'|