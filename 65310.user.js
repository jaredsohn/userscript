// ==UserScript==
// @name           Rollercoaster Kingdom Tour Calculator
// @author         Dieter Holvoet
// @namespace      http://userscripts.org/users/122337
// @description    Calculates the remaining tour arriving time.
// @include        http://apps.facebook.com/coasterkingdom*
// @exclude        http://apps.facebook.com/coasterkingdom/view_gifts.php*
// @exclude        http://apps.facebook.com/coasterkingdom/send_gift.php*
// @exclude        http://apps.facebook.com/coasterkingdom/neighbors*
// @exclude        http://apps.facebook.com/coasterkingdom/invite.php*
// @exclude        http://apps.facebook.com/coasterkingdom/money*
// @exclude        http://apps.facebook.com/coasterkingdom/_r.php?*
// @version        1.00.1
// @copyright      2009, Dieterke007
// @homepage       http://userscripts.org/scripts/upload/61489
// @require        http://sizzlemctwizzle.com/updater.php?id=65310
// @contributor    Alan Claughan
// ==/UserScript==

/*
Changelog
v1.00.0: Script Online
v1.00.1: @require & @contributor line added in metadata, position changed (Facebook Ads removed)
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

var hc_logo = 'data:image/gif;base64,'+
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
  "Bumper Car", 12,
  "Clown Car", 24,
  "Hamburger Party", 4,
  "High School Bus", 8,
  "Hot Dog Party", 24,
  "Limousine", 0,
  "Minivan", 2,
  "Party Bus", 0,
  "Pink Caddy", 0,
  "Santa's Sleigh", 8,
  "Super Bus", 72,
  "Tour Bus", 48, 0
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

var outFrame = '<table border="0" cellspacing="0" cellpadding="2"><tr><td width="47">' + logo + '</td><td><h2><b>Tour<br>Calculator<br>v1.00.1</b></h2></td></tr><tr><td colspan="2">' + iList() + '</td></tr><tr><td colspan="2">' + pList() + '</td></tr><tr><td colspan="2"><b>Current</b>: <span id="hc_current"></span></td></tr><tr><td colspan="2"><b>Harvest</b>: <span id="hc_harvest"></span></td></tr><span id="hc_delta"></span><p><form><input type="reset" value="Setup"></form></div></td></tr><tr><td colspan="2"><div id="hc_config"></div></td></tr></table>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 1px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: absolute; right: 175px; top: 50px; width: 150px;");

	outData.innerHTML=outFrame;

document.getElementById('content').appendChild(outData);
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_item').addEventListener('change',hc_calculate,false);
