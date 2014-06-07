// ==UserScript==
// @name           Mission Info Logger
// @namespace      Ranatama
// @description    Records and displays running totals of mission rewards.
// @include        http://*animecubed.com/billy/bvs/missions/mission1.html
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

//To Do Later: Expand script into Mission Logger, allow
//End of Day summary of what you gained from missions.

try {
	ScriptUpdater.check(84799);
} catch(e) { };



/***************************************************************
* DOM Storage Wrapper Class
* 
* Public members:
*     ctor({"session"|"local"}[, <namespace>])
*     setItem(<key>, <value>)
*     getItem(<key>, <default value>)
*     removeItem(<key>)
*     keys()
***************************************************************/
function Storage(type, namespace) {
	var object = this;

	if(typeof(type) != "string")
		type = "session";

	switch(type) {
		case "local": {
			object.storage = localStorage;
		} break;

		case "session": {
			object.storage = sessionStorage;
		} break;

		default: {
			object.storage = sessionStorage;
		} break;
	}

	if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
		namespace = "ScriptStorage";

	object.namespace = [namespace, "."].join("");

	object.setItem = function(key, value) {
		try {
			object.storage.setItem(escape([object.namespace, key].join("")), uneval(value));
		}
		catch(e) {
		}
	}

	object.getItem = function(key, defaultValue) {
		try {
			var value = object.storage.getItem(escape([object.namespace, key].join("")));
			if(value)
				return eval(value);
			else
				return defaultValue;
		}
		catch(e) {
			return defaultValue;
		}
	}

	object.removeItem = function(key) {
		try {
			object.storage.removeItem(escape([object.namespace, key].join("")));
		}
		catch(e) {
		}
	}

	object.keys = function() {
		var array = [];
		var i = 0;
		do {
			try {
				var key = unescape(object.storage.key(i++));
				if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
					array.push(key.slice(object.namespace.length));
			}
			catch(e) {
				break;
			}
		} while(true);
		return array;
	}
}



// UI  http://userscripts.org/users/dtkarlsson
function Window(id, storage)
{
	var my = this;
	
	my.id = id;
	
	// Window dragging events
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;
	my.drag = function(event) {
		if (my.moving) {
			my.element.style.left = (event.clientX - my.offsetX)+'px';
			my.element.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	}
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.element.style.left);
			var y = parseInt(my.element.style.top);
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.element.style.opacity = 1;
			window.removeEventListener('mouseup', my.stopDrag, true);
			window.removeEventListener('mousemove', my.drag, true);
		}
	}
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.element.style.left);
		my.offsetY = event.clientY - parseInt(my.element.style.top);
		my.moving = true;
		my.element.style.opacity = 0.75;
		event.preventDefault();
		window.addEventListener('mouseup', my.stopDrag, true);
		window.addEventListener('mousemove', my.drag, true);
	}

	my.element = document.createElement("div");
	my.element.id = id;
	document.body.appendChild(my.element);
	my.element.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.element.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.element.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.element.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.element.style.top = "6px";

}
//Text functions and styling by TheSpy
function FloatingSummary()
{
	var my = this;

	my.window = new Window("floatingsummary", summarySettings);

	// Set up floating summary
	GM_addStyle("#floatingsummary {border: 2px solid #00FF00; position: fixed; z-index: 100; font-size: 12px; font-family: courier new; color: #00FF00; background-color: black; padding: 6px; text-align: left; min-height: 16px; cursor: move;} #floatingsummary div div {border: 2px solid #00FF00; margin-top: 6px;}");

my.addText = function(text) {
		if(my.window.element.innerHTML.length > 0)
			my.window.element.innerHTML = [my.window.element.innerHTML, text].join("<br/>");
		else
			my.window.element.innerHTML = text;
	}

	my.setText = function(text) {
		my.window.element.innerHTML = text;
	}

}

function MissionLogger(){
	var my = this;
	
	my.getPlayer = function(){
		return summarySettings.getItem("player");
	}
	my.setPlayer = function(player){
		summarySettings.setItem("player", player);
	}
	my.getDate = function(){
		return summarySettings.getItem("date");;
	}
	my.setDate = function(curdate){
		summarySettings.setItem("date",curdate);
	}
	my.reset = function(){
		summarySettings.setItem("ryo",0);
	}
	my.getRyo = function(){
		var pageType = document.evaluate("//td/i/b", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if(pageType != null){
		if(pageType.innerHTML == "Received:"){

			var ryoresult = document.evaluate("//td[1]/table[3]//td[1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

			var ryoraw = ryoresult.innerHTML;
			var ryoskim = ryoraw.slice(ryoraw.indexOf("+") + 1,ryoraw.indexOf(" Ryo"));

			var ryo = parseInt(ryoskim.replace(",",""));
			var oldryo = parseInt(summarySettings.getItem("ryo"));
			summarySettings.setItem("ryo", ryo + oldryo);
		}
		}
	}		
}


var summarySettings = new Storage("local", "MissionRyoCounter");
var summaryWindow = new FloatingSummary();
var summaryLogger = new MissionLogger();

var rightnow = new Date();

var player = document.evaluate("//tr[2]/td/font/b", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var currentPlayer = player.innerHTML;



if(summaryLogger.getDate() != rightnow.getDate()){
	summaryLogger.reset();
	summaryLogger.setDate(rightnow.getDate());
}
if(summaryLogger.getPlayer() != currentPlayer){
	summaryLogger.reset();
	summaryLogger.setPlayer(currentPlayer);
}

summaryLogger.getRyo();


summaryWindow.setText("Personal Ryo Total Today: " + summarySettings.getItem("ryo",0));
