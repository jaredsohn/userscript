// ==UserScript==
// @name        Youtube Layout Fixer
// @namespace   somepotato.yt.layout
// @description Fix youtubes atrocious non-widescreen layout.
// @include     *youtube.com/*
// @exclude *youtube.com/user/*
// @version     1
// ==/UserScript==
if(document.location.toString().indexOf('/watch?')!=-1){

    var content=document.getElementById('watch7-content');
    content.style.width="100%";
    var sidebar=document.getElementById('watch7-sidebar');
    sidebar.style.width=content.offsetWidth+"px";
    return;
}
var content=document.getElementsByClassName("branded-page-v2-container enable-fancy-subscribe-button")[0]
var guide=document.getElementById("guide")
content.style.width=window.innerWidth-(guide.offsetWidth+70)+"px";
