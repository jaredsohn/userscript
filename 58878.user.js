// ==UserScript==
// @name           Facebook SHIT remover
// @namespace      David SallarÃ©s
// @description    Treu tota la merda del Facebook, quizs, humors,frases gilipolles,etc...
// @date           2009-09-30
// @version        1.00
// @include       http://facebook.*/*
// @include       http://www.facebook.*/*
// The section for deleting tests are based on a script by Ankan Banerjee (http://userscripts.org/users/84585).
// ==/UserScript==
GM_addStyle(
'.home .UIIntentionalStream .UIIntentionalStory_Message  { display: block; padding-bottom: 0px; font-size:11px;}' + //2 lines: decreased font size for middle section
'.profile .UIStream .UIIntentionalStory_Message  { display: block; padding-bottom: 0px; font-size:11px;}' +
'div.UIIntentionalStory_Body { min-height:35px; padding:0 0 0 50px;}' + //less height of one feed
'.commentable_item .comment_add_row { padding-bottom:1px; }' + //less padding in comment
'.UIRoundedImage_LARGE .UIRoundedImage_Image { height:35px; width:35px; }' +
'.UIRoundedImage_Corners { display:none; }' + //deleted rounded image corners
'.UIProfileImage_LARGE { height:35px; width:35px; }' + //smaller profile pictures in feeds
'.GBThreadMessageRow_Image img { height:35px; width:35px; padding-left:10px; }' + //smaller profile pictures in feeds
'.UIIntentionalStory_Pic { left:10px }' + //moving the profile image a bit to the right
'.UIHotStory_Title { font-size:10px; }' + //decreased font size of headlines in right column
'.UIHotStory .UIMediaItem_Wrapper img{ width:40px !important; height:40px !important; }' + //6 lines: smaller pictures in right column
'.UIMediaItem_Photo .UIMediaItem_PhotoFrame { width:40px !important; }' +
'.UIMediaItem_ImageLink .UIMediaItem_Photo a:hover .UIMediaItem_Wrapper, .UIMediaItem_Photo a:hover .UIMediaItem_PhotoBorder {   width:40px !important;  }' +
'.UIHotStory .UIMediaItem_ImageBackground {  width:40px !important; height:30px !important; margin-top:3px;}' +
'.UIMediaItem_ImageLink { display:none; }' +
'.UIHotStory_Media { width:55px !important; }' +
'.UIRoundedBox_Box .UIRoundedBox_TR, .UIRoundedBox_GrayBlueTopBackground .UIRoundedBox_Box .UIRoundedBox_TR { padding:0 0 0 0; }' +
'.UIHotStory { margin-top:6px; }' + //2 lines: decreased height of feeds in right column
'.UIHotStory_Small .UIHotStory_Media { height:10px; }' +
'.UIComposer_Prompt { font-size:11px !important; }' + //What's on your mind? - decreased font size
'.UIFilterList_Item a { font-size:9px; padding:8px 9px 3px 25px; height:14px; }' + //decreased font size of left column
'.UIHomeBox { font-size:10px; }' + //2 lines: decreased font size right column
'.UIHotStory_Copy { font-size:10px; }' +
'.UIHotStory_Ad { display:none !important; }' + //hiding ads in right column
'.UIMediaItem img { height:60px; }' + //decreased hight of pictures in feeds
'#home_sidebar { width:230px; }' + //decreased width right column 
'#sidebar_ads .adcolumn { display:none; }' + //hiding ads in own profile page
'.UIComposer_STATE_INPUT_FOCUSED .UIComposer_TextArea { font-size:11px; }' + //decreased font size when typing
'.UIComposer .UIRoundedImage_LARGE .UIRoundedImage_Image { height:50px; width:50px; }' + //2 lines: keeping the size of own profile picture
'.UIComposer .UIRoundedImage_LARGE { height:50px; width:50px; }' +
'.pokes { }' + //Poke div (just for more user customization, e.g. display:none; to hide)
'#home_filter_list { }' +//Left column filter (just for more user customization, e.g. display:none; to hide)
'.GBThreadMessageRow_Body { font-size:11px; }'
//'.UIHotStream { display:none;}' //Right column 'Highlights' - THIS IS NOW DELETED IN THE CODE BELOW INSTEAD
);

