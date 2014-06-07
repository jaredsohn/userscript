// ==UserScript==
// @name           4chan GET Modified
// @namespace      HERPDERP
// @include        http*://coastercrazy.com*
// @version        0.9.2
// @updateURL      http://userscripts.org/scripts/source/117715.user.js
// @homepage       http://userscripts.org/scripts/show/117715
// ==/UserScript==
function setup() {
getbox = window.document.createElement('div');
getbox.innerHTML = "<html> <head> <title></title> </head> <body> <table border='0' cellpadding='0' cellspacing='1' id='getbox' style='width: 200px;'> <tbody> <tr> <td colspan='2'> <label name='getstatus'>Ready...</label></td> </tr> <tr> <td colspan='2' style='text-align: center;'> <input name='txtpostnumber' size='24' style='width: 100%' type='text' /></td> </tr> <tr> <td style='text-align: center; width: 32%;'> <input name='btqrpost' style='width: 100%' type='button' value='Post' /></td> <td style='text-align: center; width: 36%;'> <input name='btpostrate' style='width: 100%' type='button' value='Post Rate' /></td> </tr> </tbody> </table> <p> &nbsp;</p> </body> </html>";
if (sticky == true) {
    getbox.style.position = "fixed";
}
else {
    getbox.style.position = "absolute";
}
getbox.style.right = "20px";
getbox.style.top = "39px";
window.document.getElementsByTagName("body")[0].appendChild(getbox);