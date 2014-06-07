// ==UserScript==
// @name           AutoSignature!
// @namespace     Black Panther
// @description   auto signature for orkut, random sign
// @include     http://www.orkut.com/CommMsgPost.aspx*
// ==/UserScript==

function f(){
txt = new Array ('i am here','i am there','i am where','who is here','who is there','who is where','no one is here','no one is there','you are here','you are there','you are nowhere','i am nowhere','i am everywhere','no one is everywhere','who is nowhere','she is here','she is there','she is nowhere');
lnbrk = '\n\n\n\n\n\n\n\n';
smily = new Array('8)',':(',':x',':)',';)',':D',':o',':P','/)');
txtrand = txt[Math.floor(Math.random()*txt.length)];
smilyrand = smily[Math.floor(Math.random()*smily.length)];
sign = "[maroon][b]"+txtrand+"  ["+smilyrand+"][/b][/maroon]";
signature = lnbrk+sign;
a = document.getElementsByTagName('textarea')[0];
a.value = a.value + signature;
clearTimeout(y);}
y = setTimeout(f,500);
void(y)