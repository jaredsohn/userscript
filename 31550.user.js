//
// ==UserScript==
// @name          Conquer Club Games Filter
// @namespace     http://userscripts.org/
// @description   Script to Filter waiting games by maximum number of empty slots, maximum and minimum rank and minimum rating
//                Filters finished games by players rated or not rated
// @include       http://www.conquerclub.com/player.php?mode=find*
// @include       http://www.conquerclub.com/player.php?mode=start*
// @include       http://www.conquerclub.com/player.php?mode=browse*
// @include       http://www.conquerclub.com/player.php?submit=Search*
// @include       http://www.conquerclub.com/player.php?mode=mygames*
// @include       http://www.conquerclub.com/player.php?mode=join*
// @include       http://www.conquerclub.com/public.php?mode=scoreboard*
// @exclude       http://www.conquerclub.com/player.php?mode=join2&submit=Join*
// @exclude       http://www.conquerclub.com/player.php?mode=find&submit=Join*
// ==/UserScript==

var version = "1.2.2";
var latestVersion = 0;
var features=[];
var filter = new Array(7,0,16,0,0);
var myTags, defTags;
var tag = 0;
var turn = 0;
var scores = 0;
var sorting = 0;
var deflen = 0;
var ftext;
var defaults = {'Simple Maps' : new MapTag(new Array("France","USA West","USA Southwest","USA Southeast","USA Rockies","USA New England","USA Great Lakes","Madagascar","Charleston","Haiti","Europa","Classic Shapes","Archipelago","Doodle Earth","Classic Art","Iceland","Australia","USA","Crossword","Ireland","Luxembourg","Centerscape","Mongol Empire","Philippines","Canada","South America","WWII Iwo Jima","Ancient Greece","Asia","Hong Kong","Arctic","U.S. Senate","Iberia","WWII Australia","Puget Sound","Brazil","Caribbean Islands","Netherlands","Cairns Coral Coast","Portugal","British Isles 2","Europe","Africa","Middle East","World 2.1","High Seas","North America","Germany","France","Indochina")),
                'Moderate Maps' : new MapTag(new Array("Cairns Metro","WWI Ottoman Empire","Europe 1914","Triple Alliance","Holy Roman Empire","Halloween Hollows","The Citadel","Egypt: Lower","CCU","Alexander's Empire","San Francisco","Scotland","Egypt: Upper","Duck And Cover","Tamriel","Montreal","Discworld","Soviet Union","Midkemdil","Space","WWII Eastern Front","Dust Bowl","Madness","Great Lakes","Greater China","8 Thoughts","BeNeLux","Malta","American Civil War","Extreme Global Warming","NYC","Texan Wars","Italy","Siege!","Sydney Metro","Chinese Checkers","Circus Maximus","Solar System","WWII Western Front","USApocalypse","Battle Of Actium")),
                'Complex Maps' : new MapTag(new Array("Rail Australia","WWII Europe","Forbidden City","Oasis","King Of The Mountains","Draknor - Level 1","Arms Race!","Rail USA","Berlin 1961","Operation Drug War","WWII Ardennes","Rail Europe","D-Day: Omaha Beach!","Prohibition Chicago","Imperium Romanum","Egypt: Valley Of The Kings","Age Of Merchants","Supermax: Prison Riot!","WWII Gazala","Bamboo Jack","Pearl Harbor","Battle For Iraq!","Waterloo","Conquer Man")),
                'Huge Maps (60+)' : new MapTag(new Array("Chinese Checkers","Cairns Coral Coast","North America","Charleston","Europa","Arms Race!","Rail Australia","U.S. Senate","WWII Australia","Rail USA","Solar System","New World","WWII Gazala","Pearl Harbor","D-Day: Omaha Beach!","Treasures Of Galapagos","WWII Ardennes","NYC","Forbidden City","Feudal War","Bamboo Jack","City Mogul","Rail Europe","Battle For Iraq!","Age Of Realms 2","Age Of Realms 1","Battle Of Actium","Age Of Realms 3","Waterloo","Das Schloss","WWII Europe","World 2.1","Supermax: Prison Riot!","Oasis","Conquer Man")),
                'Large Maps (43-59)' : new MapTag(new Array("Asia","Archipelago","Cairns Metro","WWI Ottoman Empire","Discworld","South America","WWII Eastern Front","CCU","France","USApocalypse","Brazil","Africa","Midkemdil","King Of The Mountains","Extreme Global Warming","Centerscape","Europe","Tamriel","Montreal","Great Lakes","Philippines","Crossword","Arctic","The Citadel","Poker Club","Triple Alliance","Soviet Union","Egypt: Valley Of The Kings","Europe 1914","Iberia","Siege!","Prohibition Chicago","Texan Wars","Sydney Metro","USA Great Lakes","Age Of Merchants","Imperium Romanum","Operation Drug War")),
                'Standard Maps (42)' : new MapTag(new Array("Hong Kong","Alexander's Empire","BeNeLux","Caribbean Islands","Classic Art","Puget Sound","British Isles 2","8 Thoughts","Malta","Holy Roman Empire","Space","American Civil War","Canada","High Seas","Middle East","Classic Shapes","Germany","Conquer 4","USA","San Francisco")),
                'Small Maps (Up To 41)' : new MapTag(new Array("Doodle Earth","Luxembourg","Egypt: Lower","USA West","Madagascar","Duck And Cover","Egypt: Upper","Greater China","Egypt: Nubia","Circus Maximus","Haiti","Indochina","Ireland","USA Southwest","USA New England","Netherlands","Halloween Hollows","Portugal","Iceland","Australia","Madness","Italy","Dust Bowl","WWII Iwo Jima","Draknor - Level 1","France 1789","WWII Western Front","Scotland","USA Rockies","Mongol Empire","Ancient Greece","USA Southeast","Berlin 1961")),
                'Conquest Maps' : new MapTag(new Array("Feudal War","Age Of Realms 1","Age Of Realms 3","New World","Age Of Realms 2","Treasures Of Galapagos","Das Schloss")),
                'Beta Maps' : new MapTag(new Array("Das Schloss","WWII Europe","Europe 1914","Rail Australia","Triple Alliance","Holy Roman Empire","USA Great Lakes","USA New England","USA Rockies","USA Southeast","USA Southwest","USA West","WWI Ottoman Empire","Cairns Metro","France 1789")),
                'New Maps' : new MapTag(new Array(""))
};
var tcount = {"New World" : 69, "Europe" : 48, "Hong Kong" : 42, "USA West" : 24, "Scotland" : 40, "Operation Drug War" : 59, "Iberia" : 56, "USA Rockies" : 40, "South America" : 44, "USApocalypse" : 45, "Asia" : 43, "USA New England" : 35, "Rail Australia" : 64, "Supermax: Prison Riot!" : 143, "Greater China" : 29, "Feudal War" : 82, "Archipelago" : 43, "Das Schloss" : 106, "Alexander's Empire" : 42, "BeNeLux" : 42, "World 2.1" : 113, "Texan Wars" : 57, "Siege!" : 56, "Ireland" : 32, "Portugal" : 36, "Caribbean Islands" : 42, "City Mogul" : 83, "Chinese Checkers" : 60, "Indochina" : 31, "Iceland" : 36, "Age Of Realms 2" : 93, "Egypt: Lower" : 20, "Classic Art" : 42, "Poker Club" : 52, "Age Of Realms 3" : 100, "France 1789" : 38, "Tamriel" : 48, "WWII Gazala" : 70, "Montreal" : 48, "WWII Eastern Front" : 44, "Netherlands" : 35, "Brazil" : 45, "Treasures Of Galapagos" : 73, "Puget Sound" : 42, "Arms Race!" : 62, "British Isles 2" : 42, "Cairns Coral Coast" : 60, "Forbidden City" : 81, "Europa" : 61, "Rail Europe" : 83, "Sydney Metro" : 58, "Egypt: Nubia" : 29, "Madagascar" : 24, "8 Thoughts" : 42, "Malta" : 42, "Mongol Empire" : 40, "USA Great Lakes" : 58, "Australia" : 36, "Pearl Harbor" : 72, "NYC" : 80, "Age Of Merchants" : 58, "Holy Roman Empire" : 42, "Bamboo Jack" : 82, "Space" : 42, "Age Of Realms 1" : 93, "American Civil War" : 42, "Canada" : 42, "WWII Australia" : 66, "Cairns Metro" : 43, "Luxembourg" : 19, "Doodle Earth" : 18, "High Seas" : 42, "U.S. Senate" : 65, "USA Southwest" : 32, "Madness" : 36, "Middle East" : 42, "Great Lakes" : 48, "WWII Ardennes" : 73, "North America" : 60, "Circus Maximus" : 30, "WWI Ottoman Empire" : 43, "Classic Shapes" : 42, "Philippines" : 48, "D-Day: Omaha Beach!" : 72, "Italy" : 36, "Germany" : 42, "Conquer 4" : 42, "Africa" : 45, "Crossword" : 48, "Dust Bowl" : 36, "CCU" : 44, "WWII Iwo Jima" : 36, "Charleston" : 60, "Midkemdil" : 45, "USA" : 42, "Soviet Union" : 53, "Discworld" : 43, "Egypt: Upper" : 26, "Prohibition Chicago" : 56, "King Of The Mountains" : 45, "Battle Of Actium" : 96, "Halloween Hollows" : 35, "Egypt: Valley Of The Kings" : 53, "Haiti" : 30, "Waterloo" : 104, "Conquer Man" : 151, "France" : 44, "WWII Europe" : 110, "WWII Western Front" : 39, "Battle For Iraq!" : 87, "Arctic" : 48, "Europe 1914" : 55, "Ancient Greece" : 40, "Draknor - Level 1" : 37, "Rail USA" : 67, "San Francisco" : 42, "Oasis" : 147, "USA Southeast" : 40, "Triple Alliance" : 52, "Berlin 1961" : 40, "Extreme Global Warming" : 46, "Centerscape" : 46, "Duck And Cover" : 24, "Solar System" : 67, "The Citadel" : 50, "Imperium Romanum" : 58}
var icount = {"New World" : 9, "Europe" : 48, "Hong Kong" : 42, "USA West" : 24, "Scotland" : 40, "Operation Drug War" : 24, "Iberia" : 56, "USA Rockies" : 40, "South America" : 44, "USApocalypse" : 45, "Asia" : 43, "USA New England" : 35, "Rail Australia" : 63, "Supermax: Prison Riot!" : 85, "Greater China" : 28, "Feudal War" : 6, "Archipelago" : 43, "Das Schloss" : 25, "Alexander's Empire" : 42, "BeNeLux" : 42, "World 2.1" : 113, "Texan Wars" : 57, "Siege!" : 56, "Ireland" : 32, "Portugal" : 36, "Caribbean Islands" : 42, "City Mogul" : 16, "Chinese Checkers" : 60, "Indochina" : 31, "Iceland" : 36, "Age Of Realms 2" : 6, "Egypt: Lower" : 20, "Classic Art" : 42, "Poker Club" : 16, "Age Of Realms 3" : 7, "France 1789" : 38, "Tamriel" : 48, "WWII Gazala" : 57, "Montreal" : 48, "WWII Eastern Front" : 41, "Netherlands" : 35, "Brazil" : 45, "Treasures Of Galapagos" : 9, "Puget Sound" : 42, "Arms Race!" : 18, "British Isles 2" : 42, "Cairns Coral Coast" : 60, "Forbidden City" : 76, "Europa" : 57, "Rail Europe" : 83, "Sydney Metro" : 58, "Egypt: Nubia" : 23, "Madagascar" : 24, "8 Thoughts" : 42, "Malta" : 42, "Mongol Empire" : 40, "USA Great Lakes" : 57, "Australia" : 36, "Pearl Harbor" : 72, "NYC" : 80, "Age Of Merchants" : 57, "Holy Roman Empire" : 42, "Bamboo Jack" : 82, "Space" : 42, "Age Of Realms 1" : 6, "American Civil War" : 42, "Canada" : 42, "WWII Australia" : 66, "Cairns Metro" : 40, "Luxembourg" : 18, "Doodle Earth" : 18, "High Seas" : 42, "U.S. Senate" : 65, "USA Southwest" : 32, "Madness" : 36, "Middle East" : 42, "Great Lakes" : 48, "WWII Ardennes" : 73, "North America" : 60, "Circus Maximus" : 30, "WWI Ottoman Empire" : 40, "Classic Shapes" : 42, "Philippines" : 48, "D-Day: Omaha Beach!" : 72, "Italy" : 36, "Germany" : 42, "Conquer 4" : 42, "Africa" : 45, "Crossword" : 48, "Dust Bowl" : 36, "CCU" : 44, "WWII Iwo Jima" : 36, "Charleston" : 60, "Midkemdil" : 44, "USA" : 42, "Soviet Union" : 52, "Discworld" : 43, "Egypt: Upper" : 26, "Prohibition Chicago" : 56, "King Of The Mountains" : 45, "Battle Of Actium" : 96, "Halloween Hollows" : 34, "Egypt: Valley Of The Kings" : 53, "Haiti" : 30, "Waterloo" : 102, "Conquer Man" : 141, "France" : 44, "WWII Europe" : 103, "WWII Western Front" : 36, "Battle For Iraq!" : 39, "Arctic" : 48, "Europe 1914" : 47, "Ancient Greece" : 40, "Draknor - Level 1" : 36, "Rail USA" : 67, "San Francisco" : 42, "Oasis" : 50, "USA Southeast" : 40, "Triple Alliance" : 52, "Berlin 1961" : 36, "Extreme Global Warming" : 46, "Centerscape" : 46, "Duck And Cover" : 24, "Solar System" : 60, "The Citadel" : 49, "Imperium Romanum" : 35}
var ccount = {"New World" : 34, "Europe" : 7, "Hong Kong" : 2, "USA West" : 8, "Scotland" : 8, "Operation Drug War" : 32, "Iberia" : 2, "USA Rockies" : 8, "South America" : 2, "USApocalypse" : 27, "Asia" : 3, "USA New England" : 8, "Supermax: Prison Riot!" : 37, "Feudal War" : 28, "Rail Australia" : 25, "Greater China" : 14, "Archipelago" : 2, "Das Schloss" : 39, "Alexander's Empire" : 7, "BeNeLux" : 7, "World 2.1" : 7, "Texan Wars" : 15, "Siege!" : 12, "Ireland" : 1, "Portugal" : 1, "Caribbean Islands" : 2, "City Mogul" : 29, "Chinese Checkers" : 7, "Indochina" : 2, "Age Of Realms 2" : 35, "Iceland" : 2, "Egypt: Lower" : 8, "Classic Art" : 1, "Poker Club" : 37, "Age Of Realms 3" : 36, "Tamriel" : 11, "France 1789" : 9, "WWII Gazala" : 32, "Montreal" : 4, "WWII Eastern Front" : 10, "Netherlands" : 8, "Brazil" : 2, "Treasures Of Galapagos" : 38, "Puget Sound" : 3, "Arms Race!" : 33, "British Isles 2" : 6, "Cairns Coral Coast" : 4, "Forbidden City" : 27, "Europa" : 3, "Rail Europe" : 25, "Sydney Metro" : 13, "Egypt: Nubia" : 8, "Madagascar" : 1, "8 Thoughts" : 19, "Malta" : 6, "Mongol Empire" : 3, "Australia" : 1, "USA Great Lakes" : 8, "Pearl Harbor" : 32, "NYC" : 13, "Age Of Merchants" : 29, "Bamboo Jack" : 27, "Holy Roman Empire" : 6, "Space" : 17, "Age Of Realms 1" : 30, "Canada" : 1, "American Civil War" : 9, "WWII Australia" : 3, "Doodle Earth" : 1, "Luxembourg" : 5, "Cairns Metro" : 9, "High Seas" : 3, "U.S. Senate" : 2, "Madness" : 18, "USA Southwest" : 8, "Middle East" : 2, "Great Lakes" : 12, "WWII Ardennes" : 25, "North America" : 2, "Circus Maximus" : 18, "WWI Ottoman Empire" : 8, "Classic Shapes" : 1, "D-Day: Omaha Beach!" : 17, "Philippines" : 6, "Italy" : 8, "Germany" : 1, "Conquer 4" : 29, "Africa" : 2, "Dust Bowl" : 16, "Crossword" : 15, "CCU" : 5, "WWII Iwo Jima" : 10, "Charleston" : 2, "Midkemdil" : 14, "USA" : 1, "Discworld" : 5, "Soviet Union" : 6, "Egypt: Upper" : 9, "Prohibition Chicago" : 31, "Battle Of Actium" : 26, "King Of The Mountains" : 15, "Halloween Hollows" : 13, "Egypt: Valley Of The Kings" : 26, "Haiti" : 2, "Waterloo" : 42, "Conquer Man" : 41, "France" : 1, "WWII Europe" : 25, "Battle For Iraq!" : 40, "WWII Western Front" : 22, "Arctic" : 2, "Europe 1914" : 25, "Ancient Greece" : 2, "Draknor - Level 1" : 21, "Rail USA" : 23, "San Francisco" : 15, "Oasis" : 25, "Berlin 1961" : 20, "Triple Alliance" : 18, "Extreme Global Warming" : 17, "USA Southeast" : 8, "Duck And Cover" : 16, "Centerscape" : 3, "Solar System" : 24, "The Citadel" : 10, "Imperium Romanum" : 31}
var mcount = {"Asia" : 0, "USA" : 1, "Middle East" : 2, "Canada" : 3, "Europe" : 4, "Brazil" : 5, "Crossword" : 6, "Africa" : 7, "Indochina" : 8, "Discworld" : 9, "Germany" : 10, "Montreal" : 11, "Tamriel" : 12, "Ancient Greece" : 13, "Space" : 14, "USApocalypse" : 15, "CCU" : 16, "Circus Maximus" : 17, "Ireland" : 18, "Centerscape" : 19, "Philippines" : 20, "North America" : 21, "Hong Kong" : 22, "Alexander's Empire" : 23, "World 2.1" : 24, "Australia" : 25, "Arctic" : 26, "Chinese Checkers" : 27, "King Of The Mountains" : 28, "U.S. Senate" : 29, "San Francisco" : 30, "Siege!" : 31, "8 Thoughts" : 32, "Cairns Coral Coast" : 33, "Great Lakes" : 34, "BeNeLux" : 35, "Mongol Empire" : 36, "Age Of Merchants" : 37, "WWII Australia" : 38, "Caribbean Islands" : 39, "Egypt: Valley Of The Kings" : 40, "WWII Eastern Front" : 41, "Extreme Global Warming" : 42, "Doodle Earth" : 43, "Pearl Harbor" : 44, "Rail USA" : 45, "Battle Of Actium" : 46, "Italy" : 47, "Portugal" : 48, "D-Day: Omaha Beach!" : 49, "WWII Iwo Jima" : 50, "France" : 51, "Midkemdil" : 52, "Berlin 1961" : 53, "Bamboo Jack" : 54, "WWII Western Front" : 55, "Age Of Realms 1" : 56, "Madness" : 57, "Solar System" : 58, "Duck And Cover" : 59, "South America" : 60, "Puget Sound" : 61, "Conquer Man" : 62, "Age Of Realms 2" : 63, "American Civil War" : 64, "Feudal War" : 65, "Malta" : 66, "Iberia" : 67, "Scotland" : 68, "Dust Bowl" : 69, "Waterloo" : 70, "Draknor - Level 1" : 71, "Netherlands" : 72, "Soviet Union" : 73, "Prohibition Chicago" : 74, "Greater China" : 75, "WWII Gazala" : 76, "NYC" : 77, "Rail Europe" : 78, "Das Schloss" : 79, "Arms Race!" : 80, "New World" : 81, "WWII Ardennes" : 82, "Battle For Iraq!" : 83, "Age Of Realms 3" : 84, "Texan Wars" : 85, "Iceland" : 86, "High Seas" : 87, "Egypt: Lower" : 88, "Sydney Metro" : 89, "Luxembourg" : 90, "Treasures Of Galapagos" : 91, "Egypt: Upper" : 92, "Operation Drug War" : 93, "Supermax: Prison Riot!" : 94, "Egypt: Nubia" : 95, "City Mogul" : 96, "Conquer 4" : 97, "Poker Club" : 98, "Imperium Romanum" : 99, "Archipelago" : 100, "The Citadel" : 101, "Classic Shapes" : 102, "Classic Art" : 103, "Haiti" : 104, "Charleston" : 105, "Europa" : 106, "Halloween Hollows" : 107, "Madagascar" : 108, "Oasis" : 109, "Forbidden City" : 110, "Holy Roman Empire" : 111, "Triple Alliance" : 112, "Rail Australia" : 113, "Europe 1914" : 114, "WWII Europe" : 115, "British Isles 2" : 116, "USA Great Lakes" : 117, "USA New England" : 118, "USA Rockies" : 119, "USA Southeast" : 120, "USA Southwest" : 121, "USA West" : 122, "WWI Ottoman Empire" : 123, "Cairns Metro" : 124, "France 1789" : 125}
var order = "Classic Shapes,Classic Art,Africa,Age Of Merchants,Age Of Realms 1,Age Of Realms 2,Age Of Realms 3,Alexander's Empire,American Civil War,Ancient Greece,Archipelago,Arctic,Arms Race!,Asia,Australia,Bamboo Jack,Battle For Iraq!,Battle Of Actium,BeNeLux,Berlin 1961,Brazil,British Isles 2,Cairns Coral Coast,Canada,Caribbean Islands,CCU,Centerscape,Charleston,Chinese Checkers,Circus Maximus,The Citadel,City Mogul,Conquer 4,Conquer Man,Crossword,D-Day: Omaha Beach!,Discworld,Doodle Earth,Draknor - Level 1,Duck And Cover,Dust Bowl,Egypt: Lower,Egypt: Nubia,Egypt: Upper,Egypt: Valley Of The Kings,Europa,Europe,Extreme Global Warming,Feudal War,Forbidden City,France,Germany,Great Lakes,Greater China,Haiti,Halloween Hollows,High Seas,Hong Kong,Iberia,Iceland,Imperium Romanum,Indochina,Ireland,Italy,King Of The Mountains,Luxembourg,Madagascar,Madness,Malta,Middle East,Midkemdil,Mongol Empire,Montreal,Netherlands,New World,North America,NYC,Oasis,Operation Drug War,Pearl Harbor,Philippines,Poker Club,Portugal,Prohibition Chicago,Puget Sound,Rail Europe,Rail USA,San Francisco,Scotland,Siege!,Solar System,South America,Soviet Union,Space,Supermax: Prison Riot!,Sydney Metro,Tamriel,Texan Wars,Treasures Of Galapagos,USA,USApocalypse,U.S. Senate,Waterloo,World 2.1,WWII Ardennes,WWII Australia,WWII Eastern Front,WWII Gazala,WWII Iwo Jima,WWII Western Front,8 Thoughts,Das Schloss,WWII Europe,Europe 1914,Rail Australia,Triple Alliance,Holy Roman Empire,USA Great Lakes,USA New England,USA Rockies,USA Southeast,USA Southwest,USA West,WWI Ottoman Empire,Cairns Metro,France 1789";
var nosort = order.split(",");
var sortfn = new Array(sortNone,sortAlpha, sortNum, sortComplex, sortChrono, sortAlpha, sortNum, sortComplex, sortChrono);
var sortfnb = new Array(sortNoneb,sortAlphab, sortNumb, sortComplexb, sortChronob, sortAlphab, sortNumb, sortComplexb, sortChronob);
var tsize = {"Doubles" : 2, "Triples" : 3, "Quadruples" : 4};

