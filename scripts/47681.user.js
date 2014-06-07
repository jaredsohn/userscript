// ==UserScript==
// @name         'twitterbegone'
// @namespace     http://jbarel.com/
// @description	  this is a customized version of the script 'Boogie is a Boogie', (http://userscripts.org/scripts/show/42971), which removes mentions of the words "twitter" and "tweet" and טוויטר (hebrew) and replaces them with a random selection of other nouns. The origin of this script is Boogie, which in turn is based on another script - check them out.
// @include         *
// ==/UserScript==

/*
  Script entirely based on:  
// @name         'Stop Calling Me A Consumer' Filter
// @namespace     http://www.adamcrowe.com/stopcallingmeaconsumer
// @description	Version 1.0: Filters the words 'consumer' or 'consumers' from websites/blogs and replaces with 'person/people/public'.
// @include         *


  Author: MCE
  
  Significantly rewritten other replacement scripts to noticeably improve performance and add pseudo-threading to gradually replace words on larger pages.
  
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
	var ReplacementTextArr = new Array("snailmail", "משפחות הפשע", "Geocities", "Hello Kitty");
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=new Array( 'טוויטר', 'twitter', 'tweet');

	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="("+badwords.join("|")+")";

	bw=new RegExp(bw, "gi");

	//do the title first
	var ReplacementText = Math.floor(Math.random() * ReplacementTextArr.length);
	document.title=document.title.replace(bw, ReplacementTextArr[ReplacementText]);

	function CleanSome() 
	{		
		var el;
		var newval="";
		var data = "";
		var loopCount = 0;
		while ((el=els.snapshotItem(i++)) && (loopCount <= NodesPerBatch)) 
		{
			data = el.data;
			var ReplacementText = Math.floor(Math.random() * ReplacementTextArr.length);
			newval = data.replace(bw, ReplacementTextArr[ReplacementText]);
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
