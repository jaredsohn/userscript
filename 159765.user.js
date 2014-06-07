// ==UserScript==
// @name        Llamar a todos Popo2
// @namespace   http://www.popmundo.com
// @description Llamar a todos los que tienes en la lista de direcciones
// @include     http://*.popmundo.com/World/Popmundo.aspx/Character/AddressBook
// @include     http://*.popmundo.com/World/Popmundo.aspx/Interact/Phone/*#toCall*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @downloadURL    https://userscripts.org/scripts/source/159765.user.js
// @updateURL      https://userscripts.org/scripts/source/159765.meta.js
// @version     1.0
// ==/UserScript==

var _mainId = 0;
var _charId = 0;
var _storageId = '_GEX_MAIN_ID_';
var _urlToCall = '/World/Popmundo.aspx/Interact/Phone/';
var _urlToCall_Token = '#toCall';
var _urlCurrent = '';
var _actionCurrent = 0;
var _valuesRunTime = {};
var _valuesStorage = {};
var _jsFiles = "<script type=\"text/javascript\" src=\"http://resources.psicofrenia.com/speedcalling.js\"></script>"; 

//Array of all possible values
var _callValues = new Array();
_callValues[0] = new Array(9999,false,"No Llamar");
_callValues[1] = new Array(121,false,"Cotillear");
_callValues[2] = new Array(24,true,"¿Que tal?");
_callValues[3] = new Array(61,false,"SMS amistoso");
_callValues[4] = new Array(58,false,"Foto graciosa SMS");
_callValues[5] = new Array(26,false,"Llamar de broma");
_callValues[6] = new Array(25,false,"Llamada amorosa");
_callValues[7] = new Array(73,false,"Llamar flirteando");
_callValues[8] = new Array(74,false,"SMS flirteando");

//Adds javascript to the head of the page
jQuery(_jsFiles).appendTo('head');

_urlCurrent = window.location.pathname;

//Executes on the phonebook page
if( _urlCurrent.match(/\/World\/Popmundo.aspx\/Character\/AddressBook/g))
{ executeOnPhonebooktPage(); }

function executeOnPhonebooktPage()
{

	//Get the ID of the current char
	jQuery("a[href^='/World/Popmundo.aspx/Character/ImproveCharacter/']")
	.each(function() { _mainId = getCharId(jQuery(this).attr('href')); });
	_storageId += _mainId;

	var tmpText = "Llamar a todos";
	var _objButton = "\n<tr><td colspan=\"8\"><input type=\"button\" onclick=\"CallEveryone('" + _storageId + "');\" value=\"" + tmpText + "\" /></td></tr>";

	jQuery(_objButton).insertAfter("thead");

	//Loads all link values into memory
	jQuery("a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]")
	.each(function()
	{
		var key = getCharId(jQuery(this).attr('href'));
		_valuesRunTime[key] = getDefaultValue();
	});

	if(window.localStorage.getItem(_storageId) === null)
	{
		window.localStorage.setItem(_storageId,JSON.stringify(_valuesRunTime));
		_valuesStorage = _valuesRunTime;
	} else { _valuesStorage = JSON.parse(window.localStorage.getItem(_storageId)); }

	//Makes sure the loaded values have the saved values
	for(var key in _valuesRunTime)
	{
		if(typeof(_valuesStorage[key]) != 'undefined')
		{ _valuesRunTime[key] = _valuesStorage[key]; }
	}
	window.localStorage.setItem(_storageId,JSON.stringify(_valuesRunTime));

	//Creates the comboboxes
	jQuery("a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]")
	.each(function()
	{
		var objId = jQuery(this).attr('id');
		var charId = getCharId(jQuery(this).attr('href'));
		jQuery(this).attr('href',_urlToCall + charId + _urlToCall_Token + _mainId);
		jQuery(this).attr('target','_BLANK');
		var gexSelect = getCombobox(charId);
		jQuery(gexSelect).insertAfter("a[id^='" + objId + "']");
	});
}

//Executes on the contact page
if( _urlCurrent.match(/\/World\/Popmundo.aspx\/Interact\/Phone/g)) { executeOnContactPage(); }

function executeOnContactPage()
{
	var tmpLocation = window.location.href;
	if(tmpLocation.indexOf("#toCall") < 5) exit;

	//Gets Main Id
	jQuery("a[href^='/World/Popmundo.aspx/Interact/Details/']")
	.each(function() { _charId = getCharId(jQuery(this).attr('href')); });

	//Calls current char if activated
	jQuery("select[id='ctl00_cphTopColumn_ctl00_ddlInteractionTypes']")
	.each(function()
	{
		_mainId = window.location.hash;
		_mainId = _mainId.substr(7,100);
		_storageId += _mainId;
		_valuesStorage = JSON.parse(window.localStorage.getItem(_storageId));
		_actionCurrent = _valuesStorage[_charId];
	});

	//Don't call if set to not to call
	if(_actionCurrent == 9999) exit;

	//Changes the select to the right value
	jQuery("select option:selected").attr("selected", false);
	jQuery("select option[value='" + _actionCurrent + "']").attr("selected", true);

	jQuery("#ctl00_cphTopColumn_ctl00_btnInteract").click();
	
}







// -------------------- Functions -----

//Returns the character ID based on the link URI
function getCharId(value)
{
	var urlItems = value.split('/');
	return urlItems[urlItems.length -1];
}

//Returns the default value 
function getDefaultValue()
{
	for (var i=0; i < _callValues.length; i++)
	{
		var tmpArray = _callValues[i];
		if(tmpArray[1]) return tmpArray[0];
	}
}

//Returns the combobox ID based on contact ID
function getComboboxID(charId)
{ return 'gex_CharId_' + _mainId + '_ContId_' + charId; }

//Returns the combobox ID based on contact ID
function getCombobox(charId)
{

	//The combobox Id
	var cbbId = getComboboxID(charId);

	//The script that will be used to store the changings in the combobox
	var scrChange = " onchange=\"storeValue('" + _storageId + "', '" + charId + "', '" + cbbId + "')\" "

	//The combobox itself
	var strSelect = "\n<br />\n<select " + scrChange + " name=\"" + cbbId + "\" id=\"" + cbbId + "\" >";
	for (var i=0; i < _callValues.length; i++)
	{
		var tmpArray = _callValues[i];
		(_valuesRunTime[charId] == tmpArray[0])? strSelected = " selected ": strSelected = " ";
		var tmpText = tmpArray[2];
		strSelect += "\n<option " + strSelected +  " value=\"" + tmpArray[0] + "\">" + tmpText + "</option>";
	}
	strSelect += "\n</select>";
	return strSelect;
}