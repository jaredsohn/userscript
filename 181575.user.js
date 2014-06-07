// ==UserScript==
// @name        Homeunstuck +
// @namespace   abrad45 [Modifications and upkeeping by Koaten] 
// @description adds homestuck navigation and pages remaining
// @updateURL https://www.dropbox.com/s/01hp77ds9kgtnjo/Homeunstuck%2B.meta.js?dl=1
// @downloadURL https://www.dropbox.com/s/6ksijoivhx02m30/Homeunstuck%2B.user.js?dl=1
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require		http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// @run-at      document-start
// @version     1.2.42
// @history     1.2.1 [KTN] Updated from abrad45's last version, adding a count-down to the last page before the Giga-Pause. Nav position is now fixed, allowing it to scroll with you.
// @history     1.2.2 [KTN] Used (Stole) Scott Inglis' script to add the ability to open/collapse dialog(dialoglog) by pressing 0 (Zero).
// @history     1.2.3 [KTN] Now shows how many pages it has been since the last save, as well as the page number of the last save.
// @history     1.2.4 [KTN] MSPA pages will now automatically center themselves. Useful if you have a low screen resolution or resized the window and don't want to scroll to the right all the time.
// @history     1.2.41 [KTN] Script now runs at document-start, meaning you won't have to wait for the page to finish loading before it kicks in. (Experimental!)
// @history     1.2.42 [KTN] Added page 8429 to the list so you wouldn't have a huge gap between END OF ACT 6 INTERMISSION 5 and GIGA PAUSE.
// @grant       none
// ==/UserScript==

$(function () {
	if(/s=6/.test(window.location.search)) {
		var URL = window.location.search;
		var root = URL.substr(0,URL.length-4);
		var comic = +URL.substr(-4);
		if(!comic) {
			root = "?s=6&p=00"
			comic = 1901;
		}
	
		var nextURL = '/' + root + (+comic+1);
		var prevURL = '/' + root + (+comic-1);
		
		var max = 1901;
		$('a[href^="?s=6"]').each(function () {
		    if(!isNaN(+$(this).attr('href').substr(-4))) {
		        max = Math.max(max,+$(this).attr('href').substr(-4));
		    }
		});
	
		// starting from the top so I can display nothing if there is no end to the current act. [Up8ed.]
		var endings = [2147, 2658, 3053, 3257, 3888, 4525, 6010, 6012, 6184, 6290, 6566, 6716, 7162, 7337, 7339, 7411, 7826, 8135, 8429, 8752];
		var i = endings.length;
		while(comic < endings[--i]) {}
		i++;
	
		$('table[width=600]')
			.first()
			.parent()
				.css('position', 'relative')
				.prepend(
					$('<div />', {
						'id': 'homeunstuck',
						'css': {
							'position': 'fixed',
							'left': '35px',
							'width': '100px'
						}
					})
				);
		
		$('#homeunstuck')
			.append(
				$('<a />', {
					'id': 'homeunstuck-prev',
					'href': prevURL,
					'text': '<==',
					'css': { 'margin-right': '10px' }
				})
			).append(
				$('<a />', {
					'id': 'homeunstuck-next',
					'href': nextURL,
					'text': '==>'
				})
			);
		
		if(comic == 1901) {
			$('#homeunstuck-prev').remove();
		} else if(comic == max) {
			$('#homeunstuck-next').remove();
		}

		if(!isNaN(endings[i]-comic)) {
			$('#homeunstuck')
				.append($('<div />', { 
					'text': endings[i]-comic + ' left', 
					'id': 'homeunstuck_pages_left'
				})
			);
		}
		
		if($.cookie('s_cookie') == 6 && (comic - $.cookie('p_cookie').substr(-4) > 24)) {
			$('#homeunstuck').append(
				$('<div />', 
					{
						'text': "You've not saved since page " + $.cookie('p_cookie').substr(-4) + ".     (" + (comic - $.cookie('p_cookie').substr(-4)) + " pages ago.)",
						'css': { 
							'color': '#900',
							'font-weight': 'bold'
						}
					}
				)
			)
		}
		
		$(window).keyup(function (e) {
		    if(e.which == 37) {
		        window.location = prevURL;
		    } else if(e.which == 39) {
		        window.location = nextURL;
		    }
		});
	}
});

//Stolen from Scott Inglis - http://userscripts.org/scripts/source/111224.user.js  (Yes, I'm a terrible programmer. -KTN)

var buttonState = 0;
function key_event(e){
	if(e.keyCode==96 || e.keyCode==45 || e.keyCode==48){
		document.getElementsByTagName('button')[buttonState].click();
		if(buttonState==0){buttonState++;}
		else{buttonState--;}
	}
}

window.addEventListener( 'keydown', key_event, false );
//Auto-center function. Remove everything below if you do not want MSPA pages to center themselves when using this script.
$(function () {
    scrollTo(($(document).width() - $(window).width()) / 2, 0);
});