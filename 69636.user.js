// ==UserScript==
// @name          4chan Spam Filter
// @description   Gets rid of posts containing given keywords on 4chan.
// @match         http://boards.4chan.org/*
// @exclude       http://*.4chan.org/*.jpg
// ==/UserScript==

function filter(){
	var temp = "";
	var removed = 0;
	var posts = document.getElementsByTagName("blockquote");
	var blockfilter = [
		"http://freeporn0zs.blogspot.com/",	//porn spam
		"http://www.youtube.com/watch?v=H5Eksc3ZGBw",	//weird vid being used as spam
		"http://rapidshare.com/files/299651627/li72352.rar",	//rapidshare spam
		"http://www.mediafire.com/file/zyeumuzjwbg/over",	//porn spam
		"http://pornovideosite.blogspot.com/",	//porn spam
		"http://bit.ly",	//porn spam
		"plz stop spammen ur shitty boarded on",	//anontalk spamming
		"www.bestiqtest.com",	//enough already!
		"ZOMG SECRET RAID BOARD",	//random spam
		"CHEATSBRASIL.COM",	//random spam
		"Pimpinjg",	//random spam
		"itsover(9000).net",	//spam
		"itsover9000(.)net",	//spam
		"www.wutchan.org",	//spam
		"paris2luv",	//spam
		"ihjlink.info",	//spam
		"4chanscapepk.t35.com",	//spam
		"sup im shani i just had my 5th abortion",	//spam
		"GAY NIGGER ASSOCIATION OF AMERICA",	//spam
		"freepornpasswordz.tumblr.com",	//spam
		"tiny chat (.) com/spambot",	//spam
		"www.WOWPRIV.(t)(k)",	//spam
		"HTTP 404",	//spam
		"DNS",	//spam
		"chantard.org",	//spam
		"nahCnonameF",	//spam
	];

	for (i = 1; i < posts.length; i++){
		for(j = 0; j < blockfilter.length; j++){
			if (posts[i].innerHTML.indexOf(blockfilter[j]) != -1){
				console.log("Caught:\n" + posts[i].innerHTML);
				console.log("Rule:\n" + blockfilter[j]);
					posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				// if (temp.indexOf(blockfilter[j]) == -1){
					// temp += (blockfilter[j]) + "\n";
				// }
				// i -= 1;
				// j = blockfilter.length;
				// removed++;
			}
		}
	}
	//if (removed > 0) document.getElementsByTagName("textarea")[0].value = temp + "Removed: " + removed;

}

filter();