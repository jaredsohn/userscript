// ==UserScript==
// @name           DrakeRock
// @namespace      http://drakerock.com/members/video.cfm
// @include        http://drakerock.com/members/video.cfm*
// @description    Link to FLV files
// ==/UserScript==

var modelNames = new Array();
var m = 0;

linkTags = document.getElementsByTagName( 'a' );
for(tag=0;tag<linkTags.length;tag++)
{
	thisTag = linkTags[tag];
	hr = thisTag.getAttribute('href');
	if (hr.substr(0, 7) == 'videos/')
	{
		var nH = hr.substr(7);
		if (nH.substr(3, 1) == "-")
		{
			var vidId = nH.substr(0, 3);
		}
		else
		{
			var vidId = nH.substr(0, 2);
		}
		nH = 'kp3xM6E7/' + nH;
		forL = thisTag.innerHTML;
		thisTag.setAttribute('id', 'vidlink');
		thisTag.className = "amplink";
		thisTag.setAttribute('href', nH);
	}
	else if (hr.substr(0, 12) == 'modelGallery')
	{
		if (modelNames.indexOf(thisTag.innerHTML) == -1)
		{
			modelNames[m] = thisTag.innerHTML;
			m++;
		}
	}
}

dirToStore = modelNames.join(" & ") + "/" + vidId + " " + forL;

document.getElementById('vidlink').innerHTML = dirToStore;

imgTags = document.getElementsByTagName('img');
for(tag=0;tag<imgTags.length;tag++)
{
	thisTag = imgTags[tag];
	sr = thisTag.getAttribute('src');
	if (sr.substr(-9) == 'thumb.jpg')
	{
		nSr = sr.replace('thumb', '');
		var newLink = document.createElement('a');
		newLink.setAttribute('href', nSr);
		newLink.innerHTML = dirToStore;
		thisTag.parentNode.insertBefore(newLink, thisTag);
	}
}