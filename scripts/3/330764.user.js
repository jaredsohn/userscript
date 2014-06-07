// ==UserScript==
// @name        KG_AccurateSpeedo
// @namespace   http://klavogonki.alexzh.ru
// @description Спидометр в режиме "средней скорости" показывает актуальную скорость
// @author      voidmain, unnamed777, novkostya
// @license     MIT
// @version     1.0
// @include     http://klavogonki.ru/g/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

function doit() {
    // Update time, in ms
    var updateInterval = 300;
    
    var intervalHandler = null;
    
    setTimeout(function() {
        intervalHandler = setInterval(function () {
            var currTime = new Date().getTime();
            var elapsedTime = (currTime - game.begintime_delayed) / 1000;
            if (game.finished_time)
                elapsedTime = game.finished_time / 1000;
            
            if (elapsedTime > 0 && params.meter == "average") {
                var countPassed = game.input_words.join(' ').replace(/\s+/g, ' ').length + game.last_correct_char + 1;
                var speed = Math.round(countPassed / elapsedTime * 60);
                $("speed-label").innerHTML = speed;
            }
            
            if (game.finished)
                clearInterval(intervalHandler);
        }, updateInterval);
        
    }, 1000);
}

var script = document.createElement("script");
script.innerHTML = "(" + doit + ")()";
document.body.appendChild(script);