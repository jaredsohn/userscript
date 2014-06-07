// ==UserScript==
// @name SSW AutoAccost
// @namespace http://homeworlds.secretsocietywars.com/crashnburn11
// @description Automatically accosts strangers and treats them accordingly
// @include http://www.secretsocietywars.com/index.php?p=quests&a=quest*
// @include http://www.secretsocietywars.com/index.php?p=monsters*
// ==/UserScript==

var want = GM_getValue("want", '0 items');
if (want.length <= 1 || want==undefined) {
GM_setValue("want",'0 items');
want=GM_getValue("want", '0 items');
}
var wantsplit = want.split(" ");
	if (wantsplit.length > 1) {
	GM_setValue("want",want);
	} else {
	GM_setValue("want",'0 items');
	}

var msex0r = GM_getValue("msexr","Trinoc Colonic Engineer").split(", ");
var monstername=get_monstername();
var running;
var btn;
var statnames = {"TURNS": "turns", "HP": "hitpoints"};
var stats = get_stats();
var turns_min;
var turns = parseInt(stats.turns);
var hpg = stats.hitpoints;
var hps = hpg.split("/", 2);
var hp = parseInt(hps[1]);
var hp_stop = GM_getValue("hp_stop", 0);
var wanted = GM_getValue("want","0 items");
var wants = wanted.split(" ");
var itemsgot = GM_getValue("itemsgot",0);
var mstop = GM_getValue("mstop","Titmouse").split(", ");


for (var w=1; w<=(wants.length-1); w++) {
	if (w != 1) {
	wants[1]= wants[1] + ' ' + wants[w];
	}
}

