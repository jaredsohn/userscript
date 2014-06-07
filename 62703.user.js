// ==UserScript==
// @name          OKCupid questions downloader (data compat: v2)
// @namespace     tag:brainonfire.net,2009-11-17:okcupid-questions-downloader
// @description   Download your answers to OKCupid match questions as JSON. (This takes a while.) http://www.okcupid.com/questions
// @todo          Read created questions
// @include       http://www.okcupid.com/questions
// @require       http://code.jquery.com/jquery-1.3.2.js
// @version       2.2
// @changelog     Since 2.1: Actually output JSON, not just serialized JS.
// ==/UserScript==

// For Greasemonkey users
GM_registerMenuCommand("Harvest question data", main);
// For users of other userscript plugins
$('.questions').prevAll('h2').append(" <button>Export</button>").find('button').click(main);

// personal
//var username;

// constants
var nominalPerPage = 10;
var pageBy = nominalPerPage - 2;
var questCats = ['recent', 'skipped']; // indexed by `stage`

// DOM
var loaderFrame;
var infobox;
var statusLine;
var eventList;
var outputBox;

// state
var curLow;
var questions = {};
var stage = 0;
var hasStarted = false;

/**
 * Run main sequence.
 */
function main() {
//	username = unsafeWindow.SCREENNAME;
	makeGUI();
	hasStarted = true; // uncomment this to prevent full run (will make GUI and ask for one page)

	prepForScrape_();
}

/**
 * Create infobox and loader frame.
 */
function makeGUI() {
	infobox = document.createElement('div');
	infobox.id = "qdown-info";
	$(infobox).css({border:"1px solid black", position:"absolute", width:"500px", right:"0px", top:"0px", "background-color":"#aaa", opacity:".9", "z-index":300});
	
	statusLine = document.createElement('p');
	$(statusLine).css({border:"3px solid black", font:"bold 15px monospace", padding:"5px", "min-height":"3em"})
	             .text("Initializing...");
	infobox.appendChild(statusLine);
	
	eventList = document.createElement('ol');
	$(eventList).css({border:"1px solid green", "overflow-y":"scroll", height:"6em", margin:"5px auto", width:"95%"});
	infobox.appendChild(eventList);
	
	outputBox = document.createElement('textarea');
	outputBox.setAttribute('rows', 10);
	$(outputBox).css({width:"95%", display:'block', margin:"10px auto"});
	outputBox.value = "Output JSON will appear here..."
	infobox.appendChild(outputBox);
	
	loaderFrame = document.createElement('iframe');
	loaderFrame.id = "qdown-loader";
	$(loaderFrame).css({width:"95%", display:'block', margin:"5px auto", border:"1px solid yellow", height:"100px"});
	infobox.appendChild(loaderFrame);

	document.body.appendChild(infobox);
	
	// activate
	
	loaderFrame.addEventListener('load', receivePage_, false);
}

/**
 * Finish XHR chain, display results.
 */
function finish()
{
  // Remove this line for older Firefox and Chrome that don't have JSON object:
  var uneval = JSON.stringify;

	outputBox.value = uneval({data: questions, /*# Questions #*/
	                          version: 2, /*# Integer:2 #*/
	                          date: new Date().toUTCString() /*# String (date in RFC 822 with UTC timezone) #*/
	});
	
	updateStatus('Done!');
}

/*=====================*
 * Core loop functions *
 *=====================*/

/**
 * 0. Gather required info for scraping answered questions.
 */
function prepForScrape_()
{
	GM_log('Starting stage '+stage+': '+questCats[stage]);

	curLow = 1;
	
	scrapeRest_();
}

/**
 * 1. Start a request for the current offset.
 */
function scrapeRest_()
{
	updateStatus('Requesting at most '+nominalPerPage+' questions starting at #'+curLow);
	
	loaderFrame.src = '/questions?low='+curLow+'&'+questCats[stage]+'=1'; // goto 2 (trigger)
}

/**
 * 2. Harvest data from loaded page.
 */
function receivePage_()
{
	if(!hasStarted) {
		return; // don't fire for initializing iframe
	}
	
	updateStatus('Loaded page starting at '+curLow);
	
	var qs = jQuery(".questions .question", loaderFrame.contentDocument);
	if(qs.length == 0) {
		return bumpStage_(); // goto 3
	}
	qs.each(processQuestion);
	
	curLow += pageBy;
	scrapeRest_(); // goto 1
}

function processQuestion(i, el) {
	//updateStatus("Reading "+i+"th question.");

	var $q = jQuery(el);

	var qID = $q.attr('id').replace(/^question_([0-9]+)$/, '$1');
	var qHTML = $q.find('p.qtext').html();
	var isSkipped = $q.hasClass('not_answered');

	var explanation = null;
	var isPublic = null;	
	var importance = null;
	var answers = null;

	if(!isSkipped) {
		explanation = $q.find('.explanation').text() | null;
		isPublic = $q.hasClass('public');
		importance = 5 - Number($q.find('input#question_'+qID+'_importance').attr('value')); // regularize from [5,1] to [0,4]
		answers = {};
		$q.find('.self_answers > li').each(function processAnswer(i, el) {
			var $a = $(el);
			var aID = Number($a.attr('id').replace(/.*_/gi, ''));
			var aText = $a.html();
			var isMine = $a.hasClass('mine');
			var isMatch = $a.hasClass('match');
			answers[aID] = {
				text: aText, /*# String #*/
				isMine: isMine, /*# Boolean (true if I answered this way) #*/
				isMatch: isMatch /*# Boolean (true if ideal match would answer this way) #*/
			};
		});
	}

	questions[qID] = {
		text: qHTML, /*# String #*/
		isSkipped: isSkipped, /*# Boolean #*/
		/*# Null if isSkipped */
		explanation: explanation, /*# String #*/
		isPublic: isPublic, /*# Boolean #*/
		importance: importance, /*# Integer:[0,4] (irrelevant to mandatory) #*/
		answers: answers /*# Answers #*/
		/* #*/
	};
}

/**
 * 3. Jump to next stage.
 */
function bumpStage_() {
	updateStatus("Done with stage "+stage+": "+questCats[stage]);
	stage++;
	if(stage >= questCats.length) {
		return finish();
	}
	
	prepForScrape_(); // goto 0
}

/*==================*
 * Helper functions *
 *==================*/

/**
 * Update the status text.
 */
function updateStatus(msg)
{
	GM_log('Status: ' + msg);
	$(statusLine).text(msg);
	
	var line = document.createElement('li');
	line.appendChild(document.createTextNode(msg));
	eventList.appendChild(line);
}
