// coding: utf-8
// ==UserScript==
// @name           IslandChecker
// @namespace      islandChecker@ik
// @include        http://*.ikariam.tld/index.php?view=island&id=*
// ==/UserScript==

var ikaserver = location.host;

var islandid = 0;

var nonIslands = { 3:1,    8:1,   10:1,   12:1,   14:1,   21:3,  138:1,  191:12,
 236:7,  245:1,  251:1,  255:7,  284:1,  317:1,  402:10, 541:3,  599:1,  611:3,
 644:3,  651:1,  662:1,  689:2,  707:1,  709:1,  748:4,  797:2,  805:2,  914:5,
 923:8,  988:2, 1053:1, 1244:2, 1267:1, 1299:1, 1339:60,1519:2, 1756:1, 1830:2,
1848:1, 1850:1, 2011:1, 2024:4, 2062:6, 2268:1, 2357:1, 2449:9, 2459:1, 2463:1,
2471:10,2513:2, 2700:5, 2735:2, 2806:6, 2834:4, 2970:1, 3014:20,3040:1, 3104:6,
3163:4, 3187:1, 3240:6, 3331:1, 3408:2, 3472:1, 3529:7, 3778:2, 3781:2, 3791:2,
3808:2, 3870:1, 3994:1, 4102:4, 4146:1, 4188:2, 4205:19,4234:1, 4242:2, 4268:20,
4307:1, 4388:1, 4424:1, 4426:1, 4428:1, 4430:1, 4432:1, 4434:1, 4436:1, 4462:1,
4464:1, 4474:1, 4537:2, 4543:2, 4546:1, 4557:2, 4564:1, 4566:1, 4568:1, 4570:1,
4572:3, 4605:1, 4677:1, 4697:2, 4718:1, 4720:3, 4734:2, 4737:1, 4747:4, 4753:2,
4801:2, 4956:2, 4959:1, 4961:2, 4965:2, 5012:4, 5018:4, 5061:1, 5066:2, 5069:1,
5071:1, 5185:2, 5189:1, 5255:2, 5296:2, 5322:1, 5530:1, 5548:1, 5550:1, 5552:1,
5554:1, 5578:1, 5580:2, 5654:8, 5669:4, 5697:2, 5701:2, 5709:2, 5722:-5721 };

var islandInfo;
try {
  islandInfo = eval(GM_getValue(ikaserver+"Islands"));
} catch (e) {
  log("Error while unserializing 'Islands': "+e);
}

if(islandInfo == null || islandInfo == undefined)
	islandInfo = new Object();


var players;
try {
  players = eval(GM_getValue(ikaserver+"Players"));
} catch (e) {
  log("Error while unserializing 'players': "+e);
}

if (players == null || players == undefined || ("".players == "NaN")) {
  players = new Object();
}
if (players.cities == undefined) {
  players.cities = new Object();
}
if (players.playersCities == undefined) {
  players.playersCities = new Object();
}
if (players.islands == undefined) {
  players.islands = new Object();
}

var alliances;
try {
  alliances = eval(GM_getValue(ikaserver+"Alliances"));
} catch (e) {
  log("Error while unserializing 'alliances': "+e);
}

if(alliances == null || alliances == undefined)
	alliances = new Object();


