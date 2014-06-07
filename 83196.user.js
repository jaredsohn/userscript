// ==UserScript==
// @name	                     trailr
// @namespace	                 http://trailr.info
// @description                  Auto sign with award/comment group code, invite without copy nor pasting and auto comment the place where you come from
// @version                      1.9.05
// @identifier	                 http://trailr.info/trailr.user.js
// @date                         2009-09-09
// @main-developers              Simone Diolaiuti (eagleglide [AT] eagleglide.com, http://www.eagleglide.com), Pierre Andrews (mortimer.pa@free.fr)
// @other-code-contributors      Marcos Kuhns (http://www.kuhnsfam.com/), Marco Bernardini, Martin Heimburger (vispillo@vispillo.org)
// @graphic-design-contributors  Markus Eisele (http://www.myfear.com)
// @include                      http://*flickr.com/photos/*/* 
// @include                      http://*flickr.com/groups
// @include                      http://*flickr.com/groups/
// @exclude                      http://*flickr.com/photos/organize*
// @unwrap
// ==/UserScript==

// --------------------------------------------------------------------
// Copyright (C) 2008-2009 Simone Diolaiuti, Pierre Andrews
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
//
// If you want to use any part of this code, you must appropriately credit authors  
// by stating their names and web site urls and emails. And please also remind the users
// to Trailr project website: www.trailr.info
//
// main change list:
// 2008.08.29: Simone Diolaiuti added OurOwnSignature feature 
// 2008.09.09: Simone Diolaiuti added UpdateAlert feature
// 2008.09.13: Simone Diolaiuti added OurOwnInvitation feature
// 2008.11.17: Simone Diolaiuti added Playr feature
// 2009.01.01: Simone Diolaiuti added ManualOOX feature and moved Playr feature as a different plugin
// 2009.02.13: Simone Diolaiuti added FlashInvite feature

///OPTION SECTION, BEGIN

OPT_FLASH_INVITE=true;
OPT_NO_SEENON_IF_OOS=false;
OPT_GRAPHIC_BAR=false;
OPT_INVITES_BEFORE=true;
OPT_PRIVACY_NO_TLRBY=true;
OPT_NO_RLINK=true;

///OPTION SECTION, END


//update information
var SCRIPT = {
	name: "trailr",
	namespace: "http://trailr.info",
	description: "auto sign with custom group code, invite without copy nor pasting and auto comment the place where you come from",
	identifier: "http://trailr.info/trailr.user.js",
	prevurl: "http://svn.assembla.com/svn/trailr/tags/release-1.18.0/trailr.user.js",
	version: 10190300,
	version_uf: "1.19.3",
	date: (new Date(2009, 09, 09)).valueOf()
};

parseOptions=function(){
	if(OPT_GRAPHIC_BAR){
		OPT_FIRST_SEPARATION_BAR='\n<img src="http://farm4.static.flickr.com/3116/3254727922_9843fa8536_o.gif" title="Commented using Trairl" />';
		TLR_SEP_BAR='<img src="http://farm4.static.flickr.com/3116/3254727922_9843fa8536_o.gif" />';
	}else{
		OPT_FIRST_SEPARATION_BAR="\n--";
		TLR_SEP_BAR='\n--\n';
	}
		//OPT_FIRST_SEPARATION_BAR="\n-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-";
		//OPT_FIRST_SEPARATION_BAR="\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;-&nbsp;-&nbsp;-&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-";
};
parseOptions();

var flickrgp;

var DEBUGMODE=0;

var DISCUSS = 0;
var POOL = DISCUSS+1;
var FELLOW = POOL+1;
var RANDOM = FELLOW+1;
var SET = RANDOM+1;
var MAP = SET+1;
var PHOTOPHLOW = MAP+1;

var AT_BEGINNING=1;
var AT_END=2;
var AT_CURSOR=3;
var AFTER=4;
var BEFORE=5;

var TLRURL="http://www.flickr.com/groups/869738@N24/";
var TLR_NT_NOTIFY="http://trailr.info/pi.php";

var TLR_STUFF_OPEN='';//builded on initialization phase: see init method
var TLR_STD_LOGO_URL="http://farm4.static.flickr.com/3100/3211768919_24bd556312_o.gif";
var TLR_ID_FINDER=/farm4.static.flickr.com\/3597\/3335399250_430e9705ca_o.gif/g
var TLR_ID='<img src="http://farm4.static.flickr.com/3597/3335399250_430e9705ca_o.gif" width="1" height="1"/>';
var TLR_LOGO_ID_TEXT="Commented by using Trailr";

var FRC_NOTE='';
var FRC_ICON='';
var FRC_HEADER='\n'+FRC_ICON;
var FRC_FOOTER='(<a href="'+TLRURL+'"> <b>?</b>² </a>)';

var SMALL_IMG_TAG='[TLR-SMALL-IMG]';
var NO_IMG_TAG='[TLR-NO-IMG]';

var OOS_REGEX_OLD=/\[TLR-OOS\][^<]*<(?:\b)?\/a>([^]*)?<img[^<>]*title="\[\/TLR-OOS\]"/;
var OOS_REGEX=/\[TLR-OOS\][^<]*<(?:\b)?\/a>([^]*)?<(img|a)[^<>]*(title|name)="\[\/TLR-OOS\]"/;
var OOS_ICON='';//'<a href="http://trailr.eagleglide.com"><img src="http://farm4.static.flickr.com/3198/2870300465_278bf856ab_o.png" /></a>';
var OOS_HEADER=''+OOS_ICON;
var OOS_FOOTER='';
var OOS_MAX_LENGTH=700;
//var OOS_SLOGAN='tired of all that copying and pasting? Why don\'t you give <a href="http://www.assembla.com/spaces/trailr">trailr</a> a try?';

var RL_LINK='http://red.trailr.info/red2.php?';

var UA_NEW_VERSION_CHECK_URL="http://trailr.info/trailr_info.xml";
var UA_UPDATE_WARNING='<p style="background-color:#ffa2d2; color:blue; cursor:pointer"><b>A new version of Trailr is available: please click here for update info.</b></p>';
var UA_UPDATE_DEF_URL="http://trailr.info/trailr.user.js";

var THEME_INFO_URL="http://trailr.info/trailr_info.xml";

var OOI_REGEX_OLD=/\[TLR-OOI\][^<]*<(?:\b)?\/a>([^]*)?<img[^<>]*title="\[\/TLR-OOI\]"/;
var OOI_REGEX=/\[TLR-OOI\][^<]*<(?:\b)?\/a>([^]*)?<(img|a)[^<>]*(title|name)="\[\/TLR-OOI\]"/;
var OOI_MAX_LENGTH=700;
var OOI_SLOGAN="TrailrEVoLUTiON... turn copy&past into save&forget";
var OOI_ICON='';
var OOI_CUSTOM_INVITE_HEADER=TLR_SEP_BAR+OOI_ICON;
var OOI_CUSTOM_INVITE_FOOTER='';
var OOI_STANDARD_INVITE_HEADER=TLR_SEP_BAR+OOI_ICON+'I think <i>';
var OOI_STANDARD_INVITE_FOOTER="</i> group would suit your photo very well. I suggest you to take a look at that group.\n";
var OOI_NT_IO_WARNING='(<b>Note</b>: This might be a "by invitation only" not yet trailr<i>ized</i> group, then this invitation could not be recognized as an <i>official</i> one.)';
var OOI_LOG_NT_IO_WARNING='<i>[non yet trailrized grp: but <b>you can still use the official invite</b>. Click customize -->]</i>';
var OOI_LOG_NT_INFO="";//"<i>[non yet trhttp://www.dustindiaz.com/add-and-remove-html-elements-dynamically-with-javascript/ailrized grp: <b>text only</b> invite added. Please, ask the administrator to trailrize the group.]</i>";
var OOI_LOG_TR_INFO="<i>[<b><span style=\"color:green\">trailrized grp</span></b>: custom invite added]</i><br/>";

var OOI_PI='<a href="HREF" title="TITLE"><img src="SRC" /></a>'; //pending invite code
var OOI_PI_IMAGE='http://trailr.info/pi.php?t=img&';
var OOI_PI_LINK='http://trailr.info/pi.php?t=link&';
var OOI_IO_WORDS=/(invite|invitation|invited)/i; 

///number of days before rechecking group description for updated snippets codes
var REFRESH_INTERVAL=5; ///TODO: reset to 5

var WT_ALERT='<img src="http://farm4.static.flickr.com/3184/3037249869_4dc3f85655_o.gif" alt="trailr is retrieving data..." title="trailr is retrieving data..."/>';
var WT_STANDARD_MSG='Trailr is retrieving data ...'; 

var FDBK_TRAILR_CONTACT="51729478@N00";

var VAR_code="null";
var VAR_userid="";
var VAR_ap_handler;
var VAR_ap_code;

var VAR_pda_accepted=false;
var VAR_script_enabled=true;
var VAR_oos_enabled=true;

getBID=document.getElementById;

CASE=Array();
CASE["http://flickr.com/groups"]=1;
CASE["http://flickr.com/groups/"]=1;
CASE["http://www.flickr.com/groups"]=1;
CASE["http://www.flickr.com/groups/"]=1;


function resetSavedData(logger){
	GM_setValue("LG_latest_logo_available",TLR_STD_LOGO_URL);
	GM_setValue("LG_latest_logo_checking_on", "null");
	GM_setValue("OOI_saved_list","null"); //to shedule the update of invite selector code
	logger.logGeneric('<span style="color:purple"><b>Welcome to Trailr.\n\nIt seems to be the first time you use this version.\nPlease refresh your page.\nThat is needed only when you install a new version of Trailr.\n\nThank you and have a nice Flickring.</b></span>');
}

function debugClean(){
	dodo=safeWrap(function(){
		GM_setValue("UA_latest_check",6);
		GM_setValue("UA_previous_version","10014001");
		SCRIPT['version']=10014001;
		UA_NEW_VERSION_CHECK_URL="http://dl.getdropbox.com/u/170708/4trailr/trailr_info.xml";
	});dodo();
}


function bind(obj, fun, args){
  return function() {
    if (obj === true)
      obj = this;
    var f = typeof fun === "string" ? obj[fun] : fun;

    return f.apply(obj, Array.prototype.slice.call(args || []).concat(Array.prototype.slice.call(arguments)));
  };
};

var getinc_n=1;
function getInc(){
	return getinc_n++;
};



var safeWrap = function(f) {
	return function() {
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments, 1)));
	};
}

var safeBindWrap = function(self,f){
	f=bind(self,f);
	return function() {
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments, 2)));
	};
}

var safeCall = function(f){
	var args=arguments;
	var fun=function() {
		setTimeout.apply(window, [f, 0].concat(Array.prototype.slice.call(args,1)));
	};
	fun();
}

var safeBindCall = function(self,f){
	f=bind(self,f);
	var args=arguments;
	var fun=function() {
		setTimeout.apply(window, [f, 0].concat(Array.prototype.slice.call(args,2)));
	};
	fun();
}

function documentInsertElement(elem,pivot,where){
	switch(where){
		case BEFORE:
			pivot.parentNode.insertBefore(elem,pivot);
		break;
		case AFTER: 
			pivot.parentNode.insertBefore(elem,pivot.nextSibling);
		break;
		case AT_BEGINNING:
			pivot.insertBefore(elem,pivot.firstChild);
		break;
		case AT_END: 
			pivot.insertBefore(elem,pivot.lastChild);
		break;
	}
}

