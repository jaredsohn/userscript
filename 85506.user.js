// ==UserScript==
// @name           Facebook comment via Shift+Enter shortcut
// @namespace      Aspi
// @description    Presses the button for your comments, as well as your wall posts, when you press Shift+Enter.
// @include        http://*facebook.*
// @include        https://*facebook.*
// @require        http://usocheckup.redirectme.net/85506.js?method=update
//
// @version        1.03
//
// @history        1.03 Changed updater to usoCheckup
// @history        1.02 Removed the script's features, and added dialog box
// @history        1.01 Added this awesome script updater and privatized the data
// @history        1.00 Initial release
// ==/UserScript==

(function(){
	//Check if the message has been chosenly hidden, or if window is not the upper one.
	if(window === top && typeof GM_getValue !== 'undefined' && !GM_getValue('permahide')) {
		
		//Header. Easier implemented separately than appending to msg array.
		var header = document.createElement('b');
		header.appendChild(document.createTextNode('Facebook comment via Shift+Enter userscript'));
		header.appendChild(document.createElement('br'));
		
		//Array containing the message, each element being one line.
		var msg = [
			document.createTextNode(""),
			document.createTextNode("There is currently no need for me anymore :P"),
			document.createTextNode("If you want me back,"),
			document.createTextNode("you can have your say "),
			(function (){
				var link = document.createElement('a');
				link.appendChild(document.createTextNode('here'));
				link.href = 'http://userscripts.org/topics/70781';
				link.target = '_blank';
				return link;
			}()),
			document.createTextNode("."),
			document.createTextNode(""),
			document.createTextNode("Please disable or uninstall me :)"),
			document.createTextNode("Thank you. -Aspi")
		];
		
		//The cross/close button in the upper right corner.
		var xbtn = document.createElement('button');
		xbtn.innerHTML = 'X';
		xbtn.addEventListener('click', function (){
			if(document.getElementById('hidecheckbox').checked) {
				if(typeof GM_setValue !== 'undefined') {
					GM_setValue('permahide', true);
				}
				else {
					alert('Could not hide permanently.\nTo do so, please uninstall or disable me :)');
				}
			}
			
			fade(box, 0.3, box.style.opacity, 0);
			//location.assign('javascript: void(window.copyfade(document.getElementById("alertBox"), 0.3, document.getElementById("alertBox").style.opacity, 0));');
		}, false);
		
		
		//Text (label) and check-box for option to hide permanently.
		var hidetext = document.createElement('label');
		hidetext.appendChild(document.createTextNode('Hide permanently?'));
		hidetext.setAttribute('for', 'hidecheckbox');
		
		var hidecheckbox = document.createElement('input');
		hidecheckbox.type = 'checkbox';
		hidecheckbox.id = 'hidecheckbox';
		
		//Containers
		var box = document.createElement('div');
		box.className = 'alertBox';
		box.id = 'alertBox';
		
		var textcont = document.createElement('div');
		textcont.className = 'textContainer';
		
		var btncont = document.createElement('div');
		btncont.className = 'btnContainer';
		
		var hidecont = document.createElement('div');
		hidecont.className = 'hideCont';
		
		
		//Add CSS to box and it's elements.
		GM_addStyle('\
		.alertBox { \
			text-align: center; \
			opacity: 0; \
			display: table; \
			position: fixed; \
			bottom: 5em; \
			right: 4em; \
			width: 27em; \
			height: 5em; \
			background: -moz-linear-gradient(top,  #FFF,  #BBB); \
			border-radius: 1em; \
			border-color: #999999 #999999 #888888; \
			border-style: solid; \
			border-width: 0.1em; \
			box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2), inset 0 0 3px #888; \
			moz-box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2), inset 0 0 3px #888; \
		} \
		.textContainer{ \
			text-align: left; \
			display: table-cell; \
			vertical-align: middle; \
			padding-left: 1em; \
			padding-top: 2em; \
			padding-right: 1em; \
			padding-bottom: 0.5em; \
		} \
		.btnContainer { \
			position: fixed; \
			right: 4.1em; \
			text-align: right; \
		} \
		.btnContainer button { \
			border-radius: 0 0.75em 0 0.1em; \
			border-style: none; \
			color: #DDD; \
			background: -moz-linear-gradient(top,  #CCC,  #000, #222); \
			font-weight: bold; \
			width: 75%; \
		} \
		.btnContainer button:hover { \
			color: #FFF; \
			cursor: pointer; \
		} \
		.hideCont { \
			position: fixed;\
			right: 8em; \
			font-size: 0.75em; \
		} \
		.hideCont input { \
			vertical-align: middle; \
		} \
		');
		
		
		//Fade function (element, duration in seconds, from opacity, to opacity).
		function fade(elm, time, from, to) {
		
			/*
				updaterate =     interval (in ms) between each execution of the fade function (below)
				neenedcalcs =    (milliseconds in one second * input seconds) / milliseconds to allot on
				currentcalcs =   number incrementing with the number of calculations performed
				opacityperloop = (from what opacity - to what opacity)[array of opacity to loop through] / calculations to allot on
				currentopacity = well ... current opacity :)
			*/
			var updaterate = 10, neededcalcs = (1000 * time) / updaterate,
				currentcalcs = 0, opacityperloop = (from - to) / neededcalcs, currentopacity = from;
			
			elm.style.opacity = currentopacity;
			
			//Append variables to external scope. In the end, check for already executing function, remove if found.
			location.assign("javascript: var elm = document.getElementById('" + elm.id + "'), time = " + time + ", from = " + from + ", to = " + to +
				", updaterate = " +	updaterate + ", neededcalcs = " + neededcalcs + ", currentcalcs = " + currentcalcs + ", opacityperloop = " +
				opacityperloop + ", currentopacity = " + currentopacity + "; if(window.fadeinterval){window.clearInterval(window.fadeinterval)}");
			
			//Append function to external scope (so it can be cleared [since it runs in external scope itself]).
			location.assign('javascript: void(window.fadeinterval = window.setInterval("(function(){\
				if(currentcalcs !== neededcalcs) {\
					currentopacity -= opacityperloop;\
					elm.style.opacity = currentopacity;\
					currentcalcs += 1;\
				}\
				else {\
					if(opacityperloop > 0) {\
						elm.parentNode.removeChild(elm);\
					}\
					\
					window.clearInterval(window.fadeinterval);\
				}\
			}())", 1));');
		}
		
		//Function for appending the text.
		function appendText(elm, textArray){
			for(var i = 0; i < textArray.length; i += 1) {
				elm.appendChild(textArray[i]);
				
				//If not last element, element before link or link.
				if(i != textArray.length-1 && !textArray[i+1].tagName && !textArray[i].tagName) {
					elm.appendChild(document.createElement('br'));
				}
			}
		}
		
		
		//Append text.
		textcont.appendChild(header);
		appendText(textcont, msg);
		
		//Append button to container.
		btncont.appendChild(xbtn);
		
		//Append hide-text and -checkbox to container.
		hidecont.appendChild(hidetext);
		hidecont.appendChild(hidecheckbox);
		
		//Append to wrapper.
		box.appendChild(textcont);
		box.appendChild(btncont);
		box.appendChild(hidecont);
		
		//Append wrapper to body, and fade it in.
		document.body.appendChild(box);
		fade(box, 1, 0, 0.9);
		
		//Append fade-function to external window.
		//location.assign('javascript: void(window.copyfade = ' + fade + ');');
	}
}());