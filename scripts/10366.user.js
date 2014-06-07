// Sensible Disemvowel Troll
// Removes vowels from comments modded as Troll
// version 0.4.0
// 2010-05-07
// This script is released into the Public Domain. 
//
// CHANGELOG
//     Version 0.4.0 2010-05-07
//     Make this actually work, now.
//
//     Version 0.3.2 2009-05-05
//     Fix @version number
//
//     Version 0.3.1 2007-07-08
//     Released into public domain.
//
//     Version 0.3 2007-07-02
//     Added option for flipping text upside down
//
//     Version 0.2 2007-07-02
//     Fixed error in removing 'y'
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Erection Devowelize Trolls", and click Uninstall.
//
// ==UserScript==
// @name	   Sensible Disemvoweler
// @namespace	  SEDisemvowel
// @description   Removes vowels from troll comments
// @include	http://sensibleerection.com/entry.php/*
// @include	http://*.sensibleerection.com/entry.php/*
// @version	0.4.0
// ==/UserScript==

(function() {
	var layer1 = document.getElementById('Layer1');
	if (!layer1)
		return false;
		
	GM_setValue('transformation', 1); // disemvowel
	//GM_setValue('transformation', 2); // flip

	function flipChar(c) {
		if (c == 'a') {
			return '\u0250'
		}
		else if (c == 'b') {
			return 'q'
		}
		else if (c == 'c') {
			return '\u0254' //Open o -- copied from pne
		}
		else if (c == 'd') {
			return 'p'
		}
		else if (c == 'e') {
			return '\u01DD'
		}
		else if (c == 'f') {
			return '\u025F' //Copied from pne -- 
			//LATIN SMALL LETTER DOTLESS J WITH STROKE
		}
		else if (c == 'g') {
			return 'b'
		}
		else if (c == 'h') {
			return '\u0265'
		}
		else if (c == 'i') {
			return '\u0131'//'\u0131\u0323' //copied from pne
		}
		else if (c == 'j') {
			return '\u0638'
		}
		else if (c == 'k') {
			return '\u029E'
		}
		else if (c == 'l') {
			return '1'
		}
		else if (c == 'm') {
			return '\u026F'
		}
		else if (c == 'n') {
			return 'u'
		}
		else if (c == 'o') {
			return 'o'
		}
		else if (c == 'p') {
			return 'd'
		}
		else if (c == 'q') {
			return 'b'
		}
		else if (c == 'r') {
			return '\u0279'
		}
		else if (c == 's') {
			return 's'
		}
		else if (c == 't') {
			return '\u0287'
		}
		else if (c == 'u') {
			return 'n'
		}
		else if (c == 'v') {
			return '\u028C'
		}
		else if (c == 'w') {
			return '\u028D'
		}
		else if (c == 'x') {
			return 'x'
		}
		else if (c == 'y') {
			return '\u028E'
		}
		else if (c == 'z') {
			return 'z'
		}
		else if (c == '[') {
			return ']'
		}
		else if (c == ']') {
			return '['
		}
		else if (c == '(') {
			return ')'
		}
		else if (c == ')') {
			return '('
		}
		else if (c == '{') {
			return '}'
		}
		else if (c == '}') {
			return '{'
		}
		else if (c == '?') {
			return '\u00BF' //From pne
		}
		else if (c == '\u00BF') {
			return '?'
		}
		else if (c == '!') {
			return '\u00A1'
		}
		else if (c == "\'") {
			return ','
		}
		else if (c == ',') {
			return "\'"
		}
		return c;
	}
	
	function flip(aString) {
		aString = aString.toLowerCase();
		var last = aString.length - 1;
		var result = "";
		for (var i = last; i >= 0; --i) {
			result += flipChar(aString.charAt(i))
		}
		return result;
	}
	
	var fonts = layer1.getElementsByTagName('font');
	GM_log('No. of fonts = ' + fonts.length);
	for (var i=0,mod; mod=fonts[i]; ++i) {
		if (mod.color == 'gray' && mod.textContent.indexOf('Troll') > 0) {
			//GM_log('Found troll comment');
			// get comment text
			var trollComment = mod.parentNode.parentNode.childNodes[5];
			//GM_log('Troll comment: ' + trollComment.textContent);
			var transformation = GM_getValue('transformation');
			//GM_log('transformation = ' + transformation);
			if (transformation == 1) {
				trollComment.textContent = trollComment.textContent.replace(/[aeiou]/gi, '');
				if (Math.random() > 0.25)
					trollComment.textContent.replace(/y/gi, '');
			} else if (transformation == 2) {
				trollComment.textContent = flip(trollComment.textContent);
			} else {
				trollComment.textContent = trollComment.textContent.replace(/[aeiou]/gi, '');
				if (Math.random() > 0.25)
					trollComment.textContent.replace(/y/gi, '');
			}
			
		}
	}
})();