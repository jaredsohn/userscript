// ==UserScript==
// @name          Feedly Wide
// @icon        http://i.imgur.com/5GV5Xy3.png
// @namespace     http://userstyles.org
// @description	  wider feeds
// @author        BskyB
// @version	2013.11.15
// @homepage      http://userstyles.org/styles/85329
// @require    http://usocheckup.dune.net/170154.js
// @downloadURL		https://userscripts.org/scripts/source/170154.user.js
// @updateURL		https://userscripts.org/scripts/source/170154.meta.js
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// @include       http://*.feedly.com/*
// @include       https://*.feedly.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#floatingBar h1 {\nborder:none !important;\n}\n.pageLayoutAction, .pageAction, .u0Entry .condensedTools img {\nbackground:none repeat scroll 0% 0% rgba(213, 217, 226, 0.8) !important;\nborder-top-left-radius: 50% !important;\nborder-top-right-radius: 50% !important;\nborder-bottom-right-radius: 50% !important;\nborder-bottom-left-radius: 50% !important;\n}\n.u0Entry .quicklistHandle, .u0Entry .condensedTools a {\nbackground-color: rgba(213, 217, 226, 0.8) !important;\nborder-top-left-radius: 50% !important;\nborder-top-right-radius: 50% !important;\nborder-bottom-right-radius: 50% !important;\nborder-bottom-left-radius: 50% !important;\ntransition: opacity 0.3s ease 0s !important;\n}\n.u4EntryList .inlineFrame, .u0EntryList .inlineFrame, .u5EntryList .column .inlineFrame {\n    padding: 10px !important;\n}\n.u5EntryList .column .inlineFrame {\nwidth: 200% !important;\n}\n.u5EntryList .column {\n    float: left !important;\n    width:30% !important;\n    padding-right: 5px !important;\n}\n.u5Entry {\n    width:100% !important;\n    margin-bottom: 4px !important;\n    clear: none !important;\n\n    margin-right: 5px !important;\n}\n.u5Entry .visual {\n    width: 100% !important;\n}\n.u4Entry {\n    margin-bottom: 4px !important;\n}\nh1 .hhint {\n    float: right !important;\n}\n.content br {\nmargin-top: -26px !important;\n}\n#mainArea {\nmin-width: 896px !important;\n}\n.entryHolder {\nmax-width: 900px !important;\n}\n.entryBody {\n    margin-top: 4px !important;\nmax-width: 9896px !important;\nwidth: 100% !important;\n}\n.u100Entry {\nwidth: 100% !important;\nmax-width: 9906px !important;\n    margin: 0px !important;\n}\n#feedlyFrame {\nwidth: 83% !important;\n}\n.u100Frame .entryHeader {\n    width: 100% !important;\n    position: relative !important;\n    height: 50px !important;\n}\n.u100Frame .title {\n    display: block !important;\n    margin-top: 20px !important;\n    position: absolute !important;\n    height: 28px !important;\n        line-height: 28px !important;\nmax-width: 100% !important;\nwidth: 100% !important;\ntransition: color 0.5s linear 0s !important;\noverflow:hidden !important;\ntext-overflow:ellipsis !important;\nwhite-space:nowrap !important;\n}\n.u100Frame .metadata {\n    margin-top: 0px !important;\n    position: absolute !important;\n    width: 100% !important;\n    height: 17px !important;\n    display: block !important;\n}\n.topWikiWidget, .frameActionsTop, .infoBox, #sideArea, #systemBar, .bottomWikiWidget, .content div table, .websiteCallForAction {\ndisplay: none !important;\n}\n.u4Entry {\n    max-width: 9646px !important;\nwidth: 100% !important;\n}\n.summary {\n    font-size: 14px !important;\n}\n.u100Frame, .u100frame.selectedEntry {\n    margin-right: 10px !important;\n    margin-left: -25px !important;\n    padding: 10px !important;\n}\n#feedlyPart {\nmargin-top: -55px !important;\npadding-right: 0px !important;\nwidth:100% !important;\nfloat: none !important;\n}\n.u100EntryList #section0_column0 {\nmargin-top: -10px !important;\nmax-width: 9896px !important;\nwidth:100% !important;\n}\n#feedlyPage {\nwidth: 100% !important;\n}\n.entryTitle {\nmax-width: 9896px !important;\nwidth: 100% !important;\n}\n#floatingBar {\nmax-width: 9896px !important;\n    padding-left: 0px !important;\n    padding-right: 0px !important;\n    height: 24px !important;\nwidth: 82% !important;\n    margin-left: 5px !important;\n    margin-top: -10px !important;\n}\n#floatingTitleBar, .pageActionBar {\n    height: 24px !important;\n    padding-bottom: 0px !important;\n  \n}\n#feedlyPageHeader {\n    margin-top: 0px !important;\n    margin-right: 34px !important;\n}\n.bigMarkAsReadButton {\n    height: 100% !important;\n}\n    .content iframe {\nwidth: 100% !important;\n    margin-left: 0px !important;\n    margin-top: 0px !important;\n    margin: auto !important;\n    }\n.cell {\n    margin-top: 7px !important;\n}\n.content a img, .content img, .entryBody div img {\nmargin: auto !important;\nmax-width: 100% !important;\nwidth: auto !important;\nheight: auto !important;\n}\n.entryHeader a {\n    font-family: \"MuseoSans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n    font-weight: 300 !important;\n\ntext-rendering: optimizelegibility !important;\n}\n.content p {\nfont-family: Helvetica,Arial,sans-serif !important;\nfont-size: 15px !important;\nline-height: 18px !important;\n\nbottom: 0px !important;\n}\n#feedlyTabsHolder {\nleft: -10px !important;\n}\n#mainBar {\nmargin-left:130px !important;\nwidth: 99% !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();