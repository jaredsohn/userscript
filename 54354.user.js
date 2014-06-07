// ==UserScript==
// @name           YoutubeFree
// @namespace      http://www.tunisia_is_free.com
// @description    Alows watching Youtube in total freedom
// @include        http://*youtube.com/*
// @include        http://208.65.153.238/*
// ==/UserScript==

function $(id){
if(typeof id == "string") return document.getElementById(id)
else return (id.id)


}

function newplayer(player){

a = window.location.href
b = a.indexOf("?v")
c = a.substring(b)
d = c.indexOf("&")
if(d == -1) d = c.length
e = c.substring(3,d)

flashvars = "file=http://youtube22.com/watch/v.asp?v="+e+"&backcolor=000033&frontcolor=9999FF&lightcolor=CCCCCC&screencolor=000033&controlbar=over&autostart=true"

player.setAttribute('flashvars',flashvars)
player.src = "http://youtube22.com/watch/player.swf"

}

window.addEventListener('load',function(e){
ip = "74.125.99.80"

sv = /s\.ytimg\.com/g
loc = window.location.href
if (loc.indexOf("http://www.youtube.com/") == 0) {

loc = loc.replace(/^http:\/\/www\.youtube\.com/,"http://208.65.153.238")
window.location = loc

}

if (loc.indexOf("http://youtube.com/") == 0) {

loc = loc.replace(/^http:\/\/youtube\.com/,"http://208.65.153.238")
window.location = loc

}


if (document.body.childNodes[1].innerHTML == "Not Found"){ document.body.innerHTML="";document.title = "Redirecting ...";}



if($('movie_player'))
newplayer($('movie_player'))









},false)