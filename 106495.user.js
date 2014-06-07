// ==UserScript==
// @name           Css Fixer
// @namespace      csschanger.js
// @description    Fixes chat CSS
// @include        http://chat.eggxpert.com/CuteSoft_Client/CuteChat/Channel.Aspx?Place=Lobby-1
// ==/UserScript==

setTimeout(changeCSS('http://thebluemeanie1.hostoutfitter.com/Channel_new.css', 3), 750);	

function changeCSS(cssFile, cssLinkIndex) {

        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
        var newlink = document.createElement("link")
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", cssFile);
		
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);


      }