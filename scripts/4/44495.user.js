// ==UserScript==
// @name           Ignore Users
// @namespace      vg247.com
// @description    Ignore comments by certain users.
// @include        http://www.vg247.com/*
// ==/UserScript==

function get_ignored_users()
{
	// get array of ignored users
	var users = GM_getValue('ignored_users');
	if(!users)
		return new Array();
	return users.split(';');
}

function show_ignored_users()
{
	var ignored_users = get_ignored_users();
	if(ignored_users.length == 0)
		alert('No users are currently being ignored.');
	else
		alert(ignored_users);
}

function add_ignored_user()
{
	// get user
	var user = prompt('Ignore the following user:');
	if(!user)
		return;
	
	// make user lowercase
	user = user.toLowerCase();
	
	// get currently ignored users
	var users = get_ignored_users();
	
	// search if user is already ignored
	for(i = 0; i < users.length; ++i)
	{
		if(users[i] === user)
		{
			alert('User "' + user + '" is already being ignored.');
			return;
		}
	}
	
	// add user to ignored users
	users.push(user);
	
	// show all comments
	unignore_users();
	
	// save ignored users array
	GM_setValue('ignored_users', users.join(';'));
	
	// hide comments by user
	ignore_users();
	
	// show status message
	alert('User "' + user + '" is being ignored.');
}

function remove_ignored_user()
{
	// get user
	var user = prompt('No longer ignore the following user:');
	if(!user)
		return;
	
	// make user lowercase
	user = user.toLowerCase();
	
	// get currently ignored users
	var tmp_users = get_ignored_users();
	
	// new ignored users array
	var users = new Array();
	
	// add users not equal to user
	for(i = 0; i < tmp_users.length; ++i)
	{
		if(tmp_users[i] !== user)
			users.push(tmp_users[i]);
	}
	
	// show all comments
	unignore_users();
	
	// save ignored users array
	GM_setValue('ignored_users', users.join(';'));
	
	// hide comments by ignored users
	ignore_users();
	
	// show status message
	alert('User "' + user + '" is no longer being ignored.');
}

function ignore_users()
{
	// the list of ignored users
	var ignored_users = get_ignored_users();
	
	// the list of comments
	var comment_list;

	// find comment list
	var ordered_lists = document.getElementsByTagName('ol');
	for(i = 0; i < ordered_lists.length; ++i)
	{
		if(ordered_lists[i].className == 'commentlist')
		{
			comment_list = ordered_lists[i];
			break;
		}
	}

	if(comment_list)
	{
		// get comments
		var comments = comment_list.getElementsByTagName('li');

		// hide all comments by ignored authors
		for(i = 0; i < comments.length; ++i)
		{
			for(j = 0; j < ignored_users.length; ++j)
			{
				var user = ignored_users[j].toLowerCase();
				
				if(user.indexOf(' ') > -1)
					user = user.substr(0, user.indexOf(' '));
				
				if(comments[i].className.indexOf('comment-author-' + user) > -1)
				{
					// hide item
					comments[i].style.display = 'none';
				}
			}
		}
	}
  
	// the thread
	var thread = document.getElementById('thread');

	if(thread)
	{
		// get posts
		var posts = thread.getElementsByTagName('li');

		// hide all posts by ignored authors
		for(i = 0; i < posts.length; ++i)
		{
			var threadauthor;
			
			// find thread author div
			var post_divs = posts[i].getElementsByTagName('div');
			for(j = 0; j < post_divs.length; ++j)
			{
				if(post_divs[j].className.indexOf('threadauthor') > -1)
				{
					threadauthor = post_divs[j].innerHTML.toLowerCase();
					break;
				}
			}
			
			for(j = 0; j < ignored_users.length; ++j)
			{
				var user = ignored_users[j].toLowerCase();
				
				if(threadauthor.indexOf(user) > -1)
				{
					// hide item
					posts[i].style.display = 'none';
				}
			}
		}
	}
}

function unignore_users()
{
	// the list of ignored users
	var ignored_users = get_ignored_users();
	
	// the list of comments
	var comment_list;

	// find comment list
	var ordered_lists = document.getElementsByTagName('ol');
	for(i = 0; i < ordered_lists.length; ++i)
	{
		if(ordered_lists[i].className == 'commentlist')
		{
			comment_list = ordered_lists[i];
			break;
		}
	}

	if(comment_list)
	{
		// get comments
		var comments = comment_list.getElementsByTagName('li');

		// hide all comments by ignored authors
		for(i = 0; i < comments.length; ++i)
		{
			for(j = 0; j < ignored_users.length; ++j)
			{
				if(comments[i].className.indexOf('comment-author-' + ignored_users[j].toLowerCase()) > -1)
				{
					// show item
					comments[i].style.display = null;
				}
			}
		}
	}

	// the thread
	var thread = document.getElementById('thread');

	if(thread)
	{
		// get posts
		var posts = thread.getElementsByTagName('li');

		// show all posts by ignored authors
		for(i = 0; i < posts.length; ++i)
		{
			var threadauthor;
			
			// find thread author div
			var post_divs = posts[i].getElementsByTagName('div');
			for(j = 0; j < post_divs.length; ++j)
			{
				if(post_divs[j].className.indexOf('threadauthor') > -1)
				{
					threadauthor = post_divs[j].innerHTML.toLowerCase();
					break;
				}
			}
			
			for(j = 0; j < ignored_users.length; ++j)
			{
				var user = ignored_users[j].toLowerCase();
				
				if(threadauthor.indexOf(user) > -1)
				{
					// show item
					posts[i].style.display = null;
				}
			}
		}
	}
}

// register commands
GM_registerMenuCommand("Show ignored users", show_ignored_users);
GM_registerMenuCommand("Add ignored user", add_ignored_user);
GM_registerMenuCommand("Remove ignored user", remove_ignored_user);
GM_registerMenuCommand("Ignore users", ignore_users);
GM_registerMenuCommand("Un-Ignore users", unignore_users);

// ignore users when page loads
window.addEventListener("load", ignore_users, false);
