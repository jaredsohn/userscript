// ==UserScript==
// @name        TU Delft WebLab Full size
// @author		Roald van der Heijden
// @namespace   http://nonamespace.com/
// @description Script is meant to get a more user friendly view on widescreen monitors for Weblab pages from the TU Delft
// @include     http://department.st.ewi.tudelft.nl/weblab/submission/*
// @released    2013-06-28
// @version     0.2
// @grant		none
// @updated     2013-06-28
// ==/UserScript==

$(document).ready(function() {
   $("div#maincontainer.container").width("90%");					// top container
   $("div.span4").width("25%");										// container for assignment text
   $("div.span8").width("70%");										// container for solution+test tabs
   $("div.aceEditor").width("100%");								// solution + test tab
});