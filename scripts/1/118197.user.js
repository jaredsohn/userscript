// ==UserScript==
// @name           YTMulti
// @namespace      http://www.ytmulti.com
// @description    Adds a button to open the current youtube video through ytmulti.com
// @include  http://youtube.com/*v=*
// @include  http://*.youtube.com/*v=*
// @include  https://youtube.com/*v=*
// @include  https://*.youtube.com/*v=*
// ==/UserScript==

(
	function () {
        "use strict";
	
        function initYTMultiButton() {        
            var ytButtonSection = document.getElementById("watch-actions");            
            var ytMultiButton = document.createElement('button');
            var btnText = document.createTextNode('Watch on YTmulti');
            ytMultiButton.appendChild(btnText);
            ytMultiButton.id = "ytm_button";
            ytMultiButton.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip";
            ytMultiButton.setAttribute("onclick", "var regexS = \"[\\?&]v=([^&#]*)\";var regex = new RegExp(regexS);var results = regex.exec(window.location.href);window.location.href=\"http://www.ytmulti.com?v=\"+results[1];return false");
            ytMultiButton.setAttribute("title", "Watch all parts of this video on YTmulti");
            ytButtonSection.appendChild(ytMultiButton);           
            
        }

	
        function init() {
            if (window.top !== window.self) {
                return;
            }
            if (!(/^([a-zA-Z0-9]+\.)*youtube\.com$/i.test(document.location.host))) {
                return;
        }
		
		initYTMultiButton();
	}
	
	init();
}());