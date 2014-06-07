// ==UserScript==
// @author              Alex Beep
// @name                Google Reader cleaner based on New Style Minimalistic by DemianGod v3.1
// @namespace           http://userscripts.org/
// @description         Removes all the junk from New Google Reader and just gives you the search and collapsable subscriptions. 
// @include             http*://*.google*/reader/*
// ==/UserScript==
// Google Reader cleaner based on New Style Minimalistic By DemianGod v3.1

(function() { var ids = ["viewer-details-toggle", "viewer-details", "chrome-view-links", "viewer-all-new-links", "gbar", "logo-container","global-info","lhn-friends", "lhn-add-subscription-section", "lhn-selectors", "lhn-recommendations", "guser"];

 function toggle_gr ()
 {
   var length = ids.length;
   var is_visible = document.getElementById(ids[0]).style.display != "none";

   for (var i=0; i<length; i++){
     if(document.getElementById(ids[i]) != null)
		document.getElementById(ids[i]).style.display = is_visible?"none":"block";
   }
   GM_addStyle(".gbh { display:none !important; }");  //Hide dividing line
   if(is_visible){
	var logo = document.getElementById('main');
	logo.style.marginTop = '-5em';
	logo.style.fontSize = '10pt';

	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0';
	
	var logo = document.getElementById('viewer-top-controls');
	logo.style.padding = '2px 0';
	logo.style.fontSize = '8pt';
	logo.style.paddingBottom = '0';
	logo.style.position='absolute';
	logo.style.top='0';
	logo.style.right='0';
	logo.style.width='32%';
	
	var logo = document.getElementById('sub-tree');
	logo.style.fontSize = '11px';
	
	var logo = document.getElementById('lhn-subscriptions');
	logo.style.fontSize = '11px';
	
	var logo = document.getElementById('viewer-footer');
	logo.style.fontSize = '11px';
	
	var logo = document.getElementById('chrome-title');
	logo.style.fontSize = '14px';
	logo.style.lineHeight = '10px';
	
	var searchw = document.getElementById('search');
	searchw.style.display = 'none';
	
	var gb = document.getElementById('gb');
	gb.style.display = 'none';
	
	var logo = document.getElementById('search');
	logo.style.marginTop = '0.1em';

	var logo = document.getElementById('sub-tree');
	logo.style.fontSize = '8pt';

	var logo = document.getElementById('chrome-title');
	logo.style.fontSize = '10pt';
	
	var logo = document.getElementById('chrome-header');
	logo.style.fontSize = '8pt';
	logo.style.padding = '0 9px';
	
	var logo = document.getElementById('viewer-footer');
	logo.style.fontSize = '8pt';
	logo.style.padding = '2px 0';
	
	var logo = document.getElementById('entries-status');
	logo.style.top = '0';

	var logoas = document.getElementById('search');
	logoas.style.top = '0';
	logoas.style.left = '0.3em';
	logoas.style.width = '100%';

	var logoas = document.getElementById('search-input');
	logoas.style.width = '50%';

	var logoas = document.getElementById('search-restrict');
	logoas.style.width = '20em';

	var logoas = document.getElementById('search-restrict-button');
	logoas.style.width = '20em';

	var logoas = document.getElementById('search-restrict-input');
	logoas.style.width = '20em';

	var logoas = document.getElementById('search-submit');
	logoas.style.marginRight= '0em';
	logoas.style.marginLeft = '2em';

   }
   else {
	var logo = document.getElementById('main');
	logo.style.marginTop = '0.3em';
	
	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0.3em';

	var logoas = document.getElementById('search');
	logoas.style.top = '2.5em';
	logoas.style.left = '20em';
	logoas.style.width = '70%';
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
   if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.metaKey) {
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
document.title = document.title + " | " + accountname.innerHTML + " |"
 
 })();