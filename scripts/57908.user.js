// ==UserScript==
// @name           Ignore_MAL_User
// @namespace      Ignore_MAL_User
// @description    Allows a user to blacklist other users so that their posts are automatically collapsed.
// @include        http://myanimelist.net/forum/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//Blacklist is an object that holds the usernames of all blocked users
function blacklist() {
	//Blacklist is loaded from persistent data store.
	this.list = [];
	this.list = GM_listValues().map(GM_getValue);
	
	//Get the number of ignored usernames for later use.
	this.numSettings = this.list.length;
}

//The add method will add a user to the blacklist object and set it as script specific persistent data.
blacklist.prototype.add = function (userID, username) {
    //Add the value to the persistent data.
    GM_setValue(userID, username);

    //Update the list to reflect the added username
    this.list = [];
    this.list = GM_listValues().map(GM_getValue);

    return true;
};

//is returns true if the userID has this username or false otherwise
blacklist.prototype.is = function (userID, username) {
    if (GM_getValue(userID, false) === false) {
        return false;
    }
    else if (GM_getValue(userID) === username) {
        return true;
    }
    return false;
};

//The rem function removes a user from the blacklist.
blacklist.prototype.rem = function (username) {
	GM_deleteValue(username);

	//Reload blacklist's list to update it after an item is removed.
	this.list = [];
	this.list = GM_listValues().map(GM_getValue);
};

//The is_in method checks if a user has been blacklisted
blacklist.prototype.is_in = function (username) {
	//Check if we have a username or a userID
	if (parseInt(username, 10) == username) {
		if (GM_getValue(username, false) !== false) {
			return true;
		}
	}
	else {
		//Go through the list and compare for username, if it's not found return false.
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i] == username) {
				return true;
			}
		}
	}

	//If not found by the above methods, the user is not in the blacklist.
	return false;
};

/*** START USER POST OBJECT ***/
//The user_post object has a name, a userID (usually), and various methods for expanding or collapsing posts and is created given the jquery object of the post.
function user_post(ele) {
	var postParent = ele.parent().parent();
	this.ele = ele;
	this.userPost = postParent.children('div[id^="message"]');
	this.userInfo = postParent.prev();
	//The useravatar may not exist, if it doesn't set the id to false.
	this.userID = this.userInfo.find('img[src^="http://cdn.myanimelist.net/images/useravatars/"]');
	if (this.userID.length <= 0) {
		this.userID = false;
	}
	//Otherwise get the ID from the image URL
	else {
		this.userID = this.userID.attr('src').substring(46, this.userID.attr('src').lastIndexOf('.'));
	}
	this.username = this.userInfo.find('a[href^="/profile/"]').text();

	//Flag that tells whether the post is ignored or not
	this.vis = true;
	this.ignoring = false;

	//Fix up the dom a bit.
	var tempUserInfo = this.userInfo.html();
	tempUserInfo = '<div class="user_info_block">' + tempUserInfo  + '</div>';
	this.userInfo.html(tempUserInfo);
	
	/*** Adding display elements ***/
	//For moderators and admins, make their rank bold and red.
	var infoHTML = '<span style="display:none;" class="userInfo"><a href="/profile/' + this.username +
		'"><strong>' + this.username + '</strong></a><br>';

	//Add display elements depending on rank
	if (this.userInfo.filter(':contains("Forum Moderator")').length > 0) {
		infoHTML = infoHTML + '<span style="color:red; font-weight:bold;">Forum Moderator</span><br>';
	}
	else if (this.userInfo.filter(':contains("Site Administrator")').length > 0) {
		infoHTML = infoHTML + '<span style="color:red; font-weight:bold;">Site Administrator</span>';
	}
	else if (this.userInfo.filter(':contains("Anime Moderator")').length > 0) {
		infoHTML = infoHTML + '<span style="color:red; font-weight:bold;">Anime Moderator</span><br>';
	}
	else if (this.userInfo.filter(':contains("Manga Moderator")').length > 0) {
		infoHTML = infoHTML + '<span style="color:red; font-weight:bold;">Manga Moderator</span><br>';
	}
	else if (this.userInfo.filter(':contains("DB Administrator")').length > 0) {
		infoHTML = infoHTML + '<span style="color:red; font-weight:bold;">DB Administrator</span>';
	}

	//If online, add an online note, otherwise say offline
	if (this.userInfo.filter(':contains("Online")').length > 0) {
		infoHTML = infoHTML + '<span style="color:green;">Online</span></span>';
	}
	else  {
		infoHTML = infoHTML + '<br>Offline</span>';
	}
	this.userInfo.children('div').after(infoHTML);
	

	//Set the expand/collapse link and ignore user links
	ele.prepend('<a class="ign_user_post_lnk2" href="javascript:void(0);"></a><p class="extra_dash" style="display:none;"> - </p><a class="ign_user_post_lnk" href="javascript:void(0);">Ignore User</a> -');
}