function MapTag(array) {
  this._maps = array;
}

function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if (exact)
   {
    if(oElement.className==strClassName){
    arrReturnElements.push(oElement);
    }
   }
   else
   {
    if(oElement.className.has(strClassName)){
     arrReturnElements.push(oElement);
    }
   }
  }
  return (arrReturnElements)
}

function previousSib(node){
  var tempNode=node.previousSibling;
  while(tempNode.nodeType!=1){
    tempNode=tempNode.previousSibling;
  }
  return tempNode;
}

function scan(less,min,max,rating,more) {
var table = getElementsByClassName(document,'table','listing',true);
var tr = table[0].getElementsByTagName('tr');
var extra = 0;
for(var t=1;t<tr.length; t++) {
var u = getElementsByClassName(tr[t],'ul','players',true);
if(u.length) {
var li = u[0].getElementsByTagName('li');
var empty = 0;
var minrk = 0;
var minrt = 0;
var maxrk = 0;
for(var l=0; l< li.length; l++) {
var lia = li[l].getElementsByTagName('a');
if(lia.length==0) empty++;
else{
var rk = lia[0].className;
if(rk.match(/r(\d+)/)) {
if(parseInt(RegExp.$1) < min) minrk = 1;
if(parseInt(RegExp.$1) > max) maxrk = 1;
}
var rt = parseFloat(lia[1].innerHTML);
if(rt < rating) minrt = 1;
}
}
if(empty <= less && !minrk && !minrt && !maxrk && empty >= more) {
  tr[t].style.display = "";
  if(extra) tr[t-1].style.display = "";
}
else {
  tr[t].style.display = "none";
  if(extra) tr[t-1].style.display = "none";
}
extra = 0;
}
else{
extra = 1;
}
}
}

