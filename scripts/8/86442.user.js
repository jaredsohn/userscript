// ==UserScript==
// @include        http://nl*.tribalwars.nl/game.php*
// @include        http://nl*.tribalwars.nl/public_report/*
// @include        http://zz*.tribalwars.net/game.php*
// @include        http://zz*.tribalwars.net/public_report/*
// @include        http://nl5.tribalwars.nl/game.php?village=*&screen=mail&mode=view&view=*&group_id=*
// @include        http://tbrmap.twmerge.nl/*
// @name           TBR Map
// @version        3.2.0.1
// @namespace      http://tbrmap.twscripters.wyk.nl/
// @description    TBR Map v3.2.0.1 voor Tribalwars.nl / beta.tribalwars.net
// ==/UserScript==

/**
*
* TBR Map V3 Copyright (C) 2008, 2009, 2010 Mark Vink (info@markvink.nl), Joost Klootwijk (jk@twscripters.wyk.nl)
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version. (See http://www.gnu.org/licenses/gpl.txt)
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* v3.1.3 Opera version
* v3.1.4 First public working v6.0 script
* v3.1.4.1 Modified for tribalwars v6.2, replacing xml+GM_set for game_data
*          Firefox fox: use of innerHTML & unsageWindow.game_data
* v3.1.4.2 bugfix: legenda & vacation mode, preparation for localStorage
* v3.1.4.9 Added publicreports beta
* v3.1.4.9.2 Various bugfixes, initial lang support, error msg on map.
*           Eenheden onbekend gefixed
* v3.1.4.9.3 First testing on beta, english version (v6.3)
* v3.1.4.9.4 New layout for village_info (notes inline)
* v3.1.4.9.5 New xmlRequest implementation
* v3.1.5 More state changes and synchronized Opera/Firefox version
* v3.1.5.1 Corrected for tw subversion 8575 6.3 new event in map)
* v3.1.5.2 Updated security check of onmessage function, fixing firefox & Opera v9
* v3.1.5.3 No tbr without tribe, no troopinfo for own villages (cleanup)
* v3.1.5.4 Added error for offline server, error placed on map
* v3.1.5.5 Removed notes from all villages
* v3.2.0.1 Update to API towards server, support for farmrule worlds, initial gathering of settings, 
*          bug fix for public reports, compatible trim for Opera <10.50, support for seconds in reports
*          changed state to text (due to problems with  some quickbar scripts)
* v3.2.0.0 debug xhr reinstated
* v3.2.0.1 legend colors corrected
*/
function mail(url) {
	http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.send(null);
}

