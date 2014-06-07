// ==UserScript==
// @name           	4chan Search
// @namespace      	http://lucidchan.org
// @description         Allows you to search on 4chan.
// @include             http://boards.4chan.org/*
// @exclude	        http://boards.4chan.org/*/res/*
// @version	        1.1.5
// @require	        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	
	var base_url = window.location.href.replace(/[0-9]+$/, '');
	var page_stack = []; // keep track how many posts we've viewed
	var $loading;
	var posts = [];
	
	var addSearchEventListener = function() {
		
		$('#4chan_search_click').click(function() {			

			$loading.empty();
			$('#4chan_search_box').empty();
			var search_string = $('#4chan_search_text').val();
			if (search_string !=  []) {
				search_string = escape(search_string);
				page_stack = [];
				searchPosts(search_string);
			}
		});
		$('#4chan_search_indexer').click(function() {
			posts = [];
			queryPages(0);
			return false;
		});
		$('#4chan_index_deleter').click(function() {
			$loading.html('Index Deleted');
			GM_deleteValue(base_url);
			return false;
		});
	}
	
	// from the XRegExp API
	var escape = function (str) {

             return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

	var queryPages = function(page_num) {
		
		var link = base_url;

		if (page_num > 0) {
			link = base_url + page_num;
		}
		(function(link) { 
			
			GM_xmlhttpRequest({
				 method: "GET",
				 url: link,
				 onload: function(response) {
					
					queryThreads(response.responseText);
					if (page_num < 15) {
						queryPages(page_num + 1);
					}
				}
			});
		})(link);
	}
	var queryThreads = function(page) {
	
		$(page).find('span[id^="nothread"] > a[href^="res/"]:nth-child(2)').each(function(i) {
			
			var link = base_url + 'res/' + $(this).html();
			
			(function(link) {
				
				GM_xmlhttpRequest({

					 method: "GET",
					 url: link,
					 onload: function(response) {
						 
						page_stack.push('1');
						$loading.html('Updating Threads... ' + page_stack.length);
						
						$(response.responseText).find('blockquote').each(function(i) {
								
								var $this = $(this);
								var anchor = $this.prevAll('span[id^="norep"],[id^="nothread"]').find(':first-child').attr('href');
								posts.push(new Array(link + anchor, $this.html(), anchor));
						});
						GM_setValue(base_url, JSON.stringify(posts));
					 }
				});
			})(link);
		});
	}
	var searchPosts = function(query) {
	
		var tmpHTML = '';
		var i = 0;
		for (i = 0; i < posts.length; i++) {
			var pattr = new RegExp(query, 'i');
			var text = posts[i][1].match(pattr);
			if (text != null) {
				var post = posts[i][1].replace(new RegExp(query, 'gi'), '<span style="background-color: yellow">'+text+'</span>');
				tmpHTML += '<tr style="width:50% !important;"><td style="font-size:10px !important;border-bottom: 1px solid #000 !important;">'+ post +
				'</td> <td style="text-align:right !important;font-size:10px !important;border-bottom: 1px solid #000 !important;"><a href="'+ posts[i][0] +'"> &gt;&gt;'+ posts[i][2] +
				'</a><td/></tr>';
			}
		}
		$('#4chan_search_box').append(tmpHTML);
		if (i == 0)
			$loading.html('Searched 0 posts.  Try updating the index.');
		else
			$loading.html('Searched ' + i + ' posts');
	}

	var appendSearchElement = function() {
		
		var searcher_element = '<tr><td></td><td align="left" class="postblock">' + 
		'<b>Search</b></td><td><input type="text" size="35" name="sub" class="inputtext" ' +
		'id="4chan_search_text" /><input type="button" value="Search" id="4chan_search_click" />' + 
		'</td></tr>';
		var indexer_element = '<div><a href="#" id="4chan_search_indexer" style="font-size:10px !important;">Update Index</a><br/><a style="font-size:10px !important;" href="#" id="4chan_index_deleter" >Delete Index</a></div>';
		
		var blank_post = '<table id="4chan_search_box" style="width:80% !important;margin:auto !important;"></table>';
		
		// hopefully another table with a cellspacing of 1 won't show up in
		// the post postarea anytime soon.
		$('.postarea table[cellspacing="1"]').append(searcher_element);
		$('.postarea').append(blank_post);
		$('#4chan_search_click').after(indexer_element);
		$('#4chan_search_indexer').after('<span id="4chan_search_load"></span>');
		$loading = $('#4chan_search_load');
	}
	// START
	if (GM_getValue(base_url)) {
		posts = JSON.parse(GM_getValue(base_url));
	}
	appendSearchElement();
	addSearchEventListener();
});

