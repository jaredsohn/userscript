var scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name                Sleep Tweet My Fit Bits
// @namespace	        http://playerx.net/
// @description	        Script to help users Tweet about their Fitbit sleep statistics.
// @copyright  		2011 @px
// @version	        0.0.9
// @license        	LGPL http://www.gnu.org/licenses/lgpl.html

// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require		https://platform.twitter.com/widgets.js

// ugh such a pain, I may have missed one or two.
// @include		http://www.fitbit.com/*
// @include		https://www.fitbit.com/*
// @include		http://www.fitbit.com/sleep/*
// @include		https://www.fitbit.com/sleep/*

// @exclude		https://fitbit.com/foods*
// @exclude		https://fitbit.com/activities*
// @exclude		https://fitbit.com/weight*
// @exclude		https://fitbit.com/product*
// @exclude		https://fitbit.com/premium*
// @exclude		https://fitbit.com/apps*
// @exclude		https://fitbit.com/journal*
// @exclude		https://fitbit.com/user*
// @exclude		https://fitbit.com/community*

// @exclude		https://*.fitbit.com/foods*
// @exclude		https://*.fitbit.com/activities*
// @exclude		https://*.fitbit.com/weight*
// @exclude		https://*.fitbit.com/product*
// @exclude		https://*.fitbit.com/premium*
// @exclude		https://*.fitbit.com/apps*
// @exclude		https://*.fitbit.com/journal*
// @exclude		https://*.fitbit.com/user*
// @exclude		https://*.fitbit.com/community*

// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

// check to see if there is a logged sleepFoo to tweet.

// TODO: check for multiple sleeps

//function encodeTxt(t) {
//return $(this).text(t).html();
//}


if ( $(document).ready() && document.getElementById("sleepChartLabel") ) {


// div id=sleepFooIndicator
// contains label text, and percentage is in a span.
// Your sleepFoo efficiency
// percentage

// ul id=sleepFooSummary
// li class=first
// metrics:
// span, You went to bed at
// span, time of day

// span, Time to fall asleepFoo
// span, time in minutes

// span, Times awakended
// span, int

// span, You were in bed for
// span, time span in hours and minutes


// you went to bed at
// time to fall asleep
// times awakended
// you were in bed for
// actual sleep time

function myText() {
	var sleepIndicatorPerc = $("#sleepIndicator span span").text().trim();
	// odd is the metrics
	// even is the labels
	var sleepSummary = $("#sleepSummary span");//  .text();
	var sleepText=sleepIndicatorPerc;

	sleepSummary.each(function(index) {
		// on odd numbers insert a space
		if (index%2 == 1 || index == 0) {
			sleepText=sleepText+" "+ $(this).text().trim();
		} 
		else  // even numbers insert newline
		{
			sleepText=sleepText+"\n"+ $(this).text().trim();
		}
		//    alert(index + ': ' + $(this).text().trim());
	});

//alert(sleepText);
return sleepText;

};


function hashMe(text, hargs) {

// TODO: check to see we're not over the char limit.
	var patt = /(fitstats|sleep|time|bed|awakened|asleep)/g;
	text=String(text).replace(patt, 
	function(wholematch,firstmatch)
	  {var i = +firstmatch; return i < hargs.length ? escape('1#')+hargs[i] : escape('#')+wholematch;}
	);
return (text);
};

function tweetURL(t) {
	t=escape(t);

	var arr = new Array("fitstats","sleep","time","bed","awakened","asleep");
	// words we want to hashtag.
	/* 
	 30% You went to bed at 2:46AM
	 Time to fall #asleep 20min
	 Times #awakened 19
	 You were in #bed for 9hrs 24min
	 Actual #sleep #time 2hrs 38min
	*/
	// make our array words into hashtags
	t=hashMe(t,arr);
	// debug
	//alert(t);
	
	t=String(t).replace(/ /g, '+');
	var m="text="+t;
	var treply="";
	//treply='&in_reply_to=149301864687603712';
	
	//var htags ="&hashtags=" + escape("fitstats,sleep,time,bed,awakened,asleep");
	var hashtags ="&hashtags=" + escape("fitstats,sleep,time,bed,awakened,asleep");
	var trelated="&related=" + "ns1net:Internet%20Help,px:Sleep%20Tweet%20My%20Fit%20Bits%20Script%20Author,fitbit:Cool%20Hardware";
	//var trelated="&related=" + escape("px:For more fun!,fitbit:For more cool hardware.");
	
	// add a url
	var sleepURL="&url="+ "http://fitbit.com/";
	
	// don't really need the hashtags and sleepURL
	return 'https://twitter.com/intent/tweet/?'+m  + trelated;
};


function replaceH2(sleepTxt) {
	// create a new h2 to replace below
	var t2 = document.createElement('h2');
	
	var t= document.createElement('a');
	t.href = tweetURL(sleepTxt);
	t.target = '_blank';
	t.id = 'tweetURL';
	t.style.color = "white";
	t.appendChild(document.createTextNode('Tweet Your #Sleep!'));
	t2.appendChild(t);
	
	// place our link/button
	$("#sleep div div h2").replaceWith(t2);	
};

function addButton(sleepTxt) {

	var t= document.createElement('a');
	t.href = tweetURL(sleepTxt);
	t.target = '_blank';
	t.id = 'tweetURL';
	t.style.color = "white";
	t.class="twitter-hashtag-button";
	
	t.appendChild(document.createTextNode('Tweet Your #Sleep!'));
	//t.data-lang="en";
	//t.data-related="px";
	
	// place our link/button
	$("#sleep").append(t).append('<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
	
};

// Maybe make it look like this button
// <input id="logSleepButton" style="clear: both; float: left; margin: 0 0 0 0" name="logSleepButton" value="Tweet Sleep" class="button track-Logging-Click-LogSleep" type="submit" />

// replace the "Sleep" title with my tweet one.
replaceH2(myText());

//addButton(myText());

// debug
//sleepSummary.each(function(index) {
//    alert(index + ': ' + $(this).text().trim());
//	$("#twTxt").append(' ');
//    $("#twTxt").append( $(this).text() );
//});

};
