// ==UserScript==
// @name           Mousehunt AutoHorn
// @namespace      http://userscripts.org/scripts/show/74721
// @description    Longtail AutoHorn
// @version        4.2.1
// @include        http://*.mousehuntgame.com/*
// @include        https://*.mousehuntgame.com/*
// @exclude        http://*.mousehuntgame.com/images/*
// @exclude        https://*.mousehuntgame.com/images/*
// @grant          GM_getValue
// @grant          GM_setValue
// @require        http://code.jquery.com/jquery.min.js
// @author         are
// ==/UserScript==

/*  Global Variables  */
var defaultpage = 'http://www.mousehuntgame.com';
var hornpage = 'http://www.mousehuntgame.com/turn.php';
var origtitle = document.title;
var timerEvent;
var timerTitle;
var timerTrapCheck;
var waktuTrapCheck;
var waktuNextHorn;
var waktuRandom;
var waktuTitle;
var waktuTournament;
var msgTitle = 'Sound The Horn';
var alertShown = false;
var hornAllowed = false;
var currentTrap = {weapon:0, base:0, trinket:0, bait:0, cached:false, busy:false, effmeter:null};
var trapConfig = {TrapCheck:{enable:false,min:0,sec:5},SeasonalGarden:{autoTravel:false,'wr':{weapon:-1,base:-1,trinket:-1,bait:-1},'sg':{weapon:-1,base:-1,trinket:-1,bait:-1},'sr':{weapon:-1,base:-1,trinket:-1,bait:-1},'fl':{weapon:-1,base:-1,trinket:-1,bait:-1}},ZugzwangTower:{enabled:0,target:0,pawn:{weapon:-1,base:-1,trinket:-1,bait:-1},knight:{weapon:-1,base:-1,trinket:-1,bait:-1},bishop:{weapon:-1,base:-1,trinket:-1,bait:-1},rook:{weapon:-1,base:-1,trinket:-1,bait:-1},queen:{weapon:-1,base:-1,trinket:-1,bait:-1},king:{weapon:-1,base:-1,trinket:-1,bait:-1},chessmaster:{weapon:-1,base:-1,trinket:-1,bait:-1},minAmplifier:0},Iceberg:{enabled:0,altGeneralEnable:0,slushy_shoreline:{weapon:-1,base:-1,trinket:-1,bait:-1},phase1:{weapon:-1,base:-1,trinket:-1,bait:-1},phase2:{weapon:-1,base:-1,trinket:-1,bait:-1},phase3:{weapon:-1,base:-1,trinket:-1,bait:-1},phase4:{weapon:-1,base:-1,trinket:-1,bait:-1},phase5:{weapon:-1,base:-1,trinket:-1,bait:-1},generals:{weapon:-1,base:-1,trinket:-1,bait:-1},altgenerals:{weapon:-1,base:-1,trinket:-1,bait:-1}},BalackCove:{enabled:0,travel:0,jod:{weapon:-1,base:-1,trinket:-1,bait:98},low:{weapon:38,base:-1,trinket:-1,bait:119},mid:{weapon:38,base:-1,trinket:-1,bait:119},high:{weapon:38,base:-1,trinket:-1,bait:118}},FieryWarpath:{enabled:0,general:{weapon:-1,base:-1,trinket:-1,bait:-1},physical:{weapon:-1,base:-1,trinket:-1,bait:-1},tactical:{weapon:-1,base:-1,trinket:-1,bait:-1},hydro:{weapon:-1,base:-1,trinket:-1,bait:-1},arcane:{weapon:-1,base:-1,trinket:-1,bait:-1},gargantua:{weapon:-1,base:-1,trinket:-1,bait:-1},warden:{weapon:-1,base:-1,trinket:-1,bait:-1},warmonger:{weapon:-1,base:-1,trinket:-1,bait:-1},wave1:{superBrie:0,maxStreak:9,superCharm:0,gargantua:true,minGeneral:99,targetPhysical:true,charmNonPhysical:false,openSelection:true},wave2:{superBrie:0,maxStreak:9,superCharm:0,gargantua:true,minGeneral:99,targetPhysical:true,charmNonPhysical:true,targetNonPhysical:false,allowNonPhysical:false},wave3:{superBrie:0,maxStreak:9,superCharm:0,gargantua:true,minGeneral:99,targetPhysical:true,charmNonPhysical:true,targetNonPhysical:false,allowNonPhysical:false}}};
var availableTraps = {};
var AUDIO = {
	reward: 'data:audio/mid;base64,TVRoZAAAAAYAAQAQAeBNVHJrAAAAMAD/WAQBAhgIAP9ZAgAAAP9ZAgAAAP9UBSAAAAAAAP9RAwOpgINg/1EDBYx0AP8vAE1UcmsAAAAyAP8DCygxKSBPY2FyaW5hAP8ECkF1dG9t YXRpb24A/wENKEMpMjAwMSBOb2tpYQD/LwBNVHJrAAAAfgD/IAEBAP8DCygxKSBPY2FyaW5hAP8ECCpOZXcgICAgALF5AHjBSQWxB38ACkABC38EW38AXQBkZQAFZAAFBgcFZX8F ZH+BZpFaWQDhAECBQzVFD2FJDyJQDw5mgXB0f4FwAECBQzVFD2FJD01UDy9mgXB/f4NggVoAAP8vAE1UcmsAAACBAP8gAQIA/wMMKDEpIE9jYXJpbmEyAP8ECCpOZXcgICAgALJ5 AIFwwkkFsgt/AApAAQdaBF0AAFsogRFlAAVkAAUGBwVlfwVkf4Ixklo+AOIAQIFDNUUPYUkPIlAPDmaBcHR/gXAAQIFDNUUPYUkPTVQPL2aBcH9/g2CCWgAA/y8ATVRyawAAAH8A /yABAwD/AwwoMSkgT2NhcmluYTMA/wQIKk5ldyAgICAAs3kAeMNJBbMLfwAKQAEHQARdAABbKHhlAAVkAAUGBwVlfwVkf4Uyk1ouAOMAQIFDNUUPYUkPIlAPDmaBcHR/gXAAQIFD NUUPYUkPTVQPL2aBcH9/g2CDWgAA/y8ATVRyawAAAH8A/yABBAD/AwwoMSkgT2NhcmluYTQA/wQIKk5ldyAgICAAtHkAeMRJBbQLfwAKQAEHMgRdAABbKF9lAAVkAAUGBwVlfwVk f4c7lFogAOQAQIFDNUUPYUkPIlAPDmaBcHR/gXAAQIFDNUUPYUkPTVQPL2aBcH9/g2CEWgAA/y8ATVRyawAAAH8A/yABBQD/AwwoMSkgT2NhcmluYTkA/wQIKk5ldyAgICAAtXkA eMVJBbULfwAKQAEHKARdAABbKF9lAAVkAAUGBwVlfwVkf5BrlVoqAOUAQIFDNUUPYUkPIlAPDmaBcHR/gXAAQIFDNUUPYUkPTVQPL2aBcH9/g2CFWgAA/y8ATVRyawAAAIAA/yAB BgD/Aw0oMSkgT2NhcmluYTEwAP8ECCpOZXcgICAgALZ5AHjGSQW2C38ACkABBx4EXQAAWyhfZQAFZAAFBgcFZX8FZH+SW5ZaFgDmAECBQzVFD2FJDyJQDw5mgXB0f4FwAECBQzVF D2FJD01UDy9mgXB/f4NghloAAP8vAE1UcmsAAACAAP8gAQcA/wMNKDEpIE9jYXJpbmExMQD/BAgqTmV3ICAgIAC3eQB4x0kFtwt/AApAAQcUBF0AAFsoX2UABWQABQYHBWV/BWR/ lEuXWgIA5wBAgUM1RQ9hSQ8iUA8OZoFwdH+BcABAgUM1RQ9hSQ9NVA8vZoFwf3+DYIdaAAD/LwBNVHJrAAAAgAD/IAEIAP8DDSgxKSBPY2FyaW5hMTIA/wQIKk5ldyAgICAAuHkA eMhJBbgLfwAKQAEHFARdAABbKF9lAAVkAAUGBwVlfwVkf5Y7mFoBAOgAQIFDNUUPYUkPIlAPDmaBcHR/gXAAQIFDNUUPYUkPTVQPL2aBcH9/g2CIWgAA/y8ATVRyawAAAH4A/yAB CgD/AwsoMSkgT2NhcmluYQD/BAgqTmV3ICAgIAC6eQB4ylgFugd/AApAAQt/BFt/AF0AZGUABWQABQYHBWV/BWR/kGaaWlwA6gBAgUM1RQ9hSQ8iUA8OZoFwdH+BcABAgUM1RQ9h SQ9NVA8vZoFwf3+DYIpaAAD/LwBNVHJrAAAAgQD/IAELAP8DDCgxKSBPY2FyaW5hMgD/BAgqTmV3ICAgIAC7eQCBcMtYBbsLfwAKQAEHWgRdAABbKIERZQAFZAAFBgcFZX8FZH+R MZtaSADrAECBQzVFD2FJDyJQDw5mgXB0f4FwAECBQzVFD2FJD01UDy9mgXB/f4Ngi1oAAP8vAE1UcmsAAAB/AP8gAQwA/wMMKDEpIE9jYXJpbmEzAP8ECCpOZXcgICAgALx5AHjM WAW8C38ACkABB0AEXQAAWyh4ZQAFZAAFBgcFZX8FZH+UMpxaNADsAECBQzVFD2FJDyJQDw5mgXB0f4FwAECBQzVFD2FJD01UDy9mgXB/f4NgjFoAAP8vAE1UcmsAAAB/AP8gAQ0A /wMMKDEpIE9jYXJpbmE0AP8ECCpOZXcgICAgAL15AHjNWAW9C38ACkABBzIEXQAAWyhfZQAFZAAFBgcFZX8FZH+WO51aIADtAECBQzVFD2FJDyJQDw5mgXB0f4FwAECBQzVFD2FJ D01UDy9mgXB/f4NgjVoAAP8vAE1UcmsAAAB/AP8gAQ4A/wMMKDEpIE9jYXJpbmE5AP8ECCpOZXcgICAgAL55AHjOWAW+C38ACkABBygEXQAAWyhfZQAFZAAFBgcFZX8FZH+fa55a KgDuAECBQzVFD2FJDyJQDw5mgXB0f4FwAECBQzVFD2FJD01UDy9mgXB/f4NgjloAAP8vAE1UcmsAAACAAP8gAQ8A/wMNKDEpIE9jYXJpbmExMAD/BAgqTmV3ICAgIAC/eQB4z1gF vwt/AApAAQceBF0AAFsoX2UABWQABQYHBWV/BWR/oVufWhYA7wBAgUM1RQ9hSQ8iUA8OZoFwdH+BcABAgUM1RQ9hSQ9NVA8vZoFwf3+DYI9aAAD/LwA='
}

