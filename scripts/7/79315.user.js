// ==UserScript==
// @name           The West_-_Tenue [Multi]
// @description    Changer de Tenue en 1 Click!
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*/game.php*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.30
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows

"use strict";

function getMoCheckVersion() {
	return "1.30";
}

var wardrobe_text={en:'Wardrobe', sk:'Šatník', cz:'Skrín', fr:'Tenue'};
var new_name_text={en:'New name', sk:'Nový názov', cz:'Nový název', fr:'Nouveau nom'};
var cancel_button_text={en:'Cancel', sk:'Zrušit', cz:'Zrušit', fr:'Annuler'};
var delete_button_text={en:'Delete', sk:'Zmazat', cz:'Smazat', fr:'Suppr.'};
var save_button_text={en:'Save', sk:'Uložit', cz:'Uložit', fr:'Sauv.'};
var save_message_text={en:'Wardrobe is saved', sk:'Šatník bol uložený', cz:'Skrín byla uložena', fr:'Tenue mise à jour'};
var confirm_overwrite_text={
	en:'Do you realy want to overwrite wardrobe ',
	sk:'Naozaj chceš prepísat oblecenie s názvom ',
	cz:'Skutecne chceš prepsat oblecení pod názvem ',
	fr:'Voulez-vous vraiment modifier la tenue '
};
var save_choose_name_error_text={
	en:'You must pick "New name" or one existing wardrobe!',
	sk:'Najprv musíš vybrat položku "Nový názov" alebo už existujúcu položku!',
	cz:'Musíš nejdrív vybrat položku "Nový název" nebo už existující položku!',
	fr:'Vous devez choisir "Nouveau nom" ou une tenue existante !'
};
var save_invalid_name_error_text={
	en:'Wardrobe name contains invalid characters!',
	sk:'Názov oblecenia obsahuje neplatné znaky!',
	cz:'Název oblecení obsahuje neplatné znaky!',
	fr:'Le nom de la tenue contient des caractères invalides !'
};
var delete_choose_name_error_text={
	en:'You must pick existing wardrobe!',
	sk:'Najprv musíš vybrat položku!',
	cz:'Musíš nejdrív vybrat položku!',
	fr:'Vous devez choisir une tenue existante !'
};

var maxRetry=3;
var retryPeriod=300;
var gQueue = [];
var gQueueIndex = 0;
var gQueueTimer = 0;
var gQueueHPChange = [];

var gLocation = window.location.href;
var gArmorInputType = 'drop';
var gInputElement = null;

