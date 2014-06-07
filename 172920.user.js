// ==UserScript==
// @name       Online Soccer Manager Clean-up
// @version    1.3
// @description  Removes most of the premium content, ads, and more from Online Soccer Manager
// @match      *.onlinesoccermanager.nl/*
// @match      *.onlinesoccermanager.com/*
// @copyright  2013, Saulios
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js

// ==/UserScript==

// Premium features Clean-up
$("#divOrderTicketsNow").hide(); // Removes the Order Now link underneath the avatar
$(".divAddCampIconLeft").hide(); // Removes the extra premium training camps
$(".divFunds.last").hide(); // Removes the capital link on the left side of the page
$(".noAchievements.padding").hide(); // Removes the 'No Achievenments'-premiumlink on the profile page - history
$(document).load(function()
    {$('#divVideoPromo').remove();} // Video promo-ad
                );

// Menu Clean-up
var scoreboard_nl = $("li li:contains('Scorebord')");
scoreboard_nl.remove ();
var scoreboard_en = $("li li:contains('Scoreboard')");
scoreboard_en.remove ();
var seasonpass_nl = $("li li:contains('Seizoenskaarten')");
seasonpass_nl.remove ();
var seasonpass_en = $("li li:contains('Ticket')");
seasonpass_en.remove ();
var scout = $("li li:contains('Scout')");
scout.remove ();
var stadium_nl = $("li li:contains('Stadion')");
stadium_nl.remove ();
var stadium_en = $("li li:contains('Stadium')");
stadium_en.remove ();
var ranking_nl = $("li li:contains('Ranglijsten')");
ranking_nl.remove ();
var ranking_en = $("li li:contains('Ranking')");
ranking_en.remove ();

// Removes ads
$("#divBannerLead").hide(); // Removes the banner underneath the menu