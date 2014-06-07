// ==UserScript==
// @name           bayimg autotags
// @namespace      http://juhani.naskali.net/files/gm/
// @description    Automatically creates tags for bayimg.com
// @version	0.1
// @date		2007-10-15
// @include        http://bayimg.com/upload
// ==/UserScript==

function selectNodes(doc, context, xpath)
{
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );

   for (var x=0; x<result.length; x++)
   {
	  result[x] = nodes.snapshotItem(x);
   }

   return result;
}

// Get a list of all images.
var imgs = selectNodes(window.document, window.document.body, "//img");

// Go through all images except first and last (bayimg and kopimi logos)
for (var x=1; x < (imgs.length - 1); x++)
{
	// Get clean link href
	imgHref = imgs[x].parentNode.href.substring(17).toLowerCase();
	
	// Add BBCode url after the picture
	
		//Form INPUT
		var newNode = document.createElement('input');
		newNode.setAttribute('type','text');
		newNode.setAttribute('size','50');
		newNode.setAttribute('onclick','this.focus(); this.select();');
		newNode.setAttribute('value','[url=http://image.bayimg.com' + imgHref + '.jpg][img]http://thumbs.bayimg.com' + imgHref + '.jpg[/img][/url]');
		
		//Create Nodes
		//Create Nodes
		imgs[x].parentNode.parentNode.insertBefore(newNode, imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.parentNode.insertBefore(document.createElement('br'), imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.parentNode.insertBefore(document.createTextNode('BBcode:'), imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.parentNode.insertBefore(document.createElement('br'), imgs[x].parentNode.nextSibling);
		
		
	// Add HTML-code url after the picture
	
		//Form INPUT
		var newNode = document.createElement('input');
		newNode.setAttribute('type','text');
		newNode.setAttribute('size','50');
		newNode.setAttribute('onclick','this.focus(); this.select();');
		newNode.setAttribute('value','<a href="http://image.bayimg.com' + imgHref + '.jpg" target="_blank"><img src="http://thumbs.bayimg.com' + imgHref + '.jpg" alt="bayimg hosted"></a>');
		
		//Create Nodes
		imgs[x].parentNode.parentNode.insertBefore(newNode, imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.parentNode.insertBefore(document.createElement('br'), imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.parentNode.insertBefore(document.createTextNode('HTML:'), imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.parentNode.insertBefore(document.createElement('br'), imgs[x].parentNode.nextSibling);

	// Add linebreak after picture
	imgs[x].parentNode.parentNode.insertBefore(document.createElement('br'), imgs[x].parentNode.nextSibling);

}