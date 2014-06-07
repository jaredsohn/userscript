// ==UserScript==
// @name        PKA LYRA SCRIPT + DEV OUTPUT KP TEST
// @namespace   pkalyrascript
// @include     http://lyra.astroempires.com/*
// @exclude     http://lyra.astroempires.com/
// @exclude     http://lyra.astroempires.com/account.aspx
// @exclude     http://lyra.astroempires.com/login.aspx
// @version     1
// @require				http://code.jquery.com/jquery-1.4.2.min.js
// @require				https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// @resource       jQueryUICSS  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/themes/smoothness/jquery-ui.css
// ==/UserScript==
GM_addStyle(".ui-tabs { padding: .2em; zoom: 1; }");
GM_addStyle(".ui-tabs .ui-tabs-nav { list-style: none; position: relative; padding: .2em .2em 0; }");
GM_addStyle(".ui-tabs .ui-tabs-nav li { position: relative; float: left; border-bottom-width: 0 !important; margin: 0 .2em -1px 0; padding: 0; }");
GM_addStyle(".ui-tabs .ui-tabs-nav li a { float: left; text-decoration: none; padding: .5em 1em; }");
GM_addStyle(".ui-tabs .ui-tabs-nav li.ui-tabs-selected { padding-bottom: 1px; border-bottom-width: 0; }");
GM_addStyle(".ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; }");
GM_addStyle(".ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; }");
 /* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */
GM_addStyle(".ui-tabs .ui-tabs-panel { padding: 1em 1.4em; display: block; border-width: 0; background: none; }");
GM_addStyle(".ui-tabs .ui-tabs-hide { display: none !important; }");
//TO DO:
//KOS / war + ally / NAP signaler
//Trade -> to server and back
//DEVELOPMENT OUTPUT
console.log("--------------------------------------------------");
console.log("SCRIPT LOADED !!");
console.log("--------------------------------------------------");
console.log("JQUERY LOADED !!");
console.log("--------------------------------------------------");
console.log("CREATING TABS !!");
$('#background-container').before('<ul><li><a href="#tabs-1">Game</a></li><li><a href="#tabs-2">IRC</a></li><li><a href="#tabs-3">BattleCalc</a></li></ul>');
$('body').append('<div id="tabs-2"><div id="cboxdiv" style="text-align: center; line-height: 0"><div><iframe frameborder="0" width="600" height="725" src="http://www7.cbox.ws/box/?boxid=478423&amp;boxtag=52njf6&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain7-478423" style="border:#ababab 1px solid;" id="cboxmain7-478423"></iframe></div><div><iframe frameborder="0" width="600" height="75" src="http://www7.cbox.ws/box/?boxid=478423&amp;boxtag=52njf6&amp;sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform7-478423" style="border:#ababab 1px solid;border-top:0px" id="cboxform7-478423"></iframe></div</div><div id="tabs-3"><iframe src="https://www.vig.vg/AE/aeBattleCalc.php" height="1000px" width="100%" frameborder="0"></iframe></div></div>"');
$('#background-container').wrap('<div id="tabs-1" />');
$("body").children().wrapAll('<div id="tabs" />');
$( "#tabs" ).tabs();
$("#advertising").remove();
//VARIABLES !
//GET PLAYER ID
	var baseposturl = "http://nrinf.com.pl/ae/database.php";
	var fleetposturl = "http://nrinf.com.pl/ae/database.php";
	var tradeposturl = "";
	var playerid = $(".fld_ctr").html();
//Set dev players
	if(playerid == "14825"){var rank = "superadmin";} //dapingwing
	if(playerid == "22960"){var rank = "superadmin";} //akumos
//DEVELOPMENT OUTPUT
console.log("--------------------------------------------------");
console.log("Variables set :");
console.log("Playerid = "+playerid);
console.log("Player rank = "+rank);
console.log("Fleetposturl = "+fleetposturl);
console.log("Tradeposturl = "+tradeposturl);
console.log("Baseposturl = "+baseposturl);

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////START OF AUTOSCOUT V 0.0.1 EDITION //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//WORK CYCLE :
//get page -> page type
//if page is .... ->....
/////////////////////////////////////////////////////////////////////////////////////////////////////
// PREDEFINED FUNCTIONS !MUST HAVE!
// Read a page's GET URL variables and return them as an associative array.
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
////////////////
// VARIABLES !//
////////////////
	var fleet=$.getUrlVars()["fleet"];
	var folder=$.getUrlVars()["folder"];
    var base=$.getUrlVars()["base"];
	var view=$.getUrlVars()["trade"];
    var URL=window.location.pathname; //current url
    var EDITURL=URL.replace('http://lyra.astroempires.com/','');
//development output
console.log("Fleet = "+fleet);
console.log("Base = "+base);
console.log("View = "+view);
console.log("Folder = "+folder);
console.log("URL = "+URL);
console.log("EDITURL = "+EDITURL);

