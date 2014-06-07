var hc_meta = <><![CDATA[
// ==UserScript==
// @name           Farmville Harvest Calculator
// @author         Alan Claughan
// @version        2.22.0
// @namespace      http://userscripts.org/users/aclaughan
// @description    Farmville Harvest Calculator - Select the item you are inquiring about from the top list, input the percentage of completion on the second list and then see when you can harvest it.
// @include        http://apps.facebook.com/onthefarm*
// @exclude        http://apps.facebook.com/onthefarm/gift*
// @exclude        http://apps.facebook.com/onthefarm/neig*
// @exclude        http://apps.facebook.com/onthefarm/help*
// @exclude        http://apps.facebook.com/onthefarm/invi*
// @exclude        http://apps.facebook.com/onthefarm/mone*
// @exclude        http://apps.facebook.com/onthefarm/fans*
// @copyright      2009 - 2010, Alan Claughan
// @homepage       http://userscripts.org/scripts/upload/61489
// ==/UserScript==
]]></>;

var hc_logo = 'data:image/gif;base64,'+
		'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';
		
var logo= '<tr><td width="50"><img id="hc_icon_here" src=' + hc_logo + ' alt="HC Logo" hspace="0" vspace="0" align="left" border="0"></td>';

function pv() {
	var temp = hc_meta.split(/[\r\n]+/).filter(/\/\/ @version/);
	return "<td><h2><b>Harvest<br>Calculator<br>v" + temp[0].slice(19) + "</b></h2></td></tr>";
}

var toggles = ["Seeds", "Trees", "Animals", "Buildings", "Level", "24_Hour"] ;

var menuSwitch = new Array()
for (i=0; i < toggles.length - 1; i++) {
	menuSwitch[toggles[i]] = GM_getValue(toggles[i],"ON");
};
menuSwitch[toggles[4]] = GM_getValue(toggles[4],"70");
menuSwitch[toggles[5]] = GM_getValue(toggles[5],"ON");
	
GM_registerMenuCommand(toggles[0] + " (" + menuSwitch["Seeds"] + ")", toggleSeeds);
GM_registerMenuCommand(toggles[1] + " (" + menuSwitch["Trees"] + ")", toggleTrees);
GM_registerMenuCommand(toggles[2] + " (" + menuSwitch["Animals"] + ")", toggleAnimals);
GM_registerMenuCommand(toggles[3] + " (" + menuSwitch["Buildings"] + ")", toggleBuildings);
GM_registerMenuCommand(toggles[4] + " (" + menuSwitch["Level"] + ")", fvLevel);
GM_registerMenuCommand(toggles[5] + " (" + menuSwitch["24_Hour"] + ")", toggleAM);

function toggleSeeds() {flip('Seeds');}
function toggleTrees() {flip('Trees');}
function toggleAnimals() {flip('Animals');}
function toggleBuildings() {flip('Buildings');}
function toggleAM() {flip('24_Hour');}

function fvLevel() {
	menuSwitch["Level"] = prompt("What level farmer are you?","70");
	if (menuSwitch["Level"] < 1 || menuSwitch["Level"] > 70 )  {
		menuSwitch["Level"] = 70;
		document.location.reload();
	}
	GM_setValue("Level", menuSwitch["Level"]);
}

function flip(sw) {
	menuSwitch[sw] == "ON" ? menuSwitch[sw] = "OFF" : menuSwitch[sw] = "ON";
	GM_setValue(sw, menuSwitch[sw]);
	document.location.reload();
	}
 
Date.prototype.addTime= function(t) {
 this.setTime(this.getTime()+t);
 return this;
 }

