// ==UserScript==
// @name        drawComment
// @namespace   http://userscripts.org/users/drawComment
// @include     http://*facebook.com*
// @include     https://*facebook.com*
// @require 	https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// @description Hackathon Project
// @version     1
// ==/UserScript==

var commentButtonCount = 0;
var hasNewElement = true;
var script = document.createElement("script");

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function showOnlyPicture()
{
	var objToHide = document.getElementsByClassName('mvm uiStreamAttachments');
	for(var i=0;i<objToHide.length;i++)
		objToHide[i].innerHTML = '';
	var a = document.getElementsByTagName('a');
	var string = "";
	for(var i=0;i<a.length;i++){
		var href = a[i].innerHTML;
		if(href.length > 4)
			if(href.substr(href.length-4,4) == ".jpg"){
				string += href + ",";
				var imgCode = "</br><img src=\""+href+"\" style=\"width:330px;margin-top:10px;\"/>";
				a[i].innerHTML = imgCode;
			}
	}
}

function addDrawCommentButton()
{
	window.setTimeout(function() {
		var buttonsBox = document.getElementsByClassName('uiLinkButton comment_link');
		for(var i = commentButtonCount; i < buttonsBox.length; i=i+2)
		{
			var id = "draw_" + i;
			buttonsBox[i].outerHTML += " · <label class=\"uiLinkButton comment_link\" title=\"Leave a comment\" id=\"" + id + "\"><input data-ft=\"{&quot;type&quot;:24,&quot;tn&quot;:&quot;S&quot;}\" value=\"Draw Comment\" onclick=\"return drawClickOn(this)\" type=\"button\"></label>";
			buttonsBox[i].parentNode.parentNode.outerHTML +="<div id=" + id + "_div></div>";
		}
		commentButtonCount = i;
	}, 600);

}

function elementInserted(){
	hasNewElement = true;
}

function refresh(){
	if(hasNewElement){
		hasNewElement = false;
		showOnlyPicture();
		addDrawCommentButton();
	}
}

addGlobalStyle('#beta { position: absolute;}');

script.type = "application/javascript";
script.innerHTML = "var textArea;\
var workingCanvas;\
var workingButton;\
function drawClickOn(obj)\
{\
	if(workingCanvas && workingCanvas.parentNode)\
		workingCanvas.parentNode.removeChild(workingCanvas);\
	if(workingButton && workingButton.parentNode)\
		workingButton.parentNode.removeChild(workingButton);\
	fc_click(obj);\
	var convasDiv = document.getElementById(obj.parentNode.id+\"_div\");\
	convasDiv.innerHTML = '<canvas id='+obj.parentNode.id+'_imageView_canvas width=\"400px\" height=\"300px\" style=\"border:solid;background-color: black;\"></canvas></br>\ <button id='+obj.parentNode.id+'\_imageView\ onclick=\"foo(this)\" style=\"position:relative;top:-40px;left:10px;\">Done</button>';\
	workingCanvas = document.getElementById(obj.parentNode.id + '_imageView_canvas');\
	init(workingCanvas);\
	workingButton =  document.getElementById(obj.parentNode.id + '_imageView');\
	if(document.activeElement.nodeName == 'TEXTAREA')\
	{\
		textArea = document.getElementById(document.activeElement.id);\
	}\
	textArea.onkeypress = function(e){\
    if (!e) e = window.event; \
    if (e.keyCode == '13'){\
		if(workingCanvas && workingCanvas.parentNode)\
		workingCanvas.parentNode.removeChild(workingCanvas);\
		if(workingButton && workingButton.parentNode)\
		workingButton.parentNode.removeChild(workingButton);\
    }\
  }\
}\
function foo(button) {\
	textArea.focus();\
    var canvas = document.getElementById(button.id+'_canvas');\
	button.style.visibility = 'hidden';\
    try {\
        var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];\
    } catch (e) {\
        var img = canvas.toDataURL().split(',')[1];\
    }\
    $.ajax({\
        url: 'http://api.imgur.com/2/upload.json',\
        type: 'POST',\
        data: {\
            type: 'base64',\
            key: 'eef85f9ca43ab92205dfa21f31fca572',\
            name: 'neon.jpg',\
            title: 'test title',\
            caption: 'test caption',\
            image: img\
        },\
        dataType: 'json'\
    }).success(function (data) {\
		textArea.value = data['upload']['links']['imgur_page']+'.jpg';\
    }).error(function () {\
        alert('Could not reach api.imgur.com. Sorry :(');\
        w.close();\
    });\
}\
        var canvas, context, tool;\
        function init(canvas) {\
            if (!canvas) {\
                alert('Error: I cannot find the canvas element!');\
                return;\
            }\
            if (!canvas.getContext) {\
                alert('Error: no canvas.getContext!');\
                return;\
            }\
            context = canvas.getContext('2d');\
            if (!context) {\
                alert('Error: failed to getContext!');\
                return;\
            }\
            tool = new tool_pencil();\
            canvas.addEventListener('mousedown', ev_canvas, false);\
            canvas.addEventListener('mousemove', ev_canvas, false);\
            canvas.addEventListener('mouseup', ev_canvas, false);\
        }\
        function tool_pencil() {\
            var tool = this;\
            this.started = false;\
            this.mousedown = function (ev) {\
                context.beginPath();\
                context.moveTo(ev._x, (ev._y));\
                tool.started = true;\
            };\
            this.mousemove = function (ev) {\
                if (tool.started) {\
                    context.strokeStyle = \"white\";\
                    context.lineTo(ev._x, (ev._y));\
                    context.stroke();\
                }\
            };\
            this.mouseup = function (ev) {\
                if (tool.started) {\
                    tool.mousemove(ev);\
                    tool.started = false;\
                }\
            };\
        }\
        function ev_canvas(ev) {\
            if (ev.layerX || ev.layerX == 0) {\
                ev._x = ev.layerX - workingCanvas.offsetLeft;\
                ev._y = ev.layerY - workingCanvas.offsetTop;\
            } else if (ev.offsetX || ev.offsetX == 0) {\
                ev._x = ev.offsetX - workingCanvas.offsetLeft;;\
                ev._y = ev.offsetY - workingCanvas.offsetTop;\
            }\
            var func = tool[ev.type];\
            if (func) {\
                func(ev);\
            }\
        }\
";
document.body.appendChild(script);

$(document).ready(function()
{
	//showOnlyPicture();
	//addDrawCommentButton();
	var contentArea = document.getElementById('contentArea');
	var timeLine = document.getElementById('timeline_tab_content');
	if(contentArea)
		contentArea.addEventListener("DOMNodeInserted",elementInserted,false);
	if(timeLine)
		timeLine.addEventListener("DOMNodeInserted",elementInserted,false);
	setInterval(refresh,1000);
});