// ==UserScript==
// @name           Motherless.com - Auto subscribe
// @namespace      mlas
// @description    Auto subscribe to view "subscribers only" content. May also log in when needed and scale images to fit on the screen
// @include        http://motherless.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/* BEGIN OF USER CUSTOMIZABLE SETTINGS */
var login = ''; // put your login here
var password = ''; // and password here

var autoLogin = true;
var autoFullScreen = true;
/* END OF USER CUSTOMIZABLE SETTINGS */


if(unsafeWindow.$)
{
	$ = unsafeWindow.$;
}

function maximize(e)
{
	var sizeX = unsafeWindow.innerWidth;
	var sizeY = unsafeWindow.innerHeight;
	var ratio = sizeX / e.origWidth;

	if(e.origHeight * ratio > sizeY)
	{
		ratio = sizeY / e.origHeight;
	}
	if(ratio > 5) ratio = 5;

	e.width = Math.round(e.origWidth * ratio) - 4;
	e.heigth = Math.round(e.origHeight * ratio) - 4;
	
	var left = $(e.parentNode.parentNode).offset().left;
	
	e.style.left = ((sizeX - e.width) / 2 - left) + 'px';
}

function gotosub()
{
	location.replace(location.href.replace('/m/','/subscribe/'));
}

if($('h1').text().match('Subscribers Only'))
{
	unsafeWindow.name=location.href;
    $('.gold a').each(function(){
        location.href = this.href;
    });
}
else if(unsafeWindow.name)
{
	if(location.href.match('/subscribe/'))
	{
		$('button').click();
	} 
	else if(location.href.match('/m/'))
	{
		var t=$('div .gold');
		if(t.length)
		{
			t = t.text();
			if(t.match('subscribed'))
			{
				var link = unsafeWindow.name;
				var memberName = location.href.match(/\/m\/(.*)/)[1];
				location.replace(link + (link.match(/\?/) ? '&' : '?') + 'auto_subscribed_to_' + memberName);
			}
			else
			{
				setTimeout(gotosub, Math.round(200 + Math.random() * 1000));
			}
		}
		else
		{
			gotosub();
		}
	}
	else if(location.href.match(/\/[A-F0-9]{4,8}/))
	{
		unsafeWindow.name = null;
	}
	else if(autoLogin && login && password && $('h3').text().match('Account Login'))
	{
		$('#username').val(login);
		$('#password').val(password);
		$('button').click();
	}
	else if($('h1').text().match('Not Found') && location.href.match('%2F')) // fixing site bug with redirecting after login
	{
		location.replace(unescape(location.href).replace('\.com\/\/', '.com/'));
	}

}

if(autoFullScreen)
{
	$('#media-info').prev().find('img:last').css({ /*.add('#thepic')*/
		'width':'',
		'height':'',
		'position':'relative',
		'display':'block',
		'border':'2px solid #900',
		'z-index':'1000'
	}).load(function()
	{
		var offset = $(this).offset();
		unsafeWindow.scrollTo(0, offset.top);

		var that = this;
		this.origWidth = this.width;
		this.origHeight = this.height;
		$(unsafeWindow).bind('resize', func = function()
		{
			maximize(that);
		});
		func();
	}).error(function()
	{
		this.src += '?v=' + Math.random();
	});
}