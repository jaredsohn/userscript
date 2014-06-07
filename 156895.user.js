// ==UserScript==
// @name       Confluence Full breadcrumb   
// @namespace  http://wikiwiki/
// @version    0.1
// @description  Displays the full breadcrumb in Confluence wiki by Atlassian
// @match      http://wikiwiki/*
// @copyright  2012+, Karel Mellen
// @graant	   none	
// ==/UserScript==


var $ = unsafeWindow.jQuery;

$("#breadcrumbs .hidden-crumb").removeClass("hidden-crumb");
$("#ellipsis").addClass("hidden-crumb");