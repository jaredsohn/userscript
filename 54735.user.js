var meta = <><![CDATA[
// ==UserScript==
// @name           Travian - Rename villages
// @version        2.0b13
// @namespace      http://userscripts.org/users/85337
// @description    Travian - Rename villages
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://help.travian*.*/*log
// @exclude        *.css
// @exclude        *.js
// @include        http://*.travian*.*/*.php*
//
// @script-name              Travian - Rename villages
// @script-id                47588
// @script-release-date      1248377862
// @script-update-interval   24
// ==/UserScript==
]]></>.toString();


var startTime = new Date().getTime();
var server = {name: "", version: 0, language: "en"};
var player = {uid: -1, currentVillage: -1, ownVillages: []};
var config = {};
var script = {};
var storage = {};
var renamedVillages = [];
var language = [];
var undefined;

var css = "";
css += ".tvr-button { border: 0; padding: 0; margin: 0 2px; cursor: pointer; }";
css += "#tvr-box { border: 1px solid #71D000; }";
css += "#tvr-text { border: 0; padding: 0; margin: 0; font-size: 18pt; font-weight: bold; width: 240px; }";

/*
 * Fugue Icons
 * Copyright (C) 2009 Yusuke Kamiyamane. All rights reserved.
 * The icons are licensed under a Creative Commons Attribution 3.0 license.
 * http://www.pinvoke.com/
 */
var images = {
	"edit": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAelJREFUeNqkk8trE1EUxr97MxlpGKdNRKavJC6shWKrtqXdlEJdCq6kC4t/gFBwUXAh7aIL/wHppll110XApQEFi5Sg0Ael4mqyi49kIaRoaKbzuPGc20YaqAubA4fDnXN/3/nuIRHNZhOdhESHYazm8w+p9l2SrxhhGPa/XFhYvwy9srn51AiDQCjaQ263fRcDtsCDW//ejxQCzBq+7yMigYYPeJ/WcLBTxL2pGVy5/wyhUigeHiKZTKLRaGByePivQExKMCtPfF+wgFICux8/gJ6k640emhBFyGazsG0bjuPocyuZYdY48TzBk4auxbBnX8fvn9+RSA3g6BgI6KLrutpBrVaDS5NbbqZHR8HsqQCpXTWBuUeLyL9awvzjRSTigE9u0um0tmxZlq5Od7euzGgBz/NkRA4OvgFfP+/rd7lf9qFSd3DbiVAqlTTAk+kuUmdCBjHMsoB2UCi8Q307p5vvX+cQdQ1i7uY4xsfG2rbPz+KIE+OdORCK1Naf34W5/BZmPA4/CLQT3k0rTNNs66lTB0JWK5VYjBpdiQTWNjYKgxMTL95sbRX5fD75G/f4Dp+ZYVbYIyNPpGX185Rf1WpZlcvbMpOZtXt7M+etX9RT9foPwe4oe3gv//lLDimPRKd/5z8CDAA2jwLTG/hm5QAAAABJRU5ErkJggg==",
	"save": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhxJREFUeNpi/P//PwMlgImBQsACIhhnCAFZjEAGkANy0B8gwQ00m5kRogpEMYHl5YF4LZBXw/D3/47/Ea/xuOD7PwaGX1AMMvDvfwGGf/8nprkkGQPZLUAVHqR4gY3hH0Ofoby+6ZcvXxjinWL0Gf4wtMC9QAAwAjXXK0jIO8gLyUl9/Pzx98Fjh24AXdOA7gIPoP/PwJwGdvoPoNP/MGQIcwkGq4mrKHz5+uXf0UtH7wBdMRGodgvCgP9ATX/+tyT5JxqCaDAfIu7DwcSWJckjqfzgwQOGU5dP3f3w4cNSoJq5DL//I0Xjn38tMX4xes+ePWOK8IowAPGBmnNZ/jPVS4vLqH7985Xl5YcXDz99+rAJGIDtQAxxIcKA/zVLViy8xM7J9uvU7VPMDnaOOkAb4sVkxTV+sPxgf/fhzdOP797vZ/gLjD4GBojObT8gAQRKiYx9/AxADaAwaDF2NtN6+vMZpwCnAMP7b+8Zfrz49vrj3fdHGJgZkhhYmT4w7P4J1wzWCyY8OBgY5JiBmBFsiLSdvMYP3l/cv1/+/PD57Psz/5kYEhgO/H4K1owEEAYwQlOcAtAQc2YPBmnGFi4TfpnvFz7d+f/wXyrD8T/XGR79w4hfZANAYcELxAJAzMdgzGTJoMOQxnDmfyfD1f9XgGIgq39AaRD+xQDyNBDADAA5gR2IOaA0MzRX/IPiP1D8F4n+BzeAEgAQYAC7HATaTnWSLQAAAABJRU5ErkJggg==",
	"cancel": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcJJREFUeNqkUz1PAkEQfStggjESejU0GozlGqn8SGywkYIYY0IsaLCwIBTQUN5fMLGm8S8QSWwslVAYjAlUBEJDhCgWwp3nzN6eHqIVl8zN7rx5b+dm9oRt25jlmcOMj59f10JAkPcBcXIGWdECyqYn6TfGdZ9S9d4K4gQYx4WCtJzE+G/sKJudwpQABUGnGSf5vKzX60jmctL8SYzz+iCdls1mEzuplMIsLSC4iSUh1ClUlpHIZGStVkM0GsVNqVRlIJZIyG63i1AohMdKpUrZRQqXz4j7LWA7VSiR/WRSNhsNRRgOh+i02wgGg3hrtRSZelLmI6cExs7nKJGVtTX50uupMn0+H157PUWmZpYDXLoWUFPo6MC87jivx4MBFtxOWZYS11VipNdT98DWDVsPh2XQNLFIMdc4xpg9OZ3JMdIpRowSXVKt36+yuXvGxn+N0XS+3zj0kG+JSPEi261H5FCLmN9lUyNWyZ+Qag54eA6Hbfa8j1A88g+2qrlqCkKIZdovbAG7m8D5E3B5D9xR7IPsk/u7DextABd14OrBwd6J23YFligQ0IPwXE7lbedXUAPya5yHMiLuq5j1d/4SYAAj3NATBGE4PgAAAABJRU5ErkJggg==",
	"reset": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArJJREFUeNqkk11Ik1EYx//Hzc85dc2crulc05k5dDmbmFo5i6ZLiiiEiC5KyIu6iC4CkYrwopsCoW+yiwIJNCPcUDPQojTSyaJUyo9YmSU6v7Z0c+/2dg4uCEIKfOH3PofnPM9z/uec5xCe57GeT3izKgSsBKvDIGR1gtnTDTz26wnMuatzAYpnmEeYECZ/AHU+H2pD/mORApp3j0HHO2kh05IHdTvKDundy6gT/iM5zWLjs+vvXDnJJFhu1Eh/LiPZYNylb3rQYuP8ayuIo/FnqN07Ojp2u+1NNLxTUyivunhQrCWTjx+9sE3MoDYQQDtTEEqJpcRTkmiiIUIUm5eaU6gbrMxWWa0WlJaa0NbhRYlyBPuOnatY4a5a+QA87EyE9HchQiTZHi6KEUWKpeKNyekyiUwR73OtCF0TTpQZotBieQKj0QxrxxJKVWMwHjhh7mi+v0AX6w6hMjrdC3PeDEN5kVytz/HMBxLHe4eFruk5RCkkmB36iopcFyyWJhQXm9E6mIRFxyI4DoQCgSmHOHps/HxPV1+miIdcFBsNWboCAnpX3+3jkKgTwbk9yIxbQuNzOzSafFSevdxYmIYGuo3Pv2+hPVdLlp3OgfNbCrRlIwNDEPICpGSnwT0zD97jR5wyAcezFmCormym8beo/FesZQSsYxbdgFpOHPYh3tn3+l1mfqFOvmlrKiaHHeC8HGIUUsx9nETT04cv9cm41v+FdKdsAN5/ow33+95UCQRKuociLSmhXVaj0RTsCdADUusyME2T27s6e6n/0qwHz1o/EKz5BJRSgt0qmI5kob/t+mH+7qk8/qgOb42bYZKJ/45nClgziSgxFBYSyXw6ObZlSFHNFvo0g3r7D3RR/wrFS/EFx34SLBJGCQ/a0KCPaQwE8VO4oP0Tnqz3Of8SYAAnOhsd7tLKFAAAAABJRU5ErkJggg==",
	"update": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArFJREFUeNpcU0tME1EUvTOdfmwgBaZgkJ+EFhRLRBYIEhIXujQkJi5caEyMiYkJK0XiBmvcaYzRjQtJTFy4MSZsXBgXuKQJoTGC2FKgUEyp7VD6Gdr5eu9MGSbc5PS9zrvnzLnv3mF0XYfIHAsUuAWGAWBZY+3GRzNgRhjPNjTtKIdieEIDFo4FJSAaEFNdA9NjXQOPx2iPaKKz48HV1neIBOITwouJD1oDt0b55lBABw2qgTuVndiH53j2GiEibiJ6EPcNAbTGnx17ez22MD2O/pj23tvB5lPDfVJh2VA/2XYp5OA87u0/HzvQnh4cmhpZjTz9YTlAAc3r5RvPj7+6Rm/UZQGq+SiE35gGZyZXwOdrDTaMPgtigURTkaNbAqoGclX8K6viOmevb3+/bKyK4sSfXdzt1gr3SciR7A6KslSSQJNPHJJlTYZIZAnS6TRM3hvEHNV4zrIO8LibJOQUjhyoIFTEnOjhGJ+iSZCvZkGUyxCNRk0xrmK5UkEG9SBdJo5dIFUQEgXw8635gyRougqcrcFOVrH2DMNBuZQuEsdewu9cZnnP7b8ADqaCMJNzmbCxZne/WgIsTll2P72HnFW7g8V8dktoU/pFp0PxmjcNwLeYg7i+MmQJKJIklvbyZH/REDy8RFXV53fWfiY8Thdalg0clWD+R3HIbCYTlEscewnUytnt9dSIg4P60z2NXQyjMKXcE0OgJHwBHfu+uZZLppJC3OViZh21O2LoY8Lhg3M4IhNXoCPQCWFvnWuwr5/vaO+s81NSaquYja0IqXJJWlrbgpm577C9HKdvRrcESM9L6O0GVygIVy9fhBvB3vozJBCPFVfnF+Dzrzh8i20A1UYTJiJXOxSgUngEvdFDpBYe3I/uwkPAjrx4Dy8zOajWroQm8B81B7nKfwEGAE0dUdKG37AKAAAAAElFTkSuQmCC"
}

