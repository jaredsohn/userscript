// ==UserScript==
// @name           cam4
// @version 4.5
// @namespace      cam4_goes_droopy
// @description    cam4 cleanup
// @include        http://*.cam4.tld/*
// @grant       GM_xmlhttpRequest
// @run-at         document-start
// ==/UserScript==

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// v2.0 - New set-up, better removal of advertisements and tracking and some new functions.
//        It may look as if I'm removing more then absolutely necessary but add's may change at time and by country.
//        With this it may work for a while and in all countries.
//        2 new functions can be found as 2 new tabs
//        -"Float this web cam" will open the web cam in a new small window.
//        -"Show user list" (only there if your logged in) will create a list of all users in the chat with a link and ignore function.
//          The user list will update every 10 seconds.
//        Other functions:
//        -Grey-out live online users with a fake (not a live web cam snapshot) profile picture.
//        -If you select the English language it will not fall-back to your native language (not fail save, it will still try to use your 
//         member settings when logged-in).
//        -If you select an other language it will stay on the same (profile) page.
//        -Enables the search function on the search page.
//        -It skips the age confirm page , you must be 18+ to use this script !
//        Notes:
//        The script is made for free members (or not a member) and i don't know what will happen if your a gold member or a broadcaster.
//        If your float the web cam the tipping area remains active and i think it will also work but i'm not sure.
//        If the broadcaster closes the web cam the user list will stay or may even grow. That's not a script bug.
// V2.1 - some minor improvements and bug fixes
// v2.2 - fixed a change on the search function
//        If a broadcaster got a snapshot archive then you can browse it in the same window, if you click the big picture then it will
//        open in a new window in real size.
// v2.3 - adjusted for new site layout , no more search function , no more changes on the snapshot's, auto update
// v2.4 - fixed an error on the skip age confirm when using a proxy, no more forcing the site to be english coz it gave an error on their 
//        translate module 
// V2.5 - a few changes for new flash module , new - full screen option. 
// v2.6 - bug fix , full screen now also for non-tip rooms
// v2.7 - ID change fixed, some clean-up fixes
// v2.8 - lay-out fix for non-english users - chat wall visible
// v2.9 - Resize-alble floating window, to enable it resize the window, left click on the blank area, select "show all" in the flash settings
//        You must do the same when your in the full screen mode, it may not always return correctly if you leave full screen  
//        Number of votes visible in the star rating. Send private mail directly from the cam page. tip leader option still visible	
// v3.0 - Fix for local tld's like .nl/.be etc.  cam4 now auto-redirects .com to your local tld
// v3.1 - Fix for new layout
// v3.2 - should now be fully functional with chrome and tampermonkey , fixed a small update bug
// V3.3 - fix for Firefox 23 - no more userlist, cam pane moved, hi-light 2 countries, fake pictures have a dotted border
// V3.4 - fix for new social bar
// V3.5 - remove more add's - fix for full screen
// V3.6 - chat wall visible on the chat-wall page, not on the main page, some minor improvements
// V3.7 - fix a hang-up on the user rating
// V3.8 - fix for send email on cam page
// V3.9 - fix for floating webcam security error , floating cam can not be resized and some minor improvements
// V4.0 - scipped
// V4.1 - direct link to friends and favorites edit page where you can see who's online
// V4.2 - fix for full screen icon
// V4.3 - fix for new layout - no more country colors 
// V4.4 - fix for firefox 29
// v4.5 - fixed a bug on the old layout
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function do_script() {

	version = "4.5";
	createCookie("dirPageCount","98",1);
	eraseCookie("userWasLoggedIn");
	createCookie("finished_survey","1",1);

//new action cookie without earasing unknown types
	add=readCookie("bannerPops");
	newadd = "surveyMonkey[=]under[=]exit"
	if (add){
		addparts=unescape(add).split("[=]")
			for (i=0;i<addparts.length;i++){
			if ((addparts[i] != "surveyMonkey")&&(addparts[i] != "under")&&(addparts[i] != "exit")) 
				{newadd=addparts[i]+"[=]"+newadd}
		}	}
	createCookie("bannerPops",escape(newadd),1);

	if (readCookie("floatcam")){
		eraseCookie("floatcam");
		player=document.getElementById("Cam4VChat").cloneNode(true);
		document.getElementsByTagName("body")[0].innerHTML="";
		document.getElementsByTagName("head")[0].innerHTML="";
		document.title="Webcam";
		document.getElementsByTagName("body")[0].style.margin="0px 0px 0px 0px";
		document.getElementsByTagName("body")[0].appendChild(player);
	}

// check for updates once per session
	if (!readCookie("updatecheck")){update()}

// remove add's that may or may not be there
	banner=document.getElementById("loading_ads");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("subfoot");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("submenuBanner");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("profile-ad");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("announceHome");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("adSpace");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("right-content");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("homePageIntro");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("tippingJarDiv");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("giftShelfWrap");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("disclaimerLogos");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("footerSocialIcons");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("profile-wishlist");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("besideBroadcastingContainer");
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById("seoFootTxt");
	if (banner){banner.parentNode.removeChild(banner)}

	banner = document.getElementsByClassName('xmlAdsTitle')[0];
	if (banner){banner.parentNode.removeChild(banner)}

	banner = document.getElementsByClassName('xmlAdsWrapper')[0];
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementsByClassName('supershowBanner')[0];
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementById('privateshowBanner');
	if (banner){banner.parentNode.removeChild(banner)}

	banner=document.getElementsByClassName('profileDisclaimer')[0];
	if (banner){banner.parentNode.removeChild(banner)}

// remove chat wall only on main page
	if (!document.location.href.split("/")[4]){
	if (document.location.href.split("/")[4] != "wall"){
		banner = document.getElementsByClassName('socialWrap')[0];
	if (banner){banner.parentNode.removeChild(banner)}}}

// re-useable add space
	banner=document.getElementById("headerBanner");
	if (banner){
		if (document.getElementById("broadcastingApp")){
			banner.innerHTML="<h2>"+document.title+"&nbsp</h2>"}else{
			banner.innerHTML="<h2>Add Free by ladroop.&nbsp V"+version+"</h2>"}
	}

// remove ultimate from drop list
	banner = document.getElementsByClassName('dropDownList')[0];
	if (banner){drop=banner.getElementsByTagName('li');
		drop[0].parentNode.removeChild(drop[drop.length-1])}

// remove misc links on option bar 
	banner = document.getElementsByClassName('optionsBar')[0];
	if (banner){
		rembar("naughty");
		rembar("bucks");
		rembar("blog");
		rembar("month");
		rembar("help");
		rembar("tokens");
		rembar("List");
		rembar("super_shows");
		rembar("cam4ult");
	}

// remove an item from the bar
	function rembar(data){
		links=banner.getElementsByTagName('a');
		for (i=0;i<links.length;i++){
		if (links[i].href.indexOf(data) != -1){
		links[i].parentNode.removeChild(links[i])}}
	}

// set borders

	banner=document.getElementById("directoryDiv");
	if (banner){
		Users = banner.getElementsByClassName('profileBox');
		for (var i = 0; i < Users.length; i++) {
			Users[i].getElementsByClassName('whiteSpacerMessage')[0].style.visibility ="hidden";
				if((Users[i].innerHTML.indexOf('stats time') != -1)&&(Users[i].innerHTML.indexOf('/CDN/') != -1)){
					Users[i].getElementsByTagName('img')[0].style.border="1px dotted #888888"; 
				}
		}
	}

// full screen for non-tip
	if (document.getElementById("camPaneSmall")){
	if (!document.getElementById("tipMenu")){
	newul=document.createElement('ul');
	newul.id="tipMenu";
	newul.style.backgroundColor = "black";
	newul.style.width = "880px";
	document.getElementById('camPaneSmall').appendChild(newul)}}

// enable fullscreen, save tip leader option
	banner=document.getElementById("tipMenu");
	if (banner){
	tipl=banner.getElementsByTagName('li')[2];
	if (tipl){tipl=tipl.innerHTML}else{tipl=""}
	
	fs=banner.getElementsByTagName('li')[4];
	if (fs){
		fs=fs.innerHTML
		}else{fs=""}

	fc=banner.getElementsByTagName('li')[3];
	if (fc){
		fc=fc.innerHTML
		}else{fc=""}


	banner.innerHTML="";
	if (document.getElementById('mini-mail_pic')){
		banner.innerHTML='<li>'+fs+'</li><li>'+tipl+'</li><li>'+fc+'</li>';
		document.getElementById("li3").setAttribute("onclick","cam4FullScreen()");
		document.getElementById("li1").innerHTML="Float this webcam";
		document.getElementById("li1").removeAttribute("onclick");
		document.getElementById("li1").addEventListener('click',floatcam, false);
	}
	else{
		banner.innerHTML='<li>'+tipl+'</li><li>'+fc+'</li>';
		document.getElementById("li1").innerHTML="Float this webcam";
		document.getElementById("li1").removeAttribute("onclick");
		document.getElementById("li1").addEventListener('click',floatcam, false);
	}
	}

// PM from button
	if((document.getElementById('mini-mail_pic'))&&(document.getElementsByClassName("bttn")[0])&&(document.location.href.split("/").length == 4)){
	document.getElementsByClassName("bttn")[0].href="#";
	document.getElementsByClassName("bttn")[0].target="_top";
	document.getElementsByClassName("bttn")[0].setAttribute('onclick','document.getElementById(\'send_message\').style.display=\'block\';');
	}else{
	banner=document.getElementById("profileHeaderShare");
	if (banner){banner.parentNode.removeChild(banner)}
	}

// removed tabs old version
	function rembar2(data){
		links=tabs.getElementsByTagName('a');
		for (i=0;i<links.length;i++){
		if (links[i].href.indexOf(data) != -1){
		links[i].parentNode.removeChild(links[i])}}}


// old version or not logged in
	tabs = document.getElementById("directoryTabs");
	if (tabs){
		rembar2("cam4ultimate");
		rembar2("4.biz");
// old version fall back for friends and favs
		if(document.getElementById('mini-mail_pic')){
			newtab = document.createElement('li');
			uname=document.getElementsByClassName("usrmain")[0].getElementsByTagName('a')[0].innerHTML;
			newtab.className="right search";
			newtab.innerHTML="<a href=http://"+location.hostname+"/"+uname+"/edit/friends_favorites#><span id='id2'>Friends and Favorites</span></a>";
			tabs.appendChild(newtab);
		}
	}

// friends and fav on new system - removes ultimate too
	if(document.getElementById('mini-mail_pic')){
		if (document.getElementsByClassName("hd-cams nopop")[0]){
			barn=document.getElementsByClassName("hd-cams nopop")[0];
			document.getElementsByClassName("buttons clearfix")[0].style.width="300px";
			uname=document.getElementsByClassName("usrmain")[0].getElementsByTagName('a')[0].innerHTML;
			barn.href="http://"+location.hostname+"/"+uname+"/edit/friends_favorites#";
			barn.target="_top";
			barn.innerHTML="Friends and Favorites";
		}
	}

// move cam 80px right
	if (document.getElementById("broadcastingApp")){
	document.getElementsByClassName("profileCamWrap")[0].style.margin="0px 0px 0px 80px";
	}

// remove inserted iframes and others every 1 second
	t=setInterval(function(){

// skip age confirm screen
	hit=document.getElementsByClassName("btn iagree closeOverlayJquery")[0];
	if(hit){click(hit)}

// iframes
	var frame = document.getElementsByTagName('iframe');
	if (frame){
	for (i=0;i<frame.length;i++){
	frame[i].parentNode.removeChild(frame[i])}
	}


// votes count
	if (document.getElementById("hiddenvotes")){
	if (document.getElementById("rating_status")){
		if (document.getElementById("rating_status").innerHTML.indexOf("people") == -1){
		document.getElementById("rating_status").innerHTML=document.getElementById("hiddenvotes").innerHTML+" people voted";
		}
	}}

// clear sign up and buy tokens on nonmembers chatscreen
	banner=document.getElementById("nonMembers");
	if (banner){banner.innerHTML=""}
	},1000);

	trun=0;
}