var numitemw = parseInt(wants[0]);
var itemwanted = wants[1];



	var items = document.evaluate('//fieldset[@class="results"]//tr//text()[starts-with(., "Giving ")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var item;

	for(var i = 0; i < items.snapshotLength; i++) {
		var itemname;
		var quantity;
		var re;
		item = items.snapshotItem(i);
		re = /Giving\s+([\d,]+)\s+(.*)\./.exec(item.data);
		quantity = parseInt(re[1].replace(/,/g, ""), 10);
		itemname = re[2];
	
		if (itemname.toUpperCase() == itemwanted.toUpperCase() || itemname.toUpperCase() + 'S' == itemwanted.toUpperCase()) {
		itemsgot = GM_getValue("itemsgot",0) + quantity;
		GM_setValue("itemsgot",itemsgot);
		}
	}





function get_stats() {
	var s = new Object();
	for(var stat in statnames) {
		var val = document.evaluate('//td[contains(@class, "pattr") and contains(text(), "'+stat+'")]/following-sibling::td[1]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(val) {
			s[statnames[stat]] = val.data.replace(/,/g, "");
		}
	}
				
	return s;
}


running = GM_getValue("running", false);

var logout = document.evaluate('//a[contains(@href, "logout")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

stop_link = document.createElement('a');
if (GM_getValue("stopmonsters",true) == true) {
	stop_link.innerHTML = "<b> STOPPING MONSTERS </b>";
}
else {
	stop_link.innerHTML = "<b> NOT STOPPING MONSTERS </b>"
}
stop_link.setAttribute("style", logout.getAttribute("style"));
stop_link.style.color = "White";
stop_link.style.cursor = "pointer";
stop_link.style.fontSize = "10px";
document.body.insertBefore(stop_link, document.body.firstChild);
stop_link.addEventListener('click', set_stop, false);
stop_link.addEventListener('contextmenu', toggle_stop, false);

lean_link = document.createElement('a');

if (GM_getValue("stoplean",true) == true) {
	lean_link.innerHTML = "<b>| STOPPING IF LEANING |</b>";
}
else {
	lean_link.innerHTML = "<b>| NOT STOPPING IF LEANING |</b>";
}

lean_link.setAttribute("style", logout.getAttribute("style"));
lean_link.style.color = "Red";
lean_link.style.cursor = "pointer";
lean_link.style.fontSize = "10px";
document.body.insertBefore(lean_link, document.body.firstChild);
lean_link.addEventListener('click', set_stoplean, false);


smail_link = document.createElement('a');
if (GM_getValue("stopsmail",true) == true) {
	smail_link.innerHTML = "<b> STOPPING FOR SMAIL </b>";
}
else {
	smail_link.innerHTML = "<b> NOT STOPPING FOR SMAIL </b>";
}

smail_link.setAttribute("style", logout.getAttribute("style"));
smail_link.style.color = "White";
smail_link.style.cursor = "pointer";
smail_link.style.fontSize = "10px";
document.body.insertBefore(smail_link, document.body.firstChild);
smail_link.addEventListener('click', set_stopsmail, false);

want_link = document.createElement('a');
want_link.innerHTML = "<b>| GETTING "+GM_getValue("want",0).toUpperCase()+" |</b>";
want_link.setAttribute("style", logout.getAttribute("style"));
want_link.style.color = "Red";
want_link.style.cursor = "pointer";
want_link.style.fontSize = "10px";
document.body.insertBefore(want_link, document.body.firstChild);
want_link.addEventListener('click', set_want, false);

sex_link = document.createElement('a');
if (GM_getValue("sexall",false) == true && GM_getValue("sexspec",true) == false) {
	sex_link.innerHTML = "<b> SEX0R ALL MONSTERS </b>";
} else if (GM_getValue("sexall",false) == false && GM_getValue("sexspec",true) == true) {
	sex_link.innerHTML = "<b> SEX0R SPECIFIC MONSTERS </b>";
} else if (GM_getValue("sexall",false) == false && GM_getValue("sexspec",true) == false) {
	sex_link.innerHTML = "<b> DON'T SEX0R MONSTERS </b>";
}
sex_link.setAttribute("style", logout.getAttribute("style"));
sex_link.style.color = "White";
sex_link.style.cursor = "pointer";
sex_link.style.fontSize = "10px";
document.body.insertBefore(sex_link, document.body.firstChild);
sex_link.addEventListener('click', set_sex, false);
sex_link.addEventListener('contextmenu', toggle_sex, false);

hp_link = document.createElement('a');
hp_link.innerHTML = "<b>| STOP AT "+GM_getValue("hp_stop",0)+" HP |</b>";
hp_link.setAttribute("style", logout.getAttribute("style"));
hp_link.style.color = "Red";
hp_link.style.cursor = "pointer";
hp_link.style.fontSize = "10px";
document.body.insertBefore(hp_link, document.body.firstChild);
hp_link.addEventListener('click', set_hp, false);

turns_link = document.createElement('a');
turns_link.innerHTML = " <b>STOP AT "+GM_getValue("turns_min",0)+" TURNS REMAINING</b> ";
turns_link.setAttribute("style", logout.getAttribute("style"));
turns_link.style.color = "White";
turns_link.style.cursor = "pointer";
turns_link.style.fontSize = "10px";
document.body.insertBefore(turns_link, document.body.firstChild);
turns_link.addEventListener('click', set_time, false);

reset_link = document.createElement('a');
reset_link.innerHTML = "<b>| RESET DROPS ("+GM_getValue("itemsgot",0)+") |</b>";
reset_link.setAttribute("style", logout.getAttribute("style"));
reset_link.style.color = "Red";
reset_link.style.cursor = "pointer";
reset_link.style.fontSize = "10px";
document.body.insertBefore(reset_link, document.body.firstChild);
reset_link.addEventListener('click', reset, false);

btn = document.createElement('input');
btn.type = "button";
btn.size = "small";
if(running) {
btn.value = "Stop AutoAccost";
btn.addEventListener('click', stopAutoAccost, false);
} else {
btn.value = "AutoAccost";
btn.addEventListener('click', startAutoAccost, false);
}
document.body.insertBefore(btn, document.body.firstChild);


function reset() {
GM_setValue("itemsgot", 0);
reset_link.innerHTML = "<b>| DROPS RESET! |</b>";
}

function set_time() {
GM_setValue("turns_min",parseInt(prompt('How many turns would you like to have left when the script quits running?',GM_getValue("turns_min",0))));;
turns_link.innerHTML = "<b> STOP AT "+GM_getValue("turns_min",0)+" TURNS REMAINING </b>";
}

function set_hp() {
GM_setValue("hp_stop",parseInt(prompt('Input HP amount to stop at(enter 0 to not stop for HP)', GM_getValue("hp_stop", 0))));;
hp_link.innerHTML = "<b>| STOP AT "+GM_getValue("hp_stop",0)+" HP |</b>";
}

function set_sex() {
var msex = prompt('input sex0rs, seperated by commas and a space',GM_getValue("msexr",'Trinoc Colonic Engineer, Trinoc Colonic Enforcer'));
GM_setValue("msexr",msex);
}

function set_stop() {
var mstops = prompt('Input monsters you would like to stop if you encounter, seperated by commas and a space',GM_getValue("mstop",'Titmouse'));
GM_setValue("mstop",mstops);
}

function toggle_stop() {
if (GM_getValue("stopmonsters",true) == true) {
	stop_link.innerHTML = "<b> NOT STOPPING MONSTERS </b>";
	GM_setValue("stopmonsters",false);
}
else {
	stop_link.innerHTML = "<b> STOPPING MONSTERS </b>";
	GM_setValue("stopmonsters",true);
}
}

function toggle_sex() {
if (GM_getValue("sexall",false) == true && GM_getValue("sexspec",true) == false) {
	sex_link.innerHTML = "<b> SEX0R SPECIFIC MONSTERS </b>";
	GM_setValue("sexall",false);
	GM_setValue("sexspec",true);
}else if (GM_getValue("sexall",false) == false && GM_getValue("sexspec",true) == true) {
	sex_link.innerHTML = "<b> DON'T SEX0R MONSTERS </b>";
	GM_setValue("sexall",false);
	GM_setValue("sexspec",false);
}else if (GM_getValue("sexall",false) == false && GM_getValue("sexspec",true) == false) {
	sex_link.innerHTML = "<b> SEX0R ALL MONSTERS </b>";
	GM_setValue("sexall",true);
	GM_setValue("sexspec",false);
}
}


function set_stopsmail() {
if (GM_getValue("stopsmail",true) == true) {
	smail_link.innerHTML = "<b> NOT STOPPING FOR SMAIL </b>";
	GM_setValue("stopsmail",false);
}
else {
	smail_link.innerHTML = " <b>STOPPING FOR SMAIL</b> ";
	GM_setValue("stopsmail",true);
}
}

function set_stoplean() {
if (GM_getValue("stoplean",true) == true) {
	lean_link.innerHTML = "<b>| NOT STOPPING IF LEANING |</b>";
	GM_setValue("stoplean",false);
}
else {
	lean_link.innerHTML = "<b>| STOPPING IF LEANING |</b>";
	GM_setValue("stoplean",true);
}
}

function set_want() {
var want = prompt('Input Item Wanted, preceded by a number of wanted (example 50 Blue Pills) DO NOT LEAVE BLANK (for no Item Conditional, enter "0 Items")', GM_getValue("want", 0));
wantsplit = want.split(" ");
	if (wantsplit.length > 1) {
	GM_setValue("want",want);
	} else {
	GM_setValue("want",'0 items');
	}
want_link.innerHTML = "<b>| GETTING "+GM_getValue("want",0).toUpperCase()+" |</b>";
GM_setValue("itemsgot", 0);
}

function get_monstername() {
	var name = "";
	var t = document.evaluate('//fieldset[@class="results"]//text()[contains(., "You meet the ")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(t) {
		var re;
		if(re = /You meet the ([^,]+)/.exec(t.data)) {
			name = re[1];
		}
	}
	return name;
}

function contains(msex0r, monstername) {
  var i = msex0r.length;
  while (i--) {
    if (msex0r[i].toUpperCase() == monstername.toUpperCase()) {
      return true;
    }
  }
  return false;
}


if(running) {
//give other scripts time to load
setTimeout(autoaccost, 2000);
}

function autoaccost() {
var advance;
var sex0r;
var heal;
var healthcell;
var health;
var maxhp;
var healdoppel;



if(!running) {
return;
}

sex0r = document.evaluate('//input[@value="sex0r"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
advance = document.evaluate('//input[@value="advance"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
heal = document.evaluate('//input[@accesskey="h"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
healthcell = document.evaluate('//td[@class="pattrR1"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(re = /Mini-[^\s]+ has 0\/\d+ health/.exec(document.body.innerHTML)) {
healdoppel = document.evaluate('//input[@accesskey="p"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// healdoppel = false;

if(healthcell) {
var re;

if(re = /(\d+).*\/[^\d]*(\d+)/.exec(healthcell.innerHTML)) {
health = parseInt(re[1]);
maxhp = parseInt(re[2]);
}
}	
if (contains(mstop, monstername) && GM_getValue("stopmonsters",true) == true) {
  stopAutoAccost();
  alert(monstername+'!');
  return;
}
if ((contains(msex0r, monstername) && GM_getValue("sexspec",true)== true) || GM_getValue("sexall",false)==true) {
if(sex0r) {
	sex0r.click();
} else if(advance) {
advance.click();
} else if(heal) {
if(health < (.8 * maxhp)) {
heal.click();
if(healdoppel) {
healdoppel.click();
}
setTimeout(nextmonster, 6000);
} else if(healdoppel) {
healdoppel.click();
setTimeout(nextmonster, 5000);
} else {
nextmonster();
}
} else {
alert("could not advance or heal");
}
}
else {
if(advance) {
advance.click();
} else if(heal) {
if(health < (.8 * maxhp)) {
heal.click();
if(healdoppel) {
healdoppel.click();
}
setTimeout(nextmonster, 6000);
} else if(healdoppel) {
healdoppel.click();
setTimeout(nextmonster, 5000);
} else {
nextmonster();
}
} else {
alert("could not advance or heal");
}
}
}




function nextmonster() {
var nextmonster;

if(!running) {
return;
}
var itemsgot = GM_getValue("itemsgot",0);
var hp_stop = GM_getValue("hp_stop", 0);
var wanted = GM_getValue("want","0 items");
var wants = wanted.split(" ");
var numitemw = parseInt(wants[0]);
stopitems = numitemw <= itemsgot && numitemw != 0;
GM_log(stopitems);
nextmonster = document.evaluate('//input[@accesskey="m"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
nyacity = document.evaluate('//input[@value="Return to the ruined streets of NyaCity!"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
bichi = document.evaluate('//input[@value="Return to the BiChi Gang Pagoda."]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg5 = document.evaluate('//fieldset[@class="results"]//text()[contains(., "Giving 1 Cock Ring")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg7 = document.evaluate('//fieldset[@class="results"]//text()[contains(., "Giving 1 Red Plastic Castle")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg9a = document.evaluate('//fieldset[@class="results"]//text()[contains(., "Giving 1 Triple Butt-Plug")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg9b = document.evaluate('//fieldset[@class="results"]//text()[contains(., "You have satisfied the requirements of your 9th Degree")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg25a = document.evaluate('//fieldset[@class="results"]//text()[contains(., "The Brotherhood of Jesters bids you to find all three of the RPS VR Modules")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg25b = document.evaluate('//fieldset[@class="results"]//text()[contains(., "You have satisfied the requirements of your Twenty-Fifth Degree")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg29a = document.evaluate('//td//text()[contains(., "The Alderman points at you")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg29b = document.evaluate('//td//text()[contains(., "Taking 6 AI Fortune Cookies")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg29c = document.evaluate('//td//text()[contains(., "Taking 10 Bamboo Stalks")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg29d = document.evaluate('//td//text()[contains(., "Giving 1 Cassette Tape")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg29e = document.evaluate('//td//text()[contains(., "Giving 50,000 Imperial Starbux")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg31a = document.evaluate('//td//text()[contains(., "Giving 1 Data Card")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg31b = document.evaluate('//td//text()[contains(., "A list of targets appears on the screen")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg31c = document.evaluate('//td//text()[contains(., "You have passed your lodge\'s PvP Sex0r Exam")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg33a = document.evaluate('//fieldset[@class="results"]//text()[contains(., "The sequence of letters seem")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
deg33b = document.evaluate('//fieldset[@class="results"]//text()[contains(., "key to your decryption task")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
leaning = document.evaluate('//td[@class="pattrName"]//text()[contains(., "Leaning")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(bichi) {
	GM_setValue("bichi", true);
}
if(nyacity) {
	GM_setValue("nyacity", true);
}

if(nextmonster) {

	if(deg5 || deg7 || deg9a || deg9b || deg25a || deg25b || deg29a || deg29b || deg29c || deg29d || deg29e || deg31a || deg31b || deg31c || deg33a || deg33b) {
		alert("Quest!");
		stopAutoAccost();
	} else if(leaning.snapshotLength && GM_getValue("stoplean",true)) {
		alert("Leaning!");
		stopAutoAccost();
	} else if(GM_getValue("stopsmail",true) && document.evaluate('//a[contains(@title, "You\'ve got Smail")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
		alert("SMAIL!");
		stopAutoAccost();
	} else if(parseInt(turns)<=parseInt(GM_getValue("turns_min",0))) {
	alert("Time to Stop");
	if (hp == hp_stop) {
	alert("HP Condition Met!");
	} if (stopitems) {
	alert("You got " + wanted + "!");
	}
	stopAutoAccost();
	} else if(hp == hp_stop) {
	alert("HP Condition Met!");
	stopAutoAccost();
	} else if (stopitems) {
	alert("You got " + wanted + "!");
	stopAutoAccost();
	} else if(hp_stop == 0) {
	nextmonster.click();
	} else if(hp > hp_stop) {
	alert("You already have more HP than you wanted, silly!");
	stopAutoAccost();
	} else if(numitemw == 0) {
	nextmonster.click();
	} else if(parseInt(turns)>parseInt(GM_getValue("turns_min",0)) && hp < hp_stop){
	nextmonster.click();
	} 
	
} else if(GM_getValue("bichi",false) == true) {
	window.location.href = "http://www.secretsocietywars.com/index.php?p=quests&a=quest&place=pagoda";
} else if(GM_getValue("nyacity",false) == true) {
		if (numitemw <= itemsgot && numitemw != 0) {
		alert("You got " + wanted + "!");
		stopAutoAccost();
		} else {
		window.location.href = "http://www.secretsocietywars.com/index.php?p=quests&a=quest&place=nyc_chitown";
		}
} else {
alert("unable to find nextmonster button");
stopAutoAccost();
}
}

function reset_btn() {
btn.value = "AutoAccost";
btn.addEventListener('click', startAutoAccost, false);
}

function stopAutoAccost() {
running = false;
GM_setValue("running", false);
btn.value = "Stopped";
btn.addEventListener('click', reset_btn, false);

}

function startAutoAccost() {
running = true;
GM_setValue("running", true);
GM_setValue("nyacity", false);
GM_setValue("bichi", false);
autoaccost();
} 
