// ==UserScript==
// @name		vBulletin 4 - Sticky Collapse
// @description	Allows display toggle of sticky threads on vBulletin 4.
// @include		*/forumdisplay.php*
// @version		1
// @date		2011-03-30
// @creator		trademark.designs
// ==/UserScript==


(function() {
	var node = document.getElementById('stickies');

	var thissign;

	thissign = node;
	thissign.style.display = 'none';
	var wrap = document.createElement("div");
	var label = document.createElement("div");
	var anchor = document.createElement("a");
	anchor.appendChild(document.createTextNode("Stickies [+]"));
	anchor.style.cursor = 'pointer';
	anchor.title = 'Click to expand stickies';
	anchor.addEventListener('click', genHandler(thissign), false);
	label.appendChild(anchor);
	wrap.appendChild(label);
	wrap.setAttribute('class','threadlisthead');
	label.style.padding = "5px 10px";
	thissign.parentNode.insertBefore(wrap, thissign);
})();


function genHandler(signode) {
	return (function(event) {
			if(signode.style.display == 'none') {
			  signode.style.display = 'block';
			  this.firstChild.nodeValue=("Stickies [-]");
			  this.title = 'Click to collapse stickies';
			 }
			else {
			  signode.style.display = 'none';
			  this.firstChild.nodeValue=("Stickies [+]");
			  this.title = 'Click to expand stickies';
		}
	});
}
