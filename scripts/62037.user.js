// ==UserScript==
// @name			Megavideo Hack
// @description			Scriptet by THUG, from the danish site: www.thug-hack.tk
// @include			http://*.megavideo.com/?v=*
// @include			http://megavideo.com/?v=*
// ==/UserScript==

function extraTime(){
    l = document.getElementById("mvplayer");
    v = l.innerHTML.split("&amp;v=");
    v = v[1].split('"');
    video_id = v[0];

    player_obj = document.getElementById('mvplayer');
    player = '<object id="mvplayer" width="' + player_obj.width + '" height="' + player_obj.height + '" type="application/x-shockwave-flash"' +
    'data="http://www.megaporn.com/v/mv_player.swf?userid=cookie&v=' + video_id + '">' +
    '<param value="transparent" name="wmode"/>' +
    '<param value="internal" name="allownetworking"/>' +
    '<param value="http://www.megaporn.com/v/mv_player.swf?userid=cookie&v=' + video_id + '" name="movie"/>' +
    '</object>';
    player_div = document.getElementById('playerdiv');
    player_div.innerHTML = player;
    document.getElementById('switch_div').style.visibility = 'hidden';
}

function runIt(){
b = document.getElementsByTagName("body")[0];

etBox = document.createElement("div");
etBox.setAttribute("style", "width: 100px; height: 30px; position: fixed; top:100%; left:100%; margin-left:-105px; margin-top:-35px; background-color:#333333; font-weight: bold; color: #ffffff; font-family:arial; font-size:10pt; text-align:center;");
etBox.setAttribute("id", "etBox");

eImg = document.createElement("img");
eImg.setAttribute("src", "http://www.megavideo.com/mvgui/en/p_menu_o_04.gif");
eImg.setAttribute("style", "width:0px; height: 30px; visibility: hidden; vertical-align:middle;");

eText = document.createTextNode("Ekstra Tid");
etBox.appendChild(eImg);
etBox.appendChild(eText);
b.appendChild(etBox);

etBox = document.getElementById("etBox");
etBox.addEventListener("click", extraTime, true);
}

if(top.location == location){
runIt();
}