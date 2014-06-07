// ==UserScript==
// @name          FORM Tooltips
// @namespace     http://diariolinux.com
// @description	  For all input boxes in a form, put the title content as input's name
// @include       *
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('input');
for (var j=0; j<i.length; j++) {
	if (''==i[j].title) i[j].title=i[j].name;
}
})();
