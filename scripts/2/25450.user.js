// ==UserScript==
// @name           BenHeck Additional Emoticons
// @namespace      Electric Rain
// @description    V3.2 - Inserts a new row of customizable emoticons on the BenHeck forums!
// @include http://forums.benheck.com/posting.php*
// @include http://forums.benheck.com/privmsg.php*
// ==/UserScript==


var allRows = document.getElementsByTagName('tr');
var newRow = document.createElement('tr');
var loc = document.location.href;

if (loc == "http://forums.benheck.com/posting.php") {
  var properRow = allRows[21];
  properRow.parentNode.insertBefore(newRow,properRow);
}

else if (loc.search("http://forums.benheck.com/posting.php?") != -1) {
  var properRow = allRows[16];
  properRow.parentNode.insertBefore(newRow,properRow);
}

if (loc == "http://forums.benheck.com/privmsg.php") {
  var properRow = allRows[23];
  properRow.parentNode.insertBefore(newRow,properRow);
}

else if(loc.search("http://forums.benheck.com/privmsg.php?") != -1 && loc.search("mode=") != -1 && loc.search("folder=") == -1) {
  var properRow = allRows[17];
  properRow.parentNode.insertBefore(newRow,properRow);
}


var emoticon1url = "http://www.tredonox.com/emoticons/icon_wtf.gif";
var emoticon1alt = "WTF";
var emoticon1title = "WTF, by Skyone";

var emoticon2url = "http://www.tredonox.com/emoticons/icon_happyanimeeyes.gif";
var emoticon2alt = "Happy Anime Eyes";
var emoticon2title = "Happy Anime Eyes, by Electric Rain";

var emoticon3url = "http://www.tredonox.com/emoticons/icon_shiftyeyes.gif";
var emoticon3alt = "Shifty Eyes";
var emoticon3title = "Shifty Eyes, by Electric Rain";

var emoticon4url = "http://www.tredonox.com/emoticons/icon_xeyes.gif";
var emoticon4alt = "X Eyes";
var emoticon4title = "X Eyes, by Electric Rain";

properRow.innerHTML = "<td><a href='javascript:emoticon(\"[img]" + emoticon1url + "[/img]\")'><img src='" + emoticon1url + "' border='0' alt='" + emoticon1alt + "'title='" + emoticon1title + "'></a></td><td><a href='javascript:emoticon(\"[img]" + emoticon2url + "[/img]\")'><img src='" + emoticon2url + "' border='0' alt='" + emoticon2alt + "'title='" + emoticon2title + "'></a></td><td><a href='javascript:emoticon(\"[img]" + emoticon3url + "[/img]\")'><img src='" + emoticon3url + "' border='0' alt='" + emoticon3alt + "'title='" + emoticon3title + "'></a></td><td><a href='javascript:emoticon(\"[img]" + emoticon4url + "[/img]\")'><img src='" + emoticon4url + "' border='0' alt='" + emoticon4alt + "'title='" + emoticon4title + "'></a></td>";


var foronchange = 'var oldMessage = document.getElementsByName("message")[0].value; var emoticon1symbol = /:wtf:/gi; var emoticon2symbol = /\\^-\\^/gi; var emoticon3symbol = /\>\.\>/gi; var emoticon4symbol = /:XD:/gi; var theMessage1 = oldMessage.replace(emoticon1symbol, " [img]' + emoticon1url + '[/img] "); var theMessage2 = theMessage1.replace(emoticon2symbol, " [img]' + emoticon2url + '[/img] ");  var theMessage3 = theMessage2.replace(emoticon3symbol, " [img]' + emoticon3url + '[/img] ");  var theMessage4 = theMessage3.replace(emoticon4symbol, " [img]' + emoticon4url + '[/img] "); document.getElementsByName("message")[0].value = theMessage4;';
document.getElementsByName("message")[0].setAttribute('onchange', foronchange);