var menuButtonImg='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';
var buttonImg='Qk1OFQAAAAAAADYAAAAoAAAARwAAABkAAAABABgAAAAAABgVAAAAAAAAAAAAAAAAAAAAAAAAHCE0\nHCE0GyAyGyAyHCI2HCI1HCE0ExgpFRorGR4wGyAyGyAxGyAxHCE0HCE0GyAyGyAyHCI2HCI1HCE0\nGyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9JC1AGR4wGyAyGyAxGyAxHCE0\nHCE0GyAyGyAyHCI2HCI1HCE0GyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9\nGh8xGyAyGyAyIyw9FRorExgpHCE0HCI1HCI2GyAyGyAyHCE0HCE0AAAAIys9VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0Iys9AAAAIis8VmZ0JzZHOEpfPE9hKjVHR2BzMD9SHCEy\nGh8wGh8wGB0uGR4vGR4vGR4vGh8xGh8xGR8wFx0vGB0wGB4vGB4wGyAyGyAyGiAxGiAxGiAyGiAy\nIis9Iis9ISo8Iis9Iyw9Iys9Gh8wGh8wGB0uGR4vGR4vGR4vGh8xGh8xGR8wFx0vGB0wGB4vGB4w\nGyAyGyAyGiAxGiAxGiAyGiAyIis9Iis9ISo8Iis9Iyw9GiAxGiAyGiAyIis9HCEyMD9SR2BzKjVH\nPE9hOEpfJzZHVmZ0Iis8AAAAIy1AVmZ0OkxdHCEyHiU3NklaM0NWHiM2HCE0GyAzGyAzGyAzGyE0\nGiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAz\nGiAyGiAyGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0v\nGR8xGR8xGiAyGR8xGiAyGiAzGiAyFx0vGR8xGR8xGiAyHCE0HiM2M0NWNklaHiU3HCEyOkxdVmZ0\nIy1AAAAAIyw+VmZ0OlBiGR4vOUxfLDhLGyAxGyAxGB0vGh8yGh8yGiAxGh8wGh8wGR4vGR4vGR4v\nGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8y\nGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAy\nGiAyFhwuFBosFx0vGB4wGR8xGR8xGB0vGyAxGyAxLDhLOUxfGR4vOlBiVmZ0Iyw+AAAAIys9VmZ0\nKjZJMEBRHyc5OExeGyAyGR4wGB4wGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEz\nGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAz\nGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGiAy\nGR8xGB4wFx0wGB4wGR4wGyAyOExeHyc5MEBRKjZJVmZ0Iys9AAAAIyw9VmZ0RmF0OExeGh8wGR4v\nGh8wGyAzGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8y\nGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAy\nGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8yGiAyGiAyGiAyGR8x\nGyAzGh8wGR4vGh8wOExeRmF0VmZ0Iyw9AAAAJC0+VmZ0LDlJGyM0GyE0HCEzGyAxGyEyGiAyGyEz\nGR8xGiAyGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAz\nGiAyGiAyGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0v\nGR8xGR8xGiAyGR8xGiAyGiAzGiAyGyAxGR4vGh8xGiAyGiAyGiAyGyE0GiAyGyEyGyAxHCEzGyE0\nGyM0LDlJVmZ0JC0+AAAAJC0+VmZ0His+GB0vHCEyFBosExkrEhgqExkrFBosExkrEhgqGR4vGR4v\nGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8y\nGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAy\nGiAyFhwuFBosGh8wHCE0GyAyGyEzGyEzGyEzGB0uExkrEhgqExkrFBosHCEyGB0vHis+VmZ0JC0+\nAAAAIys9VmZ0His+Gh8yHCEyGyAzGiAyGB4yGB8zGB8zGiAyGB4yGyEzGiAyGB4wGR8xGiAzGyEz\nGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAz\nGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyAy\nGyAzGyAyGiAyGiAzGiA0GiAxGB8zGB4yGiAyGyAzHCEyGh8yHis+VmZ0Iys9AAAAISs9VmZ0His+\nGiAxHCEyGh8xGyAyGyAzGyAzGiAyGyAyGyAzGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8y\nGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAy\nGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wFxwtGB0uFxwtFhwvFBos\nFhstFxwtGyAzGyAzGyAyGh8xHCEyGiAxHis+VmZ0ISs9AAAAIyw+VmZ0His+GB0vHCEyGh8wGR4w\nGyAzHCE0Gh8wGR4wGyAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0w\nGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8x\nGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyAyGyAzHCEzHCE1HCE1HCI2GyAyHCE0GyAz\nGR4wGh8wHCEyGB0vHis+VmZ0Iyw+AAAAHyg5VmZ0His+HCEzHCEyGyAyGyAxGyAxGyAyFxwtGyAx\nGyAxGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4w\nGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAy\nGiAyGiAyGiAzGyEzGiAyGB4wGyAyGyAzGyAyHCI3HCI3GyAzGh8wGyAyGyAxGyAxGyAyHCEyHCEz\nHis+VmZ0Hyg5AAAAISo7VmZ0His+GyAzHCEyGyEyGyAyHCE0Gh8wGyAzGyAyHCE0HCE0GyE0HCE0\nGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAzGiAyGiAy\nGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8x\nGiAyGR8xGiAyGiAzGiAyExgqFRosGh8xGyAxGh8wHCE0GyAyGyEyHCEyGyAzHis+VmZ0ISo7AAAA\nJC1AVmZ0His+GyE0HCEyGyEzHCEyHCI3FxwtGR4wHCEyHCI3HCI2GyAzHCEzGR4vGR4vGB0vFx0u\nFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8yGiAxGh8w\nGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwu\nFBosGR8yGR8yGh8xGh8wFxwtHCI3HCEyGyEzHCEyGyE0His+VmZ0JC1AAAAAIy1AVmZ0His+HCEz\nHCEyHCE0HCI1GR4wGh8wGyAzHCI1GR4wGB0vGB0vGh8xGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8x\nGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAy\nGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyEyGyAyGyAx\nGyAxGh8wGR4wHCI1HCE0HCEyHCEzHis+VmZ0Iy1AAAAAHyc5VmZ0His+HCEzHCEyHCE0HCE1GR8x\nFxwtGR4wHCE1GR8xGB0vFxwuFx0uGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAy\nGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4w\nGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGh8xHCEzGyEzGh8wFxwtGR8xHCE1\nHCE0HCEyHCEzHis+VmZ0Hyc5AAAAIys+VmZ0LDlJGyM0GyE0HCEzGyAxGyEyGh8wGh8wHCEyGyE0\nHCE0GyE0GR4wGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAy\nFhwuFBosFRstGh8yGh8yGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwv\nFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosGyAyGh8xGyAyGyAyGh8wGyEyGyAxHCEzGyE0GyM0LDlJ\nVmZ0Iys+AAAAIyw/VmZ0RmF0OExeGh8wGR4vGh8wGyAzGyAxGh8wGyAyGiAxGR4vGR4vGyAxGyEz\nGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAy\nGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0w\nGR8xFRstFhwuGB4xGyAxHCEyGyE0FxwtGyAxGyAzGh8wGR4vGh8wOExeRmF0VmZ0Iyw/AAAAJC1A\nVmZ0KjZJMEBRHyc5OExeGyAyGR4wGyAxGh8xGh8xGh8xGyAxGyAxGh8wGR8xGR8xGiAyGiAyGR8x\nGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8x\nGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4w\nGyAxGyAxGyAxGR4vGyAxGR4wGyAyOExeHyc5MEBRKjZJVmZ0JC1AAAAAIy1AVmZ0OlBiGR4vOUxf\nLDhLGyAxGyAxGyAyGR4wGR4wGB0vGR4vGh8wGh8wGR4wFx0vFhstFxwtGB0uGR4vGyAxHCEyGyAy\nGyAyGh8xGyAyGh8wGyAxGyAxGyAxGyAxGyAxGh8wGR4wGR4wGB0vGR4vGh8wGh8wGR4wFx0vFhst\nFxwtGB0uGR4vGyAxHCEyGyAyGyAyGh8xGyAyGh8wGyAxGyAxGyAxGyAxGyAxGh8xGyAyGh8wGyAx\nGyAyGyAxGyAxLDhLOUxfGR4vOlBiVmZ0Iy1AAAAAHyc5VmZ0OkxdHCEyHiU3NklaM0NWHiM2HCEy\nHCEzHCEzHCE0HCE0GyAxGh8wGyAxGyEzHCI1HCE0GyAzGyAxGh8xGyAxHCEzHCEzGyEzGyAyGh8x\nGR4wGh8xGh8wGyAyHCE0GyAzHCEzHCEzHCE0HCE0GyAxGh8wGyAxGyEzHCI1HCE0GyAzGyAxGh8x\nGyAxHCEzHCEzGyEzGyAyGh8xGR4wGh8xGh8wGyAyHCE0GyEzGyAyGh8xGR4wHCEyHiM2M0NWNkla\nHiU3HCEyOkxdVmZ0Hyc5AAAAIys+VmZ0JzZHOEpfPE9hKjVHR2BzMD9SGyAxHCEzGh8xGR4vGR4v\nGyAxGh8wGh8wGR4vGh8xHCE0HCE0GyEyHCEzGh8wGB0vGR8xGyA0GiAyFhssFx0uGiAxGyIzGyIz\nHSM2HSQ2HCEzGh8xGR4vGR4vGyAxGh8wGh8wGR4vGh8xHCE0HCE0GyEyHCEzGh8wGB0vGR8xGyA0\nGiAyFhssFx0uGiAxGyIzGyIzHSM2GyA0GiAyFhssFx0uGyAxMD9SR2BzKjVHPE9hOEpfJzZHVmZ0\nIys+AAAAIyw/VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0Iyw/AAAAHCE0HCE0\nGyAyGyAyHCI2HCI1HCE0ExgpFRorGR4wGyAyGyAxGyAxHCE0HCE0GyAyGyAyHCI2HCI1HCE0GyAy\nGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9JC1AGR4wGyAyGyAxGyAxHCE0HCE0\nGyAyGyAyHCI2HCI1HCE0GyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9Gh8x\nGyAyGyAyIyw9FRorExgpHCE0HCI1HCI2GyAyGyAyHCE0HCE0AAAA';
//'

