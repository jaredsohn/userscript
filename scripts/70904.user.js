// ==UserScript==
// @name           Kongregate Root Var Hacking
// @namespace      Infamousblob
// @description    Easy way hack with root vars
// @include        http://*.kongregate.com/games/*
// ==/UserScript==

//Only loads this code on the main window
if(window.top == window.self)
{
   //Increase's window size to show the form
   var gameiframe = document.getElementById('gameiframe');
   var maingame = document.getElementById('maingame');
   maingame.style.height = parseInt(maingame.style.height) + 30 + 'px';
   gameiframe.height = Math.min(gameiframe.height) + 30;
}
else
{
   var gamewrapper = document.getElementById('game_wrapper');
   var inject = document.createElement("div");
   inject.innerHTML='<form action="#maingame" onsubmit="return false;" name="setvartest">Varname: <input id="varname" type="text" size="8" name="varname" /> Value: <input id="varvalue" type="text" size="8" name="varvalue" /><input type="submit" value="submit" name="submit" onclick="javascript:document.getElementById(\'gamediv\').SetVariable(\'_root.\'+document.getElementById(\'varname\').value, document.getElementById(\'varvalue\').value);" /></form>';
   gamewrapper.appendChild(inject);
}