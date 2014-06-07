// ==UserScript==
// @name           Fuck this shit
// @namespace      fts
// @include        http://www.google.*/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
/**
* jQuery Cookie plugin
*
* Copyright (c) 2010 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/


jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

	$('#main').bind("DOMSubtreeModified", function(){
 		$('#rso .g').each(function(){
			if (!$(this).hasClass('fts-processed')) {
				$(this).addClass('fts-processed');
				$(this).find('.tl button.esw').after(' <a class="fts" href="#">Fuck this shit</a>')
				var url = $(this).find('h3.r a').attr('href');
				if ($.cookie('shitlist')) {
					var shitlist = JSON.parse($.cookie('shitlist'));
					if (arrayCheck(shitlist,url)) {
						$(this).remove();
					}
				}
			}
		});
	});

	$('a.fts').live('click',function(e){
		e.preventDefault();
		var url = $(this).siblings('h3.r').children('a').attr('href');
		if ($.cookie('shitlist')) {
			var shitlist = JSON.parse($.cookie('shitlist'));
			shitlist[shitlist.length] = url;
			$.cookie('shitlist', JSON.stringify(shitlist), { expires: 365, path: '/' });
		} else {
			var shitlist = new Array();
			shitlist[0] = url;
			$.cookie('shitlist', JSON.stringify(shitlist), { expires: 365, path: '/' });
		}
		$(this).parents('.g:first').remove();
	});
	
	function arrayCheck(arr,obj) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == obj) return true;
		}
		return false;
	}
}



// load jQuery and execute the main function
addJQuery(main);
