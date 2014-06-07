// ==UserScript==
// @name       xadamxk custom header
// @namespace  http://www.google.com.au/
// @version    0.1
// @description  Modified by Raptor. originally made by xadamxk
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=242'>Empire</a> | <a href='forumdisplay.php?fid=87'>Computing</a> |  <a href='forumdisplay.php?fid=89'>News</a> | <a href='forumdisplay.php?fid=226'>Domains</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
