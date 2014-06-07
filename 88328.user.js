// ==UserScript==
// @name           Magma Pool
// @namespace      Cody Woolaver
// @description    Checks to see when the guards are sleeping at the magma pool.
// @include        http://www.neopets.com/magma/pool.phtml
// ==/UserScript==

/*
        USE THIS AT YOUR OWN DECRESSION.
        CHEATING IS AGAINST THE NEOPETS
        TOS AND I WILL TAKE NO PERSONAL
        RESPONSIBILITY IF YOUR ACCOUNT
        GETS FROZEN DUE TO THIS PROGRAM.
*/

var GUARD_REJECTED = "http://images.neopets.com/magma/pool/guard_rejected.jpg"
var HTML = document.body.innerHTML

var MIN_WAIT = 8
var MAX_WAIT = 12


function redirect(){window.location = "http://www.neopets.com/magma/pool.phtml"}

if (HTML.indexOf(GUARD_REJECTED) == -1){
        var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        var ap = ""
        
        if (minutes < 10){minutes="0"+minutes}
        if(hours > 11){ap="PM"}
        else{ap="AM"}

        alert("The guard at the magma pool is Asleep!\nNote the time - " + hours + ":" + minutes + " " + ap)
        
}else{
        var waitTime = MIN_WAIT + (Math.random() * (MAX_WAIT - MIN_WAIT))
        window.setTimeout(redirect, waitTime * 60000)
}