function xpath1(xpath, root)
{
	var nodes = document.evaluate(xpath, root || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return nodes.singleNodeValue;
}

function xpath(xpath, root, doc)
{
	var nodes = (doc || document).evaluate(xpath, root || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var arr = [];
	for (var i = 0; node = nodes.snapshotItem(i); i++)
		arr.push(node);
	return arr;
}

function createNode(type, attributes, properties)
{
	var node = document.createElement(type);

	if (attributes) {
		for (var attribute in attributes) {
			node.setAttribute(attribute, attributes[attribute]);
		}
	}

	if (properties) {
		for (var property in properties) {
			if (property in node) node[property] = properties[property];
		}
	}

	return node;
}

Array.prototype.compact = function(){
	var a = [];

	for (var i = 0; i < this.length; i++) {
		if (this[i] != undefined && this[i] != null) a.push(this[i]);
	}

	return a;
};

if (!this.JSON) {
	JSON = {};
}

if (typeof JSON.parse !== "function") {
	JSON.parse = function(text) {
		return eval("(" + text + ")");
	};
}

if (typeof JSON.stringify !== "function") {
	JSON.stringify = function(value) {
		return uneval(value);
	};
}

function parse(text)
{
	try {
		return JSON.parse(text);
	} catch (e) {
		return eval(text);
	}
}

function stringify(value)
{
	return JSON.stringify(value);
}

function addStyle(css)
{
	if (GM_addStyle === undefined) {
		var head = document.getElementsByTagName("head")[0];
		if (!head) return;
		var style = createNode("style", {"type": "text/css"}, {textContent: css});
		head.appendChild(style);
	} else {
		GM_addStyle(css);
	}
}

function findInfoText(text, arr)
{
	var t = text.toUpperCase();
	for (var i = 0; i < arr.length; i++) {
		if (t.indexOf(arr[i].toUpperCase()) != -1) return arr[i];
	}
	return false;
}

function parseMetadata(data, scriptInfo)
{
	var keys = [
		["version", "version", ""],
		["name", "name", ""],
		["script-name", "name", ""],
		["script-id", "id", 0],
		["script-release-date", "releaseDate", 0],
		["script-update-interval", "updateInterval", 0]
	];

	var re = new RegExp();
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		re.compile("//\\s*@" + key[0] + "\\s+(.*?)\\s*\\n", "i");
		m = re.exec(data);
		if (!m) {
			if (key[2] !== undefined) scriptInfo[key[1]] = key[2];
			continue;
		}
		if (key[2] !== undefined && typeof(key[2]) == "number") {
			scriptInfo[key[1]] = parseInt(m[1]);
		} else {
			scriptInfo[key[1]] = m[1];
		}
	}
}

function xy2id(x, y)
{
	return (1 + (x + 400) + (801 * Math.abs(y - 400)));
}

function id2xy(id)
{
	var x = (id % 801 ? (id % 801) - 401 : 400);
	var y = 400 - (id - 401 - x) / 801;
	return [x, y];
}

function _(text)
{
	var s = ["", text]
	do {
		if (language[s[1]]) return language[s[1]];
		s = s[1].split("|");
	} while (s[1]);
	return s[0];
}

function initLanguage()
{
	switch (server.language) {
		case "sk":
			language = {
				"Transport to ": "Transport do ",
				"Transport from ": "Transport od ",
				"Return from ": "Návrat z ",

				"Reinforcement for ": "Podpora pre ",
				"Attacking ": "Útok na ",
				"Attack against ": "Útok na ",
				"Raiding ": "Lúpežná výprava proti ",
				"Raid against ": "Lúpež proti ",
				"Scouting ": "Sledovať ",
				"Scouting of ": "Špehovanie v ",

				"Original village name: ": "Pôvodný názov dediny: ",

				"New Version Available. Click to Update.": "Je dostupná novšia verzia. Kliknite pre nainštalovanie najnovšej verzie.",
				"Change village name": "Zmeniť názov dediny",
				"Save": "Uložiť",
				"Cancel": "Zrušiť",
				"Reset": "Obnoviť",

				"Renamed villages:": "Premenované dediny:",
				"Name": "Meno",
				"Coordinates": "Súradnice",
				"Preferences": "Nastavenie",
				"Description": "Popis",
				"Value": "Hodnota",
				"Show original village name as a tooltip": "Zobraziť pôvodný názov dediny ako tooltip"
			};
			break;
		case "cz":
			language = {
				"Return from ": "Návrat z ",

				"Reinforcement for ": "Podpora pro ",
				"Attacking ": "Útok na ",
				"Attack against ": "Útok na ",
				"Raiding ": "Loupež proti ",
				"Raid against ": "Loupež proti ",

				"Name": "Název",
				"Coordinates": "Souřadnice"
			};
			break;
		case "de":
			language = {
				"Transport to ": "Transport nach ",
				"Transport from ": "Transport von ",
				"Marketplace|Return from ": "Rückkehr aus ",

				"Rally point|Return from ": "Rückkehr von ",
				"Reinforcement for ": "Unterstützung für ",
				"Attacking ": "Angriff auf ",
				"Attack against ": "Angriff auf ",
				"Raiding ": "Raubzug gegen ",
				"Raid against ": "Raubzug gegen ",

				"Save": "Speichern",

				"Name": "Name",
				"Coordinates": "Koordinaten",
				"Preferences": "Einstellungen"
			};
			break;
		case "ro":
			language = {
				"Return from ": "Întoarcere de la ",
				"Reinforcement for ": "Întăriri pentru ",
				"Attacking ": "Atac împotriva ",
				"Attack against ": "Atac normal împotriva lui ",
				"Raiding ": "Raid împotriva ",
				"Raid against ": "Atac rapid (Raid) împotriva lui ",

				"Save": "Salvează",

				"Name": "Nume",
				"Coordinates": "Coordonate",
				"Preferences": "Preferinţe"
			};
			break;
		case "ua":
			language = {
				"Return from ": "Повернення з ",
				"Reinforcement for ": "Підкріплення для ",
				"Attacking ": "Напад на ",
				"Attack against ": "Напад на ",
				"Raiding ": "Розбійницький набіг на ",
				"Raid against ": "Розбійницький набіг на ",
				"Scouting of ": "Розвідка проти ",

				"Save": "Зберегти",

				"Name": "Ім'я",
				"Coordinates": "Координати",
				"Preferences": "Налаштування"
			};
			break;
		case "nl":
			language = {
				"Transport to ": "Transport naar ",
				"Transport from ": "Transport van ",
				"Marketplace|Return from ": "Terugkeer van ",

				"Rally point|Return from ": "Keert terug van ",
				"Reinforcement for ": "Versterking voor ",
				"Attacking ": "Aanval op ",
				"Attack against ": "Aanval tegen ",
				"Raiding ": "Overval op ",
				"Raid against ": "Overval tegen ",

				"Save": "Opslaan",

				"Name": "Naam",
				"Coordinates": "Coördinaten",
				"Preferences": "Configuratie"
			};
			break;
		case "pl":
			language = {
				"Transport to ": "Transport surowców do osady ",
				"Transport from ": "Transport surowców z osady ",

				"Return from ": "Powrót z ",

				"Reinforcement for ": "Posiłki dla ",
				"Attacking ": "Atak na ",
				"Attack against ": "Atak na ",
				"Raiding ": "Grabież na ",
				"Raid against ": "Grabież ",
				"Scouting ": "Obserwuj ",
				"Scouting of ": "Przeprowadź zwiad w osadzie ",

				"Save": "Zapisz",

				"Name": "Nazwa",
				"Coordinates" : "Pozycja",
				"Preferences": "Ustawienia"
			};
			break;
		case "es":
			language = {
				"Transport to ": "Transporte a ",

				"Return from ": "Regreso de ",

				"Send troops|Reinforcement for ": "Refuerzos para ",
				"Rally point|Reinforcement for ": "Refuerzo para ",
				"Attacking ": "Ataque contra ",
				"Attack against ": "Ataque a ",
				"Raiding ": "Atraco contra ",
				"Raid against ": "Atraco contra ",

				"Save": "Guardar",

				"Name": "Nombre",
				"Coordinates" : "Coordenadas",
				"Preferences": "Opciones"
			};
			break;
		case "fr": // by Sch@k@
			language = {
				"Transport to ": "Transport vers ",
				"Transport from ": "Transport de ",
				"Return from ": "Retour de ",

				"Reinforcement for ": "Assistance pour ",
				"Attacking ": "Attaque ",
				"Attack against ": "Attaque contre ",
				"Raiding ": "Pillage ",
				"Raid against ": "Pillage contre ",
				"Scouting ": "Espionnage ",
				"Scouting of ": "Espionnage contre ",

				"Original village name: ": "Nom original du village: ",

				"New Version Available. Click to Update.": "Nouvelle version disponible. Cliquer pour mettre à jour.",
				"Change village name": "Changer le nom du village",
				"Save": "Sauvegarder",
				"Cancel": "Annuler",
				"Reset": "Effacer",

				"Renamed villages:": "Villages renommés :",
				"Name": "Nom",
				"Coordinates": "Coordonnées",
				"Preferences": "Préférences",
				"Description": "Description",
				"Value": "Valeur",
				"Show original village name as a tooltip": "Voir le nom original du village en info-bulle"
			};
			break;
		case "uk":
			language = {
				"Attack against ": "Attack on ",
				"Raid against ": "Raid on "
			};
			break;
		case "pt":
			language = {
				"Transport to ": "Transporte para ",
				"Transport from ": "Transporte de ",

				"Return from ": "A regressar de ",

				"Send troops|Reinforcement for ": "Reforços para ",
				"Rally point|Reinforcement for ": "Reforço para ",
				"Attacking ": "Ataque contra ",
				"Attack against ": "Ataque contra ",
				"Raiding ": "Assalto contra ",
				"Raid against ": "Assalto contra ",
				"Scouting ": "Reconhecimento de ",
				"Scouting of ": "Espiar ",

				"Save": "Guardar",

				"Name": "Nome",
				"Coordinates" : "Coordenadas",
				"Preferences": "Preferências"
			};
			break;
	}
}

function getPlayerInfo()
{
	if (xpath1("id('header')")) {
		server.version = xpath1("id('content')[@class='ingame']") ? 340 : 350;
	} else {
		server.version = 310;
	}

	var link;
	switch (server.version) {
		case 310:
			link = xpath1("id('lleft')//table//a[contains(@href, 'spieler.php')]");
			break;
		case 340:
			link = xpath1("id('sleft')//a[contains(@href, 'spieler.php')]");
			break;
		case 350:
			link = xpath1("id('sleft')//a[contains(@href, 'spieler.php')]");
			if (!link) link = xpath1("id('side_navi')//a[contains(@href, 'spieler.php')]");
			break;
		default:
			link = false;
	}
	if (!link) return false;
	var m = link.href.match(/uid=(\d+)/);
	if (!m) return false;
	player.uid = parseInt(m[1]);

	server.name = location.hostname.replace(".travian.", "");

	switch (server.version) {
		case 310:
			var img = xpath1("//a[@href='plus.php']/img");
			if (img) {
				var re = RegExp("img/([^/]+)/a/plus\\.gif");
				var m = re.exec(img.src);
				if (m) server.language = m[1];
			}
			break;
		case 340:
		case 350:
			var logo = xpath1(server.version == 340 ? "//a/img[@id='logo']/.." : "//a[@id='logo']");
			if (logo) {
				var re = new RegExp("(?:\\w+\\.)?travian3?(?:\\.\\w+)?\\.(\\w+)$");
				var m = re.exec(logo.hostname);
				if (m) server.language = m[1];
			}
			break;
		default:
			return false;
	}

	switch (server.language) {
		case "ir":
			server.language = "fa";
			break;
		case "net":
			server.language = "es";
			break;
	}

	return true;
}

function loadStorage()
{
	var villages;

	storage.globalList = {dirty: false, data: parse(GM_getValue(server.name, "[]"))};
	storage.localList = {dirty: false, data: parse(GM_getValue(server.name + "-" + player.uid, "[]"))};
	storage.singleVillage = {dirty: false, data: parse(GM_getValue(server.name + "-" + player.uid + "-singleVillage", "{}"))};
	if (typeof storage.singleVillage.data != "object") storage.singleVillage.data = {};
	storage.updateInformations = {dirty: false, data: parse(GM_getValue("updateInformations", "{}"))};
	if (typeof storage.updateInformations.data != "object") storage.updateInformations.data = {};
	storage.config = {dirty: false, data: parse(GM_getValue("config", "{\"changeTooltip\": true}"))};
	if (typeof storage.config.data != "object") storage.config.data = {};

	villages = storage.globalList.data;
	villages = villages.compact();
	for (var i = 0; i < villages.length; i++) {
		var village = villages[i];
		renamedVillages[village.i] = {name: village.n, originalName: village.o, global: true};
	}

	villages = storage.localList.data;
	villages = villages.compact();
	for (var i = 0; i < villages.length; i++) {
		var village = villages[i];
		if (village.n) {
			renamedVillages[village.i] = {name: village.n, originalName: village.o, global: false};
		} else {
			if (renamedVillages[village.i]) delete(renamedVillages[village.i]);
		}
	}

	player.currentVillage = storage.singleVillage.data.i || -1;

	config = storage.config.data;

	GM_deleteValue("lastCheck");
	GM_deleteValue("remoteVersionDate");
}

function saveStorage()
{
	if (storage.globalList.dirty) {
		GM_setValue(server.name, stringify(storage.globalList.data.compact()));
		storage.globalList.dirty = false;
	}

	if (storage.localList.dirty) {
		GM_setValue(server.name + "-" + player.uid, stringify(storage.localList.data.compact()));
		storage.localList.dirty = false;
	}

	if (storage.singleVillage.dirty) {
		GM_setValue(server.name + "-" + player.uid + "-singleVillage", stringify(storage.singleVillage.data));
		storage.singleVillage.dirty = false;
	}

	if (storage.updateInformations.dirty) {
		GM_setValue("updateInformations", stringify(storage.updateInformations.data));
		storage.updateInformations.dirty = false;
	}

	if (storage.config.dirty) {
		GM_setValue("config", stringify(storage.config.data));
		storage.config.dirty = false;
 	}
}

function findVillage(id, global)
{
	var list = global ? storage.globalList.data : storage.localList.data;

	var idx = -1;
	for (var i = 0; i < list.length; i++) {
		if (list[i].i == id) {
			idx = i;
			break;
		}
	}
	return idx;
}

function updateOriginalName(id, name)
{
	if (renamedVillages[id]) {
		if (renamedVillages[id].originalName != name) {
			renamedVillages[id].originalName = name;
			var idx = findVillage(id, renamedVillages[id].global);
			if (idx == -1) return;
			if (renamedVillages[id].global) {
				storage.globalList.data[idx].o = name;
				storage.globalList.dirty = true;
			} else {
				storage.localList.data[idx].o = name;
				storage.localList.dirty = true;
			}
		}
	}
}

function updateSingleVillageInfo(id)
{
	if (id == -2) {
		if (storage.singleVillage.data.i == -1) return;
		id = -1;
	}
	if (id == -1) {
		storage.singleVillage.data.t = startTime;
		storage.singleVillage.dirty = true;
	}
	if (storage.singleVillage.data.i != id) {
		storage.singleVillage.data.i = id;
		storage.singleVillage.dirty = true;
	}
}

function nodeChangeName(params)
{
	var element = params.element;
	var id = params.id;
	if (!element || !id) return;

	if (!renamedVillages[id]) return;
	var name = (params.prepend || "") + renamedVillages[id].name + (params.append || "");

	if (params.replace === undefined || params.replace) {
		if (!params.html) element.textContent = name;
		else element.innerHTML = name;
	} else {
		if (!params.html) element.textContent += name;
		else element.innerHTML += name;
	}
	if (config.changeTooltip) element.title = _("Original village name: ") + renamedVillages[id].originalName;
}

function findAndRenameOwnVillages()
{
	var reDID = RegExp("newdid=(\\d+)");
	var reXY = RegExp("\\((-?\\d+)[\\s\\n]*\\|[\\s\\n]*(-?\\d+)\\)");

	var villages, linkCell, xyText;
	switch (server.version) {
		case 310:
			villages = xpath("id('lright1')/table[@class='f10']/tbody/tr//a[contains(@href, 'newdid=')]/../..");
			break;
		case 340:
			villages = xpath("id('vlist')/table[@class='vlist']/tbody/tr//a[contains(@href, 'newdid=')]/../..");
			break;
		case 350:
			villages = xpath("id('vlist')/tbody//a[contains(@href, 'newdid=')]/../..");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var row = villages[i];

		switch (server.version) {
			case 310:
				linkCell = row.cells[0];
				xyText = row.cells[1].textContent;
				break;
			case 340:
				linkCell = row.cells[1];
				xyText = row.textContent;
				break;
			case 350:
				linkCell = row.cells[1];
				xyText = row.textContent;
				break;
			default:
				continue;
		}

		var link = xpath1("./a[contains(@href, 'newdid=')]", linkCell);
		if (!link) continue;
		var mDID = reDID.exec(link.href);
		if (!mDID) continue;
		var mXY = reXY.exec(xyText);
		if (!mXY) continue;

		var did = parseInt(mDID[1]);
		var id = xy2id(parseInt(mXY[1]), parseInt(mXY[2]));

		if (renamedVillages[id]) {
			updateOriginalName(id, link.textContent);
			nodeChangeName({element: link, id: id});
		}

		switch (server.version) {
			case 310:
				if (link.className == "active_vl") player.currentVillage = id;
				break;
			case 340:
				if (row.className == "sel") player.currentVillage = id;
				break;
			case 350:
				if (xpath1("td[contains(@class, 'hl')]", row)) player.currentVillage = id;
				break;
		}

		player.ownVillages[did] = id;
	}

	if (villages.length > 0) {
		updateSingleVillageInfo(-2);
	} else {
		if (!(storage.singleVillage.data.i) || storage.singleVillage.data.i == -1) {
			if (!(storage.singleVillage.data.t) || (storage.singleVillage.data.t + (Math.floor(Math.random()*60 + 60)*1000)) < startTime) {
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://" + location.host + "/spieler.php",
					onload: function(response){
						if (response.status == 200) {
							var doc = document.implementation.createDocument("", "", null);
							var div = document.createElement("div");
							div.innerHTML = response.responseText;
							doc.appendChild(div);

							var re = RegExp("karte\\.php\\?d=(\\d+)&c=");
							var villages;
							switch (server.version) {
								case 310:
									villages = xpath("id('lmid2')/table//a[contains(@href, 'karte.php?d=')]", doc, doc);
									break;
								case 340:
								case 350:
									villages = xpath("id('content')/table//a[contains(@href, 'karte.php?d=')]", doc, doc);
									break;
								default:
									return;
							}
							var m = re.exec(villages[i].href);
							var id = m ? parseInt(m[1]) : -1;

							updateSingleVillageInfo(id);
							saveStorage();
						}
					}
				});
			}
		}
	}
}

