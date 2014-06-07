// ==UserScript==
// @name           Press X to hit ok + kataziel + letztes Dorf
// @namespace      Ninos & Alexander der Große
// @description    Erlaubt das Abschicken von Formularen via einen Tastendruck und auswählen des Kataziels
// @include		http://de*.die-staemme.de/game.php*
// @include		http://ch*.staemme.ch/game.php*
// ==/UserScript==

var unit_presets = {
	// snob
	'Y': {
			'selectAllUnits': false,
			'axe': 200,
			'snob': 1,
			'submit': "attack",
		},
		
	// fake
	'F': {
			'selectAllUnits': false,
			'spy': 50,
			'ram': 1,
			'submit': "attack",
		},
	//Off
	'O': {
			'selectAllUnits': true,
			'spear': 0,
			'sword': 0,
			'archer': 0,
			'heavy': 0,
			'knight': 0,
			'snob': 0,
			'submit': "attack",
		},
	//Def
	'D': {
			'selectAllUnits': true,
			'axe': 0,
			'light': 0,
			'marcher': 0,
			'ram': 0,
			'catapult': 0,
			'knight': 0,
			'snob': 0,
			'submit': "support",
		}
};

String.prototype.trim = function() {return this.replace(/^s+|s+$/g, "");};
document.addEventListener('keyup', aKeyWasPressed, false);

if (document.location.href.indexOf("screen=place") != -1)
{
	pageLoad();
	last_village();
};

function getGameDoc()
{
    getdoc = window.document;
    
    if(!getdoc.URL.match('game\.php'))
	{
        for(var i=0; i<window.frames.length; i++)
		{
            if(window.frames[i].document.URL.match('game\.php'))
			{
                getdoc = window.frames[i].document;
            }
        }
    }
    return getdoc;
}

// handler
function aKeyWasPressed(e)
{
    var key = e.keyCode;
    var thechar = String.fromCharCode(key);
	if (document.location.href.indexOf("screen=info_village") != -1 || document.location.href.indexOf("screen=place") != -1)
	{
		switch (thechar)
		{    
			case "X":
				send_only_away();
				break;
			case "W":
				send_away("wall");
				break;
			case "B":
				send_away("farm");
				break;
			case "Q":
				handler("attack");
				break;	
			case "E":
				handler("support");
				break;
			case "S":
				selectAllUnits();
				handler("attack");
				break;
			case "R":
				village_set(true);
				break;
			case "P":
				village_set(false,500,500);
				break;
			default:
				handle_char(thechar);
				break;
		}
	}
	else {
		if (thechar == "Q") {
			qhandler();
		}
	}
};

function pageLoad()
{

	if (document.location.href.indexOf("coords=") != -1)
	{
		var pattern = /coords=(\d+)\|(\d+)/;
		var m = pattern.exec(document.location.href);
		document.getElementById("inputx").value = m[1];
		document.getElementById("inputy").value = m[2];
	}
};

function qhandler()
{
	var vilidpattern = /village=(\d+)/;
	var m = vilidpattern.exec(document.location.href);
	var selection = GetTextSelection();
	var placeurl = "/game.php?village=" + m[1] + "&screen=place&coords=" + selection;
	
	if (selection != "")
	{
		document.location.href = placeurl;
	}
};

function handler(elementName)
{
	if (elementName == "submit" && document.location.href.indexOf("screen=info_village") != -1)
	{
		var links = document.getElementsByTagName("a");
		for (var i = 0;i<links.length;i++)
		{
			if (links[i].href.indexOf("&screen=place&mode=command&target=") != -1)
			{
				document.location.href = links[i].href;
			}
		}
	}
	else
	{
		document.getElementsByName(elementName)[0].click();
	}
};

function handle_char(thechar)
{
	if (unit_presets[thechar] != null) {
		for (var name in unit_presets[thechar]) {
			if (name != "submit" && name != "selectAllUnits")
			{
			insert_unit(name, unit_presets[thechar][name])
			}
			else if (name == "selectAllUnits")
			{
				if (unit_presets[thechar][name] == true)
				{
					selectAllUnits();
				}
			}
			else if (name == "submit")
			{
			var handle_char_submit = unit_presets[thechar][name];
			}
		}
	handler(handle_char_submit);
	}
};

function insert_unit(unit, amount)
{
	document.getElementsByName(unit)[0].value = amount;
};

function GetTextSelection()
{
	var userSelection = "";
	if (window.getSelection)
	{
		userSelection = window.getSelection();
	}

	return userSelection;
};

function checkBrowserName(name)
{  
	var agent = navigator.userAgent.toLowerCase();  
	if (agent.indexOf(name.toLowerCase())>-1)
	{  
		return true;  
	}  
	return false;  
};

function selectAllUnits()
{
	if (checkBrowserName('firefox'))
	{
		unsafeWindow.selectAllUnits(true);
	}
	else if (checkBrowserName('Opera'))
	{
		selectAllUnits(true);
	}
};

function send_only_away(e)
{
    doc = getGameDoc();
    doc.getElementsByName("submit")[0].click();
};

function send_away(building)
{
    doc = getGameDoc();
    doc.getElementsByName("building")[0].value = building;
    doc.getElementsByName("submit")[0].click();
};

function last_village()
{
	var $x = function(p, context)
	{
		if(!context)
			context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	};
	
	if(/screen=place&try=confirm/.test(location.href))
	{
		var form = $x('//form[contains(@action,"screen=place") and contains(@action,"action=command") and contains(@action,"h=")]');
		if(form.length > 0)
		{
			form[0].addEventListener('submit', function(evt)
			{
				var link = $x('//a[contains(@href,"screen=info_village") and contains(@href,"id=")]');
				var coords = /\((\d+\|\d+)\)/.exec(link[0].textContent);
				if(!coords)
					coords = /\((\d+\:\d+:\d+)\)/.exec(link[0].textContent);
				document.cookie = "lastCoords=" + coords[1];
			}, false);
		}
	}
	else if(/screen=place/.test(location.href))
	{
		var coords = /lastCoords=(\d+)\|(\d+)/.exec(document.cookie);
		if(!coords)
			coords = /lastCoords=(\d+)\:(\d+):(\d+)/.exec(document.cookie);
	}
};

function village_set(last_village,coords_x,coords_y)
{
	if(last_village == true)
	{
		var coords = /lastCoords=(\d+)\|(\d+)/.exec(document.cookie);
		document.getElementById('inputx').value = coords[1];
		document.getElementById('inputy').value = coords[2];
	}
	else
	{
		document.getElementById('inputx').value = coords_x;
		document.getElementById('inputy').value = coords_y;
	}
};