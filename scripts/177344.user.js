// ==UserScript==
// @name        Otland Dark theme
// @namespace   http://otland.net/* http://otland.net/threads/* http://otland.net/conversations/*
// @include     http://otland.net/*
// @version     1
// @match *://otland.net/*
// ==/UserScript==

//          injectCSS("a{text-decoration: none;}")   

    function injectCSS(cssdata)   

    {   

        head = document.getElementsByTagName("head")[0];   

        style = document.createElement("style");   

        style.setAttribute("type", 'text/css');   

        style.innerHTML = cssdata;   

        head.appendChild(style);   

    }   
    
injectCSS("#content{background-color: rgb(30,30,30);}")


injectCSS(".mainContent{background-color: rgb(200,200,200);}")
injectCSS(".sectionMain{background-color: rgb(200,200,200);}")
injectCSS(".nodeList .categoryForumNodeInfo, .nodeList .forumNodeInfo, .nodeList .pageNodeInfo, .nodeList .linkNodeInfo {background-color: rgb(200,200,200);}")


injectCSS(".nodeIcon{display: none;}")


injectCSS(".primaryContent a{color: rgb(30,30,30);}")
injectCSS("a:link, a:visited{color: rgb(30,30,30);}")
injectCSS("#content .pageContent{background-color: rgb(150,150,150);}")
injectCSS("#pageDescription{color: rgb(50,50,50);}")

injectCSS(".PanelScroller .scrollContainer, .PanelScrollerOff .panel{display: none;}")


injectCSS(".message{background-color: rgb(200,200,200) ;}")
injectCSS(".messageList .message{background-color: rgb(200,200,200) ;}")
injectCSS(".message .messageContent{background-color: rgb(200,200,200) ;}")
injectCSS(".primaryContent{background-color: rgb(200,200,200) ;}")
injectCSS(".body .muted a{color: rgb(0,0,0) ;}")
injectCSS("body .muted, body a.muted, body .muted a {color: rgb(30,30,30) ;}")
injectCSS(".body .muted a{color: rgb(30,30,30) ;}")
injectCSS(".Popup subForumsPopup{display:none;}")
injectCSS(".pairs dt, .pairsInline dt, .pairsRows dt, .pairsColumns dt, .pairsJustified dt{color: rgb(80,80,80) ;}")
injectCSS(".discussionListItem{background-color: rgb(200,200,200);}")
injectCSS(".discussionListItem .posterAvatar, .discussionListItem .stats{background-color: rgb(200,200,200);}")


