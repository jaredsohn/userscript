// ==UserScript==
// @name          facebook sky background
// @namespace     http://userstyles.org
// @description	  not sure if this works yet...haha
// @author        indigoblueskies
// @homepage      http://userstyles.org/styles/8608
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @include       http://*.www.facebook.com/*
// @include       https://*.www.facebook.com/*
// ==/UserScript==
(function() 

{
var css = "body { background:url(\"http://img704.imageshack.us/img704/6463/sate.jpg\") fixed !important;}\n\n#blueBar {opacity: 0 !important;}\n\n#globalContainer {width: 1000px !important}\n\n#pageHead {box-shadow: 0px 0px 20px rgba(0,0,0,0.75) !important; height: 31px !important; width: 998px !important; border: 1px solid #3b5998 !important; background: #627aad !important; position: fixed !important; top: 0px !important;}\n\n#headNavOut {padding: 0px 3px 0px 0px !important; top: 0px !important; margin-left: 211px !important; position: relative !important; background: transparent !important; border: 0px solid #3b5998 !important;}\n\n#pageLogo a {display: none !important;}\n\n#jewelCase {padding-left: 5px !important; left: auto !important; top: 0px !important; position: relative !important; width: 200px !important;}\n\n.jewel {border-width: 0px 0px 0px 0px !important; margin-top: 0px !important;}\n\n#content {padding-top: 43px !important;}\n\n#leftCol {box-shadow: 0px 0px 20px rgba(0,0,0,0.75) !important; min-height: 300px !important; border: 1px solid #3b5998 !important; background: rgba(255,246,204,0.75) !important; width: 200px !important; padding: 5px 5px 5px 5px !important; position: fixed !important;}\n\n.item {border-bottom-width: 0px !important;}\n\n#mainContainer {margin: 0px 0px 50px 0px !important; border-right-width: 0px !important;}\n\n#contentCol {background: rgba(255,255,255,0.90) !important; border: 1px solid #3b5998 !important; margin-left: 217px !important; padding: 5px 5px 5px 5px !important;}\n\n#rightCol {padding: 0px 0px 0px 0px !important; width: 200px !important;}\n\ninput.event_name {width: 192px !important;}\n\ninput.event_location {width: 192px !important;}\n\n#pagelet_netego, #pagelet_adbox, #pagelet_connectbox, #pageFooter {display: none !important;}\n\n#contentArea {padding-left: 0px !important;}\n\n.uiHeader {padding-top: 0px !important;}\n\n.profile_top_wash {background: transparent !important;}\n\n.profile_color_bar {padding-top: 0px !important;}\n\n.left_column_container {height: auto !important; margin: 0px 0px 0px 0px !important; width: auto !important; padding-right: 0px !important;}\n\n#left_column {border: 1px solid #3b5998 !important; padding: 5px 5px 5px 5px !important; background: rgba(255,246,204,0.75) !important;}\n\n#basic_info_summary_box, #boxes_left, a.profile_action {padding: 5px 0px 5px 0px !important; border: none !important;}\n\n#profile_top_bar {margin-left: 217px !important; width: auto !important; padding: 5px 5px 0px 5px !important; border: 1px solid #3b5998 !important; border-bottom-width: 0px !important; background: rgba(255,255,255,0.9) !important;}\n\n#tab_content {margin-bottom: 50px !important; margin-left: 217px !important;}\n\n.right_column_container {margin: 0px !important; width: auto !important;}\n\n#pagelet_ads {display: none !important;}\n\n#right_column {width: auto !important;}\n\n#feedwall_with_composer {padding-top: 0px !important;}\n\n.UIComposer {margin-bottom: 4px !important;}\n\n.UIComposer_Box{padding: 5px !important; background: rgba(255,255,255,0.9) !important; border: 1px solid #3b5998 !important; border-top-width: 0px !important;}\n\n.UIComposer_Content {padding: 0px !important;}\n\n#profile_stream_container {!important; border: 1px solid #3b5998 !important; background: rgba(255,255,255,0.9) !important;}\n\n#feedwall_controls_wrapper {display: none !important;}\n\n.minifeedwall {padding: 0px !important;}\n\n.UIIntentionalStory {padding-left: 61px !important; padding-top: 5px !important; background: transparent !important;}\n\n.UIIntentionalStory_Pic {left: 5px !important;}\n\n.UIRecentActivity_Content {padding-right: 5px !important;}\n\n.UIRecentActivityStory {background: transparent !important;}\n\n.ufi_section {background: rgba(255, 246, 204, 0.75) !important;}\n\n#sidebar_ads, #ego {display: none !important;}\n\n.photos_tab {margin-top: 4px !important; padding: 5px !important; border: 1px solid #3b5998 !important; width: 771px !important; background: rgba(255,255,255,0.9) !important;}\n\n.creation_buttons {margin-top: 0px !important;}\n\n.profile-pagelet-section {margin-top: 4px !important; padding: 5px !important; border: 1px solid #3b5998 !important; width: 771px !important; background: rgba(255,255,255,0.9) !important;}\n\n.box_tab {margin-top: 4px !important; padding: 5px !important; border: 1px solid #3b5998 !important; width: 771px !important; background: rgba(255,255,255,0.9) !important;}\n\n.UIStandardFrame_Container {margin-top: 4px !important; padding: 5px !important; border: 1px solid #3b5998 !important; width: 988px !important; background: rgba(255,255,255,0.9) !important;}";
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