//////////////////////
// THE FLEET PAGE :)//
//////////////////////
if (EDITURL.indexOf('fleet.aspx') == true){
	if(fleet != "undefined"){
		console.log("--------------------------------------------------");
		console.log("VIEWING A FLEET!");
		
		var fleetowner=$('tr>td:nth-child(1) a[href^="profile.aspx?player="]').text();
		if(fleetowner.length < 1){
			fleetowner=playerid;
		}
		var fleetownerId=$('tr>td:nth-child(1) a[href^="profile.aspx?player="]').attr("href").replace('profile.aspx?player=','');
		var fleetlocation = $('tr>td:nth-child(2) a[href^="map.aspx?loc="] small').text().replace('(','').replace(')','');
		var destination = $('tr>td:nth-child(3) a[href^="map.aspx?loc="] small').text().replace('(','').replace(')','');
		var fleettable = $('#fleet_overview table tbody tr').map(function(){
                    return [
                        $('td',this).text()//.map(function(){
						//	if($(this).text()==0){
						//	return "zero";
						//	}
                            //return $(this).text();
                        //}).get()
                    ];
                }).get();
				
		console.log("--------------------------------------------------");
		console.log("Fleet Variables :");
		console.log("Owner :"+fleetowner);
		console.log("Owner Id:"+fleetownerId)
		console.log("FleetLocation :"+fleetlocation);
		console.log("Destination :"+destination);
		console.log("Fleettable(sent as fleet) :"+fleettable);
		if(fleetposturl != ""){
		  $.post("http://nrinf.com.pl/ae/database.php",{fleetowner: fleetowner, fleetownerid: fleetownerId, fleetLocation: fleetlocation, fleetDestination: destination, fleettable: fleettable},function(data) {
     
		  });
		console.log("POSTED TO  -> "+fleetposturl);
		
		}else{
		console.log("Fleetposturl not set -> not posted");
		}
	}else{
		console.log("--------------------------------------------------");
		console.log("NOT VIEWING A FLEET! -> on fleet.aspx");
	}
}else{
	console.log("--------------------------------------------------");
	console.log("Not on Fleet.aspx");
}


if (EDITURL.indexOf('base.aspx') == true){
	if(base != "undefined"){
		console.log("--------------------------------------------------");
		console.log("VIEWING A BASE!");
		 var names =$('.box1_ctr table tr>td:nth-child(3)').html().replace(/<br>/g,', ');
         var levels =  $("'.box1_ctr table tr>td:nth-child(4)").html().replace(/<br>/g,', ');
         //var levels =(levels_part_1.split( "/" ).map( function( num ) { return parseInt( num, 10 ); }));
         var defence =($('.box1_ctr table tr>td:nth-child(5)').html().replace(/<br>/g,', '));
         var amounts =  $("'.box1_ctr table tr>td:nth-child(6)").html().replace(/<br>/g,', ');
	 //var amounts_part_1 =  $("'.box1_ctr table tr>td:nth-child(6)").text();//html().replace('<br>','/');
         //var amounts=(amounts_part_1.split( "/" ).map( function( num ) { return num; }));
         var baselocation = $('#local-header table tr:nth-child(2n)>td:nth-child(2)').text();
         var occupy = $('#base_processing-capacities table tr:nth-child(9n)>td:nth-child(2)').text();
         var ecofull = $('#base_processing-capacities table tr:nth-child(5n)>td:nth-child(2)').text();
         var econow = $('#base_processing-capacities table tr:nth-child(5n)>td:nth-child(2)').text();
         var eco = econow+"/"+ecofull;
	var trade = $('#local-header table tr>td:nth-child(6)').text();
	var owner = $('#base_processing-capacities tr:nth-child(8n)>td:nth-child(2) a[href^="profile.aspx?player="]').text();
	var ownerId = $('#base_processing-capacities tr:nth-child(8n)>td:nth-child(2) a[href^="profile.aspx?player="]').attr("href").replace('profile.aspx?player=','');
	var ownerLvl = $('#base_processing-capacities tr:nth-child(8n)>td:nth-child(2) a[href^="profile.aspx?player="]').attr("title").replace('Player level ','');
	var commander = $('.astro-details_footer small').text();
		console.log("--------------------------------------------------");
		console.log("Base Variables :");
		console.log("Names :"+names);
		console.log("Levels :"+levels);
		console.log("Defence :"+defence);
		console.log("Amounts :"+amounts);
		console.log("Baselocation:"+baselocation);
		console.log("Occupy :"+occupy);
		console.log("Ecofull :"+ecofull);
		console.log("Econow :"+econow);
		console.log("Eco :"+eco);
		console.log("Baseid :"+base);
		console.log("Trade :"+trade);
		console.log("Owner :"+owner);
		console.log("Owner ID:"+ownerId);
		console.log("Owner LVL: "+ownerLvl);
		console.log("Commander :"+commander);
		if(baseposturl != ""){
		
		//amounts = amounts.replace("<br>",",");
		//amounts = amounts.replace(",","z");
		//levels = levels.replace(",","z");
		$.post("http://nrinf.com.pl/ae/database.php",{baseid: base, name: names, level: levels, defence: defence, amount: amounts, occupy: occupy, eco: eco, baseLocation: baselocation, trade: trade, owner: owner, ownerId: ownerId, ownerLvl: ownerLvl, commander: commander, playerId: playerid},function(data) {
     
		});
		console.log("POSTED TO  -> "+baseposturl);
		}else{
		console.log("Baseposturl not set -> not posted");
		}
     }else{
		console.log("--------------------------------------------------");
		console.log("NOT VIEWING A BASE! -> on base.aspx"); 
		 }
}else{
	console.log("--------------------------------------------------");
	console.log("Not on Base.aspx");
}
console.log("--------------------------------------------------");
console.log("Here the board / messages injector will be !");
console.log("to do : add button 'get tech' on message top");
console.log("mysql on tech.php page + mysql tables");
console.log("--------------------------------------------------");
if (EDITURL.indexOf('base.aspx') == true){
	if(folder == 2){
		rowCount = $('#board_main tr').length;
		  for(i=0;i<=rowCount;i++){
			  if($("#board_main tr:nth-child("+i+") td center div").hasClass("battle-report")){
				  $(this).attr("id",i);
				  $(this).append("<a id='log"+i+"_handle'>Click here to retrieve Tech</a>")
			  }
		  }
		$(".battle-report").append();
	}
}

console.log("--------------------------------------------------");
console.log("SCRIPT END !");
console.log("--------------------------------------------------");