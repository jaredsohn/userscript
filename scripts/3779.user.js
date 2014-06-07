// ==UserScript==
// @name            LJ collapser
// @namespace       
// @description     adds a collapse button to entries
// @include      	http://*.livejournal.com/friend*
// ==/UserScript==


GM_addStyle("a.collapseBtn { float:right; position: relative; top:-30px;right:20px; border: 1px solid yellow; padding: 0 2px 2px 2px; cursor: pointer;}");
GM_addStyle("#id0, #id1, #id22 { display: none !important; }");


var h = document.getElementsByTagName('h2');
for (var i=0;i<h.length;i++) {
	t = document.createTextNode('(collapse)');
	a = document.createElement('A');
	id = document.createAttribute('id');
	id.value = 'id' + i;
	class = document.createAttribute('class');
	class.value = "collapseBtn";
	a.setAttributeNode(id);
	a.setAttributeNode(class);
	a.appendChild(t);
	h[i].appendChild(a);
};

var aa = document.getElementsByTagName('a');
for (var i=0;i<aa.length;i++) {
	var elmLink = document.getElementById("id" + i);
	elmLink.addEventListener("click", myfunc, false);
};

function myfunc() {
	header = this.parentNode; 
	box1 = header.parentNode; 
	entry = box1.childNodes[2];
	foot = box1.childNodes[3];
	state = entry.style.display; 
	if (entry.style.display=='' || entry.style.display == 'block') {
		entry.style.display = 'none'; 
		foot.style.display = 'none'; 
	} else {
		entry.style.display = 'block';
		foot.style.display = 'block'; 
	};
	return false;
};