// ==UserScript==
// @name       Script Modérateur JVC Part2
// @namespace  bipbop
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// @run-at document-start
// ==/UserScript==

//this redirects youtube.com to google.com - you can use this function to redirect
//from any page to any other page.
redirectToPage("http://www.jeuxvideo.com/forums_inex.htm", "http://stelfer.free.fr/forums/0-103-0-1-0-1-0-moderateurs.htm");
//You can put several of these redirects in a single script!



function redirectToPage(page1, page2){
if(window.location.href.indexOf(page1) != -1){
    window.location.href = page2;
}
}