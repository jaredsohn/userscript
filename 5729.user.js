// ==UserScript==
// @name           Outgoing Link Sanitizer (c) Gary Jacobson
// @description    Attempts to bypass redirectors on outgoing links
// @include        http://*mail.google.com/*
// ==/UserScript==

function ols( win )
{
	// recurse thru frames
	//for (var i = 0; i < win.frames.length; i++)
		//ols( win.frames[i] );
	// recurse thru iframes
	//var iframes = win.document.getElementsByTagName( 'IFRAME' );
	//for (var i = 0; i < iframes.length; i++)
		//ols( iframes[i] );
	// loop thru a tags
	var as = win.document.getElementsByTagName( 'A' );
	for (var i = 0; i < as.length; i++)
	{
		var href = as[i].href;
		if (href)
		{
			var li = href.length;
			while ((li = href.lastIndexOf( 'http', li - 1 )) > 0)
			{
				var plus = (href.substr( li + 4, 1 ) == 's' ? 5 : 4);
				if (href.substr( li + plus, 3 ) == '://')
				{
					as[i].title = 'OUTGOING LINK: ' + href;
					as[i].href = href.substr( li );
					break;
				}
				if (href.substr( li + plus, 9 ).toLowerCase() == '%3a%2f%2f')
				{
					as[i].title = 'OUTGOING LINK: ' + href;
					as[i].href = unescape( href.substr( li ) );
					break;
				}
			}
		}
	}
}

ols( window );
