// ==UserScript==
// @author              Eric Lima- ericjlima@gmail.com
// @name                No Header On Watch Pages
// @namespace           http://userscripts.org/scripts/show/399999999
// @description         Removes all the Youtube Header.
// @include             http*://replace*
// ==/UserScript==
// No youtube header by Eric Lima v0.01
// Eric Lima User Scripts Unfinished

(function() { var ids = ["navigation", "aeaoofnhgocdbnbeljkmbjdmhbcokfdb-mousedown", "prev", "usermenu", "next", "slideshow_74453_ind", "slideshow_alb74453", "Navigation", "picturenav", "description-74453", "div.album_header", "album_excerpt", "tab_menu", "div.tab_menu", "div.tab_view", "tab_view", "footer", "logo", "header", "sh-l", "sh-r", "masthead-container", "alerts",  "content-container", "footer-container", "logo-container","global-info","lhn-friends", "lhn-add-subscription-section", "lhn-selectors", "lhn-recommendations", "guser","gb"];

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