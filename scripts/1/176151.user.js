// ==UserScript==
// @name			w3schools Google Image Remover
// @author			Manivannan
// @namespace		w3schoolsRemover
// @include			http://*.w3schools.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2013-08-01
// @lastupdated		2013-08-01
// @description		This userscripts removes most of the ads from w3schools.com.
// @grant           none
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
   $("#google_image_div").css("display", "none");
   $(".wideSkyscraper").css("display", "none");
   $("#div-gpt-ad-1362650798669-0_ad_container").css("display", "none");
   $("#div-gpt-ad-1343810007679-1_ad_container").css("display", "none");
   $("#adunit").css("display", "none");
   $("#mainLeaderboard,#rightshare").css("display", "none");
   $(".topLeftRectangle").css("display", "none");
});

