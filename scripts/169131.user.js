// ==UserScript==
// @name        Diamond Dynasty Show Missing Collection Cards
// @namespace   baseballsimulator.com
// @include     http://theshownation.com/dynasty_team/*/collections
// @version     1
// ==/UserScript==

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var j = 0;

var collectionLink;
var collectionLinks = document.evaluate("//td[@class='collectionName']/a/@href",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i=0;i < collectionLinks.snapshotLength;i++)
	{

		collectionLink = collectionLinks.snapshotItem(i);
		collectionLink = collectionLink.nodeValue;

		j = 1+i;

  GM_xmlhttpRequest({
      method: 'GET',
      url: collectionLink,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function.bind( {}, i, j )
  });		
		

	}

function callback_function(parameter1, parameter2, responseDetails)
{

	var data;
	data = responseDetails.responseText;

	var pattern = new RegExp("collectedfalse","g");
	var result;
	var myString;
	var totalString = '';
	var totalStringCount = 0;

	var collectionLink;
	var collectionLinks = document.evaluate("//td[@class='collectionName']/a",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var parameterCount = parameter1 + 1;


	collectionLink = collectionLinks.snapshotItem(parameter1);

	while((result = pattern.exec(data)) != null){

		myString = data.substring(result.index,data.indexOf("<div class='arenaPosition'>",result.index));		

		if(myString.indexOf('in_inventorytrue') == -1){

			myString = myString.substring(myString.indexOf('arenaCardName\'>')+15);
			myString = myString.replace(/\s/g, ' ');
			myString = myString.replace(' <br> ',' ');
			myString = myString.replace(' </div> ',' ');
			myString = trim(myString);
			totalString = totalString + myString + ', ';
			totalStringCount = totalStringCount +1;
			
		}

	}

	totalString = totalString.substring(0,totalString.length -2);

	if(totalString != ''){

		if(totalStringCount < 6){

			collectionLink.textContent = collectionLink.textContent + ' - ' + totalString;

		}
		else
		{
	
			//collectionLink.textContent = collectionLink.textContent + ' - Missing ' + totalStringCount + ' cards';

		}

	}

}
