// ==UserScript==
// @name       Mackolik düzeltici
// @version    0.1
// @description  
// @homepage       http://userscripts.org/scripts/show/156566
// @updateURL      https://userscripts.org/scripts/source/156566.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156566.user.js
// @include      http*://*mackolik.com/*
// @copyright  2012+, haluk ilhan
// @run-at     document-start
// ==/UserScript==
// Initiate custom CSS function
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
// Custom CSS interface styling
GM_addStyle(" \
#header, #video-div, #denizbankbanner-div, .banner-bar, #footer, td.onemli.fnt-siyah {display: none !important;}\
body {padding-top: 0px !important; margin-top: -32px !important; background-color: #222 !important; background-image:none !important;}\
#body {padding-top: 0px !important;}\
#pop-up-body {margin-top:-168px;}\
table#tblForm.list-table {display:block !important}\
#dvExtraMenu {display: none !important;}\
.right-top-bar-bg:hover #dvExtraMenu {display: block !important;}\
\ ");

if(window.location.href.indexOf("mackolik.com/Canli-Sonuclar") >= 0)         {
document.addEventListener('DOMContentLoaded',function(){
location.href = "javascript:getSelectedMatch('chkDuel');checkSport(2);getExtra(4,this);"
location.href = "#";
location.href = "#live-score-master";
})
}