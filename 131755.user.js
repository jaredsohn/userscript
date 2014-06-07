var GMSU_meta_CCE_Module_Articles = <><![CDATA[
// ==UserScript==
// @name					CCE_Module_Articles
// @namespace				http://userscripts.org/users/208041
// @scriptid				131755
// @description				An Article Module for a beta version of Cracked.com Enhancer
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

function parseMetadata(headerBlock){
	var isAGmParm = function(element) { return /\/\/ @/.test(element); }
	var lines = headerBlock.split(/[\r\n]+/).filter(isAGmParm);
	var metadata = { include: [], exclude: [], require: [], resource: {} };
	for each (var line in lines){
		try{[line, name, value] = String(line).match(/\/\/ @(\S+)\s*(.*)/);
		} catch(e){continue;}
		if (metadata[name] instanceof Array)
			metadata[name].push(value);
		else if (metadata[name] instanceof Object) {
			[rName, rValue] = value.split(/\s+/);
			metadata[name][rName] = rValue;
		}
		else
			metadata[name] = value;
	}
	return metadata;
}
var ModInfo = parseMetadata(GMSU_meta_CCE_Module_Articles);

var CCE_Module_Articles = {
	'CSS': '',

	'Module_Info': ModInfo,

	'AddLanguage': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.AddLanguage');
		GlobalVars.lang.language.en[this.Module_Info.name] = {
			'Name': 'Article Module',
			'Meta': GMSU_meta_CCE_Module_Articles,
		}
	},
	
	'ZoomImages': function(){
		var ImageCSS = <><![CDATA[
		
			p[align="center"] > img, section.body > figure > img {
				-webkit-transform:scale(1.0);
				-moz-transform:scale(1.0);
				-o-transform:scale(1.0);
				-webkit-transition-duration: 0.5s;
				-moz-transition-duration: 0.5s;
				-o-transition-duration: 0.5s;
			}
			
			p[align="center"] > img:hover, section.body > figure > img:hover {
				-webkit-transform:scale(%%SCALE%%);
				-moz-transform:scale(%%SCALE%%);
				-o-transform:scale(%%SCALE%%);
				box-shadow:0px 0px 30px gray;
				-webkit-box-shadow:0px 0px 30px gray;
				-moz-box-shadow:0px 0px 30px gray;
			}
			
		]]></>.toString();
		ImageCSS = ImageCSS.split('%%SCALE%%').join(GlobalVars.prefs.ArticleImageHoverZoom);
		this.CSS = this.CSS + ImageCSS;
	},
	
	'RemovePersistentShareBox': function(){
		this.CSS = this.CSS + '#persistent-share {display: none !important;}';
	},
	
	'ChangeImageCaptionSize': function(){
		this.CSS = this.CSS + 'p[align="center"] > font:last-child {font-size: ' + GlobalVars.prefs.ArticleImageCaptionSize + 'px;}';
	},
	
	'onMain': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onMain');
		this.AddLanguage();
	},

	'onWrapperReady': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onWrapperReady');
		
		if(GlobalVars.prefs.ArticleRemovePersistentShareBox == 1) this.RemovePersistentShareBox();
		if(GlobalVars.prefs.ArticleImageCaptionSize != '-1') this.ChangeImageCaptionSize(GlobalVars.prefs.ArticleImageCaptionSize);
		if(GlobalVars.prefs.ArticleImageHoverZoom != -1) this.ZoomImages();
		
		GlobalVars.addStyle(this.CSS);
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

if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Articles);
else setTimeout(function() {
	if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Articles);
	//else window.location = window.location + '?CCEReloaded=1';
	//else window.location.reload();
},1);



