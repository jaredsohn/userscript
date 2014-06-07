// ==UserScript==
// @name           EE v.10
// @namespace      EE
// @description    EE v.10 Expert interface: less white, less ugly, less images
// @include        http://www.experts-exchange.com/*
// @include        http://cms.l3.redsrci.com/*
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @grant GM_addStyle
// @grant GM_deleteValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setClipboard
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// ==/UserScript==
// Copyright (c) 2012-2014 Sjef Bosman
// Release 2.0.2
// Compatible with Firefox 23
var release= "2.0";
var changes= [];

GM_addStyle("#GM_config {width: 260px !important; height: 460px !important;z-index:9999!important}");

GM_registerMenuCommand( "EE v.10 Options", eev10Config, "o" );
GM_config.init("EE v.10 Options (V" + release + ")", "#GM_config .config_header {margin: -10px -8px 4px -8px; padding: 4px; font-size: 14px; background: #E0E0D0} .config_var input {float: right} #GM_config_field_DW,#GM_config_field_DB {width:50px} #GM_config textarea {font-size: 10px; width:100%; height:7em}",
	/* Fields object */
	{
		'DW':	{
			'label': 'Delta width', 'type': 'text', 'default': '250'
		},
		'Welcome':	{
			'label': 'Disable intro   ', 'type': 'checkbox', 'default': false
//		},
//		'EEple':	{
//			'label': 'Hide EEples', 'type': 'checkbox', 'default': true
		},
		'NW':	{
			'label': 'Alert when new version', 'type': 'checkbox', 'default': true
		},
		'Col2':	{
			'label': 'Hide right column', 'type': 'checkbox', 'default': false
		},
		'TE':	{
			'label': 'Hide Top Experts', 'type': 'checkbox', 'default': false
		},
		'Footer':	{
			'label': 'Hide footer', 'type': 'checkbox', 'default': false
		},
		'Reduce':	{
			'label': 'Allow negative delta\n(unsafe)', 'type': 'checkbox', 'default': false
		},
		'MenHor':	{
			'label': 'Horizontal menu', 'type': 'checkbox', 'default': false
		},
		'DB':	{
			'label': 'Delta menu button width', 'type': 'text', 'default': '-30'
		},
		'BL':	{
			'label': 'Askers tagged Black', 'type': 'textarea', 'default': ''
		},
		'GL':	{
			'label': 'Askers tagged Green', 'type': 'textarea', 'default': ''
		}
	}
);
GM_addStyle("body {font-family: verdana,univers,sans-serif !important}");
GM_addStyle(".ctCommentView .meta { margin-bottom: 2px;}");
GM_addStyle(".ctCommentView .comment-type { margin: 4px}");
GM_addStyle("div.content {padding-bottom: 2px !important}");
GM_addStyle(".ctContentView .body { background: white}");
//GM_addStyle(".questionCommentsView .solution .grade { top:0px!important}");
GM_addStyle("#col1 .component-alt-bg2 .body, #col1 .frcomponent-alt-bg2 .frsection { background: white !important}");

var reduce= GM_config.get("Reduce")==true;

var wdelta= (GM_config.get("DW")==""? 250: (+GM_config.get("DW")))-250;
var wdelta2= +wdelta+50;
var extra= 0;
if(GM_config.get("Col2")) {
	GM_addStyle("#col2Wrap {display:none!important}");
	extra= 275;
}
changeWidth('#bodyWrapper', wdelta);
changeWidth('#columnsWrapper', wdelta);

wdelta+= extra;
wdelta2+= extra;

var bdelta= GM_config.get("DB")==""? -30: (+GM_config.get("DB"));

//if(GM_config.get("EEple")!=false) {
//	GM_addStyle(".avatar, .eeple {display:none!important}");
//	changeWidth('.ctCommentView .comment-inner', wdelta2+50);
//} else
  changeWidth('.ctCommentView .comment-inner', wdelta-100);

if(GM_config.get("TE"))
	GM_addStyle("#topExperts {display:none!important}");
if(GM_config.get("Footer"))
	GM_addStyle("#footer {display: none}");

