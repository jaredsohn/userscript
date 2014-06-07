// ==UserScript== 
// @name          UVA Webmail Spam Hide
// @namespace     http://www.virginia.edu
// @description   Used to hide the number of new spam messages on UVA Webmail, and display "uva-potential-spam" as simply "Spam" 
// @include       https://cms.mail.virginia.edu/Session/*/mailboxes.wssp
// ==/UserScript== 


(function() 
{
	//object constructor
	function bar()
	{
		//strip the bold tag from the mailbox name (ugly, but it works. redo this part later?)
		document.body.innerHTML = document.body.innerHTML.replace("<b>uva-potential-spam","uva-potential-spam");

		//get all anchor elements in the body section
		var anchs = document.getElementsByTagName('body')[0].getElementsByTagName('A');

		//for each anchor element
		for(var i=0; i<anchs.length; i++)
		{
			//if element has the following href: "mailbox.wssp?Mailbox=uva-potential-spam&"
			var node = anchs[i].firstChild;
			var nodeParent = anchs[i];
			if(nodeParent.getAttribute('href') == 'mailbox.wssp?Mailbox=uva-potential-spam&')
			{
				//Reset spam mailbox display name
				node.nodeValue = 'Spam';
				//Hide "recent" icon for spam mailbox
				txtNode = nodeParent.nextSibling;
				imgNode = txtNode.nextSibling;
				if (imgNode.name == 'recentletter')
				{
					var imgParent = imgNode.parentNode;
					imgParent.removeChild(imgNode);
				}
			}
		}
	};

	//instantiate and run 
	var foo = new bar();

})();