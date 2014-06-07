// ==UserScript==
// @name          Facebook in Green
// @namespace     http://userstyles.org
// @description      Zmienia wygląd facebooka na zielony
// @author        Piotr
// @homepage      http://userstyles.org/styles/80763
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==


var link = 'http://www.facebook.com';
var version = '0.1'

function update(){
	now = (new Date().getTime()/86400000).toString().split('\.')[0];
	last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/155277.meta.js',
			onload: function(responseDetails) {
				var script_name = (/@name\s*(.*?)\s*$/m.exec(responseDetails.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(responseDetails.responseText))[1];
				if (newversion != version){
					if (confirm('\tDostępna aktualizacja dla skryptu Greasemonkey\n"'+script_name+'."\n\t\t\tKliknij OK aby zainstalować')){
						window.location.href = 'http://userscripts.org/scripts/source/155277.user.js';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}

(function() {
var css = "#blueBar{background-color: green !important;}\na{color: green !important;}\n#pageNav .navLink, #pageNav #navAccountLink{color: #D8DFEA !important;}\ndiv.loggedout_menubar_container{background-color: green !important;}\n.fbFeedTicker .fbFeedTickerStory .uiStreamPassive, .fbFeedTicker .fbFeedTickerStory .tickerAttachmentBodyText, .fbFeedTicker .tickerStoryClickable a, .fbFeedTicker .tickerStoryClickable .passiveName, .fbFeedTicker .tickerStoryClickable .token {color: #333333 !important;}\n.UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_bottom .uiLinkButton input, .UIActionLinks_bottom .uiLinkButton input:hover{color: green !important;}\n.fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar:hover{background-color:green !important;}\n.fbTimelineScrubber .selected a, .fbTimelineScrubber .selected ul a{border-left-color: green !important;}\ndiv.uiAttachmentTitle{color: green !important;}\n.fbTabGridItem .title{color: green !important;}\n.utn .UFIRow{background-color: #CCFFCC !important;}\n.uiSideNavCount{background-color: #CCFFCC !important;}\n._kv:hover, ._kv{background-color: green !important; border-color:darkgreen !important}\ndiv.uiTypeaheadView .selected{background-color: green !important; border-color: darkgreen !important;}\n.uiSideNavCount{color:green !important;}\n#pageNav .navLink:hover, #pageNav .navLink:focus, #pageNav .navLink:active{background-color: #99cc66 !important;}\n#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active{background-color: #99cc66 !important;}\n#pageNav .navLink:after{background: none repeat scroll 0 0 #ccffcc !important;}";
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
