// ==UserScript==
// @name        FreshNews Dark and Clean Theme
// @namespace   http://userscripts.org/scripts/show/144583
// @description Clean up and enhance the display of news using a dark theme
// @include     http://www.freshnews.org/
// @version     1.0.1
// @grant		none
// ==/UserScript==
/* 
	Originally written by riser

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'body {' +
'  background: #222222;' +
' }' +
' ' +
'.news-block {' +
'  color: #DDDDDD;' +
'  background: #222222;' +
' }' +
' ' +
'.news-block a:link, ' +
'.news-block a:visited {' +
'  color: #DDDDDD;' +
' }' +
' ' +
'.news-block a:hover {' +
'  color: #DDDDDD;' +
'  background: #666666;' +
' }' +
' ' +
'.news-block-items {' +
'  background: #000000;' +
'  color: #DDDDDD;' +
' }' +
' ' +
'.news-block-title a:link, ' +
'.news-block-title a:visted {' +
'  color: #EEEEEE;' +
'  background: #CC9900;' +
' }' +
' ' +
'.news-block-title a:hover {' +
'  color: blue;' +
'  background: #CC9900;' +
' }' +
' ' +
'.container {' +
'  padding-left: 5px;' +
'  padding-right: 5px;' +
' }' +
' ' +
'.fourcol {' +
'  width: 32.333%;' +
'  margin-left: 0.5%;' +
'  margin-right: 0.5%;' +
' }' +
' ' +
'.row {' +
'  max-width: 1280px;' +
' }' +
' ' +
'div.notice {' +
'  position: absolute;' +
'  top: -100px;' +
'}');

function remove_meta_links() {
	var allLinks, thisLink;
		allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var j = 0;
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.href.match(/detach|remove/i)) {
			thisLink.parentNode.removeChild(thisLink);
		 }	
	}
}

function remove_div(id) {
	var divID = document.getElementById(id);
	if (divID) {
		divID.parentNode.removeChild(divID);
	}
}

function add_toggle() {
	var allHeads, thisHead;
		allHeads = document.evaluate(
		'//div[@id=\'table_head\']',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allHeads.snapshotLength; i++) {
		thisHead = allHeads.snapshotItem(i);
		var chk = document.createElement('input');
		chk.type = 'checkbox';
		chk.id = i;
		chk.defaultChecked = false;
		chk.onclick = function() { if (chk.checked) { alert(this.parentNode.nextSibling.value); } else { alert(this.parentNode.nextSibling.id); } }
		thisHead.appendChild(chk);
	}
}

add_toggle();
remove_meta_links();
remove_div('footer');
remove_div('submenu');