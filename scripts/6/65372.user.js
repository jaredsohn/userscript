// ==UserScript==
// @name           Cafe World Serving Calculator
// @author         Dieter Holvoet
// @namespace      http://userscripts.org/users/122337
// @description    Calculates the date that you can serve your dish.
// @include        http://apps.facebook.com/cafeworld*
// @exclude        http://apps.facebook.com/cafeworld/view_gift.php*
// @exclude        http://apps.facebook.com/cafeworld/send_gift.php*
// @exclude        http://apps.facebook.com/cafeworld/neighbors.php*
// @exclude        http://apps.facebook.com/cafeworld/invite.php*
// @exclude        http://apps.facebook.com/cafeworld/money*
// @exclude        http://apps.facebook.com/cafeworld/help.php*
// @exclude        http://apps.facebook.com/cafeworld/fan.php
// @version        1.00.5
// @copyright      2010, Dieterke007
// @homepage       http://userscripts.org/scripts/upload/61489
// @require        http://sizzlemctwizzle.com/updater.php?id=65372
// @contributor    Alan Claughan
// ==/UserScript==

/*
Changelog
v1.00.0: Script online
v1.00.1: Picture changed, screenshots added, version history added, include/exclude problem resolved
v1.00.2: 'Harvest' Changed to 'Serve', autoupdate & contributor added in metadata
v1.00.3: Position changed (right corner, Facebook Ads removed, copyright changed
v1.00.4: VIP Dinner Added
v1.00.5: New Dishes added
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
		'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' +
                's//Z';
		
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
  "Atomic Buffalo Wings", 3,
  "Bacon Cheeseburger", 0.08,
  "Buttermilk Pancakes", 0.75,
  "Caramel Apples", 2,
  "Chicken Gyro and Fries", 0.17,
  "Chicken Pot Pie", 48,
  "Chips and Guacamole", 0.05,
  "Crackling Peking Duck", 18,
  "Craime Fraiche Caviar", 0.5,
  "Delicious Chocolate Cake", 14,
  "Fieri Fish Taco's", 2,
  "Fish n Chips", 2,
  "Gingerbread House", 120,
  "Grand Tandoori Chicken", 24,
  "Herbed Halibut", 24,
  "Homestyle Pot Roast", 48,
  "Hotdog and Garlic Fries", 0.1
  "Impossible Quiche", 48,
  "Jammin' Jelly Donuts", 0.34,
  "Jumbo Shrimp Coctail", 0.5,
  "King Crab Bisque", 24,
  "Kung Pao Stir Fry", 4,
  "Lavish Lamb Curry", 8,
  "Martian Brain Bake", 24,
  "Overstuffed Peppers", 12,
  "Powdered French Toast", 0.34,
  "Pumpkin Pie", 12,
  "Savory Stuffed Turkey", 22,
  "Shu Mai Dumplings", 6,
  "Smoked Salmon Latkes", 2,
  "Spaghetti and Meatballs", 8,
  "Spitfire Roasted Chicken", 24,
  "Stardust Stew", 9,
  "Super Chunk Fruit Salad", 0.25,
  "Sweet Seasonal Ham", 12,
  "Tikka Masala Kabobs", 1,
  "Tony's Classic Pizza", 5,
  "Tostada de Carne Asada", 8,
  "Triple Berry Cheesecake", 12,
  "VIP Dinner", 18,
  "Voodoo Chicken Salad", 12
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

var outFrame = '<table border="0" cellspacing="0" cellpadding="2"><tr><td width="47">' + logo + '</td><td><h2><b>Serving<br>Calculator<br>v1.00.5</b></h2></td></tr><tr><td colspan="2">' + iList() + '</td></tr><tr><td colspan="2">' + pList() + '</td></tr><tr><td colspan="2"><b>Current</b>: <span id="hc_current"></span></td></tr><tr><td colspan="2"><b>Serve</b>: <span id="hc_harvest"></span></td></tr><span id="hc_delta"></span><p><form><input type="reset" value="Setup"></form></div></td></tr><tr><td colspan="2"><div id="hc_config"></div></td></tr></table>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 1px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: absolute; right: 175px; top: 50px; width: 150px;");

	outData.innerHTML=outFrame;

document.getElementById('content').appendChild(outData);
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_item').addEventListener('change',hc_calculate,false);
