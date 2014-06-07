// ==UserScript==
// @name          Content Frame Enhancer
// @author        James Pereira
// @namespace     http://www.sawdustbunny.com/
// @description   A different look for the new Facebook.
// @description   "facebook me": facebook.com/profile.php?id=208628
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==


var content = document.getElementById('content');
var navigator = document.getElementById('navigator');
var img_header = 'data:image/gif;base64,' +
                 'R0lGODlhigIkAKUAADtZmD1amT9bmj5cmUFfm0NgnEVhnUdjnktnoE1ook9qo1JspFNtpVlyqGuCsXSJ' +
                 'tnaLt5KjxpamyKGvzqWzz6u306u406+61bfC2b3H3MfQ4trg7ODl7+/y9/j5+/j5/Pn6/P39/v3+/v7+' +
                 '/////ztZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZ' +
                 'mDtZmDtZmDtZmDtZmDtZmDtZmDtZmDtZmCwAAAAAigIkAAAG/kCAcEgsGo/IpHLJbDqf0Kh0Sq1ar9is' +
                 'dsvter/gsLhLKpvP6DR6zG673/C4fE6v2+/4unrPz/v/gIGCg4SFhodifIpmiI2Oj5CRkpOUgYuKlZma' +
                 'm5ydnp9+l3ugpKWmp6ipmqJpqq6vsLGys1asa7S4ubq7vJm2jL3BwsPExYm/JMbKy8zNzcjJztLT1NWo' +
                 'yNbZ2tvchtjd4OHi42Df5Ofo6epG5uvu7/DV7fH09fa78/f6+/yk+f0AAwps9G+gwYMI6RRMyLChwy0L' +
                 'H0qcSFFJxIoYMz68qLGjx4AcP4ocGS8kyZMox5lMybKlvF8uY8rktnKmzZu5auLcyTOVKs6eQINy+im0' +
                 'qNFHRI8qXWoJJtOnUB0ljUq16jFbVrNq1eN0q9evV1kFAQA7';

content.style.border = "2px solid #9DA4D4";
navigator.style.background = "url('"+img_header+"')";
navigator.style.marginRight = "-1px";

dlh = document.location.href;
if (dlh.indexOf('home.php') != -1) {
// homepage specifc
        var home_container = document.getElementById('home_container');
        home_container.style.width = "648px";
        content.style.width = "647px";
} else if (dlh.indexOf('notes.php') != -1) {
// notes specific
        var notes_content = document.getElementById('notes_content');
        notes_content.style.width = "648px";
        content.style.width = "647px";
} else if (dlh.indexOf('group.php') != -1 || dlh.indexOf('event.php') != -1) {
// group or event page specific
        content.style.width = "647px";
} else if (dlh.indexOf('posted.php') != -1 || dlh.indexOf('event.php') != -1) {
// group or event page specific
        content.style.width = "647px";
}