// ==UserScript==
// @name           Kattool Script
// @namespace      Kattool
// @version        0.4
// @autor          Kattool
// @description    Addon for katsuro
// @include        http://*.katsuro.*/index.php*
// ==/UserScript==
// ===========================================================================
var affiche = 0;
var version=4;
var updatenotification = "New update for kattool script.\n Update ?";
var scriptlocation = "http://www.kattool.com/kattool.user.js";
function getVar(varname, vardefault) {
  var res = GM_getValue(varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

function setVar(varname, varvalue) {
  GM_setValue(varname, varvalue);
}

var config = getVar("config", "");

if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
  config = new Object();
}
if (config.cfg == undefined) {
  config.cfg = new Object();
}

function getCfgValue(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
}

function getCfgValueNonEmpty(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);
}

var current_url = document.location.href;
var serveur = document.location.host;

if(current_url.match(RegExp("(arena)","gi")) == 'arena') {
		var pseudo_j = current_url.replace('http://' + serveur + '/index.php?area=user&module=arena&action=search&opponent=','');
		var classs = document.getElementsByTagName('td');
		var etat = [0,0,0,0,0,0,0,0,0,0,0];
		var difference = [0,0,0,0,0,0,0,0,0,0];
		
		for ( var i = 0; i < classs.length; i++ ) {
			if ( /cell2/i.test(classs[i].className) && etat[0] == 0) {
			difference[0] = classs[i].innerHTML-getVar("niveau","0");
			if(difference[0] < -10 )
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[0] + '</span></div>';
			else if(difference[0] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[0] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[0]+ '</span></div>';		
			etat[0] = 1;
			}
			if ( /cell2 health/i.test(classs[i].className) && etat[1] == 0 ) {
			difference[1] = classs[i].innerHTML-getVar("pv","0");
			if(difference[1] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[1] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[1] + '</span></div>';
			etat[1] = 1;
			}
			if ( /cell2 xp/i.test(classs[i].className) && etat[2] == 0 ) {
			difference[2] = classs[i].innerHTML-getVar("xp","0");
			if(difference[2] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[2] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[2] + '</span></div>';
			etat[2] = 1;
			}
			if ( /cell2 strength/i.test(classs[i].className) && etat[3] == 0 ) {
			difference[3] = classs[i].innerHTML-getVar("force","0");
			if(difference[3] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[3] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[3] + '</span></div>';
			etat[3] = 1;
			}
			if ( /cell2 ability/i.test(classs[i].className) && etat[4] == 0 ) {
			difference[4] = classs[i].innerHTML-getVar("adresse","0");
			if(difference[4] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[4] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[4] + '</span></div>';
			etat[4] = 1;
			}
			if ( /cell2 mobility/i.test(classs[i].className) && etat[5] == 0 ) {
			difference[5] = classs[i].innerHTML-getVar("mobilite","0");
			if(difference[5] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[5] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[5] + '</span></div>';
			etat[5] = 1;
			}
			if ( /cell2 constitution/i.test(classs[i].className) && etat[6] == 0 ) {
			difference[6] = classs[i].innerHTML-getVar("constitution","0");
			if(difference[6] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[6] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[6] + '</span></div>';
			etat[6] = 1;
			}
			if ( /cell2 charma/i.test(classs[i].className) && etat[7] == 0 ) {
			difference[7] = classs[i].innerHTML-getVar("charisme","0");
			if(difference[7] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[7] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[7] + '</span></div>';
			etat[7] = 1;
			}
			if ( /cell2 def/i.test(classs[i].className) && etat[8] == 0 ) {
			difference[8] = classs[i].innerHTML-getVar("defense","0");
			if(difference[8] >= 0)
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[8] + '</span></div>';
			else
				classs[i].innerHTML = '<div style="float:right;">' + classs[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[8] + '</span></div>';
			etat[8] = 1;
			}
		}
		var degats = document.getElementsByTagName('span');
		for ( var i = 0; i < degats.length; i++ ) {
			if ( /minDam/i.test(degats[i].className) && etat[9] == 0) {
			difference[9] = degats[i].innerHTML-getVar("degats_min","0");
			if(difference[9] >= 0)
				degats[i].innerHTML = degats[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference[9] 

+ '</span> - ';
			else
				degats[i].innerHTML = degats[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[9] 

+ '</span> - ';

			etat[9] = 1;
			}
			if ( /maxDam/i.test(degats[i].className) && etat[10] == 0) {
			difference[10] = degats[i].innerHTML-getVar("degats_max","0");
			if(difference[10] >= 0)
				degats[i].innerHTML = degats[i].innerHTML + ' <span style="font-weight:bold;color:#FF0000;">+' + difference

[10] + '</span></div>';
			else
				degats[i].innerHTML = degats[i].innerHTML + ' <span style="font-weight:bold;color:#11FF11;">' + difference[10] 

+ '</span></div>';
			etat[10] = 1;
			}
		}
}

var lien = '<a href="http://www.kattool.com/" target="_blank">Kattool</blank>';
lien_fo = document.createElement("li");
lien_fo.setAttribute("id", "lien_fo");
var menu = document.getElementsByTagName("ul");
menu[0].appendChild(lien_fo);

document.getElementById("lien_fo").innerHTML = lien;
if(current_url.match(RegExp("(library)","gi")) == 'library')
{
	function addAttributes(elem, cAttribute) {
	if (cAttribute !== undefined) {
		for (var xi = 0; xi < cAttribute.length; xi++){
			elem.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
			if (cAttribute[xi][0].toUpperCase() == 'TITLE') elem.setAttribute('alt', cAttribute[xi][1]);
			}
		}
	}
	
	function newLink(iHTML, cAttribute) {
		var aLink = document.createElement("A");
		aLink.innerHTML = iHTML;
		addAttributes(aLink, cAttribute);
		return aLink;
	}
	
	function activateall()
	{
		var linka = document.getElementsByTagName('a');
		var compteur = 0;
		for ( var i = 0; i < linka.length; i++ )
		{
			if ( /activate/i.test(linka[i].href)) {
				compteur++;
				GM_xmlhttpRequest({method: "GET",url: linka[i].href,headers: {"User-Agent": "Mozilla/5.0","Accept": 

"text/xml"},
				  onload: function(response) { } });
			}
		}
		alert(compteur + ' is activate.');
	}
	var activate = document.createElement("li");
	activate.setAttribute("id", "activate");
	var updL = newLink('Activate all', [["href", 'javaScript:void(0);']]);
	updL.addEventListener('click', function() {activateall()}, false);
	activate.appendChild(updL);
	menu[0].appendChild(activate);
}
if(current_url.match(RegExp("(character)","gi")) == 'character')
{		
		var classs = document.getElementsByTagName('td');
		var etat = [0,0,0,0,0,0,0,0,0,0,0];
		
		for ( var i = 0; i < classs.length; i++ ) {
			if ( /cell2/i.test(classs[i].className) && etat[0] == 0) {
			setVar("niveau",classs[i].innerHTML);
			etat[0] = 1;
			}
			if ( /cell2 health/i.test(classs[i].className) && etat[1] == 0 ) {
			setVar("pv",classs[i].innerHTML);
			etat[1] = 1;
			}
			if ( /cell2 xp/i.test(classs[i].className) && etat[2] == 0 ) {
			setVar("xp",classs[i].innerHTML);
			etat[2] = 1;
			}
			if ( /cell2 strength/i.test(classs[i].className) && etat[3] == 0 ) {
			setVar("force",classs[i].innerHTML);
			etat[3] = 1;
			}
			if ( /cell2 ability/i.test(classs[i].className) && etat[4] == 0 ) {
			setVar("adresse",classs[i].innerHTML);
			etat[4] = 1;
			}
			if ( /cell2 mobility/i.test(classs[i].className) && etat[5] == 0 ) {
			setVar("mobilite",classs[i].innerHTML);
			etat[5] = 1;
			}
			if ( /cell2 constitution/i.test(classs[i].className) && etat[6] == 0 ) {
			setVar("constitution",classs[i].innerHTML);
			etat[6] = 1;
			}
			if ( /cell2 charma/i.test(classs[i].className) && etat[7] == 0 ) {
			setVar("charisme",classs[i].innerHTML);
			etat[7] = 1;
			}
			if ( /cell2 def/i.test(classs[i].className) && etat[8] == 0 ) {
			setVar("defense",classs[i].innerHTML);
			etat[8] = 1;
			}
		}
		var degats = document.getElementsByTagName('span');
		for ( var i = 0; i < degats.length; i++ ) {
			if ( /minDam/i.test(degats[i].className) && etat[9] == 0) {
			setVar("degats_min",degats[i].innerHTML);
			etat[9] = 1;
			}
			if ( /maxDam/i.test(degats[i].className) && etat[10] == 0) {
			setVar("degats_max",degats[i].innerHTML);
			etat[10] = 1;
			}
		}
}

function get(url, cb , tag) {
	GM_xmlhttpRequest({method: "GET",
						url: url,
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function checkupdate(text){
	var testversion=text.split('var version=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	if (version < newversion) 
		if (confirm(updatenotification+ '\n Version ' + newversion)) {
			location.href = scriptlocation;
		}
}

function version_update(){

	if(GM_getValue("LastUpdateMe")){
		var lastSearch;
		lastSearch = parseInt(GM_getValue("LastUpdateMe"));
		var now = parseInt(new Date().getTime());
		var searchFreq = 43200*500; //
		if(now - lastSearch > searchFreq){
			GM_setValue("LastUpdateMe", ""+now);
			get(scriptlocation,checkupdate);
		}
	} else {
		GM_setValue("LastUpdateMe", ""+new Date().getTime());
	}
}

try{version_update();} catch(e){}