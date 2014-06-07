// ==UserScript==
// @name			Pardus Pilot Avatars
// @version			v6
// @namespace		marnick.leau@skynet.be
// @description		Replaces the game's default race images with personalized avatars for those who've registered.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/sendmsg.php*
// @include			http*://*.pardus.at/main.php*
// @include			http*://*.pardus.at/profile.php?id=*
// @include			http*://*.pardus.at/profile.php?name=*
// @include			http*://forum.pardus.at/index.php?showtopic=*
// @include			http*://forum.pardus.at/index.php?act=ST*
// @include			http*://*.pardus.at/overview_stats.php
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_xmlhttpRequest
// ==/UserScript==

// <!-- User variables -->

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Pilot Avatars";
var scriptversion = 3;
var imghost = "http://www.majhost.com/gallery/Faziri/";
var datahost = "https://dl.dropbox.com/u/3357590/Userscripts/";
var imgpath = scriptname.replace(/Pardus /g,"Pardus/").replace(/ /g,"-") + "/";
var datapath = scriptname.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

// <!-- dataGM(GM_value,error); -->

function dataGM(name,errortext) {
	var now = (new Date).getTime() - 321408000000;
	var url = datahost + datapath + "v" + scriptversion.toString() + ".html";
	
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
						alert(scriptname + " notice:\nThe URL that was offline a while ago is now active again. \n\nURL that was offline: " + offlineURL);
						GM_setValue("dataGM404","");
					}
				} else {
					if (offlineURL !== url) {
						GM_setValue("dataGM404",url);
						alert(scriptname + " warning:\n" + errortext + "\n\nThis may indicate a script update, server failure or network lag.\nCurrently 404 URL: " + url);
					}
				}
			}
		});
	}
}

// <!-- End of dataGM -->

var noids = "{\"ids\":[75289]}";
dataGM("ids","Pilot IDs not found.");
var ids = JSON.parse(GM_getValue("ids",noids));

function avatar(element,id,px) {
	element.setAttribute("src",imghost + imgpath + id.toString() + ".jpg");
	element.style.height = px.toString() + "px";
	element.style.width = px.toString() + "px";
}

if (location.href.indexOf("/main.php") !== -1) {
	function navscript() {
		if (document.getElementById('PA_ships') === null) {
			var pilots = document.getElementById('otherships_content').childNodes;
			var id,ship;
			for (var i = 0;i < pilots.length;i++) {
				if (pilots[i].getAttribute("id").indexOf("Ship") !== -1) {
					id = pilots[i].getAttribute("id").match(/[0-9]+$/g)[0];
					if (ids.numbers.indexOf(id) !== -1) {
						ship = pilots[i].getElementsByTagName('td')[0];
						ship.style.background = "url('" + imghost + imgpath + id.toString() + ".jpg')"
						ship.style.backgroundSize = "64px 64px"
					}
				}
			}
			var checker = document.createElement("div");
			checker.setAttribute("id","PA_ships");
			checker.style.display = "none";
			document.getElementById('otherships_content').appendChild(checker);
		}
	}
	navscript();
	unsafeWindow.addUserFunction(navscript);
}

if (location.href.match("/sendmsg.php")) {
	if (document.links[0].getAttribute("href").indexOf("profile.php?id=") !== -1) {
		var id = parseInt(document.links[0].getAttribute("href").match(/[0-9]+$/));
		var pic = document.getElementById('sendform').getElementsByTagName('img')[0];
		
		if (ids.numbers.indexOf(id) !== -1) {
			avatar(pic,id,64);
		}
	}
}

if (location.href.indexOf("/overview_stats.php") !== -1) {
	var id;
	for (var i = 0;i < document.links.length;i++) {
		if (document.links[i].getAttribute('href').indexOf("profile.php?id=") !== -1) {
			id = document.links[i].getAttribute('href').match(/id=[0-9]+/)[0].replace("id=","");
			break;
		}
	}
	avatar(document.getElementById('race'),id,64);
}

if (location.href.indexOf("/profile.php") !== -1) {
	var id = parseInt(document.links[0].getAttribute("href").match(/id=[0-9]+/)[0].replace("id=",""));
	var pics = document.images;
	for (var i = 0;i < pics.length;i++) {
		if (pics[i].getAttribute("src").indexOf("/races/") !== -1) {
			var pic = pics[i];
			break;
		}
	}

	if (ids.numbers.indexOf(id) !== -1) {
		avatar(pic,id,64);
	}
}

if (location.href.indexOf("/index.php") !== -1) {
	var boxes = document.getElementsByClassName('postdetails');
	var id, pic, box;
	for (var i = 1;i < boxes.length;i += 2) {
		box = boxes[i];
		if (box.getElementsByTagName('a').length > 0 && box.getElementsByTagName('a')[0].getAttribute('href').indexOf("/profile.php") !== -1) {
			id = parseInt(box.getElementsByTagName('a')[0].getAttribute('href').match(/[0-9]+$/)[0]);
			pic = box.getElementsByTagName('img')[0];
			
			if (ids.numbers.indexOf(id) !== -1) {
				avatar(pic,id,96);
			}
		}
	}
}