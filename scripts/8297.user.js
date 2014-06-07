/*

 * Title: Google Clean

 * Description: Greasemonkey script for cleaning Google search
 * Author: recluze  (recluze.wordpress.com)

 * Updated: 4/4/2007

 *

 */


// ==UserScript==
// @name           GoogleClean
// @namespace      recluze.Google
// @description    Get rid of the weird arial font from Google
// @include        http://www.google.com.pk/*
// @include        http://www.google.com/* 
// @include        http://www.google.com.* 
// ==/UserScript==





(function()  // taken from Gmail Rl CSS Skin by RL 
{
	function addGlobalStyle(css) {
	    var head,style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
}


var BasicFontStyle =		'body ' +
					'{' +
						'font-family:Verdana;' +
						'font-weight:normal;' +
						'font-size: 1em;' +
						'color: #000; ' +
						'text-decoration: none;' +
					'}';
addGlobalStyle(BasicFontStyle);

var BasicFontStyleL =		'.l ' +					// the title and link of the result item  
					'{' +
						'display: block; width: 100%; ' +
						'border-top: 1px solid #ccc;' +
						'padding-top: 5px;' +
					'}';
addGlobalStyle(BasicFontStyleL);


var boldStyle =		'b ' +					// redefining BOLD
					'{' +
						'font-weight: 100;' +
						'color: #A33;' +
					'}';
addGlobalStyle(boldStyle);



var BasicFontStyleJ =		'.j ' +					// the description
					'{' +
						'font-family:Verdana;' +
						'font-weight:normal;' +
						'font-size: 1em;' +
						'color: #000; ' +
						'text-decoration: none;' +
					'}';
addGlobalStyle(BasicFontStyleJ);

var BasicFontStyleJ =		'.a ' +					// the static URL 
					'{' +
						'font-family:Verdana;' +
						'font-weight:normal;' +
						'font-size: 1em;' +
						'text-decoration: none;' +
					'}';
addGlobalStyle(BasicFontStyleJ);

var BasicFontStyleQ =		'.q ' +					// the top link 
					'{' +
						'font-family:Verdana;' +
						'font-weight:normal;' +
						'font-size: 1em;' +
						'xcolor: #000; ' +
						'text-decoration: none;' +
					'}';
addGlobalStyle(BasicFontStyleQ);


var BasicFontStyleQ =		'input ' +					// the textbox
					'{' +
						'border : 1px solid #333;' +
						'padding-left : 5px;' +
					'}';
addGlobalStyle(BasicFontStyleQ);

var BasicFontStyleFL =		' .fl ' +					// insignificant links... not working
					'{' +
						'color : #000; ' +
					'}';
addGlobalStyle(BasicFontStyleFL);


})()

