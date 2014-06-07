// ==UserScript==
// @name           Page Lock
// @namespace      #aVg
// @description    Locks page away from view.
// @include        *
// @version        0.1
// ==/UserScript==
const trigger = "Z";
var mask = document.createElement("div");
mask.setAttribute("style", "background:black;width:100%;height:8000px;display:none;position:absolute;top:0px;");
document.body.appendChild(mask);
document.addEventListener("keydown", function(e) {
	if (e.ctrlKey && e.keyCode == trigger.charCodeAt(0) && e.shiftKey)
	{
		e.preventDefault();
		mask.style.display = mask.style.display == "none" ? "" : "none";
	}
}, false);