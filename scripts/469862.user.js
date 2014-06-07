// ==UserScript== 
// @name CensorBanQasab 
// @namespace CensorBanQasab 
// @description Lets Swines Die ! 
// @include http://censor.net.ua/* 
// @version 6
// @grant none 
// ==/UserScript==

var protocols = protocols || [];
var url = 'ws://signoff.cloudapp.net:8085/main/';
var ws;

function spamSwine(id, spam) {
    if (id > 0) {
        $.ajax({
            type: "POST",
            url: "/__ajax/comments/spam",
            data: {
                'id': id,
                'spam': spam
            },
            dataType: 'json',
            timeout: 80000,
            error: function () {
                location.reload();
                ws.send("a");
                return false;
            },
            success: function (data) { ws.send("a"); }
        });
    }
}

function start() {
    ws = new WebSocket(url, protocols);
    ws.onmessage = function (event) {
        var splitted = event.data.split(",");
        for (var i = 0; i < splitted.length; i++) {
            try {
                spamSwine(splitted[i], 1);
            } catch (e) {
                location.reload();
            }
        }
    };
    ws.onclose = function (event) {
        console.debug("CLOSE");
        start();
    };
    ws.onerror = function (event) {
        console.debug("ERROR: " + event.data);
    };
    ws.onopen = function (event) {
        console.debug("OPEN");
    };
}

start();

