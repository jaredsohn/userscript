// --------------------------------------------------------------------
// ==UserScript==
// @name          Facebook: Remove Suggestions and Sponsored from Homepage
// @description   If you're just going to keep suggesting I poke the same people, I'm gonna remove your Suggestions section, Facebook.  And if I'm in there, might as well remove the Sponsored and Connect To and Trending sections too...
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// ==/UserScript==

userScript_removeSuggestions();

document.addEventListener("DOMNodeInserted", userScript_removeSuggestions, false);

function userScript_removeSuggestions()
{
	var child = document.getElementById('pagelet_netego');
	if (child)
	{
		var netego_content = child.innerHTML;

		if (netego_content.length > 0)
		{
			if (netego_content.indexOf("See Friendship") == -1) // If this is the "See friendship" section in the new Profile page, don't remove it.
			{
				userScript_removeNode(child);
			}
		}
	}

	// Get Connected
	var child = document.getElementById('pagelet_netego_lower');
	userScript_removeNode(child);

	// Sponsored
	var child = document.getElementById('pagelet_adbox');
	userScript_removeNode(child);

	// Find Your Friends
	var child = document.getElementById('ego_pane');
	userScript_removeNode(child);

	var child = document.getElementById('pagelet_ego_pane');
	userScript_removeNode(child);

	var child = document.getElementById('pagelet_ego_pane_w');
	userScript_removeNode(child);

	// "what are you doing?" input box
	var child = document.getElementById('event_create_mini_form');
	userScript_removeNode(child);

	// Trending
	var child = document.getElementById('pagelet_trending_tags_and_topics');
	userScript_removeNode(child);

}

function userScript_removeNode(child)
{
	if (child)
	{
		child.style.display = 'none';
	}
}
