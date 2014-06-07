// ==UserScript==
// @name            SOFU Answer Sorter
// @namespace       http://codingcromulence.blogspot.com/
// @description     Sorts answers by votes, then by newest, also...
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include         *
// ==/UserScript==

// Sorting solution found at http://www.wrichards.com/blog/2009/02/jquery-sorting-elements/

jQuery.fn.sort = function() {
   return this.pushStack( [].sort.apply( this, arguments ), []);
 };

function sortVotesThenNewest(a,b){
    var aVotes = $(a).find('span.vote-count-post').text();
	var bVotes = $(b).find('span.vote-count-post').text();
	var aTime  = $(a).find('div.user-action-time > span.relativetime').attr('title');
	var bTime  = $(b).find('div.user-action-time > span.relativetime').attr('title');
	
	if ($(a).hasClass('accepted-answer')) return -1; // Accepted answer comes first
	
	if (parseInt(aVotes) > parseInt(bVotes)) return -1; // Votes in descending order
	if (parseInt(aVotes) < parseInt(bVotes)) return 1;
	
	if (aTime > bTime) return 1; // Times in ascending order
	if (aTime < bTime) return -1;
	return 0;
};

$(function() {
    if ($('a.youarehere').text() != 'votes') return; // Do nothing if not sorting by 'votes'.
	$('div.answer').sort(sortVotesThenNewest).each(function() {
		$(this).prev().insertBefore($('#post-form').prev('div'));
		$(this).insertBefore($('#post-form').prev('div'));
	});
});
