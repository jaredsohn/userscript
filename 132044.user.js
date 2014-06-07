/*
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name           fuck it, we'll do it live
// @description    PutLocker/sockshare exploit
// @include        http://www.putlocker.com/file/*
// @include        http://www.sockshare.com/file/*
// @grant          GM_getResourceText
// @resource       JQUERY http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

eval(GM_getResourceText("JQUERY"));
button = null;

function fix_button() {
  for (var i = 0; i < 60; i++) {
    setTimeout(function() {
      countdownNum = 0;
      button.disabled = false;
      button.value = 'Continue as Free User';
    }, i * 50);
  }
}

function show_url() {
  var html = document.getElementsByTagName('html')[0].innerHTML;
  var matches = html.match("playlist: '(.*)',");

  if (matches.length != 2) {
    return;
  }

  var feed_url = "http://" + document.location.host + matches[1];

  var request = new XMLHttpRequest();
  request.open('GET', feed_url, false);
  request.send();

  if (request.status != 200) {
    return;
  }

  var video_url = $(request.responseText).find("media\\:content").attr("url");

  var video_url_box = document.createElement("input");
  video_url_box.setAttribute("type", "text");
  video_url_box.setAttribute("size", "100");
  video_url_box.setAttribute("value", video_url);
  video_url_box.setAttribute("readonly", "readonly");
  video_url_box.setAttribute("id", "video_url_box");
  video_url_box.setAttribute("name", "video_url_box");
  video_url_box.setAttribute("onClick", "SelectAll('video_url_box');");
  video_url_box.setAttribute("width", "100%");

  var embed_div = document.getElementById("embed_code");
  embed_div.parentNode.insertBefore(video_url_box, embed_div);
}

$(document).ready(function() {
  button = document.getElementById('submitButton');

  if (button !== null) {
    setTimeout(fix_button, 0);
  }
  else {
    setTimeout(show_url, 0);
  }
});
