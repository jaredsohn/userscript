// ==UserScript==
// @name        Youtube Inbox link
// @namespace   *.youtube.*
// @description Adds Link for inbox on Homepage
// @include     *.youtube.*
// @version     2
// @grant       none
// Creator Valentinodal@gmail.com
// ==/UserScript==

//set-get-Edit Url for thumpnail
try
  {
var str = new String(window.location.href); 
var nstr = str.slice(31);
var tarstr = 'http://i1.ytimg.com/vi/' + nstr + '/maxresdefault.jpg';
  }
  catch(err)

   
  {
  }


//Add Links And extras(Inbox, Subscriber, Thumbnail)
document.getElementById('upload-button-menu').innerHTML += '<li id="Inbox" role="menuitem"><a href="http://youtube.com/inbox" class="yt-uix-button-menu-item upload-menu-item yt-uix-sessionlink"><span class="yt-valign icon-container"><img class="upload-menu-vm-icon" src="http://png-1.findicons.com/files/icons/1580/devine_icons_part_2/128/mail_2.png"></span>Inbox</a></li>'
document.getElementById('upload-button-menu').innerHTML += '<li id="Subscribers" role="menuitem"><a href="http://youtube.com/subscribers" class="yt-uix-button-menu-item upload-menu-item yt-uix-sessionlink"><span class="yt-valign icon-container"><img class="upload-menu-vm-icon" src="http://www.thewwwblog.com/images/rss-icon-large.gif"></span>Subscribers</a></li>'
try
  {
document.getElementById('watch-headline-title').innerHTML += '<a onclick="popup1.show();return false;" href="#"';
document.getElementById('watch-headline-title').innerHTML += '<p align="right"><font size="2">  </font> <a href=' + tarstr + '><img src="' + tarstr + '" alt="Image of Tumpnail" width="126" height="70" title="Get Thumpnail!"></a></p>';
}
  catch(err)

   
  {
  }