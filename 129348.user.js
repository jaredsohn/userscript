// ==UserScript==
// @name			startpage Enhancer
// @author			Carlton Kenney
// @namespace		none
// @description		Enhances startpage (by ixquick) to look like Google, load 100 results, hide ads, and add Google Maps SSL Link.
// @copyright		2013 by Carlton Kenney
// @version			0.2b
// @lastupdated		8/30/2013
// @include			*startpage.com*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

/***********************************************************
=================Variable Declaration=================
***********************************************************/
//--------------Home Page?--------------//
var homePage = (document.URL.indexOf("startpage.com/do/") >= 0 ? 0 : 1);

//--------------Load Form Options--------------//
if(GM_getValue("startpageOptions") == undefined || GM_getValue("startpageOptions").length != 6) { GM_setValue("startpageOptions", "111100"); }
var options = GM_getValue('startpageOptions').split('');
var style = parseInt(options[0]);
var maps = parseInt(options[1]);
var results = parseInt(options[2]);
var ads = parseInt(options[3]);
var bookmarks = parseInt(options[4]);
var proxy = parseInt(options[5]);
console.log("ENHANCER: Variables initialized.");

/***********************************************************
=================Style Changes=================
***********************************************************/
//--------------Change Styles First, for Speed--------------//
if(style) {
	$('#bookmark_tip').attr('style', ''); //Necessary style removal for bookmark popup
	
	if(homePage) {
		GM_addStyle(
	'body,html { background: #FFFFFF; }'
	+'input#query {font: 16px arial,sans-serif; background: none repeat scroll 0 0 #FFFFFF; box-shadow: none; border-color: #C0C0C0 #D9D9D9 #D9D9D9; border-radius: 1px; border-right: 1px solid #D9D9D9; border-style: solid; border-width: 1px; height: 18px; padding: 5px 6px 6px; white-space: nowrap; width: 560px; }'
	+'input#query:hover, input#query_bottom:hover { border-color: #A0A0A0 #B9B9B9 #B9B9B9; border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; }'
	+'input#query:active, input#query_bottom:active { border: 1px solid #4D90FE; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset; outline: medium none; }'
	+'input#query:focus, input#query_bottom:focus { border: 1px solid #4D90FE; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset; outline: medium none; }'
	+'#head { margin: 0 0 12px; background: #2D2D2D; padding: 6px 25px; border-bottom: 1px solid; border-bottom-color: #FFFFFF; }'
	+'#logoRed { position: relative; color: #D5402C; font-size: 60px; font-family: Arial, helvetica; font-weight: 600; text-shadow:2px 2px 3px #999999; text-decoration: none; padding-right: 100px; line-height: 100%; }'
	+'#logoBlue { position: relative; color: #608BD6; font-size: 60px; font-family: georgia; font-weight: normal; text-shadow:2px 2px 3px #999999; text-decoration: none; padding-left: 30px; line-height: 100%; margin-top: -22px}'
	+'#logo a {text-decoration: none; }'
	+'#enhanced {padding: 0 0 0 60px; }'
	+'a#main_link { margin-bottom: 30px;}'
	+'#content { margin: 150px auto auto auto; }'
	+'.homeButton { -moz-user-select: none; background-color: #F5F5F5; background-image: -moz-linear-gradient(center top , #F5F5F5, #F1F1F1); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px 2px 2px 2px; color: #555555; cursor: default !important; display: block; font-weight: bold; height: 29px; line-height: 29px; margin: 16px auto; min-width: 54px; padding: 0 8px; text-align: center; text-decoration: none !important; }'
	+'.homeButton:hover { background-color: #F8F8F8; background-image: -moz-linear-gradient(center top , #F8F8F8, #F1F1F1); border-color: #C6C6C6; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); color: #333333; }'
	+'#iconText {font: bold 11px/27px Arial,sans-serif !important; vertical-align: top; }'
	+'form#search_form { padding-left: 0; }'
	+'#search_form p {float: none; margin-left: 0;}'
	+'div#links {  margin-top: 25px; }'
	+'.addsettings { font: 11px verdana,arial,sans-serif; }'
	);
	}

	else {
		GM_addStyle(
	'input#query_top, input#query_bottom {font: 16px arial,sans-serif; background: none repeat scroll 0 0 #FFFFFF; box-shadow: none; border-color: #C0C0C0 #D9D9D9 #D9D9D9; border-radius: 1px; border-right: 1px solid #D9D9D9; border-style: solid; border-width: 1px; height: 18px; }'
	+'input#query_top:hover, input#query_bottom:hover { border-color: #A0A0A0 #B9B9B9 #B9B9B9; border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; }'
	+'input#query_top:active, input#query_bottom:active { border: 1px solid #4D90FE; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset; outline: medium none; }'
	+'input#query_top:focus, input#query_bottom:focus { border: 1px solid #4D90FE; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset; outline: medium none; }'
	+'html {background: #F1F1F1; }'
	+'#results_content { background: #FFFFFF; margin-top: 30px; border-top: 1px solid; border-top-color: #E5E5E5; }'
	+'#head { margin: -18px 0 12px; background: #2D2D2D; padding: 0 25px 2px 22px; border-bottom: 1px solid; border-bottom-color: #FFFFFF; }'
	+'#logoRed { position: relative; color: #D5402C; font-size: 25px; font-family: Arial, helvetica; font-weight: 600; text-shadow:2px 2px 3px #999999; text-decoration: none; margin: 5px 0 0 0; padding: 0; }'
	+'#logoBlue { position: relative; color: #608BD6; font-size: 25px; font-family: georgia; font-weight: normal; text-shadow:2px 2px 3px #999999; text-decoration: none; margin: -15px 0 0 30px; padding: 0; }'
	+'#logo a {text-decoration: none; }'
	+'#results_count_p {font-size: 13px; margin: 23px 0 18px 220px; color: #999999; }'
	+'#tip {border-top: 1px solid; border-top-color: #D9D9D9; }'
	+'#side_bar { margin-top: 30px !important; top: 90px;}'
	+'#show_hide span { margin-top: 205px; }'
	+'#results, #tod_wrap { border-left: 0px; margin-left: 110px; margin-top: 10px; width: 800px;}'
	+'#results_content {margin-top:15px; padding-top: 10px;}'
	+'#by_time { border-right: 0px; }'
	+'#enhanced {padding: 0 8px 0 40px; }'
	+'#results .result h3 {font-weight:300; }'
	+'#search {padding-top:5px; margin-left: 96px;}'
	+'#logo {margin-left: 25px; margin-top: 35px;}'
	+'#results_header { max-width: 900px;}'
	+'span.linkType { font-weight:bold; font-size:x-small; color:#1122CC; }'
	+'#show_hide span {margin-top: 145px; }'
	+'#results .result h3 {font-weight: 500; }'
	+'#bookDiv { display: inline; }'
	+'#bookmark_tip {background-color: #F5F5F5; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px; width: 530px; right: 10px;}'
	+'#search_footer {width: 100%; max-width: 780px; margin-left: 95px;}'
	);
	}

	GM_addStyle(
	'#head a { color: #BBBBBB; font-size: 13px; font-family: arial !important; font-weight: bold !important; }'
	+'#head a:hover {color: #FFFFFF; }'
	+'#head a.active { color: #FFFFFF; }'
	+'.newButton {-moz-user-select: none; background-color: #4D90FE; background-image: -moz-linear-gradient(center top , #4D90FE, #4787ED); border: 1px solid #3079ED; border-radius: 2px 2px 2px 2px; color: #FFFFFF; cursor: default; display: inline-block; font-weight: bold; height: 29px; line-height: 29px; min-width: 54px; padding: 0 8px; text-align: center; text-decoration: none; margin-left: 30px; }'
	+'.newButton:hover { background-color: #357AE8; background-image: -moz-linear-gradient(center top , #4D90FE, #357AE8); border: 1px solid #2F5BB7; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); }'
	+'.searchIcon { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAQAAAAz1Zf0AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAABZSURBVBjTY2AAgv8N/9//B4H3/xsYUMH/8/+RwXlkqQawjgAwOwBsAkI3mBsA5wWAlCIkgQDFEmQ+fkm8xuJ1kADcK++hdAGqT5EC4X8Bml+xBAol0kA3AwAYF4taFE9dUAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wMy0yM1QxNDo0ODo1OCswMTowMDeAqyMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDMtMjNUMTQ6NDg6NTgrMDE6MDBG3ROfAAAAAElFTkSuQmCC") transparent; display: inline-block; height: 13px; margin: 7px 19px; width: 14px; }'
	+'#results_count_p {display: inline; margin-left: 138px; }'
	+'.settingsButton { -moz-user-select: none; background-color: #F5F5F5; background-image: -moz-linear-gradient(center top , #F5F5F5, #F1F1F1); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px 2px 2px 2px; color: #555555; cursor: default !important; display: inline; font-weight: bold; height: 29px; line-height: 29px; margin: 0 10px; min-width: 54px; padding: 0 8px; text-align: center; text-decoration: none !important; float: right; }'
	+'.settingsButton:hover { background-color: #F8F8F8; background-image: -moz-linear-gradient(center top , #F8F8F8, #F1F1F1); border-color: #C6C6C6; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); color: #333333; font: 14px arial,sans-serif; font-weight: bold; }'
	+'#tip { border: none; padding-top: 10px; )'
	);

	//--------------Change Logo--------------//
	var logoLink = (homePage == 1 ? $('#main_link').first() : $('#logo :first-child'));
	$(logoLink).empty().append('<div id="logoRed">start</div><div id="logoBlue">page</div>');

	//--------------Move 'Change Settings' Option--------------//
	var setBut = '<button class="settingsButton" onclick="location.href='
		+"'https://startpage.com/do/preferences.pl?language_ui=english&jump_to=search_tools'"
		+'"><span id="settingsButton">Change Settings</span></button>';
	$('#results_count_p').after(setBut);
	$('.date_promo').hide();

	//--------------Change Search Button(s)--------------//
	if(homePage) {
		$('#submit').replaceWith('<button id="submit" class="homeButton"><span id="iconText">Startpage Search</span></button>');
	}
	else {
		$('input').each(function() {
			if($(this).attr('id') == 'submit1') {
				$(this).replaceWith('<button id="submit1" class="newButton"><span class="searchIcon"></span></button>');
			}
		});
	}
	
} // End of Style IF Statement

