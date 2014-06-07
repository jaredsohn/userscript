// ==UserScript==
// @name           SpamBayes for Youtube (DIY Stupidity Filter)
// @namespace      gcalpo
// @description    Bayesian spam filtering for Youtube comments
// @include        http://*youtube.com/watch*
// @include        http://*youtube.com/comment_servlet?all_comments*
// ==/UserScript==

/*****HISTORY*********************************************************************************

	version 0.2 (2007-11-14)
	- filters all comments (not just the the first page)
	- ability to train filter directly from the YouTube comment
	- color coding based on score (red/yellow/green, dictated by spamLimit and hamLimit)
	- shows "Train as Ham" for known spam 
	- shows "Train as Spam" for known non-spam 
	- code cleanup

	version 0.1 (2007-11-13)
	- proof of concept

********************************************************************************************/

const 	spamLimit = 0.85, 
		hamLimit = 0.20,
		sbServer = 'http://localhost:8880/'; // don't forget the last slash

var WatchTimer;

initPageChangeMonitor();
FilterYouTube();

/********************************************************************************************/
function initPageChangeMonitor() {

	// watches for page-changes in the Comments div by 
	// capturing clicks on links in the Page selection bar 
	
	var anchors= document.getElementsByTagName('a');
	var nrAnchors = anchors.length;
	for (var i = 0; i < nrAnchors; i++) {
		var a = anchors[i];

		// the 2nd half is for the link to "Oldest" comments
		if (descendantOfPagination(a)) {
			a.parentNode.addEventListener("click", WaitToFilterYouTube, true);		
		}
	}

	// watch the comment-filter dropdown too
	var ctDDLs = document.getElementsByTagName('select');
	var nrDDLs = ctDDLs.length;
	for (var i = 0; i < nrDDLs; i++) {
		if (ctDDLs[i].name == 'commentthreshold') {
			ctDDLs[i].addEventListener("change", WaitToFilterYouTube, true);			
		}
	}
	
}
/********************************************************************************************/
function descendantOfPagination(a) {
	var target = a;
	var b = false;
	while (target.parentNode) {
		if (target.parentNode.className && target.parentNode.className.match(/commentPagination/)) {
			b = true;
		}
		target = target.parentNode; // keep going
	}
	return b;
}
/********************************************************************************************/

