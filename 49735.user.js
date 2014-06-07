// ==UserScript==
// @name Facebook Alter
// @description Modify Facebook: widen pages, remove ads/spam on homepage, move pokes and events to top of homepage. Options are set to toggle on/off.
// @version 1.42
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==
// --------------------------------------------------------------------------
// VERSION HISTORY:
// 1.1  Added update script, made speed changes, fixed a couple of bugs
// 1.2  Added notifications in the title bar. This can be toggled and edited like other options in the code.
// 1.3  Added option to fix top blue Facebook bar. Toggle-able. Idea used from Phil's Facebook Fixer.
// 1.31 Fixed bug with blue FB bar.
// 1.4  Fixed due to changes of FB on 8/25/09, also added bday display.
// 1.41 Fixed Bug on main page.
// 1.42 Fixed bug on page width
// --------------------------------------------------------------------------

//Variable to change settings to your preferences
var TW = 1;		//Toggle Width. 			1=change,0=don't change
var TSB = 1;		//Toggle Sidebar Ads. 			1=change,0=don't change
var TSP = 1;		//Toggle Sponsored Ads.			1=change,0=don't change
var TCWF = 1;		//Toggle Connect With Friends. 		1=change,0=don't change
var TMP = 1;		//Toggle Menu Panel. 			1=change,0=don't change
var TN = 1;		//Toggle Notifications in title bar.	1=change,0=don't change
var TFTB = 1;		//Toggle Fixed Top Bar. 		1=change,0=don't change
//----------DO NOT EDIT BELOW HERE--------------------------------------



//Add menu commands to toggle features
GM_registerMenuCommand('Toggle Page Widening', toggleWidth);
GM_registerMenuCommand('Toggle Sidebar Ads', toggleSideAds);
GM_registerMenuCommand('Toggle Sponsored Ads', toggleSponsored);
GM_registerMenuCommand('Toggle Connect W/ Friends', toggleConnectWF);
GM_registerMenuCommand('Toggle Menu Panel', toggleMenuPanel);
GM_registerMenuCommand('Toggle Notifications', toggleNotify);
GM_registerMenuCommand('Toggle Fixed Top Bar', toggleFixedTopBar);

var script_title = 'Facebook Alter';
var source_location = 'http://userscripts.org/scripts/source/49735.user.js';
var version_holder = 'http://bmjones.nerdheroes.com/userscript/facebook_alter_version.txt';
var current_version = '1.42';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');
GM_registerMenuCommand('Update - ' + script_title, CheckVersion);
CheckForUpdate();

document.addEventListener("DOMNodeInserted", removeJunk, true);

if(TW==1){
	profStatusAdjust(720);
	profCommentAdjust(442,500,500,453,480,0.4);
}
if(TFTB==1) fb_menubar('fixed','auto',99);var oldurl = null;

function removeJunk (){	
	var cururl = document.location.href;
	
	if(cururl!=oldurl){
		window.setTimeout(sidebar,2000);
		window.setTimeout(prof_birthday,2000);
		oldurl=cururl;
	}
	if(TSB==1) removeSideAds('none');
	if(TSP==1) removeSponsorAds('none');
	if(TCWF==1) removeConnectWF('none');
	if(TMP==1) removeLeftMenuPanel('none');
	if(TW==1){
		widenHome(670,-15);
		widenProfile(720);
	} 
	if (TW==0) {
		if(TMP==0) widenHome(530,0);
		if(TMP==1) widenHome(530,130);
		widenProfile(540);
	}
	if(TN==1) notifications();
}

//remove ads on sidebar of pages
function removeSideAds(display) {	
	var ads=$('sidebar_ads');
	if (ads) ads.style.display = display;
}

//removes sponsored ad from home page
function removeSponsorAds(display) {
	if(document.title.match('Home')){	
		var spads=$('home_sponsor_nile');
		if (spads) spads.style.display = display;
	}
}