function disableAppsInNewsFeeds(obj)
{
	// Browser checking routine to determine DOM function works within object scope, end function if condition is true
	if(!obj || !obj.getElementsByClassName)
		return false;
		
	// Initialize user configurable variables
	var fbClass  = "UIIntentionalStory"; // DOM News class
	var fbPMatch = "/apps/application"; // Exlcusion matching
	
	// Initialize variables
	var fbFeeds = null;
	
	// Locate elements within class name
	if (fbFeeds = obj.getElementsByClassName(fbClass))
	{
		// Iterate through all news feeds
		for (var i = 0; i < fbFeeds.length; i++)
		{
			// Define offset as a variable
			var fbFeed = fbFeeds[i];
			
			// Pattern match for 
			if(fbFeed.innerHTML.match(fbPMatch))
					fbFeed.style.display = "none";		
		}
	}
}

// Call function on page load
disableAppsInNewsFeeds(document);

// Document Event listener to process incoming news feeds
document.addEventListener("DOMNodeInserted", function(ev) {	disableAppsInNewsFeeds(ev.target); }, false);

// Window Event listener to process disableAppsInNewsFeeds function upon page finish loading
window.addEventListener("load",	function() { disableAppsInNewsFeeds(document); }, false);

var shitsToDelete = new Array();

shitsToDelete.push("LivingSocial");

function removeShit(){
	
	var classes = document.getElementsByClassName("UIFilterList_ItemLink");
	
	for (var i = 0; i < classes.length; i++){
		
		for (var j = 0; j < shitsToDelete.length; j++){

			//if (classes[i].innerHTML.indexOf(shitsToDelete[j]) >= 0){
			if (classes[i].title == shitsToDelete[j]){

				classes[i].parentNode.parentNode.style.display='none';
					
			}
		}
	}
}
var thingsToDelete = new Array();

thingsToDelete.push("took the");
thingsToDelete.push("quiz");
thingsToDelete.push("se siente");
thingsToDelete.push("FarmVille");
thingsToDelete.push("leyó su");
thingsToDelete.push("razonó con");
thingsToDelete.push("Leyó su");
thingsToDelete.push("Pidió Un");
thingsToDelete.push("just took");
thingsToDelete.push("has been playing");
thingsToDelete.push("recogió una");
thingsToDelete.push("abrió una");

function removeAllCrappyTests(){
	
	var classes = document.getElementsByClassName("UIStoryAttachment_Copy");
	
	for (var i = 0; i < classes.length; i++){
		
		for (var j = 0; j < thingsToDelete.length; j++){

			if (classes[i].innerHTML.indexOf(thingsToDelete[j]) >= 0){

				classes[i].parentNode.parentNode.style.display='none';
					
			}
		}
	}
}

var sectionsToDelete = new Array();

sectionsToDelete.push("Highlights");
sectionsToDelete.push("Sponsored");
sectionsToDelete.push("Connect With Friends");


function removeHighlightsSection(){
	
	var element = document.getElementsByClassName("UITitledBox");
	
	for (var i = 0; i < element.length; i++){
		
		for (var j = 0; j < sectionsToDelete.length; j++){

			if (element[i].innerHTML.indexOf(sectionsToDelete[j]) >= 0){

				element[i].style.display='none';
			
			}
		}
	}
}


function timer(){
	timer1 = setInterval(removeAllCrappyTests, 1000);
	timer2 = setInterval(removeHighlightsSection, 1000);
}

window.addEventListener("load", timer, false);
