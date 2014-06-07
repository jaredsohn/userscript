// ==UserScript==
// @name        Neerus Research Script
// @namespace   Virtonomica
// @description Shows average duration of hypothesis selections
// @include     http://*virtonomic*.*/*/main/unit/view/*/investigation
// @version     1.1
// @grant       none
// ==/UserScript==

var run = function() {

   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;

	// workaround for progress bar <tr> being manipulated from the following methods
	var doWorkaround = function(){
		$('[class*="static"]').children('tbody').children('tr').addClass('workaround');
	}
	doWorkaround();
	
	var referenceTimeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	var probabilityArray = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
	
	// create two dimensional array with all averages
	var averages = [
		[13.21,26.42, 39.63, 52.84, 66.05, 79.26, 92.47, 105.68, 118.89, 132.1, 145.31, 158.52, 171.73, 184.94, 198.15, 211.36, 224.57, 237.78, 250.99, 264.2 ],
		[9.2,18.39, 27.59, 36.79, 45.98, 55.18, 64.38, 73.57, 82.77, 91.97, 101.16, 110.36, 119.56, 128.85, 137.95, 147.15, 156.34, 165.54, 174.74, 183.93 ],
		[6.84,13.69, 20.53, 27.38, 35.22, 41.07, 47.91, 54.76, 61.6, 68.45, 75.29, 82.14, 88.98, 95.83, 102.67, 109.52, 116.36, 123.21, 130.05, 136.89 ],
		[5.36,10.72, 16.07, 21.43, 26.79, 32.15, 37.5, 42.86, 45.22, 53.58, 58.93, 64.29, 69.65, 75.01, 80.37, 85.72, 91.08, 96.44, 101.8, 107.15 ],
		[4.36,8.71, 13.07, 17.43, 21.79, 26.14, 30.5, 34.86, 39.22, 43.57, 47.93, 52.29, 56.65, 61, 65.36, 69.72, 74.08, 78.43, 82.79, 87.15 ],
		[3.65,7.3, 10.95, 14.6, 18.25, 21.9, 25.55, 29.2, 32.85, 36.5, 40.15, 43.8, 47.45, 51.1, 54.75, 58.4, 62.05, 65.69, 69.34, 72.99 ],
		[3.13,6.26, 9.39, 12.51, 15.64, 18.77, 21.9, 25.02, 28.15, 31.28, 34.41, 37.54, 40.66, 43.79, 46.92, 50.05, 53.18, 56.3, 59.43, 62.56 ],
		[2.73,5.46, 8.19, 10.92, 13.65, 16.38, 19.11, 21.84, 24.57, 27.3, 30.03, 32.76, 35.49, 38.22, 40.95, 43.68, 46.41, 49.15, 51.88, 54.61 ],
		[2.42,4.84, 7.26, 9.67, 12.09, 14.51, 16.93, 19.35, 21.77, 24.18, 26.6, 29.02, 31.44, 33.86, 36.28, 38.7, 41.11, 43.53, 45.95, 48.37 ],
		[2.17,4.34, 6.5, 8.67, 10.84, 13.01, 15.18, 17.35, 19.51, 21.68, 23.84, 26.02, 28.19, 30.36, 32.52, 34.69, 36.86, 39.03, 41.2, 43.36 ],
		[1.96,3.93, 5.89, 7.85, 9.82, 11.78, 13.74, 15.71, 17.67, 19.63, 21.6, 23.56, 25.52, 27.49, 29.45, 31.42, 33.38, 35.34, 37.31, 39.27 ],
		[1.79,3.59, 5.38, 7.17, 8.97, 10.76, 12.55, 14.34, 16.14, 17.93, 19.72, 21.52, 23.31, 25.1, 26.9, 28.69, 30.48, 32.28, 34.07, 35.86 ],
		[1.65,3.3, 4.95, 6.6, 8.25, 9.9, 11.54, 13.19, 14.84, 16.49, 18.14, 19.79, 21.44, 23.09, 24.74, 26.39, 28.04, 29.69, 31.34, 32.99 ],
		[1.53,3.05, 4.58, 6.11, 7.63, 9.16, 10.68, 12.21, 13.74, 15.26, 16.79, 18.32, 19.84, 21.39, 22.9, 24.42, 25.95, 27.47, 29, 30.53],
		[1.42,2.84, 4.26, 5.68, 7.1, 8.52, 9.94, 11.36, 12.78, 14.2, 15.62, 17.04, 18.46, 19.88, 21.3, 22.72, 24.14, 25.56, 36.98, 28.4 ],
		[1.33,2.66, 3.98, 5.31, 6.64, 7.97, 9.29, 10.62, 11.95, 13.28, 14.6, 15.93, 17.26, 18.59, 19.91, 21.24, 22.57, 23.9, 25.22, 26.55 ],
		[1.25,2.49, 3.74, 4.98, 6.23, 7.48, 8.72, 9.97, 11.22, 12.46, 13.71, 14.95, 16.2, 17.45, 18.69, 19.94, 21.19, 22.43, 23.68, 24.92 ],
		[1.17,2.35, 3.52, 4.7, 5.87, 7.04, 8.22, 9.39, 10.57, 11.74, 12.92, 14.09, 15.26, 16.44, 17.61, 18.79, 19.96, 21.13, 22.31, 23.48 ],
		[1.11,2.22, 3.33, 4.44, 5.55, 6.66, 7.77, 8.88, 9.99, 11.1, 12.21, 13.32, 14.43, 15.54, 16.65, 17.76, 18.87, 19.98, 21.09, 22.2 ],
		[1.05,2.1, 3.16, 4.21, 5.26, 6.31, 7.36, 8.42, 9.47, 10.52, 11.57, 12.62, 13.68, 14.73, 15.78, 16.83, 17.88, 18.94, 19.99, 21.04 ]
	];
	
	var getAverage = function(probability, referenceTime){
		var indexOfReferenceTime = referenceTimeArray.indexOf(referenceTime);
		var indexOfProbability = probabilityArray.indexOf(probability);

		return averages[indexOfProbability][indexOfReferenceTime];
	}
	
	var parseProbability = function(num) {
		var parts = num.split('.');
		var chancePercent = parts[0];
		return parseInt(chancePercent);
	}
	
	var parseReferenceTime = function(num) {
		var parts = num.split('.');
		var referenceTime = parts[0];
		return parseInt(referenceTime);
	}
	
	var parseMistakes = function(row) {
	   var mistakes = 0;
	   var $element = $(row).find('td').filter(":contains('mistakes')");
	   console.log($element.text());
	   if($element.text() != ""){
	       var elementText = $element.text(); // mistakes: 1, last one: dd mmm yy
	       var parts = elementText.split(','); // [mistakes: 1] [last one: dd mmm yy]
	       var firstPart = parts[0]; // mistakes: 1
	       var moreParts = firstPart.split(':'); // [mistakes] [ 1]
	       mistakes = parseInt(moreParts[1]);
	   }
	   return mistakes;
	}

	var calculateAverageDuration = function(row, mistakes) {
		var probability;
		var referenceTime;
		var averageDuration;
	
		var kids = $(row).children('td');
	
		probability = parseProbability($(kids[2]).text());
		probability -= mistakes;
		referenceTime = parseReferenceTime($(kids[3]).text());
	    
	
		averageDuration = getAverage(probability, referenceTime);
		
		return averageDuration;
	}

	$('.grid').find('tr').each(function(i) {
		if($(this).hasClass("workaround")){ return; }// don't fiddle with the progress thingy

		if (i == 0) {
			$(this).append('<td>\u00D8 Turns</td>').css("background-color", "#A4E2FC");  
		} else {
		    var mistakes = parseMistakes($(this));
			$(this).append('<td>'+calculateAverageDuration($(this), mistakes)+'</td>');
		}
	});

}


if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 