//widen home page
function widenHome(width, margin){	
	var home_stream=$('home_stream'); 
	if (home_stream) {
		home_stream.style.width = width + 'px';
		if(TMP==0) margin=0;
		home_stream.style.marginLeft = margin + 'px';
		home_stream.style.cssFloat = 'right';
	}
}

//widen profile pages
function widenProfile(width){  
	var rightCont=$('right_column');
	if (rightCont) {
		rightCont.style.width = width + 'px';
		rightCont.style.cssFloat = 'left';
		rightCont.style.marginLeft = '20px';
	}
}

//remove left menu bar on home page with networks, photos, links, etc
function removeLeftMenuPanel(display){	
	if(document.title.match('Home')){
		var hfl=$('home_filter_list');
		if (hfl) hfl.style.display = display;
	}
}

//widen current status on profile
function profStatusAdjust(width) {	
	var ptbc=$c('profile_name_and_status');
	var head, style;
	if (ptbc){
		head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.profile .profile_top_bar_container {width: ' + width + 'px;}'; 
		head.appendChild(style);
	} 
}

//widen comment boxes on home page, profile, etc
function profCommentAdjust(w1,w2,w3,w4,w5,w6) {	 
	var head, style;
	head = document.getElementsByTagName('head')[0];
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.commentable_item .comment_box .comments_add_box textarea { width:' + w1 + 'px;}' 	/* 298/442 */
					  + '.commentable_item .comment_box {width:' + w2 + 'px;}' 	/* 382/500 */
					  + '.commentable_item .ufi_section { width:' + w3 + 'px;}'	/* 350/500 */
					  + '.commentable_item .comment_box .comment_content { width:' + w4 + 'px;}'	/* 311/453 */
					  + '.hidden_add_button .comment_box .comments_add_box .one_row_add_box textarea { width:' + w5 + 'px;}' /* 340/480 */
					  + '.commentable_item .comment_box .comment_actual_text { padding-right:' + w6 + 'em;}'; /* 0/0.4 */
	head.appendChild(style);
}

//reorganize right side of homepage, events/pokes/requests on top instead of bottom
function sidebar() {
	if(document.title.match('Home')){	
		var right=$('home_sidebar');
		var events=$c('UIUpcoming')[0];
		var pokes=$c('pokes')[0];
		var requests=$c('UIRequestsBox')[0];
		if(right) {
			if(requests) right.insertBefore(requests.parentNode.parentNode, right.firstChild);
			if(pokes) right.insertBefore(pokes, right.firstChild);
			if(events) right.insertBefore(events.parentNode.parentNode, right.firstChild);
		}
	}
}

//remove connect with friends on right of homepage
function removeConnectWF(display) {
	if(document.title.match('Home')){	
		var cwf=$c('hp_connect_box UIHomeBox UITitledBox')[0];
		if(cwf) cwf.style.display = display; 	
	}
}
function notifications (){
	var nCount = $('presence_notifications_count');
	var currentTitle = document.title;
	
	if(nCount && nCount.firstChild){
		currentTitle = currentTitle.replace(/1|2|3|4|5|6|7|8|9|0|\(|\)/g,"");
		document.title='('+ $('presence_notifications_count').firstChild.innerHTML + ')'+ currentTitle;
	}
	else if(nCount && nCount.innerHTML=="" && currentTitle.indexOf('(')!=-1){
		currentTitle = currentTitle.replace(/1|2|3|4|5|6|7|8|9|0|\(|\)/g,"");
		document.title=currentTitle;	
	}
}

