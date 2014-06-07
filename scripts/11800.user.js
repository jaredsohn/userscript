// JSON Formatter
// version 0.1 BETA!
// 8/29/2007
// Copyright (c) 2007, Ian D. Miller
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "JSON Formatter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JSON Formatter
// @namespace     http://yawmp.com/
// @description   JSON (JavaScript Object Notation) formatter: makes it easier to read JSON documents
// @include       http://*/*
// ==/UserScript==

window.addEventListener("load", function(e) {
GM_xmlhttpRequest({
	method:"GET", url:location.href, headers:{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
	},
	onload:function(details) {
		if (details.responseText.substring(0,1) != '{' && details.responseText.substring(0,1) != '['){
			return false;
		}

		eval('var page = '+details.responseText);
		this.nl = "\n\r";
		this.tab = '    ';
		this.str = "{" + this.nl;
		this.walk(page);
		this.write_doc();
	},
	walk:function(content){
		for (i in content){
			if (typeof content[i] == 'object') {
				this.str += this.tab + i + " {" + this.nl;
				this.tab += '    ';
				this.walk(content[i]);
			} else {
				this.str += this.tab + i + ' : ' + content[i] + this.nl;
			}
		}
		this.tab = this.tab.substring(0,this.tab.length-4);
		this.str += this.tab + "}" + this.nl;
	},
	write_doc:function(){
		console.debug(this.str);

 		document.body.innerHTML = this.str;
	}
});
}, false);
