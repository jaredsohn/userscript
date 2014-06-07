// ==UserScript==
// @name			No pub    
// @description		No pub comme compte premium for clodogame
// @include			*clodogame*
// @include			*pennergame*
// @exclude			*profil/id:*
// @exclude 		*change_please*
// ==/UserScript==

/* Update proc */
var SCRIPT={SCRIPTED:"No pub",VERSION:"6.0",SCRIPT_URL:"http://userscripts.org/scripts/source/69943.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */

function removeElement(element){try{element.parentNode.removeChild(element)}catch(error){}}
function remove_ByTagName(TagNameis){try{var adds=document.getElementsByTagName(TagNameis);for(var i=0;i<adds.length;i++){removeElement(adds[i])}}catch(error){stack.push(error)}}
function remove_ById(ByIdis){try{removeElement(document.getElementById(ByIdis))}catch(error){stack.push(error)}}
function remove_ByClassName(ByClassNameis){try{removeElement(document.getElementsByClassName(ByClassNameis))}catch(error){stack.push(error)}}
init();window.addEventListener("load",init,false);

function init() {
	remove_ByClassName('listshop');
	remove_ByClassName('zcenter zbg-top day-cloud');
	// remove_ByClassName('');
	
	remove_ById('ad2gameslayer');
	remove_ById('google_ads_div_lb-city-supermarket');
	remove_ById('google_ads_div_lb-gang-forum');
	remove_ById('google_ads_div_lb-logout-center');
	remove_ById('google_ads_div_lb-logout-top');
	remove_ById('google_ads_div_lb-messages');
	remove_ById('google_ads_div_mr-activities');
	remove_ById('google_ads_div_mr-city');
	remove_ById('google_ads_div_mr-city-medicine');
	remove_ById('google_ads_div_mr-city-washhouse');
	remove_ById('google_ads_div_mr-fight-overview');
	remove_ById('google_ads_div_mr-gang');
	remove_ById('google_ads_div_mr-logout-left');
	remove_ById('google_ads_div_mr-logout-right');
	remove_ById('google_ads_div_mr-overview');
	remove_ById('google_ads_div_mr-stock');
	remove_ById('google_ads_div_mr-stock-bottle');
	remove_ById('google_ads_div_sky-city-district');
	remove_ById('google_ads_div_sky-city-games');
	remove_ById('google_ads_div_sky-city-home');
	remove_ById('google_ads_div_sky-city-pet_store');
	remove_ById('google_ads_div_sky-city-scrounge');
	remove_ById('google_ads_div_sky-city-stuff');
	remove_ById('google_ads_div_sky-city-weapon_store');
	remove_ById('google_ads_div_sky-friendlist');
	remove_ById('google_ads_div_sky-gang-credit');
	remove_ById('google_ads_div_sky-gang-fight');
	remove_ById('google_ads_div_sky-gang-fight-fightlog');
	remove_ById('google_ads_div_sky-gang-pact');
	remove_ById('google_ads_div_sky-gang-upgrades');
	remove_ById('google_ads_div_sky-profil-bande');
	remove_ById('google_ads_div_sky-skills');
	remove_ById('google_js_1');
	remove_ById('google_js_2');
	// remove_ById('');
	remove_ByTagName('iframe');
	remove_ByTagName('object');
	// remove_ByTagName('');
}
