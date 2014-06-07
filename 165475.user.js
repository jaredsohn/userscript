// ==UserScript==
// @name           eSim EasyDelivery Mod
// @namespace      localhost
// @author         aMiTo, calin, fredtec
// @description    This script improves e-Sim all around by adding missing links, buttons, etc.
// @include        http://*.e-sim.org/*
// @match          http://*.e-sim.org/*
// @grant          all
// @version        0.6.4f
// @icon           http://e-sim.home.pl/eworld/img/favicon.png
// @downloadURL    http://userscripts.org/scripts/source/165475.user.js
// @updateURL      http://userscripts.org/scripts/source/165475.meta.js
// ==/UserScript==
// original script from: http://userscripts.org/scripts/show/132316

var main = function () {
    
    // CONSTANTS
    var VERSION = 					"0.6.4f";
    var URLSCRIPT  = 				"http://userscripts.org/scripts/show/165475";
    // CUSTOM IMAGE LINKS
    var URLDROPBOX = 				"https://dl.dropboxusercontent.com/u/15017440/e-sim_script/";
    var Q0WEAPON = 					"weapon0.png";
    var Q1WEAPON = 					"weapon1.png";
    var Q2WEAPON = 					"weapon2.png";
    var Q3WEAPON = 					"weapon3.png";
    var Q4WEAPON = 					"weapon4.png";
    var Q5WEAPON = 					"weapon5.png";
    var QUALITYSTAR = 				"http://dl.dropbox.com/u/78035768/eSim/star.png";
    // API
    var URLAPIRanks =				"e-sim.org/apiRanks.html";
    var URLAPIRegion =				"e-sim.org/apiRegions.html";
    // URLs
    var URLMain = 					"e-sim.org/index.html";
    var URLMU = 					"e-sim.org/myMilitaryUnit.html";
    var URLMUStorage = 				"e-sim.org/militaryUnitStorage.html";
    var URLMUMoney = 				"e-sim.org/militaryUnitMoneyAccount.html";
    var URLDDonatePlayerProduct = 	"e-sim.org/donateProducts.html?id=";
    var URLDonateMUProduct = 		"e-sim.org/donateProductsToMilitaryUnit.html?id=";
    var URLMUCompanies = 			"e-sim.org/militaryUnitCompanies.html?id=";
    var URLCompany = 				"e-sim.org/company.html?id=";
    var URLCompanyDetails = 		"e-sim.org/companyWorkResults.html?id=";
    var URLBattle = 				"e-sim.org/battle.html?id=";
    var URLContract = 				"e-sim.org/contract.html?id=";
    var URLMarket = 				"e-sim.org/productMarket.html";
    var URLMonetaryMarket = 		"e-sim.org/monetaryMarket.html";
    var URLMarketOffers = 			"e-sim.org/citizenMarketOffers.html";
    var URLMyShares = 				"e-sim.org/myShares.html";
    var URLStockMM = 				"e-sim.org/stockCompanyMoney.html";
    var URLStockProducts = 			"e-sim.org/stockCompanyProducts.html";
    var URLStockDonateMoney = 		"e-sim.org/stockCompanyDonateMoney.html";
    var URLStockDonateCompany = 	"e-sim.org/stockCompanyDonateCompany.html";
    var URLStockLogs = 				"e-sim.org/stockCompanyLogs.html";
    // CUSTOM URLs
    var URLCOLORBOX = 				"http://www.jacklmoore.com/colorbox/example1/colorbox.css";
    var URLALLSUB = 				"e-sim.org/subscribedNewspapers.html";
    var URLINBOXMsg = 				"e-sim.org/inboxMessages.html";
    var URLSENDBOXMsg = 			"e-sim.org/sentMessages.html";
    var URLHISTORYMsg = 			"e-sim.org/conversation.html?id=";
    var URLMUHOMEPAGE = 			"e-sim.org/militaryUnit.html?id=";
    var URLARTICLE = 				"e-sim.org/article.html?id=";
    var URLUNSUBNEWS = 				"e-sim.org/unsub.html?id=";
    var URLSUBNEWS = 				"e-sim.org/sub.html?id=";
    var URLPROFILE = 				"e-sim.org/profile.html?id=";
    var URLSaleCompany = 			"e-sim.org/companiesForSale.html";
    
    // Image resources
    var IMGIRON = 					"http://e-sim.home.pl/eworld/img/productIcons/Iron.png";
    var IMGGRAIN = 					"http://e-sim.home.pl/eworld/img/productIcons/Grain.png";
    var IMGOIL = 					"http://e-sim.home.pl/eworld/img/productIcons/Oil.png";
    var IMGDIAMONDS = 				"http://e-sim.home.pl/eworld/img/productIcons/Diamonds.png";
    var IMGWOOD = 					"http://e-sim.home.pl/eworld/img/productIcons/Wood.png";
    var IMGSTONE = 					"http://e-sim.home.pl/eworld/img/productIcons/Stone.png";
    var IMGWEAPON = 				"http://e-sim.home.pl/eworld/img/productIcons/Weapon.png";
    var IMGFOOD = 					"http://e-sim.home.pl/eworld/img/productIcons/Food.png";
    var IMGTICKET = 				"http://e-sim.home.pl/eworld/img/productIcons/Ticket.png";
    var IMGGIFT = 					"http://e-sim.home.pl/eworld/img/productIcons/Gift.png";
    var IMGHOUSE = 					"http://e-sim.home.pl/eworld/img/productIcons/House.png";
    var IMGDS = 					"http://e-sim.home.pl/eworld/img/productIcons/Defense System.png";
    var IMGHOSPITAL = 				"http://e-sim.home.pl/eworld/img/productIcons/Hospital.png";
    var IMGESTATE = 				"http://e-sim.home.pl/eworld/img/productIcons/Estate.png";
    var IMGQUALITY = 				"http://e-sim.home.pl/eworld/img/productIcons/q";
    var IMGEXTENSION = 				".png";
    // Image countries
    var ARGENTINA =					"http://e-sim.home.pl/eworld/img/flags/small/Argentina.png";
    var AUSTRALIA =					"http://e-sim.home.pl/eworld/img/flags/small/Australia.png";
    var BELARUS =					"http://e-sim.home.pl/eworld/img/flags/small/Belarus.png";
    var BELGIUM = 					"http://e-sim.home.pl/eworld/img/flags/small/Belgium.png";
    var BOSNIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Bosnia-and-Herzegovina.png"
    var BRAZIL = 					"http://e-sim.home.pl/eworld/img/flags/small/Brazil.png";
    var BULGARIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Bulgaria.png";
    var CANADA = 					"http://e-sim.home.pl/eworld/img/flags/small/Canada.png";
    var CHILE = 					"http://e-sim.home.pl/eworld/img/flags/small/Chile.png";
    var CHINA = 					"http://e-sim.home.pl/eworld/img/flags/small/China.png";
    var COLOMBIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Colombia.png";
    var CROATIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Croatia.png";
    var CZECH = 					"http://e-sim.home.pl/eworld/img/flags/small/Czech-Republic.png";
    var ESTONIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Estonia.png";
    var FINLAND = 					"http://e-sim.home.pl/eworld/img/flags/small/Finland.png";
    var FRANCE = 					"http://e-sim.home.pl/eworld/img/flags/small/France.png";
    var GERMANY = 					"http://e-sim.home.pl/eworld/img/flags/small/Germany.png";
    var GREECE = 					"http://e-sim.home.pl/eworld/img/flags/small/Greece.png";
    var HUNGARY = 					"http://e-sim.home.pl/eworld/img/flags/small/Hungary.png";
    var INDIA = 					"http://e-sim.home.pl/eworld/img/flags/small/India.png";
    var INDONESIA = 				"http://e-sim.home.pl/eworld/img/flags/small/Indonesia.png";
    var IRAN = 						"http://e-sim.home.pl/eworld/img/flags/small/Iran.png";
    var IRELAND = 					"http://e-sim.home.pl/eworld/img/flags/small/Ireland.png";
    var ISRAEL = 					"http://e-sim.home.pl/eworld/img/flags/small/Israel.png";
    var ITALY = 					"http://e-sim.home.pl/eworld/img/flags/small/Italy.png";
    var LATVIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Latvia.png";
    var LITHUANIA = 				"http://e-sim.home.pl/eworld/img/flags/small/Lithuania.png";
    var MALAYSIA = 					"http://e-sim.home.pl/eworld/img/flags/small/Malaysia.png";
    var MEXICO = 					"http://e-sim.home.pl/eworld/img/flags/small/Mexico.png";
    var NETHERLANDS = 				"http://e-sim.home.pl/eworld/img/flags/small/Netherlands.png";
    var NORWAY =	 				"http://e-sim.home.pl/eworld/img/flags/small/Norway.png";
    var PAKISTAN =	 				"http://e-sim.home.pl/eworld/img/flags/small/Pakistan.png";
    var PERU =		 				"http://e-sim.home.pl/eworld/img/flags/small/Peru.png";
    var PHILIPPINES =				"http://e-sim.home.pl/eworld/img/flags/small/Philippines.png";
    var POLAND =					"http://e-sim.home.pl/eworld/img/flags/small/Poland.png";
    var PORTUGAL =					"http://e-sim.home.pl/eworld/img/flags/small/Portugal.png";
    var FYROM =						"http://e-sim.home.pl/eworld/img/flags/small/Republic-of-Macedonia.png";
    var ROMANIA =					"http://e-sim.home.pl/eworld/img/flags/small/Romania.png";
    var RUSSIA =					"http://e-sim.home.pl/eworld/img/flags/small/Russia.png";
    var SERBIA =					"http://e-sim.home.pl/eworld/img/flags/small/Serbia.png";
    var SLOVENIA =					"http://e-sim.home.pl/eworld/img/flags/small/Slovenia.png";
    var SOUTHKOREA =				"http://e-sim.home.pl/eworld/img/flags/small/South-Korea.png";
    var SPAIN =						"http://e-sim.home.pl/eworld/img/flags/small/Spain.png";
    var SWEDEN =					"http://e-sim.home.pl/eworld/img/flags/small/Sweden.png";
    var SWITZERLAND =				"http://e-sim.home.pl/eworld/img/flags/small/Switzerland.png";
    var TAIWAN =					"http://e-sim.home.pl/eworld/img/flags/small/Taiwan.png";
    var TURKEY =					"http://e-sim.home.pl/eworld/img/flags/small/Turkey.png";
    var USA =						"http://e-sim.home.pl/eworld/img/flags/small/USA.png";
    var UKRAINE =					"http://e-sim.home.pl/eworld/img/flags/small/Ukraine.png";
    var UK =						"http://e-sim.home.pl/eworld/img/flags/small/United-Kingdom.png";
    // Others Image
    var IMGPACKAGE = 				"http://e-sim.home.pl/testura/img/package.png";
    var IMGDOLLAR = 				"http://e-sim.home.pl/testura/img/dollar.png";
    var IMGONLINE = 				"http://e-sim.home.pl/testura/img/newOnline.png";
    var IMGOFFLINE =				"http://e-sim.home.pl/testura/img/newOffline.png";
    var IMGPRODBG = 				"http://e-sim.home.pl/eworld/img/productIcons/background.png";
    // CUSTOM PICs
    var IMGREPLY = 					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAShJREFUKFNjZICC+v0MLG/fSJcx/mO4NTn86RqYOJzO3abCnrtKujJ3lczX7FUyiRgKQAIZq6Xz0ldJ/8hYLfMnY5XM2vTVMiWpy2WV4YqTV0vFJ62W/pa0WuZ/0iqZf2B6tfRPIPtC0hqZALDCqNXS06KAEthw5GqZGxGrpQwZQlbKcAatkukLAioMXC39C4ivAvkvQXwwXiUzEWya8zopYY/VMos8gYIeq6QL3FfK+nmukrkO4gPxMbjbXNeKi9mvll5iv0o2ASTosFom22GVzG/7VTJnUXxrtliFz2KljBBI0HSVlIHZapnPZqulV2ANEpCg7mqZSL3V0k/0V0p7Y1WktkbSWn2VzG61VdIVWqu02DAUKa6USVYAuk1ptXSQ8UxjVpACABgpd/6KGBaFAAAAAElFTkSuQmCC";
    //	var IMGVOTELBTN =				"data:image/png;base64,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";
    //	var IMGVOTESBTN =				"data:image/png;base64,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";
    
    
    
    // VARS
    var cachedSettings = null; // GM friendly function
    var currentServer = null;
    var foodGiftVisible = true;
    var firstFastButton;
    var selectItem;
    var selectedQuality;
    var selectDonate;
    var selectedFood;
    var selectedGift;
    var selectedWeapon;
    
    
    // CODE
    function initialize() {
        
        // Only execute on same frame (iframes with advertisments)
        if( window.top != window.self ) { return; }
        
        // Do different things on diferents urls
        var localUrl = new String( window.location );
        if( localUrl.indexOf( URLMain, 0 ) >= 0 || window.location.pathname == "/" ) {
            addShoutImgLink();
            if( !isOrgAccount() ) { updateMUOrdersMain(); }
            
            // MU homepage
        } else if( localUrl.indexOf( URLMU, 0 ) >= 0 || localUrl.indexOf( URLMUHOMEPAGE, 0 ) >= 0 ) {
            
            changeMUHomepage();
            
        } else if( localUrl.indexOf( URLPROFILE, 0) >= 0) {
            
            //changeCitizenTitile();
            
            // MU company list
        } else if( localUrl.indexOf( URLMUCompanies, 0 ) >= 0) {
            //addGetCompanyWorkers();
            
            // MU storage
        } else if( localUrl.indexOf( URLMUStorage, 0 ) >= 0 ) {
            
            orderMU( "#donateProductForm" );
            changeSelectMUStorage( "#donateProductForm" );
            addMUFastButtons( "#quantity" );
            addUpdateJobsButton( "#donateProductForm" );
            addDonateToMeButton( "#donateProductForm" );
            addUpdateConnectionButton( "#donateProductForm" );
            addCounterMembersMU();
            
            // MU money
        } else if( localUrl.indexOf( URLMUMoney, 0 ) >= 0 ) {
            
            orderMU( "#donateMoneyForm" );
            addUpdateJobsButton( "#donateMoneyForm" );
            addDonateToMeButton( "#donateMoneyForm" );
            addCounterMembersMU();
            
            // Donate player to player
        } else if( localUrl.indexOf( URLDDonatePlayerProduct, 0 ) >= 0 ) {
            
            //addPlayerToPlayerButton();
            changeSelectPlayerToPlayer();
            addFastButtons( "#quantity" );
            
            // Donate player to MU
        } else if( localUrl.indexOf( URLDonateMUProduct, 0 ) >= 0 ) {
            
            changeSelectPlayerToMU();
            addFastButtons( "#quantity" );
            
            // Battle weapon selector
        } else if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {
            
            if( !isOrgAccount() ) {
                calculateBonus();
                changeWeaponBattle();
                changeRoundSelector();
                changeFightResponse();
            }
            
            // Contract creator
        } else if( localUrl.indexOf( URLContract, 0 ) >= 0 ) {
            
            changeCreateContract();
            
            // Market
        } else if( localUrl.indexOf( URLMarket, 0 ) >= 0 ) {
            
            changeResourceMarket();
            
            // Market offers
        } else if( localUrl.indexOf( URLMarketOffers, 0 ) >= 0 ) {
            
            changeMarketOffers();
            
            // Monetary
        } else if( localUrl.indexOf( URLMonetaryMarket, 0) >= 0) {
            addSwapAndGoButtons();
            changeMonetaryOffers();
            
            // Article
        } else if( localUrl.indexOf( URLARTICLE, 0 ) >= 0 ) {
            
            changeArticle();
            addIMGBox( ".articleImage" );
            
            // My Shares menu
        } else if( localUrl.indexOf( URLMyShares, 0 ) >= 0 ) {
            
            changeMenuShares();
            
            // Mail Inbox
        } else if( localUrl.indexOf( URLINBOXMsg, 0 ) >=0 ) {
            
            changeMailAvatar();
            
            // Mail Sendbox
        } else if( localUrl.indexOf( URLSENDBOXMsg, 0 ) >=0 ) {
            
            changeMailAvatar();
            addMailPrevMsg();
            
        } else if( localUrl.indexOf( URLHISTORYMsg, 0 ) >= 0) {
            
            changeMailAvatar();
            addMailQuickReply();
        }
        
        // Global code
        if( $( "form[action='login.html']" ).length == 0 ) { 
            if( !isOrgAccount() ) {
                changeEatButtons();
            }
            
            addGlobalStyle();
            addMUFastLinks();
            addVersion();
        }
        
        // Set all buttons with pointer cursor
        $( "body" ).find( "input[type='submit']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });
        $( "body" ).find( "input[type='button']" ).each( function() { $(this).css({ "cursor" : "pointer" }); });
        
    } initialize();
    
	function sendFightRequestMod(side, val) {
	    
	    var timer = 1;
        $( ".fightButtonMod" ).attr( "disabled", "disabled" );
        $( ".fightButtonMod" ).fadeTo(20, 0.5);
	
		var dataString = 'weaponQuality='+ $("#weaponQuality").val() + '&battleRoundId=' + $("#battleRoundId").val() + '&side='+side+'&value='+val;
		$.ajax({
            type: "POST",
		    url: "fight.html",
		    data: dataString,
		    success: function(msg) {
                $('#fightResponse > div').replaceWith( msg );
                
                var healthText = $("#healthUpdate").text();
                if (healthText!="") {
                    var healthUpdated = healthText.substr(0, healthText.length-3 );
                    if(healthUpdated < 100) {
                        $("#healthProgress div.ui-corner-right").removeClass('ui-corner-right');
                    }
                    $("#healthProgress .ui-progressbar-value").animate({width: healthUpdated + "%"},{queue: false});
					$("#healthProgress").attr('title',healthUpdated+' / 100');
				}
				var rank = parseInt($("#rankUpdate").text());
				var rankNext = parseInt($("#nextLevelRankUpdate").text());
				var rankCurr = parseInt($("#currLevelRankUpdate").text());
				if(rank != null) {
					var rankWidth = Math.round((rank - rankCurr) / (rankNext - rankCurr) * 100);
					$("#rankProgress .ui-progressbar-value").animate({width: rankWidth + "%"},{queue: false});
					$("#rankProgress").attr('title',rank+' / '+rankNext);
				}
				var xp = parseInt($("#xpUpdate").text());
				var xpNext = parseInt($("#nextLevelXpUpdate").text());
				var xpCurr = parseInt($("#currLevelXpUpdate").text());
				if(xp != null) {
					var xpWidth = Math.round((xp - xpCurr) / (xpNext - xpCurr) * 100);
					$("#xpProgress .ui-progressbar-value").animate({width: xpWidth + "%"},{queue: false});
					$("#xpProgress").attr('title',xp+' / '+xpNext);
				}
				var rankText = $("#currRankText").text();
				var currRankText = $("#rankText").text();
				if(rankText != null && currRankText != null) {
					if(rankText != currRankText) {
						$("#currRankText").text(currRankText);
						var src = $("#rankImg").text();
						$("#rankImage img").attr('src', src);
					}
				}
		                   
                var hitType = $( "#fightResponse" ).find( "div" ).eq(1).text();
                if ( hitType.indexOf( "Hit type:" ) == -1 ) {
                    $( "#HitType" ).html( "<b style='color:red'>" + hitType + "</b>" );
                    $( "#DamageCurrent" ).html( "" );
                    $( "#AbsorbsDamage" ).css({ "display" : "none" });
                    $( ".fightButtonMod" ).fadeTo(20, 1);
                    $( ".fightButtonMod" ).removeAttr( "disabled" );
                    timer = 0;
                } else {
                    var hitType = $( "#fightResponse" ).find( "b" ).eq(0).text();
                    var strDmg = $( "#DamageDone" ).find( "b" ).text();
                    $( "#HitType" ).html( "Hit Type: <b>" + hitType + "</b>" );
                    
                    var strAbs = $( "#fightResponse" ).find( "b" ).eq(1).text();
                    if ( strAbs.indexOf( "Your armor absorbs the damage" ) != -1) {
                        $( "#AbsorbsDamage" ).css({ "display" : "inline" });
                    } else { 
                        $( "#AbsorbsDamage" ).css({ "display" : "none" });
                    }
                    
                    $( "#DamageCurrent" ).html( "Damage done: <b>" + strDmg + "</b>" );
                    if ( $( ".fightButtonMod" ).attr( "disabled" ) == "disabled" ) {
                        $( ".fightButtonMod" ).fadeTo(2460, 0.5).fadeTo(20, 1);
                        setTimeout( '$( ".fightButtonMod" ).removeAttr( "disabled" );', 2500);
                    }
                    timer = 0;
                    updateWeaponsNumber();
                }
                
            }
        });
        
        setTimeout( fightButtonTimeout, 5000);
        function fightButtonTimeout () {
            if ( timer == 1 ) {
                if ( $( ".fightButtonMod" ).attr( "disabled" ) == "disabled" ) {
                    $( ".fightButtonMod" ).fadeTo(20, 1);
                    $( ".fightButtonMod" ).removeAttr( "disabled" );
                    $( "#HitType" ).html( "<b style='color: red'>Timeout</b>" );
                    $( "#DamageCurrent" ).html( "" );
                    $( "#AbsorbsDamage" ).css({ "display" : "none" });
                    timer = 0;
                }
            }
        }
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
    
    function addShoutImgLink() {
        $( ".newsTab .shoutImage" ).click(function() {
            var url=$(this).next().find( "a:first[href^='profile.html?id=']" ).attr( "href" );
            if ( url !== null && typeof url !== "undefined" ) window.location.href = getCurrentServer() +"e-sim.org/"+ url;
        })
    }
    
    function changeCitizenTitile() {
        var CitizenName = $( "#contentRow td:eq(1) div:first h1");
        CitizenName[0].textContent=CitizenName[0].textContent.split( "Citizen " )[1];
        
    }
    
    function changeArticle() {
        var ColumnCell = $( "#contentRow td:eq(1)" );
        ColumnCell.find( "h1:first" ).remove();
        ColumnCell.find( ".testDivwhite:first" ).css({ "width" : "auto" });
        ColumnCell.find( ".testDivwhite:first > div:not(:first)" ).css({ "width" : "700px" });
        ColumnCell.find( "#comments > div" ).each( function() {
            var f = $(this).find( "div:eq(0) .currencyFlag");
            $(this).find( "div:eq(0)" ).append(f);
            
            var t = $(this).find( "div:eq(1) div:eq(0)" ).html();
            t = "<font color='#B2B2B2'>"+ t.split( "<br>" )[1] +"</font> "+ t.split( "<br>" )[0];
            $(this).find( "div:eq(1) div:eq(0)" ).html(t).css({ "width" : "450px", "text-align" : "right" })
            $(this).find( "div:eq(1) div:eq(2)" ).css({ "width" : "450px", "text-align" : "right" })
        })
    }
    
    function addIMGBox( idImg ) {
        $("head").append("<link rel='stylesheet' type='text/css' href='http://e-sim.home.pl/eworld/css/colorbox.css'>");
        $.ajax({  
            url: "http://e-sim.home.pl/eworld/js/jquery.colorbox.js",
            dataType: "script",
            success: function( evt ) {
                $( idImg ).each( function() {
                    if ( $( this ).parent( "a" ).length == 0 ) {
                        var pUrl = $( this ).attr( "src" );
                        $( this ).wrap( "<a class='gallery cboxElement' href='"+ pUrl +"'></a>" );
                    }
                })
                $( "a.gallery" ).colorbox({ rel:"gallery", maxHeight:"90%", title: function() {
                    var url = $( this ).attr( "href" );
                    return "<a href='"+ url +"' target='_blank'>Open in New window</a>";
                }});
            }
        })
    }
    
    function changeMonetaryOffers() {
        $( ".dataTable:first tbody tr:not(:first)").each( function(){
            if ( 0 > $( this ).find( "td:first > a" )[0].href.indexOf( "profile.html") ) {
                $(this).find( "td:first" ).css({ "background-color" : "#FDFF73" });
            }
        })
    }
    
    function addSwapAndGoButtons() {
        $( ".dataTable:first" ).css({ "margin": "auto" });
        
        var running = false;
        var swap2go = $( "<input type='submit' id='swap2go' value='Swap and Go' style='margin-left:5px;'>" );
        
        swap2go.insertAfter( $( "#swap2" ) );
        swap2go.bind( "click", function() {
            if (!running) {
                running = true; var buy = $( "#buy" ).val(), sel = $( "#sell" ).val();
                $.ajax({
                    url: getCurrentServer() + URLMonetaryMarket +"?buyerCurrencyId="+ sel +"&sellerCurrencyId="+ buy,
                    success: function( data ) { 
                    var monetaryDiv = $( ".dataTable:first", data ).html();
                    $( ".dataTable:first" ).html(monetaryDiv);
                    $( "#buy" ).val(sel); $( "#sell" ).val(buy); running = false;
                    changeMonetaryOffers();
                }
                       });		
            }
        })
    }
    
    function changeMailAvatar() {
        $( "#inboxTable tbody:first tr:not(:first)" ).each( function() {
            var obj = 0<$(this).find( "td:first div" ).length ? $(this).find( "td:first div" ):$(this).find( "td:first" );
            obj.append( "<div class='prDiv' style='display:block;'></div>" )
            var actionDiv = obj.find( ".prDiv" ), mails = obj.find( "a[href^='composeMessage.html?id=']" ), flags = obj.find( ".currencyFlag" );
            $(flags).appendTo(actionDiv); $(mails).appendTo(actionDiv);
        })
    }
    
    function addMailPrevMsg() {
        $( "#inboxTable tbody:first tr:not(:first)" ).each( function(){
            var cId = $(this).find( "td:first a[href^='composeMessage.html?id=']" ).attr( "href" ).split( "?id=" )[1],
                cUrl = getCurrentServer() + URLHISTORYMsg + cId;
            $(this).find( "td:eq(1) b div:first" ).prepend( "<img src='"+ IMGREPLY +"'> ");
            $(this).find( "td:eq(1) div:last" ).after( "<br><a style='font-weight: bold' href='"+ cUrl +"'>Previous messages</a>");
        })
    }
    
    function addMailQuickReply() {
        var msgId, selfId = $( "#userImage" ).parent().attr( "href" ).split( "?id=" )[1];
        
        $( "#command .testDivwhite a.biggerFont:first" ).before(
            "<a href='inboxMessages.html' class='biggerFont' style='text-align:center'>Inbox messages</a> | " );
        $( "#inboxTable tbody:first tr:not(:first)" ).each( function() {
            $(this).find( "td:eq(1)" ).css({ "width" : "370px" });
            if ( selfId == $(this).find( "td:first a:first" ).attr( "href" ).split( "?id=" )[1]) {
                $(this).find( "td:first" ).css({ "opacity" : "0.6", "-moz-opacity" : "0.6", "-khtml-opacity" : "0.6", "filter" : "alpha(opacity=60)" })
                $(this).find( "td:eq(1) b div:first" ).prepend( "<img src='"+ IMGREPLY +"'> " );
                $(this).find( "td:eq(1) a:last" ).remove();
            } else {
                msgId = $(this).find( "td:eq(1) a:last" ).attr( "href" ).split( "&reply=" )[1];
                $(this).find( "td:eq(1)" ).append(
                    "<a class='quickReply' style='font-weight:bold; margin-left:10px;' href='javascript:;'>Quick reply</a>"+
                    "<div style='display:none; width: 335px'>"+
                    "<form style='display: inline' action='composeMessage.html' method='POST'>"+
                    "<input type='hidden' name='id' value='"+ msgId +"'>"+
                    "<input type='hidden' name='action' value='QUICK_REPLY'>"+
                    "<textarea name='text' style='height: 45px; width: 335px'>Your reply</textarea>"+
                    "<input style='width: 120px' type='submit' value='Quick reply'></form></div>")
            }
        })
        $( ".quickReply").click(function(){$(this).fadeOut("fast",function(){$(this).next().fadeIn("fast")});return!1});
    }
    
    function changeMUHomepage() {
        $( "#contentRow td > .testDivwhite:eq(0)" ).css({ "margin-left" : "80px" });
        $( "#contentRow td > .testDivblue:eq(2)" ).css({ "margin-left" : "0px" });
        $( "#contentRow td > .testDivblue:eq(1)" ).css({ "margin-right" : "80px" }).find( "center b:contains('Members')" ).append( " ("+ $( ".smallAvatar" ).length +")");
    }
    
    function addGetCompanyWorkers() {
        $getWorker = $( "<input type='button' id='updateWork' value='Update jobs'/>" );
        $getWorker.css({ "margin" : "15px 40px 0px 0px", "float" : "right", "width" : "85px" });
        //$getWorker.appendTo( ".testDivblue" );
        
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
        selectedFood = null;
        $( "#foodQuality" ).find( "option" ).each( function() {
            if( $(this).attr( "value" ) == "0" ) { index++; return; }
            
            var str = $(this).text();
            var number = str.indexOf( "(", 0 );
            if( number != -1 ) { str = str.substr( number + 1, str.indexOf( " ", number ) - number ); }
            
            var food = $( "<div style='float:left; width:27px; height:46px; cursor:pointer;'></div>" );
            food.css({ "padding" : "0px 1px 0px 1px", "margin" : "0px 3px 5px 2px" });
            food.css({ "background-color" : "#fff", "box-shadow" : "1px 1px 2px 0px #9bbef8" });
            food.attr( "indexselect", index );
            
            food.append( "<img src='"+ IMGFOOD +"' style='width:80%; margin: 3px 3px 0px 3px;' />" );
            food.append( "<img src='"+ IMGQUALITY + index +".png' style='width:94%; margin:1px 0px 0px 1px;' />" );
            food.append( "<div style='text-align:center; font-size: 100%; font-weight:bold; font-family:Georgia;'>"+ str +"</div>" );
            
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
                    
                    $(this).css({ "box-shadow" : "inset 0px 0px 2px 1px #58a5fa", "background-color" : "#aed4ff" });
                    selectedFood = $(this);
                    
                    var indexItem = $(this).attr( "indexselect" );
                    $( "#foodQuality option" )[ indexItem ].selected = true;
                    
                    updateHealthButtons();
                });
                
            } else food.css({ "cursor" : "default", "box-shadow" : "inset 0px 0px 2px 0px #ff6767" });
            
            vecItemsFood.push( food );
            $( "#eatMenu form" ).append( food );
            
            index++;
        });
        
        
        index = 0;
        selectedGift = null;
        $( "#giftQuality" ).find( "option" ).each( function() {
            if( $(this).attr( "value" ) == "0" ) { index++; return; }
            
            var str = $(this).text();
            var number = str.indexOf( "(", 0 );
            if( number != -1 ) { str = str.substr( number + 1, str.indexOf( " ", number ) - number ); }
            
            var gift = $( "<div style='float:left; width:27px; height:46px; cursor:pointer;'></div>" );
            gift.css({ "padding" : "0px 1px 0px 1px", "margin" : "0px 3px 5px 2px" });
            gift.css({ "background-color" : "#fff", "box-shadow" : "1px 1px 2px 0px #9bbef8" });
            gift.attr( "indexselect", index );
            
            gift.append( "<img src='"+ IMGGIFT +"' style='width:80%; margin: 3px 3px 0px 3px;' />" );
            gift.append( "<img src='"+ IMGQUALITY + index +".png' style='width:94%; margin:1px 0px 0px 1px;' />" );
            gift.append( "<div style='text-align:center; font-size: 100%; font-weight:bold; font-family:Georgia;'>"+ str +"</div>" );
            
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
                    
                    $(this).css({ "box-shadow" : "inset 0px 0px 2px 1px #58a5fa", "background-color" : "#aed4ff" });
                    selectedGift = $(this);
                    
                    var indexItem = $(this).attr( "indexselect" );
                    $( "#giftQuality option" )[ indexItem ].selected = true;
                    
                    updateHealthButtons();
                });
                
            } else gift.css({ "cursor" : "default", "box-shadow" : "inset 0px 0px 2px 0px #ff6767" });
            
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
        newEatButton.css({ "width" : "138px", "height" : "23px", "margin" : "5px 0px 0px 1px" });
        $( "#eatMenu" ).append( newEatButton );
        $( "#eatMenu" ).css({ "height" : "85px", "margin" : "8px 0px 0px 2px" });
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
                    $( "#wellness" ).html(json.wellness);
                    $( "#healthBar" ).html(json.wellness);
                    $( "#healthProgress .ui-progressbar-value" ).animate({width: json.wellness + "%"},{queue: false});
                    $( "#healthProgress" ).attr( 'title', json.wellness + ' / 100' );
                    
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
        
        $( "#useGiftButton" ).css({ "display" : "none" });
        var newGiftButton = $( "<input type='button' id='newGiftButton' value='Use' />" )
        newGiftButton.css({ "width" : "138px", "height" : "23px", "margin" : "5px 0px 0px 1px" });
        $( "#useGiftMenu" ).append( newGiftButton );
        $( "#useGiftMenu" ).css({ "height" : "88px", "margin" : "4px 0px 0px 2px" });
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
                    $( "#wellness" ).html(json.wellness);
                    $( "#healthBar" ).html(json.wellness);
                    $( "#healthProgress .ui-progressbar-value" ).animate({width: json.wellness + "%"},{queue: false});
                    $( "#healthProgress" ).attr( 'title', json.wellness + ' / 100' );
                    
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
        $( "#eatMenu form" ).append( $( "#foodLimit" ) );
        $( "#foodLimit" ).css({ "float" : "right", "position" : "relative", "top" : "5px", "right" : "2px", "font-size" : "13px" });
        $( "#foodLimit" ).css({ "background-color" : "#fff", "border" : "1px solid #333", "text-align" : "center" });
        $( "#foodLimit" ).css({ "padding" : "2px 3px 2px 3px", "cursor" : "default", "width" : "16px" });
        
        $( "#useGiftMenu form" ).append( $( "#giftLimit" ) );
        $( "#giftLimit" ).css({ "float" : "right", "position" : "relative", "top" : "5px", "right" : "2px", "font-size" : "13px" });
        $( "#giftLimit" ).css({ "background-color" : "#fff", "border" : "1px solid #333", "text-align" : "center" });
        $( "#giftLimit" ).css({ "padding" : "2px 3px 2px 3px", "cursor" : "default", "width" : "16px" });
        
        $( "#eatLink" ).prev().remove();
        $( "#eatMenu" ).prev().remove();
        $( "#useGiftLink" ).prev().remove();
        $( "#useGiftLink" ).next().remove();
        
        
        // Rellocate wiki help
        var lastDiv = $( "#stats" ).children( "div:last" );
        lastDiv.css({ "float" : "right", "margin" : "1px 0px 0px 5px" });
        lastDiv.children( "a" ).text( "" ).append( lastDiv.children( "img" ) );
        lastDiv.remove();
        
        showHideButtons();
        updateHealthButtons();
    }
    
    
    // Show and hide Food/Gift buttons
    function showHideButtons() {
        
        // Show/Hide button
        var showHide = $( "<div></div>" );
        showHide.append( "<span class='arrow'> &darr;&darr; </span>" );
        showHide.append( "<span style='font-weight:bold; color:#3787ea;'> Eat food / Use gift </span>" );
        showHide.append( "<span class='arrow'> &darr;&darr; </span>" );
        showHide.css({ "margin" : "5px 0px 0px 0px", "text-align" : "center", "cursor" : "pointer" });
        showHide.insertBefore( $( "#eatMenu" ) );
        
        // On battle page will be always visible
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
            
            if( foodGiftVisible ) { showHide.children( ".arrow" ).text( String.fromCharCode(8595) + String.fromCharCode(8595) );
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
                
            } else disableButton( $( "#newEatButton" ) );
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
                
            } else disableButton( $( "#newGiftButton" ) );
        }
        
        updateFightButtons()
    }
    
    
    // Disable button
    function disableButton( btn ) {
        btn.attr( "disabled", "disabled" );
        btn.css({ "border" : "1px solid #8899ff", "text-shadow" : "1px 1px 1px blue", "box-shadow" : "none" });
        btn.css({ "background" : "linear-gradient(to bottom, #8e7d7d 0%, #4c4444 45%, #4c4444 50%, #595050 55%, #7e7e7e 100%) repeat scroll 0% 0% transparent" });
    }
    
    
    // Enable button
    function enableButton( btn ) {
        btn.removeAttr( "disabled" );
        btn.css({ "border" : "", "background" : "", "box-shadow" : "", "text-shadow" : "" });
    }
    
    
    // Update fight buttons
    function updateFightButtons() {
        
        // Only on battle page
        var localUrl = new String( window.location );
        if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {
            
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
        }
    }
    
    
    // Add MU fast links
    function addMUFastLinks() {
        
        var linkMU = $( "<a href='"+ getCurrentServer() + URLMU +"'>MU</a>"  );
        linkMU.css({ "padding" : "3px 3px", "background-color" : "#FFFFFF", "color" : "#000000", "text-shadow" : "1px 1px 1px #111" });
        linkMU.css({ "float" : "left", "box-shadow" : "0px 0px 2px 0px #000" });
        linkMU.bind( "mouseover", function() { $(this).css({ "background-color" : "rgba(98, 144, 199, 0.7)", "box-shadow" : "0px 0px 2px 0px #333" }); });
        linkMU.bind( "mouseout", function() { $(this).css({ "background-color" : "#FFFFFF", "box-shadow" : "0px 0px 2px 0px #000" }); });
        
        var linkMUSt = $( "<a href='"+ getCurrentServer() + URLMUStorage +"'></a>"  );
        linkMUSt.css({ "float" : "left", "padding" : "1px 2px 0px 2px", "background-color" : "#FFFFFF" });
        linkMUSt.css({ "box-shadow" : "0px 0px 2px 0px #000", "margin" : "0px 5px" });
        linkMUSt.append( "<img src='"+ IMGPACKAGE +"' style='width:19px;' />" );
        linkMUSt.bind( "mouseover", function() { $(this).css({ "background-color" : "rgba(98, 144, 199, 0.7)", "box-shadow" : "0px 0px 2px 0px #333" }); });
        linkMUSt.bind( "mouseout", function() { $(this).css({ "background-color" : "#FFFFFF", "box-shadow" : "0px 0px 2px 0px #000" }); });
        
        var linkMUMy = $( "<a href='"+ getCurrentServer() + URLMUMoney +"'></a>"  );
        linkMUMy.css({ "float" : "left", "padding" : "1px 2px 0px 2px", "background-color" : "#FFFFFF" });
        linkMUMy.css({ "box-shadow" : "0px 0px 2px 0px #000" });
        linkMUMy.append( "<img src='"+ IMGDOLLAR +"' style='width:19px;' />" );
        linkMUMy.bind( "mouseover", function() { $(this).css({ "background-color" : "rgba(98, 144, 199, 0.7)", "box-shadow" : "0px 0px 2px 0px #333" }); });
        linkMUMy.bind( "mouseout", function() { $(this).css({ "background-color" : "#FFFFFF", "box-shadow" : "0px 0px 2px 0px #000" }); });
        
        var content = $( "<div class='plate' style='display:block; font-weight:bold; height:20px;'></div>" );
        content.append( linkMU );
        content.append( linkMUSt );
        content.append( linkMUMy );
        content.insertBefore( $( "#userMenu" ).children().first() );
    }
    
    // Get current server
    function getCurrentServer( onlyhost ) {
        if( !currentServer ) {
            var localUrl = new String( window.location );
            var ini = localUrl.indexOf( "http://", 0 );
            var end = localUrl.indexOf( ".", 0 );
            currentServer = localUrl.substr( ini, end-ini+1 );
        }
        if (onlyhost) {
            return( currentServer.split( "://" )[1].split( "." )[0] );
        } else {
            return( currentServer );
        }
    }
    
    
    // Add version on all pages
    function addVersion() {
        
        var vers = $( "<div><a href='"+ URLSCRIPT +"' target='_blank'>" + VERSION + "</a></div>" );
        vers.css({ "font-size" : "12px", "font-weight" : "bold", "font-family" : "Arial", "text-shadow" : "1px 1px 1px #999" }); 
        vers.css({ "float" : "right", "margin" : "6px -3px 0px 0px", "cursor" : "pointer" });
        
        vers.children( "a" ).css({ "color" : "#333" });
        vers.children( "a" ).bind( "mouseover", function() { $(this).css({ "color" : "#58a5fa" }); });
        vers.children( "a" ).bind( "mouseout", function() { $(this).css({ "color" : "#333" }); });
        
        $( "#userMenu" ).children().first().append( vers ); TimeofEve();
    }
    
    // Add Global style on all pages
    function addGlobalStyle() {
        $("ins:has(ins)").remove();
        $("#contentRow > td[style*='135px']").remove();
        $(".subMenu a[href='subscription.html']").remove();
        $(".subMenu a[href='goldPurchase.html']").remove();
        $("head").append(
            "<style>"+
            //			"body{font-size:12px!important} iframe{display:none!important}"+
            //			"input,select,textarea,blockquote,#inboxTable{font-size:12px!important}"+
            //			'.aniIcon{opacity:0.7;-moz-opacity:0.7;-khtml-opacity:0.7;filter:alpha(opacity=70)}'+
            //			'.aniIcon:hover{opacity:1;-moz-opacity:1;-khtml-opacity:1;filter:alpha(opacity=100);cursor:pointer}'+
            ".miniContent .shoutImage:hover{cursor:pointer}"+
            //article
            "blockquote{border-radius:15px;margin:auto!important}"+
            //			".bigArticleTab{background-image:url("+ IMGVOTELBTN +")!important}"+
            //			".smallArticleTab{background-image:url("+ IMGVOTESBTN +")!important}"+
            //			".testDivwhite .articleTitle{font-size:18px;line-height:41px;position:relative}"+
            ".testDivwhite .articleImage{max-height:700px!important;max-width:700px!important}"+
            "</style>");
    }
    
    
    // Rellocate messages notify
    function rellocateMessages() {
        var plate = $( "#userMenu" ).children( ".plate" ).last();
        plate.insertAfter( $( "#userName" ).parent().parent() );
    }
    
    
    // Update MU orders if changed on main page
    function updateMUOrdersMain() {
        
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
    }
    
    
    // Calculate bonus on battle
    function calculateBonus() {
        
        var pos = $( ".testDivblue" ).eq(2);
        var plate = $( "#stats" ).parent();
        var currentLocation = plate.find( "a[href^='region']" ).attr( "href" ).split( "?id=" );
        if( currentLocation.length > 1 ) { currentLocation = currentLocation[1] }
        
        var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
        if ( divBattleLocation.length ) {
        	var battleLocation = divBattleLocation.attr( "href" ).split( "?id=" );
        	if( battleLocation.length > 1 ) { battleLocation = battleLocation[1] }
				}
        
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
        var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
        var isRW = (divBattleLocation.parent().text().indexOf( "Resistance war", 0 ) > -1);
        if( isRW ) {
            
            if( currentLocation == battleLocation ) { numberLocation = 20; }
            
            var leftMU = 0;
            var rightMU = 0;
            var sides = pos.find( ".bigFlag" );
            if( battleID == muSide ) { // Correct battle
                if( sides.length == 2 ) {
                    // Left defender
                    if( sides.eq(0).attr( "src" ) == GetValue( "MUSide" ) ) {
                        leftMU = GetValue( "MURank" );
                        
                    } else if( sides.eq(1).attr( "src" ) == GetValue( "MUSide" ) ) {
                        rightMU = GetValue( "MURank" );
                    }
                }
            }
            
            var leftBlock = createBlockBonus( numberLocation, leftMU, bonusSD );
            leftBlock.attr( "id", "leftBlockBonus" );
            leftBlock.css({ "margin-top" : "3px", "margin-left" : "2px" });
            leftBlock.insertBefore( pos );
            
            // Only defensive SD
            var rightBlock = createBlockBonus( numberLocation, rightMU, 0 );
            rightBlock.attr( "id", "rightBlockBonus" );
            rightBlock.css({ "margin-top" : "3px", "margin-left" : (pos.width()-14)+"px" });
            rightBlock.insertBefore( pos );
            
        } else {
            
            var yourSide = pos.find( ".bigFlag" ).attr( "src" );
            var flags =  $( ".testDivwhite" ).find( ".bigFlag" );
            if( flags.length == 2 ) {
                var defender = flags.eq(0).attr( "src" );
                var attacker = flags.eq(1).attr( "src" );
                
                bonusMU = 0;
                if( yourSide == attacker ) {
                    if( battleID == muSide ) {
                        if( yourSide == GetValue( "MUSide" ) ) { bonusMU = GetValue( "MURank" ); }
                    }	
                    
                    var neighbours = getRegionAPI( battleLocation, currentLocation );
                    numberLocation = (neighbours.indexOf( parseInt(currentLocation) ) != -1) ? 20 : 0;
                    
                    var rightBlock = createBlockBonus( numberLocation, bonusMU, 0 );
                    rightBlock.attr( "id", "rightBlockBonus" );
                    rightBlock.css({ "margin-top" : "3px", "margin-left" : (pos.width()-14)+"px" });
                    rightBlock.insertBefore( pos );
                    
                } else if( yourSide == defender ) {
                    if( battleID == muSide ) {
                        if( yourSide == GetValue( "MUSide" ) ) { bonusMU = GetValue( "MURank" ); }
                    }
                    if( currentLocation == battleLocation ) { numberLocation = 20; }
                    
                    var leftBlock = createBlockBonus( numberLocation, bonusMU, bonusSD );
                    leftBlock.attr( "id", "leftBlockBonus" );
                    leftBlock.css({ "margin-top" : "3px", "margin-left" : "2px" });
                    leftBlock.insertBefore( pos );
                }
            }
        }
    }
    
    
    // Create bonus battle dov
    function createBlockBonus( location, MU, SD ) {
        
        var block = $( "<div style='display:block; position:absolute; cursor:default;'></div>" );
        var color = (location == 0) ? "#e67171" : "#bed7ba";
        
        var bonusLocation = $( "<div class='locationBonus' style='width:30px; height:17px;' title='<b>Location bonus</b>'>"+ location +"%</div>" );
        bonusLocation.css({ "border" : "1px solid #93b4d9", "border-radius" : "2px", "background-color" : color });
        bonusLocation.css({ "font-size" : "12px", "font-weight" : "bold", "padding" : "2px 0px 0px 0px", "cursor" : "default" });
        bonusLocation.tooltip({
            tipClass:"smalltooltip", 
            position:"center right",
            onShow: function() {
                $( ".smalltooltip" ).css({ "text-align" : "center", "width" : "88px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 4px" });
            }
        });
        
        color = (MU == 0) ? "#e67171" : "#bed7ba";
        var bonusMU = $( "<div style='width:30px; height:17px;' title='<b>Military unit bonus</b>'>"+ MU +"%</div>" );
        bonusMU.css({ "border" : "1px solid #93b4d9", "border-radius" : "2px", "background-color" : color, "margin-top" : "2px" });
        bonusMU.css({ "font-size" : "12px", "font-weight" : "bold", "padding" : "2px 0px 0px 0px", "cursor" : "default" });
        bonusMU.tooltip({
            tipClass:"smalltooltip", 
            position:"center right",
            onShow: function() {
                $( ".smalltooltip" ).css({ "text-align" : "center", "width" : "115px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 4px" });
            }
        });
        
        var bonusSD = $( "<div style='width:30px; height:17px;' title='<b>Defensive system bonus</b>'>"+ SD +"%</div>" );
        bonusSD.css({ "border" : "1px solid #93b4d9", "border-radius" : "2px", "background-color" : "#fff", "margin-top" : "2px" });
        bonusSD.css({ "font-size" : "12px", "font-weight" : "bold", "padding" : "2px 0px 0px 0px", "cursor" : "default" });
        bonusSD.tooltip({
            tipClass:"smalltooltip", 
            position:"center right",
            onShow: function() {
                $( ".smalltooltip" ).css({ "text-align" : "center", "width" : "145px", "font-size" : "11px", "padding" : "3px 8px", "margin" : "0px 0px 0px 4px" });
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
        var bigWeap = $( "<div style='display:block; width:222px; height: 65px; overflow:hidden;' ></div>" );
        bigWeap.css({ "margin" : "-5px 0px 10px 20px" });
        
        var imgWeap = $( "<img src='' style='display:block; width:50px; height:50px; float:left;' />" );
        imgWeap.css({ "border" : "1px solid #666", "padding" : "3px 3px", "margin" : "3px 7px" });
        imgWeap.css({ "border-radius" : "3px" });
        
        var divInfo = $( "<div style='float:left; width:135px; height:100%; text-align:left; overflow: hidden;'></div>" );
        divInfo.append( "<span class='qualityWeapon' style='font-size:18px; font-weight:bold; text-shadow: 1px 1px 3px #999'></span>" );
        divInfo.append( "<span class='availableWeapon' style='margin: 0px 8px; font-weight:bold;'></span>" );
        divInfo.append( "<br/><span id='HitType' style='font-size: 11px; font-weight:normal;'></span>" );
        divInfo.append( "<br/><span id='AbsorbsDamage' style='font-size: 11px; font-weight:normal; display: none;'>Absorbs the damage!</span>" );
        divInfo.append( "<br/><span id='DamageCurrent' style='font-size: 11px; font-weight:normal;'></span>" );
        
        bigWeap.append( imgWeap );
        bigWeap.append( divInfo );
        
        var content = $( "<div id='weaponSelector' style='display:block; width: 240px; height: 70px; margin-left: -5px; overflow: hidden; '></div>" );
        var colorBackground = [ "#e67171", "#bed7ba", "#aacaa4", "#97be91", "#83b47f", "#6eaa6f" ];
        var index = 0;
        $( "#weaponQuality" ).find( "option" ).each( function() {
            
            var weapQ = $( "<div style='float:left; width: 36px; height: 65px; cursor: pointer; background-color: #fff;'></div>" );
            weapQ.css({ "margin" : "1px 1px 0px 1px", "padding" : "1px 1px 0px 1px", "border-radius" : "3px"  });
            
            if( index == 0 ) {
                weapQ.append( "<img src='"+ URLDROPBOX + Q0WEAPON +"' style='display:block; height:34px; ' />" );
                weapQ.css({ "height" : "65px" });
                
            } else { 
                weapQ.append( "<img src='"+ URLDROPBOX + eval( "Q"+index+"WEAPON" )+"' style='display:block; height:34px; position:relative; ' />" );
                weapQ.css({ "height" : "65px" });
            }
            
            var bonus = "";
            var nWeap = "";
            
            var str = $(this).text();
            var pos = str.indexOf( ",", 0 );
            if( pos > -1 ) {
                
                nWeap = str.substr( pos + 2, str.indexOf( " ", pos + 2 ) - pos - 1 );
                bonus = (index * 20) + "%";
                weapQ.append( "<div style='position:relative; top:0px; font-size:100%; font-weight:bold; color:#444;'>"+ bonus +"</div>" );
                
            } else {
                
                weapQ.css({ "margin-top" : "1px" });
                bonus = "-50%";
                weapQ.append( "<div style='position:relative; top:0px; font-size:100%; font-weight:bold; color:#444;'>"+ bonus +"</div>" );
            }
            
            weapQ.attr( "indexselect", index );
            weapQ.attr( "defaultColor", colorBackground[ index ] );
            weapQ.attr( "numWeapons", nWeap );
            
            weapQ.append( "<div class='numWeapons' style='position: relative; top: 0px; font-size: 85%; font-weight:bold; text-shadow: 1px 1px 1px #999'>"+ nWeap + "</div>" );
            bigWeap.insertBefore( "#weaponQuality" );
            
            var plate = $( "#stats" ).parent();
            var strength = plate.find( "b" ).eq( 12 ).text();
            strength = strength.split( ": " )[1];
            var rankString = plate.find( "b" ).eq( 1 ).text();
            rankString = rankString.split( ": " )[1];
            
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
                    var quality = $(this).attr( "indexselect" );
                    var rank = getRankAPI( strength, quality, rankString, 1 );
                    
                    if( quality == "0" ) {
                        divInfo.find( ".qualityWeapon" ).text( "Unarmed" );
                        divInfo.find( ".availableWeapon" ).text( "" );
                        imgWeap.attr( "src", URLDROPBOX + Q0WEAPON );
                        imgWeap.css({ "height" : "50px", "padding" : "3px 3px" });
                        
                    } else {
                        divInfo.find( ".qualityWeapon" ).text( "Q" + quality );
                        divInfo.find( ".availableWeapon" ).text( $(this).attr( "numWeapons" ) + " weap" );
                        imgWeap.attr( "src", URLDROPBOX + eval( "Q"+ quality +"WEAPON" ) );
                        imgWeap.css({ "height" : "50px", "padding" : "3px 3px" });
                    } 
                    
                    //updateDamage( strength, rank, quality );
                    
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
            if( index == 1 ) {
                if ( nWeap != 0 ) {
                    weapQ.click();
                }
            }
            
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
            updateHealthButtons();
        }
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
                
                if (selectedWeapon.attr( "indexselect" ) == index) {
                	$( "#showTutorial" ).find( ".availableWeapon" ).text( nWeap + " weap" );                
                }
                
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
    
    //Change response on fight
    function changeFightResponse() {
        
        			if ( $("#showTutorial .fightButton").length ) {
				$( ".fightButton" ).each( function () {
					css = "";
					if ( $( this ).css( "float" ) ) {
						css = "float:" + $( this ).css( "float" ) + ";";
					}
					var fightButtonMod = "<input class='fightButtonMod' style='cursor: pointer; box-shadow: none; background: rgb(50,50,50); text-shadow: none; border: 1px solid rgb(255,255,255); " + css + "'name='" + $( this ).attr( "name" ) + "' value='" + $( this ).attr( "value" ) + "' type='submit'>";
					$( this ).after( fightButtonMod );
					$( this ).remove();
					
				});
			}
        
        $( ".fightButtonMod" ).hover(function () {
            $( this ).css({ "box-shadow" : "0 0 5px rgba(0,0,0, 0.6)" });
        },
        function () {
            $( this ).css({"box-shadow" : "none"});
        });

        $( ".fightButtonMod" ).click( function () {
            var side = $( this )[0].name;
		    var value = $( this )[0].value;
            $( ".fightButtonMod" ).css({ "border" : "1px solid rgb(255, 255, 255)", "color" : "rgb(244, 238, 238)" });
            $( this ).css({ "border" : "1px solid rgb(148,194,249)", "color" : "rgb(148, 194, 249)" });
		    
		    //autoEat
		    var useHP = 10;
            if ( value.indexOf ( "5" ) != -1 ) {
                useHP = 50;
            }

            var HP = $( "#healthProgress" ).attr( "title" );
            var currentHP = Number( HP.substr(0, HP.length-8) );
            if ( useHP > currentHP ) {
                var stop = 0;
                do {
                    if ( $( "#newEatButton" ).attr( "disabled" ) != "disabled" ) {
                        $( "#newEatButton" ).click();
                        currentHP += Number( $("#foodQuality").val() + "0" );
                    } else {
                        if ( $( "#newGiftButton" ).attr( "disabled" ) != "disabled" ) {
                            $( "#newGiftButton" ).click();
                            currentHP += Number( $("#giftQuality").val() + "0" );
                        } else {
                            stop = 1;
                        }
                    }
                    if ( useHP <= currentHP ) {
                        stop = 1;
                    }
                } while ( stop != 1)
            }
 		    sendFightRequestMod(side, value);            
            return false;
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
            if( item.text().indexOf( "Show round:" ) >= 0 ) {
                item.remove();
            }
        }
        
        var currentRound = getUrlVars()[ "round" ];
        var first = true;
        var numOptions = $( "#command" ).children( "select" ).find( "option" ).length;
        $( "#command" ).children( "select" ).find( "option" ).each( function() {
            var value = $(this).attr( "value" );
            if( first && ((value !=  "1") || (numOptions == 2)) ) {
                first = false;
                return;
            }
            
            var battleID = getUrlVars()[ "id" ];
            var url = getCurrentServer() + URLBattle + battleID + "&round=" + value;
            
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
    
    
    // Order MU members
    function orderMU( idForm ) {
        
        var $div = $( idForm ).children( "div" );
        $div.css({ "width" : "320px" });
        
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
                    
                    $line = $( "<div style='border: 1px solid #dedede; padding:2px; margin-top:-1px'></div>" );
                    
                    $obj = $( playerList[j][0] ).css({ "margin" : "0px", "padding" : "0px", "position" : "relative", "top" : "3px", "left" : "3px" });
                    $line.append( $obj );
                    
                    $obj = $( playerList[j][1] ).css({ "margin" : "0px 0px 0px 10px", "padding" : "0px", "position" : "relative"  });
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
    
    
    // Update MU storage donation
    function changeSelectMUStorage( idForm ) {
        
        var $select = $( "#product" );
        var $pos = $( ".testDivwhite" );
        var $dest = $( "#quantity" );
        
        // Remove all childrens and add help text
        $pos.children().remove();
        //		$pos.append( "One click to select <b>ONE item</b>.<br/>Double click to select <b>ALL items</b>.<br/>" );
        $pos.css({ "text-align" : "center", "width" : "350px", "padding" : "4px 0px 10px 0px", "margin" : "-4px 0px 0px 10px", "box-shadow" : "0px 0px 5px rgba(0,187,255,0.5), 0px -12px 12px rgba(142,153,168,0.2) inset", "border" : "1px solid rgba(98,144,199,0.7)" });
        
        // Remove some unuseful text
        $( idForm ).children( "br" ).last().remove();
        $( idForm ).children( "br" ).last().remove();
        
        $select.prev().remove();
        //$select.css({ "display" : "none" });
        
        changeSelect( $select, $pos, $dest, "#aaaaaa" );
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
                    
                } else if( split[1] == "ESTATE" ) {
                    objStr += "<img src='"+ IMGESTATE +"' />";
                }
                
                objStr += "<img style='border: 0px; margin-left: 0px' src='"+ IMGQUALITY + split[0] + IMGEXTENSION +"' />";
            }
            
            $obj = $( objStr + "</div>" );
            $obj.css({ "cursor" : "pointer", "border" : "2px solid #fff", "border-radius" : "6px", "width" : "auto", "height" : "79px" });
            $obj.css({ "margin" : "6px 4px 2px 9px", "padding" : "0px 0px 0px 0px", "background-color" : "#1E5799" });
            $obj.css({ "box-shadow" : "0px 1px 5px 1px " + color });
            
            // Events
            $obj.bind( "mouseover", function() {
                if( selectDonate != $(this).attr( "selectIndex" ) ) {
                    $(this).css({ "background-color" : "#1E5799", "border" : "2px solid #dedede" });
                }
            });
            $obj.bind( "mouseout", function() {
                if( selectDonate != $(this).attr( "selectIndex" ) ) {
                    $(this).css({ "background-color" : "#1E5799", "border" : "2px solid #fff" });
                }
            });
            
            // Click
            $obj.bind( "click", function() {
                
                // Deselect
                if( selectDonate == $(this).attr( "selectIndex" ) ) {
                    $(this).css({ "background-color" : "#1E5799", "border" : "2px solid #dedede" });
                    $select.find( "option" ).removeAttr( "selected" );
                    $dest.attr( "value", "1" );
                    selectDonate = null;
                    
                } else {
                    
                    if( selectDonate ) {
                        var selObj = $placeToAdd.find( ".storage[selectIndex='" + selectDonate + "']" );
                        selObj.css({ "background-color" : "#1E5799", "border" : "2px solid #fff" });
                        $dest.attr( "value", "1" );
                    }
                    
                    $(this).css({ "background-color" : "#1E5799", "border" : "2px solid #b06810" });
                    selectDonate = $(this).attr( "selectIndex" );
                    
                    $select.find( "option" ).removeAttr( "selected" );
                    $select.find( "option" )[ selectDonate ].selected = true;
                }
            });
            
            // Doubleclick
            $obj.bind( "dblclick ", function() {
                
                $(this).css({ "background-color" : "#1E5799", "border" : "2px solid #5ea256" });
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
    function addMUFastButtons( idDest ) {
        
        firstFastButton = true;
        $( idDest ).css({ "text-align" : "center" });
        
        var $btn1 = $( "<input class='fastBtn' type='button' value='10' style='margin: 0px 13px 0px 0px;' />" );
        $btn1.bind( "click", function() { 
            if( firstFastButton ) {
                $( idDest ).attr( "value", "10" ); 
            } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 10 ); 
            firstFastButton = false;
        });
        
        var $btn5 = $( "<input class='fastBtn' type='button' value='15' style='margin: 0px 13px 0px 0px;' />" );
        $btn5.bind( "click", function() { 
            if( firstFastButton ) {
                $( idDest ).attr( "value", "15" ); 
            } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 15 ); 
            firstFastButton = false;
        });
        
        var $btn10 = $( "<input class='fastBtn' type='button' value='20' style='margin: 0px 13px 0px 0px;' />" );
        $btn10.bind( "click", function() { 
            if( firstFastButton ) {
                $( idDest ).attr( "value", "20" ); 
            } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 20 ); 
            firstFastButton = false;
        });
        
        var $btn15 = $( "<input class='fastBtn' type='button' value='30' style='margin: 0px 0px 0px 11px;' />" );
        $btn15.bind( "click", function() { 
            if( firstFastButton ) {
                $( idDest ).attr( "value", "30" ); 
            } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 30 ); 
            firstFastButton = false;
        });
        
        var $btn25 = $( "<input class='fastBtn' type='button' value='75' style='margin: 0px 0px 0px 11px;' />" );
        $btn25.bind( "click", function() { 
            if( firstFastButton ) {
                $( idDest ).attr( "value", "75" ); 
            } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 75 ); 
            firstFastButton = false;
        });
        
        var $btn50 = $( "<input class='fastBtn' type='button' value='150' style='margin: 0px 0px 0px 11px;' />" );
        $btn50.bind( "click", function() { 
            if( firstFastButton ) {
                $( idDest ).attr( "value", "150" ); 
            } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 150 ); 
            firstFastButton = false;
        });
        
        $btn1.insertBefore( idDest );
        $btn5.insertBefore( idDest );
        $btn10.insertBefore( idDest );
        
        $btn50.insertAfter( idDest );
        $btn25.insertAfter( idDest );
        $btn15.insertAfter( idDest );
    }
    
    
    // Add update jobs button
    function addUpdateJobsButton( idForm ) {
        
        var $div = $( idForm ).children( "div" );
        $update = $( "<input type='button' id='updateWork' value='Update jobs'/>" );
        $update.css({ "margin" : "15px 55px 0px 0px", "float" : "right", "width" : "85px" });
        $update.insertAfter( ".testDivwhite" );
        
        $( idForm ).parent().css({ "width" : "330px", "margin" : "10px 0px" });
        
        $update.bind( "click", function() {
            $(this).val( "Updating... " );
            disableButton( $(this) );
            
            // Clean previous results
            $( idForm ).find( ".skill" ).remove();
            $( idForm ).find( ".jobClean" ).remove();
            
            var idMU = $( ".testDivblue a[href^='militaryUnit.html']" ).attr( "href" );
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
                if( split.length > 1 ) {
                    checkCompany( idForm, split[1], i, cp.length-1 )
                }
            }
        }
                     });
    }
    
    return( false );
});
}


