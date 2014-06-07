// ==UserScript==
// @name Sexageismal Eyes
// @Author Veridis
// @description Converts all numbers on the page into Sexagesimal for easy reading.
// @include *
// ==/UserScript==

//the font that you wish to apply. You must have this installed.
var fontFamily = 'Sexagesimal';
var baseClass = 'sexagesimal_number';
var revertClass = 'sexagesimal_revert';

var number = '(\\+|-)?([\\d,]+)(\\.)?(\\d+)?';

var SIBaseUnits = 'm|kg|s|A|K|mol|cd';
var SIPrefixes = 'Y|Z|E|P|T|G|M|k|h|ia|d|c|m|µ|n|p|f|a|z|y';
var SIUnit = '(('+SIPrefixes+')?('+SIBaseUnits+')\\b)';

var generalSuffix = '((PM|AM|pm|am|in|ft)\\b)';
var suffix = '(\\b|'+SIUnit+'|'+generalSuffix+')';
var prefix = '\\b';

var reDecimal = new RegExp(prefix + number + suffix);



var decToSex = function(){
	var decToSexMap = ['0','1','2','3','4','5','6','7','8','9',
			'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
			'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x'];
	
	return function(number){
		
		number = parseFloat(number.toString().replace(',',''));
		
		var negative = '';
		if (number < 0){
			var negative = '-';
		}
		
		number = number.toString().split('.');
		var integer = Math.abs(number[0]);
		var fraction = number[1];
		var result = '';
		
		do {
			result = decToSexMap[integer % 60] + result;
			integer = parseInt(integer / 60);
		} while (integer > 0);
		
		if (fraction){
			var decimalPlaces = fraction.toString().length;
			result += '.';
			fraction = parseFloat('.' + fraction);
			
			var x = 0;
			do {
				x++;
				var res = (fraction * 60).toString().split('.');
				result = result + decToSexMap[res[0]];
				
				if (res[1]) {
					fraction = parseFloat('.' + res[1]);
				}
				else {
					break;
				}
			} while (x < decimalPlaces);
		}
		
		if (result == 'undefined'){
			return 0
		}
		return negative + result;
	}
}();

var englishToDec = function(number){
	var words = number.replace(/[^\w ]/g,'').split(' ');
	var value = 0;
	var valueArray = [];
	
	var n=words.length;
	var k=n;
	do {
		var i=k-n;
		var word = words[i].toLowerCase();
		
		value += check_adds(word);
		var muls = check_muls(word);
		if (muls){
			
			if (value != 0) {
				if (valueArray[valueArray.length-1] > (value * muls)) {
					value = value * muls;
				}
				else {
					value = ((valueArray.pop()||0) + value) * muls;
				}
			}
			else {
				value = valueArray.pop();
				value = value * muls;
			}
			valueArray.push(value);
			value = 0;
		}
	}
	while(--n);
	valueArray.push(value);
	
	/* Now compute the sum of the values in value_array */
	value = 0;
	n = valueArray.length;
	for (var i=0; i < n; i++){
		value += valueArray[i];
	}
	return [value,valueArray, words];
};

var check_adds = function(word) {
	var words = {
		"zero": 0, "one": 1, "two": 2, "three": 3,
		"four": 4, "five": 5, "six": 6, "seven": 7,
		"eight": 8, "nine": 9, "and": 0,
		"eleven": 11, "twelve": 12, "dozen": 12, "thirteen": 13,
		"fourteen": 14, "fifteen": 15, "sixteen": 16,
		"seventeen": 17, "eighteen": 18, "nineteen": 19,
		"twenty": 20, "thirty": 30, "forty": 40,
		"fifty": 50, "sixty": 60, "seventy": 70,
		"eighty": 80, "ninety": 90
	};
	if (word in words){
		return words[word];
	}
	return 0;
}

