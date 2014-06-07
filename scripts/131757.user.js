var GMSU_meta_CCE_Core = <><![CDATA[
// ==UserScript==
// @name					CCE_Core
// @namespace				http://userscripts.org/users/208041
// @scriptid				131757
// @description				The Core Module for a beta version of Cracked.com Enhancer
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

var CCE_Core = new function(){
	this.prefs = GlobalVars.prefs;
	this.PrefOptions = GlobalVars.PrefOptions;
	this.setValue = unsafeWindow.setValue;
	this.getValue = unsafeWindow.getValue;
	this.addStyle = unsafeWindow.addStyle;
	
	
	this.lang = new function(){
		this.currentLanguage = 'en';
		this.language = {
			'en': {
				'_language':	'English',
				'General': {
					'ScriptName': 'Cracked.com Enhancer',
					'Enable'	: 'Enable',
					'Disable'	: 'Disable',
				},
				'Comments': {
					'ChangeNegativeComments'			: 'Remove or Highlight Negative Comments',
					'ChangeNegativeComments_Option1'	: 'Remove',
					'ChangeNegativeComments_Option2'	: 'Highlight',
					'ChangeNegativeCommentsThreshold'	: 'Threshold for Negative Comments',
					'ShowProfanityByDefault'			: 'Show Profane Comments By Default',
				}
				
			},
			'es': {
				'_language' : 'Spanish',
				'General': {
					'ScriptName': 'Cracked.com Enhancer',
				},
			}
		}
		this.GetAvailableLanguages = function(){
			var tmp = {};
			$.each(this.language, function(key, value) { 
				tmp[key] = value['_language'];
			});
			return tmp;
		}
		
		this.LangExists = function(newLang){
			if (!this.language[newLang]) return false;
			else return true;
		}
		
		this.IsKeySet = function(l, k){
			var tLang = this.language[l];
			if(tLang[k] === "undefined") return false;
			else return true;
		}
		
		this.SetLanguage = function(newLang){
			if(this.LangExists(newLang)) this.currentLanguage = newLang;
		}
		/*
		this.getString = function(key){
			var tLang = this.currentLanguage;
			if(!this.IsKeySet(tLang, key)) tLang = 'en';
			return (this.language[tLang][key]);
		}
		*/
		this.getString = function(s){
			var tString = eval('this.language.' + this.currentLanguage + '.' + s);
			if(tString === "undefined") tString = eval('this.language.en.' + s);
			return tString;
		}
	}
	
	this.log = new function(){
		this.verbosity_level = 5;
		this.OUTPUT_TYPES  = {
				'ERROR'        :   1,
				'WARNING'      :   2,
				'FUNCTION'     :   4,
				'DEBUG'        :   5
			  };
		this.GM_LOG_LEVEL = 0;
		this.consolePtr = console.log;
		this.setConsolePtr = function(type){
			switch (type) {
				case this.OUTPUT_TYPES.ERROR:
					this.GM_LOG_LEVEL = 2;
					this.consolePtr = console.error;
					//this.debugPtr = error;
					break;
				case this.OUTPUT_TYPES.WARNING:
					this.GM_LOG_LEVEL = 1;
					this.consolePtr = console.warn;
					//this.debugPtr = warn;
					break;
				case this.OUTPUT_TYPES.DEBUG:
					this.GM_LOG_LEVEL = 0;
					this.consolePtr = console.debug;
					//this.debugPtr = info;
					break;
				default:
					this.GM_LOG_LEVEL = 0;
					this.consolePtr = console.log;
					//this.debugPtr = debug;
					break;
			}
		}
		this.Change_Verbosity_Level = function(num){
			this.verbosity_level = num;
		}
		this.outputMessage = function(str) {
			var ret = false;
			if (typeof debug !== 'undefined') { debug(str); ret = true; }
			if (typeof GM_log !== 'undefined') { GM_log(str, this.GM_LOG_LEVEL); ret = true; }
			if (typeof console !== 'undefined' && console.log) { this.consolePtr(str); ret = true; }
			return ret;
		};
		this.log = function (str, level){if(this.verbosity_level >= level) this.outputMessage(str);};
		this.logError = function(category, x) {
			var msg = "C.CE Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber;
			this.setConsolePtr(this.OUTPUT_TYPES.ERROR);
			this.log(msg, 1);
		};
		this.logWarning = function(str){
			this.setConsolePtr(this.OUTPUT_TYPES.WARNING);
			this.log(str, 2);
		}
		/*this.logFunction = function(str){
			this.log(str, 3);
		}*/
		this.logFunction = function(str){
			this.setConsolePtr(this.OUTPUT_TYPES.FUNCTION);
			this.log(str, 4);
		}
		this.logDebug = function(str){
			this.setConsolePtr(this.OUTPUT_TYPES.DEBUG);
			this.log(str, 5);
		}
	}

	this.CCE_Modules = {
		Modules: {},
		AddModule: function(NewModule){
			GlobalVars.log.logDebug('CCE_Modules.AddModule: ' + NewModule.Module_Info.name);
			this.Modules[NewModule.Module_Info.name] = NewModule;
			NewModule.onModuleRegister();
		},
		CallAll: function(f){
			$.each(this.Modules, function(key, value){
				try{
					//eval('value.' + f + '()');
					value[f]();
				}catch(e){
					GlobalVars.log.logError('Module Add-'+key, e);
				}
			});
		},
		/*
		CheckAllForUpdates: function(){
			$.each(this.Modules, function(key, value){
				try{
					GlobalVars.CCE_Core.CCE_Modules.CheckForUpdate(value);
				}catch(e){
					GlobalVars.log.logError('Module Update-'+key, e);
				}
			});
		},
		CheckForUpdate: function(m){
			GlobalVars.log.logDebug('CheckForUpdate - ' + m.Module_Info.name);
			var parseVersionString = function(str) {
				if (typeof(str) != 'string') { return false; }
				var x = str.split('\.');
				var maj = parseInt(x[0]) || 0;
				var min = parseInt(x[1]) || 0;
				var pat = parseInt(x[2]) || 0;
				return {
					major: maj,
					minor: min,
					patch: pat
				}
			}

			var CompareVersion = function(a, b){// (a>b)=0; (a<b)=1;  (a==b)=-1;
				var o = -1;
				var V1 = parseVersionString(a);
				var V2 = parseVersionString(b);
				$.each(V1, function(key, value){
					if(parseInt(V1[key]) != parseInt(V2[key])) o = (parseInt(V1[key]) > parseInt(V2[key]) ? 0 : 1);
					if(o != -1) return false;
				});
				return o;
			}
		
			var updateURL = m.Module_Info.metaURL || "http://userscripts.org/scripts/source/130728.meta.js";
			console.log('URL: ' + updateURL + "?" + new Date().getTime());
			try{$.ajax({url: updateURL + "?" + new Date().getTime(), headers: {'Cache-Control': 'no-cache'}}).done(function(r){
				GlobalVars.log.logDebug('UpdateResponse Start');
				var sModInfo = parseMetadata(r.responseText);
				if(m.Module_Info.timestamp < sModInfo.timestamp || CompareVersion(m.Module_Info.version, sModInfo.Module_Info.version) == 1) {
					console.log('Module "' + m.Module_Info.name + '" is out of date');
				} else {
					console.log('Module "' + m.Module_Info.name + '" is up to date');
				}
			});
			}catch(e){ GlobalVars.log.logError('Module Update', e); }
		}*/
	}
	
	this.InitPrefOptions = function(){
	/*
		var MediaResizerDefault_MenuItem = (function(){
			var options = {};
			for(var i = 0; i < VideoPlayerSizes.Sizes.length; i++){
				options[String(i)] = language.getString('MediaResizer_ButtonText_' + VideoPlayerSizes.Sizes[i]['Name']);
			}
			return options;
		}) ();
	*/

		/* General */
		this.PrefOptions['Language'] = {'type':'select', 'options': this.lang.GetAvailableLanguages(), 'default': 'en', 'InSection': 'General'};
		this.PrefOptions['CommentsShowProfanityByDefault'] = {'type':'select', 'options': {0:this.lang.getString('General.Disable'), 1:this.lang.getString('General.Enable')}, 'default': 0, 'InSection': 'General'};
		this.PrefOptions['ChangeNegativeComments'] = {'type':'select', 'options': {0:this.lang.getString('General.Disable'), 1:this.lang.getString('Comments.ChangeNegativeComments_Option1'), 2:this.lang.getString('Comments.ChangeNegativeComments_Option2')}, 'default': 2, 'InSection': 'General'};
		this.PrefOptions['ChangeNegativeCommentsThreshold'] = {'type':'text', 'options': null, 'default': '-1', 'InSection': 'General'};
		this.PrefOptions['DebugVerbosityLevel'] = {'type':'select', 'options': {1:'1',2:'2',3:'3',4:'4',5:'5'}, 'default': '5', 'InSection': 'General'};

		/* Video */
		this.PrefOptions['VideoContinuousPlay'] = {'type':'select', 'options': {0:this.lang.getString('General.Disable'), 1:this.lang.getString('General.Enable')}, 'default': 0, 'InSection': 'Video'};
		this.PrefOptions['VideoAutoPlay'] = {'type':'select', 'options': {0:this.lang.getString('General.Disable'), 1:this.lang.getString('General.Enable')}, 'default': 0, 'InSection': 'Video'};
		this.PrefOptions['VideoForceShowHD'] = {'type':'select', 'options': {0:this.lang.getString('General.Disable'), 1:this.lang.getString('General.Enable')}, 'default': 1, 'InSection': 'Video'};
		this.PrefOptions['VideoTimeoutLength'] = {'type':'text', 'options': null, 'default': '20', 'InSection': 'Video'};
		
		/* Media Resizer */
		//this.PrefOptions['VideoPlayerSizeDefault'] = {'type':'select', 'options': MediaResizerDefault_MenuItem, 'default': '2', 'InSection': 'MediaResizer'};
		this.PrefOptions['VideoPlayerSizeDefault'] = {'type':'select', 'options': {'0': 'Default', '1': 'FillWrapper', '2': 'Best', '3':'MaxHeight'}, 'default': '2', 'InSection': 'MediaResizer'};
		this.PrefOptions['VideoPlayerBestScreenMarginTop'] = {'type':'int', 'options': null, 'default': 78, 'InSection': 'MediaResizer'};
		this.PrefOptions['VideoPlayerBestScreenMarginLeft'] = {'type':'int', 'options': null, 'default': 50, 'InSection': 'MediaResizer'};
		this.PrefOptions['VideoPlayerBestScreenMarginBottom'] = {'type':'int', 'options': null, 'default': 27, 'InSection': 'MediaResizer'};
		this.PrefOptions['VideoPlayerBestScreenMarginRight'] = {'type':'int', 'options': null, 'default': 50, 'InSection': 'MediaResizer'};
		
		/* Article */
		this.PrefOptions['ArticleImageCaptionSize'] = {'type':'text', 'options': null, 'default': '10', 'InSection': 'Article'};
		this.PrefOptions['ArticleImageHoverZoom'] = {'type':'int', 'options': null, 'default': '1.5', 'InSection': 'Article'};
		this.PrefOptions['ArticleRemovePersistentShareBox'] = {'type':'select', 'options': {0:this.lang.getString('General.Disable'), 1:this.lang.getString('General.Enable')}, 'default': 0, 'InSection': 'Article'};
		
	}
	
	this.GetPreferences = function(){
		$.each(this.PrefOptions, function(key, value) {
			GlobalVars.prefs[key] = getValue(key, value.default);
		});
	}
	
	this.Initialize = function(){
		//PageType = GetPageType();
		AddJQueryFunctions();
		this.InitPrefOptions();
		this.GetPreferences();
		//log.Change_Verbosity_Level(prefs.DebugVerbosityLevel);
		//unsafeWindow.lang.SetLanguage(this.prefs.Language);
	}
	
	
	
	this.main = function(){
		this.log.logDebug('Main!');
		this.CCE_Modules.CallAll('onMain');
	}
	
	this.onMainScriptLoaded = function(){
		//if(!$('fb-root')) document.body.appendChild(document.createElement('div')).id = 'fb-root';
		//document.body.appendChild(document.createElement('div')).id = 'fb-root';
		this.Initialize();
		//this.CCE_Modules.CallAll('onMainScriptLoaded');
	}

	
	$('#videoWrapper').ready(function(){
		GlobalVars.CCE_Core.CCE_Modules.CallAll('onVideoWrapperReady');
	});
	

	$('#Wrapper').ready(function() {
		GlobalVars.CCE_Core.CCE_Modules.CallAll('onWrapperReady');
		CCE_Core.main();
	});
	
	$(document).ready(function(){
		//GlobalVars.CCE_Core.CCE_Modules.CheckAllForUpdates();
	});
}
GlobalVars.CCE_Core = CCE_Core;
GlobalVars.log = CCE_Core.log;
GlobalVars.lang = CCE_Core.lang;

RegisterModule = function(m){
	GlobalVars.log.logDebug('RegisterModule: ' + m.Module_Info.name);
	GlobalVars.CCE_Core.CCE_Modules.AddModule(m);
}
GlobalVars.RegisterModule = RegisterModule;

function AddJQueryFunctions(){
	$.fn.getElementIndex = function() {
		var allSibs = this.parent().children();
		var Index = allSibs.index(this);
		return Index;
	};

	$.fn.watch = function(props, callback, timeout){
		if(!timeout)
			timeout = 10;
		return this.each(function(){
			var el 		= $(this),
				func 	= function(){ __check.call(this, el) },
				data 	= {	props: 	props.split(","),
							func: 	callback,
							vals: 	[] };
			$.each(data.props, function(i) { data.vals[i] = el.css(data.props[i]); });
			el.data(data);
			if (typeof (this.onpropertychange) == "object"){
				el.bind("propertychange", callback);
			} else if ($.browser.mozilla){
				el.bind("DOMAttrModified", callback);
			} else {
				setInterval(func, timeout);
			}
		});
		function __check(el) {
			var data 	= el.data(),
				changed = false,
				temp	= "";
			for(var i=0;i < data.props.length; i++) {
				temp = el.css(data.props[i]);
				if(data.vals[i] != temp){
					data.vals[i] = temp;
					changed = true;
					break;
				}
			}
			if(changed && data.func) {
				data.func.call(el, data);
			}
		}
	}
}
GlobalVars.CCE_Core.onMainScriptLoaded();
