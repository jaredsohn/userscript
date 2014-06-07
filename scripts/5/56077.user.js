// ==UserScript==
// @name		Travian under-attack check T3.5
// @description	Travian under-attack check T3.5
// @author		m4rtini (original), j000 (T3.5)
// @namespace	T3.5
// @version		1.0
// @source		http://userscripts.org/scripts/show/49647
// @identifier	http://userscripts.org/scripts/show/49647.user.js
// @license		Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://www.travian*.*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==

//----------------------------------------
var logLvl = 0; //0 - errors, 1 - imporant info, 2 - debug
//time in minutes between checks. USE RANDOM! It makes it doesn't look like the script.
//10 + Math.floor(Math.random()*5) will check for attacks between 10 and 15 minutes
var timetocheck = 5 + Math.floor(Math.random()*5); 
//var soundUrl = "http://simplythebest.net/sounds/WAV/WAV_files/cartoon_WAV_files/bunny_troubles.wav";
var soundUrl = "http://simplythebest.net/sounds/WAV/sound_effects_WAV/sound_effect_WAV_files/boat_horn.wav";
//----------------------------------------
//ADVANCED: Allow you to run a external script\page when you are under attack. feks you could call your own email script.  [fullInfo] in postdata will be replaced with info on attacks.
var externalUrl = '';
var externalPostData = {};
/*Postdata:
{fieldname1:value1, fieldname2:value2}
i.e.:
{ 'email':'travian@test.nonexisting.mail.com',
'msg':'Your Village is under attack! [fullInfo]',
'u':'ghgdhg' }
*/
//end of config :)
//----------------------------------------
var attacked = false;
var runEveryTime = false;
var sounds_enabled = true;
var freezeWhenCheck = true;
var soundstogglevis = true;
var villageName = "";
var villageNameA = "";
var arrivalTime =  "";
var fullInfo = "";

var tot = 0;
var params = new Array();
params[0] = ""; //assuming only 1 village
var active;
var infobar;
var server = '';
var lang = '';
var player = '';
var ua = (navigator.userAgent) ? navigator.userAgent : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; pl-PL; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11';
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
//----------------------------------------
var xLang = {
	'disable' : 'Disable sounds',
	'enable' : '<span style="background-color: #71D000 !important; color: #FFFFFF !important;">Enable sounds</span>',
	'check' : 'Check attacks'
};
//----------------------------------------

var styles = '.FreezePaneOff {\
		visibility: hidden;\
		display: none;\
		position: absolute;\
		top: -100px;\
		left: -100px;\
	}\
	.FreezePaneOn {\
		position: absolute;\
		top: 0px;\
		left: 0px;\
		visibility: visible;\
		display: block;\
		width: 100%;\
		height: 100%;\
		background-color: #666;\
		z-index: 999;\
		filter:alpha(opacity=85);\
		-moz-opacity:0.85;\
		padding-top: 20%;\
	}\
	.infobar {\
		font-weight: bold;\
		color: #FF8000;\
	}\
	.InnerFreezePane {\
		text-align: center;\
		width: 66%;\
		background-color: #171;\
		color: White;\
		font-size: large;\
		border: dashed 2px #111;\
		padding: 9px;\
	}';

//----------------------------------------

function check(nr) {
	url = "http://" + document.domain + "/dorf1.php" + params[nr];
	_(1, 'Checking '+nr+': '+url);
	send(url,function(responseDetails) {
			pulled = document.createElement('div');
			pulled.innerHTML = responseDetails.responseText;
			if (checkImg(pulled)) {
				attacked = true;
				getAttackInfo(pulled);
				var msg ='<span style="color:#71D000" title="'+fullInfo+'">' + villageName + '...';
				/*if (sounds_enabled)
					msg += "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false>";*/
				msg += "</span>";
				infobar.innerHTML = msg;
			}
			if (tot == nr) {
				last(++nr);
			} else {
				check(++nr);
			}
		});
}

