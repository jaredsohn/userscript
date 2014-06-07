// ==UserScript==
// @name           Bnet Screen Saver
// @namespace      www.bungie.net
// @include        http://*bungie.net*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        1
// ==/UserScript==

document.getElementById('ctl00_dashboardNav_loggedInNormal').innerHTML += '<div id="box" class="poo"></div>'

function pop_on(){
document.getElementById('box').className = 'box';
document.getElementById('box').addEventListener('mousemove', pop_off, true)
}

function pop_off(){
$("#box").fadeOut(2000,yo);

function yo(){
document.getElementById('box').className = 'poo';
}
}
var t=setTimeout(pop_on,25000);
var images = new Array('','http://www.bungie.net/images/Games/Halo3ODST/imagery/wallpapers/odst_chars/ODST_chars_1600_1200.jpg','http://www.bungie.net/images/Games/Reach/images/visualID/REACH_KeyArt_Horizontal_1920x1080.jpg','http://www.desktopexchange.com/gallery/albums/Game_widescreen_wallpaper/halo3.jpg');
var randomyo = Math.ceil((Math.random()*10)/3);

var styleyo = document.createElement('style'); 
styleyo.type = 'text/css'; 
eval("styleyo.innerHTML = '.box{z-index:9000;background:#000000 url("+images[randomyo]+") center fixed no-repeat;position:fixed;left:0%;top:0%;width:100%;height:100%;opacity:0.8;} .poo{z-index:-9000;}'")
document.getElementsByTagName('head')[0].appendChild(styleyo); 
