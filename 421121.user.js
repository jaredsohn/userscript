// ==UserScript==
// @name       Motherless inline video for 4chan
// @version    0.2
// @description see name
// @match      http://*.4chan.org/*
// @copyright  2014, Heaven
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var reg = new RegExp(/\b(([A-F]|\d){6,8})\b/g); // matches motherless video id
var posts = document.getElementsByClassName("postMessage");
var videoIds = [];

$(".postMessage").each(function() {
    makeClickable($(this));              
});

function getTitle(videoID){
    var url = "http://www.motherless.com/" + videoID;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url, false);
    xhr.send();
    return xhr.responseText.split("<title>")[1].split(" - ")[0];
}

function makeClickable(post){
    videoIds = post[0].innerHTML.match(reg);
    if(videoIds != null){
        for(var v in videoIds){   
            var title = "";//getTitle(videoIds[v]);
            var thumbUrl = "http://thumbs.motherlessmedia.com/thumbs/" + videoIds[v] + ".jpg";
            var replaceString = "<div><a target=\"_blank\" href=\"http://www.motherless.com/" + videoIds[v] + "\"><img style=\"float:left; padding:1px; border: 1px solid white;\" height=\"150\" width=\"150\" src=\"" + thumbUrl +"\" /></a></div>";
            
            //if(title.substr(0,3) != "404"){
                post[0].innerHTML = post[0].innerHTML.replace(videoIds[v], replaceString);
            //}            
        }
    }
    
    videoIds = [];
};