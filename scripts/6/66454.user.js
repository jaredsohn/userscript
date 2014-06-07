// ==UserScript==
// @name		Atrophied's Thing
// @namespace		http://twitter.com/Atrophied
// @description		Followers -> Unholy Army
// @include		http://twitter.com/*
// ==/UserScript==



(function() {

	//some performance settings
	var MillisecondsPauseBetweenBatches=3;
	var NodesPerBatch = 20;
	var ReplacementText = "Unholy Army";
	var badwords=['followers'];
	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="\\b("+badwords.join("|")+")\\b";
	bw=new RegExp(bw, "gi");

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
				el.data = newval;
			}
			loopCount++;
		}
		
		if (el != null)
		{
			i--;
			GoNow(MillisecondsPauseBetweenBatches);
		}
		else
		{
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