function renameOwnVillages()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var re = RegExp("newdid=(\\d+)");
	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lright1')/table[@class='f10']//a[contains(@href, 'newdid=')]");
			break;
		case 340:
			villages = xpath("id('vlist')/table[@class='vlist']//a[contains(@href, 'newdid=')]");
			break;
		case 350:
			villages = xpath("id('vlist')/tbody//a[contains(@href, 'newdid=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		if (villages[i].getElementsByTagName("img").length != 0) continue;
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var did = parseInt(m[1]);
		var id = player.ownVillages[did];
		if (!id) continue;
		if (!renamedVillages[id]) continue;
		nodeChangeName({element: villages[i], id: id});
	}
}

function renameDorf1()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	if (player.currentVillage == -1) return;

	var village;
	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//h1");
			break;
		case 340:
		case 350:
			village = xpath1("id('content')//h1");
			break;
		default:
			village = false;
	}
	if (!village) return;
	if (!renamedVillages[player.currentVillage]) return;
	nodeChangeName({element: village, id: player.currentVillage});
}

function renameDorf3()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var re = RegExp("newdid=(\\d+)");

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')/table[@class='tbg']//td[1]//a[contains(@href, 'newdid=')]");
			break;
		case 340:
			villages = xpath("id('content')/table[@class='tbg']//td[1]//a[contains(@href, 'newdid=')]");
			break;
		case 350:
			villages = xpath("id('overview')/tbody//td[1]//a[contains(@href, 'newdid=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var did = parseInt(m[1]);
		var id = player.ownVillages[did];
		if (villages.length == 1) id = player.currentVillage;
		if (!id) continue;
		if (!renamedVillages[id]) continue;
		updateOriginalName(id, villages[i].textContent);
		nodeChangeName({element: villages[i], id: id});
	}
}

