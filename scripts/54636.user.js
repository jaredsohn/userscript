// ==UserScript==
// @name           Vrai bareme
// @namespace      http://www.epitech.eu/intra/
// @include        http://www.epitech.eu/intra/index.php?section=prof&page=baremes*
// @include        https://www.epitech.eu/intra/index.php?section=prof&page=baremes*
// @match          http://www.epitech.eu/intra/index.php?section=prof&page=baremes*
// @match          https://www.epitech.eu/intra/index.php?section=prof&page=baremes*
// @author         Salomon BRYS (brys_s)
// @license        MIT
// @version        1.1.2
// @change-1.0.42  Script qui poutre !
// @change-1.1.0   Ajout de la fenetre de verification. Mise a jour pour le "nouveau" layout.
// @change-1.1.1   Correction de bug de positionnement pour les petits ecrans
// @change-1.1.2   Ajout de la gestion des mises a jour
// ==/UserScript==

scriptVersion = "1.1.2";
scriptURL = "http://userscripts.org/scripts/source/54636.user.js";

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
		div.style.margin = "5px auto 15px auto";
		div.style.textAlign = "left";
		html = " \
			<a href='" + scriptURL + "' style='color: black'> \
			Une nouvelle version du script <b>Vrai-Bareme</b> est disponible !<br /> \
			Votre version : <b style='color: Red;'>" + d.currentVersion + "</b><br /> \
			Nouvelle version : <b style='color: Green;'>" + d.remoteVersion + "</b><br /> \
		";
		for (i = 0; i < d.changes.length; ++i)
			html += d.changes[i].version + " : " + d.changes[i].text + "<br />";
		html += "</a>";
		div.innerHTML = html;
		document.getElementsByName("section")[0].parentNode.insertBefore(div, document.getElementsByName("section")[0]);
	});




// On récupere les logins
logins = Array();
sel = document.getElementsByName("groupe");
if (sel[0].options[sel[0].selectedIndex].value.trim() != "")
	logins = sel[0].options[sel[0].selectedIndex].value.split(", ");

// La callback
tree = Array();
function createComment()
{
	txt = "";
	for (part in tree)
	{
		if (txt != "")
			txt += " -//- ";
		txt += "[" + part + "]:";
		for (node in tree[part])
		{
			if (node != 0)
				txt += ",";
			
			if (document.getElementById(tree[part][node].textarea).value)
				txt += " " + document.getElementById(tree[part][node].textarea).value;
			
			txt += " ("
			inputs = document.getElementsByName(tree[part][node].input);
			for (inp = 0; inp < inputs.length; ++inp)
				if (inputs[inp].checked)
				{
					txt += inputs[inp].value;
					break;
				}
			txt += " pts)";
		}
	}
	
	txt += " --####-- General: " + document.getElementById("so_ta_general").value;
	
	for (l = 0; l < logins.length; ++l)
		txt += " --####-- " + logins[l] + ": " + document.getElementById("so_ta_" + logins[l]).value;

	document.getElementsByName("commentaire")[0].value = txt;
}

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
		
		txt += "<b>" + title + "</b> :" + partCom + "<br />";
	}

	txt += "<hr style='border: 0; background-color: Black; margin: 8px;' />";

	general = comments[1].trim();
	txt += "<b>General</b> : " + general.substr(9) + "<br />";

	txt += "<hr style='border: 0; background-color: Black; margin: 8px;' />";

	for (i = 2; i < comments.length; ++i)
	{
		comment = comments[i].trim();
		login = /[^ ]+\:/i.exec(comment)[0];
		login = login.substr(0, login.length - 1);
		txt += "<img src='photo.php?login=" + login + "' style='width:60px; float: left; padding: 1px 2px 0 0;' /><b>" + login + "</b> : " + comment.substr(login.length + 1).trim() + "<br style='clear: both'>";
	}

	return txt;
}

// Pour creer un TextArea
s_taID = 0;
function createTextarea(width, height, part, id)
{
	if (id)
		taID = id;
	else
	{
		taID = s_taID;
		++s_taID;
	}
	
	textarea = document.createElement("textarea");
	textarea.id = "so_ta_" + taID;
	textarea.style.display = "block";
	textarea.style.width = width + "px";
	textarea.style.height = height + "px";
	textarea.addEventListener("change", function()
	{
		this.value = this.value.replace(/\n/g," ");
		this.value = this.value.replace(/\s+/g," ");
		createComment();
	}, false);
	
	if (part)
	{
		if (! tree[part])
			tree[part] = Array();
		tree[part].push({ textarea: "so_ta_" + taID });
	}
	
	return textarea;
}

