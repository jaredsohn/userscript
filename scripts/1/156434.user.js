// ==UserScript==
// @name MDBG Balloon
// @namespace http://davidtsai.net78.net/
// @description Blows Chinese characters in results up to big size 
// @include http://www.mdbg.net/chindict/chindict.php?*
// @version 0.1
// @run-at document-end
// ==/UserScript==

/**
 * Change Log 
 * 
 * Version 0.1 
 *  - First version 
 * 
 */

(function(){
	var i,
		list = Array.prototype.slice.call(document.getElementsByClassName("hanzi")).concat(Array.prototype.slice.call(document.getElementsByClassName("word"))),
		big = document.createElement("div"),
		hoverer = function(orig){
			return function(e){
				big.style.display = "block";
				big.style.top = e.clientY + "px";
				big.style.left = e.clientX + "px";
				big.textContent = orig.textContent;
				isInTarget = true;
			}
		},
		isInTarget;

	big.style.position = "fixed";
	big.style.pointerEvents = "none";
	big.style.zIndex = "1001";
	big.style.border = "5px solid #F80";
	big.style.background = "rgba(255,255,255,.8)";
	big.fontSizeInt = 400;
	big.style.fontSize = "400px";

	document.body.appendChild(big);
	for(i = 0; i < list.length; i++){
		list[i].onmousemove = hoverer(list[i]);
	}

	document.onmousemove = function(e){
		if(!isInTarget){
			big.style.display = "none";
			big.style.fontSize = (big.fontSizeInt = 400) + "px";
		}
		isInTarget = false;
	}

	setInterval(function(){
		if(
			big.offsetLeft + big.offsetWidth > document.documentElement.clientWidth
			|| big.offsetTop + big.offsetHeight > document.documentElement.clientHeight
		){
			big.style.fontSize = (big.fontSizeInt -= 10) + "px";
		}
	}, 1);

	return big;
})();
