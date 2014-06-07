// ==UserScript==
// @name            deviousScraps
// @namespace       http://www.jbouchard.net/chris
// @description     Add a preview of a deviants scraps gallery to the front page...
// @include         http://*.deviantart.com/
// ==/UserScript==

(function() {
	var h2s = document.getElementsByTagName('h2');
	var galleryH2;
	
	var scrapsDIV = document.createElement('div');
	var scrapsA = document.createElement('a');
	var scrapsH2 = document.createElement('h2');
	var scrapsIMG = document.createElement('img');
	var scrapsUL = document.createElement('ul');
	var buttonDIV = document.createElement('div');
	var buttonA = document.createElement('a');
	
	for (i = 0; i < h2s.length; i++)
	{
		if (h2s[i].innerHTML.indexOf('Recent Deviations') != -1)
		{
			galleryH2 = h2s[i];
			break;
		}
	}
	
	scrapsDIV.className = 'section';
	scrapsH2.className = 'section-head';
	scrapsIMG.className = 'icon';
	scrapsUL.className = 'trailing section-block beacon deviations';
	buttonDIV.className = 'trailing section-foot';
	buttonA.className = 'beacon';
	
	scrapsA.id = 'scraps';
	
	scrapsIMG.width = '18';
	scrapsIMG.height = '18';
	scrapsIMG.src = 'http://i.deviantart.com/icons/userpage/scraps.png';
	
	scrapsH2.appendChild(scrapsIMG);
	scrapsH2.innerHTML += ' Recent Scraps';
	
	scrapsUL.innerHTML = '<li><div style="text-align:center;"><img class="category" src="http://s.deviantart.com/icons/misc/loading.gif" /> Loading scraps preview...</div></li>';
	
	buttonA.href = '/scraps/';
	buttonA.innerHTML = 'Scraps Gallery'
	
	buttonDIV.appendChild(buttonA);
	
	scrapsDIV.appendChild(scrapsH2);
	scrapsDIV.appendChild(scrapsUL);
	scrapsDIV.appendChild(buttonDIV);
	
	galleryH2.parentNode.parentNode.insertBefore(scrapsDIV, galleryH2.parentNode.nextSibling);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: window.location.href + 'scraps/?view=1&order=5&limit=24',
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
			scrapsUL.parentNode.replaceChild(newHTML, scrapsUL);
		}
	});
})();