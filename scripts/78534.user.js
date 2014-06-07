// ==UserScript==
// @name           Google Highlighter
// @namespace      dodgy_gr
// @include        http://www.google.*/search?*
// @include        http://*.google.*/images?*
// @history	   first release
// ==/UserScript==

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//MODIFY THIS LINE TO YOUR DOMAIN
var domainSearch = /somedodgywebsite/;

//Choose Color for background highlighting.
const myHighlight = 'pink';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//getElementsByCLassName by Stephen Chapman, http://javascript.about.com/library/bldom08.htm
document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
};

function highlightClass(className) {
	var cites = document.getElementsByClassName(className);
	for (var i=0;i<cites.length;i++) {
		if (cites[i].firstChild && domainSearch.test(cites[i].firstChild.innerHTML)) {
			cites[i].style.backgroundColor = myHighlight;
		}
	}
}

if (location.pathname=='/images') highlightClass('a');
if (location.pathname=='/search') highlightClass('f');