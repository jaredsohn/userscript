// ==UserScript==
// @name           AniDB +1 Button
// @namespace      AniDB
// @description    Adds Google +1 button to anime pages on anidb.net. Button is inserted into a new row of "Info" panel.
// @include        http://anidb.net/perl-bin/animedb.pl?show=anime&aid=*
// @include        http://anidb.net/a*
// ==/UserScript==

/*Add markup for +1 button*/
var tablebodyNode = document.evaluate( "//div[@id='tab_1_pane']/div[@class='g_definitionlist']/table/tbody", document, null, XPathResult.ANY_TYPE, null ).iterateNext();

	var tableRow = document.createElement("tr");
	if( (tablebodyNode.childNodes.length / 2) % 2 == 0 )
		tableRow.setAttribute("class","g_odd");/*class for odd table rows*/

		/*Field name - "Share"*/
		var rowField = document.createElement("th");		
		rowField.setAttribute("class","field");
		rowField.appendChild(document.createTextNode("Share"));
	tableRow.appendChild(rowField);

		/*Field content - +1 button*/
		var rowValue = document.createElement("td");
		rowValue.setAttribute("class","value");		
			plus1Node = document.createElement("div");	
			plus1Node.setAttribute( "class",  "g-plusone");
			plus1Node.setAttribute( "data-size", "small");
			plus1Node.setAttribute( "data-count", "true");
			plus1Node.setAttribute( "data-href", document.getElementsByClassName("shortlink")[0].href);/*Use the short url*/
		rowValue.appendChild(plus1Node);
	tableRow.appendChild(rowValue);

tablebodyNode.appendChild(tableRow);


/*Load Script - will render the +1 button*/
var scriptElement = document.createElement("script");
scriptElement.async = true;
scriptElement.type="text/javascript";
scriptElement.src="https://apis.google.com/js/plusone.js"
document.body.appendChild(scriptElement);