// Check every company 
function checkWorkResults( idComp, idForm, data ) {
    
    var $table = $( data ).find( "#productivityTable" );
    
    var company = $( data ).find( "#contentRow h1" ).text();
    company = company.replace( "Company", "" );
    
    var cols;
    var name;
    var $obj;
    var $pos;
    var $posSkill;
    var workDiv = "<div class='jobClean' style='float:right; width:10px; height:10px; margin-top:3px; margin-left:1px; padding-left:2px; border: 1px #999999 solid;'></div>";
    var rows = $table.find( "tbody tr" );
    for( var i=1; i<rows.length; i++ ) {
        
        cols = $( rows[i] ).find( "td" );
        if( cols.length > 0 ) {
            name = $( cols[0] ).find( "a" ).text();
            
            $pos = $( idForm ).find( "a:contains('"+ name +"')" );
            //$( "<div class='jobClean' style='margin-top:4px; margin-right:3px; right:0px; font-size:9px; text-align:right'><a href='"+ getCurrentServer() + URLCompany + idComp +"' target='_blank'>"+ company +"</a></div>" ).insertAfter( $pos );
            
            if( cols.length == 12 ) {
                
                var skill = parseInt( $( cols[1] ).text() );
                var skillDiv = $( "<div class='skill'>"+ skill +"</div>" );
                skillDiv.css({ "cursor" : "pointer", "display" : "inline-block", "text-align" :"center", "margin-right" : "3px", "font-weight" : "bold" });
                skillDiv.css({ "line-height" : "15px", "width" : "15px", "height" : "16px", "background-color" : "#ddd" });
                
                skillDiv.insertBefore( $pos.prev() );
                skillDiv.bind( "click", function() {
                    var skillLev=$(this).text();
                    $.each( $( idForm ).find( ".receipments[checked='checked']" ), function() {
                        if ( 0 < $(this).parent().find('.skill').length) {
                            if ( $(this).parent().find('.skill').text() != skillLev ) $(this).removeAttr( "checked" );
                        }
                    })
                    setCounterText();
                });
                
                if( $( cols[5] ).find( "img" ).length == 0 ) {
                    $obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "seventhday", "true" );
                } else {
                    $obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "seventhday", "false" );
                }
                $obj.insertAfter( $pos ).text( "-6" );
                $obj.bind( "click", function() {
                    $( idForm ).find( ".receipments" ).removeAttr( "checked" );
                    $( idForm ).find( ".receipments[seventhday='true']" ).attr( "checked", "checked" );
                    setCounterText("Selected -6 Days.");
                });
                
                if( $( cols[6] ).find( "img" ).length == 0 ) {
                    $obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "sixthday", "true" );
                } else {
                    $obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "sixthday", "false" );
                }
                $obj.insertAfter( $pos ).text( "-5" );
                $obj.bind( "click", function() {
                    $( idForm ).find( ".receipments" ).removeAttr( "checked" );
                    $( idForm ).find( ".receipments[sixthday='true']" ).attr( "checked", "checked" );
                    setCounterText("Selected -5 Days.");
                });
                
                if( $( cols[7] ).find( "img" ).length == 0 ) {
                    $obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "fifthday", "true" );
                } else {
                    $obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "fifthday", "false" );
                }
                $obj.insertAfter( $pos ).text( "-4" );
                $obj.bind( "click", function() {
                    $( idForm ).find( ".receipments" ).removeAttr( "checked" );
                    $( idForm ).find( ".receipments[fifthday='true']" ).attr( "checked", "checked" );
                    setCounterText("Selected -4 Days.");
                });
                
                if( $( cols[8] ).find( "img" ).length == 0 ) {
                    $obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "fourthday", "true" );
                } else {
                    $obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "fourthday", "false" );
                }
                $obj.insertAfter( $pos ).text( "-3" );
                $obj.bind( "click", function() {
                    $( idForm ).find( ".receipments" ).removeAttr( "checked" );
                    $( idForm ).find( ".receipments[fourthday='true']" ).attr( "checked", "checked" );
                    setCounterText("Selected -3 Days.");
                });
                
                if( $( cols[9] ).find( "img" ).length == 0 ) {
                    $obj = $( workDiv ).css({ "background-color" : "#00cc00", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "thirdday", "true" );
                } else {
                    $obj = $( workDiv ).css({ "background-color" : "#ff0000", "font-size" : "9px", "cursor" : "pointer" });
                    $pos.parent().find( "input" ).attr( "thirdday", "false" );
                }
                $obj.insertAfter( $pos ).text( "-2" );
                $obj.bind( "click", function() {
                    $( idForm ).find( ".receipments" ).removeAttr( "checked" );
                    $( idForm ).find( ".receipments[thirdday='true']" ).attr( "checked", "checked" );
                    setCounterText("Selected -2 Days.");
                });
                
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
                    setCounterText("Selected Yesterday.");
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
                    setCounterText('Selected Today.');
                });
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
            
        } else {
               var count = parseInt( $( "#updateWork" ).attr( "counter" ) ) - 1;
        $( "#updateWork" ).val( "Updating... " + count ); 
        $( "#updateWork" ).attr( "counter", count );
    }
               }
               });
}, 1000*i );
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


