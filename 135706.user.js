// ==UserScript==
// @name       craiglist filter
// @namespace  http://*.craigslist.*
// @version    0.1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @description  filter craigslist from crappy ads
// @match      http://*craigslist*/*
// @copyright  2012+, You
// ==/UserScript==

(function ($) {
    
	$.event.special.textchange = {
        
		setup: function (data, namespaces) {
            $(this).data('lastValue', this.contentEditable === 'true' ? $(this).html() : $(this).val());
			$(this).bind('keyup.textchange', $.event.special.textchange.handler);
			$(this).bind('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
		},
        
		teardown: function (namespaces) {
			$(this).unbind('.textchange');
		},
        
		handler: function (event) {
			$.event.special.textchange.triggerIfChanged($(this));
		},
        
		delayedHandler: function (event) {
			var element = $(this);
			setTimeout(function () {
				$.event.special.textchange.triggerIfChanged(element);
			}, 25);
		},
        
		triggerIfChanged: function (element) {
            var current = element[0].contentEditable === 'true' ? element.html() : element.val();
			if (current !== element.data('lastValue')) {
				element.trigger('textchange',  [element.data('lastValue')]);
				element.data('lastValue', current);
			}
		}
	};
    
	$.event.special.hastext = {
        
		setup: function (data, namespaces) {
			$(this).bind('textchange', $.event.special.hastext.handler);
		},
        
		teardown: function (namespaces) {
			$(this).unbind('textchange', $.event.special.hastext.handler);
		},
        
		handler: function (event, lastValue) {
			if ((lastValue === '') && lastValue !== $(this).val()) {
				$(this).trigger('hastext');
			}
		}
	};
    
	$.event.special.notext = {
        
		setup: function (data, namespaces) {
			$(this).bind('textchange', $.event.special.notext.handler);
		},
        
		teardown: function (namespaces) {
			$(this).unbind('textchange', $.event.special.notext.handler);
		},
        
		handler: function (event, lastValue) {
			if ($(this).val() === '' && $(this).val() !== lastValue) {
				$(this).trigger('notext');
			}
		}
	};	
    
})(jQuery);

function matches(exp, str) {
    return (str.match(exp) == null ? false : true);
}

function showMatching( re ) {
    // we show all elements that match a query by hiding everything that doesn't match
    $(".row").not(function(i) {
        return matches( re, $('a',this).text());
    }).hide();
}

function incrementalSearch() {
    var query = $('#incSearch').val();
    console.log(query);
    re = new RegExp(query, 'i');
    showMatching(re);
}

function showAll() {
    $(".row").show();
}

// filter -> every element for which the predicate returns true
// hence, find all elements matching the exclude regex list and hide them
$(document).ready( function () {
    // this is where we add the search field
    submitCell = $(':submit').parent();
    // Create the button and place on the page
    var searchField = 'Search:<input type="text" id="incSearch" style="width:50%" value="" />';
    submitCell.append(searchField);
    var incField = $('#incSearch');
    incField.bind('textchange', function () {
        q = incField.val();
        if( q.length == 0 )
            showAll();
        else
            incrementalSearch();
    });
});