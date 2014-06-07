// ==UserScript==
// @name	Freerice mather
// @namespace	http://matthewfl.com
// @include	http://freerice.com/*
// @version	2
// @grant       none
// ==/UserScript==

var $ = unsafeWindow.$;
var game = unsafeWindow.ExternalGame;

var recentAnswer = 0;

function solve_multiplication_table () {
    $(".question-link").html().replace(/([0-9]+).*?([0-9]+)/, function (all, a, b) {
	var answer = a*b;
	console.log("answer: ", all, a, b);
	var count = 0;
	$(".answer-item").each(function () {
	    var h = $(this).html();
	    if(h * 1 == answer) {
		game.submitAnswer(count);
		recentAnswer++;
	    }
	    count++;
	});
	return "";
    });

}

function solve_english() {
    var incorrect = $("#incorrect"); //Incorrect! silent = quiet
    if(incorrect.size()) {
	// there is something to recored/learn
	var text = incorrect.text();
	var data = text.replace(/.*! (.*)/, "$1");

    }
}



function compute() {
    console.log("free ricer running");
    if(game.inProgress) return; // the system is loading from the server atm
    if(Math.random() < .008) {
	// humans should have some error
	game.submitAnswer(Math.floor(Math.random()*4));
	return;
    }
    var type = $(".subject-title").html() || "";
    if(type.indexOf("Multiplication") != -1) {
	solve_multiplication_table();
    }else{
	recentAnswer=1;
    }
}

setInterval(compute, 2000);

setInterval(function() {
    if(recentAnswer == 0) {
	//location.reload(true);
    }
    recentAnswer = 0;
}, 30*1000);
