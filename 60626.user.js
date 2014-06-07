// ==UserScript==
// @name          Dashboard Drag Scroll
// @namespace     http://d.hatena.ne.jp/arikui/
// @include       http://www.tumblr.com/dashboard
// ==/UserScript==

var position = {
	mutable: false,
	prev   : null,
	rato   : 7
};

document.body.addEventListener("mousedown", function(event){
	event.preventDefault();
	event.stopPropagation();

	var targetId = event.target.getAttribute("id");

	if(!targetId.match(/^(dashboard_index|container|content)$/))
		return;

	position.mutable = true;
	position.prev    = event.clientY;
}, false);

document.body.addEventListener("mouseup", function(event){
	event.preventDefault();
	event.stopPropagation();

	position.mutable = false;
}, false);

document.body.addEventListener("mousemove", function(event){
	event.preventDefault();
	event.stopPropagation();

	if(!position.mutable)
		return;

	window.scrollBy(0, - position.rato * (event.clientY - position.prev));
	position.prev = event.clientY;
}, false);
