// Created by Graziano
// ngx_graz@hotmail.com
//
// Version 0.3
//
//**************************************************************//
// ==UserScript==
// @name           Post like a Zyzz wannabe
// @description    Changes around your posts
// @include        http://www.nexopia.com/forumviewthread.*
// @include        http://www.nexopia.com/forumreply.*
// @include        http://www.nexopia.com/forumcreatethread.*
// ==/UserScript==
//**************************************************************//

bb=document.createElement('script');
h=document.getElementsByTagName('head')[0];
bb.type='text/javascript';
bb.innerHTML="var strings = ['u mirin?', 'phaggot.', 'u mad?', 'u jelly?', 'fuaaark', 'groce phaggot', 'fat kunt.', '#zyzzlyfe', 'LOL!', 'im aesthetic brah', 'come at me bro.', '\\n\\n100% aesthetic post', '\\n\\nEXCLU$IVE RARE POST', 'lettuce be real tea', 'lol aesthetic as fuk cuz', 'you honestly are fuxking pathetic', 'watchu lookin at bish?'];"+
"function broPost(){"+
    "var text = document.getElementsByTagName('textarea')[0].value;"+
    "text = text + ' ' + strings[Math.floor(Math.random()*strings.length)];"+
	"document.getElementsByTagName('textarea')[0].value = text;"+
	"checksubmit();"+
"}";

h.appendChild(bb);
x=document.getElementsByName('action');
x[x.length-1].setAttribute('onclick','broPost()');