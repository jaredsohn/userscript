{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf250
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww25100\viewh15040\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs26 \cf0 // ==UserScript==\
// @name   Facebook default\
// @namespace  http://userstyle.org/styles/9712\
// @include    *facebook.com*\
// ==/UserScript==\
\
var loco = 'http://p1.pikeo.com/images/server38/thumb/K81ELKG0TOHF0C6TSZ07LJAZDDZ7DLK2/500x400.jpg?seed=0'; //Enter a background url here\
\
var clr = 'advanced';    //Enter either a color ('black') a hex value ('#000000') or the word 'advanced' to use the advanced color panel below\
\
var altclr = 'white';    //Enter a text color here\
\
var chatBarColor = '';    //Enter a color for the chat bar here, leaving it blank will result in the same color as the main color\
\
/***This is the advanced color panel***/\
var aRed = 0;    //A numeric value for red here, between 0 and 255\
var aGreen = 0;    //A numeric value for Green here, between 0 and 255\
var aBlue = 0;    //A numeric value for Blue here, between 0 and 255\
var aTrans = 50;    //A numeric value for the level of transparency, between 0 and 100\
/***End Advanced color panel***/\
\
\
\
\
\
if(clr == 'advanced')\{\
aTrans = aTrans / 100;\
clr = 'rgba('+aRed+', '+aGreen+', '+aBlue+', '+aTrans+')';\
\}\
if(chatBarColor == '')\{\
chatBarColor = clr;\
\}\
var urlloco = 'url('+loco+')';\
void(document.body.style.background=urlloco+'fixed');\
var css = ".left_column, .group_dashboard .group_lists .group_list , .UIIntentionalStory, .UIIntentionalStream, .UIFilterList, .GeneticStory, .UIHomeBox, .UITwoColumnLayout_Content, .UITwoColumnLayout_NarrowContent, #menubar_container, .fb_menu_dropdown, .presence_menu_content_wrapper, #pagelet_composer, #pagelet_stream_header, .info_section, .section_header, .profile .info_tab h3 span, .box_header, .UIStory, .info, .confirm_boxes, .confirm\{background-color: "+clr+";\}\\n\\n#presence_ui\{background: "+chatBarColor+";\}\\n\\n.comment_text, .Mentions_Input\{color: #000000;\}\\n\\n.profile .profile_top_wash\{background: transparent;\}body, #description0-essay-summary, #description1-essay-summary, #rsvp_form, .info, dd, h1, h2, h3, h4, h5, .profile .basic_info_summary dl.info dd\{color: "+altclr+";\}";\
var heads = document.getElementsByTagName("head");\
	if (heads.length > 0) \{\
		var node = document.createElement("style");\
		node.type = "text/css";\
		node.appendChild(document.createTextNode(css));\
		heads[0].appendChild(node);\
\}\
}