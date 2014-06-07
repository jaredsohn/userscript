// ==UserScript==
// @name			TweetDeck RTL Optimization
// @namespace		http://Blog.DeadMan.Ir/
// @version			0.9
// @description		Small script for making better view of TweetDeck in RTL Languages like Persian or Arabic.
// @match			https://web.tweetdeck.com/*
// @copyright		2013+, DeadMan_
// ==/UserScript==

function addCss(cssString) { 
    var head = document.getElementsByTagName('head')[0]; 
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 
addCss ('.tweet { font-family: Tahoma; font-size: 12px; direction: rtl; }');