//auto clicker
	function click(elm) {
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
		elm.dispatchEvent(evt)} 

//update check
	function update(){
		metalink = "http://userscripts.org/scripts/source/116371.meta.js";
		scriptlink = "http://userscripts.org/scripts/source/116371.user.js";
		GM_xmlhttpRequest({
		method: 'GET',
		url: metalink,
		onload: function(response) {
		data = response.responseText;
		createCookie("updatecheck","1",1);
		revp = data.indexOf("@version");
		rev = data.substring(revp+9 , revp+12);
		if (parseFloat(rev) > parseFloat(version)){if (confirm('There is a new version of the cam4 script available.\n Do you wish to install it ?')){window.open(scriptlink, '_blank')}}}})
		}

// cookie functions
	function createCookie(name,value,days,domain){
		if (domain){
		var domain=";domain=."+domain;
		}else var domain = "";
		if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		}else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/"+domain;
		}

	function eraseCookie(name,domain){
		createCookie(name,"",-1,domain);
		}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
		}

// new cam window
	var floatcam=function go(){
		if (document.getElementById("tDiv")){document.getElementById("tDiv").innerHTML=""}
		createCookie("floatcam",1,1);
		document.getElementById("broadcastingApp").innerHTML="<h3><span>Close the floating web cam if you want to see an other cam!</span></h3>";
		popUpWindow=window.open(document.location,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=880, height=462");
		}


function do_script1(){
if (document.getElementsByTagName('head')[0].innerHTML.indexOf("icra") != -1){ // no running on other cam4 pages like iframes
if (document.getElementsByTagName('head')[0].innerHTML.indexOf("edgecast.cam4s.com") != -1){do_script()} // run only on real cam4 domains
}
}
window.addEventListener("DOMContentLoaded", function() { do_script1() }, false);

//.user.js