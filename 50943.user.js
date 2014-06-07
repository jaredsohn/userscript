// ==UserScript==

// @name           SpamBayes for 4chan

// @namespace      gcalpo and Anonymous
// @description    Filters 4chan posts based on a Bayesian spam filter, borrowed heavily from SpamBayes for Youtube (DIY Stupidity Filter)

// @include        http://*.4chan.org/*
// @include        http://*.7chan.org/*
// @include        https://*.7chan.org/*
// @include        http://*.fapchan.org/*

// ==/UserScript==


const 	spamLimit = 0.85, 
	hamLimit = 0.20,
	sbServer = 'http://localhost:8880/';

var spamPosts = new Array();

Filter4chan();

function Filter4chan() {
	var divs = document.getElementsByTagName('blockquote');
	var nrDivs = divs.length;
	for (var i = 0; i < nrDivs; i++) {
		var thisDiv = divs[i];
		filterDiv(thisDiv);
	}
}

//Sends a section of HTML between tags to SpamBayes to classify.
//param div The node of HTML you want to filter.
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

//The next two functions changes the color on the score shown by posts to reflect if their spam or ham.
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


function flagSpammyDiv(div, theScore) {
	var newdiv = document.createElement('div');
	var olddiv = div;
	newdiv.setAttribute('style', 'float: right');
	newdiv.style.color = '#FF0000';
	newdiv.style.width = '100px';
	newdiv.style.textAlign = 'right';
	newdiv.style.paddingRight = '5px';
	newdiv.style.paddingTop = '3px';
	newdiv.innerHTML = "Score: <strong>" + roundScore(theScore) + "</strong>"
	div.parentNode.insertBefore(newdiv, div);
	
}

function roundScore(score) {
	return (Math.round(score * 1000) / 10);
}

//Adds the training links to each post.
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
		addOther('SPAM', div);
	}
	else {
		newdiv.innerHTML = "Train as Ham";
		newdiv.style.color = '#0000FF';
		newdiv.addEventListener("click", TrainAsHam, true);
		addOther('HAM', div);
		if(div.parentNode.innerHTML.indexOf('nothread') == -1){
			div.parentNode.style.display = 'none';

			//Added this next part to put in the hiding function for those posts marked as spam.
			var newdiv2 = document.createElement('div');
			newdiv2.setAttribute('style', 'float: right; cursor: pointer;');
			newdiv2.style.width = '85px';
			newdiv2.style.borderBottom = '1px dotted #808080';
			newdiv2.style.fontSize = '11px';
			newdiv2.style.textAlign = 'center';
			newdiv2.style.margin = '3px';
			newdiv2.innerHTML = "Unhide";
			newdiv2.style.color = '#FF0000';
			newdiv2.addEventListener("click", function() { div.parentNode.style.display = ''; hide(this, div.parentNode);}, true);

			div.parentNode.parentNode.insertBefore(newdiv2, div.parentNode);
		}
	}
   
	div.parentNode.insertBefore(newdiv, div);

}

function addOther(theMode, div){
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
		newdiv.addEventListener("click", TrainAsSpamSpam, true);
	}
	else {
		newdiv.innerHTML = "Train as Ham";
		newdiv.style.color = '#0000FF';
		newdiv.addEventListener("click", TrainAsHamHam, true);
	}
   
	div.parentNode.insertBefore(newdiv, div);
}

//Adds Hide button for unhidden spam posts.
function hide(div1, div){
	div1.style.display = 'none';
	
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'float: right; cursor: pointer;');
	newdiv.style.width = '85px';
	newdiv.style.borderBottom = '1px dotted #808080';
	newdiv.style.fontSize = '11px';
	newdiv.style.textAlign = 'center';
	newdiv.style.margin = '3px';

	newdiv.innerHTML = "Hide";
	newdiv.style.color = '#FF0000';
	newdiv.addEventListener("click", function() { div.style.display = 'none'; unhide(this, div);}, true);
	div.parentNode.insertBefore(newdiv, div.nextSibling);
}

//Adds unhide button for hidden spam posts.
function unhide(div1, div){
	div1.style.display = 'none';
	
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'float: right; cursor: pointer;');
	newdiv.style.width = '85px';
	newdiv.style.borderBottom = '1px dotted #808080';
	newdiv.style.fontSize = '11px';
	newdiv.style.textAlign = 'center';
	newdiv.style.margin = '3px';

	newdiv.innerHTML = "Unhide";
	newdiv.style.color = '#FF0000';
	newdiv.addEventListener("click", function() { div.style.display = ''; hide(this, div);}, true);
	div.parentNode.insertBefore(newdiv, div);
}

//Next two functions send off a post to be trained as spam or ham based on what link you clicked.
function TrainAsSpam(){ 
	var div = this.nextSibling;
	this.style.display = 'none';
	//GM_log(div.innerHTML);
	trainOnDiv(div, "Train as Spam");
}

//This is needed as, for some reason, the hidden post feature likes to make this.nextSibling be the Train as Ham button on spam posts. 
function TrainAsSpamSpam(){
	var div = this.nextSibling.nextSibling;
	this.style.display = 'none';
	//GM_log(div.innerHTML);
	trainOnDiv(div, "Train as Spam");
}

function TrainAsHam(){ 
	var div = this.nextSibling;
	this.style.display = 'none';
	//GM_log(div.innerHTML);
	trainOnDiv(div, "Train as Ham");
}

//This is needed as, for some reason, the hidden post feature likes to make this.nextSibling be the Train as Spam button on ham posts.
function TrainAsHamHam(){
	var div = this.nextSibling.nextSibling;
	this.style.display = 'none';
	//GM_log(div.innerHTML);
	trainOnDiv(div, "Train as Ham");
}

//Sends a post to be trained as spam or ham by SpamBayes.
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
			//alert(cmd + ' complete!');
		   }   
		else {
			alert ('TRAINING ERROR: ' + HTML);
		}
		
	}
	});
}

//Gets the probability of a post being spam from SpamBayes
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