function renameKarte()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var village;
	switch (server.version) {
		case 340:
			village = xpath1("id('map_details_info')//a[contains(@href, 'karte.php?d=')]");
			break;
		case 350:
			village = xpath1("id('village_info')//td//a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			village = false;
	}
	if (village) {
		var re = new RegExp("karte\\.php\\?d=(\\d+)&c=");
		var m = re.exec(village.href);
		if (m) {
			var id = parseInt(m[1]);
			if (renamedVillages[id]) {
				updateOriginalName(id, village.textContent);
				nodeChangeName({element: village, id: id});
			}
		}
	}

	var re = RegExp("[\\?&]d=(\\d+)");
	var m = re.exec(location.href);
	if (!m) return;

	var id = parseInt(m[1]);

	if (!renamedVillages[id]) return;

	var village;
	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//h1/div[@class='ddb'][last()-1]");
			break;
		case 340:
		case 350:
			village = xpath1("id('content')/h1/div[last()]");
			break;
		default:
			village = false;
	}
	if (!village) {
		switch (server.version) {
			case 340:
			case 350:
				village = xpath1("id('content')/h1");
				if (village) {
					var m = village.textContent.match(/^\s*(.*?)\s*(\(-?\d+\|-?\d+\))\s*$/);
					if (m) {
						village.innerHTML = "<div>" + m[1] + "</div>&nbsp" + m[2];
						village = xpath1("id('content')/h1/div");
					}
				}
				break;
			default:
				village = false;
		}
	}
	if (!village) return;
	updateOriginalName(id, village.textContent);
	nodeChangeName({element: village, id: id});

	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//div[@class='map_details_right']//div[@class='ddb'][1]");
			break;
		case 340:
			if (!xpath1("id('map_details_info')/span")) break;
			village = xpath1("id('map_details_info')/div[1]");
			break;
		case 350:
			village = xpath1("id('village_info')/thead//div");
			break;
		default:
			village = false;
	}
	if (!village) return;
	nodeChangeName({element: village, id: id, prepend: (server.version == 310 ? "\xA0" : "")});
}

