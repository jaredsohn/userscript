// ==UserScript==
// @name 		hide-nonew-forum-support-blackberry
// @namespace	http://supportforums.blackberry.com/
// @description	hide threads with no new messages
// @include		http://supportforums.blackberry.com/t5/*
// ==/UserScript==

var AllA = document.getElementsByTagName('a');
var i;
for (i=0;i<AllA.length;i++) {
    if ('NewMessagesCount lia-link-navigation' == AllA[i].getAttribute('class'))
        if (0==AllA[i].childNodes[0].nodeValue) 
            AllA[i].parentNode.parentNode.setAttribute('style','display:none;');
}