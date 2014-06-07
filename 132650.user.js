// ==UserScript==
// @name            Suomi24-Chat : MonkeyMod
// @namespace	    suomi24monkeymod
// @description	    Bug fixes and improvements for Suomi24 Chat
// @include			http://chatserver.suomi24.fi:8080/*
// @include			http://chatserver2.suomi24.fi:8080/*
// ==/UserScript==


/*
 * Content Script Injection
 * from http://wiki.greasespot.net/Content_Script_Injection
*/
function contentEval(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}


/*
 * Extra user cleanup before adding a new user to the namelist
 * This fixes a bug which was caused by inproper cleaning when user refreshed page
*/
contentEval(function() {
	if (this.name == "mainframe") {
		// Store original user_add funtion
		var original_user_add = parent.frames["mainframe"].user_add;

		// Override user_add function with a new function
		user_add = function(newUser) {
			// Remove username from the namelist (This line is the actual fix for namelist bug)
			// There is an old username left to the namelist in the case of page refresh
			user_remove.call(parent, newUser.nick);
			// Call original user_add function
			original_user_add.call(parent, newUser);
		};

	} else if (this.name == "input") {
		// Info button image
		var elemInfoButton = document.createElement('div');
		elemInfoButton.id = 'dInfoButton';
		elemInfoButton.title = 'MonkeyMod beta aktivoitu';
		elemInfoButton.innerHTML = 'M';		

		document.body.appendChild(elemInfoButton);
		
		elemInfoButton.setAttribute("style",
			'position:absolute; top:7px; right:0px; z-index:10000;' +
			'cursor: help; color: #000; padding: 1px 5px; background-color: #ddd;' +
			'border: #bbb 1px solid; border-radius: 7px; ' +
			'text-align: center; font: italic bold 18px Times New Roman;');
		
		// Start Scroll Fix activation
		// Thist must be repeated, because chat screen with scroll functions are loaded with a delay
		activateScrollFix = function() {
			scrollfixTimer = setTimeout("scrollFix();", 200);
			repeates = 50;
		};
		
	    // Add Scroll fix
		scrollFix = function() {
			try {
				var w = parent.parent.frames["mainframe"].frames["chat"];
			} catch(e) {}
			
			if ((w !== undefined) && (w.scroll_do != undefined)) {			
				// Sroll action function
				w.scroll_do = function() {
					w = parent.parent.frames["mainframe"].frames["chat"];
					
					if (!w.scrolling) {
						return;
					}
					w.scroll(0, w.document.body.scrollHeight);
					setTimeout('try{parent.parent.frames["mainframe"].frames["chat"].scroll_do();}catch(e){}', 100);
				}
				
				// Remove main window horizontal scroll bar
				w.document.body.style.overflowX = "hidden";
				
				// Remove name list horizontal scroll bar
				parent.parent.frames["mainframe"].frames["user"].document.body.style.overflowX = "hidden";
								
			} else {
				scrollfixTimer = setTimeout("scrollFix();", 200);
			}
			
			repeates--;
			if (repeates <= 0) {
				console.log("timeout");
				clearTimeout(scrollfixTimer);
				alert("Scroll Fix Timeout!");
			}
		};

	} else if (this.name == "chat") {
		// At this time we have only template chat_loading.html
		// Scroll fix must be activated with a delay and using another frame
		
		this.onunload = function() {
			// Loading is done, activate scroll fix
			this.parent.frames["input"].activateScrollFix();
		};
	}
});
