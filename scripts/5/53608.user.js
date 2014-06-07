// ==UserScript==
// @name           HARPOON: Tweet downloader
// @namespace      http://elzr.com/posts/download-your-tweets/
// @description    Download your tweets! On a Twitter user page, click on the Harpoon link under Updates & Favorites in the sidebar to start downloading their tweets! It may take a while.
// @include        http://twitter.com/*
// @exclude        http://twitter.com/home*
// @exclude        http://twitter.com/
// @exclude        http://twitter.com/account*
// @exclude        http://twitter.com/invitations*
// @exclude        http://twitter.com/about*
// @exclude        http://twitter.com/*/status*
// @exclude        http://twitter.com/downloads*
// @exclude        http://twitter.com/tos*
// @exclude        http://twitter.com/followers*
// @exclude        http://twitter.com/following*
// @exclude        http://twitter.com/privacy*
// @author         Eliazar Parra elzr.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

function harpoon() {
	var first = $('body').html();
	var pageCounter = 0;
	var tweetCounter = 0;

	var isFavorites = (window.location+'').match(/\/favorites/) ? true : false;
	var total = isFavorites ? false : parseInt($('#update_count').text().replace(/\,/,''));
	var pages = 1 + Math.ceil((total-first.match(/class="entry-content">/g).length)/20.0);
	var regex = '<li class="hentry[\\s\\S]*?<span class="entry-content">([\\s\\S]*?)<\/span>[\\s\\S]*?<a class="entry-date" rel="bookmark" href="([^"]+)">[\\s\\S]*?<span class="published.*?data="\{time:\'([^\']+)\'[\\s\\S]*?<span>(from .*?)<\/span>([\\s\\S]*?)<\/span>';
		regex = {global:new RegExp(regex, 'gim'), local:new RegExp(regex, 'im')};
	var name = window.location.href.replace('http://twitter.com/','').replace(/\?.*$/,'').replace(/\/.*$/,'');

	$('#content .section:first').before('<div id="harpoon"><big>Harpoon</big> is hunting <strong>'+name+'</strong>\'s '+(isFavorites ? 'favorite ' : '')+'tweets. Currently preyed on <span> 1 of ?..</span> <img src="chrome://global/skin/icons/loading_16.png" style="vertical-align:middle" /></div><div id="prey"></div>')
	$('body').prepend('<style>#harpoon {background:#ffffcc; padding:10px; margin-top:5px} #harpoon big {font-weight:bold; } #prey {background:#eee; padding:5px 20px 20px 10px} #prey p {padding-top:10px} #prey div, #prey div a {color:#777} #prey div {margin-top:-5px; margin-left:20px; font-size:90%}</style>')
	$('#harpoonTrigger').html('<center>Harpooning...</center>');

	parse(first);
	next(first);

	function next(prev) {
		var nextURL = prev.match(/a href="(.*?)"[^>]+id="more"/)
		if( nextURL ) {
			nextURL = nextURL[1].replace(/&amp;/g,'&');
			$.get('http://twitter.com'+(isFavorites ? '/'+name : '')+nextURL, function(now) {
				pageCounter+=1;
				parse(now);
				next(now);
			});
		}
		else {
			if((pageCounter+1 == pages) || isFavorites) {
				$('#harpoon').html('<big>Harpoon</big> hunted all ' + tweetCounter + (isFavorites ? ' favorite ' : '')+' tweets from <strong>' + name + '</strong>. <a href="http://www.imdb.com/title/tt0182789/quotes">One is glad to be of service.</a>');
				$('#harpoonTrigger').html('<center>Harpooned!</center>');
			} else {
				$('#harpoon').html('<span style="color:red"><big>Harpoon</big> failed at tweet ' + tweetCounter + ' of ' + total + '! It\'ll try again if you refresh the page.</span>');
				$('#harpoonTrigger').html('<center style="color:red">Harpooning failed!</center>');
			}
		}
	}

	function parse(text) {
		var arr = text.match(regex.global), out = '';
		$.each(arr, function() {
			var m = this.match(regex.local);
			if(m) {
				var author = this.match(/<a href="[^"]+" class="tweet-url screen-name" title="([^"]+)">([^<]+)<\/a>/, 'i');
				var inreplyto = m[5] ? m[5].match(/<a href="(.*?)".*?>(.*?)<\/a>/) : false;
				out  += '<p>' + (author ? '<b>'+author[0]+'</b> ('+author[1]+'): ' : '') +
					m[1] + '<div>#' + (total ? total-(tweetCounter+=1)+1 : (tweetCounter+=1) ) + ', ' + m[3] +
					' ' + m[4] + 
					(inreplyto ? '<br>'+inreplyto[2]+' <a href="'+inreplyto[1]+'">'+inreplyto[1]+'</a>' : '') +
					'<br><a href="'+m[2]+'">' + m[2] + '</a></div></p>';
			}
		});
		$('#harpoon span').html(tweetCounter+' of '+(total||'?')+'..');
		$('#prey').append(out);
	}
};

$(function() {
	$('#primary_nav li:last').after('<li id="harpoonTrigger"><a href="javascript:void(0)" title="Download all the tweets from this user!">Harpoon!</a></li>');
	$('#harpoonTrigger a').click(harpoon);
});