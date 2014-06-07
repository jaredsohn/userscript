// ==UserScript==
// @name           GLB Buy new equip set
// @namespace      GLB
// @author         tjay88
// @description    Buys one new set of equipment with one attribute.  This is an upgrade to the original script authored by DDCUnderground.
// @include        http://goallineblitz.com/game/equipment.pl?player_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==



$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};
	function doPurchase(){
		// function for purchasing equipment
		var upgradestat = $('#DDCselupgrade').val();
		var upgradecolor = $('#DDCselcolor').attr('value');

		//alert($('#DDCselupgrade').val());

		for (var i=0;i<equipids[upgradecolor].length;i++) {
			var upgradeData = 'item_id='+equipids[upgradecolor][i]+'&player_id=' + playerid +'&'+$('#DDCselupgrade').val()+'=1'; //upgrade=' + upgradestat;
			$.ajax({
				 async: false,
				 type: 'POST',
				 url: "http://goallineblitz.com/game/buy_equipment.pl?player_id="+playerid,
			     data: encodeURI(upgradeData),
			     success: function(returned_data) {
				}
			})
		}

		window.setTimeout(function(){
			window.location.reload();
		},2000)

	}

	function buildlink(){
		var brobj1 = buildobj('br');
		var brobj2 = buildobj('br');
		var brobj3 = buildobj('br');
		//buid upgrade button
		var upgradedbut = buildobj('input','type','button','value','New Set','id','DDCNewSet','name','DDCNewSet');
		$(brobj1).insertBefore($('div[id="equipped"]'));
		$(upgradedbut).insertBefore($('div[id="equipped"]'));
		$('#DDCNewSet').bind('click',doPurchase);
	
		//build select with attributes
		var selupgrade = buildobj('select','id', 'DDCselupgrade');
		selupgrade.options[0]= new Option('strength','strength' , true, true);
		selupgrade.options[1]= new Option('speed','speed' , false, false);
		selupgrade.options[2]= new Option('agility','agility' , false, false);
		selupgrade.options[3]= new Option('jumping','jumping' , false, false);
		selupgrade.options[4]= new Option('stamina','stamina' , false, false);
		selupgrade.options[5]= new Option('vision','vision' , false, false);
		selupgrade.options[6]= new Option('confidence','confidence' , false, false);
		selupgrade.options[7]= new Option('blocking','blocking' , false, false);
		selupgrade.options[8]= new Option('tackling','tackling' , false, false);
		selupgrade.options[9]= new Option('throwing','throwing' , false, false);
		selupgrade.options[10]= new Option('catching','catching' , false, false);
		selupgrade.options[11]= new Option('carrying','carrying' , false, false);
		selupgrade.options[12]= new Option('kicking','kicking' , false, false);
		selupgrade.options[13]= new Option('punting','punting' , false, false);
		var selcolor = buildobj('select','id', 'DDCselcolor');
		selcolor.options[0]= new Option('Black','0' , true, true);
		selcolor.options[1]= new Option('White','1' , false, false);
		selcolor.options[2]= new Option('Red','2' , false, false);
		selcolor.options[3]= new Option('Yellow','3' , false, false);
		selcolor.options[4]= new Option('Green','4' , false, false);
		selcolor.options[5]= new Option('Blue','5' , false, false);
		selcolor.options[6]= new Option('Pink','6' , false, false);
		selcolor.options[7]= new Option('Grey','7' , false, false);
		selcolor.options[8]= new Option('Orange','8' , false, false);
		selcolor.options[9]= new Option('Brown','9' , false, false);
		selcolor.options[10]= new Option('Purple','10' , false, false);
    $(selupgrade).insertBefore($('div[id="equipped"]'));
		$(selcolor).insertBefore($('div[id="equipped"]'));
		$(brobj2).insertBefore($('div[id="equipped"]'));
		
		var equipbut = buildobj('input','type','button','value','Equip All','id','DDCEquipSet','name','DDCEquipSet');
		$(brobj3).insertBefore($('div[id="equipped"]'));
		$(equipbut).insertBefore($('div[id="equipped"]'));
		$('#DDCEquipSet').bind('click',equipItems);
	}
	
	function equipItems() {
		for (i in document.links){
				if (document.links[i].search.indexOf('equip=') > 0) {
			    $.ajax({
							 async: false,
							 type: 'GET',
							 url: document.links[i],
						     success: function(returned_data) {
							}
						})
				}
		}
		
		window.setTimeout(function(){
			window.location.reload();
			},2000)


}


	// get player id
	var playerid = $('a[href*="/game/player.pl?player_id="]:first').attr('href');
	if (playerid.indexOf('&')>-1) {
		playerid = playerid.substring(0,playerid.indexOf('&'));
	}
	playerid = playerid.substring(playerid.indexOf('=')+1,playerid.length);

	// build objects for insert
	buildlink();

	// build array of equip ids
    var equipids = new Array();
	equipids[0] = new Array("1","12","23","34");
    equipids[1] = new Array("24","2","13","35");
	equipids[2] = new Array("25","3","14","36");
	equipids[3] = new Array("26","4","15","37");
    equipids[4] = new Array("27","5","16","38");
    equipids[5] = new Array("28","6","17","39");
    equipids[6] = new Array("29","7","18","40");
    equipids[7] = new Array("30","8","19","41");
    equipids[8] = new Array("31","9","20","42");
    equipids[9] = new Array("32","10","21","43");
    equipids[10] = new Array("33","11","22","44");

})
