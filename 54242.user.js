/*
 * AfriGIS Intranet Helper for Firefox
 * @version: 0.1.1
 * @author: Sarwar Erfan
 * @email: erfanonline@gmail.com
 * @copyright: Sarwar Erfan, All rights reserved
 * 
 * Whats New in 0.1.1
 * After login, user is now redirected to 196.35.231.10
 * So, "Navigation.asp" on this IP is added to the include list
 *
 * Background:
 * AfriGIS intranet is supposed to accessed by the employees regularly
 * to fillup timesheets. But, unfortunately, the aged web application
 * does not run on Firefox. Currently, the site is usable only by IE.
 * But, many employees use firefox as their primary browser.
 * Also, IE is not available on non Windows platforms (Mac, Linux)
 * where Firefox is available.
 * 
 * This little Greasemonkey script re-writes some JavaScript functions
 * of the intranet site and thus makes it usable on Firefox.
 *
 * ===============
 * To use this script, you need to have Greasemonkey addon on Firefox
 * You can get Greasemonkye from:
 * https://addons.mozilla.org/firefox/addon/748
 *
 *
 * Comments and suggestions are welcome
 * 
 */

// ==UserScript==
// @name           AfriGIS Intranet Helper for Firefox
// @namespace      http://userscripts.org/users/100630
// @description    Enables you to use AfriGIS intranet on firefox.
// @include        http://intranet.afrigis.co.za/Navigation.asp
// @include        http://196.35.231.10/Navigation.asp
// ==/UserScript==

	if(unsafeWindow.hideAll)
	{
		unsafeWindow.hideAll = 	function()
								{
									document.getElementById("AboutLayer").style.visibility = "hidden";
									document.getElementById("BulletinLayer").style.visibility = "hidden";
									document.getElementById("ClientsLayer").style.visibility = "hidden";
									document.getElementById("ProjectsLayer").style.visibility = "hidden";
									document.getElementById("HRLayer").style.visibility = "hidden";
									document.getElementById("ProductsLayer").style.visibility = "hidden";
									document.getElementById("ArchiveLayer").style.visibility = "hidden";
									document.getElementById("TimeSheetsLayer").style.visibility = "hidden";
									document.getElementById("AdminLayer").style.visibility = "hidden";
								}
	}
	
	if(unsafeWindow.hideLayer)
	{
		unsafeWindow.hideLayer = function(layerName)
								{
									document.getElementById(layerName).style.visibility = "hidden";
								}
	}
	
	if(unsafeWindow.showLayer)
	{
		unsafeWindow.showLayer = function(layerName)
								{
									document.getElementById(layerName).style.visibility = "visible";	
								}
			
	}
	
	if(unsafeWindow.showHideLayerSwitch)
	{
		unsafeWindow.showHideLayerSwitch = function(layerName)
											{
												if(document.getElementById(layerName).style.visibility == "visible")
												{
													unsafeWindow.hideLayer(layerName);	
												}
												else
												{
													unsafeWindow.showLayer(layerName);	
												}
											}
	}