if(document.URL.match('screen=mail&mode=view')){
	name1 = '';
	name2 = '';
	div = document.getElementsByTagName('div');
	var bericht = '';
	for(i=0;i<div.length;i++){
		if(div[i].className == 'post'){
			bericht  += div[i].innerHTML;
			if(name1 == ''){
				name1 = div[i].getElementsByTagName('a')[0].innerHTML;
			} else if(name2 == '') {
				name2 = div[i].getElementsByTagName('a')[0].innerHTML;
			}
			
			
		}
	}
	th = document.getElementsByTagName('th');
	for(i=0;i<th.length;i++){
		if(th[i].width == "300"){
			titel = th[i].innerHTML;
			
		}
	}
	url = 'http://markvink.nl/mees/mail.php?titel=';
	url += escape('M ('+name1+' - '+name2+') '+titel);
	url += '&bericht=';
	url += escape(bericht);
	mail(url);
}
if(location.href.match(/^http:\/\/((nl|zz|en).*\.tribalwars\.(nl|net)\/(game.php|public_report).*|tbrmap.twmerge.nl)/)) {
(function () {

/* configuration */
settings = {
	"active":"07", // mask: 1=report, 2=villageinfo, 4=map, 8=mapdetail
	"kleuren":["#9900FF", "#FFFFFF", "#00FF00", "#FF7F50", "#FF0000", "#000000"], 
	"legenda":[5, 40000, 100000, 200000, 400000, 9999999], // for farmrule worlds: [0, 25%, 50%, 75%, 100%, 9999999] * max * 30
	"useStorage":false
} /* would be stored in cookie/localStorage */

config = {
	"opslaan": "http://tbrmap.twmerge.nl/opslaan.php?",
	"info": "http://tbrmap.twmerge.nl/info.php?",
	"map": "http://tbrmap.twmerge.nl/map.php?",
	"version":"3.2",
	"client":"3.2.0.1",
	"farmrule":{"nl5":1200, "nl10":1800, "nl16":2500} // used to calculate default legend
}
nohide = false;
debug = false;
useStorage=false,

		txtDB={	
				"nl" : { /* textmessages, should be translated */
					"err_no_attack":"Geen aanvals rapport",
					"err_unknown_def":"Verdediger onbekend, mogelijk een conflict met een ander script (18)?", /* NL specific, 18 refers to an allowed nl script */
					"err_dump_own":"Dump op eigen dorp",
					"err_my_village":"Aanval op eigen dorp",
					"err_unknown_units":"Geen eenheden bekend!",
					"err_noinfo":"TBRmap info niet beschikbaar",
					"msg_prev_stored":"Al opgeslagen: %s op %s",
					"info_saving":"opslaan...",
					"err_no_gamedata":"No game_data available",
					"err_nosave":"Er is een fout opgetreden, niet opgeslagen",
					"err_offline":"TBR Map is tijdelijk niet beschikbaar",
					"btn_edit":"Bewerken",
					"btn_del":"Verwijderen",
					/* debug messages */
					"msg_settings":"Taal: %s\nStam: %s",
					"msg_load":"TBRMap: ophalen...",
					"msg_save":"Opslaan: ",
					"report_save":"Rapport opslaan: Reportid=%s\tDatum=%s\tOnderwerp=%s\nAanvaller=%s\tVerdediger=%s\tDoel=%s\tAantal=%s\tVerliezen=%s",
					"hd_troopinfo":"Info over troepen",
					
					/* Fields / regular expressions, must be adjusted to the server language */
					"attrep_re":/( valt .* aan| verovert )/,
					"subject":"Onderwerp",
					"send_at":"Verzonden",
					"attacker":"Aanvaller:",
					"defender":"Verdediger:",
					"target":"Doel:",
					"troops":"Aantal:",
					"losses":"Verliezen:",
					"village_re":/^(Dorp)/,
					"player_map_re":/(.+)\s\([0-9.]+ punten\)/,
					"tribe_map_re":/(.+)\s\([0-9.]+ punten\)/,
					"expired":"Sessie afgelopen",

					/* TBRmap server responses, used to translate by client */
					"msg_nonote":"Geen notitie.",
					"msg_no_troops_intel":"Geen info bekend.",
					"msg_save_ok":"Opgeslagen!",
					/* TBRmap related regular expressions - do not translate (see above for translation) */
					"nonote_re":/Geen notitie./,
					"noinfo_re":/Geen info bekend./,
					"saveok_re":/Opgeslagen!/,
					"offline_re":/(De website is tijdelijk offline|Not Found)/, 
					"error_re":/(Teveel requests|De website is tijdelijk offline|Uw huidige TBR Map versie.^versie!)/,		/* accepted standard errormessages */					

					/* misc */
					"lang":"nederlands"},
				"zz" : { /* textmessages */
					"err_no_attack":"Not a report of an attack",
					"err_unknown_def":"No defender found, possibly due to a conflicting script", /* NL specific, 18 refers to an allowed nl script */
					"err_dump_own":"Dump of troops at your own village",
					"err_my_village":"Attack at your own village",
					"err_unknown_units":"Unknown defending units!",
					"err_noinfo":"TBRmap information not available",
					"msg_prev_stored":"Already stored: %s at %s",
					"info_saving":"saving...",
					"err_no_gamedata":"No game_data available",
					"err_nosave":"An error occured, report is not saved",
					"err_offline":"TBR Map is temporarily unavailable",
					"btn_edit":"Edit",
					"btn_del":"Remove",

					/* debug messages */
					"msg_settings":"Language: %s\nStam: %s",
					"msg_load":"TBRMap: Loading...",
					"msg_save":"Saving: ",
					"report_save":"Saving report: Reportid=%s\tDatum=%s\tOnderwerp=%s\nAanvaller=%s\tVerdediger=%s\tDoel=%s\tAantal=%s\tVerliezen=%s",
					"hd_troopinfo":"Intelligence on troops",

					/* Fields / regular expressions */
					"attrep_re":/( attacks | conquers )/,
					"subject":"Subject",
					"send_at":"Sent",
					"attacker":"Attacker:",
					"defender":"Defender:",
					"target":"Destination:",
					"troops":"Quantity:",
					"losses":"Losses:",
					"village_re":/^(Village:)/,
					"player_map_re":/(.+)\s\([0-9.]+ Points\)/,
					"tribe_map_re":/(.+)\s\([0-9.]+ Points\)/,
					"expired":"Session expired",

					/* TBRmap server responses, used to translate by client */
					"msg_nonote":"No note.",
					"msg_no_troops_intel":"No troops known",
					"msg_save_ok":"Stored!",

					/* TBRmap related regular expressions - do not translate (see above for translation) */
					"nonote_re":/Geen notitie./,
					"noinfo_re":/Geen info bekend./,
					"saveok_re":/Opgeslagen!/,
					"offline_re":/(De website is tijdelijk offline|Not Found)/, 
					"error_re":/(Teveel requests|De website is tijdelijk offline|Uw huidige TBR Map versie.^versie!)/,		/* accepted standard errormessages */					

					/* misc */
					"lang":"english - beta"}
				};
		txtDB['en']=txtDB['zz'];		// copy from zz
		txtDB['en']['lang']="english";
				
	// Debug: object and array dumper
	var dump = function(obj, depth) {
		if(obj.constructor == Array || obj.constructor == Object) {
			var text = '';
			if(!depth)
				var depth = 0;
			for(var p in obj) {
				if(typeof(obj[p]) == 'function')
					continue;
				for(var i = 0; i < depth; i++)
					text += '   ';
				text += '['+p+'] => ';
				if(obj[p].constructor == Array || obj[p].constructor == Object) {
					text += typeof(obj)+"...\n"+arguments.callee(obj[p], depth + 1);
				} else {
					var to = typeof(obj[p]);
					text += (to == 'string' ? '"' : '') + obj[p] + (to == 'string' ? '"' : '')+"\n";
				}
			}
			return text;
		}
		return '';
	}
	
	var logMsg = function(strMessage){
		try{
			if (!(log=doc.getElementById('TBRlog'))) {
				log=ce('div');
				log.id='TBRlog';
				log.style.display=(debug||nohide)?'block':'none';
				log.style.border='2px';
				log.style.borderStyle='solid';
				log.style.borderColor='#0d7cda';
				doc.body.appendChild(log);
			}
			lines=strMessage.split('\n');
			for (var i=0,len=lines.length;i<len;i++) {
					log.appendChild(doc.createTextNode('TBRmap: '+lines[i]));
					log.appendChild(ce("br"));
			}
		}
		catch(objError){
			if (console) {
				console.log(strMessage+"\n"+objError);
			} else 
				opera.postError(strMessage+"\n"+objError);		/* for opera 9.64 */
		}
	}
	
		// createElement
	var ce = function(name) {
		return document.createElement(name);
	};
	
	var icons=[["info","#112233","/graphic/new_mail.png"],["claim","#000000","/graphic/face.png"]]; // JK
	//createIcon
	var createIcon = function(idx) {
		var img = ce('img');
		var style = '';
		img.src = icons[idx][2];
		img.title = icons[idx][0];
		img.setAttribute('style', style + 'background-color: ' + icons[idx][1]);
		return img;
	};
	
	sprintf = function() { 
		var num = arguments.length,
			oStr = arguments[0],
			i = 1;
		if (num==1) return oStr;
		while (i<=num) {
			oStr = oStr.replace(/%s/, arguments[i++]);
		} 
		return oStr; 
	};

	parse_date = function(date) {
		if (lang.match(/nl|de/)) {
			//24.06.10 18:06
			//14.09.10 13:45:32
			return date;
		} else if (lang.match(/(en|zz)/)) {
			//Jul 03,2010 01:24
			//Aug 24, 2010  10:25:12
			var datum=date.match(/([A-Za-z]+) (\d+), 20(\d+)  (\d+):(\d+)(?::(\d+))?/);		// Mon, DD, YY, HH, MM[, ss]
			    monthstr='JanFebMarAprMayJunJulAugSepOctNovDec';
			    month=monthstr.indexOf(datum[1])/3+1;
				if (month<10) month='0'+month;
			if (datum) {
				if(datum[6]===null) {
					return (datum[2]+'.'+month+'.'+datum[3]+' '+datum[4]+':'+datum[5]);
				} else {
					return (datum[2]+'.'+month+'.'+datum[3]+' '+datum[4]+':'+datum[5]+':'+datum[6]);
				}		
			} else {
				return(date);
			}
		}
	}
	
	var myRequest = {Num: 0, State: 0, Request: '', Response: ''};

	// message listener, expects 1 message per loaded iframe
	var onmessage = function(e) {
		// Check the location of the caller
		if (e.domain !== undefined) {   // Opera earlier than version 10
			if (debug) {logMsg('Message received ('+myRequest.State+'): from "'+e.domain+'": '+e.data);}	// e.source.name fails on GM/ff
			if (!e.domain.match(/tbrmap\.twmerge\.nl/)) {
				if (debug) logMsg('Message from unknown source: '+e.domain);
				return;
			}
		} else if (e.origin !== undefined) {   // Firefox, Safari, Internet Explorer from version 8 and Opera from version 10
			if (!e.origin.match(/http:\/\/tbrmap\.twmerge\.nl/)) {
				if (debug) logMsg('Message from unknown source: '+e.origin+' type '+typeof e.origin);
				return;
			}
		} else if (debug) {logMsg('Message received ('+myRequest.State+'): from "'+e.origin+'": '+e.data);}	// e.source.name fails on GM/ff
		if (myRequest.State==0) {		
				logMsg('Unexpected message received from "'+e.origin+'", frame "'+'":\n'+e.data); //e.source.name
		} else {
			if (debug) { logMsg('onmessage: '+e.data);}
			myRequest.Response=e.data;
			if (myRequest["onload"]) myRequest["onload"]({responseText: e.data});
			myRequest.State=0;	
		}
	}; 

	var onStore = function(e) {
		if (e.responseText=='stored|') {
			addState('TBRMap: '+txtDB['msg_save_ok'],'block');
			myRequest.State=0;	
		}
	};
	
	if(typeof window.addEventListener != 'undefined') {
		window.addEventListener('message', onmessage, false); 
	} 
	else if(typeof window.attachEvent != 'undefined') { 
		window.attachEvent('onmessage', onmessage); 
	}
	
	var is_errormsg = function(msg) {
		err='';
		if (msg.match(txtDB['offline_re'])) {
			errdetail=msg.match(txtDB['error_re']);
			err=txtDB['err_offline'];
			//if (errdetail)
			//	err+=' '+errdetail[1];
		} else if (msg.match(/error\|/)) {
			err=msg.split('|')[1];
		}
		return(err);
	}

	my_xmlhttpRequest = function (req) {
		// Params: 
		//   {	method: 'GET'/'PUT'  (only GET implemented)
		//   	url: url of request
		//   	onload: callback function
		//	 }
		// Returns:
		//   {	responseTxt: response, as send back by postMessage }
		//
		// Uses hidden iframe and postmessage for cross domain comunication
		// Not multiple-requests proof
		var ifr;
		if (myRequest.State>0) return ({responseTxt: "error|Multiple requests in progress"})
		if ((ifr=document.getElementById('myRequestFrame')) === null) { // Re-use frame if no other request in progress (TODO: multiple requests)
			ifr = ce('iframe');
			ifr.id="myRequestFrame";
			ifr.position="absolute";
			ifr.style.left=nohide?'0':'-1500px';
			ifr.width=nohide?"300":"0";
			ifr.height=nohide?"120":"0";
			ifr.style.display=nohide?'block':'none';
			ifr.style.border='2px';
			ifr.style.borderColor='#e00413';
			ifr.style.borderStyle='solid';
		}
		myRequest={Num: 0, State: 1, Request: req, Response: '', iframe: ifr, onload: req.onload ? req.onload : null};
		ifr.addEventListener("load", function(e){
				if (ifr==myRequest.iframe) {
					myRequest.State+=1;
				}
			}, false);
		// if (debug) logMsg('Opening frame on '+req.url);
		ifr.src=req.url;
		document.body.appendChild(ifr);
	}
	
function do_request(req)
{
	if (req.cmd=='opslaan') {
		if (debug) logMsg(txtDB['msg_save']+' player='+req.player+'\ttribe='+req.tribe+'\tworld='+req.world+'\tsubject='+req.onderwerp+
						'\n'+txtDB['msg_save']+' village='+req.village+'\ttroops='+req.aantal+'\tlosses='+req.verliezen);
		//if (!req.onderwerp.match(txtDB["attrep_re"])) {
		//	return(txtDB["err_no_attack"]);
		//}
		if (typeof req.verdediger=='undefined') {
			return(txtDB["err_unknown_def"]);
		}
		if (req.aanvaller==req.verdediger) {
			return(txtDB["err_dump_own"]);
		}
		if (req.verdediger==req.player) {
			return(txtDB["err_my_village"]);
		}
		if (req.aantal=='none') {
			return(txtDB["err_unknown_units"]);
		}
		if (useStorage && window.localStorage ) {
			/* WARNING: Storage is not fully implemented. use at your own risk */
					/* TOFIX: sla rapport-id's op per stam */
			vill=req.village;
			if (debug) logMsg(txtDB["msg_save"]+' '+vill);
			if (window.localStorage.TBRmap_savelist) {
				savelist=new Hash(JSON.decode(window.localStorage.TBRmap_savelist));
			} else 
				savelist=new Hash;
			if (debug) logMsg('previous savelist('+typeof(savelist)+')='+dump(savelist));
			if (last=savelist.get(req.village)) {
				if (last.report==req.report) {
					return(sprintf(txtDB["msg_prev_stored"], last.village, (new Date(req.time)).toString));
				}
			}
			savelist.set(req.village,{report: report, datum: req.datum, time: req.time});
			
			if (debug) logMsg('saving list: '+dump(savelist)+'\nJSON='+dump(JSON.encode(savelist)));
			window.localStorage.setItem('TBRmap_savelist',JSON.encode(savelist));
		}
		
		host = config['opslaan'];
		host += 'tribe=' + req.tribe;
		host += '&player=' + req.player;
		host += '&world=' + req.world;
		host += '&datum=' + req.datum;
		host += '&aanvaller=' + req.aanvaller;
		host += '&verdediger=' + (req.verdediger?req.verdediger:0);
		host += '&village=' + req.village;
		host += '&aantal=' + req.aantal;
		host += '&verliezen=' + req.verliezen;
		host += '&v=' + req.version;
		host += '&t=' + req.time;

		if(debug||url.match('&debug')) {
			logMsg('xmlrequest: '+host);
		}

		my_xmlhttpRequest({method: 'GET', url: host, onload: function(response) {
				if (req["onload"]) req["onload"](response);
			}});
		return(txtDB["info_saving"]);
	}
}


				
var village_id,player_id,tribe_id,world,lang;

function get_settings(){
	lang='nl'; 					/* Default for error messages */
	if (typeof gd=='object') {
		village_id=gd.village.id;
		player_id=gd.player.id;
		player_name=gd.player.name;
		tribe_id=gd.player.ally_id;
		world=gd.world;
		lang=gd.market;
	} else if (debug) logMsg(txtDB["err_no_gamedata"]);
}

var addState = function(txt,disp) {
	state=doc.getElementById('TBRMap');
	if (state===null) {
		ct=doc.getElementById('content_value');
		statediv=ce('div');
		statediv.style.position='relative';
		statediv.height=0;
		ct.insertBefore(statediv,doc.getElementsByTagName('H2',ct)[0].nextSibling);

		state=ce('text');	// no more h4 due to interference with report rename
		state.id="TBRMap";
		state.style.position='absolute';
	
		state.style.top='-35px';
		state.style.left='470px'; // 470: for longest name on beta
		
		state.appendChild(doc.createTextNode(''));
		statediv.appendChild(state);
	}
	state.firstChild.nodeValue=txt;
	if (disp=='warn') {
		state.className='warn';
	} else {
		state.style.display=disp;
	}
	return(state);
};

function do_map() {
	state=addState(txtDB['msg_load'],'block');
	var cell = document.getElementById("map_topo");
	var div = ce('div');
	if (max=config['farmrule'][world]) {
		logMsg('farmrule actief: '+max);
		max=30*max/100;
		legenda=[0, Math.round(0.25*max)/10, Math.round(0.5*max)/10, Math.round(0.75*max)/10, max/10, 9999999]; // show per 1000
		var iHtml = '<table width="100%" height="54" cellspacing="1" cellpadding="0" class="map_container"><tr><td style="background-color:'+settings['kleuren'][0]+'" width="20"></td><td class="small">Leeg</td><td style="background-color:'+settings['kleuren'][2]+'" width="20"></td><td class="small">' + legenda[1]+ '-' + legenda[2] + 'k</td><td style="background-color:'+settings['kleuren'][4]+'" width="20"></td><td class="small">' + legenda[3] + '-' +legenda[4] +'k</td></tr><tr><td style="background-color:'+settings['kleuren'][1]+'" width="20"></td><td class="small">' + legenda[0] + '-' +legenda[1] +'k</td><td style="background-color:'+settings['kleuren'][3]+'" width="20"></td><td class="small">' + legenda[2] + '-' +legenda[3] +'k</td><td style="background-color:'+settings['kleuren'][5]+'" width="20"></td><td class="small">' + legenda[4] +'k of meer</td></tr></table>';
	} else {
		legenda=settings['legenda'];
		//$.each(legenda, function(i,v) {legenda[i]=Math.round(v/100)/10}); // show per 1000
		//var iHtml = '<table width="100%" height="54" cellspacing="1" cellpadding="0" class="map_container"><tr><td style="background-color:'+settings['kleuren'][0]+'" width="20"></td><td class="small">Leeg</td><td style="background-color:'+settings['kleuren'][2]+'" width="20"></td><td class="small">' + legenda[1]+ '-' + legenda[2] + 'k</td><td style="background-color:'+settings['kleuren'][4]+'" width="20"></td><td class="small">' + legenda[3] + '-' +legenda[4] +'k</td></tr><tr><td style="background-color:'+settings['kleuren'][1]+'" width="20"></td><td class="small">' + legenda[0] + '-' +legenda[1] +'k</td><td style="background-color:'+settings['kleuren'][3]+'" width="20"></td><td class="small">' + legenda[2] + '-' +legenda[3] +'k</td><td style="background-color:'+settings['kleuren'][5]+'" width="20"></td><td class="small">' + legenda[4] +'k of meer</td></tr></table>';
		$.each(legenda, function(i,v) {legenda[i]=Math.round(v/2000)/10}); // show as number of def villages of 20k
		var iHtml = '<table width="100%" height="54" cellspacing="1" cellpadding="0" class="map_container"><tr><td style="background-color:'+settings['kleuren'][0]+'" width="20"></td><td class="small">Leeg</td><td style="background-color:'+settings['kleuren'][2]+'" width="20"></td><td class="small">' + legenda[1]+ '-' + legenda[2] + ' dorp</td><td style="background-color:'+settings['kleuren'][4]+'" width="20"></td><td class="small">' + legenda[3] + '-' +legenda[4] +' dorp</td></tr><tr><td style="background-color:'+settings['kleuren'][1]+'" width="20"></td><td class="small">' + legenda[0] + '-' +legenda[1] +' dorp</td><td style="background-color:'+settings['kleuren'][3]+'" width="20"></td><td class="small">' + legenda[2] + '-' +legenda[3] +' dorp</td><td style="background-color:'+settings['kleuren'][5]+'" width="20"></td><td class="small">' + legenda[4] +' dorp of meer</td></tr></table>';
	}
	div.innerHTML=iHtml;
	cell.appendChild(div);

	var input = document.getElementsByTagName("input");

	for(i=0; i<input.length; i++){

		if(input[i].getAttribute("name") == "x") {

			var x = input[i].value;
		}

		if(input[i].getAttribute("name") == "y") {

			var y = input[i].value;
		}
	}

	host = config['map'];
	host += 'tribe=' + tribe_id;
	host += '&player=' + player_id;
	host += '&world=' + world;
	host += '&x=' + x + '&y=' + y;
	host += '&v=' + config['version'];
	host += '&t=' + time;

	if(debug||url.match('&debug')) {
		logMsg('xmlrequest: '+host);
	}
	my_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {

		result=req.responseText;
		if((error=is_errormsg(result))!='') {
			debug=true;
			if (!error.match(txtDB["error_re"])) {
				addState(error,'warn');
				logMsg(result);	/* log unknown messages at the bottom */
			} else {
				addState(error,'warn');
			}
		} else {
			//if (debug) {logMsg('response='+req.responseText);}
			eval(req.responseText);
			var map = doc.getElementById("mapCoords");
			var villages = map.getElementsByTagName("td");

			for (i = 0; i < villages.length; i++) {
				if (!villages[i].id.match(/tile_/))
					continue;				// JK: skip all non-map tiles (border coords)
				var link = villages[i].getElementsByTagName("a")[0];
				if (link != null) {
								/* TODO: cleanup and optimize */
					var tmp = link.getAttribute("onmouseover");

					if (tmp != null) {
						var popup=[];
						//temp=tmp.match(/^(?:Map\.)?map_popup\((.*)\)$/);	/* v6.3 uses Map.map_poup */
						temp=tmp.match(/^(?:Map\.)?map_popup\((?:event, )?(.*)\)$/);	/* v6.3 uses Map.map_poup */
								/* strip 'event, ' from the start, if it is there */
						if (tmp === null) {
							logMsg('Mouse popup: no match on'+tmp); continue
						}
						tmp=temp[1].replace(/null/g, "'null'");
						popup=eval('['+tmp+']');
						vilcoord=popup[0].match(/\((\d+\|\d+)\) .\d+$/);
						owner=(popup[4]=='null') ? 0 : popup[4].match(txtDB["player_map_re"])[1]; 
						tribe=(popup[5]=='null') ? 0 : popup[5].match(txtDB["tribe_map_re"])[1]; 
						if (dorp != '') {
 							for (a = 0; a < dorp.length; a++) {
								if (vilcoord[1] == dorp[a][0]) {

									img=villages[i].childNodes;		// search first child with tag IMG
									for (var j = 0; j < img.length-1; j++) {
										if (img[j].tagName=="IMG") break;
									};
									if (j==img.length) break;	// No image in tile???
								
									if(dorp[a][1] != "none" && owner != player_name) {
								
										img[j].style.border = '1px solid ' + dorp[a][1];
										img[j].style.width = '51px';
										img[j].style.height = '36px';
									}

									if(dorp[a][3] == 'note' && owner != player_name){
							
										// JK new icons
											var icodiv = ce('div');
											icodiv.setAttribute('style', 'position: absolute; border: 1px solid #333; z-index: 1;background-color:red');
											icodiv.appendChild(createIcon(0));
											icodiv.style.left = (icodiv.offsetLeft + 15) + 'px';
											icodiv.style.top = (icodiv.offsetTop + 10) + 'px';
											vil=link.FirstChild;
											link.insertBefore(icodiv, vil);
									} 
								}
							}
						}	
					}
				}

			}
			if (!debug || typeof TBRtime != 'undefined') {
				state=addState('','none');
			} else {
				state=addState("(generated in "+TBRtime+"s)",'block');
			}
		}
	}
	});
}

function do_report(mode) {
logMsg('do_report: '+mode);
	var aanvaller=verdediger=village=aantal=verliezen=village=datum='';
	
	if (mode=='public') {
		report=url.match(/public_id=(.*$)/)[1];
		heads = [doc.getElementsByTagName('h3'), doc.getElementsByTagName('h4')];
			/*	Public: H1 H3{onderwerp} H4{datum} H3{uitslag} H4{gelukkop} t#attack_luck t#attack_moral br
			           #attack_info_att{#attack_info_att_units} #attack_info_def{#attack_info_def_units} 
					   H4{spionagekop} t#attack_spy t#attack_results br
				Heads: H3-H4-H3-H4-..-H4 = [(H3:)[onderwerp,uitslag],(h4:) [datum/tijd],geluk_head,spionage_head]] 
				Tables: #attack_luck, #attack_moral, #attack_info_att, #attack_info_def, attack_spy, attack_results,
				           #attack_info_att_units, #attack_info_def_units */
		onderwerp = heads[0][0].innerHTML;
		datum = heads[1][0].innerHTML;
	} else if (mode=='report') {
				/* report: 	t#1{th{Onderwerp} td{datum} {t#2}} 
					t#2:H3{uitslag} H4{gelukkop} t#attack_luck t#attack_moral br
						#attack_info_att{#attack_info_att_units} #attack_info_def{#attack_info_def_units} 
						H4{spionagekop} t#attack_spy t#attack_results br */

		report=url.match(/view=(\d+)/)[1];
		th = doc.getElementsByTagName('th');
		var rt;
		onderwerp=$.trim($('th:contains("'+txtDB['subject']+'") + th').text());
		datum=parse_date($('td:contains("'+txtDB['send_at']+'") + td').text());
	}
	if(tr=doc.getElementById('attack_info_att')) {
		tr=tr.rows;
		if (tr[0].cells[0].textContent==txtDB["attacker"]) {
			if (lang=='nl') {
				var aanvaller = tr[0].cells[1].innerHTML.match( /info_player&amp;(t=\d+&amp;)?id=([^"]+)/ )[2];
			} else {
				var aanvaller = tr[0].cells[1].innerHTML.match( /id=(\d+)/ )[1];
			}
		}
		if (tr=doc.getElementById('attack_info_def')) {
			tr=tr.rows;
			for(var i=0, len=tr.length; i<len; i++) {
				c=tr[i].cells[0].textContent;
				if (c==txtDB["defender"]) {
					if (lang=='nl') {
						verdediger = tr[i].cells[1].innerHTML.match( /info_player&amp;(t=\d+&amp;)?id=([^"]+)/ );
						verdediger = verdediger ? verdediger[2] : '';
					} else {
						var verdediger = tr[i].cells[1].innerHTML.match( /id=(\d+)/ );
						verdediger = verdediger===null ? '' : verdediger[1];
					}
				} else 	if (c == txtDB["target"]) {
					village = tr[i].cells[1].textContent;
					village = (tmp=village.match( /(\d+\|\d+)/ )) ? tmp[1] : '';
				}
			}
		}
		
		if (tr=doc.getElementById('attack_info_def_units')) {
			tr=tr.rows;
			for(var i=0, len=tr.length; i<len; i++) {
				c=tr[i].cells[0].textContent;
				if (c == txtDB["troops"]) {
					aantal="";
					for (a = 1, clen=tr[i].cells.length; a < clen; a++) {
						if(n=tr[i].cells[a].innerHTML) {
							aantal +=  "|" + n;
						}
					}
				} else if (c == txtDB["losses"]) {
					verliezen="";
					for (a = 1, clen=tr[i].cells.length; a < clen; a++) {
						if(n=tr[i].cells[a].innerHTML) {
							verliezen +=  "|" + n;
						}
					}
				}
			}
		}
		/* Simple test for proper format, captures hidden troops (public reports) and unscouted defenders */
		if(!(aantal.match(/^(\|\d+){9,14}$/)))
			aantal='none';
		if(!verliezen.match(/^(\|\d+){9,14}$/))
			verliezen='none';
			
		if (debug) {
			logMsg(sprintf(txtDB['report_save'], report, datum, onderwerp, aanvaller, verdediger, village, aantal, verliezen));
		}

		state=addState("TBRMap",'block');
		request = {cmd: 'opslaan', player: player_id, tribe: tribe_id, world: world, 
				   onderwerp: onderwerp, datum: datum, aanvaller: aanvaller, verdediger: verdediger, village: village, aantal: aantal, verliezen: verliezen, 
				   report: report, version: config['version'], time: time};
		request.onload=function(req) {

				result=req.responseText;
				if((error=is_errormsg(result))!='') {
					debug=true;
					if (!error.match(txtDB["error_re"])) {
						logMsg(result);	/* log unknown messages at the bottom */
						result=txtDB["err_nosave"]+': '+error;
					}
					addState(error,'warn');
				} else {
					addState("TBRmap: "+result,'block');
				}

			};
		resp=do_request(request);
	} else {
		resp=txtDB['err_no_attack'];
	}

	addState('TBRMap: '+resp,'block');
}

function fillEditIframe(form, notetxt) {
	var ifr=document.getElementById('TBR_edit');
	if(!ifr) {
		var ifr=ce('iframe');				// Add hidden frame used by edit-form
		ifr.position="absolute";
		ifr.style.left='-1500px';
		ifr.width="0";
		ifr.height="0";
		ifr.id="TBR_edit";
		ifr.style.border=0;
		ifr.style.display='hidden';
		ifr.addEventListener("load", function(e){
				var ifr=e.currentTarget;
				if (ifr) {
					try {
						if (ifr.contentWindow.document.body) // fails for cross-domain iframe --> tbrmap closed the form
							TBR=doc.getElementById('TBRMap').style.display=nohide?'block':'none';	// save completed
					}
					catch(er){
						var noteframe=document.getElementById('TBR_edit');
						noteframe.src='about:blank';	// Restore my domain to the iframe
					};
				}
			}, false);
		document.getElementById('edit_note2').appendChild(ifr);
		}

	try{inote=ifr.contentWindow.document.body}
	catch(e){
		alert('Out of my control!');
		return;
	}
	inote.style.margin='0px';
	inote.appendChild(form);
	inote.firstChild.firstChild.value=notetxt; // firefox doesn't clone the value of the textarea
	return ifr;
}

function createEditForm(action,txt){
	var form,txta,btn,btn2;

	form=document.createElement('form');
	form.id='TBR_form';
	form.method='POST';
	form.action=action;
	form.appendChild(texta=ce('textarea'));
	texta.name='note';
	texta.id='notefield';
	texta.cols=90;	// 110 is too big?
	texta.rows=12;

	texta.value=txt;
	form.appendChild(ce('br'));
	btn=ce('button');
	btn.type='submit';
	btn.value=btn.name='Bewerk';
	btn.id='SetNote';
	btn.appendChild(document.createTextNode('Ok'));
	form.appendChild(btn);
	
	btn2=ce('button')
	btn2.type='submit';
	btn2.value='Verwijder';
	btn2.appendChild(document.createTextNode('Verwijder'));
	btn2.name='delete';
	btn2.style.display=nohide?'block':'none';
	btn2.id='DelNote';
	form.appendChild(btn2);
	return(form);
}
		
function do_info_village () {
	h2s = doc.getElementsByTagName('h2');

	for(var i=0; i<h2s.length; i++) {
	
		if(h2s[i].firstChild.nodeValue.match(txtDB["village_re"])) {

			table = h2s[i].parentNode.getElementsByTagName('table')[0];
			td = table.getElementsByTagName('td');
			c_village = td[1].innerHTML;
			c_owner = td[5].textContent;
			if(c_owner != player_name) {
				state=addState(txtDB['msg_load'],true);

				host = config['info'];
				host += 'tribe=' + tribe_id;
				host += '&player=' + player_id;
				host += '&world=' + world;
				host += '&village=' + c_village;
				host += '&v=' + config['version'];
				host += '&t=' + time;

				if(debug) {
					logMsg('xmlrequest: '+host);
				}

				my_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {
					TBR=doc.getElementById('TBRMap');
					result=req.responseText;
					if((error=is_errormsg(result))!='') {
						debug=true;
						if (!error.match(txtDB["error_re"])) {
							//addState(txtDB['err_noinfo']+error,'warn');
							addState(error,'warn');
							logMsg(result);	/* log unknown messages at the bottom */
						} else {
							addState(error,'warn');
						}
					} else {
						html=req.responseText;
						if (resp=html.match(/^([A-Za-z]+)\|(.*)$/)) {
							if (resp[1]=='stored') {
								editToggle('edit_note', 'TBR_note_span');
								addState(txtDB['msg_save'],block);
							} else {
								addState(resp[1],block);
							}
							return;
						}
						//if (debug) {logMsg("ResponseText="+req.responseText);}
						var gentime=html.match(/generated in .* ms/);
						if(debug && gentime) {
							addState(gentime[0],'block');
						} else {
							addState('','none');
						}
						/*  cleanup serverresponse to re-arrange the tables - html has been parsed by the browser (i.e. TBODY added) */
						html = html.replace(/<\/tr>\s*<\/tr>/i,"</tr>"); // invalid double close of tr
						html = html.replace(/<\/table>\s?<\/table>\s?<table/i, "</table></td></tr></table><table"); // add closing td+tr
						
						html = html.replace(/(?:<\/TBODY>)?<\/TABLE><B>.*<\/B><TABLE class="vis">/i,'<tr><td colspan="2"><table id="TBR_info_def_units" class="vis">'); // Link tables
						html = html.replace(/<\/TABLE><TABLE/i,'</TABLE></TBODY></TABLE> <TABLE');
						html = html.replace(/ align="right"/gi,'');
						html = html.replace(/class="vis" width="100%"/gi,'class="vis left" width="28%" style="margin-right:10px;"'); // reduce width

						var new_span=ce('span');
						new_span.style.display=nohide?'block':'none';
						new_span.id='TBR_data';
						new_span.innerHTML=html;
						table.parentNode.insertBefore(new_span,table.parentNode.lastChild.previousSibling.previousSibling.previousSibling.previousSibling);
						
						// Enrich units-table
						//var tabs=new_span.getElementsByTagName('table');
						var tabs=document.getElementById('TBR_data').getElementsByTagName('table');
						tabs[0].id="TBR_info_def";
						tabs[0].rows[0].cells[0].innerHTML=txtDB['hd_troopinfo'];
						if (c_owner == player_name) {
							tabs[0].style.display=nohide?'block':'none';
						} else {
							if (tabs.length==3) { // Only if 3 tables present: info_def, info_def_units & note
								c=tabs[1].getElementsByTagName('td');
								for (var i=0,l=c.length;i<l;i++) {
									if (c[i].textContent==0) c[i].className='hidden';
								}
							}						
						}
						
						// Prettify Note & prepare editform + iframe
						if (note=document.getElementById("note")) {
							note.width="80%"; 
							note.setAttribute('class','vis left');
							note=document.getElementById("note");
							note.rows[0].cells[0].colSpan='';
							var nlink = ce('a');
							nlink.className='small';
							nlink.href='#';
							nlink.appendChild(doc.createTextNode(txtDB["btn_edit"]));
							nlink.id='btnedit';
							var nlink2 = nlink.cloneNode(true);
							nlink.addEventListener('click', function(e) {
									e.preventDefault();
									if (typeof unsafeWindow!='undefined') {
										unsafeWindow.editToggle('TBR_note_span', 'edit_note'); 
									} else {
										editToggle('TBR_note_span', 'edit_note');
									}
									this.style.display=nohide?'block':'none';
								}, false);
							nlink2.firstChild.data=txtDB["btn_del"];
							nlink2.id='btndel';
							nlink2.addEventListener('click', function(e) {
									e.preventDefault();
									var ifr=document.getElementById('TBR_edit');
									if (ifr===null || ifr.contentWindow.document.body.childElementCount==0) {
										ifr=fillEditIframe(document.getElementById('TBR_form').cloneNode(true));
									}
									inote=ifr.contentWindow.document.body;
									try {myRequest={Num: 0, State: 1, Request: {}, Response: '', iframe: ifr, onload: onStore};}
										catch(er){alert('cant set myRequest');};
									inote.getElementsByTagName('Button')[1].click();
									document.getElementById('TBR_note_span').firstChild.innerHTML=txtDB['msg_nonote']; // TOFIX: edit form is not cleared
								}, false);		
							var ncell=ce('th');
							ncell.style.textAlign="right";
							ncell.appendChild(nlink);
							ncell.appendChild(document.createTextNode(' '));
							ncell.appendChild(nlink2);
							note.rows[0].appendChild(ncell);
							
							var action=note.rows[1].cells[0].firstChild.href; // Get POST link for action
							note.deleteRow(1);									// Remove 'Bewerk' button
							
							notetxt=note.rows[1].cells[0].innerHTML;		// Get text of note
							note.rows[1].cells[0].innerHTML=notetxt.replace(/Geen notitie./,txtDB['msg_nonote']);
							note.rows[1].id="TBR_note_span";
							note.rows[1].cells[0].colSpan=2;
							
							var espan=ce('span');
							espan.id="edit_note2";
							espan.style.display="hidden"; // placeholder for edit-iframe
							// Append to document
							note.insertRow(2).insertCell(0);

							note.rows[2].cells[0].appendChild(espan);
							note.rows[2].cells[0].colSpan=2;
							note.rows[2].style.display='block';

							notetxt=notetxt.replace(/<br( \/)?>/gi,"\n");	// re-insert linebreaks (using browsers html style)
							notetxt=notetxt.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/^Geen notitie.$/,'');
							var form=createEditForm(action,notetxt);

							note.insertRow(3).insertCell(0);
							note.rows[3].cells[0].colSpan=2;
							note.rows[3].cells[0].appendChild(form);
							note.rows[3].style.display=nohide?'block':'none';
							note.rows[3].id='edit_note';
							var btn=document.getElementById('SetNote');
							/* Intercept Ok button: copy form to iframe, press Ok there - prevents closing of window */
							btn.addEventListener('click', function(e) {
									e.preventDefault();
									TBR=document.getElementById('TBRMap');
									TBR.firstChild.nodeValue=txtDB['info_saving'];
									TBR.style.display='block';
									myRequest={Num: 0, State: 1, Request: {}, Response: '', iframe: null, onload: onStore};
									form=document.getElementById('TBR_form');
									notetxt=form.firstChild.value;
									if(!nohide) {
										if (typeof unsafeWindow == 'undefined') {
											editToggle('edit_note', 'TBR_note_span');
										} else {
											unsafeWindow.editToggle('edit_note', 'TBR_note_span');
										}
									}

									document.getElementById('btnedit').style.display='';
									form.firstChild.value=notetxt.replace(/^\s\s*/,'').replace(/\s*\s$/,'');
									document.getElementById('TBR_note_span').firstChild.innerHTML=notetxt.replace(/\n/gm,'<br />');
									fillEditIframe(form.cloneNode(true),notetxt);					// Complete form in hidden iframe, for submits
									var inote=document.getElementById('TBR_edit').contentWindow.document;
									ifr=document.getElementById('TBR_edit');

									ifr.contentWindow.document.getElementsByTagName('Button')[0].click();
								}, false);
						}
						new_span.style.display='';
						
					}
				}
				});

			}
		}
	}
}

var get_gamedata = function() {		// Google Chrome / Webkit
	// Check for greasemonkey sandbox
	if (typeof doc.head=='object') {
		//if (debug) logMsg('Google Chrome detected'); 
		var nodes=doc.head.childNodes;
		for (n=0;n<nodes.length;n++) {
			if (nodes[n].type=='text/javascript' ) {
				if (nodes[n].text.match('game_data')) {
					eval(nodes[n].text);
				}
				if (nodes[n].src.match(/\/js.php\?jquery/)) {
					// load jquery into content box
				}	
			}
		}
		gd=game_data;
	} else if (typeof unsafeWindow == 'object') { // Firefox+greasemonkey
		if (debug) logMsg('Greasemonkey detected');
		gd=unsafeWindow.game_data;					/* Break out of greasemonkey sandbox */
		$=unsafeWindow.$;
		jQuery=unsafeWindow.jQuery;
	} else {		// Opera
		//if (debbug) logMsg('No greasemonkey sandbox');
		gd=win.game_data;
	}
}	

/* Main */
var url=location.href;
if (url.match(/http:\/\/.*\.tribalwars\./)) {
	var win=window.main?window.main:window,
		doc=win.document,
		url = doc.URL,
		gd=[],
		player_id,player_name,tribe_id,world,lang='nl';

	if (url.match('&debug')) debug=true;
	if (url.match('&nohide')) nohide=true;
	
	get_gamedata();
	if (typeof gd=='undefined') {
		if (doc.title==txtDB[lang]["expired"])
			return;
	}
	if (!gd.screen.match(/(map|report|info_village)/))
		return;
	time = parseInt(new Date().getTime().toString().substring(0, 10));

	logMsg("TBRmap v"+config['client']);
	logMsg("Browser: "+navigator.userAgent);
	if (typeof jQuery!='undefined') {
		if (debug) logMsg('jQuery v'+jQuery.fn.jquery);
	} else {
		if (debug) logMsg('jQuery not available');
		$=function(s){alert('jQuery unsupported (arg='+s+')')};
	}
	get_settings();
	txtDB=txtDB[lang];
	logMsg(sprintf(txtDB["msg_settings"],txtDB["lang"],tribe_id));
	logMsg('screen='+gd.screen+' mode='+gd.mode);
	logMsg('url='+url);

	if (tribe_id==0) {
		logMsg(txtDB["msg_notribe"]);
		return;
	};
	if (gd.screen=='map') {
		do_map();
	} else if (gd.screen=='report') {
		if (gd.mode=='view_public_report') {
			do_report('public');
		} else if (url.match(/view=/)) {
			do_report('report');
		}
	} else if (gd.screen=='info_village') {
		do_info_village();
	}
} else if (url.match(/http:\/\/tbrmap.twmerge.nl\//)) {	// Pass on server responses to the client with iframe communication 
	var par = (typeof unsafeWindow!='undefined') ? unsafeWindow.parent : window.parent;
	if (par != self) {	/* Is this a iframe ? */
		var server='*',
			serverlist={"nl":"nl%d.tribalwars.nl", "zz":"zz%d.beta.tribalwars.net", "en":"en%d.beta.tribalwars.net", "jk":"localhost"},
			lang='nl',
			world=url.match(/world=([a-z]+)(\d+)/);
		if (world) {
			server='http://'+serverlist[world[1]].replace(/%d/,world[2]);
			lang=world[1];
		};
		if (url.match(/(map|opslaan)\.(php|html)/)) {
			par.postMessage(document.body.textContent, server);
		} else if (url.match(/info\.(php|html)/)) {
			par.postMessage(document.body.innerHTML, server);
		} else if (url.match(/note\.(php|html)/)) {
			// inject message parser into page
			if (url.match(/close/)) {		/* Intercept close, which is triggered by saving or deleting a note */
				resp='stored|';			
			} else {
				resp='error|'+document.body.textContent;
			}
			par.postMessage(resp, server);
		} else {
			//if (debug) { alert('Unknown tbrmap API: url='+url); } //TODO: naar kijken
		}
	}
}

})();}
