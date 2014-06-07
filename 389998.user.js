// ==UserScript==
// @name       CHG - Salesforce Developer Clean-up
// @namespace  http://use.i.E.your.homepage/
// @version    0.4.10
// @description  Does some clean-up and nice-to-haves for developers working in FOX/SalesForce.com
// @include           https://chg*.my.salesforce.com/*
// @include           https://chg*.visual.force.com/*
// @author Kevin Gwynn <kevin.gwynn@gmail.com>
// @copyright  2013, Kevin Gwynn
// ==/UserScript==

// Can be changed to alerts or another custom method
var logger = function(m){console.log(m);};
var kag_div = null;

logger('KAG: Salesforce Developer Cleanup started...');

// Make it known the script is running:
logger('KAG: Applying KAG to environment identifier');
var kag_identifier = document.getElementsByClassName('normalImportance subMsg');
if (typeof kag_identifier != 'undefined' && kag_identifier != null && kag_identifier.length > 0) {
	kag_identifier[0].innerHTML = 'KAG:';
}

// Make "User Profile" link just take you to Edit your user profile directly
logger('KAG: Changing "User Profile" link...');
var kag_link = document.getElementsByClassName('menuButtonMenuLink firstMenuItem');
if (typeof kag_link != 'undefined' && kag_link != null && kag_link.length > 0) {
	kag_link[0].href= '/' + window.UserContext.userId + '/e';
}

// Auto-collapse page sections
logger('KAG: Auto-collapse sections')
var kag_twists = document.getElementsByClassName('hideListButton');
if (typeof kag_twists != 'undefined') {
	var i = 0;
	do {
		kag_twists[0].onclick();
	} while (kag_twists.length > 0 && i < 20);
}

// Auto focus search input
logger('KAG: Auto-focus on global search');
kag_div = document.getElementById('phSearchInput');

if (kag_div != null) {
	logger('KAG: Making the search input focused...');
	kag_div.focus();
}

kag_div = document.getElementById('adapterIframeDiv');

if (kag_div == null) {
	logger('KAG: No CTI adapter frame...');
} else {
	window.closeCtiAdapter = function() {
		logger('KAG: Removing CTI stuff...');
		if (typeof Sfdc != 'undefined' && typeof Sfdc.cti != 'undefined') {
			logger('KAG: Removing CTI components, resetting "ctiondemand", stopping');
			Sfdc.cti.ctiondemand.removeAdapterIframe();
			Sfdc.cti.ctiondemand.removeReloadAdapterButton();
			Sfdc.cti.ctiondemand = { addAdapterIframe : function(){}, removeAdapterIframe : function(){}, reloadAdapterIframe : function(){}, addReloadAdapterButton : function(){}, removeReloadAdapterButton : function(){},browserSupportsCTIOnDemand : function(){},initializeCTIOnDemand : function(){},checkIfInitialized : function(){},getSessionId : function(){},getInstance : function(){},isCtiWidgetMode : function(){},updateSoftphone : function(){},updateSoftphoneAjax : function(){},updateSoftphoneClientSide : function(){},getCallCenterSettings : function(){},sendCallCenterSettings : function(){},genericErrorHandler : function(){},loadXMLDocErrorHandler : function(){},getMessageData : function(){},doXSLTTransformation : function(){},processPostMessage : function(){},loadSoftphoneHTML : function() {},sendCTIQueueMessage : function() {},sendCTIMessage : function() {},doPostMessage : function() {},buildSoftphoneMsgHtml : function() {},handleSfdcFrameFocused : function() {},ctiLSMgr : function(){return {setAdapterRunningStatus : function(){},getAdapterRunningStatus : function(){},setSoftphoneHtml : function(){},clearSoftphoneHtml : function(){},handleLocalStorageUpdate : function(){},handleLocalStorageCommit : function(){}};}};
		} else {
			logger('KAG: Setting new timer...');
			setTimeout('window.closeCtiAdapter();', 5000);
		}
	}

	logger('KAG: Setting timeout to close CTI Adapter stuff...');
	setTimeout('window.closeCtiAdapter();', 5000);
}

// Say 'No' to critical updates
logger('KAG: Say no to critical updates...');
var kag_critical_no = document.getElementById('cruc_displayno');
if (typeof kag_critical_no != 'undefined' && kag_critical_no != null) {
	kag_critical_no.checked = 'checked';
	OverlayDialogElement.getDialog('cruc_notify').cancel();
}

// Menu styling tweaks..
logger('KAG: Meanu styling tweaks...');
var kag_css = 'UL.zen-tabMenu LI:not(.zen-active)>A:hover {background-color: #E8F2F4; color: #0A59AD; border-right: 3px solid gray; border-bottom: 3px solid gray; border-top: 1px solid gray; border-left: 1px solid gray; margin-right: -3px; margin-bottom: -1px; margin-left: -7px; padding-top: 3px; padding-bottom: 3px; padding-right: 2px; padding-left: 4px;}';
var kag_style = document.createElement('style');
if (kag_style.styleSheet)
	kag_style.styleSheet.cssText = kag_css;
else
	kag_style.appendChild(document.createTextNode(kag_css));
document.getElementsByTagName('head')[0].appendChild(kag_style);


/// jQuery tweaks
if (typeof jQuery != 'undefined') {
	jQuery(function() {
		// Disable cheesy hover-bar scroll
		// Use timeout because "inline" wasn't "late" enough
		// Disabling this... not working well enough.
		//setTimeout("jQuery(window).unbind('scroll');", 50);
		//alert('unbind!'); jQuery(window).unbind('scroll');
	});
}
//*/