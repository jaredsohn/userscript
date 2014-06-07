Ресурс / Сохрани
E-mail
В закладки!
FacebookVKDeliciousGoogle BookmarksMySpaceYahoo BuzzStumbleUponBeboWordPressOrkutEvernoteStumpediaPosterousMSDNExpressionTipdPlurkYahoo MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeHemidemiInstapaperXerpiWinkBibSonomyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotDZoneHyvesBitty BrowserSymbaloo FeedsFolkdNewsTrustPrintFriendlyTuenti
Google GmailHotmail
	
Diary.RuTwitterDiggGoogle BuzzRedditMessengerYahoo BookmarksMister-WongGoogle ReaderXINGNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsFunPPhoneFavsNetvouzDiigoBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com MyStuffMapleConnoteaMyLinkVaultSphinnCare2 NewsSphereGabbrTagzaVodPodAmazon Wish ListRead It LaterEmail
Yahoo MailAOL Mail
Отправить через e-mail сервис:
Any email    
Работает на AddToAny
Userscripts.org
zloy

    * comments
    * favorite scripts
    * monitored topics
    * script management
    * settings
    * public profile

| Logout
0 unread messages
Search all scripts

    * Scripts
    * Jetpacks
    * Tags
    * Forums
    * People
    * Blog
    * Groups
    * Guides
    * Books

Ikariam Sexy Girls Theme
By PhasmaExMachina — Last update Aug 3, 2010 — Installed 81,704 times. Daily Installs: 484, 205, 162, 154, 132, 163, 161, 179, 152, 105, 199, 157, 159, 133, 132, 117, 120, 130, 110, 117, 94, 112, 132, 109, 85, 119, 104, 138, 85, 79, 82

    * About
    * Source Code
    * Reviews 6
    * Discussions 29
    * Fans 28
    * Issues
    * Share

There are 96 previous versions of this script.
Add Syntax Highlighting (this will take a few seconds, probably freezing your browser while it works)

// ==UserScript==
// @name           	Ikariam Sexy Theme
// @description		Skin for Ikariam that changes some of the Ikariam artwork with some sexier images
// @namespace      	icariam
// @include        	http://s*.ikariam.*/index.php*
// @include			http://*.ikariam.*/
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require         http://userscripts.org/scripts/source/57756.user.js
// @exclude         http://*board*.ikariam.*
// @author			PhasmaExMachina
// @version 		0.27
//
// @history 		0.27 Added steam giant image to barracks 
// @history 		0.27 Added steam giant image to workshop 
// @history 		0.26 Complete overhaul after a long absence
// @history 		0.25 Added options to show or hide certain elements
// @history 		0.24 Updated beachboys image
// @history 		0.23 Fixed display of defender units on troops in town view
// @history 		0.23 Updated troops view for cities in which you have deployed troops
// @history 		0.22 Fixed broken layout of sea unit help pages
// @history 		0.22 Added support for Ikariam Empire Board script
// @history 		0.21 Fixed sea battle detailed report page
// @history 		0.20 Added silhouette to header
// @history 		0.19 Changed header background (based on Fungah's Cutthroat theme)
// @history 		0.18 Combat reports and unit icons
// @history 		0.17 Fixed "View Troops in City" page for Ikariam v0.3.1
// @history 		0.17 Changed marksman unit image
// @history 		0.16 Added home page Ikariam logo
// @history 		0.15 Added warehouse image 
// @history 		0.14 Added missing general adviser alert (being attacked)
// @history 		0.13 Added automatic check for updates once every 24 hours
// @history 		0.13 Fixed dismiss units image on troops in town page
// @history 		0.13 Changed back to barracks image on troops in town page
// @history 		0.13 Changed back to barracks image on dismiss troops page
// @history 		0.12 Added military research image
// @history 		0.12 Updated misc. instances of library image
// @history 		0.11 Added Spear Thrower for Ikariam v0.3.2
// @history 		0.11 Added science and seafaring images to v0.3.2 research advisor
// @history 		0.11 Added seafaring image to login page
// @history 		0.10 Added tradegood worker
// @history 		0.10 Added wood worker
// @history 		0.10 Added battle report warrior icons
// @history 		0.10 Added citizens resource icons
// @history 		0.10 Added population icon

