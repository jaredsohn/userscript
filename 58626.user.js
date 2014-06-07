// ==UserScript==
// @name           Vrai notes
// @namespace      http://www.epitech.eu/intra/
// @include        http://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @include        https://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @include        http://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @include        https://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @match          http://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @match          https://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @match          http://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @match          https://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @author         Salomon BRYS (brys_s)
// @license        MIT
// @version        1.0.1
// @change-1.0.0   Script qui poutre !
// @change-1.0.1   Verification de mise a jour !
// ==/UserScript==

scriptVersion = "1.0.1";
scriptURL = "http://userscripts.org/scripts/source/58626.user.js";

// Trim
String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, "");
}

// GENERIC USER SCRIPT UPDATE CHECK
function checkupdate(scriptURL, currentVersionStr, diffCallback)
{
	function Version(vstr)
	{
		this.v = vstr.split('.');
		this.diff = function(comp)
		{
			max = comp.v.length > this.v.length ? comp.v.length : this.v.length;
			for (i = 0; i < max; ++i)
				if (! comp.v[i])
					return -1;
				else if (! this.v[i])
					return 1;
				else if (parseInt(this.v[i]) > parseInt(comp.v[i]))
					return -2;
				else if (parseInt(this.v[i]) < parseInt(comp.v[i]))
					return 2;
			return 0;
		}
	}
	currentVersion = new Version(currentVersionStr);
	function xmlhttpCallback(txt)
	{
		remoteVersionStr = /@version +[0-9]+\.[0-9]+\.[0-9]+/.exec(txt)[0].substr(8).trim();
		remoteVersion = new Version(remoteVersionStr);
		diff = { currentVersion: currentVersionStr, remoteVersion: remoteVersionStr, diff: currentVersion.diff(remoteVersion) };
		if (diff.diff > 0)
		{
			diff.changes = new Array();
			regexp = /@change-([0-9]+\.[0-9]+\.[0-9]+) +([^\n]+)/g;
			while (changes = regexp.exec(txt))
			{
				if (currentVersion.diff(new Version(changes[1])) > 1)
					diff.changes.push({ version: changes[1], text: changes[2] });
			}
			diffCallback(diff);
		}
	}
	if (navigator.appName != "Opera" && GM_xmlhttpRequest)
		GM_xmlhttpRequest({
			method: "GET",
			url: scriptURL,
			onload: function(r) {
				if (r.readyState == 4 && r.status == 200)
					xmlhttpCallback(r.responseText);
			}
		});
	else if (XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				xmlhttpCallback(xmlhttp.responseText);
		}
		xmlhttp.open("GET", scriptURL, true);
	}
}

// Verification de mise a jour
checkupdate(scriptURL, scriptVersion, function(d)
	{
		div = document.createElement("div");
		div.style.border = "solid Red 3px";
		div.style.backgroundColor = "#FFDDDD";
		div.style.width = "500px";
		div.style.margin = "5px 0 15px 5px";
		div.style.textAlign = "left";
		html = " \
			<a href='" + scriptURL + "' style='color: black'> \
			Une nouvelle version du script <b>Vrai-Notes</b> est disponible !<br /> \
			Votre version : <b style='color: Red;'>" + d.currentVersion + "</b><br /> \
			Nouvelle version : <b style='color: Green;'>" + d.remoteVersion + "</b><br /> \
		";
		for (i = 0; i < d.changes.length; ++i)
			html += d.changes[i].version + " : " + d.changes[i].text + "<br />";
		html += "</a>";
		div.innerHTML = html;
		if (document.getElementsByName("scolaryear_notes").length != 0)
			document.getElementsByName("scolaryear_notes")[0].parentNode.insertBefore(div, document.getElementsByName("scolaryear_notes")[0]);
		else
			document.getElementsByName("scolaryear")[0].parentNode.insertBefore(div, document.getElementsByName("scolaryear")[0]);
	});

// transforme un comment en HTML
function comment2HTML(str)
{
	txt = "";
	comments = str.split("--####--");
	parts = comments[0].trim().split("-//-");
	
	for (i = 0; i < parts.length; ++i)
	{
		part = parts[i].trim();
		title = /\[.+\]\:/.exec(part)[0];
		title = title.substr(1, title.length - 3);
		
		partCom = part.substr(title.length + 3);
		
		txt += "<p><b>" + title + "</b> :" + partCom + "</p>";
	}
	txt += "<hr style='border: 0; background-color: Black; margin: 8px;' />";

	general = comments[1].trim();
	txt += "<p><b>General</b> : " + general.substr(9) + "</p>";

	txt += "<hr style='border: 0; background-color: Black; margin: 8px;' />";

	for (i = 2; i < comments.length; ++i)
	{
		comment = comments[i].trim();
		login = /[^ ]+\:/i.exec(comment)[0];
		login = login.substr(0, login.length - 1);
		txt += "<p><img src='photo.php?login=" + login + "' style='width:60px; float: left; padding: 1px 2px 0 0;' /><b>" + login + "</b> : " + comment.substr(login.length + 1).trim() + "<br style='clear: both'></p>";
	}

	// SPECIFIQUE
	end = / +(\/ +[a-z]+ : -?[0-9]+ +)+\/ +[0-9]+:[0-9]+ +\/ +([a-z_]+)/gi.exec(txt);
	txt = txt.substr(0, txt.indexOf(end[0])) + txt.substr(txt.indexOf(end[0]) + end[0].length);
	txt = txt.replace(/\\'/g, "'").replace(/\\"/g, '"');
	txt += "<p style='text-align: right; font-style: italic;'>Not&eacute; par : <b>" + end[2] + "</b></p>";
	
	return txt;
}

tds = document.getElementsByTagName("td");
for (i = 0; i < tds.length; ++i)
{
	td = tds[i];
	if (td.innerHTML.indexOf("--####--") != -1 && td.childNodes.length == 1)
		td.innerHTML = comment2HTML(td.innerHTML);
}