function last(nr) {
	if (active) {
		temp = active.href.split("?")[1].split('&');
		lastlink = temp[0];
		url = "http://" + document.domain + "/dorf1.php?" + lastlink;
		_(1, 'Checking '+nr+' last: '+url);
		send(url, function(responseDetails) {
				pulled = document.createElement('div');
				pulled.innerHTML = responseDetails.responseText;
				FreezeScreen('', false);
				if (checkImg(pulled)) {
					attacked = true;
					getAttackInfo(pulled);
					var msg ='<span style="color:#FF0000" title="'+fullInfo+'">' + villageNameA + ' Under attack!</span>';
					if (sounds_enabled)
						msg += "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false>";
					infobar.innerHTML = msg;
				} else if (!attacked) {
					infobar.innerHTML ='<span style="color:#00CC00">No attacks found! lucky you =)</span>';
				} else {
					var msg ='<span style="color:#FF0000" title="'+fullInfo+'">' + villageNameA + ' Under attack!</span>';
					if (sounds_enabled)
						msg += "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false>";
					infobar.innerHTML = msg;
				}
				FreezeScreen('', false);
				setCookie('lastInfo', infobar.innerHTML.replace(/<embed[^>]+>/, ''));
				external2(attacked);
			});
	} else {
		FreezeScreen('', false);
		if (!attacked) {
			infobar.innerHTML ='<span style="color:#00CC00">No attacks found! lucky you =)</span>';
		} else {
			var msg ='<span style="color:#FF0000" title="'+fullInfo+'">' + villageNameA + ' Under attack!</span>';
			if (sounds_enabled)
				msg += "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false>";
			infobar.innerHTML = msg;
		}
		setCookie('lastInfo', infobar.innerHTML.replace(/<embed[^>]+>/, ''));
		external2(attacked);
	}
}

function checkImg(doc) {
	tag = find(".//img[contains(@class,'att1')]",XPList, doc);
	if (tag.snapshotLength) {
		_(2, 'Found att1 attack!');
		return true;
	}
	tag = find(".//img[contains(@class,'att3')]",XPList, doc);
	if (tag.snapshotLength) {
		_(2, 'Found att3 attack!');
		return true;
	}
	_(2, 'No attacks found');
	return false;
}

function addDiv() {
	var div = document.createElement("div");
	div.setAttribute('align', 'center');
	div.setAttribute('id', 'FreezePane');
	div.setAttribute('class', 'FreezePaneOff');
	div.innerHTML = '<div id="InnerFreezePane" class="InnerFreezePane">Test</div>';
	document.body.insertBefore(div, document.body.firstChild);
}

function addInfobar() {
	infobar = document.createElement('div');
	infobar.setAttribute('class', 'infobar');
	infobar.innerHTML = '<span style="color:#00CC00">O.o</span>';
	document.getElementById('side_info').appendChild(infobar);
}

