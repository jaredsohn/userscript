// ==UserScript==
// @name         	Expand All Images
// @namespace    	expand4chan
// @author       	Anonymous
// @description		"Expand all images" button for 4chan, with support for the new HTML.
// @match 		https://boards.4chan.org/*/res/*
// @match 		http://boards.4chan.org/*/res/*
// ==/UserScript==

function addJQuery(callback)
{
	// Inject jquery into body
	var script = document.createElement('script');
	script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
	
	// Wait for load event, inject callback function into document so it will exist
	script.addEventListener('load', function()
	{
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);
	
	document.body.appendChild(script);
}

function main()
{
	$('.opContainer .nameBlock').append(' <a id="expand-all-link" onclick="doExpand();" style="cursor: pointer;">Expand all images</a>');

	// Need to define explicitly in this scope or it won't exist
	function doExpand()
	{
		$('a.fileThumb').each(function()
		{
			var targetUri = $(this).attr('href');
			
			$(this).children('img')
				.attr('src', targetUri)
				.css('height', 'auto')
				.css('width', 'auto');
		});
	}
	
	// Need to inject again for this shit to work
	var script = document.createElement('script');
	script.textContent = doExpand.toString();
	document.body.appendChild(script);
}

addJQuery(main);