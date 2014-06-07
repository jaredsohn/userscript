// ==UserScript== 
// @name          UVA Webmail "Empty Trash" Hide
// @namespace     http://www.virginia.edu
// @description   Used to hide the little trashcan button which will empty the "Trash" mailbox.  I'm always afraid I'll accidentally click it and lose lots of messages...
// @include       https://cms.mail.virginia.edu/Session/*/mailboxes.wssp
// ==/UserScript== 

(function() 
{
	//object constructor
	function bar()
	{

		//get all input elements in the body section
		var inputs = document.getElementsByTagName('body')[0].getElementsByTagName('input');

		//for each input element
		for(var i=0; i<inputs.length; i++)
		{
			//if element has the name "EmptyTrashNow"
			var curNode = inputs[i];
			if (curNode.name == 'EmptyTrashNow'){
				var TrashNext = curNode.nextSibling;
				var TrashParent = curNode.parentNode;
				
				TrashParent.removeChild(curNode);
				TrashParent.removeChild(TrashNext);

			}
		}
	};

	//instantiate and run 
	var foo = new bar();

})();