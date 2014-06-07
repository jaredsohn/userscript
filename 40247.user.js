// ==UserScript==
// @name           Twitastic Twitter Enhancer
// @namespace      twitastic_twitter_enhancer
// @description    Autolinks hashtags, expands tinyurl links, shows twitpics thumbs
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        https://search.twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==

var script = document.createElement('script');  
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';  
script.type = 'text/javascript';  
document.getElementsByTagName('head')[0].appendChild(script);  

function _wait() {  
	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(_wait,100); 
	} else {
		$ = unsafeWindow.jQuery; onjQueryLoaded();
	}  
}  

_wait();  

function onjQueryLoaded() {  
	
	//Expand tinyurl.com urls
	$("a[href^=http://tinyurl.com]").each(function(){
		var the_orig_url = $(this).attr('href');
		url = 'http://remysharp.com/tinyurlapi?url=' + escape($(this).attr('href')) + '&callback=?'
		$.getJSON(url, function(redirected_to_url){
			$("a[href='" + the_orig_url + "']").attr('href', redirected_to_url).html(redirected_to_url);
		});
	});
	
	//Find hashtags and add search links
	$('span.entry-content').each(function(){
		elm = $(this);
		this.innerHTML = this.innerHTML.replace(/#([^ ]+)/g, '<a class="frontendbook_twitter_enhancer_hashtag" href="http://search.twitter.com/search?q=%23$1" title="$1" target="_blank">#$1</a>');
	});
	
	//Search for hashtags using Twitter Search API
	$("a.frontendbook_twitter_enhancer_hashtag").click(function(){
		query = $(this).text();
		id = "search_result_" + new Date().getTime();
		$(this).parent().append("<div><h3>Latest for " + query + "</h3><div id=\"" + id + "\">Searching Twitter</div></div>");
		$.getJSON('http://search.twitter.com/search.json?q=' + escape(query) + '&callback=?', function(result){
			var html = "<ul class=\"frontendbook_twitter_enhancer_result\">";
			$.each(result.results, function(){
				html += '<li style="margin:0 0 10px 0;"><img src="' + this.profile_image_url + '" style="float:left;margin:0 10px 5px 0;" /><h4><a href="http://twitter.com/' + this.from_user + '">' + this.from_user + '</a></h4><p><a href="http://twitter.com/' + this.from_user + '/status/' + this.id + '"> ' + this.created_at + '</a> ' + this.text + '</p><hr /><div style="clear:both;"></div></li>';
			}); 			
			html += "</ul>";
			$('#'+id).html(html);
		});
		return false;
	});
	
	//Expand Twitpic thumbs
	$("a[href^='http://twitpic.com']").each(function(){
		var twitpic_id = $(this).attr('href').replace('http://twitpic.com', '');
		html = "<div><a href=\"http://twitpic.com/" + twitpic_id + "\"><img src=\"http://twitpic.com/" + twitpic_id + "-thumb\" border=\"0\" /></a></div>";
		$(this).parent().append(html);
	});
}