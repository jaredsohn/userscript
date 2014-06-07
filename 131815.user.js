// ==UserScript==
// @name	Facebook: Finally Readable
// @description	The text on Facebook is just too small, try this and you won't go back—plus, your eyes will thank you.
// @version	2012.7.15
// @match	*://*.facebook.com/*
// @run-at	document-start
//
// @copyright	2012+, http://bfred.it
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

//css compressed via http://compressor.ebiene.de/
var css =
"#admintip,.notification,.preview,.author,.timestamp,.uiHeader *,.fcg,.fwb a,.text,.tooltipContent,.uiButtonText,.itemLabel,.UIImageBlock,.uiBoxLightblue,#pagelet_bluebar,.jewelCount,#headerArea,#pagelet_welcome_box,.navHeader,.navHeader a,.moreSectionsLink,.countValue,.egoProfileTemplate,.fbTimelineNavigation,.timelineReportContainer,.timelineReportHeader,.shareUnit,.fbTimelineSection *,.fbTimelineScrubber,.stat_elem,.stat_elem input,.uiStreamFooter,.UIActionLinks input,.uiLinkButton input,.ufiItem,.text_exposed_hide a,.placeholder,.uiLayer,.UIShareStage_Summary,.UIThumbPagerControl_Text,#this-is-just-an-editor-helper{font-size:13px !important;-webkit-transition:font-size .1s;}.likeUnitName{max-height:2.6em !important;}.HovercardTitle a,.textInput,.messageBody,.tlTxFe{font-size:15px !important;line-height:1.3em !important;min-height:1.3em !important;}#pagelet_ego_pane .messageBody{font-size:11px !important;}.nub{top:20px !important;}.uiStreamHeaderChronologicalForm{top:-9px !important;}.uiPopover a{font-size:13px !important;}";
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