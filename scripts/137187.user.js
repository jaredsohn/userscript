// ==UserScript==
// @name        xbox.com - auto expand messages + type any gamertag 
// @namespace   mikecupcake
// @include     http*://live.xbox.com/*/Messages*
// @version     0.4
// ==/UserScript==

// smaller message boxes
GM_addStyle(".detail .compose { height: 3em !important; margin-bottom: 0 !important; } .compose-bubble .compose { height: 5em !important; } .message-footer { padding-top: 0.5em !important; } .message-bubble { padding: 5px !important; } ");

// add a form to type in any gamertag. it refreshes the page with entered tag in URL
var newR = document.createElement('div');
newR.style.marginBottom = "1em";
newR.innerHTML = '<p>or type in a gamertag and hit enter:</p>'
                 +  '<form id="newName" method="get">'
                  + '<input type="text" size="60" name="gamertag" id="gamertagentry"> <input type="submit" value="use this gamertag">'
				  + '</form>'
                  ;
// var cBox = document.getElementsByClassName("compose-bubble")[0];
var target = document.getElementById("recipientsBox");
target.parentNode.insertBefore(newR, target.nextSibling);

// if URL contains a gamertag, focus the message box - otherwise focus the gamertag input
if (window.location.href.indexOf('?gamertag') != -1) {
   var messageBox = document.getElementsByTagName('textarea')[0];
	//  messageBox.focus();   // this isn't working, the page event that clears the messagebox and enables the send button isn't firing. 
} else {
	document.getElementById('gamertagentry').focus();
}

// fires too early without a 0ms setTimeout, I don't know why this fixes it but it does 
setTimeout(function(e){ expandMessages(); } , 0);


function expandMessages() {
   var toggles = document.getElementsByClassName("toggle");
   for ( i = 0; i < toggles.length; i++ ) {
	 simulatedClick(toggles[i]);
   }
}



function simulatedClick(target, options) {
// function by Beejamin:  http://stackoverflow.com/questions/6157929/how-to-simulate-mouse-click-using-javascript

            var event = target.ownerDocument.createEvent('MouseEvents'),
                options = options || {};

            //Set your default options to the right of ||
            var opts = {
                type: options.type                  || 'click',
                canBubble:options.canBubble             || true,
                cancelable:options.cancelable           || true,
                view:options.view                       || target.ownerDocument.defaultView, 
                detail:options.detail                   || 1,
                screenX:options.screenX                 || 0, //The coordinates within the entire page
                screenY:options.screenY                 || 0,
                clientX:options.clientX                 || 0, //The coordinates within the viewport
                clientY:options.clientY                 || 0,
                ctrlKey:options.ctrlKey                 || false,
                altKey:options.altKey                   || false,
                shiftKey:options.shiftKey               || false,
                metaKey:options.metaKey                 || false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
                button:options.button                   || 0, //0 = left, 1 = middle, 2 = right
                relatedTarget:options.relatedTarget     || null,
            }

            //Pass in the options
            event.initMouseEvent(
                opts.type,
                opts.canBubble,
                opts.cancelable,
                opts.view, 
                opts.detail,
                opts.screenX,
                opts.screenY,
                opts.clientX,
                opts.clientY,
                opts.ctrlKey,
                opts.altKey,
                opts.shiftKey,
                opts.metaKey,
                opts.button,
                opts.relatedTarget
            );

            //Fire the event
            target.dispatchEvent(event);
		}
