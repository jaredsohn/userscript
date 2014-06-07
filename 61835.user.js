// ==UserScript==
// @name           Farmville Hasat Hesaplama
// @namespace      http://userscripts.org/users/Tuncay
// @description    Bu eklenti Tarlanızda ki Tohum, Ağaç ve Hayvanların Hasatlarının ne zaman geleceğini hesaplar.
// @include        http://apps.facebook.com/onthefarm*
// @version        1.0.1
// @homepage       http://userscripts.org/scripts/show/61835
// ==/UserScript==

var hc_logo = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAKcAAAEFCAYAAACGtfe9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAK'+
    'TWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQ'+
    'WaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec'+
    '5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28A'+
    'AgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0'+
    'ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaO'+
    'WJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHi'+
    'wmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryM'+
    'AgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0l'+
    'YqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHi'+
    'NLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYA'+
    'QH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6c'+
    'wR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBie'+
    'whi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1c'+
    'QPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqO'+
    'Y4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hM'+
    'WEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgoh'+
    'JZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSU'+
    'Eko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/p'+
    'dLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Y'+
    'b1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7O'+
    'UndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsb'+
    'di97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W'+
    '7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
    'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxr'+
    'PGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW'+
    '2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1'+
    'U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd'+
    '8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H0'+
    '8PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+H'+
    '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';

Date.prototype.addTime= function(t) {
  this.setTime(this.getTime()+t);
  return this;
}

function hc_time(id,time) {
  day = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
	var hc_hours = time.getHours();
	var hc_minutes = time.getMinutes();
	if (hc_minutes < 10) {
    hc_minutes = "0" + hc_minutes;
  }
  hc_day = day [time.getDay()];
    
  var hc_time_out = hc_day + "  " + hc_hours + ":" + hc_minutes;
	document.getElementById(id).innerHTML = hc_time_out;
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
  
  return "<b>Kalan Zaman</b>: <br>" + d_day + " Gün," + d_hr + " Saat," + result + " Dakika";
}

function hc_calculate() {
	var p = document.getElementById('hc_percent');
	percent = parseInt(p.options[p.selectedIndex].value);
	var h = document.getElementById('hc_crop');
	hours = parseInt(h.options[h.selectedIndex].value);
	var hc_now = new Date();
  hc_time('hc_current',hc_now);
  time_left = (hours * 3600000) * (percent/100)
  hc_now.addTime(time_left);
  hc_time('hc_harvest',hc_now);
  document.getElementById('hc_delta').innerHTML = hc_tl(time_left);
	
}

item = new Array(
  "Hasat Seç", 0,
  "Acai Tree", 46,
  "Acorn Squash", 10,
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
  "Brown Cow", 23,
  "Brown Chicken", 23,
  "Cabbage", 46,
  "Carrots", 12,
  "Cherry Tree", 46,
  "Chicken", 23,
  "Chicken Coop", 23,
  "Clumsy Reindeer", 46,
  "Coffee", 16,
  "Corn", 69,
  "Cotton", 69,
  "Cow", 23,
  "Cranberries", 10,
  "Daffodils", 46,
  "Dairy Farm", 23,
  "Date Tree", 69,
  "Duck", 46,
  "Eggplant", 46, 
  "Fig Tree", 69,
  "Ghost Chilli", 6,
  "Goat", 46,
  "Golden Chicken", 23,
  "Grape Fruit", 69,
  "Grapes", 23,
  "Green Tea", 10,
  "Horse", 69,
  "Lavender", 46,
  "Lemon Tree", 69,
  "Lilies", 23,
  "Lime Tree", 115,
  "Maple Tree", 46,
  "Olive Tree", 92,
  "Onion", 12,
  "Orange Tree", 92,
  "Passion Fruit", 115,
  "Pattypan Squash", 16,
  "Peach Tree", 92,
  "Peas", 23,
  "Peppers", 23,
  "Pig", 46,
  "Pineapples", 46,
  "Pink Cow", 23,
  "Pink Roses", 46,
  "Plum Tree", 69,
  "Pomegranate tree", 115,
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
  "Sugar Cane", 8,
  "Sunflowers", 23,
  "Super Berries", 46,
  "Swan", 46,
  "Sweet Corn", 6,
  "Tomatoes", 8,
  "Turtle", 69,
  "Ugly Duckling", 69,
  "Watermelon", 92,
  "Wheat", 69, 
  "Wild Turkey", 46,
  "Yellow Maple Tree", 46,
  "Yellow Melon", 92
    );

list_c = ""
for (x = 0; x < item.length; x += 2) {
  list_c = list_c + "<option value=\"" + item [x+1] + "\">" + item [x] + "</option>";
}

list_p = ""
for (x=0; x<100; x++) {
  list_p = list_p + "<option value=\"" + (100-x) + "\">" + x + "%</option>";
}

var out_frame = '<table border="0" cellspacing="0" cellpadding="0"><tr><td><img id="hc_icon_here" alt="HC Logo" hspace="0" vspace="0" align="left" border="0"></td></tr><br><h2><b><font color="#3666cc">Farmville</font><font color="#ff3333"> Türkiye</font><br>Hasat Hesaplama</b></h2><tr><td colspan="2"><div style="margin-top:6px;"><select id="hc_crop">' + list_c + '</select><p><select id="hc_percent">' + list_p + '</select> Tamamlanma</div><b>Güncel Saat</b>: <span id="hc_current"></span><br><b>Toplama</b>: <span id="hc_harvest"></span><p><span id="hc_delta"></span></p></div></td></tr></table>';

document.getElementById('sidebar_ads').innerHTML = out_frame;
document.getElementById('hc_icon_here').src = hc_logo;
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_crop').addEventListener('change',hc_calculate,false);
GM_addStyle("*[id*=\"content\"], .UIStandardFrame_SidebarAds {display: block !important;}");