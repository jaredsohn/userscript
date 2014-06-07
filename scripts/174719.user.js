// ==UserScript==
// @name        Youtube: Stop Auto-Switch to Share Panel
// @namespace   ytube-edlolington
// @description Prevents youtube from automatically switching to the share panel after a video is done playing.
// @include     *youtube.com/watch?*
// @version     1.01
// ==/UserScript==

var keyword = "action-panel-trigger";
var shareBtn;


function shareBtnToggle() {
	//alert("You clicked the share button.");
	shareBtn.setAttribute("data-trigger-for", "action-panel-share");
	window.setTimeout(
		function() {
			shareBtn.setAttribute("data-trigger-for", "blank");
		},
		1000
	);
	
}

var panelBtns = ( function() {
	var result = [];
	var btns = document.getElementsByTagName("button");
	for (var i=0; i < btns.length; i++) {
		if (btns[i].className.indexOf(keyword) != -1)
			result.push(btns[i]);
	}
	
	return result;
})();

for (var i=0; i < panelBtns.length; i++) {
	if (panelBtns[i].getAttribute("data-trigger-for") == "action-panel-share") {
		shareBtn = panelBtns[i];
		shareBtn.setAttribute("data-trigger-for", "blank");
		shareBtn.addEventListener("click", shareBtnToggle, false);
	}
}