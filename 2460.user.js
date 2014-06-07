// ==UserScript==
// @name                last.fm lyric finder
// @namespace           http://rm.polygonized.com
// @description         Searches for the lyrics from last.fm user pages
// @include             http://www.last.fm/user/*
// ==/UserScript==
// VERSION 1.4, I guess.

/* 
   Copyright 2005 Richard Cox (random_monkey) -- ratty4444@hotmail.com

   This is distributed under the terms of the GPL.
   http://www.gnu.org/licenses/gpl.txt
   ------------------------------------------------------------------------------
*/

function reformat(str) {

    // I know this is a shite function - get over it.

    while (str.indexOf("&amp;") != -1) {
      str = str.replace("&amp;","&");
    }
    while (str.indexOf("&") != -1) {
      str = str.replace("&", "And");
    }
    while (str.indexOf("/") != -1) {
      str = str.replace("/","%2F");
    }
    while (str.indexOf(" ") != -1) {
      str = str.replace(" ","+");
    }
    while (str.indexOf("#") != -1) {
      str = str.replace("#","%23");
    }
    return str;
}

function scan() {
  if (location.href.match(/neighbours/) || location.href.match('&subtype=album')) {
    return;
  }
  var allLinks, thisLink;
  var imagecode = "data:image/gif,GIF89a%0D%00%0F%00%C4%00%00%00%00%00%FF%FF%FF%B9%B9%B9%A0%A0%A0%9F%9F%9F%93%93%93%92%92%92~~~jjjdddbbb%5C%5C%5CUUUKKKJJJBBB%3F%3F%3F%3E%3E%3E666555444%2C%2C%2C***%25%25%25%24%24%24%0E%0E%0E%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%1A%00%2C%00%00%00%00%0D%00%0F%00%00%05%3B%A0%26%8Edi%9E(%0A9%A98%01K%1BMXF%A0%18%A2!%D9p%5E%0A%91%81r%C2%24F%8DS%85!%12%E8L%96%87P%40%1AH%2C%99%A7)%03%E8%1EP%02%C6%A2%D0j%85%00%00%3B";

  allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < allLinks.snapshotLength; i++) {
      thisLink = allLinks.snapshotItem(i);
      thisPath = thisLink.href;
      thisClass = thisLink.getAttribute("class");
      if (thisClass != "img" && thisClass != "it" && thisClass !="lfmlight") {
        if (thisPath.indexOf("/music/") != -1) {
          var image = document.createElement("span");
          var artist = thisPath.split('/')[4];
          var song = thisPath.split('/')[6]; // declared 'undefined' if no value found
          if (song == null) {
            image.innerHTML = '<a href="http://www.songmeanings.net/query.php?action=artists&query=' + artist + '" target="_blank"><img border="0" src="' + imagecode + '" alt="Lyrics for ' + artist + '"></a>&nbsp;&nbsp;';
          } else {
            image.innerHTML = '<a href="http://www.songmeanings.net/query.php?action=title&query=' + song + '" target="_blank"><img border="0" src="' + imagecode + '" alt="Lyrics for ' + song + '"></a>&nbsp;&nbsp;';
          }
          thisLink.parentNode.insertBefore(image, thisLink);
        } else if (thisPath.indexOf("/musicpages/") != -1) {
          var image = document.createElement("span");
          var artist = thisLink.innerHTML.split(' - ')[0];
          var song = thisLink.innerHTML.split(' - ')[1];
          if (song == null) {
            image.innerHTML = '<a href="http://www.songmeanings.net/query.php?action=artists&query=' + reformat(artist) + '" target="_blank"><img border="0" src="' + imagecode + '" alt="Lyrics for ' + artist + '"></a>&nbsp;&nbsp;';
          } else {
            image.innerHTML = '<a href="http://www.songmeanings.net/query.php?action=title&query=' + reformat(song) + '" target="_blank"><img border="0" src="' + imagecode + '" alt="Lyrics for ' + song + '"></a>&nbsp;&nbsp;';
          }
          thisLink.parentNode.insertBefore(image, thisLink);
        }
     }
  }
}

window.addEventListener('load', function() { scan(); }, true);