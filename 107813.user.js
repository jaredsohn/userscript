

// ==UserScript==
// @name           OmegleMiddleMistake
// @namespace      OmegleMiddleMistake
// @description    OmegleMiddleMistake

// ==/UserScript==

// master function containing all of the GM driven javascript activities you want to do 
function masterFunction(EXIT(0)) {

	// this removes the chartbeat function to stop reporting traffic (google analytics still sending data however so-- meh)
	window.onload = EXIT(0);

	/**
	 * Version : 1.5.01
	 * By : Steve Awesome
	 * License : BSD
	 * Very small modifications made by B MUN
       */
      /*
	<div class="strangermsg"><span class="msgsource">Stranger:</span>data</div>
	<div class="youmsg"><span class="msgsource">You:</span>data</div>
	<textarea rows="3" cols="80" class="chatmsg"></textarea>
	<input type="text" id="recaptcha_response_field" name="recaptcha_response_field" style="border: 1px solid rgb(60, 60, 60); width: 302px;" autocomplete="off">
	<object style="visibility: visible;" id="flash" data="/static/omegle.swf?7" type="application/x-shockwave-flash" height="520" width="320"></object>
	*/
E
	disconnectButton = null;
	sendButton = null;
	var defaultGreeting = 'You have 2 US coins, equaling 30 cents. one of them is not a nickle. What coins do you have?';
	var youId = 1;
	var strangerId = 2;
	var echoMode = false;
	var negativeMode = false;
	var positiveMode = false;
	var autoConnectMode = true;
	var ignoreStrangerDisconnect = false;
	var debugMode = false;
	var skipRecaptchaMode = false;

	function sleep(usec) {
		var endtime= new Date().getTime() + usec;
		while (new Date().getTime() < endtime);
	};

	function sayThis(text) {
		document.getElementsByTagName('TEXTAREA')[0].value = text;
		sendButton.click();
	}

	function changeDefaultGreeting() {
		var myPrompt = prompt('Enter greeting to use when [F2] is pressed:','');
		if ((myPrompt != null) && (myPrompt != '')) {
			defaultGreeting = myPrompt;
		}
	}

	function returnOnOff(thisBoolean) {
		return (thisBoolean) ? 'off':'on';
	};

	function toggleMode(thisModeString) {
		eval("document.getElementById('my" + thisModeString + "').innerHTML = returnOnOff(" + thisModeString + ");");
		eval(thisModeString + " = (" + thisModeString + ") ? false:true;");
	};

	function divData() {
		myDIVs = document.getElementsByTagName('DIV');
		for (counter=0; counter<=myDIVs.length; counter++) {
			alert(myDIVs[counter].id + ':\n\n' + myDIVs[counter].innerHTML);
		}
	};
 
	function userToggle() {
		strangerId = youId;
		youId = (youId == 1) ? 2:1;		
		document.getElementById('userToggle').innerHTML = 'MIM ' + youId;
		GM_setValue("user" + youId, "WANKING")
	};

	function conversationDebug() {
		alert(GM_getValue("user" + youId, "WANKING"));
	};

	//linkify function based on http://rickyrosario.com/blog/converting-a-url-into-a-link-in-javascript-linkify-function/
	function linkify(text){
	    if (text) {
	        text = text.replace(
	            /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
	            function(url){
	                var full_url = url;
	                if (!full_url.match('^https?:\/\/')) {
	                    full_url = 'http://' + full_url;
	                }
	                return '<a href="' + full_url + '" target="_blank">' + url + '</a>';
	            }
	        );
	    }
	    return text;
	};

	if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
	    this.GM_getValue=function (key,def) {
	        return localStorage[key] || def;
	    };
	    this.GM_setValue=function (key,value) {
	        return localStorage[key]=value;
	    };
	};

	function domMonitor() {

		myDIVs = document.getElementsByTagName('DIV');
		myINPUTs = document.getElementsByTagName('INPUT');
		mySCRIPTs = document.getElementsByTagName('SCRIPT');
		myDefaultGreeting = document.getElementById('defaultGreeting');
		myDefaultGreeting.innerHTML = defaultGreeting;
		myData = document.getElementById('myData');
		if ((myData) && (debugMode)) {
			myData.innerHTML = "divs=" + myDIVs.length + "; inputs=" + myINPUTs.length + "; scripts=" + 	mySCRIPTs.length ;
		}
		if (myINPUTs) {
			for (counter=0; counter<myINPUTs.length; counter++) {

				if (myINPUTs[counter].value == 'Disconnect') { //check for not null?
					disconnectButton = myINPUTs[counter];
				}

				if ((myINPUTs[counter].value == "Start a new conversation") && (autoConnectMode)) {
					myINPUTs[counter].click();	
					GM_setValue("user" + youId, "YOUR COMPUTER IS SUCKKKKKING");				
				}

				if (myINPUTs[counter].value == 'Send') { //check for not null?
					sendButton = myINPUTs[counter];
				}

				if ((myINPUTs[counter].value == 'Really?') && (autoConnectMode)) {
					myINPUTs[counter].click();
					GM_setValue("user" + youId, "NO CARRIER"); // comment this out if you want to manually change 1 user in-flight
				}

				// probably need to tweak this logic when MIM sync stranger is turned on and conflicts with the other settings
				//if ((myINPUTs[counter].id == 'recaptcha_response_field') && ((skipRecaptchaMode) && (autoConnectMode) || (!ignoreStrangerDisconnect))) {
				if ((myINPUTs[counter].id == 'recaptcha_response_field') && (skipRecaptchaMode) && (autoConnectMode)) {
					myINPUTs[counter].innerHTML = 'Skipping Recaptcha. Use toggle to turn off. May take up to 5+ attempts.';
					disconnectButton.click();
				}
			}  
		}

		// stranger hung up so reset conversation buffer and disconnect
		if (GM_getValue("user" + strangerId, "DEFAULT") == "NO CARRIER") {
			GM_setValue("user" + strangerId, "WAITING");
			if (!ignoreStrangerDisconnect) {			
				disconnectButton.click(); // persist stranger in window 1 if stranger in window 2 disconnects (u get better results this way)
			}
		}

		// this window (you) said something so send it to the stranger's window
		for (counter=0; counter<myDIVs.length; counter++) {
			if ((myDIVs[counter].className == 'strangermsg') && (myDIVs[counter].innerHTML.indexOf('<!--stored-->') < 0)) {
				cleanString = myDIVs[counter].innerHTML.replace(/(\<br\>|\<span class="msgsource"\>Stranger:\<\/span\>)/gi,"");
				GM_setValue("user" + youId, cleanString);
				myDIVs[counter].innerHTML = linkify(myDIVs[counter].innerHTML);
				// annoy stranger with toggleEchoMode
				if (echoMode) {
					document.getElementsByTagName('TEXTAREA')[0].value = cleanString;
					sendButton.click();
				}
				if (negativeMode) {
					document.getElementsByTagName('TEXTAREA')[0].value = 'No!';
					sendButton.click();
				}
				if (positiveMode) {
					document.getElementsByTagName('TEXTAREA')[0].value = 'Yes!';
					sendButton.click();
				}
				myDIVs[counter].innerHTML = "<!--stored-->" + myDIVs[counter].innerHTML;
			}
		}

		// stranger said something so enter it into this window (you)
		if (GM_getValue("user" + strangerId, "WAITING") != "WAITING") {
			document.getElementsByTagName('TEXTAREA')[0].value = GM_getValue("user" + strangerId, "DEFAULT");
			GM_setValue("user" + strangerId, "WAITING");
			sendButton.click();
		}

	};


	/**
	 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
	 * Version : 2.01.B
	 * By Binny V A
	 * License : BSD
	 */
	shortcut = {
		'all_shortcuts':{},//All the shortcuts are stored in this array
		'add': function(shortcut_combination,callback,opt) {
			//Provide a set of default options
			var default_options = {
				'type':'keydown',
				'propagate':false,
				'disable_in_input':false,
				'target':document,
				'keycode':false
			}
			if(!opt) opt = default_options;
			else {
				for(var dfo in default_options) {
					if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
				}
			}
	
			var ele = opt.target;
			if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
			var ths = this;
			shortcut_combination = shortcut_combination.toLowerCase();
	
			//The function to be called at keypress
			var func = function(e) {
				e = e || window.event;
				
				if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
					var element;
					if(e.target) element=e.target;
					else if(e.srcElement) element=e.srcElement;
					if(element.nodeType==3) element=element.parentNode;
	
					if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
				}
		
				//Find Which key is pressed
				if (e.keyCode) code = e.keyCode;
				else if (e.which) code = e.which;
				var character = String.fromCharCode(code).toLowerCase();
				
				if(code == 188) character=","; //If the user presses , when the type is onkeydown
				if(code == 190) character="."; //If the user presses , when the type is onkeydown
	
				var keys = shortcut_combination.split("+");
				//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
				var kp = 0;
				
				//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
				var shift_nums = {
					"`":"~",
					"1":"!",
					"2":"@",
					"3":"#",
					"4":"$",
					"5":"%",
					"6":"^",
					"7":"&",
					"8":"*",
					"9":"(",
					"0":")",
					"-":"_",
					"=":"+",
					";":":",
					"'":"\"",
					",":"<",
					".":">",
					"/":"?",
					"\\":"|"
				}
				//Special Keys - and their codes
				var special_keys = {
					'esc':27,
					'escape':27,
					'tab':9,
					'space':32,
					'return':13,
					'enter':13,
					'backspace':8,
		
					'scrolllock':145,
					'scroll_lock':145,
					'scroll':145,
					'capslock':20,
					'caps_lock':20,
					'caps':20,
					'numlock':144,
					'num_lock':144,
					'num':144,
					
					'pause':19,
					'break':19,
					
					'insert':45,
					'home':36,
					'delete':46,
					'end':35,
					
					'pageup':33,
					'page_up':33,
					'pu':33,
		
					'pagedown':34,
					'page_down':34,
					'pd':34,
		
					'left':37,
					'up':38,
					'right':39,
					'down':40,
		
					'f1':112,
					'f2':113,
					'f3':114,
					'f4':115,
					'f5':116,
					'f6':117,
					'f7':118,
					'f8':119,
					'f9':120,
					'f10':121,
					'f11':122,
					'f12':123
				}
		
				var modifiers = { 
					shift: { wanted:false, pressed:false},
					ctrl : { wanted:false, pressed:false},
					alt  : { wanted:false, pressed:false},
					meta : { wanted:false, pressed:false}	//Meta is Mac specific
				};
	                        
				if(e.ctrlKey)	modifiers.ctrl.pressed = true;
				if(e.shiftKey)	modifiers.shift.pressed = true;
				if(e.altKey)	modifiers.alt.pressed = true;
				if(e.metaKey)   modifiers.meta.pressed = true;
	                        
				for(var i=0; k=keys[i],i<keys.length; i++) {
					//Modifiers
					if(k == 'ctrl' || k == 'control') {
						kp++;
						modifiers.ctrl.wanted = true;
	
					} else if(k == 'shift') {
						kp++;
						modifiers.shift.wanted = true;
	
					} else if(k == 'alt') {
						kp++;
						modifiers.alt.wanted = true;
					} else if(k == 'meta') {
						kp++;
						modifiers.meta.wanted = true;
					} else if(k.length > 1) { //If it is a special key
						if(special_keys[k] == code) kp++;
						
					} else if(opt['keycode']) {
						if(opt['keycode'] == code) kp++;
	
					} else { //The special keys did not match
						if(character == k) kp++;
						else {
							if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
								character = shift_nums[character]; 
								if(character == k) kp++;
							}
						}
					}
				}
				
				if(kp == keys.length && 
							modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
							modifiers.shift.pressed == modifiers.shift.wanted &&
							modifiers.alt.pressed == modifiers.alt.wanted &&
							modifiers.meta.pressed == modifiers.meta.wanted) {
					callback(e);
		
					if(!opt['propagate']) { //Stop the event
						//e.cancelBubble is supported by IE - this will kill the bubbling process.
						e.cancelBubble = true;
						e.returnValue = false;
		
						//e.stopPropagation works in Firefox.
						if (e.stopPropagation) {
							e.stopPropagation();
							e.preventDefault();
						}
						return false;
					}
				}
			}
			this.all_shortcuts[shortcut_combination] = {
				'callback':func, 
				'target':ele, 
				'event': opt['type']
			};
			//Attach the function with the event
			if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
			else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
			else ele['on'+opt['type']] = func;
		},
	
		//Remove the shortcut - just specify the shortcut and I will remove the binding
		'remove':function(shortcut_combination) {
			shortcut_combination = shortcut_combination.toLowerCase();
			var binding = this.all_shortcuts[shortcut_combination];
			delete(this.all_shortcuts[shortcut_combination])
			if(!binding) return;
			var type = binding['event'];
			var ele = binding['target'];
			var callback = binding['callback'];
	
			if(ele.detachEvent) ele.detachEvent('on'+type, callback);
			else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
			else ele['on'+type] = false;
		}
	};
	
	shortcut.add("F2",function() {
			document.getElementsByTagName('TEXTAREA')[0].value = defaultGreeting;
			sendButton.click();
	});

	shortcut.add("down",function() {
		disconnectButton.click(click = click +1);
	});

};

