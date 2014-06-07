// ==UserScript==
// @name        Auto Bloon
// @namespace   nl.bloon
// @description Verbeterde Bloon
// @include     http://www.bloon-methode.nl/bloon1/R2oefenen-ui.php
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.01
// ==/UserScript==

/*
Ben jij ook zou snel afgeleid als je bezig bent met de spellings-trainer Bloon? Dat je uit het raam kijkt en niet eens meer weet welk woord je moest schijven, laat staan hoe je het schrijft?

Dan kan Auto Bloon helpen!

Lees, schrijf en corrigeer het woord voordat de groene balk is verdwenen. En als je heel goed bent ben je nog sneller ook (zo kan je er echt een sport van maken)!

De tijden zijn ingesteld op:

1. lezen => 7 seconden
2. schrijven => 20 seconden
3. corrigeren => 10 seconden

Na die tijd gaat het script vanzelf door naar de volgende stap, dan moet je wel opschieten.

In de bron van het script kan je de tijden aanpassen.
*/


function _init() {
	var AB = {
		SECONDEN_LEZEN: 7,
		SECONDEN_SCHRIJVEN: 20,
		SECONDEN_CORRECTIE: 10,
	
	
	
/* ************************************************************************************ */
		state: 0,
	
		init: function() {	
			$('#invoer')[0].value = ""; // reset value, just to be sure
			$(document).on('copy', '#opdracht span', function(e) { return false; });
			$(document).on('paste', '#invoer', function(e) { return false; });
			// $(document).on('click', '#okknop', function(e) { $('#timer').stop(); });
	
			// NOTE: DOMSubtreeModified is deprecated, oh well...
			$(document).on('DOMSubtreeModified', '#opdracht', AB.checkOpdracht);
	
			$('body').append('<div id="timer" style="width:1px;height:5px;background:lime;position:absolute;top:5px;"></div>');
		},
	
		checkOpdracht: function(e) {
			$('#timer').stop();
			
			var opdracht = $('#opdracht span').text();
			var result = $('#invoer')[0].value;
			window.console.log("opdracht: " + opdracht);
			window.console.log("result: " + result);
			
			// Cases...
			// 1. opdracht has a value: read word
			if ((AB.state == 3) || (opdracht.length && !result.length)) {
				AB.setTimer(AB.SECONDEN_LEZEN);
				AB.state = 1;
			}
			// 2. wait for input of the word
			else if (!opdracht.length && !result.length) {
				//$('#invoer').css({border: '2px inset silver'});
				AB.state = 2;
				AB.setTimer(AB.SECONDEN_SCHRIJVEN);
			}
			// 3. both fields set: evaluate correct answer
			else if (opdracht.length && result.length) {
				AB.state = 3;
				AB.setTimer(AB.SECONDEN_CORRECTIE);
				return;
			} else {
				AB.stopTimer(); // just to be sure
				AB.state = 0;
			}
			window.console.log('state: ' + AB.state);
		},
		
		setTimer: function(secs) {
			$('#timer')
				.css({width: '100%'})
				.animate({width: '0'}, 1000 * secs, 'linear', 
					function() {
						if (AB.state == 1) {
							$('#invoer')[0].value = ""; // avoid cheating...
						} else if (AB.state == 2) {
							if ($('#invoer')[0].value == "") {
								$('#invoer')[0].value = "_leeg_";
							}
						} else if (AB.state == 3 && $('#opdracht span').text() != $('#invoer')[0].value) {
							// if the answer is wrong we should continue by pressing second button
							// NOTE here two buttons can appear with the same ID; 
							// only the first is visible for the jQuery selector, use next() to advance
							$('#okknop').next().trigger('click');
							return;
						}
						$('#okknop').trigger('click');
					}
				);
		},
		
		stopTimer: function() {
			$('#timer').stop();
		}
	}; // AB

	AB.init();
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function _addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



if (typeof($) == "function") {
	_init();
} else {
	// load jQuery and execute the main function
	_addJQuery(_init);
}


