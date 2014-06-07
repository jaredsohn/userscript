// ==UserScript==
// @id             tieba.baidu.com-2b8f4149-ea3c-418f-b3c6-be4b768cf971@scriptish
// @name           贴吧临时脚本
// @version        0.0.5
// @include        http://tieba.baidu.com/*
// ==/UserScript==
//历史： 
//ver. 0.0.5:增加延迟1.5秒，手快点右键菜单可以用了。可以自己按情况调整
(function () {
	    var delay = 1500;//延迟1500毫秒；		
	    var kg = function () {
	            var editor = document.getElementsByClassName('tb-editor-wrapper')[0];
	            if (editor) var kk = editor.querySelector('div[contenteditable="true"]');
	            if (kk) {
	                document.removeEventListener("DOMNodeInserted", kg, false);
	                kk.setAttribute('contenteditable', 'false');
	                ev = ("onmouseenter" in editor)?["onmouseenter","onmouseleave"]:["onmouseover","onmouseout"];
	                editor.setAttribute(ev[0], 'this.querySelector(\'div[contenteditable="false"]\').setAttribute("contenteditable","true")');
	                editor.setAttribute(ev[1], 'that = this;setTimeout(function(){that.querySelector(\'div[contenteditable="true"]\').setAttribute("contenteditable","false")},'+delay+')');


	            };
	        }
	    document.addEventListener("DOMNodeInserted", kg, false);
	
}());