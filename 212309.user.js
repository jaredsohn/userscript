// ==UserScript==
// @name       FastFight
// @namespace  FastFight
// @version    0.1.1
// @description  automatically fight really fast
// @require     http://*.erepublik.com/*/military/battlefield/*
// @copyright  2014+, Sebaci
// ==/UserScript==


setInterval(function() {
    var hp = document.getElementById("current_health").innerHTML;
    if(hp.charAt(1) == ' '){
        document.getElementById("DailyConsumtionTrigger").click();
    }
    else document.getElementById("fight_btn").click();
}, 750);
