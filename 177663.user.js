// ==UserScript==
// @name          C-SPAN Popout Clean & Resize
// @description   Clean & Resize the C-SPAN video popout
// @include       http://www.c-span.org/flvPop.aspx*
// @include       http://c-span.org/flvPop.aspx*
// @version       0.2.1
// ==/UserScript==

function Clear() {
    document.body.innerHTML = document.body.innerHTML.replace(/&nbsp;|<br \/>|<br>|<br\/>/g,"");
}

function Clean() {
    var videoObject = document.getElementById("cspanVideo");
    var videoObjectDiv = videoObject.parentNode.parentNode;
    var logoImage = videoObjectDiv.firstChild.nextSibling;
    document.body.style.padding = "0 0 0 0";
    document.body.style.margin = "0 0 0 0";
    document.body.parentNode.style.padding = "0 0 0 0";
    document.body.parentNode.style.margin = "0 0 0 0";
    videoObjectDiv.style.margin = "0 0 0 0";
    logoImage.style.display = "none";
}

function Blackout() {
    var videoObject = document.getElementById("cspanVideo");
    document.body.style.backgroundColor = "black";
    videoObject.parentNode.parentNode.style.backgroundColor = "black";
    videoObject.parentNode.style.backgroundColor = "black";
}

function VideoResize() {
    var videoObject = document.getElementById("cspanVideo");
    var videoElement = document.getElementsByName("cspanVideo")[0];
    videoObject.height = window.innerHeight;
    videoObject.width = window.innerWidth;
    videoElement.height = window.innerHeight;
    videoElement.width = window.innerWidth;
}

Clear();
Clean();
Blackout();
VideoResize();

window.onresize = VideoResize;
