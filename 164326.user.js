// ==UserScript==
// @name          Remove retweets
// @description   Remove retweets from twitter
// ==/UserScript==

function remove_retweets()
{
	var twits = document.getElementsByClassName('js-stream-item');

	for(var twit in twits){
		try{
			var num_retwits = twits[twit].getElementsByClassName('js-retweet-text').length;
			if(num_retwits > 0) twits[twit].style.display = 'none';
		} catch(err){}
	}
}
remove_retweets();
$('.content-main').bind('DOMNodeInserted', function(){remove_retweets();})