// On met les 2 champs finaux en readOnly et plus joli
document.getElementsByName("commentaire")[0].setAttribute("readonly", "readonly");
document.getElementsByName("commentaire")[0].style.color = "#000000";
document.getElementsByName("commentaire")[0].style.display = "block";
document.getElementsByName("commentaire")[0].style.width = "700px";
document.getElementsByName("commentaire")[0].style.height = "150px";

document.getElementsByName("note")[0].setAttribute("readonly", "readonly");
document.getElementsByName("note")[0].style.color = "#000000";
document.getElementsByName("note")[0].style.fontSize = "25px";
document.getElementsByName("note")[0].style.textAlign = "center";

curPart = "";
tds = document.getElementsByTagName("td");
for (td = 0; td < tds.length; ++td)
	if (tds[td].className == "default1")
	{
		// Si on tombe sur un titre
		if (tds[td].getElementsByTagName("h2").length > 0)
		{
			curPart = tds[td].getElementsByTagName("h2")[0].textContent;
			if (curPart[curPart.length - 1] == ":")
			{
				curPart = curPart.substr(0, curPart.length - 1).trim();
			}
		}
		
		inputs = tds[td].getElementsByTagName("input");
		for (inp = 0; inp < inputs.length; ++inp)
		{
			// Si on tombe sur un emplacement de notation
			if (inputs[inp].type == "hidden" && inputs[inp].name.substr(0, 6) == "titre_")
			{
				// S'il s'agit d'une note intermediare
				if (inputs[inp].value != "")
				{
					inputs[inp].parentNode.appendChild(createTextarea(600, 50, curPart));
				}
			}
			
			// S'il s'agit d'un boutton radio de notation
			else if (inputs[inp].type == "radio" && inputs[inp].name.substr(0, 6) == "radio_" && tree[curPart])
			{
				tree[curPart][tree[curPart].length - 1].input = inputs[inp].name
				
				inputs[inp].addEventListener("click", function() { unsafeWindow.make_sum(); createComment(); }, false);
			}
		}
	}


div = document.createElement("div");

// On ajoute le commentaire general
p = document.createElement("p");
p = document.createElement("p");
p.innerHTML = 	"<b>Commentaire General :</b>";
p.appendChild(createTextarea(660, 80, null, "general"));
div.appendChild(p);

// On ajoute les commentaires personalises
for (l = 0; l < logins.length; ++l)
{
	p = document.createElement("p");
	p.innerHTML =	"<br style='clear: both'>"
				+	"<img src='photo.php?login=" + logins[l] + "' style='width:60px; float: left;' />"
				+	"<b style='font-size: 16px;'>"
				+	logins[l] + " :</b>";
	p.appendChild(createTextarea(600, 50, null, logins[l]));
	div.appendChild(p);
}

document.getElementsByName("note")[0].parentNode.insertBefore(div, document.getElementsByName("note")[0].parentNode.firstChild);

// On prepare la div finale
finalDiv = document.createElement("div");
//		<hr style='border: 0; background-color: Black; margin: 8px;' /> \
finalDiv.innerHTML = "\
	<div style='position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background-color: Black; opacity: 0.8;'>&nbsp;</div> \
	<div style='position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; text-align: left; margin-top: 5%'> \
		<div style='width: 410px; background-color: White; border: solid black 2px; margin: auto;'> \
			<h3 style='margin: 0; padding: 0; font-size: 28px; text-align: center;' id='KoalaNote'>&nbsp;</h3> \
			<div id='KoalaMiddle' style='height: 60%; padding: 10px; Overflow-X: hidden; Overflow-Y: scroll;'></div> \
			<button type='button' onClick='document.notation.submit()'> \
				<b style='color: Green'>VALIDER</b> \
			</button> \
			&nbsp; &nbsp; \
			<button type='button' onClick='document.getElementById(\"finalDiv\").style.display = \"none\"'> \
				<b style='color: Red'>ANNULER</b> \
			</button> \
		</div> \
	</div> \
";
finalDiv.id = "finalDiv";
finalDiv.style.display = "none";
document.body.appendChild(finalDiv);

//On remplace le bouton final
document.getElementsByName("sub")[0].style.display = "none";
button = document.createElement("button");
button.type = "button";
button.innerHTML = "<b>Verifier et valider la notation</b>";

button.addEventListener("click", function()
{
	createComment();
	
	document.getElementById("KoalaMiddle").innerHTML = comment2HTML(document.getElementsByName("commentaire")[0].value);
	document.getElementById("KoalaNote").innerHTML = document.getElementsByName("note")[0].value;
	finalDiv.style.display = "block";
}, false);

document.getElementsByName("sub")[0].parentNode.appendChild(button);
