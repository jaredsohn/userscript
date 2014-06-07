// ==UserScript==
// @name       Youtube Scriptwork
// @namespace  http://www.reddit.com/user/ImANewRedditor
// @version    0.2
// @description  Modifies youtube.
// @match      http://www.youtube.com/*
// @copyright  2012+, You
// ==/UserScript==

// sA = scroll across - used for modifying the position of the playlist scroll-bar

var sA = 480, position = 0, olExist = false, cont, bEOn, bETw, bETh, maxLeft = 0, cSize = false;

GM_addStyle("body #masthead-expanded .list-video-count { color: white; }");

function modifyButtons()
{
    var nB, pB;
    
    cont = document.getElementById("playlist-bar-lists-content");
    cont.style.left = "0px";
    
    nB = document.getElementsByClassName("yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-next");
    pB = document.getElementsByClassName("yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-prev");
    
    nB = nB.item();
    pB = pB.item();
    
    nB.addEventListener("click", function() { if (position-sA <= maxLeft) { position = maxLeft; }else{ position -= sA; } cont.style.left = position.toString() + "px";}, true);
    pB.addEventListener("click", function() { if (position+sA >= 0) { position = 0; }else { position += sA; } cont.style.left = position.toString() + "px";}, true);
    olExist = true;
    cSize = true;
}

// Fires on youtube homepage.
if (document.URL == "http://www.youtube.com/")
{
    GM_addStyle("#yt-masthead-user-displayname { color: black; }");
    GM_addStyle(".guide-item, .guide-header-item { color: black; }");
    GM_addStyle(".guide-item .guide-count { color: black; }");
}

// adds fix for playlist bar slider; requires dropdown to be clicked three times.
if (document.URL.match(/com\/watch/) != null)
{
    bEOn = document.getElementById("yt-masthead-user-displayname");
    bETw = document.getElementsByClassName("yt-masthead-user-icon yt-uix-button yt-uix-button-default").item();
    bETh = document.getElementById("yt-masthead-dropdown");
    
    bEOn.addEventListener("click", function() { if (olExist == false) { modifyButtons(); } }, true);
    bETw.addEventListener("click", function() { if (olExist == false) { modifyButtons(); } }, true);
    bETh.addEventListener("click", function() { if (olExist == false) { modifyButtons(); } }, true);
    
    bEOn.addEventListener("click", function() { if (cSize) { maxLeft = document.getElementById("playlist-bar-lists-content").clientWidth -  1483; maxLeft = maxLeft * -1; } }, true);
    bETw.addEventListener("click", function() { if (cSize) { maxLeft = document.getElementById("playlist-bar-lists-content").clientWidth -  1483; maxLeft = maxLeft * -1; } }, true);
    bETh.addEventListener("click", function() { if (cSize) { maxLeft = document.getElementById("playlist-bar-lists-content").clientWidth -  1483; maxLeft = maxLeft * -1; } }, true);
}

// on YouTube user page, switch from main page to video page; prevents playing of upsell video
//if (document.URL.match(/user\/*\//) != null && document.URL.match(/videos/) == null)
//{
//    document.getElementsByClassName("yt-uix-button  spf-link  yt-uix-sessionlink yt-uix-button-epic-nav-item")[0].click();
//}

var searchBar = document.getElementById("masthead-search-term"), playNext = document.getElementById("watch7-playlist-bar-next-button"), playPrev = document.getElementById("watch7-playlist-bar-prev-button");

function doc_keyUp(e)
{
    if (e.altKey && e.keyCode == 83)
    {
        // put focus on search bar
        searchBar.focus();
    }
    else if (e.ctrlKey && e.keyCode == 37 && playPrev != null)
    {
        // play previous video
        playPrev.click();
    }
        else if (e.ctrlKey && e.keyCode == 39 && playNext != null)
        {
            // play next video
            playNext.click();
        }
}

// register the handler
if (searchBar != undefined)
{
    document.addEventListener('keyup', doc_keyUp, false);
}



function dupDetect(pA)
{
    // Duplicate array
    var dA = [], kount = -1, z = 0;
    for (z=0;z<pA.length-1;z++)
    {
        if ((dA[kount] !== pA[z]) && (pA[z] == pA[z+1]))
        {
            kount += 1;
            dA[kount] = pA[z];
        }
    }
    return dA;
}



function makeWindow(playlistInfo, oO) // oO = original playlist order
{
    var k = 0, windowSpecs = '', display = "", myWindow = "", z = 0;
    
    windowSpecs += 'height=' + screen.height + ',width=' + screen.width;
    
    myWindow = window.open('','',windowSpecs);
    
    display = "<p>" + playlistInfo.length + " videos have duplicates:" + "</p>";
    myWindow.document.write(display);
    
    for (k=0;k<playlistInfo.length;k++)
    {
        display = "<p>" + playlistInfo[k];
        for (z=1;z<oO.length+1;z++)
        {
            if (oO[z-1] == playlistInfo[k])
            {
                display += " " + z;
            }
        }
        display += "</p>";
        myWindow.document.write(display);
    }
    
    myWindow.focus();
}



function playArrayBuilder()
{
    // playlistHolder = content container; aDup = array that contains videos that have duplicates; aPlaylist = array that contains all playlist elements; c = counter; aTemp = contains aPlaylist.sort
    var playlistHolder = document.getElementById("watch7-playlist-tray"), aDup = "", aPlaylist = [], c = 0, aTemp = [];
    
    for (c=0;c<playlistHolder.childElementCount;c++)
    {
        aPlaylist[c] = playlistHolder.children[c].dataset.videoTitle;
        aTemp[c] = aPlaylist[c];
    }
    
    // videos get sorted before being displayed to allow for easy noting of duplicates
    aTemp.sort();
    
    aDup = dupDetect(aTemp);
    
    if (aDup.length>0)
    {
        makeWindow(aDup,aPlaylist);
        return;
    }
    
    // Display alert that no dups are detected.
    alert("There are no duplicates in this playlist.");
}



// Create button to detect duplicates.
var dupButtonLocation = document.getElementById("watch7-playlist-bar-controls"), dupButton = document.createElement("BUTTON"), dupText = document.createTextNode("Show Duplicates");

if (document.URL.match("&list=") !== null)
{
    // Add text to button, add click event, and append button to header
    dupButton.appendChild(dupText);
    dupButton.onclick = playArrayBuilder;
    dupButtonLocation.appendChild(dupButton);
    dupButton.style.color = "White";
}

// define a handler
function doc_keyUp(e) {

    // test if alt key and "p" key were pressed
    if (e.altKey && e.keyCode == 80)
    {
        // change webpage to my playlist webpage
        window.location.href = "http://www.youtube.com/user/RandomName327/videos?flow=list&view=1&live_view=500&sort=dd";
    }
}

// register the handler
document.addEventListener('keyup', doc_keyUp, false);