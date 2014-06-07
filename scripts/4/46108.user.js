// ==UserScript==
// @name           Reddit Reveal Score Take 2
// @description		Reveals the score of stories which aren't displaying their score on the browse page.
// @namespace		http://www.reddit.com/user/juneof44/
// @include			http://reddit.com/*
// @include			http://*.reddit.com/*
// @exclude			http://*.reddit.com/r/*/comments/*
// @exclude			http://reddit.com/r/*/comments/*
// @version            0.2
// ==/UserScript==

//simplified version of http://userscripts.org/scripts/review/11730

//special thanks to: 
//  tritelife (http://www.reddit.com/user/tritelife/) for informing me of .json 
//  burkadurka (http://www.reddit.com/user/burkadurka/) for the awesome ideas of a red border and hooking up the score changing after vote

/*
Version 0.2 (April 13, 2009) => 	Changed the JSON url generation to work with querystring pages.
												Fixed issue with json check being executed when nothing to update
												Fixed 0 score not showing up
*/


// get jQuery from Reddit
$ = unsafeWindow.jQuery;

var awaitingClassName = 'awaiting_score'

function addScoreToElem(elem, score){

	elem.css('border', 'dashed red 1px')
		.html(score.toString())
		.removeClass('awaiting_score');

	//add script to change 
	score = parseInt(score);
	var thingID = elem.parents('.thing').attr('class').match(/id-([^ ]+)/i)[1]
	elem.after('<script type="text/javascript">if(reddit) reddit.vl[\'' + thingID + '\'] = [\'' + (score-1) + '\', \'' + score + '\', \'' + (score+1) + '\' ];</script>'); // if this script tag is in place Reddit takes care of changing the score when you vote
}


function getIndivScore(scoreElem) {
	var url=scoreElem.parents('.thing').find('.title a').attr('href');
	$.get('http://www.reddit.com/button_content?t=2&url=' + url, function(res){
		var pMatch = res.match(/class="score ">(\d*)/i)
		var score = '?' //default value for score
		if (pMatch!==null){score= pMatch[1]} //if the results contained a score, use it
		addScoreToElem(scoreElem, score)
	})
}



//start

//add an activity indicator and pass the element off to be checked
$('.score:contains("•")').each(function(){
	var A = $(this)
	if(A.parents('.thing').is(':visible')){ //don't want the organic table hidden elements
		A.html('<img src ="data:image/gif;base64,R0lGODlhEAAQAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv///////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAEAAQAAAESBDJiQCgmFqbZwjVhhwH9n3hSJbeSa1sm5GUIHSTYSC2jeu63q0D3PlwCB1lMMgUChgmk/J8LqUIAgFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UKgmFqbpxDV9gAA9n3hSJbeSa1sm5HUMHTTcTy2jeu63q0D3PlwDx2FQMgYDBgmk/J8LqWPQuFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YSgmFqb5xjV9gQB9n3hSJbeSa1sm5EUQXQTADy2jeu63q0D3PlwDx2lUMgcDhgmk/J8LqUPg+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+cagmFqbJyHV9ggC9n3hSJbeSa1sm5FUUXRTEDy2jeu63q0D3PlwDx3FYMgAABgmk/J8LqWPw+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+QihmFqbZynV9gwD9n3hSJbeSa1sm5GUYXSTIDy2jeu63q0D3PlwDx3lcMgEAhgmk/J8LqUPAOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UqhmFqbpzHV9hAE9n3hSJbeSa1sm5HUcXTTMDy2jeu63q0D3PlwDx0FAMgIBBgmk/J8LqWPQOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YyhmFqb5znV9hQF9n3hSJbeSa1sm5EUAHQTQTy2jeu63q0D3PlwDx0lEMgMBhgmk/J8LqUPgeBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+c6hmFqbJwDV9hgG9n3hSJbeSa1sm5FUEHRTUTy2jeu63q0D3PlwDx1FIMgQCBgmk/J8LqWPweBRhV6z2q0VF94iJ9pOBAA7" />')
		.addClass(awaitingClassName);
	}
})

//see if there is work to be done.
if ($('.' + awaitingClassName).length == 0){ return; }

//get the scores from a single JSON query, if possible.
var urlJSON 

if (window.location.toString().match(/\?/)) {
	urlJSON = window.location.toString().replace(/\?/, '.json?')
}
else
{
	urlJSON = window.location.toString() + '.json'
}


$.getJSON(urlJSON, function(res){
	
	$.each(res.data.children, function (i, e){
		var A = $('.id-' + e.data.name + ' .score'); 
		if (A.hasClass(awaitingClassName)){addScoreToElem(A,e.data.score)}
	})

	//if there are any left over that the JSON did not contain (like the organic table), do individually
	$('.' + awaitingClassName).each(function(){
		getIndivScore($(this))
	}) 
})

//done

