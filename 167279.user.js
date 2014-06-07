// ==UserScript==
// @name          GoogleSearchExtraButtons
// @version       1.10
// @namespace     barsmonster
// @include       http://www.google.*/*
// @include       https://www.google.*/*
// ==/UserScript== 

/* Google Extra Search Buttons
 * Based on
 * Version 1.4 April 5, 2013
 * Rewritten by Tegan
 * This script is Public Domain.
 */

var elements = null;
searchBox = null;

//TODO:  Not used currently, will be removed
//Simulate Enter key pressed on searchbox - to trigger search results refresh
function sendEnter()
{
    var isChrome = /Chrome/.test(navigator.userAgent);   

    if(isChrome)return;//In Chrome Google search instant results works just fine without any extra work.

    keyboardEvent = document.createEvent("KeyboardEvent");
    initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

    keyboardEvent[initMethod](
        "keydown", // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        13, // keyCodeArg : unsigned long the virtual key code, else 0
        13 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );

    searchBox.dispatchEvent(keyboardEvent);
}

function createGenericButton(name, JSAction)
{
    linkContainer = document.getElementById("hdtb_msb");
    linkContainer.innerHTML += '<div class="hdtb_mitem"><a href="#" onClick="'+JSAction+'">'+name+'</a></div>';
}

function createQueryButton(name, extraQuery)
{
    createGenericButton(name, "document.getElementsByName( \'q\')[0].value += ' "+extraQuery+"';document.getElementById( \'gbqf\').submit();return true;");
}

function createURLButton(name, extraURL)
{
    createGenericButton(name, "url = '/search?q=';url += encodeURIComponent(document.getElementsByName('q')[0].value) + '" + extraURL + "';location.href = url;return false;");
}

waitForIt(function () {
	elements = document.getElementsByName("q");
	if(elements.length > 0) {
		searchBox = elements[0];
		
		elements = document.getElementsByName("btnG");
		if(elements.length > 0) {
			var btnG = elements[0];
			
			createQueryButton("PDF", 'filetype:pdf');
			
			createURLButton("1D", '&tbs=qdr:d');
			createURLButton("7D", '&tbs=qdr:w');
			createURLButton("1M", '&tbs=qdr:m');
			createURLButton("1Y", '&tbs=qdr:y');

            return true;
        };
	};
	
	return false;
});


//We are waiting until we see Google controls
function waitForIt(now, interval, iteration){
	if(interval == null)
		interval = 100;
		
	var find;
		
	function run() {
		if(now())
			window.clearInterval(find);
			
		if(iteration &&  iteration <= 0)
			window.clearInterval(find);
		else
			iteration--;
	}
		
	find = window.setInterval(run,interval);

	return find;
}