function setFilter() {
var e = document.getElementById('waitempty');
var r = document.getElementById('waitrank');
var l = document.getElementById('waitlow');
var t = document.getElementById('waitrate');
var f = document.getElementById('waitfull');
e.selectedIndex = filter[0];
r.selectedIndex = filter[1];
l.selectedIndex = filter[2];
t.selectedIndex = filter[3];
f.selectedIndex = filter[4];
scan(e.options[filter[0]].value,r.options[filter[1]].value,l.options[filter[2]].value,t.options[filter[3]].value,f.options[filter[4]].value);
}

function cboxValues(name) {
 var cbox = document.getElementsByName(name);
 var out = [];
  for(var n=0;n<cbox.length;n++) {
    if(cbox[n].checked) out.push(cbox[n].value);
  }
  return out;
}

function modlight(elem) {
var anch = elem.getElementsByTagName('a');
for(var a=0; a<anch.length; a++) {
if(anch[a].rel && anch[a].rel == "lightbox") {
var parts = anch[a].title.split(",");
var ma = parts[0];
var pcount = "(2/3p): <span class=player2>" + Math.floor(icount[ma] / 3) + "</span> ";
for(var p=4; p<8; p++) {
  pcount += "(" + p + "p): <span class=player2>" + Math.floor(icount[ma] / p) + "</span> ";
}
pcount += "(8p): <span class=player2>" + Math.floor(icount[ma] / 8) + "</span>";
anch[a].title = ma + " Map <b>Territories</b>: <span class=player3>" + tcount[ma] + "</span> " + "<b>Initial</b>: <span class=player3>" + icount[ma] + "</span> " + pcount + "," + parts[1];
}
}
}

