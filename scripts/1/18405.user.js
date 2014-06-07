// ==UserScript==
// @name Visible Password
// @namespace  http://www.orkut.com/Community.aspx?cmm=32920642
// @description it will make ur password visible instead of *********
// @include *
// ==/UserScript==

  da=document.getElementsByTagName('input');for(x=0;x<da.length;x++){daa=da[x].type;if(daa=="password"){da[x].type="text"}};void(0)