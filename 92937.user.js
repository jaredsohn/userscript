// ==UserScript==
// @name           Comment-less Distraction-less Youtube™
// @namespace      http://people.sigh.asia/~sulaiman
// @description    Youtube without the tasteless comments and the sidebar (updated for the new youtube -- 11.2011)
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @match          http://www.youtube.com/*
// @match          https://www.youtube.com/*
// @version        2.3
// ==/UserScript==
// Copyrights: Public domain. Although I would appreciate it if you gave me credit :)

var s=document.createElement("style")
s.setAttribute("type", "text/css")
s.textContent = ".watch-sidebar-section{ display:none; }\n"+
                "#watch-discussion{ display:none; }\n"+
                "#video-sidebar{ display:none; }\n"+
                "#watch-sidebar{ display:none; }\n"+
                "#search-pva{ display:none; }\n"+
                ".vertical-rule-corner-top{ display:none; }\n"+
                ".vertical-rule-corner-bottom{ display:none; }\n";
document.getElementsByTagName("head")[0].appendChild(s);

/* 'Show Comments' Button */
button = document.createElement("button");
button.setAttribute("class", "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip");
button.setAttribute("title", "Don't press me");
button.innerText="Show Comments";
button.onclick=function(){
   var e = document.getElementById("watch-discussion");
   e.style.display=(e.style.display=="inline"?"none":"inline");
};
document.getElementById("watch-actions").insertBefore(button, document.getElementById("watch-flag"));