function renameBerichte()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')//table[@class='tbg']//td//a[contains(@href, 'karte.php?d=')]");
			break;
		case 340:
			villages = xpath("id('content')/table[@class='std reports_read']//thead//th/a[contains(@href, 'karte.php?d=')]");
			break;
		case 350:
			villages = xpath("id('report_surround')//thead//td/a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);
		if (!renamedVillages[id]) continue;
		updateOriginalName(id, villages[i].textContent);
		nodeChangeName({element: villages[i], id: id});
	}
}

function renameExpansion()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')//table[@class='tbg']//td//a[contains(@href, 'karte.php?d=')]");
			break;
		case 340:
			villages = xpath("id('content')//table[@class='tbg']//td[@class='s7']//a[contains(@href, 'karte.php?d=')]");
			break;
		case 350:
			villages = xpath("id('expansion')/tbody//a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);
		if (!renamedVillages[id]) continue;
		updateOriginalName(id, villages[i].textContent);
		nodeChangeName({element: villages[i], id: id});
	}
}

function renameRallyPoint()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var links;
	switch (server.version) {
		case 310:
			links = xpath("id('lmid2')/p[@class='txt_menue']/a");
			break;
		case 340:
			links = xpath("id('content')/p[2]/a");
			break;
		case 350:
			links = xpath("id('textmenu')//a");
			break;
		default:
			links = [];
	}
	if (links.length != 3 || links[1].pathname != "/a2b.php" || links[2].pathname != "/warsim.php") return;

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')//table[@class='tbg']//td[@width='21%']//a[contains(@href, 'karte.php?d=')]/span/..");
			break;
		case 340:
			villages = xpath("id('content')/table[@class='std troop_details']//th[@class='village']/a[contains(@href, 'karte.php?d=')]/span/..");
			break;
		case 350:
			villages = xpath("id('build')/table[@class='troop_details']/thead//td[@class='role']/a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);
		if (!renamedVillages[id]) continue;
		var text;
		if (server.version == 350) {
			text = villages[i];
		} else {
			text = villages[i].childNodes[0];
		}
		nodeChangeName({element: text, id: id});
	}

	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')//table[@class='tbg']//td[@colspan='10' or @colspan='11']//a[contains(@href, 'karte.php?d=')]/span/..");
			break;
		case 340:
			villages = xpath("id('content')/table[@class='std troop_details']//th[@colspan='10' or @colspan='11']/a[contains(@href, 'karte.php?d=')]/span/..");
			break;
		case 350:
			villages = xpath("id('build')/table[@class='troop_details']/thead//td[@colspan='10' or @colspan='11']/a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);
		if (!renamedVillages[id]) continue;
		var text;
		if (server.version == 350) {
			text = villages[i];
		} else {
			text = villages[i].childNodes[0];
		}
		var s = findInfoText(text.textContent, [
			_("Rally point|Reinforcement for "),
			_("Rally point|Return from "),
			_("Raid against "),
			_("Attack against "),
			_("Scouting of ")
		]);
		if (s) {
			nodeChangeName({element: text, id: id, prepend: s});
		} else {
			nodeChangeName({element: text, id: id, html: true, replace: false, prepend: " <span style='font-size: x-small;'>(", append: ")</span>"});
		}
	}
}

