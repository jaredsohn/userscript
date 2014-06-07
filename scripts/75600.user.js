// ==UserScript==
// @name        slider
// ==/UserScript==


// SET THIS VARIABLE FOR DELAY, 1000 = 1 SECOND
var delayLength = 4000;
	
function doMove(panelWidth, tooFar) {
	var leftValue = $("#mover").css("left");
	
// Fix for IE
	if (leftValue == "auto") { leftValue = 0; };

	var movement = parseFloat(leftValue, 10) - panelWidth;
	
	if (movement == tooFar) {
		$(".slide img").animate({
			"top": -200
		}, function() {
			$("#mover").animate({
				"left": 0
			}, function() {
				$(".slide img").animate({
					"top": 50
				});
			});
		});
	}
	else {
		$(".slide img").animate({
			"top": -200
		}, function() {
			$("#mover").animate({
				"left": movement
			}, function() {
				$(".slide img").animate({
					"top": 50
				});
			});
		});
	}
}

$(function(){
	
    var $slide1 = $(".slide");

	var panelWidth = $slide1.css("width");
	var panelPaddingLeft = $slide1.css("paddingLeft");
	var panelPaddingRight = $slide1.css("paddingRight");

	panelWidth = parseFloat(panelWidth, 10);
	panelPaddingLeft = parseFloat(panelPaddingLeft, 10);
	panelPaddingRight = parseFloat(panelPaddingRight, 10);

	panelWidth = panelWidth + panelPaddingLeft + panelPaddingRight;
	
	var numPanels = $(".slide").length;
	var tooFar = -(panelWidth * numPanels);
	var totalMoverwidth = numPanels * panelWidth;
	$("#mover").css("width", totalMoverwidth);

	$("#slider").append('<a href="#" id="slider-stopper">Stop</a>');

	sliderIntervalID = setInterval(function(){
		doMove(panelWidth, tooFar);
	}, delayLength);
	
	$("#slider-stopper").click(function(){
		if ($(this).text() == "Stop") {
			clearInterval(sliderIntervalID);
		 	$(this).text("Start");
		}
		else {
			sliderIntervalID = setInterval(function(){
				doMove(panelWidth, tooFar);
			}, delayLength);
		 	$(this).text("Stop");
		}
		 
	});

});