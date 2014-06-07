// ==UserScript==
// @name           Grepolis map tools
// @namespace      Grepolis
// @description    Integrate the map into Grepolis
// @include        http://*.grepolis.*/g*
// @include        http://www.barski.org/grepo*/*
// @require        http://usocheckup.dune.net/69410.js?method=install
// ==/UserScript==
appendScript("http://www.barski.org/grepomap/maptools.js", "script", "text/javascript", "src");

function appendScript(url, tag, type, srcattr, extraAttr, extraVal) {
	var ui_script = document.createElement(tag);
	ui_script.setAttribute(srcattr, url);
	ui_script.type = type;
	if (extraAttr != null) {
		ui_script.setAttribute(extraAttr, extraVal);
	}
	document.getElementsByTagName('head')[0].appendChild(ui_script);
};


if ((typeof GM_setValue) != "undefined") {
	saveValue = GM_setValue;
} else {
	saveValue = Set_Cookie;
}

if ((typeof GM_getValue) != "undefined") {
	loadValue = GM_getValue;
} else {
	loadValue = Get_Cookie;
}
	
function warten() {
	if (typeof unsafeWindow.ausfuehren == "undefined") {
		window.setTimeout(warten, 100);
		return;
	}
	var w = {};
	window.setTimeout(function() {
		unsafeWindow.ausfuehren();
	}, 0);
	
}

var JSON = JSON || {};
// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {

	var t = typeof (obj);
	if (t != "object" || obj === null) {

		// simple data type
		if (t == "string") obj = '"'+obj+'"';
		return String(obj);

	}
	else {

		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);

		for (n in obj) {
			v = obj[n]; t = typeof(v);

			if (t == "string") v = '"'+v+'"';
			else if (t == "object" && v !== null) v = JSON.stringify(v);

			json.push((arr ? "" : '"' + n + '":') + String(v));
		}

		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};

// implement JSON.parse de-serialization
JSON.parse = JSON.parse || function (str) {
	if (str === "") str = '""';
	eval("var p=" + str + ";");
	return p;
};


var config = { 
	name: "mapConfig", 
	data: JSON.parse(loadValue("mapConfig")), 
	alt:  JSON.parse(loadValue("mapConfig"))
};
observe(config);
warten();


function observe(p) {
	var d = document.getElementById(p.name+"_observer");
	if (d == null) {
		d = document.createElement("div");
		d.style.display = 'none';
		d.setAttribute("id", p.name+"_observer");
		var f = JSON.stringify(p);
		d.appendChild(document.createTextNode(f));
		document.getElementsByTagName("body")[0].appendChild(d);
	} else {
		var r = JSON.parse(d.innerHTML);
		if (JSON.stringify(r.alt) != JSON.stringify(r.data)) {
			saveValue(r.name, JSON.stringify(r.data));
			r.alt = r.data;
			d.innerHTML = JSON.stringify(r);
		}
	}
	window.setTimeout(function(){observe(p);}, 200);
	return;
}


function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { 
		for(var item in arr) {
			var value = arr[item];
		
			if(typeof(value) == 'object') { 
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { 
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
