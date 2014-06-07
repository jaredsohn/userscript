// ==UserScript==
// @name           grepoReportCleanup
// @author         wBw
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
			
			$('#gpRC_cbAll')[0].checked = bPluendern && bHandel && bStaerken && bEinladung;
		}

		uW.gpRC_markAll = function(cb)
		{
			var bAll = cb.checked;
			$('#gpRC_cbPluendern')[0].checked = bAll;
			$('#gpRC_cbHandel')[0].checked = bAll;
			$('#gpRC_cbStaerken')[0].checked = bAll;
			$('#gpRC_cbEinladung')[0].checked = bAll;
			
			markReports( /( increases the strenghth in the farming village | is demanding resources | is trading with | is delivering resources | You have just been invited into)/, cb.checked );
		};

		
		uW.gpRC_markStaerken = function(cb)
		{
			markReports( /( increases the strength in the farming village )/, cb.checked );
			validateButtons();
		};
		
		uW.gpRC_markPluendern = function(cb)
		{
			markReports( /( is demanding resources in the farming village )/, cb.checked );
			validateButtons();
		};
		
		uW.gpRC_markHandel = function(cb)
		{
			markReports( /( is trading with | is delivering resources )/, cb.checked );
			validateButtons();
		};

		uW.gpRC_markEinladung = function(cb)
		{
			markReports( /(You have just been invited into)/, cb.checked );
			validateButtons();
		};

		var highLights = 
		[
			{ re : />(.*Du wurdest soeben in die )(.+)( Allianz )(eingeladen)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=green>$4</font>" },
			
			{ re : />(.+ \()(.+)(\) )(liefert Rohstoffe)( nach)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=green>$4</font>$5" },

			{ re : />(.+ )(liefert Rohstoffe)( nach )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=green>$2</font>$3$4$5<font color=#6060B0>$6</font>$7" },

			{ re : />(.*Du hast )(.+)( auf )(.+)( gewirkt.)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },
			
			{ re : />(.+)( hat )(.+)( auf dich gewirkt.)/
			, rp : "><font color=red>$1</font>$2<font color=red>$3</font>$4" },

			{ re : />(.+ )(greift)( .+ \()(.+)(\) an)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },

			{ re : /(steigert die )(Stärke)( im Bauerndorf )(.+)/
			, rp : "$1<font color=green>$2</font>$3<font color=#6060B0>$4</font>" },
			
			{ re : /(fordert )(Rohstoffe)( im Bauerndorf )(.+)/
			, rp : "$1<font color=green>$2</font>$3<font color=#6060B0>$4</font>" },

			{ re : /(Spion in )(.+)( aus )(.+)( \(.+\) entdeckt\.)/
			, rp : "$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },

			{ re : />(.*)( spioniert )(.+)( \()(.+)(\) aus)/
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
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		var markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Strengthening</font>'
		                  +'<input id="gpRC_cbStaerken" type="checkbox" onclick="gpRC_markStaerken(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');

		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Farming</font>'
		              +'<input id="gpRC_cbPluendern" type="checkbox" onclick="gpRC_markPluendern(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Trade</font>'
		              +'<input id="gpRC_cbHandel" type="checkbox" onclick="gpRC_markHandel(this);"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>Invites</font>'
		              +'<input id="gpRC_cbEinladung" type="checkbox" onclick="gpRC_markEinladung(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0><b>&larr;Mark All</b></font>'
		              +'<input id="gpRC_cbAll" type="checkbox" onclick="gpRC_markAll(this);"/></label>');
		markButton.appendTo('.game_list_footer');
		
	}
	else
		l("No report list found.");
	
		
}());
