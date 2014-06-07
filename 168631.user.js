// ==UserScript==
// @name       FaceBookNC
// @namespace  http://twitter.com/iphone4life4
// @version    0.1
// @description	Hide the sidebar on the left. The one under your profile pic.
// @require	https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @require http://code.jquery.com/jquery-2.0.0.min.js
// @match      https://*.facebook.com/*
// @copyright  2013+, Manvir Singh
// @icon       https://dl.dropboxusercontent.com/u/19835281/icon.png
// ==/UserScript==
/********************************************************************************************************************
A note to developers: Use namespaces and DO NOT plot the global scope. =)
 
 What is namespacing?

In many programming languages, namespacing is a technique employed to avoid collisions with other objects or variables in the global namespace. 
They're also extremely useful for helping organize blocks of functionality in your application into easily manageable groups that can be uniquely identified.
 
**********************************************************************************************************************/
var iphone4life4={main:function(b){b.append('<br><a data-hover="tooltip" aria-label="Hide Left Sidebar" data-tooltip-alignh="left" class="toggle button" href="#" " role="button" id="js_1">Hide</a>').click(function(){var a=$("div#pagelet_navigation");a.is(":hidden")?a.slideDown():a.slideUp()})}};waitForKeyElements("div#pagelet_welcome_box",iphone4life4.main);