var gLang='en';
(function(){
	var pos = gLocation.indexOf("//");
	var lang = gLocation.substring(pos+2, pos+4);
	if (wardrobe_text[lang]) { gLang=lang; }
}());



function isNull(variable)
{
	return (typeof(variable) === "undefined" || variable === null) ? true : false;
}

function trim(str)
{
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function getServer(loc)
{
	loc = loc.substring(loc.indexOf('//')+2);
	loc = loc.substring(0, loc.indexOf('/'));
	return loc;
}

function insertAfter(newNode, referenceNode) { referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling); }

function hideElement(element) { element.style.display='none'; }

function showElement(element) { element.style.display='block'; }

function toggleElement(element) { if (element.style.display==='none') {showElement(element);} else {hideElement(element);} }

function isElementHidden(element)
{
	return element.style.display !== 'block';
}

function removeElement(el)
{
	el.parentNode.removeChild(el);
}

function getArmorSet(setName)
{
	return GM_getValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, '');
}

function setArmorSet(setName, value)
{
	GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, value);
}

function removeArmorSet(setName)
{
	if (GM_deleteValue) {
		GM_deleteValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName);
	} else {
		GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, '');
	}
}

function getListOfSets()
{
	return GM_getValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+':listOfSets', '');
}

