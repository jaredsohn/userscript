// ==UserScript==
// @name           Stacks of Words
// @namespace      Stacks of Words
// @include        http://www.gamefaqs.com/boards/402-life-the-universe-and-everything/*
// ==/UserScript==
var rainbowFAQS = false;

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
  
  if ( item1.nodeValue.match( "x23sephiroth23x" )){
	  var nodeChildren = item2.childNodes;
	  
	  var stackarray = [];
	  var sigFound = false;
	  while(item2.childNodes.length>1 && !sigFound){
		  var item3 = item2.childNodes.item(0);
		  if(item3.nodeValue!=null){
			  if(item3.nodeValue!="---"){
				  var partArray = item3.nodeValue.split("\. ");
				  for(var j = 0; j < partArray.length; j++){
				  	var commaArray = partArray[j].split("\, ");
				  	for(var k = 0; k < commaArray.length; k++){
	 					stackarray.push(commaArray[k]);
					}
				  }
			  }
			  else 
			  	sigFound=true;
		  }
		  if(!sigFound)
			  item2.removeChild(item3);
	  }
	  
	  var colString = "";
	  if(rainbowFAQS){
		  colString = " background-color: #AC6DDB;";
	  }
	  
	var stackStr = "<table><tr>";
	
	if(stackarray.length==1 && stackarray[0]=="lol"){
		stackStr += "<td style='vertical-align:bottom; text-align:center;"+colString+"'><font size='40'>l<br>o<br>l</font></td>";
	} else {
		for(var j = 0; j < stackarray.length; j++){
			var line = stackarray[j];
			line = line.replace(/ /gi, "<br>");
			stackStr += "<td style='vertical-align:bottom; text-align:center;"+colString+"'>"+line+"</td>";
		}
	}
	
	stackStr += "</tr></table>";
	item2.innerHTML = stackStr;
  }
}