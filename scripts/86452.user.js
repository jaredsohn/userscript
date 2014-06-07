// ==UserScript==
// @name           Reyt Labs
// @namespace      reytlabs
// @description    Analyse des usages internet
// @include        http://*
// @author         Jean-Nicolas Reyt <jean-nicolas@reyt.net> et Ivan Pierre <ivan@kilroysoft.ch> pour Reyt Labs		
// ==/UserScript==

var site = "http://labs.reyt.net/";

// global persistant id
var globSet = new Settingsobject();	

var isChrome = (typeof(chrome) != "undefined"); // Chrome extention

// manage greaseMonkey functions implementation in chrome
if(isChrome)
{
	// Write log 
	function GM_log(str)
	{
		console.log(str);
	}
	
	// retrive persistant data
	function GM_getValue(name)
	{
		var val = localStorage[name];
		if(typeof(val) == "undefined")
			return "";
		return val;
	}


	// set persistant data
	function GM_setValue(name, value)
	{
		localStorage[name] = value;
	}	
}

GM_log("Extension chrome = "+isChrome);

/**
	Settingsobject class
	Enable global storage through GM functions
 */
function Settingsobject()
{
	this.prefix="";
	this.def={};
}

/**
	Settingsobject class
	set value
 */
Settingsobject.prototype.set=function(name, value)
{
	if(typeof value == "boolean")
		value = value ? "{b}1" : "{b}0";
	else if(typeof value == "string")
		value = "{s}" + value;
	else if(typeof value == "number")
		value = "{n}" + value;
	else
		value = "{o}" + value.toSource();
	GM_setValue(this.prefix+""+name, value);
}

/**
	Settingsobject class
	get value
 */
Settingsobject.prototype.get=function(name)
{
	var value=GM_getValue(this.prefix+""+name, this.def[name] || "{b}0")

	if(!value.indexOf)
		return value;
	if(value.indexOf("{o}")==0)
	{
		try
		{
	  		return eval("("+value.substr(3)+")");
		}
		catch(e)
		{
	  	GM_log("Error while calling variable "+name+" while translating into an object: \n\n"+e+"\n\ncode:\n"+value.substr(3))
	  	return false;
		}
	}
	if(value.indexOf("{b}")==0)
		return !!parseInt(value.substr(3));
	if(value.indexOf("{n}")==0)
		return parseFloat(value.substr(3));
	if(value.indexOf("{s}")==0)
		return value.substr(3);
	return value;
}

Settingsobject.prototype.register=function(name, defaultvalue){
  	this.def[name]=defaultvalue;
  	return true;
}

/**
	Envoie les données vers le serveur
*/
function feedMercure(id, url, title) {
	/* Enleve les & des URL pour assurer un bon transfert des données */
    // var url = url.replace('&', '|$;').replace('?', '$|;').replace('=', '|;$').replace('#', ';|$');
    
    var xhr = new XMLHttpRequest();
	var data = site + "mercure.php?PageUrl=" + escape(url) + "&PageTitle=" + escape(title) + "&ID=" + id;
	GM_log(data);
	
	xhr.open("GET", data, true);
	xhr.send(null);
}

/**
	get id from page
*/
function getId()
{
	// in grease monkey, we access directly the page
	id = document.getElementById('id').innerHTML;
	globSet.set("text", id);
	GM_log("set id to : "+id);
}

function gotoLogin(tab)
{
	if(isChrome)
	{
		// for chrome we have to send a request to the content script
		chrome.tabs.sendRequest(tab.id, 
			{func: "gotologin", href: site + "login.php"}, 
			function(response) 
				{
					GM_log("gotologin acknoledged.");
				});
	}	
	else
	{
		// in grease monkey, we access directly the page
		location.href = site + "login.php";
	}
	
	id = "";
	globSet.set("text", id);
	GM_log("goto login. reset id");
}

/**
	Manage id and url storage
 */

function manageUrl(url, title, tab)
{
	globSet.prefix = "mercure.";
	globSet.register("text", ""); // default value
	globSet.register("lasturl", ""); // default value
	id = globSet.get("text"); // this is mercure.text
	var lastUrl = globSet.get("lasturl"); // this is mercure.lasturl;

	// don't process same multiple url
	if(id && lastUrl == url)
	{
		return;
	}
	globSet.get("lasturl", url);

	// process login or join normally
	if(url.indexOf(site + "login.php") == 0 || 
	   url.indexOf(site + "join.php") == 0)
	{
		id = "";
		globSet.set("text", id);
		GM_log("reset id");
		return
	} 

	// goto login
	if(url.indexOf(site + "logout.php") == 0)
	{
		id = "";
	} 

	// set id on member page
	if(url.indexOf(site + "members.php") == 0)
	{
		GM_log("wait content script setid");
		if(!isChrome)
			getId();
		else
			return;
	}
	
	// No id found go to login
	if(id == "")
	{
		globSet.set("text", "")
		gotoLogin(tab);
		return;
	}

	// write data
	feedMercure(id, url, title);
}

/**
	Event manager for GreaseMonkey
 */
function onLoadHandler()
{
	manageUrl(window.location.href, document.title, {});
}

/**
	Event manager for chrome as a background extension
 */
var onUpdatedTab = function(tabId, changeInfo, tab){
	if(changeInfo.status != "complete")
		return true;

	manageUrl(tab.url, tab.title, tab);
	return true; // proceed with other events	
}

// in chrome wait for setid request from content script
if(isChrome)
{
	// Listen for id change in content script
	chrome.extension.onRequest.addListener(
			function(request, sender, sendResponse) 
			{
			if (request.func == "setid")
			{
				id = request.id;
				globSet.set("text", id);
				GM_log("in background set : id = " + id);
  				sendResponse({}); // snub them.
			}
			});
	}
					
// start load listening
if(isChrome)
  	chrome.tabs.onUpdated.addListener(onUpdatedTab);
else
	window.addEventListener('load',onLoadHandler,true);
