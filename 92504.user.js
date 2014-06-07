// ==UserScript==
// @name           pfmrc.eu - ignore subforums
// @namespace      pfmrc.eu
// @description    Ignorowanie dzialow
// @include        http://pfmrc.eu/index.php*
// @include        http://pfmrc.eu/viewforum.php*
// @require        http://code.jquery.com/jquery-1.4.4.min.js
// ==/UserScript==

var $;
var ignored;
var gm_mark_array = null;
var gm_sid = null;

GM_addStyle('.gm_t_p { position: relative;}');
GM_addStyle('.gm_p { position: relative;}');
GM_addStyle('.gm_t_ignored { border: 1px solid red;}');
GM_addStyle('.gm_t_watched { border: 1px solid green;}');
GM_addStyle('.gm_t_button { z-index: 20; float: right; right: 2px; top: 2px; width: 64px; height: 14px; line-height: 14px; text-align: center; font-size: 10px; font-family: verdana; display: block; cursor: pointer; font-weight: bold; }');


// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://code.jquery.com/jquery-1.4.4.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait()
{
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery()
{
	try {
		sid = $('a[href^=login.php?logout=true&sid=]');
		
		if( !sid ) {
			return false;
		}
		
		m = sid.attr('href').match(/sid=(\w+)/);
		gm_sid = m[1];
	} catch(e) {
		return false;
	}

	$('a[href^=index.php?c=]').each( function(index)
	{ 
		m = $(this).attr('href').match(/c=(\d+)/);

		$(this).attr('id', 'ac' + m[1]);
		var td = $(this).parent().parent();
		
		td.attr('c', m[1]);

		if( unsafeWindow.localStorage.getItem('ignore_' + m[1]) == '1' ) {
			td.attr('ignored', 1).addClass('gm_t_p gm_t_ignored').append('<span class="gm_t_button gm_t_watched" id="btn' + m[1] + '">śledź</span>');
		} else {
			td.attr('ignored', 0).addClass('gm_t_p gm_t_watched').append('<span class="gm_t_button gm_t_ignored" id="btn' + m[1] + '">ignoruj</span>');
		}
		
		$('#btn' + m[1]).click( function()
		{
			gm_sft($(this));
		} );
		
	} );
	
	
	$('a.forumlink[href^=viewforum.php?f=]').each( function(index)
	{ 
		m = $(this).attr('href').match(/f=(\d+)/);

		$(this).attr('id', 'ac' + m[1]);
		var td = $(this).parent().parent();
		
		td.attr('f', m[1]);

		if( unsafeWindow.localStorage.getItem('ignore_f_' + m[1]) == '1' ) {
			td.attr('ignored', 1).addClass('gm_t_p gm_t_ignored').append('<span class="gm_t_button gm_t_watched" id="btn' + m[1] + '">śledź</span>');
		} else {
			td.attr('ignored', 0).addClass('gm_t_p gm_t_watched').append('<span class="gm_t_button gm_t_ignored" id="btn' + m[1] + '">ignoruj</span>');
		}
		
		$('#btn' + m[1]).click( function()
		{
			gm_sft_f($(this));
		} );
		
	} );
	
	$('a[href^=search.php?search_id=lastvisit]').after(' «» <a name="this" href="#this" id="gm_mark_read">Oznacz ignorowane jako przeczytane</a>');

	$('#gm_mark_read').click( function()
	{
		gm_mark_read($(this));
	} );
}

function gm_sft(obj)
{
	var td = $(obj).parent();
	

	if( td.attr('ignored') == 1 ) {
		td.attr('ignored', 0).removeClass('gm_t_ignored').addClass('gm_t_watched');
		obj.removeClass('gm_t_watched').addClass('gm_t_ignored').text('ignoruj');
		localStorage.setItem('ignore_' + td.attr('c'), '0');
	} else {
		td.attr('ignored', 1).removeClass('gm_t_watched').addClass('gm_t_ignored');
		obj.removeClass('gm_t_ignored').addClass('gm_t_watched').text('śledź');
		localStorage.setItem('ignore_' + td.attr('c'), '1');
	}
}

function gm_sft_f(obj)
{
	var td = $(obj).parent();

	if( td.attr('ignored') == 1 ) {
		td.attr('ignored', 0).removeClass('gm_t_ignored').addClass('gm_t_watched');
		obj.removeClass('gm_t_watched').addClass('gm_t_ignored').text('ignoruj');
		localStorage.setItem('ignore_f_' + td.attr('f'), '0');
	} else {
		td.attr('ignored', 1).removeClass('gm_t_watched').addClass('gm_t_ignored');
		obj.removeClass('gm_t_ignored').addClass('gm_t_watched').text('śledź');
		localStorage.setItem('ignore_f_' + td.attr('f'), '1');
	}
}

function gm_mark_read(button)
{
	button.html('..czekaj..');

	gm_mark_array = new Array();
	
	try {
		for( var i=0; ; i++ ) {
			var key = localStorage.key(i);
			
			if( (m = key.match(/ignore_(\d+)$/)) && localStorage.getItem(key) == '1') {
				gm_mark_array.push( ['c', m[1]] );
			} else if( (m = key.match(/ignore_f_(\d+)$/)) && localStorage.getItem(key) == '1') {
				gm_mark_array.push( ['f', m[1]] );
			}
		}
	} catch ( e ) { }
	
	gm_callback('first');
	
	return false;
}


function gm_callback(data)
{
	if( gm_mark_array.length == 0 ) {
		window.location = '/index.php?sid=' + gm_sid;
	} else {
		var c = gm_mark_array.shift();

		$.ajax( {  url: (( c[0] == 'c' ) ? '/index.php?mark=forums&c=' : '/viewforum.php?mark=topics&f=') + c[1] + '&sid=' + gm_sid, 
				  type: 'GET', data: '', dataType: 'html', 
				  complete: function (req, status)
				  	{
						gm_callback(status);
					}
				} );
	}
	
	return false;
}