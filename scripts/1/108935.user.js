// ==UserScript==
// @name           phpBB-Utilities
// @namespace      fabi545
// @description    Markiert alle Beiträge ausgewählter Subforen als Gelesen und öffnet alle ungelesenen Themen auf der aktuellen Seite
// ==/UserScript==

function findHash()
{
	var links = window.document.getElementsByClassName("rightside");
	
	for(var i = 0; i < links.length; i++)
	{
		if(typeof(links[i].getElementsByTagName("a")[0]) != "undefined")
		{
			var element = links[i].getElementsByTagName("a")[0]
			if(typeof(element.attributes.accesskey) != "undefined" && element.attributes.accesskey.value == "m")
			{
				GM_setValue("hash", /\?hash=([0-9a-z]{8})/.exec(element.href)[1]);
			}
		}
	}
}

function openNew()
{	
	var links = window.document.getElementsByTagName("a");

	for( var i=0; i<links.length; i++ )
	{
		if( links[i].href.match(/.*viewtopic.php?.*view=unread#unread.*?/))
			window.open(links[i].href);
	}
}

function read(hash)
{
	for(var i = 0; i < settings.forumList.length; i++)
	{
		var req = new XMLHttpRequest();
		req.open("GET", "/viewforum.php?mark=topics&hash="+hash+"&f="+settings.forumList[i], true);
		req.send(null);
	}
	GM_setValue("lastread", String(new Date().getTime()));
}

function saveSettings(params)
{
	if(typeof(params.openNew) != "undefined")
		settings.openNew = new Boolean(parseInt(params.openNew));
	
	if(typeof(params.readForum) != "undefined")
		settings.readForum = new Boolean(parseInt(params.readForum));
		
	if(typeof(params.intervall) != "undefined")
		settings.intervall =  parseFloat(params.intervall.replace(/,/, "."));
	
	if(typeof(params.forumList) != "undefined")
	{
		var temp = params.forumList.split(",")
		for(var i = 0; i < temp.length; i++)
			temp[i] = parseInt(temp[i]);
			
		settings.forumList = temp
	}
	GM_setValue("schonaSettings", JSON.stringify(settings));
	alert("Die Einstellungen für \"PhpBB-Utilities\" wurden erfolgreich gespeichert!");
}

function createSettingsMenu()
{
	//Überschrift ändern
	var headline = window.document.getElementById("ucp").getElementsByTagName("h2")[0]
	var newHeadline = window.document.createTextNode("Sch-Ona-Utilities");
	headline.replaceChild(newHeadline, headline.firstChild);
	
	//Inhalt ändern
	var newFieldset = window.document.createElement("fieldset");
	
	var dl = new Array;
	dl[0] = window.document.createElement("dl");
	dl[1] = window.document.createElement("dl");
	dl[2] = window.document.createElement("dl");
	dl[3] = window.document.createElement("dl");
	
	var dt = new Array;
	dt[0] = window.document.createElement("dt");
	dt[1] = window.document.createElement("dt");
	dt[2] = window.document.createElement("dt");
	dt[3] = window.document.createElement("dt");
	
	var dd = new Array;
	dd[0] = window.document.createElement("dd");
	dd[1] = window.document.createElement("dd");
	dd[2] = window.document.createElement("dd");
	dd[3] = window.document.createElement("dd");
	
	var label = new Array;
	label[0] = new Array;
	label[0][0] = window.document.createElement("label");
	label[0][1] = window.document.createElement("label");
	label[0][2] = window.document.createElement("label");
	
	label[1] = new Array;
	label[1][0] = window.document.createElement("label");
	label[1][1] = window.document.createElement("label");
	label[1][2] = window.document.createElement("label");
	
	label[2] = window.document.createElement("label");
	label[3] = window.document.createElement("label");
	
	
	var input = new Array;
	input[0] = new Array;
	input[0][0] = window.document.createElement("input");
	input[0][1] = window.document.createElement("input");
	
	input[1] = new Array;
	input[1][0] = window.document.createElement("input");
	input[1][1] = window.document.createElement("input");
	
	input[2] = window.document.createElement("input");
	input[3] = window.document.createElement("input");
	
	
	var span = window.document.createElement("span");
	var br = window.document.createElement("br");
	
	var text = new Array;
	text[0] = window.document.createTextNode("Ungelesene Beiträge sollen automatisch geöffnet werden:");
	text[1] = window.document.createTextNode("Ausgewählte Foren sollen als \"gelesen\" markiert werden:");
	text[2] = window.document.createTextNode("Folgende Foren sollen als \"gelesen\" markiert werden:"); 
	text[3] = window.document.createTextNode("Bitte die Foren IDs (dreistellige Nummer in der Adresse des jeweiligen Forums, direkt hinter \"?f=\") eintragen.");
	text[4] = window.document.createTextNode(" Ja");
	text[5] = window.document.createTextNode(" Nein");
	text[6] = window.document.createTextNode(" Ja");
	text[7] = window.document.createTextNode(" Nein");
	text[8] = window.document.createTextNode("Die Foren werden in folgendem Intervall als \"gelesen\" markiert:");
	text[9] = window.document.createTextNode(" Minute(n)");
	
	
	input[0][0].setAttribute("name", "openNew");
	input[0][0].setAttribute("id", "openNew1");
	input[0][0].setAttribute("type", "radio");
	input[0][0].setAttribute("value", "1");
	
	input[0][1].setAttribute("name", "openNew");
	input[0][1].setAttribute("id", "openNew0");
	input[0][1].setAttribute("type", "radio");
	input[0][1].setAttribute("value", "0");
	
	if(settings.openNew == true)
		input[0][0].setAttribute("checked", "checked");
	else
		input[0][1].setAttribute("checked", "checked");
		
	
	input[1][0].setAttribute("name", "readForum");
	input[1][0].setAttribute("id", "readForum1");
	input[1][0].setAttribute("type", "radio");
	input[1][0].setAttribute("value", "1");
	
	input[1][1].setAttribute("name", "readForum");
	input[1][1].setAttribute("id", "readForum0");
	input[1][1].setAttribute("type", "radio");
	input[1][1].setAttribute("value", "0");
	
	if(settings.readForum == true)
		input[1][0].setAttribute("checked", "checked");
	else
		input[1][1].setAttribute("checked", "checked");
	
	
	input[2].setAttribute("type", "text");
	input[2].setAttribute("class", "inputbox");
	input[2].setAttribute("name", "intervall");
	input[2].setAttribute("id", "intervall");
	input[2].setAttribute("value", settings.intervall);
	input[2].setAttribute("style", "width: 50px;");
	
	input[3].setAttribute("type", "text");
	input[3].setAttribute("class", "inputbox");
	input[3].setAttribute("name", "forumList");
	input[3].setAttribute("id", "forumList");
	input[3].setAttribute("value", settings.forumList.join(","));
	
	
	label[0][0].setAttribute("for", "openNew10");
	label[0][1].setAttribute("for", "openNew1");
	label[0][2].setAttribute("for", "openNew0");
	
	label[1][0].setAttribute("for", "readForum10");
	label[1][1].setAttribute("for", "readForum1");
	label[1][2].setAttribute("for", "readForum0");
	
	label[2].setAttribute("for", "intervall");
	
	label[3].setAttribute("for", "forumList");
	
	
	label[0][1].appendChild(input[0][0]);
	label[0][1].appendChild(text[4]);
	
	label[0][2].appendChild(input[0][1]);
	label[0][2].appendChild(text[5]);
	
	label[1][1].appendChild(input[1][0]);
	label[1][1].appendChild(text[6]);
	
	label[1][2].appendChild(input[1][1]);
	label[1][2].appendChild(text[7]);
	
	label[0][0].appendChild(text[0]);
	label[1][0].appendChild(text[1]);
	
	label[2].appendChild(text[8]);
	
	label[3].appendChild(text[2]);
	
	span.appendChild(text[3]);
	
	
	dt[0].appendChild(label[0][0]);
	dt[1].appendChild(label[1][0]);
	dt[2].appendChild(label[2]);
	dt[3].appendChild(label[3]);
	dt[3].appendChild(br);
	dt[3].appendChild(span);
	
	dd[0].appendChild(label[0][1]);
	dd[0].appendChild(label[0][2]);
	
	dd[1].appendChild(label[1][1]);
	dd[1].appendChild(label[1][2]);
	
	dd[2].appendChild(input[2]);
	dd[2].appendChild(text[9]);
	
	dd[3].appendChild(input[3]);
	
	dl[0].appendChild(dt[0]);
	dl[0].appendChild(dd[0]);
	
	dl[1].appendChild(dt[1]);
	dl[1].appendChild(dd[1]);
	
	dl[2].appendChild(dt[2]);
	dl[2].appendChild(dd[2]);
	
	dl[3].appendChild(dt[3]);
	dl[3].appendChild(dd[3]);
	
	
	newFieldset.appendChild(dl[0]);
	newFieldset.appendChild(dl[1]);
	newFieldset.appendChild(dl[2]);
	newFieldset.appendChild(dl[3]);
	
	fieldset = window.document.getElementById("ucp").getElementsByTagName("fieldset")[0];
	fieldset.parentNode.replaceChild(newFieldset, fieldset);
	
	window.document.getElementById("ucp").setAttribute("method", "get");
	window.document.getElementById("ucp").setAttribute("action", "/ucp.php");
	
	fieldset2 = window.document.getElementById("ucp").getElementsByTagName("fieldset")[1];
	fieldset2.removeChild(fieldset2.getElementsByTagName("input")[3])
	fieldset2.removeChild(fieldset2.getElementsByTagName("input")[2])
	
	input[3] = window.document.createElement("input");
	input[3].setAttribute("hidden", "hidden");
	input[3].setAttribute("name", "save_schona_utils");
	
	fieldset2.appendChild(input[3]);
}
		
	

function createSettingsMenuEntry(params)
{
	var li   = window.document.createElement("li");
	var a    = window.document.createElement("a");
	var span = window.document.createElement("span");
	var text = window.document.createTextNode("Sch-Ona-Utilities");
	
	a.setAttribute("href", "http://"+docroot+"/ucp.php?i=prefs&Script=");
	
	span.appendChild(text);
	a.appendChild(span);
	li.appendChild(a);
	
	window.document.getElementById("navigation").getElementsByTagName("ul")[0].appendChild(li);
	
	
	if(typeof(params.Script) != "undefined")
	{
		li.setAttribute("id", "active-subsection");
		document.getElementById("active-subsection").removeAttribute("id", 0);
		createSettingsMenu()
	}
}
	

function loadSettings()
{	
	try
	{
		settings = JSON.parse( GM_getValue("schonaSettings", "null") );
	}
	catch (e) {
		settings = defaultData;
		GM_setValue("schonaSettings", JSON.stringify(settings));
		
		if(confirm("PhpBB-Utilities meldet: \n\nDeine Einstellungen scheinen beschädigt worden zu sein.\nMöchtest Du die Einstellungen erneut vornehmen?\n(Das Script wird ansonsten temorär deaktiviert)"))
			window.open("http://"+docroot+"/ucp.php?i=prefs&Script=");
	}
	if(!settings)
	{			
		settings = defaultData;
		GM_setValue("schonaSettings", JSON.stringify(settings));
		
		if(confirm("Du scheinst das Script \"PhpBB-Utilities\" neu Installiert zu haben.\nMöchtest Du die Einstellungen jetzt anpassen?\n(Wird in einen neuen Tab geladen.)"))
			window.open("http://"+docroot+"/ucp.php?i=prefs&Script=");
	}
	
}

function getParams()
{
	var allParams = window.location.search.replace(/\?/, "");
	allParams = allParams.split("&");
	var params = new Object;
	
	for(var i = 0; i < allParams.length; i++)
	{
		allParams[i] = allParams[i].split("=");
		params[allParams[i][0]] = unescape(allParams[i][1]); 
	}
	return params;
}

//MainFunction
(function()
{
	docroot = window.location.hostname;
	path	= window.location.pathname;
	
	defaultData = new Object;
	defaultData.openNew = false;
	defaultData.readForum = false;
	defaultData.intervall = 0.5;
	defaultData.forumList = new Array;

	var params = getParams();
	
	loadSettings();

	if((path == "/" || path == "/index.php")&& GM_getValue("hash","") == "")
		findHash();

	if(path == "/ucp.php" && typeof(params.i) != "undefined" && (params.i == "165" || params.i == "prefs"))
		createSettingsMenuEntry(params);
		
	if(typeof(params.save_schona_utils) != "undefined")
		saveSettings(params);
		
	if(settings.readForum && parseInt(GM_getValue("lastread", 0)) + settings.intervall * 60000 < new Date().getTime())
		read(GM_getValue("hash"));
	
	if(settings.openNew && (path == "/viewforum.php" || path == "/search.php"))
		openNew();
})()