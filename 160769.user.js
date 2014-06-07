// ==UserScript==
// @name           Kongregate I Love Comments
// @namespace      tag://kongregate
// @description    Show many more comments
// @author         UnknownGuardian
// @version        1.0.0
// @date           03.02.2013
// @include        http://www.kongregate.com/games/*/*/*
// ==/UserScript== 

function main() {
	var bottom = '<li style="list-style-type: none;" id="additional_feed_items"><div id="show_more_feed_items_label"><a id="show_more_comments" class="h6" href="#">Show more</a></div><span class="spinner spinner_big" id="more_feed_items_indicator" style="display:none" title="loading…">&#8203;</span></li>';

	function init() {
		console.log("I love comments init");
		if(window.location.href.indexOf("/comments") == -1)
		{
			return;
		}
		
		$$(".comment_list")[0].insert(bottom);
		$("show_more_comments").onclick = getNextCommentPage;
	}


	function getNextCommentPage(e) {
		
		var nextURL = $$(".next")[0].down().getAttribute('href');
		new Ajax.Request(nextURL, {
							method:"get",
							requestHeaders: { "Accept" : "text/html, */*" },
							onComplete:function(transport) {
								var text = transport.responseText;
								
								var start = text.indexOf('<div class="comment_list">') + '<div class="comment_list">'.length;
								var end = text.substr(start).indexOf('var comments_controller') - 75;
								var content = text.substr(start,end);
								
								$$(".comment_list")[0].innerHTML += content;
								var paginationStart = text.indexOf('pagination simple_pagination">') + 'pagination simple_pagination">'.length;
								var paginationEnd = text.substr(paginationStart).indexOf('</ul>');
								var paginationContent = text.substr(paginationStart, paginationEnd);
								$$(".pagination")[0].innerHTML = paginationContent;
								
								$("additional_feed_items").remove(); //so we can put this at bottom.
								$$(".comment_list")[0].insert(bottom);

								//grab our new comments, and add them to the controller.
								var length = comments_controller._comment_ids.length;
								$$(".user_message").each( function(item)
									{
										comments_controller._comment_ids.push( parseInt(item.id.substring(8)) );
									});
								comments_controller._comment_ids.splice(0,length)

								//refresh the controller. I should have just called the function instead of bind.
								comments_controller.checkUserRatingStatus.bind(comments_controller)();

								if($$(".next")[0].down() != null)
								{
									$("show_more_comments").onclick = getNextCommentPage;
								}
								else
								{
									$("show_more_comments").remove();
								}
							}
						});


		if(e != null)
			e.preventDefault();
		return false;
	}
	
	init();
}

// This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);