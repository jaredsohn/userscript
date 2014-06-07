// ==UserScript==
// @name           SprintPCS Picturemail Enhancement
// @description    Replaces the "Print" link with an "Original" link pointing to original image
// @include        http*://pictures.sprintpcs.com/messagestore/messages.do*
// @include        http*://pictures.sprintpcs.com/messagestore/sendMessages.do*
// @include        http*://pictures.sprintpcs.com/messagestore/savedMessages.do*
// ==/UserScript==

// Find all hrefsin the src
printLinks = document.evaluate('//*[@href]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var prevImage = "";

for (var snapshotIndex = 0; snapshotIndex < printLinks.snapshotLength; ++snapshotIndex ) {

	var printLink = printLinks.snapshotItem(snapshotIndex);
   // Find all "Print" links
   if(printLink.innerHTML == 'Print')
   {
      // Replace "Print" link with "Original"
      printLink.innerHTML = "Original";
      // And a pointer to the last img we found that matched out image criteria
      printLink.setAttribute('href', prevImage);
   }
   else
   {
      if(printLink.innerHTML.match('img[ ]*src='))
      {
         prevImage = printLink.innerHTML.match('http://pictures[%.:_/A-Za-z0-9]*');
         if(prevImage)
         {
            prevImage += '?limitsize=3300&partExt=.jpg&outquality=90&ext=.jpg';
         }
      }
   }
}

