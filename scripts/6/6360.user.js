// ==UserScript==
// @name           WebHostingTalk Skyscraper and right toolbar blocker
// @namespace      
// @description    Webhostingtalk annoyance blocker.
// @include        *
// ==/UserScript==

var my_tds=document.getElementsByTagName('TD');
for (var i=0;i<my_tds.length;i++){
        if (my_tds[i].getAttribute('width') =='200'){
                my_tds[i].style.display='none';
                break;
        }
}