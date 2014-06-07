// ==UserScript==
// @name          Google Reader Compact & Minimalist
// @description   Press 'C' to toggle
// @version        1.0
// @include     http://www.google.com/reader/*
// @include     https://www.google.com/reader/*
// @include     http://www.google.co.jp/reader/*
// @include     https://www.google.co.jp/reader/*
// ==/UserScript==


var overrideCSS = " \
#top-bar { height: 40px !important; } \
#search { padding: 5px 0 !important; } \
#sections-header { height: 40px !important; } \
#viewer-header { height: 40px !important; } \
#logo-section { height: 38px !important; } \
#logo-section { margin-top: -10px !important; } \
#lhn-add-subscription-section { height: 40px !important; } \
#lhn-add-subscription { margin-top: -30px !important; } \
#viewer-top-controls-container { margin-top: -15px !important; } \
#scrollable-sections { padding-bottom: 12px !important; } \
#viewer-entries-container { padding-bottom: 12px !important; } \
.entry-icons-placeholder { float: left; margin-left: 10px !important; } \
.entry-title-link { margin-left: 10px !important; } \
.entry-author { margin-left: 20px !important; } \
.entry-body { margin-left: 20px !important; } \
#current-entry .card {border-style: solid; border-color: #4D90F0 !important; } \
div.entry div.entry-body { max-width: 80% ; font-family: ; font-size: 15px ; line-height: 1.5 ; } \
";
GM_addStyle(overrideCSS);


// http://userscripts.org/scripts/show/12197

GM_addStyle("#gb {display: none;}");
GM_addStyle("#top-bar {display: none;}");
GM_addStyle("#logo-section {display: none;}");

(function() {
var ids = [ "gb","logo-section","trends-selector","directory-selector","lhn-recommendations" ];

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
   if (String.fromCharCode(event.which)=="C" && !event.ctrlKey && !event.altKey && !event.metaKey) {
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