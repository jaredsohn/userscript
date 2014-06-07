// Autor: -== VelMizar ==-
// Fecha de modificacion: 18/09/11

// ==UserScript==
// @name           UniversalnyyLordGallakssy
// @author         VelMizar
// @date           18-09-2011
// @namespace      UniversalnyyLordd
// @description    UniversalnyyLorddd
// @include        http://ru1.lordgalaxy.ru//game.php*
// @exclude        *mode=ffleett*

// ==/UserScript==

 //---- globallStor ---- 
 var storage = window.localStorage; 
 //---- при відсутності вносимо початкові глобальні дані ----
 //---- відвідування сторінок в секундах (тому назад був)----
 if (!storage.getItem("LordOglyad")) storage.setItem("LordOglyad", 0);
 if (!storage.getItem("LordFlot")) storage.setItem("LordFlot", 0);
 if (!storage.getItem("LordDoslid")) storage.setItem("LordDoslid", 0);
 if (!storage.getItem("LordBudivn")) storage.setItem("LordBudivn", 0);
 if (!storage.getItem("LordOborona")) storage.setItem("LordOborona", 0);
 if (!storage.getItem("LordSkupschyk")) storage.setItem("LordSkupschyk", 0);
 if (!storage.getItem("LordArtefakty")) storage.setItem("LordArtefakty", 0);
 if (!storage.getItem("LordGalactica")) storage.setItem("LordGalactica", 0);
 if (!storage.getItem("LordImperiya")) storage.setItem("LordImperiya", 0);
 if (!storage.getItem("LordOficsery")) storage.setItem("LordOficsery", 0);
 if (!storage.getItem("LordTehnologiya")) storage.setItem("LordTehnologiya", 0); 
 
 //---- ### ----
 
  if (!storage.getItem("nnPlanet")) storage.setItem("nnPlanet", 0);
  if (!storage.getItem("nnnPlanet")) storage.setItem("nnnPlanet", 0);
  if (!storage.getItem("povtorPlanet")) storage.setItem("povtorPlanet", 0);
// --------------------- vyxidni danni --------------------

var infoIsled = new Array();
var MatrInfPlanet = new Array;

