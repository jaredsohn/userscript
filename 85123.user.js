// ==UserScript==
// @name           Directly Invoked Pronounciation
// @namespace      http://userscripts.org/users/arrabal
// @description    Pronounces the English word right when the search is started
// @include        http://dict.leo.org/*
// ==/UserScript==


// Get the paramters
HTTP_GET_VARS=new Array();
strGET=document.location.search.substr(1,document.location.search.length);
if(strGET!='')
    {
    gArr=strGET.split('&');
    for(i=0;i<gArr.length;++i)
        {
        v='';vArr=gArr[i].split('=');
        if(vArr.length>1){v=vArr[1];}
        HTTP_GET_VARS[unescape(vArr[0])]=unescape(v);
        }
    }
 
function GET(v)
{
if(!HTTP_GET_VARS[v]){return 'undefined';}
return HTTP_GET_VARS[v];
}
// Got the paramters

var mp3name = "http://www.leo.org/dict/audio_en/" + GET("search") + ".mp3";
//alert(mp3name);


var player = document.createElement("embed");
player.setAttribute("src", mp3name);
player.setAttribute("hidden", "true");
player.setAttribute("autostart", "true");
player.setAttribute("loop", "false");
player.setAttribute("name", "pronouncation");
var body = document.getElementById('body');
body.appendChild(player);