// @resource skinAdvisorsDiplomat.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsDiplomat.png
// @resource skinAdvisorsDiplomatActive.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsDiplomatActive.png
// @resource skinAdvisorsGeneral.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsGeneral.png
// @resource skinAdvisorsGeneralActive.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsGeneralActive.png
// @resource skinAdvisorsGeneralAlert.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsGeneralAlert.png
// @resource skinAdvisorsMayor.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsMayor.png
// @resource skinAdvisorsMayorActive.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsMayorActive.png
// @resource skinAdvisorsResearch.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsResearch.png
// @resource skinAdvisorsResearchActive.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinAdvisorsResearchActive.png
// @resource skinBuildingsAcademy.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsAcademy.gif
// @resource skinBuildingsBarracks.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsBarracks.gif
// @resource skinBuildingsBranchoffice.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsBranchoffice.gif
// @resource skinBuildingsCarpenter.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsCarpenter.gif
// @resource skinBuildingsGovernor.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsGovernor.gif
// @resource skinBuildingsMuseum.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsMuseum.gif
// @resource skinBuildingsPalace.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsPalace.gif
// @resource skinBuildingsPort.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsPort.gif
// @resource skinBuildingsSafehouse.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsSafehouse.gif
// @resource skinBuildingsShipyard.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsShipyard.gif
// @resource skinBuildingsTavern.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsTavern.gif
// @resource skinBuildingsTownhall.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsTownhall.gif
// @resource skinBuildingsWall.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsWall.gif
// @resource skinBuildingsWarehouse.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinBuildingsWarehouse.gif
// @resource skinLayoutBreadcrumb.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinLayoutBreadcrumb.gif
// @resource skinLayoutHeader.png http://lh6.ggpht.com/_1Nek0ZarHrk/Sun4W7MZjqI/AAAAAAAAADM/NkDiRlKeieI/header3.png
// @resource skinLayoutOcean.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinLayoutOcean.jpg
// @resource skinLayoutPopulationIcon.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinLayoutPopulationIcon.png
// @resource skinLayoutSky.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinLayoutSky.jpg
// @resource skinLoginHeader.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinLoginHeader.jpg
// @resource skinMiscAcademyView.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscAcademyView.png
// @resource skinMiscBarracksView.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscBarracksView.png
// @resource skinMiscBeachboys.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscBeachboys.png
// @resource skinMiscInspectDismissUnits.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscInspectDismissUnits.jpg
// @resource skinMiscInspectMilitary.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscInspectMilitary.jpg
// @resource skinMiscLibrary.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscLibrary.jpg
// @resource skinMiscOccupierLeft.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscOccupierLeft.png
// @resource skinMiscOccupierRight.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscOccupierRight.png
// @resource skinMiscPortView.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscPortView.png
// @resource skinMiscShipyardView.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinMiscShipyardView.png
// @resource skinResearchEconomy.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinResearchEconomy.jpg
// @resource skinResearchMilitary.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinResearchMilitary.jpg
// @resource skinResearchScience.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinResearchScience.jpg
// @resource skinResearchSeafaring.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinResearchSeafaring.jpg
// @resource skinUnitCitizenRight100.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitCitizenRight100.png
// @resource skinUnitCitizenRight120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitCitizenRight120.png
// @resource skinUnitCitizenRight40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitCitizenRight40.png
// @resource skinUnitsArcher120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsArcher120.png
// @resource skinUnitsArcher40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsArcher40.png
// @resource skinUnitsArcher60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsArcher60.png
// @resource skinUnitsBombardier120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsBombardier120.png
// @resource skinUnitsBombardier40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsBombardier40.png
// @resource skinUnitsBombardier60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsBombardier60.png
// @resource skinUnitsButtons.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsButtons.gif
// @resource skinUnitsCatapult120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCatapult120.png
// @resource skinUnitsCatapult40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCatapult40.png
// @resource skinUnitsCatapult60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCatapult60.png
// @resource skinUnitsCatapultHelp.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCatapultHelp.png
// @resource skinUnitScientistLeft120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitScientistLeft120.png
// @resource skinUnitsCook120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCook120.png
// @resource skinUnitsCook40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCook40.png
// @resource skinUnitsCook60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsCook60.png
// @resource skinUnitsGyrocopter120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsGyrocopter120.png
// @resource skinUnitsGyrocopter40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsGyrocopter40.png
// @resource skinUnitsGyrocopter60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsGyrocopter60.png
// @resource skinUnitsMarksman120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMarksman120.png
// @resource skinUnitsMarksman40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMarksman40.png
// @resource skinUnitsMarksman60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMarksman60.png
// @resource skinUnitsMarksmanHelp.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMarksmanHelp.png
// @resource skinUnitsMedic120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMedic120.png
// @resource skinUnitsMedic40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMedic40.png
// @resource skinUnitsMedic60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMedic60.png
// @resource skinUnitsMortar120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMortar120.png
// @resource skinUnitsMortar40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMortar40.png
// @resource skinUnitsMortar60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMortar60.png
// @resource skinUnitsMortarHelp.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsMortarHelp.png
// @resource skinUnitsPhalanx120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsPhalanx120.png
// @resource skinUnitsPhalanx40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsPhalanx40.png
// @resource skinUnitsPhalanx60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsPhalanx60.png
// @resource skinUnitsRam120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsRam120.png
// @resource skinUnitsRam40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsRam40.png
// @resource skinUnitsRam60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsRam60.png
// @resource skinUnitsRamHelp.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsRamHelp.png
// @resource skinUnitsRamOrig.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsRamOrig.png
// @resource skinUnitsScientist40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsScientist40.png
// @resource skinUnitsSlinger120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSlinger120.png
// @resource skinUnitsSlinger40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSlinger40.png
// @resource skinUnitsSlinger60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSlinger60.png
// @resource skinUnitsSlingerHelp.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSlingerHelp.png
// @resource skinUnitsSlingerOrig.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSlingerOrig.png
// @resource skinUnitsSpearman120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSpearman120.png
// @resource skinUnitsSpearman40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSpearman40.png
// @resource skinUnitsSpearman60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSpearman60.png
// @resource skinUnitsSprites.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSprites.gif
// @resource skinUnitsSpy120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSpy120.png
// @resource skinUnitsSteamgiant120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSteamgiant120.png
// @resource skinUnitsSteamgiant40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSteamgiant40.png
// @resource skinUnitsSteamgiant60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSteamgiant60.png
// @resource skinUnitsSwordsman120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSwordsman120.png
// @resource skinUnitsSwordsman40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSwordsman40.png
// @resource skinUnitsSwordsman60.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsSwordsman60.png
// @resource skinUnitsTradeWorker40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsTradeWorker40.png
// @resource skinUnitsTradeWorkerLeft120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsTradeWorkerLeft120.png
// @resource skinUnitsWoodWorker40.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsWoodWorker40.png
// @resource skinUnitsWoodWorkerLeft120.png http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/sexy%20theme/skinUnitsWoodWorkerLeft120.png

