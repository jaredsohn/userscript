// Youtube HTML Valid
// version 0.5.1 !
// 05-05-2008
// Original bookmarklet  by Andrea Micheloni: http://miche.netsons.org/how-to-write-a-bookmarklet.html
//  modified into a Greasemonkey  user script by gialloporpora: http://www.gialloporpora.altervista.org
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Youtube HTML Valid", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Youtube HTML Valid (with clipboard copy)
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description Replace the HTML code used to embed a Youtube video with valid HTML code. This version implement autocopy using a Flash script.
// @include        http://*youtube.com/watch?*
// ==/UserScript==

(function()
{
	function copyToClipboard(texttocopy) {
		// if you would like to host the file  _clipboard.swf in you own server you need to change is location address
		  var clipboardswfpath="http://www.gialloporpora.netsons.org/script/_clipboard.swf";
		 var flashcopier = 'flashcopier';
		if(!document.getElementById(flashcopier)) {
			var divholder = document.createElement('div');
			divholder.id = flashcopier;
			document.body.appendChild(divholder);
    }
		document.getElementById(flashcopier).innerHTML = '';
		var divinfo = '<embed src="'+clipboardswfpath+'"  FlashVars="clipboard='+encodeURIComponent(texttocopy)+'" width="0" height="0"></embed>';
		document.getElementById(flashcopier).innerHTML = divinfo;
}
function Valid_HTML_Listener()
{
	this.select();
	copyToClipboard(this.value);
}
function g(n)
{
	var rg="[\\?&]"+n+"=([^&#]*)";
	var r=new RegExp(rg);
	 var s = r.exec(window.location.href);
	 if(s==null)return "Ã‚Â§";else return s[1];
}
	  
var m=g("v");
if (m!=""){
	var S="<object type=\"application/x-shockwave-flash\" data=\"http://www.youtube.com/v/"+m+"\" height=\"350\" width=\"425\"><param name=\"movie\" value=\"http://www.youtube.com/v/"+m+"\"/><param name=\"wmode\" value=\"transparent\"/></object>";
	var x=document.getElementById('embed_code');
	x.value=S;
	x.id='valid_html_code';
	x.name='valid_html_code';
	x.addEventListener('click',Valid_HTML_Listener,false);
	}
})()