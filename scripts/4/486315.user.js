// ==UserScript==
// @name        Auto Upgrade Farms test
// @namespace   upgrade
// @description Auto Upgrade Farms test
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude	http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/gold.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude  	http://analytics.traviangames.com/*
// @exclude 	http://*.traviantoolbox.com/*
// @exclude 	http://*.traviandope.com/*
// @exclude 	http://*.travianteam.com/*
// @exclude 	http://travianutility.netsons.org/*
// @exclude 	*.css
// @exclude 	*.js
// @exclude     http://*.travian.*/berichte.php*
// @exclude     http://*.travian.*/nachrichten.php*
// @exclude     http://*.travian.*/hero_*
// @exclude     http://*.travian.*/karte.php*
// @exclude     http://*.travian.*/statistiken.php*
// @exlude      http://*.travian.*/start_adventure.php*
// @version     1.0
// @grant       none
// ==/UserScript==

//thoi gian chuyen sang lang moi tu lang cu
//don vi tinh laf giay

var TIME_TO_CHANGE_VILLAGE = 20;
//var NO_UPGRADE_VILLAGES = [];
var NO_UPGRADE_VILLAGES = [0,1,2,3,4,5,6,7,8];
if(NO_UPGRADE_VILLAGES.length > 0)
	var FIRST_VILLAGE_IN_LIST = Math.max.apply(Math,NO_UPGRADE_VILLAGES) + 1;
else
	var FIRST_VILLAGE_IN_LIST = 0;

function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;                                                  
                onload();
            }
        } 
        else {
            onload();          
        }
    };
    head.appendChild(script);
}
function get_hostname() {
	url = 'http://' + window.location.hostname + '/';
    return url;
}
function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
}
function nnanh_nextVillage(url){
	window.location.href = url;
}
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

