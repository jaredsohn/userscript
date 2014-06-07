// Mafia Wars Spend my Money
// version 0.3.0
// 2010-10-02
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           mw autofight fb
// @namespace      mwAutoFightfb@micron
// @description    Automatically fight some opponent with about the same mafia size or smaller.
// @include				 http://apps.facebook.com/inthemafia/*
// @include 			 http://facebook.mafiawars.com/mwfb/remote/*
// ==/UserScript==
var $ = unsafeWindow.jQuery;

var mwAutoFight = new Object();
mwAutoFight.debug = false;
mwAutoFight.stamina = null;
mwAutoFight.hp = null;
mwAutoFight.opponents = null;
mwAutoFight.blacklist = [];

mwAutoFight.start = function(){
	this.debugMsg("start");
	this.getStamina();
	this.getHp();
	this.getMafiaSize();
	this.run();
};

mwAutoFight.run = function(){
	this.debugMsg("run");
	this.getStamina();
	this.getHp();
	this.getMafiaSize();
	
	if($('.fightres_title.bad').length !== 0){
		this.blacklist.push($('.fightres_name')[1].firstChild.textContent);
	}
	

	if(this.stamina > 0 && this.hp >= 20){
		if(this.getOpponent() !== false){
			var evt = unsafeWindow.document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); 
			this.fight()[0].dispatchEvent(evt);
		}else{
			eval("unsafeWindow."+this.changeLocation());
		}
		window.setTimeout(function(){mwAutoFight.run();}, 2000);
	}
};

mwAutoFight.unframe = function(){
	this.debugMsg("unframe");
	if(window.location.href.search("http://apps.facebook.com/inthemafia/") !== -1){
		window.location = document.getElementsByClassName('canvas_iframe_util')[0].src;
	}
};

mwAutoFight.getStamina = function(){
	this.debugMsg("getStamina");
	this.stamina = unsafeWindow.User.stamina;
};

mwAutoFight.getMafiaSize = function(){
	this.debugMsg("getMafiaSize");
	this.mafiaSize = unsafeWindow.User.mafia_size;
};

mwAutoFight.getHp = function(){
	this.debugMsg("getHp");
	this.hp = unsafeWindow.User.health;
};

mwAutoFight.fight = function(){
	this.debugMsg("fight");
	
	var icedAttack = {
		mafiaSize: 0
	};
	
	var attack = {
		mafiaSize: 0
	};
	
	for(var opponent in this.opponents){
		if(this.opponents[opponent].iced === true){
			if(this.opponents[opponent].mafiaSize >= icedAttack.mafiaSize && $.inArray(this.opponents[opponent].name, this.blacklist) === -1){
				icedAttack = this.opponents[opponent];
			}
		}else{
			if(this.opponents[opponent].mafiaSize > attack.mafiaSize && $.inArray(this.opponents[opponent].name, this.blacklist) === -1){
				attack = this.opponents[opponent];
			}
		}
	}
	
	if(attack.mafiaSize === 0){
		return icedAttack.attack;
	}else{
		return attack.attack;
	}
};

mwAutoFight.getOpponent = function(){
	this.debugMsg("getOpponent");
	
	var opponents = $("table.main_table.fight_table>tbody>tr");
		
	this.opponents = new Array();
	
	opponents.each(function(index){
		var tds = $(this).find('td');
		var mafiaSize = parseInt(tds.eq(1).text());
		
		if(mafiaSize <= mwAutoFight.mafiaSize){
			var opponent = {
				name: tds.eq(0).find('a').text(),
				mafiaSize: mafiaSize,
				iced: (tds.eq(0).text().search(/\(iced\)/) !== -1)? true : false,
				attack: tds.filter('.action').find('a'),
			};
		
			mwAutoFight.opponents.push(opponent);
		}
	});
	
	if(this.opponents.length === 0){
		return false;
	}else{
		return true;
	}
};

mwAutoFight.changeLocation = function(){
	this.debugMsg("changeLocation");
	
	var currentLocation = document.getElementById("mw_city_wrapper").className;
	var travel = null;
	
	//if current location is mw_city1 (NY) travel to cuba and so on
	switch(currentLocation){ 
		case "mw_city6": 	travel = document.getElementById("travel_menu_nyc");
							break;
		case "mw_city1":	travel = document.getElementById("travel_menu_cuba");
							break;
		case "mw_city2":	travel = document.getElementById("travel_menu_moscow");
							break;
		case "mw_city3":	travel = document.getElementById("travel_menu_bangkok");
							break;
		case "mw_city4":	travel = document.getElementById("travel_menu_lv");
							break;
		case "mw_city5":	travel = document.getElementById("travel_menu_it");
	}
	
	return travel.getAttributeNode("onClick").value.replace(/(return|false)/g, '');
};

mwAutoFight.debugMsg = function(message){
	if(this.debug === true){
		unsafeWindow.console.log("MW AutoFight - "+message);
	}
};

GM_registerMenuCommand('MW AutoFight - debug', function(){mwAutoFight.debug = true; mwAutoFight.debugMsg("Debuging on");});
if(window.location.href.search("http://apps.facebook.com/inthemafia/") !== -1){
	GM_registerMenuCommand('MW AutoFight - unframe', function(){mwAutoFight.unframe();}, "u", "shift alt", "u");
}else{
	GM_registerMenuCommand('MW Autofight - start', function(){mwAutoFight.start();}, "s", "shift alt", "s");
}
