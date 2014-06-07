// ==UserScript==
// @name          SA Kung Fu Filter
// @namespace     http://www.someurlthingherethatsprettyunique.com/blah/SAKungFuFilter
// @description	  Because that name was dumb.
// @include       http://forums.somethingawful.com/showthread.php?threadid=3304401*
// ==/UserScript==

/*

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
	var ReplacementText = "kamehameha";
	var ReplacementText2 = "Kamehameha";
	var ReplacementText3 = "KAMEHAMEHA";
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=['jesus',];

	var badwords2 = new Array;
	var badwords3 = new Array;
	var badfirstletter;
	for (x=0;x<badwords.length;x++) {
		badfirstletter=badwords[x].substr(0,1);
		badwords2[x]=badfirstletter.toUpperCase() + badwords[x].substr(1);
		badwords3[x]=badwords[x].toUpperCase();
	}
//alert(badwords2[0]);
//alert(badwords3[0]);
	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="\\b("+badwords.join("|")+")\\b";
	bw=new RegExp(bw, "g");
	var bw2="\\b("+badwords2.join("|")+")\\b";
	bw2=new RegExp(bw2, "g");
	var bw3="\\b("+badwords3.join("|")+")\\b";
	bw3=new RegExp(bw3, "g");
//alert(bw2);
//alert(bw3);

	//do the title first
	document.title=document.title.replace(bw, ReplacementText);
	document.title=document.title.replace(bw2, ReplacementText2);
	document.title=document.title.replace(bw3, ReplacementText3);

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
			newval = newval.replace(bw2, ReplacementText2);
			newval = newval.replace(bw3, ReplacementText3);
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