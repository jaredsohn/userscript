// ==UserScript==
// @name           Gmail Multi-upload Fix
// @namespace      http://userstyles.org
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// @author         CIH
// @version        0.3
// @description    Fixed the Gmail Multi-upload problem when some themes are applied (eg. tree, bus stop) in firefox.
// ==/UserScript==

// We use these strings to detect the link of "Attach a file",
// You can add your language here.
var ATTACH_FILE_STRS =
[
	"添加附件", //中文（简体）
	"附加檔案", //中文（繁体）
	"Attach a file", //English
	"ファイルを添付" //Japanese
];

var CSS_FIX = "div.eb {display: block!important; width: 52px!important; height: 16px!important; z-index: auto!important;}";

function addStyle(content, win, id)
{
	var heads = win.document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = win.document.createElement("style");
		if(id) node.id = id;
		node.type = "text/css";
		node.appendChild(win.document.createTextNode(content));
		heads[0].appendChild(node); 
	}
}

function getCanvasWin()
{
	var canvas = top.document.getElementById("canvas_frame");
	if(!canvas) return;
	return canvas.contentWindow;
}

function changeSize()
{
	var win = getCanvasWin();
	if(!win) return;
	var links = win.document.getElementsByClassName("el");
	var found = false;
	for(var i=0;i<links.length;i++)
	{
		var link = links[i];
		if(link.tagName != "SPAN") continue;
		if(ATTACH_FILE_STRS.indexOf(link.textContent) != -1)
		{
			found = true;
			var fix = win.document.getElementById("multi-upload-fix");
			if(fix)
			{
				var css = fix.textContent;
				css = css.replace(/(width:\s*)(\d+)/g, "$1" + link.offsetWidth);
				css = css.replace(/(height:\s*)(\d+)/g, "$1" + link.offsetHeight);
				fix.textContent = css;
			}
			break;
		}
	}
	if(!found)
		setTimeout(changeSize, 1000);
}
setTimeout(changeSize, 1000);

window.addEventListener("load", function(event){
	var win = getCanvasWin();
	if(!win) return;
	var fix = win.document.getElementById("multi-upload-fix");
	if(!fix)
		addStyle(CSS_FIX, win, "multi-upload-fix");
}, false);
