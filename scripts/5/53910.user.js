// ==UserScript==
// @name           friendfeedPoll
// @namespace      http://wittman.org/projects/friendfeedpoll/
// @description    Report statistics on a friendfeed thread used as a poll/survey
// @author         Micah Wittman
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// @version        0.11
// ==/UserScript==

/* 	

	Author: Micah Wittman | http://wittman.org/ | http://wittman.org/projects/friendfeedpoll/ | http://friendfeed.com/micahwittman
	
	Versions:
    	* 2009-09-27 - version 0.1.1 - Added auto-refresh of poll calculation upon comments being added (or deleted). Poll still initiated by clicking Calculate Poll.
	
    	* 2009-07-17 - version 0.1.0 - Initial release - Report statistics on a friendfeed thread used as a poll/survey. To customize possible answers (between 2 and 5 answers supported), in Configuration set answer1Array and answer2Array (and arrays 3 to 5 optionally). Each array can contain a single version of the answer word/phrase or multiple such as var answer1Array = ["Yes","Affirmative", "Absolutely"]; When viewing an individual post, the link Calculate Poll appears in the upper right corner of the page - click it to run or re-run a poll report.
    	
*/


/*
**************************************
*********** Configuration Begin ******
*/

var startPollLinkText = 'Calculate Poll'; //Text of link to initiate comment anchors

var answer1Array = ['Yes','Yep','Yup']; //Answer 1 - not case sensitive - an array of one or more variations of the answer phrase e.g ['Yes', 'Yup']
var answer2Array = ['No','Nope']; //Answer 2 - not case sensitive - an array of one or more variations of the answer phrase e.g ['No', 'Nope']
var answer3Array = ['']; // (Optional) Answer 3 - not case sensitive - an array of one or more variations of the answer phrase e.g ['Sometimes']
var answer4Array = ['']; // (Optional) Answer 4 - not case sensitive - an array of one or more variations of the answer phrase e.g ['Often']
var answer5Array = ['']; // (Optional) Answer 5 - not case sensitive - an array of one or more variations of the answer phrase e.g ['Once']

var color1 = '#806000';
var color2 = '#87463B';
var color3 = '#B36800';
var color4 = '#800060';
var color5 = '#D64B00';
var colorAmbiguous = 'gray';


/*
*********** Configuration End ***********
*/




/*** Global Variables ***/
/********************************/
var entries;
var commentCount = 0;
var pollRenderCount = 0;
var protocol = 'http://';
var onlyUseSecureProtocolCompatibleFeatures;
var isOneEntry;

var linkContent = '<a id="pollLink" href="#" style="font-weight:bold">' + startPollLinkText + '</a>';
var linkDiv = ' | <span id="pollLinkDiv" style="font-weight:normal;padding:0 3px 0 3px;">' + linkContent + '</span>';

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
	makeArraysAtLeastOneElement();
	entries = $('.entry');
	setProtocol();
	setIsOneEntry();
	
	if(isOneEntry)
	{
		PollLink();
	}
}



/*** Helper Functions ***/
/********************************/
function setProtocol()
{
	protocol = window.location.protocol + '//';
	if(protocol == 'http://')
	{
		onlyUseSecureProtocolCompatibleFeatures = false; //not a secure connection, so use all features
	}
}

function setIsOneEntry()
{
	if($('.entry').length == 1)
	{
		isOneEntry = true;
	}
	else
	{
		isOneEntry = false;
	}
}

function makeArraysAtLeastOneElement()
{
	if(answer1Array.length == 0){ answer1Array = [''];}
	if(answer2Array.length == 0){ answer2Array = [''];}
	if(answer3Array.length == 0){ answer3Array = [''];}
	if(answer4Array.length == 0){ answer4Array = [''];}
	if(answer5Array.length == 0){ answer5Array = [''];}
}

function answerMatch(answerArray, text)
{
	var matchInt = 0;
	var re;
	$.each(answerArray, function(){
		answer = $.trim(this);
		if(answer != '')
		{
			re = new RegExp('^' + answer + '|([^a-z]' + answer + '[^a-z])|([^a-z]' + answer + '$)', 'i');
			if(text.toLowerCase().match(re) != null)
			{
				matchInt = 1; 
			}
		}
    });
	return matchInt;
}

function buildResult(answerTotal, answerArray)
{
	if(answerTotal > 0)
	{
		return ' | ' + answerArray[0] + ':' + answerTotal;
	}
	else
	{
		return '';
	}
}

function buildFormattedResult(corpus, color)
{
	if(corpus != '')
	{
		return '<div style="padding:2px; margin:12px 0 8px 5px;border-top: solid 1px rgb(100,100,100);font-size:.9em;color:' + color + '">' + corpus + '</div>';
	}
	else
	{
		return '';
	}
}

function pollProcessOnCommentCountChange()
{
	var commentCountNow = $('.comment .content').length;
	if(commentCount != commentCountNow)
	{
		commentCount = commentCountNow;
		PollProcess();
	}
}

function pollProcessOnCommentCountChange_wait()
{
	pollProcessOnCommentCountChange();
	window.setTimeout(pollProcessOnCommentCountChange_wait,251);
}


