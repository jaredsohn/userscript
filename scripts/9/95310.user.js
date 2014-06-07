// ==UserScript==
// @name   			Ikariam - City Deployment Aide
// @namespace 		http://ikariam.feanturi.com/cityDeploymentAid
// @description		In island view, shows to which cities you deployed units to
// @require     	http://userscripts.org/scripts/source/74204.user.js
// @resource icon 	http://www.feanturi.nl/ikariam/scripts/images/general.gif
// @include			http://s*.ikariam.com/index.php
// @include 		http://s*.ikariam.com/index.php?*view=island*
// ==/UserScript==

/*****************************************\
|**************   Notes   ****************|
\*****************************************

Ikariam - City Deployment Aide v 0.2.0

Description:
This script adds a small general icon in front of towns to which you have units deployed. Clicking on the icon will select that town, so you can then inspect military for example

Works on:
	> Island view - When viewing an island, it shows the time from your cities to that island

Requirements:
	None

Changelog:
	v 0.1.0		- Initial version
	v 0.2.0		- Reworked the code (with help from Martynius)

Special thanks to Martynius for helping rework the code	

\*******************************************/
var changeCity = $( "body#island>div#container>div#container2>div#cityNav>form#changeCityForm" );

$("html>body#island>div#container>div#container2>div#mainview>ul#cities>li.city").each( function() {
	var	cityId	= $( "a[id^=city_]", this).attr("id").split("_")[1],
		deploy	= $( "ul>li>select#citySelect>option.deployedCities[value="+cityId+"]", changeCity );

	if (deploy.length == 0) return;

	var span	= $( "a>span.textLabel>span.before", this );
	var img		= $( "img[id^=cityGarrison" + cityId + "]", span );
	if ( img.length == 0 ) {
		img = span
			.prepend( "<img src='" + GM_getResourceURL( "icon" ) + "' alt='deployed to' id='cityGarrison"+cityId+"' style='width: 15px; height: 15px; margin-top: 5px;' />")
			.children( "img#cityGarrison" + cityId );
	}
	
	img.click( function() {
		$(deploy).attr('selected','selected');//select();
		changeCity
			.attr( 'action', 'index.php?view=relatedCities&id=' + cityId )
			.each( function(){ this.submit(); } );
	} );
});
