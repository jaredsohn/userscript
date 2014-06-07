// ==UserScript==
// @name          Facebook Automatic Posts Liker
// @namespace     http://h4ckcod3r.in/userscripts
// @description	  likes automatically all the displayed posts in facebook
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==


function likeFunc() {
	if(document.title=="Techkriti")
	{
		var posts = document.getElementsByTagName('button'), gopi = [];
		
		// Select only the Like buttons.
		for (var i = 0; i < posts.length; i++) {
			if (posts[i] && posts[i].title == 'Like this item') {
				gopi.push(posts[i]);
			}
		}
		
		startLiking(gopi);
	}
    
    // Wait for each Like to be processed before trying the next.
    window.setTimeout(function() {
        likeFunc();
    }, 3000);
}

function startLiking(gopi)
{
	if(gopi && gopi.length)
    {
		gopi[0].click();
	}
	
	window.setTimeout(function() {
        startLiking(gopi.splice(1));
    }, 2000);
}

likeFunc();
void 0;