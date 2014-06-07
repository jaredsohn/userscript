// ==UserScript==
// @name            Better Gmail Theme
// @namespace       http://bitsprout.com
// @description     Use this script to enhance the new Gmail theme. This script injects additional css rules to make the UI a bit more usable than the new light theme. More usability fixes to come in future versions. Ver. 1.0: 
// @include         http://mail.google.com/*
// @include         https://mail.google.com/*
// @include 		    https://mail.google.tld/mail/*
// @include 		    http://mail.google.tld/mail/*
// @include 		    https://mail.google.tld/a/*
// @include 		    http://mail.google.tld/a/*
// ==/UserScript==
/**/

var gFrame; 		    // reference to gmail's iframe 
var t;				      // timer to check if the iframe has loaded

var cssString =    // CSS Styles to inject into gmail. Feel free to tinker with the colors!
                      // Header Row 1: Logo/Search Bar 
                      '#gbx1, #gbx2 	{ background-color: #f5f5f5; }' +	
                      '.w-asV			{ margin-bottom: 0px }' + //removes the white space between the two rows. Adding padding to 2nd row to keep balanced.	

                      // Header Row 1: User Login Information Container (top right)
                      '#gbu {}' +
                      
                      // Header Row 2: Mail Actions Icon Bar (.aeI is added when mail panel scrolls up)
                      '.G-atb 		{ background-color: #f5f5f5; border-top: 1px solid #fff; border-bottom: 1px solid #A4A5A5; padding-top: 3px; padding-bottom: 5px; -mmmoz-box-shadow: 0px 1px 2px #ccc;}' +
                      '.aeI .G-atb 	{ -moz-box-shadow: 1px 2px 3px rgba(102, 102,102, 0.5);}' +

                      // Nav Column
                      '.aeN .akc, .aeM, .oo { margin-right: 0; }' +
                      
                      // Nav Column : Mail Box
                      '.lKgBkb 		{ }' + 

                      // Mail Panel wrapper
                      '.Vztt3b		{}' +

                      // Mail Panel container with overflow-y: scroll 
                      '.aeJ 			{ padding-top: 4px; }' +

                      // Mail Panel 
                      '.aeF			{ border-top: 2px solid #ADC9FF; border-right: 2px solid #ADC9FF; border-bottom: 2px solid #ADC9FF; border-left: 2px solid #ADC9FF; border-radius: 0px 0px 2px 2px / 0 2px; }' + 
                      
                      // Mail Panel : List View : role='main' (styles referenced: BltHke nH oy8Mbf)
                      '.BltHke 		{ }' + 
                      
                      // Mail Panel : Footer
                      '.l2			{ margin-right: 5px; margin-left: 5px; } ' +

                      // Mail : Ad Column
                      '.yPPMxf 		{ display: none; }' + 
                      
                      // Mail : Main Body
                      '.if			{ margin: 0 16px; padding-bottom: 15px;  }' + 

                    //Element Styles
                      // Unread messages table row
                      'tr.zE 			{ background-color: #fff; color: #222;} ' + 		
                      'tr.zE:hover 	{ background-color: #f5f5f5; color: #000;} ' + 	
                  
                      // Read messages table row
                      'tr.yO 			{ background-color: #EDF3FF; } ' + 		
                      'tr.yO:hover 	{ background-color: #DDE7FF; color: #000; } ' + 	

                      // Checked messages table row
                      'tr.x7 			{ background-color: #ffc; color: #222;} ' + 		
                      'tr.x7:hover	{ background-color: #FFF3B0; color: #222;} ' + 		
                      
                      // Gmail drop down selector and Compose Button. Adding +4px padding to top to banance layout
                      '.aki { padding-top: 6px; }' +

                      // Google Logo
                      '#gbqlw 		{ }' +
                      
                      // Compose Button Wrapper
                      '.aic			{ margin: 0 9px;}' + 

                      // Compose Button Inner Wrapper
                      '.aic .z0		{ margin: 0 8px;}' + 

                      // Compose Button
                      '.aic .z0 .T-I-KE	{ display: block; min-width: none; margin-right: auto;}' +
                      
                      // Red Send & Compose Button style
                      '.T-I-KE 		{ cursor: pointer; }' +

                      // General Button styling
                      '.J-J5-Ji		{ cursor: pointer; }' +

                      // Compose Mail: Form Label
                      '.eD			{ color: #222; }'
                    
                      // Tooltip icon sprite for archive .ar8	; 


init();

function init() {

	if(t)
		clearTimeout(t);
	
	// Checks if frames[3] has loaded. This frame contains all of gmails contents	
	if(gFrame === undefined){
		gFrame = window.frames[3];		
		}
  
  // Sets timer to check again.
	if(gFrame !== undefined && gFrame.length < 1)
	{
		t = setTimeout(function(){init()}, 5000);
	}
	else 
	{ 	     	
		clearTimeout(t);
		initPage();
	}
	
}

function initPage(){

	addCss (cssString);

	}


/* Set CSS styles into the document body. 
 * http://www.tuxradar.com/content/greasemonkey-beginners
*/
function addCss(cssString) {

	if(gFrame)
		var head = gFrame.document.getElementsByTagName('head')[0];

	if (head){
		var newCss = document.createElement('style');
			newCss.type = "text/css";
			newCss.innerHTML = cssString;
			head.appendChild(newCss);
	}
}	

