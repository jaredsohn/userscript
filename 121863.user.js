// ==UserScript==
// @name          SOPA Filter - By Zachary Radford
// @namespace     Zachs SOPA filter
// @description	Filters all trads mark names into "<trademark>"
// @include         *
// ==/UserScript==

/*

  Author: MCE - Edited by Zach
  
  Significantly rewritten other replacement scripts to noticably improve performance and add pseudo-threading to gradually replace words on larger pages.
  
  Version: 1.0
    1.0 - First Release

  Competing scripts and extensions:
   * http://www.arantius.com/article/arantius/clean+language/
   
   Improvements Needed:
   * Filter HTML attributes (ALT, TITLE, TOOLTIP, etc)
   * Add an interface to manage the words by turning this into an extension.

*/

// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.

(function() {

	//some performance settings
	var MillisecondsPauseBetweenBatches=3;
	var NodesPerBatch = 20;
	var ReplacementText = "<trademark>";
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=['xbox', 'word', 'windows', 'virginmedia',  'virgin media', 'twitter', 'the tech guys', 'sony','skyrim', 'scouts', 'razer', 'qwerty', 'publisher', 'pcworld', 'pc world', 'osx', 'ocr', 'nvidia', 'nike', 'myspace', 'microsoft', 'kinect', 'ipod', 'iphone', 'ipad', 'intel', 'fus ro dah', 'facebook', 'excel', 'dell', 'currys', 'COD', 'cod', 'call of duty', 'blackberry', 'bic', 'bench', 'ben sherman', 'battlefield', 'assassins creed', 'aqa',  'apple', 'addidas',  'activision'];
	
	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="\\b("+badwords.join("|")+")\\b";
	bw=new RegExp(bw, "gi");

	//do the title first
	document.title=document.title.replace(bw, ReplacementText);

	function CleanSome() 
	{		
		var el;
		var newval="";
		var data = "";
		var loopCount = 0;
		while ((el=els.snapshotItem(i++)) && (loopCount <= NodesPerBatch)) 
		{
			data = el.data;
			newval = data.replace(bw, ReplacementText);
			if (newval.length != data.length ||  newval != data)
			{
				//check the length first since its quicker than a a string comparison.
				//only change the value if we need to. its quicker.
				el.data = newval;
			}
			loopCount++;
		}
		
		if (el != null)
		{
			//more work left to do
			i--;
			GoNow(MillisecondsPauseBetweenBatches);
		}
		else
		{
			//we're done
			DoneNow();
		}
	}
	
	function DoneNow()
	{
		var et = new Date().valueOf();
		//alert("Milliseconds to complete: " + (et - st).toString()); //timer code
	}

	function GoNow(WaitUntil)
	{
		window.setTimeout(CleanSome, WaitUntil); 
	}
	
	//spin the initial "thread"
	GoNow(0);

})
();