/* Begin script function list */
function tulisWaktu(){
	if (timerTitle) clearTimeout(timerTitle);
	var sekarang = new Date();
	if (loadParam('updateWindowTitle', true) && waktuTitle) {
		if ($('div#mobileHorn').length > 0) {
			if (sekarang >= waktuNextHorn)
				document.title = msgTitle + ' | ' + origtitle;
			else
				document.title = msgWaktu(sekarang, waktuNextHorn) + ' | ' + origtitle;
		} else {
			if (sekarang >= waktuTitle)
				document.title = msgTitle + ' | ' + origtitle;
			else
				document.title = msgWaktu(sekarang, waktuTitle) + ' | ' + origtitle;
		}
	}
	if (waktuNextHorn && sekarang <= waktuNextHorn)	$('div#AutoHorn li span[name="hornTime"]').html(msgWaktu(sekarang, waktuNextHorn));
	else $('div#AutoHorn li span[name="hornTime"]').html("00:00");
	if (waktuRandom && sekarang <= waktuRandom)
		$('div#AutoHorn li span[name="randomTime"]').html(msgWaktu(sekarang, waktuRandom));
	if 	(waktuTournament && sekarang < waktuTournament && $('div#tournamentStatusHud div.timer').length > 0){
		var tmp = msgWaktu(sekarang, waktuTournament, 1);
		try {
			if (unsafeWindow.user.viewing_atts.tournament.status == 'pending')
				tmp = 'Starts in: ' + tmp;
			else if (unsafeWindow.user.viewing_atts.tournament.status == 'active')
				tmp = tmp + ' remaining';
		} catch (err) {
		}
		$('div#tournamentStatusHud div.timer').html(tmp);
	}
	if (waktuTrapCheck && sekarang <= waktuTrapCheck) $('div#AutoHorn li span[name="trapCheckTime"]').html(msgWaktu(sekarang, waktuTrapCheck));
	else $('div#AutoHorn li span[name="trapCheckTime"]').html("00:00");
	timerTitle = setTimeout(function() { tulisWaktu(); } , 1000);
}

function openLink(link){
	if ($('a[href="' + link + '"]').length > 0) $('a[href="' + link + '"]').first().click();
	window.location.href = link;
}

function msgWaktu(awal, akhir, panjang){
	panjang = typeof panjang != "undefined" ? panjang : false;
	var detik = Math.round((akhir - awal) / 1000);
	var jam = Math.floor(detik / 3600);
	var menit = Math.floor(detik / 60);
	if (jam == 0) jam = null;
	menit = menit % 60;
	if (menit < 10) menit = '0' + menit;
	detik = detik % 60;
	if (detik < 10) detik = '0' + detik;
	if (jam) return (panjang ? jam + ' hrs ' + menit + ' mins ' + detik + ' secs' : jam + ':' + menit + ':' + detik);
	else return (panjang ? menit + ' mins ' + detik + ' secs' : menit + ':' + detik);
}

function soundAlarm(){
	var alarm = document.getElementById('alarm');
	if (!alarm)	{
		alarm = document.createElement("span");
		alarm.id = 'alarm';
		$('body').append(alarm);
	}
	alarm.innerHTML = '<embed src="' + AUDIO.reward + '" height="50" width="200" hidden="true" autostart="true" loop="true" volume="' + loadParam('alertVolume', 100) + '"></embed>';
}

function calculateRandomPage(){
	if (typeof unsafeWindow.user == 'undefined') { setTimeout(function() { calculateRandomPage(); }, 1000); return; }
	var mintime = loadParam('minRandomPage', 10) * 60000;
	var maxtime = loadParam('maxRandomPage', 20) * 60000;
	var timeoutvalue = Math.random() * (maxtime - mintime) + mintime;
	setTimeout(function() { randomLinks(); }, timeoutvalue);
	waktuRandom = new Date(new Date().getTime() + timeoutvalue);
}

function calculateTrapCheck(){
	if (timerTrapCheck) clearTimeout(timerTrapCheck);
	var sekarang = new Date();
	var checkTime = new Date();
	checkTime.setMinutes(trapConfig.TrapCheck.min, trapConfig.TrapCheck.sec, 0);
	if (checkTime < sekarang) checkTime.setTime(checkTime.getTime() + 3600000);	 
	timerTrapCheck = setTimeout(function() { 
		if (trapConfig.TrapCheck.enable) {
			if (currentTrap.bait > 0) randomLinks(); 
			else openLink('http://www.mousehuntgame.com/index.php');
		} else calculateTrapCheck();
	}, checkTime.getTime() - sekarang.getTime());
	waktuTrapCheck = checkTime;
}

function randomLinks(){
	if ($('div#mobileHorn').length > 0) {
		openLink(defaultpage);
		return;
	}
	var daftar = new Array();
	daftar.push('http://www.mousehuntgame.com/journal.php');
	daftar.push('http://www.mousehuntgame.com/profile.php');
	$('a[href*="www.mousehuntgame.com/inventory.php"]').add('a[href*="www.mousehuntgame.com/shops.php"]').add('a[href*="www.mousehuntgame.com/adversaries.php?"]').add('a[href*="www.mousehuntgame.com/item.php"]').add('a[href*="www.mousehuntgame.com/journal.php"]').add('a[href*="www.mousehuntgame.com/profile.php"]').add('a[href*="www.mousehuntgame.com/hunterprofile.php"]').add('a[href*="www.mousehuntgame.com/tournament.php"]').add('a[href*="www.mousehuntgame.com/tournamentlist.php"]').not('a[href*="&"]').not('a[href*="#"]').each(function(i){
		var link = $(this).attr('href');
		var sudahada = false;
		for (var x = 0; x < daftar.length; x++) if (daftar[x] == link) { sudahada = true; break; }
		if (!sudahada) daftar.push(link);
	});
	
	if (daftar.length > 0){
		var x = Math.floor(Math.random() * daftar.length);
		openLink(daftar[x]);
	}
}

function warpathGetTrinket(subgroup, useSuper){
	if (typeof subgroup == 'undefined') return 0;
	if (typeof useSuper == 'undefined') useSuper = false;
	if (subgroup == 'Warrior') {
		if (useSuper && getComponentQuantity(544) > 0) return 544;
		else if (getComponentQuantity(539) > 0) return 539;
	} else if (subgroup == 'Scout') {
		if (useSuper && getComponentQuantity(543) > 0) return 543;
		else if (getComponentQuantity(538) > 0) return 538;
	} else if (subgroup == 'Archer') {
		if (useSuper && getComponentQuantity(540) > 0) return 540;
		else if (getComponentQuantity(534) > 0) return 534;
	} else if (subgroup == 'Cavalry') {
		if (useSuper && getComponentQuantity(541) > 0) return 541;
		else if (getComponentQuantity(535) > 0) return 535;
	} else if (subgroup == 'Mage') {
		if (useSuper && getComponentQuantity(542) > 0) return 542;
		else if (getComponentQuantity(537) > 0) return 537;
	} else if (subgroup == 'Commander') {
		if (useSuper && getComponentQuantity(615) > 0) return 615;
		else if (getComponentQuantity(536) > 0) return 536;
	}
	return 0;
}

function warpathGetNumRetreat(){
	var streak = parseInt(unsafeWindow.user.viewing_atts.desert_warpath.streak.quantity);
	if (streak < 1) streak = 1;
	var pop = unsafeWindow.user.viewing_atts.desert_warpath.wave_population;
	var hasil = 0;
	for (var nama in pop){
		hasil += (parseInt(pop[nama].population) > streak ? streak : parseInt(pop[nama].population));
	}
	return hasil;
}

function warpathGetPhysical(isMax, isReverse, trywithtrinket){
	var pop = unsafeWindow.user.viewing_atts.desert_warpath.wave_population;
	var hasil;
	if (typeof trywithtrinket=='undefined') trywithtrinket = true;
	// try with trinket
	if (trywithtrinket)	for (var nama in pop){
		if (parseInt(pop[nama].population) < 1 || warpathGetTrinket(pop[nama].subgroup, true) < 1) continue;
		if (!hasil || ((isReverse ^ (pop[nama].weakness.name == 'Physical')) && (!isMax ^ (parseInt(pop[nama].population) > parseInt(pop[hasil].population))))) hasil = nama;
	}
	// try without trinket
	if (!hasil) for (var nama in pop){
		if (parseInt(pop[nama].population) < 1) continue;
		if (!hasil || ((isReverse ^ (pop[nama].weakness.name == 'Physical')) && (!isMax ^ (parseInt(pop[nama].population) > parseInt(pop[hasil].population))) && pop[nama].subgroup != 'Artillery')) hasil = nama;
	}
	return hasil;
}

function warpathGetGroupLeft(){
	var pop = unsafeWindow.user.viewing_atts.desert_warpath.wave_population;
	var hasil = 0;
	for (var nama in pop){
		if (parseInt(pop[nama].population) > 0) hasil++;
	}
	return hasil;
}

