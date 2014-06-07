// ==UserScript== 
// @name           MTA Map Center Auto-preview
// @author		 f0ggy
// @namespace      http://www.desktopmachine.com
// @description    This scripts inserts the preview for the map without having to click on the "View" button
// @include        http://center.mtasa.com/* 
// @exclude        http://center.mtasa.com/*mode=view 

//find the "View" Form
forms = document.getElementsByTagName('form');
for(var i=0; i < forms.length; i++) 
{
    theForm = forms[i];
    // search if the form node has a hidden input field with the name "r" - we need the ID for retrieving the Image 
	findPattern = "input[@name='r']"; // need to use a relative path, since we query theForm iso document
	var results = document.evaluate( findPattern, theForm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	if(results.snapshotLength > 0)
	{
	  // this is the one - hide the form, and replace it with the image instead
	  var res = results.snapshotItem(0);
	  var hr = document.createElement("HR");
	  var newImage = document.createElement("img");
	  newImage.src = 'http://center.mtasa.com/map/map.php?id=' + res.value;
	  theForm.parentNode.replaceChild(newImage, theForm);
	  newImage.parentNode.insertBefore(hr, newImage.nextSibling);
	  return;
	}
}

// ==/UserScript==  