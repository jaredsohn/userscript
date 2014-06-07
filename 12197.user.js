// ==UserScript==
// @author              Scott Cowan
// @name                Google Reader Minimalistic
// @namespace          http://google.com/reader/userscript
// @description           Removes all the whitespace from Google Reader and just gives you the news
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// @include             https://google.co.uk/reader/*
// @include             https://*.google.co.uk/reader/*
// ==/UserScript==
// Google Reader Minimalistic
// Scott Cowan http://userscripts.org/users/32932

(function() {
var ids = ["viewer-header","logo-container","search","search-input","search-restrict","search-restrict-input","search-submit","chrome-header","global-info","gb","viewer-footer","top-bar"];

 function toggle_gr ()
 {
   var length = ids.length;
   var is_visible = document.getElementById(ids[0]).style.display != "none";

   for (var i=0; i<length; i++){
     if(document.getElementById(ids[i]) != null)
		document.getElementById(ids[i]).style.display = is_visible?"none":"block";
   }
   GM_addStyle(".gbh { display:none !important; }");  //Hide dividing line
   GM_addStyle("#entries .entry {padding-top: 2px}");
   GM_addStyle(".card-common {margin: 0 2px}");
   GM_addStyle(".entry .entry-source-title {font-size:110%;}");
   GM_addStyle(".entry .entry-title {font-size:120%;}");
   GM_addStyle(".card .card-content {padding: 2px 1px 2px 2px;}");
   GM_addStyle("#current-entry .card .card-content {padding: 2px 1px 2px 2px;}");
   GM_addStyle(".entry .entry-container {padding-bottom: 0;}");
   GM_addStyle(".entry .entry-body {padding-top: 0;}");
   GM_addStyle(".entry .entry-actions {padding: 2px;}");
   if(is_visible){
	var logo = document.getElementById('main');
	logo.style.top = '0';	

	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0';
	
	var logo = document.getElementById('nav');
	logo.style.paddingTop = '0';
   }
   else {
	var logo = document.getElementById('main');
	logo.style.top = '0';

	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0';
	
	var logo = document.getElementById('nav');
	logo.style.paddingTop = '0';
   }
}

 function GRT_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;
   if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggle_gr();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }

 document.addEventListener("keydown", GRT_key, false);
 toggle_gr();
 
var accountname = document.getElementById('email-address');
document.title = document.title + " | " + accountname.innerHTML + " | ";
 
 })();