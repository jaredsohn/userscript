// ==UserScript==
// @name           Collapse SG Friends Blogs
// @namespace      http://suicidegirls.com/members/Conroy/
// @description    Collapses friend blogs, click to expand. Double Click to recollapse.
// @include        http://suicidegirls.com/members/*/friends/blogs/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

GM_addStyle('div.friendBlogPost { height: 252px; overflow: hidden;} div.friendBlogPost.expanded { height: auto; overflow: visible;} button.shrinker { display: none;}');

(function(){ 

	$('div.friendBlogContent').each(function(){
		$(this).before("<button class='shrinker' style='font-size:smaller;'>Collapse</button>");
	});

	$('div.friendBlogPost').each(function(i){
		$(this).click(function(){
			shrinker = $(this).find('button.shrinker');
			if (shrinker.css('display') == 'none'){
				$(this).addClass('expanded');
				shrinker.css('display','block');
				return false;  //stop event propagation.	
			}	
		}).dblclick(function(){
			$(this).removeClass('expanded').find('button.shrinker').css('display','none');
			offset = $(this).offset().top;
			if (window.pageYOffset > offset) window.scroll(0,offset);
		})
		.find('button.shrinker').each(function(){
			$(this).click(function(){
				$(this).css('display','none').parents('.friendBlogPost').removeClass('expanded');
				return false;
			});
		});
	}); 

}());
