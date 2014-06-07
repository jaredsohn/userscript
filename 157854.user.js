// ==UserScript==
// @name       BlindSideArea
// @description When double clicked, cover side area using white div
// @version    0.1
// @match      http://*/*
// @match      https://*/*
// ==/UserScript==


var createBlind = function (id, l, r) {
	var div = document.createElement("div");
	div.id = id;
	div.onclick = function (e) {
		var elem = document.getElementById("blind_left");
		elem.parentNode.removeChild(elem);
		elem = document.getElementById("blind_right");
		elem.parentNode.removeChild(elem);
	}
	div.style.position = "fixed";
    div.style.top = "0px";
    div.style.left = l + "px";
	div.style.width = r + "px";
	div.style.height = "1200px";
	div.style.zIndex = 1000;
    div.style.backgroundColor = "white";
    div.style.margin = 0;
	document.body.appendChild(div);
}

var tags = ["p", "div", "table"];
document.addEventListener("dblclick", function (e) {
	if (!tags.indexOf(e.tag)) return;
	
	if (document.getElementById("blind_left")) {
		return;
	}
	var rct = e.target.getBoundingClientRect();
	createBlind("blind_left", 0, rct.left);
	createBlind("blind_right", rct.right, 1000);
});