function fb_menubar(position){
	var content = $('content');
	var menubarcont = $('menubar_container');
	var welcomepg = $c('WelcomePage_MainSellContainer');
	if(content) content.style.paddingTop='34px';
	if(menubarcont) {
		menubarcont.style.width='100%';
		menubarcont.style.position=position;
	}
	if(welcomepg[0]){
		if(welcomepg[0].innerHTML.match('Facebook helps you connect and share with the people in your life.')){
			if(content) {content.style.padding='0';}
			var head, style;
			head = document.getElementsByTagName('head')[0];
			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = '.WelcomePage_MainSellContainer{padding-top:82px;}';
			head.appendChild(style);
		}
	}
}
//get element by ID
function $(element) { return document.getElementById(element); }
//get element by class name
function $c(element) { return document.getElementsByClassName(element); }
//xpath
function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
//Toggle page width
function toggleWidth (){
	if(TW==1) {
		TW=0;
		if(TMP==0) widenHome(530,0);
		if(TMP==1) widenHome(530,130);
		widenProfile(540);
		profStatusAdjust(540);
		profCommentAdjust(298,382,350,311,340,0);
	}
	else if(TW==0) {
		TW=1;
		widenHome(670,-15);
		widenProfile(720);
		profStatusAdjust(720);
		profCommentAdjust(442,500,500,453,480,0.4);
	}
}
//toggle sidebar ads
function toggleSideAds (){
	if(TSB==1) {
		TSB=0;
		removeSideAds('block');
	}
	else if(TSB==0) {
		TSB=1;
		removeSideAds('none');
	}
}
//toggle sponsored ads
function toggleSponsored (){
	if(TSP==1) {
		TSP=0;
		removeSponsorAds('block');
	}
	else if(TSP==0) {
		TSP=1;
		removeSponsorAds('none');
	}
}
//toggle connect with friends
function toggleConnectWF (){
	if(TCWF==1) {
		TCWF=0;
		removeConnectWF('block');
	}	
	else if (TCWF==0) {
		TCWF=1;
		removeConnectWF('none');
	}
}	
//toggle left menu panel
function toggleMenuPanel (){
	if(TW==0) widenHome(530,0);
	if(TMP==1) {
		TMP=0;
		removeLeftMenuPanel('block');
	}	
	else if(TMP==0) {
		TMP=1;
		removeLeftMenuPanel('none');
	}
}
//toggle notifications
function toggleNotify (){
	
	if(TN==1) {
		TN=0;
		var currentTitle = document.title;
		currentTitle = currentTitle.replace(/1|2|3|4|5|6|7|8|9|0|\(|\)/g,"");
		document.title=currentTitle;		
	}
	else if(TN==0) {
		TN=1;
	}
}
// toggle blue bar
function toggleFixedTopBar(){
	if(TFTB==1){
		TFTB=0;
		fb_menubar('absolute');
	}
	else if(TFTB==0){
		TFTB=1;
		fb_menubar('fixed');
	}
}
function prof_birthday(){
	var curDate = new Date();
	var birDatemsecs;
	if(document.getElementsByClassName('birthday')[0]) {//find birthday on page
		var birthday = document.getElementsByClassName('birthday')[0].getElementsByTagName('dd')[0];		
		if(birthday.innerHTML.indexOf('(')==-1 && !birthday.getElementsByTagName('dd')[0]){
			birDatemsecs = Date.parse(birthday.innerHTML);
			var birDate = new Date(birDatemsecs);
			if(birDate.getFullYear()){
				var age = curDate.getFullYear()-birDate.getFullYear();
				if(curDate.getMonth()<birDate.getMonth()) age-=1;
				else if(curDate.getMonth()==birDate.getMonth() && curDate.getDate()<birDate.getDate()) age-=1;
				birthday = document.getElementsByClassName('birthday')[0].getElementsByTagName('dd')[0];
				var sign = getSign(birDate);
				birthday.innerHTML+=' ('+age+')'+'<dd>'+sign+'</dd>';
			}
			else {
				birDatemsecs = Date.parse(birthday.innerHTML+' 2000');
				birDate = new Date(birDatemsecs);
				var sign = getSign(birDate);
				birthday.innerHTML+='<dd>'+sign+'</dd>';
			}
		}
	}
}
function getSign(bday){
	var signs = new Array("Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius");
	var signdates = new Array(19,18,20,19,20,21,22,22,22,22,21,21);
	var sign = bday.getMonth();
	if(bday.getDate()>signdates[bday.getMonth()]) sign=(sign+1)%12;
	return signs[sign];
}
// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 18 2008 by Nathan Blume----------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

