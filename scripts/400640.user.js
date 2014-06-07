// ==UserScript==
//
//Displayable Name of your script 
// @name           IRC addon For eRepublik Battles
//
// brief description
// @description    Adds a new button into pvp battle area which opens an irc channel for this particular war inside a sidebar.
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://erepublik.eksi273.com/
//
// Your name, userscript userid link (optional)   
// @author         sarathonline (http://userscripts.org/users/598254) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://erepublik.eksi273.com/
//
//Version Number
// @version        1.05
//
// Urls process this user script on
// @include        http://www.erepublik.com/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.05 Minor fix.
// @history        1.02 Crash with eRepublik Stuff++ script fixed.
// @history        1.01 missing function added.
// @history        1.0 first version
//
// ==/UserScript==

function createElem(type,attr,vals){
if(attr.length!=vals.length) return ss.textNode("Incorrect number of attributes.");
var elem = document.createElement(type);
for(var i=0;i<attr.length;i++) elem.setAttribute(attr[i],vals[i]);
return elem;
}

function addChatWindow(){
var url = document.URL.split("/");
var battle = url[url.length-1];
var country = document.getElementById("defender_allies").parentNode.children[0].innerHTML.replace(" ","_");
var warDiv = document.getElementById("pvp");
var chName = battle;//+"_"+country;
var user = document.getElementById("financier").parentNode.children[1].children[0].title.trim().replace(" ","_");

var olay = createElem("div",["style","id"],["position: fixed;width: 100%;height: 100%;z-index: 99997;display: none;background-color: rgba(0, 0, 0, 0.8);top: 0%;","ircolay"]);
olay.innerHTML='<div id="author" style="text-align:center;margin-top: 575px;background-color: rgba(0, 0, 0, 0.5);color: #FFF;">Created by <a href="http://www.erepublik.com/en/citizen/profile/7075193" target="_blank">harbi vatandas</a><br><a href="http://www.erepublik.com/en/economy/donate-items/7075193" target="_blank">Donate</a> or just subscribe to my <a href="http://www.erepublik.com/en/newspaper/disturbia-295945/1" target="_blank">newspaper</a></div>';

var button = createElem("a",["href","class","style","id"],["javascript:;","help_button","background-image: url('https://dl.dropboxusercontent.com/u/87240333/images/erep_irc.png');","ircbut"]);
button.innerHTML="IRC chat";
button.onclick = newWar;

var iframe = createElem("iframe", ["src","id","style"],["https://qchat.rizon.net/?nick="+user+"&channels="+chName+"&uio=Nz10cnVl84","irc","display:none;width: 400px;height: 560px;position: fixed;top: 10px; left:773px;z-index:99998"]);
document.body.appendChild(olay);
document.getElementById("go_help").parentNode.appendChild(button);
document.body.appendChild(iframe);
}

function oldWar(){
var warDiv = document.getElementById("pvp");
var irc = document.getElementById("irc");
var ircbut = document.getElementById("ircbut");
var olay = document.getElementById("ircolay");
warDiv.setAttribute("style",warDiv.getAttribute("oldstyle"));
irc.style.display="none";
olay.style.display="none";
ircbut.onclick = newWar;
}
function newWar(){
var warDiv = document.getElementById("pvp");
var irc = document.getElementById("irc");
var ircbut = document.getElementById("ircbut");
var olay = document.getElementById("ircolay");
var style = warDiv.style.cssText;
warDiv.setAttribute("oldstyle",style);
warDiv.setAttribute("style",style+"position: fixed;left: 10px;top: 10px;z-index: 99998;");
irc.style.display="block";
olay.style.display="block";
ircbut.onclick = oldWar;
}
if (document.URL.search("/military/battlefield/")>0) addChatWindow();