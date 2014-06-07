// ==UserScript==
// @name           zynga games
// @namespace      zynga
// @description    Auto player for zynga games on facebook: space wars, football, heroes & villains, special forces, fashion wars, dragon wars, mafia wars, vampires, gang wars, street racing, pirates, castle age, school of magic, prison lockdown, glamour age, under world, age of chivalry, heist, demon wars, soldiers, pocket battles, super powers, drinking wars, green game, sorcerer of darkness, slamdunk, be popular, warlords, blood hunters, celebrity life, realm of shadows, protectors of fortuna, guardians of light, wrath of ninjas, Mafioso war, robin hood, fashionista, secret agents
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
// @include        http://apps.*facebook.com/prisonlockdowngame/*
// @include        http://apps.*facebook.com/under_world/*
// @include        http://apps.*facebook.com/secretagents/*
// @include        http://apps.*facebook.com/itsfashion/*
// @include        http://apps.*facebook.com/mafiosowar/*
// @include        http://apps.*facebook.com/robhood/*
// @include		   http://www.facebook.com/common/error.html
// ==/UserScript==


// disable fastLoad if the computer is slow or many games are running at the same time.
var fastLoad=true;
var debug=false;

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
		health=nHtml.FindByAttrContains(document.body,"span","id",'_health');
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
		stamina=nHtml.FindByAttrContains(document.body,"span","id",'_cur_recovery');
	}
	if(!stamina) {
		// school of magic
		stamina=nHtml.FindByAttrContains(document.body,"span","className",'stamina');
		if(stamina) { stamina=stamina.parentNode; }
	}
	if(!stamina) {
		stamina=nHtml.FindByAttrContains(document.body,"span","id",'_stamina');
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
		energy=nHtml.FindByAttrContains(document.body,"span","id",'_energy');
	}
	if(!energy) {
		// school of magic
		energy=nHtml.FindByAttrContains(document.body,"span","className",'energy');
		if(energy) { energy=energy.parentNode; }
	}
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
		energyMess="Energy: "+this.stats.energy.num;
	} else {
		this.GMLog('Could not find energy');
		this.waitMilliSecs=5000;
	}

	// special forces(..._user_cash)
	var cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_user_cash');
	if(!cashObj && isKidsGame) {
		// robhood,etc.
		cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_cur_cash');
	}
	if(!cashObj) {
		// vampire wars.
		cashObj=nHtml.FindByAttrContains(document.body,"div","id",'_current_cash');
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
				} else if(td.className=="job_energy") {
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
				// dragon wars, vampires
				var m=this.energyRe.exec(trTxt);
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
			var a=nHtml.FindByAttrContains(tr,"a","href",'action=dojob');
			if(!a && isKidsGame) {
				a=nHtml.FindByAttrContains(tr,"a","onclick",'_jobs_doJob');
			}
			if(!a) {
				a=nHtml.FindByAttr(tr,"input","name","Job Submit");
			}
			if(!a) {
				// school of magic
				a=nHtml.FindByAttr(tr,"input","value",/^Do/);
			}
			if(!a) {
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
		" or UserIDs"+
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
		// specialforces, mafia wars
		if((a=nHtml.FindByAttrContains(content,'a','onclick','controller=job'))) {
			useHref=false;
		}
	}
	if(!a) {
		this.GMLog(' Could not find job link');
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
		// inthemafia, xw_controller=property
		// piratesrule, onsubmit = properties.php
		// vampiresgame, action = properties.php
//		ss=document.evaluate(".//input[@name='action' and @value='buy']",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		ss=document.evaluate(".//form[contains(@action,'properties.php') "+
			"or contains(@action,'/Market/Buy') "+
			"or contains(@onsubmit,'properties.php') "+
			"or (contains(@id,'_form') and contains(@id,'BUY')) "+
			"or (contains(@action,'xw_controller=property') and contains(@action,'xw_action=buy'))]",
			content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	//var costRe=new RegExp('$([0-9,]+)');
	var builtOnRe=new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)','i');
	var propByName={};
	var propNames=[];

	var gameName=this.GameName();
	this.GMDebug('forms found:'+ss.snapshotLength);
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

		var moneyss=document.evaluate(".//*[contains(@class,'money') or contains(@class,'currency')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
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
