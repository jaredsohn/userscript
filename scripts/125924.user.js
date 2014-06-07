// ==UserScript==
// @id             BibliaNiceScroll
// @name           BibliaNiceScroll
// @version        1.0
// @namespace      http://*biblia.com/*
// @author         Nicholas van Oudtshoorn
// @description    Replace native scrollbars with nicer ones
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==
var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', 'http://areaaperta.com/nicescroll/js/jquery.nicescroll.min.js');

var sw = document.createElement('script');
sw.setAttribute('type', 'text/javascript');
sw.setAttribute('src', 'http://userscripts.org/scripts/source/125923.user.js');

var ss = document.createElement('style');
ss.setAttribute('type', 'text/css');
ss.setAttribute('id', 'biblianicescrolling');
ss.innerHTML = '.resource-content { padding: 24px 14px !important;} div[id^="ascrail"] {background-color:rgba(0,0,0,.1);}';


var headID = document.getElementsByTagName("head")[0];
headID.appendChild(ss);
headID.appendChild(s);
s.onload =  function() {  headID.appendChild(sw); }