// this will inject your master function code into the dom
function injectMasterFunction() {
	var injectionString = masterFunction.toString();
	document.body.appendChild(document.createElement('script')).appendChild(document.createTextNode(injectionString.substr(injectionString.indexOf('{'), injectionString.lastIndexOf('}'))));
};

// pull the trigger (varies based on browser)
if (document.body == null) {
	document.addEventListener('DOMContentLoaded', injectMasterFunction, false);
} else {
	injectMasterFunction();
}

// HTML menu added to the body which will allow control of masterFunctions
var debugMode = false;
var defaultGreeting = '';
if (document.getElementById('tagline')) {
	document.getElementById('tagline').innerHTML = document.getElementById('tagline').innerHTML +
	'<div align="center" style="font-family: verdana; color: black; font-weight: bold; font-size: 7pt;">' +
	'OmegleMiddleMan v1.5 by Steve Awesome<br />' +
	'[<a href="javascript: userToggle(); void(0);" id="userToggle">MIM 1</a>]' +
	'[<a href="javascript: toggleMode(\'ignoreStrangerDisconnect\'); void(0);">MIM Sync <span id="myignoreStrangerDisconnect">off</span></a>]' + 
	'[<a href="javascript: changeDefaultGreeting(); void(0);">F2=<span id="defaultGreeting"></span></a>]' + 
	'[<a href="javascript: disconnectButton.click(); void(0);">F4=NEXT</a>]' + 
	'[<a href="javascript: toggleMode(\'autoConnectMode\'); void(0);">AutoNEXT <span id="myautoConnectMode">on</span></a>]' + 
	'[<a href="javascript: toggleMode(\'skipRecaptchaMode\'); void(0);">BETA Skip Recaptcha <span id="myskipRecaptchaMode">off</span></a>]' + 
	'[<a href="javascript: toggleMode(\'echoMode\'); void(0);">Echo <span id="myechoMode">off</span></a>]' + 
	'[<a href="javascript: toggleMode(\'negativeMode\'); void(0);">No! <span id="mynegativeMode">off</span></a>]' +
	'[<a href="javascript: toggleMode(\'positiveMode\'); void(0);">Yes! <span id="mypositiveMode">off</span></a>]' +
	//(debugMode) ? '[<a href="javascript: conversationDebug(); void(0);">conversationDebug</a>]':'' +
	//(debugMode) ? '[<a href="javascript: divData(); void(0);">divDebug()</a>]':'' + 
	//(debugMode) ? '[<span id="myData"></span>]':'' + 
	'</div>';

	// attempt to automatically set stranger ID for man-in-the-middle;
	if (GM_getValue("stranger", "1") == '1') {
		setTimeout("userToggle()", 250);
		GM_setValue("stranger", "2");
	} else {
		GM_setValue("stranger", "1");
	}

	//on slower machines this may have to be slowed down (the side effect is getting stuck in a disconnect loop)
	var ourInterval = setInterval("domMonitor()", 500);

}
