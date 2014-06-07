// ==UserScript==
// @name           Cut users posts from Flamewars
// @namespace      apache1990.dod.net
// @description    Does what it says.
// @include        *.war-facts.com/forum_view.php?forum=15&thread=*
// @include        *.war-facts.com/forum_view.php?forum=15&offset*
// ==/UserScript==

// Enter the player ID numbers of the people whose posts you don't want to see in flamewars here
// i.e.  var badPeople = ["id#1", "id#2", "id#3", "id#4", "id#5"];
// with as many player IDs as you want.
// Defaults to block |-D

var badPeople = ["17067"];


// If blastPosts is "true" there will be no evidence that the posts ever existed, if "false" you'll
// see blank posts instead.

var blastPosts = false;

function path(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

if(blastPosts){
	for(var j = 0; j < badPeople.length; j++){
		for(var i = path("//a[@href='/message.php?player=" + badPeople[j] + "']").length - 1; i != -1; i--){
			path("//a[@href='/message.php?player=" + badPeople[j] + "']/../../following-sibling::*[1]")[i].parentNode.removeChild(path("//a[@href='/message.php?player=" + badPeople[j] + "']/../../following-sibling::*[1]")[i]);
			path("//a[@href='/message.php?player=" + badPeople[j] + "']/../..")[i].parentNode.removeChild(path("//a[@href='/message.php?player=" + badPeople[j] + "']/../..")[i]);
		}
	}
}else{
	for(var j = 0; j < badPeople.length; j++){
		for(var i = 0; i < path("//a[@href='/message.php?player=" + badPeople[j] + "']/../../td[@width='80%']").length; i++){
			path("//a[@href='/message.php?player=" + badPeople[j] + "']/../../td[@width='80%']")[i].innerHTML = "";
		}
	}
}