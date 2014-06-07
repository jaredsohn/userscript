// ==UserScript==
// @name           YouTube Eliminate Video Ads
// @namespace      http://userscripts.org/users/23652
// @description    Removes video advertisements
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

(function(){
var mp = window.document.getElementById('movie_player'),
	mpC = mp.cloneNode(true),
	ads = /(\&|\?)?(ad_channel_code|ad_host_tier|iv_storage_server|invideo|iv_module|ad_video_pub_id|ad_host|ad_module|ad_tag|ad_eurl)=[^\&]*/gi;
mpC.setAttribute('flashvars', mpC.getAttribute('flashvars').replace(ads,'').replace(/(\&|\?)?$/,'').replace(/^(\&|\?)/,'')+'&invideo=false');
mp.parentNode.replaceChild(mpC, mp);
})();