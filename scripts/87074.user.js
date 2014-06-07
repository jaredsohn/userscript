// ==UserScript==
// @name           League of Legends Forum Toggle Red Posts
// @namespace      http://userscripts.org/users/227822
// @description    Toggles posts to hide non-red posts
// @include        http://www.leagueoflegends.com/board/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// We have to use Jquery 1.3.2 because 1.4 causes an error on import
// http://forum.jquery.com/topic/importing-jquery-1-4-1-into-greasemonkey-scripts-generates-an-error

//$('#posts').before("<input type='button' onclick='hidePosts();' value='Filter Posts' />");
$('#posts').before("<input type='hidden' id='redState' value='all' />");
$('#posts').before("<input type='button' onclick='hidePosts();' value='Toggle Reds' />");

function hidePosts(){
	/*var name = prompt('Show only red posts and posts by this user (blank for red only, * to show all posts)', '');
	if (name == null){ return; }*/
	
	var hiding = ($('#redState').val() == 'all')

	$('#posts').children().each(function(i){
		var postBody = $(this);
		var isRed = false;
		$(this).find('a.user_summoner_name').each(function(j){
			var currentName = $(this).text();
			isRed = $(this).find('big font').attr("color") == 'red';
		});
		var rank = postBody.find('strong').text().toLowerCase();
		var isRanked = false;
		if (rank.indexOf('Director') != -1){
			isRanked = true;
		}
		if (hiding){
			if (isRed){
				postBody.slideDown('slow');
			} else {
				postBody.slideUp('slow');
			}
		} else {
			postBody.slideDown('slow');
		}
	});
	
	if ($('#redState').val() == 'all')
	{
		$('#redState').val('reds');
	} else {
		$('#redState').val('all');
	}
}

// need to embed the script onto the page to be called when the button is pressed
var script = document.createElement('script');
script.appendChild(document.createTextNode(hidePosts));
(document.body || document.head || document.documentElement).appendChild(script);
