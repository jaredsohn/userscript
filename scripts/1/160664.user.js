// ==UserScript==
// @name       Hide offline friends on Facebook 
// @version    1.4.8
// @description  Hides the offline friends from Facebook chat
// @include     http://www.facebook.com/
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/
// @include     https://www.facebook.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @homepage	  http://userscripts.org/scripts/show/160664
// @downloadURL	  http://userscripts.org/scripts/source/160664.user.js
// @copyright  2012+, Narender
// @author Narender
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
$(document).ready(function($) {
setInterval(
function(){
setTimeout(
  function(){
	main($);
  }, 3000);
}, 2000
);
});

function main($){
console.log("checking offline friends");
if($('li._42fz')){

	$('li._42fz').each(function(i, obj){
		if($(obj).find('div[class="_5t35"]').html() == "Web" || $(obj).find('div[class="_5t35"]').html() == "Mobile"){
		    //console.log("Status: "+$(obj).find('img[alt="Online"]').attr('alt'));
		    $(obj).show();
		}
		else{
		    //console.log("Status: "+$(obj).find('img[alt="Online"]').attr('alt'));
		    $(obj).hide();
		}
	});

}
}

