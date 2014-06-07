// ==UserScript==
// @name          Shareprovider Fast Links
// @namespace     thedogcow
// @description	  Automatically displays download links in an iframe!
// @include       http://www.shareprovider.com/edonkey-links/*
// @include       http://shareprovider.com/edonkey-links/*
// ==/UserScript==

	var range = document.createRange();
	range.selectNodeContents(document.body);
    var bodyText = range.toString();
	
	var re = new RegExp("Enter [0-9]+ here:");
	
	if (bodyText.match(re))
	{
		var result = bodyText.match(re);
		
		// Get matched text
		var matchedText = "";
		
		for (i = 0; i < result.length; i ++)
		{
     		matchedText = matchedText + result[i] + "\n";
		}
		
		//Get special code now!
		re = new RegExp("[0-9]+");
		result = matchedText.match(re);
		
		var specialCode = "";
		
		for (i = 0; i < result.length; i ++)
		{
     		specialCode = specialCode + result[i] + "\n";
		}
		
		var rdg=document.getElementById('rdg');
		rdg.value = specialCode;
		//alert("Successful match " + specialCode);
		
		//extract iframe address
		re = new RegExp("id=[0-9]+&rdg=");
		result = bodyText.match(re);
		
		var uniqueID = "";
		
		for (i = 0; i < result.length; i ++)
		{
     		uniqueID = uniqueID + result[i] + "\n";
		}
		
		//create iframe here
		newFrame = document.createElement("iframe");
		newFrame.src = "/files/showlinks.php?"+ uniqueID + specialCode + '';
		newFrame.width = 800;
		newFrame.height = 380;
		rdg.parentNode.appendChild(newFrame);
		
	}
