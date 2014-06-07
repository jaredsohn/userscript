// ==UserScript==
// @name			nargile Beyond
// @version			kazikazan
// @date			28-08-2011
// @author			Nargileci<info@mailyok.com>
// @license			GNU General Public License v3
// @namespace			v3.omertabeyond.com
// @homepageURL			http://www.omertabeyond.com/
// @description			Omerta Beyond 1.9.3 (Still the best 'legal' script! ;))
// @icon			http://www.omertabeyond.com/html/images/favicon.png
// @screenshot			http://dump.omertabeyond.com/images/875sshot_0019.png
// @require			http://www.omertabeyond.com/releases/1.9.3.93/scripts/libs.js
// @require			http://www.omertabeyond.com/releases/1.9.3.93/scripts/settings.js
// @require			http://www.omertabeyond.com/releases/1.9.3.93/scripts/langs.js
// @resource	css		http://www.omertabeyond.com/releases/1.9.3.93/scripts/beyond.css
// @resource	trash		http://www.omertabeyond.com/releases/1.9.3.93/images/del.png
// @resource	colorpicker	http://www.omertabeyond.com/releases/1.9.3.93/images/colorpicker.gif
// @resource	comLogo		http://www.omertabeyond.com/releases/1.9.3.93/images/logo-com.png
// @resource	dmLogo		http://www.omertabeyond.com/releases/1.9.3.93/images/logo-dm.png
// @resource	nlLogo		http://www.omertabeyond.com/releases/1.9.3.93/images/logo-nl.png
// @resource	buttonMenu	http://www.omertabeyond.com/releases/1.9.3.93/images/menu.png
// @resource	buttonKey	http://www.omertabeyond.com/releases/1.9.3.93/images/key.png
// @resource	buttonReset	http://www.omertabeyond.com/releases/1.9.3.93/images/reset.png
// @resource	favoriteIco	http://www.omertabeyond.com/releases/1.9.3.93/images/favicon.png
// @resource	updateIco	http://www.omertabeyond.com/releases/1.9.3.93/images/updateicon.png
// @resource	brcGear		http://www.omertabeyond.com/releases/1.9.3.93/images/brcgear.png
// @resource	deleteIcon	http://www.omertabeyond.com/releases/1.9.3.93/images/deleteicon.png
// @resource	reply		http://www.omertabeyond.com/releases/1.9.3.93/images/reply.png
// @resource	loading		http://www.omertabeyond.com/releases/1.9.3.93/images/loading.png
// @resource	nickreader	http://www.omertabeyond.com/releases/1.9.3.93/images/magnifier.png
// @resource	finfavi		http://www.omertabeyond.com/releases/1.9.3.93/images/finfavi.ico
// @include			http://gm.omertabeyond.com/*.php*
// @include			http://www.omertabeyond.com/html/poll/poll.php*
// @include			http://www.omerta3.com/*
// @include			http://omerta3.com/*
// @include			http://www.barafranca.com/*
// @include			http://barafranca.com/*
// @include			http://www.barafranca.us/*
// @include			http://barafranca.us/*
// @include			http://dm.barafranca.com/*
// @include			http://deathmatch.barafranca.com/*
// @include			http://www.barafranca.gen.tr/*
// @include			http://barafranca.gen.tr/*
// @include			http://89.149.221.178/~fingon/beyond.php*
// @exclude			http://gamewiki.barafranca.com/*
// @exclude			http://ircwiki.barafranca.com/*
// @exclude			http://*barafranca.*/front-mafia-list.php*
// ==/UserScript==

/*
$Rev$:  Revision of last commit
$Author$:  Author of last commit
$Date$:  Date of last commit
*/



