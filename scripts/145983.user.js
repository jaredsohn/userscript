// ==UserScript==
// @name        adobe install - untick Mcafee included
// @namespace   mikecupcake
// @include     http*://*adobe.com/flashplayer/update/plugin/*
// @include	http*://get*.adobe.com/flashplayer/*
// @include	http*://get*.adobe.com/uk/reader/*
// @grant	none
// @version     0.5
// ==/UserScript==

go();


function go() {
        setTimeout(function(){
        	var tick = document.getElementById('offerCheckbox');
        	if (tick) {
        		simulatedClick(tick);
        	} else {
        		go();
        	}
        }, 100);

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
