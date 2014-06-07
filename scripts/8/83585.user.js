// ==UserScript==
// @name           IMDb: Rating descriptions
// @description    Adds meaningful tooltips to star ratings
// @author         kuehlschrank
// @version        2011.08.29
// @include        http://*.imdb.*/title/*
// ==/UserScript==


(function() {

	var descs = ['terrible', 'bad', 'poor', 'disappointing', 'so-so', 'okay', 'good', 'great', 'amazing', 'must-watch'];

	for(var i = 0, dLen = descs.length; i < dLen; i++) {
		var links = document.querySelectorAll('#tn15rating a.s' + (i+1) + ', .rating-stars > a:nth-child(' + (i+1) + ')');
		for(var j = 0, lLen = links.length; j < lLen; j++) {
			links[j].setAttribute('title', (i+1) + ' - ' + descs[i]);
		}
	}

	var vote, voteNode = document.getElementById('voteuser');

	if(voteNode && !isNaN(vote = parseInt(voteNode.innerHTML))) {
		voteNode.parentNode.innerHTML += ' - ' + descs[vote-1];
	}

})();