function showTags() {
var select = document.getElementById('maptag');
var options = "<option value=\"\">None</option>";
defTags = eval(GM_getValue('deftags'));
if(typeof(defTags) == "undefined") {
defTags = defaults;
}
deflen = 0;
for(var df in defTags) {
deflen++;
options += "<option value=\"" + df + "\">" + df + "</option>";
}
myTags = eval(GM_getValue('maptags'));
if(typeof(myTags) == "undefined") {
myTags = new Object();
}
else{
for(t in myTags) {
  options += "<option value=\"" + t + "\">" + t + "</option>";
}
}
select.innerHTML = options;
var st = (GM_getValue('tag'));
if(typeof(st) == "undefined") {
GM_setValue('tag',tag);
}
else{
tag = st;
}
select.selectedIndex = tag;
var mdiv = document.getElementById('maps');
var dvs;
if(typeof(mdiv.options) != 'undefined') {
dvs = mdiv.getElementsByTagName('option');
}
else{
dvs = mdiv.getElementsByTagName('div');
}
if(select.options[tag].value == "") {
for(var d=0; d< dvs.length; d++) {
  dvs[d].style.display = "";
}
}
else{
var tagtype;
if(defTags[select.options[tag].value]) tagtype = defTags;
else tagtype = myTags;
for(var d=0; d< dvs.length; d++) {
var label;
if(typeof(mdiv.options) != 'undefined') {
 label = dvs[d].text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );
}
else{
 label = dvs[d].getElementsByTagName('label')[0].innerHTML;
}
if(tagtype[select.options[tag].value]._maps.indexOf(label) == -1) {
  dvs[d].style.display = "none";
}
else{
  dvs[d].style.display = "block";
}
}
}
}

