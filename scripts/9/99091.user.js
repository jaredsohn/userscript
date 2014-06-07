// ==UserScript==
// @name           spy helper
// @namespace      SirDuck36
// @description    help spy
// @include        http://*animecubed.com/billy/bvs/villagespy*
// ==/UserScript==





function KeyCheck(event)
{
    var KeyID = event.keyCode;

   if (KeyID == 192) // '`'
   {
       if (document.body.innerHTML.indexOf("Villages you can spy on:") >= 0)
       {
	   // Get a snapshot for each village
	   var snapMessageList = document.evaluate("//input[@name='spycheck']", document, null,
					 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	   // Examine each message for potential tasty info
	   var i;
	   for (i=0; i<snapMessageList.snapshotLength; i++)
	   {
	       var snap = snapMessageList.snapshotItem(i);

	       if (snap.disabled == false)
	       {
		   snap.checked = true;
		   break;
	       }
	   }

	   unsafeWindow.document.lookinto.submit();
       }

       if (document.body.innerHTML.indexOf("Choose your method of spying") >= 0)
	   unsafeWindow.document.spyatt.submit();
       if(document.body.innerHTML.indexOf("Number of Successes:") >= 0)
	   unsafeWindow.document.spy.submit();
   }

}


// Setup the event listener
document.documentElement.addEventListener("keyup", KeyCheck, true);