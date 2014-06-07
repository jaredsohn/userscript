// ==UserScript==
// @name           IMDB Best Feature Films With Actor and At Least 100 Votes (Proof of Concept)
// @namespace      daddydave.greasemonkey.null.imdb.actor.sortbyrating
// @include        http://www.imdb.com/name/nm*
// @version        0.5
// ==/UserScript==

// Feel free to improve

var origUrl = document.location.toString();
actorID = origUrl.match(/nm[0-9]+(?=\/)/);
if (actorID != null){
    bestUrl = "http://www.imdb.com/search/title?num_votes=100,\&role=" +
	          actorID +
			  "\&sort=user_rating,desc\&title_type=feature"
			  
    document.location.assign(bestUrl)
}
