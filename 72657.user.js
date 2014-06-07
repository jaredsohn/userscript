// ==UserScript==
// @name            Google Reader Optimized
// @namespace      http://userstyles.org
//@author           Jason Ng
// @homepage         http://www.kenengba.com
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//css changed


addGlobalStyle('.friends-tree-notification-info {display:none;}');
addGlobalStyle('#main {position:absolute;top:26px;width:100%;}');
addGlobalStyle('#lhn-add-subscription {left:800px;top:2px;}');
addGlobalStyle('.loaded #search {display:block;left:9px;position:absolute;top:4px;}');
addGlobalStyle('#gbar, #guser,#global-info,.gbh,#logo,#logo-container,#chrome-header,#search-submit  {display:none;}');
addGlobalStyle('#search-restrict-input.label-input-label {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent none repeat scroll 0 0;border-width:0;width:107px;}');
addGlobalStyle('#search-input {border:1px solid #B2B2B2;margin:0;padding:3px 2px;width:105px;}');
addGlobalStyle('#chrome-viewer-container {border-collapse:collapse;border-spacing:0;position:inherit;table-layout:fixed;top:0;width:100%;}');
addGlobalStyle('#chrome-header {display:none}');
addGlobalStyle('#main {position:absolute;top:0;width:100%;background-color:#FFFFFF;}');
addGlobalStyle('#lhn-selectors,#sub-tree,#friends-tree-item-0-main ul,.scroll-tree li, #lhn-add-subscription-section   {background-color:#FFFFFF;}');
addGlobalStyle('.lhn-section-footer {background-color:#C2CFF1;}');
addGlobalStyle('.scroll-tree li a:hover, #lhn-selectors .selector:hover  {background-color:GhostWhite;}');
addGlobalStyle('#nav {float:left;position:absolute;top:0px;width:260px;}');

// --

var EXPORT_URL = '/reader/subscriptions/export',
	ICON_CLASS = 'sub-icon',	
	UNFIXED_ICONS = '.' + ICON_CLASS + ':not([iconbase])',
	ICON_CLASS = new RegExp('\b' + ICON_CLASS + '\b'),
	POLL_INTERVAL = 1000,
	FAVICON_TEMPLATE = ['background-position:0px; background-image:url(/s2/favicons?domain=', ')'],
	SOURCE_URL_PREFIX = ['xmlUrl="', '" htmlUrl="'];

function drawFavicon(node) {
	node.style.cssText = FAVICON_TEMPLATE.join(node.getAttribute('iconbase').split('/')[2]);
};

function getSourceUrlFromOpml(feedUrl, opml) {
	return (opml.split(SOURCE_URL_PREFIX.join(feedUrl))[1] || '').split('"')[0];
};

function getIconNodes() {
	if (document.querySelectorAll)
		return document.querySelectorAll(UNFIXED_ICONS);
		
	return filter(document.getElementsByTagName('span'), function (span) {
		return ICON_CLASS.test(span.className)
			&& ! span.hasAttribute('iconbase');
	});
};


(function () {
	setTimeout(arguments.callee, POLL_INTERVAL);
	
	var iconNodes = document.querySelectorAll(UNFIXED_ICONS);
	
	if (! iconNodes.length)
		return;

	each(iconNodes, function(icon){
		icon.setAttribute('iconbase', unescape(icon.parentNode.href.split('/')[6]));
		
		drawFavicon(icon);
	});


	fetch(EXPORT_URL, function(opml) {
		each(iconNodes, function(icon){
			var iconbase = icon.getAttribute('iconbase');
			
			icon.setAttribute('iconbase', getSourceUrlFromOpml(iconbase, opml));
			
			drawFavicon(icon);
		});
	});
})();
