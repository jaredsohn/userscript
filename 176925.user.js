// ==UserScript==
// @name           Youtube Guide panel
// @namespace      YoutubeGuidepanel
// @description    Stylish Youtube's new guide bar
// @author		   Djouimai Sofiane
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @require		   //ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version        0.000
// ==/UserScript==
	
function addCss(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
$("head").append('');

addCss ('\
                    .exp-top-guide .guide-item\
				    { height: 25px !important; font-size: 11px !important;}\
					#appbar-guide-menu\
					{width: 180px !important; border:solid thin #999 !important; height: 540px !important;\
					background: rgba(241, 241, 241,1);padding: 5px !important; top:90px !important;\
					overflow:hidden !important;\
					box-shadow: 5px 0px 15px 5px rgba(0, 0, 0, 0.2) !important;}\
					#appbar-guide-menu:first-child{ height: 540px !important;}\
					#guide-channels \
					{height: 380px !important;}\
					li#guide-subscriptions-section h3\
					{font-size:10 !important;}\
					.exp-top-guide .guide-quick-filter \
					{font-size: 11px !important; height:12px !important;}\
					li.guide-section:nth-child(1),li#guide-subscriptions-section h3,li.guide-section:nth-child(4)\
					{display:none !important;}\
					#appbar-menu .yt-uix-button-appbar { margin-top: 5px !important;}\
					.guide-channels-list\
                    {overflow: hidden !important;} \
                    #masthead-positioner { position: absolute !important;z-index:1 !important; }\
                    .site-center-aligned #player {margin-top: -14px !important;}\
' ); 
