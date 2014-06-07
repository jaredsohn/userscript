// OrangePortal NEW SMS 
// version 1.3
// 2010-07-12
// Copyright (c) 2007-2010, Radoslav Bielik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 
//
// ENGLISH
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// To uninstall, go to Tools/Manage User Scripts,
// select "OrangePortal NEW SMS", and click Uninstall.
//
// SLOVAK
// Toto je skript pre Greasemonkey (Firefox addon)
//
// Pre nainstalovanie je potrebny Greasemonkey: http://greasemonkey.mozdev.org/
// Po instalacii Greasemonkey restartujte Firefox a znova otvorte tento skript.
// Pre odinstalovanie otvorte Tools/Manage User Scripts,
// zvolte "OrangePortal NEW SMS" a kliknite "Uninstall"
//
// 
//
// ==UserScript==
// @name OrangePortal NEW SMS
// @version 1.3
// @namespace http://bielik.org
// @description Skript na automatické prihlásenie do OrangePortal a uľahčenie posielania SMS. Pre použitie potrebujete existujúce konto na www.orangeportal.sk, ktoré Vám umožňuje posielať SMS. http://bielik.org/greasemonkey
// @include http://www.orangeportal.sk/wportal/d_show?type=sms_compose
// @include https://www.orangeportal.sk/wportal/d_show?type=sms_compose
// @include http://www.orangeportal.sk/comm/sms/message.dwp
// @include https://www.orangeportal.sk/comm/sms/message.dwp
// @include http://www.orangeportal.sk/portal/message.dwp
// @include https://www.orangeportal.sk/portal/message.dwp
// ==/UserScript==


// GM_* function emulation for Chrome/Opera compatibility
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}

var fieldsLogin = document.getElementsByName("login");
var fieldsPwd = document.getElementsByName("pwd");
var fieldsAction = document.getElementsByName("page");

var orangeportalUsername = GM_getValue("orangeportalUsername");
var orangeportalPassword = GM_getValue("orangeportalPassword");


// detect wrong password message
if(orange_passwordmessage())
{
	// do nothing = the orange_password function already adds a password-update link into the page
}
else
{
	// detect first run
	if(!orange_configured())
		orange_setup(true);

	if(orange_configured())
	{
		if(fieldsLogin.length==1 && fieldsLogin.item(0).tagName.toLowerCase()=="input")
		{
			fieldsLogin.item(0).value = orangeportalUsername;

			if(fieldsPwd.length==1 && fieldsPwd.item(0).tagName.toLowerCase()=="input")
				fieldsPwd.item(0).value = orangeportalPassword;

			if(fieldsAction.length==1 && fieldsAction.item(0).tagName.toLowerCase()=="select")
			{
				fieldsAction.item(0).selectedIndex = 4;
				fieldsAction.item(0).form.submit();
			}
		}
		else
		{
			orange_addsettingslink();

			if(window.location.href.indexOf("d_show?type=sms_compose") != -1)
				orange_adjustSMSform();
			else if(window.location.href.indexOf("comm/sms/message.dwp") != -1)
				orange_adjustSMSformFree();
		}
	}


}


function orange_settingsdialog()
{
	orange_setup(false);
}

function orange_setup(firstRun)
{
	var newUsernme;
	var newPassword;

	if(firstRun)
	{
		newUsernme = prompt(
			"Víta Vás skript 'OrangePortal NEW SMS'\n\n" +
			"Pred prvým spustením je potrebné vyplniť Vaše užívateľské meno a heslo pre službu OrangePortal. Ak si neprajete zadať tieto údaje teraz, stlačte tlačidlo 'Cancel' / 'Zrušiť', " +
			"údaje budete môcť zadať pri ďalšej návšteve tejto stránky. Ak chcete tento skript vypnúť, kliknite na ikonku Greasmonkey v stavovom riadku.\n\n" +
			"Vaše užívateľské meno:");
	}
	else
	{
		if(orange_configured())
			newUsernme = prompt("Vaše užívateľské meno:", orangeportalUsername);
		else
			newUsernme = prompt("Vaše užívateľské meno:");
	}

	if(newUsernme != null && newUsernme != "")
	{
		newPassword = prompt("Vaše heslo:");

		if(newPassword != null && newPassword != "")
		{
			orangeportalUsername = newUsernme
			orangeportalPassword = newPassword;

			GM_setValue("orangeportalUsername", orangeportalUsername);
			GM_setValue("orangeportalPassword", orangeportalPassword);
		}
	}
}

function orange_configured()
{
	return (orangeportalUsername != null && orangeportalPassword != null);
}

