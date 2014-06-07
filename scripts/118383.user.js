// ==UserScript==
// @name           Ikariam Gift Auto Taker
// @namespace      http://userscripts.org/ikariam/mindfox
// @description    Auto Posts Daily Login Gift Form
// @include        http://s*.*.ikariam.com/*
//
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require         http://userscripts.org/scripts/source/95009.user.js
// @r1equire         http://userscripts.org/scripts/source/95008.user.js
//
// @version		0.03
// 
// @history     0.03 bugfix: Είναι δυνατή η χρήση του script σε διαφορετικούς κόσμους ταυτόχρονα
// @history     0.02 new:    Δυνατότητα χρήσης του script ενώ παίζει το παιχνίδι κανονικά
// @history 	0.01 new:    Initial Release
// ==/UserScript==

var ActionRequestID = document.evaluate(".//form[@id='changeCityForm']/.//input[@name='actionRequest']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
var SelectedCityID = document.evaluate(".//form[@id='changeCityForm']/.//select/option[@selected = 'selected']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
cities={};
var PlayerCities = document.evaluate(".//form[@id='changeCityForm']/.//select/option", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (i=0; i < PlayerCities.snapshotLength;i++ ) { 
	cities[PlayerCities.snapshotItem(i).text] = PlayerCities.snapshotItem(i).value;
//	console.log("cities[" + PlayerCities.snapshotItem(i).value + "] = " + PlayerCities.snapshotItem(i).text);
}
mergedcities = cities;
mergedcities['Επιλεγμένη Πόλη'] = 'Selected';


Config.scriptName = "Ikariam Auto Gift Taker";
Config.prefix = document.domain;
Config.footerHtml = '';

Config.tabs = {
	"Γενικά":{
		html:'<p>Πειραματισμός.</p>',
		fields:{
			IsEnabled:{
				type:'checkbox',
				label:'Ενεργοποίηση',
				text:'Είναι ενεργό το script;',
				value:true,
			},
			TimerCountdown:{
				type:'text',
				label:'Εκτέλεση κάθε ',
				text:'Κάθε πόσα δευτερόλεπτα θα εκτελείται το script;',
				value:10,
			},
			CityGift:{
				type:'select',
				label:'Πόλη',
				options:mergedcities,
				tip:'Πόλη που θα δέχεται το Gift',
				value:'Selected'
			}
		}
	},
	"Σχετικά":{
		html:'<p>Κλέβει ακατάπαυστα!!!</p>',
	}
};


var SelectedGiftCityID;
if (Config.get('CityGift') == 'Selected') {
	SelectedGiftCityID = SelectedCityID;
} else {
	SelectedGiftCityID = Config.get('CityGift');
}

var uritogift = "http://" + document.domain + "/index.php?action=AvatarAction&function=giveDailyActivityBonus&actionRequest=" + ActionRequestID + "&dailyActivityBonusCitySelect=" + SelectedGiftCityID;


unsafeWindow.uritogift = uritogift;
unsafeWindow.mindfoxcities = cities;
unsafeWindow.mindfoxConfig = Config;

var countdown = Config.get('TimerCountdown');
var countdownID;


var ikatmp = document.createElement('div');
ikatmp.setAttribute('id','ikariam_temp');
document.body.appendChild(ikatmp);
ikatmp.innerHTML='<h1>Here I am</h1>';
ikatmp.style.display = 'none';


function getdoc(uritogift) {
	if (Config.get('IsEnabled')) {
		GM_xmlhttpRequest({
			'method':'GET',
			'url':uritogift,
			'onload': function(resp) {
				findfind(resp.responseText);
			}
		});
	} else {
		console.log('Checking for execution permission in ' + Config.get('TimerCountdown') + ' seconds.');
		countdownID = window.setTimeout(function(){ getdoc(uritogift); }, Config.get('TimerCountdown')*1000);
	}
}

function findfind(resp) {
	console.log('Fetched page. Parsing...');
	var ikatmp=document.getElementById('ikariam_temp');
	var oldActionRequestID = document.getElementsByName('actionRequest').item(0).value;
	var searchForStr;
	var replaceWithStr;
	
	ikatmp.innerHTML=resp;
	ActionRequestID = document.evaluate(".//form[@id='changeCityForm']/fieldset/input[@name='actionRequest']", ikatmp, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
	replIDs = document.getElementsByName('actionRequest');
	if (typeof replIDs != 'null'){
		for (i=0; i < replIDs.length; i++) { 
//			console.info(i + ': ' + replIDs.item(i).value + ' -> ' + ActionRequestID); 
			replIDs.item(i).value = ActionRequestID;
		}
		replIDs = null;
	}
	replIDs = document.evaluate(".//a[@href[contains(.,'actionRequest=')]]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (typeof replIDs != 'null'){
		for (i=0; i < replIDs.snapshotLength; i++) {
//			console.info(i + ': ' + replIDs.snapshotItem(i).href + ' -> ' + ActionRequestID + '\nOld actionRequest: ' + oldActionRequestID + ' - new ActionRequestID: ' + ActionRequestID); 
//			console.info(i + ' : About to be changed to -> ' + replIDs.snapshotItem(i).href.replace('actionRequest=' + oldActionRequestID,'actionRequest=' + ActionRequestID));
			replIDs.snapshotItem(i).setAttribute('href', replIDs.snapshotItem(i).href.replace('actionRequest=' + oldActionRequestID,'actionRequest=' + ActionRequestID));
//			console.info(i + ' : Changed to -> ' + replIDs.snapshotItem(i).href);
		}
		replIDs = null;
	}

	if (Config.get('CityGift') == 'Selected') {
		SelectedGiftCityID = SelectedCityID;
	} else {
		SelectedGiftCityID = Config.get('CityGift');
	}
	uritogift = "http://" + document.domain + "/index.php?action=AvatarAction&function=giveDailyActivityBonus&actionRequest=" + ActionRequestID + "&dailyActivityBonusCitySelect=" + SelectedGiftCityID;

	console.log('Rerunning in ' + Config.get('TimerCountdown') + ' seconds.');
	countdownID = window.setTimeout(function(){ getdoc(uritogift); }, Config.get('TimerCountdown')*1000);
	ikatmp.innerHTML = '';
}

console.log ('Running in ' + Config.get('TimerCountdown') + ' seconds');
countdownID = window.setTimeout(function(){ getdoc(uritogift); }, Config.get('TimerCountdown')*1000);
unsafeWindow.countdownID = countdownID;


function addOptionsLink(scriptName) {
	if($('#IkaOptionsDropdown').size() == 0) {
		GM_addStyle('\
			#IkaOptionsDropdown { position:absolute; }\
			#IkaOptionsDropdown:hover { padding-bottom:20px; }\
			#IkaOptionsDropdown #IkaOptionsDropdownLinks { display:none !important; }\
			#IkaOptionsDropdown:hover #IkaOptionsDropdownLinks { display:block !important;  }\
			#IkaOptionsDropdownLinks { background-color:#FFF5E1; padding:.5em; padding-bottom:0; border:1px solid #666; position:absolute; right:-80px; margin-top:2px; width:170px; }\
			#IkaOptionsDropdownLinks a { color:#666; cursor:pointer; margin-left:0; padding-left:.2em; display:block; margin-bottom:.5em; }\
		');
		var li = document.createElement('li');
		li.innerHTML = '<a href="javascript:void(0);" id="IkaOptionsDropdownMenuItem" style="position:relative;">Scripts <img src="' + Config.icons.config + '" align="absmiddle"/></a> <div id="IkaOptionsDropdownLinks"></div>';
		li.id = 'IkaOptionsDropdown';
		$('#GF_toolbar ul').append(li);
	}
	// add link
	var a = document.createElement('a');
	a.innerHTML = scriptName;
	var id = 'IkaScriptSettings_' + scriptName.replace(/\s/g, '_');
	a.id = id;
	a.addEventListener('click', function() {
		Config.show();
	}, false);
	$('#IkaOptionsDropdownLinks').append(a);			
}


addOptionsLink(Config.scriptName);

