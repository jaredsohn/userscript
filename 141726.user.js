// ==UserScript==
// @name           _SteamGifts_
// @include        http://www.steamgifts.com/
// @include        http://www.steamgifts.com/coming-soon*
// @include        http://www.steamgifts.com/open*
// @include        http://www.steamgifts.com/new*
// ==/UserScript==
(function() {
var c=[
"Rig n Roll",
"Rochard",
"Space Rangers",
"Reign: Conflict of Nations",
"The Ship",
"The Ship - Complete Pack",
"Theatre of War 2: Africa 1943",
"Nuclear Dawn",
"World Basketball Manager 2010",
"Railworks 3: Train Simulator 2012",
"nail'd",
"Aliens vs Predator",
"Post Apocalyptic Mayhem",
"Counter-Strike: Global Offensive",
"Crusader Kings II: Songs of the Holy Land",
"Batman Arkham City: Arkham City Skins Pack",
"Fallout New Vegas: Couriers Stash",
"Civilization and Scenario Pack: Polynesia",


"Magicka: Nippon",
"Magicka: Lonely Island Cruise",
"Magicka: Party Robes",


"Amnesia: The Dark Descent",
"And Yet It Moves",
"Atom Zombie Smasher",
"Avadon: The Black Fortress",
"Beat Hazard",
"BEEP",
"BITTRIP RUNNER",
"Blocks That Matter",
"Bob Came in Pieces",
"Braid",
"Breath of Death VII",
"Cogs",
"Counter-Strike",
"Counter-Strike 1 Anthology",
"Counter-Strike Complete",
"Counter-Strike: Condition Zero",
"Counter-Strike: Condition Zero Deleted Scenes",
"Counter-Strike: Source",
"Crayon Physics Deluxe",
"Cthulhu Saves the World",
"Cthulhu Saves the World & Breath of Death VII Double Pack",
"Dark Messiah Might and Magic",
"Day of Defeat",
"Deathmatch Classic",
"Frozen Synapse",
"Frozenbyte Collection",
"Gish",
"Half-Life 2: Deathmatch",
"Half-Life 2: Episode Two",
"Half-Life 2: Lost Coast",
"Hammerfight",
"Humble Frozen Synapse Bundle",
"Humble Frozenbyte Bundle",
"Humble Indie Bundle #2",
"Humble Indie Bundle #3",
"Humble Indie Bundle #4",
"Humble Indie Bundle V (4 Games)",
"Jamestown",
"Left 4 Dead 2",
"LIMBO",
"Machinarium",
"Midnight Club 2",
"NightSky",
"Nikopol: Secrets of the Immortals",
"Orcs Must Die!",
"Osmos",
"Portal",
"Portal 2",
"Portal Bundle",
"Psychonauts",
"Revenge of the Titans",
"Ricochet",
"Shadowgrounds",
"Shadowgrounds Pack",
"Shadowgrounds Survivor",
"Shank",
"Sideway New York",
"Snuggle Truck",
"Steel Storm: Burning Retribution",
"Super Meat Boy",
"Superbrothers: Sword & Sworcery EP",
"Team Fortress 2",
"The Ball",
"The Binding of Isaac",
"Trauma",
"Trine",
"VVVVVV",
"Wasteland Angel",
"World of Goo",
"Xotic",
"Zen Bound 2",
"Zombie Driver: Summer of Slaughter"
]
function contains(a,b){
 for(var i=0;i<a.length;i++) if(a[i]===b) return true;
 return false;
}
function Show(){
 var tests = document.getElementsByClassName('post');
 for(i=0; i<tests.length; i++)
  tests[i].style.display='block';
}
function Hide(){
 var tests = document.getElementsByClassName('post');
 for(i=0; i<tests.length; i++){
  if(tests[i].getElementsByClassName('contributor_only')[0])
   tests[i].style.display='none';
  if(tests[i].getElementsByClassName('contributor_only green')[0])
   tests[i].style.display='block';
  if(contains(c,tests[i].getElementsByTagName('a')[0].innerHTML))
   tests[i].style.display='none';
 }
}
function Lol(){
 document.addEventListener('DOMNodeInserted',Hide,false);
}
var buttons=document.getElementById('navigation');
var bHide=document.createElement('input');
bHide.setAttribute('type','button');
bHide.setAttribute('value','Hide');
bHide.setAttribute('class','description');
buttons.appendChild(bHide);
bHide.addEventListener('click',Hide,false);
var bShow=document.createElement('input');
bShow.setAttribute('type','button');
bShow.setAttribute('value','Show');
bShow.setAttribute('class','description');
buttons.appendChild(bShow);
bShow.addEventListener('click',Show,false);
document.getElementsByClassName('featured')[0].style.display='none';
document.getElementsByClassName('search_query')[0].addEventListener('focus',Lol,false);
Hide();

})();