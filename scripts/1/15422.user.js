// ==UserScript==
// @version 1
// @name GID Finder
// @author Kunal<http://www.orkut.com/Profile.aspx?uid=13210112717493623570>
// @namespace
// @description Shows GID of Profiles
// @include http://www.orkut.com/Profile.aspx?uid=*
// ==/UserScript==

void(prompt('GID Powered By CTT\nJoin CTT\nCTT Link On  Your Top Navigator( near Communities)\nGID of Profile that you just opened is in below box',document.body.innerHTML.match(/http:\/\/\w+.orkut.com\/images\/\w+\/\d+\/([0-9]+).jpg/gi).join('\n').toString().replace(/http:\/\/\w+.orkut.com\/images\/\w+\/\d+\/([0-9]+).jpg/gi,'$1')));

var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/CommunityJoin.aspx?cmm=35186680'>CTT</a>&nbsp;|&nbsp;</li>";