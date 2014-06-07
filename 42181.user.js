// ==UserScript==
// @name          justintv chatbox remover
// @namespace     http://127.0.0.1
// @description	  removes the in match chat box  
// @include       http://www.justin.tv*
// ==/UserScript==
obj = document.getElementById('right_column');
obj.parentNode.removeChild(obj);