function setListOfSets(value)
{
	GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+':listOfSets', value);
}

// check validity of set name - must not contain ';'
function isValidSetName(setName)
{
	return (setName.indexOf(';') < 0);
}

function isInList(list, value, delimiter)
{
	if (delimiter === undefined) {
		delimiter = ';';
	}
	var pos = list.indexOf(value);

	if (pos < 0) { return false; }
	// check if value is one whole item, not just part of a item
	if (pos > 0  &&  list[pos - 1] !== delimiter) {
		// non-delimiter before
		return false;
	}
	if (pos + value.length < list.length  &&  list[pos + value.length] !== delimiter) {
		// non-delimiter after
		return false;
	}

	return true;
}


// select given set name in inventory dropdown
function selectInvDropDown(setName)
{
	if (gArmorInputType !== 'drop' || isNull(gInputElement) || isNull(gInputElement.options)) {
		return false;
	}

	var options = gInputElement.options;
	var i;

	for (i in options) {
		if (options[i].value === setName) {
			options[i].selected = true;
			return true;
		}
	}

	return false;
}

function selectInvDropDownFromMenuDropDown()
{
	var dropDown = document.getElementById('armorset_combobox');
	if (isNull(dropDown)) { return false; }
	var option = dropDown.options[dropDown.selectedIndex];
	return selectInvDropDown(option.value);
}


function changeToTextBox(elem)
{
	gInputElement = document.createElement('input');
	gInputElement.style.width = '123px';
	insertAfter(gInputElement, elem);
	removeElement(elem);
	gInputElement.focus();
	gArmorInputType = 'text';
	var codb = document.getElementById('wardrobe_cancelOrDelete_button');
	if (codb) {
		codb.innerHTML = cancel_button_text[gLang];
	}
}

function invDropDownOnChange(event)
{
	if (this.selectedIndex === this.length - 1) {
		// last, i.e. 'New name' option selected
		changeToTextBox(gInputElement);
	}
}

