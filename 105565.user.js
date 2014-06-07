// ==UserScript==
// @name			Pardus Forum Hitman
// @version			v9
// @namespace		marnick.leau@skynet.be
// @description		Getting sick of some of *those* forum topics too?
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://forum.pardus.at/
// @include			http*://forum.pardus.at/index.php
// @include			http*://forum.pardus.at/index.php?showforum=*
// @include			http*://forum.pardus.at/index.php?showtopic=*
// @include			http*://*.pardus.at/options.php
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_addStyle
// ==/UserScript==

// <!-- Standard variables -->

var script = {
	"name":"Pardus Forum Hitman",
	"id":30156383479764315,
	"version":7,
	"imghost":"http://s1135.photobucket.com/albums/m626/TheRealFaziri/Pardus/",
	"datahost":"https://dl.dropbox.com/u/3357590/Userscripts/",
}

script.imgpath = script.name + "/";
script.datapath = script.name.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

// <!-- Global variables -->


if (document.location.hostname.match(/orion|artemis|pegasus/i) !== null) {
	var uni = document.location.hostname.match(/orion|artemis|pegasus/i)[0].toLowerCase();
} else {
	var uni = document.links[9].innerHTML.toLowerCase();
}
var universes = ["orion","artemis","pegasus"];

// <!-- End of global variables -->

// <!-- Defaults and update handling -->

var defprefs = {
	"topicblock":{
		"value":[],
		"info":"topics to block",
		"v":1
	},
	"topicignore":{
		"value":[],
		"info":"topics to allow, even if blacklisted",
		"v":1
	},
	"playerblock":{
		"value":[],
		"info":"players to block",
		"v":1
	},
	"playerignore":{
		"value":[],
		"info":"players to allow, even if blacklisted",
		"v":1
	},
	"excuses":{
		"value":["Error 404","Data Error","Blocked","Censored","Quarantined","Top Secret","HTML Corrupted","Access Denied","Keep Out","Danger Zone"],
		"info":"excuses to display",
		"v":2
	},
	"download":{
		"value":true,
		"info":"enable downloadable blacklist",
		"v":1
	}
};

var prefs = null;
try {
	prefs = JSON.parse(GM_getValue("prefs"));
} catch(error) {
	if (location.href.indexOf("/options.php") === -1) {
		document.body.innerHTML = "<br><blink style=\"color: red;\">" + script.name + " data error.<br>Please visit the Options page and look for the settings panel. Changing any settings will cause a data overwrite and should fix this.</blink>" + document.body.innerHTML;
	}
	prefs = defprefs;
}

if (location.href.indexOf("/options.php") !== -1) {
	var vanalysis = "version ok";
	var vcheck = true;
	var checkv = GM_getValue("version");
	if (checkv !== script.version) {
		vcheck = false;
	}
	
	var prefanalysis = "settings ok";
	var prefcheck = true;
	var checkpref = GM_getValue("prefs");
	try {
		let temp = JSON.parse(checkpref);
	} catch(error) {
		prefcheck = false;
	}
	
	if (vcheck === false) {
		if (typeof(checkv) === "number") {
			if (checkv < script.version) {
				vanalysis = "up";
			} else {
				vanalysis = "down";
			}
			vanalysis += "dating v" + checkv + " to v" + script.version;
		} else {
			if (checkv === undefined) {
				vanalysis = "fresh install or corrupt version data";
			} else {
				vanalysis = "garbage version data";
			}
		}
	}
	
	if (prefcheck === false) {
		prefanalysis = "settings corrupted or missing";
		prefs = defprefs;
	} else {
		prefs = JSON.parse(GM_getValue("prefs"));
	}
	
	if (vcheck === false || prefcheck === false) {
		if (prompt(script.name + " maintenance cycle has been triggered.\nAnalysis: " + vanalysis + " - " + prefanalysis + ".\n\nBelow are your current settings (if any). Please copy-paste the code and keep it safe if you believe you can extract important information from it or if you wish to restore these settings at a later time. They will most likely be erased shortly.\n\nIf you accept this dialog, your saved data will be processed automatically to ensure proper functioning. Incompatible or unreadable entries will be deleted or reset to default.\nDismiss/deny this dialog if you want to continue in a temporary mode with the default settings and leave the saved data as it is, readable/compatible or not. In this mode, the panel itself will not be functional and you'll have to reload the page, then accept the dialog to activate it.",GM_getValue("prefs","")) !== null) {
			for (var prop in defprefs) {
				if (prefs[prop] === undefined || prefs[prop].v < defprefs[prop].v) {
					prefs[prop] = defprefs[prop];
				}
			}
			
			for (var prop in prefs) {
				if (defprefs[prop] === undefined) {
					delete prefs[prop];
				}
			}
			
			GM_setValue("prefs",JSON.stringify(prefs));
			GM_setValue("version",script.version);
		} else {
			prefs = defprefs;
		}
	}
}