/*** Main Processing Functions ***/
/********************************/
function PollLink()
{	
	if($('#PollLink').length == 0)
	{
		$('#extralinks').find('div').eq(1).append(linkDiv);
		$('#pollLink').click(Poll);
	}
}

function Poll()
{	
	PollProcess();
	pollProcessOnCommentCountChange_wait();
}

function PollProcess()
{
	var ffPoll_results = '';
	var others = '';
	var commentDiv = $('.entry');
	var comments = $('.comment .content');
	var ambig = 0;
	var answer1 = 0; var answer2 = 0; var answer3 = 0; var answer4 = 0; var answer5 = 0;
	var answer1Total = 0; var answer2Total = 0; var answer3Total = 0; var answer4Total = 0; var answer5Total = 0;
	var answerCombinedCount = 0;
	var text;
	var corpus1 = ''; var corpus2 = ''; var corpus3 = ''; var corpus4 = ''; var corpus5 = '';
	var matchedSpan = '<span style="color:rgb(50,50,50)">';
	
	comments.each(function(){
		text = $(this).text();
		answer1 = answerMatch(answer1Array, text); answer2 = answerMatch(answer2Array, text); answer3 = answerMatch(answer3Array, text); answer4 = answerMatch(answer4Array, text); answer5 = answerMatch(answer5Array, text);
		
		answerCombinedCount = answer1 + answer2 + answer3 + answer4 + answer5;
		if(answerCombinedCount != 1)
		{
			ambig++;
			others = others + '<br />' + matchedSpan + '(?): ' + '</span>' + text;
		}
		else
		{
			answer1Total += answer1; answer2Total += answer2; answer3Total += answer3; answer4Total += answer4; answer5Total += answer5;
		}
		
		if(answer1 > 0 && answer2 + answer3 + answer4 + answer5 == 0){corpus1 = corpus1 + '<br />(' + matchedSpan + answer1Array[0] + '</span>' + '): ' + text;}
		if(answer2 > 0 && answer1 + answer3 + answer4 + answer5 == 0){corpus2 = corpus2 + '<br />(' + matchedSpan + answer2Array[0] + '</span>): ' + text;}
		if(answer3 > 0 && answer1 + answer2 + answer4 + answer5 == 0){corpus3 = corpus3 + '<br />(' + matchedSpan + answer3Array[0] + '</span>): ' + text;}
		if(answer4 > 0 && answer1 + answer2 + answer3 + answer5 == 0){corpus4 = corpus4 + '<br />(' + matchedSpan + answer4Array[0] + '</span>): ' + text;}
		if(answer5 > 0 && answer1 + answer2 + answer3 + answer4 == 0){corpus5 = corpus5 + '<br />(' + matchedSpan + answer5Array[0] + '</span>): ' + text;}
	});
	
	answerGrandTotalCount = answer1Total + answer2Total + answer3Total + answer4Total + answer5Total + ambig;
	
	var ffPoll_title = commentDiv.parent().find('.title .name').next().eq(0);
	var ffPoll_titleText = ffPoll_title.text()
	var ffPoll_results = "\r\n\r\n";


	if(answer1Total > 0)
	{
		ffPoll_results += answer1Array[0] + ':' + answer1Total;
	}

	ffPoll_results += buildResult(answer2Total, answer2Array);
	ffPoll_results += buildResult(answer3Total, answer3Array);
	ffPoll_results += buildResult(answer4Total, answer4Array);
	ffPoll_results += buildResult(answer5Total, answer5Array);
	
	if(ambig > 0)
	{
		ffPoll_results += ' | ' + '(?)' + ':' + ambig;
	}
	
	if(pollRenderCount == 0)
	{
		alert(ffPoll_titleText + ffPoll_results);
	}
	
	$('.ffPoll').hide(); //hide previously inserted if exists
	
	ffPoll_title.after(
		'<div class="ffPoll" style="margin:4px;padding:4px;font-size:1em;font-weight:bold;color:red"><div style="margin: 8px 0 8px 0;padding:8px;color:red;border:1px solid red;padding:5px">' + '(Of ' + answerGrandTotalCount + '): ' + ffPoll_results + '' 
			+ buildFormattedResult(others, colorAmbiguous)
			+ buildFormattedResult(corpus1, color1)
			+ buildFormattedResult(corpus2, color2)
			+ buildFormattedResult(corpus3, color3)
			+ buildFormattedResult(corpus4, color4)
			+ buildFormattedResult(corpus5, color5)
			+ '</div>'
	);

	pollRenderCount++;
	
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
if( (!onlyUseSecureProtocolCompatibleFeatures) && (typeof unsafeWindow != 'undefined') )
{

	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='friendfeedPoll';
	scriptId='53910';
	scriptVersion=0.11;
	scriptUpdateText='version 0.1.1 - Added auto-refresh of poll calculation upon comments being added (or deleted). General Information: Report statistics on a friendfeed thread used as a poll/survey. To customize possible answers (between 2 and 5 answers supported), in Configuration set answer1Array and answer2Array (and arrays 3 to 5 optionally). Each array can contain a single version of the answer word/phrase or multiple such as var answer1Array = ["Yes","Affirmative", "Absolutely"]; When viewing an individual post, the link Calculate Poll appears in the upper right corner of the page - click it to run or re-run a poll report.';
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