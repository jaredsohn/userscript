// ==UserScript==
// @name        SpeedCalling for Popmundo
// @namespace   http://popmundo.psicofrenia.com/
// @description Calls everyone in your contact list
// @include     http://*.popmundo.com/World/Popmundo.aspx/Character/AddressBook
// @include     http://*.popmundo.com/World/Popmundo.aspx/Interact/Phone/*
// @require		http://resources.psicofrenia.com/popmundo.js
// @require		http://www.popmundo.com/Static/JS/jQuery/jquery-1.7.min.js
// @downloadURL    https://userscripts.org/scripts/source/135489.user.js
// @updateURL      https://userscripts.org/scripts/source/135489.meta.js
// @grant       GM_info
// @version     3.1
// ==/UserScript==


var gexQuery = jQuery.noConflict();

// ------------------------------------------------------------------------
// ----------- DEFINITIONS AREA

var _locVersion_SpeedCalling = '3.1';
// External script with SpeedCalling functions
var _jsFile = 'http://resources.psicofrenia.com/popmundo.js';
// Logical variable to detect if the script should use Portuguese or English
var _isPortuguese = 0;
// Current URL
var _urlCurrent = window.location.pathname;
// Url to make the calls
var _urlToCall = '/World/Popmundo.aspx/Interact/Phone/';
// Url to mark the page as usable by this script
var _urlToCall_Token = '#toCall';
var _urlToContact_Token = '#toContact';
// Id of the char logged in
var _idMainChar = 0;
// Id of the char currently being interacted with
var _idCurrentChar = 0;
// Id to be used to store values on local storage
var _idStorage = '_GEX_MAIN_ID_';
// Array with runtimes values
var _valuesRunTime = {};
// Array with stored values
var _valuesStorage = {};
// Default value for callings
var _valueDefault = 24;
// All possible values for calling
var _valueCalls = Array(9999,121,24,61,58,26,25,73,74);

// ------------------------------------------------------------------------
// ----------- GLOBAL CODE 

appendJsFile(_jsFile);
detectLanguage();
getIdMain();

checkVersion();

if( _urlCurrent.match(/\/World\/Popmundo.aspx\/Character\/AddressBook/g)){
	executeOnPage_Book();
}

if( _urlCurrent.match(/\/World\/Popmundo.aspx\/Interact\/Phone/g)){
	executeOnPage_Contact();
}

// ------------------------------------------------------------------------
// ----------- FUNCTIONS AREA

//Adds any external JS Script to the Popmundo page
function appendJsFile(jsUrl){
	var scriptTag = '<script type="text/javascript" src="' + _jsFile + '"></script>';
	gexQuery(scriptTag).appendTo('head');
}

// Detects if Popmundo is being used in one of the Portuguese translations
function detectLanguage(){
	var langIdentifier = 'notícias';
	if (gexQuery('#ctl00_ucMenu_lnkStart').text().toLowerCase() == langIdentifier)
		_isPortuguese = 1;
}

//Gets the correct label for the language
function getLabel(label){
	var translations = new Array();
	translations.call_everyone = 'Call everyone#Ligar para todos';
	translations.bug_report = 'Report a bug#Reportar um bug';
	translations.update = 'Theres a new Version avaiable. Click here to update SpeedCalling.#Há uma nova versão disponível. Clique aqui para atualizá-la.';
	translations.i9999 = 'Dont Call#Não telefonar';
	translations.i121 = 'Gossip on the phone#Fofocar ao telefone';
	translations.i24 = 'Wazzup call#Ligar para papear';
	translations.i61 = 'SMS friendly text#Mandar mensagem no celular';
	translations.i58 = 'SMS funny pic#Mandar foto engraçada por MMS';
	translations.i26 = 'Prank call#Passar trote';
	translations.i25 = 'Lover call#Ligar para namorar';
	translations.i73 = 'Flirty Phone call#Ligar para flertar';
	translations.i74 = 'Flirty SMS#Flertar por SMS';
		
	if(translations[label] == undefined) return 'OOps!!!';

	return translations[label].split("#")[_isPortuguese];
}

//Gets the ID of the logged char and sets the storage ID
function getIdMain(){
	_idMainChar = gexQuery('.idHolder').first().html();
	_idStorage += _idMainChar;
}

//Gets the ID of the logged char and sets the storage ID
function getIdCurrent(){
	_idMainChar = gexQuery('.idHolder').first().html();
}

