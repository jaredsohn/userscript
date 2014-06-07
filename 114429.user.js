// ==UserScript==
// @name          BF3 Auto Join
// @namespace     http://gappp.in/
// @description   Alt+3 to auto join when fail to connect
// @include       http://battlelog.battlefield.com/*
// @match       http://battlelog.battlefield.com/*
// ==/UserScript==

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
}

contentEval(function() {

/*
* jQuery Hotkeys Plugin
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Based upon the plugin by Tzury Bar Yochay:
* http://github.com/tzuryby/hotkeys
*
* Original idea by:
* Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){

jQuery.hotkeys = {
version: "0.8",

specialKeys: {
8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
},

shiftNums: {
"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
".": ">", "/": "?", "\\": "|"
}
};

function keyHandler( handleObj ) {
// Only care when a possible input has been specified
if ( typeof handleObj.data !== "string" ) {
return;
}

var origHandler = handleObj.handler,
keys = handleObj.data.toLowerCase().split(" ");

handleObj.handler = function( event ) {
// Don't fire in text-accepting inputs that we didn't directly bind to
if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
event.target.type === "text") ) {
return;
}

// Keypress represents characters, not special keys
var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
character = String.fromCharCode( event.which ).toLowerCase(),
key, modif = "", possible = {};

// check combinations (alt|ctrl|shift+anything)
if ( event.altKey && special !== "alt" ) {
modif += "alt+";
}

if ( event.ctrlKey && special !== "ctrl" ) {
modif += "ctrl+";
}

// TODO: Need to make sure this works consistently across platforms
if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
modif += "meta+";
}

if ( event.shiftKey && special !== "shift" ) {
modif += "shift+";
}

if ( special ) {
possible[ modif + special ] = true;

} else {
possible[ modif + character ] = true;
possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
if ( modif === "shift+" ) {
possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
}
}

for ( var i = 0, l = keys.length; i < l; i++ ) {
if ( possible[ keys[i] ] ) {
return origHandler.apply( this, arguments );
}
}
};
}

jQuery.each([ "keydown", "keyup", "keypress" ], function() {
jQuery.event.special[ this ] = { add: keyHandler };
});

})( $ );

/*
*
* jmNotify.js
* DEVELOPED BY
* MORENO DI DOMENICO
* www.moretech.it
* moreno@moretech.it
* 05 Aug 2011
*
*
* http://www.moretech.it/demo/plugins/jmNotify
*
*/

(function($){

  // declare plugin name
  $.fn.jmNotify = function( options ) {
  
  		// declare default options
        var defaults = {
			
			/** options **/
			'methodIn'  	: 'fadeIn',
			'methodOut' 	: 'fadeOut',
			'speedIn'   	: 'normal',
			'speedOut'  	: 'normal',
			'delay'	    	: 3000,
			'html'      	: '',
			'closeButton'	: 'jm-close',
			'closeText'		: '',
			
			/** methods **/	
			'onStart'    	: '',
			'onComplete' 	: ''
		}
		
		options = $.extend(defaults, options);
		
		var $this;

		 // prevent more clicks when single notify is open
		 preventClicks = function()
		 {
			 $this.is(':visible') ? valid = false : valid = true;
			 return valid;
		 }
		 
		 
		 // close Notify
		 closeNotify = function()
		 {
			 if( $this.find('.'+options.closeButton).length == 0)
			 $this.append('<a href="#" class="'+options.closeButton+'">'+options.closeText+'</a>');
			 
			 
			 $('.'+options.closeButton).bind("click", function(){
				$this.hide();
				return false;
			 });
		 }
		
		 
		 // callback onStart
		 onStart = function()
		 {
			if(options.onStart)
			options.onStart();
		 }
		
		 // callback onComplete			 
		 onComplete = function()
		 {
			if(options.onComplete)
			options.onComplete();
		 }
		
		
		 // set new html
		 setHtml = function()
		 {
			 if(options.html)
			 {
				$this.html(options.html); 
			 }
		 }
		
		 // hide notify			 
		 hideNotify = function()
		 {
			// switch methodOut
			 switch (options.methodOut)
			 {
				case 'fadeOut':
					$this.delay(options.delay).fadeOut(options.speedOut, function(){ onComplete(); });
				break;
		
				case 'slideUp':
					$this.delay(options.delay).slideUp(options.speedOut, function(){ onComplete(); });
				break;

				default:
					$this.delay(options.delay).toggle(1, function(){ onComplete(); });
				break;
				
			 }
		 }
		 
		 // show notify
		 showNotify = function()
		 {
			 // switch methodIn
			 switch (options.methodIn)
			 {
				case 'fadeIn':
					$this.fadeIn( options.speedIn, function(){ hideNotify()} );
				break;

				case 'slideDown':
					$this.slideDown( options.speedIn, function(){ hideNotify()} );
				break;

				default:
					$this.toggle(1, function(){ hideNotify();});
				break;
			 }
		 }
		 
		 // init plugin
		 init = function()
		 {
			 if(preventClicks())
			 {
				 closeNotify();
				 onStart();
				 setHtml();
				 showNotify();
			 }
		 }
		 
	
		
		// cycling all elements
		return this.each(function(){
			 $this = $(this);
			 init();
		});

  };
})( $ );

// BF3 Auto Join Script

var bf3aj_state = 0;
/* 0 = error, wait for info
1 = info, wait for error
2 = info, timeout for error, stop */

var bf3aj_dotimer = false;
var bf3aj_counter = 0;

function bf3aj_join() {
    $('#serverguide-show-joinserver-form').submit();
}

function bf3aj_checkState() {
    if(bf3aj_state==0) {
        if($('.gamemanager-launchstate').hasClass('gamemanager-launchstate-launch_info')) {
            bf3aj_state = 1;
            bf3aj_counter = 0;
        }
    } else if(bf3aj_state==1) {
        if($('.gamemanager-launchstate').hasClass('gamemanager-launchstate-launch_error')) {
            bf3aj_join();
            bf3aj_state = 0;
        } else if($('.gamemanager-launchstate').hasClass('gamemanager-launchstate-launch_info')) {
            bf3aj_counter++;
            if(bf3aj_counter==100) bf3aj_state = 2;
        }
    } else if(bf3aj_state==2) {
        //alert("Happy BF3");
        bf3aj_doNotify('Look like you\'re in,<br/>Happy BF3<br /><br /><span style="font-size: 14px; color: orange;">If you like this script, consider a donation. Your money will help me replaced my 9600GT machine, for BF3!!<br /><br /><!--Donate--><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_donations"><input type="hidden" name="business" value="bongikairu@gmail.com"><input type="hidden" name="lc" value="US"><input type="hidden" name="no_note" value="0"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></span>',30000);
        bf3aj_dotimer = false;
    }
}

function bf3aj_timer() {
    if(!bf3aj_dotimer) return;
    bf3aj_checkState();
    setTimeout(bf3aj_timer,100);
}

function bf3aj_start() {
    bf3aj_doNotify('Starting Auto Join',3000);
    bf3aj_dotimer = true;
    bf3aj_state = 0;
    bf3aj_timer();
    bf3aj_join();
}

function bf3aj_stop() {
    bf3aj_doNotify('Stopping Auto Join',3000);
    bf3aj_dotimer = false;
}

function bf3aj_doNotify(text,len) {
    $("#bf3aj_notify").html(text).jmNotify({delay: len});
}

$(document).ready(function() {
    $(document).bind('keydown','Alt+3',function() {
        if(!bf3aj_dotimer) bf3aj_start();
        else bf3aj_stop();
    });
    $('body').append('<div id="bf3aj_notify" class="ubuntuNotify"></div>');
    $('head').append('<style type="text/css">.ubuntuNotify {    background: none repeat scroll 0 0 #000000;    border-radius: 5px 5px 5px 5px;    color: #FFFFFF;    display: none;    font-weight: bold;    opacity: 0.7;    padding: 20px;    position: fixed;    right: 10px;    text-align: center;    top: 10px;    width: 200px;    z-index: 999;}</style>');
});

});