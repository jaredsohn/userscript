
// ==UserScript==
// @name        Freerice MAXADL
// @namespace   http://archive.lamdalxa.com
// @description Everybody Loves Free Rice
// @include     http://freerice.com/#/multiplication-table/*
// @grant       unsafeWindow
// @version     1
// ==/UserScript==

var $=unsafeWindow.$;
var submitForm=unsafeWindow.submitForm;

function think () {
    console.log('merica!');
    var question = $(".question-link").html();
    var questionr = /([0-9]+)\sx\s([0-9]+)/.exec(question);
    var answer = ((questionr[1]*1) * (questionr[2]*1));
    $(".answer-item").each(function () {
        if( $(this).html().replace(/[^0-9]/g, "")*1 == answer ) {
            unsafeWindow.ExternalGame.submitAnswer($(this).attr('rel'));
        }
    });
}

setInterval(function () { $(think); }, 1500);