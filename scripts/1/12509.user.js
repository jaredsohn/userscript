// ==UserScript==
// @name         'Stop Calling Me A Consumer' Filter
// @namespace     http://www.adamcrowe.com/stopcallingmeaconsumer
// @description	Version 1.0: Filters the words 'consumer' or 'consumers' from websites/blogs and replaces with 'person/people/public'.
// @include         *
// ==/UserScript==

/*
  Script entirely based on:  
  // @name          Profanity Filter
  // @namespace     http://www.someurlthingherethatsprettyunique.com/blah/ProfanityFilter
  // @description	Version 1.0: Filters profanity from website.  Edit the array profanity to control which words are removed from pages and replaced with ***.
  // @include         *

  Author: MCE
  
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
	var ReplacementText = "person/people/public";
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=['consumer','consumers'];

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
