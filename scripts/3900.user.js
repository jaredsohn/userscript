// ==UserScript==
// @name            deviousFrontPage
// @namespace       http://www.jbouchard.net/chris
// @description     Replace Gallery preview with the actual page...
// @include         http://*.deviantart.com/
// ==/UserScript==

(function() {
	var ulTags = document.getElementsByTagName('ul');
	var galleryUL
	
	for (i = 0; i < ulTags.length; i++)
	{
		if (ulTags[i].parentNode.innerHTML.indexOf('Recent Deviations') != -1)
		{
			galleryUL = ulTags[i];
			break;
		}
	}
	
	galleryUL.innerHTML = '<li><div style="text-align:center;"><img class="category" src="http://s.deviantart.com/icons/misc/loading.gif" /> Loading gallery preview...</div></li>';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: window.location.href + 'gallery?view=1&order=5&limit=24',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{
			var s = responseDetails.responseText.indexOf('<!--/bar-user-->') + 16;
			var e = responseDetails.responseText.indexOf('<!--/user-->');
			var contents = responseDetails.responseText.substring(s, e);
			var temp = document.createElement('div');
			
			temp.innerHTML = contents;
			tempDivs = temp.getElementsByTagName('div');
			
			for (i = 0; i < tempDivs.length; i++)
			{
				if (tempDivs[i].className == 'dev-thumbnails trailing section-block')
				{
					var pTags = tempDivs[i].getElementsByTagName('p');
					
					var newHTML = document.createElement('div');
					
					for (j = 0; j < pTags.length; j++)
					{
							newHTML.innerHTML += '<p class="dev dev' + (j + 1) + '">' + pTags[j].innerHTML + '</p>';
					}
					
					newHTML.innerHTML = '<div id="devFP" class="dev-thumbnails trailing section-block"><div class="dev-100 dev-4">' + newHTML.innerHTML + '</div></div>';
					
					break;
				}
			}
			galleryUL.parentNode.replaceChild(newHTML, galleryUL);
		}
	});
})();