// ==UserScript==
// @name Visible Password
// @namespace  http://www.orkut.com/Community.aspx?cmm=35287125
// @author Da ahmaD http://www.orkut.com/Profile.aspx?uid=4364159888742206247
// @description it will make ur password visible ;-)
// @include *
// ==/UserScript==

  da=document.getElementsByTagName('input');for(x=0;x<da.length;x++){daa=da[x].type;if(daa=="password"){da[x].type="text"}};void(0)