if(GM_config.get("MenHor")) {
	GM_addStyle("body {position: relative}");
	GM_addStyle(".pageShareAndManage {left: 0!important;margin:0 auto!important;top:220px!important;width:100%;border:0;position:absolute!important}");
	var nbuttons= document.getElementsByClassName("monitorWrapper first").length? 9: 8;
	GM_addStyle(".pageShareAndManage .body {width:"+(nbuttons*(110+bdelta))+"px;margin:0 auto!important;border: 1px solid #E5E5E5;border-radius: 5px 5px 5px 5px;}");
	GM_addStyle(".share-list,.manage-list {display: inline-block!important;}");
	GM_addStyle("#___plusone_0, #___plusone_0 iframe {height: 20px!important;}");
	GM_addStyle(".pageShareAndManage .share-list li, .pageShareAndManage .manage-list li {display: inline-block!important; margin:-3px;}");
	GM_addStyle(".pageShareAndManage .manage-list li a, .pageShareAndManage .email a, .pageShareAndManage .link a {padding: 10px 15px}");
	GM_addStyle("#bodyWrapper {margin-top:125px!important}");
	GM_addStyle(".pageShareAndManage li.google {margin-top:-4px}");
	GM_addStyle(".monitorWrapper.first {display:inline-block!important}");
	changeWidth('.pageShareAndManage .share-list li', bdelta);
	changeWidth('.pageShareAndManage .manage-list li', bdelta);
	var uc = document.getElementById('wrapper2');
	var psam = document.getElementById('pageShareAndManage');
	if(uc && psam)
		uc.appendChild(psam);
} //else
	//GM_addStyle('.pageShareAndManage { left:' + (489-wdelta/2) + "px !important}");

changeWidth('#col1Wrap', wdelta);
changeWidth("#col1 .component-alt-bg2, #col1 .frcomponent-alt-bg2", wdelta);
changeWidth("#col1 .component-alt-bg .body, #col1 .frcomponent-alt-bg .frbody", wdelta);
changeWidth("#col1 .component-alt-bg2 .body, #col1 .frcomponent-alt-bg2 .frsection", wdelta);
setRepeat("#col1 .component-alt-bg .body, #col1 .frcomponent-alt-bg .frbody", 'repeat-x');
changeWidth(".recentActivityUberFeed .section .content", wdelta2);
changeWidth(".questionCommentAdd", wdelta);
changeWidth(".frcomponent-alt-bg .ctCommentAdd", wdelta);
changeWidth(".questionCommentAdd .auto-close", wdelta);
changeWidth(".formatted-textarea", wdelta);
changeWidth(".formatted-textarea textarea", wdelta);
changeWidth(".formatted-textarea .controls", wdelta-18);
changeWidth(".ctContentView .trailing-meta, #post-preview .trailing-meta", wdelta-17);
setRepeat(".ctContentView .trailing-meta, #post-preview .trailing-meta", 'repeat');
changeWidth(".ctContentView .trailing-meta dl, #post-preview .trailing-meta dl", wdelta2);
setRepeat(".ctContentView .trailing-meta dl, #post-preview .trailing-meta dl", 'repeat-x');

changeWidth("#uberContainer .featuredArticleTA", wdelta);
changeWidth("#featuredArticleTA .body", wdelta);
changeWidth("#featuredArticleTA .section-1", wdelta);
changeWidth("#featuredArticleTA .section", wdelta/2-5);
changeWidth(".taPopWrap .taPopArticles", wdelta/2);
changeWidth(".taPopWrap .taPopQuestions", wdelta/2);
changeWidth(".ctCommentView .attachment .snippet", wdelta);
changeWidth("#col1 .ctCommentView .attachment, #col1 .ctCommentView .attachments", wdelta);
changeWidth(".attachment, .attachments", wdelta);
changeWidth(".attachment .snippet", wdelta);
changeWidth(".questionView .auto-close .heading span", wdelta);
changeWidth(".questionView .auto-close .heading", wdelta);
changeWidth(".questionView .auto-close .content", wdelta);
changeWidth(".questionCommentAdd .auto-close .heading span", wdelta);
changeWidth(".questionCommentAdd .auto-close .heading", wdelta);
changeWidth(".questionCommentAdd .auto-close", wdelta);
changeWidth("#col1 #post-preview .attachment", wdelta);
changeWidth("#col1 .btf-content .attachment .buttons", wdelta);