// by Trailr Pseudo Tag identification
function documentGetElementByPT(name){
	var els=document.getElementsByTagName('img');
	var i=0,el=-1;
	for(;i<els.length;i++){
		if(els[i].getAttribute('alt')==name){ el=i; break;}
	}
	if(el==-1) return null;
	return els[el];
}

function documentGetElementsByPT(name,elems){
	var els=document.getElementsByTagName('img');
	var i=0,l=elems.length;
	for(;i<els.length;i++){
		if(els[i].getAttribute('alt')==name){ elems[elems.length]=els[i]; }
	}
	return elems.length!=l;
}

function insertAtCursor(field, text) {
	if (document.selection) {
		field.focus();
		var sel = document.selection.createRange();
		sel.text = text;
	}//compatibility alternatives
	else if (field.selectionStart || field.selectionStart == '0') {
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		field.value = field.value.substring(0, startPos)
		+ text
		+ field.value.substring(endPos, field.value.length);
	} else {
		field.value += text;
	}	
}

function isVoid(text){
	if(text==null) return true;
	var m=/[a-zA-Z0-9]/.exec(text);
	return m==null;
}

function alignOOI(code){
	code=code.replace(/^\s+/g,"");
	code=code.replace(/\s+$/g,"");
	var m=/^(<i[^<]+|<b[^<]+|<strong[^<]+|<a[^<]+)*<img/i.exec(code);
	if(m){
		code="\n"+code;
	}
	return code;
}

function alignOOS(code){
	code=code.replace(/^\s+/g,"");
}


var m8l=function(msg){
	if(DEBUGMODE && console && console.log){
		console.log(msg);
	}
};

