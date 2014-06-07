// ==UserScript==
// @name Reponyfier
// @description removes m00t's trolling for Pony threads.
// @include http://boards.4chan.org/b/res/*
// ==/UserScript==

// Removes the video.
document.getElementsByClassName("buttsbutts")[0].innerHTML = "";

// Removes the "extra" styles
styles = document.getElementsByTagName("style")[5].innerHTML;
for (i in styles) {
    i.innerHtml = "";
}