changeWidth(".searchResults .detail-view .article .content", wdelta);
changeWidth(".searchResults .detail-view .review .content", wdelta);
changeWidth(".searchResults .detail-view .question .content", wdelta);
changeWidth(".searchResults .detail-view .blog-post .content", wdelta);
changeWidth(".searchResults .detail-view .blog-entry .content", wdelta);
changeWidth(".recentActivityUberFeed .section .detail-view .product-review .content", wdelta);
changeWidth(".recentActivityUberFeed .section .detail-view .product-review-issue .content", wdelta);
changeWidth(".recentActivityUberFeed .section .detail-view .kbentry .content", wdelta);
changeWidth(".recentActivityUberFeed .searchResultsList .detail-view .stats", -wdelta+100);

//changeWidth("", wdelta);
//changeWidth("", wdelta);
//changeWidth("", wdelta);
//changeWidth("", wdelta);

/*
zReIndex();
*/
GM_addStyle(".pageShareAndManage .manage-list .monitor a {background-position: 4px -56px !important;}");
GM_addStyle(".pageShareAndManage .manage-list .monitor.monitoring span {text-indent: 0px;}");
GM_addStyle(".pageShareAndManage .monitor.monitoring { background: #E8FBC4 !important}");
GM_addStyle(".pageShareAndManage .monitor.not-monitoring { background: #ffc !important}");
GM_addStyle(".pageShareAndManage .share-list li, .responsive .pageShareAndManage .manage-list li {height:30px;}");
GM_addStyle(".pageShareAndManage li .the-widget {padding:6px 0 2px; text-indent:40px}");
GM_addStyle(".taggedbl {font-weight:bold; color: white!important; background:#444; padding:4px 8px}");
GM_addStyle(".taggedgl {font-weight:bold; color: white!important; background:#040; padding:4px 8px}");

GM_addStyle("#col1 .ctCommentView .comment .avatar {margin-top: -40px;}");
GM_addStyle("#col1 .ctCommentView .answer .avatar {margin-top: -40px;}");
GM_addStyle("#col1 .ctCommentView .solution .avatar {margin-top: -40px;}");
GM_addStyle("#col1 .ctCommentView .comment .eeple {margin-top: -40px;}");
GM_addStyle("#col1 .ctCommentView .answer .eeple {margin-top: -40px;}");
GM_addStyle("#col1 .ctCommentView .solution .eeple {margin-top: -40px;}");

commitChanges();
tag();

if(!GM_config.get("Welcome"))
	alert("EE v.10 loaded\n\nTo configure this script, click Tools/Greasemonkey/User Script Commands\n\n\u00A9 2012, Sjef Bosman");
/*
try {
	var oldrelease= GM_config.get("Release");
} catch(e) {
	var oldrelease= "";
}
if(oldrelease!=release) {
	if(GM_config.get("NW"))
		alert("EE v.10: new features available!\n\nSee Tools/Greasemonkey/User Script Commands");
	GM_config.set("Release", release);
	GM_config.save();
}
*/

function eev10Config() {
	GM_config.open();
}


function changeWidth(spec, n) {
	try {
		if(n<=0 && !reduce)
			return;
		var ids= spec.split(",");
		for(var i in ids) {
		  var id= ids[i];
			var els= document.querySelectorAll(id);
			if(els && els.length>0) {
				var r= els[0].scrollWidth;
				changes.push({id: id, prop: 'width', value: (r+n)+"px"});
			}
		}
	} catch(e) {console.log(e)}
}

function commitChanges() {
	for(var i in changes) {
	  var c= changes[i];
		setStyleValue(c.id, c.prop, c.value);
	}
}

function setRepeat(id, v) {
	var r= document.querySelectorAll(id);
	if(r.length)
	  r[0].style.repeat= v;
}

function setStyleValue(id, attrib, val) {
	GM_addStyle(id + "{" + attrib + ": " + val + "}");
}

function tag() {
	var anchors= document.getElementsByTagName("a");
	var users= GM_config.get("BL").split("\n");
	taggem(anchors, users, "taggedbl");
	var users= GM_config.get("GL").split("\n");
	taggem(anchors, users, "taggedgl");
}

function taggem(anchors, users, tag) {
  for(var j= 0; j<users.length; j++) {
    var user= users[j];
    if(user=="")
      continue;
		for(var i= 0; i<anchors.length; i++)
	  	if(anchors[i].innerHTML==user)
	    	anchors[i].className+= " " + tag;
	}
}

console.log("EE v10 " + release + "installed")