function renameMarketplace()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	switch (server.version) {
		case 310:
			var links = xpath("id('lmid2')/p[@class='txt_menue']/a");
			if (links.length != 4 || links[1].search.indexOf("&t=1") == -1 || links[2].search.indexOf("&t=2") == -1 || links[3].search.indexOf("&t=3") == -1) return;
			break;
		case 340:
			var links = xpath("id('content')/p[@class='txt_menue']/a");
			if (links.length != 4 || links[1].search.indexOf("&t=1") == -1 || links[2].search.indexOf("&t=2") == -1 || links[3].search.indexOf("&t=3") == -1) return;
			break;
		case 350:
			var links = xpath("id('textmenu')/a");
			if (links.length < 3 || links.length > 4) return;
			if (links[1].search.indexOf("&t=1") == -1 || links[2].search.indexOf("&t=2") == -1) return;
			if (links.length == 4 && links[3].search.indexOf("&t=3") == -1) return;
			break;
		default:
			return;
	}

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')//form[@name='snd']/table[@class='tbg']//td[@colspan='2']//a[contains(@href, 'karte.php?d=')]/span/..");
			break;
		case 340:
			villages = xpath("id('content')//form[@name='snd']/table[@class='tbg']//td[@colspan='2']//a[contains(@href, 'karte.php?d=')]/span/..");
			break;
		case 350:
			villages = xpath("id('build')/form[@name='snd']/table[@class='traders']/thead//td[@colspan='2']/a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);

		if (!renamedVillages[id]) continue;

		var text;
		switch (server.version) {
			case 310:
				text = villages[i].childNodes[0];
				break;
			case 340:
				text = villages[i].childNodes[0];
				break;
			case 350:
				text = villages[i];
				break;
			default:
				continue;
		}

		var s = findInfoText(text.textContent, [
			_("Transport to "),
			_("Transport from "),
			_("Marketplace|Return from ")
		]);
		if (s) {
			nodeChangeName({element: text, id: id, prepend: s});
		} else {
			nodeChangeName({element: text, id: id, html: true, replace: false, prepend: " <span style='font-size: x-small;'>(", append: ")</span>"});
		}
	}

	var village;
	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//form[@name='snd']//table//p[@class='f135']");
			break;
		case 340:
			village = xpath1("id('content')//form[@name='snd']//table//p[@class='f135']");
			break;
		case 350:
			village = xpath1("id('target_validate')//td[@class='vil'][@colspan='2']");
			break;
		default:
			village = false;
	}
	if (village) {
		var re = RegExp("\\((-?\\d+)\\|(-?\\d+)\\)");
		var m = re.exec(village.textContent);
		if (m) {
			var id = xy2id(parseInt(m[1]), parseInt(m[2]));

			if (renamedVillages[id]) {
				nodeChangeName({element: village, id: id, append: " (" + m[1] + "|" + m[2] + ")"});
			}
		}
	}
}

function renameHerosMansion()
{
	if (server.version != 350) return;

	var oases;
	switch (server.version) {
		case 350:
			oases = xpath("id('oases')/tbody//a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			oases = false;
	}
	if (!oases) return;

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");
	for (var i = 0; i < oases.length; i++) {
		var m = re.exec(oases[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);

		if (!renamedVillages[id]) continue;

		nodeChangeName({element: oases[i], id: id});
	}
}

function renameSendTroops()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var village;
	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')/form[@action='a2b.php']/table//td//a[contains(@href, 'karte.php?d=')]");
			break;
		case 340:
			village = xpath1("id('content')/form[@action='a2b.php']/table//td//a[contains(@href, 'karte.php?d=')]");
			break;
		case 350:
			village = xpath1("id('short_info')//a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			village = false;
	}
	if (!village) return;

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");
	var m = re.exec(village.href);
	if (!m) return;
	var id = parseInt(m[1]);
	var xy = id2xy(id);

	var newName = renamedVillages[id];
	if (!renamedVillages[id]) return;

	nodeChangeName({element: village, id: id, append: " (" + xy[0] + "|" + xy[1] + ")"});

	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//table[@class='tbg']//td[@colspan='10' or @colspan='11']/b");
			break;
		case 340:
			village = xpath1("id('content')//table[@class='std troop_details']//thead//th[@colspan='10' or @colspan='11']");
			break;
		case 350:
			village = xpath1("//table[@class='troop_details']/thead//td[@colspan='10' or @colspan='11']");
			break;
		default:
			village = false;
	}

	if (village) {
		var s = findInfoText(village.textContent, [
			_("Send troops|Reinforcement for "),
			_("Raiding "),
			_("Attacking "),
			_("Scouting ")
		]);
		if (s) {
			nodeChangeName({element: village, id: id, prepend: s});
		} else {
			nodeChangeName({element: village, id: id, html: true, replace: false, prepend: " <span style='font-size: x-small;'>(", append: ")</span>"});
		}
	}

	switch (server.version) {
		case 340:
		case 350:
			village = xpath1("id('content')/h1");
			break;
		default:
			village = false;
	}
	if (village) {
		var s = findInfoText(village.textContent, [
			_("Send troops|Reinforcement for "),
			_("Raiding "),
			_("Attacking "),
			_("Scouting ")
		]);
		if (s) {
			nodeChangeName({element: village, id: id, prepend: s});
		} else {
			nodeChangeName({element: village, id: id, html: true, replace: false, prepend: " <span style='font-size: x-small;'>(", append: ")</span>"});
		}
	}

	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//table[@class='tbg']//td[@width='21%']/b");
			break;
		case 340:
			village = xpath1("id('content')//table[@class='std troop_details']//thead//th[1]");
			break;
		case 350:
			village = xpath1("id('troop_details')/thead//td[1]");
			break;
		default:
			village = false;
	}
	if (village) {
		if (renamedVillages[player.currentVillage]) {
			nodeChangeName({element: village, id: player.currentVillage, prepend: "\xA0"});
		}
	}
}

function renameSpieler()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var m = location.href.match(/uid=(\d+)/);
	var ownProfile = (!m || parseInt(m[1]) == player.uid);

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')/table//a[contains(@href, 'karte.php?d=')]");
			break;
		case 340:
		case 350:
			villages = xpath("id('content')/table//a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);

		if (villages.length == 1 && ownProfile) {
			updateSingleVillageInfo(id);
			player.currentVillage = id;
		}

		if (!renamedVillages[id]) continue;
		updateOriginalName(id, villages[i].textContent);

		nodeChangeName({element: villages[i], id: id});
	}
}

function renameStatistiken()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var re = RegExp("karte\\.php\\?d=(\\d+)&c=");

	var villages;
	switch (server.version) {
		case 310:
			villages = xpath("id('lmid2')/form[@action='statistiken.php']/table//a[contains(@href, 'karte.php?d=')]");
			break;
		case 340:
			villages = xpath("id('content')/table[contains(@class, 'villages')]//a[contains(@href, 'karte.php?d=')]");
			break;
		case 350:
			villages = xpath("id('villages')//a[contains(@href, 'karte.php?d=')]");
			break;
		default:
			villages = [];
	}
	for (var i = 0; i < villages.length; i++) {
		var m = re.exec(villages[i].href);
		if (!m) continue;
		var id = parseInt(m[1]);

		if (!renamedVillages[id]) continue;
		updateOriginalName(id, villages[i].textContent);

		nodeChangeName({element: villages[i], id: id});
	}
}