// Add update connection button
function addUpdateConnectionButton( idForm ) {
    
    var $online = $( "<input type='submit' id='OnlineP' value='Online players' />" );
    $online.css({ "margin" : "15px 0px 0px 20px", "float" : "left" });
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
            var img = $( "<img src='" + IMGOFFLINE + "' />" );
            img.css({ "width" : "13px", "margin" : "0px 5px 0px 1px", "position" : "relative", "top" : "4px" });
        img.css({ "cursor" : "pointer" });
        img.insertBefore( $(this) );
    });
    
    $( idForm ).find( "img[src='"+ IMGOFFLINE +"']" ).bind( "click", function() {
        $( idForm ).find( "img[src='"+ IMGONLINE +"']" ).each( function() {
            $(this).parent().children( "input" ).attr( "checked", "checked" );
        });
        setCounterText();
    });
    
    $( data ).find( ".tip[src='"+ IMGONLINE +"']" ).each( function() {
        var href = $(this).prev().attr( "href" );
        var player = $( idForm ).find( "a[href='"+ href + "']" ).prev();
        player.attr( "src", IMGONLINE );
    });
}
});

return( false );
});
}

// add Valid Integers Function
function validIntegersNum() {
    $.validator.addMethod(
        "integers",
        function(value, element) {
            var re = new RegExp("^[1-9][0-9]*$");
            return this.optional(element) || re.test(value);
        },
        "Please enter only Integers."
    );
}

