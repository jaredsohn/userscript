// ==UserScript==
// @name           grepoReportCleanup
// @author         wBw
// @license        Do what you want!
// @namespace      wBs_
// @include        http://*.grepolis.*/game/report*
// @version        1.6
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
	
	function setVal( name, value )
	{
		l( "Setting "+name+" to "+ value );
		GM_setValue( name, value );
	}


	var doHighlights = function()
	{
		// Highlights
		uW.setTimeout( setVal, 0, 'HighLighting', 'yes' );
		
		var highLights = 
		[
			{ re : />(.+ \()(.+)(\) )(Nyersanyagok kézbesítése)( nach)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=green>$4</font>$5" },

			{ re : />(.+ )(Nyersanyagok kézbesítése)( nach )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=green>$2</font>$3$4$5<font color=#6060B0>$6</font>$7" },

			{ re : />(.+ )(handelt)( Falu kereskedelem )(.+)/
			, rp : ">$1<font color=green>$2</font>$3$4" },
			
			// Foglalás támadása
			{ re : />(.+ )(\()(.+)(\))( greift )(die .+ Város )(.+) an/
			, rp : ">$1$2<font color=red>$3</font>$4<font color=#6060B0>$5</font>$6<font color=green>$7</font> an" },

			// Angriff auf eine Unterstützung von Player.
			{ re : />(.+ )(\()(.+)(\))( greift)(Saját )(.+) in (.+) \((.+)\) an/
			, rp : ">$1$2<font color=red>$3</font>$4<font color=#6060B0>$5</font>$6<font color=green>$7</font> in <font color=#6060B0>$8</font> (<font color=#6060B0>$9</font>) an" },

			// Angriff auf Player.
			{ re : />(.+ )(\()(.+)(\))( greift )(.+) an/
			, rp : ">$1$2<font color=red>$3</font>$4<font color=#6060B0>$5</font><font color=red>$6</font> an" },
			
			// Angriff von Player.
			{ re : />(.+ )(greift)( .+ \()(.+)(\) an)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },			
			
			// Gunst auf Stadt (owner + Stadt)
			{ re : />(.*Du hast )(.+)( auf )(.+)( \(.+\) gewirkt.)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },

			{ re : />(.*Du wurdest soeben in die )(.+)( Szövetség )(meghívó)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=green>$4</font>" },
			
			// Gunst auf Angriff (nur owner)
			{ re : />(.*Du hast )(.+)( auf )(.+[^)])( gewirkt.)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },
			
			{ re : />(.+)( hat )(.+)( auf dich gewirkt.)/
			, rp : "><font color=red>$1</font>$2<font color=red>$3</font>$4" },

			{ re : />(.+)( hat )(.+)( auf deine Stadt )(.+)( gewirkt.)/
			, rp : "><font color=red>$1</font>$2<font color=red>$3</font>$4<font color=#6060B0>$5</font>$6" },
						
			{ re : /(Spion in )(.+)( aus )(.+)( \(.+\) entdeckt\.)/
			, rp : "$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },

			{ re : />(.*)( spioniert )(.+)( \()(.+)(\) aus)/
			, rp : ">$1<font color=#6060B0>$2</font>$3$4<font color=red>$5</font>$6" },
			
			{ re : />(.*)( unterstützt )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=#6060B0>$2</font>$3$4<font color=#6060B0>$5</font>$6" },
			
			{ re : />(.*)( schickt | zieht )(stationierte Truppen aus )(.+)( zurück| ab)/
			, rp : "><font color=#6060B0>$1</font><font color=green>$2</font>$3<font color=red>$4</font>$5" },
			
			{ re : />( Du hast )(.+)( erfolgreich erobert\.)/
			, rp : ">$1<font color=#6060B0>$2</font> erfolgreich <font color=red>erobert</font>." },

			{ re : />( Truppenverluste )(.+)/
			, rp : "><font color=red>$1</font>$2" },
			
			{ re : />( Du konntest )(.+)( \()(.+)(\))( nicht aus )(.+)( unterst.+)/
			, rp : ">$1<font color=red>$2</font>$3<font color=#6060B0>$4</font>$5$6<font color=#6060B0>$7</font>$8" }

		];
		
		var repsubs = uW.document.getElementsByClassName( "report_subject" );
		if ( repsubs )
		{
			for ( var i=0 ; i<repsubs.length ; i++)
			{
				repsubs[i]._htmlBackup = repsubs[i].innerHTML;
				for ( var h=0 ; h<highLights.length ; h++ )
				{
					if ( repsubs[i].innerHTML.match( highLights[h].re ) )
					{
						repsubs[i].innerHTML = repsubs[i].innerHTML.replace( highLights[h].re, highLights[h].rp );
						break;
					}
				}
			}
		}		
	}
	
	undoHighlights = function()
	{
		uW.setTimeout( setVal, 0, 'HighLighting', 'no' );
		
		var repsubs = uW.document.getElementsByClassName( "report_subject" );
		if ( repsubs )
		{
			for ( var i=0 ; i<repsubs.length ; i++)
			{
				if ( repsubs[i]._htmlBackup )
				{
					repsubs[i].innerHTML = repsubs[i]._htmlBackup;
				}
			}
		}
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
			var bGunst     = $('#gpRC_cbGunst')[0].checked;
			var bHandel    = $('#gpRC_cbHandel')[0].checked;
			var bEinladung = $('#gpRC_cbEinladung')[0].checked;
			
			$('#gpRC_cbAll')[0].checked = bHandel && bGunst && bEinladung;
		}

		uW.gpRC_markAll = function(cb)
		{
			var bAll = cb.checked;
			$('#gpRC_cbGunst')[0].checked = bAll;
			$('#gpRC_cbHandel')[0].checked = bAll;
			$('#gpRC_cbEinladung')[0].checked = bAll;
			
			markReports( /( Du hast .+ auf .+ gewirkt| handelt mit dem Bauerndorf | liefert Rohstoffe nach | Du wurdest soeben in .+ Allianz eingeladen)/, bAll );
		};

	
		uW.gpRC_markGunst = function(cb)
		{
			markReports( /(Du hast .+ auf .+ gewirkt)/, cb.checked );
			validateButtons();
		};
		
		uW.gpRC_markHandel = function(cb)
		{
			markReports( /( handelt mit dem Bauerndorf | liefert Rohstoffe nach )/, cb.checked );
			validateButtons();
		};

		uW.gpRC_markEinladung = function(cb)
		{
			markReports( /(Du wurdest soeben in .+ Allianz eingeladen)/, cb.checked );
			validateButtons();
		};
		
		uW.gpRC_HL = function(cb)
		{
			if ( cb.checked )
			{
				doHighlights();
			}
			else
			{
				undoHighlights();
			}
		};



		// Create buttons
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');

		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Támogatás</font>'
		              +'<input id="gpRC_cbGunst" type="checkbox" onclick="gpRC_markGunst(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Kereskedelem</font>'
		              +'<input id="gpRC_cbHandel" type="checkbox" onclick="gpRC_markHandel(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Meghívó</font>'
		              +'<input id="gpRC_cbEinladung" type="checkbox" onclick="gpRC_markEinladung(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0><b>&larr;Összes</b></font>'
		              +'<input id="gpRC_cbAll" type="checkbox" onclick="gpRC_markAll(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		var bDoHL = true;
		
		try
		{
			if ( GM_getValue )
			{
				var sHL = GM_getValue( "HighLighting" );
				bDoHL = ( sHL != "no" );
				
				$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
				markButton = $('<label style="position:relative;float:left;"><font color=green><b>HL</b></font>'
							  +'<input id="gpRC_cbHL" type="checkbox"'+(bDoHL?" checked ":"")+'onclick="gpRC_HL(this);"/></label>');
				markButton.appendTo('.game_list_footer');
			}
		} catch ( err ) {}
		
		if ( bDoHL )
		{
			doHighlights();
		}
	}
	else
		l("No report list found.");
	
		
}());
