// ==UserScript==
// @name           Facebook Ad Remover by LonDo Stupid Defacer
// @description    Facebook Ad Remover by LonDo Stupid Defacer
// @namespace	   http://userscripts.org/scripts/show/139261
// @version	   Trial
// @copyright	   @2012 LonDo Stupid Defacer
// @author	   LonDo Stupid Defacer
// @icon	   https://lh4.googleusercontent.com/-2A1Jpr4-1qM/TxPUbMq8IQI/AAAAAAAAAIU/_50N6LEgkxE/h120/FB.png
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// ==/UserScript==

//Parent Element To Ads
grandparent = document.getElementById('globalContainer'); 
var removeAdz = function(){
//Ads
document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
document.getElementById('pagelet_reminders').style.visibility = 'hidden'; 
document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden'; 
document.getElementById('rightCol').style.width = '0px'; 
document.getElementById('contentArea').style.width = '90%'; 
}
//Below function happens whenever the contents of 
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeAdz, true);
//fires off the function to start with
removeAdz();