var	rLink=function(txt,username){
	if(OPT_NO_RLINK) return txt;
	
	if(/<(?:\b)?[aA]\b[^<>]*>[^(\/a>)]*flickr.com/i.exec(txt)) return txt; //this is to avoid that Flickr modifis the link text
	var matches=/<[^<>]+>/.exec(txt);
	var rpl;
	if(OPT_PRIVACY_NO_TLRBY){
		rpl='<a href="'+RL_LINK+'tlrv='+SCRIPT.version+'&tlrurl=http://';
	}else{
		rpl='<a href="'+RL_LINK+'tlrv='+SCRIPT.version+'&tlrby='+username+'&tlrurl=http://';
	}
	return txt.replace(/<(?:\b)?[aA]\b[^<>]*(href|HREF|Href)(?:\b)?=(?:\b)?"(?:\b)?(http:\/\/|HTTP:\/\/)/g,rpl);
	
	/*var m=/<(?:\b)?[aA]\b[^<>]*(?:href|HREF|Href)?(?:\b)?=(?:\b)?"(?:\b)?([^"]*)?/g.exec(txt);
	//TODo: funziona solo pe ril primo, generalizzare
	
	var em=Array();
	for(var i=1;i<m.length;i++){
		em[i]=rLink(escape(m[i]),username);
	}
	for(i=1;i<m.length;i++){
		txt=txt.replace(m[i],em[i]);
	}

	m8l("trailrizeCode:"+txt);
	return txt;
	* */
	
}

var _Waiter=function(){};
_Waiter.prototype={
		
	/**
	 * show one wait. The returned value can be used to hide the wait spot by calling hideWait(w) method or hideWait() to hide all wait spots
	 * @param elem the element to insert wait spot after
	 * @return the wait spot DOM element
	 **/
	showWait: function(elem,text,where){
		where=where===undefined?BEFORE:where;
		var w=document.createElement('span');
		w.innerHTML=WT_ALERT+(text===undefined?WT_STANDARD_MSG:text);
		w.setAttribute("name","WT_ALERT");
		documentInsertElement(w,elem,BEFORE);
		return w;
	},
	
	/**
	 * hide all wait spots
	 **/
	hideWait: function(){
		var ws=document.getElementsByName("WT_ALERT");
		for(var i=0; i<ws.length;i++){
			ws[i].parentNode.removeChild(ws[i]);
		}
	},
	
	/**
	 * hide one wait spot
	 **/
	hideWait: function(w){
		w.parentNode.removeChild(w);
	}
};
var Waiter=new _Waiter();

var Logger=function(panel){this.init(panel);};
Logger.prototype={
	screen: null,
	logGeneric: function(message){
		var elem=document.createElement('p');
		elem.innerHTML='<p>'+message+'</p>';
		documentInsertElement(elem,this.screen,AT_BEGINNING);
	},
	logWarning: function(message){
		var elem=document.createElement('p');
		elem.innerHTML='<p style="color:#d7c1d5;background-color:0063dc;">'+message+'</p>';
		documentInsertElement(elem,this.screen,AT_BEGINNING);
	},
	logInvitation: function(gid,name,code){
		var elem=document.createElement('p');
		elem.innerHTML='<p>invitation: <b><i>'+name+'</i></b>.<br/>'+code+'</p>';
		documentInsertElement(elem,this.screen,AT_BEGINNING);
	},
	logSeenOn: function(text,code){
		var elem=document.createElement('p');
		elem.innerHTML='<p>seen on message: '+text+'.<br/>'+code+'</p>';
		documentInsertElement(elem,this.screen,AT_BEGINNING);
	},
	
	clear: function(){
		while(this.screen.firstChild){
			this.screen.removeChild(this.screen.firstChild);
		}
	},
	init:function(panel){
		this.screen=panel;
		this.logGeneric("&nbsp;");
	}
};

function CommentControl(comment_ta,log_screen,mem) {
	//textarea DOM element where users type their comment
	this.comment_textarea = null;
	
	//log manager
	this.logger=null;
	
	//memory manager
	this.mem=null;
	
	//array of invitations
	this.inv=null;
	
	//seen on message
	this.seenon="";
	
	//OOS message
	this.oos="";
	
	//if true, OOS e seen on messages will be omitted
	this.omit_tlr_stuff=false;
	
	//Audio tags
	this.audio=null;
	
	//the whole text trailr will add to the comment
	this.txt="";
	
	//the list of invitation on non trailrized group
	this.ntinv=Array();
	
	this.justCommented=function(){
		comform = document.getElementsByClassName('add-comment-form')[0];
		inps = comform.getElementsByTagName('input');
		var photo_id = '';
		for (var i=0;i<inps.length;i++) {
			if (inps[i].getAttribute('name') == 'photo') {
				photo_id = inps[i].getAttribute('value');
			}
		}
		m8l("page_photo_id:"+photo_id);
		m8l("GM_getValue(last_commented_photo,0):"+GM_getValue("last_commented_photo",0));
		return photo_id==GM_getValue("last_commented_photo",0);
	};
	
	this.addSeenOn=function(text){
		m8l("sono qui");
		this.seenon=TLR_STUFF_OPEN+text;
		var code='<span id="seen_on_remove" style="color:red; cursor: pointer;">[x]remove "seen on" info</span><span id="oos_customize" style="cursor:pointer;color:blue;"></span><span id="oos_remove" style="cursor:pointer;color:purple;"></span>';
		this.logger.logSeenOn(text,code);
		
		var self=this;
		function dodo(event){
			self.removeSeenOn();
			//event.stopPropagation();
			//event.preventDefault();
		};
		var obj=document.getElementById('seen_on_remove');
		obj.addEventListener('click', dodo, false);
		
		function restore_stuff(event){
			self.omit_tlr_stuff=false;
			self.logger.logGeneric('done! award/seen on message(s) restored.');
		};
		if(this.justCommented()){
			this.logger.logGeneric('you have just commented this photo: redundant seen on info will be omitted in your next comment on this photo.<br/>\
			                        <span id="restore_tlr_stuff" style="color:blue; cursor: pointer;">[<<]restore all</span>');
			this.omit_tlr_stuff=true;
			var obj=document.getElementById('restore_tlr_stuff');
			obj.addEventListener('click', restore_stuff, false);			
		}
	};
	
	this.addOOS=function(text){
		this.oos=TLR_SEP_BAR+text;
		
		var self=this;
		function dodo(event){
			self.removeOOS();
			//event.stopPropagation();
			//event.preventDefault();
		};
		var obj=document.getElementById('oos_remove');
		obj.innerHTML=" [x]remove graphic award "
		obj.addEventListener('click', dodo, false);
		
		if(OPT_NO_SEENON_IF_OOS) this.removeSeenOn();
		
		function restore_stuff(event){
			self.omit_tlr_stuff=false;
			self.logger.logGeneric('done! award/seen on message(s) restored.');
		};
		if(this.justCommented()){
			this.logger.logGeneric('you have just commented this photo: redundant award code will be omitted in your next comment on this photo.<br/>\
			                        <span id="restore_tlr_stuff" style="color:blue; cursor: pointer;">[<<]restore all</span>');
			this.omit_tlr_stuff=true;
			var obj=document.getElementById('restore_tlr_stuff');
			obj.addEventListener('click', restore_stuff, false);			
		}
	};
	
	this.removeSeenOn=function(){
		this.seenon="";
		if(isVoid(this.oos)){
			this.logger.logGeneric("seen on message removed");
		}else{
			this.logger.logGeneric("seen on message removed BUT award graphic code is still present");
		}
	};
	
	this.removeOOS=function(){
		this.oos="";
		this.logger.logGeneric("award graphic code removed");
	};
	
	//add a trailrzed invitation
	this.addInvitation=function(gid,name,text,logtext){
		this.inv[gid]=text;
		var code=OOI_LOG_TR_INFO+'<span id="invitation_'+gid+'" style="color:red; cursor: pointer;">[x]remove</span>'+(logtext!==null?logtext:"");
		this.logger.logInvitation(gid,name,code);
		
		safeCall(this.mem.setGname,gid,name);
		
		this._addRemoveEventControl(gid);
	};
	
	//add an Invite Only Invitation to a non trailrized group
	this.addIOInvitation=function(gid,name,text){
		var glink='http://flickr.com/groups/'+gid;
		var html=OOI_STANDARD_INVITE_HEADER+'<a href="'+glink+'"><b>'+name+'</b></a>'+OOI_STANDARD_INVITE_FOOTER;
		//TODO: choose what tipe of non trailzed - invitation only group treatment we want to adopt: temporary img or a simply text message
		//html+=OOI_PI.replace(/SRC/g,OOI_PI_IMAGE+'url='+glink+'&gid='+gid+'&name='+name); //TODO: parse name to remove & chars
		//html+=html.replace(/HREF/g,OOI_PI_LINK+'url='+glink+'&name='+name); //TODO: parse name to remove & chars
		
		html+=OOI_NT_IO_WARNING;
		this.inv[gid]=html;
		this.ntinv.push(gid);
		
		var log_added_code=OOI_LOG_NT_IO_WARNING+'\n<span id="invitation_'+gid+'" style="color:red; cursor: pointer;">[x]remove</span>'+text;
		this.logger.logInvitation(gid,name,log_added_code);
		
		safeCall(this.mem.setGname,gid,name);
		
		this._addRemoveEventControl(gid);
	};
	
	this.addStandardInvitation=function(gid,name,text){
	
		var glink='http://flickr.com/groups/'+gid;
		var html=OOI_STANDARD_INVITE_HEADER+'<a href="'+glink+'"><b>'+name+'</b></a>'+OOI_STANDARD_INVITE_FOOTER;
		this.inv[gid]=html;
		this.ntinv.push(gid);
		
		var log_added_code=OOI_LOG_NT_INFO+'\n<span id="invitation_'+gid+'" style="color:red; cursor: pointer;">[x]remove</span>'+text;
		this.logger.logInvitation(gid,name,log_added_code);
		
		safeCall(this.mem.setGname,gid,name);
		
		this._addRemoveEventControl(gid);
	};
	
	this._addRemoveEventControl=function(gid){
		var self=this;
		function dodo(event){
			m8l("qui");
			self.removeInvitation(gid);//event.target.tid);
			//event.stopPropagation();
			//event.preventDefault();
		};
		var obj=getBID('invitation_'+gid);
		obj.addEventListener('click', dodo , false);
	};
	
	this.removeInvitation=function(gid){
		this.inv[gid]="";
		this.logger.logGeneric("invitation to <i>"+this.mem.getGname(gid)+"</i> has been removed");
	};
	
	this.addText=function(text,where){
	//insert text at beginning (where=AT_BEGINNING), at the end (AT_END) or at cursor (AT_CURSOR)
		switch(where){
			case AT_BEGINNING:
				this.txt=text+this.txt; break;
			default:
			case AT_CURSOR: //option no more needed 
			case AT_END:
				this.txt+=text; break;
		}
	};
	
	this.flushSeen=function(userid){
		if(this.omit_tlr_stuff) return;
		//adding OOS/seenon info:
		var ooo="";
		if(this.oos!=""){
			ooo+="\n"+this.oos;
		}
		ooo+=this.seenon;
		if(ooo!="") this.txt+=rLink(ooo,userid); //this.txt+=ooo;
	};
	
	this.flushInvites=function(userid){
		//adding invitations:
		var ooo="";	
		for(var k in this.inv){
			//if(this.inv[k]=="") continue;
			ooo+=rLink(this.inv[k],userid);
		}
		if(ooo!="") this.txt+=ooo;
		
		m8l("after rLink: "+this.txt);
	};
	
	this.flush=function(userid){
		if(userid==""){
			userid="anonymous";
		}
		
		//check if OOI or OOS added but the seenon has been removed
		//if so an "I use trailr" message will be added at the bottom
		/*
		if(isVoid(this.seenon)&&(!isVoid(this.oos)||this.inv)){
			this.seenon=TLR_SEP_BAR+FRC_FOOTER;
		}
		* */
		
		if(OPT_INVITES_BEFORE){
			this.flushInvites(userid);
			this.flushSeen(userid);
		}else{
			this.flushSeen(userid);
			this.flushInvites(userid);
		}
		
		if(this.comment_textarea){	
			this.comment_textarea.value+=this.txt;
			this.comment_textarea.selectionStart=comment_textarea.selectionEnd=0;
		}
		
		if(VAR_pda_accepted){
			//notify trailr.info in order to schedule a flickr mail to the non tailrized group administrator:
			if(this.ntinv.length>0){
				var i;
				var pstr="uid="+userid+"&url="+escape(document.location);
				for(i=0;i<this.ntinv.length;i++){
					pstr+="&gid"+i+"="+this.ntinv[i];
				}
				GM_xmlhttpRequest({
					method:"POST",
					url:TLR_NT_NOTIFY,
					headers:{
						"User-Agent":"Mozilla/5.0",
						"Content-type":"application/x-www-form-urlencoded"
					},
					data:pstr,
					onload:function(response){
						m8l('notified invitation on non trailrzed groups: pstr:'+pstr);
					}
				});
			}
		}
	};
	
	this.init = function(comment_textarea,log_screen,mem){
		this.comment_textarea = comment_textarea;
		
		this.inv=new Array();
		this.audio=new Array();
		
		this.logger=new Logger(log_screen);
		this.mem=mem;
		
		var self=this;
		function dodo(event){
			if(VAR_script_enabled){
				self.flush(VAR_userid);
				comform = document.getElementsByClassName('add-comment-form')[0];
				inps = comform.getElementsByTagName('input');
				var photo_id = '';
				for (var i=0;i<inps.length;i++) {
					if (inps[i].getAttribute('name') == 'photo') {
						photo_id = inps[i].getAttribute('value');
					}
				}
				if(!(isVoid(self.seenon)&&isVoid(self.oos))) GM_setValue("last_commented_photo",photo_id);
			}

			// if you want to prevent the default click action
			// (such as following a link), use these two commands:
			//event.stopPropagation();
			//event.preventDefault();
		};
		function dodo_pr(event){
			if(VAR_script_enabled){
				self.flush(VAR_userid);
			}
		};
		document.getElementsByClassName('comment-button-post')[0].addEventListener('click', dodo, true);
		document.getElementsByClassName('comment-button-preview')[0].addEventListener('click', dodo_pr, true);
	};
	
	this.init(comment_ta,log_screen,mem);
};

var TrailrMemory=function(){
	var varname="MEM_";
	this.setOOI=function(nsid,name,code){
		code=alignOOI(code);
		GM_setValue(varname+"OOI_"+nsid,code);
		GM_setValue(varname+"NAME_"+nsid,name);
	};
	this.setOOS=function(nsid,name,code){
		GM_setValue(varname+"OOS_"+nsid,code);
	};
	this.setGname=function(nsid,name){
		m8l("setGname: "+nsid+","+name);
		GM_setValue(varname+"NAME_"+nsid,name);
	};
	this.getOOI=function(nsid){
		return GM_getValue(varname+"OOI_"+nsid,null);
	};
	this.getOOS=function(nsid){
		return GM_getValue(varname+"OOS_"+nsid,null);
	};
	this.getGname=function(nsid){
		return GM_getValue(varname+"NAME_"+nsid,null);
	};
}

var PanelAdmin=function(){
	this.panels=new Array();
	
	var root;
	var container;
	var styleon;
	var styleoff;
	var level_counter=65000;
	
	this.createPanel=function(name,code){
		m8l("inside createPanel");
		code+='<input id="'+name+'_virtual_init" type="button" style="visibility:collapse"/>';
		this.panels[name]=new Array();
		var elem=document.createElement('div');		
		elem.innerHTML=code;
		this.panels[name].id=level_counter;
		level_counter++;
		this.panels[name].elem=elem;
		this.panels[name].dyn_params="";
		this.hidePanel(name);
		container.appendChild(elem);
	};
	
	this.attachHandler=function(panel_name,object_id,event_name,handler,params){
		m8l("inside attachHandler");
		var self=this;
		if(!this.panels[panel_name]) return;
		//this.panels[panel_name].events[event_name]=new Array();
		//var h=self.panels[panel_name].events[event_name].handler=handler;
		var oi=document.getElementById(object_id);
		oi.addEventListener(event_name,function(e){
			handler(e,params,self.panels[panel_name].dyn_params);
		},false);
	};
	
	this.showPanel=function(panel_name,dyn_params){
		m8l("inside showPanel");
		this.panels[panel_name].dyn_params=dyn_params;
		this.panels[panel_name].elem.setAttribute("style",this.getStyleon(panel_name));
		getBID(panel_name+"_virtual_init").click();
	};
	
	this.hidePanel=function(panel_name){
		this.panels[panel_name].elem.setAttribute("style",this.getStyleoff(panel_name));
	};
	
	this.getStyleon=function(name){
		return styleon.replace('III',this.panels[name].id);
	};
	
	this.getStyleoff=function(panel_name){
		return styleoff;
	};
	
	root=document.createElement('div');
	var h=window.innerHeight;//document.body.scrollHeight;
	var w=window.innerWidth;//document.body.scrollWidth;
	styleon='position:fixed;top:0px;left:0px;width:'+w+';height:'+h+';z-index:III;background:url(http://farm4.static.flickr.com/3005/3100510766_0f3156d34e.jpg) no-repeat fixed bottom left white;opacity:0.99;visibility:visible';
	styleoff='visibility:hidden';
	root.setAttribute("style",styleoff);
	root.setAttribute("id","rootpanel");
	document.getElementById("comments").appendChild(root);
	
	var cl=10;
	var ct=100;
	container=document.createElement('div');
	var cstyle='min-width:400px;max-height:'+(window.innerHeight-ct*2)+'px;position:fixed;left:'+cl+'px;top:'+ct+'px;';
	container.setAttribute("style",cstyle);
	root.appendChild(container);
};

function test2Start(){	
	//find comment div object
	ca=document.getElementById('comments');
	if(!ca) return false;
	
	//find comment textarea
	if(getBID('message')!==null) return true;
	/*
	var goon=false;
	
	var comment_textareas = document.getElementsByTagName('textarea');
	for(var t=0;t<comment_textareas.length;t++){
		if(comment_textareas[t].name == 'message'){
			goon=true; break;
		}
	}
	* */
	
}

var Trailr = function() { this.init(); }

Trailr.prototype = {

	cc: null, //CommentControl(),
	
	mem: null, //TrailrMemory(),
	
	pad: null, //PanelAdmin(),
	
	//DOM object that contains all the comment related stuff 
	comment_area: null,
	
	//textarea where the user can type his personal message
	comment_textarea: null,
	
	user_username: "",
	
	getInviteSelectorCode: function(){
		var gl,agl;
		VAR_code=GM_getValue("OOI_saved_list","null");
		gl=GM_getValue("OOI_saved_gl",new Array());
		agl=GM_getValue("OOI_saved_agl",new Array());
		mgl=GM_getValue("OOI_saved_mgl",new Array());
		try{
			ooi_gl=eval(gl);
			ooi_agl=eval(agl);
			ooi_mgl=eval(mgl);
		}catch(e){
			return "null";
		}
		//m8l("VAR_code:"+VAR_code+" gl"+ooi_gl.toSource()+" agl"+ooi_agl.toSource());
		if(ooi_gl instanceof(Array) && ooi_gl instanceof(Array) && ooi_mgl instanceof(Array) && VAR_code!="null") return VAR_code;
		return "null";
	},
	
	///init point method
	init: function(){
		
		//debugClean();
		//this.getLatestVersion(UA_NEW_VERSION_CHECK_URL);
				
		//this.refreshVersion();
		
		safeCall(this.refreshVersion);
		
		m8l("on init");
		//things to do first of all because they fork and we need the results as soon as possible in main execution stream
		//var gl=getBID("a_group_loader");
		var gl=getBID("div_invite_loader");
		
		//var evt = document.createEvent("MouseEvents");
		//evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		//gl.dispatchEvent(evt);
		/*
		var fun=safeWrap(function(){
			gl.onclick();
		});
		if(gl) fun();
		m8l("ggll:"+gl.toSource());
		*/
		//setTimeout('', 500);
		//var h=document.getElementById("a_group_loader");
		//h.addEventListener("click",h.onclick,false);
		//h.click();
		this.getInviteSelectorCode();
		
		//identify comment area
		comment_area=document.getElementById('comments');
		if(comment_area==null) throw "tbl_comment_stuff not ready";
		
		//create a screen for log messages
		var screen=document.createElement('div');
		screen.setAttribute("style",style="\
			font-size:xx-small;\
			color: #333;\
			border: 1px solid #DDD;\
			margin-top:10px;\
			margin-left:32px;\
			padding: 5px;\
			width: 516px;\
			height: 100px;\
			overflow: auto;\
		");
		screen.setAttribute('id','screen');
		documentInsertElement(screen,comment_area,AFTER);
		
		//identify comment textarea:
		/*
		var comment_textareas = document.getElementsByTagName('textarea');
		for(var t=0;t<comment_textareas.length;t++){
			if(comment_textareas[t].name == 'message'){
				comment_textarea = comment_textareas[t]; break;
			}
		}
		*/
		comment_textarea=getBID('message');
		
		mem=new TrailrMemory();
		
		cc=new CommentControl(comment_textarea,screen,mem);
		
		cc.logger.logGeneric('<span style="color:gray;font-size:xx-small;"> T-version: '+SCRIPT.version_uf+'</span>');
		
		//when AP is completed, this line will enable it
		//this.compileAdminPanel();
		pad=new PanelAdmin();
		this.createPanels();
		
		
		//retrieve logo image
		//var logo_url=this.getLogo(TLR_STD_LOGO_URL);
		
		TLR_STUFF_OPEN=OPT_FIRST_SEPARATION_BAR+TLR_ID;//'\n<img src="'+logo_url+'" title="'+TLR_LOGO_ID_TEXT+'"/>'+TLR_ID;
		
		if(!TLR_ID_FINDER.exec(comment_textarea.value)){ //we don't come from comment preview
			safeBindCall(this,this.checkUpdate);			
			this.startFRC();
		}
		
		this.user_username=this.getUsername();
		if(this.user_username!="") this.startOOI();
		
		opinion_lnk='<span id="trailr_opinion_lnk" style="color:#3886E6; cursor:pointer;">We need your opinion</span>';
		group_lnk='<span id="trailr_group_lnk" onclick="window.open(\'http://www.flickr.com/groups/869738@N24/\');" style="color:#3886E6; cursor:pointer;">Trailr group</span>';
		var mm=document.createElement("div");
		mm.setAttribute('id','link-div');
		mm.setAttribute('style','margin-left:32px');
		mm.innerHTML='<span style="color:lightgray; font-size:x-small;float:left;margin-left:0em;" onclick=";">'+group_lnk+' | '+opinion_lnk+'</span>';
		showFeedbackDialog=function(){
			pad.showPanel("fdbk");
			//pad.showPanel("opt");
		};
		documentInsertElement(mm,document.getElementById('screen'),AFTER);
		document.getElementById('trailr_opinion_lnk').addEventListener("click",showFeedbackDialog,false);
		
		//disable the script if the page is of a photo owned by the user 
		if(this.getPageOwner()==this.getUserid()){
			VAR_script_enabled=false;
			cc.logger.clear();
			cc.logger.logGeneric('<span style="color:blue">Trailr is in <i>sleeping mode</i>: you are commenting on a photo of yours</span>');
		}

	},
	
	getPageOwner: function(){
		nsid_el = document.getElementsByClassName('flickr-user')[0];
		return nsid_el.getAttribute('nsid');
	},
	
	getUserid: function(){
		ulmenu = document.getElementById('candy_nav_menu_search');
		a = ulmenu.getElementsByTagName('a')[3];
		url = a.getAttribute('href');
		regex = /\=([\d\@N]+)\&/;
		results = url.match(regex);
		return results[1];
		//return unsafeWindow.global_nsid;
	},
	
	getUsername: function(){
		cont_div = document.getElementById('head-status');
		var alink = cont_div.getElementsByTagName('a')[0];
		ulmenu = document.getElementById('candy_nav_menu_search');
		a = ulmenu.getElementsByTagName('a')[3];
		url = a.getAttribute('href');
		regex = /\=([\d\@N]+)\&/;
		results = url.match(regex);
		VAR_userid=results[1];
		return alink.innerHTML;
	},
	
	///PANELS:
	
	createPanels: function(){
		var self=this;
		///COMMON:
		var cancel=function(e,params,dyn){
			var panel=params;
			pad.hidePanel(panel);
		};
		
		///ManualOOX panel:
		moo_code='<div style="margin-top:5em">\
				<div style="float:left;margin-left:3em">\
					<br/><label>Invite Code:<br/><textarea id="mooi" style="height:10em;width:15em"></textarea></label>\
					<br/><label>Comment Code:<br/><textarea id="moos" style="height:10em;width:15em"></textarea></label>\
					<br/><input type="button" id="ooc_save" value="save"/><input style="margin-left:3em" type="button" id="ooc_cancel" value="cancel"/>\
				</div><div style="float:left;margin-left:1em"><div style="float:left">\
					<div style="margin-bottom:1em; width:15em" id="moo_group_name">Group name</div>\
					<div style="background:white;max-width:654px;max-height:25em;border:white 1px solid;overflow:scroll" id="moo_group_descr">&nbsp;</div>\
				</div></div>\
				</div>';
				
		var saveMOO=function(e,params,dyn){
			//var self=params;
			var gid=dyn[0];
			var name=dyn[1];
			var desc=dyn[2];
			var trigger=dyn[3];
			
			var mooi=getBID('mooi').value;
			var moos=getBID('moos').value;
			if(mooi) mem.setOOI(gid,name,mooi);
			if(moos) mem.setOOS(gid,name,moos);
			if(trigger=="ooi"){
				cc.removeInvitation(gid);
				
				var iid="per_"+gid+"_"+getInc();
				if(isVoid(mooi)) cc.addStandardInvitation(gid,mem.getGname(gid),'<span style="cursor:pointer;color:gray;" id="'+iid+'"> [!]customize invite</span>');
				else cc.addInvitation(gid,mem.getGname(gid),OOI_CUSTOM_INVITE_HEADER+mem.getOOI(gid)+OOI_CUSTOM_INVITE_FOOTER,'<span style="cursor:pointer;color:gray;" id="'+iid+'"> [!]customize invite</span>');
				var sp=getBID(iid);
				sp.addEventListener('click',function(){
					self.showManualCostomizationDialog(gid,name,desc);
				},false);
			}else{
				if(!isVoid(moos)) cc.addOOS(mem.getOOS(gid));
			}
			pad.hidePanel("moo");
		};
		
		var showMOODescr=function(e,params,dyn){
			m8l("inside showMOODescr");
			var gid=dyn[0];
			var name=dyn[1];
			var desc=dyn[2];
			//var trigger=dyn[3];
			
			var mooi=mem.getOOI(gid);
			var moos=mem.getOOS(gid);
			
			m8l("mooi:"+mooi);
			m8l("moos:"+moos);
			
			getBID('mooi').value=mooi!==undefined?mooi:"";
			getBID('moos').value=moos!==undefined?moos:"";
			
			desc=desc.replace(/\n/g,'<br/>');
			
			getBID('moo_group_descr').innerHTML=desc;
			getBID('moo_group_name').innerHTML='<b>'+name+'</b> group description:';
		};
		
		pad.createPanel("moo",moo_code);
		pad.attachHandler("moo","moo_virtual_init","click",showMOODescr);
		pad.attachHandler("moo","ooc_save","click",saveMOO);
		pad.attachHandler("moo","ooc_cancel","click",cancel,"moo");
		
		
		///Feedback panel:
		fdbk_code='<div style="width:max;">\
				<div style="float:left;max-width:60em;margin-left:3em">\
					<p>Please teel us what you think about Trailr especially what you don\'t like of it. \
					We really need your feedback.</p><p> Thanks in advance.</p>\
					<p style="width:20em">P.S.: if you have questions or suggestions, please, consider to open a topic on <a target="#" href="http://www.flickr.com/groups/869738@N24/">Trailr St(u|a)ff group</a>. What you are about to write could be useful for others.</p>\
					<div>Feedback:</div>\
					<textarea id="fdbk_text" style="height:15em"></textarea>\
					<br/><label><input type="checkbox" id="fdbk_privacy" name="fdbk_privacy" value="paranoic"/>You can publish this feedback (recommended)</label>\
					<br/><input type="button" id="fdbk_send" value="send feedback"/>\
					<input style="margin-left:3em" type="button" id="fdbk_cancel" value="cancel"/>\
				</div>\
				</div>';
				
		var sendFeedback=function(e,params,dyn){
			var f=getBID('fdbk_text').value;
			var p=getBID('fdbk_privacy').checked;
			var subj;
			if(p){
				subj="trailr feedback - suitable for publication (v."+SCRIPT.version_uf+")";
			}else{
				subj="trailr feedback - NOT suitable for publication (v."+SCRIPT.version_uf+")";
			}
			this.sendMail(FDBK_TRAILR_CONTACT,subj,f);
				
			pad.hidePanel("fdbk");
		};
		
		pad.createPanel("fdbk",fdbk_code);
		pad.attachHandler("fdbk","fdbk_send","click",bind(this,sendFeedback));
		pad.attachHandler("fdbk","fdbk_cancel","click",cancel,"fdbk");
		
		///Options panel:
		opt_code='<div style="margin-top:5em">\
				<div style="float:left;margin-left:3em;max-width:50em;">\
					<form name="opt_form">\
					<FIELDSET>\
						<LEGEND>Info collecting</LEGEND>\
						<P>Please select as many options as you like to help Trailr spreading and feature effectiveness</P>\
						<P>\
						  <LABEL>\
							<INPUT TYPE="checkbox" NAME="opt_statistics">\
							<span>I enable Trailr to retrieve anonymous statistics of Trailr usage</span>\
						  </LABEL>\
						  <a href="url.com" target="#">more info</a>\
						</P>\
					  </FIELDSET>\
					  <fieldset><legend>Separation bar</legend>\
							<label><input type="radio" name="opt_sepbar" value="graphic01"/> <img src="http://farm4.static.flickr.com/3116/3254727922_9843fa8536_o.gif" /> </label><br/>\
							<label><input type="radio" name="opt_sepbar" value="text01"/>--</label>\
					  </fieldset>\
					  <br/><input type="button" id="opt_save" value="save"/><input style="margin-left:3em" type="button" id="opt_cancel" value="cancel"/>\
				</div><div style="float:left;margin-left:1em"><div style="float:left">\
					<div style="margin-bottom:1em; width:15em" id="moo_group_name">Group name</div>\
					<div style="max-width:654px;max-height:25em;border:white 1px solid;overflow:scroll" id="moo_group_descr">&nbsp;</div>\
				</div>\
				</form></div>\
				</div>';
				
		var saveOPT=function(e,params,dyn){
			//var self=params;
			var gid=dyn[0];
			var name=dyn[1];
			var desc=dyn[2];
			var trigger=dyn[3];
			
			var mooi=getBID('mooi').value;
			var moos=getBID('moos').value;
			if(mooi) mem.setOOI(gid,name,mooi);
			if(moos) mem.setOOS(gid,name,moos);
			if(trigger=="ooi"){
				cc.removeInvitation(gid);
				
				var iid="per_"+gid+"_"+getInc();
				if(isVoid(mooi)) cc.addStandardInvitation(gid,mem.getGname(gid),'<span style="cursor:pointer;color:gray;" id="'+iid+'"> [!]customize </span>');
				else cc.addInvitation(gid,mem.getGname(gid),OOI_CUSTOM_INVITE_HEADER+mem.getOOI(gid)+OOI_CUSTOM_INVITE_FOOTER,'<span style="cursor:pointer;color:gray;" id="'+iid+'"> [!]customize </span>');
				var sp=getBID(iid);
				sp.addEventListener('click',function(){
					self.showManualCostomizationDialog(gid,name,desc);
				},false);
			}else{
				if(!isVoid(moos)) cc.addOOS(mem.getOOS(gid));
			}
			pad.hidePanel("moo");
		};
		
		var showOPT=function(e,params,dyn){
			m8l("inside showOPT");
			//var gid=dyn[0];
			//var name=dyn[1];
			//var desc=dyn[2];
			//var trigger=dyn[3];
			
			var sb=document.opt_form;
			sb.opt_sepbar[1].checked=true;
			
			/*
			 * var fruit = new Array('Apples', 'Oranges', 'Bananas', 'Kiwis', 'Saskatoons', 'Grapes');
				var selection = document.quiz.colour;

				for (i=0; i<selection.length; i++)

				  if (selection[i].checked == true)
				  alert(fruit[i] + ' are ' + selection[i].value + '.')

				}
			* */
		};
		
		pad.createPanel("opt",opt_code);
		pad.attachHandler("opt","opt_virtual_init","click",showOPT);
		pad.attachHandler("opt","opt_save","click",saveOPT);
		pad.attachHandler("opt","opt_cancel","click",cancel,"opt");
		
		//pad.showPanel("opt",[1,1,1,1])
		
		///another panel code here
	},
	
	apiCall: function(apimethod, params , callback) {
		var self = this;
		var argstring = '';
		var key = '0504e3d4f6701b8a9eb5576137cc859b';
		var callbackstring = apimethod.replace(/\./g,'_');
		callbackstring += '_onLoad';
		for (var arg in params) {
			argstring += '&'+arg+'='+params[arg];
		}
		GM_xmlhttpRequest({
			method:"GET",
			url:'http://api.flickr.com/services/rest/?method='+apimethod+argstring+'&api_key='+key,
			onload:function (response) {
				var doc=(new DOMParser).parseFromString(response.responseText, "text/xml");
				status_elem = doc.getElementsByTagName('rsp')[0];
				status = status_elem.getAttribute('stat') == 'ok'? 1 : 0;
				callback[callbackstring](status,doc,response.responseText,null);
			}
		});
	},

	showManualCostomizationDialog: function(gid,name,desc,by){
		var self=this;
		if(by===undefined) by="ooi";
		if(desc==null){
			//get description
			var listener = {
				flickr_groups_getInfo_onLoad: function(success, responseXML, responseText, params){
					if(success){
						name=responseXML.getElementsByTagName('name')[0].lastChild.nodeValue;
						desc=responseXML.getElementsByTagName('description');
						desc=desc[0].textContent;
					}else{
						alert("group description retrieving failure");
						desc=" ";
					}
					var dodo=safeWrap(function(){pad.showPanel("moo",[gid,name,desc,by]);});
					dodo();
				}
			};
			self.apiCall('flickr.groups.getInfo', {
				group_id:gid
			}, listener);
		}else pad.showPanel("moo",[gid,name,desc,by]);
	},
	
	sendSpot: function(){
		//we need magic_cookie:
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://flickr.com/messages_write.gne",
			headers:{
				"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
				"Accept":"application/xhtml+xml"
			},
			onload:function(response){
				var doc=(new DOMParser).parseFromString(response.responseText, "text/html");
				var nodes=doc.getElementsByTagName('input');
				
				var magic_cookie="";
				for(var i=0;i<nodes.length;i++){
					if(!(nodes[i].hasAttribute("name")&&nodes[i].getAttribute("name")=="magic_cookie")) continue;
					magic_cookie=nodes[i].getAttribute("value");
					break;
				}
				if(magic_cookie==""){
					m8l("exception: no magic cookie found, we cannot send email");
					return;
				}
				//magic cookie found, now we search for an administrator:
				// administrator list page url: http://www.flickr.com/groups_members_detail.gne?id=317173@N25&tab=default
				//estract a random user then search for his/her id:
				/*
 				    var self=this;
					var user=this.user_username;
					var listener = {
						//1. retrieve user ID
						flickr_people_findByUsername_onLoad: function(success, responseXML, responseText, params){
							if(success) {
								var user=responseXML.getElementsByTagName('user');
								VAR_userid=user[0].getAttribute("nsid");
								m8l("user id="+VAR_userid);
								var doIt=safeWrap(function(){
									self.retrieveUserGroupList(VAR_userid);
								});
								doIt();					
							}
						}
					};
					
					unsafeWindow.F.API.callMethod('flickr.people.findByUsername', {
						username:user
					}, listener);
				*/
				//then send the flickr mail:
				//sendMail(magic_cookie,
				//TODO: fare una classe Mailer
		}})
	},
	
	searchForAdministrator: function(gid){
		
	},
					
	sendMail: function(dest,subj,mess,magic){
		var email=new Array();
			email.magic_cookie=magic;
			email.to_nsid=dest;
			email.subject=subj;
			email.message=mess;
			email.reply="";
			email.done="1";	
		
		function doSend(email){
			var pstr="";//="uid="+userid+"&url="+escape(document.location);
			for(k in email){
				pstr+="&"+k+"="+escape(email[k]);
			}
			m8l("pstr:"+pstr);
			GM_xmlhttpRequest({
				method:"POST",
				url:"http://flickr.com/messages_write.gne",
				headers:{
					"User-Agent":"Mozilla/5.0",
					"Content-type":"application/x-www-form-urlencoded"
				},
				data:pstr,
				onload:function(response){
					m8l('email sent:'+pstr);
				}
			});
		}		
		if(magic===undefined){
			m8l("magic===undefined");
			//we need magic_cookie:
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://flickr.com/messages_write.gne",
				headers:{
					"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
					"Accept":"application/xhtml+xml"
				},
				onload:function(response){
					var r=/<input[^>]*magic_cookie[^>]*value="([^"]*)?"[^>]*>/i.exec(response.responseText);
					if(!r||!r[1]){
						m8l("exception: magic cookie input field not found we cannot send email");
						return;
					}
					email.magic_cookie=r[1];
					doSend(email);
				}
			});
		}else doSend(email);
		
	},
	
	///OOS feature related methods:
	
	retrieveGroupSignature: function(group_id){
		m8l("inside retrieveGroupSignature");
		if(!VAR_oos_enabled) return;
		var self=this;
		var dogetoos=safeWrap(function(){ 
			oos=mem.getOOS(group_id); 
			m8l("oos:"+oos);
			if(isVoid(oos)) self.parseGroupPageAndSign(group_id, self);
			else self.insertSign(oos,group_id);
		});dogetoos();
	},
	
	parseGroupPageAndSign: function(gid,self){ 
		m8l("inside parseGroupPageAndSign");
		var self = this;
		var oos;
		var also_saved=false;
		var saved_oos;
		var wait_spot;
		
		var listener = {
			flickr_groups_getInfo_onLoad: function(success, responseXML, responseText, params){
				m8l("inside flickr_groups_getInfo_onLoad");
				if(success){
					var txt=responseXML.getElementsByTagName('description')[0].lastChild.nodeValue;
					var name=responseXML.getElementsByTagName('name')[0].lastChild.nodeValue;
					var snip;
					if(snip=self.trailrChecking(gid,name,txt,"oos")){
						self.insertSign(snip,gid);
					}else{
						if(also_saved){
							safeBindCall(self,self.insertSign,saved_oos,gid);						
							Waiter.hideWait(wait_spot);
							return;
						}
						self.enableCustomizationByOOS(gid);
					}
				}
				Waiter.hideWait(wait_spot);
			}
		};
		
		saved_oos=oos=mem.getOOS(gid);
		if(!isVoid(oos)) also_saved=true;
		
		var r=GM_getValue("MEM_LR_"+gid,-1);
		if(r!=-1) r=eval(r);
		if(r instanceof Date){
			var dl=new Date();
			dl.setDate(dl.getDate()-REFRESH_INTERVAL);
			m8l("r:"+r.toUTCString()+",dl:"+dl.toUTCString());
			if(r<dl){ m8l("REFRESH scheduled."); oos=null;	}
		}else{
			m8l("REFRESH scheduled.");
			oos=null;
		}
		
		m8l("oos:"+oos);
		if(isVoid(oos)){ 
			wait_spot=Waiter.showWait(cc.logger.screen,"trailr is checking group info...",AT_BEGINNING);
			self.apiCall('flickr.groups.getInfo', {
				group_id:gid
				}, listener);
			GM_setValue("MEM_LR_"+gid,(new Date()).toSource());
		}else{
			this.insertSign(oos,gid);
		}
	},
	
	insertSign: function(sign,gid){
		var self=this;
		m8l("inside insertSign:"+sign);
		cc.addOOS(OOS_HEADER+sign+OOS_FOOTER);
		self.enableCustomizationByOOS(gid);
	},
	
	enableCustomizationByOOS: function(gid){
		var self=this;
		var sp=getBID("oos_customize");
		sp.innerHTML=" [!]customize award";
		sp.addEventListener('click',bind(self,function(){
			self.showManualCostomizationDialog(gid,mem.getGname(gid),null,"oos");
		}),false);
	},
	
	trailrChecking: function(gid,name,descr,cause){
		var ooi_ok=false,oos_ok=false;
		var res;
		
		res=OOI_REGEX.exec(descr);
		if(res&&res[0]&&res[1].length<OOI_MAX_LENGTH){
			ooi_ok=res[1];
			var dodo1=safeWrap(function(){
				mem.setOOI(gid,name,ooi_ok);
			});
			dodo1();
			ooi_ok=res[1];
		}
		
		res=OOS_REGEX.exec(descr);
		if(res&&res[0]){
			oos_ok=res[1];
			var dodo2=safeWrap(function(){
				mem.setOOS(gid,name,oos_ok);
			});
			dodo2();
		}
		
		if(cause=="ooi"){
			return ooi_ok;
		}else{
			return oos_ok;
		}
		
	},
	
	///OOI feature related fields and methods:
	ooi_invite_selector:0,
	
	ooi_gl:null,
	ooi_agl:null,
	ooi_map:null,
	
	///compare two group names to order according to these rules:
	/// 1) first the already trailrized groups then the others - but not by default
	/// 2) alphabetic order 
	compareGroupName: function(a,b){ 
		var an=a.name.toUpperCase(),bn=b.name.toUpperCase();
		var a_tzd=isVoid(mem.getOOI(a.id)),b_tzd=isVoid(mem.getOOI(b.id));
		//return a_tzd>b_tzd ? 1 : a_tzd<b_tzd ? -1 : (an>bn ? 1 : an<bn ? -1 : 0); 
		return an>bn ? 1 : an<bn ? -1 : 0; 
	},
	
	optID:function(gid){
		return "OPT_"+gid;
	},
	
	// 2. compile invite selector
	compileInviteSelectorCode: function(group_list,group_admin_list,group_mod_list){
		var self=this;
		var select_code="";
		
		ooi_gl=group_list;
		ooi_agl=group_admin_list;
		ooi_mgl=group_mod_list;
		
		m8l("ggll:"+group_list.toSource());
	
		//sort groups by alphabetical order:
		group_list.sort(this.compareGroupName);
		group_admin_list.sort(this.compareGroupName);
		group_mod_list.sort(this.compareGroupName);
		
		select_code='<option value="0"></option> <optgroup label="admin groups:"> ';
		for(i=0;i<group_admin_list.length;i++){
			select_code += '<option id="'+this.optID(group_admin_list[i].id)+'" value="'+group_admin_list[i].id+'">'+group_admin_list[i].name+'</option>';
		}
		select_code+='</optgroup> <optgroup label="mod groups:">';
		for(i=0;i<group_mod_list.length;i++){
			select_code += '<option id="'+this.optID(group_mod_list[i].id)+'" value="'+group_mod_list[i].id+'">'+group_mod_list[i].name+'</option>';
		}		
		select_code+='</optgroup> <optgroup label="other groups:">';
		for(i=0;i<group_list.length;i++){
			select_code += '<option id="'+this.optID(group_list[i].id)+'" value="'+group_list[i].id+'">'+group_list[i].name+'</option>';
		}
		select_code+='</optgroup>';
		//select_code+='<option value="-1" style="color:red;">---&gt;Refresh group list!&lt;---</option>';
		
		m8l("sc:"+select_code);
		return select_code;
	},
	
	rearrangeSelector: function(groups){
		var i=0;
		for(;i<groups.length;i++){
			ge=getBID(this.optID(groups[i].id));
			
			if(getBID("contextLink_pool"+groups[i].id)){ //se già invitato
				ge.setAttribute("disabled","disabled");
			}else if(isVoid(mem.getOOI(groups[i].id))){ //se non ancora trailrizzato
				//ge.style.color="rgb(30,30,65)";
			}else{
				ge.style.color="#3a87e6";
			}
		}
	},
	
	setSelector: function(inner){
		var self=this;
		var invdiv = document.createElement('div');
		invdiv.setAttribute('id','invite-div');
		invdiv.setAttribute('style','margin-left:32px');
		var ois=document.createElement('SELECT');
		ois.addEventListener('change', function (e) {
			self.invite(e);},
			false);
	
		ois.innerHTML=inner;
		this.ooi_invite_selector=ois;
		//documentInsertElement(ois,comment_textarea,AFTER);
		documentInsertElement(ois,invdiv,AT_END);		
		documentInsertElement(invdiv,document.getElementById('screen'),BEFORE);				
		documentInsertElement(document.createElement('br'),ois,BEFORE);
		documentInsertElement(document.createTextNode('Trailr Invite:'),ois,BEFORE);
		var refresh=document.createElement("span");
		refresh.innerHTML='<span style="font-size:xx-small;"><a href="http://flickr.com/groups" style="color:gray;">refresh group list</a></span>';
		documentInsertElement(refresh,ois,BEFORE);
		documentInsertElement(document.createElement('br'),ois,BEFORE);
		
		all_groups=ooi_gl.concat(ooi_agl,ooi_mgl);
		self.rearrangeSelector(all_groups);
		
		var i;
		ooi_map=new Array();
		for(i=0;i<all_groups.length;i++){
			ooi_map[all_groups[i].id]=all_groups[i];
		}
		
	},
	
	retrieveUserGroupList: function(user){
		var self = this;
		var wait_spot;
		var listener = {
			// 1. retrieve user group list
			flickr_people_getPublicGroups_onLoad: function(success, responseXML, responseText, params){
				m8l("gruppi sottoscritti:"+responseText);
				if(success){
					var groups = responseXML.getElementsByTagName('group');
					var nsid;
					var admin,name;
					var lr;
					group_list=new Array();
					group_admin_list=new Array();
					group_mod_list=new Array();
					for(var i=0;i<groups.length;i++){
						nsid=groups[i].getAttribute("nsid");
						admin=groups[i].getAttribute("admin");
						name=groups[i].getAttribute("name");
						lr=-1;
						if(admin=="1"){
							group_admin_list.push({id:nsid, name:name, refresh:lr});
						}else{
							group_list.push({id:nsid, name:name, refresh:lr});
						}
					}
					//TODO: insert code here for issue 
					VAR_code=self.compileInviteSelectorCode(group_list,group_admin_list,group_mod_list);
					////m8l("selectori code:"+VAR_code);
					var setCode=safeWrap(function(){
						GM_setValue("OOI_saved_list",VAR_code);
						GM_setValue("OOI_saved_gl",group_list.toSource());
						GM_setValue("OOI_saved_agl",group_admin_list.toSource());
						GM_setValue("OOI_saved_mgl",group_mod_list.toSource());
						m8l("gl.toSource:"+group_list.toSource()+ " OOI_saved_gl:"+GM_getValue("OOI_saved_gl","null"));
						self.getInviteSelectorCode(); //this call is to update ooi_gl,ooi_agl
					});
					setCode();
					self.setSelector(VAR_code);
				}
				Waiter.hideWait(wait_spot);
			}
		};
		
		
		m8l("code value"+VAR_code);
		if(VAR_code=="null"){
			wait_spot=Waiter.showWait(comment_area);
			self.apiCall('flickr.people.getPublicGroups', {
				user_id:user
			}, listener);
		}else if(VAR_code=="compute"){
			var compute=safeWrap(function(){
				ooi_gl=eval(GM_getValue("OOI_saved_gl","{}"));
				ooi_agl=eval(GM_getValue("OOI_saved_agl","{}"));
				ooi_mgl=eval(GM_getValue("OOI_saved_mgl","{}"));
				VAR_code=self.compileInviteSelectorCode(ooi_gl,ooi_agl,ooi_mgl);
				GM_setValue("OOI_saved_list",VAR_code);
				self.setSelector(VAR_code);
			});compute();
		}else{
			self.setSelector(VAR_code);
		}
	},
	
	
	startOOI: function(){
	//start all OOI steps:
	// 1. retrieve user group list
	// 2. compile invite selector
		this.retrieveUserGroupList(VAR_userid);
	},
	
	addSavedInvitation: function(gid,ooi){
		var iid="per_"+gid+"_"+getInc();
		cc.addInvitation(gid,mem.getGname(gid),OOI_CUSTOM_INVITE_HEADER+ooi+OOI_CUSTOM_INVITE_FOOTER,'<span style="cursor:pointer;color:gray;" id="'+iid+'"> [!]customize invite</span>');
		var sp=getBID(iid);
		var self=this;
		sp.addEventListener('click',function(){
			self.showManualCostomizationDialog(gid,name,null);
		},false);
	},
	
	invite: function(event){ 
		var self = this;
		var ooi;
		var gid=event.target.value;
		m8l("admin:"+event.target.getAttribute("admin"));
		var admin=event.target.getAttribute("admin")=="1";
		var wait_spot;
		var also_saved=false;
		var saved_ooi;
		
		//search for TLR-OOI tag
		var listener = {
			flickr_groups_getInfo_onLoad: function(success, responseXML, responseText, params){
				if(success){
					try{
					var name=responseXML.getElementsByTagName('name')[0].lastChild.nodeValue;
					var desc=responseXML.getElementsByTagName('description');
					if(!desc||!(desc[0].lastChild)){
						//no description
						if(also_saved){
							safeBindCall(self,self.addSavedInvitation,gid,saved_ooi);						
							Waiter.hideWait(wait_spot);
							return;
						}
						cc.addStandardInvitation(gid,name,"");
						return;
					}
					var txt=desc[0].lastChild.nodeValue;
					var snip;
					m8l("description:\n"+txt);
					snip=self.trailrChecking(gid,name,txt,"ooi");
					m8l("snip:"+snip);
					if(snip){
						//trailrized group
						sv=safeWrap(function(){m8l("ooi_saved:"+mem.getOOI(gid));});sv();
						
						var iid="per_"+gid+"_"+getInc();
						cc.addInvitation(gid,name,OOI_CUSTOM_INVITE_HEADER+snip+OOI_CUSTOM_INVITE_FOOTER,'<span style="cursor:pointer;color:gray;" id="'+iid+'"> [!]customize invite</span>');
						var sp=getBID(iid);
						sp.addEventListener('click',function(){
							self.showManualCostomizationDialog(gid,name,txt);
						},false);
					}else{
						if(also_saved){
							safeBindCall(self,self.addSavedInvitation,gid,saved_ooi);
							Waiter.hideWait(wait_spot);
							return;
						}

						m8l("standrd invite calling");
						var res=OOI_IO_WORDS.exec(name);
						if(res&&res[0]){
							//it might be an "invite only" group 
							var iid="per_"+gid+"_"+getInc();
							cc.addIOInvitation(gid,name,'<span style="cursor:pointer;color:blue;" id="'+iid+'"> [!]customize invite</span>');
							var sp=document.getElementById(iid);
							sp.addEventListener('click',function(){
								self.showManualCostomizationDialog(gid,name,txt);
							},false);
						}else{
							var iid="per_"+gid+"_"+getInc();
							cc.addStandardInvitation(gid,name,'<span style="cursor:pointer;color:blue;" id="'+iid+'"> [!]customize invite</span>');
							var sp=document.getElementById(iid);
							sp.addEventListener('click',function(){
								self.showManualCostomizationDialog(gid,name,txt);
							},false);
						}
					}
					}catch(e){};
				}
				Waiter.hideWait(wait_spot);
			}
		};
		
		saved_ooi=ooi=mem.getOOI(gid);
		if(!isVoid(ooi)) also_saved=true;
		
		var r=GM_getValue("MEM_LR_"+gid,-1);
		if(r!=-1) r=eval(r);
		if(r instanceof Date){
			var dl=new Date();
			dl.setDate(dl.getDate()-REFRESH_INTERVAL);
			m8l("r:"+r.toUTCString()+",dl:"+dl.toUTCString());
			if(r<dl){ ooi=null;	}
		}else ooi=null;
		
		m8l("ooi:"+ooi);
		if(isVoid(ooi)){ 
			wait_spot=Waiter.showWait(cc.logger.screen,"trailr is checking group info...",AT_BEGINNING);
			self.apiCall('flickr.groups.getInfo', {
				group_id:gid
			}, listener);
			GM_setValue("MEM_LR_"+gid,(new Date()).toSource());
		}else{
			this.addSavedInvitation(gid,ooi);
		}
		//check if the group is administered by the user
		for(var i=0;i<ooi_agl.length;i++){
			if(ooi_agl[i].id==gid||ooi_mgl[i].id==gid){
				self.flashInvite(gid);
				break;
			}
		}

	},
	
	
	
	flashInvite: function(gid){
		var self = this;
		
		//check if no pending invitation is present, otherwhise the entire comment would be lost:		
		/*
		var found=false;
		var cn=getBID('slct_invite_to_group').childNodes;
		//m8l("cn:    "+cn.toSource());
		for(var i=0;i<cn.length;i++){
			if(cn.value==gid){
				found=true;
				break;
			}
		}
		if(!found){
			cc.removeInvitation(gid);
			cc.logger.logWarning("WARNING: invite pending or already invited photo. Your invitation has been ignored.");
			return; //you can't invite this ohoto because someone have already done it.
		}
		*/
		if(!OPT_FLASH_INVITE) return;
		//insert the flash invite:		
		var gname=self.ooi_invite_selector.options[self.ooi_invite_selector.selectedIndex].text;
		var html='<input id="hdn_group_invite" type="hidden" value="'+gid+'" name="group_invite"/>\
		<input id="hdn_group_old_nsid" type="hidden" value="'+gid+'" name="hdn_group_old_nsid"/>\
		<input id="hdn_group_old_title" type="hidden" value="'+gname+'" name="hdn_group_old_title"/>\
		<textarea id="hdn_group_details" name="group_details" style="display: none;"/>';
		var element=document.createElement('span');
		element.innerHTML=html;
		comment_area.parentNode.insertBefore(element,comment_area.nextSibling);
	},

	
	///UA feature methods
	
	getLatestBulletin: function(version_check_url,hand){ 
		var self=hand;
		GM_xmlhttpRequest({
			method:"GET",
			url:version_check_url,
			headers:{
				"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
				"Accept":"application/xhtml+xml",
				"Cache-Control":"no-cache"
			},
			onload:function(response){
				var doc=(new DOMParser).parseFromString(response.responseText, "text/xml");
				var nodes=doc.getElementsByTagName('bulletin');
				
				for(var i=0;i<nodes.length;i++){
					if(!(nodes[i].hasAttribute("number"))) continue;
					var bnum=nodes[i].getAttribute("number");
					var text=nodes[i].lastChild.nodeValue;
					m8l('info:'+text);
					var lat=GM_getValue("RM_latest_bulletin",SCRIPT.version);
					if(!isVoid(text)&&bnum>lat){
						self.showBulletin(text);
						GM_setValue("RM_latest_bulletin",parseInt(bnum));
					}
				}
				
			}})
	},

	checkUpdate: function(){
	//check for new script version only once a day and never again if an email has been sent already
		var self=this;
		var date=new Date();
		var today=date.getDate();//get the Day number within the month
		today=""+today;
		var last_version_check=GM_getValue("RM_latest_check", "null");
		m8l("today:"+today+" last_version_check:"+last_version_check);
		if(last_version_check!=today){
			m8l("checking for new version available");
			GM_setValue("RM_latest_check",today);
			var self=this;
			var doRetrieve=safeWrap(function(){ self.getLatestBulletin(UA_NEW_VERSION_CHECK_URL,self); });
			doRetrieve();
			//sostituire con safeBindCall
		}
	},
	
	showBulletin: function(bulletin){
		var self=this;
		bulletin=bulletin.replace(/USERNAME/g,self.getUsername());
		bulletin=bulletin.replace(/PREVERURL/g,SCRIPT['prevurl']);
		self.sendMail(self.getUserid(),"Trailr update info",bulletin);
		cc.logger.logGeneric('<span style="color:red;font-size:small">you have mail</span>');
	},
	
	refreshVersion:function(){
		var prev=GM_getValue("UA_previous_version",'0');
		if(parseInt(prev)<SCRIPT['version']){
			resetSavedData(cc.logger);
			GM_setValue("UA_previous_version",SCRIPT['version']);
		}
	},
	
	///THEME feature methods
	
	getLatestLogo: function(lg_check_url){ 
		var self=this;
		GM_xmlhttpRequest({
			method:"GET",
			url:lg_check_url,
			headers:{
				"User-Agent":"Mozilla/5.0",
				"Accept":"application/xhtml+xml"
			},
			onload:function(response){
				var doc=(new DOMParser).parseFromString(response.responseText, "text/xml");
				var nodes=doc.getElementsByTagName('logo');
				
				for(var i=0;i<nodes.length;i++){
					if(!(nodes[i].hasAttribute("type")&&nodes[i].hasAttribute("url"))) continue;
					var lg_type=nodes[i].getAttribute("type");
					var lg_url=nodes[i].getAttribute("url");
					if(lg_type=="bar"){
						GM_setValue("LG_latest_logo_available",lg_url);
					}
				}
			}})
	},

	getLogo: function(current_logo){
	//check for new script version only once a day:
		var self=this;
		var date=new Date();
		var month=date.getMonth();//get the month number within the year
		var last_logo_check=GM_getValue("LG_latest_logo_checking_on", "null");
		m8l("this month:"+month+" last_logo_check:"+last_logo_check);
		if(last_logo_check!=month){
			m8l("checking for new logo available");
			GM_setValue("LG_latest_logo_checking_on",month);
			var self=this;
			var doRetrieve=safeWrap(function(){ self.getLatestLogo(THEME_INFO_URL,self); });
			doRetrieve();
		}
		//because of race condition issue, the actual ultimate logo url could be returned the next time you call getLogo    
		return GM_getValue("LG_latest_logo_available",current_logo);
	},
	
	///FRC feature related methods
	
	insertComment: function(comment, url) {
		var html = comment;
		if(url)	html = '<a href="'+url+'"><i>'+comment+'</i></a>';
		html = FRC_HEADER+''+html+" "+FRC_FOOTER;	
		
		m8l("html:"+html);	

		cc.addSeenOn(html);
		
	},

	apiCall: function(apimethod, params , callback) {
		var self = this;
		var argstring = '';
		var key = '0504e3d4f6701b8a9eb5576137cc859b';
		var callbackstring = apimethod.replace(/\./g,'_');
		callbackstring += '_onLoad';
		for (var arg in params) {
			argstring += '&'+arg+'='+params[arg];
		}
		GM_xmlhttpRequest({
			method:"GET",
			url:'http://api.flickr.com/services/rest/?method='+apimethod+argstring+'&api_key='+key,
			onload:function (response) {
				var doc=(new DOMParser).parseFromString(response.responseText, "text/xml");
				status_elem = doc.getElementsByTagName('rsp')[0];
				status = status_elem.getAttribute('stat') == 'ok'? 1 : 0;
				callback[callbackstring](status,doc,response.responseText,null);
			}
		});
	},
	
	resolveUserName: function(type,userurl,referrer) {
		//Trick to do it using the flickr API with authentication already embeded in the page.
		var self = this;
		var listener = {
			flickr_urls_lookupUser_onLoad: function(success, responseXML, responseText, params){
				if(success) {
					var usernames = responseXML.getElementsByTagName('username');
					var username = usernames[0].firstChild.nodeValue;
					switch(type) {
						case PHOTOPHLOW:
							msg = "Discovered in "+username+"'s";
							if(msg.indexOf('photoflow') < 0 || msg.indexOf('Photoflow') < 0) {
								msg += " photoflow";
							}
							msg += " room.";
							referrer = referrer.replace(/inner\//,'');
							break;
					}

					self.insertComment(msg,referrer);
				} else
				GM_log("error looking for user "+referrer+':' + responseText+'.');
			}
		};
		self.apiCall('flickr.urls.lookupUser', {
				url:userurl
		}, listener);
	},
	
	resolveGroupName: function(type,groupurl,referrer) {
		//Trick to do it using the flickr API with authentication already embeded in the page.
		var self = this;
		var listener = {
			flickr_urls_lookupGroup_onLoad: function(success, responseXML, responseText, params){
				if(success) {
					var groupnames = responseXML.getElementsByTagName('groupname');
					var groupname = groupnames[0].firstChild.nodeValue;
					var gid=responseXML.getElementsByTagName('group')[0].getAttribute('id');
					if(groupname) {
						var msg = 'Seen in the group<b>"'+groupname+'"</b>';
						switch(type) {
							case MAP:
								msg = 'Seen on a map of '+groupname+' photos.';
								break;
							case DISCUSS:
								msg = 'Seen in a discussion of the group <b>"'+groupname+'"</b>';
								break;
							case FELLOW:
								msg = "Seen next to a fellow photo of the group <b>\""+groupname+"\"</b>.";
								break;
						case PHOTOPHLOW:
							msg = "Discovered in the "+groupname;
							if(msg.indexOf('photophlow') < 0 && msg.indexOf('Photophlow') < 0) {
								msg += " photophlow";
							}
							msg += " room.";
							referrer = referrer.replace(/inner\//,'');
							break;
						}
						
						var f=safeWrap(function(){ 
							self.insertComment(msg,referrer);
							self.retrieveGroupSignature(gid);
						}); f();
					}
				} else
				m8l("error looking for group"+referrer+':' + responseText+'.');
			},
			flickr_groups_getInfo_onLoad:function(success, responseXML, responseText, params){
				if(success) {
					var names = responseXML.getElementsByTagName('name');
					var name = names[0].firstChild.nodeValue;
					var gid=responseXML.getElementsByTagName('group')[0].getAttribute('id');
					if(name){
						var f=safeWrap(function(){ 
							self.insertComment("Seen in random photos from "+name,referrer);
							self.retrieveGroupSignature(gid);
						}); f();
					}
				} else
				m8l("error looking for group"+groupurl+':' + responseText+'.');
			}
		};

		switch(type) {
			case RANDOM:
				self.apiCall('flickr.groups.getInfo', {
						group_id:groupurl
													  }, listener);
				break;
			case DISCUSS:
			case POOL:
			case MAP:
			case FELLOW:
			case PHOTOPHLOW:
				self.apiCall('flickr.urls.lookupGroup', {
						url:groupurl
													  }, listener);
		}

	},
	
	resolveSetName: function(id,referrer,type) {
		//Trick to do it using the flickr API with authentication already embeded in the page.
		var self = this;
		var listener = {
			flickr_photosets_getInfo_onLoad: function(success, responseXML, responseText, params){
				if(success) {
					var titles = responseXML.getElementsByTagName('title');
					var title = titles[0].firstChild.nodeValue;
					var msg = '';
					switch(type) {
						case MAP:
							msg = 'Seen on a map of your <b>'+title+'</b> set.';
							break;
						case SET:
						default:
							msg = 'Seen in your <b>'+title+'</b> set.';
							break;
					}
					self.insertComment(msg,referrer);
				}
			}
		};

		self.apiCall('flickr.photosets.getInfo', {
			photoset_id:id
		}, listener);

	},
	
	startFRC: function(){
		var referrer = document.referrer;
		
		m8l("referrer:"+referrer);
		if(referrer) {
			var matches;
			if(referrer.indexOf(document.location.pathname) >= 0) return //no need to add the comment if you just commented...

				if(referrer.indexOf('/discuss/') >= 0 && referrer.indexOf('/groups/') >= 0) {
					//we come from a group discussion
					this.resolveGroupName(DISCUSS,referrer,referrer);
				} else if(referrer.indexOf('/groups/') >= 0) {
					if(referrer.indexOf('/map') >= 0) {
						//we come from a group map
						this.resolveGroupName(MAP,referrer,referrer);
					} else {
						//we come from a group
						this.resolveGroupName(POOL,referrer,referrer);
					}
				}  else if(referrer.indexOf('/photos/friends') >= 0) {
					//we come from our contacts' last photos
					this.insertComment("Seen in my contacts' photos.",'');
				}  else if(referrer.indexOf('/photos/tags') >= 0) {
					//we come from our contacts' last photos
					this.insertComment("Seen in a tag search.",referrer);
				} else if(referrer.indexOf('/favorites') >= 0) {
					//we come from our favorites
					this.insertComment("Seen in someone's favorites.",referrer);
				} else if(referrer.indexOf('/archives') >= 0) {
					//we come from our favorites
					this.insertComment("Seen in your archives.",referrer);
				} else if(document.location.hash == "#in/nearby") {
					//we come from a nearby photo
					this.insertComment("Seen next to a nearby photo",referrer);
				} else if(matches = /\/sets\/([0-9]+)(\/map)?\/?/.exec(referrer)) {
					if(matches[2] == '/map') {
						//we come from a map
						this.resolveSetName(matches[1],referrer,MAP);
					} else {
						//we come from a set
						this.resolveSetName(matches[1],referrer,SET);
					}
				} else if(matches = /\/in\/set-([^\/]*\/?)/.exec(document.location.pathname)) {
					//we come from another photo in the same set.
					var set_url = document.location.pathname;
					set_url = set_url.replace(/photos\/([^\/]+)\/.*/,'http://www.flickr.com/photos/$1/sets/'+matches[1]);
					this.resolveSetName(matches[1],set_url);
				} else if((referrer.indexOf('/photos/') >= 0) && (matches = /(\/in\/pool-([^\/]*)\/?)/.exec(document.location.pathname))) {
					if(referrer.indexOf('/in/pool-') < 0)
						referrer += matches[1];
					//we come from a photo feed
					this.resolveGroupName(FELLOW,"http://www.flickr.com/groups/"+matches[2],referrer);
				} else if(matches = /\/photos\/([^\/]+)(\/map|\/[0-9]+|\/page[0-9]+)?\/?$/.exec(referrer) || document.location.pathname.indexOf("/in/photostream") >= 0) {
					if(matches[2] == '/map') {
						//we come from a map of the user photos
						this.insertComment("Seen on a map of your photos.",referrer);
					} else {
						nsid_el = document.getElementsByClassName('flickr-user')[0];
						var nsid = nsid_el.getAttribute('nsid');
						var re = new RegExp("/photos/("+matches[1]+"|"+nsid+")/");
						if(document.location.pathname.indexOf("/in/photostream") >= 0 || re.test(document.location.pathname)) {
							//we come from the same user photo feed
							this.insertComment("Seen on your photo stream.",referrer);
						} else {
							//we come from someone else feed, it was therefore found in a comment.
							this.insertComment("Seen in some comments.",referrer);
						}
					}
				} else if(referrer.indexOf('/map') >= 0) {
					//we come from one of the maps
					this.insertComment("Seen on a map.",referrer);
				}
// Modifications by: Marcos Kuhns (http://www.kuhnsfam.com/)
				else if(referrer.indexOf('/places') >= 0) {
					//we come from places
					matches = /\/places\/(([^\/]+)\/?)*/.exec(referrer);
					if(matches && matches[2]) {
						this.insertComment("Seen on photos taken in "+decodeURI(matches[2]).replace('+', ' ')+".",referrer);
					} else {
						this.insertComment("Seen on the places page.",referrer);
					}
				} else if(referrer.indexOf('/cameras') >= 0) {
					matches = /\/cameras\/([^\/]+)\/([^\/]+)\/?/.exec(referrer);
					if(matches && matches.length > 1) {
						var make = matches[1].replace(/_/g,' ');
						var model = matches[2].replace(/_/g,' ');
						this.insertComment("Seen on the "+make+" "+model+" camera finder.");
					}
				} else if(referrer.indexOf('/interesting') >= 0 && referrer.indexOf('/explore') >= 0) {
					//we come from one of the interesting calendar
					this.insertComment("Seen in the interestingness archives.",referrer);
				} else if(referrer.indexOf('http://www.raum-fuer-notizen.de/explore/index.php?username=') >= 0) {
					//we come from the individual explore page
					this.insertComment("Seen on my individual explore page.",referrer);
				} else if(referrer.indexOf('/explore') >= 0) {
					//we come from the explore page
					this.insertComment("Seen on the explore page.",referrer);
				} else if(referrer.indexOf('/search') >= 0) {
					//we come from a search
					this.insertComment("Found in a search.",referrer);
				} else if(referrer.indexOf('/photos_comments.gne') >= 0) {
					//we come from recent comments
					this.insertComment("Seen in my recent comments.",'');
				} else if(referrer.indexOf('interestingby.isaias.com.mx/pm.php') >= 0) {
					//we come from the popular finder at isaias
					this.insertComment("Found in your popular shots.",referrer);
				} else if(referrer.indexOf('bloglines.com/') >= 0) {
					//we come from a rss reader site
					this.insertComment("Seen on a rss aggregator.","http://www.bloglines.com");
				} else if(referrer.indexOf('google.com/reader') >= 0) {
					//we come from a rss reader site
					this.insertComment("Seen on a rss aggregator.","http://www.google.com/reader");
				} else if(referrer.indexOf('krazydad.com/gustavog/FlickRandom.pl?group=') >= 0) {
					var groupid = referrer.replace(/http:\/\/(www.)?krazydad.com\/gustavog\/FlickRandom.pl\?group=/,'');
					this.resolveGroupName(RANDOM,groupid,referrer);
				} else if(referrer.indexOf('krazydad.com/gustavog/FlickRandom.pl') >= 0) {
					this.insertComment("Seen in a FlickrRandom selection of photos.",referrer);
				} else if(referrer.indexOf('flagrantdisregard.com/flickr/random.php') >= 0) {
					this.insertComment("Seen in FD's random photo browser.",referrer);
				} else if(referrer.indexOf('flagrantdisregard.com/flickr/fortune.php') >= 0) {
					this.insertComment("Seen in FD's fortune teller.",referrer);
				} else if(referrer.indexOf('flagrantdisregard.com/flickr/scout.php') >= 0) {
					this.insertComment("Seen in Flickr explore scout.",referrer);
				} else if(referrer.indexOf('houserdesign.com/flickr') >= 0) {
					this.insertComment("Seen on FlickrLeech.",referrer);
				} else if(referrer.indexOf('maps.yuan.cc/') >= 0) {
					this.insertComment("Seen on Yuan.CC Maps.",referrer);
				} else if(referrer.indexOf('webdev.yuan.cc/') >= 0) {
					this.insertComment("Seen on LfVr.",referrer);
				}  else if(referrer.indexOf('blog.flickr.com') >= 0) {
					this.insertComment("Seen on Flickr Blog.",referrer);
				} else if(referrer.indexOf('utata.org/spotlights') >= 0) {
					this.insertComment("Seen in the Utata spotlight.",referrer);
				} else if(referrer.indexOf('netomer.de/flickrtools/inspector') >= 0) {
					this.insertComment("Seen on Flickr Inspector.",referrer);
				} else if(referrer == "http://www.flickr.com/" || referrer == "http://flickr.com/" ||
						  referrer == "http://www.flickr.com" || referrer == "http://flickr.com") {
					this.insertComment("Seen on my Flickr home page.",'');
				} else if(referrer == "http://philmccluskey.com/projects/flickrfox/") {
					this.insertComment("Discovered using FlickrFox.",referrer);
				} else if(referrer.indexOf("http://16.gmodules.com/ig/") >= 0) {
					this.insertComment("Seen in my contacts' photos.",'');
				}  else if(referrer.indexOf("www.drewmyersphoto.net/flickr_scripts/cie/") >= 0) {
					this.insertComment("Seen in my contacts' Explore photos.",referrer);
				}  else if(referrer.indexOf("www.drewmyersphoto.net/flickr_scripts/ycrf/") >= 0) {
					this.insertComment("Seen in my contacts' favorites.",referrer);
				} else if(referrer.indexOf("flexplore.raum-fuer-notizen.de/flexplore") >= 0) {
					this.insertComment("Seen on flexplore.",referrer);
				}
			//cases for photoflow
				else if(referrer.indexOf('http://www.photophlow.com/flickr/group/') >= 0) {
					var groupid = referrer.replace(/http:\/\/www.photophlow.com\/flickr\/group\//,'');
					groupid = groupid.replace(/inner\//,'');
					this.resolveGroupName(PHOTOPHLOW,"http://www.flickr.com/groups/"+groupid,referrer);
				}
				else if(referrer.indexOf('http://www.photophlow.com/flickr/user/') >= 0) {
					var userid = referrer.replace(/http:\/\/www.photophlow.com\/flickr\/user\//,'');
					userid = userid.replace(/inner\//,'');
					this.resolveUserName(PHOTOPHLOW,"http://www.flickr.com/people/"+userid,referrer);
				}
			//fall back
				else if(referrer.indexOf('flickr.com') < 0) {
					if(matches = /http:\/\/(www.)?([^\/]+).*/.exec(referrer)) {
						this.insertComment("Seen on "+matches[2],referrer);
						m8l("Seen on "+matches[2]);
					} else
						this.insertComment("Seen on the Web.",referrer);
				}
		}  else {
			//we have no referer, but we can still try to guess
			if(matches = /\/in\/pool-([^\/]*)\/?/.exec(document.location.pathname)) {
				//we come from a group feed or something
				this.resolveGroupName(POOL,"http://www.flickr.com/groups/"+matches[1],"http://www.flickr.com/groups/"+matches[1]+'/pool');
			} else if(matches = /\/in\/set-([^\/]*\/?)/.exec(document.location.pathname)) {
				//we come from a set
				var set_url = document.location.pathname;
				set_url = set_url.replace(/\/photos\/([^\/]+)\/.*/,'http://www.flickr.com/photos/$1/sets/'+matches[1]);
				this.resolveSetName(matches[1],set_url,SET);
			}
		  //Fix by Marco Bernardini
		  else if(matches = /\/photos\/([^\/]+)(\/map|\/[0-9]+)?\/?$/.exec(document.location.pathname) || document.location.pathname.indexOf("/in/photostream") >= 0) {
				if(matches[2] == '/map') {
					//we come from a map of the user photos
					this.insertComment("Seen on a map of your photos.",'');
				} else {
					nsid_el = document.getElementsByClassName('flickr-user')[0];
					var nsid = nsid_el.getAttribute('nsid');
					var re = new RegExp("/photos/("+matches[1]+"|"+nsid+")/");
					if(re.test(document.location.pathname) || document.location.pathname.indexOf("/in/photostream") >= 0) {
						//we come from the same user photo feed
					  this.insertComment("Seen on your photo stream.",'');
					} else {
						//we come from someone else feed, it was therefore found in a comment.
						this.insertComment("Seen in some comments.",'');
					}
				}
			}

		}
	}
	
}

function addGroupUpdateControl(){
	var ce=document.createElement("div");
	ce.innerHTML='<span id="TrailrGU" style="font-size:x-small;padding:1em;color:blue;cursor:pointer">click to update Trailr\'s invitation-drop-down menu</span>';
	documentInsertElement(ce,getBID("SubNav"),AFTER);
	//getBID("TrailrGU").addEventListener("click",updateGroupList,false);
	updateGroupList();
}

function updateGroupList(){
	var tgu=getBID("TrailrGU");;
	var w=Waiter.showWait(tgu,"Trailr is copying group list");
	m8l("inside updateGroupList"); 
	var groups_mem=unsafeWindow.page_groups_memA;
	var groups_mod=unsafeWindow.page_groups_modA;
	var groups_adm=unsafeWindow.page_groups_admA;
	var lr=-1;
	var i;
	group_list=new Array();
	group_admin_list=new Array();
	group_mod_list=new Array();
	for(i=0;i<groups_mem.length;i++){
		group_list.push({id:groups_mem[i].id, name:groups_mem[i].name, refresh:lr});
	}
	for(i=0;i<groups_adm.length;i++){
		group_admin_list.push({id:groups_adm[i].id, name:groups_adm[i].name, refresh:lr});
	}
	for(i=0;i<groups_mod.length;i++){
		group_mod_list.push({id:groups_mod[i].id, name:groups_mod[i].name, refresh:lr});
	}
	
	
	////m8l("selectori code:"+VAR_code);
	var setCode=safeWrap(function(){
		GM_setValue("OOI_saved_list","compute");
		GM_setValue("OOI_saved_gl",group_list.toSource());
		GM_setValue("OOI_saved_agl",group_admin_list.toSource());
		GM_setValue("OOI_saved_mgl",group_mod_list.toSource());
		//m8l("gl.toSource:"+group_list.toSource()+ " OOI_saved_gl:"+GM_getValue("OOI_saved_gl","null"));
	});
	setCode();
	Waiter.hideWait(w);
	
	var dn=document.createElement("span");
	dn.innerHTML='<span id="TrailrGU" style="font-size:x-small;padding:1em;color:green;cursor:pointer">Trailr invitation-drop-down-menu updated</span>';
	documentInsertElement(dn,tgu,BEFORE);
	tgu.parentNode.removeChild(tgu);
}


var interval=500;
var hand;
var ready=false;

function check4init(){
	ready=test2Start();
	if(ready){
		try{
			m8l("trying to start");
			trailr = new Trailr();
		}catch(exc){
			m8l("exception:"+exc);
		}
	}else hand=setTimeout(check4init,interval);
};

var PREVIEW_SIGN=/#preview$/;

if(PREVIEW_SIGN.exec(location.href)){
	//preview mode detected
	VAR_oos_enabled=false;
}

switch(CASE[location.href]){
	case CASE["http://flickr.com/groups"]:
		window.addEventListener("load",addGroupUpdateControl,false);
	break;
	default:
		check4init();
}


