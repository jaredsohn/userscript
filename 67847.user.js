// ==UserScript==
// @author      Carlosedp
// @name           Google Reader Cleaner
// @namespace      
// @description    
// @include        http*://www.google.com/reader/view/*
// ==/UserScript==

(function() {
	var css = '@namespace url(http://www.w3.org/1999/xhtml);';
    css += '* { font-family: tahoma, verdana, lucida sans, helvetica, arial !important; font-weight: normal; }';
    css += '#main, #settings-frame { top: 0; }';
	css += '.gbh, #gbar, #global-info, #lhn-add-subscription-section, #logo-container, #viewer-footer { display: none !important; }';
    css += '.round-box .bl, .round-box .br { background: none; }';
	css += 'div.keyboard-help-banner { top: 10px !important; }';
    css += '#search { left: 600px !important; top: 4px;}';
    //css += '#search { left: 600px !important; top: 4px; background: #bbb;}';
    //css += '#search {width: 200px; position: absolute !important; top: 5px; left: 530px !important;} ';
    css += '#search-input { width: 150px; margin: 0 10px 5px 0; border: 1px solid #ddd !important; -webkit-border-radius: 10px; -moz-border-radius: 10px; }';
    css += '#search-submit, #search-restrict { display: none; }';
    css += '#search:hover #search-submit, #search:hover #search-restrict { display: inline !important; }';
    css += '#search:hover #search {display: block; background: #fff; border: 1px;}';
    //css += '#search:focus #search-submit, #search:focus #search-restrict { display: inline !important; }';
    //css += '#chrome-header, #chrome-view-links { background: #bbb; }';
    css += '#chrome-title { font-size: 14px !important; width: 250px;}';
    css += '#sub-tree-container { text-shadow: 0 1px 0 #fff; }';
    css += '.folder-name-text { font-size: 12px !important; font-weight: bold !important; }';
    css += '.name-text sub-name-text { font-size: 12px !important; font-weight: normal !important; }';
    css += '.entry-title-link { font-size: 16px !important; font-weight: bold !important; }';
    css += '.unread-count { font-size: 11px !important; color: #D90000 !important; font-weight: normal !important;}';
	//css += '#lhn-friends { display: none !important; }'; /* Hides the "People you Follow" item */
    //css += '#lhn-recommendations { display: none !important; }'; /* Hides the "Recomendations" item */

	if (typeof GM_addStyle != 'undefined') {
		GM_addStyle(css);
	} else if (typeof addStyle != 'undefined') {
		addStyle(css);
	} else {
		var node = document.createElement('style');
		node.type = 'text/css';
		node.appendChild(document.createTextNode(css));
		document.getElementsByTagName('head').appendChild(node);
	}
})();