// ==UserScript==
// @name             chall1-guerilla
// @namespace        http://justfuckhere.com
// @description      resolve first teaser challenge from insomnihack (2014)
// @include          http://teaser.insomnihack.ch:8888/*
// ==/UserScript==


var leetchars = {
    "0": "o",
    "1": "i",
    "3": "e",
    "5": "s",
};

function leet(str) {
    for (var l in leetchars)
        str = str.replace(leetchars[l], l, "g");
    return str;
}
function unleet(str) {
    for (var l in leetchars)
        str = str.replace(l, leetchars[l], "g");
    return str;
}


var counter = 1;
var time_start, time_stop;
var qa = {
    "0n3 m1ll10n d1v1d3d by tw0": leet("five hundred thousand"),
    "f1v3 m1nu5 31ght": leet("minus three"),
    "53v3nty 53v3n d1v1d3d by 3l3v3n": leet("seven"),
    "51x b1ll10n t1m35 31ght": leet("fourty eight billion"),
    "51x d1v1d3d by 51x": leet("one"),
    "53v3n t1m35 thr33": leet("twenty one"),
    "tw0 t1m35 tw0": leet("four"),
    "tw0 plu5 tw0": leet("four"),
    "51xty tw0 plu5 0n3": leet("sixty three"),
    "tw3nty 0n3 plu5 tw3nty 0n3": leet("fourty two"),
    "51x b1ll10n n1n3ty 51x m1ll10n f1v3 hundr3d th0u5and 51xt33n hundr3d5 f0urty 51x plu5 0n3": leet("51x b1ll10n n1n3ty 51x m1ll10n f1v3 hundr3d th0u5and 51xt33n hundr3d5 f0urty seven"),
    "tw0 t1m35 31ght": leet("sixteen"),
    "51x m1ll10n 31ghty thr33 t1m35 z3r0": leet("zero"),
};


function startrace(evt) {
    // create websocket
    var myws = new WebSocket("ws://teaser.insomnihack.ch:8888/ws?nick=fuuuu");
    var msg = document.getElementById("messages");
    msg.textContent = "hacking... hold on";

    time_start = new Date();
    console.log(time_start.toLocaleTimeString() + " ==== race started ===");

    myws.onmessage = function (e) {
            q = e.data;
            if (q in qa) {
                console.log(counter + " " + q + " -> " + qa[q]);
                msg.textContent += ".";
                counter++;
                myws.send(qa[q]);
            } else {
                time_stop = new Date();
                elapsed_seconds = Math.floor((time_stop - time_start)/1000);
                console.log(time_stop.toLocaleTimeString() + " ==== race stopped ===");
                msg.textContent = "=> Flag: " + q + " (answered " + counter + " questions in " + elapsed_seconds + " seconds)";
            }
        };

    myws.send("");
}

window.addEventListener("DOMContentLoaded", function() {
        if ("/" === document.location.pathname && 0 === document.location.search.length) {
            console.log('redirecting...');
            document.location.search = "?nick=fuuuuuuuu";
            return true;
        } else {
            // submit
            var subbutton = document.getElementsByTagName("input")[1];
            subbutton.value = "Gogogo! (hit me)";
            subbutton.form.addEventListener("submit", function (evt) { evt.preventDefault(); subbutton.value = "OMFG, you did it!"; startrace(evt); }, false);
        }
    }, false);


/* used while collecting questions
var msg = document.getElementById("messages");
msg.addEventListener("click", function () {
        var myws = new WebSocket("ws://teaser.insomnihack.ch:8888/ws?nick="+GetURLParameter('nick'));
        myws.onmessage = function (evt) {
            var msg = document.getElementById("messages");
            if (evt.data in qa)
                qa[evt.data]++;
            else
                qa[evt.data] = 1;
            //msg.textContent = unleet(evt.data);
        }
        myws.send("");
    }, false);

var answer = document.getElementById("answer")
answer.form.addEventListener("submit", function(e) {
        for(var q in qa) {
            console.log(q + " -> " + qa[q]);
        }
        e.preventDefault();
        //e.target["answer"].value = leet(e.target["answer"].value);
    }, false);
*/
