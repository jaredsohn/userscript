// ==UserScript==
// @name           Backbars on social link-sites
// @namespace      http://elzr.com/posts/backbars-on-social-link-sites/
// @description    Turn the headlines and comments of social link-sites (reddit, delicious, digg...) into ambient histograms.
// @include        http://www.reddit.com*
// @include        http://digg.com*
// @include        http://delicious.com*
// @include        http://news.ycombinator.com*
// @include        http://stackoverflow.com*
// @include        http://www.metafilter.com*
// @include        http://hackerne.ws*
// @include        http://news.ycombinator.org*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         Eli Parra elzr.com
// ==/UserScript==

//tools
jQuery.fn.reduce = function(fn, ini) {
	var total = ini;
	this.each(function() { total = fn.call(this, total); });
	return total;
};
jQuery.log = function(msg) {
	console.log(msg);
	return msg;
};

$(function() {
	function padding(pad) {return function(){ $(this).css('padding', pad||'2px 3px'); }};
	function bkg(color) {return function(){ $(this).css('background-image','url(http://elzr.com/images/else/backbar-'+(color||'eee')+'-long.gif)') }};

//action
	function backbar(root, items, scores, fn) {
		var root = $(root), items = items ? root.find(items) : root, scores = scores ? root.find(scores) : items, allSame = true;
		$.log(items.length+'s'+scores.length)
		if((items.length <= 1) || (items.length != scores.length)) return;
		items = items.slice(0,200); scores = scores.slice(0,200); //for performance reasons, only 200 backbars will be drawn
		scores = scores.map(function(){ return parseFloat($(this).text())||0 });

		var top = $(scores).reduce(function(top) {if(allSame) {allSame=scores[0]==this}; return Math.max(top,this)}, 0);
		if(allSame) return;
		var widest = items.reduce(function(widest) {
			$(this).css('background-image', 'url(http://elzr.com/images/else/backbar-de-thin-long.gif)');
			fn && fn.call(this); //hitching a ride in the loop to execute before width is measured
			return Math.max(widest,$(this).innerWidth())
		}, 0);

		items.each(function(i) {
			$(this).css('background-repeat', 'no-repeat').  css('background-position', Math.ceil(-2592+scores[i]*widest/top)+'px 0');
		});
	}

	var here = window.location+'', reuse;
	if(here.match(/^http:\/\/www\.reddit\.com\/.*/)) { //Reddit
		backbar('.link',  'p.title', '.score:eq(1)', padding('0 0 0 5px')); //headline titles
		backbar('.link .flat-list',  'li:eq(0)', false, bkg()); //headline comment totals
		backbar('.comment', 'p.tagline:eq(0)', '.score:eq(1)', padding()); //comment author
	} else if(here.match(/^http:\/\/digg\.com\/.*/)) { //Digg
		backbar('.main > .news-summary', 'h3', '.digg-count', padding()); //headline titles
		backbar('.main .related-stories:eq(0) .news-summary', 'h3 a:first', '.digg-count', (reuse = function() { //keyword-related headline titles
			$(this).css('padding', '2px 3px').css('margin-left','-3px').css('display', 'block').parent().siblings('ul').css('margin-top','3px'); }));
		backbar('.main .related-stories:eq(1) .news-summary', 'h3 a:first', '.digg-count', reuse); //source-related headline titles
		backbar('.main > .news-summary .news-details a.comments', false, false, bkg('e-thin-top3px')); //headline comment totals
		backbar('.comment .l0', '.c-body', '.c-diggs-count:eq(0) em', function() { //comment body
			bkg('de-thin').call(this); padding('0 0 0 3px').call(this); });
		backbar('.sidebar #topten-list .news-summary', 'h3', '.digg-count', padding('3px')); //top10 headline titles
		backbar('.sidebar #story-list .news-summary', 'h3', '.digg-count', padding('3px')); //transitivity-related headline titles
	} else if(here.match(/^http:\/\/news\.ycombinator\.((com)|(org))\/.*/) || here.match(/^http:\/\/hackerne\.ws\/.*/)) { //Hacker News
		if(here.match(/leaders$/)) {
			backbar('tr:empty + tr table tr:has(td)', 'td:last', false); //headline titles
		} else if(here.match(/item\?.*$/)) {
			backbar('br + table tr table tr:has(td)', 'td.default div:first', '.comhead span:first', function() {$(this).css('padding','2px 3px').parent().css('width','100%')}); //comment titles
		} else {
			backbar('tr:empty + tr table tr:has(td)', 'td.title:eq(1)', 'td.subtext span:first', padding()); //headline titles
			backbar('tr:empty + tr table tr:has(td)', 'td.subtext a:last', false, function() { $(this).css('padding-left','3px').parent().css('padding-top','3px')}); //headline comment totals
		}
	} else if(here.match(/^http:\/\/delicious\.com\/.*/)) { //Delicious
		backbar('.bookmark .data:has(div.savers)', 'h4', '.delNavCount', padding('2px 5px')); //headline titles
		backbar('#top-tags .m', false, 'em'); //tag counts
		backbar('#user-tags .m', false, 'em'); //tag counts
		backbar('#related-tags .m', false, 'em'); //tag counts
	} else if(here.match(/^http:\/\/stackoverflow\.com\/.*/)) { //Stack Overflow
		function massage(items, className) {
			$(items).each(function(){ 
				$(this).after('<span style="display:none" class="'+className+'">'+ $(this).text().replace(/(\d+)k/,'$1000').replace(/\.(\d)0/,'$1').replace(/[\,\×]/,'') +'</span>')
			});
		}
		massage('.question-summary .views .mini-counts', 'viewscore');
			backbar('body', '.question-summary .summary', '.question-summary .viewscore', padding('2px 5px')); //question titles
		backbar('#answers-table', '.answer-link a', '.answer-votes', function() {$(this).css('display','block').css('padding','2px 5px')}); //answers table
		backbar('body', 'div.post-text', 'td.votecell span.vote-count-post', function() { //comment titles
			bkg('de-thin').call(this); padding('0 0 0 3px').call(this);});
		$('.comments').each(function(i) { //nested comment posts
			backbar('.comments:eq('+i+')', '.comment-actions + .comment-text', '.comment-score span', bkg('e-thin-top3px'))
		});
		massage('#user-list .reputation-score', 'reputationscore');
			backbar('#user-list', '.user-details', '.reputationscore', padding('0 0 0 3px')); //user karma in table of users
		massage('#questions .views', 'viewscorenested');
			backbar('#questions', '.summary h3', '.viewscorenested', padding('3px 5px')); //question titles with nested scores
		massage('.user-list .reputation-score', 'reputationscore');
			backbar('body', '.user-list', '.reputationscore'); //user karma

		if($('.item-multiplier').length>0) {
			//set the ground
				$('.post-tag + .item-multiplier').each(function() {$(this).prev().before('<div class="backbar-tag"></div>')});
				$('.backbar-tag + .post-tag').each(function() {$(this).prev().append($(this))});
				$('.backbar-tag + .item-multiplier').each(function() {$(this).prev().append($(this))});
				$('.backbar-tag + br').remove();
				$('.backbar-tag .post-tag:normal').css('background-color','inherit').css('border','0').css('color','#3e6d8e');
				$('.backbar-tag').css('margin-right','5px');
			massage('.item-multiplier', 'itemmultiplier');
				backbar('#mainbar', 'td:has(.itemmultiplier) + td', '.itemmultiplier', padding('0 0 0 5px')); //badges (column to the right)
				backbar('body', '.backbar-tag', '.backbar-tag .itemmultiplier', bkg('e0eaf1-thin')); //tags
		}
	} else if(here.match(/^http:\/\/www\.metafilter\.com\/.*/)) { //MetaFilter
		backbar('#page .smallcopy:has(span a), #page .smallcopy:contains([)', false, 'span a, a:eq(2)', function(){
			bkg('004D73').call(this); 
			$(this).css('display','block').css('width','100%').css('margin-top', '2px').css('padding','2px 3px')});
			$('div.copy br + .smallcopy a + a + a').remove(); //OK, sorry, but this link is trivial yet totally messes up the following. For some reason, nth-child doesn't work inside GreaseMonkey
			backbar('div.copy br + .smallcopy', false, 'a + a', function(){
				bkg('004D73').call(this); 
				$(this).css('display','block').css('width','100%').css('margin-top', '2px').css('padding','2px 3px')});
	}
});