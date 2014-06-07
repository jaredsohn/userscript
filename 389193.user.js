// ==UserScript==
// @name       MessageLamp
// @author      BIRDIE
// @description  Gömmer PM-lampan permanent för impulse.nu
// @version    1
// @namespace  http://www.impulse.nu/?sida=stats/stats&id=119550
// @match      http://*.impulse.nu/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//**********USER SETTINGS/INFO**************//
//
//Gömmer PM-lampan permanent på impulse
//
//**********USER SETTINGS/INFO END**************//

var impulse = function(){

function messageLamp(){
  document.getElementById("pm_alert").style.visibility = "hidden";
}

messageLamp();
};
impulse();