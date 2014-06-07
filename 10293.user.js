// ==UserScript==
// @name           Shartak Show Names on Screen
// @description    Customises the shartak local area map to show names on screen instead of as titles
// @include        http://www.shartak.com/game.cgi
// ==/UserScript==

var natives = document.evaluate("//span[@class='native']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 

null);
if (natives.snapshotLength)
{
   process_players (natives,"native");
}

var outsiders = document.evaluate("//span[@class='outsider']", document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (outsiders.snapshotLength)
{
   process_players (outsiders,"outsider");
}

var pirates = document.evaluate("//span[@class='pirate']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 

null);
if (pirates.snapshotLength)
{
   process_players (pirates,"pirate");
}

function process_players (group,groupname)
{
   for (var i=0 ; i < group.snapshotLength ; i++)
   {
      var thisGroupMember = group.snapshotItem(i);
      // max character name allowed by signup is 20 characters 
      if (thisGroupMember.title != "" && thisGroupMember.title.length < 21)
      {
         thisGroupMember.innerHTML =  thisGroupMember.title;
         thisGroupMember.title =  groupname;
      }
   }
}