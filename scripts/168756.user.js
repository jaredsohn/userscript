SignupLogin
Userscripts.org
Scripts
Tags
Forums
People

Easy Delivery 4 eSim
By aMiTo — Last update May 20, 2013 — Installed 8,985 times.
About
Source Code
Reviews 5
Discussions 0
Fans 5
Issues
Share
There are 31 previous versions of this script.

the source is over 100KB, syntax highlighting in the browser is too slow

// ==UserScript==
// @name           EasyDelivery
// @version        0.7.3.1
// @namespace      localhost
// @author         aMiTo
// @description    Easy tool to improve delivery job.
// @match          http://*.e-sim.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @resource       myCustomCSS https://dl.dropbox.com/u/78035768/eSim/132316.user.css
// @resource       myQualityStar https://dl.dropbox.com/u/78035768/eSim/star.png
// @resource       AoEweaponQ0 https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ0.png
// @resource       AoEweaponQ1 https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ1.png
// @resource       AoEweaponQ2 https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ2.png
// @resource       AoEweaponQ3 https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ3.png
// @resource       AoEweaponQ4 https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ4.png
// @resource       AoEweaponQ5 https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ5.png
// @resource       AoEweaponQ0Big https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ0.gif
// @resource       AoEweaponQ1Big https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ1.gif
// @resource       AoEweaponQ2Big https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ2.gif
// @resource       AoEweaponQ3Big https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ3.gif
// @resource       AoEweaponQ4Big https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ4.gif
// @resource       AoEweaponQ5Big https://dl.dropbox.com/u/78035768/eSim/AoE/weaponQ5.gif
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_addStyle
// ==/UserScript==