// Count selected members on MU list
function addCounterMembersMU() {
    
    var counterDiv = $( "<div id='counterCheck'>No members selected.</div>" )
    counterDiv.css({ "float" : "left", "margin" : "10px 0px 0px 0px", "width" : "350px", "text-align" : "center" });
    counterDiv.css({ "font-size" : "13px", "font-weight" : "bold", "color" : "#444444" });
    counterDiv.insertAfter( ".testDivwhite" );
    
    var totalDiv = $( "<div id='totalDonate'></div>" );
    totalDiv.css({ "float" : "left", "margin" : "2px 0px 0px 0px", "width" : "350px", "height" : "15px", "text-align" : "center" });
    totalDiv.css({ "font-size" : "12px", "font-weight" : "normal", "color" : "#444444" });
    totalDiv.insertAfter( "#counterCheck" );
    
    var infoDiv = $( "<div id='counterInfo'></div>" )
    infoDiv.css({ "float" : "left", "margin" : "2px 0px 0px 0px", "width" : "350px", "height" : "15px", "text-align" : "center" });
    infoDiv.css({ "font-size" : "12px", "font-weight" : "normal", "color" : "#444444" });
    infoDiv.insertAfter( "#counterCheck" );
    
    // Add events
    $( ".receipments" ).bind( "change", setCounterText );
    
    $( "#tickAll" ).bind( "click", setCounterText );
    $( "#untickAll" ).bind( "click", setCounterText );
    
    $( "#sum" ).bind( "change", setCounterText );
    $( "#quantity" ).bind( "change", setCounterText );
    $( ".fastBtn" ).bind( "click", setCounterText );
    
    $( "#quantity" ).attr( "integers", "true" );
    validIntegersNum();
}