//Returns whether the user should be ignored or not.
user_post.prototype.to_ignore = function () {
	//If we don't have a userID for the user, check with their username.
	if (this.userID === false) {
		//Check if the username is in the blacklist, if they are, they need to be ignored.
		if (blackList.is_in(this.username)) {
			return true;
		}
	}
	//Otherwise get the username substring from the element.
	else {
		//Ignore the user if blacklisted.
		if (blackList.is_in(this.userID)) {
			return true;
		}
	}
	return false;
};

//Returns mod warning message.
user_post.prototype.mod_warn = function () {
	//The warning that a user should be given when attempting to blacklist an admin/forum mod
	return  'Warning! This user is a site admin or moderator. You are free to ignore this user, ' +
				'however, remember that moderators or admins will occasionally post warnings. If ' +
				'such a warning is posted and you fail to adhere to it your account could be banned ' +
				'temporarily or permanently from all MAL services. Are you still sure you want to ignore this user?';	
}

//Gives the user a message if they are trying to ignore a mod. 
	//Returns true if the username should still be ignored and false otherwise.
user_post.prototype.check_mod = function () {
	//Check for administrator/forum moderator ranks in the userinfo section and return a warning.
	if (this.userInfo.filter(':contains("Forum Moderator")').length > 0 || this.userInfo.filter(':contains("Administrator")').length > 0) {
		return confirm(this.mod_warn());
	}
	//If it is not a mod, return false.
	return true;
};

//Adds the appropriate onclick function to the ignore user or expand/collapse link below each post.
user_post.prototype.add_link_event = function () {
	//Get the username of the current post so it can be passed to the event handling funciton
	var username = this.username;
	var userID = this.userID;
	var thisObj = this;

	//Add the event to the expand link
	this.ele.children('a.ign_user_post_lnk2').bind('click', function() {
		thisObj.toggle_vis();
	});

	//We are adding the whole ignore user event.
	this.ele.children('a.ign_user_post_lnk').bind('click', function () {
		//If the userID doesn't exist, set the key to the username.
		if (userID === false) {
			userID = username;
		}

		//If already ignored (Determined by blacklist state)... then unignore them!
		if (thisObj.to_ignore() === true) {
			//We're unignoring, update the links. Make sure to unignore all possible variations.
			blackList.rem(userID);
			blackList.rem(username);
			objs.toggle_user(username, true);
		}
		//Otherwise ignore them...
		else {
			//Check if the user is a moderator, if so...
			if (thisObj.check_mod()) {
				//If blacklisted successfully... toggle the user posts
				if (blackList.add(userID, username)) {
					objs.toggle_user(username, false);
				}
			}
		}
	});
};

//Makes a post visible or invisible.
user_post.prototype.toggle_vis = function () {
	if (this.vis === false) {
		//Update the visibility of the post
		this.userPost.attr('style', 'display:inline;');
		//Collapse the signature. Make sure it is the signature and 
		this.userPost.nextAll('.sig').attr('style', 'display:block;');
		//Finally, collapse the userinfo area
		this.userInfo.children('div').attr('style', 'display:block;');
		//When visible, we don't want it to display the extra userinfo
		this.userInfo.children('div').next().attr('style', 'display:none;');

		//Update the link to explain its function properly.
		this.ele.children('a.ign_user_post_lnk2').text('Collapse Post');

		//If we are unignoring the user... update the links
		if (this.ignoring == true) {
			this.ele.children('a.ign_user_post_lnk').text('Ignore User');
			this.ele.children('a.ign_user_post_lnk2').text('');
			this.ele.children('p.extra_dash').attr('style', 'display:none');
		}

		//Update the visibility flag to show the post is not hidden.
		this.vis = true;
	}
	else {
		//Ignore post, userInfo and signature
		this.userPost.attr('style', 'display:none;');
		this.userPost.nextAll('.sig').attr('style', 'display:none;');
		this.userInfo.children('div').attr('style', 'display:none;');
		this.userInfo.children('div').next().attr('style', 'display:block;');

		//Update the links
		this.ele.children('p.extra_dash').attr('style', 'display:inline;');
		this.ele.children('a.ign_user_post_lnk2').text('Expand Post');
		this.ele.children('a.ign_user_post_lnk').text('Unignore User');

		//Update the visibility flag to show the post is being hidden.
		this.vis = false;
	}
};

