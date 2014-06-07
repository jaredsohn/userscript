// ==UserScript==
// @name	fotop Album Expander
// @namespace	http://notablogger.spaces.live.com/fotop
// @description	Expand fotop album
// @homepage	http://notablogger.spaces.live.com/
// @include	http://www.fotop.net/*
// ==/UserScript==

function album_expander($)
{
	//return;
    var imgs = '';
    $('.thumbs > tbody > tr > td > table >tbody').each(function() {
	var tr = $('tr',this);
	if (tr) {
		var tr2 = $('td',tr[1]);
		if (tr2) {
			var tr3 = tr2[1];
			if (tr3) {
				var a = tr3.getElementsByTagName('a');
				if (a) {
					var alink = a.item(0)
					if (alink) {
						var img = tr3.getElementsByTagName('img');
						if (img) {
							var imgsrc = img.item(0).src.replace(/thumb./, '');
							imgs += '<a href="' + alink + '"><img alt="" src="' + imgsrc + '"></a><br />';
						}
					}
				}
			}
		}
	}
	});
	if (imgs!='') {
		imgs='<span>'+imgs+'</span>';
		$('#thumbs').html(imgs);
	}
}

function GM_wait()
{
    if (typeof unsafeWindow.jQuery == 'undefined')
	window.setTimeout(GM_wait, 100);
    else
	album_expander(unsafeWindow.jQuery);
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

GM_wait();

