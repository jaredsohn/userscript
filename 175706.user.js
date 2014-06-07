// ==UserScript==
// @name        MyAnimeList to reddit formatting button
// @description Adds links to mal that formats for reddit suggestions
// @grant       metadata
// @include     http://myanimelist.net/animelist/*
// @include     http://myanimelist.net/anime/*
// @version     1.1
// ==/UserScript==


function remove_parens(word){
    var result = word.replace(")", "");
    result = result.replace("(", "");
    return result
}

function add_copy_link(name,weblink,loca){
    var anime_link = remove_parens(weblink);
    var copy_link = document.createElement('button');
    copy_link.style.height = "12px";
    copy_link.style.width = "16px";
    copy_link.onclick = function(){
        //TO CHANGE FORMAT 
        //plain
        var copy_text = "[" + name + "](" + anime_link + ")"
        //bulleted
        //var copy_text = "* [" + name + "](" + anime_link + ")"
        //some_baneling style
        //var copy_text = "* **" + name + "** - [MAL](" + anime_link + ")"
        window.prompt ("Copy to clipboard: Ctrl+C, Enter",copy_text)
    };
    
    loca.appendChild(copy_link);
    return;
}

var a=document.links;
var i;
for(i=0;i<a.length;i++){
    if(a[i].className == "animetitle"){
        var par = a[i].parentNode.getElementsByTagName("div")[0];
        add_copy_link(a[i].text, a[i].href , par);
    }
}

//I couldn't find a way to do name_bar.text or something like that
var name_bar = document.getElementsByTagName("h1")[0];
var parts = name_bar.innerHTML.split(">");
var anime_name = parts.pop();
var current_url = document.URL;
var place = document.getElementById("horiznav_nav");
add_copy_link(anime_name, current_url, place);