function checkLocation(){
	if (unsafeWindow.user.environment_id == 31 && trapConfig.ZugzwangTower.enabled) { // seasonal_garden
		if (trapConfig.SeasonalGarden.autoTravel && unsafeWindow.user.viewing_atts.zzt_amplifier >= unsafeWindow.user.viewing_atts.zzt_max_amplifier)
			return travelTo('seasonal_garden', 'zugzwang_tower');
		else
			return changeTrap(trapConfig.SeasonalGarden[unsafeWindow.user.viewing_atts.season]);
	} else if (unsafeWindow.user.environment_id == 14 && trapConfig.BalackCove.enabled) { // jungle_of_dread
		if (trapConfig.BalackCove.travel && (getComponentQuantity(119) > 0 || getComponentQuantity(118) > 0)) return travelTo('jungle_of_dread', 'balacks_cove');
		else return changeTrap(trapConfig.BalackCove.jod);
	} else if (unsafeWindow.user.environment_id == 2 && trapConfig.BalackCove.enabled) { // balacks_cove
		var desired = {base:-1,weapon:-1,trinket:-1,bait:-1};
		if (unsafeWindow.user.viewing_atts.tide == 'high') desired = trapConfig.BalackCove.high;
		else if (unsafeWindow.user.viewing_atts.tide == 'low') desired = trapConfig.BalackCove.low;
		else desired = trapConfig.BalackCove.mid;
		if (desired.bait > 0 && getComponentQuantity(desired.bait) < 1){
			if (desired.bait == 119 && getComponentQuantity(118) > 0) desired.bait = 118;
			else if (desired.bait == 118 && getComponentQuantity(119) > 0) desired.bait = 119;
			else return travelTo('balacks_cove', 'jungle_of_dread');
		}
		return changeTrap(desired);
	} else if (unsafeWindow.user.environment_id == 32 && trapConfig.ZugzwangTower.enabled) { // zugzwang_tower
		var zzt_mage_progress = unsafeWindow.user.viewing_atts.zzt_mage_progress;
		var zzt_tech_progress = unsafeWindow.user.viewing_atts.zzt_tech_progress;
		var zzt_progress = Math.max(zzt_mage_progress, zzt_tech_progress);
		if (trapConfig.ZugzwangTower.target == 1) zzt_progress = zzt_tech_progress;
		else if (trapConfig.ZugzwangTower.target == 2) zzt_progress = zzt_mage_progress;
		else if (trapConfig.ZugzwangTower.target == 3 && zzt_progress >= 16) zzt_progress = Math.min(zzt_mage_progress, zzt_tech_progress);
		var desired;
		
		if (zzt_progress < 8) desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.pawn);
		else if (zzt_progress < 10) desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.knight);
		else if (zzt_progress < 12) desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.bishop);
		else if (zzt_progress < 14) desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.rook);
		else if (zzt_progress < 15) desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.queen);
		else if (zzt_progress < 16) desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.king);
		else desired = jQuery.extend(true, {}, trapConfig.ZugzwangTower.chessmaster);
		if (waktuTournament && unsafeWindow.user.viewing_atts.tournament.status == 'active' && waktuTrapCheck < waktuTitle && zzt_progress > 7)  // jika mau trap check, lepas bait
			desired.bait = 0;
		
		if (trapConfig.ZugzwangTower.target == 3 && (desired.weapon == 354 || desired.weapon == 356) && zzt_mage_progress != zzt_tech_progress){
			if (zzt_mage_progress == zzt_progress && getComponentQuantity(354) > 0) desired.weapon = 354;
			if (zzt_tech_progress == zzt_progress && getComponentQuantity(356) > 0) desired.weapon = 356;
		} else if (trapConfig.ZugzwangTower.target == 3 && (desired.weapon == 369 || desired.weapon == 370) && zzt_mage_progress != zzt_tech_progress){
			if (zzt_mage_progress == zzt_progress && getComponentQuantity(369) > 0) desired.weapon = 369;
			if (zzt_tech_progress == zzt_progress && getComponentQuantity(370) > 0) desired.weapon = 370;
		}
		if (desired.bait == 371 && Math.max(zzt_mage_progress, zzt_tech_progress) >= 16 && getComponentQuantity(678) > 0) desired.trinket = 678;
		
		if (desired) return changeTrap(desired);
	} else if (unsafeWindow.user.environment_id == 33 && trapConfig.FieryWarpath.enabled) { // desert_warpath
		var wave = parseInt(unsafeWindow.user.viewing_atts.desert_warpath.wave);
		var pop = unsafeWindow.user.viewing_atts.desert_warpath.wave_population;
		var waveConf = trapConfig.FieryWarpath['wave' + wave];
		var sumPhysical = 0;
		if (wave < 4) for (var nama in pop){
			if (pop[nama].weakness.name == 'Physical') sumPhysical += parseInt(pop[nama].population);
		}
		$('div#hudLocationContent div[class^="opponent "][class$=" active"] img').css("border","none");
		if (wave == 4){
			var jum = 0;
			for (var boss in pop) if (parseInt(pop[boss].population) > 0) jum++;
			if (jum > 1) return changeTrap(trapConfig.FieryWarpath.warden);
			else return changeTrap(trapConfig.FieryWarpath.warmonger);
		}
		
		var streak = unsafeWindow.user.viewing_atts.desert_warpath.streak;
		var numStreak = parseInt(streak.quantity);
		var target;
		var jendral = unsafeWindow.user.viewing_atts.desert_warpath.common_population.desert_general;
		var weakness = 'Physical';
		if (!target) {
			if (jendral.status == 'active' && warpathGetTrinket('Commander', true) > 0 && warpathGetNumRetreat() >= waveConf.minGeneral){
				target = 'desert_general';
			} else if (numStreak > 0){
				weakness = pop[streak.mouse_type].weakness.name;
				if (numStreak < waveConf.maxStreak && parseInt(pop[streak.mouse_type].population) > 0){
					if ((weakness == 'Physical' || sumPhysical < 1 || (waveConf.allowNonPhysical && warpathGetTrinket(pop[streak.mouse_type].subgroup, true) > 0)) && weakness != 'Arcane') 
						target = streak.mouse_type;
				} else if (waveConf.gargantua && numStreak > 6) target = 'Gargantua';
			}
			
			if (!target){
				if (sumPhysical > 0) {
					if (waveConf.targetPhysical) target = warpathGetPhysical(true, false);
					else target = warpathGetPhysical(false, false);
				} else {
					if (waveConf.targetNonPhysical) target = warpathGetPhysical(true, true, waveConf.charmNonPhysical);
					else target = warpathGetPhysical(false, true, waveConf.charmNonPhysical);
				}
			}
		}
		if (target=='Gargantua') {
			return changeTrap(jQuery.extend(true, {}, trapConfig.FieryWarpath.gargantua));
		}
		$('div#hudLocationContent div[class="opponent ' + target + ' active"] img').first().css("border","2px solid red");
		if (target=='desert_general') {
			var dt = jQuery.extend(true, {}, trapConfig.FieryWarpath.general);
			var x = warpathGetTrinket('Commander', true);
			if (x > 0) dt.trinket = x;
			return changeTrap(dt);
		} else {
			var dt = {weapon:-1, base:-1, trinket:-1, bait:-1};
			weakness = pop[target].weakness.name;
			var subgroup = pop[target].subgroup;
			if (weakness == 'Physical') dt = jQuery.extend(true, {}, trapConfig.FieryWarpath.physical);
			else if (weakness == 'Tactical') dt = jQuery.extend(true, {}, trapConfig.FieryWarpath.tactical);
			else if (weakness == 'Hydro') dt = jQuery.extend(true, {}, trapConfig.FieryWarpath.hydro);
			else if (weakness == 'Arcane') dt = jQuery.extend(true, {}, trapConfig.FieryWarpath.arcane);
			if (warpathGetGroupLeft() > 1) {
				var tr = 0;
				if (wave == 1 && numStreak < 1 && waveConf.openSelection){
				} else if (wave > 1 && weakness != 'Physical' && !waveConf.charmNonPhysical) {
				} else if (Math.pow(2,numStreak) & waveConf.superCharm) tr = warpathGetTrinket(subgroup, true);
				else tr = warpathGetTrinket(subgroup, false);  
				if (tr > 0) dt.trinket = tr;
			}
			if ((Math.pow(2,numStreak) & waveConf.superBrie) && getComponentQuantity(114) > 0) dt.bait = 114;
			return changeTrap(dt);
		}
	} else if (unsafeWindow.user.environment_id == 39 && trapConfig.Iceberg.enabled) { // slushy_shoreline
		return changeTrap(trapConfig.Iceberg.slushy_shoreline);
	} else if (unsafeWindow.user.environment_id == 40 && trapConfig.Iceberg.enabled) { // iceberg
		var nextGeneral = 0;
		for (var x = 1; x <= 4 ; x++) {
			nextGeneral += unsafeWindow.user.quests.QuestIceberg.phases[x].length;
			if (unsafeWindow.user.quests.QuestIceberg.user_progress < nextGeneral) {
				switch (x) {
					case 1 : return changeTrap(trapConfig.Iceberg.phase1);
					case 2 : return changeTrap(trapConfig.Iceberg.phase2);
					case 3 : return changeTrap(trapConfig.Iceberg.phase3);
					case 4 : return changeTrap(trapConfig.Iceberg.phase4);
				}
			} else if (unsafeWindow.user.quests.QuestIceberg.user_progress == nextGeneral) {
				var dt = trapConfig.Iceberg.generals;
				if (trapConfig.Iceberg.altGeneralEnable) {
					if (!currentTrap.effmeter) {
						ajaxRequestEffMeter();
						return false;
					} else {
						dt = trapConfig.Iceberg.altgenerals;
						var count = 0;
						var mice;
						for (var d in currentTrap.effmeter){
							var diff = currentTrap.effmeter[d].mice;
							for (var m in diff) {
								count ++;
								mice = diff[m];
								if (count > 1) break;
							}
							if (count > 1) break;
						}
						if (count == 1 && mice.name==trapConfig.Iceberg.altGeneralEnable) dt = trapConfig.Iceberg.generals;
					}
				}
				return changeTrap(dt);
			}
		}
		return changeTrap(trapConfig.Iceberg.phase5);
	}
	return true;
}

function changeTrap(desired){
	var salah;
	if (desired.weapon > 0 && desired.weapon != currentTrap.weapon && getComponentQuantity(desired.weapon) > 0) salah = 'weapon';
	else if (desired.base > 0 && desired.base != currentTrap.base && getComponentQuantity(desired.base) > 0) salah = 'base';
	else if (desired.trinket > -1 && desired.trinket != currentTrap.trinket && getComponentQuantity(desired.trinket) > 0) salah = 'trinket';
	else if (desired.bait > -1 && desired.bait != currentTrap.bait && getComponentQuantity(desired.bait) > 0) salah = 'bait';

	if (salah) {
		if ($('div#mobileHorn').length > 0) {
			openLink('http://www.mousehuntgame.com/?switch_to=standard');
			return false;
		}
		if (typeof unsafeWindow.userTrapSelector == "undefined") {
			openLink('http://www.mousehuntgame.com/index.php');
			return false;
		}
		if (unsafeWindow.userTrapSelector.selectedComponentClass != salah) {
			if (salah === "weapon") {
				$('a#trapSelector-viewWeapon img').click();
			} else if (salah === "base") {
				$('a#trapSelector-viewBase img').click();
			} else if (salah === "trinket") {
				if ($('a#trapSelector-viewtrinket div.empty').length > 0) $('a#trapSelector-viewtrinket div.empty').click();
				else $('a#trapSelector-viewtrinket img').click();
			} else if (salah === "bait") {
				if ($('a#trapSelector-viewBait div.empty').length > 0) $('a#trapSelector-viewBait div.empty').click();
				else $('a#trapSelector-viewBait img').click();
			}
		}
		if (unsafeWindow.userTrapSelector.componentsCached == false) return false;
		var xDesired = desired[salah];
		var xCurrent = currentTrap[salah];
		if (xDesired == 0) {
			$('div[id="trapSelectorSelectedComponent"] div.content').click();
		} else {
			var nama = getComponentName(xDesired);
			if (nama){
				$('div[id="trapSelectorBrowser"] a[id="selectComponent-' + nama + '"] div.content').click();
			}
		}
		return false;
	} 
	return true;
}

function getComponentQuantity(itemid){
	if (itemid == 0) return 1;
	for (var nama in availableTraps){
		if (availableTraps[nama].item_id == itemid) {
			return availableTraps[nama].quantity;
		}
	}
	return 0;
}

function getComponentName(itemid){
	if (typeof unsafeWindow.userTrapSelector == "undefined" || typeof unsafeWindow.userTrapSelector.availableComponents == "undefined") return null;
	for (var nama in unsafeWindow.userTrapSelector.availableComponents){
		if (unsafeWindow.userTrapSelector.availableComponents[nama].item_id == itemid) {
			return unsafeWindow.userTrapSelector.availableComponents[nama].type;
		}
	}
	return null;
}

function travelTo(origin, destination) {
	if (origin === destination) return true;
	if ($('div#mobileHorn').length > 0) {
		openLink('http://www.mousehuntgame.com/?switch_to=standard');
		return false;
	}
	if (destination === 'meadow') {
		openLink('http://www.mousehuntgame.com/travel.php?freeTravel=true?&uh=' + unsafeWindow.user.unique_hash);
		return false;
	} else {
		var ajax=new unsafeWindow.Ajax();
		ajax.requireLogin=true;
		ajax.responseType=unsafeWindow.Ajax.JSON;
		ajax.ondone=function(resp){
			if(resp.success){
				try{
					unsafeWindow.eventRegistry.doEvent('ajax_response',resp);
					unsafeWindow.eventRegistry.doEvent('travel_complete',{'old':origin,'new':destination});
				} catch (err) {
				}
				try{
					unsafeWindow.app.views.HeadsUpDisplayView.hud.render(resp.user);
				} catch (err) {
				}
			}
		}
		var params={"origin":origin,"destination":destination,'uh':unsafeWindow.user.unique_hash};
		ajax.post(unsafeWindow.callbackurl+"managers/ajax/users/changeenvironment.php",params);
		return false;
	}
}

