// Ta-da List Enhancements
// version 0.6
// 2005-07-28
// Copyright (c) 2005, Rich Manalang (http://manalang.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This script resides at http://manalang.com/greasemonkey/ta-da_list.user.js
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ta-Da List Enhancements", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ta-Da List Enhancements
// @description	  Shows your lists within the list view
// @namespace     http://manalang.com/greasemonkey
// @include       http://*.tadalist.com/lists/show/*
// @include       http://*.tadalist.com/lists/all
// ==/UserScript==

(function() {
	function getCookie(name) {
		  var re = new RegExp(name + "=([^;]+)");
		var value = re.exec(document.cookie);
		return (value != null) ? unescape(value[1]) : null;
	}
	function setCookie(name, value) {
		var today = new Date();
		// plus 28 years
		var expiry = new Date(today.getTime() + 28 * 365.24 * 24 * 60 * 60 * 1000);   
		document.cookie = name + "=" + escape(value) +
			"; expires=" + expiry.toGMTString() +
			"; path=/";
	}
	window.tadaSortByNumber = function() {
		ulmylistsxpath = '//ul[@id="mylists"]';
		ulmylists = document.evaluate(ulmylistsxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		liopen = ulmylists.snapshotItem(0).getElementsByTagName('li');
		liidx = new Array(Array());
		for (i=0; i<liopen.length; i++) {
			numItems = liopen[i].getElementsByTagName('strong')[0].innerHTML.split(' ')[0];
			liidx[i] =[numItems, liopen[i]];
		}
		if (window.tadaSortOrder == "asc") {
			if (window.tadaSortOrder!="desc") setCookie("tadasort","desc");
			window.tadaSortOrder = "desc";
			liidx.sort(ascending);
		} else {
			if (window.tadaSortOrder!="asc") setCookie("tadasort","asc");
			window.tadaSortOrder = "asc";
			liidx.sort(descending);
		}		
		ulmylists.snapshotItem(0).innerHTML = "";
		for (j=0; j<liidx.length; j++) {
			ulmylists.snapshotItem(0).appendChild(liidx[j][1]);
		}
	}
	window.tadaSortByAlpha = function() {
		if (window.tadaSortOrder == "asc" || window.tadaSortOrder == "desc") setCookie("tadasort","alpha");
		var ulmylistsxpath = '//ul[@id="mylists"]';
		var ulmylists = document.evaluate(ulmylistsxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var liopen = ulmylists.snapshotItem(0).getElementsByTagName('li');
		var liidx = new Array(Array());
		for (i=0; i<liopen.length; i++) {
			listTitle = liopen[i].getElementsByTagName('a')[0].innerHTML;
			liidx[i] =[listTitle, liopen[i]];
		}
		liidx.sort();		
		ulmylists.snapshotItem(0).innerHTML = "";
		for (j=0; j<liidx.length; j++) {
			ulmylists.snapshotItem(0).appendChild(liidx[j][1]);
		}
	}
	if (location.pathname != "/lists/all") {
		url="/lists/all";		
		var http = getHTTPObject();
		http.open("GET", url, true);
		http.onreadystatechange = function() {
  			if (http.readyState==4) processResult(http)
  		};
		http.send(null);
	} else {
		sortTools = 'Sort by: <a class="admin" href="javascript:void 0;" onclick="tadaSortByAlpha()">Alpha</a> | ';
		sortTools += '<a class="admin" href="javascript:void 0;" onclick="tadaSortByNumber()">Items left</a>';
		toolsSpan = document.createElement("span");
		toolsSpan.innerHTML = sortTools;
		toolsSpan.setAttribute('id','sort-tools');
		divleftxpath = '//div[@class="Left"]';
		divleft = document.evaluate(divleftxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		divleft.snapshotItem(0).insertBefore(toolsSpan, divleft.snapshotItem(0).firstChild);
		window.tadaSortOrder = getCookie("tadasort");
		sortResults();
		addGlobalStyle('.Left {position:relative} '
			     + '#sort-tools {font-size:11px; color:#666; position:absolute; top:13px; right:70px}');
		
	}
	function getHTTPObject() {
	  var xmlhttp;
	  /*@cc_on
	  @if (@_jscript_version >= 5)
	    try {
	      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	      try {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (E) {
	        xmlhttp = false;
	      }
	    }
	  @else
	  xmlhttp = false;
	  @end @*/
	  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	    try {
	      xmlhttp = new XMLHttpRequest();
	    } catch (e) {
	      xmlhttp = false;
	    }
	  }
	  return xmlhttp;
	}
	function processResult(r) {
		out = r.responseText;
		b = out.indexOf('<div class="recent">');
		e = out.indexOf('<div class="completedlists">', b);
		if (e < b) e = b;
		e = out.indexOf('</div>', e) + 6;
		sortTools = '<span id="sort-tools">Sort by: <a class="admin" href="javascript:void 0;" onclick="tadaSortByAlpha()">Alpha</a> | ';
		sortTools += '<a class="admin" href="javascript:void 0;" onclick="tadaSortByNumber()">Items left</a></span>';
		newList = '<a class="admin" href="/list_management/new">Create a new list</a><br/><br/>';
		lists = document.createElement("div");
		lists.innerHTML = sortTools + out.substring(b,e) + newList;
		divsidebarxpath = '//div[@class="Sidebar"]';
		divsidebar = document.evaluate(divsidebarxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		divsidebar.snapshotItem(0).insertBefore(lists, divsidebar.snapshotItem(0).firstChild);
		sortResults();
		addGlobalStyle('.Sidebar {position:relative} '
			     + '#sort-tools {font-size:11px; color:#666; position:absolute; top:23px; right:0}'
			     + '#mylists {margin-top:20px}');
	}
	function sortResults() {
		window.tadaSortOrder = "";
		if (getCookie("tadasort")!="alpha") {
			tadaSortByNumber();
		} else {
			tadaSortByAlpha();
		}
	}
	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
	function ascending(a,b) { return a[0] - b[0] }
	function descending(a,b) { return b[0] - a[0] }
})();
