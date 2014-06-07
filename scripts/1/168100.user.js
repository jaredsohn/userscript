// ==UserScript==
// @name       Add YouTube to Google Search Bar
// @namespace  AfzalivE
// @version    1.0
// @description  Adds back the missing YouTube link in the new Google Search Bar
// @include      https://www.google.*/search*
// @include      http://www.google.*/search*
// @include      https://google.*/search*
// @include      http://google.*/search*
// @copyright  2013 AfzalivE
// ==/UserScript==

query = document.getElementById("gbqfq").value;
shopping = document.getElementById("hdtb_msb").childNodes[3];
videos = document.createElement("div");
videos.setAttribute("class", "hdtb_mitem");
yt_link = document.createElement("a");
yt_link.setAttribute("class", "q qs");
yt_link.setAttribute("href", "https://www.youtube.com/results?num=20&q="+ query);
yt_link.innerHTML = "YouTube";
videos.appendChild(yt_link);
shopping.parentNode.insertBefore(videos, shopping);