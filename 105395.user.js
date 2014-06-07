// ==UserScript==
// @author              Eric Lima- ericjlima@gmail.com
// @name                No YouTube Header On Watch Pages
// @namespace           http://userscripts.org/scripts/show/105395
// @description         Removes the YouTube Header On Watch Pages Only
// @include             http*://*.youtube.com/watch?v=*
// ==/UserScript==
// No YouTube Header on Watch Pages by Eric Lima v0.01
// Eric Lima User Scripts

(function() { var ids = ["masthead-container", "logo-container","global-info","lhn-friends", "lhn-add-subscription-section", "lhn-selectors", "lhn-recommendations", "guser","gb","gbw"];

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
	logo.style.marginTop = '-3.7em';
	logo.style.fontSize = '8pt';

	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0';

	var logo = document.getElementById('search');
	logo.style.marginTop = '0.1em';

	var logo = document.getElementById('sub-tree');
	logo.style.fontSize = '8pt';

	var logo = document.getElementById('chrome-title');
	logo.style.fontSize = '10pt';

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