if(!navigator.userAgent.toString().match(/chrome/i))
	ScriptUpdater.check(56757, '0.27')

// ==/UserScript==

if (document.location.toString().match(/http:\/\/.il\.ikariam.il\//)) {

	var gmStyles = "";
	if (navigator.userAgent.toString().match(/chrome/i)) {
		function GM_addStyle(css){
			gmStyles += css + "\n";
		}
		function GM_getResourceURL(str){
			return chrome.extension.getURL("images/" + str);
		}
	}

	
	// login page
	if(document.getElementById('loginForm')) {
		GM_addStyle('#headlogo { background-image:url(' + GM_getResourceURL('skinLoginHeader.jpg') + ') !important; }')
	}
	var layout = "\
		#container ul.resources .population { background-image:url(" + GM_getResourceURL("skinLayoutPopulationIcon.png") + "); }\
		#header { background:transparent url(" + GM_getResourceURL('skinLayoutHeader.png') + ") no-repeat scroll 0 0 !important; }\
		#breadcrumbs { background:transparent url(" + GM_getResourceURL('skinLayoutBreadcrumb.gif') + ") no-repeat scroll 0 0; }\
		#extraDiv1 { background:transparent url(" +	GM_getResourceURL('skinLayoutSky.jpg') + ") repeat-x scroll 0 0; }\
		#extraDiv2 { background:transparent url(" + GM_getResourceURL('skinLayoutOcean.jpg') + ") repeat-x scroll 0 0; }\
	";
	GM_addStyle(layout);
	
	var advisors = "\
		#advisors #advCities a.normal { background-image:url(" + GM_getResourceURL('skinAdvisorsMayor.png') + "); }\
		#advisors #advCities a.normalactive  { background-image:url(" + GM_getResourceURL('skinAdvisorsMayorActive.png') + "); }\
		#advisors #advMilitary a.normal  { background-image:url(" + GM_getResourceURL('skinAdvisorsGeneral.png') + "); }\
		#advisors #advMilitary a.normalactive  { background-image:url(" + GM_getResourceURL('skinAdvisorsGeneralActive.png') + "); }\
		#advisors #advMilitary a.normalalert  { background-image:url(" + GM_getResourceURL('skinAdvisorsGeneralAlert.png') + "); }\
		#advisors #advResearch a.normal  { background-image:url(" + GM_getResourceURL('skinAdvisorsResearch.png') + "); }\
		#advisors #advResearch a.normalactive  { background-image:url(" + GM_getResourceURL('skinAdvisorsResearchActive.png') + "); }\
		#advisors #advDiplomacy a.normal  { background-image:url(" + GM_getResourceURL('skinAdvisorsDiplomat.png') + "); }\
		#advisors #advDiplomacy a.normalactive  { background-image:url(" + GM_getResourceURL('skinAdvisorsDiplomatActive.png') + "); }\
	";
	GM_addStyle(advisors);
	
	var view = document.body.id;
	var views = {
		'academy':function() {
			GM_addStyle("\
				#researchLibrary div.content { padding-top:85px; background:url(" + GM_getResourceURL('skinMiscLibrary.jpg') + ") no-repeat top center; } \
				#researchLibrary div.content img { display:none; }\
				#academy #mainview #setScientists .citizens { background-image:url(" + GM_getResourceURL('skinUnitCitizenRight120.png') + "); background-position:0; }\
				#academy #mainview #setScientists .scientists { background-image:url(" + GM_getResourceURL('skinUnitScientistLeft120.png') + "); background-position:0; }\
				#academy .buildingDescription { background-image:url(" + GM_getResourceURL('skinMiscAcademyView.png') +  "); }\
			");
			views['researchAdvisor']();			
		},
		'armyGarrisonEdit':function() {
			views.barracks();
		},
		'barracks':function() {
			GM_addStyle("\
				#barracks .buildingDescription { background-image:url(" + GM_getResourceURL('skinMiscBarracksView.png') +  "); background-position:right 20px; }\
				#buildingUpgrade + div.dynamic div.content { padding-top:90px; background:url(" + GM_getResourceURL('skinMiscInspectDismissUnits.jpg') + ") no-repeat top center; } \
				#barracks .army { background-image:url(" + GM_getResourceURL('skinUnitsSprites.gif') + ") !important; background-repeat:no-repeat !important; }\
				#barracks .nobckrd, .unitcounttextlabel { background-image:none !important; }\
				div.unitcounttextlabel { background-color:#fdf7dd; height:2.5em; }\
				#unitConstructionList div.unitcounttextlabel { background-color:#f6ebba; height:1.5em; }\
			");
			$('img[src*="catapult_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsCatapult120.png'));
			$('img[src*="cook_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsCook120.png'));
			$('img[src*="phalanx_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsPhalanx120.png'));
			$('img[src*="archer_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsArcher120.png'));
			$('img[src*="marksman_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsMarksman120.png'));
			$('img[src*="slinger_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsSlinger120.png'));
			$('img[src*="spearman_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsSpearman120.png'));
			$('img[src*="steamgiant_r_120x100"]').css('margin-left', '15px');
			$('img[src*="steamgiant_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsSteamgiant120.png'));
			$('img[src*="swordsman_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsSwordsman120.png'));
			$('img[src*="ram_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsRam120.png'));
			$('img[src*="mortar_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsMortar120.png'));
			$('img[src*="medic_r_120x100"]').attr('src',  GM_getResourceURL('skinUnitsMedic120.png'));
		},
		'city':function() {
			GM_addStyle("\
				#information div.content ul.cityinfo li.citylevel + div { background:url(" + GM_getResourceURL('skinMiscInspectMilitary.jpg') + ") center top no-repeat; padding-top:95px; }\
				#city #container #mainview #locations .academy .buildingimg { background-image:url(" + GM_getResourceURL('skinBuildingsAcademy.gif') + ") }\
				#city #container #mainview #locations .barracks .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsBarracks.gif') + "); }\
				#city #container #mainview #locations .branchOffice .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsBranchoffice.gif') + "); }\
				#city #container #mainview #locations .carpentering .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsCarpenter.gif') + "); }\
				#city #container #mainview #locations .palaceColony .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsGovernor.gif') + "); }\
				#city #container #mainview #locations .museum .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsMuseum.gif') + "); }\
				#city #container #mainview #locations .palace .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsPalace.gif') + "); }\
				#city #container #mainview #locations .port .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsPort.gif') + "); }\
				#city #container #mainview #locations .safehouse .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsSafehouse.gif') + "); }\
				#city #container #mainview #locations .shipyard .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsShipyard.gif') + "); }\
				#city #container #mainview #locations .tavern .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsTavern.gif') + "); }\
				#city #container #mainview #locations .townHall .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsTownhall.gif') + "); }\
				#city #container #mainview #locations .wall .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsWall.gif') + "); }\
				#city #container #mainview #locations .warehouse .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsWarehouse.gif') + "); }\
				#city #container #mainview #locations .beachboys { background-image:url(" + GM_getResourceURL('skinMiscBeachboys.png') + "); }\
				#city #container #mainview #locations .occupierBeach,\
				#city #container #mainview #locations .occupierGate2 { background-image:url(" + GM_getResourceURL('skinMiscOccupierRight.png') + "); }\
				#city #container #mainview #locations .occupier1,\
				#city #container #mainview #locations .occupier2,\
				#city #container #mainview #locations .occupierGate1 { background-image:url(" + GM_getResourceURL('skinMiscOccupierLeft.png') + "); }\
			");
		},
		'cityMilitary-army':function() {
			GM_addStyle("\
				#backTo + div.dynamic div.content { padding-top:85px; background:url(" + GM_getResourceURL('skinMiscInspectDismissUnits.jpg') + ") no-repeat top center; } \
				#backTo + div.dynamic div.content img, #backTo + div.dynamic + div.dynamic div.content img { display:none; }\
				#backTo + div.dynamic + div.dynamic div.content { padding-top:95px; background:url(" + GM_getResourceURL('skinMiscBarracksView.png') + ") center 5px no-repeat; }\
			");
			GM_addStyle("#tab1 .content th img { display:none; }");
			
			GM_addStyle("#tab1 .content th { height:65px; }");
				
			GM_addStyle("#tab1 .content th { background:url(" + GM_getResourceURL('skinUnitsPhalanx60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content th + th { background:url(" + GM_getResourceURL('skinUnitsSteamgiant60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content th + th + th { background:url(" + GM_getResourceURL('skinUnitsSpearman60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSwordsman60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSlinger60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsArcher60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMarksman60.png') + ") center center no-repeat; }");
			
			GM_addStyle("#tab1 .content table + table th { background:url(" + GM_getResourceURL('skinUnitsRam60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content table + table th + th { background:url(" + GM_getResourceURL('skinUnitsCatapult60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content table + table th + th + th { background:url(" + GM_getResourceURL('skinUnitsMortar60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content table + table th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsGyrocopter60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content table + table th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsBombardier60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content table + table th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsCook60.png') + ") center center no-repeat; }");
			GM_addStyle("#tab1 .content table + table th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMedic60.png') + ") center center no-repeat; }");
	
		
			GM_addStyle("\
				.contentBox01h  + .contentBox01h .content table th { background:none !important; }\
				.contentBox01h  + .contentBox01h .content table th + th { background:url(" + GM_getResourceURL('skinUnitsPhalanx60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table th + th + th { background:url(" + GM_getResourceURL('skinUnitsSteamgiant60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSpearman60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSwordsman60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSlinger60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsArcher60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table th + th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMarksman60.png') + ") center center no-repeat !important; }\
				\
				.contentBox01h  + .contentBox01h .content table + table th + th { background:url(" + GM_getResourceURL('skinUnitsRam60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table + table th + th + th { background:url(" + GM_getResourceURL('skinUnitsCatapult60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table + table th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMortar60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsGyrocopter60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsBombardier60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsCook60.png') + ") center center no-repeat !important; }\
				.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMedic60.png') + ") center center no-repeat !important; }\
			");
	
			GM_addStyle("#reportInboxLeft .content img { display:none; }");
			GM_addStyle("#reportInboxLeft .content { padding-top:85px; background:url(" + GM_getResourceURL('skinMiscDismissTroups') + ") center 0 no-repeat; }");
			
			GM_addStyle("#reportInboxLeft + div .content img { display:none; }");
			GM_addStyle("#reportInboxLeft + div .content { padding-top:95px; background:url(" + GM_getResourceURL('skinMiscBarracksView') + ") center 5px no-repeat; }");
					
		},
		'defendCity':function() { views.plunder(); },
		'militaryAdvisorDetailedReportView':function() {
			if(!$('#battlefield')[0].className.match(/sea_/)) {
				GM_addStyle('#events ul.unitlist li { background-image:url(' + GM_getResourceURL('skinUnitsSprites.gif') + ') !important; }');
				$('#battlefield div ul li div:first-child').each(function() {
					if(!this.className.match(/empty|hitpoints/))
						this.style.backgroundImage = 'url(' + GM_getResourceURL('skinUnitsSprites.gif') + ')';
				});
			}
		},
		'militaryAdvisorMilitaryMovements':function() {
				$('img[src*="y40_archer_faceright"]').attr('src', GM_getResourceURL('skinUnitsArcher40.png'));
				$('img[src*="y40_ram_faceright"]').attr('src', GM_getResourceURL('skinUnitsRam40.png'));
				$('img[src*="y40_mortar_faceright"]').attr('src', GM_getResourceURL('skinUnitsMortar40.png'));
				$('img[src*="y40_slinger_faceright"]').attr('src', GM_getResourceURL('skinUnitsSlinger40.png'));
				$('img[src*="y40_swordsman_faceright"]').attr('src', GM_getResourceURL('skinUnitsSwordsman40.png'));
				$('img[src*="y40_cook_faceright"]').attr('src', GM_getResourceURL('skinUnitsCook40.png'));
				$('img[src*="y40_phalanx_faceright"]').attr('src', GM_getResourceURL('skinUnitsPhalanx40.png'));
				$('img[src*="y40_catapult_faceright"]').attr('src', GM_getResourceURL('skinUnitsCatapult40.png'));
				
		},
		'militaryAdvisorReportView':function() {
				GM_addStyle('#militaryAdvisorReportView #troopsReport table.overview th div.army { background-image:url(' + GM_getResourceURL('skinUnitsButtons.gif') + '); }');
		},
		'occupy':function() { views.plunder(); },
		'plunder':function() {
			GM_addStyle("\
				.assignUnits li.archer { background-image:url(" + GM_getResourceURL('skinUnitsArcher40.png') + "); }\
				.assignUnits li.bombardier { background-image:url(" + GM_getResourceURL('skinUnitsBombardier40.png') + "); }\
				.assignUnits li.catapult { background-image:url(" + GM_getResourceURL('skinUnitsCatapult40.png') + "); }\
				.assignUnits li.cook { background-image:url(" + GM_getResourceURL('skinUnitsCook40.png') + "); }\
				.assignUnits li.gyrocopter { background-image:url(" + GM_getResourceURL('skinUnitsGyrocopter40.png') + "); }\
				.assignUnits li.marksman { background-image:url(" + GM_getResourceURL('skinUnitsMarksman40.png') + "); }\
				.assignUnits li.medic { background-image:url(" + GM_getResourceURL('skinUnitsMedic40.png') + "); }\
				.assignUnits li.mortar { background-image:url(" + GM_getResourceURL('skinUnitsMortar40.png') + "); }\
				.assignUnits li.phalanx { background-image:url(" + GM_getResourceURL('skinUnitsPhalanx40.png') + "); }\
				.assignUnits li.slinger { background-image:url(" + GM_getResourceURL('skinUnitsSlinger40.png') + "); }\
				.assignUnits li.spearman { background-image:url(" + GM_getResourceURL('skinUnitsSpearman40.png') + "); }\
				.assignUnits li.steamgiant { background-image:url(" + GM_getResourceURL('skinUnitsSteamgiant40.png') + "); }\
				.assignUnits li.swordsman { background-image:url(" + GM_getResourceURL('skinUnitsSwordsman40.png') + "); }\
			");
		},
		'port':function() {
				GM_addStyle('#port .buildingDescription { background-image:url(' + GM_getResourceURL('skinMiscPortView.png') + '); }');
		},
		'researchAdvisor':function() {
			GM_addStyle("\
				ul.researchTypes div.researchInfo div.leftBranch img { display:none; }\
				ul.researchTypes div.researchInfo div.leftBranch { padding-top:67px; width:151px; background-repeat:no-repeat; }\
				ul.researchTypes li:first-child div.researchInfo div.leftBranch { background-image:url(" + GM_getResourceURL('skinResearchSeafaring.jpg') + "); }\
				ul.researchTypes li:first-child + li div.researchInfo div.leftBranch { background-image:url(" + GM_getResourceURL('skinResearchEconomy.jpg') + "); }\
				ul.researchTypes li:first-child + li + li div.researchInfo div.leftBranch { background-image:url(" + GM_getResourceURL('skinResearchScience.jpg') + "); }\
				ul.researchTypes li:first-child + li + li + li div.researchInfo div.leftBranch { background-image:url(" + GM_getResourceURL('skinResearchMilitary.jpg') + "); }\
				#researchLibrary div.content { padding-top:85px; background:url(" + GM_getResourceURL('skinMiscLibrary.jpg') + ") no-repeat top center; } \
				#researchLibrary div.content img { display:none; }\
			");
		},
		'resource':function() {
			GM_addStyle("\
				#mainview #setWorkers .citizens { background-image:url(" + GM_getResourceURL('skinUnitCitizenRight120.png') + "); background-position:0; }\
				#resource #setWorkers .workers { background-image:url(" + GM_getResourceURL('skinUnitsWoodWorkerLeft120.png') + "); background-position:0; }\
			");
		},
		'shipyard':function() {
				GM_addStyle('#shipyard .buildingDescription { background-image:url(' + GM_getResourceURL('skinMiscShipyardView.png') + '); }');
		},
		'townHall':function() {
			$('div.content img[src*="y100_citizen_faceright"]').attr('src', GM_getResourceURL('skinUnitCitizenRight100.png'));
			$('div.content img[src*="40h/citizen_r.gif"]').attr('src', GM_getResourceURL('skinUnitCitizenRight40.png'));
			$('div.content img[src*="40h/woodworker_r.gif"]').attr('src', GM_getResourceURL('skinUnitsWoodWorker40.png'));
			$('div.content img[src*="40h/luxuryworker_r.gif"]').attr('src', GM_getResourceURL('skinUnitsTradeWorker40.png'));
			$('div.content img[src*="40h/scientist_r.gif"]').attr('src', GM_getResourceURL('skinUnitsScientist40.png'));
		},
		'tradegood':function() {
			GM_addStyle("\
				#mainview #setWorkers .citizens { background-image:url(" + GM_getResourceURL('skinUnitCitizenRight120.png') + "); background-position:0; }\
				#tradegood #setWorkers .workers { background-image:url(" + GM_getResourceURL('skinUnitsTradeWorkerLeft120.png') + "); background-position:0; }\
			");
		},
		'unitdescription':function() {
			GM_addStyle("\
				#unitdescription #unit.s303 { background:url(" + GM_getResourceURL('skinUnitsPhalanx120.png') + ") no-repeat 80px 80px;  }\
				#unitdescription #unit.s310 { background:url(" + GM_getResourceURL('skinUnitsCook120.png') + ") no-repeat 80px 80px;  }\
				#unitdescription #unit.s313 { background:url(" + GM_getResourceURL('skinUnitsArcher120.png') + ") no-repeat 80px 80px;  }\
				#unitdescription #unit.s315 { background:url(" + GM_getResourceURL('skinUnitsSpearman120.png') + ") no-repeat 80px 80px;  }\
				#unitdescription #unit.s307 { background-image:url(" + GM_getResourceURL('skinUnitsRamHelp.png') + ");  }\
				#unitdescription #unit.s301 { background-image:url(" + GM_getResourceURL('skinUnitsSlingerHelp.png') + ");  }\
				#unitdescription #unit.s305 { background-image:url(" + GM_getResourceURL('skinUnitsMortarHelp.png') + ");  }\
				#unitdescription #unit.s306 { background-image:url(" + GM_getResourceURL('skinUnitsCatapultHelp.png') + ");  }\
			");
		},
		'workshop':function() {
			GM_addStyle("td.object img { max-height:100px; }");
			$('div.content img[src*="y60_slinger_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsSlinger120.png'));
			$('div.content img[src*="y60_archer_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsArcher120.png'));
			$('div.content img[src*="y60_cook_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsCook120.png'));
			$('div.content img[src*="y60_marksman_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsMarksman120.png'));
			$('div.content img[src*="y60_medic_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsMedic120.png'));
			$('div.content img[src*="y60_spearman_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsSpearman120.png'));
			$('div.content img[src*="y60_swordsman_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsSwordsman120.png'));
			$('div.content img[src*="y60_steamgiant_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsSteamgiant120.png'));
			$('div.content img[src*="y60_phalanx_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsPhalanx120.png'));
			$('div.content img[src*="y60_ram_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsRam120.png'));
			$('div.content img[src*="y60_catapult_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsCatapult120.png'));
			$('div.content img[src*="y60_mortar_faceright.gif"]').attr('src', GM_getResourceURL('skinUnitsMortar120.png'));
		}
	}
	
	GM_addStyle("\
		#empireMilitaryOverview th.archer { background-image:url(" + GM_getResourceURL('skinUnitsArcher40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.bombardier { background-image:url(" + GM_getResourceURL('skinUnitsBombardier40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.catapult { background-image:url(" + GM_getResourceURL('skinUnitsCatapult40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.cook { background-image:url(" + GM_getResourceURL('skinUnitsCook40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.gyrocopter { background-image:url(" + GM_getResourceURL('skinUnitsGyrocopter40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.marksman { background-image:url(" + GM_getResourceURL('skinUnitsMarksman40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.medic { background-image:url(" + GM_getResourceURL('skinUnitsMedic40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.mortar { background-image:url(" + GM_getResourceURL('skinUnitsMortar40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.phalanx { background-image:url(" + GM_getResourceURL('skinUnitsPhalanx40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.slinger { background-image:url(" + GM_getResourceURL('skinUnitsSlinger40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.spearman { background-image:url(" + GM_getResourceURL('skinUnitsSpearman40.png') + ") !important; background-position:center 2px; }\
		#empireMilitaryOverview th.steamgiant { background-image:url(" + GM_getResourceURL('skinUnitsSteamgiant40.png') + ") !important; background-position:center 2px; }\
	");
			
	if(typeof(views[view]) == 'function') views[view]();
	
	style = document.createElement('style');
	style.type = 'text/css';
	document.getElementsByTagName('body')[0].appendChild(style);
	style.innerHTML += gmStyles + "\n";
	
}

Because it's your web

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
