// ==UserScript==
// @name           Random Artist/Band
// @author         sanguinepenguinx
// @version        1.0
// @namespace      http://what.cd
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// @description    Places a link to a random artist and album near your profile link
// ==/UserScript==

// How many artists are on the site (look on the home page)
const NUM_ARTISTS = 97866;
const NUM_ALBUMS = 318455;
URLRANDOM = "&random=true";

// Edit these if you use SSL
var artist_preurl = "http://what.cd/artist.php?id=";
var album_preurl = "http://what.cd/torrents.php?id=";
// end config

var randomartist = Math.floor(Math.random()*(NUM_ARTISTS+1));
var artist_url = artist_preurl + randomartist + URLRANDOM;

var randomalbum = Math.floor(Math.random()*(NUM_ALBUMS+1));
var album_url = album_preurl + randomalbum + URLRANDOM;

var badtag = false;

if ((document.getElementsByClassName('sidebar')[0] != undefined) && (document.location.toString().match(/random=true/))){
    var tags = document.getElementsByClassName('sidebar')[0].getElementsByTagName('a');
    for (var i=0;i<tags.length;i++) {
        if (tags[i].textContent.match(/(apps|ebook|sheet\.music|elearning)/)) badtag = true;
    }
}

if (document.title.match(/Error 404/) || (window.location.toString().match(/(torrents|artist)/) && badtag) || (document.getElementsByClassName("torrent_table").length == 0 && document.location.toString().match(/random=true/))) {
    if (window.location.toString().match(/torrents/)) window.location = album_url;
    if (window.location.toString().match(/artist/)) window.location = artist_url;
}

var userinfo = document.getElementById("userinfo");

var links = document.createElement('ul');
links.id = "userinfo_random";

var artist_link = document.createElement('a');
var artist_item = document.createElement('li');
artist_link.href = artist_url;
artist_link.textContent = "Random Artist";
artist_item.appendChild(artist_link);

var album_link = document.createElement('a');
var album_item = document.createElement('li');
album_link.href = album_url;
album_link.textContent = "Random Album ";
album_item.appendChild(album_link);

links.appendChild(artist_item);
links.appendChild(album_item);

//window.addEventListener('load',function() {userinfo.appendChild(links)},false);
userinfo.appendChild(links);

document.getElementsByClassName = function(className, parentElement) {
  if (Prototype.BrowserFeatures.XPath) {
    var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
    return document._getElementsByXPath(q, parentElement);
  } else {
    var children = ($(parentElement) || document.body).getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
      child = children[i];
      if (Element.hasClassName(child, className))
        elements.push(Element.extend(child));
    }
    return elements;
  }
};