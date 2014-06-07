// ==UserScript==
// @name       Redirect to old MLB.tv interface
// @namespace  http://metalfrog.us
// @version    0.1
// @description  As per linked comment on /r/baseball, restores old player to alleviate issues with the new player in 2014.
// @see			http://www.reddit.com/r/baseball/comments/21zcqm/mlbtv_delay_problem/cghy8i8
// @match      http://mlb.mlb.com/shared/flash/mediaplayer/v4.5/*
// @copyright  2014+ Keith J. Frank, keithjfrank@gmail.com
// ==/UserScript==
window.addEventListener("DOMContentLoaded", function() {
	window.location.replace(window.location.href.replace('/v4.5/', '/v4.4/').replace('/R7/', '/R3/'));
});