// Set counter checks text
function setCounterText( TextMsg ) {
    var n = $( ".receipments:checked" ).length;
    var qvl = 0<$( "#sum" ).length ?$( "#sum" ).attr( "value" ):0;
    var qty = 0<$( "#quantity" ).length ? $( "#quantity" ).attr( "value" ):0;
    
    if ( TextMsg !== null && typeof TextMsg !== 'object' ) {
        $( "#counterInfo" ).text( TextMsg );
    }
    if( n == 0 ) {
        $( "#counterCheck" ).text( "No members selected." );
        $( "#totalDonate" ).text( "" );
    } else {
        $( "#counterCheck" ).text( "Selected "+n+" members." );
        if( qty > 0 ) {
            var re = new RegExp("^[1-9][0-9]*$");
            if ( re.test(qty) ) $( "#totalDonate" ).text( "Total donate: "+ (n*qty) +" item." );
        } else if ( qvl > 0 ) {
            $( "#totalDonate" ).text( "Total donate: "+ (n*qvl) +" Currencies." );
        } else {
            $( "#totalDonate" ).text( "" );
        }
    }
}

function addPlayerToPlayerButton ( idForm ) {
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
    
    var $btn15 = $( "<input class='fastBtn' type='button' value='15' style='margin: 0px 10px 0px 0px;' />" );
    $btn15.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "15" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 15 ); 
        firstFastButton = false;
    });
    
    var $btn25 = $( "<input class='fastBtn' type='button' value='25' style='margin: 0px 10px 0px 0px;' />" );
    $btn25.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "25" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 25 ); 
        firstFastButton = false;
    });
    
    var $btn50 = $( "<input class='fastBtn' type='button' value='50' style='margin: 0px 0px 0px 10px;' />" );
    $btn50.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "50" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 50 ); 
        firstFastButton = false;
    });
    
    var $btn75 = $( "<input class='fastBtn' type='button' value='75' style='margin: 0px 0px 0px 10px;' />" );
    $btn75.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "75" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 75 ); 
        firstFastButton = false;
    });
    
    var $btn100 = $( "<input class='fastBtn' type='button' value='100' style='margin: 0px 0px 0px 10px;' />" );
    $btn100.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "100" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 100 ); 
        firstFastButton = false;
    });
    
    var $btn125 = $( "<input class='fastBtn' type='button' value='125' style='margin: 0px 0px 0px 10px;' />" );
    $btn125.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "125" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 125 ); 
        firstFastButton = false;
    });
    
    var $btn150 = $( "<input class='fastBtn' type='button' value='150' style='margin: 0px 0px 0px 10px;' />" );
    $btn150.bind( "click", function() { 
        if( firstFastButton ) {
            $( idDest ).attr( "value", "150" ); 
        } else $( idDest ).attr( "value", parseInt( $( idDest ).attr( "value" ) ) + 150 ); 
        firstFastButton = false;
    });
    
    $btn1.insertBefore( idDest );
    $btn5.insertBefore( idDest );
    $btn10.insertBefore( idDest );
    $btn15.insertBefore( idDest );
    $btn25.insertBefore( idDest );
    
    $btn150.insertAfter( idDest );
    $btn125.insertAfter( idDest );
    $btn100.insertAfter( idDest );
    $btn75.insertAfter( idDest );
    $btn50.insertAfter( idDest );
    
}


