// ==UserScript==

// @name           Ogame MO
// @namespace      dk.apinx
// @run-at         document-end
// @author         iteabag
// @description    Ogame mine optimization
// @version		   0.3.2.0110
// @updateURL      http://userscripts.org/scripts/show/128361

// @include        http://*.ogame.*/game/index.php?page=resources*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


var universe = $("meta[name=ogame-universe]").attr("content");

var user = GM_getValue(universe+"user");
var pass = GM_getValue(universe+"pass");

if(user == undefined) {
	GM_log("user was undefined");
	setSubmit();

} else {
	checkPlanet();
}

function showInputToUser() {
	var user_input = '<div id="mo_inputs">Create user/login.<br>(Please pick different username for each uni.<br>User/pass should be different from ogame-account. <br>User:<input style="width: 50px; border: 1px solid black;" type="text" id="mo_user">';
	var pass_input = 'Pass:<input style="width: 50px; border: 1px solid black;" type="text" id="mo_pass">';
	var submit_input = '<input style= border: 1px solid black;" type="submit" value="Submit" id="mo_submit"></div>';

	

	showUser(user_input+pass_input+submit_input);
}

function setSubmit() {
	var submit = document.getElementById("mo_submit");
	if(submit == undefined) {
		GM_log("Cant find submit button");
		showInputToUser();
		setTimeout(setSubmit, 1000);
	} else {
		submit.addEventListener('click', setVals, false);
	}
}

function setMenuButton() {
	var menuTable = document.getElementById("menuTable");
	if(menuTable != undefined) {
		var mydiv = document.createElement('li');
		mydiv.innerHTML = ' <a class="menubutton" href="http://apinx.dk/ogame_public" accesskey="" target="_blank"><span class="textlabel">Mining</span></a>';
		menuTable.appendChild(mydiv);
	} else {
		setTimeout(setMenuButton, 500);
	}

}

function setVals() {
	user = document.getElementById("mo_user").value;
	pass = document.getElementById("mo_pass").value;

	GM_log("Setting user/pass values");

	GM_setValue(universe+"user", user);
	GM_setValue(universe+"pass", pass);

	$("#mo_inputs").hide();

	checkPlanet();
}





function checkPlanet() {
	GM_log("Checking planet");

	if($("meta[name=ogame-planet-type]").attr("content") == undefined) {
		setTimeout(checkPlanet, 1000);
	} else if($("meta[name=ogame-planet-type]").attr("content") == "planet") {
		//Dont add moons.
		login_uni();
	} else {	
		GM_log("Wasnt a planet, was: "+$("meta[name=ogame-planet-type]").attr("content"));
	}
	
}


function login_uni() {
	var extra = "";
	extra += "login=true";
	extra += "&user="+user;
	extra += "&pass="+pass;

	GM_log("Trying to log in");

	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://remote.apinx.dk/ogame_public/remote_login.php',
		data: extra,
		headers: {
		 "Content-Type": "application/x-www-form-urlencoded"
		},

		onload: function handleResponse(response) {
			GM_log("Got response: "+response.responseText);

			switch(response.responseText) {
				case "ack":
					getNextMine();
					break;
				case "ut":
					showUser("Fail: Username taken");
					GM_deleteValue(universe+"user");
					GM_deleteValue(universe+"pass");
					break;
				case "ea":
					showUser("Fail: Username/password was empty");
					GM_deleteValue(universe+"user");
					GM_deleteValue(universe+"pass");
					break;
				default:
					showUser("Connection error, please wait.");
				
			}
		}
	});
}




/*
	Does the AJAX request to the server for the next mine.
	The server uses this information to update DB about the mines
	and the other generel information sent.
*/
function getNextMine() {
	var levels = document.getElementsByClassName("level");

	var metal_level = getLevelFromSpan(levels[0]);
	var crystal_level = getLevelFromSpan(levels[1]);
	var deut_level = getLevelFromSpan(levels[2]);


	var extra = "m="+metal_level;
	extra += "&c="+crystal_level;
	extra += "&d="+deut_level;
	extra += "&p="+$("meta[name=ogame-planet-id]").attr("content");
	extra += "&n="+$("meta[name=ogame-planet-name]").attr("content");
	extra += "&s="+$("meta[name=ogame-universe]").attr("content");
	extra += "&coord="+$("meta[name=ogame-planet-coordinates]").attr("content");
	extra += "&temp="+getTemp();

	GM_log("Sending mine request: "+extra);

	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://remote.apinx.dk/ogame_public/nextmine.php',
		data: extra,
		headers: {
		 "Content-Type": "application/x-www-form-urlencoded"
		},

		onload: function handleResponse(response) {
			GM_log("Got reply on request: "+response.responseText);

			switch(response.responseText) {
				case "m":
				case "c":
				case "d":
					process(response.responseText);
					break;
				case "t":
					set_temp();
					break;
				case "e":
					internal_error();
					break;
				default:
					please_login();
			}

		}
	});
}



/*
	Big thanks to: Vess
		http://userscripts.org/scripts/show/81699 - OGame Redesign: Missing Sats
	For temperature extraction.
*/
function getTemp() {
	var activePlanets = document.getElementsByClassName ("planetlink active");
	if ((activePlanets == null) || (typeof (activePlanets) == "undefined"))
		return -999;
	if (activePlanets.length < 1)
	{
		activePlanets = document.getElementsByClassName ("planetlink");
		if (activePlanets.length != 1)
			return -999;
	}
	var theNumbers = activePlanets [0].title.split (/[^\d.-]+/);
	if (theNumbers.length < 2)
		return;
	return parseInt (theNumbers [theNumbers.length - 2]) - 20;
	 
}

function internal_error() {
	showUser('Internal error');

}
function set_temp() {
	showUser('<a style="color: white;" target="_blank" href="http://public.apinx.dk/ogame_public/mineEfficiency.php?get=settings">Please set planet temperature here</a>');
}
function please_login() {
	showUser('<a style="color: white;" target="_blank" href="http://apinx.dk/ogame_public">Please login here</a>');
}

function showUser(txt) {
	$("#planet").append('<div style="position: absolute; left: 50px; bottom: 10px; color: white;">MineOptimization: '+txt+'</div>');

}


function process(text_string) {
	var id = -1;
	
	switch(text_string) {
		case "m": id = 1; break;
		case "c": id = 2; break;
		case "d": id = 3; break;

	}
	if(id > 0) {
		$("#button"+id).append('<div style="padding: 1px; color: #cccccc; position: absolute; left: 0; bottom:0;"><img alt="" src="http://apinx.dk/ogame_public/mining/next.gif"></div>');
	}	
}


function getLevelFromSpan(span_elem) {
	var textLabel = span_elem.getElementsByClassName("textlabel");
	if(textLabel.length == 0) {
		return parseInt(span_elem.innerHTML) + 1;
	} else {
		var pclone = textLabel[0].cloneNode(true)
		span_elem.removeChild(textLabel[0]);
		var level =  parseInt(span_elem.innerHTML);
		span_elem.appendChild(pclone);
		return parseInt(level);
	}
}


setMenuButton();

onload=function(){
	if (document.getElementsByClassName == undefined) {
		document.getElementsByClassName = function(className)
		{
			var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
			var allElements = document.getElementsByTagName("*");
			var results = [];

			var element;
			for (var i = 0; (element = allElements[i]) != null; i++) {
				var elementClass = element.className;
				if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
					results.push(element);
			}

			return results;
		}
	}
}

