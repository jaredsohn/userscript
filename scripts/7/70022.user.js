// ==UserScript==
// @name	woxylive
// @namespace	http://twitter.com/paulhenrich
// @description	(beta) Changes the static "Now Playing" panel into one that updates live when a new song is played.
// @include	http://woxy.com/*
// @include	http://*.woxy.com/*
// @exclude	http://woxy.com/blog/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* Copyright (c) 2010 Paul Henrich
 * jQuery Cookie Plugin included with permission: Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *  
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
 

/* NOTES:
 * Pushes new, formatted "artist - song" information into the "Now Playing" area when a song
 * change is detected by polling the private now-playing.php resource.
 *
 * This script attempts to detect variations of itself already included on the page to avoid
 * interfering with official woxy.com updates. I've implemented a cookie-based cache/pseudo-socket
 * to coordinate accross browser sessions to prevent minor DOS attacks on the API among tab (ab)users.
 *
 * jQuery 1.3.2 used for compatibility with GreaseMonkey. This is my first userscript attempt, and
 * I look forward to feedback from more seasoned userscripters.
 */


var now_playing_uri	= 'http://'+ window.location.hostname + '/woxy-current.php';
//relies on GreaseMonkey restrictions in header. Will always be either *.woxy.com or woxy.com

var playlist		= $('#nowPlayingList');
var interval_ms		= 25000;
var cache_time_ms	= interval_ms - 4000; //risk extra calls to resource to avoid stale results 

var artist_song_re	= /^(.*)\s-\s<em>(.*)<\/em>$/;
var trimmable_re	= /[-\s]/gi;

function __woxylive_log (l){
	//GM_log(l);
}
	
// the main function. We branch to either the live resource or the cache/pseudo-socket
// Delay in $.get() can cause a harmless but annoying race condition (skipping an update)
// Counts on cookie expiration for cache expiration. Tested in firefox with 13 woxy.com & www.woxy.com tabs open.
// Playlists in all 13 tabs update without exceeding roughly 1 total call per cache_time_ms accross tabs


function __woxylive_fetch(){
	if ( ! $.cookie('__woxylive_cache')  ){
		 $.get( now_playing_uri, __woxylive_update_playlist );
		 __woxylive_log('Called resource at ' + now_playing_uri);	 
	}
	else {
		__woxylive_update_playlist(unescape($.cookie('__woxylive_cache')));
		__woxylive_log('Fresh cache. Avoided external call');
	}
}

var __woxylive_update_playlist = function(incoming) {
	$.cookie('__woxylive_cache', escape(incoming), {expires: cache_time_ms});
	
	var incoming_pair = incoming.match(artist_song_re);
	if( incoming_pair.length == 3){
	
		var incoming_artist	= incoming_pair[1];
		var incoming_song	= incoming_pair[2];
		var incoming_concat	= incoming_artist +' - '+ incoming_song;
	} else {
		clearInterval(timer_handle); //rf output method
		$("<li style='background-color:lightyellow'>"
			+'<strong>woxylive</strong>:<em> Error loading the current song. '
			+'Try reloading the page. If you see this error a lot, '
			+'consider uninstalling the woxylive userscript.</em></li>')
			.prependTo('#nowPlayingList > ul');
		__woxylive_log('Error processing incoming pair. Stopping script.');
		return;
	}
	
	//rf in v .02
	if( incoming_concat.replace(trimmable_re, '') != $('li#now > nobr > a').text().replace(trimmable_re, '') ) {
		$('#nowPlayingList > ul')
		  .children(':first')
		  .attr("id", "add"); //be consistent with id-based markup currently in page
		  
		//Build and inject a huge ugly string.
		$('<li id="now" style="display:none;">'
				+'<nobr><a target="_BLANK" href="http://www.lala.com/landing?artist='
				+escape(incoming_artist)
				+'&song='
				+escape(incoming_song)
				+'&fc=woxy">'
				+'<img width="28" height="9" border="0" title="buy this track and help support woxy.com" src="/media/site/btn_buy.gif"/> </a>'
				+'<a href="http://www.woxy.com/music/playlist/">'+ incoming_concat +'</a></nobr></li>')
		  .prependTo('#nowPlayingList > ul')
		  .slideDown('slow', function(){
			$('#nowPlayingList > ul')
			 .children(':last')
			 .fadeOut('fast', function(){$(this).remove();});
		  });
		
		__woxylive_log('Update received. It\'s a new song.');
	}
	else{
		__woxylive_log('Update received. It\'s the same song as before.');
	}
}
	

	
if ( playlist.length &! playlist.hasClass('live') ) {  //sanity check
	playlist.addClass('live');
	playlist.css('height', '92px'); //allow overflow hidden to work
	var timer_handle = setInterval( __woxylive_fetch, interval_ms );
	__woxylive_log('Things look good. Starting.');
} 
else {
	__woxylive_log('Detected change in woxy.com. Aborting.');
}




// Klaus Hartl's jQuery plugin, with a modification to the expiration handling (count ms, not days)
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
                date.setTime(date.getTime() + (options.expires)) ; //modified to accept ms instead of days
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