var main = function () {

	// CONSTANTS
	var VERSION = 						"E.D. 0.7.3.1";
	var URLSCRIPT = 					"http://userscripts.org/scripts/show/132316";
	// CUSTOM IMAGE LINKS
	var QUALITYSTAR = 					$( "#myQualityStar" ).val();
	var AoEweaponQ0 =					$( "#AoEweaponQ0" ).val();
	var AoEweaponQ1 =					$( "#AoEweaponQ1" ).val();
	var AoEweaponQ2 =					$( "#AoEweaponQ2" ).val();
	var AoEweaponQ3 =					$( "#AoEweaponQ3" ).val();
	var AoEweaponQ4 =					$( "#AoEweaponQ4" ).val();
	var AoEweaponQ5 =					$( "#AoEweaponQ5" ).val();
	var AoEweaponQ0Big =				$( "#AoEweaponQ0Big" ).val();
	var AoEweaponQ1Big =				$( "#AoEweaponQ1Big" ).val();
	var AoEweaponQ2Big =				$( "#AoEweaponQ2Big" ).val();
	var AoEweaponQ3Big =				$( "#AoEweaponQ3Big" ).val();
	var AoEweaponQ4Big =				$( "#AoEweaponQ4Big" ).val();
	var AoEweaponQ5Big =				$( "#AoEweaponQ5Big" ).val();
	// API
	var URLAPIRanks =					"e-sim.org/apiRanks.html";
	var URLAPIRegion =					"e-sim.org/apiRegions.html";
	// URLs
	var URLMain = 						"e-sim.org/index.html";
	var URLMU = 						"e-sim.org/myMilitaryUnit.html";
	var URLMUStorage = 					"e-sim.org/militaryUnitStorage.html";
	var URLMUMoney = 					"e-sim.org/militaryUnitMoneyAccount.html";
	var URLMUCompanies = 				"e-sim.org/company.html?id=";
	var URLDDonatePlayerProduct = 		"e-sim.org/donateProducts.html?id=";
	var URLDonateMUProduct = 			"e-sim.org/donateProductsToMilitaryUnit.html?id=";
	var URLCompanies = 					"e-sim.org/companies.html";
	var URLCompany = 					"e-sim.org/company.html?id=";
	var URLCompanyDetails = 			"e-sim.org/companyWorkResults.html?id=";
	var URLBattle = 					"e-sim.org/battle.html?id=";
	var URLBattleList = 				"e-sim.org/battles.html";
	var URLContracts = 					"e-sim.org/contracts.html";
	var URLContract = 					"e-sim.org/contract.html?id=";
	var URLMarket = 					"e-sim.org/productMarket.html";
	var URLMonetaryMarket = 			"e-sim.org/monetaryMarket.html";
	var URLMarketOffers = 				"e-sim.org/citizenMarketOffers.html";
	var URLJobMarket =					"e-sim.org/jobMarket.html";
	var URLMyShares = 					"e-sim.org/myShares.html";
	var URLStockMM = 					"e-sim.org/stockCompanyMoney.html";
	var URLStockProducts = 				"e-sim.org/stockCompanyProducts.html";
	var URLStockDonateMoney = 			"e-sim.org/stockCompanyDonateMoney.html";
	var URLStockDonateCompany = 		"e-sim.org/stockCompanyDonateCompany.html";
	var URLStockLogs = 					"e-sim.org/stockCompanyLogs.html";
	var URLTravel = 					"e-sim.org/travel.html";
	var URLEquipment =					"e-sim.org/equipment.html";
	// Image resources
	var IMGIRON = 						"http://e-sim.home.pl/testura/img/productIcons/Iron.png";
	var IMGGRAIN = 						"http://e-sim.home.pl/testura/img/productIcons/Grain.png";
	var IMGOIL = 						"http://e-sim.home.pl/testura/img/productIcons/Oil.png";
	var IMGDIAMONDS = 					"http://e-sim.home.pl/testura/img/productIcons/Diamonds.png";
	var IMGWOOD = 						"http://e-sim.home.pl/testura/img/productIcons/Wood.png";
	var IMGSTONE = 						"http://e-sim.home.pl/testura/img/productIcons/Stone.png";
	var IMGWEAPON = 					"http://e-sim.home.pl/testura/img/productIcons/Weapon.png";
	var IMGFOOD = 						"http://e-sim.home.pl/testura/img/productIcons/Food.png";
	var IMGTICKET = 					"http://e-sim.home.pl/testura/img/productIcons/Ticket.png";
	var IMGGIFT = 						"http://e-sim.home.pl/testura/img/productIcons/Gift.png";
	var IMGHOUSE = 						"http://e-sim.home.pl/testura/img/productIcons/House.png";
	var IMGDS = 						"http://e-sim.home.pl/testura/img/productIcons/Defense System.png";
	var IMGHOSPITAL = 					"http://e-sim.home.pl/testura/img/productIcons/Hospital.png";
	var IMGESTATE = 					"http://e-sim.home.pl/testura/img/productIcons/Estate.png";
	var IMGQUALITY = 					"http://e-sim.home.pl/testura/img/productIcons/q";
	var IMGEXTENSION = 					".png";
	// Image countries
	var ARGENTINA =						"http://e-sim.home.pl/testura/img/flags/small/Argentina.png";
	var AUSTRALIA =						"http://e-sim.home.pl/testura/img/flags/small/Australia.png";
	var BELARUS =						"http://e-sim.home.pl/testura/img/flags/small/Belarus.png";
	var BELGIUM = 						"http://e-sim.home.pl/testura/img/flags/small/Belgium.png";
	var BOSNIA = 						"http://e-sim.home.pl/testura/img/flags/small/Bosnia-and-Herzegovina.png"
	var BRAZIL = 						"http://e-sim.home.pl/testura/img/flags/small/Brazil.png";
	var BULGARIA = 						"http://e-sim.home.pl/testura/img/flags/small/Bulgaria.png";
	var CANADA = 						"http://e-sim.home.pl/testura/img/flags/small/Canada.png";
	var CHILE = 						"http://e-sim.home.pl/testura/img/flags/small/Chile.png";
	var CHINA = 						"http://e-sim.home.pl/testura/img/flags/small/China.png";
	var COLOMBIA = 						"http://e-sim.home.pl/testura/img/flags/small/Colombia.png";
	var CROATIA = 						"http://e-sim.home.pl/testura/img/flags/small/Croatia.png";
	var CZECH = 						"http://e-sim.home.pl/testura/img/flags/small/Czech-Republic.png";
	var ESTONIA = 						"http://e-sim.home.pl/testura/img/flags/small/Estonia.png";
	var FINLAND = 						"http://e-sim.home.pl/testura/img/flags/small/Finland.png";
	var FRANCE = 						"http://e-sim.home.pl/testura/img/flags/small/France.png";
	var GERMANY = 						"http://e-sim.home.pl/testura/img/flags/small/Germany.png";
	var GREECE = 						"http://e-sim.home.pl/testura/img/flags/small/Greece.png";
	var HUNGARY = 						"http://e-sim.home.pl/testura/img/flags/small/Hungary.png";
	var INDIA = 						"http://e-sim.home.pl/testura/img/flags/small/India.png";
	var INDONESIA = 					"http://e-sim.home.pl/testura/img/flags/small/Indonesia.png";
	var IRAN = 							"http://e-sim.home.pl/testura/img/flags/small/Iran.png";
	var IRELAND = 						"http://e-sim.home.pl/testura/img/flags/small/Ireland.png";
	var ISRAEL = 						"http://e-sim.home.pl/testura/img/flags/small/Israel.png";
	var ITALY = 						"http://e-sim.home.pl/testura/img/flags/small/Italy.png";
	var LATVIA = 						"http://e-sim.home.pl/testura/img/flags/small/Latvia.png";
	var LITHUANIA = 					"http://e-sim.home.pl/testura/img/flags/small/Lithuania.png";
	var MALAYSIA = 						"http://e-sim.home.pl/testura/img/flags/small/Malaysia.png";
	var MEXICO = 						"http://e-sim.home.pl/testura/img/flags/small/Mexico.png";
	var NETHERLANDS = 					"http://e-sim.home.pl/testura/img/flags/small/Netherlands.png";
	var NORWAY =	 					"http://e-sim.home.pl/testura/img/flags/small/Norway.png";
	var PAKISTAN =	 					"http://e-sim.home.pl/testura/img/flags/small/Pakistan.png";
	var PERU =		 					"http://e-sim.home.pl/testura/img/flags/small/Peru.png";
	var PHILIPPINES =					"http://e-sim.home.pl/testura/img/flags/small/Philippines.png";
	var POLAND =						"http://e-sim.home.pl/testura/img/flags/small/Poland.png";
	var PORTUGAL =						"http://e-sim.home.pl/testura/img/flags/small/Portugal.png";
	var FYROM =							"http://e-sim.home.pl/testura/img/flags/small/Republic-of-Macedonia.png";
	var ROMANIA =						"http://e-sim.home.pl/testura/img/flags/small/Romania.png";
	var RUSSIA =						"http://e-sim.home.pl/testura/img/flags/small/Russia.png";
	var SERBIA =						"http://e-sim.home.pl/testura/img/flags/small/Serbia.png";
	var SLOVENIA =						"http://e-sim.home.pl/testura/img/flags/small/Slovenia.png";
	var SOUTHKOREA =					"http://e-sim.home.pl/testura/img/flags/small/South-Korea.png";
	var SPAIN =							"http://e-sim.home.pl/testura/img/flags/small/Spain.png";
	var SWEDEN =						"http://e-sim.home.pl/testura/img/flags/small/Sweden.png";
	var SWITZERLAND =					"http://e-sim.home.pl/testura/img/flags/small/Switzerland.png";
	var TAIWAN =						"http://e-sim.home.pl/testura/img/flags/small/Taiwan.png";
	var TURKEY =						"http://e-sim.home.pl/testura/img/flags/small/Turkey.png";
	var USA =							"http://e-sim.home.pl/testura/img/flags/small/USA.png";
	var UKRAINE =						"http://e-sim.home.pl/testura/img/flags/small/Ukraine.png";
	var UK =							"http://e-sim.home.pl/testura/img/flags/small/United-Kingdom.png";
	// Others Image
	var IMGPACKAGE = 					"http://e-sim.home.pl/testura/img/package.png";
	var IMGDOLLAR = 					"http://e-sim.home.pl/testura/img/dollar.png";
	var IMGEQUIPMENT = 					"http://e-sim.home.pl/testura/img/equipment.png";
	var IMGCOMPANY =					"http://e-sim.home.pl/testura/img/newCompany.png";
	var IMGONLINE = 					"http://e-sim.home.pl/testura/img/newOnline.png";
	var IMGOFFLINE =					"http://e-sim.home.pl/testura/img/newOffline.png";
	var IMGPRODBG = 					"http://e-sim.home.pl/testura/img/productIcons/background.png";
	var IMGCRITICAL = 					"http://e-sim.home.pl/testura/img/equipmentIcons/criticalHit.png";
	var IMGMISS = 						"http://e-sim.home.pl/testura/img/equipmentIcons/reduceMiss.png";
	var IMGAVOID = 						"http://e-sim.home.pl/testura/img/equipmentIcons/avoidDamage.png";

	// VARS
	var cachedSettings = null; // GM friendly function
	var currentServer = null;
	var selectedFood = null;
	var selectedGift = null;
	var selectedWeapon = null;
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

			//if( !isOrgAccount() ) { updateMUOrdersMain(); }

		// MU storage
		} else if( localUrl.indexOf( URLMUStorage, 0 ) >= 0 ) {

			if( getValue( "configMUStorageDonateToMe" ) == "true" ) { addDonateToMeButton( "#donateProductForm" ); }
			if( getValue( "configMUStorageSelect" ) == "true" ) { changeSelectMUStorage( "#donateProductForm" ); }
			if( getValue( "configMUStorageFastButtons" ) == "true" ) { addMUFastButtons( "#quantity" ); }
			if( getValue( "configMUStorageDonateImprovements" ) == "true" ) {
				orderMU( "#donateProductForm", previousSelection );
				addUpdateJobsButton( "#donateProductForm" );
				addUpdateConnectionButton( "#donateProductForm" );
			}
			if( getValue( "configMUStorageDonateCounter" ) == "true" ) { addCounterMembersMU(); }

		// MU money
		} else if( localUrl.indexOf( URLMUMoney, 0 ) >= 0 ) {

			if( getValue( "configMUMoneyDonateToMe" ) == "true" ) { addDonateToMeButton( "#donateMoneyForm" ); }
			if( getValue( "configMUMoneyDonateImprovements" ) == "true" ) { orderMU( "#donateMoneyForm", "" ); }
			//addCounterMembersMU();

		// Donate player to player
		} else if( localUrl.indexOf( URLDDonatePlayerProduct, 0 ) >= 0 ) {

			if( getValue( "configDonateProduct" ) == "true" ) { changeSelectPlayerToPlayer(); }
			if( getValue( "configDonateFastButtons" ) == "true" ) { addFastButtons( "#quantity" ); }

		// Donate player to MU
		} else if( localUrl.indexOf( URLDonateMUProduct, 0 ) >= 0 ) {

			if( getValue( "configDonateProduct" ) == "true" ) { changeSelectPlayerToPlayer(); }
			if( getValue( "configDonateFastButtons" ) == "true" ) { addFastButtons( "#quantity" ); }

		// Battle weapon selector
		} else if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {

			if( !isOrgAccount() ) {
				//calculateBonus();
				if( getValue( "configWeaponSelector" ) == "true" ) { changeWeaponBattle(); }
			}
			//changeBattleDesign();
			if( getValue( "configRoundSelector" ) == "true" ) { changeRoundSelector(); }

		// Contract creator
		} else if( localUrl.indexOf( URLContract, 0 ) >= 0 ) {

			//changeCreateContract();

		// Market
		} else if( localUrl.indexOf( URLMarket, 0 ) >= 0 ) {

			if( getValue( "configProductMarketSelection" ) == "true" ) { changeProductSelection(); }
			if( getValue( "configProductMarketTable" ) == "true" ) { changeProductMarketTable(); }

		// Market offers
		} else if( localUrl.indexOf( URLMarketOffers, 0 ) >= 0 ) {

			if( getValue( "configProductMarketOffers" ) == "true" ) { changeMarketOffers(); }

		// My Shares menu
		} else if( localUrl.indexOf( URLMyShares, 0 ) >= 0 ) {

			//changeMenuShares();

		// Travel
		} else if( localUrl.indexOf( URLTravel, 0 ) >= 0 ) {

			if( getValue( "configTravelMenu" ) == "true" ) { changeTravelMenu(); }

		// Equipment
		} else if( localUrl.indexOf( URLEquipment, 0 ) >= 0 ) {

			if( getValue( "configDesignEquipment" ) == "true" ) { redesignEquipment(); }
			if( getValue( "configCalculateDamage" ) == "true" ) { calculateEquipmentDamage(); }

		// Company
		} else if( localUrl.indexOf( URLCompany, 0 ) >= 0 ) {

			if( getValue( "configSkillImprovements" ) == "true" ) { companyImprovements(); }

		// Job market
		} else if( localUrl.indexOf( URLJobMarket, 0 ) >= 0 ) {

			if( getValue( "configSkillImprovements" ) == "true" ) { jobMarketSkills(); }

		// List of battles
		} else if( localUrl.indexOf( URLBattleList, 0 ) >= 0 ) {

			if( getValue( "configBattleList" ) == "true" ) { changeBattleList(); }
		}

		// Global code
		if( $( "form[action='login.html']" ).length == 0 ) {

			addVersion();
			addConfigurationUI();
			if( getValue( "configMoveNotifications" ) == "true" ) { rellocateMessages(); }
			if( getValue( "configMUFastLinks" ) == "true" ) { addMUFastLinks(); }
			if( getValue( "configFastLinks" ) == "true" ) { addFastLinks(); }
			if( getValue( "configEatButtons" ) == "true" ) { changeEatButtons(); }
			//changeProfile();
		}

		// Set all buttons with pointer cursor
		$( "body" ).find( "input[type='submit']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });
		$( "body" ).find( "input[type='button']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });

	} initialize();


	// Load configuration from disk or default
	function loadConfiguration() {
		if( $( "form[action='login.html']" ).length != 0 ) { return; }

		// Global
		if( !getValue( "configFastLinks" ) ) { setValue( "configFastLinks", "true" ); }
		if( !getValue( "configMUFastLinks" ) ) { setValue( "configMUFastLinks", "true" ); }
		if( !getValue( "configMoveNotifications" ) ) { setValue( "configMoveNotifications", "true" ); }
		if( !getValue( "configEatButtons" ) ) { setValue( "configEatButtons", "true" ); }
		if( !getValue( "configSkillImprovements" ) ) { setValue( "configSkillImprovements", "true" ); }

		// MU storage
		if( !getValue( "configMUStorageDonateToMe" ) ) { setValue( "configStorageDonateToMe", "true" ); }
		if( !getValue( "configMUStorageSelect" ) ) { setValue( "configMUStorageSelect", "true" ); }	
		if( !getValue( "configMUStorageFastButtons" ) ) { setValue( "configMUStorageFastButtons", "true" ); }
		if( !getValue( "configMUStorageDonateImprovements" ) ) { setValue( "configMUStorageDonateImprovements", "true" ); }
		if( !getValue( "configMUStorageDonateCounter" ) ) { setValue( "configMUStorageDonateCounter", "true" ); }

		// MU money
		if( !getValue( "configMUMoneyDonateToMe" ) ) { setValue( "configMUMoneyDonateToMe", "true" ); }
		if( !getValue( "configMUMoneyDonateImprovements" ) ) { setValue( "configMUMoneyDonateImprovements", "true" ); }

		// Donate
		if( !getValue( "configDonateProduct" ) ) { setValue( "configDonateProduct", "true" ); }
		if( !getValue( "configDonateFastButtons" ) ) { setValue( "configDonateFastButtons", "true" ); }

		// Battle
		if( !getValue( "configRoundSelector" ) ) { setValue( "configRoundSelector", "true" ); }
		if( !getValue( "configBattleList" ) ) { setValue( "configBattleList", "true" ); }
		if( !getValue( "configWeaponSelector" ) ) { setValue( "configWeaponSelector", "true" ); }
		if( !getValue( "configWeaponTheme" ) ) { setValue( "configWeaponTheme", "AoE" ); }
		if( !getValue( "configDefaultWeapon" ) ) { setValue( "configDefaultWeapon", "1" ); }

		// Equipment
		if( !getValue( "configDesignEquipment" ) ) { setValue( "configDesignEquipment", "true" ); }
		if( !getValue( "configCalculateDamage" ) ) { setValue( "configCalculateDamage", "true" ); }

		// Travel
		if( !getValue( "configTravelMenu" ) ) { setValue( "configTravelMenu", "true" ); }

		// Market
		if( !getValue( "configProductMarketSelection" ) ) { setValue( "configProductMarketSelection", "true" ); }
		if( !getValue( "configProductMarketTable" ) ) { setValue( "configProductMarketTable", "true" ); }
		if( !getValue( "configProductMarketOffers" ) ) { setValue( "configProductMarketOffers", "true" ); }
	}
	
	
	// Check if is Org account
	function isOrgAccount() {
		var plate = $( "#stats" ).parent();
		var level = plate.find( "b" ).eq( 0 ).text();
		level = level.split( ": " )[1];

		var skill = plate.find( "b" ).eq( 11 ).text();
		skillTxt = skill.split( ": " )[1];

		var str = plate.find( "b" ).eq( 12 ).text();
		strTxt = str.split( ": " )[1];

		if( (level == "1") && (skillTxt == "1.0") && (strTxt == "10") ) { return( true ); }
		return( false );
	}


	// Change eat food/use gift selectors
	function changeEatButtons() {

		$( "#eatLink" ).hide();
		$( "#useGiftLink" ).hide();

		$( "#eatMenu" ).show();
		$( "#eatMenu" ).addClass( "eatMenuMod" );
		$( "#useGiftMenu" ).show();
		$( "#useGiftMenu" ).addClass( "useGiftMenuMod" );

		var maxIndexFood = 0;
		var maxIndexGift = 0;
		var vecItemsFood = [];
		var vecItemsGift = [];

		var index = 0;
		$( "#foodQuality" ).find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "0" ) { index++; return; }

			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) { str = str.substr( number + 1, str.indexOf( " ", number ) - number ); }

			var food = $( "<div class='foodItem' indexSelect='"+ index +"'></div>" );
			food.append( "<img class='imageFood' src='"+ IMGFOOD +"' />" );
			food.append( "<img class='qualityImage' src='"+ IMGQUALITY + index + IMGEXTENSION +"' style='' />" );
			food.append( "<div class='numberItems'>"+ str +"</div>" );

			if( str != 0 ) {
				maxIndexFood = index;

				food.bind( "mouseover", function() {
					if( selectedFood.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) { $(this).addClass( "foodItemHover" ); }
				});
				food.bind( "mouseout", function() {
					if( selectedFood.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) { $(this).removeClass( "foodItemHover" ); }
				});

				food.bind( "click", function() {
					if( selectedFood ) { selectedFood.removeClass( "foodItemSelected" ); }
					$(this).addClass( "foodItemSelected" );
					selectedFood = $(this);

					$( "#foodQuality option" )[ $(this).attr( "indexselect" ) ].selected = true;
					updateHealthButtons();
				});

			} else food.addClass( "itemDisabled" );

			vecItemsFood.push( food );
			$( "#eatMenu form" ).append( food );

			index++;
		});


		index = 0;
		$( "#giftQuality" ).find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "0" ) { index++; return; }

			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) { str = str.substr( number + 1, str.indexOf( " ", number ) - number ); }

			var gift = $( "<div class='foodItem' indexSelect='"+ index +"'></div>" );
			gift.append( "<img class='imageFood' src='"+ IMGGIFT +"' />" );
			gift.append( "<img class='qualityImage' src='"+ IMGQUALITY + index +".png' />" );
			gift.append( "<div class='numberItems'>"+ str +"</div>" );

			if( str != 0 ) {
				maxIndexGift = index;

				gift.bind( "mouseover", function() {
					if( selectedGift.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) { $(this).addClass( "foodItemHover" ); }
				});

				gift.bind( "mouseout", function() {
					if( selectedGift.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) { $(this).removeClass( "foodItemHover" ); }
				});

				gift.bind( "click", function() {
					if( selectedGift ) { selectedGift.removeClass( "foodItemSelected" ); }
					$(this).addClass( "foodItemSelected" );
					selectedGift = $(this);

					$( "#giftQuality option" )[  $(this).attr( "indexselect" ) ].selected = true;
					updateHealthButtons();
				});

			} else gift.addClass( "itemDisabled" );

			vecItemsGift.push( gift );
			$( "#useGiftMenu form" ).append( gift );

			index++;
		});


		// Change Eat and Use buttons
		var newEatButton = $( "<input type='button' id='newEatButton' value='Eat' />" )
		$( "#eatMenu" ).append( newEatButton );
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
					$( "#healthBar" ).html( json.wellness );

					// Update bar from original code
					$i = $(".health img");
					$i.eq(1).css("width", json.wellness + "px");
					$i.eq(2).css("width", (100 - json.wellness) + "px");

					$( "#q1FoodStorage" ).html( "Q1 Food ("+json.q1FoodStorage+" left)" );
					$( "#q2FoodStorage" ).html( "Q2 Food ("+json.q2FoodStorage+" left)" );
					$( "#q3FoodStorage" ).html( "Q3 Food ("+json.q3FoodStorage+" left)" );
					$( "#q4FoodStorage" ).html( "Q4 Food ("+json.q4FoodStorage+" left)" );
					$( "#q5FoodStorage" ).html( "Q5 Food ("+json.q5FoodStorage+" left)" );

					//$( ".usedHealth" ).animate( { "width" : json.wellness+"%" }, 500 );
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

		var newGiftButton = $( "<input type='button' id='newGiftButton' value='Use' />" )
		$( "#useGiftMenu" ).append( newGiftButton );
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
					$( "#healthBar" ).html( json.wellness );

					// Update bar from original code
					$i = $(".health img");
					$i.eq(1).css("width", json.wellness + "px");
					$i.eq(2).css("width", (100 - json.wellness) + "px");

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

					//$( ".usedHealth" ).animate( { "width" : json.wellness+"%" }, 500 );
					updateHealthButtons();

					if( json.error != "" ) {
						$( '#hiddenError' ).html( json.error );
						$.blockUI({ message: $( '#eatError' ), css: { width: '400px', border: '0px', background: 'rgba(255,255,255,0)' } });
					}
				}
			});
		});


		// Redesign food and gift limits
		$( "#foodLimit" ).addClass( "foodLimitMod" );
		$( "#giftLimit" ).addClass( "giftLimitMod" );
		$( "#eatMenu form" ).append( $( "#foodLimit" ) );
		$( "#useGiftMenu form" ).append( $( "#giftLimit" ) );

		$( "#foodQuality" ).css({ "display" : "none" });
		$( "#giftQuality" ).css({ "display" : "none" });
		$( "#eatButton" ).css({ "display" : "none" });
		$( "#useGiftButton" ).css({ "display" : "none" });

		$( "#eatLink" ).prev().remove();
		$( "#eatMenu" ).prev().remove();
		$( "#useGiftLink" ).prev().remove();
		$( "#useGiftLink" ).next().remove();

		// Default max quality items
		if( maxIndexFood > 0 ) { vecItemsFood[ maxIndexFood-1].click(); }
		if( maxIndexGift > 0 ) { vecItemsGift[ maxIndexGift-1].click(); }

		showHideButtons();
		updateHealthButtons();

		if( $( "#stats" ).children( "form" ).length != 0 ) {
			var form = $( "#stats" ).children( "form" );
			form.contents().eq(4).remove();
			form.children( "img" ).css({ "margin" : "2px 7px 0px 0px" });

			// Rellocate wiki help
			var lastDiv = $( "#stats" ).children( "div:last" );
			lastDiv.css({ "float" : "right", "margin" : "6px 3px 0px 0px" });
			lastDiv.children( "a" ).text( "" ).append( lastDiv.children( "img" ) );
			form.children( "br" ).remove();
			form.append( lastDiv );
		}
	}


	// Show and hide Food/Gift buttons
	function showHideButtons() {

		// Show/Hide button
		var showHide = $( "<div id='showHide'></div>" );
		showHide.append( "<span class='arrow'> &darr;&darr; </span>" );
		showHide.append( "<span style='font-weight:bold; color:#3787ea;'> Eat food / Use gift </span>" );
		showHide.append( "<span class='arrow'> &darr;&darr; </span>" );
		showHide.insertBefore( $( "#eatMenu" ) );

		// On battle page will be always visible
		var foodGiftVisible = true;
		var localUrl = new String( window.location );
		if( localUrl.indexOf( URLBattle, 0 ) == -1 ) {
			foodGiftVisible = false;
			$( "#eatMenu" ).hide();
			$( "#useGiftMenu" ).hide();
			$( "#useGiftMenu" ).next().hide();

			showHide.children( ".arrow" ).text( String.fromCharCode(8593) + String.fromCharCode(8593) )
		}

		showHide.bind( "click", function() {
			var time = 125;
			foodGiftVisible = !foodGiftVisible;
			$( "#eatMenu" ).toggle( time );
			$( "#useGiftMenu" ).toggle( time );
			$( "#useGiftMenu" ).next().toggle( time );

			if( foodGiftVisible ) { 
				showHide.children( ".arrow" ).text( String.fromCharCode(8595) + String.fromCharCode(8595) );
			} else showHide.children( ".arrow" ).text( String.fromCharCode(8593) + String.fromCharCode(8593) );
		});
	}


	// Update health buttons to enable or disable
	function updateHealthButtons() {

		var h = parseInt( $( "#healthBar" ).text() );
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

		updateFightButtons();
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


	// Update fight buttons
	function updateFightButtons() {

		// Only on battle page
		if( (new String( window.location )).indexOf( URLBattle, 0 ) >= 0 ) {

			// If is RW
			if( $( ".fightButton" ).length == 4 ) {

				var btnFight1 = $( ".fightButton" ).eq(0);
				var btnFight2 = $( ".fightButton" ).eq(1);
				var btnBk1 = $( ".fightButton" ).eq(2);
				var btnBk2 = $( ".fightButton" ).eq(3);
				var h = parseInt( $( "#healthBar" ).text() );
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
				var h = parseInt( $( "#healthBar" ).text() );
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

			// Add update weapon method
			$.blockUI.defaults.onUnblock = function( elem, opts ) { updateHealthButtons(); }
		}
	}


	// Add MU fast links
	function addMUFastLinks() {

		// Link to MU
		var linkMU = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLMU +"'><span>MU</span></a>"  );
		linkMU.attr( "title", "Military unit" );
		linkMU.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top-25", at: "center top" } });

		// Link to MU storage
		var linkMUSt = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLMUStorage +"'></a>"  );
		linkMUSt.append( "<img src='"+ IMGPACKAGE +"' />" );
		linkMUSt.attr( "title", "MU storage" );
		linkMUSt.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top-25", at: "center top" } });

		// Link to MU money
		var linkMUMy = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLMUMoney +"'></a>"  );
		linkMUMy.append( "<img src='"+ IMGDOLLAR +"' />" );
		linkMUMy.attr( "title", "MU money" );
		linkMUMy.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top-25", at: "center top" } });

		var content = $( "#userMenu" ).children().first();
		content.append( linkMU );
		content.append( linkMUSt );
		content.append( linkMUMy );
	}


	// Add other fast links
	function addFastLinks() {

		// Link to equipment
		var linkEquip = $( "<a class='fastLinks ' href='"+ getCurrentServer() + URLEquipment +"'></a>"  );
		linkEquip.append( "<img src='"+ IMGEQUIPMENT +"' />" );
		linkEquip.attr( "title", "Equipment" );
		linkEquip.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to my companies
		var linkComp = $( "<a class='fastLinks ' href='"+ getCurrentServer() + URLCompanies +"'></a>"  );
		linkComp.append( "<img src='"+ IMGCOMPANY +"' />" );
		linkComp.attr( "title", "My companies" );
		linkComp.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Future image buttons
		// Link to contracts
		var linkCT = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLContracts +"'><span>CT</span></a>"  );
		linkCT.attr( "title", "Contracts" );
		linkCT.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to shares
		var linkSH = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLMyShares +"'><span>SH</span></a>"  );
		linkSH.attr( "title", "Shares" );
		linkSH.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to product market
		var linkPM = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLMarket +"'><span>PM</span></a>"  );
		linkPM.attr( "title", "Product market" );
		linkPM.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to monetary market
		var linkMM = $( "<a class='fastLinks' href='"+ getCurrentServer() + URLMonetaryMarket +"'><span>MM</span></a>"  );
		linkMM.attr( "title", "Monetary market" );
		linkMM.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		var content = $( "<div class='plate' style='display:block; font-weight:bold; height:20px;'></div>" );
		content.append( linkEquip );
		content.append( linkComp );
		content.append( linkCT );
		content.append( linkSH );
		content.append( linkPM );
		content.append( linkMM );
		content.insertAfter( $( "#userMenu" ).children().first() );
	}


	// Get ID player
	function getPlayerID() {
		if( !idPlayer ) {
			var link = $( "#userImage" ).parent().attr( "href" );
			if( link.split( "id=" ).length == 2 ) {
				idPlayer = link.split( "id=" )[1];
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


	// Add version on all pages
	function addVersion() {

		// Version
		var vers = $( "<div class='version'>" + VERSION + "</div>" );
		var optionVisible = false;
		vers.bind( "click", function() { $( "#maskConfig" ).show(); $( "#configScript" ).show(); });

		var content = $( "<div class='plate' style='display:block; font-weight:bold; height:20px;'></div>" );
		content.insertBefore( $( "#userMenu" ).children().first() );
		content.append( vers );
	}


	// Add configuration
	function addConfigurationUI() {

		// Add mask and config
		var mask = $( "<div id='maskConfig'></div>" );
		var configScript = $( "<div id='configScript'></div>" );
		$( "body" ).append( mask );
		$( "body" ).append( configScript );

		// Title
		configScript.append( "<h2 class='titleConfig'>Configuration "+ VERSION +"</h2>" );
		configScript.append( "<a href='"+ URLSCRIPT +"' target='_blank'>check new version</a>" );
		configScript.append( "<br/>" );

		// Global config
		var globalBlock = $( "<div id='globalBlock'>GLOBAL</div>" );
		var muFastLinks = createCheckBox( "MU Fast links", "configMUFastLinks" );
		globalBlock.append( muFastLinks );
		var fastLinks = createCheckBox( "Fast links", "configFastLinks" );
		globalBlock.append( fastLinks );
		var configMoveNotify = createCheckBox( "Move notifications", "configMoveNotifications" );
		globalBlock.append( configMoveNotify );
		var configEatButtons = createCheckBox( "Food/Gifts buttons", "configEatButtons" );
		globalBlock.append( configEatButtons );
		var configSkillImprovements = createCheckBox( "Skill Improvements", "configSkillImprovements" );
		globalBlock.append( configSkillImprovements );

		// MU storage
		var muStorageBlock = $( "<div id='muStorageBlock'>MU STORAGE</div>" );
		var muStorageDonateToMe = createCheckBox( "Button: Donate me", "configMUStorageDonateToMe" );
		muStorageBlock.append( muStorageDonateToMe );
		var muStorageSelect = createCheckBox( "Product selection", "configMUStorageSelect" );
		muStorageBlock.append( muStorageSelect );
		var muStorageFastButtons = createCheckBox( "Fast buttons", "configMUStorageFastButtons" );
		muStorageBlock.append( muStorageFastButtons );
		var muStorageDonateImprovements = createCheckBox( "Donate improvements", "configMUStorageDonateImprovements" );
		muStorageBlock.append( muStorageDonateImprovements );
		var muStorageItemCounter = createCheckBox( "Donate counter", "configMUStorageDonateCounter" );
		muStorageBlock.append( muStorageItemCounter );

		// MU money
		var muMoneyBlock = $( "<div id='muMoneyBlock'>MU MONEY</div>" );
		var muMoneyDonateToMe = createCheckBox( "Button: Donate me", "configMUMoneyDonateToMe" );
		muMoneyBlock.append( muMoneyDonateToMe );
		var muMoneyDonateImprovements = createCheckBox( "Donate improvements", "configMUMoneyDonateImprovements" );
		muMoneyBlock.append( muMoneyDonateImprovements );

		// Donate
		var donateBlock = $( "<div id='donateBlock'>DONATE</div>" );
		var donateProduct = createCheckBox( "Product selection", "configDonateProduct" );
		donateBlock.append( donateProduct );
		var donateFastButtons = createCheckBox( "Fast buttons", "configDonateFastButtons" );
		donateBlock.append( donateFastButtons );

		// Battle
		var battleBlock = $( "<div id='battleBlock'>BATTLE</div>" );
		var roundSelector = createCheckBox( "Round selector", "configRoundSelector" );
		battleBlock.append( roundSelector );
		var battleList = createCheckBox( "Battle list", "configBattleList" );
		battleBlock.append( battleList );
		var weaponSelector = createCheckBox( "Weapon selector", "configWeaponSelector" );
		battleBlock.append( weaponSelector );

		// Equipment
		var equipmentBlock = $( "<div id='equipmentBlock'>EQUIPMENT</div>" );
		var removeInterface = createCheckBox( "Remove interface", "configDesignEquipment" );
		equipmentBlock.append( removeInterface );
		var calculatorDamage = createCheckBox( "Damage simulator", "configCalculateDamage" );
		equipmentBlock.append( calculatorDamage );

		// Travel
		var travelBlock = $( "<div id='travelBlock'>TRAVEL</div>" );
		var configTravelMenu = createCheckBox( "Ticket selection", "configTravelMenu" );
		travelBlock.append( configTravelMenu );

		// Market
		var marketBlock = $( "<div id='marketBlock'>MARKET</div>" );
		var configProductMarketSelection = createCheckBox( "Product selection", "configProductMarketSelection" );
		marketBlock.append( configProductMarketSelection );
		var configProductMarketTable = createCheckBox( "Product table", "configProductMarketTable" );
		marketBlock.append( configProductMarketTable );
		var configProductMarketOffers = createCheckBox( "My offers", "configProductMarketOffers" );
		marketBlock.append( configProductMarketOffers );

		// Theme weapon selector
		var weaponSel = $( "<select id='weaponSelectorTheme' class='customSelectList'></select>" );
		weaponSel.append( "<option value='default'>eSim</option>" );
		weaponSel.append( "<option value='AoE'>Age of empires</option>" );
		weaponSel.bind( "change", function() {
			setValue( "configWeaponTheme", $(this).val() );
		});

		// Selector of default weapon
		var defaultWeapon = $( "<select id='defaultWeapon' class='customSelectList'></select>" );
		defaultWeapon.append( "<option value='0'>Unarmed</option>" );
		for( var i=1; i<=5; i++ ) { defaultWeapon.append( "<option value='"+i+"'>Q"+i+"</option>" ); }
		defaultWeapon.bind( "change", function() {
			setValue( "configDefaultWeapon", $(this).val() );
		});

		// Close button
		configScript.append( "<br/>" );
		var close = $( "<input style='margin-top:8px' type='button' value='Save and close' />" );
		close.bind( "click", function() { $( "#maskConfig" ).hide(); $( "#configScript" ).hide(); });

		configScript.append( globalBlock );
		configScript.append( battleBlock );
		configScript.append( muStorageBlock );
		configScript.append( donateBlock );
		configScript.append( equipmentBlock );
		configScript.append( muMoneyBlock );
		configScript.append( travelBlock );
		configScript.append( marketBlock );
		configScript.append( "<b>Theme: </b>" );
		configScript.append( weaponSel );
		weaponSel.val( getValue( "configWeaponTheme" ) );
		configScript.append( "<b>Default weapon: </b>" );
		configScript.append( defaultWeapon );
		defaultWeapon.val( getValue( "configDefaultWeapon" ) );
		configScript.append( close );
	}


	// Create checkbox and label
	function createCheckBox( label, configLabel ) {
		var div = $( "<div></div>" );
		var checked = (getValue( configLabel ) == "true") ? "checked='checked'" : "";
		div.append( "<input class='configCheckbox' type='checkbox' "+ checked +" />" );
		div.children( "input" ).bind( "change", function() { 
			setValue( configLabel, ($(this).attr( "checked" ) == "checked") );
		});
		div.append( "<span class='configLabelCheckbox'>"+ label +"</span>" );
		div.children( "span" ).bind( "click", function() { 
			div.children( "input" ).click();
			div.children( "input" ).change();
		});
		return( div );
	}


	// Rellocate messages notify
	function rellocateMessages() {

		// Relloacte messages
		var plateList = $( "#userMenu" ).children( ".plate" );
		var plate = plateList.last();
		plate.insertAfter( $( "#userName" ).parent().parent() );

		// Remove useless fight button
		var localUrl = new String( window.location );
		// On battle, always remove
		if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {
			if( plateList.length == 5 ) {
				plateList.eq(1).remove();
			}
		} else {
			if( plateList.length == 5 ) {
				// if Org, always remove
				if( isOrgAccount() ) {
					plateList.eq(1).remove();
				} else {
					plateList.eq(1).find( ".fightIcon" ).parent().remove();
					if( plateList.eq(1).children( "div" ).children( ".button" ).length == 0 ) {
						plateList.eq(1).remove();
					}
				}
			}
		}
	}


	// Update MU orders if changed on main page
	/*function updateMUOrdersMain() {

		$( ".testDivblue" ).each( function() {

			if( $(this).children( "center" ).length == 2 ) {

				var savedBattle = GetValue( "MUSavedBattle" );
				var battle = $(this).find( "a[href^='battle.html?id=']" ).attr( "href" );
				if( !battle ) { return; }
				var side = $(this).children( "center" ).last().find( "img" ).attr( "src" );
				side = side.replace( "small", "medium" );

				if( savedBattle != battle ) {
					SetValue( "MUSavedBattle", battle );
					SetValue( "MUSide", side );

					// Open MU page to check quality and text orders
					$.ajax({
						url: getCurrentServer() + URLMU,
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
	}*/


	// Calculate bonus on battle
	function calculateBonus() {

		$( "#contentRow" ).find( ".biggerFont.blueBox" ).css({ "margin-right" : "26px" });
		$( "#contentRow" ).find( ".biggerFont.redBox" ).css({ "margin-left" : "25px" });

		var pos = $( ".testDivblue" ).eq(2);
		var plate = $( "#stats" ).parent();
		var currentLocation = plate.find( "a[href^='region']" ).attr( "href" ).split( "?id=" );
		if( currentLocation.length > 1 ) { currentLocation = currentLocation[1] }

		var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
		if( divBattleLocation.length == 1 ) {
			var battleLocation = divBattleLocation.attr( "href" ).split( "?id=" );
			if( battleLocation.length > 1 ) { battleLocation = battleLocation[1] }
		}

		var bonusMU = 0;
		/*var muSide = "";
		if( GetValue( "MUSavedBattle" ) ) {
			muSide = GetValue( "MUSavedBattle" ).split( "?id=" );
			if( muSide.length > 1 ) { muSide = muSide[1] }
		}

		var battleID = getUrlVars()[ "id" ];

		var products = $( ".productList" );*/
		var numberLocation = 0;
		var bonusSD = 0;
		// Get if SD is on battle
		/*if( products.length > 0 ) {
			products.find( "img" ).each( function() {
				if( $(this).attr( "src" ) == IMGDS ) {
					var str = $(this).next().attr( "src" );
					str = str.replace( IMGQUALITY, "" ).substring(0, 1);
					bonusSD = parseInt( str ) * 5;
				}
			});
		}

		//var travelRW = $( "<div class='testDivblue' style='padding:9px 2px; margin:0px 0px 15px 0px;'></div>" );
		//var link = $( "<a href='' id='travelLocation' style='cursor:pointer; font-size:13px;'></a>" );
		//link.append( "<span style='font-size:11px'>Move to RW location and get +20%</span>" );
		//travelRW.append( link );

		//var travelLeft = $( "<div class='testDivblue' style='padding:6px 2px; margin:0px 0px 15px -30px; width:135px;'></div>" );
		//travelLeft.css({ "display" : "inline-block" });
		//link = $( "<a href='' id='travelLocationLeft' style='cursor:pointer; font-size:11px;'></a>" );
		//link.append( "<span style='font-size:10px'>Move to defender region and get +20%</span>" );
		//travelLeft.append( link );

		//var travelRight = $( "<div class='testDivblue' style='padding:6px 2px; margin:0px -20px 15px 0px; width:135px;'></div>" );
		//travelRight.css({ "display" : "inline-block", "float" : "right" });
		//link = $( "<a href='' id='travelLocationRight' style='cursor:pointer; font-size:11px;'></a>" );
		//link.append( "<span style='font-size:10px'>Move to neighbour region and get +20%</span>" );
		//travelRight.append( link );*/

		var isRW = (divBattleLocation.parent().text().indexOf( "Resistance war", 0 ) > -1);
		if( isRW ) {
			//if( currentLocation == battleLocation ) { numberLocation = 20; }

			// If can't fight, location is not correct
			//if( $( "#weaponQuality" ).length == 0 ) {
			//	travelRW.insertBefore( pos );
			//	setTravelLocation( battleLocation, travelRW, travelLeft, travelRight );
			//}

			var leftMU = 0;
			var rightMU = 0;
			var sides = $( ".testDivwhite" ).find( ".bigFlag" );

			// MU Bonus
			/*if( battleID == muSide ) { // Correct battle
				if( sides.length == 2 ) {
					// Left defender
					if( sides.eq(0).attr( "src" ) == GetValue( "MUSide" ) ) {
						leftMU = GetValue( "MURank" );

					} else if( sides.eq(1).attr( "src" ) == GetValue( "MUSide" ) ) {
						rightMU = GetValue( "MURank" );
					}
				}
			}*/

			var leftBlock = createBlockBonus( numberLocation, leftMU, bonusSD );
			leftBlock.attr( "id", "leftBlockBonus" );
			leftBlock.css({ "margin-top" : "-10px", "margin-left" : "-23px" });
			leftBlock.insertBefore( pos );

			// Only defensive SD
			var rightBlock = createBlockBonus( numberLocation, rightMU, 0 );
			rightBlock.attr( "id", "rightBlockBonus" );
			rightBlock.css({ "margin-top" : "-10px", "margin-left" : (pos.width()+10)+"px" });
			rightBlock.insertBefore( pos );

		} else {

			var yourSide = pos.find( ".bigFlag" ).attr( "src" );
			var flags =  $( ".testDivwhite" ).find( ".bigFlag" );
			var defender = flags.eq(0).attr( "src" );
			var attacker = flags.eq(1).attr( "src" );

			// If can't fight, location is not correct
			//if( $( "#weaponQuality" ).length == 0 ) {
			//	travelLeft.insertBefore( pos );
			//	travelRight.insertBefore( pos );
			//	setTravelLocation( battleLocation, travelRW, travelLeft, travelRight );
			//}

			bonusMU = 0;
			if( yourSide == attacker ) {
				//if( (battleID == muSide) && (yourSide == GetValue( "MUSide" )) ) { bonusMU = GetValue( "MURank" ); }	

				//var neighbours = getRegionAPI( battleLocation, currentLocation );
				//numberLocation = (neighbours.indexOf( parseInt(currentLocation) ) != -1) ? 20 : 0;

				var rightBlock = createBlockBonus( numberLocation, bonusMU, 0 );
				rightBlock.attr( "id", "rightBlockBonus" );
				rightBlock.addClass( "rightBonusBlock" );
				rightBlock.css({ "margin-left" : (pos.width()+7)+"px" });
				rightBlock.insertBefore( pos );

			} else if( yourSide == defender ) {
				//if( (battleID == muSide) && (yourSide == GetValue( "MUSide" )) ) { bonusMU = GetValue( "MURank" ); }
				if( currentLocation == battleLocation ) { numberLocation = 20; }

				var leftBlock = createBlockBonus( numberLocation, bonusMU, bonusSD );
				leftBlock.attr( "id", "leftBlockBonus" );
				leftBlock.css({ "margin-top" : "-10px", "margin-left" : "-23px" });
				leftBlock.insertBefore( pos );
			}
		}
	}


	// Create bonus battle dov
	function createBlockBonus( location, MU, SD ) {

		var block = $( "<div class='bonusBattleBlock'></div>" );

		var bonusLocation = $( "<div class='locationBonus'>"+ location +"%</div>" );
		bonusLocation.attr( "title", "<b>Location bonus</b>" );
		bonusLocation.addClass( (location == 0) ? "redBackground" : "greenBackground" );
		/*bonusLocation.tooltip({
			tipClass:"smalltooltip", 
			position:"center right",
			onShow: function() {
				$( ".smalltooltip" ).css({ "text-align" : "center", "width" : "88px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 4px" });
			}
		});*/

		var bonusMU = $( "<div class='MUBonus'>"+ MU +"%</div>" );
		bonusMU.attr( "title", "<b>Military unit bonus</b>" );
		bonusMU.addClass( (MU == 0) ? "redBackground" : "greenBackground" );
		/*bonusMU.tooltip({
			tipClass:"smalltooltip", 
			position:"center right",
			onShow: function() {
				$( ".smalltooltip" ).css({ "text-align" : "center", "width" : "115px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 4px" });
			}
		});*/

		var bonusSD = $( "<div class='DSBonus' title='<b>Defensive system bonus</b>'>"+ SD +"%</div>" );
		bonusSD.attr( "title", "<b>Defensive system bonus</b>" );
		bonusSD.addClass( (SD == 0) ? "redBackground" : "greenBackground" );
		/*bonusSD.tooltip({
			tipClass:"smalltooltip", 
			position:"center right",
			onShow: function() {
				$( ".smalltooltip" ).css({ "text-align" : "center", "width" : "145px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 4px" });
			}
		});*/

		block.append( bonusLocation );
		block.append( bonusMU );
		block.append( bonusSD );
		return( block );
	}


	// Change battle design
	/*function changeBattleDesign() {

		var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
		var firstDiv = divBattleLocation.parent();
		var isRW = (firstDiv.text().indexOf( "Resistance war", 0 ) > -1);
		if( isRW ) {
			firstDiv.css({ "height" : "39px" });
			var RWspan = firstDiv.find( "span" ).first();
			RWspan.css({ "float" : "left", "margin-top" : "-3px" });
			RWspan.next().remove();
			RWspan.next().css({ "float" : "right", "margin-top" : "-3px" });
		}

		// Redes flags
		var flagLeft = firstDiv.parent().find( ".bigFlag" ).first();
		var flagRight = firstDiv.parent().find( ".bigFlag" ).last();
		flagLeft.css({ "border" : "none", "box-shadow" : "0px -1px 5px #4a4a4a", "margin-top" : "5px" });
		flagRight.css({ "border" : "none", "box-shadow" : "0px -1px 5px #4a4a4a", "margin-top" : "5px" });

		$( "#battleBar" ).css({ "box-shadow" : "0px 2px 3px #666",  "border-radius" : "9px" });

		// Redesign damage text
		$( "#defenderScore" ).parent().contents().first()[0].textContent = "Defenders' damage";
		$( "#defenderScore" ).parent().parent().css({ "margin-left" : "15px", "margin-top" : "2px" });
		$( "#defenderScore" ).css({ "margin-left" : "20px", "font-size" : "12px" });

		$( "#attackerScore" ).parent().contents().first()[0].textContent = "Attackers' damage";
		$( "#attackerScore" ).parent().parent().css({ "margin-right" : "15px", "text-align" : "right" });
		$( "#attackerScore" ).css({ "margin-right" : "20px", "font-size" : "12px" });
		$( "#attackerScore" ).insertBefore( $( "#attackerScore" ).parent().contents().first() );

		var leftRounds = $( "#attackerScore" ).parent().parent().next();
		leftRounds.css({ "width" : "auto", "margin-left" : "15px" });

		var rightRounds = leftRounds.next();
		rightRounds.css({ "width" : "auto", "margin-right" : "15px", "float" : "right" });
		
	}*/


	// Change weapon battle selector
	function changeWeaponBattle() {
	
		// First div with selected weapon
		var bigWeap = $( "<div id='bigWeaponBlock'></div>" );
		var imgWeap = $( "<img id='bigWeaponImg' />" );

		var weapInfo = $( "<div id='weaponsInfo'></div>" );
		weapInfo.append( "<span id='qualityWeaponInfo'></span>" );
		weapInfo.append( "<span id='availableWeaponInfo'></span>" );

		var dataInfo = $( "<div id='blockInfoDamage'></div>" );
		dataInfo.append( "<span id='minDamage'></span> / <span id='maxDamage'></span>" );
		dataInfo.append( "<br/><span id='bkMinDamage'></span> / <span id='bkMaxDamage'></span>" );

		var equipInfo = $( "<div id='blockEquipInfo'></div>" );
		var lineCritical = $( "<div></div>" );
		lineCritical.append( "<span class='percentBattleInfo'>"+ getValue( "playerCritical" ) +"%</span>" );
		lineCritical.append( "<img src='"+ IMGCRITICAL +"' />" );
		lineCritical.append( "<span id='criticalCounter'>0</span>" );
		equipInfo.append( lineCritical );

		var lineMiss = $( "<div></div>" );
		lineMiss.append( "<span class='percentBattleInfo'>"+ getValue( "playerMiss" ) +"%</span>" );
		lineMiss.append( "<img src='"+ IMGMISS +"' />" );
		lineMiss.append( "<span id='missCounter'>0</span>" );
		equipInfo.append( lineMiss );

		var lineAvoid = $( "<div></div>" );
		lineAvoid.append( "<span class='percentBattleInfo'>"+ getValue( "playerAvoid" ) +"%</span>" );
		lineAvoid.append( "<img src='"+ IMGAVOID +"' />" );
		lineAvoid.append( "<span id='avoidCounter'>0</span>" );
		equipInfo.append( lineAvoid );

		bigWeap.append( imgWeap );
		bigWeap.append( weapInfo );
		bigWeap.append( equipInfo );
		bigWeap.append( dataInfo );
		bigWeap.insertBefore( "#weaponQuality" );

		var selectedTheme = getValue( "configWeaponTheme" );
		var defaultWeapon = getValue( "configDefaultWeapon" );
		var index = 0;
		var content = $( "<div id='weaponSelector'></div>" );
		$( "#weaponQuality" ).find( "option" ).each( function() {

			var weapQ = $( "<div class='weaponQualityNewSelector'></div>" );
			if( index == 0 ) {
				if( selectedTheme == "default" ) {
					weapQ.append( "<img class='defaultWeaponQ0' src='"+ IMGWEAPON +"' />" );
				} else weapQ.append( "<img class='AoEWeaponQ0' src='"+ eval( selectedTheme+"weaponQ0" ) +"' />" );
				weapQ.addClass( "Q0weaponBox" );

			} else {
				if( selectedTheme == "default" ) {
					weapQ.append( "<img class='defaultWeaponQX' src='"+ IMGWEAPON +"' />" );
				} else weapQ.append( "<img class='AoEWeaponQX' src='"+ eval( selectedTheme+"weaponQ"+index ) +"' />" );
				weapQ.addClass( "QXweaponBox" );
			}

			var nWeap = "";
			var str = $(this).text();
			var pos = str.indexOf( ",", 0 );
			if( pos > -1 ) {
				nWeap = str.substr( pos + 2, str.indexOf( " ", pos + 2 ) - pos - 1 );
				weapQ.append( "<div class='QXweaponString'>"+ (index * 20) +"%</div>" );

			} else {
				weapQ.css({ "margin-top" : "9px" });
				weapQ.append( "<div class='Q0weaponString'> -50% </div>" );
			}

			weapQ.attr( "indexselect", index );
			weapQ.attr( "numWeapons", nWeap );
			weapQ.append( "<div class='selectorNumWeapons'>"+ nWeap + "</div>" );

			if( (nWeap == "") || (nWeap > 0) ) {

				/*weapQ.bind( "mouseover", function() {
					if( selectedWeapon.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 3px 2px #6baef8" });
					}
				});

				weapQ.bind( "mouseout", function() {
					if( selectedWeapon.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) {
						$(this).css({ "box-shadow" : "0px 1px 3px 1px #9bbef8" });
					}
				});*/

				weapQ.bind( "click", function() {

					var quality = parseInt( $(this).attr( "indexselect" ) );
					if( selectedWeapon ) { 
						selectedWeapon.removeClass( "selectedWeapon" );
						selectedWeapon.removeClass( "selectedUnarmedWeapon" );
					}

					if( quality == 0 ) {
						$( "#qualityWeaponInfo" ).text( "Unarmed" );
						$( "#availableWeaponInfo" ).text( "" );
						if( selectedTheme == "default" ) {
							$( "#bigWeaponImg" ).attr( "src", IMGWEAPON );
							$( "#bigWeaponImg" ).addClass( "bigWeaponDefault" );
						} else {
							$( "#bigWeaponImg" ).attr( "src", eval( selectedTheme + "weaponQ0Big" ) );
							$( "#bigWeaponImg" ).addClass( "bigWeapon" + selectedTheme );
						}

					} else {
						$( "#qualityWeaponInfo" ).text( "Q" + quality );
						$( "#availableWeaponInfo" ).text( $(this).attr( "numWeapons" ) + " weap" );
						if( selectedTheme == "default" ) {
							$( "#bigWeaponImg" ).attr( "src", IMGWEAPON );
							$( "#bigWeaponImg" ).addClass( "bigWeaponDefault" );
						} else {
							$( "#bigWeaponImg" ).attr( "src", eval( selectedTheme + "weaponQ" + quality + "Big" ) );
							$( "#bigWeaponImg" ).addClass( "bigWeapon" + selectedTheme );
						}
						
					} 

					selectedWeapon = $(this);
					selectedWeapon.addClass( (quality == 0) ? "selectedUnarmedWeapon" : "selectedWeapon" );

					$( "#weaponQuality option" ).removeAttr( "selected" );
					$( "#weaponQuality option" )[ quality ].selected = true;

					updateDamage();
				});

			} else weapQ.addClass( "disabledWeapon" );

			// default Q0
			if( (index == 0) || (index == defaultWeapon) ) { weapQ.click(); }
			index++;
			content.append( weapQ );
		});

		content.insertAfter( "#weaponQuality" );

		$( "#weaponQuality" ).parent().children( "b" ).first().remove();
		$( "#weaponQuality" ).parent().children( "br" ).first().remove();
		$( "#weaponQuality" ).parent().children( "br" ).first().remove();
		$( "#weaponQuality" ).css({ "display" : "none" });

		// Add update weapon method
		$.blockUI.defaults.onUnblock = function( elem, opts ) {
			updateWeaponsNumber();
			//updateHealthButtons();
		}
		updateWeaponsNumber();
	}


	// Update damage
	function updateDamage() {

		var minDamage = getValue( "playerMinDamage" );
		var maxDamage = getValue( "playerMaxDamage" );

		var weaponBonus = parseInt( $( "#weaponQuality" ).val() );
		weaponBonus = (weaponBonus == 0) ? 0.5 : (weaponBonus*20 + 100)/100;

		$( "#minDamage" ).text( pointNumber( parseInt(minDamage * weaponBonus) ) );
		$( "#maxDamage" ).text( pointNumber( parseInt(maxDamage * weaponBonus) ) );

		$( "#bkMinDamage" ).text( pointNumber( parseInt(5*minDamage * weaponBonus) ) );
		$( "#bkMaxDamage" ).text( pointNumber( parseInt(5*maxDamage * weaponBonus) ) );
		/*var damage = strength * rank * (quality*20 + 100)/100;
		if( quality == 0 ) { damage = strength * rank / 2; }

		var pos;
		var strDmg = "";
		var strBk = "";
		var strTotal = "";
		var mubonus = 0;
		var locbonus = 0;
		var sdbonus = 0;

		var foodLimit = parseInt( $( "#foodLimit" ).text() );
		var giftLimit = parseInt( $( "#giftLimit" ).text() );
		var health = parseInt( $( "#healthBar" ).text() );
		var nHits = health/10 + 5 * foodLimit + 5 * giftLimit;

		var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
		var isRW = (divBattleLocation.parent().text().indexOf( "Resistance war", 0 ) > -1);

		if( $( "#leftBlockBonus" ).length == 1 ) {
			pos = $( "#leftBlockBonus" ).children( "div" );
			mubonus = parseInt( pos.eq(0).text().replace( "%", "" ) );
			locbonus = parseInt( pos.eq(1).text().replace( "%", "" ) );
			sdbonus = parseInt( pos.eq(2).text().replace( "%", "" ) );

			// Order, MU - location - SD
			damage *= (mubonus+100)/100;
			damage *= (locbonus+100)/100;
			damage *= (sdbonus+100)/100;
			strDmg += pointNumber( parseInt( damage  ) );
			strBk += pointNumber( parseInt( damage * 5 ) );
			strTotal += pointNumber( parseInt( damage * nHits ) );
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
			strDmg = isRW ? strDmg + "&nbsp;&nbsp;|&nbsp;&nbsp;" : strDmg;
			strBk = isRW ? strBk + "&nbsp;&nbsp;|&nbsp;&nbsp;" : strBk;
			strTotal = isRW ? strTotal + "&nbsp;&nbsp;|&nbsp;&nbsp;" : strTotal;
			strDmg += pointNumber( parseInt( damage ) );
			strBk += pointNumber( parseInt( damage*5 ) );
			strTotal += pointNumber( parseInt( damage * nHits ) );
		}

		$( "#dmgCurrent" ).html( "Fight: <b style='font-family:Verdana; font-size:9px;'>"+ strDmg +"</b>" );
		$( "#berserkCurrent" ).html( "Berserk: <b style='font-family:Verdana; font-size:9px;'>"+ strBk +"</b>" );
		$( "#totalDamage" ).html( "Max: <b style='font-family:Verdana; font-size:9px;'>"+ strTotal +"</b>"  );*/
	}


	// To add . on numbers
	function pointNumber( n ){ 
		n = n + "";
		var i = n.length-3;
		while( i > 0 ){ n = n.substring( 0, i )+ "." + n.substring( i, n.length ); i=i-3; }
		return( n );
	}


	// Updater number weapons value
	function updateWeaponsNumber() {
		var index = 0;
		$( "#weaponQuality" ).find( "option" ).each( function() {

			var str = $(this).text();
			var pos = str.indexOf( ",", 0 );
			if( pos > -1 ) {
				nWeap = str.substr( pos + 2, str.indexOf( " ", pos + 2 ) - pos - 1 );
				$( "#weaponSelector" ).children( "div:eq("+ index +")" ).find( ".selectorNumWeapons" ).text( nWeap );
				$( "#availableWeaponsInfo" ).text( nWeap + " weap" );

				if( selectedWeapon.attr( "indexselect" ) == index ) {
					if( nWeap == 0 ) {
						selectedWeapon.unbind( "click" );
						selectedWeapon.unbind( "mouseover" );
						selectedWeapon.unbind( "mouseout" );
						selectedWeapon.addClass( "disabledWeapon" );
						$( "#weaponSelector" ).children( "div" ).eq( 0 ).click();
					}
				}
			}

			index++;
		});
	}


	// Change round selector
	function changeRoundSelector() {

		var block = $( "#command" ).parent();
		block.children().last().remove();
		block.children().last().remove();
		block.children( "br" ).last().remove();
		for( var i=0; i<block.contents().length; i++ ) {
			var item = block.contents().eq(i);
			if( item.text().indexOf( "Show round:" ) >= 0 ) { item.remove(); }
		}

		// Replace any link
		var currentRound = getUrlVars()[ "round" ];
		$( "#command" ).children( "select" ).find( "option" ).each( function() {
			var value = $(this).attr( "value" );
			var battleID = getUrlVars()[ "id" ];
			var url = getCurrentServer() + URLBattle + battleID + "&round=" + value;
			var roundLink = $( "<a class='roundSelector' href='"+ url +"' >"+ value + "</a>" );
			if( currentRound ) { 
				if( currentRound == value ) {
					roundLink.css({ "color" : "#d14d4d", "font-size" : "15px" });
				}
			}

			// Remove repeated
			block.children( "a" ).each( function() { if( $(this).text() == value ) { $(this).remove(); } });
			block.append( roundLink );
		});

		if( currentRound == undefined ) { block.children( "a" ).last().css({ "color" : "#d14d4d", "font-size" : "15px" }); }
		$( "#command" ).css({ "display" : "none" });
	}


	// Order MU members
	function orderMU( idForm, varCheck ) {

		var divPlayers = $( idForm ).children( "div" ).css({ "width" : "320px", "margin" : "0px" });
		$( idForm ).children( "br" ).last().remove();
		$( idForm ).parent().css({ "width" : "320px" });

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
					while( name.height() > parseInt( name.css( "line-height" ).replace( "px", "" ) ) ) {
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


	// Add donate me button
	function addDonateToMeButton( idForm ) {

		// Donate me button
		var pos = $( idForm ).children( "center" );
		var donateMe = $( "<input type='submit' id='donateMe' value='Donate me' />" );
		pos.append( donateMe );

		var id;
		var link = $( "#userName" ).attr( "href" ); 
		var split = link.split( "?id=" );
		if( split.length > 1 ) {
			id = split[1];
			donateMe.bind( "click", function() {
				$( ".receipments" ).removeAttr( "checked" );
				$( ".receipments[value='"+ id +"']" ).attr( "checked", "checked" );
			});
		}
	}


	// Update MU storage donation
	function changeSelectMUStorage( idForm ) {

		var select = $( "#product" );
		var pos = $( ".testDivwhite" );
		var dest = $( "#quantity" );
	
		// Remove all childrens and add help text
		pos.children().remove();
		pos.addClass( "storageSelectMU" );
		pos.append( "One click to select <b>ONE item</b>.<br/>Double click to select <b>ALL items</b>.<br/>" );

		// Remove first block
		$( ".testDivblue" ).eq( 3 ).remove();

		select.prev().remove();
		//select.css({ "display" : "none" });

		orderSelect( select );
		changeSelect( select, pos, dest, "#aaaaaa" );
	}

 
	// Change select from params
	function changeSelect( select, placeToAdd, dest, color ) {

		// Add my items
		var selectDonate;
		var index = 1;
		select.find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "" ) { return; }
			
			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) { str = str.substr( number + 1, str.indexOf( " ", number ) - number ); }		

			var product = $( "<div class='storage productMU'>" );
			product.append( "<div>"+ str +"</div>" );
			var image = $( "<div></div>" )
			product.append( image );

			var storageMU = $( "<div class='storageButton' selectIndex='"+ index +"'></div>" );
			storageMU.css({ "box-shadow" : "0px 1px 5px 1px " + color });
			storageMU.append( product );

			// Raw resource
			var split = $(this).attr( "value" ).split( "-" );
			if( split.length == 1 ) {

				if( split[0] == "IRON" ) {
					image.append( "<img src='"+ IMGIRON +"' />" );

				} else if( split[0] == "OIL" ) {
					image.append( "<img src='"+ IMGOIL +"' />" );

				} else if( split[0] == "GRAIN" ) {
					image.append( "<img src='"+ IMGGRAIN +"' />" );

				} else if( split[0] == "DIAMONDS" ) {
					image.append( "<img src='"+ IMGDIAMONDS +"' />" );

				} else if( split[0] == "WOOD" ) {
					image.append( "<img src='"+ IMGWOOD +"' />" );

				} else if( split[0] == "STONE" ) {
					image.append( "<img src='"+ IMGSTONE +"' />" );
				}

				product.css({ "height" : "67px" });
				storageMU.css({ "margin" : "10px 4px 8px 10px" });

			} else if( split.length = 2 ) {

				if( split[1] == "WEAPON" ) {
					image.append( "<img src='"+ IMGWEAPON +"' />" );
					
				} else if( split[1] == "FOOD" ) {
					image.append( "<img src='"+ IMGFOOD +"' />" );
	 
				} else if( split[1] == "TICKET" ) {
					image.append( "<img src='"+ IMGTICKET +"' />" );

				} else if( split[1] == "GIFT" ) {
					image.append( "<img src='"+ IMGGIFT +"' />" );
					
				} else if( split[1] == "HOUSE" ) {
					image.append( "<img src='"+ IMGHOUSE +"' />" );

				} else if( split[1] == "DS" ) {
					image.append( "<img src='"+ IMGDS +"' />" );

				} else if( split[1] == "HOSPITAL" ) {
					image.append( "<img src='"+ IMGHOSPITAL +"' />" );

				} else if( split[1] == "ESTATE" ) {
					image.append( "<img src='"+ IMGESTATE +"' />" );
				}

				image.append( "<img class='qualityMU' src='"+ IMGQUALITY + split[0] + IMGEXTENSION +"' />" );
				product.css({ "height" : "77px" });
				storageMU.css({ "margin" : "6px 4px 2px 10px" });
			}

			// Events
			storageMU.bind( "mouseover", function() {
				if( selectDonate != $(this).attr( "selectIndex" ) ) { $(this).addClass( "storageButtonHover" ); }
			});
			storageMU.bind( "mouseout", function() {
				if( selectDonate != $(this).attr( "selectIndex" ) ) { $(this).removeClass( "storageButtonHover" ); }
			});

			// Click
			storageMU.bind( "click", function() {

				// Deselect current selection
				if( selectDonate == $(this).attr( "selectIndex" ) ) {

					$(this).removeClass( "storageButtonClick" );
					$(this).removeClass( "storageButtonDblClick" );
					select.find( "option" ).removeAttr( "selected" );
					selectDonate = null;
					dest.val( "1" );

				} else {

					// Deselect last item
					if( selectDonate ) {
						var selectedItem = placeToAdd.find( ".storageButton[selectIndex='" + selectDonate + "']" );
						selectedItem.removeClass( "storageButtonClick" );
						selectedItem.removeClass( "storageButtonDblClick" );
						dest.val( "1" );
					}

					$(this).removeClass( "storageButtonHover" );
					$(this).removeClass( "storageButtonDblClick" );
					$(this).addClass( "storageButtonClick" );
					selectDonate = $(this).attr( "selectIndex" );

					select.find( "option" ).removeAttr( "selected" );
					select.find( "option" )[ selectDonate ].selected = true;
				}
			});

			// Doubleclick
			storageMU.bind( "dblclick", function() {

				$(this).removeClass( "storageButtonHover" );
				$(this).removeClass( "storageButtonClick" );
				$(this).addClass( "storageButtonDblClick" );
				selectDonate = $(this).attr( "selectIndex" );

				select.find( "option" ).removeAttr( "selected" );
				select.find( "option" )[ selectDonate ].selected = true;

				dest.val( $(this).text().trim() );
				return( false );
			});

			placeToAdd.append( storageMU );
			index++;
		});
	}


	// Reorder select items
	function orderSelect( select ) {

		var listOptions = [];
		select.find( "option" ).each( function() {
			listOptions.push( $(this) );
			$(this).remove();
		});

		// Order is... Weapons, Food, Gifts, Tickets, Raw and rest
		var newOptionList = new Array(46);
		newOptionList[0] = listOptions[0];
		var rawIndex = 0;
		var otherIndex = 0;
		for( var i=1; i<listOptions.length; i++ ) {
			var item = listOptions[i].attr( "value" ).split( "-" );
			if( item.length == 2 ) {
				var q = parseInt( item[0] ) - 1;
				if( item[1] == "WEAPON" ) { // Index 0 + quality
					newOptionList[ 1 + q ] = listOptions[i];

				} else if( item[1] == "FOOD" ) { // Index 5 + quality
					newOptionList[ 6 + q ] = listOptions[i];

				} else if( item[1] == "GIFT" ) { // Index 10 + quality
					newOptionList[ 11 + q ] = listOptions[i];

				} else if( item[1] == "TICKET" ) { // Index 15 + quality
					newOptionList[ 16 + q ] = listOptions[i];

				} else {
					newOptionList[ 27 + otherIndex ] = listOptions[i];
					otherIndex++;
				}
			} else {
				newOptionList[ 21 + rawIndex ] = listOptions[i];
				rawIndex++;
			}
		}

		// Add ordered items
		for( var i=0; i<newOptionList.length; i++ ) {
			if( newOptionList[i] ) { select.append( newOptionList[i] ); }
		}

		select.find( "option" )[ 0 ].selected = true;
	}


	// Add fast buttons
	function addMUFastButtons( idDest ) {

		var firstFastButton = true;
		$( idDest ).css({ "text-align" : "center" });

		var btn1 = $( "<input class='fastBtn MUfastButtonLeft' type='button' value='1' />" );
		btn1.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "1" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 1 ); 
			firstFastButton = false;
		});

		var btn5 = $( "<input class='fastBtn MUfastButtonLeft' type='button' value='5' />" );
		btn5.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "5" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 5 ); 
			firstFastButton = false;
		});

		var btn10 = $( "<input class='fastBtn MUfastButtonLeft' type='button' value='10' />" );
		btn10.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "10" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 10 ); 
			firstFastButton = false;
		});

		var btn15 = $( "<input class='fastBtn MUfastButtonRight' type='button' value='15' />" );
		btn15.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "15" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 15 ); 
			firstFastButton = false;
		});

		var btn25 = $( "<input class='fastBtn MUfastButtonRight' type='button' value='25' />" );
		btn25.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "25" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 25 ); 
			firstFastButton = false;
		});

		var btn50 = $( "<input class='fastBtn MUfastButtonRight' type='button' value='50' />" );
		btn50.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "50" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 50 ); 
			firstFastButton = false;
		});

		var btn75 = $( "<input class='fastBtn MUfastButton2' type='button' value='75' />" );
		btn75.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "75" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 75 ); 
			firstFastButton = false;
		});

		var btn100 = $( "<input class='fastBtn MUfastButton2' type='button' value='100' />" );
		btn100.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "100" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 100 ); 
			firstFastButton = false;
		});

		var btn125 = $( "<input class='fastBtn MUfastButton2' type='button' value='125' />" );
		btn125.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "125" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 125 ); 
			firstFastButton = false;
		});

		var btn150 = $( "<input class='fastBtn MUfastButton2' type='button' value='150' />" );
		btn150.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "150" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 150 ); 
			firstFastButton = false;
		});

		btn1.insertBefore( idDest );
		btn5.insertBefore( idDest );
		btn10.insertBefore( idDest );

		btn150.insertAfter( idDest );
		btn125.insertAfter( idDest );
		btn100.insertAfter( idDest );
		btn75.insertAfter( idDest );
		$( "<br/>" ).insertAfter( idDest );
		btn50.insertAfter( idDest );
		btn25.insertAfter( idDest );
		btn15.insertAfter( idDest );
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
	
		// Add update button
		var update = $( "<input type='button' id='updateWork' value='Update jobs'/>" );
		update.insertAfter( ".testDivwhite" );
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
			//var split = idMU.split( "?id=" );
			//if( split.length > 1 ) {
				idMU = 1743;

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
			//}

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
		var company = $( data ).find( "#contentRow h1" ).text().replace( "Company", "" );
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


	// Add update connection button
	function addUpdateConnectionButton( idForm ) {

		var $online = $( "<input type='submit' id='onlinePlayer' value='Online players' />" );
		$online.insertAfter( ".testDivwhite" );
		$online.bind( "click", function() {

			$.ajax({
				url: getCurrentServer() + URLMU,
				success: function( data ) {

					// First clean
					$( idForm ).find( "img[src='"+ IMGOFFLINE +"']" ).remove();
					$( idForm ).find( "img[src='"+ IMGONLINE +"']" ).remove();

					// Add All offline
					$( idForm ).find( "a[href^='profile.html']" ).each( function() {
						var flag = $(this).parent().parent().find( ".currencyFlag" );
						flag.attr( "src", IMGOFFLINE );
						flag.addClass( "imgPlayerOnline" );
					});

					// Replace online players
					$( data ).find( ".tip[src='"+ IMGONLINE +"']" ).each( function() {
						var player = $( idForm ).find( "a[href='"+ $(this).prev().attr( "href" ) + "']" );
						player.parent().parent().find( ".currencyFlag" ).attr( "src", IMGONLINE );
					});

					// Add events
					$( idForm ).find( ".currencyFlag" ).bind( "click", function() {
						$( idForm ).find( ".receipments" ).removeAttr( "checked" );
						$( idForm ).find( "img[src='"+ $(this).attr( "src" ) +"']" ).each( function() {
							$(this).parent().parent().find( "input" ).attr( "checked", "checked" );
						});
						saveCheckedPlayers();
					});
				}
			});

			return( false );
		});
	}


	// Count selected members on MU list
	function addCounterMembersMU() {

		var counterDiv = $( "<div id='counterCheck'>No members selected.</div>" )
		counterDiv.insertAfter( ".testDivwhite" );

		var totalDiv = $( "<div id='totalDonate'></div>" );
		totalDiv.insertAfter( "#counterCheck" );

		// Add events
		$( ".receipments" ).bind( "change", setCounterText );

		$( "#tickAll" ).bind( "click", setCounterText );
		$( "#untickAll" ).bind( "click", setCounterText );

		$( "#quantity" ).bind( "change", setCounterText );
		$( ".fastBtn" ).bind( "click", setCounterText );

		setCounterText();
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


	// Update player to player donation
	function changeSelectPlayerToPlayer( idForm ) {

		var select = $( "#product" );
		var dest = $( "#quantity" );
		var pos = $( ".testDivblue" ).eq(3);
		var posSelect = $( ".testDivblue" ).eq(4);

		pos.children().remove();
		pos.append( "One click to select <b>ONE item</b>. Double click to select <b>ALL items</b>.<br/><br/>" );
		pos.addClass( "playerToPlayerItem" );

		posSelect.children().first().remove();
		posSelect.children().first().remove();
		posSelect.children().last().remove();

		orderSelect( select );
		changeSelect( select, pos, dest, "#8baed8" );
	}


	// Add fast buttons
	function addFastButtons( idDest ) {

		var firstFastButton = true;
		$( idDest ).css({ "text-align" : "center" });

		var btn1 = $( "<input class='fastBtn FastButtonLeft' type='button' value='1' />" );
		btn1.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "1" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 1 ); 
			firstFastButton = false;
		});

		var btn5 = $( "<input class='fastBtn FastButtonLeft' type='button' value='5' />" );
		btn5.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "5" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 5 ); 
			firstFastButton = false;
		});

		var btn10 = $( "<input class='fastBtn FastButtonLeft' type='button' value='10' />" );
		btn10.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "10" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 10 ); 
			firstFastButton = false;
		});

		var btn15 = $( "<input class='fastBtn FastButtonLeft' type='button' value='15' />" );
		btn15.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "15" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 15 ); 
			firstFastButton = false;
		});

		var btn25 = $( "<input class='fastBtn FastButtonLeft' type='button' value='25' />" );
		btn25.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "25" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 25 ); 
			firstFastButton = false;
		});

		var btn50 = $( "<input class='fastBtn FastButtonLeft' type='button' value='50' />" );
		btn50.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "50" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 50 ); 
			firstFastButton = false;
		});

		var btn75 = $( "<input class='fastBtn FastButtonRight' type='button' value='75' />" );
		btn75.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "75" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 75 ); 
			firstFastButton = false;
		});

		var btn100 = $( "<input class='fastBtn FastButtonRight' type='button' value='100' />" );
		btn100.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "100" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 100 ); 
			firstFastButton = false;
		});

		var btn125 = $( "<input class='fastBtn FastButtonRight' type='button' value='125' />" );
		btn125.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "125" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 125 ); 
			firstFastButton = false;
		});

		var btn150 = $( "<input class='fastBtn FastButtonRight' type='button' value='150' />" );
		btn150.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "150" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 150 ); 
			firstFastButton = false;
		});

		var btn500 = $( "<input class='fastBtn FastButtonRight' type='button' value='500' />" );
		btn500.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "500" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 500 ); 
			firstFastButton = false;
		});

		var btn1k = $( "<input class='fastBtn FastButtonRight' type='button' value='1K' />" );
		btn1k.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "1000" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 1000 ); 
			firstFastButton = false;
		});

		btn1.insertBefore( idDest );
		btn5.insertBefore( idDest );
		btn10.insertBefore( idDest );
		btn15.insertBefore( idDest );
		btn25.insertBefore( idDest );
		btn50.insertBefore( idDest );

		btn1k.insertAfter( idDest );
		btn500.insertAfter( idDest );
		btn150.insertAfter( idDest );
		btn125.insertAfter( idDest );
		btn100.insertAfter( idDest );
		btn75.insertAfter( idDest );
	}


	// Change create contract page
	/*function changeCreateContract() {

		// Redesign 
		$( "#contractsForm" ).parent().css({ "width" : "550px" });
		$( "#contractsForm" ).next().remove();
		//$( "#contractsForm" ).children( "div" ).css({ "display" : "none" });
		//$( "#offererSide" ).css({ "display" : "none" });
		//$( "#itemTypeList" ).css({ "display" : "none" });
		//$( "#contractsForm" ).children( "br" ).remove();
		//$( "#contractsForm" ).children( "b" ).remove();

		// Clean some elements from Form
		var input = $( "#contractsForm" ).children( "input" ).eq(2);

		//var player = $( "<div style='float:left; width:49%; height:30px'></div>" );
		//player.css({ "background-color" : "#fff", "border-radius" : "4px", "cursor" : "pointer" });
		//player.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });
		//var imgPlayerSrc = $( ".testDivwhite" ).eq(0).find( "img" ).eq(1).attr( "src" );
		//player.append( "<img src='"+ imgPlayerSrc +"' style='width:30px;' />" );
		//var name = $( ".testDivwhite" ).eq(0).find( "a[href^='profile.html']" ).text();
		//player.append( "<span style='font-weight:bold; font-size:14px; margin-left:5px; position:relative; top:-10px'>"+ name +"</span>" );

		//var dummy = $( "<div style='float:left; width:49%; height:30px'></div>" );
		//dummy.css({ "margin" : "0px 0px 0px 1%" });
		//var imgDummySrc = $( ".testDivwhite" ).eq(1).find( "img" ).eq(1).attr( "src" );
		//dummy.append( "<img src='"+ imgDummySrc +"' style='float:right; width:30px;' />" );
		//dummy.append( "<div style='float:right; font-weight:bold; font-size:14px; margin:6px 5px 0px 0px;'>Dummy</div>" );

		//var playerBlock = createContractBlock();
		//var dummyBlock = createContractBlock();

		player.insertBefore( input );
		dummy.insertBefore( input );
		//playerBlock.insertBefore( input );
		//dummyBlock.insertBefore( input );
	}*/


	// Create contract block
	/*function createContractBlock() {

		var block = $( "<div style='float:left; width:100%; height:200px;'></div>" );
		block.css({ "background-color" : "#fff", "margin" : "9px 0px 10px 0px", "border-radius" : "4px" });
		block.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });

		var options = $( "<div style='font-size:12px; font-weight:bold; cursor:pointer; width:100%; height: 23px;'></div>" );
		var moneyTab = $( "<div style='float:left; width:133px; padding:5px 0px; '>MONEY</div>" );
		var productTab = $( "<div style='float:left; width:134px; padding:5px 0px;'>PRODUCT</div>" );
		var debtTab = $( "<div style='float:left; width:133px; padding:5px 0px;'>DEBT</div>" );

		moneyTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		moneyTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});

		productTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		productTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});

		debtTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		debtTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});

		var money = $( "#MONEYParameters" );
		money.css({ "margin" : "8px 10px 8px 10px", "border" : "1px solid #ccc", "border-radius" : "4px" });
		money.css({ "background-color" : "#eee", "width" : "250px", "height" : "97px", "padding" : "60px 0px 0px 0px" });

		//var product = $( "<div></div>" );
		//$( "#PRODUCTParameters" ).css({ "display" : "block" })
		//product.append( $( "#PRODUCTParameters" ) );

		//var debt = $( "<div></div>" );
		//$( "#DEBTParameters" ).css({ "display" : "block" });
		//debt.append( $( "#DEBTParameters" ) );

		options.append( moneyTab );
		options.append( productTab );
		options.append( debtTab );
		block.append( options );
		block.append( money );
		return( block );
	}*/


	// Change market selectors
	function changeProductSelection() {

		// Redesign product selection in one row
		var divBlock = $( "#productMarketViewForm" ).parent();
		divBlock.addClass( "productMarketViewFormMod" );
		divBlock.children( ":lt(2)" ).remove();

		// Remove useless tags
		$( "#marketProducts" ).children( "p" ).remove();
		$( "#marketProducts" ).addClass( "marketProductsMod" );

		$( "#productMarketViewForm > .productList" ).hide();
		var selectProductMarketItem = null;
		$( "#marketProducts .productList" ).each( function() {

			var related = $(this);
			var product = $( "<div class='productMarketItem'></div>" );
			product.append( "<img src='"+ $(this).find( "img" ).attr( "src" ) +"' />" );
			product.append( "<div class='productLabel'>"+ $(this).find( "label" ).text() +"</div>" );
			$(this).parent().append( product );

			product.bind( "mouseover", function() {
				if( selectProductMarketItem ) {
					if( $(this).text() != selectProductMarketItem.text() ) { $(this).addClass( "productMarketItemHover" ); }
				} else $(this).addClass( "productMarketItemHover" );
			});

			product.bind( "mouseout", function() {
				if( selectProductMarketItem ) {
					if( $(this).text() != selectProductMarketItem.text() ) { $(this).removeClass( "productMarketItemHover" ); }
				} else $(this).removeClass( "productMarketItemHover" );
			});

			product.bind( "click", function() {
				if( selectProductMarketItem && ($(this).text() == selectProductMarketItem.text()) ) {
					$(this).removeClass( "productMarketItemSelected" );
					$( "#resource1" ).attr( "checked", "checked" );
					selectProductMarketItem = null;

				} else {
					if( selectProductMarketItem ) { 
						selectProductMarketItem.removeClass( "productMarketItemHover" );
						selectProductMarketItem.removeClass( "productMarketItemSelected" );
					}
					$(this).addClass( "productMarketItemSelected" );
					selectProductMarketItem = $(this);
					related.find( "input" ).attr( "checked", "checked" );
				}
			});

			$(this).hide();
			if( $(this).find( "input" ).attr( "checked" ) ) { product.click(); }
		});

		$( "#countryId" ).addClass( "countryIdSelect" );
		$( "#countryId" ).addClass( "customSelectList" );

		// Change quality selection
		var selectedQuality = parseInt( $( "#quality :selected" ).val() );
		var newQuality = $( "<div class='qualityProduct'></div>" );
		$( "#quality option" ).each( function() {

			var v = parseInt( $(this).val() );
			if( v != 0 ) {
				var star = $( "<div class='qualityStar' quality='"+ v +"' style='background:url("+ QUALITYSTAR +")'></div>" );
				if( v > selectedQuality ) {
					star.addClass( "qualityStarHover" );
				}
				newQuality.append( star );

				star.bind( "click", function() {
					var q = parseInt( $(this).attr( "quality" ) );
					$(this).parent().children().addClass( "qualityStarHover" );
					if( selectedQuality == q ) {
						selectedQuality = 0;

					} else {
						var current = $(this);
						for( var i=0; i<=q; i++ ) {
							current.removeClass( "qualityStarHover" );
							current = current.prev();
						}
						selectedQuality = q;
					}

					$( "#quality" ).val( selectedQuality );
				});
			}
		});

		newQuality.insertBefore( "#quality" );
		$( "#quality" ).hide();

		// Rellocate help wiki and my offers link
		$( "#productMarketViewForm .biggerFont a" ).addClass( "linkMyOffersProductMarket" );
		var imgWiki = $( "#quality" ).next().next();
		imgWiki.addClass( "imgWikiProductMarket" );
		var linkWiki = imgWiki.next();
		linkWiki.addClass( "linkWikiProductMarket" );
		imgWiki.insertAfter( $( "#productMarketViewForm" ) );
		linkWiki.insertAfter( $( "#productMarketViewForm" ) );

		// Add buy As button on top
		var buyAs = $( "<div class='buyAsSelect'></div>" );
		var select = $( "<select class='customSelectList' ></select>" );
		if( $( "#command" ).first().children( "select" ).length > 0 ) {
			buyAs.append( $( "#command" ).first().contents().eq(0).text() );
			$( "#command" ).first().children( "select" ).children().each( function() {
				select.append( "<option value='"+ $(this).attr( "value" ) +"'>"+ $(this).text() +"</option>" );
			});

		} else {
			buyAs.append( "Buy as:" );
			select.append( "<option value=''> Citizen </option>" );
			select.attr( "disabled", "disabled" );
		}
		buyAs.append( select );
		buyAs.insertAfter( $( "#productMarketViewForm" ).children( "p" ) );
		select.bind( "change", function() {
			$( ".dataTable" ).find( "select" ).val( $(this).val() );

			if( getValue( "configProductMarketTable" ) == "true" ) {
				var color = ($(this).val() != "" ) ? "#fcecec" : "#ecffec";
				var t = $(this).find( ":selected" ).text();
				$( ".dataTable" ).find( "select" ).each( function() { 
					$( ".toRemove" ).parent().parent().css({ "background-color" : color });
					$( ".toRemove" ).text( "Buy as "+ t );
				});
			}
		});
		select.first().selected();
	}


	// Change product market table
	function changeProductMarketTable() {

		$( ".dataTable" ).find( "input[type='text']" ).addClass( "inputTextTable" );
		var submit = $( ".dataTable" ).find( "input[type='submit']" ).addClass( "inputSubmitTable" );

		// Add buy all button
		var buyAll = $( "<input class='buyAllSubmit' type='submit' value='All' />" );
		buyAll.bind( "click", function() {
			var v = $(this).parent().parent().prev().prev().text();
			$(this).parent().children( "input[type='text']" ).val( v );
			return( false );
		});
		buyAll.insertBefore( submit );

		// Hide buyAs select
		$( ".dataTable" ).find( "select" ).each( function() {
			var cell = $(this).parent();
			var buyAs = $( "<div class='toRemove buyAsTable'>Buy as Citizen</div>" );

			if( getValue( "configProductMarketSelection" ) == "true" ) {
				buyAs.insertBefore( cell.children().first() );
				cell.parent().css({ "background-color" : "#ecffec" });
				cell.contents().eq(0).remove();
				cell.children( "br" ).remove();
				$(this).hide();

			} else $(this).addClass( "customSelectList" );
		});

		// Add help message
		var divT = $( "<div class='helpFlagMessage'>Click on country flag to open the monetary market (only price column)</div>" );
		divT.insertBefore( ".dataTable" );

		// Resize table
		$( ".dataTable" ).addClass( "dataTableMod" );

		// Redesign table
		// Headers
		$( ".dataTable > tbody > tr:first-child > td" ).addClass( "dataTableHeaders" );
		var trHead = $( ".dataTable" ).find( "tr" ).eq(0).children();
		trHead.eq(0).css({ "width" : "70px" });
		trHead.eq(1).css({ "width" : "180px" });
		trHead.eq(2).css({ "width" : "50px" });
		trHead.eq(3).css({ "width" : "85px" });

		// Product list
		$( ".dataTable" ).find( ".product" ).each( function() {
			var cell = $(this).parent();
			var img = cell.find( "img" );
			cell.children().remove()

			cell.append( "<img class='blockProduct 'src='"+ IMGPRODBG +"' />" );
			cell.append( img.eq(0).addClass( "productImage" ) );
			if( img.length > 1 ) { cell.append( img.eq(1).addClass( "productQuality" ) ); }
		});

		// Name list and total price
		$( ".dataTable" ).find( "a" ).each( function() {

			// Name redesign
			var cell = $(this).parent();
			cell.children( ".currencyFlag" ).next().remove(); // Remove BR
			cell.children( ".currencyFlag" ).addClass( "dataTableNameFlag" );

			var div = $( "<div class='blockSeller'></div>" );
			var imgSeller = cell.children( "img" ).eq(1);
			imgSeller.addClass( "dataTableSeller" );
			div.append( imgSeller );

			var playerName = $( "<div class='playerName'></div>" ).append(  cell.children( ":lt(2)" ) );
			div.append( playerName );
			if( cell.children().length > 0 ) {
				playerName.css({ "margin-top" :"3px" });

				cell.children().eq(0).remove();
				var stockName = $( "<div class='stockName'></div>" ).append( cell.children().eq(0) );
				div.append( stockName );
			}
			cell.append( div );

			var nextCell = cell.next().next();
			var flag = nextCell.children( "img" );
			flag.addClass( "monetaryMarketFlag" );

			// Add link to monetary market
			var url = getCurrentServer() + URLMonetaryMarket + "?buyerCurrencyId="+ IDByImageCountry( flag.attr( "src" ) ) +"&sellerCurrencyId=0";
			var link = $( "<a class='linkMonetaryMarket' href='"+ url +"' target='_blank'></a>" );
			link.insertBefore( flag );
			link.append( flag );

			// Total price
			var priceItem = parseFloat( nextCell.children( "b" ).text() );
			var n = ( parseInt( parseInt( cell.next().text() ) * priceItem * 100 ) )/100;
			var money = nextCell.contents().last().text();
			nextCell.append( "<div class='totalPriceProductMarket'>"+ n +" "+ money +"</div>" );
		});
	}


	// Relationship between country images and IDs
	/*function ImagesCountryByID( id ) {

		switch( id ) {
			case 1: return( POLAND );
			case 2: return( RUSSIA );
			case 3: return( GERMANY );
			case 4: return( FRANCE );
			case 5: return( SPAIN );
			case 6: return( UK );
			case 7: return( ITALY );
			case 8: return( HUNGARY );
			case 9: return( ROMANIA );
			case 10: return( BULGARIA );
			case 11: return( SERBIA );
			case 12: return( CROATIA );
			case 13: return( BOSNIA );
			case 14: return( GREECE );
			case 15: return( FYROM );
			case 16: return( UKRAINE );
			case 17: return( SWEDEN );
			case 18: return( PORTUGAL );
			case 19: return( LITHUANIA );
			case 20: return( LATVIA );
			case 21: return( SLOVENIA );
			case 22: return( TURKEY );
			case 23: return( BRAZIL );
			case 24: return( ARGENTINA );
			case 25: return( MEXICO );
			case 26: return( USA );
			case 27: return( CANADA );
			case 28: return( CHINA );
			case 29: return( INDONESIA );
			case 30: return( IRAN );
			case 31: return( SOUTHKOREA );
			case 32: return( TAIWAN );
			case 33: return( ISRAEL );
			case 34: return( INDIA );
			case 35: return( AUSTRALIA );
			case 36: return( NETHERLANDS );
			case 37: return( FINLAND );
			case 38: return( IRELAND );
			case 39: return( SWITZERLAND );
			case 40: return( BELGIUM );
			case 41: return( PAKISTAN );
			case 42: return( MALAYSIA );
			case 43: return( NORWAY );
			case 44: return( PERU );
			case 45: return( CHILE );
			case 46: return( COLOMBIA );
			case 51: return( CZECH );
			case 52: return( BELARUS );
			case 53: return( ESTONIA );
			case 54: return( PHILIPPINES );
		}
	}*/


	function IDByImageCountry( img ) {

		switch( img ) {
			case POLAND: return( 1 );
			case RUSSIA: return( 2 );
			case GERMANY: return( 3 );
			case FRANCE: return( 4 );
			case SPAIN: return( 5 );
			case UK: return( 6 );
			case ITALY: return( 7 );
			case HUNGARY: return( 8 );
			case ROMANIA: return( 9 );
			case BULGARIA: return( 10 );
			case SERBIA: return( 11 );
			case CROATIA: return( 12 );
			case BOSNIA: return( 13 );
			case GREECE: return( 14 );
			case FYROM: return( 15 );
			case UKRAINE: return( 16 );
			case SWEDEN: return( 17 );
			case PORTUGAL: return( 18 );
			case LITHUANIA: return( 19 );
			case LATVIA: return( 20 );
			case SLOVENIA: return( 21 );
			case TURKEY: return( 22 );
			case BRAZIL: return( 23 );
			case ARGENTINA: return( 24 );
			case MEXICO: return( 25 );
			case USA: return( 26 );
			case CANADA: return( 27 );
			case CHINA: return( 28 );
			case INDONESIA: return( 29 );
			case IRAN: return( 30 );
			case SOUTHKOREA: return( 31 );
			case TAIWAN: return( 32 );
			case ISRAEL: return( 33 );
			case INDIA: return( 34 );
			case AUSTRALIA: return( 35 );
			case NETHERLANDS: return( 36 );
			case FINLAND: return( 37 );
			case IRELAND: return( 38 );
			case SWITZERLAND: return( 39 );
			case BELGIUM: return( 40 );
			case PAKISTAN: return( 41 );
			case MALAYSIA: return( 42 );
			case NORWAY: return( 43 );
			case PERU: return( 44 );
			case CHILE: return( 45 );
			case COLOMBIA: return( 46 );
			case CZECH: return( 51 );
			case BELARUS: return( 52 );
			case ESTONIA: return( 53 );
			case PHILIPPINES: return( 54 );
		}
	}


	// Change market oferrs
	function changeMarketOffers() {

		var select = $( "#resourceInput" );
		var pos = $( ".storage" ).parent();
		var dest = $( "#quantity" );

		var leftDiv = $( "#productMarketOfferForm" ).parent();
		leftDiv.children().first().remove();
		leftDiv.children().first().remove();
		leftDiv.addClass( "leftDivMyOffers" );

		// Remove all childrens and add help text
		pos.children().remove();
		pos.addClass( "myOffersProduct" );
		pos.append( "One click to select <b>ONE item</b>.<br/>Double click to select <b>ALL items</b>.<br/>" );

		firstFastButton = true;
		dest.addClass( "quantityMyOffers" );
		$( "#priceInput" ).addClass( "priceInputMyOffers" );

		var btn10 = $( "<input class='fastBtn FastButtonLeft' type='button' value='10' />" );
		btn10.bind( "click", function() { 
			if( firstFastButton ) {
				dest.attr( "value", "10" ); 
			} else dest.attr( "value", parseInt( dest.attr( "value" ) ) + 10 ); 
			firstFastButton = false;
		});

		var btn50 = $( "<input class='fastBtn FastButtonLeft' type='button' value='50' />" );
		btn50.bind( "click", function() { 
			if( firstFastButton ) {
				dest.attr( "value", "50" ); 
			} else dest.attr( "value", parseInt( dest.attr( "value" ) ) + 50 ); 
			firstFastButton = false;
		});

		var btn100 = $( "<input class='fastBtn FastButtonRight' type='button' value='100' />" );
		btn100.bind( "click", function() { 
			if( firstFastButton ) {
				dest.attr( "value", "100" ); 
			} else dest.attr( "value", parseInt( dest.attr( "value" ) ) + 100 ); 
			firstFastButton = false;
		});

		var btn1000 = $( "<input class='fastBtn FastButtonRight' type='button' value='1K' />" );
		btn1000.bind( "click", function() { 
			if( firstFastButton ) {
				dest.attr( "value", "1000" ); 
			} else dest.attr( "value", parseInt( dest.attr( "value" ) ) + 1000 ); 
			firstFastButton = false;
		});

		btn10.insertBefore( dest );
		btn50.insertBefore( dest );
		btn1000.insertAfter( dest );
		btn100.insertAfter( dest );

		orderSelect( select );
		changeSelect( select, pos, dest, "#aaaaaa" );

		$( ".storage" ).bind( "click", function() { setTimeout( mySendPreviewRequest, 500 ); });
		$( "#countryInput" ).unbind( "change" );
		$( "#countryInput" ).bind( "change", function() { mySendPreviewRequest(); });
		$( "#resourceInput" ).unbind( "change" );
		$( "#resourceInput" ).bind( "change", function() { mySendPreviewRequest(); });
		$( "#priceInput" ).unbind( "change" );
		$( "#priceInput" ).bind( "change", function() { mySendPreviewRequest(); });
		$( "#priceInput" ).bind( "keydown", function() { setTimeout( mySendPreviewRequest, 1000 ); 	});
	}


	// Replace sendPreviewRequest to restyle
	function mySendPreviewRequest() {
		if( !isFormCorrect() ) { return; }
		var dataString = 'country=' + $("#countryInput").val() + '&resource=' + $("#resourceInput").val();
		dataString += '&price=' +$("#priceInput").val() + '&citizenship=5';  
		var resourceType = $("#resourceInput option:selected").text();
		$( "#preview" ).html( "<div class ='previewMyOffers'>Loading tax resource...</div >" );

		$.ajax({  
			type: "POST",
			url: "productTaxes.html",
			data: dataString,
			dataType: "html",
			success: function( data ) {
				var preview = $( "#preview" );
				preview.html( data );
				preview.children( ".dataTable" ).addClass( "previewDataTable" );

				var res = $( "<div class='resourceMyOffers'>"+ resourceType + "</div>" );
				var flag = preview.find( ".currencyFlag" ).first();
				flag.addClass( "flagMyOffer" );

				// Remove all flags
				preview.find( ".currencyFlag" ).remove();
				res.insertBefore( preview.children().first() );
				flag.insertBefore( preview.children( "b" ).first() );
				preview.children( "b" ).addClass( "titleMyOffers" );

				var thead = preview.children( ".dataTable" ).find( "tr" ).eq(0);
				preview.children( ".dataTable" ).find( "tr" ).eq(1).children().css({ "height" : "25px" });
				thead.children().css({ "height" : "22px" });
				thead.children().eq(0).text( "Gross" );
				thead.children().eq(1).text( "Net" );
				thead.children().eq(3).text( "Tax" );

				var link = getCurrentServer() + URLMarket + "?resource=";
				var splitItem = $("#resourceInput").val().split( "-" );
				if( splitItem.length == 1 ) {
					link += splitItem[0] + "&countryId=" + $("#countryInput").val();
				} else link += splitItem[1] + "&countryId=" + $("#countryInput").val() + "&quality=" + splitItem[0];
				preview.append( "<a class='textMyOffers' href='"+ link +"' target='_blank'>Market offers</a>" );

				link = getCurrentServer() + URLMonetaryMarket + "?buyerCurrencyId="+ $("#countryInput").val() +"&sellerCurrencyId=0";
				preview.append( "<a class='MMMyOffers' href='"+ link +"' target='_blank'>Monetary market</a>" );
			}
		});
	}


	// Change My Shares Menu
	/*function changeMenuShares() {

		var firstPlate = $( ".testDivwhite" ).first();
		firstPlate.removeClass( "testDivwhite" );
		firstPlate.addClass( "testDivblue" );
		firstPlate.css({ "width" : "570px" });
		firstPlate.children( ".dataTable" ).css({ "width" : "550px" });

		var firstRow = true;
		firstPlate.children( ".dataTable" ).find( "tr" ).each( function() {

			var td = $( "<td></td>" );
			td.insertAfter( $(this).children().first() );

			if( firstRow ) { 
				firstRow = false;
				td.append( "Fast links" );

			} else {
				var idStock = $(this).children().first().find( "a" ).attr( "href" );
				var split = idStock.split( "?id=" );
				if( split.length > 1 ) { idStock = split[1]; }

				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockMM +"?id="+ idStock +"'>MM offers</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockProducts +"?id="+ idStock +"'>Product offers</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockDonateMoney +"?id="+ idStock +"'>Donate money</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockDonateCompany +"?id="+ idStock +"'>Donate company</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockLogs +"?id="+ idStock +"'>Logs</a>" );
			}
		});
	}*/


	// Change travel menu
	function changeTravelMenu() {

		var minTicket = 0;
		var vecItems = [];
		var plate = $( "#citizenTravelForm" ).parent().addClass( "citizenTravelFormMod" );
		$( "#citizenTravelForm" ).children( "input" ).addClass( "citizenTravelFormInput" );

		$( "#citizenshipSelect" ).addClass( "customSelectList" );
		$( "#regionId" ).addClass( "customSelectList" );
		$( "<br/>" ).insertBefore( $( "#regionId" ).parent() );

		var marginBlock = $( "<div class='centerBlockTravel'></div>" );
		var block = $( "<div class='blockTravel'></div>" );
		marginBlock.append( block );

		var selectedTicket = null;
		$( "#ticketQuality" ).find( "option" ).each( function() {

			var q = $(this).attr( "value" );
			var ticket = $( "<div class='ticketTravel' indexselect='"+ q +"'></div>" );
			ticket.append( "<img src='"+ IMGTICKET +"' class='imageTicket' />" );
			ticket.append( "<div class='healthTicket'>- "+ (40 - ((q-1) * 10)) +"</div>" );
			ticket.append( "<img src='"+ IMGQUALITY + $(this).attr( "value" ) +".png' class='imageQuality' />" );
			block.append( ticket );

			// Find number of items
			var n = 0;
			$( "#userMenu" ).children( ".plate" ).find( ".storageMini" ).each( function() {
				var prod = $(this).find( "img[src='"+ IMGTICKET +"']" );
				if( prod.length == 1 ) {
					if( q == prod.next().attr( "src" ).replace( IMGQUALITY, "" ).replace( IMGEXTENSION, "" ) ) {
						n = parseInt( prod.parent().prev().text() );
					}
				}
			});
			ticket.append( "<div class='numberItems'>"+ n +"</div>" );

			if( n > 0 ) {
				if( minTicket == 0 ) { minTicket = q; }

				ticket.bind( "mouseover", function() {
					if( selectedTicket.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) { $(this).addClass( "ticketHover" ); }
				});

				ticket.bind( "mouseout", function() {
					if( selectedTicket.attr( "indexselect" ) != $(this).attr( "indexselect" ) ) { $(this).removeClass( "ticketHover" ); }
				});

				ticket.bind( "click", function() {
					if( selectedTicket ) { selectedTicket.removeClass( "ticketSelected" ); }
					selectedTicket = $(this);
					$(this).addClass( "ticketSelected" );
					$( "#ticketQuality option" )[ $(this).attr( "indexselect" )-1 ].selected = true;
				});

			} else ticket.addClass( "disabledTicket" );
			vecItems.push( ticket );
		});

		// Default min ticket
		if( minTicket > 0 ) { vecItems[ minTicket-1].click() }

		$( "<br/>" ).insertAfter( $( "#ticketQuality" ).parent() );
		$( "#ticketQuality" ).prev().remove();
		$( "#ticketQuality" ).prev().remove();
		$( "#ticketQuality" ).css({ "display" : "none" });
		block.insertBefore( $( "#ticketQuality" ) );

		// Check GET vars
		var urlVars = getUrlVars();
		if( (urlVars[ "idc" ] != undefined) && (urlVars[ "idr" ] != undefined) ) {

			$( "#citizenshipSelect" ).val( urlVars[ "idc" ] );
			$.ajax({
				url: "countryRegions.html",
				context: document.body,
				type: "POST",
				data: { countryId : urlVars[ "idc" ] },
				success: function( data ) {
					$( "#regionId" ).find( "option" ).remove();
					var json = jQuery.parseJSON( data );
					for( var i=0; i<json.length; i++ ) {	  
						$( "#regionId" ).append( "<option value='"+ json[i][0] +"'>"+ json[i][1] +"</option>" );
					}
					$( "#regionId" ).val( urlVars[ "idr" ] );
				}
			});
		}
	}


	// Redesign equipment
	function redesignEquipment() {

		var block = $( ".equipmentName" ).parent();
		var remove = "<div class='removeItem'>CLICK TO REMOVE</div>"
		var formHelmet = $( ".equipmentBox" ).last().next();
		var formVision = formHelmet.next();
		var formArmor = formVision.next();
		var formWeapon = formArmor.next();
		var formOffhand = formWeapon.next();

		// Rellocate equipment interaction
		var helmet = $( ".equipmentName" ).eq(0).addClass( "helmetTitle" );
		$( ".equipmentBox" ).eq(0).append( helmet );
		$( ".equipmentBack" ).eq(0).children().first().append( remove );
		$( ".equipmentBack" ).eq(0).bind( "click", function() { if( formHelmet.is( "form" ) ) { formHelmet.children( "input" ).last().click(); } });

		var vision = $( ".equipmentName" ).eq(1).addClass( "visionTitle" );
		$( ".equipmentBox" ).eq(1).append( vision );
		$( ".equipmentBack" ).eq(1).children().first().append( remove );
		$( ".equipmentBack" ).eq(1).bind( "click", function() { if( formVision.is( "form" ) ) { formVision.children( "input" ).last().click(); } });

		var armor = $( ".equipmentName" ).eq(2).addClass( "armorTitle" );
		$( ".equipmentBox" ).eq(2).append( armor );
		$( ".equipmentBack" ).eq(2).children().first().append( remove );
		$( ".equipmentBack" ).eq(2).bind( "click", function() { if( formArmor.is( "form" ) ) { formArmor.children( "input" ).last().click(); } });

		var weapon = $( ".equipmentName" ).eq(3).addClass( "weaponTitle" );
		$( ".equipmentBox" ).eq(3).append( weapon );
		$( ".equipmentBack" ).eq(3).children().first().append( remove );
		$( ".equipmentBack" ).eq(3).bind( "click", function() { if( formWeapon.is( "form" ) ) { formWeapon.children( "input" ).last().click(); } });

		var offhand = $( ".equipmentName" ).eq(4).addClass( "offhandTitle" );
		$( ".equipmentBox" ).eq(4).append( offhand );
		$( ".equipmentBack" ).eq(4).children().first().append( remove );
		$( ".equipmentBack" ).eq(4).bind( "click", function() { if( formOffhand.is( "form" ) ) { formOffhand.children( "input" ).last().click(); } });

		// Change remove mode
		$( ".equipmentBack" ).each( function() {
			if( !$(this).hasClass( "q0" ) ) {
				$(this).css({ "cursor" : "pointer" });

				$(this).bind( "mouseover", function() { $(this).find( ".removeItem" ).css({ "visibility" : "visible" }); });
				$(this).bind( "mouseout", function() { $(this).find( ".removeItem" ).css({ "visibility" : "hidden" }); });
			}
		});

		block.hide();
	}


	// Calculate equipment damage
	function calculateEquipmentDamage() {
		$( "#profileEquipment" ).parent().css({ "margin-left" : "11px", "height" : "220px" });

		// Get values
		var n = 1000;
		var hitList = [ 0, 50, 100, 155 ];
		var damageSplit = $( "#hitHelp" ).text().split( "/" );
		var minDamage = parseInt( damageSplit[0].replace( ",", "" ) );
		var maxDamage = parseInt( damageSplit[1].replace( ",", "" ) );
		var critical = parseFloat( $( "#criticalHelp" ).text().replace( "%", "" ) );
		var miss = parseFloat( $( "#missHelp" ).text().replace( "%", "" ) );
		var avoid = parseFloat( $( "#avoidHelp" ).text().replace( "%", "" ) );

		// Save all data to use it in the battle page
		setValue( "playerMinDamage", minDamage );
		setValue( "playerMaxDamage", maxDamage );
		setValue( "playerCritical", critical );
		setValue( "playerMiss", miss );
		setValue( "playerAvoid", avoid );

		// Default bonus settins, MU and location active
		var muBonus = 1;
		var locBonus = 1.2;
		var sdBonus = 1;
		var hBonus = 1;

		// Create block
		var block = $( "<div id='blockDamage' class='testDivwhite'></div>" );
		block.append( "<div class='titleDamage'>Average damage in "+ n +" simulations</div>" );
		block.insertBefore( $( "#profileEquipment" ).parent() );

		// Damage block
		var configDamage = $( "<div class='configDamage'></div>" );

		// MU bonus
		var MUCheck = $( "<input id='MUCheck' type='checkBox' class='itemBonus' title='No MU data' />" );
		configDamage.append( "<span class='labelConfig'>MU</span>" );
		configDamage.append( MUCheck );
		// Stupid idea to disable MU tooltip
		configDamage.append( "<div style='width:15px; height:15px; position:absolute; margin:-22px 0px 0px 25px;'></div>" );

		// Location bonus
		var locationCheck = $( "<input id='locCheck' type='checkBox' class='itemBonus' checked='checked' />" );
		configDamage.append( locationCheck );
		configDamage.append( "<span class='labelConfig'>LOCATION</span>" );
		configDamage.append( "<br/>" );

		// SD bonus
		var sdCheck = $( "<select id='sdCheck' class='itemBonus customSelectList'></select>" );
		for( var i=0; i<=5; i++ ) {
			sdCheck.append( "<option value='"+ 5*i +"'>Q"+ i +"</option>" );
		}
		configDamage.append( "<span class='labelConfig'>SD</span>" );
		configDamage.append( sdCheck );

		// Hospital bonus
		var hCheck= $( "<select id='hCheck' class='itemBonus customSelectList'></select>" );
		for( var i=0; i<=5; i++ ) {
			hCheck.append( "<option value='"+ 5*i +"'>Q"+ i +"</option>" );
		}
		configDamage.append( hCheck );
		configDamage.append( "<span class='labelConfig'>HOSPITAL</span>" );

		// Calculate button
		var calculate = $( "<input class='calculateBonus' type='button' value='Calculate' />" );
		configDamage.append( calculate );

		// Fill table
		var tableDamage = $( "<table class='tableDamage'></table>" );
		for( var i=0; i<=5; i++ ) {
			var tr = $( "<tr></tr>" );
			for( var j=0; j<hitList.length; j++ ) {
				if( hitList[j] == 0 ) {
					if( i != 0 ) {
						tr.append( "<td class='tableQuality'>Q"+ i +"</td>" );
					} else tr.append( "<td></td>" );

				} else if( i == 0 ) {
					if( hitList[j] != 0 ) {
						var input = $( "<input class='hitList' type='text' value='"+ hitList[j] +"' maxlength='3' />" );
						var td = $( "<td class='tableHits' title='You can edit this number!'></td>" );
						td.tooltip({ tooltipClass: "tooltipHitDamage", position: { my: "center bottom", at: "center top" } });
						td.append( input );
						tr.append( td );
					} else tr.append( "<td></td>" );

				} else tr.append( "<td class='dataDamage'>0</td>" );
			}
			tableDamage.append( tr );
		}

		block.append( tableDamage );
		block.append( configDamage );

		if( getValue( "MURank" ) ) {
			muBonus = 1 + (parseInt( getValue( "MURank" ) ) / 100);
			$( "#MUCheck" ).attr( "checked", "checked" );
		} else {
			$( "#MUCheck" ).prev().css({ "text-decoration" : "line-through" });
			$( "#MUCheck" ).attr( "disabled", "disabled" );
		}

		updateDamageTable( minDamage, maxDamage, muBonus, locBonus, sdBonus, hBonus, critical, miss, avoid, hitList, n );

		configDamage.find( ".itemBonus" ).bind( "change", function() {
			updateDamageTable( minDamage, maxDamage, muBonus, locBonus, sdBonus, hBonus, critical, miss, avoid, hitList, n );
		});
		configDamage.find( ".calculateBonus" ).bind( "click", function() {
			updateDamageTable( minDamage, maxDamage, muBonus, locBonus, sdBonus, hBonus, critical, miss, avoid, hitList, n );
		});
	}


	// Calculate iteration damage 
	function calculateHitsDamage( min, max, mu, loc, sd, h, cr, miss, avoid, weapon, hits, n ) {
		hits = hits * h; // Hospital hits

		// We do it for Berserks		
		var nBK = parseInt( hits / 5 );
		var mod = hits % 5;
		var averageDamage = 0;
		var bonus = 100 + (weapon * 20);
		for( var j=0; j<n; j++ ) {
			var totalDmg = 0;

			for( var i=0; i<nBK; i++ ) {
				var damage = (min + parseInt((max-min)/2))*5 * bonus/100;
				totalDmg += damage * mu * loc * sd;

				// Critical
				if( Math.random()*100 < cr ) { totalDmg += damage; }

				// Miss
				if( Math.random()*100 < miss ) { totalDmg -= damage; }

				// Avoid
				if( Math.random()*100 < avoid ) { i--; }
			}

			if( mod != 0 ) { totalDmg += (mod * totalDmg / (nBK*5)); }
			averageDamage += totalDmg;
		}

		return( parseInt( averageDamage/n ) );
	}


	// Update table data
	function updateDamageTable( minDamage, maxDamage, muBonus, locBonus, sdBonus, hBonus, critical, miss, avoid, hitList, n ) {
		locBonus = $( "#locCheck" ).attr( "checked" ) ? 1.2 : 1;
		sdBonus = 1 + parseInt( $( "#sdCheck" ).val() )/100;
		hBonus = 1 + parseInt( $( "#hCheck" ).val() )/100;
		if( $( "#MUCheck" ).attr( "checked" ) ) {
			if( getValue( "MURank" ) ) { muBonus = 1 + (parseInt( getValue( "MURank" ) ) / 100); } 
		} else muBonus = 1;

		var table = $( ".tableDamage" );
		for( var i=1; i<=5; i++ ) {
			var tr = table.find( "tr" ).eq(i);
			for( var j=1; j<hitList.length; j++ ) {
				var hits = parseInt( table.find( ".hitList" ).eq(j-1).val() );
				var dmg = calculateHitsDamage( minDamage, maxDamage, muBonus, locBonus, sdBonus, hBonus, critical, miss, avoid, i, hits, n );
				tr.children( "td" ).eq( j ).text( pointNumber( dmg ) );
			}
		}
	}


	// Improve company interface
	function companyImprovements() {
		if( $( "#minimalSkill option" ).length == 14 ) {
			$( "#minimalSkill" ).append( "<option value='15'>15</option>" );
			$( "#minimalSkill" ).append( "<option value='16'>16</option>" );
		}

		/*var countryId = IDByImageCountry( $( "a[href^=region.html]" ).prev().attr( "src" ) );
		var selectedSkill = null;
		$( "#minimalSkill option" ).each( function() {

			var skill = $( "<div class='skillSelector'>"+ $(this).val() +"</div>" )
			skill.insertBefore( "#minimalSkill" );

			skill.bind( "click", function() {
				if( selectedSkill ) { selectedSkill.removeClass( "skillSelectorSelected" ); }

				selectedSkill = $(this);
				selectedSkill.addClass( "skillSelectorSelected" );
				$( "#minimalSkill" ).val( selectedSkill.text() );

				var link = getCurrentServer() + URLJobMarket + "?countryId="+ countryId +"&minimalSkill="+ $(this).text();
				$( ".companyLinkOffers" ).attr( "href", link );
			});
		});

		$( "<br/>" ).insertBefore( "#minimalSkill" );
		$( "<a class='companyLinkOffers' href='' target='_blank'>View skill offers</a>" ).insertBefore( "#minimalSkill" );

		$( ".skillSelector" ).first().click();
		$( "#minimalSkill" ).hide();
		$( "#createJobForm" ).parent().css({ "padding" : "1px 9px 1px" });
		$( "#createJobForm" ).prev().css({ "margin" : "5px 0px" });
		$( "#createJobForm" ).parent().children().last().remove();

		$( "#price" ).css({ "text-align" : "center" });
		$( "#quantity" ).css({ "text-align" : "center" });*/
	}


	// Replace job skill selector
	function jobMarketSkills() {
		if( $( "#minimalSkill option" ).length == 14 ) {
			$( "#minimalSkill" ).append( "<option value='15'>15</option>" );
			$( "#minimalSkill" ).append( "<option value='16'>16</option>" );
		}

		$( "#countryId" ).addClass( "customSelectList" );
		$( "#jobMarketForm" ).parent().css({ "width" : "420px" });
		$( "#jobMarketForm" ).contents().eq(4).remove();

		var selectedSkill = null;
		$( "#minimalSkill option" ).each( function() {

			var skill = $( "<div class='skillSelector'>"+ $(this).val() +"</div>" )
			skill.insertBefore( "#minimalSkill" );

			skill.bind( "click", function() {
				if( selectedSkill ) { selectedSkill.removeClass( "skillSelectorSelected" ); }

				selectedSkill = $(this);
				selectedSkill.addClass( "skillSelectorSelected" );
				$( "#minimalSkill" ).val( selectedSkill.text() );

				var link = getCurrentServer() + URLJobMarket + "?countryId="+ countryId +"&minimalSkill="+ $(this).text();
				$( ".companyLinkOffers" ).attr( "href", link );
			});

			if( $(this).val() == $( "#minimalSkill" ).val() ) { skill.click(); }
		});

		$( "#minimalSkill" ).hide();
		$( "#jobMarketForm" ).children( "input" ).insertAfter( "#countryId" );
		$( "#jobMarketForm" ).children( "input" ).addClass( "showButton" );
		$( "#jobMarketForm" ).parent().children( ":lt(2)" ).remove();
	}


	// Improve battle list interface
	function changeBattleList() {

		$( "#countryId" ).addClass( "customSelectList" );
		$( "#sorting" ).prev().remove();
		$( "#sorting" ).prev().remove();

		var selectedOption = null;
		$( "#sorting option" ).each( function() {

			var sort = $( "<div class='sortTypeSelector'>"+ $(this).text().replace( "Sorting ", "" ) +"</div>" );
			sort.attr( "type", $(this).val() );
			sort.insertBefore( "#sorting" );

			sort.bind( "click", function() {
				if( selectedOption ) { selectedOption.removeClass( "sortTypeSelectorSelected" ); }

				selectedOption = $(this);
				selectedOption.addClass( "sortTypeSelectorSelected" );
				$( "#sorting" ).val( selectedOption.attr( "type" ) );
			});

			if( $(this).val() == $( "#sorting" ).val() ) { sort.click(); }
		});

		$( "#sorting" ).hide();
		$( "#battlesViewForm" ).parent().children().last().remove();
		var updateTime = $( "<input class='updateTimeListBattle' type='button' value='Update time'/>" );
		updateTime.insertAfter( $( "#battlesViewForm" ).parent() );
		updateTime.bind( "click", function() { 

			var i=0;
			$( "#battlesTable" ).find( "tr" ).each( function() {
				var related = $(this);
				var href = $(this).find( "a[href^='battle.html?id=']" );
				if( href.length == 1 ) {
					setTimeout( function() {
						$.ajax({
							url: href.attr( "href" ),
							success: function( data ) { 
								related.find( ".roundTimeRemain" ).remove();

								var startPos = data.indexOf( "http://e-sim.home.pl/testura/js/jquery.countdown.min.js", 0 );
								var hourIni = data.indexOf( "getHours() +", startPos ) + (new String("getHours() +")).length;
								var hourEnd = data.indexOf( ");", hourIni );
								var hour = parseInt( data.substr( hourIni, hourEnd-hourIni ) );

								var minIni = data.indexOf( "getMinutes() +", startPos ) + (new String("getMinutes() +")).length;
								var minEnd = data.indexOf( ");", minIni );
								var min = parseInt( data.substr( minIni, minEnd-minIni ) );

								var secIni = data.indexOf( "getSeconds() +", startPos ) + (new String("getSeconds() +")).length;
								var secEnd = data.indexOf( ");", secIni );
								var sec = parseInt( data.substr( secIni, secEnd-secIni ) );

								var lastTD = related.children().last();
								lastTD.removeClass( "roundClean" );
								lastTD.removeClass( "roundLastHour" );
								lastTD.removeClass( "roundLastHalfHour" );
								if( hour == 0 ) {
									if( min < 30 ) {
										lastTD.addClass( "roundLastHalfHour" );

									} else lastTD.addClass( "roundLastHour" );

								} else lastTD.addClass( "roundClean" );

								hour = "0" + hour;
								min = (min < 10) ? "0"+min : min;
								sec = (sec < 10) ? "0"+sec : sec;
								related.children().last().append( "<div class='roundTimeRemain'>"+ hour +":"+ min +":"+ sec +"</div>" );
							}
						});
					}, 500*i );

					i++;
				}
			});
		});
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


	// Convert location to travel
	/*function setTravelLocation( id, travelRW, travelLeft, travelRight ) {
	
		var currentDate = (new Date).getDate();
		var lastDate = GetValue( "LastUpdateAPIRegion" );
		var needUpdate = (lastDate != currentDate);

		var value = GetValue( "APIRegionJSON" );
		if( value && !needUpdate ) {

			var json = $.parseJSON( value );
			for( var i=0; i<json.length; i++ ) {
				if( json[i].id == id ) { 
					travelRW.children( "a" ).attr( "href", "http://"+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
					travelRW.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

					travelLeft.children( "a" ).attr( "href", "http://"+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
					travelLeft.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

					// Check neighbours
					for( var j=0; j<json.length; j++ ) {
						if( json[i].neighbours.indexOf( json[j].id ) ) {
							
						}
					}
				}
			}

		} else {

			$.ajax({
				url: getCurrentServer() + URLAPIRegion,
				success: function( data ) {
					SetValue( "APIRegionJSON", data );
					SetValue( "LastUpdateAPIRegion", currentDate );

					var json = $.parseJSON( data );
					for( var i=0; i<json.length; i++ ) {
						if( json[i].id == id ) {
							travelRW.children( "a" ).attr( "href", "http://"+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
							travelRW.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

							travelLeft.children( "a" ).attr( "href", "http://"+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
							travelLeft.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

							// Check neighbours
							
						}
					}
				}
			});
		}
	}*/


	// Return Region list from API
	function getRegionAPI( region, current ) {

		var currentDate = (new Date).getDate();
		var lastDate = getValue( "LastUpdateAPIRegion" );
		var needUpdate = (lastDate != currentDate);

		var value = getValue( "APIRegionJSON" );
		if( value && !needUpdate ) {

			var json = $.parseJSON( value );
			for( var i=0; i<json.length; i++ ) {
				if( json[i].id == region ) { return( json[i].neighbours ); }
			}

		} else {

			$.ajax({
				url: getCurrentServer() + URLAPIRegion,
				success: function( data ) {
					setValue( "APIRegionJSON", data );
					setValue( "LastUpdateAPIRegion", currentDate );

					var numberLocation = 0;
					var neighbours = [];
					var json = $.parseJSON( data );
					for( var i=0; i<json.length; i++ ) {
						if( json[i].id == region ) {
							neighbours = json[i].neighbours;
							numberLocation = (neighbours.indexOf( parseInt(current) ) != -1) ? 20 : 0;
						}
					}

					/*var location = $( "#rightBlockBonus" ).find( ".locationBonus" );
					location.text( numberLocation + "%" );
					var color = (numberLocation == 0) ? "#e67171" : "#bed7ba";
					location.css({ "background-color" : color });

					location = $( "#leftBlockBonus" ).find( ".locationBonus" );
					location.text( numberLocation + "%" );
					location.css({ "background-color" : color });*/
				}
			});
		}

		return [];
	}


	// Get URL Vars
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function( m, key, value ) { vars[key] = value; });
		return vars;
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
	createResourceVar( "myQualityStar" );
	createResourceVar( "AoEweaponQ0" );
	createResourceVar( "AoEweaponQ1" );
	createResourceVar( "AoEweaponQ2" );
	createResourceVar( "AoEweaponQ3" );
	createResourceVar( "AoEweaponQ4" );
	createResourceVar( "AoEweaponQ5" );
	createResourceVar( "AoEweaponQ0Big" );
	createResourceVar( "AoEweaponQ1Big" );
	createResourceVar( "AoEweaponQ2Big" );
	createResourceVar( "AoEweaponQ3Big" );
	createResourceVar( "AoEweaponQ4Big" );
	createResourceVar( "AoEweaponQ5Big" );

	// Inject our main script
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild( script );
}
Because it's your web

Powered by monkeys and unicorns with the help of many friends
modified by DFM2 for german MU
Policy & Guidelines: DMCA Privacy Policy