function FreezeScreen(msg, state) {
	scroll(0,0);
	var outerPane = document.getElementById('FreezePane');
	var innerPane = document.getElementById('InnerFreezePane');
	if (state) {
		if (outerPane) outerPane.className = 'FreezePaneOn';
		if (innerPane) innerPane.innerHTML = msg + '<button id=\"closeFreeze\" >X</button>';
		var button = document.getElementById('closeFreeze');
		button.addEventListener("click", function(){ FreezeScreen('', false)}, true);
	} else {
		if (outerPane) outerPane.className = 'FreezePaneOff';
		if (innerPane) innerPane.innerHTML = '';
	}
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function underAttackCheck (forced) {
	var sounds_enabled = getCookie('attacksounds', true);
	var timer = parseInt(getCookie('check_timer', 0));
	var now = new Date().getTime();
	var exptime = (timer + timetocheck*60000);
	now = "" + now;
	if (exptime < now || forced == true) {
		villageName = "";
		villageNameA = "";
		arrivalTime =  "";
		fullInfo = "";
		setCookie('check_timer', now);
		var msg = 'Checking for attacks:<br>Wait a few seconds depending on internet/system speed';
		infobar.innerHTML = '<span style="color:#FFCC00">'+msg+'</span>';
		if (freezeWhenCheck)
			FreezeScreen(msg, true);
		check(0);
	}
}

function getActiveVillage(doc, a) {
	tag = find(".//td[@class='dot hl']/following-sibling::td//a[contains(@href,'newdid')]", XPFirst, doc);
	if (tag) {
		if (a)
			return '<a href="'+tag+'">'+tag.innerHTML+"</a>";
		return tag.innerHTML;
	}
	_(1, 'No active village!');
	return "";
}

function showTime(what) {
	if (what) {
		var d = new Date();
		what = what.split(':');
		d.setHours(d.getHours() + parseInt(what[0]));
		d.setMinutes(d.getMinutes() + parseInt(what[1]));
		d.setSeconds(d.getSeconds() + parseInt(what[2]));
		return (d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
	}
}

function getArrivalTime(doc) {
	tag = find(".//table[@id='movements']", XPFirst, doc);
	if (tag) {
		rows = tag.getElementsByTagName("tr");
		for (x=1; x<rows.length; ++x) {
			cells = rows[x].getElementsByTagName("td");
			if (cells && cells[0].innerHTML.search('att1') > 0) {
				arrival = find(".//span[@id='timer2']", XPFirst, cells[1]);
				if (arrival) {
					return arrival.innerHTML;
				} else {
					_(2, 'getArrivalTime: arrival = null');
				}
			}
		}
	} else {
		_(2, 'getArrivalTime: tag = null');
	}
}

function external() {
	if (externalUrl != '')
		_(1,'Sending external...');
		send(externalUrl, function(responseDetails) {
				//pulled = document.createElement('div');
				//pulled.innerHTML = responseDetails.responseText;
				_(1,'External request returned ' + responseDetails.status +
					' (' + responseDetails.statusText + ')');
					//\n\n' +'Feed data:\n' + responseDetails.responseText);
			}, externalPostData);
}

function external2(underAttack) {
	flag = getCookie('underAttackFlag', false);
	_(2, 'External2: '+(underAttack ? 'underAttack' : 'NOT underAttack')+' & '+(flag ? 'flag set' : 'flag NOT set')+(runEveryTime ? ' & runEveryTime' : ''));
	if (flag && !underAttack) {
		setCookie('underAttackFlag', false);
	} else if (!flag && underAttack) {
		setCookie('underAttackFlag', true);
		external();
	} else if (runEveryTime && underAttack) {
		external();
	}
}

function reload() {
	_(1,'Reloading...');
	if (active) {
		_(2, 'Using active village');
		location.href = active.href;
	} else {
		_(2, 'Using address bar');
		//this reloading method avoids the browser asking whether to submit form again
		/*send("http://google.com", function(responseDetails)  {
				tmp = location.href.indexOf('#');
				if (tmp > 0) {
					location.href = location.href.substring(0, tmp);
				} else {
					location.href = location.href;
				}
			});*/
		tmp = location.href.indexOf('#');
		if (tmp > 0) {
			location.href = location.href.substring(0, tmp);
		} else {
			location.href = location.href;
		}
	}
}

function getAttackInfo(code) {
	if (villageName.length > 0) {
		var tmp = getArrivalTime(code);
		var tmp2 = getActiveVillage(code, false);
		villageName += ', ' + tmp2;
		villageNameA += ', '+getActiveVillage(code, true);
		arrivalTime += ', ' + tmp;
		fullInfo += ', ' + "\r\n" + tmp2 + ' - ' + showTime(tmp) + ' (in '+tmp+')';
	} else {
		villageName = getActiveVillage(code, false);
		villageNameA = getActiveVillage(code, true);
		arrivalTime = getArrivalTime(code);
		fullInfo = villageName + ' - ' + showTime(arrivalTime) + ' (in '+arrivalTime+')';
	}

}

//----------------------------------------

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	window[key] = getCookie(key, defaultValue);
	GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
		setCookie(key, !window[key]);
		//location.reload();
		reload();
	});
}

function soundstoggle() {
	sounds_enabled = !sounds_enabled;
	setCookie('attacksounds', sounds_enabled);
	if (sounds_enabled) {
		this.innerHTML = xLang['disable'];
	} else {
		this.innerHTML = xLang['enable'];
	}
}

function find(xpath, xpres, startnode) {
	if (!startnode) {
		startnode = document;
	}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}

function getCookie(name, defval) {
	return GM_getValue(lang+'.'+server+'_'+player+'_'+name, defval);
}

function setCookie(name, val) {
	return GM_setValue(lang+'.'+server+'_'+player+'_'+name, val);
}

function _(lvl, msg) {
	if (lvl <= logLvl)
		GM_log(msg);
}

