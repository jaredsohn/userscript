/*==============================================================================================================

GC-PocketQuery
by JR849 - http://jr849.de/greasemonkey-skripte/

//==============================================================================================================
This is a Greasemonkey user script.

Description:
Fill out the PQ-form and chose an significant name, then click the button "Save Settings" to save your choices. Thats it!
From now on you can restore this settings using the dropdown-field below the query name.
The last setting will be restored automatically next time you open the pocketquery page.

Note: For each pocketquery page (gcquery, urquery or bmquery) you have to save your pocketquery settings separately.

If you have any questions, contact me via contactform (Kontakt) at www.jr849.de ;-)
//==============================================================================================================
*/
//scr_meta=<><![CDATA[
// ==UserScript==
// @name             GC-PocketQuery
// @description      No more useless clicking to get a PocketQuery. You can save any numbers of settings and load them 			
//                   comfortable with just one click. German description: http://jr849.de/greasemonkey-skripte/
// @version       	 1.25
// @copyright        JR849 - http://jr849.de/greasemonkey-skripte/
// @license       	 Attribution-Noncommercial-Share Alike (http://creativecommons.org/licenses/by-nc-sa/3.0/)
// @include          http://www.geocaching.com/pocket/gcquery.aspx*
// @include			 http://www.geocaching.com/pocket/urquery.aspx*
// @include			 http://www.geocaching.com/pocket/bmquery.aspx*
// ==/UserScript==
//]]></>.toString();
//==============================================================================================================