function sortAlpha(a,b) {
  var x = a.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' ).toLowerCase();
  var y = b.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' ).toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function sortNum(a,b) {
return(tcount[a.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )] - tcount[b.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )]);
}

function sortComplex(a,b) {
return(ccount[a.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )] - ccount[b.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )]);
}

function sortChrono(a,b) {
return(mcount[a.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )] - mcount[b.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )]);
}

function sortNone(a,b) {
return (nosort.indexOf(a.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )) - nosort.indexOf(b.text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' )));
}

function sortAlphab(a,b) {
  var x = a.getElementsByTagName('label')[0].innerHTML.toLowerCase();
  var y = b.getElementsByTagName('label')[0].innerHTML.toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function sortNumb(a,b) {
return(tcount[a.getElementsByTagName('label')[0].innerHTML] - tcount[b.getElementsByTagName('label')[0].innerHTML]);
}

function sortComplexb(a,b) {
return(ccount[a.getElementsByTagName('label')[0].innerHTML] - ccount[b.getElementsByTagName('label')[0].innerHTML]);
}

function sortChronob(a,b) {
return(mcount[a.getElementsByTagName('label')[0].innerHTML] - mcount[b.getElementsByTagName('label')[0].innerHTML]);
}

function sortNoneb(a,b) {
return (nosort.indexOf(a.getElementsByTagName('label')[0].innerHTML) - nosort.indexOf(b.getElementsByTagName('label')[0].innerHTML));
}

function sortMaps() {
  var select = document.getElementById('sorter');
  var mdiv = document.getElementById('maps');
  var dvs;
  if(typeof(mdiv.options) != 'undefined') {
   dvs = mdiv.getElementsByTagName('option');
  }
  else{
   dvs = mdiv.getElementsByTagName('div');
  }
  var div = document.createElement("div");
  var dv = new Array();
  for(var d=0; d<dvs.length; d++) {
    dv.push(dvs[d]);
  }
  var st = (GM_getValue('mapsort'));
  if(typeof(st) == "undefined") {
   GM_setValue('mapsort',sorting);
  }
  else{
   sorting = st;
  }
  select.selectedIndex = sorting;
  if(typeof(mdiv.options) != 'undefined') {
   dv.sort(sortfn[sorting]);
  }
  else{
   dv.sort(sortfnb[sorting]);
  }
  if(sorting > 4) dv.reverse();
  mdiv.innerHTML = '';
  for(var d=0; d<dv.length;d++) {
    mdiv.appendChild(dv[d]);
  }
}

function showTurns() {
var select = document.getElementById('minetype');
var tn = (GM_getValue('turn'));
if(typeof(tn) == "undefined") {
GM_setValue('turn',turn);
}
else{
turn = tn;
}
select.selectedIndex = turn;
var trs = getElementsByClassName(document,'table','listing',true)[0].getElementsByTagName('tr');
var extra = 0;
for(var t=1; t<trs.length; t++) {
trs[t].style.display = "none";
}
if(turn) {
var mine;
var links = document.getElementsByTagName('link');
for(var lk=0; lk<links.length; lk++) {
  if(links[lk].rel == "alternate") {
    if(links[lk].href.match(/user_id=(\d+)$/)) {
      mine = RegExp.$1;
      break;
    }
  }
}
for(var t=1; t<trs.length; t++) {
var py = getElementsByClassName(trs[t],'ul','players',true);
if(py.length) {
var pls = py[0].getElementsByTagName('li');
for(var pl=0; pl < pls.length;pl++) {
if(pls[pl].className == "status_green") {
  var anc = pls[pl].getElementsByTagName('a');
  if(anc[0].href.match(/u=(\d+)$/)) {
   var names = RegExp.$1;
   if((turn == 1 && names == mine) || (turn == 2 && names != mine)) {
     trs[t].style.display = "";
     if(extra) trs[t-1].style.display = "";
   }
   else{
     trs[t].style.display = "none";
     if(extra) trs[t-1].style.display = "none";
   }
  }
  break;
}
}
extra = 0;
}
else{
extra = 1;
}
}
}
else{
for(var t=1; t<trs.length; t++) {
trs[t].style.display = "";
}
}
}

function showScores() {
var select = document.getElementById('flagtype');
var sn = (GM_getValue('scores'));
if(typeof(sn) == "undefined") {
GM_setValue('scores',scores);
}
else{
scores = sn;
}
select.selectedIndex = scores;
var trs = getElementsByClassName(document,'table','listing',true)[0].getElementsByTagName('tr');
for(var t=1; t<trs.length; t++) {
trs[t].style.display = "none";
}
if(scores) {
var flag = select.options[scores].innerHTML;
for(var t=1; t<trs.length; t++) {
var py = getElementsByClassName(trs[t],'img','icon',true);
if(py.length) {
var pls = py[0].title;
if(pls == flag) {
     trs[t].style.display = "";
}
else{
     trs[t].style.display = "none";
}
}
}
}
else{
for(var t=1; t<trs.length; t++) {
trs[t].style.display = "";
}
}
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
var vers = document.createElement('span');
vers.id = "version";
vers.style.fontWeight = "bold";
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fileden.com/files/2008/5/8/1902058/waiters.txt?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      features = responseDetails.responseText.split('\n');
      var latest = features[0].split('.');
      var ver = version.split('.');
      latestVersion = (((parseInt(latest[0]) * 100) + (parseInt(latest[1]) * 10) + parseInt(latest[2])) > ((parseInt(ver[0]) * 100) + (parseInt(ver[1]) * 10) + parseInt(ver[2])));
      if(latestVersion) {
        vers.innerHTML = "Games Filter v" + version + " <a style=\"color:red\" id=\"version\" href=http://userscripts.org/scripts/source/31550.user.js>New version available</a><br /><br />";
      }
      else{
        vers.innerHTML = "Games Filter v" + version + " <a id=\"version\" href=http://userscripts.org/scripts/source/31550.user.js>Latest Version Installed</a><br /><br />";
      }
      ftext = features.join("\n");
  }
});
window.addEventListener('load',mload, false);

