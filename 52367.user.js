// ==UserScript==
// @name           friendfeedTranslate
// @namespace      http://userscripts.org/scripts/show/52225
// @description    Translates friendfeed entries
// @author         Micah Wittman
// @include        http://friendfeed.com/*
// @version        0.13
// ==/UserScript==

/* 	

	Author: Micah Wittman | http://wittman.org/ | http://wittman.org/projects/friendfeedtranslate/ | http://friendfeed.com/micahwittman
	
	Versions:
        * 2009-06-24 - version 0.1.3 - Minor code cleanup. Reference copy of Google language codes added to Configuration section.

        * 2009-06-23 - version 0.1.2 - Added auto-language detection handling (in Configuration, you can set an explicit language with var languageCodeFrom; the default is set to auto-detect). Also added an autoTranslate option in Configuration. To automatically translate title/comments when a single entry page is loaded, set var autoTranslateEnabled = true;

        * 2009-06-22 - version 0.1.0 - initial release - Translates friendfeed entries from one language to another (e.g. Farsi to English). In the Configuration section of the code, you can change the language From and language To setting. When viewing a single friendfeed entry, near the upper right corner by "Tools", the the link to perform the translation will appear (e.g. Translate Farsi to English).
*/


/*
**************************************
*********** Configuration Begin ******
*/

var translateLinkText = 'Translate X to Chinese'; //The text of the translate link.
var translateReverseLinkText = 'Translate English to X'; //The text of the reverse direction translate link.

/*FOR ALL AVAILABLE GOOGLE TRANSLATION API SUPPORTED LANGUAGES SEE CODES HERE:
 http://code.google.com/apis/ajaxlanguage/documentation/reference.html#LangNameArray
 Codes as of 2009-06-24:
'AFRIKAANS':'af', 'ALBANIAN':'sq', 'AMHARIC':'am', 'ARABIC':'ar', 'ARMENIAN':'hy', 'AZERBAIJANI':'az', 'BASQUE':'eu', 'BELARUSIAN':'be', 'BENGALI':'bn', 'BIHARI':'bh', 'BULGARIAN':'bg', 'BURMESE':'my', 'CATALAN':'ca', 'CHEROKEE':'chr', 'CHINESE':'zh', 'CHINESE_SIMPLIFIED':'zh-CN', 'CHINESE_TRADITIONAL':'zh-TW', 'CROATIAN':'hr', 'CZECH':'cs', 'DANISH':'da', 'DHIVEHI':'dv', 'DUTCH': 'nl', 'ENGLISH':'en', 'ESPERANTO':'eo', 'ESTONIAN':'et', 'FILIPINO':'tl', 'FINNISH':'fi', 'FRENCH':'fr', 'GALICIAN':'gl', 'GEORGIAN':'ka', 'GERMAN':'de', 'GREEK':'el', 'GUARANI':'gn', 'GUJARATI':'gu', 'HEBREW':'iw', 'HINDI':'hi', 'HUNGARIAN':'hu', 'ICELANDIC':'is', 'INDONESIAN':'id', 'INUKTITUT':'iu', 'ITALIAN':'it', 'JAPANESE':'ja', 'KANNADA':'kn', 'KAZAKH':'kk', 'KHMER':'km', 'KOREAN':'ko', 'KURDISH': 'ku', 'KYRGYZ': 'ky', 'LAOTHIAN': 'lo', 'LATVIAN':'lv', 'LITHUANIAN':'lt', 'MACEDONIAN':'mk', 'MALAY':'ms', 'MALAYALAM':'ml', 'MALTESE':'mt', 'MARATHI':'mr', 'MONGOLIAN':'mn', 'NEPALI':'ne', 'NORWEGIAN':'no', 'ORIYA':'or', 'PASHTO':'ps', 'PERSIAN':'fa', 'POLISH':'pl', 'PORTUGUESE':'pt-PT', 'PUNJABI':'pa', 'ROMANIAN':'ro', 'RUSSIAN':'ru', 'SANSKRIT':'sa', 'SERBIAN':'sr', 'SINDHI':'sd', 'SINHALESE':'si', 'SLOVAK':'sk', 'SLOVENIAN':'sl', 'SPANISH':'es', 'SWAHILI':'sw', 'SWEDISH':'sv', 'TAJIK':'tg', 'TAMIL':'ta', 'TAGALOG':'tl', 'TELUGU':'te', 'THAI':'th', 'TIBETAN':'bo', 'TURKISH':'tr', 'UKRAINIAN':'uk', 'URDU':'ur', 'UZBEK':'uz', 'UIGHUR':'ug', 'VIETNAMESE':'vi', 'UNKNOWN':''
*/

var languageCodeFrom = ''; // Translated FROM - (Empty string '' activates auto-detect, which is the default). Language code as defined by google's translation api - original text. (e.g. '' = auto-detect, 'fa' = Farsi, etc.)
var languageCodeTo = 'zh'; //Translated TO - Language code as defined by google's translation api - translated text (e.g. 'en' = English)

var translationBackgroundColorFrom = 'rgb(240,240,240)'; //background color of original text (e.g. gray)
var translationBackgroundColorTo = 'rgb(255,245,175)'; //background color of translated text (e.g. wheat)

var autoTranslateEnabled = false; //Set to true to automatically translate title/comments when a single entry page is loaded.

/*
*********** Configuration End ***********
*/


/*** Global Variables ***/
/********************************/

var entries;
var linkContent = '<a id="translateLink" href="#" style="font-weight:bold">' + translateLinkText + '</a>';
var linkDiv = ' | <span id="translateLinkDiv" style="font-weight:normal;padding:0 3px 0 3px;">' + linkContent + '</span>';
var linkReverseDiv = '&nbsp;<a id="translateReverseLink" href="#"><span id="translateReverse">' + translateReverseLinkText + '&nbsp;</span></a>';
var languageCodeFromToUse;
var languageCodeToToUse;

