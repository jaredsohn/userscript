// ==UserScript==
// @name          Windows Live Mail - Cleaner Look
// @namespace     http://userstyles.org
// @description	  This very minimal style removes unnecessary items from the Windows Live Mail interface, including some adverts.
// @author        BoffinbraiN
// @include       http://live.com/*
// @include       https://live.com/*
// @include       http://*.live.com/*
// @include       https://*.live.com/*
// ==/UserScript==
(function() {
var css = "[id^=\"RadAd\"],\n[id^=\"CustComm\"],\n.VirusImg,\n.AntiVirus  {display:none !important;}\n\n\n\n\nbody  {font-size:75% !important}\n#c_header .inCenter  {visibility:hidden !important}\n#MainContent  {right:0 !important; margin-right:6px !important}\n#Middle  {left:0 !important; margin-left:6px !important}\n\n\n\n\n.ContentLeft li a,\n.ContentFolderList .DisplayBlock,\na.ManageLink  {padding: 0.1em 0.3em !important;}\na.ManageLink  {margin-top:1em !important;}\n\ntable.InboxTable td  {padding-top:0 !important; padding-bottom:0 !important;}\ntable.InboxTable td.Chk input,\ntable.InboxTable td.Ico img  {position:relative !important; top:2px !important}\ntable.InboxTable td.Ico div  {float:none !important; text-align:center !important}\n\n.MessageSelection[noSel] {display:none !important}\n\n\n\n\n#contactPickerHint  {display:none !important;}\n\n\n\n\n#IAPWrapper  {display:none !important;}\n#ManagedContentWrapper  {right:0 !important;}\n\n\n\n\n.MainLayoutLeftBar>*  {margin-left:6px !important}\n\n.CLT_NameCol  {padding:0 !important}\n.cxp_ic_img_m  {display:none !important}\n.cxp_ic_text_h  {padding:0 0 0 0.8em !important}";
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
