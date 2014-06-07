// ==UserScript==
// @name        NoMiddleMan
// @namespace   2f06d1a9-e5ba-4491-b5d6-862280fa5abd
// @description Rewrites URLs to remove redirection scripts
// @downloadURL https://userscripts.org/scripts/source/155185.user.js
// @updateURL   https://userscripts.org/scripts/source/155185.meta.js
// @grant       GM_addStyle
// @include     http://*
// @include     https://*
// @exclude		http://web.archive.org/*
// @version     1.2
// ==/UserScript==
//
//Version 1.2
// Fixed forcing the resulting url to lower case
//
//Version 1.1
// Fixed css being overriden on some websites (!important everywhere lol)
// Restricted to only run on http(s) pages
// Added option to switch the redirect with the middleman
// Added option to only display the domain of the real link
//
//Known bugs
// Some websites put some space between the link & popup preventing you from hovering to the stripped redirect (not sure how to fix...)
//

var options = {
	// Modify original link to remove redirect, put middleman link in the popup
	swap_urls: false,
	// Only show the host name in the popup text to avoid cluttering
	prettify: false,
};

// Creates a popup for the redirect pointing to href
function popup( link, href )
{
	// Check if we haven't already created the popup for this link
	if ( !link.firstChild || link.firstChild.className!="NoMiddleMan" )
	{
		// Create popup html
		var a = document.createElement("a");
		a.href = href;
		a.target = link.target;
		a.rel = "noreferrer";
		a.appendChild( document.createTextNode(function(href){
			if ( !options.prettify )
				return href;
			// URL parser from http://gunblad3.blogspot.be/2008/05/uri-url-parsing.html
			return /^((\w+):\/\/\/?)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#;\|]+)?([;\|])?([^\?#]+)?\??([^#]+)?#?(\w*)/.exec(href)[6];
		}(href)) );
		
		// Wrapper for anchor
		var span = document.createElement("span");
		span.className = "NoMiddleMan";
		span.appendChild( a );
		
		// Swap urls around if requested
		if ( options.swap_urls )
		{
			a.href = link.href;
			a.innerHTML = 'Original';
			link.href = href;
		}
		
		// Present the popup html
		link.insertBefore( span, link.firstChild );
		if ( !popup.css )
		{
GM_addStyle( "span.NoMiddleMan { position:relative !important; } \
span.NoMiddleMan>a { font: normal normal normal x-small sans-serif; background:#F5F5F5; color:#4169E1; letter-spacing:0px !important; padding:5px !important; border: solid 1px #C0C0C0 !important; display:none !important; position:absolute !important; z-index:9999999 !important; top:100% !important; left:0px !important; min-width:200px !important; } \
a:hover>span.NoMiddleMan>a { display:block !important; } " );
			popup.css = true;
		}
	}
}

// Returns extracted url if there is one, false otherwise
function cull( link )
{
	var url, base = link.toLowerCase();
	
	// Must be http(s) links (no javascript:, ftp: etc)
	if ( base.match(/^https?\:/) )
	{
		
		// Find the start of the (last) real url
		var start = Math.max( base.lastIndexOf('http%3a'),  base.lastIndexOf('http%253a'),  base.lastIndexOf('http:'),
							  base.lastIndexOf('https%3a'), base.lastIndexOf('https%253a'), base.lastIndexOf('https:') );

		if ( start<=0 )
		{
			// Special case: handle redirect url without a 'http:' part
			if ( (start = base.lastIndexOf('www.'))>16 )
			{
				// Insert the http protocol and leave processing for later
				link = link.substring(0,start) + 'http://' + link.substring(start);
			}
			else
			{
				start = 0;
			}
		}
		
		// Extract the redirect url
		if ( start>0 )
		{
			url = link.substring(start);
			// Check whether the real url is a parameter 
			var qindex = base.indexOf('?');
			if ( qindex>=0 && qindex<start )
			{
				// It's a parameter, extract only the url
				var end = url.indexOf('&');
				if ( end>=0 )
				{
					url = url.substring(0,end);
				}
			}
			
			// Decode it properly
			while ( url.indexOf('%')>=0 )
				url = decodeURIComponent( url );
			return url;
		}
	}
	
	// No url found
	return false;
}

// Apply to all links in the document
// FIXME! Does not work on content loaded after page load!
Array.prototype.forEach.call( document.querySelectorAll("a"), function(link) {
	var href = cull( link.href );
	if ( href )
	{
		popup( link, href );
	}
});
