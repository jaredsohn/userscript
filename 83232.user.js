// ==UserScript==
// @name Ikariam Ika ReplyToAll
// @version 1.0
// @namespace ReplyToAll
// @description Reply to Ingame Messages  as Circular Message
// @include http://s*.ikariam.*/index.php*
// @history 1.0 updater can handle downtimes of userscripts.org
// @history 0.2 added circular message button (without reply)
// @history 0.2 added button to get missing Infos ("Odgovori svima")
// @history 0.1 initial release
// ==/UserScript==

// update part 
var scriptName = "Одговори свима"
var scriptID = 83232;
var thisVersion="1.0";
var update = "all"

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time = "";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

var server = document.domain;

//-----------------------------------------------------------------------------
function r2aGetInfosFromDiplo() {
// parse and store the title and link fpr circular messages
	var circularLink = document.getElementById("allyinfo").getElementsByTagName("a")[1];
	var href = circularLink.href;
	var title = circularLink.innerHTML;
	GM_setValue(server+'_'+"href", href);
	GM_setValue(server+'_'+"title", title);
}

//-----------------------------------------------------------------------------
function r2aAddLinks() {
	var href = GM_getValue(server+'_'+"href", false);
	var title = GM_getValue(server+'_'+"title", false);
	var messages = document.getElementById("messages");
	var button;
	if (href && title)
	{	var link = messages.getElementsByTagName("a");
		for (var i=0; i<link.length; i++)
		{	var regex= /replyTo\=(\d+)/.exec(link[i].href);
			if (regex) 
			{	button = document.createElement('a');
				button.innerHTML=scriptName;
				button.className="button";
				button.href=href+'&replyTo='+regex[1];
				button.title=scriptName;
				link[i].parentNode.insertBefore(button, link[i].nextSibling);
				link[i].parentNode.insertBefore(document.createTextNode(' '), link[i].nextSibling);
				i=i+2;
			}
		}
		
	} else { title = scriptName; href="/index.php?view=diplomacyAdvisorAlly" }; // add link to activate...}
	var nav = messages.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	nav[0].parentNode.insertBefore(nav[nav.length-3].cloneNode(true),nav[0]);
	var link = document.createElement('span');
	link.innerHTML = '<span>'+linkForUpdate()+'</span>';
	messages.appendChild(link);
	button = document.createElement('a');
	button.innerHTML = '<a class="button" href="'+href+'">'+title+'</a>';
	var td = messages.getElementsByTagName("td");
	td[td.length-1].appendChild(button);
}

//-----------------------------------------------------------------------------
function r2aAddScripLink() {
	if (document.location.toString().match(/allyId=\d+\&replyTo=\d+/))
	{	var mail = document.getElementById("mailRecipient");
		var link = document.createElement('span');
		link.innerHTML = '<span>'+linkForUpdate()+'</span>';
		mail.parentNode.insertBefore(link, mail);
	}
}
//-----------------------------------------------------------------------------
function r2aMain() {
// check which view - do what is needed
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {

	case "diplomacyAdvisorAlly":
		r2aGetInfosFromDiplo();
		break;

	case "diplomacyAdvisor":
		r2aAddLinks();
		break;

	case "sendIKMessage":
		r2aAddScripLink();
		break;
	}
}

//-----------------------------------------------------------------------------
r2aMain();