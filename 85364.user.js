// ==UserScript==
// @name		HDzone Direct Attachment Download
// @description	Replace attachment links with direct download links, to skip the popup window and extra mouse clicks.
// @include		http://www.hdzone.org/*
// ==/UserScript==

//get attachment list
var xPH = function(pat) {   // xPathHelper
    return document.evaluate(pat,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
};


var attachList = "//div[@class='t_attachlist']"
var allTrack = xPH(attachList);

var thisTrack, tagA, aIDLink, aIDText, hrefLink, onClickValue


for (var i  = 0; i < allTrack.snapshotLength; i++)
{
	thisTrack = allTrack.snapshotItem(i);
	
	tagA = thisTrack.getElementsByTagName('a');
	
	aIDLink = tagA[1].getAttribute('href');
	
	aIDText = aIDLink.match(/aid\=\d{6}$/g);
	
	hrefLink = tagA[2].getAttribute('href');
	tagA[2].setAttribute('href','attachment.php?'+aIDText);
	
	onClickValue = tagA[2].getAttribute('onClick');
	if(onClickValue)
	{
		tagA[2].removeAttribute('onClick');
	}
}
