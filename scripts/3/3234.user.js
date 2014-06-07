// ==UserScript==
// @name          Gmail Label Font Size Fixer
// @namespace     http://www.shiv-prasad.com/
// @description	  Changes the label font size to original size before Gmail Chat
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// Utility functions
function getObjectMethodClosure1(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}


function updateLabels()
{
	var getNode = getObjectMethodClosure1(unsafeWindow.document, "getElementById");
	if(getNode("nb_0"))
	{
		var divs = getNode("nb_0").getElementsByTagName("div");
		for (var i=0; i < divs.length; i++) 
			{
				divs[i].style.fontSize="70%";
			}

	}
}
updateLabels();
window.setInterval(updateLabels,5000);