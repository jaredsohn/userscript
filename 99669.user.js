// ==UserScript==
// @name           Ikariam Re-Order Transport View
// @namespace      Ikariam
// @author         MT0 (http://userscripts.org/users/68307)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description    On the Transport View: Reorders premium features to the bottom of the page and opens the pulldown summary.
// @require        http://code.jquery.com/jquery-1.5.1.min.js
// @include        http://s*.ikariam.com/index.php?view=transport*
// @exclude        http://support*.ikariam.com/*
// ==/UserScript==


$( "div.buildingDescription" ).css( "min-height", "60px" );

tg = $( "div#transportGoods" ).after( $( "div#setPremiumTransports" ).detach() );

$( "div.centerButton", (c = $( ">div.content", tg) ) )
	.after( $( "div#setPremiumJetPropulsion", c ).detach() )
	.after( $( "hr:eq(2)" ).detach() )
	.after( $( "div.transportersCapacity", c ).detach() )
	.after( $( "hr:eq(1)" ).detach() )
	.after( (ms = $( "div#missionSummary", c )).detach() )
	.after( $( "hr:eq(0)" ).detach() )

$(document).ready( function() {
	$( "div.summaryBox div.pulldown div.content", ms ).height( "auto" );
} );