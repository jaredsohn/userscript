// ==UserScript==
// @name           AcidLounge Buffer
// @description    Displays the buffer in GB on AcidLounge
// @namespace      chang.geff.is.awesome
// @include        http://www.acid-lounge.org.uk/*
// ==/UserScript==

var logoInfoBox = document.getElementById('logo_infobox');
var spans = logoInfoBox.getElementsByTagName('span');
var spansLength = spans.length;
var ratioSpan;
var uploadedSpan;
var downloadedSpan;
var foundSpanCount = 0;

// spans to watch out for: ratio, uploaded, downloaded
// stop when we've found all 3 of them
for (i = 0; i < spansLength && foundSpanCount < 3; i++)
{
	// go through each of the span's attributes
	var span = spans[i];
	var attributeLength = span.attributes.length;
	for (j = 0; (j < attributeLength) ; j++)
	{
		var attribute = span.attributes[j];
		var nodeName = attribute.nodeName.toLowerCase();
		
		if (nodeName == 'class')
		{
			var nodeValue = attribute.nodeValue.toLowerCase();
			if (nodeValue == "ratio")
			{
				foundSpanCount++;
				ratioSpan = span;
			}
			else if (nodeValue == 'uploaded')
			{
				foundSpanCount++;
				uploadedSpan = span;
			}
			else if (nodeValue == 'downloaded')
			{
				foundSpanCount++;
				downloadedSpan = span;
			}
		}
	}
}

if (foundSpanCount == 3)
{
	var upload = uploadedSpan.innerHTML.replace(" GB", "");
	var download = downloadedSpan.innerHTML.replace(" GB", "");
	var buffer = ((upload - download) *100)/100;

	// add buffer data
	ratioSpan.innerHTML = ratioSpan.innerHTML + " (" + buffer + " GB)";
	uploadedSpan.innerHTML = upload;
	downloadedSpan.innerHTML = download;
}