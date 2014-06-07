// ==UserScript==
// @name           Literally Nobody Uses These
// @namespace      Literally Nobody Uses These
// @description    But I keep making them.
// @include        http://www.gamefaqs.com/boards/402-life-the-universe-and-everything/*
// ==/UserScript==
var everybody = false;


// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a[@class='name']/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var selectedMessagesBodies =
document.evaluate("//table[@class='board message']//tr[@class='even']/td/div[@class='msg_body']", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check messages
for ( var i = 0; i < selectedMessagesUser.snapshotLength; i++ ) {
  var item1 = selectedMessagesUser.snapshotItem(i);
  var item2 = selectedMessagesBodies.snapshotItem(i);
  
  if ( item1.nodeValue.match( "mario2000" ) || item1.nodeValue.match( "Kaiser Mozoku" ) || everybody){
	  var nodeChildren = item2.childNodes;
	  
	  var sigFound = false;
	  for(var j = 0; j < nodeChildren.length; j++){
		  var item3 = item2.childNodes.item(j);
		  if(item3.nodeValue!=null){
			  if(item3.nodeValue!="---"){
				  if(!sigFound){
					  item3.nodeValue = literally(item3.nodeValue);
			  	} else {
					  item3.nodeValue = " Literally.";
				}
			  }
			  else 
			  	sigFound=true;
		  }
	  }
  }
}

function literally(str){
	str = str.replace(/literally/g, "LITERALLY");
	str = str.replace(/ you /g, " you literally ");
	str = str.replace(/ you've /g, " you've literally ");
	str = str.replace(/ you're /g, " you're literally ");
	str = str.replace(/ he's /g, " he's literally ");
	str = str.replace(/ that's /g, " that's literally ");
	str = str.replace(/ they /g, " they literally ");
	str = str.replace(/ they're /g, " they're literally ");
	str = str.replace(/ she's /g, " she's literally ");
	str = str.replace(/it's /g, "it's literally ");
	str = str.replace(/ will /g, " will literally ");
	str = str.replace(/'d /g, "'d literally ");
	str = str.replace(/i /g, " i literally ");
	str = str.replace(/ he /g, " he literally ");
	str = str.replace(/ she /g, " she literally ");
	str = str.replace(/ it /g, " it literally ");
	str = str.replace(/\'m /g, "'m literally ");
	str = str.replace(/ is /g, " is literally ");
	str = str.replace(/ isn't /g, " literally isn't ");
	str = str.replace(/ was /g, " was literally ");
	str = str.replace(/ be /g, " be literally ");
	str = str.replace(/ very/g, " LITERALLY");
	str = str.replace(/ really/g, " LITERALLY");
	str = str.replace(/too /g, "literally too ");
	str = str.replace(/totally/g, "totes");
	return str;
}