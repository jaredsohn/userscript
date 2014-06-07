// ==UserScript==
// @name           EasyDelivery
// @version        0.7.6.0
// @namespace      localhost
// @author         aMiTo & Campari & CLard & Heff
// @description    Easy tool to improve delivery job.
// @match          http://*.e-sim.net/*
// @match          http://*.e-sim.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require        https://dl.dropboxusercontent.com/u/67548179/esim-ED/bb/jquery.sceditor.bbcode.min.js
// @require        https://dl.dropboxusercontent.com/u/67548179/esim-ED/jquery.tablesorter.js
// @require        http://malsup.github.io/jquery.blockUI.js
// @resource       myCustomCSS https://dl.dropboxusercontent.com/u/67548179/esim-ED/my.css
// @resource       myQualityStar https://dl.dropbox.com/u/78035768/eSim/star.png
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_addStyle
// @downloadURL	   https://dl.dropboxusercontent.com/u/67548179/esim-ED/ED.user.js
// @updateURL	   https://dl.dropboxusercontent.com/u/67548179/esim-ED/ED.raw.js
// ==/UserScript==


var main = function () {


	// CONSTANTS
	var VERSION = 						"E.D. 0.7.6.0";
	var URLSCRIPT = 					"http://userscripts.org/scripts/show/177770";
	// CUSTOM IMAGE LINKS
	var QUALITYSTAR = 					"https://dl.dropbox.com/u/78035768/eSim/star.png"
	// API
	var URLAPIRanks =					NOO()+"/apiRanks.html";
	var URLAPIRegion =					NOO()+"/apiRegions.html";
	var URLAPIMap =					    NOO()+"/apiMap.html";
	// URLs
	var URLMain = 						NOO()+"/index.html";
	var URLArticle = 					NOO()+"/article.html";
	var URLNewspaper = 					NOO()+"/newspaper.html";
	var URLEditArticle = 				NOO()+"/editArticle.html";
	var URLMyMU = 						NOO()+"/myMilitaryUnit.html";
	var URLMUMain = 					NOO()+"/militaryUnit.html?id=";
	var URLMUStorage = 					NOO()+"/militaryUnitStorage.html";
	var URLMUMoney = 					NOO()+"/militaryUnitMoneyAccount.html";
	var URLDMUMoney =					NOO()+"/donateMoneyToMilitaryUnit.html?id=";
	var URLMUCompanies = 				NOO()+"/militaryUnitCompanies.html?id=";
	var URLDDonatePlayerProduct = 		NOO()+"/donateProducts.html?id=";
	var URLDonateMUProduct = 			NOO()+"/donateProductsToMilitaryUnit.html?id=";
	var URLCompanies = 					NOO()+"/companies.html";
	var URLCompany = 					NOO()+"/company.html?id=";
	var URLCompanyDetails = 			NOO()+"/companyWorkResults.html?id=";
	var URLCountryEco = 				NOO()+"/countryEconomyStatistics.html";
	var URLBattle = 					NOO()+"/battle.html?id=";
	var URLBattleList = 				NOO()+"/battles.html";
	var URLContracts = 					NOO()+"/contracts.html";
	var URLContract = 					NOO()+"/contract.html?id=";
	var URLMarket = 					NOO()+"/productMarket.html";
	var URLMonetaryMarket = 			NOO()+"/monetaryMarket.html";
	var URLMarketOffers = 				NOO()+"/citizenMarketOffers.html";
	var URLJobMarket =					NOO()+"/jobMarket.html";
	var URLMyShares = 					NOO()+"/myShares.html";
	var URLStockCompany = 				NOO()+"/stockCompany.html?id=";
	var URLStockMM = 					NOO()+"/stockCompanyMoney.html?id=";
	var URLStockProducts = 				NOO()+"/stockCompanyProducts.html?id=";
	var URLStockDonateMoney = 			NOO()+"/stockCompanyDonateMoney.html?id=";
	var URLStockDonateCompany = 		NOO()+"/stockCompanyDonateCompany.html?id=";
	var URLStockLogs = 					NOO()+"/stockCompanyLogs.html?id=";
	var URLTravel = 					NOO()+"/travel.html";
	var URLEquipment =					NOO()+"/equipment.html";
	var URLNewCitizen =					NOO()+"/newCitizenStatistics.html";
	var URLSearch =						NOO()+"/search.html";
	var _COUNTRY_URL = 					NOO()+"/countryEconomyStatistics.html?countryId={1}";
	var _MM_C_URL = 					NOO()+"/monetaryMarket.html?buyerCurrencyId={1}&sellerCurrencyId=0";
	var URLBUFF =						NOO()+"/specialItems.html"
	var URLNB =							NOO()+"/newCitizens.html?countryId=0"
	var URLNewRegisteredCitizen =		NOO()+"/newCitizens.html?countryId=0"
	var URLPROFILE = 					NOO()+"/profile.html"
	var URLDMUProduct=					NOO()+"/donateProductsToMilitaryUnit.html?id=";
	var URLDMUComp =					NOO()+"/donateCompanyToMilitaryUnit.html?id=";
	var URLMUMEMB =						NOO()+"/militaryUnitMembers.html?id="
	var URLMUCOMP = 					NOO()+"/militaryUnitCompanies.html?id="
	var URLSO = 						NOO()+"/serverOverloaded.html"
	
	// Image resources
	var IMGIRON = 						"http://cdn.e-sim.org:8080/img/productIcons/Iron.png";
	var IMGGRAIN = 						"http://cdn.e-sim.org:8080/img/productIcons/Grain.png";
	var IMGOIL = 						"http://cdn.e-sim.org:8080/img/productIcons/Oil.png";
	var IMGDIAMONDS = 					"http://cdn.e-sim.org:8080/img/productIcons/Diamonds.png";
	var IMGWOOD = 						"http://cdn.e-sim.org:8080/img/productIcons/Wood.png";
	var IMGSTONE = 						"http://cdn.e-sim.org:8080/img/productIcons/Stone.png";
	var IMGWEAPON = 					"http://cdn.e-sim.org:8080/img/productIcons/Weapon.png";
	var IMGFOOD = 						"http://cdn.e-sim.org:8080/img/productIcons/Food.png";
	var IMGTICKET = 					"http://cdn.e-sim.org:8080/img/productIcons/Ticket.png";
	var IMGGIFT = 						"http://cdn.e-sim.org:8080/img/productIcons/Gift.png";
	var IMGHOUSE = 						"http://cdn.e-sim.org:8080/img/productIcons/House.png";
	var IMGDS = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Defense_System.png";
	var IMGHOSPITAL = 					"http://cdn.e-sim.org:8080/img/productIcons/Hospital.png";
	var IMGESTATE = 					"http://cdn.e-sim.org:8080/img/productIcons/Estate.png";
	var IMGQUALITY = 					"http://cdn.e-sim.org:8080/img/productIcons/q";
	var IMGEXTENSION = 					".png";
	// Image countries
	var ARGENTINA =						"Argentina";
	var AUSTRALIA =						"Australia";
	var BELARUS =						"Belarus";
	var BELGIUM = 						"Belgium";
	var BOSNIA = 						"Bosnia-and-Herzegovina"
	var BRAZIL = 						"Brazil";
	var BULGARIA = 						"Bulgaria";
	var CANADA = 						"Canada";
	var CHILE = 						"Chile";
	var CHINA = 						"China";
	var COLOMBIA = 						"Colombia";
	var CROATIA = 						"Croatia";
	var CZECH = 						"Czech-Republic";
	var ESTONIA = 						"Estonia";
	var FINLAND = 						"Finland";
	var FRANCE = 						"France";
	var GERMANY = 						"Germany";
	var GREECE = 						"Greece";
	var HUNGARY = 						"Hungary";
	var INDIA = 						"India";
	var INDONESIA = 					"Indonesia";
	var IRAN = 							"Iran";
	var IRELAND = 						"Ireland";
	var ISRAEL = 						"Israel";
	var ITALY = 						"Italy";
	var LATVIA = 						"Latvia";
	var LITHUANIA = 					"Lithuania";
	var MALAYSIA = 						"Malaysia";
	var MEXICO = 						"Mexico";
	var NETHERLANDS = 					"Netherlands";
	var NORWAY =	 					"Norway";
	var PAKISTAN =	 					"Pakistan";
	var PERU =		 					"Peru";
	var PHILIPPINES =					"Philippines";
	var POLAND =						"Poland";
	var PORTUGAL =						"Portugal";
	var FYROM =							"Republic-of-Macedonia";
	var ROMANIA =						"Romania";
	var RUSSIA =						"Russia";
	var SERBIA =						"Serbia";
	var SLOVENIA =						"Slovenia";
	var SOUTHKOREA =					"South-Korea";
	var SPAIN =							"Spain";
	var SWEDEN =						"Sweden";
	var SWITZERLAND =					"Switzerland";
	var TAIWAN =						"Taiwan";
	var TURKEY =						"Turkey";
	var USA =							"USA";
	var UKRAINE =						"Ukraine";
	var UK =							"United-Kingdom";
	// Others Image
	
	var thumbsUp=						"http://www.bayareakiteboarding.com/forum/images/smilies/emoji/e00e.png"
	var IMGBUFF =						"http://images2.wikia.nocookie.net/__cb20101111221523/dofus/images/thumb/5/5b/Intelligence.png/20px-Intelligence.png"
	var IMGSH = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/stock_new_chart_next_graph-20.png"
	var IMGTV = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/travels_travel_vector_simple-20.png"
	var IMGMM = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/cash_money_dollar_payment_coins_wallet_register.png"
	var IMGCT = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/newspaper_edit.png"
	var IMGPM = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Product_basket.png"
	var IMGMU = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Soldier.png"
	var IMGPACKAGE = 					"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/icon-gift.gif";
	var IMGDOLLAR = 					"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/currency_dollar_pound_money-20.png";
	var IMGEQUIPMENT = 					"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/shield_silver.png";
	var IMGCOMPANY =					"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Factory.png";
	var IMGONLINE = 					"http://e-sim.home.pl/testura/img/newOnline.png";
	var IMGOFFLINE =					"http://e-sim.home.pl/testura/img/newOffline.png";
	var IMGPRODBG = 					"http://e-sim.home.pl/testura/img/productIcons/background.png";
	var IMGCRITICAL = 					"http://e-sim.home.pl/testura/img/equipmentIcons/criticalHit.png";
	var IMGMISS = 						"http://e-sim.home.pl/testura/img/equipmentIcons/reduceMiss.png";
	var IMGAVOID = 						"http://e-sim.home.pl/testura/img/equipmentIcons/avoidDamage.png";
	var IMGLOAD = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/WorkInProgress.gif";
	var noDebuff=						"http://cdn.rivierarentalguide.com/images/messages/booking_panel/ok.png";
	var IMGLOADBAR=						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/loading_bar.gif";
	var IMGDMUMy=						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/help-donate_32.png"
	var IMGDMUPR=						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Treasure%20Chest.png";
	var IMGDMUCP = 						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Factory_company_production.png";
	var IMGMUMEMB=						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/members.gif";
	var IMGMUCOMP=						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Bldg-RocketFactory.png"
	var IMGBUBL =						"https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/education_icons_IF-08-20.png"
	
	// VARS
	var cachedSettings = null; // GM friendly function
	var currentServer = null;
	var selectedFood = null;
	var selectedGift = null;
	var selectedWeapon = null;
	var selectedCurrency = null;
	var idPlayer = null;
	var extendedMU = false;
	var savedWorkedList = [];


	// CODE
	function initialize() {
       
       //Insert Jquery BlockUI
        //$('head').append("<script src='http://malsup.github.io/jquery.blockUI.js'></script>");
    	var url = "http://malsup.github.io/jquery.blockUI.js";  
        var script1 = document.createElement("script");  
        script1.setAttribute("src", url);  
        document.getElementsByTagName("head")[0].appendChild(script1);   
        
        checkvalidate();
        
		checkday();
        
		loadConfiguration();
        
        
        
		var previousSelection = getValue( "lastSelectionMUStorage" );
		setValue( "lastSelectionMUStorage", "" );

		// Do different things on diferents urls
		var localUrl = new String( window.location );
		//alert(URLMain)
		if( localUrl.indexOf( URLMain, 0 ) >= 0 ) {

			if( !isOrgAccount() ) { updateMUOrdersMain(); }

		// Article
		} else if( (localUrl.indexOf( URLArticle, 0 ) >= 0)) {

			if( getValue( "configBBcode" ) == "true" ) { addMoreBBCode(); }
		
		// BB CODE PANEL 
		} else if( (localUrl.indexOf( URLNewspaper, 0 ) >= 0) || (localUrl.indexOf( URLEditArticle, 0 ) >= 0) ) {

			if( getValue( "configBBcode" ) == "true" ) { addBBCodePanel(); }
		
		// MU main page
		} else if( (localUrl.indexOf( URLMUMain, 0 ) >= 0) ) {

			changeMUMainMenu();
		

		// MU COMP	
		} else if( (localUrl.indexOf( URLMUCOMP, 0 ) >= 0) ) {

			sortMucomp();
		
		// JUST MY MU
		} else if( (localUrl.indexOf( URLMyMU, 0 ) >= 0) ) {
		
			changeMUMainMenu();
			saveMUId();
			if( getValue( "configMUBrodcastMsg" ) == "true" ) { MUBrodcastMsg(); }
		
		// MU storage
		} else if( localUrl.indexOf( URLMUStorage, 0 ) >= 0 ) {

			removeFirstBlock();
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

			removeFirstBlock();
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
				calculateBonus();
				if( getValue( "configWeaponSelector" ) == "true" ) { changeWeaponBattle(); }
			}
			if( getValue( "configRoundSelector" ) == "true" ) { changeRoundSelector(); }
			if( getValue( "configTime" ) == "true" ) { changeTime(); }
			if( getValue( "configExtraEatUseButton" ) == "true" ) { extraEatUseButton(); }
            //Check for HideStuff
            hideExtraInfo();
			

		// Contract creator
		} else if( localUrl.indexOf( URLContract, 0 ) >= 0 ) {

			changeCreateContract();

		// Market
		} else if( localUrl.indexOf( URLMarket, 0 ) >= 0 ) {

			if( getValue( "configProductMarketSelection" ) == "true" ) { changeProductSelection(); }
			if( getValue( "configProductMarketTable" ) == "true" ) { changeProductMarketTable(); }
			if( getValue( "configProductMarketAdvanced" ) == "true" ) { displayGoldValue(); }

		// Market offers
		} else if( localUrl.indexOf( URLMarketOffers, 0 ) >= 0 ) {

			if( getValue( "configProductMarketOffers" ) == "true" ) { changeMarketOffers(); }
			if( getValue( "configEditOffers" ) == "true" ) { editOffers(); }

		// Monetary market improvements
		} else if( localUrl.indexOf( URLMonetaryMarket, 0 ) >= 0 ) {

			if( getValue( "configMonetaryMarketSelection" ) == "true" ) { changeMonetaryMarket(); }
			if( getValue( "configMonetaryMarketTable" ) == "true" ) { changeMonetaryMarketTable(); }
			if( getValue( "configEditPrice" ) == "true" ) { monetaryMarketPriceEdit(); }
			if( getValue( "configRatioPrice" ) == "true" ) { monetaryMarketPriceRatio(); }

		// My Shares menu
		} else if( localUrl.indexOf( URLMyShares, 0 ) >= 0 ) {

			addSharesExtraLinks();

		// Shares main menu
		} else if( localUrl.indexOf( URLStockCompany, 0 ) >= 0 ) {

			changeStockMainMenu();
			if( getValue( "configSharesMenu" ) == "true" ) { changeStockFloatingDivs(); }

		// Shares company product 
		} else if( localUrl.indexOf( URLStockProducts, 0 ) >= 0 ) {

			changeStockMainMenu();
			if( getValue( "configSharesProductSelection" ) == "true" ) { changeStockProductSelection(); }
			if( getValue( "configStockcoEditOffers" ) == "true" ) { stockCoEditOffers(); }

		// Travel
		} else if( localUrl.indexOf( URLTravel, 0 ) >= 0 ) {

			if( getValue( "configTravelMenu" ) == "true" ) { changeTravelMenu(); }
		
		// Search
		} else if( localUrl.indexOf( URLSearch, 0 ) >= 0 ) {

			if( getValue( "configEBS" ) == "true" ) { addExtraButtonsToSearch(); }
		
		// Equipment
		} else if( localUrl.indexOf( URLEquipment, 0 ) >= 0 ) {

			if( getValue( "configDesignEquipment" ) == "true" ) { redesignEquipment(); }
			if( getValue( "configCalculateDamage" ) == "true" ) { calculateEquipmentDamage(); }

		// Company
		} else if( localUrl.indexOf( URLCompany, 0 ) >= 0 ) {

			if( getValue( "configCompanyRedesign" ) == "true" ) { companyImprovements(); }
			addCompanyButtons();

		// Company work results
		} else if( localUrl.indexOf( URLCompanyDetails, 0 ) >= 0 ) {

			if( getValue( "configCompanyWorkResults" ) == "true" ) { companyWorkResults(); }

		// Job market
		} else if( localUrl.indexOf( URLJobMarket, 0 ) >= 0 ) {

			if( getValue( "configSkillImprovements" ) == "true" ) { jobMarketSkills(); }

		// List of battles
		} else if( localUrl.indexOf( URLBattleList, 0 ) >= 0 ) {

			if( getValue( "configBattleList" ) == "true" ) { changeBattleList(); }
		
		// List of battles
		} else if( localUrl.indexOf( URLNewCitizen, 0 ) >= 0 ) {

			if( getValue( "configNCM" ) == "true" ) { NCM(); }
		
		// New Registered Citizens
		} else if( localUrl.indexOf( URLNewRegisteredCitizen, 0 ) >= 0 ) {

			if( getValue( "configNRC" ) == "true" ) { NRC(); }
			
			
		// Profile stuffs	
		} else if( localUrl.indexOf( URLPROFILE, 0 ) >= 0 ) {

			if( getValue( "configProfile" ) == "true" ) { changeProfile(); }
			if( getValue( "configProfileCalc" ) == "true" ) { ProfileCalc(); }
			
		// SERVEROVERLOADED	
		} else if( localUrl.indexOf( URLSO, 0 ) >= 0 ) {

			 fuck_SO(); 
		}
		
		
		

		// Global code
		if( $( "form[action='login.html']" ).length == 0 ) {

			addVersion();
			addConfigurationUI();
			if(  getValue( "configMoveNotifications" ) == "true" ) { rellocateMessages(); }
			if(  getValue( "configMUFastLinks" ) == "true" ) { addMUFastLinks(); }
			if(  getValue( "configFastLinks" ) == "true" ) { addFastLinks(); }
			//if(  getValue( "configEatButtons" ) == "true" ) { changeEatButtons(); }
			if(  getValue( "configRemoveLang" ) == "true" ) {removeLang(); }
			if(  getValue( "configOrgAcc" ) == "true" ) {OrgAcc(); }
			if(  getValue( "configRemoveUselessFastButtons" ) == "true" ) {removeUselessFastbuttons(); }
			if(  getValue( "configSomeFix" ) == "true" ) {configSomeFix(); }
			if(  getValue( "configSounds" ) == "true" ) {Sounds(); }
			if(  getValue( "configLinkBar" ) == "true" ) {linkBar(); }
			if(  getValue( "configHideMissionStuff" ) == "true" ) {HideMissionStuff(); }
			if(  getValue( "configHideChat" ) == "true" ) {HideChat(); }
			if(  getValue( "configKari" ) == "true" ) {Xmas(); }
            
            
            //Run Once
			if(  getValue( "configStatisticData" ) == "false" ) {SendStatistic(); }
			
			//changeProfile();
			
			
		}

		// Set all buttons with pointer cursor
		$( "body" ).find( "input[type='submit']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });
		$( "body" ).find( "input[type='button']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });

	} initialize();

	
	// Load configuration from disk or default
	function loadConfiguration() {
		if( $( "form[action='login.html']" ).length != 0 ) { //alert("login") 
		return;
		}

		// Global
		if( !getValue( "configFastLinks" ) ) { setValue( "configFastLinks", "true" ); }
		if( !getValue( "configMUFastLinks" ) ) { setValue( "configMUFastLinks", "true" ); }
		if( !getValue( "configMoveNotifications" ) ) { setValue( "configMoveNotifications", "true" ); }
		if( !getValue( "banned" ) ) { checkforMumembers(); }
		if( !getValue( "configLinkBar" ) ) { setValue( "configLinkBar", "true" ); }
		if( !getValue( "configHideMissionStuff" ) ) { setValue( "configHideMissionStuff", "true" ); }
		if( !getValue( "configHideChat" ) ) { setValue( "configHideChat", "false" ); }
		if( !getValue( "configKari" ) ) { setValue( "configKari", "true" ); }
        
        //Run Once
		if( !getValue( "configStatisticData" ) ) { setValue( "configStatisticData", "false" ); }
		
		//HIT
		if( !getValue( "today_miss" ) ) { setValue( "today_miss", 0 ); }
		if( !getValue( "today_crit" ) ) { setValue( "today_crit", 0 ); }
		if( !getValue( "today_avoid" ) ) { setValue( "today_avoid", 0 ); }
		if( !getValue( "today_all" ) ) { setValue( "today_all", 0 ); }
		if( !getValue( "today_hitday" ) ) { setValue( "today_hitday", getDay() ); }
		
		//if( !getValue( "configEatButtons" ) ) { setValue( "configEatButtons", "false" ); }
		if( !getValue( "configSkillImprovements" ) ) { setValue( "configSkillImprovements", "true" ); }
		if( !getValue( "configRemoveLang" ) ) { setValue( "configRemoveLang", "true" ); }
		if( !getValue( "configOrgAcc" ) ) { setValue( "configOrgAcc", "true" ); }
		if( !getValue( "configRemoveUselessFastButtons" ) ) { setValue( "configRemoveUselessFastButtons", "true" ); }
		if( !getValue( "configMUBrodcastMsg" ) ) { setValue( "configMUBrodcastMsg", "true" ); }
		if( !getValue( "configSomeFix" ) ) { setValue( "configSomeFix", "true" ); }
		if( !getValue( "configSounds" ) ) { setValue( "configSounds", "true" ); }

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
		if( !getValue( "configHideResponse" ) ) { setValue( "configHideResponse", "true" ); }
		if( !getValue( "configBattleList" ) ) { setValue( "configBattleList", "true" ); }
		if( !getValue( "configWeaponSelector" ) ) { setValue( "configWeaponSelector", "true" ); }
		if( !getValue( "configExtraEatUseButton" ) ) { setValue( "configExtraEatUseButton", "true" ); }
		if( !getValue( "configTime" ) ) { setValue( "configTime", "true" ); }
		if( !getValue( "configWeaponTheme" ) ) { setValue( "configWeaponTheme", "default" ); }
		if( !getValue( "configDefaultWeapon" ) ) { setValue( "configDefaultWeapon", "1" ); }
		if( !getValue( "configExtraInfo" ) ) { setValue( "configExtraInfo", "true" ); }

		// Equipment
		if( !getValue( "configDesignEquipment" ) ) { setValue( "configDesignEquipment", "true" ); }
		if( !getValue( "configCalculateDamage" ) ) { setValue( "configCalculateDamage", "true" ); }

		// Shares
		if( !getValue( "configSharesMenu" ) ) { setValue( "configSharesMenu", "true" ); }
		if( !getValue( "configSharesProductSelection" ) ) { setValue( "configSharesProductSelection", "true" ); }
		if( !getValue( "configStockcoEditOffers" ) ) { setValue( "configStockcoEditOffers", "true" ); }

		// Travel
		if( !getValue( "configTravelMenu" ) ) { setValue( "configTravelMenu", "true" ); }

		// Company
		if( !getValue( "configCompanyRedesign" ) ) { setValue( "configCompanyRedesign", "true" ); }
		if( !getValue( "configCompanyWorkResults" ) ) { setValue( "configCompanyWorkResults", "true" ); }

		// Market
		if( !getValue( "configProductMarketSelection" ) ) { setValue( "configProductMarketSelection", "true" ); }
		if( !getValue( "configProductMarketTable" ) ) { setValue( "configProductMarketTable", "true" ); }
		if( !getValue( "configProductMarketOffers" ) ) { setValue( "configProductMarketOffers", "true" ); }
		if( !getValue( "configProductMarketAdvanced" ) ) { setValue( "configProductMarketAdvanced", "true" ); }
		if( !getValue( "configEditOffers" ) ) { setValue( "configEditOffers", "true" ); }

		// Monetary Market
		if( !getValue( "configMonetaryMarketSelection" ) ) { setValue( "configMonetaryMarketSelection", "true" ); }
		if( !getValue( "configMonetaryMarketTable" ) ) { setValue( "configMonetaryMarketTable", "true" ); }
		if( !getValue( "configEditPrice" ) ) { setValue( "configEditPrice", "true" ); }
		if( !getValue( "configRatioPrice" ) ) { setValue( "configRatioPrice", "true" ); }
		
		//New Citizen
		if( !getValue( "configNCM" ) ) { setValue( "configNCM", "true" ); }
		if( !getValue( "configNRC" ) ) { setValue( "configNRC", "true" ); }
		
		//search
		if( !getValue( "configEBS" ) ) { setValue( "configEBS", "true" ); }
		//Article
		if( !getValue( "configBBcode" ) ) { setValue( "configBBcode", "true" ); }
		// Profile
		if( !getValue( "configProfile" ) ) { setValue( "configProfile", "true" ); }
		if( !getValue( "configProfileCalc" ) ) { setValue( "configProfileCalc", "true" ); }

        //FastButtons
		if( !getValue( "config_FB_eq" ) ) { setValue( "config_FB_eq", "true" ); }
		if( !getValue( "config_FB_co" ) ) { setValue( "config_FB_co", "true" ); }
		if( !getValue( "config_FB_con" ) ) { setValue( "config_FB_con", "true" ); }
		if( !getValue( "config_FB_share" ) ) { setValue( "config_FB_share", "true" ); }
		if( !getValue( "config_FB_pm" ) ) { setValue( "config_FB_pm", "true" ); }
		if( !getValue( "config_FB_mm" ) ) { setValue( "config_FB_mm", "true" ); }
		if( !getValue( "config_FB_trav" ) ) { setValue( "config_FB_trav", "true" ); }
		if( !getValue( "config_FB_buff" ) ) { setValue( "config_FB_buff", "true" ); }
		if( !getValue( "config_FB_newC" ) ) { setValue( "config_FB_newC", "true" ); }
        
        
        //MUFasTBUttons
		if( !getValue( "config_MFB_mu" ) ) { setValue( "config_MFB_mu", "true" ); }
		if( !getValue( "config_MFB_st" ) ) { setValue( "config_MFB_st", "true" ); }
		if( !getValue( "config_MFB_mm" ) ) { setValue( "config_MFB_mm", "true" ); }
		if( !getValue( "config_MFB_dc" ) ) { setValue( "config_MFB_dc", "true" ); }
		if( !getValue( "config_MFB_dp" ) ) { setValue( "config_MFB_dp", "true" ); }
		if( !getValue( "config_MFB_dm" ) ) { setValue( "config_MFB_dm", "true" ); }
		if( !getValue( "config_MFB_mc" ) ) { setValue( "config_MFB_mc", "true" ); }
		if( !getValue( "config_MFB_mumem" ) ) { setValue( "config_MFB_mumem", "true" ); }


	}
	
    //RUN Once 
    
    // Send Statistic Data
    
    function SendStatistic()
    {
        pname = $("#userName").text();
        pid=getPlayerID();
        
        $.ajax({
					type: "GET",
					url: "http://magyarlegiero.vacau.com/stat.php",
					async: false,
					data: { id: pid, name: pname }
				})
        setValue( "configStatisticData", "true" );
        
    }
    
    
    
	//SAVE extra HITS...
	
	function checkday()
	{
		
		saved_day=getValue("today_hitday");
        
		day_now=getDay();
		//alert("még jó")
        
        
		if(day_now!=saved_day)
		{
		setValue("today_hitday",day_now)
		setValue( "today_miss", 0 ); 
		setValue( "today_crit", 0 ); 
		setValue( "today_avoid", 0 );
		setValue( "today_all", 0 );
		}
	}

	function getDay()
	{
        
        //alert($("#time2").next().next().html().split(" ")[1])
        
		return $("#time2").next().next().html().split(" ")[1]
		
	}
	
	
	//HideMissionStuff
	function HideMissionStuff()
	{
		
		$("#missionTip1").hide()
		$("#missionTip2").hide()
		$("#missionTip3").hide()
		$("#missionTip4").hide()
		$("#missionTip5").hide()
		
		$("#arrowMission1").hide()
		$("#arrowMission2").hide()
		$("#arrowMission3").hide()
		$("#arrowMission4").hide()
		$("#arrowMission5").hide()
	
	}
	
	
	//fuck_SO()
	function fuck_SO()
	{
	
	alert("hopp")
	
	$('#container').append("<img src='http://www.troll.me/images/ml-angry/server-down-fuck-thumb.jpg'>")
	
	}
	
	
	//Net Or Org
	
	function NOO(){
		
		
		 return location.host.substring(location.host.indexOf(".") + 1);
	
	}
	
	//Sounds
	function Sounds(){
	
	//alert($('#numero1 a.active-icon').length)
	
	$("head").prepend('<meta http-equiv="refresh" content="300">')
	
	if($('#numero1 a.active-icon').length != 0)
	{
			playSound(1);
	}
	
	if($('#numero2 a.active-icon').length != 0)
	{
			playSound(2);
	}
	
	if($('a.active-icon[href="subs.html"]').length != 0)
	{
			playSound(3);
	}
	
	}
	
    
    //XMAS
    function Xmas(){
      
      //alert("hó")
      
      
        
        
    }
    
    
	// Hide chat 
	function HideChat()
	{
		
		
		$("#chatpanel").hide()
	
	
	}
	
	//PLay sound
	function playSound(num)
	{
		
		switch(num)
		{
		case 1:
		  wave="https://dl.dropboxusercontent.com/u/67548179/esim-ED/arrow_x.ogg"
		  break;
		case 2:
		  wave="https://dl.dropboxusercontent.com/u/67548179/esim-ED/captain_incoming_message.ogg"
		  break;
		case 2:
		  wave=" https://dl.dropboxusercontent.com/u/67548179/esim-ED/dive_horn_submarine_2.ogg"
		  break;
		  
		 
		  
		}
		
		$('body').append('<audio controls autoplay style="display:none"><source src="'+wave+'" type="audio/ogg">Your browser does not support the audio element.</audio> ');
		
		
	
	}
	
	//changeProfile()
	function changeProfile(){
	
		// DAILY HIT
		idpatt=/\d.*/;
		Id=location.href.match(idpatt);
		
		
		$.ajax({
					url: getCurrentServer()+NOO()+"/apiCitizenById.html?id=" + Id,
					async: false
					})
					.done(function( html ) {
					
					json_obj = jQuery.parseJSON(html);
					
					damageToday=json_obj.damageToday;
					
					});
					
		$("table.smallTableFont tr:eq(2)").after('<tr> <td><b>Today damage:</b></td> <td><div class="statsLabel smallStatsLabel blueLabel"><b>'+commaNumber(damageToday)+'</b></div></td> </tr>')
		// DAILY HIT
		
		// MENTOR BUTTON
		
		
		
		if ($("table.smallTableFont tr:eq(0) td:eq(1)").text() < 6)
		{
		$("div.citizenAction").parent().parent().append('\
		<a href="mentor.html?action=REQUEST&id='+Id+'">\
            <div class="citizenAction" id="iconlightbulb">\
                <img title="Add to your friends list" class="help" src="'+IMGBUBL+'" style="margin: 2px;">\
            </div>\
        </a>\
		')
		
		
		}
		
		
		// MENTOR BUTTON
		
		
		
		
	
	
	}
	
	//saveMUId
	
	function saveMUId()
	{
	
	link=$("#unitStatusHead a").attr("href");
	id=link.match(/\d{1,10}/)
	setValue("MUID",id)
	
	}
	
	//get MU ID
	function getMUId()
	{
		return getValue("MUID")
	}
	
	//MUBrodcastMsg
	function MUBrodcastMsg(){
	
		$("div.blueLabel.unitStatusOptions:last").after('<div class="blueLabel unitStatusOptions"><a href="#" id="ED_BRC_MSG" style="font-weight: bold">ED Broadcast Message</a></div>')
		
		$("#ED_BRC_MSG").click(function() {
			
			$.blockUI({ 
					message: $('<center><b style="font-size:17px">ED Broadcast MSG</b></center><center><div id="ED_MSG" class="foundation-style blueLabel " style="margin-bottom:15px; width:530px;"><b style="display:block">Title:</b><input type="text" style="width: 400px;" path="title" maxlength="100" minlength="1" id="titleInput"><br><script language="JavaScript">function append(textBefore, textAfter)  {var yourTextarea = document.getElementById(\'messageForm\');var selectionStart = yourTextarea.selectionStart;var selectionText = yourTextarea.value.substr(yourTextarea.selectionStart, yourTextarea.selectionEnd-yourTextarea.selectionStart);var prefix = yourTextarea.value.substr(0, yourTextarea.selectionStart);var postfix = yourTextarea.value.substr(yourTextarea.selectionEnd);yourTextarea.value = prefix+""+textBefore+"" + selectionText + ""+textAfter+""+postfix;yourTextarea.selectionStart = selectionStart;yourTextarea.focus();};</script><b>Message:</b><br><textarea style="width:95%; height: 250px;" name="body" maxlength="10000" id="messageForm"></textarea><p style="display:inline"> Characters remaining:     </p><p class="charsRemaining" style="display:inline;">10000</p><p></p><p style="clear: both"></p><div style="display: inline" class="bbcodebuttons"><input type="button" onclick="javascript: append(\'[b]\',\'[/b]\')" value="B" id="boldButton" name="boldButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[i]\',\'[/i]\')" value="I" id="italicButton" name="italicButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[u]\',\'[/u]\')" value="U" id="underlineButton" name="underlineButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[quote]\',\'[/quote]\')" value="Quote" id="quoteButton" name="quoteButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[url=LINK]\',\'[/url]\')" value="Url" id="urlButton" name="urlButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[citizen]citizen name[/citizen]\',\'\')" value="Citizen" id="citizenButton" name="citizenButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[currency]PLN[/currency]\',\'\')" value="Currency" id="currencyButton" name="currencyButton" style="cursor: pointer;"><input type="button" onclick="javascript: append(\'[center]\',\'[/center]\')" value="Center" id="boldButton" name="centerButton" style="cursor: pointer;"><br /><br /><a href="javascript: append(\':)\',\'\')"><img border="0" src="http://e-sim.home.pl/testura/img/emoticons/smile.png"> </a><a href="javascript: append(\':D\',\'\')"><img border="0" src="http://e-sim.home.pl/testura/img/emoticons/bigSmile.png"> </a><a href="javascript: append(\':\\\',\'\')"><img border="0" src="http://e-sim.home.pl/testura/img/emoticons/ciach.png"> </a><a href="javascript: append(\':P \',\'\')"><img border="0" src="http://e-sim.home.pl/testura/img/emoticons/tongue.png"> </a><a href="javascript: append(\':( \',\'\')"><img border="0" src="http://e-sim.home.pl/testura/img/emoticons/unhappy.png"> </a><a href="javascript: append(\';) \',\'\')"><img border="0" src="http://e-sim.home.pl/testura/img/emoticons/eye.png"> </a></div><p style="cleat: both"></p><input type="hidden" value="REPLY" name="action"><input type="button" id="SENDMSG" value="Send" style="cursor: pointer;"> &nbsp; <input type="button" value="Close" id="ClosewButton" style="cursor: pointer;"><p style="clear: both"></p> </div></center>'),
					css: { 
						top:  "48px", 
						left: ($(window).width() - 600) /2 + 'px', 
						width: '600px' ,
						border: "0px",
						position: "absolute",
						textAlign: "left"
						
					} 
				}); 
			
			$("#ClosewButton").click(function() {
					$.unblockUI();
			});
			
			$("#SENDMSG").click(function() {
			
					// Collect Members Names
					IdArray=new Array();
					
					$("center:contains('Members')").parent().find("a[href*='profile.html']").each(function(){
						
						IdArray[IdArray.length]=$(this).text().replace(/★ /g, '');
						
					
					})
					
					//alert(IdArray);
					
					// Save MSG and Title
					msgTitle=$("#titleInput").val()
					msgBody=$("#messageForm").val()
					
					// Change to WAit UI
					$("#ED_MSG").html('<center><p style="text-align: center;"><h1>Dont Close...</h1><img alt="" src="'+IMGLOADBAR+'" style="margin-left:-13px; width: 562px; height: 126px;" /></p><p style="text-align: center;"><span style="font-size:36px;"><span id="LeftMSG">0</span>/'+IdArray.length+'</span></p></center>')
						
					
					
					//SEND MSGs
					for (i = 0; i < IdArray.length; ++i) {

						$.ajax({
							type: "POST",
							url: getCurrentServer()+NOO()+"/composeMessage.html",
							async: false,
							data: { receiverName:IdArray[i] , title:msgTitle , body: msgBody , action:"REPLY"}
						});

						
						//pause wait for 8 sec
						$.ajax({
							type: "GET",
							url: "http://esim-hadugy.gopagoda.com/wait.php?sec=11",
							async: false,
						});
						
						
						$("#LeftMSG").text(i+1)
						
					}
					
            			$.unblockUI();
					
					
			});
			
			
		
		})
		
		
	}
	
	
	//SOme fix
	function configSomeFix(){
		
		// XP
		needsplit=$("#xpProgress").attr("title");
		needsplit=needsplit.replace(/\s+/g, '');
		splited=needsplit.split("/");
		
		newval=splited[1]-splited[0]
		$("#actualXp").text(commaNumber(newval))
		
		
		//Rank
		needsplit=$("#rankProgress").attr("title");
		needsplit=needsplit.replace(/\s+/g, '');
		splited=needsplit.split("/");
		
		newval=splited[1]-splited[0]
		$("#actualRank").text(commaNumber(newval))
		
		
		//Hide missions if blank
		$("#startMission.blank-icon").hide();
		
		
	}

	
	//Edit MM price
	function monetaryMarketPriceEdit(){
	
		// Add edit quanty
		$(".dataTable:eq(1) tr").each(function(){
				
				var col = $(this).parent().children().index($(this));
				var row = $(this).parent().parent().children().index($(this).parent());
				
				//alert($.isNumeric($(this).children("td:eq(0)").text()))
				
				
				$(this).children("td:eq(0):contains(.)").append("<a class='editQuanty'>Edit</a>");
				$(this).children("td:eq(1):contains(.)").append("<a class='editPrice'>Edit</a>");
		})
		
		
		$(".editQuanty").click(function(){
			
			numberpatt=/\d{1,30}.\d\d/;
			Quanty=$(this).parent().text().match(numberpatt);
			SellCC=$(this).parent().text().match(/[a-zA-Z]{3,4}/);
			
			
			ratio= $(this).parent().next().text().match(/\d{1,10}.\d{1,4}/);
			BuyCC= $(this).parent().next().text().match(/[a-zA-Z]{3,4}/g)[1];
			
			
			href= $(this).parent().next().next().find('a').attr('href');
			
			//alert(IDbyCC(SellCC))
			
			$(this).parent().html("<input id='newQuanty' type='text' value='"+Quanty+"' min='1' style='width: 30px' class='digit quantityMyOffers' name='quantity' id='quantity'><input id='editProductMarketOfferForm' type='button' value='Edit' style='cursor: pointer;'></form>") 
			
			
			$('#editProductMarketOfferForm').click(function() {
				
				
				
				
				newQuanty= $("#newQuanty").val();
				
				$(this).parent().html("<img src='"+IMGLOAD+"' >");
				
				//Törlés
				$.ajax({
					type: "GET",
					url: getCurrentServer()+NOO()+"/monetaryMarket.html"+href,
					async: false,
					
				})
				
				// Kitétel
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/monetaryMarket.html?action=post",
					async: false,
					data: { offeredMoneyId:IDbyCC(SellCC) , buyedMoneyId:IDbyCC(BuyCC) , value: newQuanty , exchangeRatio: String(ratio)}
				})
				
				
				location.reload();
			});
			
			
			
				
		
		})
		
		$(".editPrice").click(function(){
			
			numberpatt=/\d{1,30}.\d\d/;
			Quanty=$(this).parent().prev().text().match(numberpatt);
			
			SellCC=$(this).parent().prev().text().match(/[a-zA-Z]{3,4}/);
			
			
			ratio= $(this).parent().text().match(/\d{1,10}.\d{1,4}/);
			BuyCC= $(this).parent().text().match(/[a-zA-Z]{3,4}/g)[1];
			
			
			
			href= $(this).parent().next().find('a').attr('href');
			
			//alert(href)
			
			$(this).parent().html("<input id='newratio' type='text' value='"+ratio+"' min='1' style='width: 30px' class='digit quantityMyOffers' name='quantity' id='quantity'><input id='editProductMarketOfferForm' type='button' value='Edit' style='cursor: pointer;'></form>") 
			
			
			$('#editProductMarketOfferForm').click(function() {
				
				
				
				
				newRatio= $("#newratio").val();
				
				$(this).parent().html("<img src='"+IMGLOAD+"' >");
				
				
				//Törlés
				$.ajax({
					type: "GET",
					url: getCurrentServer()+NOO()+"/monetaryMarket.html"+href,
					async: false,
					
				})
				
				// Kitétel
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/monetaryMarket.html?action=post",
					async: false,
					data: { offeredMoneyId:IDbyCC(SellCC) , buyedMoneyId:IDbyCC(BuyCC) , value: String(Quanty) , exchangeRatio: String(newRatio)}
				})
				
				
				
				location.reload();
			});
			
			
			
				
		
		})
	
	
	}
	
	//monetaryMarketPrice&Ratio()
	function monetaryMarketPriceRatio(){
	
		$(".dataTable:eq(0) tr:contains(.)").each(function(){
			
			numberpatt=/\d{1,30}.\d{1,5}/;
			
			amounthtml=$(this).children("td:eq(1):contains(.)").html()
			amount=amounthtml.match(numberpatt);
			//alert(amount)
			
			ratiohtml=$(this).children("td:eq(2):contains(.)").html()
			ratio=ratiohtml.match(numberpatt);
			
			console.log("Amount: "+amount+" Ratio:"+ratio+" ALL: "+amount*ratio);
			SellCC= $(this).children("td:eq(2):contains(.)").html().match(/[a-zA-Z]{3,4}/g)[1];
			BuyCC= $(this).children("td:eq(2):contains(.)").html().match(/[a-zA-Z]{3,4}/g)[0];
			
			$(this).children("td:eq(1):contains(.)").append("<br/> All: <b>"+Math.round((amount*ratio*100))/100+"</b> "+SellCC);
			
			CurrencyId1=IDbyCC( BuyCC )
			CurrencyId2=IDbyCC( SellCC )
			
			//alert("/monetaryMarket.html?buyerCurrencyId="+CurrencyId2+"&sellerCurrencyId="+CurrencyId1);
			
			
			
			
			
		});
		
		$.ajax({
					url: getCurrentServer()+NOO()+"/monetaryMarket.html?buyerCurrencyId="+CurrencyId2+"&sellerCurrencyId="+CurrencyId1,
					async: false
					})
					.done(function( html ) {
					
					/*patt="/1 "+SellCC+" = <b>\d{1,10}.\d{1,10}<\/b> "+BuyCC+"/"
					
					alert(patt)
					
					versus_offer=html.match(patt)
					
					alert(versus_offer)*/
					
					versus_offer=$(html).find(".dataTable:eq(0) tr:eq(1) td:eq(2)").html();
					
					$(".dataTable:eq(0) tr:contains(.)").each(function(){
						
						$(this).children("td:eq(2):contains(.)").append("<br/>"+versus_offer)
					
					});
					
					
					});
		
		
	}
	
	
	
	//BB CODE PANEL
	function addBBCodePanel(){
		
		
		$.getScript("https://dl.dropboxusercontent.com/u/67548179/esim-ED/bb/jquery.sceditor.bbcode.min.js", function(){
			
			// add Money button
			    $.sceditor.command.set("money", {
						exec: function() {
							this.insert("[currency]GOLD[/currency]");
							},
							txtExec: function() {
							this.insert("[currency]GOLD[/currency]");
							},
							tooltip: "Add money"
				});
			
			// add Player button
			    $.sceditor.command.set("citizen", {
						exec: function() {
							this.insert("[citizen][/citizen]");
							},
							txtExec: function() {
							this.insert("[citizen][/citizen]");
							},
							tooltip: "Add citizen"
				});
			
			
			// add sceditor to text area
			$('#messageForm').sceditor({
			plugins: "bbcode",
			toolbar:"bold,italic,underline,strike,subscript,superscript|left,center,right,justify|font,size,color,removeformat|bulletlist,orderedlist|table|code,quote|horizontalrule,image,email,link,unlink|emoticon,youtube,date,time|ltr,rtl|print,maximize,source|money,citizen",
			emoticonsRoot : "http://dl.dropboxusercontent.com/u/67548179/esim-ED/img/emoticons/",
			style: "https://dl.dropboxusercontent.com/u/67548179/esim-ED/bb/jquery.sceditor.default.min.css"});
		
			// give to iframe
			$('iframe').attr("id","myframe");
			
			// set word counter
			countChar($('#messageForm').sceditor('instance').val(true).length);
			$(document.getElementById('myframe').contentWindow.document).keyup(function() {
			countChar($('#messageForm').sceditor('instance').val(true).length);
			
			
			
			
			
		});
			
		});
		
		
		//Add bb code panel stuffs
		$('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/67548179/esim-ED/bb/default.min.css" type="text/css" media="all" />');
		
		function countChar(val) {
			var len = val;
			
			if (len >= 10000) {
				val.value = val.value.substring(0, 10000);
				$('p.charsRemaining').text(0);
			} else {
				$('p.charsRemaining').text(10000 - len);
			}
		}
		
		$("div.bbcodebuttons").hide();
		
	}
	
	//BB CODES
	function addMoreBBCode(){
		
		var $str = $("#articleContainer div[style*='width:auto']").html();
		//alert($str);
		//$str = 'this is a [b]bolded[/b] and [i]italic[/i] string';

		// The array of regex patterns to look for
		$format_search =  [
			/\[b\](.*?)\[\/b\]/ig,
			/\[i\](.*?)\[\/i\]/ig,
			/\[u\](.*?)\[\/u\]/ig,
			/\[youtube\](.*?)\[\/youtube\]/ig,
			/\[color=(.*?)\]([\s\S]*?)\[\/color\]/ig,
			/\[size=(.*?)\]([\s\S]*?)\[\/size\]/ig,
			/\[font=(.*?)\]([\s\S]*?)\[\/font\]/ig,
			/\[left\]([\s\S]*?)\[\/left\]/ig,
			/\[right\]([\s\S]*?)\[\/right\]/ig,
			/\[justify\]([\s\S]*?)\[\/justify\]/ig,
			/\[ul\]([\s\S]*?)\[\/ul\]/ig,
			/\[ol\]([\s\S]*?)\[\/ol\]/ig,
			/\[li\]([\s\S]*?)\[\/li\]/ig,
			/\[sup\]([\s\S]*?)\[\/sup\]/ig,
			/\[sub\]([\s\S]*?)\[\/sub\]/ig,
			/\[s\]([\s\S]*?)\[\/s\]/ig,
			/\[code\]([\s\S]*?)\[\/code\]/ig,
			/\[quote\]([\s\S]*?)\[\/quote\]/ig,
			/\[quote=(.*?)\]([\s\S]*?)\[\/quote\]/ig,
			/\[hr\]/ig,
			/\[img=(\d.*?)x(\d.*?)\](.*?)\[\/img\]/ig,
			/\[email=(.*?)\]([\s\S]*?)\[\/email\]/ig,
			/\[ltr\]([\s\S]*?)\[\/ltr\]/ig,
			/\[rtl\]([\s\S]*?)\[\/rtl\]/ig

			
			
			
		]; // note: NO comma after the last entry

		// The matching array of strings to replace matches with
		$format_replace = [
			'<strong>$1</strong>',
			'<em>$1</em>',
			'<span style="text-decoration: underline;">$1</span>',
			'<iframe width="420" height="315" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>',
			'<font color="$1">$2</font>',
			'<font size="$1">$2</font>',
			'<font face="$1">$2</font>',
			'<div align="left">$1</div>',
			'<div align="right">$1</div>',
			'<div align="justify">$1</div>',
			'<ul>$1</ul>',
			'<ol>$1</ol>',
			'<li>$1</li>',
			'<sup>$1</sup>',
			'<sub>$1</sub>',
			'<s>$1</s>',
			'<code>$1</code>',
			'<blockquote>$1</blockquote>',
			'<blockquote><cite>$1</cite>$2</blockquote>',
			'<hr>',
			'<img width="$1" height="$2" src="$3">',
			'<a href="mailto:$1">$2</a>',
			'<div style="direction: ltr">$1</div>',
			'<div style="direction: rtl">$1</div>'
		];

		// Perform the actual conversion
		for (var i =0;i<$format_search.length;i++) {
		  $str = $str.replace($format_search[i], $format_replace[i]);
		}
		//alert($str)
		
		$("#articleContainer div[style*='width:auto']").html($str);
		
	
	}
	
	//Search
	function addExtraButtonsToSearch(){
		
		//alert('megy')
		
		$('.dataTable td:first-child').each(function(){
			SID=0;
			SID = $(this).find('a:first').attr('href');
			
			//Hide ingame built send msg
			if(!isChrome()){
			
				$(this).find('a:first').hide();
			
			}
			//alert(SID);
			
			if(SID != null){
				
				SID=SID.match(/\d.*/)
				
				//alert(SID);
				
				$(this).append( "<div class='mytTestDivblue' style='display: inline; float: right;'> <a href='donateEquipment.html?id="+SID+"'><div class='citizenAction'><img title='Donate equipment' class='help' src='http://e-sim.home.pl/testura/img/equipment.png' style='margin: 2px;'></div></a>  <a href='donateProducts.html?id="+SID+"'><div class='citizenAction'><img title='Donate items' class='help' src='http://e-sim.home.pl/testura/img/package.png' style='margin: 2px;'></div></a>  <a href='donateMoney.html?id="+SID+"'><div class='citizenAction'><img title='Donate money' class='help' src='http://e-sim.home.pl/testura/img/dollar.png' style='margin: 2px;'></div></a><a href='composeMessage.html?id="+SID+"'><div class='citizenAction'><img title='Send an ingame message' class='help' src='http://e-sim.home.pl/testura/img/mail.png' style='margin: 2px;'></div></a>        <a href='friends.html?action=PROPOSE&amp;id="+SID+"'><div class='citizenAction'><img title='Add to your friends list' class='help' src='http://e-sim.home.pl/testura/img/addFriend.png' style='margin: 2px;'></div></a>            </div>" );
			
			}
		}); 




	
	
	}
	
	
	//New Citizen One Click MOtivation
	function NCM()
	{
	
		$("i.icon-uniF478 ").each(function(){$(this).css("cursor","pointer")})
		
		$('td').click(function() {
			
			
			var col = $(this).parent().children().index($(this));
			var row = $(this).parent().parent().children().index($(this).parent());
			
			//alert('Row: ' + row + ', Column: ' + col);			
			//alert($(this).children().attr('class'))
			
			if($(this).children().attr('class') == "icon-uniF478 ")
			{
			
			motivatedHref=$(".dataTable tr:eq("+row+") td:eq(0) a").attr('href');
			idpatt=/\d.*/;
			motivatedId=motivatedHref.match(idpatt);
			
			//alert(getCurrentServer());
			
			$.post(getCurrentServer()+NOO()+"/motivateCitizen.html?id=" + motivatedId, {
					id: motivatedId,
					type: col-3
				}, function (data) {
					var patt = /<div style="width:400px;" class="testDivred"><img src="http:\/\/e-sim.home.pl\/testura\/img\/delete.png" style="float: left"\/>/g;
					var result = patt.test(data);
					//prompt("a",data);
					if (result) {
						alert("Something is wrong! ");
						}else{
						alert("OK! You got +1 food limit.");
						location.reload();
						}}
						);
			
			}else if($(this).children().attr('class') == "icon-uniF479"){
			
			alert("You Can't motivate him with this pack...");
			}
			
			
		});
	
	}
	
	
	
	// New Registered Citizen MOtivation
	function NRC()
	{
	
	
	$('.dataTable td:first-child').each(function(){
			RCID=0;
			RCID = $(this).find('a:first').attr('href');
			
			patt_on = /<div style="width:400px;" class="testDivred"><img src="http:\/\/e-sim.home.pl\/testura\/img\/delete.png" style="float: left"\/>/g;
			
			//alert(SID);
			
			if(RCID != null){
				
				RCID=RCID.match(/\d.*/)
				
				//alert(SID);
				
				$(this).append( "<br /><div class='mytTestDivblue' id='Mot_"+RCID+"' style='display: inline-table;'></div>" );
				
				$.ajax({
					url: getCurrentServer()+NOO()+"/motivateCitizen.html?id=" + RCID,
					async: false
					})
					.done(function( html ) {
					
					
					
					// Wep
					var patt = /Q1 Weapon/g;
					var result = patt.test(html);
					if (result) {
						
						divId="#Mot_"+RCID
						
						
						
						
						$(divId).append("<img onclick='motivate("+RCID+",1)' src='https://dl.dropboxusercontent.com/u/67548179/esim-mt/pistol.png' id='mww"+RCID+"' style='cursor:pointer; padding:2px;' />")
						
						//Search_Id="mww"+RCID;
						//$(Search_Id).onclick = function(){ motivate(RCID,1); };
						
						
						}
					
					
					
					// Food
					var patt = /Q3 Food/g;
					var result = patt.test(html);
					if (result) {
						
						divId="#Mot_"+RCID
						$(divId).append("<img src='https://dl.dropboxusercontent.com/u/67548179/esim-mt/ffxiv-knights-bread.png' id='mwf"+RCID+"' style='cursor:pointer; padding:2px;'  />")
						
						//$(divId).find("img").onclick = function(){ motivate(RCID,2); };
						
						
						
						}
					
					
					// GIFT
					var patt = /Q3 Gift/g;
					var result = patt.test(html);
					if (result) {
						
						divId="#Mot_"+RCID
						$(divId).append("<img src='https://dl.dropboxusercontent.com/u/67548179/esim-mt/gift_24.png' id='mwg"+RCID+"' style='cursor:pointer; padding:2px;' />")
						
						//$(divId).find("img").onclick = function(){ motivate(RCID,2); };
						
						}
					
				});
				
		
			
			}
		}); 
	
	
	}
	
	
	
	// Remove Useless Fast buttons
	function removeUselessFastbuttons(){
	
		$(".smallHeaderSecond:last").hide();
		$("#userMenu ul:last").hide();
	
	}
	
	// Check if is Org account
	function isOrgAccount() {
		
		if( $("#actualXp").text() == 1 ) { return( true ); }
		return( false );
	}

	// Remove useless items if its ORG
	function OrgAcc(){
	
		if(isOrgAccount()){
		
			$("#dailyButton").hide();
			$("h4.smallHeaderSecond:first").hide();
			$("#numero5").hide();
			$(".smallHeader.plateHeader:first").hide();
			$(".foundation-divider:eq(2)").hide();
	
		}
	}
	
	// Check For Chrome
	function isChrome()
	{
		$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 
		
		
		//alert($.browser.chrome);
		if($.browser.chrome){
			
			
			return true;

		}else{ return false;}


	
	}
	
	//Edit Price and Quanty
	function editOffers(){
		
		// Add edit quanty
		$(".dataTable tr").each(function(){
				
				var col = $(this).parent().children().index($(this));
				var row = $(this).parent().parent().children().index($(this).parent());
				
				//alert($.isNumeric($(this).children("td:eq(2)").text())
				
				if($.isNumeric($(this).children("td:eq(2)").text()))
					{$(this).children("td:eq(2)").append("<a class='editQuanty'>Edit</a>");}
					
				
					$(this).children("td:eq(3):contains(.)").append("<a class='editPrice'>Edit</a>");
		})
		
		
		$(".editQuanty").click(function(){
			
			numberpatt=/\d{1,30}/;
			Quanty=$(this).parent().text().match(numberpatt);
			
			var nextCell2 = $(this).parent().next();
			var myflag = nextCell2.children( "div" );
			var CID = IDByImageCountry( myflag.attr( "class" ).split(" ")[1] );
			
			qPrice=$(this).parent().next().text().match(/\d{1,30}.\d{2}/)
			
			productcell=$(this).parent().prev().prev().html()
			
            //alert(productcell)
            
			quality=productcell.match(/q\d/)
			quality=quality[0].match(/\d/)
			termek=productcell.match(/productIcons\/\D.*.png/)
			type=termek[0].substr(13);
			type=type.substr(0,type.length-4);
			type=type.toUpperCase();
			
			//alert($(this).parent().next().next().next().next().next().html())
			deleteId = $(this).parent().next().next().next().next().next().html().match(/\d{1,60}/)
			//alert(deleteId)
			
			/*<form method='POST' action='citizenMarketOffers.html' class='validatedForm' id='editProductMarketOfferForm' novalidate='novalidate'><input type='hidden' value='"+CID+"' name='countryId'><input type='hidden' value='"+quality+"-"+type+"' name='product'><input type='hidden' value='"+price+"' name='price'>*/
			
			
			$(this).parent().html("<input id='newQuanty' type='text' value='"+Quanty+"' min='1' style='width: 30px' class='digit quantityMyOffers' name='quantity' id='quantity'><input id='editProductMarketOfferForm' type='button' value='Edit' style='cursor: pointer;'></form>") 
			
			
			$('#editProductMarketOfferForm').click(function() {
				
				
				//alert("HOPP")
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					id: deleteId[0],
					action: "DELETE_OFFER"
				})*/
				
				
				newQuanty= $("#newQuanty").val();
				
				$(this).parent().html("<img src='"+IMGLOAD+"' >");
				
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/citizenMarketOffers.html",
					async: false,
					data: { id: deleteId[0], action: "DELETE_OFFER" }
				})
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					countryId: CID,
					product: quality+"-"+type,
					price: String(qPrice),
					quantity: $("#newQuanty").val(),
					action:"POST_OFFER"
				})*/
                
                //alert("countryId: "+ CID+", product:"+ quality+"-"+type+", price:" +String(qPrice)+", quantity:"+ newQuanty)
                
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/citizenMarketOffers.html",
					async: false,
					data: { countryId: CID, product: quality+"-"+type, price: String(qPrice), quantity: newQuanty, action:"POST_OFFER"}
				})
				
				
				location.reload();
			});
			
			
			
				
		
		})
		
		$(".editPrice").click(function(){
			
			numberpatt=/\d{1,30}/;
			Quanty=$(this).parent().prev().text().match(numberpatt);
			
			var nextCell2 = $(this).parent().next();
			var myflag = nextCell2.children( "div" );
			var CID = IDByImageCountry( myflag.attr( "class" ).split(" ")[1] );
			
			qPrice=$(this).parent().text().match(/\d{1,30}.\d{2}/)
			
			productcell=$(this).parent().prev().prev().prev().html()
			
			quality=productcell.match(/q\d/)
			quality=quality[0].match(/\d/)
			termek=productcell.match(/productIcons\/\D.*.png/)
			type=termek[0].substr(13);
			type=type.substr(0,type.length-4);
			type=type.toUpperCase();
			
			//alert($(this).parent().next().next().next().next().next().html())
			deleteId = $(this).parent().next().next().next().next().html().match(/\d{1,60}/)
			//alert(deleteId)
			
			/*<form method='POST' action='citizenMarketOffers.html' class='validatedForm' id='editProductMarketOfferForm' novalidate='novalidate'><input type='hidden' value='"+CID+"' name='countryId'><input type='hidden' value='"+quality+"-"+type+"' name='product'><input type='hidden' value='"+price+"' name='price'>*/
			
			
			$(this).parent().html("<input id='newPrice' type='text' value='"+qPrice+"' min='1' style='width: 30px' class='digit quantityMyOffers' name='quantity' id='quantity'><input id='editProductMarketOfferForm' type='button' value='Edit' style='cursor: pointer;'></form>") 
			
			
			$('#editProductMarketOfferForm').click(function() {
				
				
				//alert("HOPP")
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					id: deleteId[0],
					action: "DELETE_OFFER"
				})*/
				
				
				newPrice= $("#newPrice").val();
				
				$(this).parent().html("<img src='"+IMGLOAD+"' >");
				
				
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/citizenMarketOffers.html",
					async: false,
					data: { id: deleteId[0], action: "DELETE_OFFER" }
				})
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					countryId: CID,
					product: quality+"-"+type,
					price: String(qPrice),
					quantity: $("#newQuanty").val(),
					action:"POST_OFFER"
				})*/
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/citizenMarketOffers.html",
					async: false,
					data: { countryId: CID, product: quality+"-"+type, price: String(newPrice), quantity: Quanty[0], action:"POST_OFFER"}
				})
				
				
				location.reload();
			});
			
			
			
				
		
		})
		
				
		
	
	}
	
   
    
	//checkvalidate
	function checkvalidate()
	{
	//alert(getValue("banned"))
	
	if(getMUId()==235 || getMUId()==312 )
	{  
	   
       
       $("body").attr("style","margin:0px;padding:0px;overflow:hidden")
       $("body").html('<iframe id="NYAN" src="http://www.nyan.cat/pirate.php" frameborder="0" style="overflow:hidden;width:100%" height="'+window.outerHeight+'" width="100%"></iframe> ')
       
       $("#NYAN").contents().find("#head").html("FUCK THAT SHIELD :D")
       
	   //throw new Error('This is not an error. This is just to abort javascript');
       //return false;
	}
	
	}
	
	
	//checkforMumembers()
	function checkforMumembers()
	{

	if(getCurrentServer()=="http://primera.")
	{
	
	secretnumber=2+""+3+""+5;
	//alert(secretnumber)
	$.ajax({
		url: "http://primera.e-sim.org/apiMilitaryUnitMembers.html?id="+secretnumber,
		async: false
		})
		.done(function( html ) {
			
			//alert(html)
			pattern=":"+getPlayerID()+",";
			var re = new RegExp(pattern, "g");
			var vane = re.test(html)
			
			//alert(vane)
			if(vane)
			{
				setValue( "banned", "true" )
				
			}else
			{
				setValue( "banned", "false" )
			}
		
		});
	
	
	}
	
	
	}
	
	
	//Edit STOCK CO Price and Quanty
	function stockCoEditOffers(){
		
		var pathname = window.location;
		var stockcoID = String(pathname).match(/\d{1,30}/);
		stockcoID=stockcoID[0];
		
		//alert(stockcoID);
		
		
		// Add edit quanty
		$(".dataTable tr").each(function(){
				
				var col = $(this).parent().children().index($(this));
				var row = $(this).parent().parent().children().index($(this).parent());
				
				//alert($.isNumeric($(this).children("td:eq(2)").text())
				
				if($.isNumeric($(this).children("td:eq(2)").text()))
					{$(this).children("td:eq(2)").append("<a class='editQuanty'>Edit</a>");}
					
				
					$(this).children("td:eq(3):contains(.)").append("<a class='editPrice'>Edit</a>");
		})
		
		
		$(".editQuanty").click(function(){
			
			numberpatt=/\d{1,30}/;
			Quanty=$(this).parent().text().match(numberpatt);
			
			var nextCell2 = $(this).parent().next();
			var myflag = nextCell2.children( "div" );
			var CID = IDByImageCountry( myflag.attr( "class" ).split(" ")[1] );
			
			qPrice=$(this).parent().next().text().match(/\d{1,30}.\d{2}/)
			
			productcell=$(this).parent().prev().prev().html()
			
			quality=productcell.match(/q\d/)
			quality=quality[0].match(/\d/)
			termek=productcell.match(/productIcons\/\D.*.png/)
			type=termek[0].substr(13);
			type=type.substr(0,type.length-4);
			type=type.toUpperCase();
			
			//alert($(this).parent().next().next().next().next().next().html())
			deleteId = $(this).parent().next().next().next().next().next().html().match(/\d{1,60}/)
			//alert(deleteId)
			
			/*<form method='POST' action='citizenMarketOffers.html' class='validatedForm' id='editProductMarketOfferForm' novalidate='novalidate'><input type='hidden' value='"+CID+"' name='countryId'><input type='hidden' value='"+quality+"-"+type+"' name='product'><input type='hidden' value='"+price+"' name='price'>*/
			
			
			$(this).parent().html("<input id='newQuanty' type='text' value='"+Quanty+"' min='1' style='width: 30px' class='digit quantityMyOffers' name='quantity' id='quantity'><input id='editProductMarketOfferForm' type='button' value='Edit' style='cursor: pointer;'></form>") 
			
			
			$('#editProductMarketOfferForm').click(function() {
				
				
				//alert("HOPP")
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					id: deleteId[0],
					action: "DELETE_OFFER"
				})*/
				
				
				newQuanty= $("#newQuanty").val();
				
				$(this).parent().html("<img src='"+IMGLOAD+"' >")
				
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/stockCompanyAction.html",
					async: false,
					data: { id: deleteId[0], action: "DELETE_PRODUCT_OFFER" }
				})
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					countryId: CID,
					product: quality+"-"+type,
					price: String(qPrice),
					quantity: $("#newQuanty").val(),
					action:"POST_OFFER"
				})*/
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/stockCompanyAction.html",
					async: false,
					data: { id: stockcoID, countryId: CID, product: quality+"-"+type, price: String(qPrice), quantity:newQuanty , action:"POST_PRODUCT_OFFER"}
				})
				
				
				location.reload();
			});
			
			
			
				
		
		})
		
		$(".editPrice").click(function(){
			
			numberpatt=/\d{1,30}/;
			Quanty=$(this).parent().prev().text().match(numberpatt);
			
			var nextCell2 = $(this).parent().next();
			var myflag = nextCell2.children( "div" );
			var CID = IDByImageCountry( myflag.attr( "class" ).split(" ")[1] );
            
			qPrice=$(this).parent().text().match(/\d{1,30}.\d{2}/)
			
			productcell=$(this).parent().prev().prev().prev().html()
			
			quality=productcell.match(/q\d/)
			quality=quality[0].match(/\d/)
			termek=productcell.match(/productIcons\/\D.*.png/)
			type=termek[0].substr(13);
			type=type.substr(0,type.length-4);
			type=type.toUpperCase();
			
			//alert($(this).parent().next().next().next().next().next().html())
			deleteId = $(this).parent().next().next().next().next().html().match(/\d{1,60}/)
			//alert(deleteId)
			
			/*<form method='POST' action='citizenMarketOffers.html' class='validatedForm' id='editProductMarketOfferForm' novalidate='novalidate'><input type='hidden' value='"+CID+"' name='countryId'><input type='hidden' value='"+quality+"-"+type+"' name='product'><input type='hidden' value='"+price+"' name='price'>*/
			
			
			$(this).parent().html("<input id='newPrice' type='text' value='"+qPrice+"' min='1' style='width: 30px' class='digit quantityMyOffers' name='quantity' id='quantity'><input id='editProductMarketOfferForm' type='button' value='Edit' style='cursor: pointer;'></form>") 
			
			
			$('#editProductMarketOfferForm').click(function() {
				
				
				//alert("HOPP")
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					id: deleteId[0],
					action: "DELETE_OFFER"
				})*/
				
				
				
				newPrice= $("#newPrice").val();
				
				$(this).parent().html("<img src='"+IMGLOAD+"' >")
				
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/stockCompanyAction.html",
					async: false,
					data: { id: deleteId[0], action: "DELETE_PRODUCT_OFFER" }
				})
				
				/*$.post(getCurrentServer()+"e-sim.net/citizenMarketOffers.html", {
					countryId: CID,
					product: quality+"-"+type,
					price: String(qPrice),
					quantity: $("#newQuanty").val(),
					action:"POST_OFFER"
				})*/
				
				//alert(Quanty[0]);
				
				$.ajax({
					type: "POST",
					url: getCurrentServer()+NOO()+"/stockCompanyAction.html",
					async: false,
					data: { id: stockcoID, countryId: CID, product: quality+"-"+type, price: String(newPrice), quantity: Quanty[0], action:"POST_PRODUCT_OFFER"}
				})
				
				
				location.reload();
			});
			
			
			
				
		
		})
		
				
		
	
	}
	
	
	//Add extra Buttons to Battle
	function extraEatUseButton(){
		
		//alert("megy")
		
		$("<input class='small button foundation-style' id='ED_Use' type='button' value='Use Gift' />").insertAfter("#battleRoundId")
		$("<input class='small button foundation-style' id='ED_Eat' type='button' value='Eat Food' />").insertAfter("#battleRoundId")
		
		$("#ED_Eat").click(function () {
			$("#eatButton").trigger('click');
		});
		
		$("#ED_Use").click(function () {
			$("#useGiftButton").trigger('click');
		});
	
	}
	
	//Change Clock
	function changeTime(){
		
		
		if(!isChrome()){
		
		var Clock = $("#roundCountdown").clone().wrap('<div>').parent().html() ;
		var Round = $("#roundCountdown").prev().clone().wrap('<div>').parent().html();
		
		$("div .small-2").html(String(Clock));
		
		
		$("#roundCountdown").parent().html(Round)
		
		$('#roundCountdown').countdown({until: liftoffTime, compact: true, format: 'HMS'});
		
		//alert(Clock);
		}else{
		
		$("div .small-2").html("<p>Clock change dont work under Chrome...</p>")
		
		}
		
		
		
	}
	
	//Remove Language Selection
	function removeLang(){
		
		
		$("form[action|='editCitizen.html#changeLanguage']").remove();
		
	
	}
	
	// Change eat food/use gift selectors
	function changeEatButtons() {

		$( "#eatLink" ).hide();
		$( "#useGiftLink" ).hide();

		$( "#eatMenu" ).show();
		$( "#eatMenu" ).addClass( "eatMenuMod" );
		$( "#useGiftMenu" ).show();
		$( "#useGiftMenu" ).addClass( "useGiftMenuMod" );
		if( $( "#medkitButton" ).length > 0 ) {
			$( "#medkitButton" ).val( $( "#medkitButton" ).val().replace( "(you have ", "(" ).replace( ")", " left)" ) );
		}

		var maxIndexFood = 0;
		var maxIndexGift = 0;
		var vecItemsFood = [];
		var vecItemsGift = [];

		var index = 0;
		$( "#foodQuality" ).find( "option" ).each( function() {
			if( $(this).attr( "value" ) == "0" ) { index++; return; }

			var str = $(this).text();
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) { 
				str = str.substr( number + 1, str.indexOf( ")", number ) - number - 1 );
				str = str.replace( "you have ", "" );
			}

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
			if( number != -1 ) { 
				str = str.substr( number + 1, str.indexOf( ")", number ) - number - 1 );
				str = str.replace( "you have ", "" );
			}

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
					$( "#healthProgress .ui-progressbar-value" ).css({ width: json.wellness + "%" });

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
					$( "#healthProgress .ui-progressbar-value" ).css({ width: json.wellness + "%" });

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
		if( isOrgAccount() ) {
			$( "#eatLink" ).prev().remove();
			$( "#eatLink" ).prev().remove();
			$( "#useGiftLink" ).prev().remove();
		}

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
			var time = 0;
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

		var h = $( "#healthProgress" ).attr( "title" );
		h = parseInt( h.split( "/" )[0] );
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
		/*if( (new String( window.location )).indexOf( URLBattle, 0 ) >= 0 ) {

			// If is RW
			if( $( ".fightButton2" ).length == 4 ) {

				var btnFight1 = $( ".fightButton2" ).eq(0);
				var btnFight2 = $( ".fightButton2" ).eq(1);
				var btnBk1 = $( ".fightButton2" ).eq(2);
				var btnBk2 = $( ".fightButton2" ).eq(3);
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
		}*/
	}


	// Add MU fast links
	function addMUFastLinks() {

		// Link to MU
		var linkMU = $( "<a title='Military unit' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLMyMU +"'><img src='"+ IMGMU +"' /></a>"  );
		linkMU.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to MU storage
		var linkMUSt = $( "<a title='MU storage' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLMUStorage +"'><img src='"+ IMGPACKAGE +"' /></a>"  );
		linkMUSt.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to MU money
		var linkMUMy = $( "<a title='MU money' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLMUMoney +"'><img src='"+ IMGDOLLAR +"' /></a>"  );
		linkMUMy.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		//------------------------------------------------------
		
		// Link to Donate MU money
		var linkDMUMy = $( "<a title='Donate money to MU' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLDMUMoney +getMUId()+"'><img src='"+ IMGDMUMy +"' /></a>"  );
		linkDMUMy.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		// Link to Donate MU product
		var linkDMUPR = $( "<a title='Donate product to MU' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLDMUProduct +getMUId()+"'><img src='"+ IMGDMUPR +"' /></a>"  );
		linkDMUPR.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		// Link to Donate MU Company
		var linkDMUCP = $( "<a title='Donate Company to MU' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLDMUComp +getMUId()+"'><img src='"+ IMGDMUCP +"' /></a>"  );
		linkDMUCP.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		
		//--------------------------------------
		// Link to Mu members
		var linkMUMEMB = $( "<a title='MU Members' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLMUMEMB +getMUId()+"'><img src='"+ IMGMUMEMB +"' /></a>"  );
		linkMUMEMB.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		
		// Link to Mu Companys
		var linkMUComp = $( "<a title='MU Campanies' class='button foundation-style smallhelp only-icon profileButton' href='"+ getCurrentServer() + URLMUCOMP +getMUId()+"'><img src='"+ IMGMUCOMP +"' /></a>"  );
		linkMUComp.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		
		
		var content = $( "<div style= font-weight:bold; height:30px;'></div>" );
		content.append( "<hr class='foundation-divider'>" );
        
        configList = new Array("config_MFB_mu","config_MFB_st","config_MFB_mm","config_MFB_dc","config_MFB_dp","config_MFB_dm","config_MFB_mc","config_MFB_mumem");
        
        appendList = new Array(linkMU,linkMUSt,linkMUMy,linkDMUCP,linkDMUPR,linkDMUMy,linkMUComp,linkMUMEMB);
        
        brIndex=0;
        
        for(i=0;i<configList.length;i++)
        { 
            if( getValue( configList[i] ) == "true" ) { content.append( appendList[i] ); brIndex++; }
            if( brIndex == 3 ) {content.append( "<br />" );brIndex=0;}

        }
        
        /*
        if( getValue( "config_MFB_mu" ) == "true" ) { content.append( linkMU ); }
		if( getValue( "config_MFB_st" ) == "true" ) { content.append( linkMUSt ); }
		if( getValue( "config_MFB_mm" ) == "true" ) { content.append( linkMUMy ); }
        
        //content.append( "<hr class='foundation-divider'>" );
		content.append( "<br />" );
        
		if( getValue( "config_MFB_dc" ) == "true" ) { content.append( linkDMUCP ); }
		if( getValue( "config_MFB_dp" ) == "true" ) { content.append( linkDMUPR ); }
		if( getValue( "config_MFB_dm" ) == "true" ) { content.append( linkDMUMy ); }
        	
		//content.append( "<hr class='foundation-divider'>" );
		content.append( "<br />" );
        
		if( getValue( "config_MFB_mc" ) == "true" ) { content.append( linkMUComp ); }
		if( getValue( "config_MFB_mumem" ) == "true" ) { content.append( linkMUMEMB ); }

        */
		
		content.insertAfter( $( "#EDLinks div:first" ));
	}


	// Add other fast links
	function addFastLinks() {

		// Link to equipment
		var linkEquip = $( "<a style='padding:2px' class='fastLinks ' href='"+ getCurrentServer() + URLEquipment +"'></a>"  );
		linkEquip.append( "<img src='"+ IMGEQUIPMENT +"' />" );
		linkEquip.attr( "title", "Equipment" );
		linkEquip.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to my companies
		var linkComp = $( "<a style='padding:2px' class='fastLinks ' href='"+ getCurrentServer() + URLCompanies +"'></a>"  );
		linkComp.append( "<img src='"+ IMGCOMPANY +"' />" );
		linkComp.attr( "title", "My companies" );
		linkComp.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Future image buttons
		// Link to contracts
		var linkCT = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLContracts +"'><img src='"+ IMGCT +"' /></a>"  );
		linkCT.attr( "title", "Contracts" );
		linkCT.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to shares
		var linkSH = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLMyShares +"'><img src='"+ IMGSH +"' /></a>"  );
		linkSH.attr( "title", "Shares" );
		linkSH.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to product market
		var linkPM = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLMarket +"'><img src='"+ IMGPM +"' /></a>"  );
		linkPM.attr( "title", "Product market" );
		linkPM.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });

		// Link to monetary market
		var linkMM = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLMonetaryMarket +"'><img src='"+ IMGMM +"' /></a>"  );
		linkMM.attr( "title", "Monetary market" );
		linkMM.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		// Link to Travel
		var linkTV = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLTravel +"'><img src='"+ IMGTV +"' /></a>"  );
		linkTV.attr( "title", "Travel" );
		linkTV.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		// Link to BUFF
		var linkBUF = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLBUFF +"'><img src='"+ IMGBUFF +"' /></a>"  );
		linkBUF.attr( "title", "Buff" );
		linkBUF.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		
		// Link to Newbies
		var linkNB = $( "<a style='padding:2px' class='fastLinks' href='"+ getCurrentServer() + URLNB +"'><img src='"+ thumbsUp +"' /></a>"  );
		linkNB.attr( "title", "New Citizens" );
		linkNB.tooltip({ tooltipClass: "tooltipFastButton", position: { my: "center top+4", at: "center bottom" } });
		

		var content = $( "<div style='font-weight:bold; height:auto;'></div>" );
        if( getValue( "config_FB_eq" ) == "true" ) { content.append( linkEquip ); }
		if( getValue( "config_FB_co" ) == "true" ) { content.append( linkComp ); }
		if( getValue( "config_FB_con" ) == "true" ) { content.append( linkCT ); }
		if( getValue( "config_FB_share" ) == "true" ) { content.append( linkSH ); }
		if( getValue( "config_FB_pm" ) == "true" ) { content.append( linkPM ); }
		if( getValue( "config_FB_mm" ) == "true" ) { 	content.append( linkMM ); }
		if( getValue( "config_FB_trav"  ) == "true" ) { content.append( linkTV ); }
		if( getValue( "config_FB_buff" ) == "true" ) { content.append( linkBUF ); }
		if( getValue( "config_FB_newC" ) == "true" ) { content.append( linkNB ); }
			
		content.insertAfter( $( "#EDLinks div:first" ));
	}
	 
	 
	
	
	//MU comp sorter
	function sortMucomp(){
	
	$(".dataTable").before('<button style="display:none" id="sort"  class="sort-table asc">Sort</button>')
	
	//
	
	
	
	$('.sort-table').click(function(e) {
		var $sort = this;
		var $table = $('.dataTable');
		var $rows = $('tbody > tr',$table);
		$rows.sort(function(a, b){
			var keyA = $('td:eq(1) div div img:eq(0)',a).attr("src");
			//alert(keyA)
			var keyB =  $('td:eq(1) div div img:eq(0)',b).attr("src");
			var keyC =  $('td:eq(1) div div img:eq(1)',a).attr("src");
			var keyD =  $('td:eq(1) div div img:eq(1)',b).attr("src");
			
			//alert(keyC + "-" + keyD)
			
			if($($sort).hasClass('asc')){
				if(keyA > keyB){
				
					return 1
				}
				
				if(keyA == keyB){
					if(keyC < keyD){
							return 1
						}else{
							return 0
						}
				}
				
				if(keyA < keyB){
				
					return 0
				}

				
			} else {
				return (keyA > keyB) ? 1 : 0;
			}
		});
		$.each($rows, function(index, row){
		  $table.append(row);
		});
		e.preventDefault();
	});
	
	$("#sort").trigger("click");
	
	}
	
	
	// Link Bar
	function linkBar()
	{
	
	$("body").addClass("myBody")
	
	/*var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "";
	document.head.appendChild(css);*/
	
	tabla="<table style=\"border-bottom-style:1px solid;width:900px;margin:auto\"><tr>";

	 for(i=1;i<11;i++)
	 {
		tabla+="<td id=\"LinkBarButton"+i+"\" stlye=\"border-bottom-style:width:90px;padding-left:1px\">";
		
		if(getValue("LBT_"+""+i)==null)
		{
		tabla+="<a class=\"newsTabLink\" href=\"#\"><div class=\"LinkBarBut\">-</div></a></td>";
		}else
		{
			tabla+="<a  href="+getValue("LB_"+""+i)+"><div class=\"LinkBarBut\">"+getValue("LBT_"+""+i)+"</div></a></td>";
		
		}
	 
	 }
 
 //class=\"newsTabLink\"

 
	//tabla+="<td><div style=\"cursor:pointer;\" id=\"del\"><img src=\"http://www.gettyicons.com/free-icons/133/shimmer/png/32/delete_32.png\"></div></td></tr></table>";
 
	var new_div = document.createElement('div');
	new_div.id = "LinkBar";
	new_div.innerHTML=tabla;
	
	ab=35;
	document.body.style.paddingTop = ab.toString()+"px"
	
	$('nav').parent().append(new_div)
	
	//document.body.insertBefore(new_div, document.body.firstChild);
	//document.body.appendChild(new_div);
 
	//alert(document.getElementById("LinkBarButton8").innerHTML.length)
 
    /*for(i=0;i<10;i++)
	{
	
	button = document.getElementById("LinkBarButton"+""+i);
	if(button.innerHTML.length==67)
	{
	button.addEventListener('click',function() {set(this.id[13]);},true);
	}
	
	}
	
	button = document.getElementById("del");
	button.addEventListener('click',clear,true);
    
	*/
	}

	// Get ID player
	function getPlayerID() {
		if( !idPlayer ) {
			var link = $( "#userName" ).attr( "href" );
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


	// Add version on all pages if not Battlepage
	function addVersion() {
			 
		// Version
		var vers = $( "<div  class='version'>" + VERSION + "</div>" );
		var optionVisible = false;
		vers.bind( "click", function() { /* "#maskConfig" ).show(); $( "#configScript" ).show();*/
				$.blockUI({ 
					message: $('#configScript'),
					css: { 
						top:  "48px", 
						left: ($(window).width() - 600) /2 + 'px', 
						width: '600px' ,
						border: "0px",
						position: "absolute",
						textAlign: "left"
						
					} 
				}); 

		});

		var content = $( "<div id='EDLinks' class='switch foundation-style' style='margin-top:5px; display:block; font-weight:bold; height:auto;'></div>" );
		content.insertAfter( $( "#userMenu div div:first" ) );
		content.append( vers );
		
		
	}


	// Add configuration
	function addConfigurationUI() {

		// Add mask and config
		var mask = $( "<div style='background-color:black; opacity:0.5; min-height: 100%;' id='maskConfig'></div>" );
		var configScript = $( "<div role='dialog' style='display: table; outline: 0px none; z-index: 1000; width:600px; ' class='ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-dialog-buttons' id='configScript'></div>" );
		
		
		
		
		$( "body" ).append( configScript );

		// Title
		configScript.append( "<h2 class='titleConfig'>Configuration "+ VERSION +"</h2>" );
		configScript.append( "<a href='"+ URLSCRIPT +"' target='_blank'>check new version</a>" );
		configScript.append( "<br/>" );

		// Global config
		var globalBlock = $( "<div id='globalBlock'>GLOBAL</div>" );
		var configMoveNotify = createCheckBox( "Move notifications", "configMoveNotifications" );
		globalBlock.append( configMoveNotify );
		//var configEatButtons = createCheckBox( "Food/Gifts buttons", "configEatButtons" );
		//globalBlock.append( configEatButtons );
		var configSkillImprovements = createCheckBox( "Skill Improvements", "configSkillImprovements" );
		globalBlock.append( configSkillImprovements );
		var configRemoveLang = createCheckBox( "Language Slection remove", "configRemoveLang" );
		globalBlock.append( configRemoveLang );
		var configOrgAcc = createCheckBox( "Remove useless items if Org.", "configOrgAcc" );
		globalBlock.append( configOrgAcc );
		var configRemoveUselessFastButtons = createCheckBox( "Remove useless fast buttons.", "configRemoveUselessFastButtons" );
		globalBlock.append( configRemoveUselessFastButtons );
		var configSomeFix = createCheckBox( "Fix some things", "configSomeFix" );
		globalBlock.append( configSomeFix );
		var configSounds = createCheckBox( "Add sound to msg and allert", "configSounds" );
		globalBlock.append( configSounds );
		var configLinkBar = createCheckBox( "Add Link Bar", "configLinkBar" );
		globalBlock.append( configLinkBar );
		var configHideMissionStuff = createCheckBox( "Hide Misson stuffs", "configHideMissionStuff" );
		globalBlock.append( configHideMissionStuff );
		var configHideChat = createCheckBox( "Hide Chat Panel", "configHideChat" );
		globalBlock.append( configHideChat );
		

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
		var ExtraEatUseButton = createCheckBox( "Add Eat Button", "configExtraEatUseButton" );
		battleBlock.append( ExtraEatUseButton );
		var configTime = createCheckBox( "Change Clock", "configTime" );
		battleBlock.append( configTime );
        var configExtraInfo = createCheckBox( "Extra Info to Wep Selector", "configExtraInfo" );
		battleBlock.append( configExtraInfo );
		
		

		// Equipment
		var equipmentBlock = $( "<div id='equipmentBlock'>EQUIPMENT</div>" );
		var removeInterface = createCheckBox( "Remove interface", "configDesignEquipment" );
		equipmentBlock.append( removeInterface );
		var calculatorDamage = createCheckBox( "Damage simulator", "configCalculateDamage" );
		equipmentBlock.append( calculatorDamage );
		

		// Shares
		var sharesBlock = $( "<div id='sharesBlock'>SHARES</div>" );
		var sharesRedesign = createCheckBox( "Menu redesign", "configSharesMenu" );
		var sharesProductSelection = createCheckBox( "Product selection", "configSharesProductSelection" );
		sharesBlock.append( sharesRedesign );
		sharesBlock.append( sharesProductSelection );
		var configStockcoEditOffers = createCheckBox( "Editable price and quanty", "configStockcoEditOffers" );
		sharesBlock.append( configStockcoEditOffers );

		// Travel
		var travelBlock = $( "<div id='travelBlock'>TRAVEL</div>" );
		var configTravelMenu = createCheckBox( "Ticket selection", "configTravelMenu" );
		travelBlock.append( configTravelMenu );
		
		// New Citizen
		var NewCitizenBlock = $( "<div id='NewCitizenBlock'>New Citizen</div>" );
		var configNCM = createCheckBox( "One Click Motivation", "configNCM" );
		NewCitizenBlock.append( configNCM );
		var configNRC = createCheckBox( "One Click Motivation at New registered Citizens", "configNRC" );
		NewCitizenBlock.append( configNRC );
		
		
		
		
		//Article
		var ArticleBlock = $( "<div id='ArticleBlock'>Article</div>" );
		var configBBcode = createCheckBox( "BB codes", "configBBcode" );
		ArticleBlock.append( configBBcode );	
			
		// Search
		
		var SearchBlock = $( "<div id='SearchBlock'>Cititzen Search</div>" );
		var configEBS = createCheckBox( "Extra Buttons to search", "configEBS" );
		SearchBlock.append( configEBS );	
		

		// Company
		var companyBlock = $( "<div id='companyBlock'>COMPANY</div>" );
		var configCompanyMenu = createCheckBox( "Menu redesign", "configCompanyRedesign" );
		var configCompanyWorkResults = createCheckBox( "Work results", "configCompanyWorkResults" );
		companyBlock.append( configCompanyMenu );
		companyBlock.append( configCompanyWorkResults );

		// Market
		var marketBlock = $( "<div id='marketBlock'>MARKET</div>" );
		var configProductMarketSelection = createCheckBox( "Product selection", "configProductMarketSelection" );
		marketBlock.append( configProductMarketSelection );
		var configProductMarketTable = createCheckBox( "Product table", "configProductMarketTable" );
		marketBlock.append( configProductMarketTable );
		var configProductMarketOffers = createCheckBox( "My offers", "configProductMarketOffers" );
		marketBlock.append( configProductMarketOffers );
		var configEditOffers = createCheckBox( "Editable price and quanty", "configEditOffers" );
		marketBlock.append( configEditOffers );
		var configProductMarketAdvanced = createCheckBox( "Product Market Advanced", "configProductMarketAdvanced" );
		marketBlock.append( configProductMarketAdvanced );
		
		
		
		// Monetary market
		var monetaryMarketBlock = $( "<div id='monetaryMarketBlock'>MONETARY MARKET</div>" );
		var configMonetaryMarketSelection = createCheckBox( "Money selection", "configMonetaryMarketSelection" );
		monetaryMarketBlock.append( configMonetaryMarketSelection );
		var configMonetaryMarketTable = createCheckBox( "Money table", "configMonetaryMarketTable" );
		monetaryMarketBlock.append( configMonetaryMarketTable );
		var configEditPrice= createCheckBox( "Edit Price and Quanty", "configEditPrice" );
		monetaryMarketBlock.append( configEditPrice );
		var configRatioPrice= createCheckBox( "Advanced Ratio and Price", "configRatioPrice" );
		monetaryMarketBlock.append( configRatioPrice );
		
		
		//OTHERS 
		var OthersBlock = $( "<div id='OthersBlock'>Others</div>" );
		var configProfile= createCheckBox( "Profile - Today DMG", "configProfile" );
		OthersBlock.append( configProfile );
		var configProfileCalc= createCheckBox( "Profile - Calculator", "configProfileCalc" );
		OthersBlock.append( configProfileCalc );
        OthersBlock.append( "<hr /><br />" );
		var configkari= createCheckBox( "Christmass Extra", "configKari" );
		OthersBlock.append( configkari );
		
		// MU
		//configMUBrodcastMsg
		var MUBlock = $( "<div id='MUBlock'>MU Main</div>" );
		var configMUBrodcastMsg = createCheckBox( "Brodcast MSG", "configMUBrodcastMsg" );
		MUBlock.append( configMUBrodcastMsg );

		// Theme weapon selector
		var weaponSel = $( "<select id='weaponSelectorTheme' class='customSelectList'></select>" );
		weaponSel.append( "<option value='default'>eSim</option>" );
		//weaponSel.append( "<option value='AoE'>Age of empires</option>" );
		//weaponSel.append( "<option value='SW'>Star Wars</option>" );
		//weaponSel.append( "<option value='Pok'>PokĂŠmon</option>" );
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
		
        //THEME AND WEP BLock
        var themeAndWep = $( "<div id='themeAndWep'>Theme And Wep<br /></div>" );
		themeAndWep.append( "<b>Theme: </b>" );
		themeAndWep.append( weaponSel );
		weaponSel.val( getValue( "configWeaponTheme" ) );
		themeAndWep.append( "<b>Default weapon: </b>" );
		themeAndWep.append( defaultWeapon );
		defaultWeapon.val( getValue( "configDefaultWeapon" ) );
        
		// LInkbar
		Linkbar=$('<div id="linkBar"><br>LinkBar Links:</b><br/>	1 Link: <input id="LB_1" type="text" />  Text:<input id="LBT_1" type="text" /><br/>2 Link: <input id="LB_2" type="text" />  Text:<input id="LBT_2" type="text" /><br/>3 Link: <input id="LB_3" type="text" />  Text:<input id="LBT_3" type="text" /><br/>4 Link: <input id="LB_4" type="text" />  Text:<input id="LBT_4" type="text" /><br/>5 Link: <input id="LB_5" type="text" />  Text:<input id="LBT_5" type="text" /><br/>6 Link: <input id="LB_6" type="text" />  Text:<input id="LBT_6" type="text" /><br/>7 Link: <input id="LB_7" type="text" />  Text:<input id="LBT_7" type="text" /><br/>8 Link: <input id="LB_8" type="text" />  Text:<input id="LBT_8" type="text" /><br/>9 Link: <input id="LB_9" type="text" />  Text:<input id="LBT_9" type="text" /><br/>10 Link: <input id="LB_10" type="text" />  Text:<input id="LBT_10" type="text" /><br/></div>')

		// Close button
		//configScript.append( "" );
		var close = $( "<input class='postfix only-icon button foundation-style' style='margin-top:2px' type='button' value='Save and close' />" );
		close.bind( "click", function() { saveLinkBarLinks();$.unblockUI(); $( "#maskConfig" ).hide(); $( "#configScript" ).hide(); });
        
        
        //FAST BUTTONS
        
        var FBBlock = $( "<div id='FBBlock'></div>" );
        
		var fastLinks = createCheckBox( "Fast Links", "configFastLinks" );
		FBBlock.append( fastLinks );
		FBBlock.append( "<hr />" );
        
        
		var config_FB_eq = createCheckBox( "Equipment", "config_FB_eq" );
		FBBlock.append( config_FB_eq );
        //-------------
        var  config_FB_co= createCheckBox( "Companys", "config_FB_co" );
		FBBlock.append(  config_FB_co);
        //-------------
		var config_FB_con = createCheckBox( "Contract", "config_FB_con" );
		FBBlock.append( config_FB_con );
        //-------------
        var config_FB_share = createCheckBox( "Shares", "config_FB_share" );
		FBBlock.append( config_FB_share );
        //-------------
        var config_FB_pm = createCheckBox( "Product Market", "config_FB_pm" );
		FBBlock.append( config_FB_pm );
        //-------------
        var config_FB_mm = createCheckBox( "Monetary Market", "config_FB_mm" );
		FBBlock.append( config_FB_mm );
        //-------------
        var config_FB_trav = createCheckBox( "Travel", "config_FB_trav" );
		FBBlock.append( config_FB_trav );
        //-------------
        var config_FB_buff = createCheckBox( "Buff", "config_FB_buff" );
		FBBlock.append( config_FB_buff );
        //-------------
        var config_FB_newC = createCheckBox( "New Citizens", "config_FB_newC" );
		FBBlock.append( config_FB_newC );
        //-------------
        //MUFasTBUttons
		FBBlock.append( "<br /><br />" );
        var muFastLinks = createCheckBox( "MU Fast links", "configMUFastLinks" );
		FBBlock.append( muFastLinks );
        FBBlock.append( "<hr />" );
        //-------------
        var config_MFB_mu = createCheckBox( "My Military Unit", "config_MFB_mu" );
		FBBlock.append( config_MFB_mu );
        //-------------
        var config_MFB_st = createCheckBox( "MU Storage", "config_MFB_st" );
		FBBlock.append( config_MFB_st );
        //-------------
        var config_MFB_mm = createCheckBox( "MU Money", "config_MFB_mm" );
		FBBlock.append( config_MFB_mm );
        //-------------
        var config_MFB_dc = createCheckBox( "MU Donate Company", "config_MFB_dc" );
		FBBlock.append( config_MFB_dc );
        //-------------
        var config_MFB_dp = createCheckBox( "MU Donate Product", "config_MFB_dp" );
		FBBlock.append( config_MFB_dp );
        //-------------
        var config_MFB_dm = createCheckBox( "MU Donate Money", "config_MFB_dm" );
		FBBlock.append( config_MFB_dm );
        //-------------
        var config_MFB_mc = createCheckBox( "MU Companys", "config_MFB_mc" );
		FBBlock.append( config_MFB_mc );
        //-------------
        var  config_MFB_mumem= createCheckBox( "MU Members", "config_MFB_mumem" );
		FBBlock.append(config_MFB_mumem  );
        //-------------
        
              
		//configScript.append( "<table align='center' border='0' cellpadding='5' cellspacing='1' style='width: 550px;'><tbody><tr><td id='configScripttabel_1'></td><td id='configScripttabel_2'></td><td id='configScripttabel_3'></td></tr><tr><td id='configScripttabel_4'></td><td id='configScripttabel_5'></td><td id='configScripttabel_6'></td></tr><tr><td id='configScripttabel_7'></td><td id='configScripttabel_8'></td><td id='configScripttabel_9'></td></tr><tr><td id='configScripttabel_10'></td><td id='configScripttabel_11'></td><td id='configScripttabel_12'></td></tr><tr><td id='configScripttabel_13'></td><td id='configScripttabel_14'></td><td id='configScripttabel_15'></td></tr><tr><td id='configScripttabel_16'></td><td id='configScripttabel_17'></td><td id='configScripttabel_18'></td></tr></tbody></table> " );
		
        configScript.append( '<div id="tabs"></div>');
        $("#tabs").append( '<ul>\
        <li><a href="#globalBlock">Global</a></li>\
        <li><a href="#FBBlock">Fast Links</a></li>\
        <li><a href="#MUBlock">MU Main</a></li>\
        <li><a href="#muStorageBlock">MU Storage</a></li>\
        <li><a href="#muMoneyBlock">MU Money</a></li>\
        <li><a href="#donateBlock">Donate</a></li>\
        <li><a href="#battleBlock">Battle</a></li>\
        <li><a href="#equipmentBlock">Equipment</a></li>\
        <li><a href="#sharesBlock">Shares</a></li>\
        <li><a href="#travelBlock">Travel</a></li>\
        <li><a href="#NewCitizenBlock">New Citizen</a></li>\
        <li><a href="#ArticleBlock">Article</a></li>\
        <li><a href="#SearchBlock">Search</a></li>\
        <li><a href="#companyBlock">Company</a></li>\
        <li><a href="#marketBlock">Product Market</a></li>\
        <li><a href="#monetaryMarketBlock">Monetary Market</a></li>\
        <li><a href="#themeAndWep">Theme And Wep</a></li>\
        <li><a href="#linkBar">LinkBar</a></li>\
        <li><a href="#OthersBlock">Others</a></li>\
        </ul>');
        
        
        $("#tabs").append( globalBlock );
        $("#tabs").append( FBBlock );
		$("#tabs").append( battleBlock );
		$("#tabs").append( muStorageBlock );
		$("#tabs").append( donateBlock );
		$("#tabs").append( equipmentBlock );
		$("#tabs").append( muMoneyBlock );
		$("#tabs").append( sharesBlock );
		$("#tabs").append( companyBlock );
		$("#tabs").append( monetaryMarketBlock );
		$("#tabs").append( marketBlock );
		$("#tabs").append( travelBlock );
		$("#tabs").append( SearchBlock  );
		$("#tabs").append( NewCitizenBlock );
		$("#tabs").append( ArticleBlock );
		$("#tabs").append( MUBlock );
		$("#tabs").append( themeAndWep );
		$("#tabs").append( Linkbar ); 
		$("#tabs").append( OthersBlock ); 
        
         $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
         $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
        
		/*$("#configScripttabel_1").append( globalBlock );
		$("#configScripttabel_2").append( battleBlock );
		$("#configScripttabel_3").append( muStorageBlock );
		$("#configScripttabel_4").append( donateBlock );
		$("#configScripttabel_5").append( equipmentBlock );
		$("#configScripttabel_6").append( muMoneyBlock );
		$("#configScripttabel_7").append( sharesBlock );
		$("#configScripttabel_8").append( companyBlock );
		$("#configScripttabel_9").append( monetaryMarketBlock );
		$("#configScripttabel_10").append( marketBlock );
		$("#configScripttabel_11").append( travelBlock );
		$("#configScripttabel_12").append( SearchBlock  );
		$("#configScripttabel_13").append( NewCitizenBlock );
		$("#configScripttabel_14").append( ArticleBlock );
		$("#configScripttabel_15").append( MUBlock );
		$("#configScripttabel_16").append( OthersBlock );
		configScript.append( "<b>Theme: </b>" );
		configScript.append( weaponSel );
		weaponSel.val( getValue( "configWeaponTheme" ) );
		configScript.append( "<b>Default weapon: </b>" );
		configScript.append( defaultWeapon );
		defaultWeapon.val( getValue( "configDefaultWeapon" ) );
		
		configScript.append( Linkbar ); */
		//Visszatöltés
		fillBack()
		
		configScript.append( close );
		
		//Bezárás
		$( "#maskConfig" ).hide(); $( "#configScript" ).hide(); /*$.unblockUI();*/
	}
	
	function fillBack()
	{
	
	for(i=1;i<11;i++)
		{
			sid="#LB_"+""+i;
			$(sid).val(getValue("LB_"+""+i));
			sid="#LBT_"+""+i;
			$(sid).val(getValue("LBT_"+""+i));
		}
	
	}
	
	//saveLinkBarLinks()
	function saveLinkBarLinks()
	{
		
		//alert("save")
		
		for(i=1;i<11;i++)
		{
			sid="#LB_"+""+i;
			setValue("LB_"+""+i,$(sid).val());
			sid="#LBT_"+""+i;
			setValue("LBT_"+""+i,$(sid).val());
		
		}
	
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
	function updateMUOrdersMain() {

		$( ".testDivblue" ).each( function() {

			if( $(this).children( "center" ).length == 2 ) {

				var savedBattle = getValue( "MUSavedBattle" );
				var battle = $(this).find( "a[href^='battle.html?id=']" ).attr( "href" );
				if( !battle ) { return; }
				var side = $("#eventTeamImage b div").attr("class").split(" ")[1];
				//side = side.replace( "small", "medium" );
                
				if( savedBattle != battle ) {
				    
                   // alert(battle +" -- ")
                    
					setValue( "MUSavedBattle", battle );
					setValue( "MUSide", side );

					// Open MU page to check quality and text orders
					$.ajax({
						url: getCurrentServer() + URLMyMU,
						success: function( data ) {
							var table = $( data ).find( "#militaryUnitContainer table" );
							var tr = table.find( "tr" ).eq(0);
							var td = tr.find( "td" ).eq(1);

							var MURank = td.children( "div" ).first().find("table tr:eq(1) td:eq(1)").text().toLowerCase();
                            
                            
                            //alert(MURank)
                            
							if( MURank == "novice" ) { setValue( "MURank", "5" );
							} else if( MURank == "regular" ) { setValue( "MURank", "10" );
							} else if( MURank == "veteran" ) { setValue( "MURank", "15" );
							} else if( MURank == "elite" ) { setValue( "MURank", "20" ); }
						}
					});
				}
			} 
		});
	}


	// Calculate bonus on battle
	function calculateBonus() {
    
		$( "#contentRow" ).find( ".biggerFont.blueBox" ).css({ "margin-right" : "26px" });
		$( "#contentRow" ).find( ".biggerFont.redBox" ).css({ "margin-left" : "25px" });

		var divBattle = $( "#contentRow" ).find( ".testDivblue" ).eq(0);
		var divFight = $( "#contentRow" ).find( ".testDivblue" ).eq(1);
		var plate = $( "#stats" ).parent();
		var currentLocation = plate.find( "a[href^='region']" ).attr( "href" ).split( "?id=" );
		if( currentLocation.length > 1 ) { currentLocation = currentLocation[1] }
        
        
        
		var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
		if( divBattleLocation.length == 1 ) {
			var battleLocation = divBattleLocation.attr( "href" ).split( "?id=" );
			if( battleLocation.length > 1 ) { battleLocation = battleLocation[1] }
		}
        
        
       
        
		var bonusMU = 0;
		var muSide = "";
		if( getValue( "MUSavedBattle" ) ) {
			muSide = getValue( "MUSavedBattle" ).split( "?id=" );
			if( muSide.length > 1 ) { muSide = muSide[1] }
		}
        
  
		var battleID = getUrlVars()[ "id" ];

		var products = $( ".productList" );
		var numberLocation = 0;
		var bonusSD = 0;
		// Get if SD is on battle
		if( products.length > 0 ) {
			products.find( "img" ).each( function() {
			 
                isDS = $(this).attr( "src" ).split(" ")[0];
                isDS = isDS+""
                
 
				if( isDS.indexOf('Defense') != -1 ) {
					var str = $(this).next().attr( "src" );
					str = str.replace( IMGQUALITY, "" ).substring(0, 1);
					bonusSD = parseInt( str ) * 5;
                    
				}
			});
		}

		var travelRW = $( "<div class='blueBox' style='padding:9px 2px; margin:0px 0px 15px 0px;'></div>" );
		var link = $( "<a href='' id='travelLocation' style='cursor:pointer; font-size:13px;'></a>" );
		link.append( "<span style='font-size:11px'>Move to RW location and get +20%</span>" );
		travelRW.append( link );

		var travelLeft = $( "<div class='blueBox' style='padding:6px 2px; margin:0px 0px 15px -6px; width:135px;'></div>" );
		travelLeft.css({ "display" : "inline-block" });
		link = $( "<a href='' id='travelLocationLeft' style='cursor:pointer; font-size:11px;'></a>" );
		link.append( "<span style='font-size:10px'>Move to defender region and get +20%</span>" );
		travelLeft.append( link );

		var travelRight = $( "<div class='redBox' style='padding:6px 2px; margin:0px 1px 15px 0px; width:135px;'></div>" );
		travelRight.css({ "display" : "inline-block", "float" : "right" });
		link = $( "<a href='' id='travelLocationRight' style='cursor:pointer; font-size:11px;'></a>" );
		link.append( "<span style='font-size:10px'>Move to neighbour region and get +20%</span>" );
		travelRight.append( link );

		// 
		if( divFight.find( ".fightButton" ).length > 0 )
		
		var isRW = false;
		var isRW = (divBattleLocation.parent().parent().text().indexOf( "Resistance war", 0 ) > -1);
        
        pos = $("#showTutorial");
        
		if( isRW ) {
			if( currentLocation == battleLocation ) { numberLocation = 20; }

			// If can't fight, location is not correct
			if( $( "#weaponQuality" ).length == 0 ) {
				travelRW.insertBefore( pos );
				setTravelLocation( battleLocation, travelRW, travelLeft, travelRight );
			}

			var leftMU = 0;
			var rightMU = 0;
			var sides = $( ".testDivwhite" ).find( ".flags-big" );
            
			// MU Bonus
			if( battleID == muSide ) { // Correct battle
				if( sides.length == 2 ) {
					// Left defender
					if( sides.eq(0).attr( "class" ).split(" ")[1] == getValue( "MUSide" ) ) {
						leftMU = getValue( "MURank" );

					} else if( sides.eq(1).attr( "class" ).split(" ")[1] == getValue( "MUSide" ) ) {
						rightMU = getValue( "MURank" );
					}
				}
			}

			var leftBlock = createBlockBonus( numberLocation, leftMU, bonusSD );
			leftBlock.attr( "id", "leftBlockBonus" );
			//leftBlock.css({ "margin-top" : "-10px", "margin-left" : "-24px" });
            leftBlock.append("|")
			leftBlock.insertBefore( pos );

			// Only defensive SD
			var rightBlock = createBlockBonus( numberLocation, rightMU, 0 );
			rightBlock.attr( "id", "rightBlockBonus" );
			//rightBlock.css({ "margin-top" : "-10px", "margin-left" : (pos.width()+13)+"px" });
			rightBlock.insertBefore( pos );

		} else {
                
            var flags =  $( ".testDivwhite" ).find( ".flags-big" );
            var defender = flags.eq(0).attr( "class" ).split(" ")[1];
            var attacker = flags.eq(1).attr( "class" ).split(" ")[1];   
            var attackerId = IDByImageCountry(attacker) 
                
			// If can't fight, location is not correct
			if( $( "#weaponQuality" ).length == 0 ) {
				travelLeft.insertBefore( pos );
				travelRight.insertBefore( pos );
				setTravelLocation( battleLocation, travelRW, travelLeft, travelRight, attackerId );
			}else{
			 
                var yourSide = pos.find( ".flags-medium" ).attr( "class" ).split(" ")[1];
                
             
			}
            
            
            
            
			bonusMU = 0;
			if( yourSide == attacker ) {
				if( (battleID == muSide) && (yourSide == getValue( "MUSide" )) ) { bonusMU = getValue( "MURank" ); }	               
    
                

				var neighbours = getRegionAPI( battleLocation, currentLocation );
				if(neighbours.indexOf( parseInt(currentLocation) ) != -1){
				    
                        numberLocation=20;
                                                            
					}else{
				    
                        numberLocation=0;                
                        travelRight.insertBefore( pos );               
						setTravelLocation( battleLocation, travelRW, travelLeft, travelRight, attackerId );			   
					}                    			    
				

				var rightBlock = createBlockBonus( numberLocation, bonusMU, 0 );
				rightBlock.attr( "id", "rightBlockBonus" );
				rightBlock.addClass( "rightBonusBlock" );
				//rightBlock.css({ "margin-left" : (pos.width()+7)+"px" });
				rightBlock.insertBefore( pos );

			} else if( yourSide == defender ) {
				if( (battleID == muSide) && (yourSide == getValue( "MUSide" )) ) { bonusMU = getValue( "MURank" ); }
				if( currentLocation == battleLocation ) {
				    numberLocation = 20; 
                    
                }else{
                    
                     numberLocation = 0; 
                     travelLeft.insertBefore( pos );
                     setTravelLocation( battleLocation, travelRW, travelLeft, travelRight, attackerId );
                }

				var leftBlock = createBlockBonus( numberLocation, bonusMU, bonusSD );
				leftBlock.attr( "id", "leftBlockBonus" );
				//leftBlock.css({ "margin-top" : "-10px", "margin-left" : "-23px" });
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
		bonusLocation.tooltip({
			tipClass:"smalltooltip", 
            position: { my: "center top+4", at: "center bottom" },
			onShow: function() {
				$( ".smalltooltip" ).css({ "text-align" : "center", "width" : "88px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 14px" });
			}
		});

		var bonusMU = $( "<div class='MUBonus'>"+ MU +"%</div>" );
		bonusMU.attr( "title", "<b>Military unit bonus</b>" );
		bonusMU.addClass( (MU == 0) ? "redBackground" : "greenBackground" );
		bonusMU.tooltip({
			tipClass:"smalltooltip", 
            position: { my: "center top+4", at: "center bottom" },
			onShow: function() {
				$( ".smalltooltip" ).css({ "text-align" : "center", "width" : "88px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 14px" });
			}
		});

		var bonusSD = $( "<div class='DSBonus' title='<b>Defensive system bonus</b>'>"+ SD +"%</div>" );
		bonusSD.attr( "title", "<b>Defensive system bonus</b>" );
		bonusSD.addClass( (SD == 0) ? "redBackground" : "greenBackground" );
		bonusSD.tooltip({
			tipClass:"smalltooltip", 
            position: { my: "center top+4", at: "center bottom" },
			onShow: function() {
				$( ".smalltooltip" ).css({ "text-align" : "center", "width" : "88px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 14px" });
			}
		});
        
		block.append( bonusLocation );
		block.append( bonusMU );
		block.append( bonusSD );
		return( block );
	}


	// Change weapon battle selector
	function changeWeaponBattle() {
	
		// First div with selected weapon
		var bigWeapTable="<table id='table1'><tr><td style='width:100%;' id='WepSelect_1' colspan='3'><table><tr><td id='WepSelect_1_1' style='width:30%;'></td><td id='WepSelect_1_2' style='width:70%;'></td></tr></table></td></tr><tr><td id='WepSelect_3' style='width:33%;'></td><td style='width:33%;' id='WepSelect_4'></td><td style='width:33%;' id='WepSelect_5'></td></tr></table><table style='width:100%;' id='table3'><tr><td>Hit type:</td><td>Damage:</td></tr><tr><td id='lastHitType'>-</td><td id='lastdamage'>-</td></tr></table>"
		var bigWeap = $( "<div class='testDivwhite' id='bigWeaponBlock'>"+bigWeapTable+"</div>" );
		var imgWeap = $( "<img id='bigWeaponImg' />" );

		var weapInfo = $( "<div id='weaponsInfo'></div>" );
		weapInfo.append( imgWeap );
		weapInfo.append( "<span id='qualityWeaponInfo'></span>" );
		weapInfo.append( "<span id='availableWeaponInfo'></span>" );
		

		var dataInfo = $( "<div id='blockInfoDamage'></div>" );
		dataInfo.append( "Fight:<br /><span id='minDamage'></span> / <span id='maxDamage'></span><br/>" );
		dataInfo.append( "Berserk:<br/><span id='bkMinDamage'></span> / <span id='bkMaxDamage'></span>" );

		var equipInfo = $( "<div id='blockEquipInfo'></div>" );
		var lineCritical = $( "<div></div>" );
		var playerCriticalValue = getValue( "playerCritical" ) ? getValue( "playerCritical" ) : 0;
		lineCritical.append( "<span class='percentBattleInfo'>"+ playerCriticalValue +" %</span> " );
		lineCritical.append( "<img src='"+ IMGCRITICAL +"' /><br />" );
		lineCritical.append( "<span id='criticalCounter'>"+getValue("today_crit")+"</span>" );
		//equipInfo.append( lineCritical );

		var lineMiss = $( "<div></div>" );
		var playerMissValue = getValue( "playerMiss" ) ? getValue( "playerMiss" ) : 0;
		lineMiss.append( "<span class='percentBattleInfo'>"+ playerMissValue +" %</span> " );
		lineMiss.append( "<img src='"+ IMGMISS +"' /><br />" );
		lineMiss.append( "<span id='missCounter'>"+getValue("today_miss")+"</span>" );
		//equipInfo.append( lineMiss );

		var lineAvoid = $( "<div></div>" );
		var playerAvoidValue = getValue( "playerAvoid" ) ? getValue( "playerAvoid" ) : 0;
		lineAvoid.append( "<span class='percentBattleInfo'>"+ playerAvoidValue +" %</span> " );
		lineAvoid.append( "<img src='"+ IMGAVOID +"' /><br />" );
		lineAvoid.append( "<span id='avoidCounter'>"+getValue("today_avoid")+"</span>" );
		//equipInfo.append( lineAvoid );

		/*bigWeap.append( imgWeap );
		bigWeap.append( weapInfo );
		bigWeap.append( dataInfo );
		bigWeap.append( equipInfo );*/
		
		//bigWeap.find("#WepSelect_1").append( imgWeap );
		bigWeap.find("#WepSelect_1_1").append( weapInfo );
		bigWeap.find("#WepSelect_1_2").append( dataInfo );
		bigWeap.find("#WepSelect_3").append( lineCritical );
		bigWeap.find("#WepSelect_4").append( lineAvoid );
		bigWeap.find("#WepSelect_5").append( lineMiss );
		
		
		
		//INFO
		fight_info=$("<img id='fight_info' src='https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/info.png' >")
        
        
        
		
		fight_info.bind('click', function() {
			
			$("#table1").slideUp("fast")
			$("#table3").slideUp("fast")
			$("#fight_info").slideUp("fast")
			$("#MUMarketBlock").slideUp("fast")
			
			
			$("#bigWeaponBlock").append('<table id="table2" style="width:100%; display: none;"><tbody><tr><td colspan="4">Fight Info</td></tr><tr><td colspan="2">All hit</td><td colspan="2" id="all_hit"></td></tr><tr><td>Type:</td><td>Crit</td><td>Avoid</td><td>Miss</td></tr><tr><td>Hit:</td><td id="crit"></td><td id="avoid"></td><td id="miss"></td></tr><tr><td>Nominal %</td><td id="critN"></td><td id="avoidN"></td><td id="missN"></td></tr><tr><td>Real %</td><td id="critR"></td><td id="avoidR"></td><td id="missR"></td></tr></tbody></table>')
			
			$('#all_hit').text(getValue("today_all"))
			
			$("#crit").text(getValue("today_crit"));
			$("#avoid").text(getValue("today_avoid"));
			$("#miss").text(getValue("today_miss"));
		
			$("#critN").text(playerCriticalValue);
			$("#avoidN").text(playerAvoidValue);
			$("#missN").text(playerMissValue);
			
			$("#critR").text(((getValue("today_crit")/getValue("today_all"))*100).toFixed(2));
			$("#avoidR").text(((getValue("today_avoid")/getValue("today_all"))*100).toFixed(2));
			
			if(playerMissValue == 0){
			$("#missR").text("0.00");
			}else{
			
			$("#missN").text(((getValue("today_miss")/getValue("today_all"))*100).toFixed(2));				
			}
			
			back=$("<img id='fight_back' src='https://dl.dropboxusercontent.com/u/67548179/esim-ED/img/Back.png'>")
			
			back.bind('click', function() {
				
				$("#table2").slideUp("fast")
				$("#fight_back").slideUp("fast")
				$("#fight_back").remove();
				
				$("#table1").slideDown("slow")
				$("#table3").slideDown("slow")
				$("#fight_info").slideDown("slow")
				$("#MUMarketBlock").slideDown("slow")
				
			});
				
			$("#bigWeaponBlock").append(back)
			$("#table2").slideDown("slow")
			
		});
		
		
		bigWeap.append( fight_info );
        
        //Select Hide/Show fight response
        
        var HideSelectorBlock = $( "<div id='MUMarketBlock'><br /></div>" );
		var configHideResponse = createCheckBox( "Select Hide/Show fight response", "configHideResponse" );
		HideSelectorBlock .append( configHideResponse );
        
        
		bigWeap.append( HideSelectorBlock );
        
                
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
				} else weapQ.append( "<img class='"+ selectedTheme +"WeaponQ0' src='"+ eval( selectedTheme+"weaponQ0" ) +"' />" );
				weapQ.addClass( "Q0weaponBox" );

			} else {
				if( selectedTheme == "default" ) {
					weapQ.append( "<img class='defaultWeaponQX' src='"+ IMGWEAPON +"' />" );
				} else weapQ.append( "<img class='"+ selectedTheme +"WeaponQX' src='"+ eval( selectedTheme+"weaponQ"+index ) +"' />" );
				weapQ.addClass( "QXweaponBox" );
			}

			var nWeap = "";
			var str = $(this).text();;
			var pos = str.indexOf( "-50%", 0 );
			if( pos < 0 ) {
				nWeap = str.match(/ [0-9]{1,10}/g);
				weapQ.append( "<div class='QXweaponString'>"+ (index * 20) +"%</div>" );

			} else {
				weapQ.css({ "margin-top" : "0px" });
				weapQ.append( "<div class='Q0weaponString'> -50%<br/> Unarmed </div>" );
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
						$( "#availableWeaponInfo" ).text( $(this).attr( "numWeapons" ) + " left" );
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

		// Add update weapon method, copied from the original method
		$( ".fightButton" ).each( function() {

			var input = $( "<input class='newFightButton' type='submit' />" );
			input.attr( "value", $(this).val() );
			input.attr( "name", $(this).attr( "name" ) );
			input.attr( "style", $(this).attr( "style" ) );
			input.insertBefore( $(this) );
			$(this).hide();

			input.bind( "click", function() { 
				var side = $(this)[0].name;
				var value = $(this)[0].value;
				mySendFightRequest(side, value);
                
                
                if(getValue("configHideResponse")=="true"){
                    
                    //alert(getValue("configHideResponse"))
                    
                    $.blockUI({ message: $('#fightStatus'), css: { 
					width: '400px',
					top:  ($(window).height() - 400) /2 + 'px', 
					left: ($(window).width() - 400) /2 + 'px',  
					border: '0px', 
					background: '#F2F2F2' }	
			        });
                    
                    
                }else{
                    
                    //alert(getValue("configHideResponse"))
                    //updateWeaponsNumber();
					
                }
                
				return( false );  
			});
		});
        
           
	}
    
    
    
    // HIDE EXTRA INFOs
    function hideExtraInfo()
    {   

        if(getValue("configExtraInfo")=="false")
        {
            alert(getValue("configExtraInfo"))
            $("#table1").hide()
            $("#fight_info").hide()
            
        }
        
    }
    
    
	function hit_type(type,multip)
	{
	
		if(type=="crit")
		{
		
			sv = getValue("today_crit")
			setValue("today_crit",Number(sv)+Number(multip))
			
			$("#criticalCounter").text(getValue("today_crit"))
			
			sv = getValue("today_all")
			setValue("today_all",Number(sv)+Number(multip))
            
            
            $("#lastHitType").html('<span style="font-family:Arial;font-size:18px;font-style:normal;font-weight:bold;text-decoration:none;text-transform:none;font-variant:small-caps;color:00FF00;">Critical!!!</span>')
			
		}
		
		if(type=="miss")
		{
		
			sv = getValue("today_miss")
			setValue("today_miss",Number(sv)+Number(multip))
			
			$("#missCounter").text(getValue("today_miss"))
			
			sv = getValue("today_all")
			setValue("today_all",Number(sv)+Number(multip))
		
             $("#lastHitType").html('<span style="font-family:Arial;font-size:18px;font-style:normal;font-weight:bold;text-decoration:none;text-transform:none;font-variant:small-caps;color:FF0000;">Miss!!!</span>')
        

        
        	
		}
		
		if(type=="avoid")
		{
		
			sv = getValue("today_avoid")
			setValue("today_avoid",Number(sv)+Number(multip))
			
			$("#avoidCounter").text(getValue("today_avoid"))
			
			sv = getValue("today_all")
			setValue("today_all",Number(sv)+Number(multip))
            
            $("#lastHitType").html('<span style="font-family:Arial;font-size:18px;font-style:normal;font-weight:bold;text-decoration:none;text-transform:none;font-variant:small-caps;color:00FF00;">Avoid!!!</span>')          
             $("#lastHitType").effect( "shake" )

		}
		
		if(type=="normal")
		{
		
			sv = getValue("today_all")
			setValue("today_all",Number(sv)+Number(multip))
			
			//$("#avoidCounter").text(getValue("today_avoid"))
		  
            $("#lastHitType").html('<span style="font-family:Arial;font-size:18px;font-style:normal;font-weight:bold;text-decoration:none;text-transform:none;font-variant:small-caps;color:000000;">Normal...</span>')
            
		}
		
	
	}
	
	// sendFightRequest from the original page copied and improved
	function mySendFightRequest(side, val) { 
		var dataString = 'weaponQuality='+ $("#weaponQuality").val() + '&battleRoundId=' + $("#battleRoundId").val() + '&side='+side+'&value='+val;  
		$.ajax({  
		   type: "POST",
		   url: "fight.html",
		   data: dataString,
		   success: function( msg ) {
		      
                
              
				$( "#fightResponse > div" ).replaceWith( msg );
				
                $( "#fightResponse > div" ).append("<br /><br /><button id='unblockButton' type='submit' class='button foundation-style'>Ok</button><br /><br />")
                
				//alert(msg)
				
				// CHECK HIT TYPE
					
					multip=$(msg).find("#xpGain").text();
					
                    if(multip!=""){
                    
        					pattcrit=/Critical hit!/;
        					var crit= pattcrit.test(msg);
        					
        					pattmiss = /Miss!/
        					var miss= pattmiss.test(msg);
        					
        					pattavoid=/absorbed/;
        					var avoid= pattavoid.test(msg);
        					
        					
        					pattnormal=/Normal hit/;
        					var normal= pattnormal.test(msg);
        					
        					
        					if(normal) hit_type("normal",multip);
        					if(crit) hit_type("crit",multip);
        					if(miss) hit_type("miss",multip);
        					if(avoid) hit_type("avoid",multip);
        					
                            
                            //AVOID AND CRIT
                            
                            if(avoid && crit){
                                
                                $("#lastHitType").html('<span style="font-family:Arial;font-size:18px;font-style:normal;font-weight:bold;text-decoration:blink;text-transform:none;color:00FF00;">AVOID/CRITICAL</span>');
                                 $("#lastHitType").effect( "shake" )
                            }
                            
        				
                            //REFRESH LAST DMG 
                            
                            $("#lastdamage").text(commaNumber($("#DamageDone").text()));
                        
                        
        				// Check HIT TYPE
        				
        				
        				var healthText = $( "#healthUpdate" ).text();
        				if( healthText != "" ) {
        					var healthUpdated = healthText.substr( 0, healthText.length-3 );
        					if( healthUpdated < 100 ) {
        						$( "#healthProgress div.ui-corner-right" ).removeClass( 'ui-corner-right' );
        					}
        					$( "#healthProgress .ui-progressbar-value" ).animate({ width: healthUpdated + "%" },{ queue: false });
        					$( "#healthProgress" ).attr( 'title',healthUpdated+' / 100' );
                            
                            $("#actualHealth").text(healthUpdated);
        				}
        				var rank = parseInt( $("#rankUpdate").text() );
        				var rankNext = parseInt( $("#nextLevelRankUpdate").text() );
        				var rankCurr = parseInt( $("#currLevelRankUpdate").text() );
        				if(rank != null) {
        					var rankWidth = Math.round((rank - rankCurr) / (rankNext - rankCurr) * 100);
        					$( "#rankProgress .ui-progressbar-value" ).animate({ width: rankWidth + "%" },{ queue: false });
        					$( "#rankProgress" ).attr( 'title',rank+' / '+rankNext );
                            
                            $("#actualRank").text(rank);
                            
        				}
        				var xp = parseInt($("#xpUpdate").text());
        				var xpNext = parseInt($("#nextLevelXpUpdate").text());
        				var xpCurr = parseInt($("#currLevelXpUpdate").text());
        				if(xp != null) {
        					var xpWidth = Math.round((xp - xpCurr) / (xpNext - xpCurr) * 100);
        					$("#xpProgress .ui-progressbar-value").animate({width: xpWidth + "%"},{queue: false});
        					$("#xpProgress").attr('title',xp+' / '+xpNext);
                            
                            $("#actualXp").text(xp);
        				}
        				var rankText = $( "#currRankText" ).text();
        				var currRankText = $( "#rankText" ).text();
        				if( rankText != null && currRankText != null ) {
        					if( rankText != currRankText ) {
        						$( "#currRankText" ).text( currRankText );
        						$( "#rankImage img" ).attr( 'src', $( "#rankImg" ).text() );
        					}
        				}
                        
                        
                        //Refix xp and rank
                        configSomeFix();
                
                }

				$( "#unblockButton" ).bind( "click", function() {
				    //alert("haha")
                    $.unblockUI();
					
                    
				});
                
                updateWeaponsNumber();
				updateHealthButtons();
                
                
			}
		});
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
	
	// To add , on numbers
	function commaNumber( n ){ 
		n = n + "";
		var i = n.length-3;
		while( i > 0 ){ n = n.substring( 0, i )+ "," + n.substring( i, n.length ); i=i-3; }
		return( n );
	}


	// Updater number weapons value
	function updateWeaponsNumber() {
		var index = 0;
		$( "#weaponQuality" ).find( "option" ).each( function() {
			
			var str = $(this).text();
			//alert(str);
			var pos = str.indexOf( "+", 0 );
			if( pos > -1 ) {
				//nWeap = str.substr( pos + 10, str.indexOf( ")", pos ) - pos - 10 );
				nWeap = str.match(/\d{1,20}\)/)[0];
				nWeap = nWeap.slice(0, nWeap.length-1);
				//alert(nWeap);
				$( "#weaponSelector" ).children( "div:eq("+ index +")" ).find( ".selectorNumWeapons" ).text( nWeap );
				$( "#availableWeaponsInfo" ).text( nWeap + "left" );

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
			var roundLink = $( "<a style='padding:2px' class='roundSelector' href='"+ url +"' >"+ value + "</a>" );
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


	// Improve MU main page
	function changeMUMainMenu() {

		/*var listBlue = $( "#container" ).find( ".testDivblue" );
		$( "#container" ).find( ".citizenAction" ).css({ "margin-top" : "-7px" });
		listBlue.eq(2).children( "br" ).remove();
		listBlue.eq(2).children( "p" ).remove();

		var descripDiv = $( "#container" ).find( ".testDivblue" ).eq(4);
		var membersDiv = $( "#container" ).find( ".testDivblue" ).eq(3);
		var ordersDiv = $( "#container" ).find( ".testDivblue" ).eq(5);

		ordersDiv.css({ "margin-top" : "0px" });
		ordersDiv.children( "br" ).first().remove();
		descripDiv.css({ "margin-top" : "15px" });

		var leftDiv = $( "<div style='float:left; width:340px; height:100%'></div>" );
		leftDiv.append( ordersDiv );
		leftDiv.append( descripDiv );

		leftDiv.insertBefore( membersDiv );*/
        
        
        desc = $("#militaryDescription").html()
        desc_cent = '<center><b style="font-size:17px">Description</b></center><br /><br />'
        
        
        order_cent = '<center><b style="font-size:17px">Current orders</b></center><br /><br /><b>Battle:</b>'      
        order =$("#militaryDescription").parent().children("div").eq(1).html()
        
        
        $(".testDivblue").eq(4).html(order_cent+order+'<hr class="dashedLine">'+desc_cent+desc)
        
        
		// Get MU Rank
		getMURank();
	}


	// Get MU rank
	function getMURank() {

		var listBlue = $( "#container" ).find( ".testDivblue" );
		var MURank = listBlue.eq(2).find( ".statsLabelRight" ).eq(1).text().toLowerCase();
		if( MURank == "novice" ) { setValue( "MURank", "5" );
		} else if( MURank == "regular" ) { setValue( "MURank", "10" );
		} else if( MURank == "veteran" ) { setValue( "MURank", "15" );
		} else if( MURank == "elite" ) { setValue( "MURank", "20" ); }
	}


	// Remove first block on MU storage and MU money
	function removeFirstBlock() {

		$( "#contentRow" ).find( ".citizenAction" ).css({ "margin-top" : "-7px" });
		$( "#contentRow" ).find( ".testDivblue" ).eq(1).next().remove();
		var firstBlock = $( "#contentRow" ).find( ".testDivblue" ).eq(2);
		firstBlock.next().remove();
		firstBlock.remove();
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
		
		pos.css({"width":"200px"})
		
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
			//alert(str)
			var number = str.indexOf( "(", 0 );
			if( number != -1 ) { 
				str = str.substr( number + 1, str.indexOf( ")", number ) - number - 1 );
				mypatttofindnum=/\d{1,45}/g;
				//alert(str)
				str = mypatttofindnum.exec(str);
				
			}		

			var product = $( "<div class='storage productMU'>" );
			product.append( "<div>"+ str +"</div>" );
			var image = $( "<div></div>" )
			product.append( image );

			var storageMU = $( "<div class='storageButton' selectIndex='"+ index +"'></div>" );
			//storageMU.css({ "box-shadow" : "0px 1px 5px 1px " + color });
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

				} else if( split[1] == "DEFENSE_SYSTEM" ) {
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
		
		// OLD
		/*$( "<br />" ).insertAfter($("#quantity.digit"));
		
		btn1.insertAfter( idDest );
		btn5.insertAfter( idDest );
		btn10.insertAfter( idDest );

		btn150.insertAfter( idDest );
		btn125.insertAfter( idDest );
		btn100.insertAfter( idDest );
		btn75.insertAfter( idDest );
		//$( "<br/>" ).insertAfter( idDest );
		btn50.insertAfter( idDest );
		btn25.insertAfter( idDest );
		btn15.insertAfter( idDest );*/
		
		
		// NEW
		$( "<br id='divider' />" ).insertAfter($("#quantity.digit"));
		
		btn25.insertAfter($("#divider") );
		btn15.insertAfter($("#divider") );
		btn10.insertAfter($("#divider") );
		btn5.insertAfter( $("#divider") );
		btn1.insertAfter( $("#divider") );
		
		$( "<br id='divider2' />" ).insertAfter($("#donateProductForm input[value='25']"));
		
		btn150.insertAfter( $("#divider2") );
		btn125.insertAfter( $("#divider2") );
		btn100.insertAfter( $("#divider2") );
		btn75.insertAfter( $("#divider2") );
		btn50.insertAfter( $("#divider2") );
		
		
		
		
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
		var original = $( data ).find( "h1" ).text();
		var company = original.substr(original.indexOf(" ") + 1);
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
				url: getCurrentServer() + URLMyMU,
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
	
	
	// Add update connection button
	function addDebuffCheck( idForm ) {

		var $online = $( "<input type='submit' id='debuffPlayer' value='Debuffed players' />" );
		$online.insertAfter( ".testDivwhite" );
		$online.bind( "click", function() {
			
			$('.namePlayer').each(function() {
			
			pUrl=getCurrentServer()+$(this).attr('href')
			
			$.ajax({
				url: pUrl,
				success: function( data ) {

					// First clean
					$( idForm ).find( "img[src='"+ IMGOFFLINE +"']" ).remove();
					$( idForm ).find( "img[src='"+ IMGONLINE +"']" ).remove();

					// Add All offline
					$(this).parent().find("td:first").after("<td class='debuff'><img id='noDebuff' src="+noDebuff+" ></td>")

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
			
			
			})
			
			
			

			return( false );
		});
	}
	

	// Count selected members on MU list
	function addCounterMembersMU() {

		var counterDiv = $( "<div style='width:150px; text-align: center; display:inline; padding:2px' id='counterCheck'>No members selected.</div>" )
		counterDiv.insertAfter( ".testDivwhite" );

		var totalDiv = $( "<div style='width:150px; text-align: center; display:inline-block; padding:2px' id='totalDonate'></div>" );
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
		var pos = $( ".testDivblue" ).eq(2);
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
	function changeCreateContract() {

		// Redesign 
		$( "#contractsForm" ).parent().css({ "width" : "550px" });
		//$( "#contractsForm" ).next().remove();
		$( "#contractsForm" ).children( "div" ).css({ "display" : "none" });
		$( "#offererSide" ).css({ "display" : "none" });
		$( "#itemTypeList" ).css({ "display" : "none" });
		$( "#contractsForm" ).children( "br" ).remove();
		$( "#contractsForm" ).children( "b" ).remove();

		// Clean some elements from Form
		var input = $( "#contractsForm" ).children( "input" ).eq(2);

		var player = $( "<div id='player' style='float:left; width:49%; height:30px'></div>" );
		player.css({ "background-color" : "#fff", "border-radius" : "4px", "cursor" : "pointer" });
		player.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });
		var imgPlayerSrc = $( ".testDivwhite" ).eq(0).find( "img" ).eq(1).attr( "src" );
		player.append( "<img src='"+ imgPlayerSrc +"' style='width:30px;' />" );
		var name = $( ".testDivwhite" ).eq(0).find( "a[href^='profile.html']" ).text();
		player.append( "<span style='font-weight:bold; font-size:14px; margin-left:5px; position:relative; top:-10px'>"+ name +"</span>" );

		var dummy = $( "<div id='dummy' style='float:right; width:49%; height:30px'></div>" );
		dummy.css({ "margin" : "0px 0px 0px 1%" });
		dummy.css({ "background-color" : "#fff", "border-radius" : "4px", "cursor" : "pointer" });
		dummy.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });
		var imgDummySrc = $( ".testDivwhite" ).eq(1).find( "img" ).eq(1).attr( "src" );
		dummy.append( "<img src='"+ imgDummySrc +"' style=' width:30px;' />" );
		dummy.append( "<span style='font-weight:bold; font-size:14px; margin-left:5px; position:relative; top:-10px'>Dummy</span>" );

		var playerBlock = createContractBlock();
		var dummyBlock = createContractBlock();
		
		player.bind( "click", function() {
			$(this).css({ "background-color" : "#ddd" });
			$("#dummy").css({ "background-color" : "#fff" });
			
			$("#eqTab").fadeIn()
			
			$("#offererSide option[value=true]").attr("selected", true);
			$("#offererSide option[value=false]").attr("selected", false);
		});
		
		
		dummy.bind( "click", function() {
			$(this).css({ "background-color" : "#ddd" });
			$("#player").css({ "background-color" : "#fff" });
			
			$("#eqTab").fadeOut()
			
			$("#offererSide option[value=true]").attr("selected", false);
			$("#offererSide option[value=false]").attr("selected", true);
		});
		
		
		
		
		player.insertBefore( input );
		dummy.insertBefore( input );
		
		dummyBlock.css({ "float" : "right" });
		
		
		
		playerBlock.insertBefore( input );
		//dummyBlock.insertBefore( input );
		
		player.trigger("click");
		
	}

	// Create contract block
	function createContractBlock() {

		var block = $( "<div id='the_block' style='float:left; width:100%; height:200px;'></div>" );
		block.css({ "background-color" : "#fff", "margin" : "9px 0px 10px 0px", "border-radius" : "4px" });
		block.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });

		var options = $( "<div style='font-size:12px; font-weight:bold; cursor:pointer; width:510px; height: 23px;margin:auto;'></div>" );
		var moneyTab = $( "<div style='float:left; width:130px; padding:5px 0px; '>MONEY</div>" );
		var productTab = $( "<div style='float:left; width:130px; padding:5px 0px;'>PRODUCT</div>" );
		var debtTab = $( "<div style='float:left; width:125px; padding:5px 0px;'>DEBT</div>" );
		var eqTab = $( "<div id='eqTab' style='float:left; width:125px; padding:5px 0px;'>EQUIPMNET</div>" );

		//-------------------------------------------------
		
		moneyTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		moneyTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});
		
		moneyTab.bind( "click", function() {
			$(this).css({ "background-color" : "#00AA33" });
			$("#the_block").css({"height":"200px"});
			
			$("#itemTypePosition1").attr("selected", true);
			$("#itemTypePosition2").attr("selected", false);
			$("#itemTypePosition3").attr("selected", false);
			$("#itemTypePosition4").attr("selected", false);
			$("#itemTypePosition4").attr("disabled", true);
			
			money.show()
			product.hide()
			debt.hide()
			eq.hide()
		});

		//-------------------------------------------------
		

		productTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		productTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});
		productTab.bind( "click", function() {
			$(this).css({ "background-color" : "#00AA33" });
			$("#the_block").css({"height":"230px"});
			
			$("#itemTypePosition1").attr("selected", false);
			$("#itemTypePosition2").attr("selected", true);
			$("#itemTypePosition3").attr("selected", false);
			$("#itemTypePosition4").attr("selected", false);
			$("#itemTypePosition4").attr("disabled", true);
			
			money.hide()
			product.show()
			debt.hide()
			eq.hide()
		});
		
		//-------------------------------------------------//-------

		debtTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		debtTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});
		debtTab.bind( "click", function() {
			$(this).css({ "background-color" : "#00AA33" });
			$("#the_block").css({"height":"200px"});
			
			$("#itemTypePosition1").attr("selected", false);
			$("#itemTypePosition2").attr("selected", false);
			$("#itemTypePosition3").attr("selected", true);
			$("#itemTypePosition4").attr("selected", false);
			$("#itemTypePosition4").attr("disabled", true);
			
			money.hide()
			product.hide()
			debt.show()
			eq.hide()
			
		});
		
		//-------------------------------------------------//----------
		
		eqTab.bind( "mouseover", function() {
			$(this).css({ "background-color" : "#ddd" });
		});
		eqTab.bind( "mouseout", function() {
			$(this).css({ "background-color" : "#fff" });
		});
		
		eqTab.bind( "click", function() {
			$(this).css({ "background-color" : "#00AA33" });
			$("#the_block").css({"height":"200px"});
			
			$("#itemTypePosition1").attr("selected", false);
			$("#itemTypePosition2").attr("selected", false);
			$("#itemTypePosition3").attr("selected", false);
			$("#itemTypePosition4").attr("selected", true);
			$("#itemTypePosition4").attr("disabled", false);
			
			money.hide()
			product.hide()
			debt.hide()
			eq.show()
			
		});
		
		//-------------------------------------------------

		var money = $( "#MONEYParameters" );
		money.css({ "margin" : "10px auto auto", "border" : "1px solid #ccc", "border-radius" : "4px" });
		money.css({ "background-color" : "#eee", "width" : "360px", "height" : "97px", "padding" : "60px 0px 0px 0px" });

		var product = $( "#PRODUCTParameters" );
		product.css({ "margin" : "10px auto auto", "border" : "1px solid #ccc", "border-radius" : "4px" });
		product.css({ "background-color" : "#eee", "width" : "360px","height" : "180px"});

		var debt = $( "#DEBTParameters" );
		debt.css({ "margin" : "10px auto auto", "border" : "1px solid #ccc", "border-radius" : "4px" });
		debt.css({ "background-color" : "#eee", "width" : "360px", "height" : "155px" });
		
		var eq = $( "#EQUIPMENTParameters" );
		eq.css({ "margin" : "10px auto auto", "border" : "1px solid #ccc", "border-radius" : "4px" });
		eq.css({ "background-color" : "#eee", "width" : "360px", "height" : "155px" });
		
		
		options.append( moneyTab );
		options.append( productTab );
		options.append( debtTab );
		options.append( eqTab );
		block.append( options );
		block.append( money );
		block.append( product );
		block.append( debt );
		block.append( eq );
		
		money.trigger("click");
		
		return( block );
	}


	// Change market selectors
	function changeProductSelection() {

		// Remove extra br at the begining
		$( "#contentRow" ).children( "td" ).eq(1).children().eq(1).remove();

		// Redesign product selection in one row
		var divBlock = $( "#productMarketViewForm" ).parent();
		divBlock.addClass( "productMarketViewFormMod" );
		divBlock.children( ":lt(2)" ).remove();

		// Remove useless tags
		$( "#marketProducts" ).children( "p" ).remove();
		$( "#marketProducts" ).addClass( "marketProductsMod" );

		$( "#productMarketViewForm > .productList" ).hide();
		var selectProductMarketItem = null;
		var mycounter=0;
		$( "#marketProducts .productList" ).each( function() {
			
			
			mycounter++;
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
			
			
			if(mycounter==7)
			{
			
			
			}
		});

		$( "#countryId" ).addClass( "countryIdSelect" );
		$( "#countryId" ).addClass( "customSelectList" );

		// Change quality selection
		var selectedQuality = parseInt( $( "#quality :selected" ).val() );
		var newQuality = $( "<div class='qualityProduct'></div>" );
		$( "#quality option" ).each( function() {

			var v = parseInt( $(this).val() );
			if( v != 0 ) {
				var star = $( "<div class='qualityStar' quality='"+ v +"' ></div>" );
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

		$( "#productMarketViewForm" ).children( "br" ).remove();

		// Rellocate help wiki and my offers link
		$( "#productMarketViewForm .biggerFont a" ).addClass( "linkMyOffersProductMarket" );
		var imgWiki = $( "#quality" ).next().next();
		imgWiki.addClass( "imgWikiProductMarket" );
		var linkWiki = imgWiki.next();
		linkWiki.addClass( "linkWikiProductMarket" );
		var imgLinkWiki = $( "<a href='"+ linkWiki.attr( "href" ) +"' target='_blank'></a>" );
		imgLinkWiki.append( imgWiki );
		imgLinkWiki.insertAfter( $( "#productMarketViewForm" ) );
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
		$( ".dataTable" ).find( "input[type='text']" ).bind( "keyup", function() {
			var td = $(this).parent().parent();
			var priceUnit = parseFloat( td.prev().prev().children( ".linkMonetaryMarket" ).next().text() );
			var value = parseFloat( $(this).val() );
			td.prev().children( ".inputPrice" ).text( Math.round( priceUnit * value * 100 ) / 100 );  
           
		});

		// Add buy all button
		var buyAll = $( "<input class='buyAllSubmit' type='submit' value='All' />" );
		buyAll.bind( "click", function() {
			var v = $(this).parent().parent().prev().prev().prev().text();
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
		trHead.eq(3).text( "Price/unit" );
		$( "<td class='dataTableHeaders'>Price</td>" ).insertAfter( trHead.eq(3) );

		// Product list
		//resizeProductImage( $( ".dataTable" ).find( ".product" ) );

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
			var flag = nextCell.children( "div" );
			flag.addClass( "monetaryMarketFlag" );

			// Add link to monetary market
			var url = getCurrentServer() + URLMonetaryMarket + "?buyerCurrencyId="+ IDByImageCountry( flag.attr( "class" ).split(" ")[1] ) +"&sellerCurrencyId=0";
			var link = $( "<a class='linkMonetaryMarket' href='"+ url +"' target='_blank'></a>" );
			link.insertBefore( flag );
			link.append( flag );

			// Total price
			var priceItem = parseFloat( nextCell.children( "b" ).text() );
			var n = ( parseInt( parseInt( cell.next().text() ) * priceItem * 100 ) )/100;
			var money = nextCell.contents().last().text();
			var newCell = $( "<td class='totalPriceProductMarket'><b>"+ n +"</b> "+ money +"</td>" );
			newCell.insertAfter( nextCell );
			newCell.append( "<br/ > Total: <div style='display:inline;width:10px' class='inputPrice'>0</div>" + money );
		});
	}
	
	//Advanced by CLard
	
	function calcValueInGold(id, callback) {

        _MM_C_URL = _MM_C_URL.replace("{1}", id);
		
        jQuery.get(getCurrentServer()+_MM_C_URL, function(data) {
            try {
                //get first row of the dataTable
                var $content = jQuery(data);
                var $table = jQuery(".dataTable", $content);
                if ($table.length > 0) {
                    $table = jQuery($table[0]);
                }

                //get the currency
                var c = $table[0].rows[1].cells[2].textContent.trim();
                c = c.substr(c.indexOf("=") + 1, c.indexOf("Gold") - c.indexOf("=") - 1);

                _currencyValue = parseFloat(c);

                //jQuery("#monetaryOfferPost #exchangeRatio").get(0).value = _currencyValue;

                if (callback) {
                    callback();
                }
                
            } catch (e) {
                console.log(e);
                _currencyValue = 0;
            }
        });
    }
	
	
	 function displayGoldValue() {

        var $table = jQuery(".dataTable");
        var s = "";
		
		var id = jQuery("#productMarketViewForm #countryId");
		if (id.length > 0) {
                    id = id[0].value;
                } else {
                    id = _currencyId;
                }
		calcValueInGold(id, displayGoldValue.bind(this, id));
		
        //console.log("##### Values ######");
        try {
            if ($table.length > 0) {

                //need to get the tax for the selected country ....
				GET_URL=getCurrentServer()+_COUNTRY_URL.replace("{1}", id)
                jQuery.get(GET_URL, function(data) {
                    try {
                        var taxes = [];

                        var dt = jQuery(".dataTable", jQuery(data))[1];

                        for (var j=1; j<dt.rows.length;j++) {
                            var row = dt.rows[j];
                            taxes[j-1] = {"name": dt.rows[j].cells[0].innerHTML.toUpperCase().trim(),
                                          "value": parseFloat(row.cells[2].innerHTML.toUpperCase().replace("&NBSP;", "").replace("&NBSP;", "").trim()) + parseFloat(row.cells[1].innerHTML.toUpperCase().replace("&NBSP;", "").replace("&NBSP;", "").trim())
                            };
                        }

                        for (var k=1; k< $table[0].rows.length; k++) {
                            var $row = $table[0].rows[k];
                            var totalProduct = parseFloat($row.cells[2].textContent.trim());
                            s = $row.cells[3].textContent.trim();
                            if (s.indexOf("GOLD") >= 0) {
                                break;
                            }
                            var price = parseFloat(s.substr(0,s.indexOf(" ")).trim());
                            var priceInGold = Math.round((price * _currencyValue)*100000)/100000;
                            var totalPrice = Math.round(totalProduct * price * 1000)/1000;
                            var totalPriceInGold = Math.round((totalProduct * price * _currencyValue)*100000)/100000;

                            //console.log("price:" + price + " ; price in gold:" + priceInGold + " ; total price:" + totalPrice + " ; total in gold:" + totalPriceInGold);

                            $row.cells[3].innerHTML = $row.cells[3].innerHTML + " <br> <img src='http://e-sim.home.pl/testura/img/gold.png'><b>" + priceInGold + "</b> GOLD";
                            $row.cells[4].innerHTML = " <b>" + totalPriceInGold + "</b> Gold <br/>" + $row.cells[4].innerHTML //+
                                                        //"<br> Total in "+ s.substr(s.indexOf(" ")).trim() +": <b>" + totalPrice + "</b>"
                            //$row.cells[5].innerHTML = $row.cells[5].innerHTML +"<br><a style='cursor: pointer;color: #3787EA; font-weight: bold;' id='buyAllYouCan'>Buy All You Can</a>";


                            //console.log(taxes);

                            for (var h=0;h<taxes.length;h++) {
								//alert(taxes[h].value)
                               if ($row.cells[0].innerHTML.toUpperCase().indexOf(taxes[h].name) >= 0) {
                                    console.log("tx:" + (parseFloat(taxes[h].value) / 100));
									
                                    $row.cells[3].innerHTML = $row.cells[3].innerHTML + "<br> <hr class='foundation-divider'>  Price without tax: <b>" + (Math.round(((parseFloat(price) / (1 + parseFloat(taxes[h].value) / 100)  )) *100000)/100000) + "</b>";
                                    $row.cells[3].innerHTML = $row.cells[3].innerHTML + " <br> Price(G) without tax: <b>" + (Math.round(((priceInGold / (1 + parseFloat(taxes[h].value) / 100) )) *100000)/100000) + "</b>";
									
                                    break;
                                }
                            }

                            jQuery("#buyAllYouCan", jQuery($row)).hover(
                                function () {
                                    $(this).css("color", "#FF3344");
                                },
                                function () {
                                    $(this).css("color", "#3787EA");
                                }
                            );

                            jQuery("#buyAllYouCan", jQuery($row)).bind("click", function() {
                                try {

                                    var $this_tr = jQuery(this).closest("tr")[0];
                                    var totalProd = parseFloat($this_tr.cells[2].textContent.trim());
                                    var ss = $this_tr.cells[3].textContent.trim();

                                    var pr = parseFloat(ss.substr(0,ss.indexOf(" ")).trim());

                                    var $usersAllMoney = jQuery(jQuery("#userMenu .plate")[1]);
                                    var usersMoney = -1;
                                    var currency = ss.substr(ss.indexOf(" "), (ss.indexOf("Price") - ss.indexOf(" ")) ).trim();

                                    var foundIt = false;
                                    for (var k=1;k<$usersAllMoney[0].childNodes.length;k++) {
                                        var e = $usersAllMoney[0].childNodes[k];
                                        if (e.nodeName == "B") {
                                            usersMoney = e.innerHTML;
                                        }
                                        if (e.nodeName == "#text" && e.nodeValue.trim() == currency) {
                                            foundIt = true;
                                            break;
                                        }
                                    }

                                    if (!foundIt) {
                                        usersMoney = -1;
                                    }

                                    usersMoney = parseFloat(usersMoney);

                                    var buyingProds = 0;
                                    if (usersMoney > 0) {
                                        buyingProds = parseInt(usersMoney / pr);

                                        if (buyingProds > totalProd) {
                                            buyingProds = totalProd;
                                        }
                                    }

                                    jQuery("input[name=quantity]", $this_tr.cells[4]).get(0).value = buyingProds;
                                } catch (e) {
                                    console.log(e);
                                }
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }

    }

	
	

	// Redesign product image
	function resizeProductImage( productList ) {

		productList.each( function() {
			var cell = $(this).parent();
			var img = cell.find( "img" );
			cell.children().remove()

			var block = $( "<div style='url('http://e-sim.home.pl/testura/img/stripes.png') repeat scroll 0 0 #3D6571'></div>" );
			//block.append( "<img class='blockProduct 'src='"+ IMGPRODBG +"' />" );
			block.append( img.eq(0).addClass( "productImage" ) );
			if( img.length > 1 ) { block.append( img.eq(1).addClass( "productQuality" ) ); }
			
			cell.append( block );
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
			default: return( 0 );
		}
	}

	
	
	function IDbyCC( CC ) {
		
		
		//prompt("a",CC)
		
		
		
		switch( String(CC) ) {
			case "PLN": return( 1 );
			case "RUB": return( 2 );
			case "DEM": return( 3 );
			case "FRF": return( 4 );
			case "ESP": return( 5 );
			case "GBP": return( 6 );
			case "ITL": return( 7 );
			case "HUF": return( 8 );
			case "RON": return( 9 );
			case "BGN": return( 10 );
			case "RSD": return( 11 );
			case "HRK": return( 12 );
			case "BAM": return( 13 );
			case "GRD": return( 14 );
			case "MKD": return( 15 );
			case "UAH": return( 16 );
			case "SEK": return( 17 );
			case "PTE": return( 18 );
			case "LTL": return( 19 );
			case "LVL": return( 20 );
			case "SIT": return( 21 );
			case "TRY": return( 22 );
			case "BRL": return( 23 );
			case "ARS": return( 24 );
			case "MXN": return( 25 );
			case "USD": return( 26 );
			case "CAD": return( 27 );
			case "CNY": return( 28 );
			case "IDR": return( 29 );
			case "IRR": return( 30 );
			case "KRW": return( 31 );
			case "TWD": return( 32 );
			case "NIS": return( 33 );
			case "INR": return( 34 );
			case "AUD": return( 35 );
			case "NLG": return( 36 );
			case "FIM": return( 37 );
			case "IEP": return( 38 );
			case "CHF": return( 39 );
			case "BEF": return( 40 );
			case "PRK": return( 41 );
			case "MYR": return( 42 );
			case "NOK": return( 43 );
			case "PEN": return( 44 );
			case "CLP": return( 45 );
			case "COP": return( 46 );
			case "CZK": return( 51 );
			case "BYR": return( 52 );
			case "EEK": return( 53 );
			case "PHP": return( 54 );
			default: return( 0 );
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

		var divBlue = $( "#countryInput" ).parent().parent();
		divBlue.find( "b" ).eq(0).css({ "display" : "inline" });
		divBlue.find( "b" ).eq(1).css({ "display" : "inline" });

		$( "#countryInput" ).addClass( "customSelectList" );
		select.addClass( "customSelectList" );

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

		// If is in the player or in the Stock
		var csFlag;
		var localUrl = new String( window.location );
		if( localUrl.indexOf( URLMarketOffers, 0 ) >= 0 ) {
			csFlag = $( "a[href='pendingCitizenshipApplications.html']" ).prev();

		} else if( localUrl.indexOf( URLStockProducts, 0 ) >= 0 ) {
		  
			csFlag = $("a[href*='stockCompanyAssets.html?id=']").prev().prev().prev().prev().prev().prev();
            //alert(csFlag)
            
		}
		var citizenship = IDByImageCountry( csFlag.attr( "class" ).split(" ")[1] );
        
        //alert(citizenship)

		var dataString = 'country=' + $("#countryInput").val() + '&resource=' + $("#resourceInput").val();
		dataString += '&price=' +$("#priceInput").val() + '&citizenship=' + citizenship;  
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
				var link = getCurrentServer() + URLMarket + "?resource=";
				var splitItem = $("#resourceInput").val().split( "-" );
				if( splitItem.length == 1 ) {
					link += splitItem[0] + "&countryId=" + $("#countryInput").val();
				} else link += splitItem[1] + "&countryId=" + $("#countryInput").val() + "&quality=" + splitItem[0];
				res.append( "<br /><a class='textMyOffers' href='"+ link +"' target='_blank'>Market</a>" );

				link = getCurrentServer() + URLMonetaryMarket + "?buyerCurrencyId="+ $("#countryInput").val() +"&sellerCurrencyId=0";
				res.append( "  |  <a class='MMMyOffers' href='"+ link +"' target='_blank'>MM link</a>" );

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
			}
		});
	}


	// Change monetary market view	
	function changeMonetaryMarket() {

		if( $( "#container" ).children().length == 3 ) {
			$( "#container" ).children().last().remove();
		}
		var listBlue = $( "#container" ).find( ".testDivblue" );
		var currentOffersTitle = listBlue.eq(2);
        listBlue.eq(2).hide();
		var currentOffers = listBlue.eq(3);
		var yourOffersTitle = listBlue.eq(4);
		var yourOffers = listBlue.eq(5);

		currentOffers.addClass( "currentOffersMM" );
		yourOffers.addClass( "yourOffersMM" );
		yourOffers.children().last().remove();

		// Custom Selects
		$( "#buy" ).addClass( "customSelectList" );
		$( "#sell" ).addClass( "customSelectList" );
		$( "#offeredMoneyId" ).addClass( "customSelectList" );
		$( "#buyedMoneyId" ).addClass( "customSelectList" );
		
		// Create new blocks BR
		var block1 = $( "<div class='monetaryMarketTitleBlock'></div>" );
		block1.insertBefore( currentOffersTitle );
		//block1.append( currentOffers );
		block1.append( currentOffersTitle );


		// New button in current offers
		var swapView = $( "<input class='swapView' type='button' value='Swap & View' />" );
		swapView.insertAfter( "#swap2" );
		swapView.bind( "click", function() {
			$( "#swap2" ).click();
			$( "#monetaryMarketView" ).submit();
		});
		$( "#swap2" ).addClass( "swapView" );
		$( "#swap2" ).bind( "click", function() {
			var temp = $( "#offeredMoneyId" ).val();
			$( "#offeredMoneyId" ).val( $( "#buyedMoneyId" ).val() );
			$( "#buyedMoneyId" ).val( temp );

			var currency = "Gold";
			if ( $( "#buyedMoneyId > option:selected" ).text() != "Gold" ) {
				currency = $( "#buyedMoneyId > option:selected" ).text().substr( 0, 3 );
			}
			$( "#offeredRate2" ).text( currency );

			currency = "Gold";
			if ( $( "#offeredMoneyId > option:selected" ).text() != "Gold" ) {
				currency = $( "#offeredMoneyId > option:selected" ).text().substr( 0, 3 );
			}
			$( "#offeredCurrency" ).text( currency );
			$( "#offeredRate1" ).text( currency );
		});

		// Redesign in your offers
		var block2 = $( "<div class='monetaryMarketTitleBlock'></div>" );
		block2.insertBefore( currentOffersTitle );
		block2.append( yourOffersTitle );
		block2.append( currentOffers );
		block2.append( yourOffers );

		$( "#swap1" ).addClass( "swapYourOffers" );
		$( "#swap1" ).bind( "click", function() {
			var temp = $( "#buy" ).val();
			$( "#buy" ).val( $( "#sell" ).val() );
			$( "#sell" ).val( temp );

			if( $( "#offeredMoneyId" ).val() == "0" ) {
				var cc = $( ".monetaryMarketCurrencyBlock" ).find( ".currencySelector[id='"+ $( "#buyedMoneyId" ).val() +"']" );
				var v = "0.0";
				if( cc.length != 0 ) { v = cc.children( "b" ).text(); }
				$( "#value" ).val( v );

			} else $( "#value" ).val( "0.0" );
		});

		$( "#buyedMoneyId" ).next().remove();
		$( "#value" ).addClass( "priceInputMM" );
		$( "#exchangeRatio" ).addClass( "priceInputMM" );

		var blockCurrency = $( "<div class='monetaryMarketCurrencyBlock'></div>" );
		blockCurrency.addClass( "testDivblue" );
		//blockCurrency.append( block1 );
		
		block1.append( blockCurrency );

		// Add currency block
		var plate = $( "#hiddenMoney" ).parent();
		plate.find( ".flags-small" ).each( function() {

			var id = IDByImageCountry( $(this).attr( "class" ).split(" ")[1] );
			var itemCC = $( "<div class='currencySelector'></div>" );
			itemCC.attr( "id", id );
			if( id == 0 ) { selectedCurrency = itemCC; }
			itemCC.append( "<div class='"+$(this).attr( "class" )+"'></div>" );
			itemCC.append( "<b>"+ $(this).next().text() +" </b>" );
			var currencyName = $( "#buy" ).children( "option[value='"+ id +"']" ).text().split( " " );
			itemCC.append( currencyName[0] );
			blockCurrency.append( itemCC );

			itemCC.bind( "click", function() {

				var idC = $(this).attr( "id" );
				if( (idC != "0") && (idC != selectedCurrency.attr( "id" )) ) {
					if( selectedCurrency ) { selectedCurrency.removeClass( "selectedCurrency" ); }

					if( $( "#buy" ).val() == "0" ) {
						$( "#sell" ).val( idC );
					} else $( "#buy" ).val( idC );

					if( $( "#offeredMoneyId" ).val() == "0" ) {
						$( "#buyedMoneyId" ).val( idC );
					} else $( "#offeredMoneyId" ).val( idC );

					$(this).addClass( "selectedCurrency" );
					selectedCurrency = $(this);

					var currency = "Gold";
					if ( $( "#buyedMoneyId > option:selected" ).text() != "Gold" ) {
						currency = $( "#buyedMoneyId > option:selected" ).text().substr( 0, 3 );
					}
					$( "#offeredRate2" ).text( currency );

					currency = "Gold";
					if ( $( "#offeredMoneyId > option:selected" ).text() != "Gold" ) {
						currency = $( "#offeredMoneyId > option:selected" ).text().substr( 0, 3 );
					}
					$( "#offeredCurrency" ).text( currency );
					$( "#offeredRate1" ).text( currency );

					if( $( "#buyedMoneyId" ).val() == "0" ) {
						$( "#value" ).val( $(this).children( "b" ).text() );

					} else $( "#value" ).val( "0.0" );
				}
			});
		});

		// Add fast buttons
		var idDest = "#value";
		var firstFastButton = true;
		var btn1 = $( "<input class='priceFastButton' type='button' value='1' />" );
		btn1.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "1" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 1 ); 
			firstFastButton = false;
		});

		var btn5 = $( "<input class='priceFastButton' type='button' value='5' />" );
		btn5.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "5" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 5 ); 
			firstFastButton = false;
		});

		var btn10 = $( "<input class='priceFastButton' type='button' value='10' />" );
		btn10.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "10" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 10 ); 
			firstFastButton = false;
		});

		var btn50 = $( "<input class='priceFastButton' type='button' value='50' />" );
		btn50.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "50" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 50 ); 
			firstFastButton = false;
		});

		var btn100 = $( "<input class='priceFastButton' type='button' value='100' />" );
		btn100.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "100" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 100 ); 
			firstFastButton = false;
		});

		var btn500 = $( "<input class='priceFastButton' type='button' value='500' />" );
		btn500.bind( "click", function() { 
			if( firstFastButton ) {
				$( idDest ).attr( "value", "500" ); 
			} else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 500 ); 
			firstFastButton = false;
		});

		var pos = $( "#offeredRate2" ).next();
		btn1.insertBefore( pos );
		btn5.insertBefore( pos );
		btn10.insertBefore( pos );
		btn50.insertBefore( pos );
		btn100.insertBefore( pos );
		btn500.insertBefore( pos );

		// Add confirm option
		var postButton = $( "<input class='postOfferButton' type='button' value='Post new offer' />" );
		var pos = $( "#monetaryOfferPost" ).children( "center" ).children( "input" );
		postButton.insertBefore( pos );
		pos.hide();
		postButton.click( "click", function() {
			var value = parseFloat( $( "#value" ).val() );
			var change = parseFloat( $( "#exchangeRatio" ).val() );
			var res = confirm( "Sell "+ value +" "+ $( "#offeredCurrency" ).text() +" for "+ (value*change) +" "+ $( "#offeredRate2" ).text() );
			if( res ) { $( "#monetaryOfferPost" ).submit(); }
		});
	}


	// Change monetary market product table
	function changeMonetaryMarketTable() {
	
		$( ".dataTable" ).find( "input[type='text']" ).addClass( "inputTextTable" );
		var submit = $( ".dataTable" ).find( "input[type='submit']" ).addClass( "inputSubmitTable" );

		// Add buy all button
		var buyAll = $( "<input class='buyAllSubmit' type='submit' value='All' />" );
		buyAll.bind( "click", function() {
			var v = $(this).parent().parent().prev().prev().text().match(/\d{1,10}.\d{1,5}/);
			//alert(v)
			$(this).parent().children( "input[type='text']" ).val( v );
			return( false );
		});
		buyAll.insertBefore( submit );

		// Resize table
		$( ".dataTable" ).addClass( "dataTableMod" );

		// Redesign table
		// Headers
		$( ".dataTable > tbody > tr:first-child > td" ).addClass( "dataTableHeaders" );
	}


	// Add extra links in the shares menu
	function addSharesExtraLinks() {

		var firstRow = true;
		var firstPlate = $( ".testDivwhite" ).first();
		firstPlate.css({ "width" : "570px" });
		firstPlate.children( ".dataTable" ).css({ "width" : "550px" });
		firstPlate.children( ".dataTable:first" ).find( "tr" ).each( function() {

			var td = $( "<td></td>" );
			td.insertAfter( $(this).children().first() );
			if( firstRow ) { 
				firstRow = false;
				td.append( "Fast links" );

			} else {
				var idStock = $(this).children().first().find( "a" ).attr( "href" );
				var imgStock = $(this).children().first().find( "img" ).eq(1);
				var linkStock = $( "<a href='"+ idStock +"'></a>" ).insertBefore( imgStock );
				linkStock.append( imgStock );
				var split = idStock.split( "?id=" );
				if( split.length > 1 ) { idStock = split[1]; }

				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockMM + idStock +"'>MM offers</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockProducts + idStock +"'>Product offers</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockDonateMoney + idStock +"'>Donate money</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockDonateCompany + idStock +"'>Donate company</a>" );
				td.append( "<a style='display:block' href='"+ getCurrentServer() + URLStockLogs + idStock +"&importance=TRIVIAL '>Logs</a>" );
			}
		});
	}


	// Change stock main div
	function changeStockMainMenu() {

		var listBlue = $( "#contentRow" ).children( "td" ).eq(1).find( ".testDivblue" );
		$( "#contentRow" ).children( "td" ).eq(1).children().eq(1).remove();

		var mainStockInfo = listBlue.eq(0);
		mainStockInfo.children( "br" ).remove();
		mainStockInfo.children( "p" ).remove();

		var rightBlock = mainStockInfo.find( "td" ).eq(1);
		rightBlock.css({ "width" : "350px" });
		rightBlock.children().eq(2).css({ "width" : "70px" });
		rightBlock.children().eq(3).css({ "width" : "275px" });

		var linkWiki = $( "<div class='linkWiki'></div>" );
		var linkImg = $( "<a href='"+ mainStockInfo.children( "a" ).attr( "href" ) +"'></a>" );
		linkWiki.append( linkImg.append( mainStockInfo.children( "img" ) ) );
		linkWiki.append( mainStockInfo.children( "a" ) );
		mainStockInfo.append( linkWiki );
	}


	// Change stock floating divs in the main menu
	function changeStockFloatingDivs() {

		var listWhite = $( "#contentRow" ).children().eq(2).find( ".testDivwhite" );
		var listBlue = $( "#contentRow" ).children().eq(2).find( ".testDivblue" );

		var companyStatute = listWhite.eq(0);
		companyStatute.addClass( "divShareMenu divShareMenuHide" );
		companyStatute.bind( "click", function() {
			if( $(this).hasClass( "divShareMenuHide" ) ) {
				$(this).removeClass( "divShareMenuHide" );

			} else $(this).addClass( "divShareMenuHide" );
		});

		var stockPrice = listWhite.eq(1);
		stockPrice.addClass( "divShareMenu divShareMenuHide" );
		stockPrice.bind( "click", function() {
			if( $(this).hasClass( "divShareMenuHide" ) ) {
				$(this).removeClass( "divShareMenuHide" );

			} else $(this).addClass( "divShareMenuHide" );
		});

		var acts = listBlue.eq(1);
		acts.addClass( "divShareMenu divShareMenuMediumHide" );
		acts.bind( "click", function() {
			if( $(this).hasClass( "divShareMenuMediumHide" ) ) {
				$(this).removeClass( "divShareMenuMediumHide" );

			} else $(this).addClass( "divShareMenuMediumHide" );
		});

		var staff = listBlue.eq(2);
		staff.addClass( "divShareMenu divShareMenuMediumHide" );
		staff.bind( "click", function() {
			if( $(this).hasClass( "divShareMenuMediumHide" ) ) {
				$(this).removeClass( "divShareMenuMediumHide" );

			} else $(this).addClass( "divShareMenuMediumHide" );
		});

		var companies = listBlue.eq(3);
		var shouts = listBlue.eq(4);
		shouts.insertBefore( companies );
		companies.insertBefore( stockPrice );

		var sharesMarket = listWhite.eq(2);
		stockPrice.insertBefore( sharesMarket );
		$( "<br/>" ).insertAfter( stockPrice );

		companies.addClass( "divShareMenuFixed" ).css({ "width" : "340px" });
		shouts.addClass( "divShareMenuFixed" );

		sharesMarket.addClass( "divShareMenuFixed" );
		listWhite.eq(3).addClass( "divShareMenuFixed" );
	}


	// Change product selection in a stock company
	function changeStockProductSelection() {

		var pos = $( ".testDivwhite" );
		var select = $( "#resourceInput" );
		if( select.length == 0 ) { 

			pos.addClass( "storageUnselectStock" );
			pos.children( "br" ).remove();

		} else {
			var dest = $( "#resourceInput" ).next().next();
		
			// Remove all childrens and add help text
			pos.children().remove();
			pos.addClass( "storageSelectStock" );
			pos.append( "One click to select <b>ONE item</b>. Double click to select <b>ALL items</b>.<br/>" );
	
			var divBlue = $( "#countryInput" ).parent().parent();
			divBlue.addClass( "formSelectStock" );
			divBlue.find( "b" ).eq(0).css({ "display" : "inline" });
			divBlue.find( "b" ).eq(1).css({ "display" : "inline" });
			divBlue.insertAfter( pos );

			$( "#countryInput" ).addClass( "customSelectList" );
			select.addClass( "customSelectList" );

			orderSelect( select );
			changeSelect( select, pos, dest, "#aaaaaa" );

			firstFastButton = true;
			dest.val( "1" );
			dest.addClass( "quantityMyOffers" );
			$( "#priceInput" ).val( "1.0" );
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

			$( ".storage" ).bind( "click", function() { setTimeout( mySendPreviewRequest, 500 ); });
			$( "#countryInput" ).unbind( "change" );
			$( "#countryInput" ).bind( "change", function() { mySendPreviewRequest(); });
			$( "#resourceInput" ).unbind( "change" );
			$( "#resourceInput" ).bind( "change", function() { mySendPreviewRequest(); });
			$( "#priceInput" ).unbind( "change" );
			$( "#priceInput" ).bind( "change", function() { mySendPreviewRequest(); });
			$( "#priceInput" ).bind( "keydown", function() { setTimeout( mySendPreviewRequest, 1000 ); 	});
		}
	}


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
		var block = $( "<table class='blockTravel testDivwhite'></table>" );
		marginBlock.append( block );

		var selectedTicket = null;
		$( "#ticketQuality" ).find( "option" ).each( function() {

			var q = $(this).attr( "value" );
            //alert(q)
			var ticket = $( "<td class='ticketTravel' indexselect='"+ q +"'></td>" );
			ticket.append( "<img src='"+ IMGTICKET +"' class='imageTicket' />" );
			ticket.append( "<div class='healthTicket'>- "+ (40 - ((q-1) * 10)) +"</div>" );
			ticket.append( "<img src='"+ IMGQUALITY + $(this).attr( "value" ) +".png' class='imageQuality' />" );
			block.append( ticket );

			// Find number of items
			var n = 0;
			$( "#userMenu" ).find( ".storageMini" ).each( function() {
				var prod = $(this).find( "div:eq(1)" );
				//alert(prod.find("img:eq(1)").attr( "src" ).replace( IMGQUALITY, "" ).replace( IMGEXTENSION, "" ))
				if( prod.find("img:eq(0)").attr("src") == IMGTICKET ) {
					if( q == prod.find("img:eq(1)").attr( "src" ).replace( IMGQUALITY, "" ).replace( IMGEXTENSION, "" ) ) {
						n = parseInt( $(this).text());
						//alert($(this).text());
						
						
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
		configDamage.append( "<div class='labelLeftConfig'>MU</div>" );
		configDamage.append( MUCheck );
		// Stupid idea to disable MU tooltip
		if( getValue( "MURank" ) ) {
			muBonus = parseInt( getValue( "MURank" ) );
		
		} else configDamage.append( "<div style='width:15px; height:15px; position:absolute; margin:-22px 0px 0px 25px;'></div>" );

		// Location bonus
		var locationCheck = $( "<input id='locCheck' type='checkBox' class='itemBonus' checked='checked' />" );
		configDamage.append( "<div class='labelRightConfig'>LOCATION</div>" );
		configDamage.append( locationCheck );
		configDamage.append( "<br/>" );

		// SD bonus
		var sdCheck = $( "<select id='sdCheck' class='itemBonus customSelectList'></select>" );
		for( var i=0; i<=5; i++ ) {
			sdCheck.append( "<option value='"+ 5*i +"'>Q"+ i +"</option>" );
		}
		configDamage.append( "<div class='labelLeftConfig'>SD</div>" );
		configDamage.append( sdCheck );

		// Hospital bonus
		var hCheck= $( "<select id='hCheck' class='itemBonus customSelectList'></select>" );
		for( var i=0; i<=5; i++ ) {
			hCheck.append( "<option value='"+ 5*i +"'>Q"+ i +"</option>" );
		}
		configDamage.append( "<div class='labelRightConfig'>HOSPITAL</div>" );
		configDamage.append( hCheck );

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
		var maxDamage = 0;
		var minDamage = Number.MAX_VALUE;
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
			maxDamage = maxDamage > totalDmg ? maxDamage : totalDmg;
			minDamage = minDamage < totalDmg ? minDamage : totalDmg;
			averageDamage += totalDmg;
		}

		return( [ parseInt( averageDamage/n ), pointNumber( parseInt( minDamage ) ), pointNumber( parseInt( maxDamage ) ) ] );
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
				tr.children( "td" ).eq( j ).text( pointNumber( dmg[0] ) );
				tr.children( "td" ).eq( j ).tooltip({ tooltipClass: "tooltipHitDamage", position: { my: "center bottom", at: "center top" } });
				tr.children( "td" ).eq( j ).attr( "title", "<b>"+ dmg[1] +" - "+ dmg[2] +"</b>" );
			}
		}
	}


	// Add update salaries in the company menĂş
	function addCompanyButtons() {

		// Get the country ID
		var countryId = IDByImageCountry( $( "a[href^='region.html']" ).prev().attr('class').split(' ')[1]);
		var workerList = $( ".workerListDiv" );
		var offerList = $( ".offerListDiv" );

		var updateSalaries = $( "<input class='updateSalariesButton' type='button' value='Update salaries'/>" );
		updateSalaries.insertBefore( workerList.children().first() );
		updateSalaries.bind( "click", function() {

			// Clean previous results
			workerList.find( ".redText" ).remove();
			workerList.find( ".greenText" ).remove();

			var i=0;
			var checkedSkills = [];
			workerList.find( ".tableRow" ).each( function() {

				// First get the skill number
				var tdList = $(this).find( "td" );
				var skill = parseInt( tdList.eq(1).text() );
				if( checkedSkills.indexOf( skill ) == -1 ) {
					checkedSkills.push( skill );

					setTimeout( function() {
						$.ajax({
							url: getCurrentServer() + URLJobMarket + "?countryId="+ countryId +"&minimalSkill="+ skill,
							success: function( data ) {

								var trList = $( data ).find( ".dataTable" ).find( "tr" );
								// We take the first row
								var salary = trList.eq(1).find( "td" ).eq(4).children( "b" ).text();
								salary = parseFloat( salary );

								workerList.find( ".workerSkill" + skill ).each( function() {
									var classColor;
									var percent;
									var workerSalary = parseFloat( $(this).children( ".salary" ).children( "b" ).text() );
									if( workerSalary < salary ) {
										classColor = "redText";
										percent = "-" + parseInt((salary / workerSalary -1) * 10000) / 100;

									} else {
										classColor = "greenText";
										percent = "+" + parseInt((workerSalary / salary - 1) * 10000) / 100;
									}
									$(this).append( "<b class='"+ classColor +"'>"+ salary +" ("+ percent +"%)</b>" );
								});
							}
						});
					}, 500*i );
					i++;
				}
			});
		});

		var updateJobs = $( "<input class='updateJobsButton' type='button' value='Update jobs'/>" );
		updateJobs.insertBefore( workerList.children().first() );
		updateJobs.bind( "click", function() {

			var id = getUrlVars()[ "id" ];
			$.ajax({
				url: getCurrentServer() + URLCompanyDetails + id,
				success: function( data ) {
					$( data ).find( "#productivityTable" ).find( "tr" ).each( function() {
						var td = $(this).children( "td" ).last();
						var player = $(this).find( "a" );
						if( player ) {
							var place = workerList.find( "a[href='"+ player.attr( "href" ) +"']" ).parent();
							if( td.children( "div" ).length == 2 ) {
								place.append( "<br/>" );
								place.append( "<b>"+ td.children().eq(1).text().replace( "(", "" ).replace( ")", "" ) +"</b>" );
								place.addClass( "greenBackgroundCompany" );

							} else place.addClass( "redBackgroundCompany" );
						}
					});
				}
			});
		});
	}


	// Improve company interface
	function companyImprovements() {
		if( $( "#minimalSkill option" ).length == 14 ) {
			$( "#minimalSkill" ).append( "<option value='15'>15</option>" );
			$( "#minimalSkill" ).append( "<option value='16'>16</option>" );
		}

		var listBlue = $( "#container" ).find( ".testDivblue" );
		var mainMenu = listBlue.eq(2).find( "table" ).eq(1);
		var rowRemove = mainMenu.find( "tr" ).first().children( "td" ).first();
		rowRemove.next().children().css({ "max-width" : "100%" });
		rowRemove.remove();

		// Get the country ID
		var countryId = IDByImageCountry( $( "a[href^='region.html']" ).prev().attr('class').split(' ')[1] );

		// Rellocate some items
		if( listBlue.length == 6 ) {

			var workerList = listBlue.eq(5);
			var offerList = listBlue.eq(4);
			var uglyBox = listBlue.eq(3);
			var createJob = uglyBox.children().first();
			uglyBox.children().first().remove();

			createJob.insertBefore( uglyBox );
			$( "<br/>" ).insertBefore( uglyBox );
			var divBlock = $( "<div style='display:inline-block; width:100%'></div>" )
			divBlock.insertBefore( uglyBox );
			divBlock.append( offerList );
			divBlock.append( workerList );
			uglyBox.css({ "margin-top" : "15px" });

			createJob.removeClass( "testDivwhite" );
			createJob.addClass( "testDivblue" ).css({ "width" : "680px" });
			createJob.children( "p" ).remove();

			var selectedSkill = null;
			$( "#minimalSkill option" ).each( function() {

				var skill = $( "<div class='skillSelector'>"+ $(this).val() +"</div>" );
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
			$( "#minimalSkill" ).hide();

			var firstLine = $( "#minimalSkill" ).parent();
			firstLine.attr( "colspan", "4" );
			createJob.find( "table" ).css({ "width" : "100%" });

			var tr = $( "<tr></tr>" );
			tr.append( firstLine.next().css({ "width" : "33%" }) );
			var td = $( "<td style='width:18%;'></td>" );
			var link = $( "<a class='companyLinkOffers' href='' target='_blank'>View skill offers</a>" );
			tr.append( td.append( link ) );
			tr.append( firstLine.next().css({ "width" : "17%" }) );
			tr.append( firstLine.next().css({ "width" : "26%" }) );
			firstLine.parent().parent().append( tr );

			$( ".skillSelector" ).first().click();
			$( "#price" ).addClass( "priceInputCompany" );
			$( "#price" ).bind( "focus", function() { $(this).select(); });
			$( "#quantity" ).addClass( "quantityMyOffers" );
			$( "#quantity" ).bind( "focus", function() { $(this).select(); });

		} else {
			var workerList = listBlue.eq(4);
			var offerList = listBlue.eq(3);
		}

		workerList.addClass( "workerListDiv" );
		offerList.addClass( "offerListDiv" );

		// Remove useless space
		mainMenu.children( "p" ).remove();

		// Edit image size
		mainMenu.find( ".productLabelRight" ).css({ "height" : "auto", "width" : "40px" });
		//resizeProductImage( mainMenu.find( ".product" ) );

		// Add extra links to check salaries
		workerList.find( ".tableRow" ).each( function() {
			var tdList = $(this).find( "td" );
			// First get the skill number
			var skill = parseInt( tdList.eq(1).text() );
			var viewLink = $( "<a href='"+ getCurrentServer() + URLJobMarket + "?countryId="+ countryId +"&minimalSkill="+ skill +"'>View</a>" );
			tdList.eq(1).append( "<br/>" );
			tdList.eq(1).append( viewLink );
			tdList.eq(2).addClass( "workerSkill" + skill );
		});

		$( "input[name=newSalary]" ).addClass( "priceInputCompany" );
		$( "input[name=newSalary]" ).bind( "focus", function() { $(this).select(); });
		$( "input[name=salary]" ).addClass( "priceInputCompany" );
		$( "input[name=salary]" ).bind( "focus", function() { $(this).select(); });
	}


	// Improve company work results
	function companyWorkResults() {

		// Redesign first block
		var listBlue = $( "#container" ).find( ".testDivwhite " );
		var mainMenu = listBlue.find( "table" );
		mainMenu.find( ".productLabelRight" ).css({ "height" : "auto", "width" : "40px" });
		resizeProductImage( mainMenu.find( ".product" ) );

		//var rowRemove = mainMenu.find( "tr" ).first().children( "td" ).first();
		//rowRemove.next().children().css({ "max-width" : "100%" });
		//rowRemove.remove();

		// Add button to get salary
		var divConfig = $( "<div class='testDivblue' style='width:500px;'></div>" );
		var buttonUpdate = $( "<input class='companyGetSalary' type='button' value='Calculate'/>" );
		divConfig.append( buttonUpdate );
		divConfig.insertAfter( listBlue.prev() );

		var mainBlock = $( "#container" ).find( ".testDivwhite" );
		var idCompany = getUrlVars()[ "id" ];
		buttonUpdate.bind( "click", function() {

			// Remove previous col
			$( "td.playerSalary" ).remove();

			// Add new col
			var index = 0;
			mainBlock.find( "tr" ).each( function() {
				var td = $( "<td class='playerSalary'></td>" );
				if( index == 0 ) { td.append( "Salary" ); }
				$(this).append( td );
				index++;
			});

			mainBlock.css({ "width" : "785px" });
			mainBlock.find( "table" ).css({ "width" : "100%" });

			$.ajax({
				url: getCurrentServer() + URLCompany + idCompany,
				success: function( data ) {
					var blue = $(data).find( ".testDivblue" );
					//alert(blue.length)
					if( blue.length == 6 ) {
						var playerList = blue.eq(5).find( ".tableRow" );
					} else var playerList = blue.eq(4).find( ".tableRow" );
					checkPlayersSalary( playerList, mainBlock );
				}
			});
		});
	}


	// Check player salary
	function checkPlayersSalary( playerList, block ) {
	
		playerList.each( function() {
			
			
			
			var player = $(this).find( "a[href^='profile.html']" );
			var content = $(this).find( ".salary" );
			content.removeClass( "salary" );
			if( content.children().length == 3 ) { content.children().last().remove(); }

			block.find( "tr" ).each( function() {
			
				if( $(this).find( "a[href='"+ player.attr( "href" ) +"']" ).length == 1 ) {
					$(this).find( ".playerSalary" ).append( content );
					$( "<br/>" ).insertBefore( content.children( "b" ) );
					var currency = content.contents().eq(5).text();

					var salary = parseFloat( content.children( "b" ).text() );
					$(this).find( "td" ).each( function() {
						if( $(this).children().length == 2 ) {
							$(this).children().eq(1).css({ "color" : "#009900" });

							var numItems = $(this).children( "div" ).eq(1).text();
							numItems = numItems.replace( "(", "" ).replace( ")", "" );
							numItems = parseFloat( numItems );

							var finalPrice = $( "<div class='finalPrice'>"+ (parseInt( (salary / numItems)*1000 ) / 1000) +"</div>" );
							finalPrice.append( "<br/>" );
						   	finalPrice.append( "<span> "+ currency +"</span>" );
							$(this).append( finalPrice );
						}
					});
				}
			});
		});
		
	trNumber=block.find( "tr" ).length
	
	//alert(trNumber)	
	
	if($('#sum_1').length == 0){
	
	$('#productivityTable > tbody:last').append('<tr><td colspan="2"><b>Sum:</b></td><td id="sum_1"></td><td id="sum_2"></td><td id="sum_3"></td><td id="sum_4"></td><td id="sum_5"></td><td id="sum_6"></td><td id="sum_7"></td><td id="sum_8"></td><td id="sum_9"></td><td id="sum_10"></td><td id="sum_11"></td></tr>');
	
	$('#productivityTable > tbody:last').append('<tr><td colspan="2"><b>Avarage:</b></td><td id="avg_1"></td><td id="avg_2"></td><td id="avg_3"></td><td id="avg_4"></td><td id="avg_5"></td><td id="avg_6"></td><td id="avg_7"></td><td id="avg_8"></td><td id="avg_9"></td><td id="avg_10"></td><td id="avg_11"></td></tr>');
	
	}else{
	
	$('#productivityTable > tbody tr:last td:last').remove()
	$('#productivityTable > tbody tr:eq(-2) td:last').remove()
	
	}
	
	for(i=3;i<13;i++)
	{
		
		
		
		col=$('#productivityTable tr>td:nth-child('+i+')').text()
		col=col.replace(/\t/g, '');
		Productivity=col.match(/[\n\r]\d{3}\.\d{0,2}/g);
		Product=col.match(/\(\d{0,10}\.\d{0,2}\)/g);
		
		price_one=col.match(/\d{1,5}\.\d{0,3} .../g);
		
		//alert(Productivity)
		
		if(Productivity != null)
		{
			Productivity= Productivity.join().match(/\d{0,10}\.\d{0,2}/g);
			
			//alert(Productivity)
			
			Sum_productivity=0;
			
			for(var x = 0; x < Productivity.length; x++)
			{
			  Sum_productivity = Sum_productivity + Number(Productivity[x]);  //or Sum += scores[x];
			}

			average_productivity = Sum_productivity / Productivity.length;
		
		}else{
			
			Sum_productivity=0
			average_productivity=0;
		
		}
		
		
		if(Product != null)
		{
			Product= Product.join().match(/\d{0,10}\.\d{0,2}/g);
			
			Sum_product=0;
			
			for(var x = 0; x < Product.length; x++)
			{
			  Sum_product = Sum_product + Number(Product[x]);  //or Sum += scores[x];
			}

			average_product = Sum_product / Product.length;
			
			//alert(average_product)
			
		}else{
			
			Sum_product=0
			average_product=0;
		
		}
		
		
		if(price_one != null)
		{
			
			price_one= price_one.join().match(/\d{1,5}\.\d{0,3}/g);
			
			Sum_price_one=0;
			
			for(var x = 0; x < price_one.length; x++)
			{
			  Sum_price_one = Sum_price_one + Number(price_one[x]);  //or Sum += scores[x];
			}

			average_price_one = Sum_price_one / price_one.length;
			
			
		}else{
			
			Sum_price_one=0
			average_price_one=0;
		
		}
		
	
		$('#sum_'+(i-2)).html("<div>"+Sum_productivity.toFixed(2)+"</div><div style='color: rgb(0, 153, 0);font-weight:normal;'>"+Sum_product.toFixed(2)+"</div>")
		
		$('#avg_'+(i-2)).html("<div>"+average_productivity.toFixed(2)+"</div><div style='color: rgb(0, 153, 0);'>"+average_product.toFixed(2)+"</div><div class='finalPrice'>"+average_price_one.toFixed(4)+"</div>")
		
		
		
		
	}
	
	col_sal=$('#productivityTable tr>td:nth-child(13)').text();
	sal=col_sal.match(/\d{1,3}\.\d{0,2}/g)
	
	Sum_sal=0;
		
	for(var x = 0; x < sal.length; x++)
	{
	  Sum_sal = Sum_sal + Number(sal[x]);  //or Sum += scores[x];
	}

	average_sal = Sum_sal / sal.length;
	
	$('#avg_11').html("<div style='color: rgb(0, 153, 0);'>"+average_sal.toFixed(2)+"</div>")
	$('#sum_11').html("<div style='color: rgb(0, 153, 0);'>"+Sum_sal.toFixed(2)+"</div>")
	
	
	
	//
	
	
	}


	// Replace job skill selector
	function jobMarketSkills() {
		if( $( "#minimalSkill option" ).length == 14 ) {
			$( "#minimalSkill" ).append( "<option value='15'>15</option>" );
			$( "#minimalSkill" ).append( "<option value='16'>16</option>" );
		}

		$( "#countryId" ).addClass( "customSelectList" );
		$( "#jobMarketForm" ).parent().css({ "width" : "550px" });
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
        

        var url = "http://e-sim.home.pl/testura/js/jquery.countdown.min.js";  
        var script2 = document.createElement("script");  
        script2.setAttribute("src", url);  
        document.getElementsByTagName("head")[0].appendChild(script2);   
        
        
		$( "#countryId" ).addClass( "customSelectList" );
		//$( "#sorting" ).prev().remove();
		//$( "#sorting" ).prev().remove();

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
		var updateTime = $( "<input class='updateTimeListBattle' type='button' value='Update Battle List'/>" );
		updateTime.insertAfter( $( "#battlesViewForm" ).parent() );
		updateTime.bind( "click", function() { 

			var i=0;
			var y=0;
			$( "#battlesTable" ).find( "tr" ).each( function() {
				var related = $(this);
				var href = $(this).find( "a[href^='battle.html?id=']" );
				if( href.length == 1 ) {
					setTimeout( function() {
						$.ajax({
							url: href.attr( "href" ),
							success: function( data ) { 
							 
                                // Battle Time
								related.find( ".roundTimeRemain" ).remove();
                                
                                var timeremain = "";
                                
                                regexp =/liftoffTime\.setHours\(liftoffTime.getHours\(\) \+ (\d{1,2})\)/g 
                                
                                var hour = regexp.exec(data)
                                var hour = hour[1]
                                
                                
                                regexp =/liftoffTime\.setMinutes\(liftoffTime.getMinutes\(\) \+ (\d{1,2})\)/g 
                                
			                 	var min = regexp.exec(data)
			                 	var min = min[1]
                                
                                regexp =/liftoffTime\.setSeconds\(liftoffTime.getSeconds\(\) \+ (\d{1,2})\)/g 
			                 	var sec = regexp.exec(data)
			                 	var sec = sec[1]
                                
                                
                                hour = "0" + hour;
								min = (min < 10) ? "0"+min : min;
								sec = (sec < 10) ? "0"+sec : sec;
                                
								var lastTD = related.children().last();
								lastTD.removeClass( "roundClean" );
								lastTD.removeClass( "roundLastHour" );
								lastTD.removeClass( "roundLastHalfHour" );
								if( hour == 0 ) {
									if( min < 30 ) {
										lastTD.addClass( "roundLastHalfHour" );

									} else lastTD.addClass( "roundLastHour" );

								} else lastTD.addClass( "roundClean" );

								//hour = "0" + hour;
								//min = (min < 10) ? "0"+min : min;
								//sec = (sec < 10) ? "0"+sec : sec;
								related.children().last().append( "<div class='roundTimeRemain'>"+ hour +":"+ min +":"+ sec +"</div>" );
                                
                                //Mini Info
                                
                                firstTD = related.children().first();
                                
                                subsidy = firstTD.find(".battleDiv").find("div").last().html();

                                info = $(data).find("#roundCountdown").parent().parent().parent().html();
                                
                                topDef1 = $(data).find("#topDefender1").html();
                                topDef2 = $(data).find("#topDefender2").html();
                                topDef3 = $(data).find("#topDefender3").html();
                                
                                topAtt1 = $(data).find("#topAttacker1").html();
                                topAtt2 = $(data).find("#topAttacker2").html();
                                topAtt3 = $(data).find("#topAttacker3").html();
                                
                                firstTD.html(info+subsidy)
                                
                                firstTD.find("#fb-root").parent().prev().html(topDef1+topDef2+topDef3);
                                firstTD.find("#fb-root").parent().next().html(topAtt1+topAtt2+topAtt3);
                                firstTD.find("#fb-root").parent().remove();
                                
                                firstTD.find(".attackerHit").parent().attr("class","foundation-style column-margin-vertical column small-5")
                                firstTD.find(".attackerHit").attr("style","float: left; width: 75px; margin-right: 5px")
                                
                                firstTD.find(".defenderHit").parent().attr("class","foundation-style column-margin-vertical column small-5")
                                firstTD.find(".defenderHit").attr("style","float: right; width: 75px; margin-right: 5px")
                                
                                
                                firstTD.find("#defenderScore").parent().parent().attr("class","foundation-style column-margin-vertical column small-5 foundation-text-center")
                                firstTD.find("#attackerScore").parent().parent().attr("class","foundation-style column-margin-vertical column small-5 foundation-text-center")
                                
                                firstTD.find("a[href*='region.html?id=']").attr("href",href.attr( "href" ))
                                
                                firstTD.find('#roundCountdown').attr("id","roundCountdown"+y)
                                firstTD.find('#roundCountdown'+y).attr("class","roundCountdown")
                                firstTD.find('#roundCountdown'+y).html(hour +":"+ min +":"+ sec)
                                
                                
                                
                               /* var eval(liftoffTime+y) = new Date();
                        		eval(liftoffTime+y).setHours(liftoffTime.getHours() + hour);
                       			eval(liftoffTime+y).setMinutes(liftoffTime.getMinutes() + min);
                       			eval(liftoffTime+y).setSeconds(liftoffTime.getSeconds() + sec);
                                firstTD.find('#roundCountdown'+y).countdown({until: eval(liftoffTime+y), compact: true, format: 'HMS'});
                                */
                                y++
                                
							}
						});
                        
                        
                        
					}, 500*i );

					i++;
				}
			});
            
            
            
            
		});
	}
    
    //GET URL PARAMETER
    function getURLParameter(url, name) {
        return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
    }
    
    
	
	// motivate
	function motivate(RCID,Type){
	
		$.post(getCurrentServer()+NOO()+"/motivateCitizen.html?id=" + RCID, {
			id: RCID,
			type: Type
		}, function (data) {
			var patt = /<div style="width:400px;" class="testDivred"><img src="http:\/\/e-sim.home.pl\/testura\/img\/delete.png" style="float: left"\/>/g;
			var result = patt.test(data);
			//prompt("a",data);
			if (result) {
				alert("Something is wrong! ");
				}else{
				alert("OK! You got +1 food limit.");
				location.reload();
				}}
		);	
			
			
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
	function setTravelLocation( id, travelRW, travelLeft, travelRight, attackerId ) {
	       
           
		var currentDate = (new Date).getDate();
		var lastDate = getValue( "LastUpdateAPIRegion" );
		var needUpdate = (lastDate != currentDate);
        finded=false;
		var value = getValue( "APIRegionJSON" );
		var value2 = getValue( "APIMapJSON" );
		if( value && !needUpdate && value2 ) {

			var json = $.parseJSON( value );
			for( var i=0; i<json.length; i++ ) {
				if( json[i].id == id ) { 
					travelRW.children( "a" ).attr( "href", getCurrentServer()+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
					travelRW.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

					travelLeft.children( "a" ).attr( "href", getCurrentServer()+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
					travelLeft.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );
                    
                    
                    //alert(json[i].neighbours);
                    //alert(attackerId);
                    
                    //alert("cache")
                    
					// Check neighbours
					for( var j=0; j<json.length; j++ ) {
					   
                      
                      
							if(  $.inArray( json[j].id, json[i].neighbours ) != -1 ) {
        						  
                                  
                                    //alert(json[j].id+"----"+ json[i].neighbours)
                                   
                                       var json2 = $.parseJSON( value2 ); 
                                        
                                        for( var x=0; x<json2.length; x++ ) {
                                                
                                          if(json[j].id==json2[x].regionId) { 
                                            
                                           // alert(json[j].id+"=="+json2[x].regionId)
                                            
                                                 if(json2[x].occupantId == attackerId)
                                                    { 
                                                       // alert(json2[x].occupantId +"---"+ attackerId)
                                                        
                                                        travelRight.children( "a" ).attr( "href", getCurrentServer()+URLTravel+"?idc="+json2[x].occupantId+"&idr="+json[j].id );
                                                        travelRight.children( "a" ).append( "<br/><b>"+ json[j].name +"</b>" );
                                                        
                                                        finded=true;
                                                        break;
                                                        
                                                        
                                                    }
                                            }
                                        }
                                        
				                    
                                    
                                  
                                    //alert(json[j].name)
                                  
        							if(finded) break;
                                   
                                    
        						}
					}
				}
			}

		} else {
            
//            alert("NET")
            
            
			$.ajax({
				url: getCurrentServer() + URLAPIRegion,
                async: false,
				success: function( data ) {
					setValue( "APIRegionJSON", data );
					setValue( "LastUpdateAPIRegion", currentDate );
                    

					var json = $.parseJSON( data );
					for( var i=0; i<json.length; i++ ) {
						if( json[i].id == id ) {
							travelRW.children( "a" ).attr( "href", getCurrentServer()+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
							travelRW.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

							travelLeft.children( "a" ).attr( "href", getCurrentServer()+URLTravel+"?idc="+json[i].homeCountry+"&idr="+json[i].id );
							travelLeft.children( "a" ).append( "<br/><b>"+ json[i].name +"</b>" );

							// Check neighbours
        					for( var j=0; j<json.length; j++ ) {
        					   
                               
                              
        						if(  $.inArray( json[j].id, json[i].neighbours ) != -1 ) {
        						  
                                    $.ajax({
				                    url: getCurrentServer() + URLAPIMap,
                                    async: false,
				                    success: function( data2 ) {
				                       
                                       setValue( "APIMapJSON",data2 ); 
                                        
                                       var json2 = $.parseJSON( data2 ); 
                                        
                                        for( var x=0; x<json2.length; x++ ) {
                                                
                                          if(json[j].id==json2[x].regionId) { 
                                                 if(json2[x].occupantId == attackerId)
                                                    { 
                                                        travelRight.children( "a" ).attr( "href", getCurrentServer()+URLTravel+"?idc="+json2[x].occupantId+"&idr="+json[j].id );
                                                        travelRight.children( "a" ).append( "<br/><b>"+ json[j].name +"</b>" );
                                                        
                                                         finded=true;
                                                        break;
                                                    }
                                            }
                                        }
                                        
				                    }})
                                    
                                  
                                    //alert(json[j].name)
                                  
        								if(finded) break;
                                   
                                    
        						}
        					}							
						}
					}
				}
			});
		}
	}
	
	//Profile Calc
	function ProfileCalc()
	{
	{ //design
	var des = ' \
	<table> \
		<tbody> \
		<tr> \
			<td> \
				<div style="width:70px; height:45px"> \
					<b>Weapons:</b> \
					<br> \
					<select class="foundation-style" id="weaponQ"> \
						<option value="0.5">None</option> \
						<option value="1.2">Q1</option> \
						<option value="1.4">Q2</option> \
						<option value="1.6">Q3</option> \
						<option value="1.8">Q4</option> \
						<option value="2.0">Q5</option> \
					</select> \
					</div> \
			</td> \
			<td> \
				<div style="width:120px; height:45px"> \
					<b style="float:center">Region Building:</b> \
					<br> \
					<select class="foundation-style"  id="buildingType" style=""> \
						<option value="1">None</option> \
						<option value="2">DS</option> \
						<option value="3">Hosp.</option> \
					</select> \
					<select class="foundation-style"  id="buildingQ" style=""> \
						<option value="0">  </option> \
						<option value="1">Q1</option> \
						<option value="2">Q2</option> \
						<option value="3">Q3</option> \
						<option value="4">Q4</option> \
						<option value="5">Q5</option> \
					</select> \
				</div> \
			</td> \
			<td> \
			<div style="width:50px; height:45px"> \
				<b style="float:center">Food:</b> \
				<br> \
				<input class="foundation-style"  type="number" min="0" id="foodNum" value="15" style="max-width : 30px"> \
			</div> \
			</td> \
			<td> \
			<div style="width:50px; height:45px"> \
				<b style="float:center">Gift:</b> \
				<br> \
				<input class="foundation-style"  type="number" min="0" id="giftNum" value="15" style="max-width : 30px"> \
			</div> \
			</td> \
			<td> \
				<div style=" width:60px; height:45px"> \
					<b style="float:center">Health:</b> \
					<br> \
					<input class="foundation-style"  type="number" min="0" max="100" step="0.5" id="healthNum" value="50" style="max-width : 40px"> \
				</div> \
			</td> \
		</tr> \
		<tr> \
			<td> \
				<div class="statsLabel smallStatsLabel greenLabel" style=""> \
					<b>Region:</b> \
					<input class="foundation-style"  type="checkbox" id="regionBonus" value="1.2"> \
				</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel greenLabel" style="width:105px"> \
				<b>MU:</b> \
				<input class="foundation-style"  type="checkbox" id="muBonus" value="1"> \
			</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel greenLabel" style=""> \
				<b>Sewer/Bunker:</b> \
				<input class="foundation-style"  type="checkbox" id="swrbunkBonus" value="1.25"> \
			</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel greenLabel" style=""> \
				<b>Tank:</b> \
				<input class="foundation-style"  type="checkbox" id="tankBonus" value="1.2"> \
			</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel greenLabel" style=""> \
				<b>Steroids:</b> \
				<input class="foundation-style"  type="checkbox" id="steroidBonus" value="1.2"> \
			</div> \
			</td> \
		</tr> \
		<tr> \
			<td></td> \
			<td> \
			<div class="statsLabel smallStatsLabel redLabel" style=""> \
				<b style="; padding-top:3px">Surrounded:</b> \
				<input class="foundation-style"  type="checkbox" id="surroundDebuff" value="0.8" style=""> \
			</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel redLabel" style=""> \
				<b>Sewer/Bunker:</b> \
				<input class="foundation-style"  type="checkbox" id="swrbunkDebuff" value="0.8"> \
			</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel redLabel" style=""> \
				<b>Tank:</b> \
				<input class="foundation-style"  type="checkbox" id="tankDebuff" value="1"> \
			</div> \
			</td> \
			<td> \
			<div class="statsLabel smallStatsLabel redLabel" style=""> \
				<b>Steroids:</b> \
				<input class="foundation-style"  type="checkbox" id="steroidDebuff" value="0.8"> \
			</div> \
			</td> \
		</tr> \
		<tr> \
			<td colspan="2">  \
				<div style=""> \
					<b>Est. Berserk:</b> \
					<br> \
					<div class="help equipmentBlueBox" style="float:none;margin:auto; width:100px"> \
						<b id="estBerserk">9001</b> \
					</div> \
				</div> \
			</td> \
			<td></td> \
			<td colspan="2"> \
			<div style=" "> \
			<b>Est. Damage:</b> \
			<br> \
			<div class="help equipmentBlueBox" style="margin:auto; width:100px;float:none;"> \
				<b id="estTotal">9001</b> \
			</div> \
			</div> \
			</td> \
		</tr> \
		</tbody> \
	</table> \
	'; 

	}

	$.fn.exists = function () {
		return this.length !== 0;
	}
	
	$( "#profileEquipment" ).parent().css({ "height" : "370px" });
	$( "#profileEquipment" ).parent().append(des);
	
	var minDmg = parseInt($('#hitHelp b').first().text().replace(',',''));
	var maxDmg = parseInt($('#hitHelp b').last().text().replace(',',''));
	var avgHit = (minDmg + maxDmg) / 2;
	
	var crit = $('#criticalHelp .equipmentStats').first().text();
	crit = parseFloat(crit.replace('%','')) / 100.0;
	
	var miss = $('#missHelp .equipmentStats').first().text();
	miss = parseFloat(miss.replace('%','')) / 100.0;
	
	var avoid = $('#avoidHelp .equipmentStats').first().text();
	avoid = parseFloat(avoid.replace('%','')) / 100.0;
	
	var muValue = 1.0;
	if($('a[href^="militaryUnit.html?id="]').exists())
	{
		var muID = $('a[href^="militaryUnit.html?id="]').first().attr('href').replace('militaryUnit.html?id=', '');
		var query = 'apiMilitaryUnitById.html?';
		var json = $.getJSON(query, "id="+muID).done(function (data) {
			switch(data.militaryUnitType) {
				case "Novice":
					muValue = 1.05;
				break;
				case "Regular":
					muValue = 1.1;
				break;
				case "Veteran":
					muValue = 1.15;
				break;
				case "Elite":
					muValue = 1.2;
				break;
			}
		});
	}

	function calcMissAvoid( numHits, depth )
	{
		depth++;
		var numHits = numHits * (1 - miss);
		var newHits = numHits * avoid;
		if( depth == 10 ) {
			return numHits;
		} else {
			return numHits + arguments.callee( newHits, depth );
		}			
	}
	
	function calc() {
		var hit = avgHit * parseFloat($("#weaponQ").val());
		
		if($("#buildingType").val() == 2) { 
			hit = hit * (1 + parseInt($("#buildingQ").val()) * 0.05);
		}
		
		if($("#steroidBonus").is(":checked")) { hit = hit * 1.2; }
		else if($("#steroidDebuff").is(":checked")) { hit = hit * 0.8; }
		
		if($("#tankBonus").is(":checked")) { hit = hit * 1.2; }

		if($("#swrbunkBonus").is(":checked")) { hit = hit * 1.25; }
		else if($("#swrbunkDebuff").is(":checked")) { hit = hit * 0.8; }
		
		if($("#muBonus").is(":checked")) { hit = hit * muValue; } //FIX!
		
		if($("#regionBonus").is(":checked")) { hit = hit * 1.2; }
		
		if($("#surroundDebuff").is(":checked")) { hit = hit * 0.8; }
		
		hit = hit * (1 + crit);
		$("#estBerserk").html(commaNumber(Math.round(hit*5)));
		
		var totalHealth = parseFloat($("#healthNum").val());
		totalHealth += parseInt($("#foodNum").val()) * 50;
		totalHealth += parseInt($("#giftNum").val()) * 50;
		
		var healthPerHit = 10;
		if($("#buildingType").val() == 3) { 
			healthPerHit -= (parseInt($("#buildingQ").val()) * 0.5);
		}
		
		var totalHits = Math.floor(totalHealth / healthPerHit);
		totalHits = calcMissAvoid( totalHits, 0 );
		
		var totalDamage = totalHits * hit;
		
		$("#estTotal").html(commaNumber(Math.round(totalDamage)));
	}
	
	function cssSetDisabled(item)
	{
		$( item ).parent().css( "background-color", "rgb(219, 219, 219)" );
		$( item ).parent().css( "border", "1px solid rgba(0, 0, 0, 0.7)" );
		$( item ).parent().css( "box-shadow", "0 0 5px rgba(0, 0, 0, 0.5), 0 -12px 12px rgba(144, 169, 1156, 0.2) inset" );
		$( item ).parent().css( "webkit-box-shadow", "0 0 5px rgba(0, 0, 0, 0.5), 0 -12px 12px rgba(144, 169, 1156, 0.2) inset" );
	}
	
	function cssSetEnabled(item)
	{
		$( item ).parent().removeAttr("style");
		$( item ).parent().attr("style", "");
		if (item == "#surroundDebuff")
			$( item ).parent().attr("style", "; width:125px");
	}
	
	cssSetDisabled("#tankBonus");
	$("#tankBonus").prop("disabled", true);
	$("#buildingQ").prop("disabled", true);
	calc();
	
	$("#weaponQ").change( function(){ 
		if($("#weaponQ").val() != 2.0)
		{
			cssSetDisabled("#tankBonus");
			$("#tankBonus").prop("disabled", true);
			if($("#tankBonus").is(":checked"))
			{
				$("#tankBonus").attr('checked', false);
				cssSetEnabled("#tankDebuff");
				$("#tankDebuff").prop("disabled", false);
			}
		} else {
			cssSetEnabled("#tankBonus");
			$("#tankBonus").prop("disabled", false);
		}
		calc(); 
	});
	$("#buildingType").change( function(){ 
		if($("#buildingType").val() == 1)
		{
			$("#buildingQ").prop("disabled", true);
			$("#buildingQ").val("0");
		} else {
			$("#buildingQ").prop("disabled", false);
		}
		calc(); 
	});
	$("#buildingQ").change( function(){ calc(); });
	$("#foodNum").change( function(){ 
		if(parseInt($("#foodNum").val()) < 0)
		{
			$("#foodNum").val("0");
		}
		calc(); 
	});
	$("#giftNum").change( function(){ 
		if(parseInt($("#giftNum").val()) < 0)
		{
			$("#giftNum").val("0");
		}
		calc(); 
	});
	$("#healthNum").change( function(){ 
		if(parseFloat($("#healthNum").val()) < 0)
		{
			$("#healthNum").val("0.0");
		} else if (parseFloat($("#healthNum").val()) > 100.0) 
		{
			$("#healthNum").val("100.0");
		}
		calc(); 
	});
	$("#regionBonus").change( function(){ calc(); });
	$("#muBonus").change( function(){ calc(); });
	$("#swrbunkBonus").change( function(){ 
		if($("#swrbunkBonus").is(":checked"))
		{
			cssSetDisabled("#swrbunkDebuff");
			$("#swrbunkDebuff").prop("disabled", true);
			cssSetDisabled("#surroundDebuff");
			$("#surroundDebuff").prop("disabled", true);
		} else {
			cssSetEnabled("#swrbunkDebuff");
			$("#swrbunkDebuff").prop("disabled", false);
			cssSetEnabled("#surroundDebuff");
			$("#surroundDebuff").prop("disabled", false);
		}
		calc(); 
	});
	$("#tankBonus").change( function(){ 
		if($("#tankBonus").is(":checked"))
		{
			cssSetDisabled("#tankDebuff");
			$("#tankDebuff").prop("disabled", true);
		} else {
			cssSetEnabled("#tankDebuff");
			$("#tankDebuff").prop("disabled", false);
		}
		calc(); 
	});
	$("#steroidBonus").change( function(){ 
		if($("#steroidBonus").is(":checked"))
		{
			cssSetDisabled("#steroidDebuff");
			$("#steroidDebuff").prop("disabled", true);
		} else {
			cssSetEnabled("#steroidDebuff");
			$("#steroidDebuff").prop("disabled", false);
		}
		calc(); 
	});
	$("#surroundDebuff").change( function(){ 
		if($("#surroundDebuff").is(":checked"))
		{
			cssSetDisabled("#swrbunkBonus");
			$("#swrbunkBonus").prop("disabled", true);
		} else {
			if(!$("#swrbunkDebuff").is(":checked"))
			{
				cssSetEnabled("#swrbunkBonus");
				$("#swrbunkBonus").prop("disabled", false);
			}
		}
		calc(); 
	});
	$("#swrbunkDebuff").change( function(){ 
		if($("#swrbunkDebuff").is(":checked"))
		{
			cssSetDisabled("#swrbunkBonus");
			$("#swrbunkBonus").prop("disabled", true);
		} else {
			if(!$("#surroundDebuff").is(":checked"))
			{
				cssSetEnabled("#swrbunkBonus");
				$("#swrbunkBonus").prop("disabled", false);
			}
		}
		calc(); 
	});
	$("#tankDebuff").change( function(){ 
		if($("#tankDebuff").is(":checked"))
		{
			cssSetDisabled("#tankBonus");
			$("#weaponQ").prop("disabled", true);
			$("#tankBonus").prop("disabled", true);
			$("#weaponQ").val("0.5");
		} else {
			$("#weaponQ").prop("disabled", false);
		}
		calc(); 
	});
	$("#steroidDebuff").change( function(){ 
		if($("#steroidDebuff").is(":checked"))
		{
			cssSetDisabled("#steroidBonus");
			$("#steroidBonus").prop("disabled", true);
		} else {
			cssSetEnabled("#steroidBonus");
			$("#steroidBonus").prop("disabled", false);
		}
		calc(); 
	});
	
	
	
	}
	
	

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

	var URLBattle = "/battle.html?id=";
	var localUrl = new String( window.location );
	if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {

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

		createResourceVar( "SWweaponQ0" );
		createResourceVar( "SWweaponQ1" );
		createResourceVar( "SWweaponQ2" );
		createResourceVar( "SWweaponQ3" );
		createResourceVar( "SWweaponQ4" );
		createResourceVar( "SWweaponQ5" );
		createResourceVar( "SWweaponQ0Big" );
		createResourceVar( "SWweaponQ1Big" );
		createResourceVar( "SWweaponQ2Big" );
		createResourceVar( "SWweaponQ3Big" );
		createResourceVar( "SWweaponQ4Big" );
		createResourceVar( "SWweaponQ5Big" );

		createResourceVar( "PokweaponQ0" );
		createResourceVar( "PokweaponQ1" );
		createResourceVar( "PokweaponQ2" );
		createResourceVar( "PokweaponQ3" );
		createResourceVar( "PokweaponQ4" );
		createResourceVar( "PokweaponQ5" );
		createResourceVar( "PokweaponQ0Big" );
		createResourceVar( "PokweaponQ1Big" );
		createResourceVar( "PokweaponQ2Big" );
		createResourceVar( "PokweaponQ3Big" );
		createResourceVar( "PokweaponQ4Big" );
		createResourceVar( "PokweaponQ5Big" );
	}

	
	
	
	
	// Inject our main script
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild( script );
}