function hc_time(id,time) {
	day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
	var hc_hours = time.getHours();
	var hc_minutes = time.getMinutes();
	if (hc_minutes < 10) {
	 hc_minutes = "0" + hc_minutes;
	 }
	hc_day = day [time.getDay()];
	if (menuSwitch["24_Hour"] == "ON") {
		var hc_time_out = hc_day + " " + hc_hours + ":" + hc_minutes;
	}
	else {
		if(hc_hours > 12) {
			hc_hours = hc_hours - 12;
			var hc_time_tail = 'pm';
		}
		else {
			var hc_time_tail = 'am';			
		}
		var hc_time_out = hc_day + " " + hc_hours + ":" + hc_minutes + hc_time_tail;
	}
//	hc_time_out = hc_time_out + ((menuSwitch["24_Hour"] == "OFF") && hc_hours > 12) ? hc_hours - 12 : hc_hours;
//	hc_time_out = (hc_time_out + ":" + hc_minutes);
//	hc_time_out = (hc_time_out + (menuSwitch["24_Hour"] == "ON")  ? "AM" : "PM");
	outField(id,hc_time_out);
	}
	
function hc_tl(time_left) {
  time_left = time_left/60000
  var  day_in_m = 1440;
  var hour_in_m =  60;
  d_day = Math.floor(time_left/day_in_m)
  time_left -= d_day*day_in_m;
  d_hr = Math.floor(time_left/hour_in_m)
  time_left -= d_hr*hour_in_m;
  result = time_left.toFixed(0);
  return d_day + "d," + d_hr + "h," + result + "m";
  }
  
function hc_calculate() {
  var p = document.getElementById('hc_percent');
  var percent = parseInt(p.options[p.selectedIndex].value);
  var h = document.getElementById('hc_item');
	var itemSelected = parseInt(h.options[h.selectedIndex].value);
  var hours = item[itemSelected + 1];
  var itemName = h.options[4];
  var hc_now = new Date();
  hc_time('Current',hc_now);
  var time_left = (hours * 3600000) * (percent/100);
  hc_now.addTime(time_left);
  hc_time('Harvest',hc_now);
	if (item[itemSelected + 2] == 0) {
		var wither_time = (hours * 3600000);
		hc_now.addTime(wither_time);
		hc_time('Wither',hc_now);
		outField('Start', hc_tl(time_left));
		outField('End', hc_tl(time_left + wither_time))
		}
	else {
		outField('Wither', "");
		outField('Start', "");
		outField('End', "")
		}
  }

