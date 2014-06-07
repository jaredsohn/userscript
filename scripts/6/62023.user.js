// ==UserScript==
// @name           DrakeRock Models
// @namespace      http://drakerock.com/members/modelGallery.cfm
// @include        http://drakerock.com/members/modelGallery.cfm*
// ==/UserScript==

model = document.getElementById('modelimage');
modelName = model.getAttribute('alt');

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
		newLink.innerHTML = modelName + "/0 Info";
		thisTag.parentNode.insertBefore(newLink, thisTag);
	}
}

sV = document.getElementById('videoStats');
sP = sV.parentNode;
sP.setAttribute('onclick', '');
var sR = sV.getAttribute('src');
if (sR.substr(-7, 1) == '/')
{
	var modId = sR.substr(-6, 2);
}
else
{
	var modId = sR.substr(-7, 3);
}
nH = '/previews/' + modId + 'stats.flv';
sP.innerHTML = modelName + "/0 Info";
sP.setAttribute('href', nH);