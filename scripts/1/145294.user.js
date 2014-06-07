// ==UserScript==
// @name          Pop-out Youtube Video
// @description   Adds button to Youtube video title to pop-out video
// @version       Build 4
// @include       youtube.com/watch*
// @include       *.youtube.com/watch*
// ==/UserScript==

// Create Button
var parent = document.evaluate('//div[@id="watch7-headline"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
var popout = parent.appendChild(document.createElement('button'));
popout.title = "Pop-out Video";
popout.setAttribute("data-tooltip-title", "Pop-out Video");
popout.setAttribute('onClick', 'var player = window.document.getElementById("movie_player"); var video_id = window.location.search.split("v=")[1]; var ampersandPosition = video_id.indexOf("&"); if(ampersandPosition != -1) {video_id = video_id.substring(0, ampersandPosition)};  player.stopVideo(); newwindow=window.open("http://www.youtube.com/embed/" + video_id + "?start=" + player.getCurrentTime().toString().split(".")[0] + "&autoplay=1", video_id, "height=445,width=697,top=200,left=300,resizable"); newwindow.focus()');
popout.setAttribute("class", "metadata-inline yt-uix-button yt-uix-button-hh-text yt-uix-button-group");
popout.setAttribute("style", "border: 1px solid #cccccc; background-color: #fcfcfc;");
popout.innerHTML = "Pop-out";