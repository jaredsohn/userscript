// ==UserScript==
// @name           Seti@home_CSS
// @namespace      http://userscripts.org/users/71563
// @description    CSS for Seti@home
// @include        http://setiathome.berkeley.edu/results.php?*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.row0pending { background-color: #ffd9d9; text-align: left;}');

addGlobalStyle('.row1pending { background-color: #ffeeee; text-align: left;}');

addGlobalStyle('.row0--- { background-color: #99ffff; text-align: left;}');

addGlobalStyle('.row1--- { background-color: #ccffff; text-align: left;}');

addGlobalStyle('.row0 { background-color: #ccffcc; text-align: left;}');

addGlobalStyle('.row1 { background-color: #99ffcc; text-align: left;}');

function changeClass(trStatus){
	var allLinks, thisLink, thisClass, query;
	query = '//tr//td[position()=last()][contains(text(),"' + trStatus + '")]';
	allLinks = document.evaluate(
		query,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		thisClass = thisLink.parentNode.getAttribute('class');
		// if (thisClass.search(trStatus) == -1)
			thisLink.parentNode.setAttribute('class',thisClass + trStatus);
	}
}

changeClass('pending');
changeClass('---');
