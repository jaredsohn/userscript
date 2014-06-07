// ==UserScript==
// @name           Reddit Comments
// @namespace      http://www.drewsuph.com
// @include        http://www.reddit.com/r/*
// ==/UserScript==

var $ = unsafeWindow.$;

var $secondLevelComments = $('div.sitetable.nestedlisting > div.thing.comment').find('div.child');

$secondLevelComments.hide();

$secondLevelComments.each(

	function(i,e) {
	
		var children = $(e).find('div.thing.comment').size();
	
		$(e).parent('div').css('margin-bottom', '15px');
	
		if (children) 
			$(e).prev().find('ul').append(
				'<li><a style="font-style:italic;" onclick="$(this).closest(\'div.entry\').next().slideToggle(\'fast\');" href="javascript:void(0)">' + (children > 1 ? children + ' comments' : children + ' comment') + '</a></li>'
			);
		else
			$(e).show('fast');
	}

);

