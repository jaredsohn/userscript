// ==UserScript==
// @name           Castle Age - QuickLink
// @description    List my frequently used link
// @copyright      2010,  Suzin Weng
// @license        GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http*://apps.*facebook.com/castle_age/*
// @namespace      Castle Age
// @version        1.0.14
// ==/UserScript==


function createManagementBox() {
	var theBox = document.createElement('div');
	theBox.setAttribute('id', 'EGM_Container');
	theBox.setAttribute('style', 'clear: both; text-align: center; -moz-user-select:none; border-width: 2px; border-style: solid; margin-bottom: 5px;');
	
	var theTitle = document.createElement('div');
	theTitle.setAttribute('id', 'EGM_Title');
	theTitle.setAttribute('style', 'background-color: #8080FF; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
	theTitle.innerHTML = '<a href="http://userscripts.org/scripts/show/82871">Quick Link</a>';
	theBox.appendChild(theTitle);

    
    
    var theHero = document.createElement('div');
	theHero.setAttribute('id', 'EGM_HeroSection');
	theHero.setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
    theHero.innerHTML = 'Hero(Status)<br>';
    theHero.innerHTML += '<a href="http://apps.facebook.com/castle_age/generals.php?item=353&itype=1">Minerva(stamina)</a>';
    theHero.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=22&itype=0">Vanquish(attack)</a>';
    theHero.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=30&itype=0">Dante(defend)</a>';
    theHero.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=489&itype=1">Godric(energy)</a>';
    theHero.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=481&itype=1">Elin(attack)</a>';
    theHero.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=526&itype=1">Solara(stamina)</a>';
    
	theBox.appendChild(theHero);


    var theHero2 = document.createElement('div');
	theHero2.setAttribute('id', 'EGM_Hero2Section');
	theHero2.setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
    theHero2.innerHTML = 'Hero(Special)<br>';
    theHero2.innerHTML += '<a href="http://apps.facebook.com/castle_age/generals.php?item=16&itype=0">Aeris(fee)</a>';
    theHero2.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=26&itype=0">Mercedes(income)</a>';
    theHero2.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=17&itype=0">Sano(quest)</a>';
    theHero2.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=473&itype=1">Adriana(war)</a>';
    theHero2.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=268&itype=1">Chase(army)</a>';
    theHero2.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=563&itype=1">Zin(cd)</a>';

    
	theBox.appendChild(theHero2);

    var theHero3 = document.createElement('div');
	theHero3.setAttribute('id', 'EGM_Hero3Section');
	theHero3.setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
    theHero3.innerHTML = 'Hero(Guild)<br>';
    theHero3.innerHTML += '<a href="http://apps.facebook.com/castle_age/generals.php?item=635&itype=1">Deshara(rogue)</a>';
    theHero3.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=624&itype=1">Sanna(cleric)</a>';
    theHero3.innerHTML += '| <a href="http://apps.facebook.com/castle_age/generals.php?item=728&itype=1">Daphne(reflect)</a>';
    
	theBox.appendChild(theHero3);

   	var theUpgrade = document.createElement('div');
	theUpgrade.setAttribute('id', 'EGM_UpgradeSection');
	theUpgrade.setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
	theUpgrade.innerHTML = 'Upgrade<br>';
    theUpgrade.innerHTML += '<a href="http://apps.facebook.com/castle_age/keep.php?upgrade=energy_max">energy</a>';
    theUpgrade.innerHTML += '| <a href="http://apps.facebook.com/castle_age/keep.php?upgrade=stamina_max">stamina</a>';
    theUpgrade.innerHTML += '| <a href="http://apps.facebook.com/castle_age/keep.php?upgrade=attack">attack</a>';
    theUpgrade.innerHTML += '| <a href="http://apps.facebook.com/castle_age/keep.php?upgrade=defense">defend</a>';
    theUpgrade.innerHTML += '| <a href="http://apps.facebook.com/castle_age/keep.php?upgrade=health_max">health</a>';
	theBox.appendChild(theUpgrade);

   	var theDemi = document.createElement('div');
	theDemi.setAttribute('id', 'EGM_DemiSection');
	theDemi.setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
	theDemi.innerHTML = 'Demi<br>';
    theDemi.innerHTML += '<a href="http://apps.facebook.com/castle_age/symbols.php?symbol=1&action=tribute">Ambrosia(energy)</a>';
    theDemi.innerHTML += '| <a href="http://apps.facebook.com/castle_age/symbols.php?symbol=2&action=tribute">Malekus(attack)</a>';
    theDemi.innerHTML += '| <a href="http://apps.facebook.com/castle_age/symbols.php?symbol=3&action=tribute">Corvintheus(defense)</a>';
    theDemi.innerHTML += '| <a href="http://apps.facebook.com/castle_age/symbols.php?symbol=4&action=tribute">Aurora(health)</a>';
    theDemi.innerHTML += '| <a href="http://apps.facebook.com/castle_age/symbols.php?symbol=5&action=tribute">Azeron(stamina)</a>';
	theBox.appendChild(theDemi);    
    
   	var thePage = document.createElement('div');
	thePage.setAttribute('id', 'EGM_PageSection');
	thePage.setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
	thePage.innerHTML = 'Page<br>';
    thePage.innerHTML += '<a href="http://apps.facebook.com/castle_age/raid.php">Raid</a>';
    thePage.innerHTML += '| <a href="http://apps.facebook.com/castle_age/arena.php">Arena</a>';
    thePage.innerHTML += '| <a href="http://apps.facebook.com/castle_age/land.php">Land</a>';
    thePage.innerHTML += '| <a href="http://apps.facebook.com/castle_age/achievements.php">Achivement</a>';
    thePage.innerHTML += '| <a href="http://apps.facebook.com/castle_age/alchemy.php?show_tab=1">Alchemy</a>';
    thePage.innerHTML += '| <a href="http://apps.facebook.com/castle_age/war_council.php">War Council</a>';
    thePage.innerHTML += '| <a href="http://apps.facebook.com/castle_age/goblin_emp.php">Goblin Emp</a>';

	theBox.appendChild(thePage);
    

   	var theGuild = document.createElement('div');
	theGuild .setAttribute('id', 'EGM_GuildSection');
	theGuild .setAttribute('style', 'padding-left: 3px; padding-right: 3px; border-bottom-style: solid;');
	theGuild .innerHTML = 'Guild<br>';
    theGuild .innerHTML += '<a href="http://apps.facebook.com/castle_age/guild_current_battles.php">Battle</a>';
    theGuild .innerHTML += '| <a href="http://apps.facebook.com/castle_age/guild_current_monster_battles.php">Monster</a>';
    theGuild .innerHTML += '| <a href="http://apps.facebook.com/castle_age/festival_battle_home.php">Festival</a>';
    theGuild .innerHTML += '| <a href="http://apps.facebook.com/castle_age/festival_challenge.php">Feats</a>';


	theBox.appendChild(theGuild );

	var theAds = document.getElementById('netego_organic');
	
	if ( theAds != null )
	{
		theAds.appendChild(theBox);
	}
};



window.addEventListener("load", function(e) {
	createManagementBox()();
},false);
