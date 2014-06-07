// ==UserScript==
// @name          Eternal's Hackforums Menu
// @namespace     Eternal
// @include      *hackforums.net*
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=242'>Empire</a> | <a href='forumdisplay.php?fid=280'>Brotherhood</a> | <a href='forumdisplay.php?fid=250'>143</a> | <a href='forumdisplay.php?fid=242'>Empire</a> | <a href='forumdisplay.php?fid=171'>VPN</a> |  <a href='forumdisplay.php?fid=91'>VPN & Proxies</a> | <a href='forumdisplay.php?fid=173'>Requests</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);