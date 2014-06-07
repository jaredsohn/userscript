// ==UserScript==
// @name		Dead Awaken - Send Battle Log
// @namespace		http://www.deadawaken.com
// @include	        http://www.deadawaken.com/game.php?sec=fight&scr=mall&cmd=attack&attackId=*
// ==/UserScript==

	function $id(id,doc)
	{
		if(!doc) doc = document;
		return doc.getElementById(id);
	}

	var attackId = document.URL.replace(/^.*attackId=(\d+).*$/,"$1");	
	var sendElement = document.createElement("input");
	sendElement.value = "Send Battle Log To " + attackId;
	sendElement.setAttribute("type","button");
	sendElement.setAttribute("id","msgSender");
	sendElement.addEventListener("click",send,true);
	var log1 = document.evaluate("//div[@id='content']/b[.='1.']",document, 
				null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var wrapper = document.createElement("div");
	wrapper.appendChild(sendElement);	
	$id("content").insertBefore(wrapper,log1);		

	function send()
	{
		var selectedText = window.getSelection();		
		 if(selectedText.rangeCount > 0) selectedText.removeAllRanges();
		 var range = document.createRange();
		 range.selectNode($id("content"));
		 selectedText.addRange(range);
		
		var dp = "msgId=" + attackId + "&msgSubject=Battle Log&msgText=" + selectedText.toString();
			
		selectedText.removeAllRanges();
		sendElement.value = "Sending ...";
		delete range;
		delete selectedText;		
		
		GM_xmlhttpRequest(
		{
			url:"http://www.deadawaken.com/game.php?game.php?sec=home&scr=messages&listId=s&cmd=sendmsg&r=90",
			data:dp,
			method:"POST",
			headers:{"content-type":"application/x-www-form-urlencoded"},
			//overrideMimeType:overrideMimeType,
			onload:function(response)
			{
				sendElement.parentNode.removeChild(sendElement);
			},
			onerror:function(response)
			{
				sendElement.value = "Failed,Try again.";
			}
		});	
	}