// ==UserScript==
// @name        ENIB_CAS
// @namespace   http://userscripts.org/users/64230
// @description ENIB_CAS
// @include     https://cas.enib.fr/*
// @version     1
// @grant       none
// ==/UserScript==

    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    
    var formName = document.getElementById("fm1");
    var bouttonName = document.getElementsByTagName("input");
    var button;
    var monButton;
    for (var i = 0; i < bouttonName.length; i++){
        button = bouttonName[i].getAttribute("value");
        if(button == "SE CONNECTER"){
            monButton = bouttonName[i];
        }
    }
    var identifiantChamp = document.getElementById("username");
    var pwdChamp = document.getElementById("password");
    
    
    // init champ
    identifiantChamp.setAttribute("value","A0AAAAAA");
    pwdChamp.setAttribute("value","AAA0000AA");
    
    monButton.dispatchEvent(evt);