// ==UserScript==
// @name           Grono Shout Receiver
// @description    Automatyczne wypełnianie pól
// @namespace      http://wrzutube.pl/
// @include        http://*grono.net/*
// ==/UserScript==

function autoenter_values() {

        var receiver = document.getElementsByName('receiver');
        receiver[0].value = 1899273;
}

autoenter_values();