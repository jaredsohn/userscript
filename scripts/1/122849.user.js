// ==UserScript==
// @name           TTLG Old Post Colours
// @namespace      ttlg
// @description    TTLG old posts script
// @include        http://www.ttlg.com/forums/*
// ==/UserScript==

if (location.href.indexOf("http://www.ttlg.com/forums/showthread.php")==0)
{
	// Find all posts on the page
	var posts = document.getElementsByClassName('postcontainer');
	if(posts.length > 0)
	{
		// Find the date in seconds from the epoch
		var currentDate = Date.now() / 1000;
		
		// Process each post in turn
		for(var i=0; i < posts.length; i++)
		{
			var postdate = posts[i].getElementsByClassName('date');
			if(postdate.length > 0)
			{
				// Get this date stripping 1st, 2nd etc.
				var thisDateText = '';
				if(document.all)
					thisDateText = postdate[0].innerText;
				else
					thisDateText = postdate[0].textContent;
				var thisDate = thisDateText.replace(/st|nd|rd|th/, '');

				// Strip time from end of string
				thisDate = thisDate.replace(/\s[0-9]+:[0-9]+$/, '');
				
				// Find number of seconds since this post was made
				var postSecs = currentDate - Date.parse(thisDate) / 1000;

				// Check if this post is over a year old (ignoring leap years)
				if(postSecs > 365 * 24 * 60 * 60)
				{
					// Over a year old - create our warning and add it to the page
					var alertDiv = document.createElement('div');
					alertDiv.style.backgroundColor = '#FF5E5B';
					alertDiv.style.fontWeight = 'bold';
					alertDiv.style.padding = '5px 2px';
					alertDiv.style.textAlign = 'center';
					if(document.all)
						alertDiv.innerText = 'Warning - old post';
					else
						alertDiv.textContent = 'Warning - old post';
					var userinfo = posts[i].getElementsByClassName('userinfo_extra')[0];
					userinfo.parentNode.insertBefore(alertDiv, userinfo);
				}
			}
		}
	}
}