// ==UserScript==
// @name           GoT Enhancer
// @namespace      http://phyxion.net
// @include        http://gathering.tweakers.net/*
// ==/UserScript==

	var ignoredUsers = ["Tweaker."]; // Example, use , to separate multiple users.
	var username = "Phyxion"; // Your username on GoT.
	var highlightcolorOwnPosts = "#BEFA02"; // Default color is #C8E7E1.
	var highlightcolorTS = "#7ED3BD"; // Used to highlight topicstarters.
	var collapseGoTUsers = true; // Automatically collapse all GoT users (shows number of posts and registration date)/
	var hideGoTUsers = true; // Hide GoT users from the ignoredUsers list.
	var highlightOwnGoTPost = true; // Also change the highlight color of your own post to that of highlightcolorOwnPosts.
	var highlightOwnGoTQuote = true; // Change the background color of a quote of your post.
	var highlightGoTTopicstarters = true; // Change the highlight color of the posts made by topicstarters.
	
//--------------------------------------------==========--------------------------------------------
	Actions();
	
	var newMessages = document.getElementById('newMessages'); // Also bind to newMessages updates
	newMessages.addEventListener ("DOMSubtreeModified", OnSubtreeModified, false); 
	
	function OnSubtreeModified () {
         Actions();
    }
	
	function Actions()
	{
		if (collapseGoTUsers)
			collapseUsers();
		
		if (hideGoTUsers)
		{
			hide(document.getElementsByClassName('message altmsg1'));
			hide(document.getElementsByClassName('message altmsg2'));
		}
		
		if (highlightOwnGoTPost)
			highlightPost();
			
		if (highlightOwnGoTQuote)
			highlightQuote();
			
		if (highlightGoTTopicstarters)
			highlightTopicstarters();
	}
//--------------------------------------------==========--------------------------------------------
	
	function highlightTopicstarters()
	{
		var items = document.getElementsByClassName('messageheader');
		for (i=0; i<items.length; i++)
		{			
			var user = items[i].getElementsByClassName('klipklap pointer')[0];
			if (user.hasAttribute('title') && user.getAttribute('title').indexOf('Topicstarter') != -1)
				items[i].style.background = highlightcolorTS;
		}	
	}
	
	function collapseUsers()
	{
		var items = document.getElementsByClassName('klipklap pointer');
		for (i=0; i<items.length; i++)
		{
			items[i].click();
		}
	}	
	
	function hide(items)
	{	
		for (i=0; i<items.length; i++)
		{
			var user = items[i].getElementsByClassName('user')[0];
			for (ignore in ignoredUsers)
			{
				if (user.innerHTML.indexOf(ignoredUsers[ignore]) != -1)
					items[i].style.display = 'none';	  
			}
		}
	}
	
	function highlightQuote()
	{
		var items = document.getElementsByClassName('message-quote-div');
		for (i=0; i<items.length; i++)
		{
			var user = items[i].getElementsByClassName('messagelink')[0];
			if (user.innerHTML.indexOf(username + ' schreef') != -1)
				items[i].style.background = highlightcolorOwnPosts;
		}		
	}
	
	function highlightPost()
	{
		var items = document.getElementsByClassName('messageheader ownpost');
		for (i=0; i<items.length; i++)
		{			
			items[i].style.background = highlightcolorOwnPosts;
		}		
	}
	
//--------------------------------------------==========--------------------------------------------