// Item Name : Time in Hours : Type : Level Available
item = new Array(
  "Acai Tree", 46, 1, 1,
  "Acorn Squash", 10, 0, 36,
  "Aloe Vera", 6, 0, 14,
  "Alpaca", 46, 2, 1,
  "Apple Tree", 69, 1, 1,
  "Apricot Tree", 92, 1, 8,
  "Artichokes", 92, 0, 6,
  "Asparagus", 16, 0, 37,
  "Avocado Tree", 69, 1, 5,
  "Baby Elephant", 92, 2, 1,
  "Baby Tiger", 46, 2, 1,
  "Baby Turkey", 69, 2, 1,
  "Bamboo", 16, 0, 10,
  "Banana Tree", 69, 1, 14,
  "Bear Cub", 46, 2, 1,
  "Bell Peppers", 46, 0, 11,
  "Black Chicken", 23, 2, 4,
  "Black Kitten", 69, 2, 1,
  "Black Sheep", 69, 2, 1,
  "Blackberries", 4, 0, 29,
  "Blueberries", 4, 0, 17,
  "Bovine-09", 23, 2, 1,
  "Breadfruit Tree", 69, 1, 1,
  "Broccoli", 46, 0, 35,
  "Brown Calf", 23, 2, 1,
  "Brown Chicken", 23, 2, 4,
  "Brown Cow", 23, 2, 1,
  "Brown Foal", 23, 2, 1,
  "Brown Goose", 46, 2, 1,
  "Buffalo", 69, 2, 1,
  "Bull", 23, 2, 1,
  "Cabbage", 46, 0, 27,
  "Calf", 23, 2, 1,
  "Carnival Tree", 69, 1, 1,
  "Carrots", 12, 0, 22,
  "Cashew Tree", 69, 1, 7,
  "Cherry Tree", 46, 1, 1,
  "Chicken Cheer", 23, 2, 1,
  "Chicken Coop", 23, 3, 1,
  "Chicken Joy", 23, 2, 1,
  "Chicken", 23, 2, 4,
  "Clumsy Reindeer", 46, 2, 1,
  "Clydesdale Foal", 23, 2, 1,
  "Clydesdale", 69, 2, 1,
  "Coffee", 16, 0, 23,
  "Corn", 69, 0, 24,
  "Cotton", 69, 0, 9,
  "Cow", 23, 2, 1,
  "Cranberries", 10, 0, 10,
  "Daffodils", 46, 0, 8,
  "Dairy Farm", 23, 3, 2,
  "Date Tree", 69, 1, 20,
  "Deer", 46, 2, 1,
  "Doe", 69, 2, 1,
  "Donkey", 23, 2, 1,
  "Duck", 46, 2, 15,
  "Durian Tree", 92, 1, 1,
  "Eggplant", 46, 0, 1,
  "Elk", 46, 2, 1,
  "Fig Tree", 69, 1, 5,
  "Fire & Ice Roses", 16, 0, 35,
  "Forget-Me-Not", 18, 0, 5,
  "Ghost Chilli", 6, 0, 26,
  "Giant Panda", 46, 2, 1,
  "Goat", 46, 2, 18,
  "Golden Chicken", 23, 2, 4,
  "Golden Poppies", 8, 0, 25,
  "Grapefruit Tree", 69, 1, 11, 
  "Grapes", 23, 0, 19,
  "Gray Horse", 69, 2, 1,
  "Grape Sheep", 69, 2, 1,
  "Greem Mallard", 46, 2, 1,
  "Green Calf", 23, 2, 1,
  "Green Hellebores", 16, 0, 1,
  "Green Roses", 23, 0, 1,
  "Green Tea", 10, 0, 28,
  "Grey Foal", 23, 2, 1,
  "Grey Goose", 46, 2, 1,
  "Grey Horse", 69, 2, 1,
  "Grey Tabby", 69, 2, 1,
  "Groovy Goat", 46, 2, 1,
  "Guava Tree", 69, 1, 15,
  "Gulmohar Tree", 69, 1, 1,
  "Hampshire Lamb", 69, 2, 1,
  "High Kick Horse", 69, 2, 1,
  "Horse Spectator", 69, 2, 21,
  "Horse", 69, 2, 21,
  "Hot Pink Pig", 46, 2, 1,
  "Invisible Cat", 69, 2, 1,
  "Jackalope", 46, 2, 1,
  "Kelly Green Calf", 23, 2, 1,
  "Kelly Green Cow", 23, 2, 1,
  "Lamb", 69, 2, 1,
  "Langur Monkey", 46, 2, 1,
  "Lavender", 46, 0, 30,
  "Lemon Tree", 69, 1, 7,
  "Lilies", 23, 0, 35,
  "Lime Tree", 115, 1, 10,
  "Line Quacker I", 46, 2, 1,
  "Line Quacker II", 46, 2, 1,
  "Lop-Eared Bunny", 46, 2, 1,
  "Lotus", 8, 0, 30,
  "Love Ewe", 69, 2, 1,
  "Male Ostrich", 46, 2, 1,
  "Mandarin Tree", 92, 1, 1,
  "Maple Tree", 46, 1, 1,
  "Moose", 69, 2, 1,
  "Morning Glory", 12, 0, 1,
  "Olive Tree", 92, 1, 32,
  "Onion", 12, 0, 34,
  "Orange Tabby", 23, 2, 1,
  "Orange Tree", 92, 1, 1,
  "Ornament Tree I", 92, 1, 1,
  "Ornament Tree II", 92, 1, 1,
  "Ossabaw Pig", 46, 2, 1,
  "Ox", 69, 2, 1,
  "Passion Fruit Tree", 115, 1, 17,
  "Pattypan Squash", 16, 0, 16,
  "Peach Tree", 92, 1, 4,
  "Peacock", 46, 2, 1,
  "Peas", 23, 0, 32,
  "Penguin", 69, 2, 1,
  "Peppers", 23, 0, 12,
  "Percheron Foal", 23, 2, 1,
  "Pig", 46, 2, 10,
  "Pineapples", 46, 0, 15,
  "Pink Calf", 23, 2, 1,
  "Pink Cow", 23, 2, 1,
  "Pink Haired Pony", 69, 2, 1,
  "Pink Patch Calf", 23, 2, 1,
  "Pink Patch Cow", 23, 2, 1,
  "Pink Roses", 46, 0, 20,
  "Pinto Foal", 23, 2, 1,
  "Pinto Horse", 69, 2, 1,
  "Plum Tree", 69, 1, 2,
  "Pomegranate Tree", 115, 1, 23,
  "Porcupine", 46, 2, 1,
  "Potatoes", 69, 0, 21,
  "Pumpkin", 8, 0, 5,
  "Pseudocorn", 69, 2, 1,
  "Rabbit", 92, 2, 12,
  "Raspberries", 2, 0, 8,
  "Red Maple Tree", 46, 1, 1,
  "Red Tulips", 23, 0, 15,
  "Red Wheat", 69, 0, 30,
  "Referee Cow", 23, 2, 1,
  "Reindeer", 46, 2, 1,
  "Rice", 12, 0, 7,
  "Saanens Goat", 46, 2, 1,
  "Shamrock Sheep", 69, 2, 1,
  "Shamrock", 4, 0, 1,
  "Sheep Spectator", 69, 2, 1,
  "Sheep", 69, 2, 7,
  "Soybeans", 23, 0, 1,
  "Squash", 46, 0, 4,
  "Stable", 69, 3, 1,
  "Starfruit Tree", 92, 1, 2,
  "Strawberries", 4, 0, 1, 
  "Sugar Cane", 8, 0, 31,
  "Sunflowers", 23, 0, 25,
  "Sunny Ewe", 69, 2, 1,
  "Swan", 46, 2, 1,
  "Tomatoes", 8, 0, 20,
  "Turkey", 46, 2, 1,
  "Turtle", 69, 2, 1,
  "Ugly Duckling", 69, 2, 1,
  "Valley Quail", 46, 2, 1,
  "Walnut Tree", 69, 2, 11,
  "Watermelon", 92, 0, 18,
  "Wheat", 69, 0, 1,
  "White Foal", 23, 2, 1,
  "White Grapes", 23, 0, 5,
  "White Kitty", 69, 2, 1,
  "White Peacock", 46, 2, 1,
  "White Roses", 23, 0, 1,
  "White Stallion", 69, 2, 1,
  "Wild Turkey", 46, 2, 1,
  "Yellow Lentil", 4, 2, 5,
  "Yellow Maple Tree", 46, 1, 4,
  "Yellow Melon", 92, 0, 33,
  "Yellow Roses", 46, 0, 1
	);

