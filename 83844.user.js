// ==UserScript==
// @name           KleingeistSpecial
// @author         wBw
// @license        Do what you want!
// @namespace      wBs_
// @include        http://*.grepolis.com/game/player?player_id=*
// @version        1.0
// ==/UserScript==

var uW;
if (typeof unsafeWindow === 'object'){
	uW = unsafeWindow;
} else {
	uW = window;

}

// console function
var l = function (msg) 
{
	try {
		if ( typeof GM_log !== 'undefined' )
			GM_log( msg );
		else
		{
			if (  typeof opera.postError !== 'undefined' )
				opera.postError( msg );
			else
				uW.console.log(msg);
		}
	}
	catch (e) {};
}

uW.showAllTowns = function()
{
	l("Getting towns..." );

	//get jQuery
	var $ = uW.jQuery;
	
	
	var playerId = $('#player_info h3').text();
	
	var townIdRE = /showTownInfoPopup\((\d.+)\)/;
	var pointsRE = /\((\d+) Punkte\)/;
	
	var result = "St&auml;dte von Spieler [player]"+playerId+"[/player]\n\n";
	
	var lks = $('a[onclick*=showTownInfoPopup]');
	for (var lkI = 0 ; lkI<lks.length ; lkI++)
	{
		var lk = lks[lkI].parentNode.innerHTML;

		// Get infos from html

		var id     = townIdRE.exec(lk)[1];
		var points = pointsRE.exec(lk)[1];
		
		result += "\n[town]"+id+"[/town] ("+points+" Punkte)";
	}

	if ( $('#allTownsTA').length == 0)
	{
		$('#content').append( 
		"<textarea id='allTownsTA' onclick='this.select()' style='z-index: 3; position:absolute;top:0px;display:none;border:0px;width:745px;height:450px;'/>" );
	}
	
	$('#allTownsTA').html( result );
	
	$("#allTownsTA").toggle(500);
}


function init () {
	//get jQuery
	var $ = uW.jQuery;

	l("Kleingeist go!");
	
	$($('.game_header')[0]).append( 
		"<a onclick='showAllTowns();'"
		+" href='#' class='place_sim_showhide' style='float:right'/>" );
};

setTimeout( init, 250 );