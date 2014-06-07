// ==UserScript==
// @name        AutoCookie - navigatorcraft
// @namespace   ornicare
// @include     http://navigatorcraft.net/batiment/2
// @include     http://navigatorcraft.net/batiment/7
// @version     1
// @grant       none
// @description A small script to auto eat cookies on navigatorcraft game. [Un petit script qui mange automatiquement les cookies sur navigatorcraft]
// ==/UserScript==

//Auto eatCookies
var cookie = document.getElementById('ico_displayClic');
if(cookie!=null) cookie.click();

var zDiv = document.createElement('div');
zDiv.setAttribute('id','cookieEater');
zDiv.innerHTML = 'AutoCookie in work...';
document.body.appendChild(zDiv);
    
var start = new Date().getTime()+60000;
//dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
    
    
setInterval(function(){
    var diff = start - new Date().getTime();
    document.getElementById('cookieEater').innerHTML=parseInt(diff/1000)+' seconds before reload.';
},1000);


setTimeout(function ()
{
    //Don't reload, (renvoi de formulaire)
    window.location.href = window.location.href;
}, 60000);