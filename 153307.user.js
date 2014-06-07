// ==UserScript==
// @name iOS & iDevices
// @version    0.1
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=137'>iPhone & iPod Touch</a> ";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
    