//23456789012345678901234567890123456789012345678901234567890123456789012345678901
// 2009-dec-21 (removed 95% of the transparency, added alternating colors, added last post )
// future : fix butons placement, bring back the bioware topics pick in a better format, bring back "last post by", fix margins
// --------------------------------------------------------------------
scr_meta=<><![CDATA[ // metadata start
// ==UserScript==
// @name           meTweak
// @version        0.9
// @namespace      http://userscripts.org/scripts/show/63312
// @description    Improves the forum interface for the Mass effect 2 forums
// @include        http://meforums.bioware.com/*
// ==/UserScript==
]]></>.toString();   // metadata end
// --INSTALLATION-----------------------------------------------
// This is a Greasemonkey user script. To install it, you need to install Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit: http://userscripts.org/scripts/show/63312

// Copyright (c) 2009, CodeQuantum.com (Username Sarakinoi on the forums)
// Released under the GPL license : http://www.gnu.org/copyleft/gpl.html
// Mozilla Add-ons GUID : {/}

(function() {

var css = ''+
'body{'+
'/*background-attachment: fixed !important;*/'+
'}'+
'.item-table, .gp-contents img, .forumdescription, .opt-contents p.smalltext, #last-post br{'+
'display:none !important;'+
'}'+
'.gp-contents .opt-contents img{'+
'display:inline !important;'+
'}'+
'.newtopic{'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.opt{'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.gp-title{ /*top title in content area*/'+
'border: 1px none #000000 !important;'+
'border-bottom: 1px solid rgba(0, 0, 0, 0) !important;'+
'border-top: 1px solid #000000 !important;'+
'background: rgba(30, 30, 30, 0.95) !important;'+
'}'+
'.gp-contents { /*content area*/'+
'/*background: none !important;*/'+
'border: 1px none #000000 !important;'+
'border-top: 1px solid rgba(0, 0, 0, 0) !important;'+
'background: rgba(30, 30, 30, 0.95) !important; /*note:keep same value as gp-title*/'+
'width:771px !important;'+
'margin:0px !important;'+
'padding:0px !important;'+
'font-family: Arial, Helvetica, sans-serif !important;'+
'}'+
'.opt-width-twothirds{'+
'background: none !important;'+
'width: 770px !important;'+
'float: left;'+
'/*border: 1px solid #ff0000 !important;*/'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'/* .maintable, */'+
'.opt-contents{'+
'background: none !important;'+
'text-align: left !important;'+
'width:769px !important;'+
'/*border: 1px solid #0f0000 !important;*/'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.opt-contents table{'+
'background: none !important;'+
'/*border: 1px solid #00ffff !important;*/'+
'margin:0px 7px !important;'+
'padding:0px !important;'+
'width:758px !important;'+
'}'+
'.opt-contents table table{'+
'background: none !important;'+
'border: 1px none #00ffff !important;'+
'width:auto !important;'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.forumtable{'+
'background: none !important;'+
'border: 1px none #00ffff !important;'+
'width:auto !important;'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.opt-contents table table td{ /*body of the posts/forums table*/'+
'background: rgba(15, 15, 15, 0.9) !important;'+
'}'+
'h2{'+
'font-size: 0.9em !important;'+
'display:inline !important;'+
'clear:none !important;'+
'margin: 0px !important;'+
'padding:0px 5px !important;'+
'float:left !important;'+
'position: relative !important;'+
'display:inline !important;'+
'left: 10px;'+
'top: 4px;'+
'}'+
'p.gp-title-navtrail {'+
'font-size: 0.9em;'+
'position: relative !important;'+
'display:inline !important;'+
'left: 10px;'+
'top: 5px;'+
'margin: 0;'+
'float:left !important;'+
'}'+
'p.gp-title-navtrail a{'+
'color:#000000 !important;'+
'background: rgba(255, 255, 255, 0.7) !important;'+
'padding: 0px 3px;'+
'}'+
'.gp-title{'+
'float:left !important;'+
'}'+
'.opt-title{'+
'display:none !important;'+
'}'+
'#forums-buttons, #forums-buttons tr, #forums-buttons td{'+
'/*display:none !important;*/'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.newtopic {'+
'margin-right: auto !important;'+
'margin-left: auto !important;'+
'text-align:center !important;'+
'margin:0px !important;'+
'padding:0px !important;'+
'}'+
'.newtopic a{'+
'display:block !important;'+
'width:150px;'+
'margin-right: auto !important;'+
'margin-left: auto !important;'+
'text-align:center !important;'+
'margin:0px !important;'+
'padding-top:12px !important;'+
'}'+
'.topicuname{'+
'display:inline !important;'+
'}'+
'.smalltext + br {'+
'display:none !important;'+
'}'+
'.smalltext > a:first-child{'+
'font-family: Arial, Helvetica, sans-serif !important;'+
'padding-right:4px !important;'+
'text-decoration:none !important;'+
'color: #ccc !important;'+
'clear:right !important;'+
'display:block !important;'+
'font-size: 1.4em;'+
'}'+
'.smalltext:first-child a:visited{'+
'color: #777 !important;'+
'}'+
'.smalltext:first-child a:hover{'+
'color: #fff !important;'+
'text-decoration:underline !important;'+
'}'+
'#last-post, #col-lastpost{'+
'/*display:block !important;'+
'background:rgba(64, 20, 20, 1) !important;*/'+
'}'+
'#last-post img, #last-post a{'+
'display:inline !important;'+
'}'+
'.opt-contents table table td.forumcolor1{/*alternating post-titles colors*/'+
'background: rgba(20, 20, 20, 1) !important;'+
'}'+
'.opt-contents table table td.forumcolor2{'+
'background: rgba(15, 15, 15, 1) !important;'+
'}'+
'.opt-contents > p > span.smalltext > a{'+
'/*display:none !important;*/'+
'clear:none !important;'+
'display:inline !important;'+
'}'+
'.gp-contents td.vtclass1{ /*forum post body*/'+
'background: rgba(40,44,48, 0.95) !important;'+
'}'+
'.gp-contents td.vtclass2{'+
'background: rgba(14,14,14, 0.95) !important;'+
'}'+
'img[name=forumsreply], img[name=forumsnewtopic]{'+
'margin:12px !important;'+
'}'

; // css end

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

//

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='gp-contents']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.innerHTML = thisDiv.innerHTML.replace(/Sticky\s*:/gi, "");
	thisDiv.innerHTML = thisDiv.innerHTML.replace(/<p>&nbsp;<\/p>/gi, ""); //too much space between forum titles step 1
	///thisDiv.innerHTML = thisDiv.innerHTML.replace(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/gi, "666");
	//thisDiv.innerHTML = thisDiv.innerHTML.replace(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}\s*[0-9]{2}:[0-9]{2}\s* /gi, "666");
	//thisDiv.innerHTML = thisDiv.innerHTML.replace(/(id="last-post"><span class="smalltext">)[0-9]{2}\/[0-9]{2}\/[0-9]{2}\s*[0-9]{2}:[0-9]{2}\s*(<a[^>]+>)\s*<img[^>]+>\s*<\/a>\s*<br \/>\s*([^<]*)\s*<\/span>/gi, /$1$2$3<\/a><\/span>/);
}

//

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '63312', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();