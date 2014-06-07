// ==UserScript==
//
// @name           reddit.com - Right click to open link and comments.
// @description	   Right clicking a submission title opens the link in a new window along with the current submission comments.
// @namespace      v1.0
//
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
//
// ==/UserScript==

function main()
{
	// Object holding values of domains which disallow framing.
	var noFrameDomains = {'youtube.com':1,'flickr.com':1,'military.com':1};

	// Apply to all article title links
	$('a.title').bind( 'contextmenu', linkAndComments );
	
	function linkAndComments( event )
	{
		var	elem		= $(this),
			commentsURL	= elem.parent().parent().find('.comments').attr('href'),
			linkURL		= event.target,
			linkTitle	= elem.text().replace("'","\\'"),
			linkDomain	= elem.parent().find('.domain a').text(),
			frameStr	= 'javascript:document.write(\'<html><head><title>'+linkTitle+
					  '</title></head><frameset cols="*,500px"><frame src="'+linkURL+
					  '" /><frame src="'+commentsURL+'#sidebar" /></frameset></html>\');document.close()';
		
		// Don't open in a frame if it's a Self post or a Domain which disallows framing.
		if( linkURL == commentsURL || linkDomain in noFrameDomains ) window.open( linkURL );
		else window.open( frameStr );

		// Stop right click propagation
		return false;
	}
	
	if( location.hash != '#sidebar' ) return;
	
	$('#header\-bottom\-right, .side, .footer-parent').remove();
	$('.infobar').remove();
	$('.usertext-edit, .usertext-edit textarea').css( 'width','450px' );
	$('.panestack\-title, .menuarea').css( 'margin','0 10px' );
	$('a').attr('target','_blank');
}

// Add the script into the main page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );