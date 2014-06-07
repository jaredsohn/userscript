// ==UserScript==
// @name           Scriptperso
// @namespace      Zeta
// @description    Routinepillage
// @version        Beta
// @author         Zeta
// @updateURL      
// @downloadURL    
// @grant		   GM_getValue
// @grant		   GM_setValue
// @grant		   GM_deleteValue
// @grant		   GM_getResourceURL
// @grant		   GM_xmlhttpRequest
// @grant		   GM_log

// @include        http://*.ogame.*/game/index.php?*page=*
// ==/UserScript==



// déclaration de variable

var planète1 = document.getElementById("planetList") .innerHTML;
var planète1 = document.getElementById("planetList").getElementsByTagName('span')[0].innerHTML;
var planète1 = document.getElementById("planetList").getElementsByClassName('planet-koords')[0].innerHTML;
alert(planète1) ;


var planète2 = document.getElementById("planet-35698377") .innerHTML;
alert(planète2) ;
