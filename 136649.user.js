// Created by Evan/Graziano
//
// Version 0.2
//
//**************************************************************//
// ==UserScript==
// @name           Conangifs
// @description    Adds Conan
// @include        http://www.nexopia.com/forumviewthread.*
// @include        http://www.nexopia.com/forumreply.*
// @include        http://www.nexopia.com/forumcreatethread.*
// ==/UserScript==
//**************************************************************//

bb=document.createElement('script');
h=document.getElementsByTagName('head')[0];
bb.type='text/javascript';
bb.innerHTML="var strings = ['\\n[IMG=300x]http://i.imgur.com/yWMRA.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/ejBHh.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/7m1SA.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/o8k3Z.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/RnZ7r.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/1Ozt7.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/EbQMu.gif[/IMG]', '\\n[IMG=250x]http://i.imgur.com/rBwFE.gif[/IMG]', '\\n[IMG=250x]http://i.imgur.com/mnL0w.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/lMBkk.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/O8pCh.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/ukrWP.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/nxJiG.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/kMObR.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/BJYlY.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/rrq1y.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/2WsN8.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/VoJ96.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/cxKOG.gif[/IMG]', '\\n[IMG=300x]http://i.imgur.com/XvA8B.gif[/IMG]'];"+
"function broPost(){"+
    "var text = document.getElementsByTagName('textarea')[0].value;"+
    "text = text + ' ' + strings[Math.floor(Math.random()*strings.length)];"+
	"document.getElementsByTagName('textarea')[0].value = text;"+
	"checksubmit();"+
"}";

h.appendChild(bb);
x=document.getElementsByName('action');
x[x.length-1].setAttribute('onclick','broPost()');