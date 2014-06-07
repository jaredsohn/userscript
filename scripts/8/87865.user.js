// ==UserScript==
// @name           "Your Tweets, Retweeted" Link in Sidebar
// @version        0.1
// @namespace      http://twitter.com/cmfcknw
// @include        http://twitter.com/*
// @description          Adds Twitter-style Retweet link to "Your Tweets, Retweeted" to sidebar under Retweets for ease of access.
// author: cmfcknw
// ==/UserScript==

(function () {
	// Create an element of ""
    var li_RT_by_other = document.createElement('li');
    li_RT_by_other.setAttribute('id', 'li_RT_by_other');

		var a_RT_by_other = document.createElement('a');
		a_RT_by_other.setAttribute('href', '');
		a_RT_by_other.innerHTML = '';

		li_RT_by_other.appendChild(a_RT_by_other);

	// Create an element of ""
    var li_RT_by_you = document.createElement('li');
    li_RT_by_you.setAttribute('id', 'li_RT_by_you');

		var a_RT_by_you = document.createElement('a');
		a_RT_by_you.setAttribute('href', '');
		a_RT_by_you.innerHTML = '';

		li_RT_by_you.appendChild(a_RT_by_you);

	// Create an element of "Your Tweets, Retweeted"
    var li_RTed_of_mine = document.createElement('li');
    li_RTed_of_mine.setAttribute('id', 'li_RTed_of_mine');

		var a_RTed_of_mine = document.createElement('a');
		a_RTed_of_mine.setAttribute('href', 'http://twitter.com/retweeted_of_mine');
		a_RTed_of_mine.innerHTML = '-- Your Tweets, Retweeted';

		li_RTed_of_mine.appendChild(a_RTed_of_mine);

	// Put in elements to side-bar.
    var primary_nav = document.getElementById('primary_nav');
    primary_nav.insertBefore(li_RTed_of_mine, primary_nav.lastChild );

})();