include('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
jQuery.noConflict();
    jQuery(document).ready(function() {
		var farmsBuilding = 0;
		var villagesBuilding = 0;		
		//total of structure that have been buiding
		var totalBuiding = 0;
		
		//lay du lieu tu Travian4 Beyond - SSE
		if(typeof(bld) != 'undefined'){			
			for(i = 0; i < bld.length; i++){
				totalBuiding++;
				if(bld[i].aid > 18)
					villagesBuilding++;
				else
					farmsBuilding++;
			}
		}
		//xac dinh dang choi toc nao
		//toc = jQuery(".playerName > .nation").attr('title');
		//village links list
		var villageLinksList = [];
		//lang hien tai
		var currentVillage = '';
		var currentIndex = 0;
		var currentVillageID = 0;
		//danh sach lien ket lang
		var villageLinks = jQuery("#sidebarBoxVillagelist > .sidebarBoxInnerBox > .content > ul > li > a");
		//tong so lang
		var totalVillage = villageLinks.length;
		//tat ca cac cong trinh trong lang da dc xay dung
		var villagesBuilt = jQuery("#levels").children();		
		var villageNumberBuilt = villagesBuilt.length;
		//lang uu tien xay dung
		var priorityVillages = [];
		priorityVillages[63748] = [{"aid":"22", "level":"3"},{"aid":"21", "level":"5"},{"aid":"32", "level":"10"},{"aid":"31", "level":"18"},{"aid":"30", "level":"18"}];
		priorityVillages[62638] = [{"aid":"21", "level":"5"},{"aid":"22", "level":"3"}];
		priorityVillages[61415] = [{"aid":"19", "level":"2"},{"aid":"24", "level":"2"},{"aid":"28", "level":"2"},{"aid":"19", "level":"3"},{"aid":"24", "level":"3"},{"aid":"28", "level":"3"},{"aid":"19", "level":"4"},{"aid":"24", "level":"4"},{"aid":"28", "level":"4"},{"aid":"19", "level":"5"},{"aid":"24", "level":"5"},{"aid":"28", "level":"5"},{"aid":"29", "level":"10"},{"aid":"33", "level":"5"}];
		for(i = 0; i < totalVillage; i++){
			villageLinksList[i] = villageLinks.eq(i).attr('href');
			if(villageLinks.eq(i).hasClass('active')){
				currentVillage = villageLinks.eq(i).attr('href');
				currentIndex = i;
				currentVillageID = currentVillage.split("=");
				currentVillageID = parseInt(currentVillageID[1]);
			}
		}
		
		//chuyen vao lang neu cos uu tien nang cap lang
		if(getCookie(currentVillageID + '_GoIn') != false && typeof(priorityVillages[currentVillageID]) != 'undefined' && priorityVillages.length > 0 && villagesBuilding == 0){
			url = window.location.href;
			lang = url.indexOf("dorf2");
			
			if(lang == -1){
				window.location.href = 'dorf2.php';
			}
				
			//thuc hien nang cap theo danh sach uu tien
			hasUp = false;
			//duyet qua cac cong trinh uu tien
			for(i = 0; i < priorityVillages[currentVillageID].length; i++){
				//xac dinh cap hien tai cua id can nang cap
				aidclass = "aid" + priorityVillages[currentVillageID][i].aid;
				curLevel = jQuery("#levels > div."+aidclass).html();
				Up = jQuery("#levels > div."+aidclass).hasClass('tbUpg');
				//console.log(NotUp);
				//console.log(aidclass + " " + curLevel);
				//neu level cua village nho hon leve yeu cau
				//thi tien hanh nang cap
				//nhng truoc tien phai kiem tra xem co du tao nguyen de nang cap khong
				if(parseInt(curLevel) < parseInt(priorityVillages[currentVillageID][i].level) && Up){
					//console.log(priorityVillages[currentVillageID][i].aid + "=>" + priorityVillages[currentVillageID][i].level);
					window.location.href = "build.php?id="+priorityVillages[currentVillageID][i].aid;
					hasUp = true;
					return false;
				}
			}
			setCookie(currentVillageID + '_GoIn', hasUp, null);
		}
		
		/*
		tim kiem mo farm thap nhat co the nang cap de nang cap
		*/
		
		//upgrade farms
		if(farmsBuilding < 2 && totalBuiding< 3 && typeof(farmsBuilding) != 'undefined'){
			url = window.location.href;
			lang = url.indexOf("dorf1");
			
			if(lang == -1)
				window.location.href = 'dorf1.php';
				
			//thiet lap lai cookie de vao trong lang	
			setCookie(currentVillageID + '_GoIn', false, null);	
			
			var structures = jQuery('#village_map').children();	
			var contentLinks = jQuery('map#rx').children();
			var levels = [];
			var links = [];
			var availableUpg = [];
			//lay tat ca link upgrade
			for(i = 0; i < contentLinks.length; i++){
				links.push(contentLinks.eq(i).attr('href'));
			}
			
			//tao mang cac level cua cac mo farm
			for(i = 0; i < structures.length-2; i++){
				levels.push(structures.eq(i).html());
			}
			
			//tao mang cac mo farm co the nang cap, mo farm dang nang cap se bi bo qua
			for(i = 0; i < levels.length; i++){
				if(structures[i].hasClass('tbUpg') && !structures[i].hasClass('underConstruction')){
					availableUpg[i] = structures[i];
				}
			}
			
			//lay mo farm co level thap nhat va co the upgrade de upgrade
			minLevelUpg = Math.min.apply(Math,levels);
			
			//tim vi tri cua mo farm de upgrade
			if(availableUpg.length > 0 && minLevelUpg < 10){
				var key;
				key = 0;
				while (key < contentLinks.length) {
					if (arrayHasOwnIndex(availableUpg, key)) {
						if(levels[key] == minLevelUpg){
							contentLinks.eq(key).trigger( "click" );
							return false;
						}
					}
					key++;
				}
			}
			//sau khi redirect to mo farm nho nhat
			//can thuc thi viecj nang cap
			var Upgrade = jQuery("#contract > .contractLink > button")
			if(Upgrade.hasClass('green'))
				Upgrade.trigger( "click" );			
		}
		//chang village in
		setTimeout(function(){
			if(typeof(villageLinksList) != 'undefined'){
				if(currentIndex < totalVillage - 1){
					if(typeof(villageLinksList[currentIndex + 1]) != 'undefined')
						window.location.href = villageLinksList[currentIndex + 1];
				}
				else{
					if(typeof(villageLinksList[FIRST_VILLAGE_IN_LIST]) != 'undefined')
						window.location.href = villageLinksList[FIRST_VILLAGE_IN_LIST];
				}
			}
		} ,TIME_TO_CHANGE_VILLAGE*1000);
    });
});