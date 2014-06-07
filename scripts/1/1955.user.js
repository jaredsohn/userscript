// ==UserScript==
// @name          Revolver Ignore List
// @namespace     http://www.revolver.ru
// @description   Revolver Ignore List
// ==/UserScript==

//Put the user names you want to excise in this array
users = ["bbird","sankadubinin"];


//No configuration necessary below this line
var allPosters;
allPosters = document.evaluate('//a[@class="zagl"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var i = 0; i < allPosters.snapshotLength; i++) 
{
  var thisLink = allPosters.snapshotItem(i);
  for(var j = 0; j < users.length; j++)
  {
    var user = users[j];
    if (thisLink.href == "http://revolver.ru/users/"+user) 
    {		
      var par = thisLink.parentNode		
      while (par.tagName!="TABLE")
             par = par.parentNode;
      par.innerHTML = "";	
      break;
    }
  }
}
