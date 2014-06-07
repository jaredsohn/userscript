// ==UserScript==
// @name           vBulletin remember last page
// @namespace      http://lunrfarsde.blogspot.com
// @description    If another page was visited before in a thread and page parameter is not specified, redirects to the last visited page
// @include        http://*/showthread.php*
// ==/UserScript==

function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s) return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; }
}

function queryString(key){
	var page = new PageQuery(window.location.search);
	return unescape(page.getValue(key));
}

var t = queryString('t');
if (t!='false') {			//!assume we are in vBulletin
	var page = queryString('page');
	if (page=='false'){
		var newPage = GM_getValue(t, 1);
		if (newPage!=1)	{
			window.location.href = window.location.href + '&page=' + newPage;	
		}
	}
	else {
		GM_setValue(t, page);
	}
}