// ==UserScript==
// @name Covert Video to mp3 online in seconds
// @description Adds a button that lets you download YouTube videos audio as MP3.
// @namespace  http://chrismgonzales.wordpress.com/
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @match http://www.youtube-mp3.org/*
// @author AJAY R
// @version 0.1
// @license GNU General Public License
// ==/UserScript==


var RANDOM=Math.floor(Math.random()*1234567890);
var BUTTON_ID='download-youtube-mp3-button'+RANDOM;
var AFTER_FUNCTION;

function removeElementById(id){
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function cleanUp(){
    removeElementById('description');
    removeElementById('footer');
    var header = document.getElementsByTagName('h1')[0];
    header.parentNode.removeChild(header);
    var form = document.getElementById('form');
    form.style.display = 'none';
    var brokenThing = document.getElementById('sad');
    brokenThing.style.display = 'none';
}

function doStuff(){
    var dlink = document.getElementById('dl_link');
    if(dlink.children.length < 2){
        setTimeout(doStuff, 500);
    }
    else{
        var mp3link = 'http://www.youtube-mp3.org' + dlink.children[0].attributes[0].nodeValue;
        window.location.assign(mp3link);
        setTimeout(window.close, 500);
    }
}

function afterLoad(){
    AFTER_FUNCTION.call();
    setTimeout(doStuff, 500);
}

function mpclick(){
    var videoURL = 'http://www.youtube-mp3.org/?c#v=' + document.URL.substring(document.URL.lastIndexOf('?v=') + 3, document.URL.length) + '&hole=yes';
    window.open(videoURL);
}



function addButton(){
    var likeButtons = document.getElementById("watch-like-dislike-buttons");
    var button = document.createElement('button');
    button.setAttribute('id', BUTTON_ID);
    button.setAttribute('class', ' yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty');
    button.setAttribute('type', 'button');
    var span = document.createElement('span');
    button.appendChild(span);
    button.appendChild(document.createTextNode('MP3'));
    button.addEventListener('click', mpclick, false);
    insertAfter(likeButtons, button);
}

function siteSwitch(){
    if(document.URL.indexOf('youtube-mp3.org') !== -1 && document.URL.indexOf('&hole=yes') !== -1){
        AFTER_FUNCTION = window.onload;
        window.onload = afterLoad;
        cleanUp();
    }
    else{
        addButton();
    }
}



siteSwitch();