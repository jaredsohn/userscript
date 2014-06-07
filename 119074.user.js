// ==UserScript==
// @name           Tumblr - Customize Panel
// @namespace      tumblr.com
// @include        http://www.tumblr.com/customize/*
// @include        www.tumblr.com/customize/*
// @include        http://tumblr.com/customize/*
// @include        tumblr.com/customize/*
// @include        http://www.tumblr.com/customize
// @include        www.tumblr.com/customize
// @include        http://tumblr.com/customize
// @include        tumblr.com/customize
// ==/UserScript==

function GM_addScript(Script) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("script");
	style.type = "text/javascript";
	var textNode = document.createTextNode(Script);
	style.appendChild(textNode);
	parent.appendChild(style);
}

GM_addScript('\
$("#container").append(" \
<div id=controls_panel> \
	<a class=preview_container  href=#preview_container>Full Preview</a> \
	<a class=back_to_customize href=#drawer>Back to Customize</a> \
</div>"); \
	$("#use_theme_button").click(function (){\
		$("#slider").css("margin-left","-1200px !important"); \
	});\
	$("#themes_cancel_button").click(function (){\
		$("#slider").css("margin-left","-1200px !important"); \
	});\
	$("#back_to_themes_button").click(function (){\
		$("#slider").css("margin-left","-600px !important"); \
	});\
	$("#edit_html_button").click(function (){\
		$("#slider").css("margin-left","-1800px !important"); \
	});\
	$("#back_to_appearance_button").click(function (){\
		$("#slider").css("margin-left","-1200px !important"); \
	});\
$(".preview_container").click(function (){ \
	$("#preview_container").css("left","0 !important");\
});\
$(".back_to_customize").click(function (){ \
	$("#preview_container").css("left","600px !important");\
});');



var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '\
.notes_{width: 100%;clear: both; line-height: 19px; font-size: 12px; text-align: left;  margin: 10px 0 0; color: #999; } \
#drawer{overflow: auto !important}\
.scroll_box_content{width:550px !important}\
.color_field_control .label{width: 459px !important}\
span.label{width: 400px !important}\
.image_field_control .label{width: 412px !important}\
.checkbox_field_control .label{width: 494px !important}\
.text_field_control .label{max-width: 466px !important}\
#description, #custom_css{width: 535px !important}\
#drawer, .pane{width: 600px !important}\
#slider{margin-left: -1200px !important; width: 2400px !important}\
#preview_container{left: 600px !important; width: 100% !important;}\
#themes{margin-left: 600px !important;}\
#controls_panel{font-size: 17px;font-family: arial; padding: 10px 14px; overflow: hidden; -webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;color: #fff;position: fixed;top: 10px;right: 10px;background: rgba(0, 0, 0, 0.6);z-index: 9999;}\
#controls_panel a, #controls_panel a:active, #controls_panel a:visited{-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;border-top: 1px solid #666;border-bottom: 1px solid #333;color: #fff;text-align: center; width: 225px; display: block; padding: 10px; margin: 3px auto; background-image: -webkit-linear-gradient(top,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6));background-image: -moz-linear-gradient(top,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6));background-image: -ms-linear-gradient(top,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6));background-image: -o-linear-gradient(top,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6));background-image: linear-gradient(top,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6));background-image: -webkit-gradient(linear,left top,left bottom,color-stop(rgba(0, 0, 0, 0.3)),color-stop(rgba(0, 0, 0, 0.8)));}\
#controls_panel a:focus, #controls_panel a:hover{text-decoration: none}';
document.getElementsByTagName('head')[0].appendChild(newStyle);