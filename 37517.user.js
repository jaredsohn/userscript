// Based on multik's http://userscripts.org/scripts/show/1955
//
// ==UserScript==
// @name          Revolver Ignore List
// @namespace     http://www.revolver.ru
// @description   Revolver Ignore List
// @include       http://revolver.ru/*
// ==/UserScript==

//Put the user names you want to excise in this array
users = ["bur","erics","kacap","Lenich","vladgort","Starley"];


//No configuration necessary below this line
var allPosters = document.evaluate("//td[@class='comm'][not(@width)]//a[@class='zagl']",
		document.body,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < allPosters.snapshotLength; i++) 
{
  var thisLink = allPosters.snapshotItem(i);
  var thisUser = thisLink.href.substring(thisLink.href.lastIndexOf("/") + 1);
  for(var j = 0; j < users.length; j++)
  {
    var user = users[j];
    if (thisUser == user)
    {		
      var par = thisLink.parentNode		
      while (par.tagName!="TABLE")
             par = par.parentNode;
      par.style.display = "none";
      break;
    }
  }
}
