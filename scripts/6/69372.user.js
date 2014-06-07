// ==UserScript==
// @name          MAGO Background Gray Color FB
// @description	  Change Background Gray Color
// @autore        MAGO
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {

var css = "body, .UIIntentionalStory {background-color: #dddddd !important; color: #000000 !important;} .UIIntentionalStory_CollapsedStories {background-color: #dddddd !important;} .UIRecentActivity_Body {background-color: #dddddd !important;} .UIRecentActivityStory {background-color: #dddddd !important;} .presence_menu_content_wrapper {background-color: #dddddd !important;} #fb_menubar {background-color: #000000 !important;} #menubar_container {background-color: #000000 !important;} .see_all_link {background-color: #dddddd !important;} .share_section {background-color: #dddddd !important;} .note_title {background-color: #dddddd !important;} .note_header {background-color: #dddddd !important;} .lightblue_box  {background-color: #dddddd !important; color: #000000 !important;} .copyright {background-color: #dddddd !important; color: #000000 !important;} #footerContainer {background-color: #dddddd !important; color: #000000 !important;} #jewelBoxAlert {background-color: #dddddd !important; color: #000000 !important;} .seeMore {background-color: #dddddd !important; color: #000000 !important;} #mainContainer {background-color: #dddddd !important; color: #000000 !important;} .jewelHeader {background-color: #dddddd !important; color: #000000 !important;} .jewelBox  {background-color: #dddddd !important; color: #000000 !important;} #contentArea {background-color: #dddddd !important; color: #000000 !important;} #bottomContent {background-color: #dddddd !important; color: #000000 !important;} .UITitledBox_Content {background-color: #dddddd !important; color: #000000 !important;} .UIHomeBox  {background-color: #dddddd !important; color: #000000 !important;} #footerContainer {background-color: #dddddd !important; color: #000000 !important;} #pageFooter, .UIStory, .fbxWelcomeBox, .title_h, .bar, #contentCurve, .confirm_boxes, .confirm, h4.box_header, .note_header, .editor_panel, .no_border, th.even_column, .signup_bar_container, .fb_menubar_show_register {background-color: #dddddd !important; color: #000000 !important;} #contentCol, .fb_logo_img {\nbackground-color: #dddddd !important;\n\n-moz-border-radius: 5px;\n}\n\n#footerRight {\nmargin-right: 10px !important;\n}\n\n#presence_bar,\n#pagelet_presence {\nposition: fixed !important;\n}\n\n#pagelet_presence {\nbackground: white !important;\n}\n\n#presence_bar {\nz-index: 52 !important;\nmargin-bottom: 64px !important;\nwidth: 100% !important;\ndirection: ltr !important;\nbackground-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAbCAIAAAAyOnIjAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oCCAMPDqJjYfcAAAA8SURBVAjXLYyxDQAxEIMs9l8gg/6lM1/kOiOQc86JytxLKkY0RGmKSgwqWtrlFCvVdW9nG9v31aDlm/kBfP9Cd/PB43gAAAAASUVORK5CYII=\") !important;\nright: 0 !important;\n}\n\n#presence {\nleft: 0 !important;\nright: 0 !important;\nbottom: 0px !important;\nwidth: 100% !important;\ndirection: rtl !important;\n}";

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