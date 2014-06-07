// ==UserScript==
// @name           FHM Gallery
// @namespace      FHM_User3274647385
// @description    FHM Gallery
// @include        http://www.fhm.com/girls/high-street-honeys/*
// @include        http://www.fhm.com/members/*
// @version        0.0.1
// ==/UserScript==


//no need, fhm already has jquery.
// @require        http://ajax.microsoft.com/ajax/jQuery/jquery-1.3.2.min.js
//bring jquery form the page into GM
var $ = unsafeWindow.jQuery;

//start!
//var g = $('body').prepend('<div id="GM_Gallery">View Gallery</div>');
var g = $('body').prepend('<div id="GM_Gallery">View Gallery</div>');
g=$('#GM_Gallery');
g.css('color', 'white');
g.css('cursor', 'pointer');
g.css('text-decoration', 'underline');
	
	
$('#GM_Gallery').live('click', function () 
{
	function makeThumb(url)
	{
		url = url.replace('aspx?', 'aspx?width=150&height=150&');
		var pos = url.lastIndexOf('/') + 1;
		var lhs = url.substring(0, pos);
		var rhs = url.substring(pos);
		return lhs + 'Thumbnails/_thumb_' + rhs;
	}
	function cleanUrl(url)
	{
		var i = url.indexOf("/App_Media/");
		return url.substring(i);
	}
		
	var body = $('body');
	data = body.html();
	body.html('');
	var fn = function(data) 
	{
		var f = $('#ctl00_Body_imgMain',data);
		var image = f.attr('src');
		var nextLink = $('#ctl00_Body_hlNext',data).attr('href');
		//var sz = '<a href="' + image + '"><img src="' + makeThumb(image) + '"/></a>\n';	
		var sz = '<a href="' + cleanUrl(image) + '"><img src="' + makeThumb(image) + '"/></a>\n';
		body.append(sz);
		if(nextLink)
		{
			$.get(nextLink, fn);
		}
		else
		{
			alert('done');
		}
	}
	//$.get(nextLink, fn);
	//fn(data);
	
	
	var re = new RegExp('http://www.fhm.com/girls/high-street-honeys/([^/]+)/(g|G)allery$');
	var m = re.exec(window.location);
	if(m != null)
	{
		fn(data);
	}
	else
	{
		function get_first_page(user)
		{
			return 'http://www.fhm.com/girls/high-street-honeys/' + user + '/gallery';
		}
		var first_page = null;
		var re = new RegExp('http://www.fhm.com/girls/high-street-honeys/([^/]+)');
		var m = re.exec(window.location);
		if(m != null)
		{
			first_page = get_first_page(m[1]);
		}
		else
		{
			var re = new RegExp('http://www.fhm.com/members/([^/]+)');
			var m = re.exec(window.location);
			if(m != null)
			{
				first_page = get_first_page(m[1]);
			}
		}
		
		if(first_page)
			$.get(first_page, fn);
		else
			alert('fail');
	}

});