function showVillageList()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var content;
	switch (server.version) {
		case 310:
			content = document.getElementById("lmid2");
			break;
		case 340:
		case 350:
			content = document.getElementById("content");
			break;
		default:
			content = false;
	}
	if (!content) return;

	var villageList = storage.globalList.data
	villageList.sort(function(a, b){ var s1 = a.n.toUpperCase(), s2 = b.n.toUpperCase(); if (s1 > s2) return 1; else if (s1 < s2) return -1; else return 0; });

	var table;
	switch (server.version) {
		case 350:
			var rows = "";
			for (var i = 0; i < villageList.length; i++) {
				var village = villageList[i];
				xy = id2xy(village.i);
				rows += "<tr>" +
					"<td><img class='tvr-button' src='" + images["reset"] + "' title='" + _("Reset") + "' tvr_id='" + village.i + "'></td>" +
					"<td class='nam'><a href='/karte.php?z=" + village.i + "' title='" + (_("Original village name: ") + village.o) + "'>" + village.n + "</a></td>" +
					"<td class='aligned_coords'" +
						"<div class='cox'>(" + xy[0] + "</div>" +
						"<div class='pi'>|</div>" +
						"<div class='coy'>" + xy[1] + ")</div>" +
					"</td>"+
					"</tr>";
			}

			table = "" +
				"<table id='villages'><thead>" +
				"<tr><th colspan='3'>" + _("Renamed villages:") + "</th></tr>" +
				"<tr><td></td><td>" + _("Name") + "</td><td>" + _("Coordinates") + "</td></tr>" +
				"</thead><tbody>" +
				rows +
				"</tbody></table>";
			break;
		default:
			var rows = "";
			for (var i = 0; i < villageList.length; i++) {
				var village = villageList[i];
				xy = id2xy(village.i);
				rows += "<tr>" +
					"<td><img class='tvr-button' src='" + images["reset"] + "' title='" + _("Reset") + "' tvr_id='" + village.i + "'></td>" +
					"<td class='nam'><a href='/karte.php?z=" + village.i + "' title='" + (_("Original village name: ") + village.o) + "'>" + village.n + "</a></td>" +
					"<td>(" + xy[0] + "|" + xy[1] + ")</td>" +
					"</tr>";
			}

			table = "<p>" +
				"<table cellspacing='1' cellpadding='2' class='tbg'><tbody>" +
				"<tr><td colspan='3' class='rbg'>" + _("Renamed villages:") + "</td></tr>" +
				"<tr class='cbg1'><td></td><td>" + _("Name") + "</td><td>" + _("Coordinates") + "</td></tr>" +
				rows +
				"</tbody></table></p>";
	}

	var list = document.getElementById("tvr-list");
	if (list) list.parentNode.removeChild(list);
	var div = createNode("div", {id: "tvr-list"}, {innerHTML: table});

	div.addEventListener("click", function(e){
		var target = e.target;
		if (target.nodeType == 3) target = target.parentNode;

		var id = target.getAttribute("tvr_id");
		if (!id) return true;

		resetVillageName(id, true);
		renameOwnVillages();
		if (renamedVillages[id]) delete(renamedVillages[id]);
		showVillageList();

		return false;
	}, false);

	content.appendChild(div);
}

function showConfiguration()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var content;
	switch (server.version) {
		case 310:
			content = document.getElementById("lmid2");
			break;
		case 340:
		case 350:
			content = document.getElementById("content");
			break;
		default:
			content = false;
	}
	if (!content) return;

	var configuration = [
		["changeTooltip", _("Show original village name as a tooltip")]
	];

	var rows = "";
	for (var i = 0; i < configuration.length; i++) {
		var input;
		var id = "tvr-config-" + i;
		switch (typeof config[configuration[i][0]]) {
			case "boolean":
				input = "<input type='checkbox' name='" + id + "' id='" + id + "'" + (config[configuration[i][0]] ? " checked='checked'" : "") + ">";
				break;
			default:
				input = false;
		}
		if (!input) continue;

		switch (server.version) {
			case 350:
				rows += "<tr>";
				rows += "<td><label for='" + id + "'>" + configuration[i][1] + "</label></td>";
				rows += "<td style='text-align: center;'>" + input + "</td>";
				rows += "</tr>";
				break;
			default:
				rows += "<tr>";
				rows += "<td class='s7'><label for='" + id + "'>" + configuration[i][1] + "</label></td>";
				rows += "<td>" + input + "</td>";
				rows += "</tr>";
		}
	}

	var table;
	switch (server.version) {
		case 350:
			table = "" +
				"<table id='ttools'><thead>" +
				"<tr><th colspan='2'>" + script.name + " - " + _("Preferences") + "</th></tr>" +
				"<tr><td>" + _("Description") + "</td><td>" + _("Value") + "</td></tr>" +
				"</thead><tbody>" +
				rows +
				"</tbody></table>";
			table += "<p class='btn'><input type='image' alt='" + _("Save") + "' src='img/x.gif' class='dynamic_img' id='btn_save' name='s1' value=''/></p>";
			break;
		default:
			table = "<p>" +
				"<table cellspacing='1' cellpadding='2' class='tbg'><tbody>" +
				"<tr><td colspan='2' class='rbg'>" + script.name + " - " + _("Preferences") + "</td></tr>" +
				"<tr class='cbg1'><td>" + _("Description") + "</td><td>" + _("Value") + "</td></tr>" +
				rows +
				"</tbody></table></p>";
			table += "<p align='center'><input type='image' alt='" + _("Save") + "' src='img/x.gif' class='dynamic_img' id='btn_save' name='s1' value=''/></p>";
	}

	var div = createNode("div", {id: "tvr-config"}, {innerHTML: table});
	content.appendChild(div);

	var save_btn = document.getElementById("btn_save");
	if (save_btn) {
		save_btn.addEventListener("click", function(){
			for (var i = 0; i < configuration.length; i++) {
				var value;
				var id = "tvr-config-" + i;
				var input = document.getElementById(id);
				if (!input) continue;
				switch (typeof config[configuration[i][0]]) {
					case "boolean":
						value = input.checked;
						break;
					default:
						continue;
				}

				if (value !== storage.config.data[configuration[i][0]]) {
					storage.config.data[configuration[i][0]] = value;
					storage.config.dirty = true;
				}
			}
			config = storage.config.data;
			saveStorage();
			window.location = window.location;
		}, false);
	}
}

function checkUpdate()
{
	var remoteDate =  storage.updateInformations.data.v || 0;
	if (script.releaseDate > remoteDate) {
		storage.updateInformations.data = {v: script.releaseDate, t: startTime};
		storage.updateInformations.dirty = true;
		return;
	}

	if (startTime > (storage.updateInformations.data.t || 0) + script.updateInterval *  3600000) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/" + script.id + ".meta.js?" + startTime,
			headers: {"Cache-Control": "no-cache", "Pragma": "no-cache"},
			onload: function(response){
				if (response.status == 200) {
					storage.updateInformations.data.t = startTime;
					storage.updateInformations.dirty = true;

					var remoteScript = {};
					parseMetadata(response.responseText, remoteScript);
					if (remoteScript.releaseDate > script.releaseDate) {
						storage.updateInformations.data.v = remoteScript.releaseDate;
					}

					saveStorage();
				}
			}
		});
	}
}

function resetVillageName(villageId, global)
{
	for (var i = 0; i < storage.globalList.data.length; i++) {
		var village = storage.globalList.data[i];
		if (villageId == village.i) {
			if (renamedVillages[villageId]) {
				renamedVillages[villageId].name = village.o;
			}
			delete(storage.globalList.data[i]);
			storage.globalList.dirty = true;
			storage.globalList.data = storage.globalList.data.compact();

			saveStorage();
			break;
		}
	}
}

