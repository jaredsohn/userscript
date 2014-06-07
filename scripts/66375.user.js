// ==UserScript==
// @name           grepoReportCleanup
// @author         wBw
// @license        Do what you want!
// @namespace      wBs_
// @include        http://*.grepolis.*/game/report*
// @version        1.8.2
// ==/UserScript==

(function () {


	i18n = {
	de : {
		hightlightRE :
		[
			{ re : />(.+ \()(.+)(\) )(liefert Rohstoffe)( nach)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=green>$4</font>$5" },

			{ re : />(.+ )(liefert Rohstoffe)( nach )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=green>$2</font>$3$4$5<font color=#6060B0>$6</font>$7" },

			{ re : />(.+ )(handelt)( mit dem Bauerndorf )(.+)/
			, rp : ">$1<font color=green>$2</font>$3$4" },
			
			// Angriff auf eine Eroberung
			{ re : />(.+ )(\()(.+)(\))( greift )(die .+ Stadt )(.+) an/
			, rp : ">$1$2<font color=red>$3</font>$4<font color=#6060B0>$5</font>$6<font color=green>$7</font> an" },

			// Angriff auf eine fremde Eroberung
			{ re : /> Du greifst die von (.+) besetzte Stadt (.+) an/
			, rp : "> Du <font color=#6060B0>greifst</font> die von <font color=red>$1</font> besetzte Stadt <font color=red>$2</font> an" },
			
			// Angriff auf eine Eroberung in Deinem Dorf
			{ re : /> Du greifst den Besetzer (.+) in deiner Stadt (.+) an/i
			, rp : "> Du <font color=#6060B0>greifst</font> den Besetzer <font color=red>$1</font> in deiner Stadt <font color=#6060B0>$2</font> an" },
			
			// Angriff auf eine Unterstützung von Player.
			{ re : />(.+ )(\()(.+)(\))( greift)( deine .+ aus )(.+) in (.+) \((.+)\) an/
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

			{ re : />(.*Du wurdest soeben in die )(.+)( Allianz )(eingeladen)/
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
			
			// Eigene Unterstützungen bei anderen
			{ re : />(.*)( unterstützt )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=#6060B0>$2</font>$3$4<font color=#6060B0>$5</font>$6" },

			// Unterstützungen fremder Spieler bei Dir
			{ re : />(.+)( \()(.+)(\))( unterstützt )(.*)/
			, rp : ">$1$2<font color=#6060B0>$3</font>$4$5<font color=#6060B0>$6</font>" },
			
			{ re : />(.*)( schickt | zieht )(stationierte Truppen aus )(.+)( zurück| ab)/
			, rp : "><font color=#6060B0>$1</font><font color=green>$2</font>$3<font color=red>$4</font>$5" },
			
			{ re : />( Du hast )(.+)( erfolgreich erobert\.)/
			, rp : ">$1<font color=#6060B0>$2</font> erfolgreich <font color=red>erobert</font>." },

			{ re : /> Einige deiner Truppen aus (.+) wurden von Trümmern begraben./
			, rp : "> Einige deiner Truppen aus <font color=red>$1</font> wurden von <font color=red>Trümmern</font> begraben." },
			
			{ re : />( Du konntest )(.+)( \()(.+)(\))( nicht aus )(.+)( unterst.+)/
			, rp : ">$1<font color=red>$2</font>$3<font color=#6060B0>$4</font>$5$6<font color=#6060B0>$7</font>$8" },
			
			{ re : /> Du beginnst eine neue Stadt zu gründen./
			, rp : "> Du beginnst eine <font color=#6060B0>neue Stadt</font> zu <font color=#6060B0>gründen</font>." },
			
			{ re : /> Es konnte keine neue Stadt gegründet werden./
			, rp : "> Es konnte <font color=red>keine neue Stadt</font> gegründet werden." }
		],
				
		texts : 
		{
			ownMagic : "Eig.Gunst",
			invide   : "Einl.",
			support  : "Unterst.",
			all      : "alle markieren",
			highl    : "HL"
		},
		
		markRE : 
		[
			/(Du hast .+ auf .+ gewirkt)/,
			/(Du wurdest soeben in .+ Allianz eingeladen)/, 
			/(unterstützt | (schickt|zieht) stationierte Truppen )/		
		]
	},

	en : 
	{
		hightlightRE :
		[
			// TODO: some items still need translation
			
			// Attack on support of Player.
			{ re : />(.+ )(\()(.+)(\))( is attacking)( your support from )(.+) in (.+) \((.+)\)/
			, rp : ">$1$2<font color=red>$3</font>$4<font color=#6060B0>$5</font>$6<font color=green>$7</font> in <font color=#6060B0>$8</font> (<font color=#6060B0>$9</font>)" },
		
			// Attack on Player.
			{ re : />(.+ )(\()(.+)(\))( is attacking )(.+)/
			, rp : ">$1$2<font color=red>$3</font>$4<font color=#6060B0>$5</font><font color=red>$6</font>" },
			
			// Attack by Player.
			{ re : />(.+ )(is attacking )(.+ \()(.+)(\))/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>$5" },			
			
			// Magic on town.
			{ re : />(.*You have cast )(.+)( on )(.+)( \(.+\).)/
			, rp : ">$1<font color=#6060B0>$2</font>$3<font color=red>$4</font>" },
												
			// Own supports for other players
			{ re : />(.*)( supports )(.+)( \()(.+)(\))/
			, rp : ">$1<font color=#6060B0>$2</font>$3$4<font color=#6060B0>$5</font>$6" },

			// Support for player by other.
			{ re : />(.+)( \()(.+)(\))( supports )(.*)/
			, rp : ">$1$2<font color=#6060B0>$3</font>$4<font color=green>$5</font><font color=#6060B0>$6</font>" },
			
			{ re : />(.*)( is withdrawing )(stationed troops from )(.+)/
			, rp : "><font color=#6060B0>$1</font><font color=green>$2</font>$3<font color=red>$4</font>" },
			
			{ re : />(.*)( is sending stationed troops back from )(.+)/
			, rp : "><font color=#6060B0>$1</font> is <font color=green>sending</font> stationed troops <font color=green>back</font> from <font color=red>$3</font>" },
			
			{ re : />( You have successfully conquered )(.+)(\.)/
			, rp : "> You have successfully <font color=red>conquered</font> <font color=#6060B0>$2</font>." },

			{ re : /> You are starting to found a new city./
			, rp : "> You are starting to <font color=#6060B0>found</font> a <font color=#6060B0>new city</font>." },
			
			{ re : /> You have founded a new city./
			, rp : "> You have <font color=#6060B0>founded</font> a <font color=#6060B0>new city</font>. " },
			
			{ re : /Spy discovered in (.+) from (.+) \((.+)\)\./
			, rp : "<font color=#6060B0>Spy</font> discovered in <font color=red>$1</font> from $2 (<font color=red>$3</font>)." }

		],
		
		texts : 
		{
			ownMagic : "Own Magic",
			invide   : "Inv.",
			support  : "Support",
			all      : "mark all",
			highl    : "HL"		
		},
		
		markRE : 
		[
			/(You have cast .+ on .+)/,
			/(Du wurdest soeben in .+ Allianz eingeladen)/, 
			/(supports | stationed troops )/
		]
	} 
	};
	
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	
	//get jQuery
	var $ = uW.jQuery;

	var lang = "de";
	var sre = /(([a-zA-Z]+)\w+)\.grepolis\.\w+/.exec( uW.location.host );
	if (sre) lang = sre[2];
	if ( !i18n[lang] )
		lang = "de";
	
	var highLights = i18n[lang].hightlightRE;
	var texts      = i18n[lang].texts;	
	var markRE     = i18n[lang].markRE;

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
		function markReports()
		{
			var flags = [ 	$('#gpRC_cbGunst')[0].checked,
							$('#gpRC_cbEinladung')[0].checked,
							$('#gpRC_cbSupport')[0].checked
						];
			
			var reps = uW.document.getElementsByClassName( "report_subject" );
			if ( reps )
			{
				var idRE = /\/game\/report\?id=(\d+)&amp;action=view/i;
				
				for ( var i = 0 ; i< reps.length ; i++)
				{
					var html = reps[i]._htmlBackup;
					if ( html == undefined )
						html = reps[i].innerHTML;
					
					for ( var ri = 0 ; ri<markRE.length ; ri++ )
					{
						if (  markRE[ri].test( html ) )
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
								ckXPath.singleNodeValue.checked = flags[ri];
							}
						}
					}
				}
			}			 
		};
		
		function validateButtons()
		{
			var bGunst     = $('#gpRC_cbGunst')[0].checked;
			var bEinladung = $('#gpRC_cbEinladung')[0].checked;
			var bSupport   = $('#gpRC_cbSupport')[0].checked;
			
			$('#gpRC_cbAll')[0].checked = bGunst && bEinladung && bSupport;
		}

		uW.gpRC_markAll = function(cb)
		{
			var bAll = cb.checked;
			$('#gpRC_cbGunst')[0].checked = bAll;
			$('#gpRC_cbEinladung')[0].checked = bAll;
			$('#gpRC_cbSupport')[0].checked = bAll;
			
			markReports();
		};

	
		uW.gpRC_markIt = function(cb)
		{
			markReports();
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

		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>'+texts.ownMagic+'</font>'
		              +'<input id="gpRC_cbGunst" type="checkbox" onclick="gpRC_markIt();"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');	
				
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>'+texts.invide+'</font>'
		              +'<input id="gpRC_cbEinladung" type="checkbox" onclick="gpRC_markIt();"/></label>');
		markButton.appendTo('.game_list_footer');

		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0>'+texts.support+'</font>'
		              +'<input id="gpRC_cbSupport" type="checkbox" onclick="gpRC_markIt();"/></label>');
		markButton.appendTo('.game_list_footer');

		
		$('<div style="position:relative;float:left;">&nbsp;&nbsp;&nbsp;</div>').appendTo('.game_list_footer');
		
		markButton = $('<label style="position:relative;float:left;"><font color=#6060B0><b>&larr;'+texts.all+'</b></font>'
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
				markButton = $('<label style="position:relative;float:left;"><font color=green><b>'+texts.highl+'</b></font>'
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