function requestIsland() {
	islandid++;
	var id = islandid;
	if(id > 5721) {
		GM_log("no island with " + id);
		islandid = 0;
		return;
	}
	if(nonIslands[''+id+''] != undefined) {
		
		GM_log("From id:" + id + ", escaping "+nonIslands[''+id+'']+" unexist islands");
		if(nonIslands[''+id+'']>1)
			islandid += (nonIslands[''+id+''] - 1);
		return;
	}
	
  if(islandInfo[''+id+''] != undefined) {
  	if(islandInfo[''+id+'']["name"] == "") {
  		GM_log(id + " is error");
  		}
  	else
  		return;
	} else {
		islandInfo[''+id+''] = {};
	}
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://" + ikaserver + "/index.php",
    data: "view=island&id="+ id,
    headers: {
      "User-agent": "Mozilla/4.0 (compatible) ",
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/atom+xml,application/xml,text/xml",
      "Referer": "http://" + ikaserver + "/index.php"
    },
    onload: function(responseDetails) {
        
        var htmlString = responseDetails.responseText;
        setTimeout( function g(){
        	try{
        var partString = htmlString.substring(htmlString.indexOf('<span class="island">'),htmlString.indexOf('<span class="island">')+100);
        islandInfo[''+id+'']["name"] = partString.substring(partString.indexOf('>')+1, partString.indexOf('['));
		var locX = 0;
		locX = number(partString.substring(partString.indexOf('[')+1,partString.indexOf(':')));
        islandInfo[''+id+'']["X"] = locX;
		var locY = 0;
		locY = number(partString.substring(partString.indexOf(':')+1,partString.indexOf(']')));
        islandInfo[''+id+'']["Y"] = locY;       
				htmlString = htmlString.substring(htmlString.indexOf('<div id="mainview">'),htmlString.indexOf('<!-- END mainview -->'));
				var mybox = document.createElement("div");
				mybox.id = 'islandCheckerBox';
				mybox.setAttribute("style", "display: none;");
				document.body.appendChild(mybox);
				mybox.innerHTML = htmlString;
				var wood = getNode("//div[@id='islandCheckerBox']//ul[@id='islandfeatures']/li[1]");
				islandInfo[''+id+'']["woodlevel"] = number(wood.className);
				var resource = getNode("//div[@id='islandCheckerBox']//ul[@id='islandfeatures']/li[2]");
				var tradegood = resource.className.split(" ")[0];
				islandInfo[''+id+'']["tradegood"] = tradegood;
				islandInfo[''+id+'']["goodlevel"] = number(resource.className);
				var wonder = getNode("//div[@id='islandCheckerBox']//ul[@id='islandfeatures']/li[3]");
				islandInfo[''+id+'']["wonder"] = number(wonder.className);
				islandInfo[''+id+'']["cities"] = new Array();
 				var cities =xpath("//div[@id='islandCheckerBox']//li[contains(@id, 'cityLocation')]/ul[@class='cityinfo']");
				for(var i = 0; i < cities.snapshotLength; i++) {
    			var c = cities.snapshotItem(i);
    			var infos = c.getElementsByTagName("li");
    			var data = new Object();
    			var cityid = 0;
    			for(var j = 0; j < infos.length; j++) {
      			var info = infos[j];
      			var s = info.innerHTML;
      			if (/destinationCityId=([0-9]+)/.exec(s) != null) {
        		cityid = parseInt(RegExp.$1);
      			}
      			s = s.replace(/<[^>]*>/g, "");
      			var arr = s.split(":");
      			if (arr.length > 1) {
        			var key = arr[0].replace(/^\s+|\s+$/g, "");
        			var value = arr[1].replace(/^\s+|\s+$/g, "");
        			data[j] = value;
      			}
      		}
      		var playername = data[2];
    			if (cityid > 0) {
	      		try {
	        		players.playersCities[players.cities[cityid][2]].cities[cityid] = false;
	      		} catch (e) {
	      		}
	      		if (players.playersCities[playername] == undefined) {
	        		players.playersCities[playername] = new Object();
	      		}
	      		if (players.playersCities[playername].cities == undefined) {
	        		players.playersCities[playername].cities = new Object();
	      		}
	      		players.playersCities[playername].cities[cityid] = true;
	      		players.playersCities[playername].alliance = data[3];
	      		players.cities[cityid] = {name: data[0], size: data[1], player: data[2], alliance: data[3], X: locX,Y: locY, "tradegood": tradegood};
	      		islandInfo[''+id+'']["cities"].push(cityid);
				alliances[data[3]].push(data[2]);
    			}
  			}
				GM_setValue(ikaserver+"Islands", serialize(islandInfo));
				GM_setValue(ikaserver+"Players", serialize(players));
				GM_setValue(ikaserver+"Alliances", serialize(alliances));
				GM_log(new Date()+": run once " + id);
      	document.body.removeChild(mybox);
      } catch(e){GM_log(id+ " error:" + e);}
      	},3000);
  	}
	});
}

var start = new Date();

function Run() {
	var current = new Date();
	if((current - start) > 500) {
		start = current;
		requestIsland();
	}
}

setInterval(Run,100); 


function getVar(varname, vardefault) {
  var res = GM_getValue(varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

function serialize(txt) {
  return uneval(txt); //new version
}

function unserialize(txt){
    return eval(txt);
}
	
function xpath(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathR(query, parent) {
}

function getPath(node) {
  if (node == null || node == undefined) {
    return "/";
  }
  return getPath(node.parentNode) + "/" + node.nodeName + "["+node.id+"]";
}
function getNode(path) {
  var value = xpath(path);
  if (value.snapshotLength == 1) {
    return value.snapshotItem(0);
  }
  for(var i = 0; i < value.snapshotLength; i++) {
    //log(i+".: "+getPath(value.snapshotItem(i)));
  }
  return null;
}
//get node's textContent
function getNodeText(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.textContent;
  }
  return defaultValue;
}
//get node's value attribute
function getNodeValue(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.value;
  }
  return defaultValue;
}
//get node's title attribute
function getNodeTitle(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.title;
  }
  return defaultValue;
}
function getIntValue(str, defaultValue) {
  var temp = ""+str;
  temp = temp.replace(/[^0-9]+/g, "");
  temp = parseInt(temp);
  if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
    return defaultValue;
  }
  return temp;
}


function isNull(n) { return null === n; }
function isArray(a) { return isObject(a) && isNumber(a.length); }
function isString(s) { return "string" == typeof s; }
function isNumber(n) { return "number" == typeof n; }
function isObject(o) { return "object" == typeof o; }
function isBoolean(b) { return "boolean" == typeof b; }
function isDefined(v) { return "undefined" != typeof v; }
function isFunction(f) { return "function" == typeof f; }
function isUndefined(u) { return "undefined" == typeof u; }
function isTextNode(n) { return isObject(n) && n.nodeType == 3; }

function array(a) { return isArray(a) ? a : [a]; }

function number(n) {
  if (isNumber(n)) return n;
  if (isObject(n))
    if (/input/i.test(n.nodeName||""))
      n = n.value;
    else if (n.textContent)
      n = n.textContent;
  n = n.replace(/[^\d.-]+/g, "");
  return n ? parseFloat(n) : undefined;
} 