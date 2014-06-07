// ==UserScript==
// @name	Source Viewer
// @namespace	http://bit.ly/Y9sRz7
// @description	View Source Code of any homepage
// @include	http://*/*
// @include	https://*/*
// @match	https://dl.dropbox.com/sh/2qdhmz4jgq2lrrx/*/*
// @version	4.5
// @updateURL	https://userscripts.org/scripts/source/167703.meta.js
// @downloadURL	https://userscripts.org/scripts/source/167703.user.js
// @icon	http://www.chip.de/ii/8/8/3/8/0/6/0/99e7dc2dba159b09.jpg
// @icon64	https://dl.dropbox.com/sh/2qdhmz4jgq2lrrx/di9vjnUPUb/icon64x64.jpg
// @author	Joshiii98
// @copyright	2013+ , Joshiii98
// ==/UserScript==

// ==Profile==
	unsafeWindow.viewthesource = function(){
        window.location="view-source:"+window.location
        }
// ==============

// ==Body==
body = document.body;
if(body != null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','viewthesource');
	div2.style.position = "fixed";
	div2.style.bottom = "+105px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ffffff";
	div2.style.padding = "2px";
	div2.style.opacity = 0.90;	
	div2.style.border = "1px solid #555";
	div2.innerHTML = "<a href='javascript:viewthesource()' onclick='javascript:viewthesource()'>Click to view source!</a> "
	body.appendChild(div2);
	}
// ==============