GM_addStyle("button {font-size:12px; padding:0px;} #gfdiv {font-size:12px; }");
var container = document.createElement('div');
container.style.border = "1px dotted #565";
container.style.padding = "5px";
container.id = "gfdiv";
container.style.backgroundColor = "#eee";
var search = getElementsByClassName(document,'div','pagination',true);
if(search.length && !window.location.href.match(/mode=score/i)){
var a = search[0].getElementsByTagName('a');
if(a[0].href.match(/game_status=W/) || a[0].href.match(/mode=join/) || a[0].href.match(/gs=W/)) {
var select = document.createElement('select');
var selectfull = document.createElement('select');
var rank = document.createElement('select');
var lower = document.createElement('select');
var rate = document.createElement('select');
var span = document.createElement('span');
var spanfull = document.createElement('span');
var text = document.createElement('span');
var ratify = document.createElement('span');
var low = document.createElement('span');
var button = document.createElement('button');
select.innerHTML = "<option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8 selected>8</option>";
selectfull.innerHTML = "<option value=0>0</option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option>";
rank.innerHTML = "<option value=0 selected>New Recruit</option><option value=1>Cook</option><option value=2>Cadet</option><option value=3>Private</option><option value=4>Private 1st Class</option><option value=5>Corporal</option><option value=6>Corporal 1st Class</option><option value=7>Sergeant</option><option value=8>Sergeant 1st Class</option><option value=9>Lieutenant</option><option value=10>Captain</option><option value=11>Major</option><option value=12>Colonel</option><option value=13>Brigadier</option><option value=14>General</option><option value=15>Field Marshal</option><option value=16 selected>Conqueror</option>";
lower.innerHTML = "<option value=0>New Recruit</option><option value=1>Cook</option><option value=2>Cadet</option><option value=3>Private</option><option value=4>Private 1st Class</option><option value=5>Corporal</option><option value=6>Corporal 1st Class</option><option value=7>Sergeant</option><option value=8>Sergeant 1st Class</option><option value=9>Lieutenant</option><option value=10>Captain</option><option value=11>Major</option><option value=12>Colonel</option><option value=13>Brigadier</option><option value=14>General</option><option value=15 selected>Field Marshal</option><option value=16 selected>Conqueror</option>";
rate.innerHTML = "<option value=0 selected>Any Rating</option><option value=4.0>4.0+</option><option value=4.1>4.1+</option><option value=4.2>4.2+</option><option value=4.3>4.3+</option><option value=4.4>4.4+</option><option value=4.5>4.5+</option><option value=4.6>4.6+</option><option value=4.7>4.7+</option><option value=4.8>4.8+</option><option value=4.9>4.9+</option><option value=5.0>5.0</option>";
rank.id = "waitrank";
select.id = "waitempty";
selectfull.id = "waitfull";
rate.id = "waitrate";
lower.id = "waitlow";
button.id = "reset";
span.innerHTML = "<b>Max Empty Slots</b>&nbsp;&nbsp;";
spanfull.innerHTML = "&nbsp;&nbsp;<b>Min Empty Slots</b>&nbsp;&nbsp;";
text.innerHTML = "&nbsp;&nbsp;<b>Min Rank</b>&nbsp;&nbsp;";
low.innerHTML = "&nbsp;&nbsp;<b>Max Rank</b>&nbsp;&nbsp;";
ratify.innerHTML = "&nbsp;&nbsp;<b>Min Rating</b>&nbsp;&nbsp;";
button.innerHTML = "Reset All";
var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(vers);
container.appendChild(span);
container.appendChild(select);
container.appendChild(spanfull);
container.appendChild(selectfull);
container.appendChild(text);
container.appendChild(rank);
container.appendChild(low);
container.appendChild(lower);
container.appendChild(ratify);
container.appendChild(rate);
container.appendChild(button);
document.getElementById('version').addEventListener("click" , function () {
alert('New version features\n' + ftext);
},true);
select.addEventListener('change', function() {
var val = this.options[this.selectedIndex].value;
var r = document.getElementById('waitrank');
var l = document.getElementById('waitlow');
var t = document.getElementById('waitrate');
var f = document.getElementById('waitfull');
filter = [this.selectedIndex,r.selectedIndex,l.selectedIndex,t.selectedIndex,f.selectedIndex];
GM_setValue('filter',uneval(filter));
scan(this.options[filter[0]].value,r.options[filter[1]].value,l.options[filter[2]].value,t.options[filter[3]].value,f.options[filter[4]].value);
}, false);
selectfull.addEventListener('change', function() {
var val = this.options[this.selectedIndex].value;
var e = document.getElementById('waitempty');
var r = document.getElementById('waitrank');
var l = document.getElementById('waitlow');
var t = document.getElementById('waitrate');
filter = [e.selectedIndex,r.selectedIndex,l.selectedIndex,t.selectedIndex,this.selectedIndex];
GM_setValue('filter',uneval(filter));
scan(e.options[filter[0]].value,r.options[filter[1]].value,l.options[filter[2]].value,t.options[filter[3]].value,this.options[filter[4]].value);
}, false);
rank.addEventListener('change', function() {
var val = this.options[this.selectedIndex].value;
var e = document.getElementById('waitempty');
var l = document.getElementById('waitlow');
var t = document.getElementById('waitrate');
var f = document.getElementById('waitfull');
filter = [e.selectedIndex,this.selectedIndex,l.selectedIndex,t.selectedIndex,f.selectedIndex];
GM_setValue('filter',uneval(filter));
scan(e.options[filter[0]].value,this.options[filter[1]].value,l.options[filter[2]].value,t.options[filter[3]].value,f.options[filter[4]].value);
}, false);
lower.addEventListener('change', function() {
var val = this.options[this.selectedIndex].value;
var e = document.getElementById('waitempty');
var r = document.getElementById('waitrank');
var t = document.getElementById('waitrate');
var f = document.getElementById('waitfull');
filter = [e.selectedIndex,r.selectedIndex,this.selectedIndex,t.selectedIndex,f.selectedIndex];
GM_setValue('filter',uneval(filter));
scan(e.options[filter[0]].value,r.options[filter[1]].value,this.options[filter[2]].value,t.options[filter[3]].value,f.options[filter[4]].value);
}, false);
rate.addEventListener('change', function() {
var val = this.options[this.selectedIndex].value;
var e = document.getElementById('waitempty');
var r = document.getElementById('waitrank');
var l = document.getElementById('waitlow');
var f = document.getElementById('waitfull');
filter = [e.selectedIndex,r.selectedIndex,l.selectedIndex,this.selectedIndex,f.selectedIndex];
GM_setValue('filter',uneval(filter));
scan(e.options[filter[0]].value,r.options[filter[1]].value,l.options[filter[2]].value,this.options[filter[3]].value,f.options[filter[4]].value);
}, false);
button.addEventListener('click', function() {
filter = [7,0,16,0,0];
GM_setValue('filter',uneval(filter));
setFilter();
}, false);
var list = getElementsByClassName(document,'table','listing',true);
modlight(list[0]);
}

var ft = eval(GM_getValue('filter'));
if(typeof(ft) == "undefined") {
GM_setValue('filter',uneval(filter));
}
else{
filter = ft;
}
setFilter();
}
else {
var search = getElementsByClassName(document,'span','errormsg',true);
var listing = getElementsByClassName(document,'table','listing',true);
if(search.length && listing.length && (window.location.href.match(/mygames3/) || window.location.href.match(/mygames4/))){
var select = document.createElement('select');
select.innerHTML = "<option value=\"\" selected>All</option><option value=\"rating\">Not Rated</option>";
select.id = "ratetype";
var ratespan = document.createElement('span');
ratespan.innerHTML = "<b>Rated Games</b>"
var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(vers);
container.appendChild(ratespan);
container.appendChild(select);
document.getElementById('version').addEventListener("click" , function () {
alert('New version features\n' + ftext);
},true);
select.addEventListener('change', function() {
var trs = getElementsByClassName(document,'table','listing',true)[0].getElementsByTagName('tr');
if(this.options[this.selectedIndex].value) {
for(var t=1; t<trs.length; t++) {
trs[t].style.display = "none";
}
var ratings = getElementsByClassName(document,'a','rating none',true);
for(var r=0; r< ratings.length; r++) {
var xdom = previousSib(ratings[r].parentNode.parentNode);
xdom.style.display = "";
if(previousSib(xdom).getElementsByTagName('a').length == 0) {
  previousSib(xdom).style.display = "";
}
ratings[r].parentNode.parentNode.style.display = "";
}
}
else{
for(var t=0; t<trs.length; t++) {
trs[t].style.display = "";
}
}
}, false);
modlight(listing[0]);
}
else if(search.length && listing.length && (window.location.href.match(/mygames1/) || window.location.href.match(/mygames2/) || window.location.href.match(/mygames$/))){
var select = document.createElement('select');
select.innerHTML = "<option value=\"\" selected>Anyone</option><option value=\"mine\">My Turn</option><option value=\"notmine\">Not My Turn</option>";
select.id = "minetype";
var minespan = document.createElement('span');
minespan.innerHTML = "<b>Next Turn</b>"
var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(vers);
container.appendChild(minespan);
container.appendChild(select);
document.getElementById('version').addEventListener("click" , function () {
alert('New version features\n' + ftext);
},true);
showTurns();
select.addEventListener('change', function() {
turn = this.selectedIndex;
GM_setValue('turn',turn);
showTurns();
}, false);
modlight(listing[0]);
}
else if(search.length && listing.length && (window.location.href.match(/mode=score/i))){
var select = document.createElement('select');
select.innerHTML = '<option value="">Any Country</option><option value="AF">Afghanistan</option><option value="AX">Aland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="VG">British Virgin Islands</option><option value="BN">Brunei</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo - Brazzaville</option><option value="CD">Congo - Kinshasa</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="HR">Croatia</option><option value="CU">Cuba</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="TL">East Timor</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and McDonald Islands</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IR">Iran</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="CI">Ivory Coast</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Laos</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia</option><option value="MD">Moldova</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="KP">North Korea</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territory</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russia</option><option value="RW">Rwanda</option><option value="BL">Saint Barthelemy</option><option value="SH">Saint Helena</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and the Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="KR">South Korea</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SD">Sudan</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="SY">Syria</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania</option><option value="TH">Thailand</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="VI">U.S. Virgin Islands</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US">United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VA">Vatican</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option>';
select.id = "flagtype";
var flagspan = document.createElement('span');
flagspan.innerHTML = "<b>Country</b>"
var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(vers);
container.appendChild(flagspan);
container.appendChild(select);
document.getElementById('version').addEventListener("click" , function () {
alert('New version features\n' + ftext);
},true);
showScores();
select.addEventListener('change', function() {
scores = this.selectedIndex;
GM_setValue('scores',scores);
showScores();
}, false);
}
else{
var legend = document.getElementsByTagName('legend');
if(legend.length) {
var select = document.createElement('select');
select.id = "maptag";
select.style.width = "160px";
var span = document.createElement('span');
span.innerHTML = "<b>Map Tags</b>&nbsp;&nbsp;"
var button = document.createElement('button');
button.innerHTML = "Add Tag";
button.id = "addtag";
var clear = document.createElement('button');
clear.innerHTML = "Clear Tags";
clear.id = "cleartag";
var check = document.createElement('button');
check.innerHTML = "Select Visible";
check.id = "check";
var uncheck = document.createElement('button');
uncheck.innerHTML = "Deselect All";
uncheck.id = "uncheck";
var remove = document.createElement('button');
remove.innerHTML = "Remove Tag";
remove.id = "removetag";
var tagname = document.createElement('input');
tagname.type = text;
tagname.id = "tagname";
var sort = document.createElement('select');
sort.id = "sorter";
sort.style.width = "100px";
sort.innerHTML = "<option>No Sort</option><option>Name &uarr;</option><option>Territories &uarr;</option><option>Complexity &uarr;</option><option>Time &uarr;</option><option>Name &darr;</option><option>Territories &darr;</option><option>Complexity &darr;</option><option>Time &darr;</option>";
var sortspan = document.createElement('span');
sortspan.innerHTML = "<b>Sort By</b>&nbsp;&nbsp;"
var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(vers);
container.appendChild(span);
container.appendChild(select);
if(window.location.href.match(/mode=find/)) {
container.appendChild(tagname);
container.appendChild(button);
container.appendChild(remove);
container.appendChild(clear);
container.appendChild(check);
container.appendChild(uncheck);
}
container.appendChild(sortspan);
container.appendChild(sort);
document.getElementById('version').addEventListener("click" , function () {
alert('New version features\n' + ftext);
},true);
sortMaps();
showTags();
if(window.location.href.match(/mode=find/)) {
document.getElementById('maps').addEventListener("change" , function () {
setThumbnails(this.options);
modlight(document.getElementById('map_thumbs'));
},true);
}
else{
var picker = getElementsByClassName(document,'div','map_picker',true);
modlight(picker[0]);
document.getElementById('maps').addEventListener("change" , function () {
var picker = getElementsByClassName(document,'div','map_picker',true);
unsafeWindow.setThumb(parseInt(this.options[this.selectedIndex].value) - 1);
modlight(picker[0]);
},true);
}
select.addEventListener('change', function() {
tag = this.selectedIndex;
GM_setValue('tag',tag);
showTags();
}, false);
if(window.location.href.match(/mode=find/)) {
clear.addEventListener('click', function() {
  if(confirm("Clear All Tags")) {
   myTags = new Object();
   GM_setValue("maptags", uneval(myTags));
   tag = 0;
   GM_setValue('tag',tag);
   defTags = defaults;
   GM_setValue("deftags", uneval(defTags));
   showTags();
  }
}, false);
remove.addEventListener('click', function() {
var select = document.getElementById('maptag');
var ind = select.selectedIndex;
var rem = select.options[ind].value;
if(ind > deflen) {
if(confirm("Remove " + rem + " Tag?")) {
 delete myTags[rem];
 GM_setValue("maptags", uneval(myTags));
 tag = ind - 1;
 GM_setValue('tag',tag);
 showTags();
}
}
else if(ind){
if(confirm("Remove " + rem + " Default Tag?")) {
 delete defTags[rem];
 GM_setValue("deftags", uneval(defTags));
 tag = ind - 1;
 GM_setValue('tag',tag);
 showTags();
}
}
else{
alert("Cannot Remove Default Tag");
}
}, false);
button.addEventListener('click', function() {
  var newtag = document.getElementById('tagname').value;
  if(newtag == "") alert("Tag name required");
  else if(newtag == "None") alert("Cannot Replace None Tag");
  else{
   var mip = document.getElementById('maps').options;
   var maps = new Array();
   for(op = 0; op< mip.length; op++) {
     if(mip[op].selected) {
       var txt = mip[op].text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );
       maps.push(txt);
     }
   }
   if(maps.length) {
    if(defTags[newtag]) {
      if(confirm(newtag + " is a default tag - overwrite?")) {
        defTags[newtag]._maps = maps;
        GM_setValue("deftags", uneval(defTags));
        var select = document.getElementById('maptag');
        for(var s=0; s< select.options.length; s++) {
          if(select.options[s].value == newtag) {
            tag = s;
            GM_setValue('tag',tag);
            break;
          }
        }
        showTags();
      }
    }
    else if(myTags[newtag]) {
      if(confirm(newtag + " already exists - overwrite?")) {
        myTags[newtag]._maps = maps;
        GM_setValue("maptags", uneval(myTags));
        var select = document.getElementById('maptag');
        for(var s=0; s< select.options.length; s++) {
          if(select.options[s].value == newtag) {
            tag = s;
            GM_setValue('tag',tag);
            break;
          }
        }
        showTags();
      }
    }
    else{
      myTags[newtag] = new MapTag(maps);
      GM_setValue("maptags", uneval(myTags));
      tag = document.getElementById('maptag').options.length;
      GM_setValue('tag',tag);
      showTags();
    }
   }
   else{
    alert("No Maps Selected - Use Checkboxes");
   }
  }
}, false);
check.addEventListener('click', function() {
var mdiv = document.getElementById('maps');
var dvs = mdiv.getElementsByTagName('option');
var select = document.getElementById('maptag');
if(select.options[select.selectedIndex].value == "") {
for(var d=0; d< dvs.length; d++) {
  dvs[d].selected = true;
}
}
else{
var tagtype;
if(defTags[select.options[select.selectedIndex].value]) tagtype = defTags;
else tagtype = myTags;
for(var d=0; d< dvs.length; d++) {
var label = dvs[d].text.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );
if(tagtype[select.options[select.selectedIndex].value]._maps.indexOf(label) == -1) {
  dvs[d].selected = false;
}
else{
  dvs[d].selected = true;
}
}
}
setThumbnails(mdiv.options);
}, false);
uncheck.addEventListener('click', function() {
var mdiv = document.getElementById('maps');
var dvs = mdiv.getElementsByTagName('option');
for(var d=0; d< dvs.length; d++) {
  dvs[d].selected = false;
}
setThumbnails(mdiv.options);
}, false);
}
sort.addEventListener('change', function() {
sorting = this.selectedIndex;
GM_setValue('mapsort',sorting);
sortMaps();
}, false);
}
else if(window.location.href.match(/mode=browse/)) {
search = document.getElementsByTagName('p');
var select = document.createElement('select');
select.id = "maptag";
select.style.width = "160px";
var span = document.createElement('span');
span.innerHTML = "<b>Map Tags</b>&nbsp;&nbsp;"
var tagname = document.createElement('input');
tagname.type = text;
tagname.id = "tagname";
var sort = document.createElement('select');
sort.id = "sorter";
sort.style.width = "100px";
sort.innerHTML = "<option>No Sort</option><option>Name &uarr;</option><option>Territories &uarr;</option><option>Complexity &uarr;</option><option>Time &uarr;</option><option>Name &darr;</option><option>Territories &darr;</option><option>Complexity &darr;</option><option>Time &darr;</option>";
var sortspan = document.createElement('span');
sortspan.innerHTML = "<b>Sort By</b>&nbsp;&nbsp;"
var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(vers);
container.appendChild(span);
container.appendChild(select);
container.appendChild(sortspan);
container.appendChild(sort);
document.getElementById('version').addEventListener("click" , function () {
alert('New version features\n' + ftext);
},true);
sortMaps();
showTags();

var tg = select.options[select.selectedIndex].value;
if(tg != "") {
var tagtype;
if(defTags[tg]) tagtype = defTags;
else tagtype = myTags;
search[0].innerHTML = search[0].innerHTML.replace(/<b>(\d+)<\/b> (.+?) available/, "<b>" + tagtype[tg]._maps.length + "</b> " + tg + " available");
}
else{
var mdiv = document.getElementById('maps');
var dvs = mdiv.getElementsByTagName('div');
search[0].innerHTML = search[0].innerHTML.replace(/<b>(\d+)<\/b> (.+?) available/, "<b>" + dvs.length + "</b> maps available");
}
modlight(document.getElementById('maps'));
select.addEventListener('change', function() {
tag = this.selectedIndex;
GM_setValue('tag',tag);
showTags();
var tg = select.options[tag].value;
if(tg != "") {
var tagtype;
if(defTags[tg]) tagtype = defTags;
else tagtype = myTags;
search[0].innerHTML = search[0].innerHTML.replace(/<b>(\d+)<\/b> (.+?) available/, "<b>" + tagtype[tg]._maps.length + "</b> " + tg + " available");
}
else{
var mdiv = document.getElementById('maps');
var dvs = mdiv.getElementsByTagName('div');
search[0].innerHTML = search[0].innerHTML.replace(/<b>(\d+)<\/b> (.+?) available/, "<b>" + dvs.length + "</b> maps available");
}
}, false);
sort.addEventListener('change', function() {
sorting = this.selectedIndex;
GM_setValue('mapsort',sorting);
sortMaps();
}, false);
}
}
}
}
}

function setThumbnails(opts) {
var thumbs = '';
	for (var i = 0; i < opts.length; i++) {
		if (opts[i].selected) {
      thumbs += ' <a href="maps/' + unsafeWindow.mapFiles[parseInt(opts[i].value) - 1] + '" rel="lightbox" title="' + unsafeWindow.mapTitles[parseInt(opts[i].value) - 1] + ',' + unsafeWindow.mapTopics[parseInt(opts[i].value) - 1] + '"><img style="background-image:url(maps/'+ unsafeWindow.mapThumbs[parseInt(opts[i].value) - 1] + ')" src="static/' + unsafeWindow.mapStatuses[parseInt(opts[i].value) - 1] + '" width="50" height="34" alt="' + unsafeWindow.mapTitles[parseInt(opts[i].value) - 1] + '" title="' + unsafeWindow.mapTitles[parseInt(opts[i].value) - 1] + '" /></a>';
		}
	}
  unsafeWindow.map_thumbs.innerHTML = thumbs;
  unsafeWindow.initLightbox();
}

function mload() {
}