var check_muls = function(word) {
	var words = {
		"hundred": 100,
		"thousand": 1000,
		"million": 1000000,
		"billion": 100000000
	};
	if (word in words){
		return words[word];
	}
	return 0;
}

var parseTextNode = function(textNode) {
	var match = reDecimal(textNode.data);
		
	if (match === null) {
		return;
	}
	
	//unsafeWindow.console.log(match);
	var rightTextNode = textNode.splitText(match.index);
	
	var number = rightTextNode.data.substr(0,match[0].length-match[5].length),
		span = document.createElement('span');
	
	span.innerHTML = decToSex(number);
	span.setAttribute('data',span.innerHTML);
	span.title = number;
	span.className = baseClass;
	
	rightTextNode.parentNode.insertBefore(span, rightTextNode);
	rightTextNode.data = rightTextNode.data.substr(match[0].length-match[5].length);
	
	parseTextNode(rightTextNode);
}

var parsePage = function(){
	var elems = Array.prototype.slice.call(document.body.getElementsByTagName('*'));
	elems.unshift(document.body);
	//unsafeWindow.console.log(elems);
	var elem;
	while (elem = elems.shift()) {
		var children = Array.prototype.slice.call(elem.childNodes);
		var child;
		while (child = children.shift()) {
			var parent = child.parentNode;
			var parentNodeName = parent.nodeName;
			if (
				child.nodeType ===  unsafeWindow.Node.TEXT_NODE
				&& parent.className !== baseClass
				&& parentNodeName !== 'INPUT'
				&& parentNodeName !== 'TEXTAREA'
				&& parentNodeName !== 'SCRIPT'
				&& parentNodeName !== 'STYLE' 
				&& parentNodeName !== 'PRE' 
				&& parentNodeName !== 'CODE' 
			) {
				parseTextNode(child);
			}
		}
	}
};


var travel = function(node, noChildren){
	if (node.firstChild && !noChildren) {
		return node.firstChild;
	}
	if (node.nextSibling) {
		return node.nextSibling;
	}
	return travel(node.parentNode, true);
};

var onMouseDown = function(event){
	var spans = document.getElementsByClassName(revertClass);
	var i = spans.length;
	while (i) {
		i--;
		spans[i].innerHTML = spans[i].getAttribute('data');
		spans[i].className = baseClass;
	}
	
	var selection = window.getSelection();
	if (selection.rangeCount && event.button === 2){
		
		var n = selection.rangeCount;
		var k = n;
		do {
			var i = k-n;
			var range = selection.getRangeAt(i);
			
			var element = range.startContainer;
			var endContainer = range.endContainer;
			do {
				if (element.className === baseClass){
					element.style.width = element.offsetWidth;
					element.innerHTML = element.title;
					element.className += ' ' + revertClass;
				}
				if (element == endContainer){
					break;
				}
			}
			while (element = travel(element));
			
			var newRange = document.createRange();
			newRange.setStart(range.startContainer, range.startOffset);
			newRange.setEnd(range.endContainer, range.endOffset);
			
			selection.removeRange(range);
			selection.addRange(newRange);
		}
		while (--n);
	}
	return selection;
};

var onKeyDown = function(event){
	//Ctrl + C
	if (event.keyCode === 67 && event.ctrlKey){
		event.button = 2;
		onMouseDown(event);
	}
	//Tab to deselect
	else if (event.keyCode === 9){
		onMouseDown(event);
	}
};


var init = function(){
	//var start = new Date();
	window.addEventListener ('mousedown', onMouseDown, false);
	window.addEventListener ('keydown', onKeyDown, false);
	
	//add CSS
	var CSS = '.' + baseClass + ':not(.' + revertClass + ') {font-family:' + fontFamily + ' !important;font-size:90%;}'
			+ '.' + baseClass + ' {display:inline-block;text-align:center;}';
	GM_addStyle(CSS);
	
	//parse page
	parsePage();
	//unsafeWindow.console.log('end:', new Date()-start);
};

init();










