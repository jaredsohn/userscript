// ==UserScript==
// @name           Share on Facebook for Reddit
// @namespace      http://userscipts.org/users/93162/
// @include        http://www.reddit.com/
// ==/UserScript==

var allAnchors = document.getElementsByTagName('a');

//Loop through all tags using a for loop
for ( i = 0; i < allAnchors.length; ++i ) 
{
	//Get all tags with the specified class name.
	if ( allAnchors[i].className.match('title') == 'title' )
	{
		var parent = allAnchors[i].parentNode;
		var linkText = allAnchors[i].text;
		var linkUrl = allAnchors[i].getAttribute('href');
				
		var button = document.createElement('a');
		button.href = 'javascript:void window.open("http://www.facebook.com/sharer.php?u=' + '' + linkUrl + '&t=' + linkText + '", "mywindow","width=600,height=300");';
		button.style.fontSize = '10px';
		button.style.marginLeft =  '10px';
		button.innerHTML = '[share on facebook]';

		
		if ( !allAnchors[i].nextSibling )
		{
			parent.insertBefore( button, allAnchors[i].nextSibling );
		}
		else
		{
			parent.appendChild( button );
		}
	}
}
