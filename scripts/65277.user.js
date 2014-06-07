// ==UserScript==
// @name           Farmville Harvest Calculator Plus+
// @author         Dieter Holvoet
// @namespace      http://userscripts.org/users/122337
// @description    Calculates the remaining harvest time.
// @include        http://apps.facebook.com/onthefarm*
// @exclude        http://apps.facebook.com/onthefarm/gift*
// @exclude        http://apps.facebook.com/onthefarm/neig*
// @exclude        http://apps.facebook.com/onthefarm/help*
// @exclude        http://apps.facebook.com/onthefarm/invi*
// @exclude        http://apps.facebook.com/onthefarm/mone*
// @exclude        http://apps.facebook.com/onthefarm/fans*
// @version        1.00.6
// @copyright      2010, Dieterke007
// @homepage       http://userscripts.org/scripts/upload/61489
// @require        http://sizzlemctwizzle.com/updater.php?id=65277
// @contributor    Alan Claughan
// ==/UserScript==

/*
Changelog
v1.00.0: Christmas items and other things that Alan forgot added
v1.00.1: Alpaca added
v1.00.2: White Kitty and version history added
v1.00.3: Picture changed, screenshots added
v1.00.4: Position changed (right corner, Facebook Ads removed),@require & @contributor line added in metadata, copyright changed
v1.00.5: 'Morning Glory' Seed, 'Starfruit Tree', and "Lop-Eared Bunny" added
v1.00.6: 'Animal Mystery Crate' Animals added, 'Cashew Tree' added
*/