//--------------Add Non-Optional Styles for Drop-Down Menu--------------//
GM_addStyle(
	'#optionsText {display:inline; padding-left: 20px;}'
	+'#optionsDiv { font-size:1.0em; text-align:left; float:right; border: solid #F1F1F1; border-width: 0 0 2px 2px; border-radius: 0 0 8px 8px; padding-right:5px; margin-top: 6px; position: absolute; background-color: #2D2D2D; right: 0px; z-index:2; font-weight:normal; color: #BBBBBB;}'
	+'p#formOptions {margin: 5px; }'
	+'p#formOptions input {margin-bottom: 5px;}'
); //End of Style Changes

console.log("ENHANCER: Style changes complete.");


//--------------Add Optional Google Maps Link--------------//
if(maps) {
	if(homePage) {
		$('#category').append('<a id="maps" href="https://maps.google.com">\u00A0\u00A0\u00A0gMaps</a>');
	}
	else {
		$('#head_left').append('<a id="maps" href="https://maps.google.com/maps?q='	+ $('#query_top').val().replace(/\s+/g, '+') + '">gMaps</a>' );
	}
	console.log("ENHANCER: Google Maps link added.");
}

//--------------Hide Various Unneeded Info--------------//
if(ads) {
	$('.tod').hide();
	GM_addStyle('#sponsored { display:none; }');
	
	if(homePage) {
		$('#caption').hide();
		$('#enhanced').hide();
		
		//Autohide protection message and show/hide on mouse rollover
		$('#news_message_content').delay(1000).fadeTo("slow", 0.1);
		$("#news_message_content").hover(function(){
			$("#news_message_content").fadeTo("fast", 1);
		},
		function(){
			$("#news_message_content").fadeTo("slow", 0.1);
		});
	}
}

