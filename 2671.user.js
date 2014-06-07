// ==UserScript==
// @name         Flickr Biggr
// @include      http://www.flickr.com/photos/*
// @include      http://flickr.com/photos/*
// @description  Replaces the dinky image on a photo page with a larger size.
// @description  
// @description  Known bugs:
// @description  
// @description      * doesnÃ¢ÂÂt handle photos with notes.
// @version      2006-01-19
// @author       Dave Disser <dave@disser.info>
// ==/UserScript==

(function()
{
	var max_width = window.innerWidth - 300;
	var max_height = window.innerHeight;

	var newimg_cb_factory = function(img, newimg, nextsize)
	{
		return function()
		{
			if (newimg.width == 500 && newimg.height == 375)
				if (nextsize)
				{
					nextsize(img);
					return;
				} else
					return;

			if (newimg.width > max_width)
			{
				img.width = max_width;
				img.height = newimg.height * max_width / newimg.width;
			} else
			{
				img.height = newimg.height;
				img.width = newimg.width;
			}

			if (img.height > max_height)
			{
				img.height = max_height;
				img.width = newimg.width * max_height / newimg.height;
			}

			img.src = newimg.src;
			img.parentNode.style.width = (img.width+2) + 'px';
			addGlobalStyle('#Main, #Main2 {margin-left: 2px ! important;}');
		};
	};

	var upsize_image_o = function(img)
	{
		var newimg = new Image();
		newimg.src = img.src.replace(/\.jpg/, '_o.jpg');
		newimg.onload = newimg_cb_factory(img, newimg, null);
	};

	var upsize_image_b = function(img)
	{
		var newimg = new Image();
		newimg.src = img.src.replace(/\.jpg/, '_b.jpg');
		newimg.onload = newimg_cb_factory(img, newimg, upsize_image_o);
		newimg.onerror = function(){upsize_img_o(img);};
	};

	var scan_for_images = function()
	{
		// See if this page has notes (and abort)
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++)
		{
			var div = divs[i];
			if (div.className == 'photo_note')
			{
				//punt, but how cool would it be to scale note sizes?
				return;
			}
		}

		// Look for images.
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length; i++)
		{
			var img = images[i];
			if (img.width < 200 || img.height < 200)
				continue;
			if (img.src.match(/http:\/\/static\.flickr\.com\/.*\.jpg/))
			{
				upsize_image_b(img)
				break;
			}
		}
	};

	var addGlobalStyle = function (css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	};

	scan_for_images();
})();
