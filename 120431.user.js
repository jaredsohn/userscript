// Author: Tam Nguyen (http://tambnguyen.com/)
// Last updated: 2014-02-22
// ==UserScript==
// @name			Classic Youtube Subscription Layout
// @namespace		CYSL
// @version			20140222.1
// @description		Bring back the old tiled subscription page!
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://youtube.com/*
// @include       https://*.youtube.com/*
// @icon			http://www.cleancutmedia.com/wp-content/uploads/2011/10/youtube_logo_red.png
// @copyright  2014, Tam Nguyen Photography
// ==/UserScript==

function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

function makeCSSImportant(cssString) {
    var impCssString = cssString.replace(/([^;]\s*)}/, "$1;}"); // Adds a trailing semicolon to the last rule if it doesn't have one
    return impCssString.replace(/(?:\s*!\s*important\s*)?;/gi, " !important;"); // Adds !important to each rule if it doesn't have it already
}

GM_addStyle([
"#watch7-video-container, #player, #page { background-color: DimGray; }",
".feed-list-item, .feed-item-container { width: 240px; float: left; height: 265px; border-bottom: 1px solid #e2e2e2; }",
".feed-item-container.legacy-style .feed-item-main { border-bottom: none; }",
".yt-lockup .yt-lockup-content { float: left; width: 190px; }",
".feed-item-main .feed-item-header { overflow: hidden; text-overflow: ellipsis; width: 185px; height: 15px; }",
".yt-lockup-title { height: 15px; overflow: hidden; text-overflow: ellipsis; }",
".branded-page-v2-secondary-col { display: none; }",
".feed-load-more-container { float: right; }",
".content-alignment { width: auto; }",
".feed-item-post { display: none; }",
".yt-card { margin-top: 0 }",
".site-as-giant-card .feed-item-container.legacy-style { padding: 0; margin: 10px; }",
".yt-lockup-title { height: auto; }"
].map(function(s) {return makeCSSImportant(s);}).join("\n"));

var SUC_script_num = 120431;
try{function updateCheck(a){if(a||parseInt(GM_getValue("SUC_last_update","0"))+864e5<=(new Date).getTime()){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SUC_script_num+".meta.js?"+(new Date).getTime(),headers:{"Cache-Control":"no-cache"},onload:function(b){var c,d,e,f;e=b.responseText;GM_setValue("SUC_last_update",(new Date).getTime()+"");d=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(e)[1]);c=parseInt(GM_getValue("SUC_current_version","-1"));if(c!=-1){f=/@name\s*(.*?)\s*$/m.exec(e)[1];GM_setValue("SUC_target_script_name",f);if(d>c){if(confirm('There is an update available for the Greasemonkey script "'+f+'."\nWould you like to go to the install page now?')){GM_openInTab("http://userscripts.org/scripts/show/"+SUC_script_num);GM_setValue("SUC_current_version",d)}}else if(a){alert('No update is available for "'+f+'."')}}else{GM_setValue("SUC_current_version",d+"")}}})}catch(b){if(a){alert("An error occurred while checking for updates:\n"+b)}}}}GM_registerMenuCommand(GM_getValue("SUC_target_script_name","???")+" - Manual Update Check",function(){updateCheck(true)});updateCheck(false)}catch(err){}