// ==UserScript==
// @name		Dead Awaken - Food Summary in Graveyard
// @namespace		http://www.deadawaken.com
// @include		http://www.deadawaken.com/game.php?sec=gy&scr=graveyard*
// ==/UserScript==

			function $xfirst (path,context)
	{	
		return document.evaluate(path,context||document, 
			null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	
	function $xpath(path, context)
	{
		var arr = [];
		for(i = 0,all=document.evaluate(path,context||document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				item = all.snapshotItem(i); i++) 
			arr.push(item);
		return arr;
	}
	
	$xfirst("//div[@id='grave_links']/ul/li/b/a[.='Turn On Flashlight']").style.display="none";
	
	GM_xmlhttpRequest(
	{
		url:"http://www.deadawaken.com/game.php?sec=home&scr=foodnitems&r=45",
		method:"get",
		onload:function(response)
		{
			var result = document.createElement("div");
			result.setAttribute("id","resultXMLRequest");
			result.setAttribute("style","display:none");
			result.innerHTML = response.responseText;
			document.body.appendChild(result);
			
			var parent = $xfirst("/html/body/div[@class='main']//div[@class='center graveyard_links']").parentNode;
			parent.innerHTML += "<br/><br/>";
			parent.appendChild($xfirst("//div[@id='resultXMLRequest']//div[@id='content']/h3[.='Food']/following-sibling::*[@class='center']"));
			parent.appendChild($xfirst("//div[@id='resultXMLRequest']//div[@id='content']/form[last()]"));
			parent.innerHTML += "<br/><br/>";
			
			result.parentNode.removeChild(result);
			$xfirst("//div[@id='grave_links']").addEventListener("DOMNodeInserted",
			function(element)
			{
				$xfirst("//div[@id='grave_links']/ul/li/b/a[.='Turn On Flashlight']").style.display="none";
			},true);
			
		},
		onerror:function(response)
		{
		}
	});