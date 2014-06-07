// ==UserScript==
// @name       Text Changer
// @author         Connected
// @include        http://www.hackforums.net/showthread.php?tid=*
// @include        https://hackforums.net/showthread.php?tid=*
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /Connected/g, '<span style="text-shadow: 0px 2px 3px #000"><b>Connected</b></span>' );
html = html.replace( /Chief./g, '<span style="text-shadow: 0px 2px 3px #000"><b>Chief.</b></span>' );
document.body.innerHTML = html;