function WaitToFilterYouTube() {
	// wait until new comments have loaded before re-running filter
	//alert('waiting...');
	clearInterval(WatchTimer); // for good measure
	WatchTimer = setInterval(WatchForNewComments, 100);
}
/********************************************************************************************/
function WatchForNewComments() {
	var divRC = document.getElementById('recent_comments');
	if (divRC.innerHTML.match(/comment_body/)) {
		clearInterval(WatchTimer); 
		FilterYouTube();
		initPageChangeMonitor();
	}
}
/********************************************************************************************/
function FilterYouTube() {
	var divs = document.getElementsByTagName('div');
	var nrDivs = divs.length;
	for (var i = 0; i < nrDivs; i++) {
		var thisDiv = divs[i];
		if (thisDiv.className.match(/commentBody/)) {
			filterDiv(thisDiv);
		}
	}
}
/********************************************************************************************/
function addTraining(theMode, div) {

	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'float: right; cursor: pointer;');
	newdiv.style.width = '85px';
	newdiv.style.borderBottom = '1px dotted #808080';
	newdiv.style.fontSize = '11px';
	newdiv.style.textAlign = 'center';
	newdiv.style.margin = '3px';
	
	if (theMode == 'HAM') {
		newdiv.innerHTML = "Train as Spam";
		newdiv.style.color = '#FF0000';
		newdiv.addEventListener("click", TrainAsSpam, true);
	}
	else {
		newdiv.innerHTML = "Train as Ham";
		newdiv.style.color = '#0000FF';
		newdiv.addEventListener("click", TrainAsHam, true);
	}
   
	div.parentNode.insertBefore(newdiv, div);

}
/********************************************************************************************/
function TrainAsSpam(){ 
	var div = this.nextSibling;
	this.style.display = 'none';
	trainOnDiv(div, "Train as Spam");
}
/********************************************************************************************/
function TrainAsHam(){ 
	var div = this.nextSibling;
	this.style.display = 'none';
	trainOnDiv(div, "Train as Ham");
}
/********************************************************************************************/
function trainOnDiv(div, cmd){

	var targetURL = sbServer + 'train';
	targetURL +=  '?file='+encodeURIComponent("");
	targetURL +=  '&which='+encodeURIComponent(cmd)
	targetURL +=  '&text='+encodeURIComponent(div.innerHTML)
	
	GM_xmlhttpRequest({

	method: 'GET',
	url: targetURL,
	headers: {
	  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	 'Accept': 'application/atom+xml,application/xml,text/xml',
	},

	
	onload: function(responseDetails) {
		var HTML = responseDetails.responseText;
		if (HTML.match(/Saving... Done/)) {
			alert(cmd + ' complete!');
		   }   
		else {
			alert ('TRAINING ERROR: ' + HTML);
		}
		
	}
	});
}
/********************************************************************************************/
function filterDiv(div){

	var targetURL = sbServer + 'classify';
	targetURL +=  '?file='+encodeURIComponent("");
	targetURL +=  '&which='+encodeURIComponent("Classify")
	targetURL +=  '&text='+encodeURIComponent(div.innerHTML)
	
	GM_xmlhttpRequest({

	method: 'GET',
	url: targetURL,
	headers: {
	  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	 'Accept': 'application/atom+xml,application/xml,text/xml',
	},

	
	onload: function(responseDetails) {

		var HTML = responseDetails.responseText;

		var theScore = getProbability(HTML);
		if (theScore >= spamLimit) {
			flagSpammyDiv(div, theScore);
			addTraining('SPAM',div);
		} 	
		else {
			flagHammyDiv(div, theScore);
			addTraining('HAM',div);
		}
		
	}
	});
}
/********************************************************************************************/
function getProbability(HTML) {
	// ORIGINAL TEXT:
	// <b id="probability">3.72% (0.0372067400168)</b>
	var Label = '<b id="probability">';
	var posLabel = HTML.indexOf(Label);
	
	HTML = HTML.substring(posLabel + Label.length);

	Label = '(';
	posLabel = HTML.indexOf(Label);
	
	HTML = HTML.substring(posLabel + Label.length);
	
	posLabel = HTML.indexOf(')');

	HTML = HTML.substring(0, posLabel);
	HTML -= 0;

	return HTML;
	
}	
/********************************************************************************************/
function flagHammyDiv(div, theScore) {
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'float: right');
	newdiv.style.color = (theScore < hamLimit) ? '#00A000': '#A0A000';
	newdiv.style.width = '100px';
	newdiv.style.textAlign = 'right';
	newdiv.style.paddingRight = '5px';
	newdiv.style.paddingTop = '3px';
	newdiv.innerHTML = "Score: <strong>" + roundScore(theScore) + "</strong>" 
	div.parentNode.insertBefore(newdiv, div);
}
/********************************************************************************************/
function flagSpammyDiv(div, theScore) {
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'float: right');
	newdiv.style.color = '#d8d8d8;'
	newdiv.style.width = '100px';
	newdiv.style.textAlign = 'right';
	newdiv.style.paddingRight = '5px';
	newdiv.style.paddingTop = '3px';
	newdiv.innerHTML = "Score: <strong>" + roundScore(theScore) + "</strong>"
	div.parentNode.insertBefore(newdiv, div);
	div.style.fontSize = '11px';
	div.style.color = '#e0e0e0';
}
/********************************************************************************************/
function roundScore(score) {
	return (Math.round(score * 1000) / 10);
}
/********************************************************************************************/
