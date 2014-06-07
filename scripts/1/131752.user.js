var GMSU_meta_CCE_Module_Comments = <><![CDATA[
// ==UserScript==
// @name					CCE_Module_Comments
// @namespace				http://userscripts.org/users/208041
// @scriptid				131752
// @description				A Comments Module for a beta version of Cracked.com Enhancer
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
var ModInfo = parseMetadata(GMSU_meta_CCE_Module_Comments);

var CCE_Module_Comments = {
	'CSS': '',
	
	'Module_Info': ModInfo,
	
	'PageHasCommentSection': function(){
		if($('#Comments')) return true;
	},
	
	'ChangeNegativeComments': function(){
		var $Comments_Li = $('ol.Comments li.Comment .meta');
		$Comments_Li.each(function() {
			var $Count_Li = $(this).find('li.Total_Votes.Vote_Negative');
			//log.logDebug('$Count_Li:' + parseInt($Count_Li.html()));
			var CommentTotalVotes = parseInt($Count_Li.html());
			if(parseInt(GlobalVars.prefs.ChangeNegativeCommentsThreshold) >= parseInt(CommentTotalVotes)){
				if(GlobalVars.prefs.ChangeNegativeComments == 1){
					$(this).remove();
				} else {
					$(this).css({'backgroundColor': '#F70A11', 'color': '#FFFFFF'});
					$(this).find('.username, .rate.Note').css({'color': '#FFFFFF'});
					$(this).find('li.Total_Votes.Vote_Negative').css({'color': '#FFFF00'});
				}
			}
		});
		
		$('#LoadMore').click(function(){
			setTimeout(function() {CCE_Module_Comments.ChangeNegativeComments();},1500);
		});
	},
	
	'getCommentObject': function(){
		if(typeof(window.comment) !== "undefined") return(window.comment);
		if(typeof(unsafeWindow.comment) !== "undefined") return(unsafeWindow.comment);
		if(typeof(comment) !== "undefined") return(comment);
		return "undefined";
	},

	'ShowProfanityByDefault': function(){
		if(typeof(window.comment) !== "undefined") window.comment.showHideProfanity();
		else if(typeof(unsafeWindow.comment) !== "undefined") unsafeWindow.comment.showHideProfanity();
		else if(typeof(comment) !== "undefined") comment.showHideProfanity();
	},

	'CommentsStart': function(){
		if(!this.PageHasCommentSection()) return false;
		if(GlobalVars.prefs.CommentsShowProfanityByDefault == 1) this.ShowProfanityByDefault();
		if(GlobalVars.prefs.ChangeNegativeComments != 0) {
			if(this.getCommentObject().loading_comments == true) {
				setTimeout(function(){ this.ChangeNegativeComments(); }, 1500);
			}else{
				this.ChangeNegativeComments();
			}
		}
	},

	'onMain': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onMain');
		//this.AddLanguage();
	},

	'onWrapperReady': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onWrapperReady');
		this.CommentsStart();
		
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

if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Comments);
else setTimeout(function() {
	if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Comments);
	//else window.location = window.location + '?CCEReloaded=1';
},1);