//--------------Bookmark Button Changes--------------//
if(bookmarks) {
	$('#tip').hide();
}
if(!bookmarks && style) {
	$('#tip').hide();
	$('#results_count_p').after('<button id="bookButton" class="settingsButton"><span id="settingsButton">Bookmark This Page</span></button>');
	$('#bookButton').attr('onclick', $('#tip').find('a:last').attr('onclick'));
}

/***********************************************************
=================Function Declaration=================
***********************************************************/

//--------------Create Get Cookie Function--------------//
function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";"); for (i=0;i<ARRcookies.length;i++) { x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("=")); y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1); x=x.replace(/^\s+|\s+$/g,""); if (x==c_name) {	return unescape(y);	}}}

//--------------Create Set Cookie Function--------------//
function setCookie(c_name,value,exdays) {
	var exdate=new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value + ";domain=.startpage.com;path=/";
}

//--------------Create Cookie Check Function--------------//
function checkCookie(cookieVar) {
	var cookieVar = getCookie("preferences");
	var cookieDefault = "sslEEE1N1Nfont_sizeEEEmediumN1Nrecent_results_filterEEE1N1Nlanguage_uiEEEenglishN1Ndisable_open_in_new_windowEEE1N1Nnum_of_resultsEEE100N1NlanguageEEEenglishN1N";
	if (cookieVar==null || cookieVar=="" || cookieVar==undefined) {
		setCookie("preferences",cookieDefault,365);
	}
	else {
		var splitPrefs = cookieVar.split("EEE");
		if(splitPrefs[6].split("N1N")[0] != "100") {
			var joinedPrefs = [splitPrefs[0], splitPrefs[1], splitPrefs[2], splitPrefs[3], splitPrefs[4], splitPrefs[5], "100N1Nlanguage", splitPrefs[7]].join("EEE");
			setCookie("preferences",joinedPrefs,365);
		}
	}
}


