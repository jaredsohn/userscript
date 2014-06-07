// ==UserScript==
// @name             AstroLarm
// @author           Your name here
// @date             Date here
// @namespace        http://www.ischool.washington.edu/
// @include          URL of target page
// @exclude          URL of excluded page 
// ==/UserScript==

(function()
{
  try {

//////////////////////////////////////////////////////////
// XPath anchor

var myNodeList;
myNodeList = document.evaluate(
	"my Xpath",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

var currentNode;
for (var i = 0; i < myNodeList.snapshotLength; i++) 
{
	currentNode = myNodeList.snapshotItem(i);
	// do something with currentNode
}

/////////////////////////////////////////////////////////////
// HTTPRequest code
	
GM_xmlhttpRequest({
    method: 'GET',
    url: 'URL of requested page here',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
		
		// stuff is of string type
		var stuff = responseDetails.responseText;
		
    }
});

//////////////////////////////////////////////////////////////////

   } catch (eErr) {
      alert ("Greasemonkey error: " + eErr);
   }

   return;

}) ();



//To create a text input
function createTextInput(htmlProperties,inputValue)
  {
  var inputProperties = htmlProperties;
  var textInput = document.createElement('input');
  for (var i in htmlProperties)
	{
	textInput[i] =htmlProperties[i];
	}
  textInput.value = inputValue;
  }
  
  
  
  
var textInput = new Array();



headCode.push('function spam() {');
headCode.push(' alert("This is my message box!");');
headCode.push('}');

//We create the Greasemonkey element, insert the code in it and empty the old variable:

var script = document.createElement('script');
script.innerHTML = headCode.join('\n');
headCode.length = 0;

//Here’s the tricky part, we will use try to insert it inside the <head>:

try { document.getElementsByTagName('head')[0].appendChild(script); }
catch(e) {}
