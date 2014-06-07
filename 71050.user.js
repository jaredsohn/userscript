// ==UserScript==
// @name           DominionNavBar
// @namespace      http://userscripts.org/users/64075
// @description    Displays the nav bar even when opening in a new tab.
// @include        http://www.kamikazegames.com/dominion/status.asp?z=*
// @include        http://www.kamikazegames.com/dominion/advisors.asp?Advisor=Prod&z=*
// @include        http://www.kamikazegames.com/dominion/bonuses.htm?z=*
// @include        http://www.kamikazegames.com/dominion/explore.asp?z=*
// @include        http://www.kamikazegames.com/dominion/build.asp?z=*
// @include        http://www.kamikazegames.com/dominion/rezone.asp?z=*
// @include        http://www.kamikazegames.com/dominion/improve.asp?z=*
// @include        http://www.kamikazegames.com/dominion/bank.asp?z=*
// @include        http://www.kamikazegames.com/dominion/military.asp?z=*
// @include        http://www.kamikazegames.com/dominion/invade.asp?z=*
// @include        http://www.kamikazegames.com/dominion/magic.asp?z=*
// @include        http://www.kamikazegames.com/dominion/espionage.asp?z=*
// @include        http://www.kamikazegames.com/dominion/communication.asp?z=*
// @include        http://www.kamikazegames.com/dominion/messageboard.asp?z=*
// @include        http://www.kamikazegames.com/dominion/opcentersummary.asp?z=*
// @include        http://www.kamikazegames.com/dominion/polls.asp?z=*
// @include        http://www.kamikazegames.com/dominion/diplomacy.asp?z=*
// @include        http://www.kamikazegames.com/dominion/therealm.asp?z=*
// @include        http://www.kamikazegames.com/dominion/rankings.htm?z=*
// @include        http://www.kamikazegames.com/dominion/news.asp?z=*

// ==/UserScript==


if(window.name != 'DominionMain'){
var pageName = document.location.href;
pageName = pageName.slice(pageName.lastIndexOf('/')+1);
pageName += ';First=0&amp';
var newBody = '<FRAMESET FRAMEBORDER=YES BORDER="0" FRAMESPACING="0" COLS="150, *">' +
	      '<frame name="nav" noresize="noresize" src="navbar.asp?z=0&amp;NA=0" scrolling="AUTO">' +
	      '<frame name="DominionMain" noresize="noresize" src="' +
	      pageName +
	      '" scrolling="AUTO">' +
	      '</FRAMESET>';

window.addEventListener(
    'load', 
    function() { document.write(newBody); },
    true);
}