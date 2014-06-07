// ==UserScript==
// @name           BYR Forum Ctrl-Enter submit
// @namespace      http://userstyles.org
// @description	   使北邮人论坛支持按Ctrl-Enter键快速提交
// @include        http://forum.byr.edu.cn/wForum/*
// @version        0.1
// @author         CIH
// ==/UserScript==
function $(id) {
  return document.getElementById(id);
}

function onLoad(event)
{
	var textarea = $("oArticleContent");
	if(textarea)
	{
		textarea.addEventListener("keyup", function(event)
		{
			if(event.ctrlKey && event.keyCode == 13)
			{
				var button = $("oSubmit");
				if(button)button.click();
			}
		},false);
	}
}

window.addEventListener("load", onLoad, false);