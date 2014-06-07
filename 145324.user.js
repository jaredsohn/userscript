// ==UserScript==
// @name           EasyDelivery for Secura
// @version        0.4.2.1
// @namespace      localhost
// @author         aMiTo, LordmcMoney
// @description    Easy tool to improve delivery job. fixed for secura
// @match          http://secura.e-sim.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

var main = function () {

	// CONSTANTS
	// API
	var URLAPIRanks =		"http://secura.e-sim.org/apiRanks.html";
	var URLAPIRegion =		"http://secura.e-sim.org/apiRegions.html";
	// URLs
	var URLMain = 					"http://secura.e-sim.org/index.html";
	var URLMU = 					"http://secura.e-sim.org/myMilitaryUnit.html";
	var URLMUStorage = 				"http://secura.e-sim.org/militaryUnitStorage.html";
	var URLMUMoney = 				"http://secura.e-sim.org/militaryUnitMoneyAccount.html";
	var URLDDonatePlayerProduct = 	"http://secura.e-sim.org/donateProducts.html?id=";
	var URLDonateMUProduct = 		"http://secura.e-sim.org/donateProductsToMilitaryUnit.html?id=";
	var URLMUCompanies = 			"http://secura.e-sim.org/militaryUnitCompanies.html?id=";
	var URLCompanyDetails = 		"http://secura.e-sim.org/companyWorkResults.html?id=";
	var URLBattle = 				"http://secura.e-sim.org/battle.html?id=";
	var URLContract = 				"http://secura.e-sim.org/contract.html?id=";
	// Image resources
	var IMGIRON = 		"http://e-sim.home.pl/eworld/img/productIcons/Iron.png";
	var IMGGRAIN = 		"http://e-sim.home.pl/eworld/img/productIcons/Grain.png";
	var IMGOIL = 		"http://e-sim.home.pl/eworld/img/productIcons/Oil.png";
	var IMGDIAMONDS = 	"http://e-sim.home.pl/eworld/img/productIcons/Diamonds.png";
	var IMGWOOD = 		"http://e-sim.home.pl/eworld/img/productIcons/Wood.png";
	var IMGSTONE = 		"http://e-sim.home.pl/eworld/img/productIcons/Stone.png";
	var IMGWEAPON = 	"http://e-sim.home.pl/eworld/img/productIcons/Weapon.png";
	var IMGFOOD = 		"http://e-sim.home.pl/eworld/img/productIcons/Food.png";
	var IMGTICKET = 	"http://e-sim.home.pl/eworld/img/productIcons/Ticket.png";
	var IMGGIFT = 		"http://e-sim.home.pl/eworld/img/productIcons/Gift.png";
	var IMGHOUSE = 		"http://e-sim.home.pl/eworld/img/productIcons/House.png";
	var IMGDS = 		"http://e-sim.home.pl/eworld/img/productIcons/Defense System.png";
	var IMGHOSPITAL = 	"http://e-sim.home.pl/eworld/img/productIcons/Hospital.png";
	var IMGQUALITY = 	"http://e-sim.home.pl/eworld/img/productIcons/q";
	var IMGEXTENSION = 	".png";

	// VARS
	var cachedSettings = null; // GM friendly function
	var firstFastButton;
	var selectDonate;
	var selectedWeapon;
	var selectedFood;
	var selectedGift;


	// CODE
	function initialize() {

		// Only execute on same frame (iframes with advertisments)
		if( window.top != window.self ) { return; }

		// Do different things on diferents urls
		var localUrl = new String( window.location );

		// Main page
		if( localUrl.indexOf( URLMain, 0 ) == 0 ) {

			updateMUOrdersMain();

		// MU storage
		} else if( localUrl.indexOf( URLMUStorage, 0 ) == 0 ) {

			orderMU( "#donateProductForm" );
			changeSelectMUStorage( "#donateProductForm" );
			addFastButtons( "#quantity" );
			addUpdateJobsButton( "#donateProductForm" );
			addDonateToMeButton( "#donateProductForm" );
			addCounterMembersMU();

		// MU money
		} else if( localUrl.indexOf( URLMUMoney, 0 ) == 0 ) {

			orderMU( "#donateMoneyForm" );
			addDonateToMeButton( "#donateMoneyForm" );
			addCounterMembersMU();

		// Donate player to player
		} else if( localUrl.indexOf( URLDDonatePlayerProduct, 0 ) == 0 ) {

			changeSelectPlayerToPlayer();
			addFastButtons( "#quantity" );

		// Donate player to MU
		} else if( localUrl.indexOf( URLDonateMUProduct, 0 ) == 0 ) {

			changeSelectPlayerToMU();
			addFastButtons( "#quantity" );

		// Battle weapon selector
		} else if( localUrl.indexOf( URLBattle, 0 ) == 0 ) {

			calculateBonus();
			changeWeaponBattle();
			changeRoundSelector();

		// Contract creator
		} else if( localUrl.indexOf( URLContract, 0 ) == 0 ) {

			//changeCreateContract();
		}

		// Global code
		if( $( "form[action='login.html']" ).length == 0 ) { 
			changeEatButtons();
			addMUFastLinks();
		}

		// Set all buttons with pointer cursor
		$( "body" ).find( "input[type='submit']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });
		$( "body" ).find( "input[type='button']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });

	} initialize();


	// GetValue as GM_getValue of GM functions
	function GetValue( name ) {
		var value = (cachedSettings === null ? localStorage.getItem(name) : cachedSettings[name]);
		if( !value || (value === undefined) ) { return( null ); }

		return( value );
	}


	// SetValue as GM_setValue of GM functions
	function SetValue( name, value ) {
		if (cachedSettings === null) {
			localStorage.setItem( name, value );

		} else {
			cachedSettings[name] = value;
			chrome.extension.sendRequest( { name: name, value: value } );
		}
	}


	// Update MU orders if changed on main page
	function updateMUOrdersMain() {
	
		$( ".testDivblue" ).each( function() {

			if( $(this).children( "center" ).length == 2 ) {

				var savedBattle = GetValue( "MUSavedBattle" );
				var battle = $(this).find( "a[href^='battle.html?id=']" ).attr( "href" );
				var side = $(this).children( "center" ).last().find( "img" ).attr( "src" );
				side = side.replace( "small", "medium" );

				if( savedBattle != battle ) {
					SetValue( "MUSavedBattle", battle );
					SetValue( "MUSide", side );

					// Open MU page to check quality and text orders
					$.ajax({
						url: URLMU,
						success: function( data ) {
							var table = $( data ).find( ".testDivblue" ).eq(2).find( "table" );
							var tr = table.find( "tr" ).eq(0);
							var td = tr.find( "td" ).eq(1);

							var MURank = td.children( "div" ).first().contents().eq(5).text().trim().toLowerCase();
							if( MURank == "novice" ) { SetValue( "MURank", "5" );
							} else if( MURank == "regular" ) { SetValue( "MURank", "10" );
							} else if( MURank == "veteran" ) { SetValue( "MURank", "15" );
							} else if( MURank == "elite" ) { SetValue( "MURank", "20" ); }
						}
					});
				}
			} 
		});
	}


	// Update MU storage donation
	function changeSelectMUStorage( idForm ) {

		var $select = $( "#product" );
		var $pos = $( ".testDivwhite" );
		var $dest = $( "#quantity" );
	
		// Remove all childrens and add help text
		$pos.children().remove();
		$pos.append( "One click to select <b>ONE item</b>.<br/>Double click to select <b>ALL items</b>.<br/>" );
		$pos.css({ "text-align" : "center", "padding" : "4px 0px 10px 0px" });

		// Remove some unuseful text
		$( ".testDivblue" ).eq( 3 ).children().first().remove();
		$( ".testDivblue" ).eq( 3 ).children().first().remove();
		$( idForm ).children( "br" ).last().remove();
		$( idForm ).children( "br" ).last().remove();

		$select.prev().remove();
		//$select.css({ "display" : "none" });

		changeSelect( $select, $pos, $dest, "#aaaaaa" );
		disableSelection( $pos[0] );
	}


	// Update player to player donation
	function changeSelectPlayerToPlayer( idForm ) {

		var $select = $( "#product" );
		var $pos = $( ".testDivblue:eq(3)" );
		var $posSelect = $( ".testDivblue:eq(4)" );
		var $dest = $( "#quantity" );

		$pos.children().remove();
		$pos.append( "One click to select <b>ONE item</b>. Double click to select <b>ALL items</b>.<br/><br/>" );
		$pos.css({ "width" : "550px", "display" : "inline-block", "padding" : "6px 0px 8px 8px", "margin" : "0px 0px 14px 0px" });

		$posSelect.children().first().remove();
		$posSelect.children().first().remove();
		$posSelect.children().last().remove();

		changeSelect( $select, $pos, $dest, "#8baed8" );
		disableSelection( $pos[0] );
	}


	// Update player to player donation
	function changeSelectPlayerToMU( idForm ) {

		var $select = $( "#product" );
		var $pos = $( ".testDivblue:eq(3)" );
		var $posSelect = $( ".testDivblue:eq(4)" );
		var $dest = $( "#quantity" );

		$pos.children().remove();
		$pos.append( "One click to select <b>ONE item</b>. Double click to select <b>ALL items</b>.<br/><br/>" );
		$pos.css({ "width" : "550px", "display" : "inline-block", "padding" : "6px 0px 8px 8px", "margin" : "0px 0px 14px 0px" });

		$posSelect.children().first().remove();
		$posSelect.children().first().remove();
		$posSelect.children().last().remove();

		changeSelect( $select, $pos, $dest, "#8baed8"  );
		disableSelection( $pos[0] );
	}


	// Change select from params
	function changeSelect( $select, $placeToAdd, $dest, color ) {

		// Add my items
		var index = 1;
		$select.find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "" ) { return; }
			
			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) {
				str = str.substr( number + 1, str.indexOf( " ", number ) - number );
			}		

			var objStr = "<div class='storage' selectIndex='"+ index +"'>";
			objStr += "<div>"+ str +"</div><div>";

			// Raw resource
			var split = $(this).attr( "value" ).split( "-" );
			if( split.length == 1 ) {

				if( split[0] == "IRON" ) {
					objStr += "<img src='"+ IMGIRON +"' />";

				} else if( split[0] == "OIL" ) {
					objStr += "<img src='"+ IMGOIL +"' />";

				} else if( split[0] == "GRAIN" ) {
					objStr += "<img src='"+ IMGGRAIN +"' />";

				} else if( split[0] == "DIAMONDS" ) {
					objStr += "<img src='"+ IMGDIAMONDS +"' />";

				} else if( split[0] == "WOOD" ) {
					objStr += "<img src='"+ IMGWOOD +"' />";

				} else if( split[0] == "STONE" ) {
					objStr += "<img src='"+ IMGSTONE +"' />";
				}

			} else if( split.length = 2 ) {

				if( split[1] == "WEAPON" ) {
					objStr += "<img src='"+ IMGWEAPON +"' />";
					
				} else if( split[1] == "FOOD" ) {
					objStr += "<img src='"+ IMGFOOD +"' />";
	 
				} else if( split[1] == "TICKET" ) {
					objStr += "<img src='"+ IMGTICKET +"' />";

				} else if( split[1] == "GIFT" ) {
					objStr += "<img src='"+ IMGGIFT +"' />";
					
				} else if( split[1] == "HOUSE" ) {
					objStr += "<img src='"+ IMGHOUSE +"' />";

				} else if( split[1] == "DS" ) {
					objStr += "<img src='"+ IMGDS +"' />";

				} else if( split[1] == "HOSPITAL" ) {
					objStr += "<img src='"+ IMGHOSPITAL +"' />";
				}

				objStr += "<img src='"+ IMGQUALITY + split[0] + IMGEXTENSION +"' />";
			}
		
			$obj = $( objStr + "</div>" );
			$obj.css({ "cursor" : "pointer", "border" : "1px solid #fff", "border-radius" : "3px", "width" : "auto", "height" : "75px" });
			$obj.css({ "margin" : "6px 4px 2px 9px", "padding" : "3px 5px 1px 5px", "background-color" : "#fff" });
			$obj.css({ "box-shadow" : "0px 1px 5px 1px " + color });

			// Events
			$obj.bind( "mouseover", function() {
				if( selectDonate != $(this).attr( "selectIndex" ) ) {
					$(this).css({ "background-color" : "#dedede", "border" : "1px solid #dedede" });
				}
			});
			$obj.bind( "mouseout", function() {
				if( selectDonate != $(this).attr( "selectIndex" ) ) {
					$(this).css({ "background-color" : "#fff", "border" : "1px solid #fff" });
				}
			});

			// Click
			$obj.bind( "click", function() {

				// Deselect
				if( selectDonate == $(this).attr( "selectIndex" ) ) {
					$(this).css({ "background-color" : "#dedede", "border" : "1px solid #dedede" });
					$select.find( "option" ).removeAttr( "selected" );
					$dest.attr( "value", "1" );
					selectDonate = null;

				} else {

					if( selectDonate ) {
						var selObj = $placeToAdd.find( ".storage[selectIndex='" + selectDonate + "']" );
						selObj.css({ "background-color" : "#fff", "border" : "1px solid #fff" });
						$dest.attr( "value", "1" );
					}

					$(this).css({ "background-color" : "#edcc8e", "border" : "1px solid #b06810" });
					selectDonate = $(this).attr( "selectIndex" );

					$select.find( "option" ).removeAttr( "selected" );
					$select.find( "option" )[ selectDonate ].selected = true;
				}
			});

			// Doubleclick
			$obj.bind( "dblclick ", function() {

				$(this).css({ "background-color" : "#b1d0ba", "border" : "1px solid #5ea256" });
				selectDonate = $(this).attr( "selectIndex" );
				$select.find( "option" ).removeAttr( "selected" );
				$select.find( "option" )[ selectDonate ].selected = true;

				$dest.attr( "value",  $(this).text().trim() );
			});

			$placeToAdd.append( $obj );
			index++;
		});
	}


	// Add fast buttons
	function addFastButtons( idDest ) {

		firstFastButton = true;
		$( idDest ).css({ "text-align" : "center" });

		var $btn1 = $( "<input class='fastBtn' type='button' value='1' style='margin: 0px 10px 0px 0px;' />" );
		$btn1.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "1" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 1 ); 
			firstFastButton = false;
		});

		var $btn5 = $( "<input class='fastBtn' type='button' value='5' style='margin: 0px 10px 0px 0px;' />" );
		$btn5.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "5" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 5 ); 
			firstFastButton = false;
		});

		var $btn10 = $( "<input class='fastBtn' type='button' value='10' style='margin: 0px 10px 0px 0px;' />" );
		$btn10.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "10" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 10 ); 
			firstFastButton = false;
		});

		var $btn25 = $( "<input class='fastBtn' type='button' value='25' style='margin: 0px 0px 0px 13px;' />" );
		$btn25.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "25" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 25 ); 
			firstFastButton = false;
		});

		var $btn50 = $( "<input class='fastBtn' type='button' value='50' style='margin: 0px 0px 0px 13px;' />" );
		$btn50.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "50" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 50 ); 
			firstFastButton = false;
		});

		var $btn100 = $( "<input class='fastBtn' type='button' value='100' style='margin: 0px 0px 0px 13px;' />" );
		$btn100.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "100" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 100 ); 
			firstFastButton = false;
		});

		$btn1.insertBefore( idDest );
		$btn5.insertBefore( idDest );
		$btn10.insertBefore( idDest );

		$btn100.insertAfter( idDest );
		$btn50.insertAfter( idDest );
		$btn25.insertAfter( idDest );
	}


	// Add donate me button
	function addDonateToMeButton( idForm ) {

		// Donate me button
		var $pos = $( idForm ).children( "center" );

		var $donateMe = $( "<input type='submit' id='donateBtn2' value='Donate me' />" );
		$donateMe.css({ "margin-left" : "5px" });
		$pos.append( $donateMe );

		var id;
		var link = $( "#userName" ).attr( "href" ); 
		var split = link.split( "?id=" );
		if( split.length > 1 ) {
			id = split[1];

			$donateMe.bind( "click", function() {
				$( ".receipments" ).removeAttr( "checked" );
				$( ".receipments[value='"+ id +"']" ).attr( "checked", "checked" );
			});
		}
	}


	// Order MU members
	function orderMU( idForm ) {

		var $div = $( idForm ).children( "div" );

		// Save data to order it
		var list = $div.children();
		var tickAll = list[0];

		var names = [];
		var player = [];
		var playerList = [];

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
		$div.children().remove();
		$div.text( "" );

		// Add tickAll button
		var $tickAll = $( tickAll );
		$tickAll.bind( "click", function() { 
			$( ".receipments" ).attr( "checked", "checked" );
			return false;
		});
		$div.append( $tickAll );

		// Add untickAll button
		var $untickAll = $( "<input type='submit' id='untickAll' value='Untick all'/>" );
		$untickAll.css({ "margin-left" : "5px" });
		$untickAll.bind( "click", function() {  
			$( ".receipments" ).removeAttr( "checked" );
			return false;  
		});
		$div.append( $untickAll );

		// Add other submit button
		$div.append( "<input id='donateBtn2' type='submit' value='Donate' style='float:right;'/>" );
		$div.append( "<br/>" );

		// Order array by name
		names.sort();

		// Add ordered members
		var $obj;
		var $line;
		for( i=0; i<names.length; i++ ) {

			for( var j=0; j<playerList.length; j++ ) {

				if( names[i] == playerList[j][3].textContent.toLowerCase() ) {

					$line = $( "<div style='border: 1px solid #dedede; padding: 2px; margin-top: -1px'></div>" );

					$obj = $( playerList[j][0] ).css({ "margin" : "0px", "padding" : "0px", "position" : "relative", "top" : "3px", "left" : "3px" });
					$line.append( $obj );

					$obj = $( playerList[j][1] ).css({ "margin" : "0px 0px 0px 15px", "padding" : "0px", "position" : "relative"  });
					$line.append( $obj );
					$line.append( " " );

					$obj = $( playerList[j][2] ).css({ "margin" : "0px", "padding" : "0px", "position" : "relative"  });
					$line.append( $obj );
					$line.append( " " );

					$obj = $( playerList[j][2] ).css({ "margin" : "0px", "padding" : "0px", "position" : "relative"  });
					$line.append( playerList[j][3] );

					$div.append( $line );
				}
			}
		}
	}


	// Count selected members on MU list
	function addCounterMembersMU() {

		var counterDiv = $( "<div id='counterCheck'>No members selected.</div>" )
		counterDiv.css({ "float" : "left", "margin" : "10px 0px 0px 0px", "width" : "230px", "text-align" : "center" });
		counterDiv.css({ "font-size" : "13px", "font-weight" : "bold", "color" : "#444444" });
		counterDiv.insertAfter( ".testDivwhite" );

		var totalDiv = $( "<div id='totalDonate'></div>" );
		totalDiv.css({ "float" : "left", "margin" : "2px 0px 0px 0px", "width" : "230px", "text-align" : "center" });
		totalDiv.css({ "font-size" : "12px", "font-weight" : "normal", "color" : "#444444" });
		totalDiv.insertAfter( "#counterCheck" );

		// Add events
		$( ".receipments" ).bind( "change", setCounterText );

		$( "#tickAll" ).bind( "click", setCounterText );
		$( "#untickAll" ).bind( "click", setCounterText );

		$( "#quantity" ).bind( "change", setCounterText );
		$( ".fastBtn" ).bind( "click", setCounterText );
	}


	// Set counter checks text
	function setCounterText() {

		var qty = $( "#quantity" ).attr( "value" );
		var n = $( ".receipments:checked" ).length;
		if( n == 0 ) {
			$( "#counterCheck" ).text( "No members selected." );
			$( "#totalDonate" ).text( "" );

		} else if( n == 1 ) {
			$( "#counterCheck" ).text( "Selected 1 member." );
			if( qty > 0 ) {
				if( n*qty == 1 ) {
					$( "#totalDonate" ).text( "Total donate: "+ (n*qty) +" item." );

				} else $( "#totalDonate" ).text( "Total donate: "+ (n*qty) +" items." );

			} else $( "#totalDonate" ).text( "" );

		} else {
			$( "#counterCheck" ).text( "Selected "+n+" members." );
			if( qty > 0 ) {
				$( "#totalDonate" ).text( "Total donate: "+ (n*qty) +" items." );

			} else $( "#totalDonate" ).text( "" );
		}
	}


	// Add update jobs button
	function addUpdateJobsButton( idForm ) {

		var $div = $( idForm ).children( "div" );
		$update = $( "<input type='button' id='updateWork' value='Update jobs'/>" );
		$update.css({ "margin-right" : "5px", "float" : "right" });
		$update.insertAfter( "#donateBtn2" );

		$update.bind( "click", function() {

			var idMU = $( ".testDivblue a[href^='militaryUnit.html']" ).attr( "href" );
			var split = idMU.split( "?id=" );
			if( split.length > 1 ) {
				idMU = split[1];

				// Find every player what company works
				// First MU companies
				$.ajax({
					url: URLMUCompanies + idMU,
					success: function( data ) {

						var id;
						var cp = $( data ).find( "a[href^='company.html']" );
						for( var i=0; i<cp.length; i++ ) {

							var split = $( cp[i] ).attr( "href" ).split( "?id=" );
							if( split.length > 1 ) {
								id = split[1];

								$.ajax({
									url: URLCompanyDetails + id,
									success: function( data ) { checkWorkResults( idForm, data ); }
								});
							}
						}
					}
				});
			}

			return( false );
		});
	}


	// Check every company 
	function checkWorkResults( idForm, data ) {

		var $table = $( data ).find( "#productivityTable" );

		var company = $( data ).find( "#contentRow h1" ).text();
		company = company.replace( "Company", "" );

		var cols;
		var name;
		var $obj;
		var $pos;
		var workDiv = "<div style='float: right; width:10px; height:10px; margin-top: 3px; margin-left: 1px; border: 1px #999999 solid;'></div>";
		var rows = $table.find( "tbody tr" );
		for( var i=1; i<rows.length; i++ ) {

			cols = $( rows[i] ).find( "td" );
			if( cols.length > 0 ) {
				name = $( cols[0] ).find( "a" ).text();

				$pos = $( idForm ).find( "a::contains('"+ name +"')" );
				$( "<div style='float:right; margin-top: 2px; margin-right: 3px; font-size: 10px;'>"+ company +"</div>" ).insertAfter( $pos );

				if( cols.length == 12 ) {

					if( $( cols[10] ).find( "img" ).length == 0 ) {
						$obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
						$pos.parent().find( "input" ).attr( "yesterday", "true" );

					} else {
						$obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
						$pos.parent().find( "input" ).attr( "yesterday", "false" );
					}

					$obj.insertAfter( $pos ).text( "-1" );
					$obj.bind( "click", function() {
						$( idForm ).find( ".receipments" ).removeAttr( "checked" );
						$( idForm ).find( ".receipments[yesterday='true']" ).attr( "checked", "checked" );

						setCounterText();
					});

					if( $( cols[11] ).find( "img" ).length == 0 ) {
						$obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
						$pos.parent().find( "input" ).attr( "today", "true" );

					} else {
						$obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
						$pos.parent().find( "input" ).attr( "today", "false" );
					}

					$obj.insertAfter( $pos );
					$obj.bind( "click", function() {
						$( idForm ).find( ".receipments" ).removeAttr( "checked" );
						$( idForm ).find( ".receipments[today='true']" ).attr( "checked", "checked" );

						setCounterText();
					});
				}
			}
		}
	}


	// Change weapon battle selector
	function changeWeaponBattle() {

		// First div with selected weapon
		var bigWeap = $( "<div style='display:block; width:222px; height: 54px; overflow:hidden;' ></div>" );
		bigWeap.css({ "margin" : "0px 0px 10px 0px" });

		var imgWeap = $( "<img src='http://e-sim.home.pl/eworld/img/productIcons/Weapon.png' style='width: 52px; float:left;' />" );
		imgWeap.css({ "border" : "1px solid #666", "padding" : "0px 10px 0px 10px", "margin" : "0px 5px" });
		imgWeap.css({ "border-radius" : "08px" });

		var divInfo = $( "<div style='float:left; width:135px; height:100%; text-align:left; overflow: hidden;'></div>" );
		divInfo.append( "<span class='qualityWeapon' style='font-size:18px; font-weight:bold; text-shadow: 1px 1px 3px #999'></span>" );
		divInfo.append( "<span class='availableWeapon' style='margin: 0px 8px; font-weight:bold;'></span>" );
		divInfo.append( "<br/><span id='dmgCurrent' style='font-size: 11px; font-weight:normal;'></span>" );
		divInfo.append( "<br/><span id='berserkCurrent' style='font-size: 11px; font-weight:normal;'></span>" );

		bigWeap.append( imgWeap );
		bigWeap.append( divInfo );

		var content = $( "<div id='weaponSelector' style='display:block; width: 230px; height: 65px; overflow: hidden; '></div>" );
		var colorBackground = [ "#e67171", "#bed7ba", "#aacaa4", "#97be91", "#83b47f", "#6eaa6f" ];

		var index = 0;
		$( "#weaponQuality" ).find( "option" ).each( function() {

			var weapQ = $( "<div style='float:left; width: 30px; cursor: pointer; background-color: #fff;'></div>" );
			weapQ.css({ "margin" : "2px 3px 0px 3px", "padding" : "2px 1px 0px 1px", "border-radius" : "15px"  });
			weapQ.append( "<img src='http://e-sim.home.pl/eworld/img/productIcons/Weapon.png' style='width:90%;' />" );

			var bonus = "";
			var nWeap = "";

			var str = $(this).text();
			var pos = str.indexOf( ",", 0 );
			if( pos > -1 ) {

				nWeap = str.substr( pos + 2, str.indexOf( " ", pos + 2 ) - pos - 1 );
				bonus = (index * 20) + "%";

			} else {

				weapQ.css({ "margin-top" : "9px" });
				bonus = "-50%";
			}

			weapQ.attr( "indexselect", index );
			weapQ.attr( "defaultColor", colorBackground[ index ] );
			weapQ.attr( "numWeapons", nWeap );

			weapQ.append( "<div style='position:relative; top:-5px; font-size:100%; font-weight:bold; color:#444;'>"+ bonus +"</div>" );
			weapQ.append( "<div class='numWeapons' style='position: relative; top: -7px; font-size: 85%;'>"+ nWeap + "</div>" );
			bigWeap.insertBefore( "#weaponQuality" );

			if( (nWeap == "") || (nWeap > 0) ) {

				weapQ.css({ "box-shadow" : "0px 1px 3px 1px #9bbef8" });

				weapQ.bind( "mouseover", function() {
					if( selectedWeapon.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 3px 2px #6baef8" });
					}
				});

				weapQ.bind( "mouseout", function() {
					if( selectedWeapon.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 3px 1px #9bbef8" });
					}
				});

				weapQ.bind( "click", function() {

					if( selectedWeapon ) { selectedWeapon.css({ "box-shadow" : "0px 1px 3px 1px #9bbef8", "background-color" : "#fff" }); }

					imgWeap.css({ "background-color" : $(this).attr( "defaultColor" ) });

					var listB = $( "#userMenu" ).find( "b" );
					var strength = listB[8].innerHTML;
					var quality = $(this).attr( "indexselect" );
					var rank = getRankAPI( strength, quality, listB[4].innerHTML );

					if( quality != "0" ) {
						divInfo.find( ".qualityWeapon" ).text( "Q" + quality );
						divInfo.find( ".availableWeapon" ).text( $(this).attr( "numWeapons" ) + " weap" );

					} else {
						divInfo.find( ".qualityWeapon" ).text( "Unarmed" );
						divInfo.find( ".availableWeapon" ).text( "" );
					}

					updateDamage( strength, rank, quality );

					$(this).css({ "box-shadow" : "0px 1px 2px 1px #666", "background-color" : $(this).attr( "defaultColor" ) });
					selectedWeapon = $(this);

					$( "#weaponQuality option" ).removeAttr( "selected" );
					$( "#weaponQuality option" )[ quality ].selected = true;
				});

			} else {
				weapQ.css({ "cursor" : "default", "box-shadow" : "inset 0px 0px 1px 0px #990000" });
			}

			// default Q0
			if( index == 0 ) { weapQ.click(); }

			content.append( weapQ );
			index++;
		});

		content.insertAfter( "#weaponQuality" );

		$( "#weaponQuality" ).parent().children( "b" ).first().remove();
		$( "#weaponQuality" ).parent().children( "br" ).first().remove();
		$( "#weaponQuality" ).parent().children( "br" ).first().remove();

		$( "#weaponQuality" ).css({ "display" : "none" });

		// Add update weapon method
		$.blockUI.defaults.onUnblock = function( elem, opts ) {
			updateWeaponsNumber();
			updateHealthBar();
		}
	}


	// Update damage
	function updateDamage( strength, rank, quality ) {

		var damage = strength * rank * (quality*20 + 100)/100;
		if( quality == 0 ) { damage = strength * rank / 2; }

		var pos;
		var strDmg = "";
		var strBk = "";
		var mubonus = 0;
		var locbonus = 0;
		var sdbonus = 0;
		if( $( "#leftBlockBonus" ).length == 1 ) {
			pos = $( "#leftBlockBonus" ).children( "div" );
			mubonus = parseInt( pos.eq(0).text().replace( "%", "" ) );
			locbonus = parseInt( pos.eq(1).text().replace( "%", "" ) );
			sdbonus = parseInt( pos.eq(2).text().replace( "%", "" ) );

			// Order, MU - location - SD
			damage *= (mubonus+100)/100;
			damage *= (locbonus+100)/100;
			damage *= (sdbonus+100)/100;
			strDmg += parseInt( damage  ) + "&nbsp;&nbsp;|&nbsp;&nbsp;";
			strBk += parseInt( damage*5 ) + "&nbsp;&nbsp;|&nbsp;&nbsp;";
		}

		damage = strength * rank * (quality*20 + 100)/100;
		if( quality == 0 ) { damage = strength * rank / 2; }
		if( $( "#rightBlockBonus" ).length == 1 ) {
			pos = $( "#rightBlockBonus" ).children( "div" );
			mubonus = parseInt( pos.eq(0).text().replace( "%", "" ) );
			locbonus = parseInt( pos.eq(1).text().replace( "%", "" ) );
			sdbonus = parseInt( pos.eq(2).text().replace( "%", "" ) );

			// Order, MU - location - SD
			damage *= (mubonus+100)/100;
			damage *= (locbonus+100)/100;
			damage *= (sdbonus+100)/100;
			strDmg += parseInt( damage );
			strBk += parseInt( damage*5 );
		}

		$( "#dmgCurrent" ).html( "Fight: <b>" + strDmg + "</b>" );
		$( "#berserkCurrent" ).html( "Berserk: <b>" + strBk + "</b>" );
	}


	// Updater number weapons value
	function updateWeaponsNumber() {

		var index = 0;
		$( "#weaponQuality" ).find( "option" ).each( function() {

			var str = $(this).text();
			var pos = str.indexOf( ",", 0 );
			if( pos > -1 ) {
				nWeap = str.substr( pos + 2, str.indexOf( " ", pos + 2 ) - pos - 1 );
				$( "#weaponSelector" ).children( "div" ).eq( index ).find( ".numWeapons" ).text( nWeap );

				if( (selectedWeapon.attr( "indexselect" ) == index) && (nWeap == 0) ) {
					selectedWeapon.unbind( "click" );
					selectedWeapon.unbind( "mouseover" );
					selectedWeapon.unbind( "mouseout" );
					selectedWeapon.css({ "cursor" : "default", "box-shadow" : "inset 0px 0px 1px 0px #990000" });
					$( "#weaponSelector" ).children( "div" ).eq( 0 ).click();
				}
			}

			index++;
		});
	}


	// Update health bar with new value
	function updateHealthBar() {
		var w = $( "#wellness" ).text();
		$( ".usedHealth" ).animate( { "width" : w+"%" }, 500 );

		updateHealthButtons();
	}


	// Change round selector
	function changeRoundSelector() {

		var block = $( "#command" ).parent();
		block.children().last().remove();
		block.children().last().remove();
		block.contents().eq(-10).remove();
		block.contents().eq(-9).remove();

		var currentRound = getUrlVars()[ "round" ];

		var first = true;
		$( "#command" ).children( "select" ).find( "option" ).each( function() {
			var value = $(this).attr( "value" );
			if( first ) {
				first = false;
				return;
			}

			var battleID = getUrlVars()[ "id" ];
			var url = URLBattle + battleID + "&round=" + value;

			var roundLink = $( "<a href='"+ url +"' >"+ value + "</a>" );
			roundLink.css({ "margin" : "0px 2px 0px 2px", "font-size" : "13px", "font-weight" : "bold" });

			if( currentRound ) { 
				if( currentRound == value ) {
					roundLink.css({ "color" : "#ff0000" });
				}
			}

			block.append( roundLink );
		});

		if( currentRound == undefined ) { block.children( "a" ).last().css({ "color" : "#ff0000" }); }

		$( "#command" ).css({ "display" : "none" });
	}


	// Change eat food/use gift selectors
	function changeEatButtons() {

		$( "#eatLink" ).hide();
		$( "#useGiftLink" ).hide();

		$( "#eatMenu" ).show();
		$( "#eatMenu" ).css({ "width" : "170px" });
		$( "#useGiftMenu" ).show();
		$( "#useGiftMenu" ).css({ "width" : "170px" });

		$( "#foodQuality" ).css({ "display" : "none" });
		$( "#giftQuality" ).css({ "display" : "none" });

		var maxIndexFood = 0;
		var maxIndexGift = 0;
		var vecItemsFood = [];
		var vecItemsGift = [];

		var index = 0;
		$( "#foodQuality" ).find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "0" ) { 
				index++;
				return;
			}

			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) {
				str = str.substr( number + 1, str.indexOf( " ", number ) - number );
			}

			var food = $( "<div style='float:left; width:27px; height:45px; cursor:pointer;'></div>" );
			food.css({ "padding" : "0px 1px 0px 1px", "margin" : "0px 3px 5px 2px" });
			food.css({ "background-color" : "#fff", "box-shadow" : "1px 1px 2px 0px #9bbef8" });

			food.append( "<img src='http://e-sim.home.pl/eworld/img/productIcons/Food.png' style='width:100%' />" );
			food.append( "<img src='http://e-sim.home.pl/eworld/img/productIcons/q"+ index +".png' style='width:100%' />" );
			food.append( "<div style='text-align:center; font-size: 90%; font-weight:bold;'>"+ str +"</div>" );

			food.attr( "indexselect", index );

			if( str != 0 ) {
				maxIndexFood = index;

				food.bind( "mouseover", function() {
					if( selectedFood.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 3px 1px #6baef8" });
					}
				});

				food.bind( "mouseout", function() {
					if( selectedFood.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 2px 0px #9bbef8" });
					}
				});

				food.bind( "click", function() {

					if( selectedFood ) { selectedFood.css({ "box-shadow" : "0px 1px 3px 1px #9bbef8", "background-color" : "#fff" }); }

					$(this).css({ "box-shadow" : "1px 1px 2px 1px #999", "background-color" : "#bed7ba" });
					selectedFood = $(this);

					var indexItem = $(this).attr( "indexselect" );
					$( "#foodQuality option" )[ indexItem ].selected = true;

					updateHealthButtons();
				});

			} else food.css({ "cursor" : "default", "box-shadow" : "inset 0px 0px 1px 0px #bb0000" });
			
			vecItemsFood.push( food );
			$( "#eatMenu form" ).append( food );

			index++;
		});

		var index = 0;
		$( "#giftQuality" ).find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "0" ) { 
				index++;
				return;
			}

			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) {
				str = str.substr( number + 1, str.indexOf( " ", number ) - number );
			}

			var gift = $( "<div style='float:left; width:27px; height:45px; cursor:pointer;'></div>" );
			gift.css({ "padding" : "0px 1px 0px 1px", "margin" : "0px 3px 5px 2px" });
			gift.css({ "background-color" : "#fff", "box-shadow" : "1px 1px 2px 0px #9bbef8" });

			gift.append( "<img src='http://e-sim.home.pl/eworld/img/productIcons/Gift.png' style='width:100%' />" );
			gift.append( "<img src='http://e-sim.home.pl/eworld/img/productIcons/q"+ index +".png' style='width:100%' />" );
			gift.append( "<div style='text-align:center; font-size: 90%; font-weight:bold;'>"+ str +"</div>" );

			gift.attr( "indexselect", index );

			if( str != 0 ) {
				maxIndexGift = index;

				gift.bind( "mouseover", function() {
					if( selectedGift.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 3px 1px #6baef8" });
					}
				});

				gift.bind( "mouseout", function() {
					if( selectedGift.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 2px 0px #9bbef8" });
					}
				});

				gift.bind( "click", function() {

					if( selectedGift ) { selectedGift.css({ "box-shadow" : "0px 1px 3px 1px #9bbef8", "background-color" : "#fff" }); }

					$(this).css({ "box-shadow" : "1px 1px 2px 1px #999", "background-color" : "#bed7ba" });
					selectedGift = $(this);

					var indexItem = $(this).attr( "indexselect" );
					$( "#giftQuality option" )[ indexItem ].selected = true;

					updateHealthButtons();
				});

			} else gift.css({ "cursor" : "default", "box-shadow" : "inset 0px 0px 1px 0px #bb0000" });

			vecItemsGift.push( gift );
			$( "#useGiftMenu form" ).append( gift );

			index++;
		});

		// Default max quality items
		if( maxIndexFood > 0 ) { vecItemsFood[ maxIndexFood-1].click() }
		if( maxIndexGift > 0 ) { vecItemsGift[ maxIndexGift-1].click() }

		// Change Eat and Use buttons
		$( "#eatButton" ).css({ "display" : "none" });
		var newEatButton = $( "<input type='button' id='newEatButton' value='Eat' />" )
		newEatButton.css({ "width" : "140px", "height" : "23px", "margin" : "5px 0px 0px 0px" });
		$( "#eatMenu" ).append( newEatButton );
		$( "#eatMenu" ).css({ "height" : "75px", "margin" : "8px 0px 0px 0px" });
		$( "#eatMenu form" ).append( $( "#eatButton" ) );

		newEatButton.bind( "click", function() {
			var dataString = 'quality='+ $( "#foodQuality" ).val();  
			$.ajax({  
				type: "POST",
				url: "eat.html",
				data: dataString,
				success: function( msg ) {
					var json = jQuery.parseJSON( msg );

					$( "#foodLimit" ).html( json.foodLimit );
					$( "#wellness" ).html( json.wellness );
					$( "#q1FoodStorage" ).html( "Q1 Food ("+json.q1FoodStorage+" left)" );
					$( "#q2FoodStorage" ).html( "Q2 Food ("+json.q2FoodStorage+" left)" );
					$( "#q3FoodStorage" ).html( "Q3 Food ("+json.q3FoodStorage+" left)" );
					$( "#q4FoodStorage" ).html( "Q4 Food ("+json.q4FoodStorage+" left)" );
					$( "#q5FoodStorage" ).html( "Q5 Food ("+json.q5FoodStorage+" left)" );

					$( ".usedHealth" ).animate( { "width" : json.wellness+"%" }, 500 );
					updateHealthButtons();

					var divList = $( "#eatMenu form" ).children( "div" );
					divList.eq(0).children( "div" ).text( json.q1FoodStorage );
					divList.eq(1).children( "div" ).text( json.q2FoodStorage );
					divList.eq(2).children( "div" ).text( json.q3FoodStorage );
					divList.eq(3).children( "div" ).text( json.q4FoodStorage );
					divList.eq(4).children( "div" ).text( json.q5FoodStorage );

					if( json.error != "" ) {
						$( '#hiddenError' ).html( json.error );
						$.blockUI({ message: $( '#eatError' ), css: { width: '400px', border: '0px', background: 'rgba(255,255,255,0)' } });
					}
				}
			});
		});

		$( "#useGiftButton" ).css({ "display" : "none" });
		var newGiftButton = $( "<input type='button' id='newGiftButton' value='Use' />" )
		newGiftButton.css({ "width" : "140px", "height" : "23px", "margin" : "5px 0px 0px 0px" });
		$( "#useGiftMenu" ).append( newGiftButton );
		$( "#useGiftMenu" ).css({ "height" : "84px" });
		$( "#useGiftMenu form" ).append( $( "#useGiftButton" ) );

		newGiftButton.bind( "click", function() {
			var dataString = 'quality='+ $("#giftQuality").val();  
			$.ajax({  
				type: "POST",
				url: "gift.html",
				data: dataString,
				success: function( msg ) {
					var json = jQuery.parseJSON( msg );

					$( "#giftLimit" ).html( json.giftLimit );
					$( "#wellness" ).html( json.wellness );
					$( "#q1GiftStorage" ).html( "Q1 Gift ("+json.q1GiftStorage+" left)" );
					$( "#q2GiftStorage" ).html( "Q2 Gift ("+json.q2GiftStorage+" left)" );
					$( "#q3GiftStorage" ).html( "Q3 Gift ("+json.q3GiftStorage+" left)" );
					$( "#q4GiftStorage" ).html( "Q4 Gift ("+json.q4GiftStorage+" left)" );
					$( "#q5GiftStorage" ).html( "Q5 Gift ("+json.q5GiftStorage+" left)" );

					var divList = $( "#useGiftMenu form" ).children( "div" );
					divList.eq(0).children( "div" ).text( json.q1GiftStorage );
					divList.eq(1).children( "div" ).text( json.q2GiftStorage );
					divList.eq(2).children( "div" ).text( json.q3GiftStorage );
					divList.eq(3).children( "div" ).text( json.q4GiftStorage );
					divList.eq(4).children( "div" ).text( json.q5GiftStorage );

					$( ".usedHealth" ).animate( { "width" : json.wellness+"%" }, 500 );
					updateHealthButtons();

					if( json.error != "" ) {
						$( '#hiddenError' ).html( json.error );
						$.blockUI({ message: $( '#eatError' ), css: { width: '400px', border: '0px', background: 'rgba(255,255,255,0)' } });
					}
				}
			});
		});

		// Change first plate to order some items
		var firstPlate = $( "#userMenu .plate:first-child" );
		// Up next rank
		firstPlate.children( "b:eq(5)" ).css({ "position" : "relative", "top" : "-6px" });
		firstPlate.children( ".smallhelp:eq(1)" ).css({ "position" : "relative", "top" : "-6px" });

		// Remove BR to add margin
		$( "#userMenu" ).children( "br" ).remove();
		$( "#userMenu .plate" ).css({ "margin" : "0px auto 6px auto" });

		var textNodes = firstPlate.contents().filter(function() {
			return this.nodeType == Node.TEXT_NODE;
		});
		textNodes.eq( -8 ).remove();
		textNodes.eq( -12 ).remove();
		textNodes.eq( -3 ).remove();
		textNodes.eq( -2 ).remove();
		firstPlate.children( "br" ).eq( -3 ).remove();
		firstPlate.children( "br" ).eq( -2 ).remove();

		// Save some elements of the first plate
		var imgH = firstPlate.children( "img:last" );
		var lastDiv = firstPlate.children( "div:last" );
		lastDiv.css({ "float" : "right", "margin" : "1px 0px 0px 5px" });
		lastDiv.children( "a" ).text( "" ).append( lastDiv.children( "img" ) );

		$( "#eatMenu form" ).append( $( "#foodLimit" ) );
		$( "#foodLimit" ).css({ "float" : "right", "position" : "relative", "top" : "5px", "font-size" : "13px" });
		$( "#foodLimit" ).css({ "background-color" : "#fff", "border" : "1px solid #333", "text-align" : "center" });
		$( "#foodLimit" ).css({ "padding" : "2px 3px 2px 3px", "cursor" : "default", "width" : "16px" });

		$( "#useGiftMenu form" ).append( $( "#giftLimit" ) );
		$( "#giftLimit" ).css({ "float" : "right", "position" : "relative", "top" : "5px", "font-size" : "13px" });
		$( "#giftLimit" ).css({ "background-color" : "#fff", "border" : "1px solid #333", "text-align" : "center" });
		$( "#giftLimit" ).css({ "padding" : "2px 3px 2px 3px", "cursor" : "default", "width" : "16px" });

		// Add wellness bar
		var well = $( "#wellness" ).text();
		var bar = $( "<div style='float:right; width:115px; height:22px; background-color:#fff; cursor:default;'></div>" );
		var used = $( "<div class='usedHealth' style='display:block; background-color:#7ac642; width:"+ well +"%; height:100%;'></div>" );
		used.css({ "box-shadow" : "inset 0px 0px 2px 1px #fff" });
		bar.css({ "margin" : "0px 0px 0px 0px", "padding" : "0px 0px 0px 0px", "text-align" : "center" });
		$( "#wellness" ).css({ "position" : "relative", "top" : "-18px" });

		bar.append( used );
		bar.append( $( "#wellness" ) );

		var divHealth = $( "<div style='display:block; width:170px; height:23px; margin:8px 0px 0px 0px;'></div>" );
		divHealth.append( imgH );
		divHealth.append( lastDiv );
		divHealth.append( bar );
		divHealth.insertBefore( "#eatMenu" );

		updateHealthButtons();
	}


	// Update health buttons to enable or disable
	function updateHealthButtons() {

		var h = parseInt( $( "#wellness" ).text() );
		var foodLimit = parseInt( $( "#foodLimit" ).text() );
		var giftLimit = parseInt( $( "#giftLimit" ).text() );
		if( foodLimit == 0 ) {
			disableButton( $( "#newEatButton" ) );

		} else {
			if( selectedFood ) {
				var eatQ = parseInt( selectedFood.attr( "indexselect" ) ) * 10;
				if( (eatQ + h) > 100 ) {
					disableButton( $( "#newEatButton" ) );
				} else {
					enableButton( $( "#newEatButton" ) );
				}

			} else enableButton( $( "#newEatButton" ) );
		}

		if( giftLimit == 0 ) {
			disableButton( $( "#newGiftButton" ) );

		} else {
			if( selectedGift ) {
				var useQ = parseInt( selectedGift.attr( "indexselect" ) ) * 10;
				if( (useQ + h) > 100 ) {
					disableButton( $( "#newGiftButton" ) );
				} else {
					enableButton( $( "#newGiftButton" ) );
				}

			} else enableButton( $( "#newGiftButton" ) );
		}

		updateFightButtons()
	}


	// Update fight buttons
	function updateFightButtons() {

		// Only on battle page
		var localUrl = new String( window.location );
		if( localUrl.indexOf( URLBattle, 0 ) == 0 ) {

			// If is RW
			if( $( ".fightButton" ).length == 4 ) {

				var btnFight1 = $( ".fightButton" ).eq(0);
				var btnFight2 = $( ".fightButton" ).eq(1);
				var btnBk1 = $( ".fightButton" ).eq(2);
				var btnBk2 = $( ".fightButton" ).eq(3);
				var h = parseInt( $( "#wellness" ).text() );
				if( h < 10 ) {
					disableButton( btnFight1 );
					disableButton( btnFight2 );
					disableButton( btnBk1 );
					disableButton( btnBk2 );

				} else if( h < 50 ) {
					enableButton( btnFight1 );
					enableButton( btnFight2 );
					disableButton( btnBk1 );
					disableButton( btnBk2 );

				} else {
					enableButton( btnFight1 );
					enableButton( btnFight2 );
					enableButton( btnBk1 );
					enableButton( btnBk2 );
				}

			} else {

				var btnFight = $( ".fightButton" ).eq(0);
				var btnBk = $( ".fightButton" ).eq(1);
				var h = parseInt( $( "#wellness" ).text() );
				if( h < 10 ) {
					disableButton( btnFight );
					disableButton( btnBk );

				} else if( h < 50 ) {
					enableButton( btnFight );
					disableButton( btnBk );

				} else {
					enableButton( btnFight );
					enableButton( btnBk );
				}
			}
		}
	}


	// Disable button
	function disableButton( btn ) {
		btn.attr( "disabled", "disabled" );
		btn.css({ "box-shadow" : "1px 6px 12px lightblue inset, -1px -10px 5px rgb(159, 203, 255) inset", "color" : "#999" });
	}

	// Enable button
	function enableButton( btn ) {
		btn.removeAttr( "disabled" );
		btn.css({ "box-shadow" : "1px 6px 12px lightblue inset, -1px -10px 5px rgb(119, 153, 255) inset, 0pt 0pt 5px rgba(0, 0, 0, 0.6)", "color" : "#000" });
	}


	// Add MU fast links
	function addMUFastLinks() {

		var content = $( "<div style='display:block;'></div>" );
		content.css({ "position" : "absolute", "margin-top" : "-29px", "margin-left" : "-10px", "font-weight" : "bold" });

		var linkMU = $( "<a href='http://e-sim.org/myMilitaryUnit.html'>MU</a>"  );
		linkMU.css({ "float" : "right", "padding" : "4px 4px 5px 4px", "background-color" : "#2D507C", "color" : "#fff" });
		linkMU.bind( "mouseover", function() { $(this).css({ "color" : "#FEF1B5" }); });
		linkMU.bind( "mouseout", function() { $(this).css({ "color" : "#fff" }); });

		var linkMUSt = $( "<a href='http://e-sim.org/militaryUnitStorage.html'></a>"  );
		linkMUSt.append( "<img src='http://e-sim.home.pl/eworld/img/package.gif' style='width:19px;' />" );
		linkMUSt.css({ "float" : "right", "padding" : "1px 2px 3px 2px", "background-color" : "#2D507C" });

		var linkMUMy = $( "<a href='http://e-sim.org/militaryUnitMoneyAccount.html'></a>"  );
		linkMUMy.append( "<img src='http://e-sim.home.pl/eworld/img/dollar.png' style='width:19px;' />" );
		linkMUMy.css({ "float" : "right", "padding" : "1px 2px 3px 2px", "background-color" : "#2D507C" });

		content.insertAfter( $( "#userName" ) );
		content.append( linkMUMy );
		content.append( linkMUSt );
		content.append( linkMU );

		$( "#userName" ).css({ "position" : "relative", "top" : "-3px", "left" : "30px" });
	}


	// Calculate bonus on battle
	function calculateBonus() {

		var pos = $( ".testDivblue" ).eq(2);
		var firstPlate = $( "#userMenu .plate:first-child" );
		var currentLocation = firstPlate.find( "a[href^='region']" ).attr( "href" ).split( "?id=" );
		if( currentLocation.length > 1 ) { currentLocation = currentLocation[1] }

		var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
		var battleLocation = divBattleLocation.attr( "href" ).split( "?id=" );
		if( battleLocation.length > 1 ) { battleLocation = battleLocation[1] }

		var bonusMU = 0;
		var muSide = "";
		if( GetValue( "MUSavedBattle" ) ) {
			muSide = GetValue( "MUSavedBattle" ).split( "?id=" );
			if( muSide.length > 1 ) { muSide = muSide[1] }
		}

		var battleID = getUrlVars()[ "id" ];

		var products = $( ".productList" );
		var numberLocation = 0;
		var bonusSD = 0;
		// Get if SD is on battle
		if( products.length > 0 ) {
			products.find( "img" ).each( function() {
				if( $(this).attr( "src" ) == IMGDS ) {
					var str = $(this).next().attr( "src" );
					str = str.replace( IMGQUALITY, "" ).substring(0, 1);
					bonusSD = parseInt( str ) * 5;
				}
			});
		}

		var isRW = (divBattleLocation.parent().text().indexOf( "Resistance war", 0 ) > -1);
		if( isRW ) {

			if( currentLocation == battleLocation ) { numberLocation = 20; }

			var rightMU = 0;
			var sides = pos.find( ".bigFlag" );
			if( sides.length == 2 ) {
				// Left defender
				if( sides.eq(0).attr( "src" ) == GetValue( "MUSide" ) ) {
					bonusMU = GetValue( "MURank" );

				} else if( sides.eq(1).attr( "src" ) == GetValue( "MUSide" ) ) {
					rightMU = GetValue( "MURank" );
				}
			}

			var leftBlock = createBlockBonus( numberLocation, bonusMU, bonusSD );
			leftBlock.attr( "id", "leftBlockBonus" );
			leftBlock.css({ "margin-top" : "-10px", "margin-left" : "-20px" });
			leftBlock.insertBefore( pos );

			// Only defensive SD
			bonusSD = 0;
			bonusMU = rightMU;

		} else {

			var yourSide = pos.find( ".bigFlag" ).attr( "src" );

			var flags =  $( ".testDivwhite" ).find( ".bigFlag" );
			if( flags.length == 2 ) {
				var defender = flags.eq(0).attr( "src" );
				var attacker = flags.eq(1).attr( "src" );

				if( yourSide == attacker ) {
					if( battleID == muSide ) {
						if( yourSide == GetValue( "MUSide" ) ) { bonusMU = GetValue( "MURank" ); }
					}	

					// Only defensive SD
					bonusSD = 0;
					var neighbours = getRegionAPI( battleLocation, currentLocation );
					numberLocation = (neighbours.indexOf( parseInt(currentLocation) ) != -1) ? 20 : 0;

				} else if( yourSide == defender ) {

					if( battleID == muSide ) {
						if( yourSide == GetValue( "MUSide" ) ) { bonusMU = GetValue( "MURank" ); }
					}
					if( currentLocation == battleLocation ) { numberLocation = 20; }
				}
			}
		}

		var rightBlock = createBlockBonus( numberLocation, bonusMU, bonusSD );
		rightBlock.attr( "id", "rightBlockBonus" );
		rightBlock.css({ "margin-top" : "-10px", "margin-left" : (pos.width()+7)+"px" });
		rightBlock.insertBefore( pos );
	}


	// Create bonus battle dov
	function createBlockBonus( location, MU, SD ) {

		var block = $( "<div style='display:block; position:absolute; cursor:default;'></div>" );
		var color = (location == 0) ? "#e67171" : "#bed7ba";

		var bonusLocation = $( "<div class='locationBonus' style='width:30px; height:18px;' title='Location bonus'>"+ location +"%</div>" );
		bonusLocation.css({ "border" : "1px solid #93b4d9", "border-radius" : "4px", "background-color" : color });
		bonusLocation.css({ "font-size" : "12px", "font-weight" : "bold", "padding" : "2px 0px 0px 0px", "cursor" : "pointer" });

		color = (MU == 0) ? "#e67171" : "#bed7ba";
		var bonusMU = $( "<div style='width:30px; height:18px;' title='Military unit bonus'>"+ MU +"%</div>" );
		bonusMU.css({ "border" : "1px solid #93b4d9", "border-radius" : "4px", "background-color" : color, "margin-top" : "5px" });
		bonusMU.css({ "font-size" : "12px", "font-weight" : "bold", "padding" : "2px 0px 0px 0px", "cursor" : "pointer" });

		var bonusSD = $( "<div style='width:30px; height:18px;' title='Defensive system bonus'>"+ SD +"%</div>" );
		bonusSD.css({ "border" : "1px solid #93b4d9", "border-radius" : "4px", "background-color" : "#fff", "margin-top" : "5px" });
		bonusSD.css({ "font-size" : "12px", "font-weight" : "bold", "padding" : "2px 0px 0px 0px", "cursor" : "pointer" });

		block.append( bonusLocation );
		block.append( bonusMU );
		block.append( bonusSD );
		return( block );
	}


	// Change create contract page
	function changeCreateContract() {

		// Clean some elements from Form
		var input = $( "#contractsForm" ).children( "input" ).eq(2);
		$( "#contractsForm" ).next().remove();

		$( "#contractsForm" ).children( "br" ).remove();
		$( "#contractsForm" ).children( "b" ).remove();
		$( "#contractsForm" ).children( "div" ).css({ "display" : "none" });
		$( "#offererSide" ).css({ "display" : "none" });
		$( "#itemTypeList" ).css({ "display" : "none" });

		var player = $( "<div style='float:left; width:49%; height:30px'></div>" );
		player.css({ "background-color" : "#fff", "border-radius" : "4px", "cursor" : "pointer" });
		player.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });
		var imgPlayerSrc = $( ".testDivwhite" ).eq(0).find( "img" ).eq(1).attr( "src" );
		player.append( "<img src='"+ imgPlayerSrc +"' style='float:left; width:30px;' />" );
		player.append( "<div style='float:left; font-weight:bold; font-size:14px; margin:6px 0px 0px 5px;'>Player</div>" );

		var dummy = $( "<div style='float:left; width:49%; height:30px'></div>" );
		dummy.css({ "margin" : "0px 0px 0px 1%" });
		var imgDummySrc = $( ".testDivwhite" ).eq(1).find( "img" ).eq(1).attr( "src" );
		dummy.append( "<img src='"+ imgDummySrc +"' style='float:right; width:30px;' />" );
		dummy.append( "<div style='float:right; font-weight:bold; font-size:14px; margin:6px 5px 0px 0px;'>Dummy</div>" );

		var playerBlock = createContractBlock();
		var dummyBlock = createContractBlock();

		player.insertBefore( input );
		dummy.insertBefore( input );
		playerBlock.insertBefore( input );
		//dummyBlock.insertBefore( input );
	}


	// Create contract block
	function createContractBlock() {

		var block = $( "<div style='float:left; width:100%; height:200px;'></div>" );
		block.css({ "background-color" : "#fff", "margin" : "9px 0px 10px 0px", "border-radius" : "4px" });
		block.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });

		return( block );
	}


	// Return Rank modifier from API
	function getRankAPI( str, quality, rank ) {

		var currentDate = (new Date).getDate();
		var lastDate = GetValue( "LastUpdateAPIRank" );
		var needUpdate = (lastDate != currentDate);

		var value = GetValue( "APIRankJSON" );
		if( value && !needUpdate ) {
			var json = $.parseJSON( value );
			for( var i=0; i<json.length; i++ ) {
				if( json[i].name == rank ) { return( json[i].damageModifier ); }
			}

		} else {

			$.ajax({
				url: URLAPIRanks,
				success: function( data ) {
					SetValue( "APIRankJSON", data );
					SetValue( "LastUpdateAPIRank", currentDate );

					var mult = 0;
					var json = $.parseJSON( data );
					for( var i=0; i<json.length; i++ ) {
						if( json[i].name == rank ) { 
							mult = parseInt( json[i].damageModifier );
						}
					}

					updateDamage( str, mult, quality );
				}
			});
		}

		return( 0 );
	}


	// Return Region list from API
	function getRegionAPI( region, current ) {

		var currentDate = (new Date).getDate();
		var lastDate = GetValue( "LastUpdateAPIRegion" );
		var needUpdate = (lastDate != currentDate);

		var value = GetValue( "APIRegionJSON" );
		if( value && !needUpdate ) {

			var json = $.parseJSON( value );
			for( var i=0; i<json.length; i++ ) {
				if( json[i].id == region ) { return( json[i].neighbours ); }
			}

		} else {
		
			$.ajax({
				url: URLAPIRegion,
				success: function( data ) {
					SetValue( "APIRegionJSON", data );
					SetValue( "LastUpdateAPIRegion", currentDate );

					var numberLocation = 0;
					var neighbours = [];
					var json = $.parseJSON( data );
					for( var i=0; i<json.length; i++ ) {
						if( json[i].id == region ) {
							neighbours = json[i].neighbours;
							numberLocation = (neighbours.indexOf( parseInt(current) ) != -1) ? 20 : 0;
						}
					}

					var location = $( "#rightBlockBonus" ).find( ".locationBonus" );
					location.text( numberLocation + "%" );
					var color = (numberLocation == 0) ? "#e67171" : "#bed7ba";
					location.css({ "background-color" : color });

					location = $( "#leftBlockBonus" ).find( ".locationBonus" );
					location.text( numberLocation + "%" );
					location.css({ "background-color" : color });
				}
			});
		}

		return [];
	}


	// Get URL Vars
	function getUrlVars() {

		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; });
		return vars;
	}


	// Disable selection object
	function disableSelection( target ) {

		if( typeof target.onselectstart != "undefined" ) {
			target.onselectstart = function(){ return false; }

		} else if( typeof target.style.MozUserSelect != "undefined" ) {
			target.style.MozUserSelect = "none";

		} else target.onmousedown = function(){ return false; }

		target.style.cursor = "default"
	}
};

// Inject our main script
var script = document.createElement( "script" );
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild( script );