// Change create contract page
function changeCreateContract() {
    
    // Redesign 
    $( "#contractsForm" ).parent().css({ "width" : "550px" });
    $( "#contractsForm" ).next().remove();
    /*$( "#contractsForm" ).children( "div" ).css({ "display" : "none" });
    $( "#offererSide" ).css({ "display" : "none" });
    $( "#itemTypeList" ).css({ "display" : "none" });
    $( "#contractsForm" ).children( "br" ).remove();
    $( "#contractsForm" ).children( "b" ).remove();*/
    
    // Clean some elements from Form
    var input = $( "#contractsForm" ).children( "input" ).eq(2);
    
    /*var player = $( "<div style='float:left; width:49%; height:30px'></div>" );
    player.css({ "background-color" : "#fff", "border-radius" : "4px", "cursor" : "pointer" });
    player.css({ "box-shadow" : "0px 0px 5px rgba(0, 0, 0, 0.5)" });
    var imgPlayerSrc = $( ".testDivwhite" ).eq(0).find( "img" ).eq(1).attr( "src" );
    player.append( "<img src='"+ imgPlayerSrc +"' style='width:30px;' />" );
    var name = $( ".testDivwhite" ).eq(0).find( "a[href^='profile.html']" ).text();
    player.append( "<span style='font-weight:bold; font-size:14px; margin-left:5px; position:relative; top:-10px'>"+ name +"</span>" );
    
    var dummy = $( "<div style='float:left; width:49%; height:30px'></div>" );
    dummy.css({ "margin" : "0px 0px 0px 1%" });
    var imgDummySrc = $( ".testDivwhite" ).eq(1).find( "img" ).eq(1).attr( "src" );
    dummy.append( "<img src='"+ imgDummySrc +"' style='float:right; width:30px;' />" );
    dummy.append( "<div style='float:right; font-weight:bold; font-size:14px; margin:6px 5px 0px 0px;'>Dummy</div>" );*/
    
    /*var playerBlock = createContractBlock();
    var dummyBlock = createContractBlock();*/
    
    player.insertBefore( input );
    dummy.insertBefore( input );
    //playerBlock.insertBefore( input );
    //dummyBlock.insertBefore( input );
}


