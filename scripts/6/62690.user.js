// BioTweak : An interface tweak for the Bioware forums
// version 0.5.1
// 2009-nov-23
// Copyright (c) 2009, CodeQuantum.com (Username Sarakinoi on the forums)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.

// Mozilla Add-ons GUID : {5bce2861-53d0-4ddf-b047-1f07d84f67e8}

scr_meta=<><![CDATA[ // metadata start
// ==UserScript==
// @name           bioTweak
// @namespace      http://userstyles.org/styles/22783
// @description    Improves the forum interface
// @include        http://social.bioware.com/forum/*
// ==/UserScript==
]]></>.toString();   // metadata end

//

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.innerHTML = thisDiv.innerHTML.replace(/<br><br><br><br>/gi, "<br><br>");
	thisDiv.innerHTML = thisDiv.innerHTML.replace(/<br><br><br>/gi, "<br><br>");
	thisDiv.innerHTML = thisDiv.innerHTML.replace(/<span class="title">Post in <\/span>/gi, " ");
}

(function() {

var css = ''+
'#userinfo_block, .badge, #sidebar, .moderators, div .SEPForumInstanceHeader, .forum_rss_link, .topicItem .subline, .category .subline {'+
'	display : none !important;'+
'}'+
'.SEPPosts td textarea, td form textarea {'+
'	height:250px !important;'+
'	color: #000 !important;'+
'	font-family:tahoma,arial,serif !important;'+
'	font-size:12pt !important;'+
'	padding:6px !important;'+
'}'+
'#content {'+
'	padding:0px;'+
'	text-align:left;'+
'	margin-top:0px !important;'+
'	margin-left:7px !important;'+
'	width:970px !important;'+
'}'+
'table.SEPForumCategoriesOverview .parentCategoryMiddleLeft, table.SEPPosts, div .content_headline, div .content_headline > span {'+
'	/*border: 1px solid #FF66FF;*/'+
'	/*display : none !important;*/'+
'	background-color: #323232!important;'+
'	background-image: none !important;'+
'}'+
'.testtt {'+
'	border: 1px solid #fff000;'+
'	/*display : none !important;*/'+
'}'+
'div .roundbox_head > span, div .roundbox_head, div .roundbox_foot > span, div .roundbox_foot, .parentCategoryTopMiddle, .parentCategoryTopRight, .parentCategoryTopLeft, .parentCategoryBottomMiddle, .parentCategoryBottomLeft, .parentCategoryBottomRight {'+
'	/*border: 1px solid #fff000;*/'+
'	display : none !important;'+
'	background-color: #323232!important;'+
'	background-image: none !important;'+
'}'+
'div, td {'+
'	font-family:tahoma,arial,serif !important;'+
'	font-size:8pt !important;'+
'/* color:#eee !important; */'+
'}'+
'div .SEPForumTextOutput {'+
'	font-family:tahoma,arial,serif !important;'+
'	font-size:10pt !important;'+
'/*	color:#fff !important; */'+
'}'+
'.title {'+
'	font-weight:normal!important;'+
'	color:#f47373;'+
'	font-size:9pt !important;'+
'	font-family: arial, serif !important;'+
'}'+
'.SEPForumPagination, .SEPForumPagination td {'+
'	padding: 0px !important;'+
'	margin-top: 0px !important;'+
'	margin-right: 0px !important;'+
'	margin-bottom: 3px !important;'+
'	margin-left: 0px !important;'+
'}'+
'.forum_mainactions, .forum_breadcrumb {'+
'	padding: 0px !important;'+
'	margin-top: 6px !important;'+
'	margin-right: 0px !important;'+
'	margin-bottom: 0px !important;'+
'	margin-left: 0px !important;'+
'}'+
'.forum_breadcrumb{'+
'	border-bottom: none !important;'+
'	font-size: 9pt !important;'+
'}'+
'.forum_mainactions .button {'+
'	padding-top : 6 !important;'+
'}'+
'table.SEPForumTopicsOverview .background1 td {'+
'	background:#323232 !important;'+
'}'+
'table.SEPForumTopicsOverview .background2 td {'+
'	background:#3a3a3a !important;'+
'}'+
'.topicItem td {'+
'	padding-top : 3px !important;'+
'	padding-bottom : 3px !important;'+
'}'+
'/* all topic title images - left icon included */'+
'.topicItem a img {'+
'	/*display:none*/;'+
'	width:30px !important;'+
'	height:30px !important;'+
'	padding:0px !important;'+
'	margin:0px !important;'+
'}'+
'/* both right side images, avatar + arrow to last post */'+
'.topicItem .clearTable a img {'+
'	display:inline;'+
'	width:16px !important;'+
'	height:16px !important;'+
'	padding:0px !important;'+
'	margin:0px !important;'+
'}'+
'/* small avatar countainer*/'+
'div.small_photo, div.avatar {'+
'	background-image: none !important;'+
'	background: #000 !important;'+
'	width:33px !important;'+
'	height:33px !important;'+
'	padding:0px !important;'+
'	margin:0px !important;'+
'	text-align:center;'+
'}'+
'/* avatar countainer left of forum posts */'+
'.SEPForumAvatarThumb .avatar, .SEPForumAvatarThumb {'+
'	/*background-image: none !important;'+
'	background: #800000 !important;*/'+
'	border-style: none !important;'+
'	margin-right: auto !important;'+
'	margin-left: auto !important;'+
'	background-color: #fff000 !important;'+
'	background-image: url(http://www.codequantum.com/bioTweak/avatar-bg.jpg) !important;'+
'	background-repeat: no-repeat;'+
'	background-position: center center;'+
'	/*width:98px !important;*/'+
'	width:98px !important;'+
'	height:98px !important;'+
'	overflow:hidden;'+
'	text-align:center;'+
'	padding:0px !important;'+
'	margin:0px auto !important;'+
'	text-align:center;'+
'}'+
'/* avatar image left of forum posts */'+
'.SEPForumAvatarThumb .avatar img {'+
'	/*width:64px !important;*/'+
'	/*height:64px !important;*/'+
'	padding:0px !important;'+
'	margin:0px !important;'+
'}'+
'/* small avatar on the right side of topics 146x146px original size */'+
'.topicItem .clearTable a img.small_photo, img.small_photo {'+
'	width: 31px !important;'+
'	height: 31px !important;'+
'	margin: 1px !important;'+
'}'+
'.clearTable br  {'+
'	display:none !important;'+
'} '+
'.clearTable a  {'+
'	/*display:none !important; */'+
'	margin-right: 3px !important;'+
'}'+
'.pageItem {'+
'	padding:3px 5px;margin:5px 2px;cursor:pointer;'+
'	border: 1px solid #363636;'+
'}'+
'.pageItem:hover {'+
'	color: #363636 !important;'+
'	text-decoration:none;'+
'	background: #fff !important;'+
'}'+
'body#page_body {'+
'    background-image: URL(/images/themes/dragonage/middle01.jpg);'+
'    background-position: center top;'+
'    background-color: black;'+
'}'+
'#topbar{'+
'    background-image: URL(http://files.bioware.com/social/images/themes/dragonage/da_header_background.jpg);'+
'    background-color: white;'+
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

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '62690', // Script id on Userscripts.org
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