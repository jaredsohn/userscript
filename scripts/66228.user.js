// Contrasthingy
// version 0.1
// 2010-01-11
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Contrasthingy
// @description   Ensure that input fields have usable bg and fg colors set.
// @include       *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


// integrade livequery

/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.3
 * Requires jQuery 1.1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {
	
$.extend($.fn, {
	livequery: function(type, fn, fn2) {
		var self = this, q;
		
		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;
			
		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});
		
		// Create new Live Query if it wasn't found
		q = q || new $.livequery(this.selector, this.context, type, fn, fn2);
		
		// Make sure it is running
		q.stopped = false;
		
		// Run it immediately for the first time
		q.run();
		
		// Contnue the chain
		return this;
	},
	
	expire: function(type, fn, fn2) {
		var self = this;
		
		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;
			
		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context && 
				(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped )
					$.livequery.stop(query.id);
		});
		
		// Continue the chain
		return this;
	}
});

$.livequery = function(selector, context, type, fn, fn2) {
	this.selector = selector;
	this.context  = context || document;
	this.type     = type;
	this.fn       = fn;
	this.fn2      = fn2;
	this.elements = [];
	this.stopped  = false;
	
	// The id is the index of the Live Query in $.livequery.queries
	this.id = $.livequery.queries.push(this)-1;
	
	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;
	
	// Return the Live Query
	return this;
};

$.livequery.prototype = {
	stop: function() {
		var query = this;
		
		if ( this.type )
			// Unbind all bound events
			this.elements.unbind(this.type, this.fn);
		else if (this.fn2)
			// Call the second function for all matched elements
			this.elements.each(function(i, el) {
				query.fn2.apply(el);
			});
			
		// Clear out matched elements
		this.elements = [];
		
		// Stop the Live Query from running until restarted
		this.stopped = true;
	},
	
	run: function() {
		// Short-circuit if stopped
		if ( this.stopped ) return;
		var query = this;
		
		var oEls = this.elements,
			els  = $(this.selector, this.context),
			nEls = els.not(oEls);
		
		// Set elements to the latest set of matched elements
		this.elements = els;
		
		if (this.type) {
			// Bind events to newly matched elements
			nEls.bind(this.type, this.fn);
			
			// Unbind events to elements no longer matched
			if (oEls.length > 0)
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						$.event.remove(el, query.type, query.fn);
				});
		}
		else {
			// Call the first function for newly matched elements
			nEls.each(function() {
				query.fn.apply(this);
			});
			
			// Call the second function for elements no longer matched
			if ( this.fn2 && oEls.length > 0 )
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						query.fn2.apply(el);
				});
		}
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,
	
	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},
	
	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},
	
	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},
	
	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;
			
			// Save a reference to the original method
			var old = $.fn[n];
			
			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);
				
				// Request a run of the Live Queries
				$.livequery.run();
				
				// Return the original methods result
				return r;
			}
		});
	},
	
	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});
		
		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},
	
	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, function(id) {
				$.livequery.queries[ id ].stop();
			});
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });


// Save a reference to the original init method
var init = $.prototype.init;

// Create a new init method that exposes two new properties: selector and context
$.prototype.init = function(a,c) {
	// Call the original init and save the result
	var r = init.apply(this, arguments);
	
	// Copy over properties if they exist already
	if (a && a.selector)
		r.context = a.context, r.selector = a.selector;
		
	// Set properties
	if ( typeof a == 'string' )
		r.context = c || document, r.selector = a;
	
	// Return the result
	return r;
};

// Give the init function the jQuery prototype for later instantiation (needed after Rev 4091)
$.prototype.init.prototype = $.prototype;
	
})(jQuery);

// end of livequery



// this stuff is stolen from
// Contrast Incrementor -- http://userscripts.org/scripts/review/12091

//compute contrast ratio according to formula at w3.org
//http://www.w3.org/TR/2007/WD-WCAG20-20070517/Overview.html#relativeluminancedef
//INPUT: inR, inG, inB : RGB values in 8bit format (0-255)
//OUTPUT:relative luminance
function computeRelativeLuminance(inR, inG, inB){
    var RsRGB = inR/255;
    var GsRGB = inG/255;
    var BsRGB = inB/255;

    var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}