function createDropInvDropDown()
{
	var list, count, nNewItem, name, pos;

	gInputElement = document.createElement('select');
	gInputElement.style.width = '127px';
	gInputElement.addEventListener('change', invDropDownOnChange, false);

	list = getListOfSets();
	count = 0;
	while (list.length > 0) {
		pos = list.indexOf(';');
		if (pos < 0) {
			name = list;
			list = '';
		} else {
			name = list.substring(0, pos);
			list = list.substring(pos + 1);
		}
		if (name === '') {
			// ignore empty set names for backward compatibility
			continue;
		}
		count++;
		nNewItem = document.createElement('option');
		nNewItem.innerHTML = name;
		gInputElement.appendChild(nNewItem);
	}

	if (count < 1) {
		// empty list - add one empty option
		nNewItem = document.createElement('option');
		nNewItem.innerHTML = '';
		gInputElement.appendChild(nNewItem);
	}

	// add 'New name' option
	nNewItem = document.createElement('option');
	nNewItem.innerHTML = '... ' + new_name_text[gLang] + ' ...';
	gInputElement.appendChild(nNewItem);

	var codb = document.getElementById('wardrobe_cancelOrDelete_button');
	if (codb) {
		codb.innerHTML = delete_button_text[gLang];
	}
}

function changeToDropDown(elem)
{
	createDropInvDropDown();
	insertAfter(gInputElement, elem);
	removeElement(elem);
	gArmorInputType = 'drop';
	gInputElement.focus();
}


function addToQueue(action, hpBonus)
{
	gQueue.push(action);
	gQueueHPChange.push(hpBonus);
}

function sortQueue()
{
  var sortElement = 
    function(a,b) {
      return b.hp-a.hp;
    } 
    
  var lQueue = [];
  var i;
  
  for (i in gQueueHPChange) {
    lQueue[i] = new Object();
    lQueue[i].item = gQueue[i];
    lQueue[i].hp   = gQueueHPChange[i];
  }
  
  lQueue = lQueue.sort(sortElement);

  // recreate gQueue in new order
  gQueue = [];
  gQueueHPChange = [];

  for (i in lQueue)
    addToQueue(lQueue[i].item, lQueue[i].hp);
}

function isUncarryAction(action)
{
	return ((action === 'head') ||
		(action === 'left_arm') ||
		(action === 'body') ||
		(action === 'right_arm') ||
		(action === 'yield') ||
		(action === 'foot') ||
		(action === 'neck') ||
		(action === 'pants') ||
		(action === 'belt') ||
		(action === 'animal')
	);
} 

function executeQueue(retry)
{
	gQueueTimer = 0;

	if (isNull(retry)) { retry=0; }
	if (gQueue.length === 0) {
		// queue finished, select set name in inventory's dropdown
		selectInvDropDownFromMenuDropDown();
		return;
	}
	if (retry >= maxRetry) {
		// retries failed, skipping item
		gQueueIndex++;
		if(gQueueIndex >= gQueue.length) {
			gQueueIndex=0;
			gQueue = [];
			gQueueHPChange = [];
			return;
		}
	}
	if (gQueueIndex >= gQueue.length) {
		// index out of bounds
		gQueueIndex=0;
		gQueue = [];
		gQueueHPChange = [];
		return;
	}

	var ok = false, found, i;
	var items, itemWearing;

	if (isUncarryAction(gQueue[gQueueIndex])){
		ok = unsafeWindow.Wear.uncarry(gQueue[gQueueIndex]);

		found = true;
	} else {
		items = unsafeWindow.Bag.getInstance().items;
		found = false;
		for (i in items) {
			if (items[i].get_short() === gQueue[gQueueIndex]) {
				found = true;
				itemWearing = unsafeWindow.Wear.wear[items[i].get_type()];
				if (!isNull(itemWearing) && itemWearing.get_short() === gQueue[gQueueIndex]) {
					ok = true;
					break;
				}
				ok = unsafeWindow.Bag.getInstance().carry(i);
				break;
			}
		}
	}

	if (found && !ok) {
		// something bad happened, try again
		gQueueTimer = setTimeout(function () {executeQueue(retry+1);}, retryPeriod*(retry+1)*2);
		return;
	}

	// proceed to next item in queue
	gQueueIndex++;
	if (gQueueIndex >= gQueue.length) {
		// queue finished, select set name in inventory's dropdown
		gQueueIndex = 0;
		gQueue = [];
		gQueueHPChange = [];
		selectInvDropDownFromMenuDropDown();
		return;
	}

	gQueueTimer = setTimeout(function () {executeQueue();}, retryPeriod);
}

