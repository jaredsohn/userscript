// ==UserScript==
// @name           BatchBuildTest
// @namespace      http://userscripts.org 
// @description    Batch Build
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        0.1
// ==/UserScript==


function addInlineJavascript1(content) {
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
	script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2');
	head.appendChild(script);


}


function initBatch() {
	if (typeof (MCS) == 'undefined' || MCS.getPlayerData() == null) {
		window.setTimeout("initBatch()", 250);
		return;
	}
	setTimeout("BatchBuildMenuItem();", 1000);

}

function BatchBuildMenuItem() {
	$('body').append('<div id="#MCStoolsBatch" style="left: 470px; top: 8px; width: 85px; display: block; position: absolute; z-index: 2000;"> <a href="javascript:BatchBuild();" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">BatchBuild</a></div>');
}

function BatchBuild() {
	var buildingType = prompt("What type of building you like to build? \n \
6-Green House ($50K) \n \
7-City Centre Cottage ($75K) \n \
8-Cane Top Multiplex ($150K) \n \
9-The Sentinel ($175K) \n \
10-High Reach Place ($200K) \n \
11-Nova Tower Block ($300K) \n \
12-Polyhedron Plaza ($400K) \n \
13-The Grid Building ($500K) \n \
14-Four Sided Fortress ($600K) \n \
15-Nori Place ($750K) \n \
16-Honeycomb Complex ($900K) \n \
17-Blanco Bastion ($1.1M) \n \
18-The Photat Building ($1.5M) \n \
19-Cubic Quarters ($2M) \n \
20-Opaque Overlook ($2.8M) \n \
21-Tri-rectangle Tower ($3.9M) \n \
22-Spear End Summit ($5M) \n \
23-Unbounded Megaplex ($6M) \n \
24-Hammer Head House ($7M) \n \
25-Tobo Place ($8.4M) \n \
26-Hips Plaza ($10M) \n \
27-Difo Square ($12M) \n \
28-Brouette Tower ($15M) \n \
29-Blemith Centre ($19M) \n \
30-Graduating Megastructure ($24M) \n \
31-Sky High Tower ($30M) \n \
32-MONOPOLY Tower ($100M)", "6");
var count = prompt("How many?", "10")
	if (!buildingType) return;
	var wnd = getProgressWindow();
	wnd.init(buildingType, count);
	wnd.start();
}

function getProgressWindow() {
	var wnd = document.getElementById('buildProgress');
	if (!wnd) {
		wnd = document.createElement('span');
		wnd.id = 'buildProgress';
		wnd.innerHTML = '<div style="width:250px; border: 1px solid black; padding: 5px; background-color: white; position: absolute; left: 20px; bottom: 120px;"><div id="p-close" style="position: absolute; top: 1px; right: 1px; cursor: pointer;" title="close">[x]</div><div id="progress-title">Building type: <span id="p-type"> </span><br/>Progress: <span id="p-current"> </span> of <span id="p-max"> </span><br/>Status: <span id="p-status"> </span></div>Log:<div id="p-log" style="overflow-y: scroll; height: 100px; font-size: x-small;"></div></div>';
		document.getElementsByTagName('body')[0].appendChild(wnd);
	}
	return new AutoBuildWindow(wnd);
}