//---------------------- ScratcherTheCode ---------- // ctrl F on 'scratcher' gave me too many results
if ((dlp == '/scratch.php' || dlp == '/iminjail.php?redirect=/scratch.php') && prefs[33]) {
	var on = getValue('on', 0);
	var unopened = getValue('unopened', 0)
	var monin = getValue('monin', 0);
	var mils = getValue('mils', 0);
	var bullets = getValue('bullets', 0);
	var scratches = getValue('scratches', 0);

	if (db.innerHTML.indexOf(lang.scratcher[0]) != -1) { //grab winning event
		if (db.innerHTML.indexOf(lang.scratcher[1]) != -1) { //bullets
			var rex = new RegExp(lang.scratcher[2]);
			var r = db.innerHTML.match(rex);
			bullets += parseInt(r[1]);
			setValue('bullets', bullets);
		}
		if (db.innerHTML.indexOf(lang.scratcher[3]) != -1) { //money
			var rex = new RegExp(lang.scratcher[4]);
			var str = db.innerHTML.replace(/,/g, '');
			var r = str.match(rex);
			monin += parseInt(r[1]);
			setValue('monin', monin);
			if (parseInt(r[1]) == 1000000) {
				mils += 1;
				setValue('mils', mils);
			}
		}
	}

	if (db.innerHTML.indexOf(lang.scratcher[5]) != -1) { //grab scratching event
		scratches += 1;
		setValue('scratches', scratches);
		if (getELNAME('ver')[0] != null) {//focus on code
			getELNAME('ver')[0].focus();
		} else { //focus on check
			getELNAME('Check')[0].focus();
		}
	} else {
		if (getELNAME('codescratch')[0] != null) {//focus on unclaimed prices
			getTAG('input')[2].focus();
		} else if (getELNAME('scratch')[0] != null) { //focus on scratch
			getELNAME('scratch')[0].focus();
		}
	}

	if (db.innerHTML.indexOf(lang.scratcher[18]) != -1) { //grab 10 is enough event
		db.innerHTML = db.innerHTML + '<br /><a href=http://'+dlh+'/scratch.php>'+lang.scratcher[19]+'</a>';
		getTAG('a')[0].focus();
	}

	var monout = (scratches * 5000);
	if ((monin - monout) < 0) {
		var profit = '-$'+commafy(monout - monin);
	} else {
		var profit = '$'+commafy(monin - monout);
	}
	var ppk = Math.round(((monout - monin) / bullets) * 100000) / 100000;
	if (isNaN(ppk) || bullets == 0) {
		ppk = 0;
	}

	var div = cEL('div'); //build Scratcher Div
	div.id = 'info';
	div.setAttribute('class', 'NRInfo');
	div.setAttribute('style', 'position:fixed; bottom:20px; right:20px; width:250px; color:#FFF !important; background-color:'+getValue('titleBg', '#3F505F'));
	var divdump = '<center><b>'+lang.scratcher[6]+'</b></center><table width="100%"><tr><td bgcolor="gray"></td></tr></table><div id="statsscratcher">'+lang.scratcher[7]+' <font style="float:right"><b>'+commafy(scratches)+'</b></font><br />'+lang.scratcher[8]+' <font style="float:right"><b>$'+commafy(monout)+'</b></font><br />'+lang.scratcher[9]+' <font style="float:right"><b>$'+commafy(monin)+'</b></font><br />'+lang.scratcher[10]+' <font style="float:right"><b>'+profit+'</b></font><br />'+lang.scratcher[11]+' <font style="float:right"><b>'+commafy(mils)+'</b></font><br />'+lang.scratcher[12]+' <font style="float:right"><b>'+commafy(bullets)+'</b></font><br />'+lang.scratcher[13]+' <font style="float:right"><b>$'+commafy(ppk)+'</b></font></div><br />&nbsp;';

	divdump += '</div><div id="resetscratcher" align="right" style="position:absolute; padding:2px; bottom:3px; right:3px; border:2px solid grey; -moz-border-radius:7px" onmouseover="this.style.border=\'2px solid #BBB\'; this.style.cursor=\'pointer\';" onmousedown="this.style.marginLeft=\'2px\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px" /></div>';
	div.innerHTML = divdump;
	db.appendChild(div);

	if (on == 1) { //Scratcher Active
		if (db.innerHTML.indexOf('Sorry, but 10 per minute is enough.') != -1) { //LANG? (atm msg is langindependent: always en);
			msec = rand(8000, 13400);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else if (db.innerHTML.indexOf('504 Gateway Time-out') != -1 || db.innerHTML.indexOf('502 Bad Gateway') != -1 || db.innerHTML.indexOf('503 Service Unavailable') != -1 || db.innerHTML.indexOf('500 - Internal Server Error') != -1) {
			msec = rand(800, 1600);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else if (db.innerHTML.indexOf('<img src=/static/images/game/generic/criminal.jpg') != -1) {
			msec = rand(9800, 15200);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else if (db.innerHTML.indexOf('<img src="/static/images/userbadges/donateplus.png">') != -1) {
			msec = rand(11300, 14800);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else {
			msec = rand(1800, 2400);
			if (db.innerHTML.indexOf('color="red"') != -1 && getELNAME('codescratch')[0] != null) {
				setValue('unopened', 1);
				var t = setTimeout(function () { getTAG('input')[2].click(); }, msec);
			} else if (getELNAME('goback')[0] != null && unopened == 1) {
				var t = setTimeout(function () { getELNAME('goback')[0].click(); }, msec);
			} else {
				setValue('unopened', 0);
				if (getELNAME('goback')[0] != null && unopened == 0) {
					var t = setTimeout(function () { getELNAME('scratch')[0].click(); }, msec);
				} else if (getELNAME('Check')[0] != null) {
					var t = setTimeout(function () { getELNAME('Check')[0].click(); }, msec);
				} else {
					var t = setTimeout(function () { getELNAME('scratch')[0].click(); }, msec);
				}
			}
		}
	}

	getID('resetscratcher').addEventListener('click', function() {
		getID('resetscratcher').innerHTML = '&nbsp;<b style="line-height:16px">'+lang.scratcher[17]+'<b>&nbsp;';
		getID('statsscratcher').innerHTML = lang.scratcher[7]+' <font style="float:right"><b>0</b></font><br />'+lang.scratcher[8]+' <font style="float:right"><b>$0</b></font><br />'+lang.scratcher[9]+' <font style="float:right"><b>$0</b></font><br />'+lang.scratcher[10]+' <font style="float:right"><b>$0</b></font><br />'+lang.scratcher[11]+' <font style="float:right"><b>0</b></font><br />'+lang.scratcher[12]+' <font style="float:right"><b>0</b></font><br />'+lang.scratcher[13]+' <font style="float:right"><b>$0</b></font>';
		setValue('monin', 0);
		setValue('mils', 0);
		setValue('bullets', 0);
		setValue('scratches', 0);
	}, true);

}
