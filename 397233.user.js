// ==UserScript==
// @name        PasswordManager
// @namespace   savePasswords
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include		http://*
// @include		https://*
// @version     1
// ==/UserScript==

jQuery(document).ready(function()
	{
		GM_registerMenuCommand("Add Login credentials for this site.", collectInfo);
		GM_registerMenuCommand("See Login credentials for this site.", getSiteName);
	})

function collectInfo()
	{
		var siteURL = document.URL;
		var dateAdded = Date();
		var Description = prompt("Insert description for this site!!!", "No description yet.");
		var siteName = document.title;
		var sitePassword = prompt("Site password.");
		var siteUsername = prompt("Site Username.");
		var siteEmail = prompt("Site Email Address.");
		var otherSiteInfo = prompt("Other info about site.", "N/A");
		var siteWrite = [siteURL, dateAdded, Description, sitePassword, siteUsername, siteEmail, otherSiteInfo];
		GM_setValue(siteName, siteWrite);
		alert("Site saved in database");
	}

function returnInfo(name) 
	{
		var siteName = GM_getValue(name);
		if (siteName == undefined)
			{
				var sites = GM_listValues();
				alert("I don't have this site in my database.\nThose are sites from my database: \n" + sites.join(", "));
			}
		else
			{
				var siteURL = GM_getValue(name)[0];
				var siteDate = GM_getValue(name)[1];
				var siteDescription = GM_getValue(name)[2];
				var siteEmail = GM_getValue(name)[5];
				var siteUsername = GM_getValue(name)[4];
				var sitePassword = GM_getValue(name)[3];
				var otherSiteInfo = GM_getValue(name)[6];
				var displayString = "Name: " + name + "\nDate added: " + siteDate + "\nURL: " + siteURL + "\nDescription: " + siteDescription + "\nEmail: " + siteEmail + "\nUsername: " + siteUsername + "\nPassword: " + sitePassword + "\nOther Info: " + otherSiteInfo + ".";
				alert(displayString);
			}
	}

function getSiteName()
	{
		var nameOfSite = prompt("What site do you want to find?");
		returnInfo(nameOfSite);
	}