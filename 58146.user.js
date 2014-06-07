// ==UserScript==
// @name           Penny Arcade: Comic on Front Page
// @description    Display the current Penny Arcade comic on the front page
// @include        http://penny-arcade.com/
// @include        http://www.penny-arcade.com/
// @author         Seguer
// ==/UserScript==

(function() {

var load_jquery = function (callback)
{
	var jq_elem = document.createElement ('script');
	jq_elem.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2/jquery.min.js';
	jq_elem.type = 'text/javascript';
	document.getElementsByTagName ('head')[0].appendChild (jq_elem);

	var wait = function ()
	{
	        if (unsafeWindow.jQuery)
		{
			unsafeWindow.jQuery.noConflict ();
			return callback ();
		}
		unsafeWindow.setTimeout (wait, 100);
	};
	wait ();
};

var with_jquery = function (callback)
{
	if (unsafeWindow.jQuery !== undefined)
	{
		callback (unsafeWindow.jQuery);
	}
	else
	{
		load_jquery (function ()
		{
			callback (unsafeWindow.jQuery);
		});
	}
};

with_jquery (function ($)
{
	var href = $('a.btnComic.btn').attr('href');
	
	$('#body').before('<div id="bodyFull"><div id="ajax-comic"><p>Comic Loading...</p></div></div>');
	$('#ajax-comic').html('<div><iframe id="proxy-frame" src="'+href+'"></iframe></div>');
	var a = $('#ajax-comic');
	a.css({
		width: '100%',
		height: '550px',
		overflow: 'hidden'
	});
	var c = $('#ajax-comic > div');
	c.css({
		width: '100%',
		height: '550px',
		marginTop: '-170px'
	});
	var f = $('#proxy-frame');
	f.css({
		width: '100%',
		height: '800px',
		border: 0,
		overflow: 'hidden'
	});

});

})();