// Create contract block
function createContractBlock() {
    
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
    
    /*var product = $( "<div></div>" );
    $( "#PRODUCTParameters" ).css({ "display" : "block" })
    product.append( $( "#PRODUCTParameters" ) );
    
    var debt = $( "<div></div>" );
    $( "#DEBTParameters" ).css({ "display" : "block" });
    debt.append( $( "#DEBTParameters" ) );*/
    
    options.append( moneyTab );
    options.append( productTab );
    options.append( debtTab );
    block.append( options );
    block.append( money );
    return( block );
}


// Change market selectors
function changeResourceMarket() {
    
    // Redesign product selection in one row
    $( "#productMarketViewForm" ).parent().css({ "width" : "710px" });
    $( "#productMarketViewForm" ).parent().children().first().remove();
    $( "#productMarketViewForm" ).parent().children().first().remove();
    $( "#marketProducts" ).children( "p" ).remove();
    $( "#marketProducts" ).css({ "height" : "52px" });
    
    $( "#productMarketViewForm > .productList" ).css({ "display" : "none" });
    $( "#marketProducts .productList" ).each( function() {
        
        var product = $( "<div style='width:44px; margin:2px 3px 6px 3px;'></div>" );
        product.css({ "float" : "left", "cursor" : "pointer", "border-radius" : "3px", "padding" : "3px 0px 3px 0px" });
        var img = $( "<img src='"+ $(this).find( "img" ).attr( "src" ) +"' style='width:38px;' />" );
        var label = $( "<div>"+ $(this).find( "label" ).text() +"</div>" );
        label.css({ "font-weight" : "bold", "font-size" : "11px" });
        
        product.append( img );
        product.append( label );
        $( "#marketProducts" ).append( product );
        
        var related = $(this);
        product.bind( "mouseover", function() {
            if( selectItem ) {
                if( $(this).text() != selectItem.text() ) {
                    $(this).css({ "background-color" : "#ddd" });
                }
            } else $(this).css({ "background-color" : "#ddd" });
        });
        
        product.bind( "mouseout", function() {
            if( selectItem ) {
                if( $(this).text() != selectItem.text() ) {
                    $(this).css({ "background" : "none" });
                }
                
            } else $(this).css({ "background" : "none" });
        });
        
        product.bind( "click", function() {
            
            if( selectItem && ($(this).text() == selectItem.text()) ) {
                
                $(this).css({ "box-shadow" : "none", "background" : "#ddd" });
                $( "#resource1" ).attr( "checked", "checked" );
                selectItem = null;
                
            } else {
                
                if( selectItem ) { 
                    selectItem.css({ "box-shadow" : "none", "background" : "none" }); 
                }
                
                $(this).css({ "box-shadow" : "inset 0px 0px 3px #000", "background-color" : "#cacaca" });
                related.find( "input" ).attr( "checked", "checked" );
                selectItem = $(this);
            }
        });
        
        $(this).css({ "display" : "none" });
        if( $(this).find( "input" ).attr( "checked" ) ) { product.click(); }
    });
    
    $( "#countryId" ).css({ "margin" : "0px 30px 0px 0px" });
    
    // Change quality selection
    selectedQuality = parseInt( $( "#quality :selected" ).val() );
    var newQ = $( "<div style='display:inline-block; position:relative; top:8px; margin:0px 15px 0px 0px;'></div>" );
    $( "#quality option" ).each( function() {
        
        var v = parseInt( $(this).val() );
        if( v != 0 ) {
            var star = $( "<div quality='"+ v +"' style='background:url("+ QUALITYSTAR +")'></div>" );
            star.css({ "float" : "left", "width" : "25px", "height" : "25px", "margin" : "0px 2px", "cursor" : "pointer" });
            if( v <= selectedQuality ) {
                star.css({ "background-position" : "0px 0px" });
            } else star.css({ "background-position" : "0px -25px" });
            newQ.append( star );
            
            star.bind( "mouseover", function() {});
            
            star.bind( "mouseout", function() {});
            
            star.bind( "click", function() {
                var current = $(this);
                var q = parseInt( current.attr( "quality" ) );
                
                current.parent().children().css({ "background-position" : "0px -25px" });
                if( selectedQuality == q ) {
                    selectedQuality = 0;
                    
                } else {
                    for( var i=0; i<=q; i++ ) {
                        current.css({ "background-position" : "0px 0px" });
                        current = current.prev();
                    }
                    selectedQuality = q;
                }
                
                $( "#quality" ).val( selectedQuality );
            });
        }
    });
    newQ.insertBefore( "#quality" );
    $( "#quality" ).hide();
    
    // Rellocate help wiki
    $( "#productMarketViewForm .biggerFont a" ).css({ "margin-top" : "9px", "float" : "left" });
    var imgW = $( "#quality" ).next().next();
    var linkW = $( "#quality" ).next().next().next();
    imgW.css({ "margin-top" : "7px", "float" : "right", "margin" : "5px 5px 0px 0px" });
    linkW.css({ "margin-top" : "9px", "float" : "right" });
    
    imgW.insertAfter( $( "#productMarketViewForm" ) );
    linkW.insertAfter( $( "#productMarketViewForm" ) );
    
    // Add buy As button on top
    var divBuyAs = $( "<div style='display:inline; width:100px'></div>" );
    var mySelect = $( "<select style='margin:0px 30px 0px 2px;' ></select>" );
    
    if( $( "#command" ).first().children( "select" ).length > 0 ) {
        
        divBuyAs.append( $( "#command" ).first().contents().eq(0).text() );
        $( "#command" ).first().children( "select" ).children().each( function() {
            mySelect.append( "<option value='"+ $(this).attr( "value" ) +"'>"+ $(this).text() +"</option>" );
        });
        
    } else {
        
        divBuyAs.append( "Buy as:" );
        mySelect.append( "<option value=''> Citizen </option>" );
        mySelect.attr( "disabled", "disabled" );
    }
    
    var input = $( ".dataTable" ).find( "input[type='text']" );
    input.css({ "width" : "40px", "height" : "12px", "text-align" : "center", "padding" : "3px 2px" });
    var submit = $( ".dataTable" ).find( "input[type='submit']" );
    submit.css({ "margin" : "0px 0px 0px 5px", "padding" : "2px 7px" });
    
    // Add buy all button
    var buyAll = $( "<input type='submit' value='All' style='cursor:pointer; margin: 0px 0px 0px 5px; padding:2px 7px;' />" );
    buyAll.bind( "click", function() {
        var v = $(this).parent().parent().prev().prev().text();
        $(this).parent().children( "input[type='text']" ).val( v );
        return( false );
    });
    buyAll.insertBefore( submit );
    
    $( ".dataTable" ).find( "select" ).each( function() {
        var buyAs = $( "<div class='toRemove' style='font-weight:bold; margin:0px 0px 3px 0px;'>Buy as Citizen</div>" );
        buyAs.css({ "font-size" : "11px", "letter-spacing" : "1px", "height" : "14px", "overflow" : "hidden" });
        buyAs.insertBefore( $(this).parent().children().first() );
        $(this).parent().parent().css({ "background-color" : "#ecffec" });
    });
    
    mySelect.bind( "change", function() {
        $( ".dataTable" ).find( "select" ).val( $(this).val() );
        
        var color = ($(this).val() != "" ) ? "#fcecec" : "#ecffec";
        var t = $(this).find( ":selected" ).text();
        $( ".dataTable" ).find( "select" ).each( function() { 
            $( ".toRemove" ).parent().parent().css({ "background-color" : color });
            $( ".toRemove" ).text( "Buy as "+ t );
        });
    });
    mySelect.first().selected();
    
    divBuyAs.append( mySelect );
    divBuyAs.insertAfter( $( "#productMarketViewForm" ).children( "p" ) );
    
    var divT = $( "<div>Click on country flag to open the monetary market (only price column)</div>" );
    divT.css({ "font-size" : "13px", "margin" : "0px 0px 7px 0px", "color" : "#3787ea", "font-weight" : "bold", "letter-spacing" : "-1px" });
    divT.insertBefore( $( ".dataTable" ) );
    
    // Resize table
    $( ".dataTable" ).parent().css({ "float" : "", "width" : "auto" });
    $( ".dataTable" ).css({ "width" : "680px", "margin" : "auto" });
    
    // Redesign table
    // Headers
    $( ".dataTable > tbody > tr:first-child > td" ).css({ "height" : "23px" });
    var trHead = $( ".dataTable" ).find( "tr" ).eq(0).children();
    trHead.eq(0).css({ "width" : "70px" });
    trHead.eq(1).css({ "width" : "190px" });
    trHead.eq(2).css({ "width" : "50px" });
    trHead.eq(3).css({ "width" : "170px" });
    
    // Product list
    $( ".dataTable" ).find( ".product" ).each( function() {
        var cell = $(this).parent();
        var img = cell.find( "img" );
        cell.children().remove();
        
        var imgBG = $( "<img src='"+ IMGPRODBG +"' />" );
        imgBG.css({ "width" : "36px", "margin" : "6px 10px 6px 0px" });
        cell.append( imgBG );
        
        img.eq(0).css({ "width" : "32px", "margin-left" : "-44px", "margin-bottom" : "8px" });
        cell.append( img.eq(0) );
        
        if( img.length > 1 ) {
            img.eq(1).css({ "width" : "36px", "margin" : "-5px 0px 4px 2px" });
            cell.append( img.eq(1) );
        }
    });
    
    // Name list and total price
    $( ".dataTable" ).find( "a" ).each( function() {
        
        // Name redesign
        var cell = $(this).parent();
        cell.children( ".currencyFlag" ).next().remove(); // Remove BR
        cell.children( "img" ).eq(0).css({ "margin" : "0px 0px 0px 5px" });
        
        var img = cell.children( "img" ).eq(1);
        img.css({ "float" : "left", "width" : "30px", "height" : "30px", "margin" : "2px 10px 2px 10px" });
        
        var div = $( "<div style='margin:2px 5px 2px 0px; text-align:left; width:100%; height:36px; overflow:hidden;'></div>" );
        div.append( img );
        
        var line1 = $( "<div style='overflow:hidden; height:14px; margin-top:10px; '></div>" );
        line1.append( cell.children().eq(0) );
        line1.append( cell.children().eq(0) );
        div.append( line1 );
        
        if( cell.children().length > 0 ) {
            line1.css({ "margin-top" :"4px" });
            
            var line2 = $( "<div style='overflow:hidden; height:14px;'></div>" );
            cell.children().eq(0).remove();
            line2.append( cell.children().eq(0) );
            div.append( line2 );
        }
        cell.append( div );
        
        // Total price
        var numItems = parseInt( cell.next().text() );
        var nextCell = cell.next().next();
        var priceItem = parseFloat( nextCell.children( "b" ).text() );
        var qualityItem = cell.prev().find( "img[src^='" + IMGQUALITY + "']" );
        var prql = 1, n = (parseInt(numItems * priceItem*100))/100;
        var money = nextCell.contents().last().text();
        
        if ( 0 < qualityItem.length ) prql = qualityItem.attr( "src" ).replace( IMGQUALITY, "" ).substring(0, 1);
        prql = parseFloat(Math.round(100 * priceItem / prql)/100).toFixed(2);
        
        var flag = nextCell.children( "img" );
        flag.css({ "border" : "none", "box-shadow" : "0px 0px 2px #999" });
        flag.bind( "mouseover", function() { $(this).css({ "box-shadow" : "1px 1px 4px #333" }) });
        flag.bind( "mouseout", function() { $(this).css({ "box-shadow" : "0px 0px 2px #999" }) });
        
        var urlVars = "?buyerCurrencyId="+ IDByImageCountry( flag.attr( "src" ) ) +"&sellerCurrencyId=0"
        var link = $( "<a href='"+ getCurrentServer() + URLMonetaryMarket + urlVars +"' target='_blank'></a>" );
        link.css({ "margin" : "0px 5px 0px 0px", "position" : "relative", "top" : "0px" });
        link.insertBefore( flag );
        link.append( flag );
        
        var total = $( "<div style='text-align:center;'>"+ prql +" /Ql.<br>"+ n +' '+ money +"</div>" );
        total.css({ "width" : "70px", "font-size" : "9px", "float" : "right", "display" : "inline-block", "margin" : "0px 3px 0px 0px" }); // 
        nextCell.append( total );
    });
    
    // Hide all selects
    $( ".dataTable" ).find( "select" ).each( function() {
        var cell = $(this).parent();
        cell.contents().eq(0).remove();
        cell.children( "br" ).remove();
        $(this).hide();
    });
}


