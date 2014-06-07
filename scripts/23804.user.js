// ==UserScript==
// @name           PardusWatched
// @namespace      PardusWatched
// @description    Moves a list of watched players up and highlights news (eventually)
// @include        *.pardus.at/statistics.php*
// @include        *.pardus.at/news.php
// @include        *.pardus.at/main.php
// ==/UserScript==

function createTable(doc, name, insert, arr )
{
 
var parentTable = insert.parentNode;
var newdiv = document.createElement("div");
var newTable = document.createElement("table");
newTable.innerHTML = "<tr><th colspan=\'4\'>" + name+ "</th></tr>";
newTable.className = "messagestyle";
newTable.setAttribute("cellspacing","3");

parentTable.insertBefore(newdiv, insert);
newdiv.appendChild(newTable);

var lastBaddie;
var newBaddie;
var row;
var numFound;
numFound = 0;
var numRows = 0;
//alert(baddies.length)
for (i=0;i<arr.length;i++)
{
  
  re = new RegExp (arr[i],"i");
  if (html.match(re))
  {
     //alert("found " + baddies[i])
     
     if ((numFound % 4) == 0)
     {
        row  = document.createElement('tr');
       newText = "<td><a href='javascript:void sendmsg(\"" + arr[i] + "\")'>" + arr[i] + "</a></td>";
       row.innerHTML = newText;
       newTable.appendChild(row); 
       if((numRows % 2) == 1)
       {
         row.className = "alternating";
       }
       numRows++;
     }
     else
     {
        newBaddie = document.createElement('td');
	//newText = "<td>Hai</td>"; 
	newText = "<a href='javascript:void sendmsg(\"" + arr[i] + "\")'>" + arr[i] + "</a>";
	newBaddie.innerHTML = newText;        
	row.appendChild(newBaddie); 
     }
     numFound++;
  }
}



}

var html = document.body.innerHTML;

var baddies =  new Array("Aeon", "Allard", "Aprajit" , "Captain Hale", "Catheryne", "Czeresniak","Demitrious Ducas","Extrancrod","Fatlittlekid","Ferg","Fingerprint", "Fugazi", "Gelt", "Grozny", "Hellfrost" , "Hitman", "Jessie H", "Jesus Nix", "Juggern" , "Juggernaut", "Keekoo" ,"koprecipitator" ,"Lord Harm" , "Lost" , "Lt Dan", "Muktar", "Nickpan", "Palldon", "Poliwopper", "Pyro Bob", "Raindrop", "Rauckoril", "Rock Paper Scissors", "Romonster", "Sammy", "Schwager", "Serapis", "Sexy Chick", "Shalktonin", "Shlento", "Space Cowboy", "Std", "Sunni Tzui", "Teves Shaat", "The Gingerbread Man", "Trazlo Trevize", "Vashniir", "Whisky Tango Foxtrot", "Wool", "Syhon lover of Sai", "Cougar", "Comandar Ed", "Pirateboy", "Evil Keef", "Alien");


var sameTile

if (document.URL.match("main.php"))
{

var stuff = html.match(/(scan_type=player\">|00.>)([\w ]+)([\s\S]*)/);
var people
  
  if (!stuff)
  {
    //alert("oops")
  }
  
  if (stuff[1])
  {
    people = stuff[2];
  }
  while(stuff&&stuff[3])
  {
     
     stuff = stuff[3].match(/(scan_type=player\">|00.>)([\w ]+)([\s\S]*)/);
     if (stuff)
        people = people + "," + stuff[2];
     
  }
  GM_setValue ("SameTile", people); 
}
else if (html.match("Online Players"))
{

var tables = document.getElementsByTagName("table");
var tempTable = tables[5];
createTable(document, "Watched", tempTable, baddies);
fred = GM_getValue("SameTile");
createTable(document, "Same Tile", tempTable, fred.split(/,/g));

}