function getHPBonus(id, isBagItem)
{
  var item = null;

  if(!isBagItem)
    item = unsafeWindow.Wear.get(id);
  else
    var i;
		var items = unsafeWindow.Bag.getInstance().items;
		for (i in items) {
			if (items[i].get_short() === id) {
				item = items[i];
				break;
			}
		}

  if (isNull(item)) return 0;
  
  var str    = 0;
  var hp     = 0;
  var setStr = 0; // not implemented yet
  var setHP  = 0; // not implemented yet
  
  try {
    str = item.obj.bonus.attributes.strength;
    if (isNull(str)) str = 0;
  } catch(e) {}
  
  try {
    hp = item.obj.bonus.skills.health;
    if (isNull(hp)) hp = 0;
  } catch(e) {}

  return str+hp+setStr+setHP;
}

function setArmorHelper(name, wanted, element) {
	if (wanted) {
		if (isNull(element) || element.get_short() !== wanted) {
			addToQueue(wanted, getHPBonus(wanted, true)-getHPBonus(name, false));
		}
	} else {
		if (!isNull(element)) {
			addToQueue(name, 0-getHPBonus(name, false)); // TODO set items needs to affect this line more
		}
	}
}

function setArmor(armorSet) {
	var 
    ANIMAL    = 0,
		BODY      = 1,
		FOOT      = 2,
		LEFT_ARM  = 3,
		HEAD      = 4,
		YIELD     = 5,
		RIGHT_ARM = 6,
		PANTS     = 7,
		BELT      = 8;
		NECK      = 9;

	if (document.getElementById('bag')) {
		unsafeWindow.AjaxWindow.maximize('inventory');
	} else {
		unsafeWindow.AjaxWindow.show('inventory');
		setTimeout(function(){addInventoryButtons();}, 100);
		setTimeout(function(){setArmor(armorSet);}, 1000);
		return;
	}
	
	// clean old queue
	window.clearInterval(gQueueTimer);
	gQueueIndex = 0;
	gQueue = [];
	gQueueHPChange = [];

	var setArray = [];
	setArray = armorSet.split(':');

	//remove wrong clothes and apply right clothes
	setArmorHelper('animal',    setArray[ANIMAL],    unsafeWindow.Wear.wear.animal);
	setArmorHelper('body',      setArray[BODY],      unsafeWindow.Wear.wear.body);
	setArmorHelper('foot',      setArray[FOOT],      unsafeWindow.Wear.wear.foot);
	setArmorHelper('left_arm',  setArray[LEFT_ARM],  unsafeWindow.Wear.wear.left_arm);
	setArmorHelper('head',      setArray[HEAD],      unsafeWindow.Wear.wear.head);
	setArmorHelper('yield',     setArray[YIELD],     unsafeWindow.Wear.wear.yield);
	setArmorHelper('right_arm', setArray[RIGHT_ARM], unsafeWindow.Wear.wear.right_arm);
	setArmorHelper('pants',     setArray[PANTS],     unsafeWindow.Wear.wear.pants);
	setArmorHelper('belt',		setArray[BELT],		 unsafeWindow.Wear.wear.belt);
	setArmorHelper('neck',      setArray[NECK],      unsafeWindow.Wear.wear.neck);

  sortQueue();
	executeQueue();
}

function setArmorOptionOnClick()
{
	var setName = this.value;
	var armorSet = getArmorSet(setName);
	setArmor(armorSet);
}

// fill options in element (menu_drop_down)
function createOptionsList(element)
{
	var list, name, nNewItem;

	// remove old options
	while (element.options.length > 0) {
		element.options[0] = null;
	}

	list = getListOfSets();
	while (list.length > 0) 
	{
		pos = list.indexOf(';');
		if (pos < 0) {
			name = list;
			list = '';
		} else {
			name = list.substring(0, pos);
			list = list.substring(pos + 1);
		}
		if (name === '') {
			// ignore empty set names for backward compatibility
			continue;
		}

		nNewItem = document.createElement('option');
		nNewItem.innerHTML = name;
		nNewItem.addEventListener('click', setArmorOptionOnClick, false);

		element.appendChild(nNewItem);
	}
}

