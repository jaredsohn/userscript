// ==UserScript==
// @name          MS DOS
// @namespace     PRINCE & HUMAZA
// @description   Ms Dos auto signature
// @include       *orkut*
// ==/UserScript==

var signature = '<div style="border: 2px solid rgb(153, 153, 153); padding: 0.3em; background-color: black; color: rgb(0, 255, 0); font-family: fixedsys; line-height: 1.1em;">C:><font color="red">\n\n\nWRITE HERE</font><font style="text-decoration: blink; color: rgb(0, 255, 0);">_</font>';
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)