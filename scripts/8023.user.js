// ==UserScript==
// @name           Myspace - Remove Anything *Customizable*
// @namespace      http://www.myspace.com/tp_
// @include        http://home.myspace.com/*
// @description    Removes Anything

// =====Descriptions=====
// header = Blue bar at the top (Also removes the "SignOut" link
// topnav = Lightblue navbar at the top
// home_profileInfo = Box with your picture in
// StatusBox = Extended Network banner chooser box
// home_messages = Messages Box
// home_bulletins = Bulletins Box
// home_schools = Your Schools Box
// squareAd = The square, Flash-ad
// home_infoBar = Box with profile views in it
// home_searchAddressBook = Search Address Book box
// home_coolNewVideos = Cool New videos Box
// splash_profile = Cool New People Box
// home_setHomePage = Set Myspace as homepage link
// home_greybox = Blue box with Books, Blogs, ChatRooms, Comedy, etc.
// home_friends = Friends Box
// footer = Greyspace at the bottom with links in it.

// ==/UserScript==

(function() {

// =====EDIT HERE=====
// To show something, simply put "// " in front of the code line, without the brackets.
// To hide something, simply remove the "// " from the front

// document.getElementById("header").style.display = "none";
// document.getElementById("topnav").style.display = "none";
// document.getElementById("home_profileInfo").style.display = "none";
// document.getElementById("StatusBox").style.display = "none";
// document.getElementById("home_messages").style.display = "none";
// document.getElementById("home_bulletins").style.display = "none";
document.getElementById("home_schools").style.display = "none";
// document.getElementById("squareAd").style.display = "none";
// document.getElementById("home_infoBar").style.display = "none";
document.getElementById("home_activities").style.display = "none";
// document.getElementById("home_searchAddressBook").style.display = "none";
document.getElementById("home_coolNewVideos").style.display = "none";
document.getElementById("splash_profile").style.display = "none";
document.getElementById("home_setHomePage").style.display = "none";
document.getElementById("home_greybox").style.display = "none";
// document.getElementById("home_friends").style.display = "none";
// document.getElementById("footer").style.display = "none";



// Moves the Status box under Top friends
//document.getElementById('home_friends').parentNode.insertBefore(document.getElementById('a

spnetForm'), 

//document.getElementById('home_friends').nextSibling);

// Small Info box, provided by Jordon Kalilich, With permission
 var adBox = document.getElementById('squareAd');
 if (adBox) {
    adBox.parentNode.removeChild(adBox);
 }
 var infoBox = document.getElementById('home_infoBar');
 if (infoBox) {
 infoBox.innerHTML = infoBox.innerHTML.replace(/<br>/ig,'&nbsp;');
 infoBox.innerHTML = infoBox.innerHTML.replace(/<\/a>&nbsp;/ig,'</a>,&nbsp;');
 function addGlobalStyle(css) {
     var head, style;
     head = document.getElementsByTagName('head')[0];
     if (!head) { return; }
     style = document.createElement('style');
     style.type = 'text/css';
     style.innerHTML = css;
     head.appendChild(style);
 }
 addGlobalStyle('#home_infoBar span, #home_infoBar div { display: inline ! important; }');
 infoBox.style.width = '50%';
 infoBox.style.height = '100%';
 infoBox.style.margin = '0px 0px 10px 0px';
 }

document.getElementById("main").style.minHeight = "1030px"

})();