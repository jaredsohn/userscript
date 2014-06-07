// ==UserScript==
// @name		Userscripts.org Improved Pagination
// @author		Erik Vold
// @license MPL 2.0
// @datecreated	2009-10-22
// @lastupdated	2013-07-13
// @namespace	usoImprovedPagination
// @include		http://userscripts.org/*
// @version		0.1.1
// @homepageURL http://userscripts.org/scripts/show/60307
// @description	This userscript will improve the pagination at userscripts.org by adding a first and last page link.
// ==/UserScript==

var usoImprovedPagination={
	init:function(){
		var pginAry=document.getElementsByClassName("pagination");
		for(var i=0;i<pginAry.length;i++){
			this.updatePagination(pginAry[i]);
		}
	},
	updatePagination:function(div){
		var prevPg=div.getElementsByClassName("prev_page")[0];
		if(!prevPg) return;
		var nextPg=div.getElementsByClassName("next_page")[0];
		if(!nextPg) return;

		var lastPg=nextPg.previousSibling,blankNode;
		if ( !lastPg.tagName || (lastPg.tagName.toLowerCase()!='a' && (lastPg.tagName.toLowerCase()!='span' || (lastPg.tagName.toLowerCase()=='span' && lastPg.className && lastPg.className!='current'))) ) {
			lastPg=lastPg.previousSibling;
			if ( !lastPg.tagName || (lastPg.tagName.toLowerCase()!='a' && (lastPg.tagName.toLowerCase()!='span' || (lastPg.tagName.toLowerCase()=='span' && lastPg.className && lastPg.className!='current'))) )
				return;
		}

		var firstPgEle, lastPgEle, create1st=true, createLast=true;
		if(prevPg.className.match(/disabled/i)){
			create1st=false;
			firstPgEle=prevPg;
		}
		else if(nextPg.className.match(/disabled/i)){
			createLast=false;
			lastPgEle=nextPg;
		}

		if(create1st){
			firstPgEle=document.createElement("a");
			firstPgEle.href=(prevPg.href+"").replace(/page=\d+/gi,"page=1");
			div.insertBefore(firstPgEle,prevPg);
			div.insertBefore(document.createTextNode(' '),prevPg);
		}

		if(createLast){
			lastPgEle=document.createElement("a");
			lastPgEle.href=(nextPg.href+"").replace(/page=\d+/gi,"page="+lastPg.innerHTML);
			div.insertBefore(lastPgEle,nextPg.nextSibling);
			div.insertBefore(document.createTextNode(' '),nextPg.nextSibling);
		}

		prevPg.innerHTML="&lsaquo; Prev";
		nextPg.innerHTML="Next &rsaquo;";
		firstPgEle.innerHTML="&laquo; First";
		lastPgEle.innerHTML="Last &raquo;";
	}
}
usoImprovedPagination.init();