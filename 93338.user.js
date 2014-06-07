// ==UserScript==
// @name klavogonki enhancer
// @namespace unknown
// @include http://www.klavogonki.ru/g/*
// @include http://klavogonki.ru/g/*
// @version 0.0.6.1
// @author unnamed777 <unn@med777.net>, novkostya
// ==/UserScript==
//

function doit() {
// Update time, in ms
var updateInterval = 300;

var intervalHandler = null;

setTimeout(function() {
    document.body.setAttribute('onkeyup', 'if (event.shiftKey == true) {if (event.keyCode == 90 && game.finished == true) {'
                                        + 'var linkObject = $$(\'.delresult a\');'
                                        + 'if (linkObject.length > 0) {'
                                        + 'var link = linkObject[0].readAttribute(\'href\').replace(\'javascript:\', \'\');'
                                        + 'eval(link);'
                                        + '}}};'
                                      );

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
