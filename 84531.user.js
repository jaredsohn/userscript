// ==UserScript==
// @name           Barebones Ikariam Login
// @namespace      http://userscripts.org/scripts/show/84531
// @description    removes almost everything except the bare essentials needed to login
// @include        http://*.ikariam.com/*
// @exclude        http://*.*.ikariam.com/*
// ==/UserScript==

// headNode now contains the head tag
var headNode = document.documentElement.childNodes[0];

// remove style tags from head section
var styleTags = headNode.getElementsByTagName('style');
while (styleTags.length != 0)
   headNode.removeChild(styleTags[0]);

// remove the link to style.css from head
headNode.removeChild(headNode.getElementsByTagName('link')[0]);

// remove all the script tags from head, except the 5 necessary ones
// var scriptNodes = headNode.getElementsByTagName('script');

  for (var i = scriptNodes.length-1; i >= 0; i--) {
//     var x = scriptNodes[i].src.substring(10);

//   if (x != "ikariam.com/js/jquery-1.4.2.min.js"
//      && x != "ikariam.com/js/functions.js"
//     && x != "ikariam.com/js/RSA.js"
//      && x != "ikariam.com/js/BigInt.js"
//      && x != "ikariam.com/js/Barrett.js") 
      headNode.removeChild(scriptNodes[i]);
}


// now the body
// copy the node that contains the login form
var originalNode = document.getElementById('loginForm');
var newNode = originalNode.cloneNode(true);

// nuke all other nodes from document.body
if (document.body.hasChildNodes()) {
    while (document.body.childNodes.length >= 1)
        document.body.removeChild(document.body.firstChild);
}

// paste the node with login form into the now empty body
document.body.appendChild(newNode);