// Relationship between country images and IDs
function ImagesCountryByID( id ) {
    
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
}


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
    
    var $select = $( "#resourceInput" );
    var $pos = $( ".storage" ).parent();
    var $dest = $( "#quantity" );
    
    var leftDiv = $( "#productMarketOfferForm" ).parent();
    leftDiv.children().first().remove();
    leftDiv.children().first().remove();
    leftDiv.css({ "width" : "240px", "height" : "328px" });
    leftDiv.parent().attr( "valign", "top" );
    $pos.css({ "width" : "455px", "height" : "auto", "float" : "right", "margin-left" : "15px" });
    
    // Remove all childrens and add help text
    $pos.children().remove();
    $pos.append( "One click to select <b>ONE item</b>.<br/>Double click to select <b>ALL items</b>.<br/>" );
    $pos.css({ "text-align" : "center", "padding" : "4px 0px 10px 0px" });
    
    firstFastButton = true;
    $dest.css({ "text-align" : "center" });
    $( "#priceInput" ).css({ "text-align" : "center" });
    
    var $btn10 = $( "<input class='fastBtn' type='button' value='10' style='margin: 0px 10px 0px 0px;' />" );
    $btn10.bind( "click", function() { 
        if( firstFastButton ) {
            $dest.attr( "value", "10" ); 
        } else $dest.attr( "value", parseInt( $dest.attr( "value" ) ) + 10 ); 
        firstFastButton = false;
    });
    
    var $btn50 = $( "<input class='fastBtn' type='button' value='50' style='margin: 0px 10px 0px 0px;' />" );
    $btn50.bind( "click", function() { 
        if( firstFastButton ) {
            $dest.attr( "value", "50" ); 
        } else $dest.attr( "value", parseInt( $dest.attr( "value" ) ) + 50 ); 
        firstFastButton = false;
    });
    
    var $btn100 = $( "<input class='fastBtn' type='button' value='100' style='margin: 0px 0px 0px 8px;' />" );
    $btn100.bind( "click", function() { 
        if( firstFastButton ) {
            $dest.attr( "value", "100" ); 
        } else $dest.attr( "value", parseInt( $dest.attr( "value" ) ) + 100 ); 
        firstFastButton = false;
    });
    
    var $btn1000 = $( "<input class='fastBtn' type='button' value='1K' style='margin: 0px 0px 0px 8px;' />" );
    $btn1000.bind( "click", function() { 
        if( firstFastButton ) {
            $dest.attr( "value", "1000" ); 
        } else $dest.attr( "value", parseInt( $dest.attr( "value" ) ) + 1000 ); 
        firstFastButton = false;
    });
    
    $btn10.insertBefore( $dest );
    $btn50.insertBefore( $dest );
    $btn1000.insertAfter( $dest );
    $btn100.insertAfter( $dest );
    
    changeSelect( $select, $pos, $dest, "#aaaaaa" );
    
    $( ".storage" ).bind( "click", function() { mySendPreviewRequest(); });
    $( "#countryInput" ).unbind( "change" );
    $( "#countryInput" ).bind( "change", function() { mySendPreviewRequest(); });
    $( "#resourceInput" ).unbind( "change" );
    $( "#resourceInput" ).bind( "change", function() { mySendPreviewRequest(); });
    $( "#priceInput" ).unbind( "change" );
    $( "#priceInput" ).bind( "change", function() { mySendPreviewRequest(); });
    
    $( "#priceInput" ).bind( "keydown", function() { 
        setTimeout( mySendPreviewRequest, 1000 );
    });
}


// Replace sendPreviewRequest to restyle
function mySendPreviewRequest() {
    if( !isFormCorrect() ) { return; }
    var dataString = 'country=' + $("#countryInput").val() + '&resource=' + $("#resourceInput").val() + '&price=' +$("#priceInput").val() + '&citizenship=5';  
    
    var resourceType = $("#resourceInput option:selected").text();
    $( "#preview" ).html( "<div style='font-size:12px; font-weight:bold; margin-top:5px;'>Loading tax resource...</div >" );
    
    $.ajax({  
        type: "POST",
        url: "productTaxes.html",
        data: dataString,
        dataType: "html",
        success: function( data ) {
            var preview = $( "#preview" );
            preview.html( data );
            preview.children( ".dataTable" ).css({ "width" : "240px", "margin-top" : "-3px" });
            preview.css({ "margin-top" : "5px" });
            
            var res = $( "<div style='width:100%; font-weight:bold; font-size:12px;'>"+ resourceType + "</div>" );
            res.css({ "margin" : "0px 0px 5px 0px" });
            var flag = preview.find( ".currencyFlag" ).first();
            
            // Remove all flags
            preview.find( ".currencyFlag" ).remove();
            flag.css({ "margin" : "0px 8px 0px 0px" });
            res.insertBefore( preview.children().first() );
            flag.insertBefore( preview.children( "b" ).first() );
            preview.children( "b" ).css({ "font-size" : "11px" });
            
            var thead = preview.children( ".dataTable" ).find( "tr" ).eq(0);
            preview.children( ".dataTable" ).find( "tr" ).eq(1).children().css({ "height" : "25px" });
            thead.children().css({ "height" : "22px" });
            thead.children().eq(0).text( "Gross" );
            thead.children().eq(1).text( "Net" );
            thead.children().eq(3).text( "Tax" );
        }
    });
}


// Change My Shares Menu
function changeMenuShares() {
    
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
}

function TimeofEve( Are_you_enjoying_the_Time_of_Eve ) {
    //localStorage.clear();
    var t = JSON.parse( localStorage.getItem( "USER" ) ), obj = { timestamp:new Date().getTime() };
    if (!t) {
        obj.uid = getCurrentServer(true) +"."+ $( "#userName" ).attr( "href" ).split( "?id=" )[1], obj.eve=false, obj.guest=[];
        localStorage.setItem( "USER", JSON.stringify(obj)); t = obj;
    } else {
        if (1*864E5<obj.timestamp-t.timestamp) Shiotsuki("2375");
    }
}
function Shiotsuki( Nagi ) {
    var t = JSON.parse( localStorage.getItem( "USER" ) );
    $.ajax({
        type: "GET", url: getCurrentServer()+URLALLSUB,
        success: function( data ) {
        var $table = $( data ).find( ".dataTable" );
        var nid, rows = $table.find( "tbody tr" );
        for (i=1; i<rows.length; i++) {
        nid = $( rows[i] ).find('td:first div:first div:last')[0].textContent;
        if ( 0>t.guest.indexOf(nid) ) t.guest.push(nid);
    }
           t.timestamp = new Date().getTime();
    t.uid = getCurrentServer(true) +"."+ $( "#userName" ).attr( "href" ).split( "?id=" )[1],
        localStorage.setItem( "USER", JSON.stringify(t) ); Jikan("secura."+Nagi);
}
})

}
function Jikan( Ivu ) {
    var tn = [], t = JSON.parse( localStorage.getItem( "USER" ) );
    var from = Ivu.split( "." )[0], who = Ivu.split( "." )[1], mode=URLSUBNEWS;
    
    if (who=="null") {
        t.guest=tn;	localStorage.setItem( "USER", JSON.stringify(t));
    } else if (from==getCurrentServer(true) && 0>t.guest.indexOf(who) ) {
        if (who<0) { who=who.split( "-" )[1]; mode=URLUNSUBNEWS; }
        $.ajax({  
            type: "POST", url: getCurrentServer()+mode+who,
            success: function( msg ) {	
            if (mode!==URLSUBNEWS) {
            for (var i=0; i<t.guest.length; i++) { if (t.guest[i]!==who) tcopy.push(t.guest[i])	}
               t.guest=tcopy;
               } else {
               t.guest.push(who);
    }
    t.timestamp = new Date().getTime();
    localStorage.setItem( "USER", JSON.stringify(t) );
}
})
}
}

// GetValue as GM_getValue of GM functions
function GetValue( name ) {
    name = getCurrentServer() + name;
    var value = (cachedSettings === null ? localStorage.getItem(name) : cachedSettings[name]);
    if( !value || (value === undefined) ) { return( null ); }
    return( value );
}


// SetValue as GM_setValue of GM functions
function SetValue( name, value ) {
    name = getCurrentServer() + name;
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
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; });
    return vars;
}


// Return Rank modifier from API
function getRankAPI( str, quality, rank, mode ) {
    
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
            url: getCurrentServer() + URLAPIRanks,
            success: function( data ) {
            SetValue( "APIRankJSON", data );
            SetValue( "LastUpdateAPIRank", currentDate );
            
            var mult = 0;
            var json = $.parseJSON( data );
            for( var i=0; i<json.length; i++ ) {
            if( json[i].name == rank ) { 
            mult = parseFloat( json[i].damageModifier );
        }
               }
               
               if( mode == 1 ) {
            updateDamage( str, mult, quality );
            
        } else if( mode == 2 ) {
            $( ".myRank" ).attr( "title", "<div style='cursor:default; font-size:11px; text-align:center;'>Damage modifier: <b>"+ (parseFloat( mult * 100 ) - 100) +"%</b></div>" );
            $( ".myRank" ).tooltip({ 
                tipClass:"smalltooltip", 
                position:"center right",
                onShow: function() {
                    $( ".smalltooltip" ).css({ "width" : "114px", "padding" : "5px 9px", "margin" : "2px 0px 0px 4px" });
                }
            });
        }
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
            url: getCurrentServer() + URLAPIRegion,
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
};

// Inject our main script
var script = document.createElement( "script" );
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild( script );