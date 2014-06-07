// ==UserScript==
// @name        Todd-SSMW
// @namespace   Todd-SSMW
// @description Todd-SSMW
// @include     /^https?://www.facebook.com/*/
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at document-end
// @version     1.0.2
// ==/UserScript==
var targetNodes         = $(document);
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var myObserver          = new MutationObserver (mutationHandler);
var obsConfig           = { childList: true, characterData: true, attributes: true, subtree: true };
targetNodes.each ( function () {myObserver.observe (this, obsConfig);});
function mutationHandler (mutationRecords) {mutationRecords.forEach ( function (mutation) { if (typeof mutation.addedNodes == "object") { changePage(mutation.addedNodes);}} );}
function changePage(node){
	$('.actorName', node).filter(function(){return !/\(MW\)/.test( $(this).text() )}).each(function(){if (m=/user.php\?id=([0-9]+)/.exec($(this).html())){ $(this).append('   <a href=\'http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B"user"%3A"' + m[1] + '"%7D\' target=\'new\'>(MW) ' + m[1] + '</a>');}});
	$('span.fwb,span[dir="ltr"]', node).filter(function(){return !/\(MW\)/.test( $(this).text() )}).each(function(){if (m = /user.php\?id=([0-9]+)/.exec($('a', this).attr('data-hovercard'))){$(this).append('   <a href=\'http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B"user"%3A"' + m[1] + '"%7D\' target=\'new\'>(MW) ' + m[1] + '</a>');}});
	$('div.UFICommentContent', node).filter(function(){return !/\(MW\)/.test( $(this).text() )}).each(function(){if (m = /hovercard.php?\?id=([0-9]+)/.exec($('a[data-hovercard]', this).attr('data-hovercard'))){$('a[data-hovercard]', this).after('   <a href=\'http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B"user"%3A"' + m[1] + '"%7D\' target=\'new\'>(MW) </a>');}});
	$('#fbTimelineHeadline', node).filter(function(){return !/\(MW\)/.test( $(this).text() )}).each(function(){if( m=/(\d+)_(\d+)_(\d+)\_q.jpg/.exec($('meta[itemprop="image"]', this).attr('content'))){$('h2[itemprop="name"]', this).append('   <a href=\'http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B"user"%3A"' + m[2] + '"%7D\' target=\'new\'>(MW) ' + m[2] + '</a>');}});
}
if(typeof(GM_info)=='object'){ changePage($(document));} //