// ==UserScript==
// @name           ljPoster
// @namespace      pstj
// @description    Pretify the Post Entry page so it firts better writing long posts
// @include        http://www.livejournal.com/update.bml
// ==/UserScript==
(function() {
	var css = 'html[dir="ltr"] body { font-size: 14px !important; } metainfowrapperelement { margin: 0; padding: 0;}';
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
})();
window.addEventListener('load', function(){
	var lowlimit = 18, limit, isOpened = false, eid = 'metainfowrapperelement'
	
	var resizer = function(){
		var newh = parseInt(document.getElementById(eid).style.height);
		if (isOpened) newh-=10; else newh+=10;
		if (isOpened && newh < lowlimit) { isOpened = false; return;}
		if (!isOpened && newh >= limit) { isOpened = true; return;}
		document.getElementById(eid).style.height = newh+'px';
		setTimeout(resizer, 25);
	};
	
	var a = document.getElementById('draft___Frame');
	if (a !== null) a.style.height='530px';
	
	a = document.createElement('div');
	a.setAttribute('id', eid);
	a.style.overflow = 'hidden';
	
	var expander = document.createElement('div');
	expander.style.height = limit +'px';
	expander.style.cursor = 'pointer';
	expander.addEventListener('click', resizer, false);
	expander.appendChild(document.createTextNode('Mefainfo for the post, click to expand'));
	
	a.appendChild(expander);
	a.appendChild(document.getElementById('userpic'));
	a.appendChild(document.getElementById('metainfo'));
	a.appendChild(document.getElementById('infobox'));
	document.getElementById('entry').parentNode.insertBefore(a,document.getElementById('entry'));

	limit = a.offsetHeight;
	if (!isOpened) a.style.height = lowlimit+'px';
}, false);
