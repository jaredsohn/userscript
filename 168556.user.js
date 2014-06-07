// ==UserScript==
// @name       SongzaYT
// @namespace  http://twitter.com/iphone4life4
// @version    0.9
// @description Will search the current song playing on songza.com on youtube for you.
// @require	https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @require http://code.jquery.com/jquery-2.0.0.min.js
// @match      http://songza.com/*
// @copyright  2013+, Manvir Singh
// @icon       https://dl.dropboxusercontent.com/u/19835281/icon.png
// ==/UserScript==
/********************************************************************************************************************
A note to developers: Use namespaces and DO NOT plot the global scope. =)
 
 What is namespacing?

In many programming languages, namespacing is a technique employed to avoid collisions with other objects or variables in the global namespace. 
They're also extremely useful for helping organize blocks of functionality in your application into easily manageable groups that can be uniquely identified.
 
**********************************************************************************************************************/

if (window.top != window.self)  //don't run on frames or iframes
{
    //Optional: GM_log ('In frame');
    return;
}
var iphone4life4={download_clicked:function(){var a=$("span.szi-artist").html(),b=$("span.szi-song").html();window.open("https://www.youtube.com/results?search_query="+b+" by "+a)},main:function(a){a.append('<div id="button_yt" class="btn">Search YT</div> ');document.getElementById("button_yt").addEventListener("click",iphone4life4.download_clicked,!1)}};waitForKeyElements("div.szi-actions",iphone4life4.main);