function soundTheHorn(){
	if (typeof unsafeWindow.user == 'undefined' || unsafeWindow.user.has_puzzle || !hornAllowed) return;
	if ($('div#hornArea div.hornbutton').css('display')=='block') 
		if (document.location.pathname == '/') document.location = hornpage;
		else $('div#hornArea div.hornbutton a').click();
	else if ($('div#mobileHorn').css('display')=='block') openLink(hornpage);
	else randomLinks();
}

function mulai(){
	clearTimeout(timerEvent);
	if (typeof unsafeWindow.user == "undefined") { setTimeout(function() { mulai(); }, 1000); return; }
	var waktu;
	var isKR = true;
	var userid = 0;
	var bait_quantity = 0;
    try {
        if (typeof unsafeWindow.HuntersHorn != "undefined")
            waktu = unsafeWindow.HuntersHorn.getSecondsRemaining(); 
        else
            waktu = parseInt(unsafeWindow.user.next_activeturn_seconds);
        isKR = unsafeWindow.user.has_puzzle;
        userid = parseInt(unsafeWindow.user.user_id);
        bait_quantity = parseInt(unsafeWindow.user.bait_quantity);
    } catch (err) {
        setTimeout(function() { mulai(); }, 1000); 
        return;
    }
	if (isNaN(userid) || userid < 1) {
		setTimeout(function() {		
			openLink(defaultpage);
		} , 60000);
		return;
	}
	if (waktu > 0) waktuTitle = new Date(new Date().getTime() + waktu * 1000);
	cleanupLink();
	if 	($('div#tournamentStatusHud div.timer').length > 0){
		waktuTournament = new Date(new Date().getTime() + unsafeWindow.user.viewing_atts.tournament.seconds_remaining * 1000);
	}
	
	if (isKR==true) {
		if (!alertShown) {
			alertShown = true;
			if (loadParam('enableAlert', false)) soundAlarm(); else alert('King Reward');
		}
		var timeoutvalue = Math.round(Math.random() * Math.abs((loadParam('maxKRWait', 180) - loadParam('minKRWait', 180)) * 60000)) + loadParam('minKRWait', 180) * 60000;
		timerEvent = setTimeout(function() { randomLinks(); } , timeoutvalue);
		waktuRandom = new Date(new Date().getTime() + timeoutvalue);
		waktuNextHorn = null;
		msgTitle = 'King Reward';
		waktuTitle = new Date();
		return;
	} 
	
	currentTrap.weapon = unsafeWindow.user.weapon_item_id;
	currentTrap.base = unsafeWindow.user.base_item_id;
	currentTrap.trinket = (parseInt(unsafeWindow.user.trinket_item_id) > 0 ? parseInt(unsafeWindow.user.trinket_item_id) : 0);
	currentTrap.bait = (parseInt(unsafeWindow.user.bait_item_id) > 0 ? parseInt(unsafeWindow.user.bait_item_id) : 0);
	if (currentTrap.trinket == 0) {
		$('span#hud_trinketName a').html('None&nbsp;');
		$('span#hud_trinketQuantity').html('0');
	} else {
		$('span#hud_trinketName a').html(unsafeWindow.user.trinket_name + '&nbsp;');
		$('span#hud_trinketQuantity').html(unsafeWindow.user.trinket_quantity);
	}

	calculateTrapCheck();
	$('span#hud_titlePercentage').html(unsafeWindow.user.title_percentage);

	hornAllowed = checkLocation();
	if (bait_quantity < 1) hornAllowed = false;
	if (waktu == 0 && hornAllowed) {
		soundTheHorn();
		return;
	} else if (waktu > 0){
		msgTitle = 'Sound The Horn';
		var timeoutvalue = waktu + Math.round(Math.random() * Math.abs(loadParam('maxHornDelay', 120) - loadParam('minHornDelay', 30))) + loadParam('minHornDelay', 30);
		waktuNextHorn = new Date(new Date().getTime() + timeoutvalue * 1000);
		timerEvent = setTimeout(function() { 
			if (!hornAllowed) return;
			if ($('div#hornArea div.hornbutton').css('display') == 'block' || $('div#mobileHorn').css('display') == 'block') {
				soundTheHorn();
			} else
				randomLinks();
		}, timeoutvalue * 1000);
	}
}

function populateComboTrap(obj){
	var list = [];
	for (var x in obj) list.push(obj[x]);
	list.sort(function(a, b){
		return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
	});
	for (var nama in list){
		var id = list[nama].item_id;
		var name = list[nama].name;
		var classification = list[nama].classification;
		if (classification === 'base')
			$('div#AutoHornWindow select[name^="cbo"][name$="Base"]').each(function(){
				$(this).append('<option value="' + id + '" title="' + name + '">' + name + '</option>');
			});
		else if (classification === 'weapon')
			$('div#AutoHornWindow select[name^="cbo"][name$="Weapon"]').each(function(){
				$(this).append('<option value="' + id + '" title="' + name + '">' + name + '</option>');
			});
		else if (classification === 'trinket')
			$('div#AutoHornWindow select[name^="cbo"][name$="Trinket"]').each(function(){
				$(this).append('<option value="' + id + '" title="' + name + '">' + name + ' (' + list[nama].quantity + ')</option>');
			});
		else if (classification === 'bait')
			$('div#AutoHornWindow select[name^="cbo"][name$="Bait"]').each(function(){
				$(this).append('<option value="' + id + '" title="' + name + '">' + name + ' (' + list[nama].quantity + ')</option>');
			});
	}	
}

function setSelectionComboTrap(name, trap){
	$('div#AutoHornWindow select[name="cbo' + name + 'Base"] option[value="' + trap.base + '"]').attr('selected', 'selected');
	$('div#AutoHornWindow select[name="cbo' + name + 'Weapon"] option[value="' + trap.weapon + '"]').attr('selected', 'selected');
	$('div#AutoHornWindow select[name="cbo' + name + 'Trinket"] option[value="' + trap.trinket + '"]').attr('selected', 'selected');
	$('div#AutoHornWindow select[name="cbo' + name + 'Bait"] option[value="' + trap.bait + '"]').attr('selected', 'selected');
}

function getSelectionComboTrap(name, trap){
	trap.base = $('div#AutoHornWindow select[name="cbo' + name + 'Base"]').val();
	trap.weapon = $('div#AutoHornWindow select[name="cbo' + name + 'Weapon"]').val();
	trap.trinket = $('div#AutoHornWindow select[name="cbo' + name + 'Trinket"]').val();
	trap.bait = $('div#AutoHornWindow select[name="cbo' + name + 'Bait"]').val();
}

function generateTrapSetupCombo(mid){
	return '<select name="cbo' + mid + 'Base"><option value="-1">Any</option></select> <select name="cbo' + mid + 'Weapon"><option value="-1">Any</option></select> <select name="cbo' + mid + 'Trinket"><option value="-1">Any</option><option value="0">None</option></select> <select name="cbo' + mid + 'Bait"><option value="-1">Any</option></select>';
}

function showBalackPage(){
	$('div#AutoHornWindow a[href="#save"]').unbind('click');
	$('div#AutoHornWindow a[href="#default"]').unbind('click');
	$('div#AutoHornWindow div[name="top"]').html('Balack\'s Cove Configuration');
	$('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span>' + 
	'<li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below for each conditions</li>' +
	'<li tittle="Auto travel to Balack Cove"><span class="paramDesc">Auto Travel</span><input type="checkbox" name="chkTravel" />Travel to Balack Cove when washed to JoD</li>' +
	
	'</ul><ul><span class="groupTitle">Trap Setup</span>' + 
	'<li title="You won\'t transferred automatically to Cove if you don\'t have Vengeful or Vanilla Stilton, hunt in JoD with this setup"><span class="paramDesc">Jungle of Dread</span>' + generateTrapSetupCombo('Jungle') + '</li>' +
	'<li title="Trap setup when high tide"><span class="paramDesc">High Tide</span>' + generateTrapSetupCombo('high') + '</li>' +
	'<li title="Trap setup when mid tide"><span class="paramDesc">Mid Tide</span>' + generateTrapSetupCombo('mid') + '</li>' +
	'<li title="Trap setup when low tide"><span class="paramDesc">Low Tide</span>' + generateTrapSetupCombo('low') + '</li>' +

	'</ul><br>');
	$('div#AutoHornWindow div[name="main"]').css({'overflow-y':'auto', 'height':'350px'});
	$('div#AutoHornWindow div[name="main"] ul').css({'list-style-type':'none','margin':'0px'});
	$('div#AutoHornWindow div[name="main"] .groupTitle').css({'font-weight':'bold','font-size':'1.2em'});
	$('div#AutoHornWindow div[name="main"] .paramDesc').css({'font-weight':'bold','float':'left','width':'150', 'padding-left':'20px'});
	$('div#AutoHornWindow div[name="main"] select').css({'width':'300px'});
	$('div#AutoHornWindow div[name="main"] input.short').css({'width':'20px'});
	$('div#AutoHornWindow div[name="main"] br').css({'clear':'left'});
	
	populateComboTrap(availableTraps);

	$('div#AutoHornWindow div[name="main"] select').css({'width':'100px'});

	if (trapConfig.BalackCove.enabled) $('div#AutoHornWindow input[name="chkEnable"]').attr('checked', 'checked');
	if (trapConfig.BalackCove.travel) $('div#AutoHornWindow input[name="chkTravel"]').attr('checked', 'checked');
	setSelectionComboTrap('Jungle', trapConfig.BalackCove.jod);
	setSelectionComboTrap('high', trapConfig.BalackCove.high);
	setSelectionComboTrap('mid', trapConfig.BalackCove.mid);
	setSelectionComboTrap('low', trapConfig.BalackCove.low);

	$('div#AutoHornWindow a[href="#save"]').click(function(e){
		e.preventDefault();
		trapConfig.BalackCove.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
		trapConfig.BalackCove.travel = $('div#AutoHornWindow input[name="chkTravel"]:checked').length;
		getSelectionComboTrap('Jungle', trapConfig.BalackCove.jod);
		getSelectionComboTrap('high', trapConfig.BalackCove.high);
		getSelectionComboTrap('mid', trapConfig.BalackCove.mid);
		getSelectionComboTrap('low', trapConfig.BalackCove.low);
	
		var str = JSON.stringify(trapConfig);
		saveParam('trapConfig', str);
		$('div#AutoHornWindow').hide();
		$('div#AutoHornMask').hide();
		checkLocation();
	});
	$('div#AutoHornWindow a[href="#default"]').click(function(e){
		e.preventDefault();
		$('div#AutoHornWindow input[name="chkEnable"]').removeAttr('checked');
		$('div#AutoHornWindow input[name="chkTravel"]').removeAttr('checked');
		$('div#AutoHornWindow select[name^="cbo"] option').each(function(){ $(this).removeAttr('selected'); });
	});
	var winH = $(window).height();
	var winW = $(window).width();
    $('div#AutoHornWindow').css({'top':(winH - $('div#AutoHornWindow').height())/2, 'left':(winW - $('div#AutoHornWindow').width())/2});
    $('div#AutoHornMask').css({'top':'0', 'left':'0', 'width':winW, 'height':winH});
	$('div#AutoHornMask').fadeTo(0,0.8);
	$('div#AutoHornWindow').fadeIn(2000);
}

