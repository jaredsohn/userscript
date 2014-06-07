// ==UserScript==
//
//Displayable Name of your script 
// @name           Magento URL Key Optimizer
//
// brief description
// @description    Magento URL Key Optimizer   
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://joshuawarren.com/
//
// Your name, userscript userid link (optional)   
// @author         joshuawarren (http://userscripts.org/users/joshuawarren) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://joshuawarren.com/2013/04/13/magento-url-key-optimizer-userscript/
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        https://*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.0 first usable version
// @history        1.0b first beta version
//
// ==/UserScript==


$(function(){
	$("input#name").change(function() {
		// an input field called name has been changed
		// let's check to see if there's a field called url_key and if so, update it
		if($("input#url_key").length > 0) {
			// so the name has been changed, and we found a url_key field, so let's update it
			var productName = $("input#name").val();
			productName = $.trim(productName);
			productName = productName.replace(/\s+/g,"-");
			productName = productName.toLowerCase();
			$("input#url_key").val(productName);
			// fire the change event so that Magento enables the "Create Permanent Redirect for old URL" box
			$("input#url_key").change();
		}
	})

});