// ==UserScript==
// @name           HTML Comments Display
// @namespace      http://userscripts.org/users/23652
// @description    Displays html comments at the bottom of the page
// @include        http://*.*/*
// @include        https://*.*/*
// @include        file://*
// @version        1.4
// @copyright      JoeSimmons
// ==/UserScript==

var max_length = 500; // Max length of characters of the comments before they're hidden

var i=0, add='';

var comments = document.evaluate("//comment()",document,null,6,null);
for(var i=0; i<comments.snapshotLength; i++) {
	b = (i==comments.snapshotLength-1)?"":"\n<BR>";
	add+=comments.snapshotItem(i).data.replace(/</g,'&lt;').replace(/>/,'&gt;')+b;
}

var div = document.createElement('div'),
	a = document.createElement('a');
a.textContent = "Comments over "+max_length+" characters. Click to show comments";
a.href = 'javascript:void(0);';
a.addEventListener('click', function(){
	this.style.display = 'none';
	div.innerHTML = add;
}, false);
if(add.length<=max_length) div.innerHTML = add; else div.appendChild(a);
div.setAttribute('style', 'position:fixed; bottom:0; left:'+window.innerWidth/3+'px; border:2px dotted #f00; background:#000; color:#ddd; padding:2px; z-index:99999;');
div.id = 'html_comments';
div.addEventListener('dblclick', function(){this.parentNode.removeChild(this);}, false);
document.body.insertBefore(div, document.body.firstChild);