//Checks if the user has changed their nick, if they have, it checks if the new nick is already ignored, if not, it blacklists the new nick.
user_post.prototype.check_new_nick = function () {
	if (parseInt(this.userID, 10) != this.userID) {
		pass_userID = this.username;
	}
	else {
		pass_userID = this.userID;
	}
	
	if (!blackList.is(pass_userID, this.username) && (blackList.is_in(this.userID))) {
		//Blacklist the new nick
		blackList.add(pass_userID, this.username);
	}
};

/*** END USER POST OBJECT ***/

/*** START USER QUOTE OBJECT ***/
//This object is for quotes and has to rely on usernames.
function user_quote(ele) {
	this.quote = ele;

	//Get the username from the quote
	this.username = this.quote.children('strong:first').text();
	//There are various cases due to scripts used for quotes that we will want to cover:
	if (this.username.indexOf('[') > this.username.indexOf(' ')) {
		this.username = this.username.substring(0, this.username.indexOf('['));
	}
	else {
		this.username = this.username.substring(0, this.username.indexOf(' '));
	}
	
	//Flag to tell whether a comment is ignored or not.
	this.vis = true;

	//Add a link to the quote for expanding/collapsing
	this.quote.after('<br style="display:none;" class="ign_user_quote"/><a class="ign_user_quote_lnk" href="javascript:void(0);"></a><br style="display:none;" class="ign_user_quote"/>');
}

//Checks if the quote user should be ignored or not
user_quote.prototype.to_ignore = function () {
	if (blackList.is_in(this.username)) {
		return true;
	}
	return false;
};

//Toggles visibility of quotes
user_quote.prototype.toggle_vis = function () {
	if (this.vis === false) {
		this.quote.attr('style', 'display:block;');

		//Add the collapse link
		this.quote.next().next().filter('a.ign_user_quote_lnk').text('Collapse ' + this.username + '\'s quote');

		//If we are unignoring the user... update the links.
		if (!this.to_ignore()) {
			this.quote.next().next().filter('a.ign_user_quote_lnk').text('');
			this.quote.next().filter('.ign_user_quote').attr('style', 'display:none;');
			this.quote.next().next().next().filter('.ign_user_quote').attr('style', 'display:none;');
		}

		//Update the visibility flag
		this.vis = true;
	}
	else {
		//Make sure the contents are encapsulated before hiding them.
		this.quote.attr('style', 'display:none;');

		//Change the text of the expand link.
		this.quote.next().next().filter('a.ign_user_quote_lnk').text('Expand ' + this.username + '\'s quote.');
		this.quote.next().attr('style', 'display:inline;');
		this.quote.next().next().next().attr('style', 'display:inline;');

		//Update the visibility flag
		this.vis = false;
	}
};

//Adds the events to the collapse/expand link for ignored quotes.
user_quote.prototype.add_link_event = function () {
	var thisObj = this;
	this.quote.next().next().filter('a.ign_user_quote_lnk').bind('click', function () {
		thisObj.toggle_vis();
	});
};
/*** END USER QUOTE OBJECT ***/

/*** START USER OBJECTS OBJECT ***/
//The object is a list of the user_post and user_quote objects.
function user_objects() {
	this.posts = [];
	this.quotes = [];

	//An internal pointer that starts just before the first array index.
	this.pointer = -1;
}

//Adds an object to the list
user_objects.prototype.add = function (obj) {
	//If it's a post object, add it to the post list, otherwise add it to the quote list.
	if (typeof(obj.quote) == 'undefined') {
		//Can't be more than 20 posts on a page, stop adding here!
		if (this.posts.length < 21) {
			//Then this is a post, add it to the posts list.
			this.posts[this.posts.length] = obj;
		}
	}
	else {
		this.quotes[this.quotes.length] = obj;
	}
};

