// Based on a script by Zeb @ http://userscripts.org/users/30028
// Reworked by Christopher @ http://userscripts.org/users/38096
// 
// Because I wanted a way to more easily bag countries on Kiva.org
// Edit the list below and add your list of countries
// Check out Kiva.org or kivafriends.org
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kiva Country Highlighter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kiva Country Highlighter
// @namespace      http://www.kiva.org
// @include        http://*.kiva.org/*
// @description    Highlights a predefined list of countries on Kiva.org
// ==/UserScript==
//
// --------------------------------------------------------------------

// Change the "countrycount" variable to reflect the exact number of 
// countries in your list:

var countrycount = 43

var country = new Array(countrycount)
var fontcolor = new Array(countrycount)
var background = new Array(countrycount)

// Edit the list of country/color combinations below. Words are not case
// sensitive. Colors can be either standard labels (red, green, etc.)
// or HEX values (#FF000, #0000FF, etc.) If adding words that might
// also be HTML tags (script, table, etc.), put a space before them:
// If you don't want a country highlighted just remove the word red or yellow
// leave the quotation marks intact.

country[0] = "Country"
fontcolor[0] = "red"
background[0] = "yellow"

country[1] = "Afghanistan"
fontcolor[1] = "red"
background[1] = "yellow"

country[2] = "Azerbaijan"
fontcolor[2] = "red"
background[2] = "yellow"

country[3] = "Bangladesh"
fontcolor[3] = "red"
background[3] = "yellow"

country[4] = "Bolivia"
fontcolor[4] = "red"
background[4] = "yellow"

country[5] = "Bulgaria"
fontcolor[5] = "red"
background[5] = "yellow"

country[6] = "Bosnia and Herzegovina"
fontcolor[6] = "red"
background[6] = "yellow"

country[7] = "Cambodia"
fontcolor[7] = "red"
background[7] = "yellow"

country[8] = "Cameroon"
fontcolor[8] = "red"
background[8] = "yellow"

country[9] = "Chad"
fontcolor[9] = "red"
background[9] = "yellow"

country[10] = "Cote D'Ivoire"
fontcolor[10] = "red"
background[10] = "yellow"

country[11] = "The Democratic Republic of the Congo"
fontcolor[11] = "red"
background[11] = "yellow"

country[12] = "Dominican Republic"
fontcolor[12] = "red"
background[12] = "yellow"

country[13] = "Ecuador"
fontcolor[13] = "red"
background[13] = "yellow"

country[14] = "El Salvador"
fontcolor[14] = "red"
background[14] = "yellow"

country[15] = "Gaza"
fontcolor[15] = "red"
background[15] = "yellow"

country[16] = "Ghana"
fontcolor[16] = "red"
background[16] = "yellow"

country[17] = "Guatemala"
fontcolor[17] = "red"
background[17] = "yellow"

country[18] = "Haiti"
fontcolor[18] = "red"
background[18] = "yellow"

country[19] = "Honduras"
fontcolor[19] = "red"
background[19] = "yellow"

country[20] = "India"
fontcolor[20] = "red"
background[20] = "yellow"

country[21] = "Indonesia"
fontcolor[21] = "red"
background[21] = "yellow"

country[22] = "Iraq"
fontcolor[22] = "red"
background[22] = "yellow"

country[23] = "Kenya"
fontcolor[23] = "red"
background[23] = "yellow"

country[24] = "Lebanon"
fontcolor[24] = "red"
background[24] = "yellow"

country[25] = "Mexico"
fontcolor[25] = "red"
background[25] = "yellow"

country[26] = "Moldova"
fontcolor[26] = "red"
background[26] = "yellow"

country[27] = "Mozambique"
fontcolor[27] = "red"
background[27] = "yellow"

country[28] = "Nepal"
fontcolor[28] = "red"
background[28] = "yellow"

country[29] = "Nicaragua"
fontcolor[29] = "red"
background[29] = "yellow"

country[30] = "Nigeria"
fontcolor[30] = "red"
background[30] = "yellow"

country[31] = "Pakistan"
fontcolor[31] = "red"
background[31] = "yellow"

country[32] = "Paraguay"
fontcolor[32] = "red"
background[32] = "yellow"

country[33] = "Peru"
fontcolor[33] = "red"
background[33] = "yellow"

country[34] = "Samoa"
fontcolor[34] = "red"
background[34] = "yellow"

country[35] = "Senegal"
fontcolor[35] = "red"
background[35] = "yellow"

country[36] = "Sierra Leone"
fontcolor[36] = "red"
background[36] = "yellow"

country[37] = "Tajikistan"
fontcolor[37] = "red"
background[37] = "yellow"

country[38] = "Tanzania"
fontcolor[38] = "red"
background[38] = "yellow"

country[39] = "Togo"
fontcolor[39] = "red"
background[39] = "yellow"

country[40] = "Uganda"
fontcolor[40] = "red"
background[40] = "yellow"

country[41] = "Ukraine"
fontcolor[41] = "red"
background[41] = "yellow"

country[42] = "Viet Nam"
fontcolor[42] = "red"
background[42] = "yellow"

// The code below does the actual highlighting:

var body = document.body.innerHTML
var i = 0

for (i = 0; i < (country.length); i++) {

	var w = new RegExp( country[i], "gi" )
//	var body = body.replace(w, "<font color='" + color[i] +"'>"+ country[i] + "</font>")
	var body = body.replace(w, "<span style='color:" + fontcolor[i] + "; background:" + background[i] + ";'>" + country[i] + "</span>")

}

document.body.innerHTML = body


