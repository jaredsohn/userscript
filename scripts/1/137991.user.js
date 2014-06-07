// ==UserScript==
// @name          CSS-Test
// @include 	  file:///home/chris/Documents/index.html

function addStyle(style) {
var head = document.getElementsByTagName("HEA­D")[0];
var ele = head.appendChild(window.document.c­reateElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import "/home/chris/Documents/css-test.css";');­ 

// ==/UserScript==