// take css "rgb(R, G, B)" value and return the three numbers
function rgb2num(rgb) {
    rgb = rgb.replace(/[^0-9,]/g, '');
    rgb = rgb.split(',');
    rgb = [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])];
    return rgb;
}

// take array with three nums and return css compatible rgb string
function num2rgb(arr) {
    return 'rgb('+ arr[0] +','+ arr[1] +','+ arr[2] +')';
}


// configuration stuff
GM_registerMenuCommand("Low contrast", function() { set_min_diff('0.03') });
GM_registerMenuCommand("Medium contrast", function() { set_min_diff('0.08') });
GM_registerMenuCommand("High contrast", function() { set_min_diff('0.1') });
GM_registerMenuCommand("Maximum contrast", function() { set_min_diff('0.2') });
GM_registerMenuCommand("Ludicrous contrast", function() { set_min_diff('0.5') });

function set_min_diff(value) {
    GM_setValue('min_diff', value);
    $('input,textarea').map(adjustContrast);
}


//$('input,textarea').map(function() {
//    $(this).attr('bg', $(this).css('background-color'));
//    $(this).attr('fg', $(this).css('color'));
//});


// check contrast of all the input fields
$('input,textarea').map(adjustContrast);

// do also check the contrast of dynamicly added input fields
$('input,textarea').livequery('focus', adjustContrast);



function adjustContrast() { 
    // remember original colors of each input/textarea
    if($(this).attr('bg') === undefined) {  $(this).attr('bg', $(this).css('background-color'))  }
    if($(this).attr('fg') === undefined) {  $(this).attr('fg', $(this).css('color'))  }

    var bg = rgb2num($(this).attr('bg'));
    var fg = rgb2num($(this).attr('fg'));
    var bg_lum = computeRelativeLuminance(bg[0], bg[1], bg[2]);
    var fg_lum = computeRelativeLuminance(fg[0], fg[1], fg[2]);

    // light bg / dark fg
    var scheme = 'light_bg';
    var diff = bg_lum - fg_lum;

    // dark bg / light fg
    if(bg_lum < fg_lum) {
        scheme = 'dark_bg';
        diff = fg_lum - bg_lum;
    }

    // do stuff until the bg/fg difference is big enough
    while(diff < parseFloat(GM_getValue('min_diff', '0.05'))) {
        if(scheme == 'dark_bg') {
            // decrease bg brightness if > 0
            if(bg[0] > 0 && bg[1] > 0 && bg[2] > 0) {
                bg[0] = Math.max(0, bg[0]-10);
                bg[1] = Math.max(0, bg[1]-10);
                bg[2] = Math.max(0, bg[2]-10);
            }
            // increase fg brightness
            else {
                fg[0] = Math.min(255, fg[0]+10);
                fg[1] = Math.min(255, fg[1]+10);
                fg[2] = Math.min(255, fg[2]+10);
            }
        }

        else {
            // increase bg brightness if < 255
            if(bg[0] < 255 && bg[1] < 255 && bg[2] < 255) {
                bg[0] = Math.min(255, bg[0]+10);
                bg[1] = Math.min(255, bg[1]+10);
                bg[2] = Math.min(255, bg[2]+10);
            }
            // decrease fg brightness
            else {
                fg[0] = Math.max(0, fg[0]-10);
                fg[1] = Math.max(0, fg[1]-10);
                fg[2] = Math.max(0, fg[2]-10);
            }
        }

        // update luminance
        bg_lum = computeRelativeLuminance(bg[0], bg[1], bg[2]);
        fg_lum = computeRelativeLuminance(fg[0], fg[1], fg[2]);

        if(scheme == 'dark_bg')
        { diff = fg_lum - bg_lum }
        else
        { diff = bg_lum - fg_lum }

//        GM_log("bg:"+bg+" ["+bg_lum+"]  /  fg:"+fg+" ["+fg_lum+"]"  +  "  --  diff:" + diff);
    }

//    GM_log("final diff: " + diff);
//    GM_log("final colors: bg:" + num2rgb(bg) + " fg:" + num2rgb(fg));


    // set new colors
    $(this).css({'backgroundColor':num2rgb(bg), 'color':num2rgb(fg)});
}