function orange_passwordmessage()
{
	if(window.location.toString().indexOf("message.dwp") != -1)
	{
		var fieldsDIV = document.getElementsByTagName("div");

		for(var i=0; i<fieldsDIV.length; i++)
		{
			var currentDIV = fieldsDIV.item(i);
			var currentDIVattrs = fieldsDIV.item(i).attributes;

			if(currentDIVattrs.length == 1 && currentDIVattrs[0].name == "align" && currentDIVattrs[0].value == "left")
			{
				if(currentDIV.innerHTML.indexOf("nesprávne meno alebo heslo") != -1 )
				{
					var settingsLink = document.createElement('a');
					var settingsMessage = document.createTextNode("Upraviť meno a heslo pre Greasemonkey skript 'OrangePortal NEW SMS'");

					settingsLink.setAttribute("href", "#");
					settingsLink.addEventListener("click", orange_settingsdialog, true);
					settingsLink.appendChild(settingsMessage);

					currentDIV.innerHTML = currentDIV.innerHTML + "<br/><br/>";

					currentDIV.appendChild(settingsLink);

					return true;
				}
			}
		}

		return false;
	}
	else
		return false;
}

function orange_addsettingslink()
{
	var allTD = document.getElementsByTagName("td");

	for(var i=0; i<allTD.length; i++)
	{
		var currentTD = allTD.item(i);

		if(currentTD.className == "userslot")
		{
			var userTable = currentTD.childNodes[1];

			var tableRow = document.createElement('tr');
			var tableData = document.createElement('td');

			tableData.className = "userslot_body";
			tableData.setAttribute("colspan", "2");

			tableData.innerHTML = '<img src="/images/common/menu/menu_smallsquare.gif" width=7 height=11>';

			var settingsLink = document.createElement('a');
			var settingsMessage = document.createTextNode(" Nastavenia NEW SMS");

			settingsLink.setAttribute("href", "#");
			settingsLink.addEventListener("click", orange_settingsdialog, true);
			settingsLink.appendChild(settingsMessage);

			tableData.appendChild(settingsLink);
			tableRow.appendChild(tableData);
			userTable.appendChild(tableRow);
		}

	}
}

function orange_adjustSMSform()
{
	var fieldsP = document.getElementsByTagName("p");
	var fieldsDIV = document.getElementsByTagName("div");
	var fieldsCONF = document.getElementsByName("confirm");

	if(fieldsCONF.length==1 && fieldsCONF.item(0).tagName.toLowerCase()=="input")
		fieldsCONF.item(0).checked = true;

	for(var i=0; i<fieldsP.length; i++)
	{
		if(fieldsP.item(i).className=="nofloating")
		{
			var strOrig = fieldsP.item(i).innerHTML;
			var str = strOrig.substring(0, strOrig.indexOf("<br>", strOrig.indexOf("<br>")+1));
			//var str2 = strOrig.substring(strOrig.indexOf("<br>", strOrig.indexOf("<br>", strOrig.indexOf("<br>")+1)+1));
			var str2 = strOrig.substring(strOrig.indexOf("<br>", strOrig.indexOf("<br>")+1), strOrig.indexOf("<b>"));
			var str3 = strOrig.substring(strOrig.indexOf("<b>")+3, strOrig.length - 5);

			var strNewNote = str.replace(/\d{1,2}/g, "<b style='font-size:200%;'>&nbsp;$&&nbsp;</b>");
			strNewNote += "<br/>";
			strNewNote += str2.replace(/\d{1,2}/g, "<b style='font-size:150%;'>&nbsp;$&&nbsp;</b>");
			strNewNote += "<br/>";
			strNewNote += "<span style='font-size:75%'>" + str3+ "</span>";

			fieldsP.item(i).innerHTML = strNewNote;

			break;
		}
	}

	for(var i=0; i<fieldsDIV.length; i++)
	{
		if(fieldsDIV.item(i).className=="nofloating")
		{
			fieldsDIV.item(i).style.fontSize = "200%";
		}
	}
}

function orange_adjustSMSformFree()
{
	var fieldsTD = document.getElementsByTagName("td");


	for(var i=0; i<fieldsTD.length; i++)
	{
		if(fieldsTD.item(i).colSpan == "3" 
			&& fieldsTD.item(i).innerHTML.indexOf("Môžete odoslať ešte") != -1)
		{
			fieldsTD.item(i).innerHTML =
				fieldsTD.item(i).innerHTML.replace(/\d{1,2}/g, "<b style='font-size:200%;'>&nbsp;$&&nbsp;</b>")
		}
		else if(fieldsTD.item(i).align == "right")
		{
			if(fieldsTD.item(i).firstChild.title == "Poslat")
				fieldsTD.item(i).style.fontSize = "110%";
		}
	}
}
