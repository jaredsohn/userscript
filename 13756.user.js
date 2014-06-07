// ==UserScript==
// @name           GMail Module - Open message in GMail with navigation controls
// @description    When you click on a mail message in the GMail module on your iGoogle page, now the message is shown with the navigation on the left side and the search box at the top (with the side effect to be able to delete the message immediately).
// @namespace      http://www.nohomepageyet.de
// @include        http://www.google.*/ig*
// ==/UserScript==

	setTimeout(main, 1000);
	
	function main()
	{
		var modules = document.getElementById('modules');

		if(modules)
		{
			var elements = getElementsByClassName('tls', modules);
			
			if(elements.length > 0)
			{
				for(var i=0; i<elements.length; i++)
				{
					changeLinkForMailItem(elements[i]);
				}
			}
			else
				setTimeout(main, 1000);
		}
	}
	
	function changeLinkForMailItem(node)
	{
		for(var i=0; i<node.childNodes.length; i++)
		{
			var currentNode = node.childNodes[i];
			
			if(currentNode.href)
			{
				var startPos = currentNode.href.indexOf('&message_id=');
				var messageID = null;
				var newLink = null;
				
				if(startPos != -1)
				{
					var endPos = currentNode.href.indexOf('&', startPos + 1);
					if(endPos == -1)
					{
						endPos = currentNode.href.length - 1;
					}
					
					messageID = currentNode.href.substring(startPos + '&message_id='.length, endPos);
					newLink = currentNode.href.substr(0, startPos) + '#inbox/' + messageID
				}
				
				currentNode.href = newLink;
			}
		}
	}
	

	/* thanks to tylerhall - http://snipplr.com/view/1696/get-elements-by-class-name/ */
	function getElementsByClassName(classname, node)  
	{
	    if(!node) node = document.getElementsByTagName("body")[0];
	    var a = [];
	    var re = new RegExp('\\b' + classname + '\\b');
	    var els = node.getElementsByTagName("*");
	    for(var i=0,j=els.length; i<j; i++)
	        if(re.test(els[i].className))a.push(els[i]);
	    return a;
	}
