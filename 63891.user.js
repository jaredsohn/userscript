// ==UserScript==
// @name           Hot House Backroom
// @namespace      http://backroom.hothouse.com/
// @description    Various relink functions for the Hot House Backroom
// @include        http://backroom.hothouse.com/*
// ==/UserScript==

i = 0;
thisPage = document.URL;
if (thisPage.indexOf("models") >= 0)
{

	// MODELS INDEX
	imgTags = document.getElementsByTagName('img');
	for(tag=0;tag<imgTags.length;tag++)
	{
		thisTag = imgTags[tag];
		if (thisTag.getAttribute('alt') == 'View Model')
		{
			// this is a model
			thisTag.parentNode.setAttribute('href', 'http://backroom.hothouse.com/model/' + thisTag.parentNode.getAttribute('class').match(/id_([^\s]+)/)[1]);
		}
	}

}
else if (thisPage.indexOf('model') >= 0)
{

	// MODEL DETAIL
	imgTags = document.getElementsByTagName( 'img' );
	for(tag=0;tag<imgTags.length;tag++)
	{
		thisTag = imgTags[tag];
		if (thisTag.getAttribute('alt') == 'View Gallery')
		{
			// this is a gallery link
			thisParent.setAttribute('href', 'http://backroom.hothouse.com/gallery/' + thisTag.parentNode.getAttribute('class').match(/id_([^\s]+)/)[1]);
		}
	}

}
else if (thisPage.indexOf('gallery') >= 0)
{
	
	// GALLERY
	h2tags = document.getElementsByTagName('h2');
	pInfo = h2tags[1];
	tSubstr = pInfo.childNodes[1].innerHTML;
	tFullstr = pInfo.innerHTML;
	tNewstr = tFullstr.replace(' <span>' + tSubstr + '</span>', '');
	tSubstr = tSubstr.replace('[ ', '');
	tSubstr = tSubstr.replace(' ]', '');
	tSubstr = tSubstr.toLowerCase();
	aSubstr = tSubstr.split(' gallery: ');
	arrMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
	for (i=0;i<12;i++)
	{
		if (aSubstr[1].indexOf(arrMonths[i]) >= 0)
		{
			aSubstr[1] = 'backroom exclusives_' + aSubstr[1];
			break;
		}
	}
	newAlt = aSubstr[1] + "_" + aSubstr[0] + "_" + tNewstr.toLowerCase();
	newAlt = newAlt.replace('verboten: ', 'verboten:');
	newAlt = newAlt.replace('&amp;', '&');
	
	imgTags = document.getElementsByTagName( 'img' );
	for(tag=0;tag<imgTags.length;tag++)
	{
		thisTag = imgTags[tag];
		if (thisTag.getAttribute('height') == 105)
		{
			// this is a thumbnail
			thisParent = thisTag.parentNode;
			newLink = thisParent.getAttribute('href') + thisParent.getAttribute('rel');
			thisParent.setAttribute('href', newLink);
			thisTag.setAttribute('alt', newAlt);
		}
	}

}
else if (thisPage.indexOf('exclusive') >= 0 || (thisPage.indexOf('video') >= 0 && thisPage.indexOf('videos') < 0))
{
	
	if (thisPage.indexOf('exclusive') >= 0)
	{
		newAlt = 'backroom exclusives_';
	}
	else
	{
		newAlt = '';
	}
	h2tags = document.getElementsByTagName('h1');
	pInfo = h2tags[0];
	tSubstr = pInfo.childNodes[1].innerHTML;
	tFullstr = pInfo.innerHTML;
	tNewstr = tFullstr.replace(' <span>' + tSubstr + '</span>', '');
	newAlt = newAlt + tNewstr;

	xmlhttp = new XMLHttpRequest(); stablerelease = '';
	imgTags = document.getElementsByTagName('img');
	for(tag=0;tag<imgTags.length;tag++)
	{
		thisTag = imgTags[tag];
		if (thisTag.getAttribute('class') !== null && thisTag.getAttribute('class') == 'watch_now')
		{
			// Watch Now button
			var videoId = thisTag.parentNode.getAttribute('class').match(/id_([^\s]+)/)[1];
			if (videoId !== null)
			{
				xmlhttp.open('GET', '/scenes/' + videoId + '/show_clips', false);
				xmlhttp.send(null);
				theJs = xmlhttp.responseText;
				
				toEval = theJs.substring(0, theJs.indexOf('$.modal'));
				
				eval(toEval);
				vidURL = so[6]['File'];
				thisTag.parentNode.setAttribute('href', vidURL);
				
				// navigate upwards to the Title div that gives us the participants/video name
				curTag = thisTag.parentNode;
				for(p=0;p<4;p++)
				{
					curTag = curTag.previousSibling;
				}
				inside = curTag.innerHTML;
				sSt = inside.indexOf('>');
				inside = inside.substr(sSt+1);
				sSt = inside.indexOf('<');
				inside = inside.substring(0,sSt);
				
				thisAlt = newAlt + '_' + inside;
				thisAlt = thisAlt.replace('&amp;', '&');
				
				thisTag.setAttribute('alt', thisAlt.toLowerCase());
			}
		}
	}

}
else if (thisPage.indexOf('live=1') >= 0)
{
	newSectBeg = '<div class="right_help_column">';
	newSectMid = '';
	newSectEnd = '</div>';
	newAlt = 'backroom live_';
	liveSelect = document.getElementById('live_archive_select');
	xmlhttp = new XMLHttpRequest(); stablerelease = '';
	for(opt=1;opt<liveSelect.options.length;opt++)
	{
		curVidId = liveSelect.options[opt].value;
		curVidAlt = newAlt + liveSelect.options[opt].text;

		xmlhttp.open('GET', '/scenes/' + curVidId + '/show_clips', false);
		xmlhttp.send(null);
		theJs = xmlhttp.responseText;
		
		toEval = theJs.substring(0, theJs.indexOf('$.modal'));
		
		eval(toEval);
		vidURL = so[6]['File'];
		
		curVidAlt = curVidAlt.replace('&amp;', '&');
		curVidAlt = curVidAlt.replace('/', '-');

		newSectMid = newSectMid + '<br /><br />' + '<a href="' + vidURL + '"><img class="watch_now" src="/images/global/backroom/watch_it_now.gif" alt="' + curVidAlt.toLowerCase() + '" /></a>';
	}
	
	newSect = newSectBeg + newSectMid + newSectEnd;
	toRep = document.getElementById('center_column');
	toRep.innerHTML = newSect;

}