// <!-- End of defaults and update handling -->

// <!-- prefspanelGM -->

function prefspanelGM(infohtml) {
	var propuni = "";
	var propunindex = -1;
	var renderpref = true;
	var prefshtml = "";
	var otherunis = universes;
	otherunis.splice(universes.indexOf(uni),1);
	var otherunipref = new RegExp("(" + otherunis.join("|") + ")$");
	for (var prop in prefs) {
		if (prop.match(otherunipref) === null) {
			renderpref = true;
		} else {
			renderpref = false;
		}
		
		if (renderpref === true) {
			prefshtml += "<tr><td style=\"font-size: x-small;\" title=\"variable name\"><i>" + prop.replace(new RegExp(uni + "$"),"") + "</i></td><td style=\"font-size: x-small;\" title=\"variable description\">" + prefs[prop].info + "</td><td align=\"center\">";
			switch(typeof(prefs[prop].value)) {
				case "string":
					prefshtml += "<input type=\"text\" size=\"30\" value=\"" + prefs[prop].value + "\"";
					break;
		 
				case "number":
					prefshtml += "<input type=\"text\" size=\"30\" value=\"" + prefs[prop].value + "\"";
					break;
		 
				case "boolean":
					prefshtml += "<input type=\"checkbox\"" + [" checked=\"checked\"",""][[true,false].indexOf(prefs[prop].value)];
					break;
		 
				case "object":
					prefshtml += "<textarea cols=\"18\" rows=\"2\"";
					break;
		 
				default:
					prefshtml += "<input type=\"text\" size=\"30\" value=\"Variable type not recognized\"";
					break;
			}
			prefshtml += " id=\"" + script.name + "_" + prop + "\" onchange=\"savescriptvarsGM['" + script.id + "']('" + script.name + "','" + prop + "');\" alt=\"" + typeof(prefs[prop].value) + "\">";
			if (typeof(prefs[prop].value) !== "object") {
				prefshtml += "</input>";
			} else {
				prefshtml += prefs[prop].value.join('\n') + "</textarea>";
			}
			prefshtml += "</td><td id=\"save_" + script.name + "_" + prop + "\" style=\"text-align: center;\">...</td></tr>";
		}
	}
	
	if (unsafeWindow.savescriptvarsGM === undefined) {
		unsafeWindow.savescriptvarsGM = {};
	}
	unsafeWindow.savescriptvarsGM[script.id] = function(script,prop) {
		setTimeout(function() {
			if (saving === true) {
				clearTimeout(savingtimer);
			}
			var prefs = JSON.parse(GM_getValue("prefs"),JSON.stringify(defprefs));
			var input = document.getElementById(script + "_" + prop);
			var saved = false;
			if (input.alt === "string") {
				prefs[prop].value = input.value;
				saved = true;
			}
			if (input.alt === "number") {
				let temp = input.value.match(/[0-9]+(\.)?[0-9]*/);
				if (temp !== null) {
					prefs[prop].value = parseFloat(temp.join(""));
					input.value = prefs[prop].value;
					saved = true;
				} else {
					input.value = prefs[prop].value;
				}
			}
			if (input.alt === "boolean") {
				prefs[prop].value = input.checked;
				saved = true;
			}
			if (input.getAttribute('alt') === "object") {
				if (input.value === "") {
					prefs[prop].value = [];
				} else {
					prefs[prop].value = input.value.split('\n');
				}
				saved = true;
			}
	 
			GM_setValue("prefs",JSON.stringify(prefs));
			GM_setValue("welcomecheck",true);
			
			var saving = true;
			var saver = input.parentNode.nextSibling;
			saver.innerHTML = "<font style=\"color: " + ["green","red"][[true,false].indexOf(saved)] + "; font-weight: bold;\">" + ["Saved!","Error"][[true,false].indexOf(saved)] + "</font>";
			var savingtimer = setTimeout(function() {
				saver.innerHTML = "...";
				saving = false;
			},1000);
		},1);
	}
	
	if (unsafeWindow.overwritescriptvarsGM === undefined) {
		unsafeWindow.overwritescriptvarsGM = {};
	}
	unsafeWindow.overwritescriptvarsGM[script.id] = function(script,prop) {
		setTimeout(function() {
			var code = prompt("Enter the new preferences here or edit this text manually. Leave the textfield blank to reset everything to default.\nPlease note that the maintenance cycle may be triggered next time depending on what you are doing.\nThe page will be reloaded so that the overwriting can be applied.",GM_getValue("prefs"));
			if (code === "") {
				code = JSON.stringify(defprefs);
			}
			try {
				let temp = JSON.parse(code);
			} catch(error) {
				alert(error + "\nThe data you entered will be forcibly saved.");
			}
			GM_setValue("prefs",code);
			document.location.href = document.location.href;
		},1);
	}

	var table = document.getElementsByTagName('th')[0].parentNode.parentNode.parentNode;
	var spacer = document.createElement('div');
	spacer.innerHTML += "<br><br>";
	table.parentNode.appendChild(spacer);
	
	var panel = table.cloneNode(false);
	panel.innerHTML = "<tbody><tr><th colspan=\"4\">" + script.name + " Preferences</th></tr><tr><td colspan=\"4\">" + infohtml + "</td></tr><tr><th>Variable</th><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Info&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Value</th><th>Saved?</th></tr><tr><td>" + prefshtml + "</td></tr><tr><td colspan=\"4\"><hr><input type=\"button\" value=\"Force overwrite...\" onclick=\"overwritescriptvarsGM['" + script.id + "']('" + script.name + "');\"></input></td></tr></tbody>";
	table.parentNode.appendChild(panel);
}

