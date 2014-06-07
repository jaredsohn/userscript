// ==UserScript==
// @name        Reddit
// @namespace   Reddit
// @description Reddit
// @author      SpectralSun
// @include     http://*.reddit.com/*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @require     http://qtip2.com/v/nightly/jquery.qtip.min.js
// @version     1
// ==/UserScript==


GM_addStyle('@import "http://qtip2.com/v/nightly/jquery.qtip.min.css"');
GM_addStyle('.qtip { max-width: none!important; } .qtip-shadow { box-shadow:0px 1px 7px 1px rgba(0, 0, 0, 0.37)!important; }');
(function ($) {
	function isRightClick(event) {
    return event.button === 2;
}
	var width = 1024, 
		height = 553,
		frame = $('<iframe>').css({height: height - 7, width: '100%', border:'none'}),
		content = $('<div>').html(frame).css({width:width - 13});
	
	$(document).delegate(".entry p.title a", "mousedown", function (event) {
        var self = $(this),
            elem = $(event.target).closest('.contextmenu')[0],
            api = $.data(this, 'qtip');
        
        event.stopPropagation(); // Stop it bubbling
        
        // Make sure it needs to be shown
        function showIt(event) {
            return isRightClick(event);// && $(event.target).closest('.contextmenu')[0] === self[0];
        }
        if(!showIt(event)) { return false; }
	
        self.qtip({
            overwrite: false,
            content: content,
            position: {
				my: 'bottom right',
				at: 'top left',
				viewport: $(window)
			},
            show: {
                event: event.type,
                ready: true // Show the tooltip as soon as it's bound
            },
            hide: 'unfocus',
            style: {
                tip: false,
                classes: 'context-menu ui-tooltip-tipsy'
            },
            events: {
                render: function(e, api) {
                   
                
                },
                show: function(e, api) {
                    /* Block show if it isn't a right click or targets don't match */
					api.elements.content.html(content);
					frame.attr('src',$(event.originalEvent.target).attr('href'));
                    return showIt(e.originalEvent);
                }
            }
        }, event); // Make sure to pass the event!
    }) 

    // Little snippet that stops the regular right-click menu from appearing
    .bind('contextmenu', function(){ return false; });
})(jQuery);