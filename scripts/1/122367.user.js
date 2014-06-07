// ==UserScript==
// @name           Units Converter
// @license        GNU GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author         Dmytro Levit
// @version        2.2
// @namespace      http://userscripts.org/users/428429/
// @description    Converts units from imperial sytem into metric and back. If you need reverse conversion, please set the 'DIRECTION' variable to 1
// @include        *
// ==/UserScript==
//

var DIRECTION = 0;

function remove_duplicates(array){
	var temp;
	var flag;
	var num = 0;
	var newArray = new Array();
	for(var i = 0; i < array.length; i++){
		temp = array[i];
		flag = 1;
		for(var j = i + 1; j < array.length; j++){
			if(temp == array[j]){
				flag = 0;
				break;
			}
		}
		if(flag == 1){
			newArray[num] = temp;
			num++;
		}
	}
	return newArray;
}

function extract_numbers(match){
	var sign = 1;
	if(match.match(/(−|\u002d)+/) != null){
		sign = -1;
	}

	var number = match.match(/\d+\.?\d*/) * sign;
	return number;
}

function calculate(match, coeff, k){
	var num = extract_numbers(match);
	if(coeff[0] == 'linear'){
		/////////
		// +-
		/////////
		if(match.match(/\u00B1/) != null){
			return num * coeff[3][k];
		}else{
			return num * coeff[3][k] + coeff[4][k];
		}
	}
} 

function normalize_precision(num){
	if(num < 10 && num > -10){
		return num.toPrecision(3);
	}else{
		return num.toFixed(1);
	}
}

////////////////////////////////
// Array structure:
//  *0: type of conversion formula
//  *1: core of the regular expression
//  *2: corresponding unit which is used to produce output
//  *3..: conversion factors arranged correspondingly to the regular expression's cores
//
////////////////////////////////
var temp_coeff = [['linear', ['(\\s|\\u00B0)+(degrees Fahrenheit|Fahrenheit|degrees F\\b|F\\b)'], ['\u00B0C'], [5 / 9], [-32 * 5 / 9]],
	 ['linear', ['(\\s|\\u00B0)+'], ['(\\s|\\u00B0)+(degrees Celsius|Celsius|degrees C\\b|C\\b)'], ['\u00B0F'], [9 / 5], [32]]];
var dist_coeff = [['linear', ['\\s+(inch\\b|in\\b)', '\\s+(foot\\b|feet\\b|ft\\b)', '\\s+(yard\\b|yd\\b)', '\\s+(mile\\b|mi\\b)'], ['cm', 'm', 'm', 'km'], [2.54, 0.3048, 0.9144, 1.609344], [0, 0, 0, 0]],
	 ['linear', ['\\s+', '\\s+', '\\s+'], ['\\s+(cm\\b)', '\\s+(m\\b)', '\\s+(km\\b)'], ['in', 'yd', 'mi'], [1 / 2.54, 1 / 0.9144, 1 / 1.609344], [0, 0 ,0]]];
var mass_coeff = [['linear', ['\\s+(ounce\\b|oz\\b)', '\\s+(pound\\b|lb\\b|lbs\\b)'], ['g', 'kg'], [28.349523125, 0.45359237], [0, 0]],
	['linear', ['\\s+(gram\\b|g\\b)', '\\s+(kilo\\b|kilogram\\b|kg\\b)'], ['oz', 'lb'], [1 / 28.349523125, 1 / 0.45359237], [0, 0]]];
var vol_coeff = [['linear', ['\\s+(fl dr\\b|fluid dram\\b)', '\\s+(teaspoon\\b|tsp\\b)', '\\s+(tablespoon\\b|Tbsp\\b)', '\\s+(fluid ounce\\b|fl oz\\b)', '\\s+(jiggler\\b|jig\\b)', '\\s+(gill\\b|gl\\b)', '\\s+(cup\\b|cp\\b)', '\\s+(pint\\b|pt\\b)', '\\s+(quart\\b|qt\\b)', '\\s+(gallon\\b|gal\\b)', '\\s+(barrel\\b|bbl\\b)', '\\s+(oil barrel\\b)'], ['ml', 'ml', 'ml', 'ml', 'ml', 'ml', 'ml', 'l', 'l', 'l', 'l', 'l'],  [3.696691, 4.928921, 14.78676, 29.57353, 44.36028, 118.2941, 236.5882, 0.4731765, 0.9463529, 3.785412, 119.2405, 158.9873], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
	 ['linear', ['\\s+(ml\\b)', '\\s+(l\\b)'], ['fl oz', 'gal'], [1 / 29.57353, 1 / 3.785412], [0, 0]]];

var array = [temp_coeff, mass_coeff, vol_coeff, dist_coeff];

var html = document.body.innerHTML;
//var txt = html.replace(/<\/?[a-z!][a-z0-9\-]*[^<>]*>/ig, "");
var regex_txt;
var regex;
var match;
var newMatch;

// Iterate over all unit classes
for(var j = 0; j < array.length; j++){

	// Iterate over all regular expression cores
//	console.log("array[" + j + "][" + DIRECTION + "][1].length: " + array[j][DIRECTION][1].length);
	for(var k = 0; k < array[j][DIRECTION][1].length; k++){
		regex_txt = '.{3}(\\u00B1|−|\\u002d)?\\b\\d+(\\.\\d+)?' + array[j][DIRECTION][1][k] + '{1}';
		regex = new RegExp(regex_txt, 'gi');
		match = html.match(regex);
		if(match != null){
			match = remove_duplicates(match);
			newMatch = new Array();
			for(var i = 0; i < match.length; i++){
				newMatch[i] = normalize_precision(calculate(match[i], array[j][DIRECTION], k));
				var pattern = new RegExp(match[i].replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1'),"gi");
				html = html.replace(pattern, match[i] + ' (' + newMatch[i] + ' ' + array[j][DIRECTION][2][k] + ')');
			}
		}
//		console.log(html);
	}
}
document.body.innerHTML = html;