function showWarpathPage(){
	$('div#AutoHornWindow a[href="#save"]').unbind('click');
	$('div#AutoHornWindow a[href="#default"]').unbind('click');
	$('div#AutoHornWindow div[name="top"]').html('Warpath Configuration');
	$('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span>' + 
	'<li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below for each conditions</li>' +
	
	'</ul><ul><span class="groupTitle">Trap Setup</span>' + 
	'<li title="Against Warrior, Scout, and Archer"><span class="paramDesc">Physical</span>' + generateTrapSetupCombo('Physical') + '</li>' +
	'<li title="Tactical setup against Cavalry"><span class="paramDesc">Cavalry</span>' + generateTrapSetupCombo('Tactical') + '</li>' +
	'<li title="Hydro setup against Mage"><span class="paramDesc">Mage</span>' + generateTrapSetupCombo('Hydro') + '</li>' +
	'<li title="Arcane setup against Artillery"><span class="paramDesc">Artillery</span>' + generateTrapSetupCombo('Arcane') + '</li>' +
	'<li title="Trap setup against Commander"><span class="paramDesc">Commander</span>' + generateTrapSetupCombo('General') + '</li>' +
	'<li title="Trap setup against Gargantua"><span class="paramDesc">Gargantua</span>' + generateTrapSetupCombo('Gargantua') + '</li>' +
	'<li title="Trap setup against Theurgy Warden"><span class="paramDesc">Theurgy Warden</span>' + generateTrapSetupCombo('Warden') + '</li>' +
	'<li title="Trap setup against Warmonger"><span class="paramDesc">Warmonger</span>' + generateTrapSetupCombo('Warmonger') + '</li>' +

	'</ul><ul><span class="groupTitle">Wave 1</span>' + 
	'<li title="Strategy used when no streak"><span class="paramDesc">No Streak</span><input type="radio" name="wave1openSelection" value="true" />don\'t waste charm <input type="radio" name="wave1openSelection" value="false" />use charm</li>' +
	'<li title="Strategy used against physical mouse"><span class="paramDesc">Physical Targeting</span><input type="radio" name="wave1targetPhysical" value="true" />max population <input type="radio" name="wave1targetPhysical" value="false" />min population</li>' +
	'<li title="Streak to use SuperBrie (if available)" class="wave1superBrie-eachstreak"><span class="paramDesc">SuperBrie</span></li>' +
	'<li title="Streak to use Super version of charm (if available)" class="wave1superCharm-eachstreak"><span class="paramDesc">SuperCharm</span></li>' +
	'<li title="Commander Charm use"><span class="paramDesc">Commander</span>Aim for commander if at least <input type="text" name="wave1minGeneral" class="short" /> mouse will retreat</li>' +
	'<li title="Target maximum streak"><span class="paramDesc">Max Streak</span><input type="text" name="wave1maxStreak" class="short" /> streaks, then <input type="radio" name="wave1gargantua" value="true" />aim for gargantua <input type="radio" name="wave1gargantua" value="false" />continue next cycle</li>' +

	'</ul><ul><span class="groupTitle">Wave 2</span>' + 
	'<li title="Strategy used against physical mouse"><span class="paramDesc">Physical Targeting</span><input type="radio" name="wave2targetPhysical" value="true" />max population <input type="radio" name="wave2targetPhysical" value="false" />min population</li>' +
	'<li title="Strategy used against non-physical mouse"><span class="paramDesc">Non-Physical Targeting</span><input type="radio" name="wave2targetNonPhysical" value="true" />max population <input type="radio" name="wave2targetNonPhysical" value="false" />min population</li>' +
	'<li title="Should cham used against non-physical mouse if any"><span class="paramDesc">Non-Physical Charm</span><input type="radio" name="wave2charmNonPhysical" value="true" />Yes, use charms <input type="radio" name="wave2charmNonPhysical" value="false" />No, keep those charms</li>' +
	'<li title="Allow targeting non-physical when accidentally cathed even if physical exist"><span class="paramDesc">Allow Non-Physical Streak</span><input type="radio" name="wave2allowNonPhysical" value="true" />Yes, only if I have required charm <input type="radio" name="wave2allowNonPhysical" value="false" />No, physical first</li>' +
	'<li title="Streak to use SuperBrie (if available)" class="wave2superBrie-eachstreak"><span class="paramDesc">SuperBrie</span></li>' +
	'<li title="Streak to use Super version of charm (if available)" class="wave2superCharm-eachstreak"><span class="paramDesc">SuperCharm</span></li>' +
	'<li title="Commander Charm use"><span class="paramDesc">Commander</span>Aim for commander if at least <input type="text" name="wave2minGeneral" class="short" /> mouse will retreat</li>' +
	'<li title="Target maximum streak"><span class="paramDesc">Max Streak</span><input type="text" name="wave2maxStreak" class="short" /> streaks, then <input type="radio" name="wave2gargantua" value="true" />aim for gargantua <input type="radio" name="wave2gargantua" value="false" />continue next cycle</li>' +

	'</ul><ul><span class="groupTitle">Wave 3</span>' + 
	'<li title="Strategy used against physical mouse"><span class="paramDesc">Physical Targeting</span><input type="radio" name="wave3targetPhysical" value="true" />max population <input type="radio" name="wave3targetPhysical" value="false" />min population</li>' +
	'<li title="Strategy used against non-physical mouse"><span class="paramDesc">Non-Physical Targeting</span><input type="radio" name="wave3targetNonPhysical" value="true" />max population <input type="radio" name="wave3targetNonPhysical" value="false" />min population</li>' +
	'<li title="Should cham used against non-physical mouse if any"><span class="paramDesc">Non-Physical Charm</span><input type="radio" name="wave3charmNonPhysical" value="true" />Yes, use charms <input type="radio" name="wave3charmNonPhysical" value="false" />No, keep those charms</li>' +
	'<li title="Allow targeting non-physical when accidentally cathed even if physical exist"><span class="paramDesc">Allow Non-Physical Streak</span><input type="radio" name="wave3allowNonPhysical" value="true" />Yes, only if I have required charm <input type="radio" name="wave3allowNonPhysical" value="false" />No, physical first</li>' +
	'<li title="Streak to use SuperBrie (if available)" class="wave3superBrie-eachstreak"><span class="paramDesc">SuperBrie</span></li>' +
	'<li title="Streak to use Super version of charm (if available)" class="wave3superCharm-eachstreak"><span class="paramDesc">SuperCharm</span></li>' +
	'<li title="Commander Charm use"><span class="paramDesc">Commander</span>Aim for commander if at least <input type="text" name="wave3minGeneral" class="short" /> mouse will retreat</li>' +
	'<li title="Target maximum streak"><span class="paramDesc">Max Streak</span><input type="text" name="wave3maxStreak" class="short" /> streaks, then <input type="radio" name="wave3gargantua" value="true" />aim for gargantua <input type="radio" name="wave3gargantua" value="false" />continue next cycle</li>' +

	'</ul><br>');
	for (var i = 0; i < 13; i++){
		$('div#AutoHornWindow div[name="main"] li[class$="-eachstreak"]').each(function(){
			var kelas = $(this).attr('class');
			kelas = kelas.substring(0,kelas.lastIndexOf('-'));
			var checked = trapConfig.FieryWarpath[kelas.substring(0,5)][kelas.substring(5)] & Math.pow(2,i);
			$(this).append('<input type="checkbox" name="' + (kelas + '-' + i) + '" ' + (checked ? 'checked="checked" ' : "") + '/>' + i + '  ');
		});
	}
	$('div#AutoHornWindow div[name="main"]').css({'overflow-y':'auto', 'height':'350px'});
	$('div#AutoHornWindow div[name="main"] ul').css({'list-style-type':'none','margin':'0px'});
	$('div#AutoHornWindow div[name="main"] .groupTitle').css({'font-weight':'bold','font-size':'1.2em'});
	$('div#AutoHornWindow div[name="main"] .paramDesc').css({'font-weight':'bold','float':'left','width':'150', 'padding-left':'20px'});
	$('div#AutoHornWindow div[name="main"] select').css({'width':'300px'});
	$('div#AutoHornWindow div[name="main"] input.short').css({'width':'20px'});
	$('div#AutoHornWindow div[name="main"] br').css({'clear':'left'});
	
	populateComboTrap(availableTraps);

	$('div#AutoHornWindow div[name="main"] select').css({'width':'100px'});

	if (trapConfig.FieryWarpath.enabled) $('div#AutoHornWindow input[name="chkEnable"]').attr('checked', 'checked');
	setSelectionComboTrap('Physical', trapConfig.FieryWarpath.physical);
	setSelectionComboTrap('Tactical', trapConfig.FieryWarpath.tactical);
	setSelectionComboTrap('Hydro', trapConfig.FieryWarpath.hydro);
	setSelectionComboTrap('Arcane', trapConfig.FieryWarpath.arcane);
	setSelectionComboTrap('General', trapConfig.FieryWarpath.general);
	setSelectionComboTrap('Gargantua', trapConfig.FieryWarpath.gargantua);
	setSelectionComboTrap('Warden', trapConfig.FieryWarpath.warden);
	setSelectionComboTrap('Warmonger', trapConfig.FieryWarpath.warmonger);
	$('div#AutoHornWindow div[name="main"] input[name^="wave"]').not('li[class$="-eachstreak"] input').each(function(){
		var nilai = trapConfig.FieryWarpath[$(this).attr('name').substring(0,5)][$(this).attr('name').substring(5)];
		if ($(this).attr('type') == "text") {
			$(this).val(nilai);
		} else if ($(this).attr('type') == "radio"){
			if (new String(nilai) == $(this).val()) $(this).attr("checked","checked");
		}
	});	

	$('div#AutoHornWindow a[href="#save"]').click(function(e){
		e.preventDefault();
		trapConfig.FieryWarpath.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
		getSelectionComboTrap('Physical', trapConfig.FieryWarpath.physical);
		getSelectionComboTrap('Tactical', trapConfig.FieryWarpath.tactical);
		getSelectionComboTrap('Hydro', trapConfig.FieryWarpath.hydro);
		getSelectionComboTrap('Arcane', trapConfig.FieryWarpath.arcane);
		getSelectionComboTrap('General', trapConfig.FieryWarpath.general);
		getSelectionComboTrap('Gargantua', trapConfig.FieryWarpath.gargantua);
		getSelectionComboTrap('Warden', trapConfig.FieryWarpath.warden);
		getSelectionComboTrap('Warmonger', trapConfig.FieryWarpath.warmonger);
		$('div#AutoHornWindow div[name="main"] input[name^="wave"]').not('li[class$="-eachstreak"] input').each(function(){
			var nilai;
			if ($(this).attr('type') == "text") {
				nilai = (isNaN($(this).val()) ? $(this).val() : parseInt($(this).val()));
				trapConfig.FieryWarpath[$(this).attr('name').substring(0,5)][$(this).attr('name').substring(5)] = nilai;
			} else if ($(this).attr('type') == "radio" && $(this).attr('checked')){
				if ($(this).val() == 'true') nilai = true;
				else if ($(this).val() == 'false') nilai = false;
				else nilai = $(this).val();
				trapConfig.FieryWarpath[$(this).attr('name').substring(0,5)][$(this).attr('name').substring(5)] = nilai;
			}
		});
		var tmp = {wave1:{superBrie:0,superCharm:0},wave2:{superBrie:0,superCharm:0},wave3:{superBrie:0,superCharm:0}};
		$('div#AutoHornWindow div[name="main"] li[class$="-eachstreak"] input:checked').each(function(){
			var nama = $(this).attr('name');
			tmp[nama.substring(0,5)][nama.substring(5, nama.lastIndexOf('-'))] += Math.pow(2,parseInt(nama.substring(nama.lastIndexOf('-') + 1)));
		});
		jQuery.extend(true, trapConfig.FieryWarpath, tmp);
	
		var str = JSON.stringify(trapConfig);
		saveParam('trapConfig', str);
		$('div#AutoHornWindow').hide();
		$('div#AutoHornMask').hide();
		checkLocation();
	});
	$('div#AutoHornWindow a[href="#default"]').click(function(e){
		e.preventDefault();
		$('div#AutoHornWindow input[name="chkEnable"]').removeAttr('checked');
		$('div#AutoHornWindow select[name^="cbo"] option').each(function(){ $(this).removeAttr('selected'); });
		var def = {wave1:{maxStreak:9,gargantua:true,minGeneral:99,targetPhysical:true,charmNonPhysical:false,openSelection:true},wave2:{maxStreak:9,gargantua:true,minGeneral:99,targetPhysical:true,charmNonPhysical:true,targetNonPhysical:false,allowNonPhysical:false},wave3:{maxStreak:9,gargantua:true,minGeneral:99,targetPhysical:true,charmNonPhysical:true,targetNonPhysical:false,allowNonPhysical:false}};
		$('div#AutoHornWindow div[name="main"] input[name^="wave"]').not('li[class$="-eachstreak"] input').each(function(){
			var nilai = def[$(this).attr('name').substring(0,5)][$(this).attr('name').substring(5)];
			if ($(this).attr('type') == "text") {
				$(this).val(nilai);
			} else if ($(this).attr('type') == "radio"){
				if (new String(nilai) == $(this).val()) $(this).attr("checked","checked");
			}
		});	
		$('div#AutoHornWindow div[name="main"] li[class$="-eachstreak"] input').each(function(){
			$(this).removeAttr('checked');
		});
	});
	var winH = $(window).height();
	var winW = $(window).width();
    $('div#AutoHornWindow').css({'top':(winH - $('div#AutoHornWindow').height())/2, 'left':(winW - $('div#AutoHornWindow').width())/2});
    $('div#AutoHornMask').css({'top':'0', 'left':'0', 'width':winW, 'height':winH});
	$('div#AutoHornMask').fadeTo(0,0.8);
	$('div#AutoHornWindow').fadeIn(2000);
}

