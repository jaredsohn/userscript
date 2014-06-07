// ==UserScript==
// @name        CPA Elites Citer
// @author      Emylbus
// @namespace   sublyme.net
// @description Makes citing threads/sections convenient and useful!
// @include     *.cpaelites.com/Forum*
// @include     *.cpaelites.com/thread*
// @version     1
// @grant       GM_getValue
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

//This script was written by Emylbus from HF. I have converted it over to work with CPA Elites. The only thing I've done was change the classes and the method of getting the titles. I take virtually no credit in creating this script. Thank you, Emy.

function getForumTitle() {
    // Screw regex, yay ugly string splitting! &nbsp; is the character between thread tags and their title.
    var forumTitle = document.title
    document.title = GM_getValue(document.URL);
    if (document.title == "undefined") {
        document.title = forumTitle;
        var forumString = "[url=" + window.location + "][b]" + forumTitle + "[/b][/url]";
        return forumString;
    }
}

function forumCiting(){
    window.prompt("Press Ctrl+C to copy forum citation!", getForumTitle());
}

function fMods(){
    document.getElementsByClassName('breadcrumb')[0].innerHTML = document.getElementsByClassName('breadcrumb')[0].innerHTML + '<a title="Cite this forum!" href="javascript:void(0);" style="position: relative; float: right; margin-top: 5px; margin-right: 5px;" id="fciter">[cite]</a>';
    $("#fciter").live("click", function(){ forumCiting(); });
    
}

function getThreadTitle() {
    // Screw regex, yay ugly string splitting! &nbsp; is the character between thread tags and their title.
    var threadTitle = document.title
    document.title = GM_getValue(document.URL);
    if (document.title == "undefined") {
        document.title = threadTitle;
        var threadString = "[url=" + window.location + "][b]" + threadTitle + "[/b][/url]";
        return threadString;
    }
}


function getThreadOP() {
    // Grab the user name and profile link from the first post. Coupled with my @exclude I know that this will only get the first post on the first page, hence OP.
    var authorArray = document.getElementsByClassName("post_author")[0].getElementsByClassName("largetext")[0];
    var authorProfile = authorArray.getElementsByTagName("a")[0];

    // For some reason trying to parse a staff member's name, I would constantly get fucked up by this strong tag. Don't need it for my purposes anyway.
    var authorName = authorProfile.innerHTML.replace("<strong>", "");

    // Again, screw regex!
    authorName = authorName.replace(">", "<").split("<");

    // Some tricksy stuff to grab the name from the middle of tags.
    authorName = authorName[Math.floor(authorName.length / 2)];
    var authorString = "[url=" + authorProfile + "]" + authorName + "[/url]";
    return authorString;
}

function generateCitation() {
    var citation = getThreadTitle() + " by " + getThreadOP();
    window.prompt("Press Ctrl+C to copy thread citation!", citation);
}

function main() {
    // This took me forever to figure out, turns out userscripts aren't directly injected into the site code so you need to use an event listener.
    document.getElementsByClassName('breadcrumb')[0].innerHTML = document.getElementsByClassName('breadcrumb')[0].innerHTML + '<a title="Cite this thread!" href="javascript:void(0);" style="position: relative; float: right; margin-top: 5px; margin-right: 5px;" id="citer">[cite]</a>';
    var elementLink = document.getElementById('citer');
    elementLink.addEventListener("click", generateCitation, true);
}
 // Dunno if I should be putting javascript in a main() function, but that's how I grew up with other languages so :P

// ---------------------------- Important Stuff ----------------------------------- //



function start(){
      if(document.URL.indexOf('/Forum') != -1){
          fMods();
              }else{
        main();
    }
}
start();

GM_log("[HFES] Opening settings window...");