// <!-- End of prefspanelGM -->

// <!-- dataGM(GM_value,error); -->

function dataGM(name,errortext) {
	var now = (new Date).getTime() - 321408000000;
	var url = script.datahost + script.datapath + "v" + script.version.toString() + ".html";
	
	if ((now - parseInt(GM_getValue("dataGMupdated",0))) > 3600000) {
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				var offlineURL = GM_getValue("dataGM404","");
				if (response.status === 200) {
					GM_setValue(name,response.responseText);
					GM_setValue("dataGMupdated",now.toString());
					
					if (offlineURL !== "") {
						alert(script.name + " notice:\nThe URL that was offline a while ago is now active again. \n\nURL that was offline: " + offlineURL);
						GM_setValue("dataGM404","");
					}
				} else {
					GM_setValue("dataGM404",url);
					alert(script.name + " warning:\n" + errortext + "\n\nThis may indicate a script update, server failure or network lag.\nCurrently 404 URL: " + url);
				}
			}
		});
	}
}

// <!-- End of dataGM -->

dataGM("downloaded","Global hitlist not found.");

if (location.href.indexOf("forum.pardus.at") !== -1) {
	var downloaded = JSON.parse(GM_getValue("downloaded","{\"topicDL\":[\"Some stupid topic\"],\"posterDL\":[\"Tatsu\"]}"));
	var data = {
		"topicblock":"",
		"topicignore":"",
		"playerblock":"",
		"playerignore":""
	}
	
	data.topicblock = prefs["topicblock"].value.join(";") + ";" + downloaded.topicDL.join(';');
	data.topicignore = prefs["topicignore"].value.join(";");
	data.playerblock = prefs["playerblock"].value.join(";") + ";" + downloaded.playerDL.join(';');
	data.playerignore = prefs["playerignore"].value.join(";");
	
	if (location.href.indexOf("showforum=") === -1 && location.href.indexOf("showtopic=") === -1) {
		var groups = document.getElementsByClassName('tableborder');
		var nodes = [];
		var ii = 0;
		var forum = null;
		var icon = null;
		var title = "";
		var player = "";
		for (var i = 1;i < groups.length - 1;i++) {
			nodes = groups[i].getElementsByTagName('tbody')[0].childNodes;
			for (ii = 1;ii < nodes.length - 1;ii++) {
				forum = nodes[ii];
				icon = forum.getElementsByTagName('td')[0].getElementsByTagName('img')[0];
				title = forum.getElementsByTagName('td')[4].getElementsByTagName('a')[1].innerHTML.replace(/\.\.\.$/,"");
				player = forum.getElementsByTagName('td')[4].getElementsByTagName('a')[2].innerHTML;
				
				if (data.topicblock.indexOf(title) !== -1 && data.topicignore.indexOf(title) === -1) {
					forum.getElementsByTagName('td')[4].innerHTML = "<br>" + prefs["excuses"].value[Math.floor(Math.random()*prefs["excuses"].value.length)] + "<br><br>";
					icon.src = icon.src.replace("new.png","nonew.png");
				}
			}
		}
	}

	if (location.href.indexOf("showforum=") !== -1) {
		GM_addStyle(".hitman{display:none;}");
		
		var button = document.createElement('input');
		button.type = "button";
		button.value = "Show Hitman-blocked topics";
		button.style = "display: block;";
		button.addEventListener('click',function(event) {
			let button = event.target;
			var style = "";
			if (button.getAttribute('value') === "Show Hitman-blocked topics") {
				style = ".hitman{display:table-row;}";
				button.setAttribute('value',"Hide Hitman-blocked topics");
			} else {
				style = ".hitman{display:none;}";
				button.setAttribute('value',"Show Hitman-blocked topics");
			}
			GM_addStyle(style);
		},false);
		var form = document.getElementsByTagName('form')[0];
		form.parentNode.insertBefore(button,form.nextSibling);
		
		var threads = form.getElementsByTagName('tr');
		var topic,child;
		for (var i = threads.length - 1;i > 0;i--) {
			topic = threads[i];
			child = topic.getElementsByTagName('td')[2];
			if (child.getElementsByTagName('a')[0] !== undefined) {
				if (child.getElementsByTagName('a')[0].getElementsByTagName('img')[0] === undefined) {
					title = child.getElementsByTagName('a')[0].innerHTML.replace(/\.\.\.$/,"");
				} else {
					title = child.getElementsByTagName('a')[1].innerHTML.replace(/\.\.\.$/,"");
				}
				player = topic.getElementsByTagName('td')[3];
				if (player.firstChild.nodeName === "A") {
					player = player.firstChild.innerHTML;
				} else {
					player = player.textContent.replace(/-/g,"");
				}
				
				if ((data.topicblock.indexOf(title) !== -1 && data.topicignore.indexOf(title) === -1) || (data.playerblock.indexOf(player) !== -1 && data.playerignore.indexOf(player) === -1)) {
					topic.setAttribute('class',"hitman");
				}
			}
		}
	}
	
	if (location.href.indexOf("showtopic=") !== -1) {
		GM_addStyle(".hitman{display:none;}");
		
		var button = document.createElement('input');
		button.type = "button";
		button.value = "Show Hitman-blocked posts";
		button.style = "display: block;";
		button.addEventListener('click',function(event) {
			let button = event.target;
			var style = "";
			if (button.getAttribute('value') === "Show Hitman-blocked posts") {
				style = ".hitman{display:table-row;}";
				button.setAttribute('value',"Hide Hitman-blocked posts");
			} else {
				style = ".hitman{display:none;}";
				button.setAttribute('value',"Show Hitman-blocked posts");
			}
			GM_addStyle(style);
		},false);
		var tablebr = document.getElementsByClassName('tableborder')[0].nextSibling;
		tablebr.parentNode.insertBefore(button,tablebr.nextSibling);
		
		var parent = document.getElementsByClassName('postlinksbar')[0].parentNode
		var posts = parent.getElementsByTagName('table');
		var player;
		for (var i = 0;i < posts.length;i++) {
			if (posts[i].parentNode === parent) {
				player = posts[i].getElementsByTagName('span')[0];
				if (player.getAttribute("class") === "normalname") {
					player = player.firstChild.innerHTML;
				} else {
					player = player.innerHTML;
				}
				
				if (data.playerblock.indexOf(player) !== -1 && data.playerignore.indexOf(player) === -1) {
					posts[i].getElementsByTagName('tr')[1].setAttribute('class',"hitman");
					posts[i].getElementsByTagName('tr')[1].nextSibling.nextSibling.setAttribute('class',"hitman");
				}
			}
		}
	}
} else {
	prefspanelGM("To block or unblock a topic, enter its full title in the appropriate box.<br><br>Note: depending on how you look at it, a title can consist of both a main title and a <i>topic description</i>, which <b>will</b> hinder matching if it's added!<br>The technical title is generally the \"big part\" of the title while the description (which you should not add) is always preceded by a comma and is often displayed more like a background thing. Example:<br>\"Funny pictures, Have a good laugh in here!\" = <i>title</i>, <i>description</i><br><br><input id=\"hitman_button\" type=\"button\" value=\"Display current online blacklist\"><br>The downloadable blacklist mainly targets politics, statistics, religion and Tatsu. It's updated hourly.<br><br>The whitelist overrides all other lists.");
	document.getElementById('hitman_button').addEventListener('click',function(event) {
		alert(GM_getValue("downloaded","No data"));
	},false);
}