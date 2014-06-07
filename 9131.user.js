// ==UserScript==
// @name          Whirlpool T-Shirt Thread Checker
// @version		  0.1
// @namespace     Whirlpool
// @description   Checks for new posts in the T-Shirt thread - http://forums.whirlpool.net.au/forum-replies.cfm?t=25432
// @include       http://forums.whirlpool.net.au/*
// @include       http://*.whirlpool.net.au/*  
// ==/UserScript==


$ = unsafeWindow.jQuery;

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.users.on.net/~johnson/whirlpool/wp.php?forum=35',
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	},
	onload: function(responseDetails) {
	var data = responseDetails.responseText;

		var tShirt = data.substr(data.indexOf('T-Shirts'),200);

		var LastPoster = tShirt.slice(tShirt.indexOf(': ')+2,tShirt.indexOf('&lt'));
		var replyCount = tShirt.slice(tShirt.lastIndexOf(': ')+2,tShirt.indexOf('</des'));
		if(GM_getValue("replyhCount") != replyCount || GM_getValue("replyhCount") == undefined){
			GM_setValue("replyhCount", replyCount);
			GM_setValue("LasthPoster", LastPoster);
			if(LastPoster == "Simon Wright"){
				var specUser = "Simon Wright";
				notifyUpdate(specUser);
			}
			else if(LastPoster == "Evan"){
				var specUser = "Evan";
				notifyUpdate(specUser);
			}
			else{			
			notifyUpdate();
			}
		}		
	}
	
});

function notifyUpdate(specUser){

	if(specUser == undefined){
		$('body').prepend('<h3 align="center" style="margin: 0pt; background-color: rgb(245, 145, 45); color: white;"><a style="color: white;" href="http://forums.whirlpool.net.au/forum-replies.cfm?t=25432&p=-1#bottom">New post in the T-Shirt Thread!</a></h3>');
	}
	else{
		$('body').prepend(specUser+'<h3 align="center" style="margin: 0pt; background-color: rgb(245, 145, 45); color: white;"><a style="color: white;" href="http://forums.whirlpool.net.au/forum-replies.cfm?t=25432&p=-1#bottom">&nbsp Has just posted in the T-Shirt Thread!</a></h3>');
	}

}


