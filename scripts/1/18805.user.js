// ==UserScript==// @name           Fix Themarker.com tv// @namespace      urn:rotemliss:greasemonkey:scripts:themarkertvfixing// @description    Show Themarker.com links// @include        http://*themarker.com/*// ==/UserScript==(function(){
	var i;
	var currentElement;
	re = new RegExp("HpPlayer.*?clipid=(.*?)&");
	for (i = 1; (i <= document.getElementsByTagName("iframe").length); i++)
	{
		currentElement = document.getElementsByTagName("iframe")[i - 1];
		var myMatch = re.exec(currentElement.src);
		if (myMatch!=null && myMatch[0].length > 0)
		{
			//found the TV
			var newElement = document.createElement('a');
			newElement.href= myMatch[1];
			newElement.innerHTML = "Direct link";
			currentElement.parentNode.insertBefore(newElement, currentElement);
			return;
		}
		currentElement = document.getElementById("tvScreenIframe");
		if (currentElement != null)
		{
			re = new RegExp("clipURL=(.*)");
			myMatch = re.exec(currentElement.src);
			var newElement = document.createElement('a');
			if (myMatch != null)
			{
				newElement.href= myMatch[1];
				newElement.innerHTML = "Direct link";
				currentElement.parentNode.insertBefore(newElement, currentElement);
			}
			return;
		}
	}})();