function iList() { // Builds the item slider
  var ilist = "<tr><td colspan=\"2\"><select id=\"hc_item\">";
  for (var x=0; x<item.length; x+=4 ) {
		if ((menuSwitch[toggles[item[x+2]]] == "ON") && (menuSwitch['Level'] >= item[x+3])) {
    	ilist = ilist + "<option value=\"" + x + "\">" + item [x] + "</option>";
		};
  };
  iList = iList + "</select></td></tr>";
  return ilist;
}

function pList() {  // Builds the percentage Slider
  var pList = "<tr><td colspan=\"2\"><select id=\"hc_percent\">";
  for (var x=0; x<100; x++) {
    pList = pList + "<option value=\"" + (100-x) + "\">" + x + "%</option>";
  };
  pList = pList + "</select> complete</td></tr>";
  return pList;
}

function outField(id,value) {
	var outString = ( value == "" ? "" : "<b>" + id + "</b>: " + value );
	document.getElementById(id).innerHTML = outString;
}


var outFrame = '<table border="0" cellspacing="0" cellpadding="2">' + logo + pv() + iList() + pList() + 
	'<tr><td colspan="2" id="Current"></td></tr>' + 
	'<tr><td colspan="2" id="Harvest"></td></tr>' + 
	'<tr><td colspan="2" id="Wither"></td></tr>' + 
	'<tr><td colspan="2" id="Start"></td></tr>' + 
	'<tr><td colspan="2" id="End"></td></tr></table>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 1px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: fixed; left: 2px; top: 43px;");

	outData.innerHTML=outFrame;

document.getElementById('content').appendChild(outData);
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_item').addEventListener('change',hc_calculate,false);