function updateDropdown()
{
	var dropDown = document.getElementById('armorset_combobox');
	createOptionsList(dropDown);
}

// create right menu button & dropdown
function createDropdown()
{
	var rightmenu = document.getElementById('right_menu');

	var newLI = document.createElement('li');
	newLI.setAttribute('id', 'armorset_li');
	newLI.innerHTML= "<a href=\"#\"><div style=\"z-index:100; background-image:url(http://s2.noelshack.com/uploads/images/4908971823723_tenue_hackcrows.png); background-repeat:no-repeat; background-position:left top; width:128px; height:25px;\" onMouseMove=\"this.style.backgroundPosition = 'left bottom'\" onMouseOut=\"this.style.backgroundPosition = 'left top'\"></div></a>";
	rightmenu.appendChild(newLI);

	var newDropDown = document.createElement('select');
	newDropDown.setAttribute('id', 'armorset_combobox');
	newDropDown.style.width = '127px';
	newDropDown.style.position = 'relative';
  // fix for update 1.27
  right_work_bar = document.getElementById('workbar_right');
  if (right_work_bar) {
  	newDropDown.style.top = '-22px';
  	newDropDown.style.left = '-128px';
  }
	hideElement(newDropDown);

	newLI.addEventListener('click', function(){
		toggleElement(newDropDown);
		if (!isElementHidden(newDropDown)) {
			newDropDown.focus();
		}
	}, false);
	createOptionsList(newDropDown);
	insertAfter(newDropDown, newLI);
}


function saveArmor()
{
	var list = getListOfSets();

	var setName = trim(gInputElement.value);
	if (setName === '') {
		if (gArmorInputType === 'drop') {
			new unsafeWindow.HumanMessage(save_choose_name_error_text[gLang]);
		}
		gInputElement.focus();
		return;
	}
	if (!isValidSetName(setName)) {
		new unsafeWindow.HumanMessage(save_invalid_name_error_text[gLang]);
		gInputElement.focus();
		return;
	}

	var bIsInList = isInList(list, setName);
	if (bIsInList) {
		// confirm overwrite
		if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
			gInputElement.focus();
			return;
		}
	}

	var l_animal, l_body, l_foot, l_left_arm, l_head, l_yield, l_right_arm, l_neck;
	l_animal=l_body=l_foot=l_left_arm=l_head=l_yield=l_right_arm=l_neck = '';
	if (!isNull(unsafeWindow.Wear.wear.animal))    { l_animal    = unsafeWindow.Wear.wear.animal.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.body))      { l_body      = unsafeWindow.Wear.wear.body.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.foot))      { l_foot      = unsafeWindow.Wear.wear.foot.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.left_arm))  { l_left_arm  = unsafeWindow.Wear.wear.left_arm.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.head))      { l_head      = unsafeWindow.Wear.wear.head.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.yield))     { l_yield     = unsafeWindow.Wear.wear.yield.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.right_arm)) { l_right_arm = unsafeWindow.Wear.wear.right_arm.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.pants))     { l_pants     = unsafeWindow.Wear.wear.pants.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.belt))	   { l_belt		 = unsafeWindow.Wear.wear.belt.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.neck))      { l_neck      = unsafeWindow.Wear.wear.neck.get_short(); }
	
	setArmorSet(setName, l_animal+':'+l_body+':'+l_foot+':'+l_left_arm+':'+l_head+':'+l_yield+':'+l_right_arm+':'+l_pants+':'+l_belt+':'+l_neck);
	if (!bIsInList) {
		if (list === '') {
			list = setName;
		} else {
			list = list + ';' + setName;
		}
		setListOfSets(list);
	}
	new unsafeWindow.HumanMessage(save_message_text[gLang], {type:'success'});

	updateDropdown();
	changeToDropDown(gInputElement);
	selectInvDropDown(setName);
}