function showIcebergPage(){
	$('div#AutoHornWindow a[href="#save"]').unbind('click');
	$('div#AutoHornWindow a[href="#default"]').unbind('click');
	$('div#AutoHornWindow div[name="top"]').html('Iceberg Configuration');
	$('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span>' + 
	'<li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below for each conditions</li>' +
	
	'</ul><ul><span class="groupTitle">Trap Setup</span>' + 
	'<li title="Trap setup for Slushy Shoreline"><span class="paramDesc">Slushy Shoreline</span>' + generateTrapSetupCombo('Slushy') + '</li>' +
	'<li title="Trap setup for phase 1 (Treacherous Tunnels)"><span class="paramDesc">Treacherous Tunnels</span>' + generateTrapSetupCombo('Phase1') + '</li>' +
	'<li title="Trap setup for phase 2 (Brutal Bulwark)"><span class="paramDesc">Brutal Bulwark</span>' + generateTrapSetupCombo('Phase2') + '</li>' +
	'<li title="Trap setup for phase 3 (Bombing Run)"><span class="paramDesc">Bombing Run</span>' + generateTrapSetupCombo('Phase3') + '</li>' +
	'<li title="Trap setup for phase 4 (The Mad Depths)"><span class="paramDesc">The Mad Depths</span>' + generateTrapSetupCombo('Phase4') + '</li>' +
	'<li title="Trap setup for phase 5 (Icewing\'s Lair)"><span class="paramDesc">Icewing\'s Lair</span>' + generateTrapSetupCombo('Phase5') + '</select></li>' +
	'<li title="Trap setup when meeting generals"><span class="paramDesc">Generals</span>' + generateTrapSetupCombo('General') + '</li>' +
	
	'</ul><ul><span class="groupTitle">Iceberg Generals</span>' + 
	'<li title="Try to catch specific general"><span class="paramDesc">Specific General</span><input type="checkbox" name="chkAltGeneral" />Try to get <select name="cboAltGeneral"><option value="General Drheller">General Drheller</option><option value="Princess Fist">Princess Fist</option><option value="Lady Coldsnap">Lady Coldsnap</option><option value="Lord Splodington">Lord Splodington</option></select></li>' +
	'<li title="Trap setup for general evasion, should be non-hydro"><span class="paramDesc">Evasion Setup</span>' + generateTrapSetupCombo('AltGeneral') + '</li>' +
	'</ul><br>');

	$('div#AutoHornWindow div[name="main"]').css({'overflow-y':'auto', 'height':'350px'});
	$('div#AutoHornWindow div[name="main"] ul').css({'list-style-type':'none','margin':'0px'});
	$('div#AutoHornWindow div[name="main"] .groupTitle').css({'font-weight':'bold','font-size':'1.2em'});
	$('div#AutoHornWindow div[name="main"] .paramDesc').css({'font-weight':'bold','float':'left','width':'150', 'padding-left':'20px'});
	$('div#AutoHornWindow div[name="main"] select').css({'width':'300px'});
	$('div#AutoHornWindow div[name="main"] br').css({'clear':'left'});
	
	populateComboTrap(availableTraps);

	$('div#AutoHornWindow div[name="main"] select').css({'width':'100px'});

	if (trapConfig.Iceberg.enabled) $('div#AutoHornWindow input[name="chkEnable"]').attr('checked', 'checked');
	if (trapConfig.Iceberg.altGeneralEnable) {
		$('div#AutoHornWindow input[name="chkAltGeneral"]').attr('checked', 'checked');
		$('div#AutoHornWindow select[name="cboAltGeneral"] option[value="' + trapConfig.Iceberg.altGeneralEnable + '"]').attr('selected', 'selected');
	}
	setSelectionComboTrap('Slushy', trapConfig.Iceberg.slushy_shoreline);
	setSelectionComboTrap('Phase1', trapConfig.Iceberg.phase1);
	setSelectionComboTrap('Phase2', trapConfig.Iceberg.phase2);
	setSelectionComboTrap('Phase3', trapConfig.Iceberg.phase3);
	setSelectionComboTrap('Phase4', trapConfig.Iceberg.phase4);
	setSelectionComboTrap('Phase5', trapConfig.Iceberg.phase5);
	setSelectionComboTrap('General', trapConfig.Iceberg.generals);
	setSelectionComboTrap('AltGeneral', trapConfig.Iceberg.altgenerals);

	$('div#AutoHornWindow a[href="#save"]').click(function(e){
		e.preventDefault();
		trapConfig.Iceberg.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
		if ($('div#AutoHornWindow input[name="chkAltGeneral"]:checked').length > 0) 
			trapConfig.Iceberg.altGeneralEnable = $('div#AutoHornWindow select[name="cboAltGeneral"]').val();
		else 
			trapConfig.Iceberg.altGeneralEnable = 0;
		getSelectionComboTrap('Slushy', trapConfig.Iceberg.slushy_shoreline);
		getSelectionComboTrap('Phase1', trapConfig.Iceberg.phase1);
		getSelectionComboTrap('Phase2', trapConfig.Iceberg.phase2);
		getSelectionComboTrap('Phase3', trapConfig.Iceberg.phase3);
		getSelectionComboTrap('Phase4', trapConfig.Iceberg.phase4);
		getSelectionComboTrap('Phase5', trapConfig.Iceberg.phase5);
		getSelectionComboTrap('General', trapConfig.Iceberg.generals);
		getSelectionComboTrap('AltGeneral', trapConfig.Iceberg.altgenerals);

		var str = JSON.stringify(trapConfig);
		saveParam('trapConfig', str);
		$('div#AutoHornWindow').hide();
		$('div#AutoHornMask').hide();
		checkLocation();
	});
	$('div#AutoHornWindow a[href="#default"]').click(function(e){
		e.preventDefault();
		$('div#AutoHornWindow input[name="chkEnable"]').removeAttr('checked');
		$('div#AutoHornWindow input[name="chkAltGeneral"]').removeAttr('checked');
		$('div#AutoHornWindow select[name^="cbo"] option').each(function(){ $(this).removeAttr('selected'); });
	});
		
	var winH = $(window).height();
	var winW = $(window).width();
    $('div#AutoHornWindow').css({'top':(winH - $('div#AutoHornWindow').height())/2, 'left':(winW - $('div#AutoHornWindow').width())/2});
    $('div#AutoHornMask').css({'top':'0', 'left':'0', 'width':winW, 'height':winH});
	$('div#AutoHornMask').fadeTo(0,0.8);
	$('div#AutoHornWindow').fadeIn(2000);
}

