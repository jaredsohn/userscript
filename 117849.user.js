// ==UserScript==
// @name           Find Pictures
// @namespace      http://userscripts.org
// @description    Find Pictures
// @include        http://what.cd/user.php?id=*
// @include        https://what.cd/user.php?id=*
// ==/UserScript==

var userName = document.querySelector('div.thin h2').innerHTML;

var newLink = document.createElement('a');
newLink.href = 'forums.php?action=search&threadid=126&search=[img]&user=' + userName;
newLink.innerHTML = 'Find Pictures';

var linkbox = document.querySelector('div.thin div.linkbox');
linkbox.appendChild(document.createTextNode(' ['));
linkbox.appendChild(newLink);
linkbox.appendChild(document.createTextNode(']'));