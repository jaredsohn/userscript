// ==UserScript==
// @name   	4chon X
// @namespace  	4chon.net
// @description	An edit of 4chon-ext to make it look like 4chan X.
// @grant       none
// @include	http://4chon.net/*
// @exclude	http://4chon.net/mod.php?/*
// @icon	http://static.4chon.net/favicon.gif
// ==/UserScript==
// ==Authors==
//		Wriggle !!wvZ72pdJVA
//		TheGent
// ==Edits by==
//		Anonymous
//==License==
//	The "Do Whatever the Fuck You Want License"
//		You are free to redistribute, edit, and otherwise mutilate this file to your hearts content
//		In doing so, you agree to keep the original authors listed in this file as they are.

// Add jQuery
(function () {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js';
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + jQueryLoaded + ")();";
		head.appendChild(script);
	}, false);

	head.appendChild(script);
})();

// All site code must be inside this function
function jQueryLoaded() {
	/*
		Initializes the script
		Checks for what sort of page the user is on, reacts accordingly
	*/
	init = function () {
		//Begin with checking for OP posts
		var threadOPs = $('div.op');
		if (threadOPs.length > 0) {
			preparePage();
		} else {
			//Exit Script, they're not on a board index or in a thread.
			return false;
		};
	};
	
	preparePage = function () {
		//Get board name
		var currentBoardID = $('h1').text().replace(/^\/(.+)\/.+/, "$1");
		//Get all posts
		var posts = $('div.post');
		//[Hide] Links
		var isIndex = $('div.post:first').parentsUntil('form').filter('div:not(.post)')[0];
		var postsHide = posts;
		if(!isIndex){
			postsHide = posts.filter(':gt(0)');
		};
		var hideLink = postsHide.children('p.intro').prepend('<a class="hide" href="">[-]</a><a> </a>').children('a.hide');
		//Bind the links' click events
		hideLink.bind('click', function () {
			var post = $(this).parent().parent();
			if (post.hasClass('op')) {
				var rawID = post
						.parent()
						.attr('id');
				hideThread( stripForID(rawID), currentBoardID );
			} else {
				var rawID = post.attr('id');
				hideReply( stripForID(rawID), currentBoardID );
			};
			return false;
		});
		//Check to see if there's posts to hide, other database maintenance
		var hideList=getHideList()[currentBoardID];
		var flush_len=0;
		var now=new Date();
		for(postID in hideList){
			var expDate=hideList[postID]['expDate'];
			if(expDate>now.getTime()){
				hidePost(postID, currentBoardID);
				flush_len++;
			} else {
				delFromHideList(postID, currentBoardID);
			};
		};
		//Create Settings Dialog
		$('body')
			.prepend('<div class="extSettings"><p><a class="openSettings" href="">['+flush_len+']</a></p></div>')
				.children('div.extSettings')
				.css({
					position: 'absolute',
					top: '25px'
				})
				.append('<div />')
				.find('a.openSettings')
				.bind('click', function(){
					flushSettings();
					return false;
				});
	};
	
	flushSettings = function() {
		//Unhide all Posts
		$('.unhide').click();
		localStorage.removeItem('hiddenPosts');
	};
	
	isThread = function (id) {
		var post = $('#thread_' + id);
		if (post[0]) {
			return true;
		} else {
			return false;
		}
	};
	
	stripForID = function (string) {
		return string.match(/(\d+)/)[1];
	};
	
	getHideList = function (boardID) {
		var list = localStorage.getItem("hiddenPosts");
		if (list) {
			return $.parseJSON(list);
		} else {
			return {};
		};
	};
	
	addToHideList = function (postID, boardID) {
		//Set up data
		var postID = postID.toString(),
			hideList = getHideList(),
			expDate = new Date();
		expDate = expDate.setDate(expDate.getDate()+30).toString();
		//Fill in Post data
		if(!hideList[boardID]){
			hideList[boardID]={};
		};
		hideList[boardID][postID] = {
			'expDate' : expDate
		};
		//Set item into localStorage
		localStorage.setItem("hiddenPosts", JSON.stringify(hideList));
	};
	
	delFromHideList = function (postID, boardID) {
		//Get List
		hideList = getHideList();
		//Remove entry
		delete hideList[boardID][postID];
		//Save List
		localStorage.setItem("hiddenPosts", JSON.stringify(hideList));
	};
	
	hidePost = function (id, boardID) {
		if (isThread(id)) {
			hideThread(id, boardID);
		} else {
			hideReply(id, boardID);
		};
	};

	hideThread = function (id, boardID) {
		//Find Post (and picture, and posts) by id
		var post = $('#thread_' + id);
		//Check if it actually exists
		if (post[0]) {
			//Hide thread content
			post
				.children(':not(hr)')
				.hide();
			//Replace with "Thread Hidden [Unhide]"
			post
				.prepend('<div class="placeholder"><p><a class="unhide" href="">[+]</a></p></div>')
					.find('a.unhide')
					.bind('click', function () {
						var rawID = $(this).parent().parent().parent().attr('id');
						var id = stripForID(rawID);
						showThread(id, boardID);
						return false;
					});
			//Save change
			addToHideList(id, boardID);
		};
	};

	showThread = function (id, boardID) {
		//Find Hidden thread by id
		var post = $('#thread_' + id);
		//Check if it actually exists
		if (post[0]) {
			//Remove placeholder
			post.children('.placeholder').remove();
			//Show thread content
			post.children().show();
			//Save change
			delFromHideList(id, boardID);
		};
	};

	hideReply = function (id, boardID) {
		//Find Reply by id
		var post = $('#reply_' + id);
		//Check that it actually exists
		if (post[0]) {
			//Hide reply content
			post.children().hide();
			//Replace with "Post Hidden [Unhide]"
			post
				.prepend('<div class="placeholder"><p><a class="unhide" href="">[+]</a></p></div>')
					.find('a.unhide')
					.bind('click', function () {
						var rawID = $(this).parent().parent().parent().attr('id');
						var id = stripForID(rawID);
						showReply(id, boardID);
						return false;
					});
			//Save change
			addToHideList(id, boardID);
		};
	};

	showReply = function (id, boardID) {
		//Find Hidden Reply
		var post = $('#reply_' + id);
		//Check that it actually exists
		if (post[0]) {
			//Remove placeholder
			post.children('.placeholder').remove();
			//Show reply content
			post.children().show();
			//Save change
			delFromHideList(id, boardID);
		};
	};

	init();
};