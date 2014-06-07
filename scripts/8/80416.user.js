// ==UserScript==
// @name           Facebook cleanup
// @description    hide facebook features except improving instant messaging
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         yvesf
// @include        http://*facebook.com/*
// @version        1.0
// ==/UserScript==

function reset_layout() {
	jQuery("#rightCol").hide();
        jQuery("#pagelet_intentional_stream")[0].style.opacity = 0.5;
	jQuery("div.lightblue_box").css({backgroundColor:"transparent"});
        jQuery("#pagelet_navigation").hide();
	jQuery("#pagelet_stream_header").hide();
	jQuery("#pagelet_composer").hide();
	jQuery("div.fbNubFlyout").css({width:"60em", height:"60em"});
	jQuery("div.fbNubFlyout div.fbNubFlyoutBody").css({height:"50em !important"});
	jQuery("div.fbNubFlyout textarea.chat_input").css({width:"50em !important"});
	window.setTimeout(reset_layout, 1000);
}
function _resizeNubFlyout() {
	//NOP
}
reset_layout();
jQuery("div#blueBar").remove();
jQuery("h1#pageLogo").remove();
jQuery("div#jewelCase").css({zIndex:"1", left:"500px"});
jQuery("div.jewel").css({border:"none"});
jQuery("div#headNavOut").css({boder:"none", background:"none"});
jQuery("div#leftCol").css({position:"absolute",top:"0px"});