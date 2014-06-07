// ==UserScript==
// @name           OkCupid Username QuickMatch
// @namespace      Eckankar-at-Gmail-dot-com
// @include        http://www.okcupid.com/quickmatch*
// @include        http://okcupid.com/quickmatch*
// ==/UserScript==
// Comments can be mailed to "Eckankar -at- gmail -dot- com"


var usernamefield = document.getElementsByName('sn');
var username = usernamefield[0].getAttribute('value');
var temp = document.getElementById('qmInfoCol');
var newNode = document.createElement('span');
var userlink = document.createElement('a');
userlink.href = "http://www.okcupid.com/profile?u="+username;
userlink.appendChild(document.createTextNode(username));
newNode.appendChild(userlink);
newNode.appendChild(document.createElement('br'));
temp.insertBefore(newNode,temp.firstChild);