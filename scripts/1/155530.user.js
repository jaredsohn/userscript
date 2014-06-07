// ==UserScript==
// @name        Facebook Public Link Video 
// @namespace   fb-rst
// @description Provides a public link of a private video
// @include     https://www.facebook.com/photo.php?v=*
// @version     1
// @grant	none
// @run-at	document-end
// ==/UserScript==

e = document.getElementById('fbPhotoPageActions');
n = document.createElement('a');
n.className = 'fbPhotosPhotoActionsItem';
n.innerHTML = 'Public link';
n.href = '#';
n.setAttribute('onclick','a=document.getElementById(\'photoborder\').childNodes[1].childNodes[0].childNodes[0].src;j=document.getElementById(\'photoborder\').childNodes[1].childNodes[0].childNodes[0].attributes;l=j.length;for(var i=0;i<l;i++){var c=j.item(i).nodeName;if(c==\'flashvars\'){b=j.item(i).nodeValue;break;};};document.location.href=a+\'?\'+b;');
e.appendChild(n);