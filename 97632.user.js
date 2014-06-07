// ==UserScript==
// @name           Hobolinker
// @namespace      www.zaprocalypse.com
// @description    Adds links to hobopolis areas to the top pane
// @include        http://127.0.0.1:*/topmenu.php*
// @include        http://*.kingdomofloathing.com/showplayer.php?who=352918
// @include        http://*.kingdomofloathing.com/topmenu.php*
// @include        http://*.kingdomofloathing.com/inventory.php*
// ==/UserScript==


var tmp = document.body.innerHTML;
tmp = tmp.replace(/character<\/a/,
    '<a target="mainpane" href="showplayer.php?who=352918">Character</a ');
document.body.innerHTML = tmp;

var tmp = document.body.innerHTML;
tmp = tmp.replace(/island<\/a>/,
    'island</a> </br> </a> <a target="mainpane" href="clan_basement.php?fromabove=1">Dungeon</a> '
    + '</a> <a target="mainpane" href="clan_hobopolis.php">Sewers</a> '
    + '<a target="mainpane" href="clan_hobopolis.php?place=2">Town</a> '
    + '<a target="mainpane" href="clan_hobopolis.php?place=4">Burn</a> '
    + '<a target="mainpane" href="clan_hobopolis.php?place=5">EE</a> '
    + '<a target="mainpane" href="clan_hobopolis.php?place=6">Heap</a> '
    + '<a target="mainpane" href="clan_hobopolis.php?place=7">Burial</a> ' 
    + '<a target="mainpane" href="clan_hobopolis.php?place=8">PLD</a> '
    + '<a target="mainpane" href="clan_slimetube.php">Slime</a> '
    + '<a target="mainpane" href="questlog.php?which=4">Log</a> <br/>' 
// remove the <br/> if you want to see the bottom line of the topmenu.  it will extend the modified menu to be 1 long line.
    + '<a target="mainpane" href="managestore.php">Store</a> '
    + '<a target="mainpane" href="manageprices.php">Man</a> '
    + '<a target="mainpane" href="storelog.php">View</a> '
    + '<a target="mainpane" href="adventure.php?snarfblat=225">Rabbit</a> '
    + '<a target="mainpane" href="craft.php?mode=smith">Smash</a> '
    + '<a target="mainpane" href="bet.php">MMG</a> '
    + '<a target="mainpane" href="adventure.php?snarfblat=82">Castle</a> '
    + '<a target="mainpane" href="managecollection.php">Display</a> '
    + '<a target="mainpane" href="clan_viplounge.php">VIP</a>');
document.body.innerHTML = tmp;

var tmp = document.body.innerHTML;
tmp = tmp.replace(/inventory<\/a/,
    '<a target="mainpane" href="inventory.php?which=1">inv</a>'
    + '<a target="mainpane" href="inventory.php?which=2">ent</a'
    + '<a target="mainpane" href="inventory.php?which=3">ory</a ');
document.body.innerHTML = tmp;

var tmp = document.body.innerHTML;
tmp = tmp.replace(/campground<\/a>/,
    'camp</a> </a> <a target="mainpane" href="closet.php">Closet</a>');
document.body.innerHTML = tmp;


var tmp = document.body.innerHTML;
tmp = tmp.replace(/clan<\/a>/,
    'clan</a> </a> <a target="mainpane" href="clan_whitelist.php">Whitelist</a>');
document.body.innerHTML = tmp;

var tmp = document.body.innerHTML;
tmp = tmp.replace(/woods<\/a>/,
    'woods</a> </a> <a target="mainpane" href="gamestore.php?place=cashier">Wiz</a'
    + '<a target="mainpane" href="gamestore.php?place=lobby">ard</a>');
document.body.innerHTML = tmp;


var tmp = document.body.innerHTML;
tmp = tmp.replace(/sell stuff<\/a>/,
    'sell stuff]</a> </br>  </a> <a target="mainpane" href="craft.php?mode=cocktail">[Cocktails]</a');
document.body.innerHTML = tmp;
