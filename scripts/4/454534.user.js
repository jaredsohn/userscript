// Plater
// 2008 
//
// ==UserScript==
// @name           Plater NS Tower Monster
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Plater
// @description    (Ver 1.3) Attempts to select the correct item to defeat the tower monsters
// @include        http://*kingdomofloathing.com/fight.php*
// ==/UserScript==

//
// Version 1.0 11/20/2008 First public release!
// Version 1.1 11/21/2008 Stopped script from continuing if an Item was not found for the given Monster
// Version 1.2 11/21/2008 Switched from XPath to getElementById(), added more protection, corrected bugs,
// If item cannot be found in Select, it is now displayed under monster name
// and attempts to link to wiki page on it
// Version 1.3 02/03/2009 Hopefully fixed issue with fighting the darkness, set item counter to "empty" on failure

//Populate this with the current fight name
var MonsterName ='';

//Populate this with all the possible choices
var CreatureList = new Object;
BuildCreatureList();

//Now perform the search
SearchForMonster();

function SearchForMonster()
{
//Find and evaluate the monster name
var spanobj;
spanobj=document.getElementById('monname');
if(spanobj!=null)
{
MonsterName=spanobj.innerHTML;
}
/*spanobj=find("//SPAN[@id='monname']//text()",document);
if(spanobj!=null)
{
MonsterName=spanobj.data;
}*/
  var spltspot = MonsterName.indexOf(' ');
  if(spltspot !=-1)
  {//atempt to remove the begining article, this could be done better
MonsterName=MonsterName.substring(spltspot+1);
  }
  if(MonsterName=="darkness")
  {//todo: I can either do this, or change it in the CreatureList
  MonsterName="the darkness";
  }
  //alert("Monster name to search for: '"+MonsterName+"'");
  
//Grab the item used to defeat monster 
var ItemName = CreatureList[MonsterName];
//alert("Item to defeat: '"+ItemName+"'");
//Find the correct Select box
if(ItemName!=null)
{
var selectlist=document.getElementsByName("whichitem");
if(selectlist.length==1)
{
var theselect=selectlist[0];//chose the first one
if(theselect.options!=null)
{
var Found=false;
for(var i=0;i<theselect.options.length;i++)
{
if(theselect.options[i].text.indexOf(ItemName)!=-1)
{//Found the right item in the select
Found=true;
theselect.options[i].selected=true;//alert("Found at index: "+i);
}
}
if(!Found)
{//Display what item is needed if you don't appear to have it
var ItemNameHTML="<br/>(Use this Item: <font color=\"red\"><a href=\"http://kol.coldfront.net/thekolwiki/index.php/"+ItemName+"\">"+ItemName+"</a></font>)";
if(spanobj!=null)
{ spanobj.innerHTML+=ItemNameHTML; }
theselect.options[0].selected=true;
}
}// else {//no options in the select?     //alert("Object returned: "+theselect); }
}// else {//Found too many or not enough selects  //alert("Incorrect number of Selects: "+selectlist.length + " Select elements!") }
  }//else {//Monster name was not in the tower monster list }
}

function BuildCreatureList()
{//Fill in the "Dictionary" with Tower Monsters
CreatureList["Beer Batter"] = 'baseball';
CreatureList["best-selling novelist"] = 'plot hole';
CreatureList["Big Meat Golem"] = 'meat vortex';
CreatureList["Bowling Cricket"] = 'sonar-in-a-biscuit';
CreatureList["Bronze Chef"] = 'leftovers of indeterminate origin';
CreatureList["collapsed mineshaft golem"] = 'stick of dynamite';
CreatureList["concert pianist"] = 'Knob Goblin firecracker';
CreatureList["the darkness"] = 'inkwell';
CreatureList["El Diablo"] = 'mariachi G-string';
CreatureList["Electron Submarine"] = 'photoprotoneutron torpedo';
CreatureList["endangered inflatable white tiger"] = 'pygmy blowgun';
CreatureList["Enraged Cow"] = 'barbed-wire fence';
CreatureList["fancy bath slug"] = 'fancy bath salts';
CreatureList["Fickle Finger of F8"] = 'razor-sharp can lid';
CreatureList["Flaming Samurai"] = 'frigid ninja stars';
CreatureList["giant bee"] = 'tropical orchid';
CreatureList["giant fried egg"] = 'black pepper';
CreatureList["Giant Desktop Globe"] = 'NG';
CreatureList["Ice Cube"] = 'hair spray';
CreatureList["malevolent crop circle"] = 'bronzed locust';
CreatureList["possessed pipe-organ"] = 'powdered organs';
CreatureList["Pretty Fly"] = 'spider web';
CreatureList["Tyrannosaurus Tex"] = 'chaos butterfly';
CreatureList["Vicious Easel"] = 'disease';
}

function find(xp,location) 
{//Code to search for elements using XPath
if(!location)location = document;
var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
return temp.singleNodeValue;
}
