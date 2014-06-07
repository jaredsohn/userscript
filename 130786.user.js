// ==UserScript==
// @name       DS-VillSwitch
// @namespace  http://www.braincompiler.de/
// @version    0.2
// @description  switch your viallges
// @match      http://*.die-staemme.de/*
// @copyright  2012+, Loescher, Sebastian
// ==/UserScript==
var CurrentUrl = window.location.href;

function setToolbar() {
	if (typeof GM_deleteValue == 'undefined') {
		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}

	if(CurrentUrl.indexOf("village") != -1) {
		var CurrentVillage = CurrentUrl.split("village=")[1].split("&")[0];
		var CurrentVillageName = document.getElementById("menu_row2_village").getElementsByTagName("a")[0].innerHTML;
		var CurrentServer = CurrentUrl.split(".")[0];
		var SaveName = "ds-" + CurrentServer;


		if( GM_getValue( SaveName ) == undefined ) {
			GM_setValue( SaveName, CurrentVillage + ":" + CurrentVillageName );
		} else {
		  var t = GM_getValue( SaveName );
			if( t.indexOf( CurrentVillage ) == -1 ) {
			  t += ( ";" + CurrentVillage + ":" + CurrentVillageName );
			}
		  var Villages = t.split(";");    
		  GM_setValue(SaveName, t);
		}

		var ToolBar = document.createElement("tr");
		var ToolBarTd = document.createElement("td");
		ToolBarTd.setAttribute("colspan", "4");
		ToolBarTd.setAttribute("style", "padding-bottom: 10px;");

		var List = document.createElement("ul");
		List.setAttribute("class", "box");
		List.setAttribute("style", "list-style-type: none;margin: 0px;padding: 2px;");

		for( var i = 0; i < Villages.length; i++ ) {
			var li = document.createElement("li");
			li.setAttribute("style", "float:left;margin-left: 10px;");
			var a = document.createElement("a");
			a.href = CurrentUrl.split("village=")[0] + "village=" + Villages[i].split(":")[0] + CurrentUrl.split("village=")[1].replace(CurrentVillage, "");
			a.innerHTML = Villages[i].split(":")[1];
			if( Villages[i].split(":")[1] == CurrentVillageName ) {
				a.setAttribute('style', 'color: red;');
			}
			
			li.appendChild(a);
			List.appendChild(li);
		}

		var li = document.createElement("li");
		li.setAttribute("style", "clear:left;");
		List.appendChild(li);

		ToolBarTd.appendChild(List);
		ToolBar.appendChild(ToolBarTd);

		document.getElementById("header_info").getElementsByTagName("tbody")[0].appendChild(ToolBar);
	}
}

window.onload = setToolbar;