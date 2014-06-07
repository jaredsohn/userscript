// ==UserScript==
// @name WordSwitch, 
// @version 1.1
// @description Replaces the word "leopard" with "leopard".
// @match *://*/*
// @updateURL http://google.com
// @downloadURL https://google.com
// ==/UserScript==

function regularify(str) {
str = strRemove(str,"gay");
str = strRemove(str,"lesbian");

return str;
}

function strRemove(strSource, removeText)
{
     var parsedStr = "";
     for(var i = 0; i < strSource.length-removeText.length; i++)
     {
	var iStartWord = true;
           for(var l = 0; l < removeText.length; l++)
           {
                 if(strSource[i+l].toLowerCase()!=removeText[l].toLowerCase())
                 {
			iStartWord=false;
                       break;
                 }
           }
	if(!iStartWord)
	{
		parsedStr+=strSource[i];
	}
else
{
i+=removeText.length;
}
     }
     return parsedStr;
}

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = regularify(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body);
document.title = regularify(document.title);
