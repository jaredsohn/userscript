// ==UserScript==
// @name           Youtube 2 MP3 Converter v1.4
// @namespace      http://browser.sumale.biz
// @description    Videos von Youtube in MP3 oder mehr umwandeln.
// @author         http://browser.sumale.biz
// @version        1.4
// @include http://youtube.com/*
// @include http://*.youtube.com/*
// @include https://youtube.com/*
// @include https://*.youtube.com/*
// @include http://youtube.de/*
// @include http://*.youtube.de/*
// @include https://youtube.de/*
// @include https://*.youtube.de/*
// ==/UserScript==

(function () {
   var url = decodeURIComponent(document.URL);
   var index = url.lastIndexOf("/");
   var part = url.substring(index + 1, url.length);
   var youtube2mp3pathfilsh ='http://www.filsh.net/?url='+encodeURIComponent(document.URL); 
   var youtube2mp3path ='http://www.video2mp3.net/?url='+encodeURIComponent(document.URL); 
   var youtube2mp3path_hq ='http://www.video2mp3.net/?url='+encodeURIComponent(document.URL)+"&hq=1";
   var youtube2mp3path_shrk ='http://shrk.biz/api_big.php?key=4f162e7eca862f863c5e211cab68f2a1&uid=1&adtype=int&url='+encodeURIComponent(document.URL);
   var div_embed1 = document.getElementById('watch-headline-user-info');
   var div_embed2 = document.getElementById('watch-channel-brand-div');

   if (div_embed1) {
      div_embed1.innerHTML = div_embed1.innerHTML + "&nbsp;<button data-tooltip-text=\"Teile das Video Ã¼ber einem Kurzen Link\" type=\"button\" class=\"subscribe-button yt-uix-button yt-uix-tooltip\" onclick=\"window.open('"+youtube2mp3path_shrk+"');\" title=\"Teile das Video mit einem Kurzen Link\" data-loaded=\"true\" data-button-action=\"yt.www.subscriptions.button.toggleMenu\" role=\"button\"><span class=\"yt-uix-button-content\" style=\"font-weight:bold;\">Teilen<\/span><\/button>&nbsp;";
      div_embed1.innerHTML = div_embed1.innerHTML + "<button data-tooltip-text=\"Das Video in standard MP3 Qualit&auml;t umwandel und herunterladen\" type=\"button\" class=\"subscribe-button yt-uix-button yt-uix-tooltip\" onclick=\"window.open('"+youtube2mp3path+"');\" title=\"Das Video in standard MP3 Qualit&auml;t umwandel und herunterladen\" data-loaded=\"true\" data-button-action=\"yt.www.subscriptions.button.toggleMenu\" role=\"button\"><span class=\"yt-uix-button-content\" style=\"font-weight:bold;\">Als <font color=\"#FF3333\">MP3</font> laden<\/span><\/button>&nbsp;";
	  div_embed1.innerHTML = div_embed1.innerHTML + "<button data-tooltip-text=\"Das Video in hoher MP3 Qualit&auml;t umwandel und herunterladen\" type=\"button\" class=\"subscribe-button yt-uix-button yt-uix-tooltip\" onclick=\"window.open('"+youtube2mp3path_hq+"');\" title=\"Das Video in hoher MP3 Qualit&auml;t umwandel und herunterladen\" data-loaded=\"true\" data-button-action=\"yt.www.subscriptions.button.toggleMenu\" role=\"button\"><span class=\"yt-uix-button-content\" style=\"font-weight:bold;\">Als <font color=\"#FF3333\">MP3</font> laden (HQ)<\/span><\/button>&nbsp;";
	  div_embed1.innerHTML = div_embed1.innerHTML + "<button data-tooltip-text=\"Video in verschiedener Qualit&auml;t und Formate downloaden\" type=\"button\" class=\"subscribe-button yt-uix-button yt-uix-tooltip\" onclick=\"window.open('"+youtube2mp3pathfilsh+"');\" title=\"Video in verschiedener Qualit&auml;t und Formate downloaden\" data-loaded=\"true\" data-button-action=\"yt.www.subscriptions.button.toggleMenu\" role=\"button\"><span class=\"yt-uix-button-content\" style=\"font-weight:bold;\">Als <font color=\"#FF3333\">Video+</font> laden (HQ)<\/span><\/button>&nbsp;";  
  }
   if (div_embed2) {
      div_embed2.innerHTML = div_embed2.innerHTML + '<div class="playnav-playlist-holder" id="playnav-play-playlist-uploads-holder"><div id="playnav-play-uploads-scrollbox" class="scrollbox-wrapper inner-box-colors"><div class="scrollbox-content playnav-playlist-non-all"><div class="scrollbox-header"><div class="playnav-playlist-header"><div class="spacer">&nbsp;</div>Test<div class="spacer">&nbsp;</div></div><div class="scrollbox-separator"><div class="outer-box-bg-as-border"></div></div></div>'; 
  }
})();