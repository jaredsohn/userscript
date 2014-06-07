// ==UserScript==
// @name		Youtube Inbox Link
// @namespace		http://www.infilel.com/
// @version		0.1
// @description		Add inbox button to youtube navigation
// @match		http://*.youtube.com/*
// @copyright		2012+
// ==/UserScript==

var inboxUl = document.createElement('ul');
    inboxUl.id = 'infilel';
    inboxUl.setAttribute("style", "padding-top:5px;");
        
var inboxLi = inboxUl.appendChild(document.createElement('li'));
    inboxLi.setAttribute("class", "masthead-expanded-menu-item");
    inboxLi.setAttribute("style", "margin-bottom:-5px;");

var inboxA = inboxLi.appendChild(document.createElement('a'));
    inboxA.setAttribute("href", "/inbox");
    inboxA.appendChild(document.createTextNode('Inbox'));

var inboxInsert = document.getElementById("masthead-expanded-menu-list");
    inboxInsert.parentNode.insertBefore(inboxUl, inboxInsert);

var inboxStyle = document.getElementById("masthead-expanded-menu-list");
    inboxStyle.style.paddingBottom = '0px';