// ==UserScript==
// @name        load balancer
// @namespace   http://userscripts.malyavk.in
// @include     https://dripstat.com/game/*
// @version     1
// @grant       none
// ==/UserScript==
'use strict';
/*global $: false, localStats: false, popManager:false, CoffeeCup:false, localStats:false*/
var SHOPPING_MODE = 0;
var SAVING_MODE = 1;
var MEM_FILLING_TIME_THRESHOLD = 120;
var COFFEE_CUPS_PER_SECOND = 4;


var mode = SHOPPING_MODE;

function calcMemoryFillingTime() {
    return (localStats.memoryCapacity / (localStats.bps + CoffeeCup.calcBytesPerClick() * COFFEE_CUPS_PER_SECOND));
}


setInterval(function () {
    //spamming shop
    var i;
    if (mode === SHOPPING_MODE) {
        $("#upg1").click();
        for (i = 10; i > 0; i--) {
            $("#pu" + i).click();
        }
    }

    if (localStats.byteCount / localStats.memoryCapacity > 0.99) {
        dripper.dripGlobal( !1 );
    }

    //checkong speed and setting mode
    if (calcMemoryFillingTime() < MEM_FILLING_TIME_THRESHOLD) {
        console.log('SAVING');
        if (mode !== SAVING_MODE) {
            popManager.newPop('btn-addMem', 'Saving money for upgrade...');
            mode = SAVING_MODE;
        }

    } else {
        if (mode !== SHOPPING_MODE) {
            popManager.newPop('btn-addMem', "There we go.");
            mode = SHOPPING_MODE;
        }
    }
}, 1000);

//"clicking" the coffee cup
setInterval(function () {
    localStats.byteCount += CoffeeCup.calcBytesPerClick();
}, 1000/COFFEE_CUPS_PER_SECOND);
