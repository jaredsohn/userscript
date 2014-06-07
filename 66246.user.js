// ==UserScript==
// @name           Google Voice Dark
// @namespace      http://userscripts.org/users/125059
// @description    Gives Google Voice a dark theme
// @include        http://*google.com/voice*
// @include        https://*google.com/voice*
// ==/UserScript==
(function() {
var invertedLogo = "data:image/gif;base64," +
	"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";

var css = "@namespace url(http://www.w3.org/1999/xhtml);" +
	"#gc-header { background-color: #000000;}" + 
	"#gc-header-logo { background:url('" + invertedLogo + "'); height:0; overflow:hidden; padding-top: 38px; width: 154px;}" + 
	"a.gb1, a.gb3, div.gc-header-right, #gc-header-did-link, a:link, a:visited, a:hover, a:active { color:#FFFF00 !important;}" + 
	".gc-inbox-sidebar-header, .gc-inbox-view-header { background-color: #333333;}" + 
	"#gc-inbox-allunread, .gc-inbox-page-range { color: #FFFFFF;}" + 
	"#gc-search-input, .gc-message-sms-box, #gc-quicksms-text2, #gc-quicksms-number { background-color: #000000; border: 1px solid #FFFFFF; color: #FFFFFF;}" + 
	".goog-splitpane-handle { background-color: #333333;}" + 
	".goog-option-selected { background:#808080 none repeat scroll 0 0;}" + 
	"#gc-inbox-sidebar-sections, #gc-inbox-sidebar-types-menu, #gc-contacts-sidebar-menu { background: #000000; background-color: #000000;}" + 
	"#gc-inbox-sidebar-menu { background-color: #000000;}" +
	"div.goog-menuitem-content { color: #FFFFFF;}" + 
	".gc, .gc-inbox-sidebar-menu, .gc-inbox-sidebar-types-header, .gc-inbox-sidebar-types-menu, .gc-sidebar-contact-menu, .gc-sidebar-balance, .gc-inbox-sidebar-contacts { background:#000000 none repeat scroll 0 0; color: #FFFFFF}" + 
	".goog-flat-button, .gc-message, .gc-message-read, .gc-message-bg-f, .gc-message-tbl { background-color: #000000;}" + 
	".gc-message-sms-text, .gc-message-sms-from, .gc-message-name, .gc-message-time { color: #FFFFFF}" + 
	".gc-message-sms-actions { background-color:#333333;}" + 
	".gc-control, .goog-flat-menu-button-dropdown { background-color: #333333; color: #FFFF00}" + 
	".gc-message-sms-reply { background-color: #333333}" + 
	".gc-message-bg-msg, td.gc-message-bg-f, td.gc-message-bg-l, td.gc-message-bg-r { background-color: #000000}" + 
	".gc-message-read .gc-message-sline { background-color:#000000;}" + 
	"td.gc-message-bg-g { background-color: #333333}" + 
	".gc-inbox-btm-paging, .gc-footer-inbox { background-color: #000000}" + 
	".gc-user-tip div { background-color: #333333; color: #FFFFFF}" + 
	".gc-word-high { color: #FFFFFF;}" + 
	".gc-block-contents {color: #000000;}" + 
	".gc-bubble-mc { background-color:#000000;}" + 
	".gc-block-contents { color: #FFFFFF;}" + 
	".goog-flat-menu-button { color: #000000; }" + 
	".ac-renderer div.active { color: #000000;}" + 
	".ac-renderer div { background-color: #000000; color: #FFFFFF;}" + 
	".ac-renderer div b { color: #FF0000;}" + 
	".goog-menuitem-highlight div.goog-menuitem-content { color: #000000 !important;}" + 
	".gc-help { color: #000000;}" +
	".gc-quickcall-msg { background-color: #000000;}";

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
