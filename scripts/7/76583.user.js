// ==UserScript==
// @name           GrassMudHorseRegister
// @namespace      http://www.raymondchen.com/userscript
// @description    Grass Mud Horse comes to rescue
// @include        http://*/*
// @exclude        http://*.google.com.*/*
// ==/UserScript==
/**
This script simply replace the link, http://www.miibeian.gov.cn, with something else.
*/
var allElements, thisElement;
allElements = document.getElementsByTagName('A');
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  if (thisElement.href.indexOf('www.miibeian.gov.cn')>=0) {
	thisElement.innerHTML='\u8349\u6CE5\u9A6C\u5907\u6848';
	thisElement.href="http://www.google.com.hk";
var logo = document.createElement('img');
logo.src = 'data:image/gif;base64,R0lGODlhIAAgALMKAOHAt1dHQsDAwL%2B%2FvwICAse5tci5tf%2F%2F%2FwAAAPDg2%2F%2F%2F%' +'2FwAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAgACAAAATYUMlJKz0oH8v7zUCSaF4pYUgorohgcqi6igf2fum81iJyKzEd7TDzmYJCns7Y' +'QeqUQqZFkEsShYSeByFMQHVZbQdRKOyu3bCYQzYYvN2Vem1BGAruuGhOr5Dxb3F8fRRtZXIEiYl7S1t3d3o9jWNleF1ccVJ%' +'2Bd4dRepqFbpCRUVuVgYKLLI54ZoI1B2qgE22jWLCxq5SAabhhAAUBjo%' + '2B3sFnAAQgblJzFscjKJnatWIrB0S92ol0ABsnLN9N5M93fP7SArgnQ4OcKA9pv5djuOG7m9U0k%2BRIRADs%3D';
thisElement.parentNode.insertBefore(logo, thisElement);
	break;
  } 
}