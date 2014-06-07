// ==UserScript==
// @name           EasyDelivery
// @version        0.9.0.0
// @namespace      localhost
// @author         Original author: aMiTo, Forked by: szb
// @description    Easy tool to improve delivery job.
// @match          http://*.e-sim.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @resource       myCustomCSS https://dl.dropbox.com/u/78035768/eSim/132316.user.css
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_addStyle
// ==/UserScript==

var main = function () {

	// CONSTANTS
	var VERSION = 						"E.D. 0.9.0.0";
	var URLSCRIPT = 					"http://userscripts.org/scripts/show/132316";
	// URLs
	var URLMain = 						"e-sim.org/index.html";
	var URLMyMU = 						"e-sim.org/myMilitaryUnit.html";
	var URLMUMain = 					"e-sim.org/militaryUnit.html?id=";
	var URLMUStorage = 					"e-sim.org/militaryUnitStorage.html";
	var URLMUMoney = 					"e-sim.org/militaryUnitMoneyAccount.html";
	var URLDDonatePlayerProduct = 		"e-sim.org/donateProducts.html?id=";
	var URLDonateMUProduct = 			"e-sim.org/donateProductsToMilitaryUnit.html?id=";
	var URLBattle = 					"e-sim.org/battle.html?id=";
	var URLContract = 					"e-sim.org/contract.html?id=";
	var URLMarket = 					"e-sim.org/productMarket.html";
	var URLMarketOffers = 				"e-sim.org/citizenMarketOffers.html";
	var URLMonetaryMarket = 			"e-sim.org/monetaryMarket.html";
	var URLMyShares = 					"e-sim.org/myShares.html";
	var URLStockCompany = 				"e-sim.org/stockCompany.html?id=";
	var URLStockProducts = 				"e-sim.org/stockCompanyProducts.html?id=";
	var URLTravel = 					"e-sim.org/travel.html";
	var URLEquipment =					"e-sim.org/equipment.html";
	var URLCompany = 					"e-sim.org/company.html?id=";
	var URLCompanyDetails = 			"e-sim.org/companyWorkResults.html?id=";
	var URLJobMarket =					"e-sim.org/jobMarket.html";
	var URLBattleList = 				"e-sim.org/battles.html";
	var URLMUCompanies = 				"e-sim.org/militaryUnitCompanies.html?id=";
	var URLCompanyDetails = 			"e-sim.org/companyWorkResults.html?id=";


	// VARS
	var cachedSettings = null; // GM friendly function
	var currentServer = null;
	var idPlayer = null;
	var extendedMU = false;
	var savedWorkedList = [];


	// CODE
	function initialize() {
		loadConfiguration();

		var previousSelection = getValue( "lastSelectionMUStorage" );
		setValue( "lastSelectionMUStorage", "" );

		// Do different things on diferents urls
		var localUrl = new String( window.location );
		if( localUrl.indexOf( URLMain, 0 ) >= 0 ) {

			

		// MU main page
		} else if( (localUrl.indexOf( URLMyMU, 0 ) >= 0) || (localUrl.indexOf( URLMUMain, 0 ) >= 0) ) {

			

		// MU storage
		} else if( localUrl.indexOf( URLMUStorage, 0 ) >= 0 ) {

			if( getValue( "configMUStorageDonateImprovements" ) == "true" ) {
				orderMU( "#donateProductForm", previousSelection );
				addUpdateJobsButton( "#donateProductForm" );
			}

		// MU money
		} else if( localUrl.indexOf( URLMUMoney, 0 ) >= 0 ) {

			

		// Donate player to player
		} else if( localUrl.indexOf( URLDDonatePlayerProduct, 0 ) >= 0 ) {

			

		// Donate player to MU
		} else if( localUrl.indexOf( URLDonateMUProduct, 0 ) >= 0 ) {

			

		// Battle weapon selector
		} else if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {

			

		// Contract creator
		} else if( localUrl.indexOf( URLContract, 0 ) >= 0 ) {

			

		// Market
		} else if( localUrl.indexOf( URLMarket, 0 ) >= 0 ) {

			

		// Market offers
		} else if( localUrl.indexOf( URLMarketOffers, 0 ) >= 0 ) {

			

		// Monetary market improvements
		} else if( localUrl.indexOf( URLMonetaryMarket, 0 ) >= 0 ) {

			

		// My Shares menu
		} else if( localUrl.indexOf( URLMyShares, 0 ) >= 0 ) {

			

		// Shares main menu
		} else if( localUrl.indexOf( URLStockCompany, 0 ) >= 0 ) {

			

		// Shares company product 
		} else if( localUrl.indexOf( URLStockProducts, 0 ) >= 0 ) {

			

		// Travel
		} else if( localUrl.indexOf( URLTravel, 0 ) >= 0 ) {

			

		// Equipment
		} else if( localUrl.indexOf( URLEquipment, 0 ) >= 0 ) {

			

		// Company
		} else if( localUrl.indexOf( URLCompany, 0 ) >= 0 ) {

			

		// Company work results
		} else if( localUrl.indexOf( URLCompanyDetails, 0 ) >= 0 ) {

			

		// Job market
		} else if( localUrl.indexOf( URLJobMarket, 0 ) >= 0 ) {

			

		// List of battles
		} else if( localUrl.indexOf( URLBattleList, 0 ) >= 0 ) {

			
		}

		// Global code
		if( $( "form[action='login.html']" ).length == 0 ) {

			addVersion();
			//addConfigurationUI();
		}

	} initialize();


	// Load configuration from disk or default
	function loadConfiguration() {
		if( $( "form[action='login.html']" ).length != 0 ) { return; }

		// MU storage
		if( !getValue( "configMUStorageDonateImprovements" ) ) { setValue( "configMUStorageDonateImprovements", "true" ); }
	}


	// Disable button
	function disableButton( btn ) {
		btn.attr( "disabled", "disabled" );
		btn.addClass( "buttonDisable" );
	}


	// Enable button
	function enableButton( btn ) {
		btn.removeAttr( "disabled" );
		btn.removeClass( "buttonDisable" );
	}


	// Get ID player
	function getPlayerID() {
		if( !idPlayer ) {
			var link = $( "#userImage" ).parent().attr( "href" );
			if( link ) {
				if( link.split( "id=" ).length == 2 ) {
					idPlayer = link.split( "id=" )[1];
				}
			}
		} return( idPlayer );
	}


	// Get current server
	function getCurrentServer() {
		if( !currentServer ) {
			var localUrl = new String( window.location );
			var ini = localUrl.indexOf( "http://", 0 );
			var end = localUrl.indexOf( ".", 0 );
			currentServer = localUrl.substr( ini, end-ini+1 );
		} return( currentServer );
	}


	// To add . on numbers
	function pointNumber( n ){ 
		n = n + "";
		var i = n.length-3;
		while( i > 0 ){ n = n.substring( 0, i )+ "." + n.substring( i, n.length ); i=i-3; }
		return( n );
	}


	// getValue as GM_getValue of GM functions
	function getValue( name ) {
		name = getPlayerID() + getCurrentServer() + name;
		var value = (cachedSettings === null ? localStorage.getItem(name) : cachedSettings[name]);
		if( !value || (value === undefined) ) { return( null ); }
		return( value );
	}


	// setValue as GM_setValue of GM functions
	function setValue( name, value ) {
		name = getPlayerID() + getCurrentServer() + name;
		if (cachedSettings === null) {
			localStorage.setItem( name, value );
		} else {
			cachedSettings[name] = value;
			chrome.extension.sendRequest( { name: name, value: value } );
		}
	}


	// Get URL Vars
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function( m, key, value ) { vars[key] = value; });
		return vars;
	}


	// Add version on all pages
	function addVersion() {

		// Version
		var vers = $( "<li class='version'><a href='"+ URLSCRIPT +"' target='_blank'> " + VERSION + "</a></li>" );
		$( ".foundation-left" ).append( vers );
		$( ".foundation-left" ).append( "<li class='divider'></li>" );
	}


	// Add configuration
	function addConfigurationUI() {

		
	}


	// Order MU member
	function orderMU( idForm, varCheck ) {

		var divPlayers = $( idForm ).children( "div" ).addClass( "divListPlayers" );

		// Save data to order it
		var list = divPlayers.children();
		var tickAll = list[0];
		var playerList = [];
		var names = [];
		var player;

		// Ignore beginning BR
		for( var i=2; i<list.length; i++ ) {

			player = [];
			player[0] = list[i++];
			player[1] = list[i++];
			player[2] = list[i++];
			player[3] = list[i++];
			// Ignore BR

			names.push( player[3].textContent.toLowerCase() );
			playerList.push( player );
		}

		// Remove all children
		divPlayers.children().remove();
		divPlayers.text( "" );

		// Add tickAll button
		$( tickAll ).bind( "click", function() { 
			$( ".receipments" ).attr( "checked", "checked" );
			saveCheckedPlayers();
			return false;
		});
		divPlayers.append( tickAll );

		// Add untickAll button
		var untickAll = $( "<input type='submit' id='untickAll' value='Untick all' />" );
		untickAll.bind( "click", function() {  
			$( ".receipments" ).removeAttr( "checked" );
			setValue( "lastSelectionMUStorage", "" );
			return false;  
		});
		divPlayers.append( untickAll );

		// Add other submit button
		divPlayers.append( "<input id='donateBtn2' type='submit' value='Donate' />" );
		divPlayers.append( "<br/>" );

		// Order array by name
		names.sort();

		// Add ordered members
		var tr, td;
		var table = $( "<table class='playerTable'></table>" );
		divPlayers.append( table );
		for( i=0; i<names.length; i++ ) {

			for( var j=0; j<playerList.length; j++ ) {

				if( names[i] == playerList[j][3].textContent.toLowerCase() ) {

					tr = $( "<tr></tr>" );
					tr.append( $( "<td class='checkPlayer'></td>" ).append( playerList[j][0] ) );
					tr.append( $( "<td class='flagPlayer'></td>" ).append( playerList[j][1] ) );
					tr.append( "<td class='noSkill'></td>" );
					tr.append( $( "<td class='avatarPlayer'></td>" ).append( playerList[j][2] ) );
					tr.append( $( "<td class='namePlayer'></td>" ).append( playerList[j][3] ) );
					tr.append( "<td class='companyName'></td>" );
					tr.append( "<td class='day6'></td>" );
					tr.append( "<td class='day5'></td>" );
					tr.append( "<td class='day4'></td>" );
					tr.append( "<td class='day3'></td>" );
					tr.append( "<td class='day2'></td>" );
					tr.append( "<td class='day1'></td>" );
					tr.append( "<td class='day0'></td>" );
					tr.append( "<td></td>" );
					table.append( tr );

					tr.children( ".namePlayer" ).children( "a" ).attr( "name", playerList[j][3].textContent );

					// Resize player name
					var name = tr.children( ".namePlayer" );
					while( name.height() > (parseInt( name.css( "line-height" ).replace( "px", "" ) ) + 1) ) {
						var str = name.children( "a" ).text().replace( "...", "" );
						name.children( "a" ).text( str.slice( 0, -1 ) + "..." );
					}
				}
			}
		}


		// Check for URL vars
		if( varCheck ) {
			setValue( "lastSelectionMUStorage", varCheck );
			$( ".playerTable" ).find( ".receipments" ).each( function() {
				if( varCheck.length > 0 ) {
					if( varCheck[0] == "1" ) { $(this).attr( "checked", "checked" ); }
					varCheck = varCheck.substr( 1, varCheck.length-1 );
				}
			});
		}

		// Set Checked players
		$( ".playerTable" ).find( ".receipments" ).bind( "change", function() { saveCheckedPlayers(); });
	}


	// Set value of checked people on MU storage
	function saveCheckedPlayers() {
		var check = "";
		$( ".playerTable" ).find( ".receipments" ).each( function() {
			check += ($(this).attr( "checked" )) ? "1" : "0";
		});
		setValue( "lastSelectionMUStorage", check );
	}


	// Add update jobs button
	function addUpdateJobsButton( idForm ) {
		savedWorkedList = [];

		// Add button to see more days
		var extended = $( "<input type='button' id='extendedDays' value='Extended'/>" );
		extended.insertAfter( $( "#donateBtn2" ) );
		disableButton( extended );
		extended.bind( "click", function() {
			extendedMU = !extendedMU;

			if( extendedMU ) {
				$( ".companyName" ).hide();
				$( ".day0" ).show();
				$( ".day1" ).show();
				$( ".day2" ).show();
				$( ".day3" ).show();
				$( ".day4" ).show();
				$( ".day5" ).show();
				$( ".day6" ).show();
			} else {
				$( ".companyName" ).show();
				$( ".day0" ).show();
				$( ".day1" ).show();
				$( ".day2" ).hide();
				$( ".day3" ).hide();
				$( ".day4" ).hide();
				$( ".day5" ).hide();
				$( ".day6" ).hide();
			}
		});

		var extraDiv = $( "<div id='extraDivMUStorage' class='testDivwhite'></div>" );
		extraDiv.insertAfter( ".testDivwhite" );

		// Add update button
		var update = $( "<input type='button' id='updateWork' value='Update jobs'/>" );
		extraDiv.append( update );
		update.bind( "click", function() {

			$(this).val( "Updating... " );
			disableButton( $(this) );
			enableButton( extended );

			// Clean previous results
			$( idForm ).find( ".skill" ).children().remove();
			$( idForm ).find( ".skill" ).addClass( "noSkill" );
			$( idForm ).find( ".skill" ).removeClass( "skill" );
			$( ".companyName" ).children().remove();
			$( ".day0" ).children().remove();
			$( ".day1" ).children().remove();
			$( ".day2" ).children().remove();
			$( ".day3" ).children().remove();
			$( ".day4" ).children().remove();
			$( ".day5" ).children().remove();
			$( ".day6" ).children().remove();

			var idMU = $( ".citizenAction" ).eq(0).children( "a" ).attr( "href" );
			var split = idMU.split( "?id=" );
			if( split.length > 1 ) {
				idMU = split[1];

				// Find every player what company works
				// First MU companies
				$.ajax({
					url: getCurrentServer() + URLMUCompanies + idMU,
					success: function( data ) {

						// Special case
						var cp = $( data ).find( "a[href^='company.html']" );
						if( cp.length == 0 ) {
							enableButton( $( "#updateWork" ) );
							$( "#updateWork" ).val( "Update jobs" );

						} else {
							$( "#updateWork" ).val( "Updating... "+cp.length ); 
							$( "#updateWork" ).attr( "counter", cp.length );
						}

						for( var i=0; i<cp.length; i++ ) {
							var split = $( cp[i] ).attr( "href" ).split( "?id=" );
							if( split.length > 1 ) { checkCompany( idForm, split[1], i, cp.length-1 ) }
						}
					}
				});
			}

			return( false );
		});

		var needUpdate = false;
		var lastUpdateTime = $( "<div id='lastUpdateTime'></div>" );
		lastUpdateTime.insertAfter( update );
		if( getValue( "muStorageSaveLastTime") ) { 
			lastUpdateTime.text( getValue( "muStorageSaveLastTime") );
			var currentDate = (new Date).getDate();
			var lastDate = new Date( getValue( "muStorageSaveLastTime" ) ).getDate();
			var needUpdate = (lastDate != currentDate);
		}


		if( getValue( "muStorageSaveWorkedList") && !needUpdate ) {

			enableButton( extended );
			var workedList = getValue( "muStorageSaveWorkedList").split( "&&" );

			for( var i=0; i<workedList.length; i++ ) {
				var splitList = workedList[i].split( "," );
				var pos = $( idForm ).find( "a[name='"+ splitList[0] +"']" );
				var tr = pos.parent().parent();

				addSkill( tr, splitList[1] );
				tr.find( ".companyName" ).append( "<a href='"+ getCurrentServer() + URLCompany + splitList[2] +"'>"+ splitList[3] +"</a>" );

				var day;
				for( j=0; j<7; j++ ) {
					var t = "-" + j;
					if( j == 0 ) { t = ""; }

					if( splitList[4+j] == "true" ) {
						day = $( "<div class='dayOk' day='"+ j +"'>"+ t +"</div>" );
						tr.find( ".day" + j ).append( day );
						tr.find( "input" ).attr( "workday" + j, "true" );

					} else {
						day = $( "<div class='dayFail' day='"+ j +"'>"+ t +"</div>" );
						tr.find( ".day"+j ).append( day );
						tr.find( "input" ).attr( "workday" + j, "false" );
					}

					// Select only who worked
					day.bind( "click", function() {
						$( ".receipments" ).removeAttr( "checked" );
						$( ".receipments[workday"+ $(this).attr( "day" ) +"='true']" ).attr( "checked", "checked" );
						setCounterText();
						saveCheckedPlayers();
					});

					if( !extendedMU && (j > 1) ) { tr.find( ".day" + j ).hide(); }
				}
			}
		}
	}


	// Check each company
	function checkCompany( idForm, idComp, i, n ) {

		setTimeout( function() {

			$.ajax({
				url: getCurrentServer() + URLCompanyDetails + idComp,
				success: function( data ) { 
					checkWorkResults( idComp, idForm, data );

					if( i == n ) { 
						enableButton( $( "#updateWork" ) );
						$( "#updateWork" ).val( "Update jobs" );
						$( "#updateWork" ).removeAttr( "counter" );

						setValue( "muStorageSaveWorkedList", savedWorkedList.join( "&&" ) );
						$( "#lastUpdateTime" ).text( new Date().toUTCString() );
						setValue( "muStorageSaveLastTime", new Date().toUTCString() );

					} else {
						var count = parseInt( $( "#updateWork" ).attr( "counter" ) ) - 1;
						$( "#updateWork" ).val( "Updating... " + count ); 
						$( "#updateWork" ).attr( "counter", count );
					}
				}
			});

		}, 1000*i );
	}


	// Check every company 
	function checkWorkResults( idComp, idForm, data ) {

		var table = $( data ).find( "#productivityTable" );
		var company = $( data ).find( ".testDivblue" ).eq(1).text().replace( "Company ", "" );

		var rows = table.find( "tbody tr" );
		for( var i=1; i<rows.length; i++ ) {
			var player = "";

			var cols = $( rows[i] ).find( "td" );
			if( cols.length > 0 ) {
				var name = $( cols[0] ).find( "a" ).text();
				player = name;

				var pos = $( idForm ).find( "a[name='"+ name +"']" );
				var tr = pos.parent().parent();
				tr.find( ".companyName" ).append( "<a href='"+ getCurrentServer() + URLCompany + idComp +"'>"+ company +"</a>" );
				if( cols.length == 12 ) {

					var skillValue = parseInt( $( cols[1] ).text() );
					addSkill( tr, skillValue );
					player += "," + skillValue + "," + idComp + "," + company;

					// View last 7 days
					var day;
					for( var j=0; j<7; j++ ) {
						var t = "-" + j;
						if( j == 0 ) { t = ""; }

						if( $( cols[11-j] ).find( "img" ).length == 0 ) {
							day = $( "<div class='dayOk' day='"+ j +"'>"+ t +"</div>" );
							tr.find( ".day" + j ).append( day );
							tr.find( "input" ).attr( "workday" + j, "true" );
							player += "," + "true";

						} else {
							day = $( "<div class='dayFail' day='"+ j +"'>"+ t +"</div>" );
							tr.find( ".day"+j ).append( day );
							tr.find( "input" ).attr( "workday" + j, "false" );
							player += "," + "false";
						}

						// Select only who worked
						day.bind( "click", function() {
							$( ".receipments" ).removeAttr( "checked" );
							$( ".receipments[workday"+ $(this).attr( "day" ) +"='true']" ).attr( "checked", "checked" );
							setCounterText();
							saveCheckedPlayers();
						});

						if( !extendedMU && (j > 1) ) { tr.find( ".day" + j ).hide(); }
					}
				}

				savedWorkedList.push( player );
			}
		}
	}


	// Add skill in MU storage list
	function addSkill( tr, skillVal ) {
		var posSkill = tr.find( ".noSkill" );
		posSkill.removeClass( "noSkill" );
		posSkill.addClass( "skill" );
		posSkill.append( "<div>"+ skillVal +"</div>" );
		posSkill.bind( "click", function() {
			var v = $(this).text();
			$( ".skill" ).each( function() {
				if( v == $(this).text() ) { $(this).parent().find( "input" ).attr( "checked", "checked" ); }
			});
			setCounterText();
			saveCheckedPlayers();
		});
	}
};

function createResourceVar( name ) {
	var input = document.createElement( "input" );
	input.type = "hidden";
	input.id = name;
	input.value = GM_getResourceURL( name );
	document.body.appendChild( input );
}

// Only execute on same frame (iframes with advertisments)
if( window.top == window.self ) {

	// Inject our CSS
	GM_addStyle( GM_getResourceText( "myCustomCSS" ) );

	// Resources
	//createResourceVar( "myQualityStar" );

	// Inject our main script
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild( script );
}