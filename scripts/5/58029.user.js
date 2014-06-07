// ==UserScript==
// @name           MythMonger autoseller
// @namespace      hirak99
// @description    Sets the values in a shop to sell excess cards maintaining the minimum required.
// @include        http://apps.facebook.com/mythmonger/shop.php*
// @version        1.30001
// ==/UserScript==

var heading = document.getElementsByTagName('h1');
var minimum = {}, quest = {};

//========= Minimum to keep ==========
var allZeroes = ["Forester of Esert","Blank Card","Goblin of Esert","Wizard of Esert","Neophyte","Mobile Fern",
	"Ratchet Weed","Blacksmith of Esert","Goblin Runt","Thugbot of Esert","Phun Gai","Enchanted Goblin","Blacksmith",
	"Failed Wizard","Small Bear","Rachet Weed","Coney Scout"];

var minReqs = [
	[1,"Snap Dragon","Goblin Goon","Nub Hopper",
	"Pebble Golem","Corvian Trickster","Ember Salamander","Mollusk Mortar","Muck (Magical Duck)","Amphibleon","Thugbot",
	"Elven Forester","Green Slime","Hermit Sage","Tea Troll","Peaple","Sinkbot","Ivory Squire","Town Watch","Bone Soldier",
	"Zombling","Trogg Scavenger","Salt Toad","Mud Plodder","Silt Slug","Toxic Phun Gai","Petal Worm","Sludge Bat","Dust Moth"],
	[2,"Silencer"],
	[3,"Earth Elementalist","Water Elementalist","Wood Elementalist","Metal Elementalist","Fire Elementalist","Highwayman","Rogue Wink","Hedge Guard","Bush Hunter","Driggle Pup","Troll Lummoxes","Soggy Troll","Degenerate Zombie","Rowdy Trolls","Steam Weaver","Skeletal Fletcher","Farm Equipment"],
	[4,"Rickety Skeleton"],
	[5,"Bandit King","Koi Fish","Hollow Champion"],
	[10,"Burrowing Beetle"]
];

//========= Quest elements, can be duplicates of minimum to keep, should ideally be more than numbers specified in minimum ==========
//quest["Thugbot"]=20;
quest["Blacksmith"]=10;
//quest["Elven Forester"]=10;
//quest["Failed Wizard"]=10;
//quest["Degenerate Zombie"]=15;
//quest["Bone Soldier"]=20;
//quest["Skeletal Fletcher"]=20;
quest["Fireflies"]=10;


for (var i=0; i<minReqs.length; ++i)
	for (var j=1; j<minReqs[i].length; ++j)
		minimum[minReqs[i][j]]=minReqs[i][0];

for (var i=0; i<allZeroes.length; ++i) minimum[allZeroes[i]]=0;

function shorten(name) {
	var words = name.split(/[ ()]+/);
	var result = "";
	for (var i=0; i<words.length; ++i)
		if (words[i].length>0)
			result+=words[i].substring(0,1);
	return result;
}

function insertHTML(html) {
	var y=document.createElement('div');
	y.style.setProperty('text-align','right','');
	y.style.setProperty('color','gold','');
	y.innerHTML=html;
	var x=document.getElementsByClassName('jstabbarholder')[0];
	x.parentNode.insertBefore(y,x);
}

function getStat(statmid,statname) {
	var labels = statmid.getElementsByClassName('label');
	for (var invIndex = 0; invIndex < labels.length; ++invIndex)
		if (labels[invIndex].innerHTML.indexOf(statname)==0) break;
	if (invIndex>=labels.length) return -1;
	inventoryHTML = labels[invIndex].parentNode.innerHTML;
	return parseInt(inventoryHTML.substr(inventoryHTML.indexOf('</span>')+7));
}

var unknown = "";
var numSelling = 0;
var valueSelling = 0;
var powerSelling = 0;
var breakDown = "";
var maxedOut = "";

if (!(heading.length>=1 && document.getElementsByTagName('h1')[0].innerHTML.indexOf('There is no shop')!=-1)) {
	var shopCardHeaders = document.getElementsByClassName('shopCardHeader');
	//alert(shopCardHeaders.length);
	for (i=0; i<shopCardHeaders.length; ++i) {
		var name = shopCardHeaders[i].innerHTML;
		if (quest[name]!=null) minReq = quest[name];
		else minReq = minimum[name];
		x = shopCardHeaders[i].nextSibling.nextSibling;
		inventory = getStat(x,'Inventory:');
		if (minReq==null) {
			if (inventory!=-1) unknown += shopCardHeaders[i].innerHTML + " (" + inventory + ")<br>";
			continue;
		}
		x=shopCardHeaders[i].nextSibling.nextSibling;
		
		//alert(inventory-minReq);
		
		if (inventory>=minReq && quest[name]!=null)
			maxedOut+=shopCardHeaders[i].innerHTML+":"+minReq+"<br>";
		
		var howMany = inventory-minReq;
		if (howMany>0) {
			x.getElementsByTagName('input')[0].value=howMany;
			numSelling+=howMany;
			var value = parseInt(getStat(x,'Value:'));
			valueSelling+=howMany*value;
			powerSelling+=howMany*parseInt(getStat(x,'Power:'))
			if (breakDown.length>0) breakDown+="+";
			breakDown += "(" + shorten(shopCardHeaders[i].innerHTML) + " " + howMany + "x" + value + ")";
		}
	}
}

message = "<b>Autoseller Log</b><hr>";
if (numSelling==0) message += "No cards fit the criteria for selling.<br>";
else {
	message += "Auto Selected: [Cards: "+numSelling+", Power: "+powerSelling+", Coins: "+valueSelling+"]<br>"
		+ "Breakdown: " + breakDown +".<br>";
}
if (maxedOut != "") message += "<br>End of quest criteria met for the following cards:<br>"+maxedOut;
if (unknown != "") message += "<br>It is unknown what to do with the following card(s):<br>"+unknown;
insertHTML(message);