(function() {
var head = document.getElementsByTagName('head')[0], 
    style = document.createElement('style'), 
    css = '#right_column { width: 77% !important; }' +
          ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
          ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
          ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
          '.PYMK_Reqs_Sidebar, .LSplitPage_Right { display:' +
          ' none !important; } #wallpage { width: 700px !important; }' +
          ' .LSplitView_ContentWithNoLeftColumn, ' +
          '.FN_feedbackview { width: 100% !important; }';
if (!head || self.location != top.location) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();

var hc_logo = 'data:image/jpg;base64,'+
		'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';
		
var logo= '<img id="hc_icon_here" src=' + hc_logo + ' alt="HC Logo" hspace="0" vspace="0" align="left" border="0">'

Date.prototype.addTime= function(t)
{
this.setTime(this.getTime()+t);
return this;
}

function hc_time(id,time)
{
day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var hc_hours = time.getHours();
var hc_minutes = time.getMinutes();
if (hc_minutes < 10)
{
hc_minutes = "0" + hc_minutes;
}
hc_day = day [time.getDay()];
var hc_time_out = hc_day + "  " + hc_hours + ":" + hc_minutes;
document.getElementById(id).innerHTML = hc_time_out;
}

function hc_tl(time_left)
{
time_left = time_left/60000
  var  day_in_m = 1440;
var hour_in_m =  60;
d_day = Math.floor(time_left/day_in_m)
  time_left -= d_day*day_in_m;
d_hr = Math.floor(time_left/hour_in_m)
  time_left -= d_hr*hour_in_m;
result = time_left.toFixed(0);
return "<b>Time left</b>: " + d_day + "d," + d_hr + "h," + result + "m";
}

function hc_calculate()
{
var p = document.getElementById('hc_percent');
percent = parseInt(p.options[p.selectedIndex].value);
var h = document.getElementById('hc_item');
hours = parseInt(h.options[h.selectedIndex].value);
var hc_now = new Date();
hc_time('hc_current',hc_now);
time_left = (hours * 3600000) * (percent/100)
  hc_now.addTime(time_left);
hc_time('hc_harvest',hc_now);
document.getElementById('hc_delta').innerHTML = hc_tl(time_left);
}


item = new Array(
  "Acai Tree", 46,
  "Acorn Squash", 10,
  "Alien Cow", 23,
  "Alpaca", 46,
  "Aloe Vera", 6,
  "Apple Tree", 69,
  "Apricot Tree", 92,
  "Artichokes", 92,
  "Asparagus", 16,
  "Avocado Tree", 69,
  "Baby Elephant", 92,
  "Baby Turkey", 69,
  "Banana Tree", 69,
  "Bell Peppers", 46,
  "Black Chicken", 23,
  "Black Kitten", 69,
  "Black Sheep", 69,
  "Blackberries", 4,
  "Blueberries", 4,
  "Bovine-09", 23,
  "Broccoli", 46,
  "Brown Calf", 23,
  "Brown Cow", 23,
  "Brown Chicken", 23,
  "Brown Goose", 46,
  "Bull", 23,
  "Buffalo", 69,
  "Cabbage", 46,
  "Calf", 23,
  "Carrots", 12,
  "Cashew Tree", 69,
  "Cherry Tree", 46,
  "Chicken", 23,
  "Chicken Coop", 23,
  "Coffee", 16,
  "Clumsy Reindeer", 46,
  "Clydesdale", 69,
  "Corn", 69,
  "Cotton", 69,
  "Cow", 23,
  "Cranberries", 10,
  "Daffodils", 46,
  "Dairy Farm", 23,
  "Date Tree", 69,
  "Deer", 46,
  "Duck", 46,
  "Donkey", 23,
  "Eggplant", 46, 
  "Fig Tree", 69,
  "Ghost Chilli", 6,
  "Goat", 46,
  "Grapefruit Tree", 69,
  "Grapes", 23,
  "Green Tea", 10,
  "Green Calf", 23,
  "Grey Goose", 46,
  "Golden Chicken", 23,
  "Horse", 69,
  "Jackalope", 46,
  "Lamb", 69,
  "Lavender", 46,
  "Lemon Tree", 69,
  "Lilies", 23,
  "Lime Tree", 115,
  "Lop-Eared Bunny", 46,
  "Maple Tree", 46,
  "Morning Glory", 12,
  "Olive Tree", 92,
  "Onion", 12,
  "Orange Tree", 92,
  "Orange Tabby", 69,
  "Ornament Tree I", 46,
  "Ornament Tree II", 46,
  "Ox", 46,
  "Passion Fruit Tree", 115,
  "Pattypan Squash", 16,
  "Peach Tree", 92,
  "Peacock", 46,
  "Peas", 23,
  "Penguin", 69,
  "Peppers", 23,
  "Pig", 46,
  "Pineapples", 46,
  "Pink Calf", 23,
  "Pink Cow", 23,
  "Pink Roses", 46,
  "Plum Tree", 69,
  "Poinsettia", 23,
  "Pomegranate Tree", 115,
  "Potatoes", 69,
  "Pumpkin", 8,
  "Rabbit", 92,
  "Raspberries", 2,
  "Red Maple Tree", 46,
  "Red Tulips", 23,
  "Red Wheat", 69,
  "Reindeer", 46,
  "Rice", 12,
  "Sheep", 69,
  "Soybeans", 23,
  "Squash", 46,
  "Strawberries", 4, 
  "Starfruit Tree", 92, 
  "Sugar Cane", 8,
  "Sunflowers", 23,
  "Super Berries", 46,
  "Swan", 46,
  "Sweet Corn", 6,
  "Sweet Potatoes", 23,
  "Tomatoes", 8,
  "Turtle", 69,
  "Turkey", 46,
  "Ugly Duckling", 69,
  "Watermelon", 92,
  "Wheat", 69, 
  "White Kitty", 69, 
  "Wild Turkey", 46,
  "Yellow Maple Tree", 46,
  "Yellow Melon", 92
	);

function iList() { // Builds the item slider
  var ilist = "<select id=\"hc_item\">";
  for (var x=0; x<item.length; x+=2 ) {
    ilist = ilist + "<option value=\"" + item [x+1] + "\">" + item [x] + "</option>";
  };
  iList = iList + "</select>";
  return ilist;
}

function pList() {  // Builds the percentage Slider
  var pList = "<select id=\"hc_percent\">";
  for (var x=0; x<100; x++) {
    pList = pList + "<option value=\"" + (100-x) + "\">" + x + "%</option>";
  };
  pList = pList + "</select> complete";
  return pList;
}

var outFrame = '<table border="0" cellspacing="0" cellpadding="2"><tr><td width="47">' + logo + '</td><td><h2><b>Harvest<br>Calculator<br>Plus+<br>v1.00.6</b></h2></td></tr><tr><td colspan="2">' + iList() + '</td></tr><tr><td colspan="2">' + pList() + '</td></tr><tr><td colspan="2"><b>Current</b>: <span id="hc_current"></span></td></tr><tr><td colspan="2"><b>Harvest</b>: <span id="hc_harvest"></span></td></tr><span id="hc_delta"></span><p><form><input type="reset" value="Setup"></form></div></td></tr><tr><td colspan="2"><div id="hc_config"></div></td></tr></table>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 1px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: absolute; right: 175px; top: 50px; width: 150px;");

	outData.innerHTML=outFrame;

document.getElementById('content').appendChild(outData);
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_item').addEventListener('change',hc_calculate,false);