function removeArmor()
{
	if (gArmorInputType === 'text') {
		// cancel adding of new set
		changeToDropDown(gInputElement);
		return;
	}
	// remove existing set
	var setName = gInputElement.value;

	if (setName === '') {
		new unsafeWindow.HumanMessage(delete_choose_name_error_text[gLang]);
		gInputElement.focus();
		return;
	}
	// remove existing set
	if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
		gInputElement.focus();
		return;
	}
	removeArmorSet(setName);
	var list = getListOfSets();
	list = list.split(';');
	var newList = '', i;
	for (i in list) {
		if (list[i] !== setName && list[i] !== '') {
			if (newList === '') {
				newList = list[i];
			} else {
				newList = newList + ';' + list[i];
			}
		}
	}
	setListOfSets(newList);

	updateDropdown();
	changeToDropDown(gInputElement);
}


function addInventoryButtons()
{
	var invTargetPos = null;

	// check if inventory window is fully loaded
	invTargetPos = document.getElementById('bag');
	if (!unsafeWindow.AjaxWindow.windows['inventory'].isReady || isNull(invTargetPos)) {
		setTimeout(function(){addInventoryButtons();}, 200);
		return;
	}

	invTargetPos = document.getElementById('window_inventory_content');
	var nTable = document.createElement('table');
	nTable.setAttribute("style", "position: relative; margin-left: -10px; margin-top: -475px;");
	invTargetPos.appendChild(nTable);

	var nTR = document.createElement('tr');
	nTable.appendChild(nTR);

	var nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nLabel = document.createElement('span');
	nLabel.innerHTML = wardrobe_text[gLang] + ':';
	nLabel.setAttribute("style", "font-weight:bold;color:white");
	nTD.appendChild(nLabel);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	createDropInvDropDown();
	nTD.appendChild(gInputElement);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nb = document.createElement('img');
	nb.setAttribute("style", "cursor: pointer;");
	nb.setAttribute("src", "data:image/gif;base64," + buttonImg);
	nb.addEventListener("click", saveArmor, false);
	nTD.appendChild(nb);
	var ns = document.createElement('span');
	ns.setAttribute("style", "cursor:pointer; width: 71px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.addEventListener("click", saveArmor, false);
	ns.innerHTML = save_button_text[gLang];
	nTD.appendChild(ns);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	nb = document.createElement('img');
	nb.setAttribute("style", "cursor: pointer;");
	nb.setAttribute("src", "data:image/gif;base64," + buttonImg);
	nb.addEventListener("click", removeArmor, false);
	nTD.appendChild(nb);
	ns = document.createElement('span');
	ns.setAttribute("style", "cursor:pointer; width: 71px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.setAttribute("id", "wardrobe_cancelOrDelete_button");
	ns.addEventListener("click", removeArmor, false);
//	ns.addEventListener("click",function(){removeArmor();},false);
	ns.innerHTML = delete_button_text[gLang];
	nTD.appendChild(ns);
}

function findPosY(obj)
{
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}


function init() {
  createDropdown();
  
  //search for inventory button
  var pageElements = document.getElementsByTagName('A');
  var invButton;
  for (var i = 0; i < pageElements.length; i++) {
  	invButton = pageElements[i];
  	if (invButton.getAttribute('onclick') === "AjaxWindow.show('inventory');" && invButton.parentNode.id === 'menu_inventory') {
  		invButton.addEventListener("click", function(){setTimeout(addInventoryButtons, 100);}, false);
  	}
  }

  // fix "abdorment_right"
  document.getElementById('abdorment_right').style.zIndex = "5";
  
  // fix for update 1.27
  right_work_bar = document.getElementById('workbar_right');
  if (right_work_bar) {
    right_work_bar.style.top = (findPosY(right_work_bar)+26)+"px";
  }
}

// fix for GM loading too fast 
unsafeWindow.addEventListener("load", function() {init()}, false);

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){
var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);
var today = new Date();GM_setValue('muUpdateParam_185', String(today));}/*Verify if it's time to update*/
function CheckForUpdate(){
var lastupdatecheck = GM_getValue('muUpdateParam_185', 'never');
var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=185&version='+getMoCheckVersion()+'';
var today = new Date();
var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/
if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/
var lastupdatecheck = new Date(lastupdatecheck).getTime();
var interval = (today - lastupdatecheck) / one_day; 
/*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/
if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();