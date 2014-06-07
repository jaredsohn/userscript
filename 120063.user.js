// ==UserScript==
// @name           Google Reader Mini + Keep All
// @description    Google Reader Mini + Keep All - Push 'W' to show Or Hide: Logo, Search, Controllers, Add Subsription Button, Feed title.
// @include        http*://www.google.*/reader/*
// @version        201201251555
// ==/UserScript==


GM_addStyle(" \
/* remove gbar */\
#gb{\
	display: none !important;\
}\
\
\
/* remove toggler */\
#chrome-lhn-toggle {\
}\
\
\
#message-area-container{}\
	#message-area{}\
\
\
#loading-area-container{}\
	#loading-area{}\
\
\
#top-bar{\
}\
	#logo-container{\
}\
	#search{\
}\
		#search-input{\
}\
\
\
#viewer-header{\
width: 100% !important;\
/*height: 25px !important;\
padding-top: 0px !important;\
padding-left: 0px !important;*/\
}\
#viewer-top-controls-container{\
}\
#viewer-top-controls{\
width: 100% !important;\
}\
#title-and-status-holder{\
height: 17px !important;\
padding-top: 0px !important;\
padding-left: 0px !important;\
}\
\
\
#lhn-add-subscription-section{\
}\
#lhn-add-subscription{\
}\
#quick-add-bubble-holder{}\
	#quick-add-form{}\
		#quick-add-instructions{}\
		#quick-add-close{}\
		#quick-add-input-div{}\
			#quickadd{}\
			#quick-add-btn{}\
		#quick-add-helptext{}\
\
#scrollable-sections{\
}\
#scrollable-sections-top-shadow{\
display: none !important;\
}\
\
\
\
#main{\
}\
	#nav{}\
/*Hide Home Menu*/\
#home-section{\
display: none !important;\
}\
/*Hide All Items Menu*/\
#reading-list-selector{\
display: none !important;\
}\
/*Hide Explore Menu*/\
#recs-tree-item-0-link{\
display: none !important;\
}\
\
#lhn-subscriptions-minimize, #lhn-recommendations-minimize, #lhn-selectors-minimize{\
display: none !important;\
}\
/* remove padding at top of chrome */\
	#chrome{\
}\
\
\
#loading-error{}\
\
\
#viewer-details-template{  display: none !important;}\
	#sub-day-bucket-chart-header{}\
	#sub-day-bucket-chart-contents{}\
		#sub-day-bucket-map{}\
	#sub-hour-bucket-chart-header{}\
	#sub-hour-bucket-chart-contents{}\
		#sub-hour-bucket-map{}\
	#sub-dow-bucket-chart-header{}\
	#sub-dow-bucket-chart-contents{}\
		#sub-dow-bucket-map{}\
\
\
\
\
/*The padding between title and description in every news title*/\
#entries .entry-body, #entries .entry-title {\
  max-width: 100% !important;\
  padding-right: 0px !important;\
}\
\
\
/* avoid cropping of go-to button that is placed at the end of every news title*/\
#entries.list .collapsed .entry-main .entry-original {\
  /*width: 14px !important;*/\
  height: 12px !important;\
}\
\
/*Navigation bar*/\
#nav{\
 padding-top: 0px !important;\
}\
\
\
\
\
/* change unselected sub-tree cursor to something much fainter */\
#sub-tree .link.cursor {\
  background-color: #d8d8d8 !important;\
}\
#sub-tree .link.selected.cursor {\
  background-color: #A4C5FF !important;\
}\
\
\
\
\
#chrome-lhn-menu {\
}\
\
/* hide 'manage friends' (it's in settings anyhow) */\
#friends-settings-link {\
  display: none !important;\
}\
\
\
/* previous & next item buttons shouldn't wrap */\
#chrome-footer-container .button-body-container {\
  white-space: nowrap !important;\
  width: 85px !important;\
}\
\
\
/* fix loading message background */\
#loading-area .c {\
}\
\
/* navigation links shouldn't wrap */\
#selectors-container li {\
  white-space: nowrap !important;\
}\
\
\
/* fix heights */\
#viewer-top-controls {\
}\
#chrome-header {\
  padding: 0px 0px 0px 1px !important;\
height: 22px;\
}\
\
\
/* Current entry modifier */\
#current-entry{\
font-size: 11pt !important;\
}\
\
\
/* header Size */\
#chrome-title {\
  font-size: 14pt !important;\
}\
#chrome-title a {\
  border-bottom: 0px !important;\
}\
\
\
/* no border around expanded items */\
#entries.list #current-entry.expanded {\
  /*border: 0px !important;*/\
}\
#entries.list #current-entry.expanded .entry-actions {\
  border: 0px !important;\
  border-top: 0px solid #ccc !important;\
  border-bottom: 0px solid #ccc !important;\
  border-left: 0px solid #ccc !important;\
  border-right: 0px solid #ccc !important;\
}\
#viewer-entries-container{\
}\
\
#viewer-container{\
}\
#entries { padding:0 !important; }\
\
}\
#sub-tree-header{\
display: none !important;\
}\
#recommendations-tree{\
display: none !important;\
}\
\
\
\
");



GM_addStyle("#top-bar {display: none;}");
GM_addStyle("#gb {display: none;}");
GM_addStyle("#title-and-status-holder {display: none;}");
//GM_addStyle("#viewer-header{display: none;}");
GM_addStyle("#lhn-add-subscription-section{display: none;}");

function KeyDownEvent(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     userIsTyping = (element.type == "text" || element.type == "password");
   } else {
     userIsTyping = (elementName == "textarea");
   }
   if (userIsTyping) return true;
   if (String.fromCharCode(event.which) == "W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggle_visibility();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }
 
var is_visible;
function toggle_visibility (){
	if(is_visible == "block"){
		is_visible = "none";
	}else if(is_visible != "block"){
		is_visible = "block";
	}
	document.getElementById('top-bar').style.display = is_visible;
	//document.getElementById('viewer-header').style.display = is_visible;
	document.getElementById('lhn-add-subscription-section').style.display = is_visible;
	//document.getElementById('gb').style.display = is_visible?"none":"block";
	//document.getElementById('title-and-status-holder').style.display = is_visible?"none":"block";
}
document.addEventListener("keydown", KeyDownEvent, false);