function showZugzwangPage(){
	$('div#AutoHornWindow a[href="#save"]').unbind('click');
	$('div#AutoHornWindow a[href="#default"]').unbind('click');
	$('div#AutoHornWindow div[name="top"]').html('Zugzwang Configuration');
	$('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span>' + 
	'<li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below</li>' +
	
	'</ul><ul><span class="groupTitle">Seasonal Garden</span>' + 
	'<li tittle="Automatically Travel to tower when amplifier full"><span class="paramDesc">Auto Travel</span><input type="radio" name="autoTravel" value="true" />Yes, travel when my amplifier full <input type="radio" name="autoTravel" value="false" />No, thanks</li>' +
	'<li title="Trap setup for winter season (hydro)"><span class="paramDesc">Winter</span>' + generateTrapSetupCombo('Winter') + '</li>' +
	'<li title="Trap setup for spring season (physical)"><span class="paramDesc">Spring</span>' + generateTrapSetupCombo('Spring') + '</li>' +
	'<li title="Trap setup for summer season (tactical)"><span class="paramDesc">Summer</span>' + generateTrapSetupCombo('Summer') + '</li>' +
	'<li title="Trap setup for fall season (shadow)"><span class="paramDesc">Fall</span>' + generateTrapSetupCombo('Fall') + '</li>' +

	'</ul><ul><span class="groupTitle">Zugzwang Tower</span>' + 
	'<li title="Side to determine phase"><span class="paramDesc">Side</span><input type="radio" name="optTarget" value="0" />Highest Progress <input type="radio" name="optTarget" value="1" />Technic <input type="radio" name="optTarget" value="2" />Mystic <input type="radio" name="optTarget" value="3" />Both Side</li>' +
	'<li title="Trap setup for pawn"><span class="paramDesc">Pawn</span>' + generateTrapSetupCombo('Pawn') + '</li>' +
	'<li title="Trap setup for knight"><span class="paramDesc">Knight</span>' + generateTrapSetupCombo('Knight') + '</li>' +
	'<li title="Trap setup for bishop"><span class="paramDesc">Bishop</span>' + generateTrapSetupCombo('Bishop') + '</li>' +
	'<li title="Trap setup for rook"><span class="paramDesc">Rook</span>' + generateTrapSetupCombo('Rook') + '</li>' +
	'<li title="Trap setup for queen"><span class="paramDesc">Queen</span>' + generateTrapSetupCombo('Queen') + '</li>' +
	'<li title="Trap setup for king"><span class="paramDesc">King</span>' + generateTrapSetupCombo('King') + '</li>' +
	'<li title="Trap setup for chessmaster"><span class="paramDesc">Chessmaster</span>' + generateTrapSetupCombo('Chessmaster') + '</li>' +
	'</ul><br>');
	$('div#AutoHornWindow div[name="main"]').css({'overflow-y':'auto', 'height':'350px'});
	$('div#AutoHornWindow div[name="main"] ul').css({'list-style-type':'none','margin':'0px'});
	$('div#AutoHornWindow div[name="main"] .groupTitle').css({'font-weight':'bold','font-size':'1.2em'});
	$('div#AutoHornWindow div[name="main"] .paramDesc').css({'font-weight':'bold','float':'left','width':'150', 'padding-left':'20px'});
	$('div#AutoHornWindow div[name="main"] select').css({'width':'300px'});
	$('div#AutoHornWindow div[name="main"] br').css({'clear':'left'});
	
	populateComboTrap(availableTraps);

	$('div#AutoHornWindow div[name="main"] select').css({'width':'100px'});
	// set selected values
	if (trapConfig.ZugzwangTower.enabled) $('div#AutoHornWindow input[name="chkEnable"]').attr('checked', 'checked');
	if (trapConfig.SeasonalGarden.autoTravel) $('div#AutoHornWindow input[name="autoTravel"][value="true"]').attr('checked', 'checked');
	else $('div#AutoHornWindow input[name="autoTravel"][value="false"]').attr('checked', 'checked');
	$('div#AutoHornWindow input[name="optTarget"][value="' + trapConfig.ZugzwangTower.target + '"]').attr('checked', 'checked'); 
	
	setSelectionComboTrap('Winter', trapConfig.SeasonalGarden.wr);
	setSelectionComboTrap('Spring', trapConfig.SeasonalGarden.sg);
	setSelectionComboTrap('Summer', trapConfig.SeasonalGarden.sr);
	setSelectionComboTrap('Fall', trapConfig.SeasonalGarden.fl);
	setSelectionComboTrap('Pawn', trapConfig.ZugzwangTower.pawn);
	setSelectionComboTrap('Knight', trapConfig.ZugzwangTower.knight);
	setSelectionComboTrap('Bishop', trapConfig.ZugzwangTower.bishop);
	setSelectionComboTrap('Rook', trapConfig.ZugzwangTower.rook);
	setSelectionComboTrap('Queen', trapConfig.ZugzwangTower.queen);
	setSelectionComboTrap('King', trapConfig.ZugzwangTower.king);
	setSelectionComboTrap('Chessmaster', trapConfig.ZugzwangTower.chessmaster);

	$('div#AutoHornWindow a[href="#save"]').click(function(e){
		e.preventDefault();
		trapConfig.ZugzwangTower.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
		if ($('div#AutoHornWindow input[name="autoTravel"]:checked').val() == 'true') trapConfig.SeasonalGarden.autoTravel = true;
		else trapConfig.SeasonalGarden.autoTravel = false;
		trapConfig.ZugzwangTower.target = parseInt($('div#AutoHornWindow input[name="optTarget"]:checked').val());
		getSelectionComboTrap('Winter', trapConfig.SeasonalGarden.wr);
		getSelectionComboTrap('Spring', trapConfig.SeasonalGarden.sg);
		getSelectionComboTrap('Summer', trapConfig.SeasonalGarden.sr);
		getSelectionComboTrap('Fall', trapConfig.SeasonalGarden.fl);
		getSelectionComboTrap('Pawn', trapConfig.ZugzwangTower.pawn);
		getSelectionComboTrap('Knight', trapConfig.ZugzwangTower.knight);
		getSelectionComboTrap('Bishop', trapConfig.ZugzwangTower.bishop);
		getSelectionComboTrap('Rook', trapConfig.ZugzwangTower.rook);
		getSelectionComboTrap('Queen', trapConfig.ZugzwangTower.queen);
		getSelectionComboTrap('King', trapConfig.ZugzwangTower.king);
		getSelectionComboTrap('Chessmaster', trapConfig.ZugzwangTower.chessmaster);
		
		var str = JSON.stringify(trapConfig);
		saveParam('trapConfig', str);

		$('div#AutoHornWindow').hide();
		$('div#AutoHornMask').hide();
		checkLocation();
	});
	$('div#AutoHornWindow a[href="#default"]').click(function(e){
		e.preventDefault();
		$('div#AutoHornWindow input[name="chkEnable"]').removeAttr('checked');
		$('div#AutoHornWindow input[name="autoTravel"][value="false"]').attr('checked', 'checked');
		$('div#AutoHornWindow input[name="optTarget"][value="0"]').attr('checked', 'checked');
		$('div#AutoHornWindow select[name^="cbo"] option').each(function(){ $(this).removeAttr('selected'); });
	});
		
	var winH = $(window).height();
	var winW = $(window).width();
    $('div#AutoHornWindow').css({'top':(winH - $('div#AutoHornWindow').height())/2, 'left':(winW - $('div#AutoHornWindow').width())/2});
    $('div#AutoHornMask').css({'top':'0', 'left':'0', 'width':winW, 'height':winH});
	$('div#AutoHornMask').fadeTo(0,0.8);
	$('div#AutoHornWindow').fadeIn(2000);
}