//--------------changeProxy() Adapted from Userscript 172373--------------//
function changeProxy() {
    // Get all ahrefs and ixquick-proxy ahrefs
    var ahref      = document.querySelectorAll('.result > h3 > a[id^="title_"]')
        ,getProxy  = document.querySelectorAll(".result > p > #proxy_link")
        ,proxyName = "";

    // Loop though the urls and change the proxy url
    for(var i=0, len = ahref.length; i < len; i++) {
        getProxy[i].href = "http://www.nullrefer.com/?https://4.hidemyass.com/ip-1/encoded/" + window.btoa(ahref[i].href.substring(4, ahref[i].length));
        proxyName = "HideMyAss";
        // Change the proxy name on page
        getProxy[i].innerHTML = proxyName;
    }
}

/***********************************************************
=================Main Program=================
***********************************************************/

//--------------Sets Results to 100--------------//
if(results) {
	checkCookie("preferences");
}

//--------------Label Special Link Types--------------//
$('.result').each(function() {
	var result = $(this);
	var href = $(this).find('a').attr('href');
	if(href && href.match(/\.(rtf|doc|ppt|pdf)$/i) ) {
			var linkType = document.createElement("span");
    		linkType.className = "linkType";
    		linkType.appendChild( document.createTextNode(href.replace(/^.*\.(...)$/,"[$1] ").toUpperCase() ) );
			$(linkType).insertBefore(result.find('h3').children().first());
	}
	console.log("ENHANCER: Result types added before links.");
});

//--------------Add Enhancer Options Menu--------------//
var optionsContent = '<div id="optionsText">'
	+'<a class="enhancer" href="javascript:;">Show Enhancer Options</a>'
	+'<div id="optionsDiv">'
	+'<p id="formOptions">'
	+'<input type="checkbox" name="style" /> Use "Google Style" <br>'
	+'<input type="checkbox" name="maps" /> Show Google Maps Link <br>'
	+'<input type="checkbox" name="results" /> Auto-Set 100 Results <br>'
	+'<input type="checkbox" name="ads" /> Hide All Ads <br>'
	+'<input type="checkbox" name="bookmarks" /> Hide Bookmarks Button <br>'
	+'<input type="checkbox" name="proxy" /> Change Proxy to HideMyAss <br>'
	+'<button id="saveChanges">Save Changes</button>'
	+'</p></div></div>';
$(optionsContent).appendTo($('#xsearch').parent());
$('#optionsDiv').hide();

//--------------Check Boxes in Drop-Down--------------//
var options = GM_getValue('startpageOptions').split('');
for(i=0; i < options.length; i++) {
	if(parseInt(options[i])) {
		$('input[type="checkbox"]:eq('+i+')').attr('checked', true);
	}
}

//--------------Employ the Optional HideMyAss Proxy--------------//
if(proxy) {
	changeProxy();
	console.log("ENHANCER: Proxy changed to HideMyAss.");
}

$(document).ready(function(){
	//--------------Form Saving Function--------------//
	$("#saveChanges").click(function(){
		var formValues = '';
		for(i=0; i < $('#formOptions').find('input').length; i++) {
			if($('#formOptions').find('input:eq('+i+')').is(':checked'))
				formValues += '1';
			else
				formValues += '0';
		}
		GM_setValue('startpageOptions', formValues);
		location.reload();
	});
	
	//--------------Create Show/Hide Function--------------//
	$(".enhancer").click(function(){
		var text = $(this).text();
    	$(".enhancer").text(text == "Show Enhancer Options" ? "Hide Enhancer Options" : "Show Enhancer Options");
		$("#optionsDiv").slideToggle('fast');
	});
});
