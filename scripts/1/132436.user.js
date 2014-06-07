// ==UserScript==
// @name           NGMan7 User Block
// @namespace      NGBBSUB
// @description    Blocks troll. Add more users block below to "var cunts" EXAMPLE: var cunts = ["ngman7", "dumbass993", "tomfulp", "avxavxavx"];
// @include        http://www.newgrounds.com/bbs/topic/*
// ==/UserScript==

var cunts = ["ngman7"];

var posts = document.getElementsByTagName('div');
for(var i = 0; i < posts.length; i++) {
	if(posts[i].className == "three3")
	{
		for(var j = 0; j < cunts.length; j++)
		{
			if(posts[i].innerHTML.indexOf('<a href="http://'+cunts[j]+'.newgrounds.com/">') > -1)
			{
				posts[i].innerHTML = '<font style="color: #FF2222">Blocked - '+cunts[j]+'</font>';
			}
		}
	}
}