function AutoBuildWindow(elm) {
	var wnd = elm;
	var title = $(wnd).find("#progress-title");
	function setTitle(key, value) {
		title.find("#p-" + key).html(value);
	}
	var max = getInt($(wnd).find("#progress-title").find("#p-max").text());
	var buildingType = getInt($(wnd).find("#progress-title").find("#p-type").text());
	var current = getInt($(wnd).find("#progress-title").find("#p-current").text());
	var streetData = MCS.STREET.getStreetData();
	var player = MCS.getPlayerData();

	if (current == "")
		current = 0;
	this.init = function(t, m) {
		buildingType = t;
		current = 0;
		max = m;
		this.refreshView();
		$(wnd).find("#p-log").html("");
		$(wnd).show();
		return this;
	}
	this.refreshView = function() {
		setTitle("type",buildingType);
		setTitle("current", current);
		setTitle("max", max);
		return this;
	}
	this.start = function() {
		this.refreshView();
		setTitle("status", "running");
		if (current == 0) 
			this.log("Starting to build up to <b>" + max + "</b> buildings of type [<b>" + buildingType + "</b>].", true);
		else if (current > 0)
			this.log("Resuming to build up to <b>" + max + "</b> buildings of type [<b>" + buildingType + "</b>] form position #" + current +  ".", true);
		//AutoBuildInternal(buildingType, 1, 2, 3);
		MCS.LOADING.show();
		AutoBuildInternal(buildingType, streetData.id, player.nickname, player.hash);
		return this;
	}
	this.added = function(id) {
		current++;
		setTitle("current", current);
		this.log("success!", true);
		return this;
	}
	this.next = function() {
		if (current < max) {
			//this.log("moving to next: " + buildingType + "," + streetData.id + "," + player.nickname + "," + player.hash, true);
			setTimeout("AutoBuildInternal(" + buildingType + ", '" + streetData.id + "','" + player.nickname + "','" + player.hash + "');", 400); //setTimeout("AutoBuildInternal(1,2,3,4);", 400); //
		}
		else {
			this.log("Done.", true);
			MCS.LOADING.hide();
			setTitle("status", "finished");
		}
		return this;
	}
	this.pause = function() {
		setTitle("status", "paused. click to resume.").click(this.start);
		MCS.LOADING.hide();
		return this;
	}
	this.close = function() {
		max = -1;
		$(wnd).hide();
		return this;
	}
	this.log = function(s, newLine) {
		var logger = $(wnd).find("#p-log");
		var str = logger.html();
		str += s;
		if (newLine) str += "<br/>";
		logger.html(str);
		return this;
	}
	$(wnd).find("#p-close").click(this.close);
	function getInt(val) {
		if (!val || val == "")
			return 0;
		else
			return parseInt(val);
	}
}


function AutoBuildInternal(buildingType, streetId, nickname, hash) {
	if (!buildingType) return;

	function GetFirstFreeConeNumber(data) {
		for (var i in data) { if (data[i]) return i; }
		return -1;
	}
	$.ajax(
		{
			url: "/build/getlocations",
			cache: false,
			data: {
				id: streetId,
				type: buildingType
			},
			dataType: "json",
			success: function(data, status) {
				var FreeCone = GetFirstFreeConeNumber(data); if (FreeCone >= 0) {
					getProgressWindow().log("Trying to build at cone #" + FreeCone + "... ");
					$.ajax({ url: "/negotiate/buybuilding", type: "post", data: { nickname: nickname, hash: hash, id: streetId, type: buildingType, loc: FreeCone }, dataType: "json",
						success: function(buildData, status) {
							if (buildData) {
								var progress = getProgressWindow();
								progress.added();
								if (buildData.c) {
									progress.log("Got chance card! c:" + buildData.c + " || " + streetId, true);
									progress.pause();
									MCS.CHANCE.take(buildData.c, streetId);
								}
								else { progress.next(); }
							}
							else { 
								var progress = getProgressWindow();
								progress.log("error: no data returned!<br/>not enough money? o_Oa", true);
								progress.pause();
								MCS.ALERT.show(FreeCone, "error: " + parseInt(FreeCone) + status);
							}
						}
					})
				}
			}
		}
	);
}


addInlineJavascript1(initBatch);
addInlineJavascript1(BatchBuild);
addInlineJavascript1(getProgressWindow);
addInlineJavascript1(AutoBuildWindow);
addInlineJavascript1(AutoBuildInternal);
addInlineJavascript1(BatchBuildMenuItem);
initBatch();