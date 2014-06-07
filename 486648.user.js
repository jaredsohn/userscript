// ==UserScript==
// @name       VODU COUNTDOWN BYPASSER
// @version    1.0
// @description  Bypasses the countdown on "VODU/PUTLOCKER"
// @match      http://www.vodu.ch/file/*
// @copyright  2014 RGSOFTWARE
// ==/UserScript==

//Some of this may be unnecessary, but I'm not lazy to test which.

var Myelement = document.getElementById('submitButton');

Myelement.disabled = null;
Myelement.style.width="700px";
Myelement.style.height="150px";
Myelement.setAttribute("onclick", "play_video('play')");

setInterval(function(){Myelement.value = 'Countdown Bypassed By Riccardo Geraci';},1);
var otherButt = document.getElementById("ze_button");
otherButt.parentNode.removeChild(otherButt);


function play_video(id) {
        var e = document.getElementById(id);
        var f = document.getElementById('playdiv');
        var lockdiv = document.getElementById('lockdiv');

        if (e.style.display == 'block')
            e.style.display = 'block';
        else
            e.style.display = 'block';

        f.style.display = 'block';
        lockdiv.style.display = 'block';
    }

    function show_locker(id) {
        var e = document.getElementById(id);
        var f = document.getElementById('playdiv');

        if (e.style.display == 'block') {
            e.style.display = 'block';
        } else {
            e.style.display = 'block';
        }

        f.style.display = 'block';
    }