/********************************/


/*** Initializing Functions ***/
/********************************/
function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
			jQuery = unsafeWindow.jQuery;
        }
    }
    if(typeof jQuery == 'undefined')
    {
		window.setTimeout(GM_wait,251);
    }
    else
    {
		$ = jQuery;
		if($('#feed').length > 0) //only continue and enter recursive loop if on a page with feed entries
		{
			letsJQuery();
		}
    }
}

function letsJQuery()
{
	entries = $('.entry');
	if(entries.length != 1) 
	{
		return; //should only function on an individual entry view (not a list of entires)
	}
	TranslateLink();
	if(autoTranslateEnabled)
	{
		autoTranslate();
	}
}



/*** Helper Functions ***/
/********************************/
function google_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.google != 'undefined')
        {
			google = unsafeWindow.google;
        }
    }
    if(typeof google == 'undefined')
    {
		window.setTimeout(google_wait,50);
    }
    else
    {
		googleApiLoad();
    }
}

function requestGoogleScript()
{
	//Request Script
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
    script.setAttribute("language", "javascript");
    script.setAttribute("src", 'http://www.google.com/jsapi');
    head.appendChild(script);
}

function setTranslationDirectionDefault()
{
	languageCodeFromToUse = languageCodeFrom;
	languageCodeToToUse = languageCodeTo;
}

function setTranslationDirectionReverse()
{
	languageCodeFromToUse = languageCodeTo;
	languageCodeToToUse = languageCodeFrom;
}

function googleLoadControllerDefault()
{
	setTranslationDirectionDefault();
	googleLoadController();
}

function googleLoadControllerReverse()
{
	setTranslationDirectionReverse();
	googleLoadController();
}

function googleLoadController()
{

    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.google != 'undefined')
        {
			google = unsafeWindow.google;
        }
    }
    if(typeof google == 'undefined')
    {
		requestGoogleScript();
		google_wait();
	}
	else
	{
		googleApiLoad();
	}
}

function googleApiLoad(){
	google.load('language','1',{"callback":googleApiLoadCallback});
}

function googleApiLoadCallback()
{
	TranslateProcess();
}

function translatedLabelText()
{
	if(languageCodeFromToUse == languageCodeTo)
	{
		return 'Translated ' + translateReverseLinkText.replace('Translate ',' ') + ' ';
	}
	else
	{
		return  'Translated ' + translateLinkText.replace('Translate ',' ');
	}
}

function autoTranslate()
{
	$('#translateLink').trigger('click');
}

function doTranslation(result)
{
	var doTran = false;
	if(languageCodeFromToUse != '')
	{
		doTran = true;
	}
	else
	{
		if(typeof result != 'undefined')
		{
			if(typeof result.detectedSourceLanguage != 'undefined')
			{
				if(result.detectedSourceLanguage != languageCodeTo)
				{
					doTran = true;
				}
			}
		}
	}
	return doTran;
}


/*** Main Processing Functions ***/
/********************************/
function TranslateLink()
{	
	$('#extralinks').find('div').eq(1).append(linkDiv);
	$('#translateLink').click(googleLoadControllerDefault);
}

function TranslateProcess()
{
	var afterClickLinkContent = '<span id="translateAfter" style="color:red;font-weight:bold">&nbsp;' + translatedLabelText() + '&nbsp;</span>';
	
	//Translate entry title
	var title = $('#feed .body .title .text:first');
	$('.friendfeedTranslate').remove();
	google.language.translate(title.text(), languageCodeFromToUse, languageCodeToToUse, function(result){
		if(doTranslation(result))
		{
			title.after('<div class="friendfeedTranslate" style="background-color:' + translationBackgroundColorTo + '">' + result.translation + '</div>');
		}
	});
	
	//Translate comments
	entries.find('.comment .content').each(function(){
		var comm = $(this);
		google.language.translate(comm.html(), languageCodeFromToUse, languageCodeToToUse, function(result){
			if(doTranslation(result))
			{
				comm.css('padding','10px 4px 4px 4px').css('background-color', translationBackgroundColorFrom);
				if(result.translation) {
					comm.after('<div class="friendfeedTranslate" style="background-color:' + translationBackgroundColorTo + ' !important;padding:4px 4px 10px 4px;margin:4px 0 4px 20px; border-bottom:1px gray solid;">' + result.translation + '</div>');
				}
			}
		});
	});
	$('#translateAfter').remove();
	$('#translateLinkDiv').hide().append(afterClickLinkContent).fadeIn(2000);
	
	$('#translateReverseLink').remove();
	if(languageCodeFrom != '')
	{
		$('#translateLinkDiv').append(linkReverseDiv);
		$('#translateReverseLink').click(googleLoadControllerReverse);
	}
	return false;
}


/********** RUN SCRIPT **********/
/********************************/
if(window.location.href.indexOf('friendfeed.com/') > -1) //greasekit doesn't support @include directs, so test URL for context
{
	GM_wait();
}



/********** Script Auto-Update Component **********/
/*************************************************/
if(typeof unsafeWindow != 'undefined')
{

	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='friendfeedTranslate';
	scriptId='52225';
	scriptVersion=0.13;
	scriptUpdateText="Minor code cleanup. Reference copy of Google language codes added to Configuration section.";
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
				var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
					var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
					if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
						GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
						newversion = document.createElement("div");
						newversion.setAttribute('id', 'gm_update_alert');
						newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
							document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					}
				}
		});
	}
}