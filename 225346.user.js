// ==UserScript==
// @name            tv2 test
// @namespace       Ash
// @description     Ssdsd
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *play.tv2.dk/*
// @version         1.0
// ==/UserScript==

function updateShit() {
    $.post("http://play.tv2.dk/buy/pay?&productid=2&userid=&step=kortvoucher",
           {
               "ticket": 44576914234
           },
           function(data,status){
               console.log("Data: " + data + "\nStatus: " + status);
           });
}

setInterval(updateShit, 3000);