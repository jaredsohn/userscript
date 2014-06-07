var GMSU_meta_CCE_Module_Config = <><![CDATA[
// ==UserScript==
// @name					CCE_Module_Config
// @namespace				http://userscripts.org/users/208041
// @scriptid				131750
// @description				A Config Module for a beta version of Cracked.com Enhancer -- EMPTY
// @author					jgjake2
// @version					0.0.1
// @timestamp				1335281129426
// @license					http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==
]]></>;

if(typeof unsafeWindow === "undefined") unsafeWindow = window;
if(typeof(window.unsafeWindow) === "undefined") window.unsafeWindow = window;
var GlobalVars = unsafeWindow.GlobalVars;
var parseMetadata = unsafeWindow.parseMetadata;

var ModInfo = parseMetadata(GMSU_meta_CCE_Module_Config);

var CCE_Module_Config = {
	'CSS': '',
	
	'Module_Info': ModInfo,
	
	'onMain': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onMain');
		//this.AddLanguage();
	},

	'onWrapperReady': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onWrapperReady');
		
		if(this.CSS != '') GlobalVars.addStyle(this.CSS);
	},
	
	'onVideoWrapperReady': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onVideoWrapperReady');
	},

	'onModuleRegister': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onModuleRegister');

	},
	
	'onDocumentStart': function(){
		//log.logDebug(Module_Info.name + ' - onDocumentStart');
	}
	
}

if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Config);
else setTimeout(function() {
	if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Comments);
	//else window.location = window.location + '?CCEReloaded=1';
},1);
