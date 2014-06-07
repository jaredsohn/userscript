// ==UserScript==
// @name           Facebook Friend Colorizer
// @namespace      happinessiseasy
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

/*
	USER-EDITABLE FIELDS
*/
//Add/remove people (or pages!) to this list to have them show up as special (e.g. yourself, spouse, kids, best friends, etc.)
//make sure the names match their display exactly
var special = "";

//These colors may be modified to suit your preferences
var friendsColor	= {r:000,	g:120,	b:025}; //Medum Green
var likesColor		= {r:000,	g:120,	b:025}; //Medium Green
var specialColor	= {r:000,	g:200,	b:025}; //Bright Green
var selfColor		= {r:210,	g:190,	b:025}; //Golden Yellow
var noneColor		= {r:120,	g:000,	b:025}; //Medium Red

//How often we should check FB for changes to your friends/likes lists
//default: 6000000 millis / 100 minutes / 1 hour, 40 minutes
var listsUpdateInterval = 6000000;
	
//How often we should check FB for a new token. If you log out and back in within this timeframe, this script will not run
//default: 600000 millis / 10 minutes
var tokenUpdateInterval = 60000;

/*
	NON-USER-EDITABLE FIELDS
*/
var status = 2;
var READY = 0;
//feed people
var elementSelector = "div.actorName > a, div.commentContent > a, a.passiveName, a.fbxWelcomeBoxName"
//reminders
+ ", div.fbReminders > div > a > div > div > div > span.fbRemindersTitle > strong"
//notification bar
+ ", span.blueName"
//author on a permalink story
+ ", div.permalink_stream > div.fbStreamPermalinkHeader > div > div > a";
//this gets false positives, e.g. from Foursquare posts
//a[data-hovercard], 

var friends;
var likes;
var self;	
var now = new Date().getTime();

/*
	The initial requests to get your name and the names of your friends and likes
*/
function getLists(accessToken) {
	var lastListsUpdate = GM_getValue("lastListsUpdate");	
	now = new Date().getTime();
	if (!lastListsUpdate || ((now - lastListsUpdate) > listsUpdateInterval)) {
	
		unsafeWindow.console.log("Sending AJAX Request (friends)");
		GM_xmlhttpRequest({
			method: 'get',
			url: "https://graph.facebook.com/me/friends?access_token=" + accessToken,
			onload: function(result) {
				friends = result.responseText;
				GM_setValue("friends", friends);
				if (status == READY) {
					waitForKeyElements(elementSelector, colorize);
				} else {
					status--;
				}
			}
		});

		unsafeWindow.console.log("Sending AJAX Request (likes)");	
		GM_xmlhttpRequest({
			method: 'get',
			url: "https://graph.facebook.com/me/likes?access_token=" + accessToken,
			onload: function(result) {
				likes = result.responseText;
				GM_setValue ("likes", likes);
				if (status == READY) {
					waitForKeyElements(elementSelector, colorize);
				} else {
					status--;
				}
			}
		});
		
		unsafeWindow.console.log("Sending AJAX Request (self)");
		GM_xmlhttpRequest({
			method: 'get',
			url: "https://graph.facebook.com/me?access_token=" + accessToken,
			onload: function(result) {
				self = JSON.parse(result.responseText).name;
				GM_setValue ("self", self);
				if (status == READY) {
					waitForKeyElements(elementSelector, colorize);
				} else {
					status--;
				}
			}
		});
	
		GM_setValue("lastListsUpdate", "" + now);
	} else {
		//use stored values
		friends = GM_getValue("friends");
		likes = GM_getValue("likes");
		self = GM_getValue("self");
		waitForKeyElements(elementSelector, colorize);
	}
}



/*
	Check to see if candidate is a friend
*/
function isFriend(candidate) {
	//todo search as json instead?
	return (friends.indexOf(candidate)!=-1);
}

/*
	Check to see if candidate is a liked page
*/
function isLikedPage(candidate) {
	//todo search as json instead?	
	return (likes.indexOf(candidate)!=-1);	
}

/*
	Check to see if candidate is special 
*/
function isSpecial(candidate) {
	//todo search as json instead?	
	return (special.indexOf(candidate)!=-1);	
}

/*
	Check to see if candidate is you
*/
function isSelf(candidate) {
	return (self == candidate);
}

/*
	Color based on whether it's friends/likes/you or has no connection to you
*/
function colorize(actorNode) {
	var candidate = actorNode.text();
	if (candidate != "") {
		if (isSpecial(candidate)) { //your special list
			$(actorNode).css('color', 'rgb(' + specialColor.r + ',' + specialColor.g +','+ specialColor.b +')');
		} else if (isFriend(candidate)) { //your friends
			$(actorNode).css('color', 'rgb(' + friendsColor.r + ',' + friendsColor.g +','+ friendsColor.b +')');
		} else if (isLikedPage(candidate)) { //pages you like
			$(actorNode).css('color', 'rgb(' + likesColor.r + ',' + likesColor.g +','+ likesColor.b +')');			
		} else if (isSelf(candidate)) { //you
			$(actorNode).css('color', 'rgb(' + selfColor.r + ',' + selfColor.g +','+ selfColor.b +')');
		} else { //no connection
			$(actorNode).css('color', 'rgb(' + noneColor.r + ',' + noneColor.g +','+ noneColor.b +')');
		}
		$(actorNode).css('color', 'rgb(' + noneColor.r + ',' + noneColor.g +','+ noneColor.b +')');		
	}
}

/*
	Finds all elements that match selectorTxt and waits for new ones to appear on the page
*/
function waitForKeyElements (selectorTxt, actionFunction) {
    var targetNodes = $(selectorTxt);
    if (targetNodes  &&  targetNodes.length > 0) {
		targetNodes.each(function () {
            var jThis = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
            if (!alreadyFound) {
                actionFunction(jThis);
                jThis.data ('alreadyFound', true);
            }
        });
    }

    //Get the timer-control variable for this selector
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

	//Set a timer, if needed
	if (!timeControl) {
		timeControl = setInterval (function () {
		waitForKeyElements (selectorTxt,actionFunction,false);},500);
		controlObj [controlKey] = timeControl;
	}
	
    waitForKeyElements.controlObj = controlObj;
}

/*
	Get a token, then fire off getLists
*/
var token;
var lastTokenUpdate = GM_getValue("lastTokenUpdate");
now = new Date().getTime();
if (!lastTokenUpdate || ((now - lastTokenUpdate) > tokenUpdateInterval)) {
	unsafeWindow.console.log("Sending AJAX Request (token)");
	GM_xmlhttpRequest({
		method: 'get',
		url: "https://developers.facebook.com/docs/reference/api/",
		onload: function(result) {
			tokenToEnd = result.responseText.substring(result.responseText.indexOf('access_token=') + 13);
			token = tokenToEnd.substring(0,tokenToEnd.indexOf("\">https://graph.facebook.com/"));
			GM_setValue("token", "" + token);
			getLists(token);
		}
	});

	GM_setValue("lastTokenUpdate", "" + now);
} else {
	token = GM_getValue("token");
	getLists(token);
}