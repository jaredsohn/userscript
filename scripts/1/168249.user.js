// ==UserScript==
// @name          xerotic's HF Special Links - Genuine
// @namespace     xerotic/hflinksgenuines
// @description   Adds special links to the HackForums header.
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=219'>Graphics Market</a> | <a href='forumdisplay.php?fid=44'>Buyers Bay</a> | <a href='forumdisplay.php?fid=276'>Complexity</a> | <a href='forumdisplay.php?fid=89'>News & Happenings</a> | <a href='forumdisplay.php?fid=25'>The Lounge</a> | <a href='disputedb.php'>Dispute Database</a> | <a href='forumdisplay.php?fid=163'>MarketPlace Discussions</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

