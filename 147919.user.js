// ==UserScript==
// @name			Mega Debrid helper
// @namespace		        juliencrestin.com
// @author			juliencrestin.com	|	Updated by janus57, lulu53470
// @description                 Copy all megadebird links
// @version			1.3
// @include			http://www.mega-debrid.eu/index.php?form=debrid*
// ==/UserScript==

/**************************************************************
************** Déclaration des variables du programme *********
**************************************************************/

var corps, div, button, relaunch, startAllDl, tempdiv, htmlbody, linkslist, failedLinks;

button = document.createElement("BUTTON");
var buttext = document.createTextNode('Copy All');
button.id = "debridbutton";
button.appendChild(buttext);
button.setAttribute("style","float:left;");
button.onclick = createLinksList;

startAllDl = document.createElement("BUTTON");
startAllDl.id = "debridbutton";
startAllDl.appendChild(document.createTextNode('Download All'));
startAllDl.setAttribute("style","float:left;");
startAllDl.onclick = startAllDownloads;

htmlbody = document.getElementsByTagName("body")[0];
tempdiv = document.createElement("div");
tempdiv.setAttribute("style","display:none;");
tempdiv.setAttribute("id","tempClipboard");
htmlbody.appendChild(tempdiv);

corps = document.getElementById('content_wrap');
corps.insertBefore(button, corps.firstChild);
corps.insertBefore(startAllDl, corps.firstChild);


function copyAllDebrided(){
	var debridlinks = correctInvalidDivDistribution();
	var linksnumber = debridlinks.length;
	failedLinks = new Array();
	linkslist = new Array();
	for(var i =0;i<linksnumber;i++) 
	{
		var currentlink = debridlinks[i];
		var links = currentlink.getElementsByTagName("span");
		if(links.length > 0){
			var TempContent = links.item(0).innerHTML;
			document.getElementById('tempClipboard').innerHTML =TempContent;
			var linkattr = document.getElementById('tempClipboard').firstChild.nextSibling.nextSibling.attributes;
			linkslist.push(linkattr.href.value);
		} else {
			if(currentlink.firstChild.innerHTML.match(/^Lien : http/g)) {
				failedLinks.push(currentlink.firstChild.innerHTML.substring(7));
			}
		}
	}
	if(failedLinks.length > 0){
		if(!document.getElementById("retrybutton")) {
			relaunch = document.createElement("BUTTON");
			var relaunchtext = document.createTextNode('Retry Failed');
			relaunch.id = "retrybutton";
			relaunch.appendChild(relaunchtext);
			relaunch.setAttribute("style","float:left;");
			relaunch.onclick = retryLinks;
			corps.insertBefore(relaunch, corps.firstChild);
		}
	}
}

function createLinksList() {
	copyAllDebrided();
	if(linkslist.length > 0)
		displayLinks();	
}

function startAllDownloads(){
	copyAllDebrided();
	if(linkslist.length > 0) {
		for(var i =0;i<linkslist.length;i++)
			window.open(linkslist[i],'Download'+i, "Width=20,Height=20,menubar=no");
	}
}

function retryLinks(){
	if(document.getElementById("failedLinks"))
	{
		var resultDiv = document.getElementById("failedLinks");
		resultDiv.innerHTML = "";
	}
	else
	var resultDiv = document.createElement("div");
	resultDiv.setAttribute("id", "failedLinks");
	resultDiv.setAttribute("style","width:522px;border-radius:5px;padding:5px;left:50%;margin-left:-230px;position:fixed;z-index:9999;background:#192B40;top:40%;");
	var linksTitle = document.createElement("h3");
	linksTitle.setAttribute("style","color:white;text-align:center");
	linksTitle.innerHTML = "Liste des Liens échoués";
	resultDiv.appendChild(linksTitle);
	
	var linksDisplay = document.createElement("textarea");
	linksDisplay.setAttribute("style","width:520px;height:200px;");
	linksDisplay.setAttribute("id","textareaListLinks");

	for(var i =0; i<failedLinks.length;i++) {
		linksDisplay.innerHTML = linksDisplay.innerHTML + failedLinks[i]+"\n";	
	}
	resultDiv.appendChild(linksDisplay);
	htmlbody.appendChild(resultDiv);
	
	var linksClose = document.createElement("a");
	linksClose.setAttribute("style","color:white;text-align:center");
	linksClose.innerHTML = "fermer";
	linksClose.onclick = listFailedLinkClose;
	resultDiv.appendChild(linksClose);
	
	document.getElementById("textareaListLinks").select();
}

function correctInvalidDivDistribution() {
    var n = document.getElementById("stats_overview");
    var a = [];
    var i;
    while(n) {
        a.push(n);
        n.id = "a-different-id";
        n = document.getElementById("stats_overview");
    }

    for(i = 0;i < a.length; ++i) {
        a[i].id = "stats_overview";      
    }
    return a;
}

function displayLinks() {
	if(document.getElementById("resultLinks"))
	{
		var resultDiv = document.getElementById("resultLinks");
		resultDiv.innerHTML = "";
	}
	else
		var resultDiv = document.createElement("div");
	resultDiv.setAttribute("id", "resultLinks");
	resultDiv.setAttribute("style","width:522px;border-radius:5px;padding:5px;left:50%;margin-left:-230px;position:fixed;z-index:9999;background:#192B40;top:40%;");
	var linksTitle = document.createElement("h3");
	linksTitle.setAttribute("style","color:white;text-align:center");
	linksTitle.innerHTML = "Liste des Liens";
	resultDiv.appendChild(linksTitle);
	
	var linksDisplay = document.createElement("textarea");
	linksDisplay.setAttribute("style","width:520px;height:200px;");
	linksDisplay.setAttribute("id","textareaListLinks");
	linksDisplay.setAttribute("readonly","readonly");
	for(var i =0; i<linkslist.length;i++) {
		linksDisplay.innerHTML = linksDisplay.innerHTML + linkslist[i]+"\n";	
	}
	resultDiv.appendChild(linksDisplay);
	htmlbody.appendChild(resultDiv);
	
	var linksClose = document.createElement("a");
	linksClose.setAttribute("style","color:white;text-align:center");
	linksClose.innerHTML = "fermer";
	linksClose.onclick = listLinkClose;
	resultDiv.appendChild(linksClose);
	
	document.getElementById("textareaListLinks").select();
}

function listLinkClose() {
	var olddiv = document.getElementById("resultLinks");
	htmlbody.removeChild(olddiv);
}

function listFailedLinkClose(){
	var olddiv = document.getElementById("failedLinks");
	htmlbody.removeChild(olddiv);
}