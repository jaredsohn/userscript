// ==UserScript==
// @name       YouTube Fix!
// @version    0.1
// @description  Removes YouTube video backgrounds if the video has one. Also changes the home button to subscriptions instead of "What to Watch".
// @match      http*://www.youtube.com/*
// @copyright  2013, uCr0
// ==/UserScript==

var vidcontainer = document.getElementById("watch7-video-container");
document.getElementById("logo-container").setAttribute("href","/feed/subscriptions");
function vevofix(){
	if(vidcontainer.hasAttribute("style")){
        vidcontainer.setAttribute("style","iloveyou");
        document.getElementById("watch7-content").setAttribute("style","margin-top:-70px;");
	}
}
setTimeout(vevofix, 1000); //Change this to a higher number if your internet connection is slow. 1000 is 1 second.