//Returns the button to make the calls
function getCallButton(){
	var	callButton = "<tr><td colspan=\"8\">"
		callButton += checkVersion();
		callButton += "<input type=\"button\" onclick=\"CallEveryone('" + _idStorage + "')\" value=\"" + getLabel('call_everyone') + "\" />";
		callButton += "<input type=\"button\" onclick=\"contactAuthor();\" value=\"" + getLabel('bug_report') + "\" />";
		callButton += "</td></tr>";

	gexQuery(callButton).insertAfter('thead');
}

//Returns the character ID based on the link URI
function getIdFromUrl(value)
{
	var urlItems = value.split('/');
	return urlItems[urlItems.length -1];
}

//Loads all contact entries values into memory and updates localStorage
function loadValues(){
	//Loads all current contacts (existant in the links)
	gexQuery("a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]")
	.each(function()
	{
		var key = getIdFromUrl(gexQuery(this).attr('href'));
		_valuesRunTime[key] = _valueDefault;
	});

	//Updates the localStorage if not present
	if(window.localStorage.getItem(_idStorage) === null)
	{
		window.localStorage.setItem(_idStorage,JSON.stringify(_valuesRunTime));
		_valuesStorage = _valuesRunTime;
	} else { _valuesStorage = JSON.parse(window.localStorage.getItem(_idStorage)); }

	//Loads stored values into runtime values
	for(var key in _valuesRunTime)
	{
		if(typeof(_valuesStorage[key]) != 'undefined')
			{ _valuesRunTime[key] = _valuesStorage[key]; }
	}

	//Saves the localStorage
	window.localStorage.setItem(_idStorage,JSON.stringify(_valuesRunTime));

}

//Returns the combobox ID based on contact ID
function getSelect()
{
	//The combobox Id
	var tmpSelId = 'gex_CharId_' + _idMainChar + '_ContId_' + _idCurrentChar;

	//The script that will be used to store the changings in the combobox
	var tmpScript = " onchange=\"storeValue('" + _idStorage + "', '" + _idCurrentChar + "', '" + tmpSelId + "')\" "

	//The combobox itself
	var tmpSelect = "<br/><select " + tmpScript + " name=\"" + tmpSelId + "\" id=\"" + tmpSelId + "\" >";

	var tmpOptions = '';
	for (var i=0; i < _valueCalls.length; i++)
	{
		var selected = (_valuesRunTime[_idCurrentChar] == _valueCalls[i]) ? 'selected="selected"' : ' ';
		tmpOptions += "<option " + selected +  " value=\"" + _valueCalls[i] + "\">" + getLabel('i'+_valueCalls[i]) + "</option>";
	}
	tmpSelect += tmpOptions + "</select>";

	return tmpSelect;
}

//Creates the selects to be used with the contacts
function getsCallSelects(){
	gexQuery("a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]")
	.each(function()
	{
		var objId = gexQuery(this).attr('id');
		_idCurrentChar = getIdFromUrl(gexQuery(this).attr('href'));
		gexQuery(this).attr('href',_urlToCall + _idCurrentChar + _urlToCall_Token + _idMainChar);
		gexQuery(this).attr('target','_BLANK');
		var gexSelect = getSelect();
		gexQuery(gexSelect).insertAfter("a[id^='" + objId + "']");
	});
}

//Executes on Phonebook page
function executeOnPage_Book(){
	getCallButton();

	loadValues();

	getsCallSelects();
}

function executeOnPage_Contact(){

	//Exits if not to be used by this script
	var tmpLocation = window.location.href;
	if(tmpLocation.indexOf("#toCall") < 5) exit;
	
	//Gets current char Id
	tmpIdCurrentChar = gexQuery('.idHolder').eq(1).html();


	//Calls current char if activated
	var tmpAction = 9999;
	gexQuery("select[id='ctl00_cphTopColumn_ctl00_ddlInteractionTypes']")
	.each(function()
	{
		_valuesStorage = JSON.parse(window.localStorage.getItem(_idStorage));
		tmpAction = _valuesStorage[tmpIdCurrentChar];
	});

	//Don't call if set to not to call
	if(tmpAction == 9999) exit;

	//Changes the select to the right value
	gexQuery("select option:selected").attr("selected", false);
	gexQuery("select option[value='" + tmpAction + "']").attr("selected", true);
	gexQuery("#ctl00_cphTopColumn_ctl00_btnInteract").click(); 
}

//Checks if the script is updated and adds a links to update if it's not
function checkVersion(){
	if (_locVersion_SpeedCalling == GM_info.script.version) return '';
	return '<p><a href="https://userscripts.org/scripts/show/135489" target="_blank" style="color:red">' + getLabel('update') + '</a></p>';
}
