// ==UserScript==
// @name          iGoogle 'Classic' Theme
// @namespace     http://userstyles.org
// @description	  Google recently decided to do some really hideous things to the classic Google theme on their iGoogle.  This style (mostly) restores the look and feel of the original 'Classic' theme
// @author        Rob Van Dam
// @homepage      http://userstyles.org/styles/11351
// @include       http*://www.google.com/*
// ==/UserScript==
(function() {
var css = ".personalize_link {padding-bottom:1px;}  \n\n  \n  #col1 {\n    width: 0 !important;\n    overflow: visible !important;\n    display: block !important;\n    border: 0 !important;\n  }\n  #col1_contents { width: 500px !important; }\n\n  .section { padding-left: 0 !important; }\n  #modules { padding-top: 1.8em !important; }\n  #bottom_nav { display: none !important; }\n  #enable_chat{display: none;} \n\n\n  \n  .gadget_set { display: none !important }\n\n\n  \n  .rnd_tab { display: none !important }\n  .v2minbox, .v2maxbox { display: none !important; }\n  .topline { display: none !important }\n  .topline, .bottomline, .hiddenline { display: none !important }\n  .tab_dropdown_menu { margin-top: 6px !important; }\n   \n  .section_title {\n    padding: 0px 10px !important;\n    line-height: 24px;\n    font-family: arial, sans-serif !important;\n    cursor: pointer;\n  }\n  .selected_section_title {\n    line-height: 24px;\n    padding-right: 21px !important;\n  }\n  .selected_section_contents, .section_contents { \n    float: left !important;\n    overflow: visible !important; \n    clear: none !important;\n    text-align: center;\n    padding: 0 !important;\n    margin: 0px 2px !important;\n  }\n  #bottom_nav { \n    clear: both !important;\n    border-right: 0 !important;\n    border-color: #7AA5D6 !important;\n    border-style: solid none none none !important;\n    border-width: 1px !important;\n  }\n  #section0_contents { margin-left: 18px !important; }\n  .leftselectedtab, .leftunselectedtab {\n    border-color: #7AA5D6 !important;\n    border-style: solid solid none solid !important;\n    border-width: 1px !important;\n  }\n  .selected_tab_view_title h2, .tab_view_title h2 { \n    width: auto !important; \n    overflow: visible !important;\n  }\n  .tab_view_title h2 {\n    font-weight: normal !important;\n    padding-top: 0px !important;\n  }\n\n  \n  \n\n  \n  .gradient { display: none !important }\n  .topbotborder { border-top: 0 !important }\n\n  \n  .yui-b { border-top: 1px solid #7AA5D6; padding-top: 6px !important; }\n\n  \n  .rnd2 { display: none !important }\n  .rnd3 { display: none !important }\n\n\n  \n  .rnd1 { margin: 0 !important }\n\n\n  \n  .modtitle_text {\n    font-family: arial, sans-serif !important;\n    font-size: 14px !important;\n    line-height: 18px !important;\n  }";

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
