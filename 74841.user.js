// ==UserScript==
// @name           GLB Upgrade all equipment
// @namespace      GLB
// @description    UPgrade all equipment with 1 attribute
// @author         DDCUnderground
// @include        http://goallineblitz.com/game/equipment.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 


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

	function doUpgr(){
		//get upgradeable equip
		$('div[class="equipment_content"]').each(function(z){
			if ($('div[class="tokens"]', $(this)).length == 0) {
				if ($('a[href*="/game/upgrade_equipment.pl?"]:first', $(this)).length > 0) {
					var pieceurl = $('a[href*="/game/upgrade_equipment.pl?"]:first', $(this)).attr('href');
					var pieceid = pieceurl.substring(pieceurl.indexOf('&id=')+4,pieceurl.length);
					var upgradestat = $('#selupgrade').val();
					var upgradeData = 'action=Upgrade&id=' + pieceid + '&purchase=&player_id=' + playerid +'&upgrade=' + upgradestat;
					GM_xmlhttpRequest({
							method: 'POST',
							url: 'http://goallineblitz.com' + pieceurl,
							 headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: encodeURI(upgradeData),				  	
							onload: function(response1) {
							}
						});
				}
			}
		})
        window.location.reload();
	}


	//buid upgrade button
	var upgradedbut = buildobj('input','type','button','value','Upgrade All','id','upgradedbut','name','upgradedbut');
	$(upgradedbut).insertBefore($('div[id="equipped"]'));
	$('#upgradedbut').bind('click',doUpgr);

	//build select with attributes
	var selupgrade = buildobj('select','id', 'selupgrade');
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
	$(selupgrade).insertBefore($('div[id="equipped"]'));

	//get playerid
	var playerid = $('a[href*="/game/player.pl?player_id="]').attr('href');
	playerid = playerid.substring(playerid.indexOf('=')+1, playerid.length);
	


        
})
