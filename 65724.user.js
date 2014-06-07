// ==UserScript==
// @name		Jetpack Gallery Improved Pagination
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-04
// @lastupdated	2010-01-04
// @namespace	jpgImprovedPagination
// @include		http://jetpackgallery.mozillalabs.com/*
// @match		http://jetpackgallery.mozillalabs.com/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will improve the pagination on the Jetpack Gallery
// ==/UserScript==

(function(){
	var doc=document,
		pagination=doc.evaluate("//aside/ul/li[contains(@class,'current')]",doc,null,9,null).singleNodeValue;
	if(!pagination) return;
	pagination=pagination.parentNode;

	var li=doc.evaluate("./li",pagination,null,7,null),
		firstLi=li.snapshotItem(0),
		lastLi=li.snapshotItem(li.snapshotLength-1),
		firstLiA=doc.evaluate("./a",firstLi,null,9,null).singleNodeValue,
		lastLiA=doc.evaluate("./a",lastLi,null,9,null).singleNodeValue,
		firstPgLi=doc.createElement("li"),
		lastPgLi=doc.createElement("li"),
		temp,
		onFirstPg=(firstLiA.innerHTML.toString().match(/prev/gi)) ? false : true,
		onLastPg=(lastLiA.innerHTML.toString().match(/next/gi)) ? false : true;
	if (!onFirstPg) {
		temp=doc.createElement("a");
		temp.innerHTML="&laquo; First";
		temp.href=lastLiA.href.replace(/page=\d+/gi,"page=1");
		firstPgLi.appendChild(temp);

		firstLiA.innerHTML = "&lsaquo; Prev";
		pagination.insertBefore(firstPgLi,firstLi);
		pagination.insertBefore(doc.createTextNode(" "),firstLi);
	}
	if (!onLastPg) {
		temp=doc.createElement("a");
		temp.innerHTML="Last &raquo";
		temp.href=lastLiA.href.replace(/page=\d+/gi,"page="+doc.evaluate("./a",li.snapshotItem(li.snapshotLength-2),null,9,null).singleNodeValue.innerHTML);
		lastPgLi.appendChild(temp);

		lastLiA.innerHTML = "Next &rsaquo;";
		pagination.appendChild(lastPgLi);
	}

	var insertNode=pagination.parentNode.parentNode,
		b4Node=doc.evaluate("./nav",pagination.parentNode.parentNode,null,9,null).singleNodeValue.nextSibling;
	insertNode.insertBefore(
		pagination.parentNode.cloneNode(true),
		b4Node
	);
	insertNode.insertBefore(
		doc.createElement("br"),
		b4Node
	);
})();