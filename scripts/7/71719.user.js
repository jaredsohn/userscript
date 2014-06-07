// ==UserScript==
// @name           Highlight Unreplied to Gmail Emails
// @namespace      troynt+gmail@gmail.com
// @description    Highlights Unreplied to Gmail Emails
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==
/***********************************
	CONFIGURATION
***********************************/
// your email addresses
var emails = [
	'foo@example.com',
	'psommerfeld@gmail.com'
];

// do not highlight emails with these tags
var ignore_tags = [
	'[Gmail]/feed'
];

//background color to use on unreplied to emails
var color = '#FFFFCF'

/***********************************
	END OF CONFIGURATION
***********************************/

/**
 * @author Dustin Diaz
 * http://www.dustindiaz.com/getelementsbyclass/
 */
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
	
/**
 * Define GM_addStyle function if one doesn't exist
 */
if( typeof GM_addStyle != 'function' )
function GM_addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}

GM_addStyle('.tnt-unreplied { background:'+color+' !important; }');

//see http://userscripts.org/scripts/show/23408 for loader code
window.addEventListener("load", loader, true);
function loader() {
	var api = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey ||	(frames.js ? frames.js.gmonkey : null);
	
	if (api)
	api.load("1.0", function(gmail)
	{
		function tnt_highlight_unreplied() {
			if( gmail.getActiveViewType() != 'tl' ) return;
					
			var view = gmail.getActiveViewElement();
			var msgs = getElementsByClass('zA',view,'tr')
			for( var i = 0; i < msgs.length; i++ )
			{
				var tags = getElementsByClass('yi',msgs[i],'div');
				var ppl = getElementsByClass('yW',msgs[i],'div')[0];
				var found = false;
				
				if( ppl.innerHTML.indexOf('>me<') > -1 )
					found = true;

				if( !found && tags.length > 0 )
				{
					tags = tags[0]
					for( var j = 0; j < ignore_tags.length; j++ )
					{						
						if( tags.innerHTML.indexOf(ignore_tags[j]) > -1 )
						{
							found = true;
							break;
						}
					}
				}
				
				if( !found )
				{
					for( var j = 0; j < emails.length; j++ )
					{						
						if( ppl.innerHTML.indexOf(emails[j]) > -1 )
						{
							found = true;
							break;
						}
					}
				}
				
				if( !found ) msgs[i].className += ' tnt-unreplied'
			}

		}
		gmail.registerViewChangeCallback(tnt_highlight_unreplied);
		tnt_highlight_unreplied();
	});
}
