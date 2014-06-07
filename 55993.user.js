// ==UserScript==
// @name           Nemesis Spoilers
// @namespace      http://caigawalker.plus.com/
// @description    Pre-select items and auto-solve the password in the Nemesis Quest.
// @include        http://127.0.0.1:*/cave.php*
// ==/UserScript==

var descriptions = [];
var parsed = [];
var howmany = 0;

function selectItem(items, unavailable_text) {
  var options = document.getElementsByTagName("select")[0].options;
  var success = false;
  items_lookup = [];
  for(var i in items) {
    items_lookup[items[i]] = 1;
  }
  for(var i in options) {
    if(success == false && items_lookup[options[i].value]) {
	options[i].selected = true;
	success = true;
    } else {
	options[i].selected = false;
    }
  }
  if(!success) {
    document.getElementsByTagName("select")[0].options[0].innerHTML = ' - requires ' + unavailable_text + ' - ';
  }
}

function processDescriptions()
{
  var lefts = [];
  var rights = [];
  for(var i in parsed) {
    lefts[parsed[i][0]] = i;
    rights[parsed[i][1]] = i;
  }
  for(var i in lefts) {
    if(!rights[i]) {
	var j;
	j = i;
	var password = "";
	do {
	  password += parsed[lefts[j]][2];
	  j = parsed[lefts[j]][1];
	} while(lefts[j]);
	var inputs = document.getElementsByTagName("input");
	for(j in inputs) {
	  if(inputs[j].name == "say") {
	    inputs[j].value = password;
	    break;
	  }
	}
	break;
    }
  }
}

function loadDesc(descid)
{
  GM_xmlhttpRequest({
  method: "GET",
  url: "http://" + document.location.hostname + ":" + document.location.port + "/desc_item.php?whichitem=" + descid,
  headers: { "User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/html", },
  onload: function(resp) {
    if(resp.status == "200") {
	var result = resp.responseText.match(/<table cellpadding=0 cellspacing=0><tr><td rowspan=3 width=50 height=117><img src="[^>]*\/left_([^.]+)\.gif"[^>]*><\/td><td width=100 height=24><img src=[^>]*><\/td><td rowspan=3 width=50 height=117><img src="[^>]*\/right_([^.]+)\.gif"[^>]*><\/td><\/tr><tr><td align=center valign=center><font size=\+1><b>([A-Z]+)<\/b>.*?<\/table>/);
	if(result) {
	  descriptions[descid] = result[0];
	  parsed[descid] = [result[1], result[2], result[3]];
	  document.getElementById('container' + descid).innerHTML = descriptions[descid];
	  howmany++;
	  if(howmany == 8) {
	    processDescriptions();
	  }
	}
    }
  }});
}

function createDescContainer()
{
  var tds = document.getElementsByTagName("td");
  for(var i in tds) {
    if(tds[i].innerHTML.indexOf("<p>This appears to be a large stone door") == 0) {
	tds[i].innerHTML += "<table id='descriptions' cellpadding=8 cellspacing=0 style='border-left: 1px solid blue; border-top: 1px solid blue;'><tr>" +
	  "<td id='container148513878' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(torn)</i></td>" +
	  "<td id='container153915446' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(rumpled)</i></td>" +
	  "<td id='container776620628' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(creased)</i></td>" +
	  "<td id='container411336587' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(folded)</i></td></tr><tr>" +
	  "<td id='container298163869' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(crinkled)</i></td>" +
	  "<td id='container564255755' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(crumpled)</i></td>" +
	  "<td id='container626990413' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(ragged)</i></td>" +
	  "<td id='container647825911' style='border-right: 1px solid blue; border-bottom: 1px solid blue;' height=117 width=200><i>(ripped)</i></td></tr></table>";
	loadDesc(148513878);
	loadDesc(153915446);
	loadDesc(776620628);
	loadDesc(411336587);
	loadDesc(298163869);
	loadDesc(564255755);
	loadDesc(626990413);
	loadDesc(647825911);
    }
  }
}

(function() {
  var imagepath = document.getElementsByTagName("img")[0].src;
  if(imagepath.indexOf("mus_door1.gif") != -1) {
    selectItem([37], "viking helmet");
  } else if(imagepath.indexOf("mys_door1.gif") != -1) {
    selectItem([560], "stalk of asparagus");
  } else if(imagepath.indexOf("mox_door1.gif") != -1) {
    selectItem([565], "dirty hobo gloves");
  } else if(imagepath.indexOf("mus_door2.gif") != -1) {
    selectItem([316], "insanely spicy bean burrito");
  } else if(imagepath.indexOf("mys_door2.gif") != -1) {
    selectItem([319], "insanely spicy enchanted bean burrito");
  } else if(imagepath.indexOf("mox_door2.gif") != -1) {
    selectItem([1256], "insanely spicy jumping bean burrito");
  } else if(imagepath.indexOf("sc_door3.gif") != -1) {
    selectItem([2478], "clown whip");
  } else if(imagepath.indexOf("tt_door3.gif") != -1) {
    selectItem([2477], "clownskin buckler");
  } else if(imagepath.indexOf("sa_door3.gif") != -1) {
    selectItem([420], "tomato juice of powerful power");
  } else if(imagepath.indexOf("pm_door3.gif") != -1) {
    selectItem([579], "boring spaghetti");
  } else if(imagepath.indexOf("db_door3.gif") != -1) {
    selectItem([684, 681, 799, 798, 1017, 683, 679, 682, 680, 797, 1016, 1018], "an advanced cocktail");
  } else if(imagepath.indexOf("at_door3.gif") != -1) {
    var tds = document.getElementsByTagName("td");
    for(var i in tds) {
	if(tds[i].innerHTML.indexOf("You step forward and touch the door. Nothing happens, so you knock on it, then kick it, and then attempt to find a hidden catch amongst the engravings. None of this seems to help.") != -1) {
	  tds[i].innerHTML += "<p><i>Requires Polka of Plenty to pass</i>";
	  break;
	}
    }
  }
  createDescContainer();
  return;
}) ();