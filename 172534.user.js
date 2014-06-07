// ==UserScript==
// @name Cloudsdale Redesign
// @version 1.0
// @namespace http://www.cloudsdale.org/clouds/* 
// @description A redesign for CD | Contact Underscore for support.
// @grant gm_scripts 
// @require http://code.jquery.com/jquery-1.4.1.min.js
// @require https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js
// @match http://www.cloudsdale.org
// @match http://www.cloudsdale.org/*
// @match http://www.cloudsdale.org/clouds/*
// ==/UserScript== 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$(document).ready(function () {

  WebFontConfig = {
    custom: {
    families: ['cooler'],
    urls: ['http://www.remixie.com/CDredesign/smallcss.css']
	}
  };

  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1.4.2/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
});



addGlobalStyle("div.chat-message-head{ font-family: cooler; letter-spacing: 1px; ! important; }");

addGlobalStyle("div.chat-message-head a{ font-size: 18px; ! important; }");

addGlobalStyle("div.chat-message-head span{ margin-top: -3px; ! important; }");

addGlobalStyle("div.chat-footer { background-image: none; background-color: #f1f1f1; background-size: 100% 100%; color: white; border-top: 0px solid white; ! important; }");

addGlobalStyle(".topnav a.brand { background-image: URL('http://remixie.com/CDredesign/cd_.png'); background-size: 100% 100%; width: 236px; height: 38px; position: absolute; margin-top: -45px; margin-left: 12px; ! important; }");

addGlobalStyle(".topnav .topnav-inner { border-bottom: 0px solid white; background-image: none; background-color: #3d4353; background-size: 100% 100%; height: 100px; border-bottom: 0px solid #29303c; box-shadow: none; ! important; }");

addGlobalStyle("ul.nav.pull-right { position: absolute; margin-left:-5px; ! important; }");

addGlobalStyle("div.container-fluid { position: absolute; width: 100%; margin-top: 55px; ! important; }");

addGlobalStyle(".chat-footer form textarea{ background-image: none; background-color: white; ! important; }");

addGlobalStyle("pre.textareaClone{ position: relative; ! important; }");

addGlobalStyle(".chat-footer form textarea{ padding-left: 5px; width: 101.4%; ! important; }");

addGlobalStyle("pre.textareaClone div{ margin-left: -10px; position: absolute; ! important; }");

addGlobalStyle("div.chat-message { background-image: URL('http://remixie.com/CDredesign/bit.png'); ! important; }");

addGlobalStyle("div.chat-messages { background-image: URL('http://remixie.com/CDredesign/bg_lil.png'); background-size: 100% 100%; ! important; }");

addGlobalStyle("div.cloud-head-inner { background-image: none; background-color: #f3f3f3; ! important; }");

addGlobalStyle("div.cloud-head-inner h2 { text-shadow: none; color: #143a57; font-family: cooler; font-size: 18px; letter-spacing: 1px; ! important; }");

addGlobalStyle(".cloud-head { background-image: none; background-color: white; border-bottom: 0px solid white; ! important; }");

addGlobalStyle("div.chat-message-avatar { border: 1px solid #aad8ce; background-color: white; border-radius: 2px; box-shadow: none; -webkit-box-shadow: none; ! important; }");


//addGlobalStyle("li.sidebar-item a { background-image: none; background-color: #0084cc; border-top-color: white; border-bottom-color: white; border-bottom-width: 0px; ! important; }");

//addGlobalStyle("li.sidebar-item a:hover { background-image: none; background-color: #30b6ff; ! important; }");

addGlobalStyle("li.sidebar-item span.sidebar-item-name { color: white ! important; }");

addGlobalStyle("div.sidebar { background-image: none; background-color: white; border-right: 0px solid white; margin-top: 105px; position: absolute; z-index: 11; ! important; width: 278px; border-top: 1px solid #3c424e}");

addGlobalStyle("body.with-active-session .main-container { position: absolute; background-color: white; margin-left: 260px; z-index: 1031; margin-top: -40px ! important; }");

addGlobalStyle("body{ margin-top: -50px ! important; }");







