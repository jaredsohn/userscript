// ==UserScript==
// @name           dkrdude3's Special Script
// @namespace      dkrdude3's Special Script
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

var aLulz = new Array("lorfma", "lmoa", "loud out loud", "xomg");
	
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to)
{
	var rest = this.slice(( to || from ) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, "");
};

function makeamquotes(sText)
{
	if ( sText.length > 3 )
	{
		var aWords = sText.split(/\s/g);
		if ( aWords.length < 5 )
		{
			return sText;
		}
		for ( var j = 0; j < aWords.length; j++ )
		{
			if ( aWords[j].trim().length < 4 )
			{
				aWords.remove(j);
				j--;
			}
		}
		for ( i = 0; i < Math.round((aWords.length/10)); i++ )
		{
			if ( aWords.length < 1 )
			{
				break;
			}
			var iIndex = Math.floor(Math.random() * aWords.length);
			var rExp = new RegExp("(" + aWords[iIndex].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + ")");
			aWords.remove(iIndex);
			sText = sText.replace(rExp, "\"$1\"");
		}
	}
	return sText;
}

function chuckify(str){
	str = str.toLowerCase();
	str = str.replace(/\.($| )/g, " " + aLulz[Math.floor(Math.random() * aLulz.length)] + " ");

	str = str.replace(/v/g, "b");
	str = str.replace(/\?/g, " wft");
	str = str.replace(/xd/g, "x and d");				
	str = str.replace(/ is /g, " am ");
	str = str.replace(/,/g, " mabye and ");
	str = str.replace(/god/g, "duckbeard");
	
	try{
		str = makeamquotes(str);
	} catch(e){
		
	}
	return str;
}

(function () {
	
	var eberyone = true;
	var theUser = 'dkrdude3';
	
// Check for username in topic list
var selectedTopicsUser =
document.evaluate("//table[@class='board topics']//tr/td/span/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  	var nameItem = selectedTopicsUser.snapshotItem(i);
	if ( eberyone || nameItem.nodeValue.match( new RegExp("\\b" + theUser + "\\b", "i") ) ) { 
  		var rowItem = nameItem.parentNode.parentNode.parentNode;
		var cells= rowItem.getElementsByTagName("TD")
		cells.item(1).firstChild.firstChild.nodeValue = chuckify(cells.item(1).firstChild.firstChild.nodeValue);
		//cells.item(1).style.backgroundColor = users[userKey];
	  	var item = selectedTopicsUser.snapshotItem(i);
		item.nodeValue = "chuckyhacks";
	}
}

// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a[@class='name']/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var selectedMessagesRows =
document.evaluate("//table[@class='board message']//tr[@class='even']/td/div[@class='msg_body']", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  		var item1 = selectedMessagesUser.snapshotItem(i);
	if ( eberyone || item1.nodeValue.match( new RegExp("\\b" + theUser + "\\b", "i") ) ) { 
  
		item1.nodeValue = "chuckyhacks";
		  var item2 = selectedMessagesRows.snapshotItem(i);
		  var curLine = item2.firstChild;
		  while(curLine)
		  {
			  if(curLine.nodeName=="DIV"){
				curLine.firstChild.firstChild.src="http://i.imgur.com/6uWaD.png"
			  }
			if(curLine.nodeName=="#text"){
				curLine.nodeValue = chuckify(curLine.nodeValue);
			}
			curLine = curLine.nextSibling;
		  }
	}
}

})();