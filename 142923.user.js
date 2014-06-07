// ==UserScript==
// @name          Linkify Youtube Watch
// @namespace     MAKIFUN STOLE YOUR SHIT HAHAHA
// @description   /watch?v= into clickable links
// @include       *
// ==/UserScript==
try{

    var regex = /\/*watch\?v=\w+/g;

var altText, tekst, muligtLink;

var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];
var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){

	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;

	if(regex.test(muligtLink)){
		var span = document.createElement('span');

		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(myArray = null; myArray = regex.exec(muligtLink); ){
			//vores match gemmes
			var link = myArray[0];

			//alert("har fundet dette link: " + link);

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //indsæt det der kommer før dette hit

			var href = link;

                        var prefix = href.substring(0, 1);
			if(prefix.toLowerCase() != '/'){
				href = '/' + href;
			}

			//skab vores link:
			var a = document.createElement('a');
			a.setAttribute('href', "http://www.youtube.com"+href); //giv det en href
			a.appendChild(document.createTextNode(link)); //linkteksten
			span.appendChild(a); //sætter ind i span

			lastLastIndex = regex.lastIndex;

		}

		span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //insæt det der kommer efter sidste hit
		tekst.parentNode.replaceChild(span, tekst);

	}


}
} catch(e){alert(e);}