// ==UserScript==
// @name        Canvasタグを使った簡単なラクガキツール
// @namespace   su10
// @description ページ内をダブルクリックでラクガキ開始、右クリックで終了
// @include     http://*
// @include     https://*
// @version     0.1.4
// ==/UserScript==

//iframe内ページでの動作防止
if (!window.opera && window != window.parent) return;

var body = document.getElementsByTagName("body")[0];
body_style = document.defaultView.getComputedStyle(body, "");

var canvas = document.createElement("canvas");
canvas.id = "draw_zone";
canvas.width = body_style.width.split("px")[0];
canvas.height = body_style.height.split("px")[0];
canvas.style.display = "none";
canvas.style.margin = "0";
canvas.style.padding = "0";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "999999";
body.appendChild(canvas);

function confirmRenderCanvas(){
    body.addEventListener("dblclick",
        function(){
            if(!confirm("ラクガキを開始しますか？")) return;
            canvas.style.display = "block";
            alert("ラクガキ開始！（右クリックで終了）");
            body.removeEventListener("dblclick", arguments.callee, true);
        }
    , true);
}
confirmRenderCanvas();

var drawFlg = false;
var oldX = 0;
var oldY = 0;

canvas.addEventListener("mousedown",
    function(e){
        drawFlg = true;
        oldX = e.clientX + window.scrollX;
        oldY = e.clientY + window.scrollY;
    }
, true);
canvas.addEventListener("mouseup", function(){drawFlg = false;}, true);
canvas.addEventListener("mousemove", draw, true);

function draw(e) {
    if(!drawFlg) return;
    var x = e.clientX + window.scrollX;
    var y = e.clientY + window.scrollY;
    var context = canvas.getContext("2d");
    context.strokeStyle = "rgba(255,0,0,1)";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(oldX, oldY);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
    oldX = x;
    oldY = y;
}

canvas.addEventListener("contextmenu",
    function(e){
        if(!confirm("ラクガキを終了しますか？")){
            e.preventDefault();
            return;
        }
        canvas.style.display = "none";
        e.preventDefault();
        confirmRenderCanvas();
    }
, true);
