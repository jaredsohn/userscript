var GMSU_meta_61561 = <><![CDATA[
// ==UserScript==
// @name          USO Script Favorites Xtra Links
// @description   Adds links to view the source and install to each script in the favorites view
// @version       1.0.3
// @author        Izzy (http://userscripts.org/users/izzysoft)
// @namespace     http://projects.izzysoft.de/
// @include       http://userscripts.org/home/favorites*
// @include       http://userscripts.org/scripts*
// @include       http://userscripts.org/tags/*
// @require       http://userscripts.org/scripts/source/51513.user.js
// @history       1.0.3 include support for /tags and /script (incl. search) pages
// @history       1.0.2 added better formatting for table rows
// @history       1.0.1 minor change: make sure to have the links on top of the table row - i.e. next to the scripts title, not magled with their description: more space here.
// @history       1.0.0 initial version (just providing the additional links)
// ==/UserScript==
]]></>;

function nextTD(cell) {
  cell = cell.nextSibling;
  while ( (!cell.tagName || cell.tagName.toLowerCase()!='td') && cell.nextSibling ) cell = cell.nextSibling;
  return cell;
}

rows = document.evaluate('//td[@class="script-meat"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (rows.snapshotLength>0) {
	for (var i=0;i<rows.snapshotLength;i++) {
		var scriptID = /scripts-(\d+)/.exec(rows.snapshotItem(i).parentNode.id)[1];

		// Add links
		var sourceLink = document.createElement('a');
		sourceLink.href = 'http://userscripts.org/scripts/review/' +scriptID;
		sourceLink.innerHTML = 'view source';
		var dlLink = document.createElement('a');
		dlLink.href = 'http://userscripts.org/scripts/source/' +scriptID +'.user.js';
		dlLink.innerHTML = 'install';
		var span = document.createElement('span');
		span.setAttribute('style','float:right;margin-right:5px;');
		span.appendChild(sourceLink);
		span.appendChild(document.createTextNode(' | '));
		span.appendChild(dlLink);
		el = rows.snapshotItem(i).getElementsByClassName('desc')[0];
		el.parentNode.insertBefore(span,el);

		// adjust table cell format
		var cell = nextTD(rows.snapshotItem(i)); // rating
		cell.setAttribute('style','text-align:center;');
		cell = nextTD(cell); // posts
		cell.setAttribute('style','text-align:right;');
		cell = nextTD(cell); // fans
		cell.setAttribute('style','text-align:right;');
		cell = nextTD(cell); // installs
		cell.setAttribute('style','text-align:right;');
		cell = nextTD(cell); // last updated
		cell.setAttribute('style','text-align:center;');
	}
	var lu = document.getElementsByClassName('wide forums')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[5];
	lu.style.width = lu.getElementsByTagName('a')[0].offsetWidth+5+'px'; // resize "last updated" col
}

GMSU.init(61561);