// ==UserScript==
// @name          Facebook Automatic Posts Liker
// @description	  likes automatically all the displayed posts in facebook
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==


function likeFunc() {
	if(document.title=="SocioSquare")
	{
		var posts = document.getElementsByTagName('button'), puneet = [];
		
		// Select only the Like buttons.
		for (var i = 0; i < posts.length; i++) {
			if (posts[i] && posts[i].title == 'Like this item') {
				puneet.push(posts[i]);
			}
		}
		
		startLiking(puneet);
	}
    
    // Wait for each Like to be processed before trying the next.
    window.setTimeout(function() {
        likeFunc();
    }, 3000);
}

function startLiking(puneet)
{
	if(puneet && puneet.length)
    {
		puneet[0].click();
	}
	
	window.setTimeout(function() {
        startLiking(puneet.splice(1));
    }, 2000);
}

likeFunc();
void 0;