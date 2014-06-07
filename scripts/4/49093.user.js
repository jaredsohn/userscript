// ==UserScript==
// @name           Darwin's Tools
// @namespace      Darwin's Tools
// @description    Herramientas de Darwin's.
// @author         Monkey
// ==/UserScript==

var _cachedDecimalPoint = undefined;

function gameVersion() {
	var v = $X('id("GF_toolbar")//li[@class="version"]/a/span');
	return v && v.textContent.replace(/[^\d.]/g, "").replace(/^\./, "");
}
// Debug Log
function log(msg) {
	if ((config.cfg["DEBUG_LOG"] == true) && (console != undefined)) {
		console.log("[OverviewTable] "+msg);
	}
}

// Get City
function getCity(city_id) {
	var key = "city_"+city_id;
	if (config[key] == undefined) {
		config[key] = new Resource();
	}
	config[key].city_id = city_id;
	return config[key];
}
// 
function saveRes(res) {
  	var key = "city_"+res.city_id;
	config[key] = res;
	saveConfig();
}

// 
function getSelectCity() {
	return $x("//option", $("citySelect"))[$("citySelect").selectedIndex].value;
}

// 
function getActionCode(root) {
  return $X("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,root).value;
}
// 
function getServerTime() {
	return $X("//*[@id='servertime']").innerHTML;
}

function setStatusMessage(msg) {
	document.title = msg;
}

function mynumberformat(num, alwaysShowSign, fracdigits) {
	if (num == undefined || s == "NaN") {
		return "-";
	}
	if (num == "?") {
		return num;
	}
	var s = num.toString();
	var negative = "";
	if (s.substring(0, 1) == "-") {
		negative = "-";
		s = s.substring(1);
	} else if (alwaysShowSign == true) {
		negative = "+";
	}
	var arr = s.split(".");
	var re = /(\d{1,3})(?=(\d{3})+$)/g;
	fracdigits = (fracdigits != undefined) ? fracdigits : 0;
	
	return negative + arr[0].replace(re,"$1,") + ((arr.length == 2 && fracdigits != 0) ? "."+arr[1].substring(0, fracdigits) : "");
}

function floatFormat(num, fracdigits, alwaysShowSign) {
  var s = num.toString();
  if (num == "?") {
    return num;
  }
  var negative = "";
  if (s.substring(0, 1) == "-") {
    negative = "-";
    s = s.substring(1);
  } else if (alwaysShowSign == true) {
    negative = "+";
  }
  var p = s.indexOf(".");
  if (p >= 0) {
    var i = s.substring(0, p);
    var frac = s.substring(p + 1, p + 1 + fracdigits);
    while (frac.length < fracdigits) {
      frac += "0";
    }
    s = i + getDecimalPoint() + frac;
  }
  return negative + s;
}
function getDecimalPoint() {
  if (_cachedDecimalPoint == undefined) {
    _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);
    if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == "") {
      _cachedDecimalPoint = ",";
    }
  }
  return _cachedDecimalPoint;
}
function urlParse(param, url) {
	if (!url) url = location.search || "";
	var keys = {};
	url.replace(/([^=&?]+)=([^&#]*)/g, 
		function(m, key, value) {
			keys[decodeURIComponent(key)] = decodeURIComponent(value);
		}
	);
	return (param ? keys[param] : keys) || "view" == param && document.body.id;
}
function postWrap(url) {
	var get = urlParse(null, url);
	if (!get.action) return url;
	var cookie = $X('id("changeCityForm")//input[@name="actionRequest"]');
	if (cookie)
		get.actionRequest = cookie.value;
	return postUrlTo(url.replace(/\?.*|$/, "/index.php"), get);
}
function postUrlTo(url, postvars) {
	if (!/^http/i.test( url ))
		url = location.protocol +"//"+ location.host + url;
	var form = <form method="POST" action={ url }/>;
	for (var v in postvars)
		form.* += <input type="hidden" name={ v } value={ postvars[v] }/>;
	var body = <body onload="document.forms[0].submit()">{ form }</body>;
	return "data:text/html,"+ encodeURIComponent(body.toXMLString());
}


// 
function resolveTime(seconds, timeonly) {
	function z(t) { return (t < 10 ? "0" : "") + t; }
	function getGameTime(offset) {
  		var Y, M, D, h, m, s, t;
  		[D, M, Y, h, m, s] = getServerTime().split(/[. :]+/g);
  		t = new Date(Y, parseInt(M, 10)-1, D, h, m, s);
  		return offset ? new Date(t.valueOf() + offset*1e3) : t;
	}
	var t0 = unsafeWindow.startTime || // 0.2.7 (and earlier)
		getIntValue(unsafeWindow.updateServerTime.toSource()); // 0.2.8
	var t = getGameTime(seconds - (t0 - unsafeWindow.startServerTime) / 1e3);
	var d = "", now = (new Date);
	if (t.getDate() != now.getDate() || t.getMonth() != now.getMonth()) {
		m = t.getMonth();
		d = t.getFullYear()+"/"+twodigit(t.getMonth()+1)+"/"+twodigit(t.getDate());
		if (2 == timeonly) return d;
			d += ", ";
  	}
	var h = z(t.getHours());
	var m = z(t.getMinutes());
	var s = z(t.getSeconds());
	t = d + h + ":" + m + ":" + s;
	return timeonly ? t : texts["FinishTime"] + ":" + t;
}

// 
function getCityName(cityhtml) {
	return cityhtml.replace(/\[[0-9]+.[0-9]+\]/,"").Trim();
}

// 
function createFillageTimes(r, d, max) {
	function CalFillageTimes(r, d, max) {
		if (r) {
			if (r > 0) {
				t = (max - d) * 3600 / r;
			} else {
				t = d * 3600 / -r;
			}
			return t;
		}
	}
	var t = CalFillageTimes(r, d, max);
	return (t) ? createTooltip(secsToDHMS(t, 0), texts[r > 0 ? "full" : "empty"]+":"+resolveTime(t, 1)) : "";
}

function secsToDHMS(t, rough, join) {
	if (t == Infinity) return "¡Û";
	var result = [];
	var minus = t < 0 ? "-" : "";
	if (minus)
		t = -t;
	for (var unit in TimeUnits) {
		var u = unsafeWindow.LocalizationStrings.timeunits.short[unit];
		var n = TimeUnits[unit];
		var r = t % n;
		if (r == t) continue;
		if ("undefined" == typeof rough || rough--)
			result.push(((t - r) / n) + u);
		else {
			result.push(Math.round(t / n) + u);
			break;
		}
		t = r;
	}
	return minus + result.join(join || " ");
}


// Update
function VersionUpdate() {
	var lastSearch = getCfgValue("LAST_UPDATE", 0);
	var searchFreq = 8 * 3600 * 1000;
	if(_startTime - lastSearch > searchFreq) {
		setCfgValue("LAST_UPDATE", _startTime);
		get(scriptsource, CheckupDate);
	}
}
// Update
function CheckupDate(text){
	if (/scriptversion.*=.*\"v([0-9.]+.+)\"/.exec(text) == null) return;
	var newversion = RegExp.$1;
	scriptversion = scriptversion.replace(/v/g, "");
	if (newversion > scriptversion) {
		if (confirm(texts["NewVersion"].replace(/%s/,newversion))) {
			location.href = scriptinstall;
		}
	}
}

//¼½©ñÁn­µ
function AlertSounds() {
	var resWarning = $x("//a[contains(@class, 'normalactive')]");
	var resAlert = $x("//a[contains(@class, 'normalalert')]");
	if (resAlert.length > 0 && ALERT_VOLUME != 0) {
		playSound(alertSound[rand(0, alertSound.length-1)], ALERT_VOLUME);
	} else if (resWarning.length > 0 && WARNING_VOLUME !=0) {
		playSound(warningSound[rand(0, warningSound.length-1)], WARNING_VOLUME);
	}
}

//¼½©ñÁn­µ
function playSound(sound, volume) {
	var body = document.getElementsByTagName("body")[0];
	var emb = document.createElement("embed");
	emb.src = sound;
	emb.setAttribute("autostart", "true");
	emb.setAttribute("loop", "false");
	emb.setAttribute("hidden", "true");
	emb.setAttribute("volume", volume);
	body.appendChild(emb);
}
//¦Û°Ê§ó·sºô­¶
function AutoRefresh() {
	var cities = $x("//select[@id='citySelect']/option", $("citySelect"));
	var idx = $("citySelect").selectedIndex+1;
	idx %= cities.length;
	var city_id = $x("//select[@id='citySelect']/option", $("citySelect"))[idx].value;
	var strurl = postUrl("?action=header&function=changeCurrentCity&oldView=city&view=city&cityId="+ city_id);
	var timeID = setTimeout("location.href= '"+strurl+"'", getRefreshTime());
}

// ­pºâ¦Û°Ê§ó·sªº¬í¼Æ
function getRefreshTime() {
	return (parseInt(AUTO_R_MIN) + Math.round(Math.random() * (AUTO_R_MAX - AUTO_R_MIN))) * 1000;
} 

// Premium View
function showPremiumView() {
	GM_addStyle("#advisors #advCities a.normal             {background-image:url('/skin/layout/advisors/mayor_premium.gif');}");
	GM_addStyle("#advisors #advCities a.normalactive       {background-image:url('/skin/layout/advisors/mayor_premium_active.gif');}");
	GM_addStyle("#advisors #advMilitary a.normal           {background-image:url('/skin/layout/advisors/general_premium.gif');}");
	GM_addStyle("#advisors #advMilitary a.normalactive     {background-image:url('/skin/layout/advisors/general_premium_active.gif');}");
	GM_addStyle("#advisors #advMilitary a.normalalert      {background-image:url('/skin/layout/advisors/general_premium_alert.gif');}");
	GM_addStyle("#advisors #advResearch a.normal           {background-image:url('/skin/layout/advisors/scientist_premium.gif');}");
	GM_addStyle("#advisors #advResearch a.normalactive     {background-image:url('/skin/layout/advisors/scientist_premium_active.gif');}");
	GM_addStyle("#advisors #advDiplomacy a.normal          {background-image:url('/skin/layout/advisors/diplomat_premium.gif');}");
	GM_addStyle("#advisors #advDiplomacy a.normalactive    {background-image:url('/skin/layout/advisors/diplomat_premium_active.gif');}");
}

// ¨ú±o¥Ø«e«°Âí½s½X
/*function getCityId() {
	var ret = getIntValue(getNode_value("//option[@class='avatarCities coords' and @selected='selected']"), 0);
	if (ret == 0)
    	ret = getIntValue(getNode_value("//option[@class='avatarCities' and @selected='selected']"), 0);	
	if (ret == 0)
    	ret = getIntValue(getNode_value("//option[@class='avatarCities tradegood1' and @selected='selected']"), 0);
	if (ret == 0)
    	ret = getIntValue(getNode_value("//option[@class='avatarCities tradegood2' and @selected='selected']"), 0);
	if (ret == 0)
    	ret = getIntValue(getNode_value("//option[@class='avatarCities tradegood3' and @selected='selected']"), 0);
	if (ret == 0)
    	ret = getIntValue(getNode_value("//option[@class='avatarCities tradegood4' and @selected='selected']"), 0);
	return ret;
}*/
function getCityId() {
    ret = getIntValue(getNode_value("//select[@id='citySelect']//option[@selected='selected']"), 0);	
	return ret;
}
// ¨ú±o®qÀ¬©M®y¼Ð¦W
function getIslandCoord() {
	var ret = getNodeValue("id('breadcrumbs')//a[@class='island']");
	if ( ret == undefined || ret == 0 )
  		ret = getNodeValue("id('breadcrumbs')//span[@class='island']");
	if ( ret == undefined || ret == 0 )
  		if (/(\[[0-9]+:[0-9]+\])/.exec(getNode("id('breadcrumbs')").innerHTML) != null)
    		ret = RegExp.$1;
	if ( ret == undefined || ret == 0 ) {
  		var node = getNode("id('breadcrumbs')");
  		if (node!=null) {
  			node = node.getElementsByTagName("a")[0];
  			if (node!=null) {
  	  			var strhref = node.getAttribute("href");
  	  			if (/islandX=([0-9]+).+islandY=([0-9]+)/.exec(strhref) != null)
  	  		  	ret = "["+RegExp.$1+":"+RegExp.$2+"]";
  			}
  		}
	}
	if ( ret == undefined || ret == 0 ) {
  		var idx = $("citySelect").selectedIndex;
  		ret = $x("//option", $("citySelect"))[idx].title;
	}
	return ret;
}
// ®y¼Ð®æ¦¡¤Æ
function TrimIsland(str){
	var ret = "[??:??]";
	if (/\[([0-9]+):([0-9]+)\]/.test(str) != null) {
		ret = "["+twodigit(RegExp.$1)+":"+twodigit(RegExp.$2)+"]";
	}
	return ret;
}

// ¨ú±o¥Ø«eµe­±«°Âí
function getCityMainView() {
	var city_name = getNodeValue("id('breadcrumbs')/*[@class='city']");
	if (gameVersion() > "0.3.0") {
	   var ret = getNode_value("//option[@class='coords' and text()='"+TrimIsland(island_coord)+" "+city_name+"']", 0);
	   if (ret == 0)
    	   ret = getNode_value("//select[@id='citySelect']//option[@selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
          ret = getNode_value("//option[@class='tradegood1' and @selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
          ret = getNode_value("//option[@class='tradegood2' and @selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
          ret = getNode_value("//option[@class='tradegood3' and @selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
          ret = getNode_value("//option[@class='tradegood4' and @selected='selected' and text()='"+city_name+"']", 0);
	} else {
	   var ret = getNode_value("//option[@class='avatarCities coords' and text()='"+TrimIsland(island_coord)+" "+city_name+"']", 0);
	   if (ret == 0)
    	   ret = getNode_value("//option[@class='avatarCities' and text()='"+city_name+"']", 0);
	   if (ret == 0)
    	   ret = getNode_value("//option[@class='avatarCities tradegood1' and @selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
    	   ret = getNode_value("//option[@class='avatarCities tradegood2' and @selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
    	   ret = getNode_value("//option[@class='avatarCities tradegood3' and @selected='selected' and text()='"+city_name+"']", 0);
	   if (ret == 0)
    	   ret = getNode_value("//option[@class='avatarCities tradegood4' and @selected='selected' and text()='"+city_name+"']", 0);
	   }
	return ret;
}


// ¨ú±o¸ê·½¦¨ªø¸ê®Æ
function digProducedResources(res, root) {
	var vWood = getDecl("woodCounter", root);
	var vTradegood = getDecl("tradegoodCounter", root);
	var sTradeGoodName = vTradegood.valueElem.split("value_")[1];
	res.prodwood = Math.round(parseFloat(vWood.production)*3600*100)/100;
	res.prodwine = 0;
	res.prodmarble = 0;
	res.prodglass = 0;
	res.prodsulfur = 0;
	res.prodtime = new Date().getTime().toString();
	sTradeGoodName =(sTradeGoodName == "crystal") ? "glass" : sTradeGoodName;
	res.type = sTradeGoodName;
	res["prod"+res.type] = Math.round(parseFloat(vTradegood.production)*3600*100)/100;
}
function getDecl(variable, root) {
	variable = "var "+ variable;
	var tag = $X('//script[contains(.,"'+ variable +'")]', root);
	var js = new RegExp(variable +"\\s*=\\s*\\S*?(\\({.*?}\\))", "m");
	var v = tag.innerHTML.replace(/\s+/g, " ").match(js);
	if (v) return eval(v[1]);
}

function getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour) {
	var elapsedhours = (currenttime - startTime) / 1000.0 / 3600.0;
	return Math.max(0, Math.floor(startAmount + elapsedhours * factPerHour));
}

function TimeResourceCounter() {
	var currenttime = new Date().getTime();
	var counters = xpath("//font[contains(@id, 'ResourceCounter')]");
	for(var i=0; i < counters.snapshotLength; i++) {
		var c = counters.snapshotItem(i);
		if (c.color != "#ff0000") {
			var arr = c.lang.split(",");
			var startTime = arr[0];
			var startAmount = parseFloat(arr[1]);
			var factPerHour = parseFloat(arr[2]);
			c.innerHTML = mynumberformat(getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour));
		}
	}
	return (counters.snapshotLength > 0);
}

// Åã¥Ü Tooltip
function createTooltipAttribute(tooltip, title) {
	if (tooltip == undefined || tooltip == "") return "";
	if (title == undefined || title == "") title = "";
	else title = ", TITLE, '"+title+"', TITLEALIGN , 'center', TITLEFONTCOLOR, '#542C0F'";
	var html = "<table border='0' cellspacing='4' cellpadding='4'><tr><td>"+tooltip+"</td></tr></table>";
	html = html.replace(/'/g, "\\'");
	return "onmouseover=\"Tip('"+html+"', PADDING, 2, FADEIN, 500, FADEOUT, 500, SHADOW, false "+title+");\"";
}
function createTooltip(content, tooltip, title) {
	if (tooltip == undefined || tooltip == "") return content;
	return "<font "+createTooltipAttribute(tooltip, title)+">"+content+"</font>";
}
function createIconLink(mode, id, enabled, city_id, island_id) {
	var link = { "transport":"transport", "plunder":"plunder", "blockade":"blockade", "defend":"defendCity", "defend_port":"defendPort",
	             "espionage":"sendSpy&islandId="+island_id, "diplomacy":"sendMessage&oldView=island&with="+city_id,
	             "move_army":"deployment&deploymentType=army", "move_fleet":"deployment&deploymentType=fleet" };
	var href = "?view="+link[mode]+"&destinationCityId="+id;
	enabled = (enabled==undefined || enabled==true) ? "" : "_disabled";
	var img = createImg("/skin/actions/"+mode+enabled+".gif", "", 16);
	return (enabled=="") ? createLink(img, href) : img;
}
function createImg(src, extra, height, width) {
	if (height == undefined) height = "";
	if (height != "") height = "height='"+height+"' ";
	if (width == undefined) width = "";
	if (width != "") width = "width='"+width+"' ";
	if (extra == undefined || extra == "") extra = "";
	return "<img src='"+src+"' "+height+width+extra+">";
}
function createImg2(src, extra, height, width) {
	if (height == undefined) height = "";
	if (height != "") height = "height='"+height+"' ";
	if (width == undefined) width = "";
	if (width != "") width = "width='"+width+"' ";
	if (extra == undefined) extra = "";
	if (extra != "") extra = "title='"+extra+"'";
	return "<img src='"+src+"' "+height+width+" "+extra+">";
}
function createLink(text, href, attrs) {
	attrs = (attrs != undefined) ? attrs : "";
	return "<a href=\""+href+"\" "+attrs+">"+text+"</a>";
}
function createLinkToCity(text, city_id, city_index) {
	strurl = "?action=header&function=changeCurrentCity&oldView=city&view=city&cityId="+ city_id;
	//return createLink(text, postUrl(strurl), "");
	return createLink(text, strurl, "class='AutoChange' cityid='"+city_id+"'");
}
function createLinkToForeignCity(text, island_id, city_id) {
	return createLink(text, "?view=island&id="+island_id+"&selectCity="+city_id);
}
function createLinkToResource(text, island_id, city_id, city_index) {
	if (island_id != undefined && island_id != "") {
		return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "class='AutoChange' cityid='"+city_id+"'");
	}
	return text;
}
function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index) {
	if (condition == true && island_id != undefined && island_id != "") {
		return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=tradegood&type=tradegood&id="+island_id+"&cityId="+city_id, "class='AutoChange' cityid='"+city_id+"'");
	}
	return text;
}
function createCounter(startTime, startAmount, factPerHour, showTooltip, maxCapacity, plusText) {
	intfactPerHour = Math.round(factPerHour);
	var dailyFact = Math.round(24 * factPerHour);
	var tooltip = "";
	if ((showTooltip == true) && (dailyFact != 0)) {
		tooltip = mynumberformat(intfactPerHour, true)+" / "+texts["h"]+", "+mynumberformat(dailyFact, true)+" / "+texts["day"];
	}
	var res;
	if (factPerHour != 0) {
		res = "<font id='ResourceCounter' lang='"+startTime+","+startAmount+","+factPerHour+"'>x</font>";
		if (intfactPerHour > 0) {
			res = "<b>"+res+"</b>";
		}
	} else {
		res = mynumberformat(startAmount);
	}
	if (plusText != undefined) {
		res += plusText;
	}
	res = createTooltip(res, tooltip);
	if ((PROGRESS_BAR_MODE != "off") && (maxCapacity > 0)) {
		var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
		var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));
		var remaining = "";
		var remhour = 100000000;
		if (factPerHour > 0) {
			remhour = (maxCapacity - curres) / factPerHour;
			remaining = "<br>"+texts["Remaining"]+" "+floatFormat(remhour, 1) + " " + texts["hoursToFull"];
		} else if (factPerHour < 0) {
			remaining = "<br>"+texts["Remaining"]+" "+floatFormat(curres / -factPerHour, 1) + " " + texts["hoursToEmpty"];
		}
		var cl = "myPercentNormal";
		if (PROGRESS_BAR_MODE == "percent") {
			if (perc == 100) {
				cl = "myPercentFull";
			} else if (perc > 95) {
				cl = "myPercentAlmostFull";
			} else if (perc > 80) {
				cl = "myPercentWarning";
			}
		} else if (PROGRESS_BAR_MODE == "time") {
			if (remhour == 0) {
				cl = "myPercentFull";
			} else if (remhour < 16) {
				cl = "myPercentAlmostFull";
			} else if (remhour < 24) {
				cl = "myPercentWarning";
			}
		} else {
			log("ismeretlen progress bar mode: "+PROGRESS_BAR_MODE);
		}
		res += "<table class='myPercent' style='width: 100%;'>";
		res += "<tr class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity)+ " "+texts["available"]+"<br>" + perc+"% "+texts["fullness"] + remaining)+">";
		res += "<td width='"+perc+"%' class='"+cl+"'></td>";
		res += "<td width='"+(100-perc)+"%' class='myPercentRemaining'></td>";
		res += "</tr></table>";
	}
	return res;
}
function TimeCounter() {
	var currenttime = new Date().getTime();
	var cs = $x("//font[contains(@id, 'FinishCounter')]");
  	for (var i = 0; i < cs.length; i++) {
		var c = cs[i];
		var abstime = Math.round(c.lang);
		hdata = (abstime - currenttime) / 1000;
		if (hdata > 0) {
			var hday = Math.floor(hdata / 86400);
			var hhor = Math.floor((hdata - (hday * 86400)) / 3600);
			var hmin = Math.floor((hdata - (hday * 86400) - (hhor * 3600)) / 60);
			var hsec = Math.floor(hdata - (hday * 86400) - (hhor * 3600) - (hmin * 60));
			var s = "";
			var b = false;
			if (b || hday > 0) { s += hday+texts["day"]+" "; b = true; }
			b = true;
			if (b || hhor > 0) { s += hhor+":"; b = true; }
			if (b || hmin > 0) { s += twodigit(hmin)+":"; b = true; }
			if (b || hsec > 0) { s += twodigit(hsec)+""; b = true; }
			c.innerHTML = s;
		} else {
			c.innerHTML = "-";
		}
	}
}
function getDuration(timeStr) {
	var s = strToDatetime(timeStr);
	var serverTime = strToDatetime(getServerTime());
	var d = s - serverTime;
	if(d < -1) d += 86400 * 1000;
	return d;
}
function createTimeCounter(enddate) {
	if (enddate != undefined && enddate != "") {
		var s = smartDateFormat(enddate);
		return createTooltip("<font id='FinishCounter' lang='"+enddate+"' class='time_counter'></font>", s);
	}
	return "";
}
function createProd(prodPerHour, extraTooltip, fracdigits) {
	if (prodPerHour == undefined) return "";
	var sprodPerHour = prodPerHour.toString();
	if (sprodPerHour.toString == "" || sprodPerHour == "0" || sprodPerHour == "NaN") {
		return "";
	}
	fracdigits = (fracdigits != undefined) ? fracdigits : 1;
	var tooltip = mynumberformat(24 * prodPerHour, true, fracdigits)+" / "+texts["day"];
	if (extraTooltip != undefined) {
		tooltip += ", "+extraTooltip;
	}
	return createTooltip(mynumberformat(prodPerHour, true, fracdigits), tooltip);
}

function strToDatetime(str) {
	var d;
	if (/([0-9][0-9][0-9][0-9])\.([0-9][0-9])\.([0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
      d = new Date(RegExp.$1, getIntValue(RegExp.$2)-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
	} else if (/([0-9][0-9])\.([0-9][0-9])\.([0-9][0-9][0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
    	d = new Date(RegExp.$3, getIntValue(RegExp.$2)-1, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
	} else if (/([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
  		var serverTime = getServerTime();
		str = serverTime.split(' ')[0] + " " + str;
		return strToDatetime(str);
	}
	if (d != undefined) {
		return d.getTime();
	}
	return undefined;
}
function getOnePeopleGrowthTime(happiness) {
	if (happiness != 0) {
		return 3600/0.02/happiness*1000;
	}
	return "NaN";
}
function getEstimatedPopulation(population, startTime, currenttime, startHappiness) {
	var happiness = startHappiness;
	startTime = Number(startTime);
	while (happiness > 0) {
		var t = getOnePeopleGrowthTime(happiness);
		if (t == "NaN" || startTime + t > currenttime) break;
		population++;
		happiness--;
		startTime += t;
	}
	return population;
}
function getGrowthRemainingHours(population, maxPopulation, startTime, happiness) {
	if (maxPopulation - population > happiness) {
		return "&#8734; "+texts["h"];
	}
	var time = Number(startTime);
	while (population < maxPopulation) {
		var t = getOnePeopleGrowthTime(happiness);
		if (t == "NaN") {
			return "&#8734; "+texts["h"];
		}
		time += t;
		population++;
		happiness--;
	}
	return floatFormat((time - Number(startTime)) / 1000 / 3600, 1) + " " + texts["h"];
}
function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator) {
	if (showElapsedTime != true) {
		showElapsedTime = false;
	}
	if (elapsedTimeSeparator == undefined) {
		elapsedTimeSeparator = ",";
	}
	var s = new Date();
	s.setTime(time);
	var now = new Date();
	var t = twodigit(s.getHours())+":"+twodigit(s.getMinutes())+":"+twodigit(s.getSeconds());
	if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
		t = s.getFullYear()+"/"+twodigit(s.getMonth()+1)+"/"+twodigit(s.getDate())+" "+ t
	}
	if (showElapsedTime) {
		t += elapsedTimeSeparator;
		var d = (now.getTime() - s.getTime()) / 1000;
		if (d < 3600) {
			t += " " + Math.floor(d / 60) + texts["m"];
		} else {
			if (d >= 86400) {
				t += " " + Math.floor(d / 86400) + texts["day"];
			}
			t += " " + floatFormat((d % 86400) / 3600, 1) + texts["h"];
		}
	}
	return t;
}

// Åã¥Ü¤W¦¸§ó·s¸ê®Æ®É¶¡
function createLastUpdateAsTooltip(content, time, title) {
	title = (title != undefined) ? title+" ("+texts["lastUpdate"]+" "+smartDateFormat(time, true)+")" : texts["lastUpdate"]+" "+smartDateFormat(time, true);
	return createTooltip(content, title);
}

// ¨ú±oªí³æ°Ñ¼Æ
function getFormInput(path, root, isaction) {
	isaction = (isaction == undefined) ? false : true;
	var nodes = $x(path, root);
	if (nodes.length<=0) return null;
	var postdata = nodes[0].name+"="+nodes[0].value;
    for(var i = 1; i < nodes.length; i++) {
    	if (nodes[i].name == "actionRequest" && !isaction) nodes[i].value = actioncode;
    	postdata = postdata +"&" + nodes[i].name+"="+nodes[i].value;
    }
    return postdata;
}