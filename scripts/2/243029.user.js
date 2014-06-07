// ==UserScript==
// @name        shadowbox mouse nav
// @namespace   http://userscripts.org/users/useridnumber
// @description	shadowbox mouse navigation
// @downloadURL https://userscripts.org/scripts/source/243029.user.js
// @include     http://avtopoligon.info/news/*
// @version     2
// @grant       none
// ==/UserScript==

var loaded = false;

document.addEventListener("DOMNodeInserted", nodeInserted, false);
function nodeInserted(event) {
	console.log(event);
	console.log(event.target.id);
	if(event.target.id == "sb-player" && loaded == false){
		el = document.getElementById("sb-wrapper");
		var prevDiv = document.createElement('div')
		var nextDiv = document.createElement('div')

		prevDiv.setAttribute("onclick","Shadowbox.previous()");
		prevDiv.style.width="50%";
		prevDiv.style.height="100%";
		prevDiv.style.position="absolute";
		prevDiv.style.zIndex="10";
		prevDiv.style.left = "0px";
		prevDiv.style.top = "0px";
		//prevDiv.innerHTML="prev";

		nextDiv.setAttribute("onclick","Shadowbox.next()");
		nextDiv.style.width="50%";
		nextDiv.style.height="100%";
		nextDiv.style.position="absolute";
		nextDiv.style.zIndex="10";
		//nextDiv.innerHTML="next";
		nextDiv.style.right = "0px";
		nextDiv.style.top = "0px";
		
		el = document.getElementById("sb-body");
		//el.setAttribute("onclick","Shadowbox.next()");
		el.appendChild(prevDiv);
		el.appendChild(nextDiv);
		loaded = true;
	}
}
