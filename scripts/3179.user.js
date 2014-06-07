// ==UserScript==
// @name          dev.dtf message unfolder
// @description	  Shows message by clicking message link
// @include       http://*.dtf.ru/forum/*
// ==/UserScript==

(function() {
	loader = 'loading...';

	function findElements(query,parent)
	{
		var xpathResult = document.evaluate(query,parent,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var elements = [];
		
		for(var i = 0; i < xpathResult.snapshotLength; ++i)
		{
			elements.push(xpathResult.snapshotItem(i));
		}
	
		return elements;
	}
	
	function findElement(query,parent)
	{
		var elements = findElements(query,parent);
		if(elements.length != 1)
		{
			alert("Expected 1 xpath query result (query: " + query + ")!");
			return null;
		}
		
		return elements[0];
	}
	
	function getMessageId(href)
	{
		if(href.indexOf('#m') == 0)
		{
			return href.match(/#m(\d+)/)[1];
		}
		else if(href.indexOf('topic.php') == 0)
		{
			return href.match(/topic\.php\?msg_id=(\d+)/)[1];
		}
		else if(href.indexOf('thread.php') == 0)
		{
			return href.match(/thread\.php\?id=(\d+)/)[1];
		}
		else if(href.indexOf('msg.php') == 0)
		{
			return href.match(/msg\.php\?id=(\d+)/)[1];
		}
		else
		{
			alert('Unknown url format!');
			return href;
		}
	}
	
	function getMessageInnerHtml(msgid, fn)
	{
		var msgurl = 'http://dev.dtf.ru/forum/msg.php?id=' + msgid;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: msgurl,
			headers: {
				'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function (responseDetails)
			{
				var origmsgdiv = document.createElement('div');
				origmsgdiv.style.display = 'none';
				origmsgdiv = document.body.insertBefore(origmsgdiv,document.body.firstChild);
				
				origmsgdiv.innerHTML = responseDetails.responseText;
				var innerHtml = findElement("descendant::div[@class='msg']",origmsgdiv).innerHTML;
				origmsgdiv.parentNode.removeChild(origmsgdiv);
				fn(innerHtml);
			}
		});
	}
	
	function showFlatMessage(event)
	{
		var msgid = this.getAttribute('dtfunfolder_msgid');
		var myAnchor = this;
		
		myAnchor.style.display = 'none';
		var throbber = document.createElement('span');
		throbber.innerHTML = loader;
		throbber = myAnchor.parentNode.insertBefore(throbber,myAnchor);
		
		function onLoadMessage(innerHtml)
		{
			myAnchor.innerHTML = 'hide';
			
			var msgdiv = findElement("ancestor::table[@class='forum']/following-sibling::div[position()=1 and @class='msg']",myAnchor)
			var origmsg = document.createElement('div');
			origmsg = msgdiv.parentNode.insertBefore(origmsg,msgdiv);
			origmsg.setAttribute('class','dtfunfolder_original_msg');
			origmsg.style.border = '1px solid';
			origmsg.style.margin = '10px';
			origmsg.style.paddingLeft = '15px';
			origmsg.innerHTML = innerHtml;
			
			myAnchor.style.display = 'inline';
			throbber.parentNode.removeChild(throbber);

			function hideFlatMessage(event)
			{
				myAnchor.innerHTML = 'show';
				myAnchor.removeEventListener('click',hideFlatMessage,false);
				myAnchor.addEventListener('click',showAlreadyLoadedFlatMessage,false);
		
				origmsg.style.display = 'none';
		
				event.stopPropagation();
				event.preventDefault();
		 	}
		 	
		 	function showAlreadyLoadedFlatMessage(event)
		 	{
				myAnchor.innerHTML = 'hide';
				myAnchor.removeEventListener('click',showAlreadyLoadedFlatMessage,false);
				myAnchor.addEventListener('click',hideFlatMessage,false);
				
				origmsg.style.display = 'block';
		
				event.stopPropagation();
				event.preventDefault();
		 	}

			myAnchor.removeEventListener('click',showFlatMessage,false);
			myAnchor.addEventListener('click',hideFlatMessage,false);
		}
		
		getMessageInnerHtml(msgid,onLoadMessage);

		event.stopPropagation();
		event.preventDefault();
    }

    function showTreeMessage(event)
    {
		var msgid = this.getAttribute('dtfunfolder_msgid');
		var myAnchor = this;
		
		myAnchor.style.display = 'none';
		var throbber = document.createElement('span');
		throbber.innerHTML = loader;
		throbber = myAnchor.parentNode.insertBefore(throbber,myAnchor);
		
		function onLoadMessage(innerHtml)
		{
			myAnchor.innerHTML = 'hide';
			
			var msgtable = findElement("ancestor::table[position()=1]",myAnchor);
			var mytr = msgtable.insertRow(-1);
			mytr.insertCell(-1);
			var mytd = mytr.insertCell(-1);
			mytd.innerHTML = innerHtml;
			
			myAnchor.style.display = 'inline';
			throbber.parentNode.removeChild(throbber);
			
			function hideTreeMessage(event)
			{
				myAnchor.innerHTML = 'show';
				myAnchor.removeEventListener('click',hideTreeMessage,false);
				myAnchor.addEventListener('click',showAlreadyLoadedTreeMessage,false);
		
				mytr.style.display = 'none';
		
				event.stopPropagation();
				event.preventDefault();
		 	}
		 	
		 	function showAlreadyLoadedTreeMessage(event)
		 	{
				myAnchor.innerHTML = 'hide';
				myAnchor.removeEventListener('click',showAlreadyLoadedTreeMessage,false);
				myAnchor.addEventListener('click',hideTreeMessage,false);
		
				mytr.style.display = 'table-row';
		
				event.stopPropagation();
				event.preventDefault();
		 	}

			myAnchor.removeEventListener('click',showTreeMessage,false);
			myAnchor.addEventListener('click',hideTreeMessage,false);
		}
		
		getMessageInnerHtml(msgid,onLoadMessage);

		event.stopPropagation();
		event.preventDefault();
    }
    
    function installFlatModeLinks(root)
    {
		var anchorContent = " (<small><a class='dtfunfolder_msg_link' href='#'>show</a></small>)";
		var anchors = findElements("//div[last()]/a[contains(@href,'topic.php') or contains(@href,'msg.php') or contains(@href,'#m')]",root);
	    
	    for(var i = 0; i < anchors.length; ++i)
	    {
	    	var linkDiv = document.createElement('span');
	    	linkDiv.innerHTML = anchorContent;
	    	linkDiv = anchors[i].parentNode.insertBefore(linkDiv, anchors[i].nextSibling);
	    	var myNewAnchor = findElement("descendant::a[@class='dtfunfolder_msg_link']",linkDiv);
	    	myNewAnchor.setAttribute('dtfunfolder_msgid',getMessageId(anchors[i].getAttribute('href')));
	    	myNewAnchor.addEventListener("click",showFlatMessage,false);
	    }
    }

	function installTreeModeLinks(root)
	{    
		var anchorContent = " (<small><a class='dtfunfolder_msg_link' href='#'>show</a></small>)";
    	var anchors = findElements("//a[parent::small and contains(@href,'thread.php')]",root);

	    for(var i = 0; i < anchors.length; ++i)
	    {
	    	var linkDiv = document.createElement('span');
	    	linkDiv.innerHTML = anchorContent;
	    	linkDiv = anchors[i].parentNode.insertBefore(linkDiv, anchors[i].nextSibling);
	    	var myNewAnchor = findElement("descendant::a[@class='dtfunfolder_msg_link']",linkDiv);
	    	myNewAnchor.setAttribute('dtfunfolder_msgid',getMessageId(anchors[i].getAttribute('href')));
	    	myNewAnchor.addEventListener("click",showTreeMessage,false);
	    }
    }
    
	installFlatModeLinks(document.body);
	installTreeModeLinks(document.body);
})();