(function(){
var jmpToGCCodeTxtIfSelected = true; // If jmpToGCCodeTxtIfSelected = true, set focus to the input field

//Dont change the following variables!!!
var list;
var values;
var firstStart;
var separator = '^';
var separatorIdVal = '~';
var url = window.location.href;
var gcquery = false;
var urquery = false;
var bmquery = false;
var appendForState = '_hidInput';
var appendForClick = '_imgAttribute';
var radiustext;
var anzahltext;
var defaultName = 'Default';
//ids of all checkboxes
var Checkboxes = {	'ctl00_ContentBody_cbDays_0'								: true,
					'ctl00_ContentBody_cbDays_1'								: true,
					'ctl00_ContentBody_cbDays_2'								: true,	
					'ctl00_ContentBody_cbDays_3'								: true,	
					'ctl00_ContentBody_cbDays_4'								: true,	
					'ctl00_ContentBody_cbDays_5'								: true,	
					'ctl00_ContentBody_cbDays_6'								: true,
					'ctl00_ContentBody_rbRunOption_0'							: true,
					'ctl00_ContentBody_rbRunOption_1'							: true,
					'ctl00_ContentBody_rbRunOption_2'							: true,
					'ctl00_ContentBody_rbTypeAny'								: true,
					'ctl00_ContentBody_rbTypeSelect'							: true,
					'ctl00_ContentBody_cbTaxonomy_0'							: true,
					'ctl00_ContentBody_cbTaxonomy_1'							: true,
					'ctl00_ContentBody_cbTaxonomy_2'							: true,
					'ctl00_ContentBody_cbTaxonomy_3'							: true,
					'ctl00_ContentBody_cbTaxonomy_4'							: true,
					'ctl00_ContentBody_cbTaxonomy_5'							: true,
					'ctl00_ContentBody_cbTaxonomy_6'							: true,
					'ctl00_ContentBody_cbTaxonomy_7'							: true,
					'ctl00_ContentBody_cbTaxonomy_8'							: true,
					'ctl00_ContentBody_cbTaxonomy_9'							: true,
					'ctl00_ContentBody_cbTaxonomy_10'							: true,
					'ctl00_ContentBody_cbTaxonomy_11'							: true,
					'ctl00_ContentBody_cbTaxonomy_12'							: true,
					'ctl00_ContentBody_rbContainerAny'							: true,
					'ctl00_ContentBody_rbContainerSelect'						: true,
					'ctl00_ContentBody_cbContainers_0'							: true,
					'ctl00_ContentBody_cbContainers_1'							: true,
					'ctl00_ContentBody_cbContainers_2'							: true,
					'ctl00_ContentBody_cbContainers_3'							: true,
					'ctl00_ContentBody_cbContainers_4'							: true,
					'ctl00_ContentBody_cbContainers_5'							: true,
					'ctl00_ContentBody_cbContainers_6'							: true,
					'ctl00_ContentBody_cbOptions_0'								: true,
					'ctl00_ContentBody_cbOptions_1'								: true,
					'ctl00_ContentBody_cbOptions_2'								: true,
					'ctl00_ContentBody_cbOptions_3'								: true,
					'ctl00_ContentBody_cbOptions_4'								: true,
					'ctl00_ContentBody_cbOptions_5'								: true,
					'ctl00_ContentBody_cbOptions_6'								: true,
					'ctl00_ContentBody_cbOptions_7'								: true,
					'ctl00_ContentBody_cbOptions_8'								: true,
					'ctl00_ContentBody_cbOptions_9'								: true,
					'ctl00_ContentBody_cbOptions_10'							: true,
					'ctl00_ContentBody_cbOptions_11'							: true,
					'ctl00_ContentBody_cbOptions_12'							: true,
					'ctl00_ContentBody_cbOptions_13'							: true,
					'ctl00_ContentBody_cbTerrain'								: true,
					'ctl00_ContentBody_cbDifficulty'							: true,
					'ctl00_ContentBody_rbNone'									: true,
					'ctl00_ContentBody_rbCountries'								: true,	
					'ctl00_ContentBody_rbStates'								: true,
					'ctl00_ContentBody_rbOriginNone'							: true,
					'ctl00_ContentBody_rbOriginHome'							: true,
					'ctl00_ContentBody_rbOriginGC'								: true,
					'ctl00_ContentBody_tbGC'									: true,
					'ctl00_ContentBody_rbPostalCode'							: true,
					'ctl00_ContentBody_rbOriginWpt'								: true,
					'ctl00_ContentBody_rbUnitType_0'							: true,
					'ctl00_ContentBody_rbUnitType_1'							: true,
					'ctl00_ContentBody_rbPlacedNone'							: true,
					'ctl00_ContentBody_rbPlacedLast'							: true,
					'ctl00_ContentBody_rbPlacedBetween'							: true,
					'ctl00_ContentBody_cbZip'									: true,
					'ctl00_ContentBody_cbIncludePQNameInFileName'				: true,
					'ctl00_ContentBody_rbOutputAccount'							: true,
					'ctl00_ContentBody_rbOutputEmail'							: true,
					'ctl00_ContentBody_chkDaysToGenerate_0'						: true,
					'ctl00_ContentBody_chkDaysToGenerate_1'						: true,
					'ctl00_ContentBody_chkDaysToGenerate_2'						: true,
					'ctl00_ContentBody_chkDaysToGenerate_3'						: true,
					'ctl00_ContentBody_chkDaysToGenerate_4'						: true,
					'ctl00_ContentBody_chkDaysToGenerate_5'						: true,
					'ctl00_ContentBody_chkDaysToGenerate_6'						: true
				};
// ids of all textboxes				
var Text = {		'ctl00_ContentBody_tbName'									: 'New Query',
					'ctl00_ContentBody_tbResults'								: '1000',
					'ctl00_ContentBody_uxCacheLimit'							: '1000',
					'ctl00_ContentBody_tbGC'									: 'GCXXXXX',
					'ctl00_ContentBody_tbRadius'								: '100',
					'ctl00_ContentBody_uxSearchRadius'							: '5',
					'ctl00_ContentBody_tbAltEmail'								: 'noreply@geocaching.com',
					'ctl00_ContentBody_ddlAltEmails'							: 'noreply@geocaching.com',
					'ctl00_ContentBody_ddFormats'								: 'GPX',
					'ctl00_ContentBody_ddTerrain'								: '>=',
					'ctl00_ContentBody_ddTerrainScore'							: '1',
					'ctl00_ContentBody_ddDifficulty'							: '>=',
					'ctl00_ContentBody_ddDifficultyScore'						: '1',
					'ctl00_ContentBody_ddLastPlaced'							: 'WEEK',
					'ctl00_ContentBody_DateTimeBegin_Month'						: '1',
					'ctl00_ContentBody_DateTimeBegin_Day'						: '1',
					'ctl00_ContentBody_DateTimeBegin_Year'						: '2010',
					'ctl00_ContentBody_DateTimeEnd_Month'						: '1',
					'ctl00_ContentBody_DateTimeEnd_Day'						    : '1',
					'ctl00_ContentBody_DateTimeEnd_Year'						: '2010',
					'ctl00_ContentBody_tbPostalCode'							: ' ',
					'ctl00_ContentBody_LatLong:_selectNorthSouth'				: '1',
					'ctl00_ContentBody_LatLong__inputLatDegs'					: '0',
					'ctl00_ContentBody_LatLong__inputLatMins'					: '0',
					'ctl00_ContentBody_LatLong__inputLatSecs'					: '0',
					'ctl00_ContentBody_LatLong:_selectEastWest'					: '1',
					'ctl00_ContentBody_LatLong__inputLongDegs'					: '0',
					'ctl00_ContentBody_LatLong__inputLongMins'					: '0',
					'ctl00_ContentBody_LatLong__inputLongSecs'					: '0',
					'ctl00_ContentBody_lbCountries'								: '79',
					'ctl00_ContentBody_lbStates'								: '135',
					'ctl00_ContentBody_uxPlacedFrom'							: '31/01/2010',
					'ctl00_ContentBody_uxPlacedTo'								: '30/09/2010'
};
//ids of all attributes with 3 states (both, exclude and include!!)
var Attributes3 = { 'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl00'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl05'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl06'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl07'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl08'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl09'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl12'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl13'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl14'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl15'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl22'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl23'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl25'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl26'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl27'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl28'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl29'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl30'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl31'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl32'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl33'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl34'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl35'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl36'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl38'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl39'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl43'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl44'  : '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl45'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl50'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl51'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl52'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl53'  : '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl54'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl55'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl56'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl57'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl59'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl60'  : '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl61'  : '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl62'  : '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl63'  : '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl64'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl00'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl05'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl06'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl07'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl08'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl09'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl12'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl13'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl14'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl15'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl22'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl23'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl25'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl26'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl27'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl28'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl29'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl30'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl31'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl32'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl33'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl34'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl35'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl36'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl38'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl39'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl43'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl44'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl45'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl50'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl51'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl52'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl53'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl54'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl55'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl56'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl57'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl59'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl60'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl61'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl62'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl63'  : '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl64'  : '0'
};

//ids of all attributes with 2 states (both, exclude and include!!)
var Attributes2 = {	'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl01'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl02'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl03'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl04'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl10'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl11'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl16'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl17'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl18'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl19'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl20'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl21'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl24'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl37'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl40'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl41'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl42'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl46'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl47'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl48'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl49'	: '0',
					'ctl00_ContentBody_ctlAttrInclude_dtlAttributeIcons_ctl58'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl01'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl02'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl03'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl04'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl10'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl11'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl16'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl17'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl18'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl19'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl20'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl21'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl24'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl37'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl40'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl41'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl42'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl46'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl47'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl48'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl49'	: '0',
					'ctl00_ContentBody_ctlAttrExclude_dtlAttributeIcons_ctl58'	: '0'
};
//Distinguish between GCQuery and URQuery
var url = window.location.pathname;
var txtQueryName;
if (url.indexOf("gcquery") != -1){
gcquery = true;
txtQueryName = document.getElementById('ctl00_ContentBody_tbName');
if (GM_getValue('indexgcquery') != undefined){
	var lastSelected = GM_getValue('indexgcquery');
}
}
 if (url.indexOf("urquery") != -1){
urquery = true;
txtQueryName = document.getElementById('ctl00_ContentBody_txtRouteName');
if (GM_getValue('indexurquery') != undefined){
	var lastSelected = GM_getValue('indexurquery');
}
}
 if (url.indexOf("bmquery") != -1){
bmquery = true;
txtQueryName = document.getElementById('ctl00_ContentBody_tbName');
if (GM_getValue('indexbmquery') != undefined){
	var lastSelected = GM_getValue('indexbmquery');
}
}

ShowElements();
LoadPQList();
if (list.length == 0 || list == undefined){
	firstStart = true;
	txtQueryName.value = defaultName;
	if (urquery){
		var defaultHelper = document.getElementById('ctl00_ContentBody_uxCacheLimit');
		defaultHelper.value = '500';
		defaultHelper = document.getElementById('ctl00_ContentBody_uxSearchRadius');
		defaultHelper.value = '5';		
	}
	AddEntry(txtQueryName.value); 
	SaveStates();
} else {
	firstStart = false;
	list.value = lastSelected;
}

// Load states without effect existing PQs
if (url.indexOf('=') < 0 || urquery || bmquery){
	SelectionMade ();
	// If jmpToGCCodeTxtIfSelected = true and "Waypoint Name"-radiobutton is selected -> set focus to the input field
	if (jmpToGCCodeTxtIfSelected){
		chkBoxWaypoint = document.getElementById('ctl00_ContentBody_rbOriginGC');
		txtWaypoint = document.getElementById('ctl00_ContentBody_tbGC');
		if (chkBoxWaypoint.checked == true){
			txtWaypoint.focus();
		} else {
			document.focus();
		}
	}
}

//==========================================================================================
//	function ShowElements()
//		Insert save, delete, submit buttons and the combobox
//==========================================================================================
function ShowElements(){
	//Find the inputfield of the queryname and append the buttons and combobox
	var txtQueryName;
	if (urquery){
		txtQueryName = document.getElementById('ctl00_ContentBody_txtRouteName');
	}else{
		txtQueryName = document.getElementById('ctl00_ContentBody_tbName');
	}
	txtQueryName = txtQueryName.parentNode;
	//btnSubmit
	btnSubmit = document.createElement("input");
	btnSubmit.id = 'btn_Submit';
	btnSubmit.type = 'button';
	btnSubmit.value = 'Submit Information';
	btnSubmit.style.marginLeft = '10px';
	btnSubmit.style.marginTop = '15px';
	btnSubmit.style.width = '135px';
	btnSubmit.addEventListener('click', Submit, false);
	txtQueryName.appendChild(btnSubmit);
	// line break
	txtQueryName.appendChild(document.createElement('br'));
	// list
	list = document.createElement("select");
	list.style.marginLeft = '92px';
	list.style.marginTop = '5px';
	list.style.width = '480px';
	list.id = "pq_settings";
	list.addEventListener('change', SelectionMade, false);
	txtQueryName.appendChild(list);
	txtQueryName.appendChild(document.createElement('br'));
	// btnSave
	btnSave = document.createElement("input");
	btnSave.id = 'btn_Save';
	btnSave.type = 'button';
	btnSave.value = 'Save Settings';
	btnSave.style.marginLeft = '91px';
	btnSave.style.marginTop = '5px';
	btnSave.style.width = '135px';
	btnSave.addEventListener('click', SaveStates, false);
	txtQueryName.appendChild(btnSave);
	// btnDelete
	btnDelete = document.createElement("input");
	btnDelete.id = 'btn_Delete';
	btnDelete.type = 'button';
	btnDelete.value = 'Delete Entry';
	btnDelete.style.marginLeft = '30px';
	btnDelete.style.width = '135px';
	btnDelete.addEventListener('click', DeleteEntry, false);
	txtQueryName.appendChild(btnDelete);
	txtQueryName.appendChild(document.createElement('br'));
	if (urquery){
		var sliderRadius = document.getElementById("searchRadiusVal");
		if (sliderRadius){
			sliderRadius = sliderRadius.parentNode;
			var bold = document.createElement("b");
			radiustext = document.createTextNode("");
			bold.appendChild(radiustext);
			sliderRadius.appendChild(bold);
		}
		var sliderAmount = document.getElementById("cacheLimitVal");
		if (sliderAmount){
			sliderAmount = sliderAmount.parentNode;
			var bold = document.createElement("b");
			anzahltext = document.createTextNode("");
			bold.appendChild(anzahltext);
			sliderAmount.appendChild(bold);
		}
	}
}

//==========================================================================================
//	function SelectionMade()
//     reset the right attributes and start loading new values
//==========================================================================================
function SelectionMade(){
	// Reset attributes with 2 states
	for (var attr in Attributes2){
		var attribute = document.getElementById(attr + '_hidInput');
		var test = document.getElementById(attr + '_imgAttribute');
		if (attribute){
			var value = attribute.value;
			for (i=1;i<=value;i++){
				click(test);
			}
		}
	}
	// Reset attributes with 3 states
	for (var attr in Attributes3){
		var attribute = document.getElementById(attr + '_hidInput');
		var test = document.getElementById(attr + '_imgAttribute');
		if (attribute){
			var value = attribute.value;
			if (value == '1'){
				click(test);
				click(test);
			}
			else if (value == '2'){
				click(test);
			}
		}
	}
	// Load new values
	if (gcquery){
		GM_setValue('indexgcquery', list.value);
		values = GM_getValue('gcquery' + list.value);
	}else if (urquery){
		GM_setValue('indexurquery', list.value);
		values = GM_getValue('urquery' + list.value);
	}else if (bmquery){
		GM_setValue('indexbmquery', list.value);
		values = GM_getValue('bmquery' + list.value);
	}
	LoadStates();
}

//==========================================================================================
//  function LoadStates()
//==========================================================================================
function LoadStates(){
	while (values.length >0){
		var value = getNextValue(values);
		var type = value.substring(0, 2);
		value = value.substring(2, value.length);
		var id = value.substring(0, value.indexOf (separatorIdVal));
		value = value.substring(value.indexOf (separatorIdVal)+1, value.length);
		
		if (type == 'CB'){
			var box = document.getElementById(id);
			if (box){
				if (value != undefined){
					if (value == 'true'){
						box.checked = true;
					}
					else {
						box.checked = false;
					}
				} 
			}
		}
		else if (type == 'TE'){
			var content = document.getElementById(id);
			if (urquery){
					if (id == 'ctl00_ContentBody_uxCacheLimit'){
						anzahltext.nodeValue = ' -> saved value: ' + value + ' caches on either side.';
					}else if (id == 'ctl00_ContentBody_uxSearchRadius'){
						var val = value * 10;
						var km = Math.round((10 * (val / 100)) * 100) / 100;
						var m = Math.round((km * 0.621371192) * 100) / 100;
						radiustext.nodeValue = ' -> saved value: ' + m + ' mi / ' + km + ' km';
					}
			}
			if (content){
				if (value != undefined){
					content.value = value;
				} 
			}
		}
		else if (type == 'AT'){
			var attribute = document.getElementById(id + '_hidInput');
			var test = document.getElementById(id + '_imgAttribute');
			if (attribute){
				for (i=1;i<=value;i++){
					click(test);
				}
			}
		}
		else{
			alert('Unknown type "' + type + '" in id: ' + id + ' found! Loading cancelled!');
			break;
		}
	}
	var txtQueryName;
	if (urquery){
		txtQueryName = document.getElementById("ctl00_ContentBody_txtRouteName");
	}else{
		txtQueryName = document.getElementById("ctl00_ContentBody_tbName");
	}
	txtQueryName.value = list.value;
}

//==========================================================================================
//	function SaveStates ()
//==========================================================================================
function SaveStates(){
	var txtQueryName;
	var exists = false;
	if (urquery){
		txtQueryName = document.getElementById("ctl00_ContentBody_txtRouteName");
	}else{
		txtQueryName = document.getElementById("ctl00_ContentBody_tbName");
	}
	
	if (list.value != txtQueryName.value){
		var Mycombobox = document.getElementById('pq_settings');
		var string = '';
		for(var i = 0; i < Mycombobox.options.length; ++i){
			if (txtQueryName.value == Mycombobox.options[i].value){
				exists = true;
				alert ('A setting with the name "' + txtQueryName.value + '" already exists. \nPlease choose a different name or load the setting first to change it.\n\n Saving cancelled!');
			}
		}
	}
	if (!exists){
		if (txtQueryName.value == '' || txtQueryName.value.indexOf (separator) >-1 || txtQueryName.value.indexOf (separatorIdVal) >-1){
		alert('Could not save settings!' + '\nQueryname is empty or contains the separator "' + separator + 
			  '" used in GC-PocketQuery.');
		} else {
			values = '';
			for (var boxName in Checkboxes){
				var box = document.getElementById(boxName);
				if (box != null){
					values += getValueWithSeperator(boxName , 'Checkboxes');	
				}
			}
			for (var textName in Text){
				var content = document.getElementById(textName);
				if (content != null && content != false){
					values += getValueWithSeperator(textName , 'Text');
				}
			}
	
			for (var attr in Attributes2){
				var attribute = document.getElementById(attr + '_hidInput');
				if (attribute != null){
					values += getValueWithSeperator(attr + '_hidInput' , 'Attributes');
				}
			}
			for (var attr in Attributes3){
				var attribute = document.getElementById(attr + '_hidInput');
				if (attribute != null){
					values += getValueWithSeperator(attr + '_hidInput' , 'Attributes');
				}
			}
			if (txtQueryName.value != list.value){
				AddEntry(txtQueryName.value);
			} 
			if (gcquery){
				GM_setValue('indexgcquery', list.value);
				GM_setValue('gcquery' + list.value, values);
			}else if (urquery){
				GM_setValue('indexurquery', list.value);
				GM_setValue('urquery' + list.value, values);
			}else if (bmquery){
				GM_setValue('indexbmquery', list.value);
				GM_setValue('bmquery' + list.value, values);
			}
			if (firstStart){
				alert ("No settings found. \nGC-PocketQuery has saved the default settings.");
				firstStart = false;
			} else{
				alert ("All states saved successfully.");
			}
			SavePQList();
		}
	}
}	

//==========================================================================================
//  function generatePQSavingList()
//==========================================================================================
function generatePQSavingList(){
	var Mycombobox = document.getElementById('pq_settings');
	var string = '';
	for(var i = 0; i < Mycombobox.options.length; ++i){
		string +=  Mycombobox.options[i].value + separator;
	}
	return string;
}

//==========================================================================================
// function LoadPQList()
// Load all savingnames into the combobox
//==========================================================================================
function LoadPQList(){
	//Distinguish between GCQuery and URQuery
	if (gcquery){
		var list = GM_getValue('savinggcquery');
	}else if (urquery){
		var list = GM_getValue('savingurquery');
	}else if (bmquery){
		var list = GM_getValue('savingbmquery');
	}
	if (list != undefined){
		while(list.length > 0){
		var pos = list.indexOf(separator);
		var element = list.substring(0, pos);
		list = list.substring(pos+1);
		AddEntry (element);
		}	
	}
}

//==========================================================================================
//  function SavePQList()
//==========================================================================================
function SavePQList(){
	var list = generatePQSavingList();
	//Distinguish between GCQuery and URQuery
	if (gcquery){
		GM_setValue('savinggcquery', list);
	}else if (urquery){
		GM_setValue('savingurquery', list);
	}else if (bmquery){
		GM_setValue('savingbmquery', list);
	}
}

//==========================================================================================
//  function AddEntry(text)
//==========================================================================================
function AddEntry(text){
	var option = document.createElement('option');
	option.value = text;
	option.appendChild(document.createTextNode(text));
	list.appendChild(option);
	list.value = text;
}

//==========================================================================================
//  function DeleteEntry()
//==========================================================================================
function DeleteEntry(){
	var val = list.selectedIndex;
	if (gcquery){
		GM_deleteValue ('gcquery' + list.value);
	}else if (urquery){
		GM_deleteValue ('urquery' + list.value);
	}else if (bmquery){
		GM_deleteValue ('bmquery' + list.value);
	}
	list.remove(val);
	SavePQList();
	SelectionMade();
}

//==========================================================================================
//  function click(elm)
//		Simulate Click on attribute-image 
//==========================================================================================
function click(elm){
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}

//==========================================================================================
//  function getValueWithSeperator(element, type)
//		Returns a string with type, id, separator for id and value, value and separator 
//==========================================================================================
function getValueWithSeperator(element, type){
	var id = element;
	var elm = document.getElementById(element);
	var string = '';
	var value = '';
	var typ = '';
	if (type == "Checkboxes"){
		if (elm.checked == true){
			value = 'true';
		}
		else if (elm.checked == false){
			value = 'false';
		}
		typ = 'CB'
	}
	else if (type == "Text"){
		value = elm.value;
		typ = 'TE'
	}
	else if (type == "Attributes"){
		value = elm.value;
		// cut off the '_hidinput' at the end of the id
		id = id.substring(0,id.length-9);
		typ = 'AT'
	}
	else {
		value = elm.value;
		typ = 'UK'
	}
	//updating the text
	if (urquery){
		if (element == 'ctl00_ContentBody_uxCacheLimit'){
			anzahltext.nodeValue = ' -> saved value: ' + elm.value + ' caches on either side.';
		}else if (id == 'ctl00_ContentBody_uxSearchRadius'){
			var val = value * 10;
			var km = Math.round((10 * (val / 100)) * 100) / 100;
			var m = Math.round((km * 0.621371192) * 100) / 100;
			radiustext.nodeValue = ' -> saved value: ' + m + ' mi / ' + km + ' km';
		}
	}
	// string = type, element-id, separator for id and value, value, separator 
	string = typ + id + separatorIdVal + value + separator;
	return string;
}


						
//==========================================================================================
//  function getNextValue(text)
//		Get and return the value out of "separator"-separated-value and shorten the valuestring
//==========================================================================================
 function getNextValue(text){
	// Get position of first seperator
	var pos = text.indexOf(separator);
	// Get value from beginning to seperator 
	var val = text.substring(0, pos);
	// Delete extracted substring inclusive seperator
	values = text.substring(pos+1);
	return val;
}

//==========================================================================================
//  function Submit()
//		Little hack to submit the form pressing the new submit button
//==========================================================================================
function Submit(){
	var test = document.getElementById('ctl00_ContentBody_btnSubmit');
	click(test);
}
//==========================================================================================

//==========================================================================================
// Another Auto Update Script
// by sizzlemctwizzle (Thanks!)
//==========================================================================================
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '86131', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 
 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
//==========================================================================================
})();