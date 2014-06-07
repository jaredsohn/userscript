// ==UserScript==
// @name           wawamania++
// @namespace      hghrt
// @include        http://forum.wawa-mania.ws/*
// @include        http://forum.wawa-mania.ws/*
// ==/UserScript==

// DEFAULT : Appz Windows,8;DVD RIP,5;Programmation,68;Consoles,37;Café,4

var s = '<'+'h2>Publicité<'+'/h2>';
var links = '<br /><'+'center>- ';
var r;
var html = document.body.innerHTML;
var search = '<a href="#" id="searchLink"><b>Recherche</b></a> -<br /><div id="searchBox" style="display: none"><form action="search.php" method="get"><input type="hidden" value="search" name="action"/><input type="hidden" value="topics" name="show_as"/>Mots clés <input type="text" id="searchKeywords" maxlength="100" size="40" name="keywords"/><select name="forum" id="searchForum"><option value="-1">Tous les forums</option><optgroup label="Le coin détente"> 								<option value="4">Café</option> 								<option value="64">Humour/Insolite</option> 								<option value="65">Jeux alakon</option> 							</optgroup> 							<optgroup label="Informatique"> 								<option value="68">Programmation/Coding</option> 								<option value="57">Informatique Générale</option> 								<option value="29">Tutoriaux</option> 								<option value="59">Linux, Mac\'OS, Freebsd</option> 								<option value="60">Gamer</option> 							</optgroup> 							<optgroup label="Graphisme"> 								<option value="31">Demande d\'avatar</option> 								<option value="33">Galerie</option> 								<option value="34">Café du graphiste</option> 							</optgroup> 							<optgroup label="Films / Vidéo"> 								<option value="45">Films (Exclue)</option> 								<option value="5" selected>Films (DvDrip)</option> 								<option value="35">Films (Screener et TS)</option> 								<option value="46">Full DvD / HD</option> 								<option value="6">Séries télé</option> 								<option value="56">Docs, concerts, spectacles</option> 								<option value="58">Dessin animés / Animes / Mangas</option> 							</optgroup> 							<optgroup label="Appz"> 								<option value="8">Appz Windows</option> 								<option value="36">Appz Linux/Mac/Freebsd</option> 								<option value="44">Anti-Virus / Anti-spyware / Anti-trojan...</option> 							</optgroup> 							<optgroup label="Gamez"> 								<option value="16">GameZ PC</option> 								<option value="37">GameZ Consoles de salon</option> 								<option value="38">GameZ Consoles portables</option> 							</optgroup> 							<optgroup label="Musique"> 								<option value="7">Album Musique</option> 								<option value="40">Single Musique</option> 								<option value="51">Discographie</option> 								<option value="41">Clip</option> 								<option value="66">H-Q</option> 								<option value="71">Section M.A.O</option> 							</optgroup> 							<optgroup label="Divers Warez"> 								<option value="20">Divers</option> 								<option value="70">Mobile & Pocket PC</option> 								<option value="42">P2P Pando</option> 								<option value="27">E-Book</option> 							</optgroup> 							<optgroup label="Majeur XxX"> 								<option value="9">[Majeur] Films</option> 								<option value="47">[Majeur] Vidéo</option> 								<option value="48">[Majeur] Photo</option> 								<option value="49">[Majeur] Divers</option> 							</optgroup> 						</select><input type="submit" accesskey="s" value="Envoyer" name="search"/></p> 		</form></div><br />';

var readLinks = GM_getValue('favLinks','Appz Windows,8;DVD RIP,5;Programmation,68;Consoles,37;Café,4');
var splitLinks;
var arrCurrLink;
var arrLinks = new Array;
var wawaForumUrl = 'http://forum.wawa-mania.ws/viewforum.php?id=';
var winLoc = window.location.toString();
var regLoc = new RegExp('viewforum\\.php\\?id=([0-9]+)','');
var regLocEx = regLoc.exec(winLoc);
var currForumId;

if(regLocEx)
	currForumId = regLocEx[1];
else
	currForumId = 5; // Par défaut DVD RIP

function searchBoxClick() {
	var display = document.getElementById('searchBox').style.display;

	if(display == "none") {
		document.getElementById('searchBox').style.display = "block";
		document.getElementById('searchKeywords').focus();
	}
	else
		document.getElementById('searchBox').style.display = "none";
}

function gestFavs() {
	var favs = prompt('Editer les favoris (ex: nomForum1,idforum1;forum2,idforum2)...',readLinks);
	
	if(favs) {
		GM_setValue('favLinks',favs);
		alert('Favoris modifiés !');
	}
}

function go() {
	var display = document.getElementById('searchBox').style.display;
	var id = this.id.substr(7);
	
	if(display == "none") {
		window.location = wawaForumUrl + id;
	}
	else {
		document.getElementById('searchForum').value = id;
		document.getElementById('searchKeywords').focus();
	}
}

GM_registerMenuCommand('Gestion des favoris',gestFavs);

if(readLinks)
	splitLinks = readLinks.split(';');
else
	splitLinks = new Array;

for(i=0;i<splitLinks.length;i++) {
	arrCurrLink = splitLinks[i].split(',');
	arrLinks[i] = arrCurrLink;
}
	
for(i=0;i<arrLinks.length;i++) {
	links += '<'+'a id="favLink' + arrLinks[i][1] + '" href="#">'+ arrLinks[i][0] + '<'+'/a> - ';
}

r = links  + search + '<'+'/center>';
html = html.replace(new RegExp(s + "\n" + '<div class="box">','gi'),r + "<div id='pub'>")
document.body.innerHTML = html;

document.getElementById('pub').style.display = "none";
document.getElementById('searchLink').addEventListener('click',searchBoxClick,false);
document.getElementById('searchForum').value = currForumId;

for(i=0;i<arrLinks.length;i++) {
	document.getElementById('favLink' + arrLinks[i][1]).addEventListener('click',go,false);
}