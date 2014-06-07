// ==UserScript==
// @name       xadamxk custom header
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Adds "Red Lion" | "Writ3rs" | "Empire" | "iOS & iDevices"
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=242'>Empire</a> | <a href='forumdisplay.php?fid=280'>Brotherhood</a> |  <a href='forumdisplay.php?fid=124'>Legion</a> | <a href='forumdisplay.php?fid=276'>Complexity</a> | <a href='forumdisplay.php?fid=137'>iOS & iDevices</a> | <a href='forumdisplay.php?fid=134'>Suggestions & Ideas</a> | <a href='forumdisplay.php?fid=123'>Mentor</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