function send(url, callback, postfields) {
	var options = {
		'url':url,
		'method':( !postfields ? 'GET' : 'POST' ),
		'headers':{
		'User-Agent':ua
		},
		'onload':function(e) {
			callback(e);
		},
		'onerror':function(e) {
			callback(e);
		}
	};
	if (!!postfields) {
		var postdata = '';
		for ( n in postfields ) {
			postdata += '&' + n + '=' + encodeURIComponent(postfields[n].replace('[fullInfo]',fullInfo));
		}
		postdata = postdata.substr(1);
		options.headers["Content-type"] = "application/x-www-form-urlencoded";
		options.headers["Content-length"] = postdata.length;
		options.data = postdata;
	}
	GM_xmlhttpRequest(options);
}

//Create link on the left side for check and deactivate sounds.
function mainFunc() {
	//get server
	location.href.search(/http:\/\/(.*)\//);
	var crtServer =  RegExp.$1.split(".");
	server = crtServer[0];
	lang = crtServer[crtServer.length - 1];
	if (server && lang)
		_(2, 'Server: '+server+', language: '+lang);
	else
		_(0, 'Unable to find server and language!');
	//get userID
	var uLink = find("//div[@id='sleft']//a[contains(@href, 'spieler.php')]", XPFirst);
	if (uLink) {
		player = uLink.href.split("uid=")[1];
		_(2, 'Player ID: '+player);
	} else {
		_(0, 'Unable to find player ID!');
	}

	addGlobalStyle(styles);
	addDiv();
	addInfobar();
	lastInfo = getCookie('lastInfo', '<span style="color:#00CC00">O.o</span>');
	infobar.innerHTML = 'Old: '+lastInfo;
	
	sounds_enabled = getCookie('attacksounds', sounds_enabled);
	soundstogglevis = getCookie('soundstogglevis', soundstogglevis);
	runEveryTime = getCookie('runEveryTime', runEveryTime);
	freezeWhenCheck = getCookie('freezeWhenCheck', freezeWhenCheck);
	active = find(".//td[@class='dot hl']/following-sibling::td//a[contains(@href,'newdid')][count(*)=0]", XPFirst);
	if (active)
		_(2, 'Active village: '+getActiveVillage(document,false)+' ('+active+')');
	else
		_(2, 'Only one village');
	tag = find(".//td[not(@class='dot hl')]/following-sibling::td//a[contains(@href,'newdid')][count(*)=0]", XPList);
	if (tag.snapshotLength) {
		for (var i=0; i < tag.snapshotLength; ++i) {
			params[i] = '?'+tag.snapshotItem(i).href.split('?')[1].split('&')[0];
		}
		params.sort(function() {return (0.5 - Math.random())});
		tot = params.length;
		_(2,tot+' village links: '+params);
		--tot;
	}
	
	//menu stuff
	menu = find("//div[@id='sleft']/p", XPList);
	menu = menu.snapshotItem(menu.snapshotLength-1);
	if (menu) {
	
		menu.appendChild(document.createElement('HR'));
		
		link = document.createElement('a');
		link.href = '#';
		link.innerHTML = xLang['check'];
		link.addEventListener('click', function() {underAttackCheck(true);}, true);
		menu.appendChild(link);
		
		if (soundstogglevis) {
			link = document.createElement('a');
			link.href = '#';
			if (sounds_enabled) {
				link.innerHTML = xLang['disable'];
			} else {
				link.innerHTML = xLang['enable'];
			}
			link.addEventListener('click', soundstoggle, true);
			menu.appendChild(link);
		}
	} else {
		_(0,"Unable to find travian menu!");
	}
	underAttackCheck(false);
	
	makeMenuToggle('soundstogglevis', true, 'Enable easy sound setting', 'Disable easy sound setting', 'TUAC');
	if (!soundstogglevis)
		makeMenuToggle('attacksounds', true, 'Enable sounds', 'Disable sounds', 'TUAC');
	makeMenuToggle('freezeWhenCheck', true, 'Freeze when checking', 'Don\'t freeze when checking', 'TUAC');
	if (externalUrl != '')
		makeMenuToggle('runEveryTime', true, 'Run external script every time', 'Don\'t run external script every time', 'TUAC');
	window.setInterval(underAttackCheck, 30000);
	window.setInterval(reload, 20*60000);
}

if (window.addEventListener) {
	window.addEventListener('load', mainFunc, false);
} else {
	window.attachEvent('onload', mainFunc);
}