//Loops through posts and quotes and collapses all authored by the given username.
user_objects.prototype.toggle_user = function (username, unignoring) {
	//Find each post and quote from that user and toggle the visibility.
	for (var i = 0; i < this.posts.length || i < this.quotes.length; i++) {
		if (i < this.posts.length) {
			if (this.posts[i].username === username) {
				//Flag the post as being ignored
				this.posts[i].ignoring = true;

				//Toggle the post only if it isn't in the state that we want it to be in.
				if (this.posts[i].vis !== unignoring) {
					//Toggle visibility of the post
					this.posts[i].toggle_vis();
				}
				//Remove the 'collapse post' link on any posts that were expanded previous to unignoring the user.
				else if (this.posts[i].ele.children('a.ign_user_post_lnk2').text() == 'Collapse Post') {
					this.posts[i].ele.children('a.ign_user_post_lnk').text('Ignore User');
					this.posts[i].ele.children('a.ign_user_post_lnk2').text('');
					this.posts[i].ele.children('p.extra_dash').attr('style', 'display:none');
				}

				//Flag the post as not being ignored.
				this.posts[i].ignoring = false;
			}
		}
		if (i < this.quotes.length && this.quotes[i].username === username) {
			if (this.quotes[i].vis !== unignoring) {
				this.quotes[i].toggle_vis();
			}
			//Remove the 'collapse post' link on any posts that were expanded previous to unignoring the user.
			else if (this.quotes[i].quote.next().next().text().length > 0) {
				//Remove expand/collapse link text
				this.quotes[i].quote.next().next().text('');
				//Remove first break line
				this.quotes[i].quote.next().attr('style', 'display:none;');
				//Remove final break line
				this.quotes[i].quote.next().next().next().attr('style', 'display:none;');
			}
		}
	}
};

//Advances the pointer by one and returns true, if there are no more objects in the list it returns false
user_objects.prototype.next = function () {
	this.pointer++;
	if (this.pointer >= this.posts.length && this.pointer >= this.quotes.length) {
		//Reset the pointer and return false
		this.pointer = -1;
		return false;
	}
	else {
		return true;
	}
};

//Gets the post object at the current pointer position.
user_objects.prototype.currObj = function (isPost) {
	if (isPost === true && typeof(this.posts[this.pointer]) !== 'undefined') {
		return this.posts[this.pointer];
	}
	else if (isPost === false && typeof(this.quotes[this.pointer]) !== 'undefined') {	
		return this.quotes[this.pointer];
	}
	else {
		//Return false if the object does not exist.
		return false;
	}
};
/*** END USER OBJECTS OBJECT ***/

//This function adds the links that allow you to ignore or unignore a user
function ign_main() {
	//Add an ignore user link to each post and ignore posts of blacklisted users.
	$('div[id^="message"] ~ div:not(.sig) div:not(.quotetext)').each(function () {
		var currPost = new user_post($(this));

		//Add the post to the objects list.
		objs.add(currPost);

		//Check if this username is new or not
		currPost.check_new_nick();
	
		//Check for quotes in the post that are from ignored users.
		currPost.userPost.parent().parent().find('div.quotetext').each(function () {
			//Create the quote object
			var currQuote = new user_quote($(this));

			//Add the quote to the user_objects() object
			objs.add(currQuote);
		});
	});

	//Traverse the user_objects post list and ignore the blacklisted users.
	while (objs.next()) {
		//Get the objects
		var currQuoteObj = objs.currObj(false);
		var currPostObj = objs.currObj(true);

		if (currPostObj !== false) {
			//If the user is blacklisted, collapse their posts.
			if (currPostObj.vis === true && currPostObj.to_ignore()) {
				objs.toggle_user(currPostObj.username, false);
			}

			//Add the link event to the current post's link.
			currPostObj.add_link_event();
		}
		if (currQuoteObj !== false) {
			//If the user is blacklisted, collapse their quotes.
			if (currQuoteObj.vis === true && currQuoteObj.to_ignore()) {
				objs.toggle_user(currQuoteObj.username, false);
			}

			//Add expand/collapse quote events.
			currQuoteObj.add_link_event();
		}
	}
	//Add the control panel link for the script.
}

//Opens a control panel and lists the ignored users. A user can then remove ignores or settings here.
function open_CP() {
	return false;
}

//Blacklist and user_objects are global objects.
var blackList = new blacklist();
var objs = new user_objects();

//Alter the interface to reflect the user's blacklists. Greasemonkey will wait for the DOM for us, jquery seems compelled to wait for images, so a straight function call will do.
//$('td.forum_boardrow1:last div:last').ready(ign_main);
ign_main();