function updateVillageName(data, global)
{
	if (data.name == data.originalName) return;

	var idx = -1;

	for (var i = 0; i < storage.globalList.data.length; i++) {
		var village = storage.globalList.data[i];
		if (data.id == village.i) {
			idx = i;
			break;
		}
	}

	if (idx == -1) {
		var village = {i: data.id, n: data.name, o: data.originalName};
		storage.globalList.data.push(village);
		renamedVillages[data.id] = {name: data.name, originalName: data.originalName};
	} else {
		storage.globalList.data[idx].n = data.name;
		renamedVillages[data.id] = {name: data.name, originalName: storage.globalList.data[idx].o};
	}

	storage.globalList.dirty = true;


	saveStorage();
}

function addRenameControls()
{
	if (server.version != 310 && server.version != 340 && server.version != 350) return;

	var re = RegExp("[\\?&]d=(\\d+)");
	var m = re.exec(location.href);
	if (!m) return;
	var id = parseInt(m[1]);

	var village;
	switch (server.version) {
		case 310:
			village = xpath1("id('lmid2')//h1/div[@class='ddb'][1]");
			break;
		case 340:
		case 350:
			village = xpath1("id('content')/h1/div");
			break;
		default:
			village = false;
	}
	if (!village) {
		switch (server.version) {
			case 340:
			case 350:
				village = xpath1("id('content')/h1");
				if (village) {
					var m = village.textContent.match(/^\s*(.*?)\s*(\(-?\d+\|-?\d+\))\s*$/);
					if (m) {
						village.innerHTML = "<div>" + m[1] + "</div>&nbsp" + m[2];
						village = xpath1("id('content')/h1/div");
					}
				}
				break;
			default:
				village = false;
		}
	}
	if (!village) return;

	village.id = "tvr-name";
	if (server.version == 310) village.parentNode.parentNode.style.zIndex = 10;

	if (storage.updateInformations.data.v > script.releaseDate) {
		var div = createNode("div", {id: "tvr-update", class: (server.version == 310 ? "ddb" : "")});
		var update = createNode("img", {class: "tvr-button", title: _("New Version Available. Click to Update."), src: images["update"]});

		update.addEventListener("click", function(){
			GM_openInTab('http://userscripts.org/scripts/source/'+script.id+'.user.js');
		}, false);

		div.appendChild(update);
		div.appendChild(document.createTextNode("\xA0"));
		village.parentNode.insertBefore(div, village);
	}

	var div = createNode("div", {id: "tvr-box", class: (server.version == 310 ? "ddb" : ""), style: "display: none;"});
	var save = createNode("img", {class: "tvr-button", title: _("Save"), src: images["save"]});
	var cancel = createNode("img", {class: "tvr-button", title: _("Cancel"), src: images["cancel"]});
	var reset = createNode("img", {class: "tvr-button", title: _("Reset"), src: images["reset"]});
	var text = createNode("input", {id: "tvr-text", class: "a", type: "text", size: 20, maxlength: 20, value: ""});

	function updateName(action)
	{
		var box = document.getElementById("tvr-box");
		var text = document.getElementById("tvr-text");
		var change = document.getElementById("tvr-change");
		var name = document.getElementById("tvr-name");

		if (action == "save") {
			updateVillageName({id: id, name: text.value, originalName: name.textContent}, true);
			renameOwnVillages();
			renameKarte();
		} else if (action == "reset") {
			resetVillageName(id, true);
			renameOwnVillages();
			renameKarte();
			if (renamedVillages[id]) delete(renamedVillages[id]);
		}

		box.style.display = "none";
		change.style.display = "block";
		name.style.display = "block";
	}

	save.addEventListener("click", function(){
		updateName("save");
	}, false);
	cancel.addEventListener("click", function(){
		updateName("cancel");
	}, false);
	reset.addEventListener("click", function(){
		updateName("reset");
	}, false);
	text.addEventListener("keydown", function(e){
		switch (e.keyCode) {
			case 13:
				updateName("save");
				return false;
			break;
			case 27:
				updateName("cancel");
				return false;
			break;
			default:
				return true;
		}
	}, false);
	var blurTimer = false;
	text.addEventListener("blur", function(e){
		if (document.getElementById("tvr-box").style.display != "block") return true;
		if (!blurTimer) blurTimer = setTimeout(function(){
			if (blurTimer) {
				clearTimeout(blurTimer);
				blurTimer = false;
			}
			if (document.getElementById("tvr-box").style.display != "block") return true;
			updateName("cancel");
		}, 250);
	}, false);

	div.appendChild(save);
	div.appendChild(cancel);
	div.appendChild(reset);
	div.appendChild(text);
	village.parentNode.insertBefore(div, village);

	var div = createNode("div", {id: "tvr-change", class: (server.version == 310 ? "ddb" : "")});
	var edit = createNode("img", {class: "tvr-button", title: _("Change village name"), src: images["edit"]});
	edit.addEventListener("click", function(){
		var box = document.getElementById("tvr-box");
		var text = document.getElementById("tvr-text");
		var change = document.getElementById("tvr-change");
		var name = document.getElementById("tvr-name");

		text.value = renamedVillages[id] ? renamedVillages[id].name : name.textContent;

		box.style.display = "block";
		change.style.display = "none";
		name.style.display = "none";

		text.focus();
	}, false);

	div.appendChild(edit);
	div.appendChild(document.createTextNode("\xA0"));
	village.parentNode.insertBefore(div, village);
}

function displayRuntime()
{
	var div = xpath1("//div[@id='ltime']/br");
	if (div) {
		var width = window.getComputedStyle(div.parentNode, null).width;
		if (width && parseInt(width) > 0)
			div.parentNode.style.width = (parseInt(width) + 40) + "px";
		var endTime = new Date().getTime();
		var timeval = endTime - startTime;
		var span = createNode("span", {title: script.name + " v" + script.version}, {innerHTML: " | <b>" + timeval + "</b> ms"});
		div.parentNode.insertBefore(span, div);
	}
}

if (!getPlayerInfo()) return;
parseMetadata(meta, script);
initLanguage();
loadStorage();
checkUpdate();
addStyle(css);

findAndRenameOwnVillages();
if (location.href.indexOf("dorf1.php") != -1 || location.href.indexOf("dorf2.php") != -1)
	renameDorf1();
if (location.href.indexOf("dorf3.php") != -1)
	renameDorf3();
if (location.href.indexOf("karte.php?") != -1 && location.href.indexOf("d=") != -1)
	renameKarte();
if (location.href.indexOf("berichte.php?") != -1 && location.href.indexOf("id=") != -1)
	renameBerichte();
if (location.href.indexOf("build.php?") != -1 && location.href.indexOf("s=4") != -1)
	renameExpansion();
if (location.href.indexOf("build.php") != -1) {
	renameRallyPoint();
	renameMarketplace();
}
if (location.href.indexOf("build.php?") != -1 && location.href.indexOf("&land") != -1)
	renameHerosMansion();
if (location.href.indexOf("a2b.php") != -1)
	renameSendTroops();
if (location.href.indexOf("spieler.php") != -1)
	renameSpieler();
if (location.href.indexOf("statistiken.php?id=2") != -1)
	renameStatistiken();

if (location.href.indexOf("spieler.php?s=2") != -1) {
 	showVillageList();
	showConfiguration();
}

if (location.href.indexOf("karte.php?") != -1 && location.href.indexOf("d=") != -1)
	addRenameControls();

saveStorage();

displayRuntime();