function showConfigPage(){
	$('div#AutoHornWindow a[href="#save"]').unbind('click');
	$('div#AutoHornWindow a[href="#default"]').unbind('click');
	$('div#AutoHornWindow div[name="top"]').html('AutoHorn Configuration');
	$('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span><li title="extra time to be added to horn time"><span class="paramDesc">Horn Delay</span>min <input type="text" name="txtMinHorn" class="short" /> max <input type="text" name="txtMaxHorn" class="short" /> seconds</li><li title="time to opening random link"><span class="paramDesc">Random Delay</span>min <input type="text" name="txtMinRandom" class="short" /> max <input type="text" name="txtMaxRandom" class="short" /> minutes</li><li title="When to checking page for TrapCheck (mm:ss). This will using your local time."><span class="paramDesc">Trap Check</span><input type="radio" name="optTrapCheck" value="true" />Enable at <input type="text" name="txtTrapCheckMin" class="short" /> : <input type="text" name="txtTrapCheckSec" class="short" /><input type="radio" name="optTrapCheck" value="false" />Disable</li><li title="time to wait when king\'s reward appears before opening random link"><span class="paramDesc">KR Delay</span>min <input type="text" name="txtMinKR" class="short" /> max <input type="text" name="txtMaxKR" class="short" /> minutes</li><li title="toggle update timer on window title"><span class="paramDesc">Update Window Title</span><input type="radio" name="optWinTitle" value="true" />Yes <input type="radio" name="optWinTitle" value="false" />No</li></ul><ul><span class="groupTitle">Sound</span><li title="use sound as king\'s reward alert"><span class="paramDesc">Alert Sound</span><input type="radio" name="optAlert" value="true" />Yes <input type="radio" name="optAlert" value="false" />No  <input type="button" name="testSound" value="Test" /></li><li title="volume for alert"><span class="paramDesc">Sound Volume</span><input type="text" name="txtVolume" class="short" /></li></ul><br />');
	$('div#AutoHornWindow div[name="main"]').css({'overflow-y':'auto', 'height':'350px'});
	$('div#AutoHornWindow div[name="main"] ul').css({'list-style-type':'none','margin':'0px'});
	$('div#AutoHornWindow div[name="main"] .groupTitle').css({'font-weight':'bold','font-size':'1.2em'});
	$('div#AutoHornWindow div[name="main"] .paramDesc').css({'font-weight':'bold','float':'left','width':'150', 'padding-left':'20px'});
	$('div#AutoHornWindow div[name="main"] input.short').css({'width':'30px','text-align':'right'});
	$('div#AutoHornWindow div[name="main"] input.long').css({'width':'150px'});
	$('div#AutoHornWindow div[name="main"] br').css({'clear':'left'});
	
	$('div#AutoHornWindow div[name="main"] input[name="txtMinHorn"]').val(loadParam('minHornDelay', 30));
	$('div#AutoHornWindow div[name="main"] input[name="txtMaxHorn"]').val(loadParam('maxHornDelay', 120));
	$('div#AutoHornWindow div[name="main"] input[name="txtMinKR"]').val(loadParam('minKRWait', 180));
	$('div#AutoHornWindow div[name="main"] input[name="txtMaxKR"]').val(loadParam('maxKRWait', 210));
	$('div#AutoHornWindow div[name="main"] input[name="txtMinRandom"]').val(loadParam('minRandomPage', 10));
	$('div#AutoHornWindow div[name="main"] input[name="txtMaxRandom"]').val(loadParam('maxRandomPage', 20));
	$('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckMin"]').val(trapConfig.TrapCheck.min);
	$('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckSec"]').val(trapConfig.TrapCheck.sec);
	$('div#AutoHornWindow div[name="main"] input[name="txtVolume"]').val(loadParam('alertVolume', 100));
	if (loadParam('enableAlert', false)) $('div#AutoHornWindow div[name="main"] input[name="optAlert"][value="true"]').prop("checked", true);
	else $('div#AutoHornWindow div[name="main"] input[name="optAlert"][value="false"]').prop("checked", true);
	if (loadParam('updateWindowTitle', true)) $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"][value="true"]').prop("checked", true);
	else $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"][value="false"]').prop("checked", true);
	if (trapConfig.TrapCheck.enable) $('div#AutoHornWindow div[name="main"] input[name="optTrapCheck"][value="true"]').prop("checked", true);
	else $('div#AutoHornWindow div[name="main"] input[name="optTrapCheck"][value="false"]').prop("checked", true);
	$('div#AutoHornWindow div[name="main"] input[name="testSound"]').click(function(){
		if ($(this).val() == 'Test'){
			soundAlarm();
			$(this).val('Stop');
		} else {
			$('span#alarm').remove();
			$(this).val('Test');
		}
	});

	$('div#AutoHornWindow a[href="#save"]').click(function(e){
		e.preventDefault();
		saveParam('minHornDelay', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMinHorn"]').val()));
		saveParam('maxHornDelay', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMaxHorn"]').val()));
		saveParam('minKRWait', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMinKR"]').val()));
		saveParam('maxKRWait', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMaxKR"]').val()));
		saveParam('alertVolume', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtVolume"]').val()));
		saveParam('minRandomPage', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMinRandom"]').val()));
		saveParam('maxRandomPage', parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMaxRandom"]').val()));
		saveParam('enableAlert', $('div#AutoHornWindow div[name="main"] input[name="optAlert"]:checked').val()=="true" ? true : false);
		saveParam('updateWindowTitle', $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"]:checked').val()=="true" ? true : false);
		trapConfig.TrapCheck.enable = ($('div#AutoHornWindow div[name="main"] input[name="optTrapCheck"]:checked').val()=="true" ? true : false);
		trapConfig.TrapCheck.min = parseInt($('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckMin"]').val());
		trapConfig.TrapCheck.sec = parseInt($('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckSec"]').val());
		var str = JSON.stringify(trapConfig);
		saveParam('trapConfig', str);
		calculateTrapCheck();
		$('div#AutoHornWindow').hide();
		$('div#AutoHornMask').hide();
	});
	$('div#AutoHornWindow a[href="#default"]').click(function(e){
		e.preventDefault();
		$('div#AutoHornWindow div[name="main"] input[name="txtMinHorn"]').val(30);
		$('div#AutoHornWindow div[name="main"] input[name="txtMaxHorn"]').val(120);
		$('div#AutoHornWindow div[name="main"] input[name="txtMinKR"]').val(180);
		$('div#AutoHornWindow div[name="main"] input[name="txtMaxKR"]').val(210);
		$('div#AutoHornWindow div[name="main"] input[name="txtMinRandom"]').val(10);
		$('div#AutoHornWindow div[name="main"] input[name="txtMaxRandom"]').val(20);
		$('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckMin"]').val(0);
		$('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckSec"]').val(0);
		$('div#AutoHornWindow div[name="main"] input[name="txtVolume"]').val(100);
		$('div#AutoHornWindow div[name="main"] input[name="optAlert"][value="false"]').prop("checked", true);
		$('div#AutoHornWindow div[name="main"] input[name="optWinTitle"][value="true"]').prop("checked", true);
		$('div#AutoHornWindow div[name="main"] input[name="optTrapCheck"][value="false"]').prop("checked", true);
	});
		
	var winH = $(window).height();
	var winW = $(window).width();
    $('div#AutoHornWindow').css({'top':(winH - $('div#AutoHornWindow').height())/2, 'left':(winW - $('div#AutoHornWindow').width())/2});
    $('div#AutoHornMask').css({'top':'0', 'left':'0', 'width':winW, 'height':winH});
	$('div#AutoHornMask').fadeTo(0,0.8);
	$('div#AutoHornWindow').fadeIn(2000);
}

function cleanupLink(){
	$("a[href*='apps.facebook.com/mousehunt/profile.php']").add("a[href*='apps.facebook.com/mousehunt/adversaries.php?']").add("a[href*='apps.facebook.com/mousehunt/item.php']").add("a[href*='apps.facebook.com/mousehunt/inventory.php']").each(function(i){
		var link = $(this).attr('href');
		link = link.replace('apps.facebook.com/mousehunt/', 'www.mousehuntgame.com/');
		$(this).attr('href', link);
	});
    $("a[href^='https:\/\/www.mousehuntgame.com']").each(function() {
		var link = $(this).attr('href');
		link = link.replace('https:\/\/', 'http://');
		$(this).attr('href', link);
    });
	$("img[src^='https:\/\/www.mousehuntgame.com\/images\/']").each(function() {
		var link = $(this).attr('src');
		link = link.replace('https:\/\/', 'http://');
		$(this).attr('src', link);
    });
}

function saveParam(name, val){
	if (typeof unsafeWindow.user == "undefined") return;
	GM_setValue(unsafeWindow.user.user_id + ':' + name, val);
}

function loadParam(name, def){
	if (typeof unsafeWindow.user == "undefined" || typeof GM_getValue=="undefined") return def;
	return GM_getValue(unsafeWindow.user.user_id + ':' + name, def);
}

function updateAvailableTraps(newTrap){
	var tmp = {};
	for (var x in newTrap){
		if (newTrap[x].is_hidden) continue;
		tmp[newTrap[x].type] = {
			item_id : newTrap[x].item_id,
			name : newTrap[x].name,
			classification : newTrap[x].classification,
			quantity : newTrap[x].quantity
		};
		if (newTrap[x].power_type_name) tmp[newTrap[x].type].power_type_name = newTrap[x].power_type_name;
	}
	availableTraps = tmp;
	saveParam('availableTraps', JSON.stringify(availableTraps));
}

function updateAvailableQuantity(newTrap){
	var tmp = {};
	for (var x in newTrap){
		if (newTrap[x].classification != 'bait' && newTrap[x].classification != 'trinket' && newTrap[x].classification != 'weapon' && newTrap[x].classification != 'base') continue;
		if (newTrap[x].is_hidden) continue;
		tmp[newTrap[x].type] = {
			item_id : newTrap[x].item_id,
			name : newTrap[x].name,
			classification : newTrap[x].classification,
			quantity : newTrap[x].quantity
		};
		if (newTrap[x].power_type_name) tmp[newTrap[x].type].power_type_name = newTrap[x].power_type_name;
	}
	jQuery.extend(true, availableTraps, tmp);
	saveParam('availableTraps', JSON.stringify(availableTraps));
}

function ajaxRequestEffMeter(todo) {
	if (unsafeWindow.user.has_puzzle==true || currentTrap.busy) return;
	if (currentTrap.effmeter) { if (todo != undefined) todo(); return; }
	if (currentTrap.busy) setTimeout(ajaxRequestEffMeter(todo), 5000);
	currentTrap.busy = true;
	var ajax=new unsafeWindow.Ajax();
	ajax.requireLogin=true;
	ajax.responseType=unsafeWindow.Ajax.JSON;
	ajax.ondone = function(resp){
		currentTrap.busy = false;
		currentTrap.effmeter = resp.effectiveness;
		if (todo != undefined) todo();
	}
	var params={'uh':unsafeWindow.user.unique_hash};
	ajax.post(unsafeWindow.callbackurl+"managers/ajax/users/getmiceeffectiveness.php",params);
}

function ajaxRequestAvailableTraps(){
	if (unsafeWindow.user.has_puzzle==true) return;
	var ajax=new unsafeWindow.Ajax();
	ajax.requireLogin=true;
	ajax.responseType=unsafeWindow.Ajax.JSON;
	var params={'uh':unsafeWindow.user.unique_hash};
	ajax.post(unsafeWindow.callbackurl+"managers/ajax/users/gettrapcomponents.php",params);
}

function loadInitialParameters(){
	if (typeof unsafeWindow.user == "undefined") { setTimeout(function() { loadInitialParameters(); }, 500); return; }
	if (loadParam('trapConfig', null) == null) {
		saveParam('trapConfig', JSON.stringify(trapConfig));
	} else {
		jQuery.extend(true, trapConfig, jQuery.parseJSON(loadParam('trapConfig', null)));
	}
	if (loadParam('availableTraps', null) == null) {
		ajaxRequestAvailableTraps();
	} else {
		jQuery.extend(true, availableTraps, jQuery.parseJSON(loadParam('availableTraps', null)));
	}
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

$(document).ready(function(){
	cleanupLink();
	if ($('a[href$="turn.php"]').length < 1 && $('div#mobilePuzzle').length < 1){
		setTimeout(function() { document.location = defaultpage; } , 3*60*1000);
		return;
	} else {
		loadInitialParameters();
		setTimeout(function() { mulai(); } , 1000);
	}
	
	if ($('div#header div.headsup div.hudstatlist').length > 2) {
		$('div#header div.headsup div.hudstatlist:last li:last').before('<li><span class="hudstatlabel">Charm:</span>&nbsp;<span id="hud_trinketName"><a href="http://www.mousehuntgame.com/inventory.php?tab=1">None&nbsp;</a></span><span id="hud_trinketQuantityLabel">(<span id="hud_trinketQuantity">0</span>)</span></li>');
	}

	$('div.hgSideBar').prepend('<div id="AutoHorn"><ul><li><a href="#conf">AutoHorn Setting</a></li><li>Horn Timer<span name="hornTime">00:00</span></li><li>Random Timer<span name="randomTime">00:00</span></li><li>Trap Check<span name="trapCheckTime">00:00</span></li></ul></div>');
	$('div#AutoHorn').append('<br><ul id="seqConfig">Defined Trap Setup');
	$('div#AutoHorn').append('<li><a href="#balack">Balack\'s Cove</a></li>');
	$('div#AutoHorn a[href="#balack"]').click(function(e){
		e.preventDefault();
		showBalackPage();
	});
	$('div#AutoHorn').append('<li><a href="#zugzwang">Seasonal Garden - Zugzwang</a></li>');
	$('div#AutoHorn a[href="#zugzwang"]').click(function(e){
		e.preventDefault();
		showZugzwangPage();
	});
	$('div#AutoHorn').append('<li><a href="#iceberg">Slushy - Iceberg</a></li>');
	$('div#AutoHorn a[href="#iceberg"]').click(function(e){
		e.preventDefault();
		showIcebergPage();
	});
	$('div#AutoHorn').append('<li><a href="#warpath">Fiery Warpath</a></li>');
	$('div#AutoHorn a[href="#warpath"]').click(function(e){
		e.preventDefault();
		showWarpathPage();
	});
	$('div#AutoHorn').append('</ul><br>');
	$('div#hgAppContainer').append('<div id="AutoHornWindow"><div name="top"></div><div name="main"></div><div name="bottom" style="position:absolute;bottom:10px;right:10px;"><a href="#save">Save</a> | <a href="#default">Restore Default</a> | <a href="#close">Close</a></div></div>');
	$('div#hgAppContainer').append('<div id="AutoHornMask"></div>');
	$('div#AutoHornWindow').css({'background-color':'#ffffff', 'position':'fixed', 'width':'600px', 'height':'400px', 'display':'none', 'z-index':'9999', 'padding':'20px'});
	$('div#AutoHornMask').css({'background-color':'#000', 'position':'fixed', 'display':'none', 'z-index':'9998', 'padding':'0px'});
	$(window).resize(function() {
		var winH = $(window).height();
		var winW = $(window).width();
		$('div#AutoHornWindow').css({'top':(winH - $('div#AutoHornWindow').height())/2, 'left':(winW - $('div#AutoHornWindow').width())/2});
		$('div#AutoHornMask').css({'top':'0', 'left':'0', 'width':winW, 'height':winH});
	});
	$('div#AutoHornWindow div[name="top"]').css({'font-weight':'bold','font-size':'18','text-align':'center','padding-bottom':'10px'});
	$('div#AutoHorn').css({'padding-bottom':'20px', 'margin-bottom':'20px', 'border-bottom':'2px solid black'});
	$('div#AutoHorn br').css({'clear':'right'});
	$('div#AutoHorn li span').css({'float':'right'});
	$('div#AutoHorn a[href="#conf"]').click(function(e){
		e.preventDefault();
		showConfigPage();
	});
	$('div#AutoHornWindow a[href="#close"]').click(function(e){
		e.preventDefault();
		$('div#AutoHornWindow').hide();
		$('div#AutoHornMask').hide();
	});
	unsafeWindow.$(document).ajaxSuccess(function(e, xhr, opt) {
		var obj = jQuery.parseJSON(xhr.responseText);
		if (obj.components) setTimeout(function() { updateAvailableTraps(obj.components); }, 1);
		else if (obj.inventory) setTimeout(function() { updateAvailableQuantity(obj.inventory); }, 1);
		if (obj.user.has_puzzle && !alertShown) {
			alertShown = true;
			setTimeout(function() { 
				if (GM_getValue(obj.user.user_id + ':enableAlert', false)) soundAlarm(); else alert('King Reward');
			}, 1);
		}
		if (endsWith(opt.url, 'activeturn.php')) {
			currentTrap.effmeter = null;
		}
		if (obj.user.user_id) {
			if (!obj.user.has_puzzle && alertShown) {
				$('span#alarm').remove();
				alertShown = false;
			}
			setTimeout(function() { mulai(); }, 1000);
		}
	});
	
	calculateRandomPage();
	tulisWaktu();
});