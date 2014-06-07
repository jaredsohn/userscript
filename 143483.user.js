// ==UserScript==
// @name        Move Turk Timer
// @namespace   http://userscripts.org/users/temporary
// @include     https://*.mturk.com/mturk/*
// @version     1
// ==/UserScript==

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

var timer = document.getElementById("theTime");
if (timer) {
   var timer_div = timer.parentNode;
   var all_divs = document.getElementsByTagName("div");
   var form_divs = [];
   for (var i in all_divs) {
      var div = all_divs[i];
      if (div.nodeType == 1 && div.getAttribute("class") == "footer") {
         form_divs.push(div);
      }
   }
   var bottomControls = form_divs[0];
   var pos = findPos(bottomControls);
   var top = pos[1] - 90;
   timer_div.setAttribute("style","padding-left: 5px; position: absolute; top: " + top + "; left: 0");

}


