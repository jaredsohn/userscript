// ==UserScript==
// @name           Facebook CSS fixer
// @namespace      Daniel Leinerud
// @description    If you don´t like the new Facebook look, this will fix some things
// @date           2009-09-02
// @version        1.83
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

var thingsToDelete = new Array();

thingsToDelete.push("took the");
thingsToDelete.push("quiz");
thingsToDelete.push("FarmVille");

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
