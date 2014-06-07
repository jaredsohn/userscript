// ==UserScript==
// @name           grepoReportCleanup
// @author         A520
// @version        0.9.9 BETA
// @license        Do what you want!
// @namespace      wBs_
// @include        http://*.grepolis.*/game/report*
// ==/UserScript==

(function () {

	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	
	//get jQuery
	var $ = uW.jQuery;
	
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

	
	var rl = uW.document.getElementById('report_list');
	
	if ( rl ) 
	{
		function markReports( re, checkIt )
		{
			var reps = uW.document.getElementsByClassName( "report_subject" );
			if ( reps )
			{
				var idRE = /\/game\/report\?id=(\d+)&amp;action=view/i;
				
				for ( var i = 0 ; i< reps.length ; i++)
				{
					var html = reps[i]._htmlBackup;
					if ( html == undefined )
						html = reps[i].innerHTML;
					if (  re.test( html ) )
					{
						// Get report id ID
						var id = idRE.exec( html )[1];
						// Get the checkbox
						var ckXPath = uW.document.evaluate(
							"//input[@type='checkbox' and @value='"+id+"']", uW.document, null
							,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
						if ( ckXPath.singleNodeValue )
						{
							// Mark it!
							ckXPath.singleNodeValue.checked = checkIt;
						}
					}
				}
			}			 
		};
		
		function validateButtons()
		{
			var bPluendern = $('#gpRC_cbPluendern')[0].checked;
			var bHandel    = $('#gpRC_cbHandel')[0].checked;
			var bStaerken  = $('#gpRC_cbStaerken')[0].checked;
			var bEinladung = $('#gpRC_cbEinladung')[0].checked;
			var bAttack = $('#gpRC_cbAttack')[0].checked;
			var bSpy = $('#gpRC_cbSpy')[0].checked;
			var bGood = $('#gpRC_cbGood')[0].checked;
			
			$('#gpRC_cbAll')[0].checked = bPluendern && bHandel && bStaerken && bEinladung;
		}

		uW.gpRC_markAll = function(cb)
		{
			var bAll = cb.checked;
			$('#gpRC_cbPluendern')[0].checked = bAll;
			$('#gpRC_cbHandel')[0].checked = bAll;
			$('#gpRC_cbStaerken')[0].checked = bAll;
			$('#gpRC_cbEinladung')[0].checked = bAll;
			$('#gpRC_cbAttack')[0].checked = bAll;
			$('#gpRC_cbSpy')[0].checked = bAll;
			$('#gpRC_cbGood')[0].checked = bAll;
			
			markReports( /( zwiększa siłę w Wiosce | grabi surowce w wiosce | handelt mit dem Bauerndorf | wysyła surowce do | Zostałeś zaproszony do sojuszu .+ | Rzuciłeś .+ | .+ rzucił | wspiera .+ | odesłał )/, cb.checked );
		};

		
		uW.gpRC_markStaerken = function(cb)
		{
			markReports( /( zwiększa siłę wioski | .+ wspiera .+| wspiera .+ | odesłał)/, cb.checked );
			validateButtons();
		};
		
		uW.gpRC_markPluendern = function(cb)
		{
			markReports( /( grabi surowce w wiosce | grabi wojska w wiosce )/, cb.checked );
			validateButtons();
		};
		
		uW.gpRC_markHandel = function(cb)
		{
			markReports( /( .+ prowadzi wymianę handlową z | wysyła surowce do )/, cb.checked );
			validateButtons();
		};

		uW.gpRC_markEinladung = function(cb)
		{
			markReports( /(Zostałeś zaproszony do sojuszu .+)/, cb.checked );
			validateButtons();
		};
		uW.gpRC_markAttack = function(cb)
		{
			markReports( /( .+ atakuje .+ )/, cb.checked );
			validateButtons();
		};
		uW.gpRC_markSpy = function(cb)
		{
			markReports( /( szpieguje | szpieg | szpiega )/, cb.checked );
			validateButtons();
		};
		uW.gpRC_markGood = function(cb)
		{
			markReports( /( Rzuciłeś | rzucił )/, cb.checked );
			validateButtons();
		};


		var highLights = 
		[
			{ re : />(.*Zostałeś zaproszony do )(sojuszu)( .+ )/
			, rp : ">$1<font color=green>$2</font><font color=#6060B0>$3</font>" },
			
			{ re : />(.+ )(wspiera)( )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=#1060B0><i>$2</i></font>$3$4$5<font color=red>$6</font>$7" },			
			
			{ re : />(.+ )(prowadzi )(wymianę handlową)( z wioską )(.+)/
			, rp : ">$1$2<font color=green>$3</font>$4<font color=#6060B0>$5</font>" },
			
			{ re : />(.+ \()(.+)(\) )(wysyła surowce)( do )/
			, rp : ">$1<font color=red>$2</font>$3<font color=green>$4</font>$5" },

			{ re : />(.+ )(wysyła surowce)( do )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=green>$2</font>$3$4$5<font color=red>$6</font>$7" },

			{ re : />(.+ )(atakuje)( .+ \()(.+)(\))/
			, rp : ">$1<font color=green>$2</font>$3<font color=red>$4</font>$5" },
			
			{ re : />(.+ \()(.+)(\) )(atakuje)( .+)/
			, rp : ">$1<font color=red>$2</font>$3<font color=green>$4</font>$5" },			

			{ re : /(zwiększa )(siłę)( wioski )(.+)/
			, rp : "$1<font color=green>$2</font>$3<font color=#6060B0>$4</font>" },
			
			{ re : />(.+ \()(.+)(\) )(wspiera)( .+)/
			, rp : ">$1<font color=red>$2</font>$3<font color=green>$4</font>$5" },
			
			{ re : />(.+)( odesłał )(wojska)( z .+)/
			, rp : "><font color=red>$1</font>$2<font color=green>$3</font>$4" },
			
			{ re : /( grabi )(surowce)( w wiosce )(.+)/
			, rp : "$1<font color=green>$2</font>$3<font color=#6060B0>$4</font>" },
			
			{ re : /( grabi )(wojska)( w wiosce )(.+)/
			, rp : "$1<font color=green>$2</font>$3<font color=#6060B0>$4</font>" },
			
			{ re : /(Rzuciłeś )(.+)( na )(.+)(\.)/
			, rp : "$1<font color=green>$2</font>$3<font color=red>$4</font>$5" },
			
			{ re : />(.+)( rzucił na ciebie )(.+)(\.)/
			, rp : "><font color=red>$1</font>$2<font color=green>$3</font>$4" },
			
			{ re : /( rząda )(surowców)( od wioski )(.+)/
			, rp : "$1<font color=green>$2</font>$3<font color=#6060B0>$4</font>" },

			{ re : /(W )(.+)( wykryto )(szpiega)( z )(.+)( \()(.+)(\).*)/
			, rp : "$1<font color=#6060B0>$2</font>$3<font color=green>$4</font>$5$6$7<font color=red>$8</font>$9" },

			{ re : />(.*)( szpieguje )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=#6060B0>$2</font>$3$4<font color=red>$5</font>$6" }

		];

		// Highlights
		var repsubs = uW.document.getElementsByClassName( "report_subject" );
		if ( repsubs )
		{
			for ( var i=0 ; i<repsubs.length ; i++)
			{
				repsubs[i]._htmlBackup = repsubs[i].innerHTML;
				for ( var h=0 ; h<highLights.length ; h++ )
				{
					repsubs[i].innerHTML = repsubs[i].innerHTML.replace( highLights[h].re, highLights[h].rp );
				}
			}
		}

		// Create buttons
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		var markButton = $('<label style="position:relative;float:left;"><font color=green><b>Wsparcie</b></font>'
		                  +'<input id="gpRC_cbStaerken" type="checkbox" onclick="gpRC_markStaerken(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');

		markButton = $('<label style="position:relative;float:left;"><font color=#ff4747><b>Grabież</b></font>'
		              +'<input id="gpRC_cbPluendern" type="checkbox" onclick="gpRC_markPluendern(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#C121B0><b><i>Handel</i></b></font>'
		              +'<input id="gpRC_cbHandel" type="checkbox" onclick="gpRC_markHandel(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#1060B5><b>Zaproszenia</b></font>'
		              +'<input id="gpRC_cbEinladung" type="checkbox" onclick="gpRC_markEinladung(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=red><b>Atak</b></font>'
		              +'<input id="gpRC_cbAll" type="checkbox" onclick="gpRC_markAttack(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#868686><b>Szpiegowanie</b></font>'
		              +'<input id="gpRC_cbAll" type="checkbox" onclick="gpRC_markSpy(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=teal><b>Boskie Moce</b></font>'
		              +'<input id="gpRC_cbAll" type="checkbox" onclick="gpRC_markGood(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		//author
		$('<div style="position:relative;float:right;">&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		markButton = $('<br><label style="position:relative;float:right;"><font color=#000000><b>modyfikacja A520 dla <a href="http://pl1.grepolis.com/game/alliance?alliance_id=244&action=profile">TROJA</a></b></font>');
		markButton.appendTo('.game_list_footer');
	}
	else
		l("No report list found.");
	
		
}());