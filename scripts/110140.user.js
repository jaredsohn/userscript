// ==UserScript==
// @name                100 Hour Board Keyboard Navigation
// @namespace	        http://nprice.thornvalley.com
// @description	        adds "p" and "n" keyboard shortcuts to the 100 hour board
// @include		http://theboard.byu.edu*
// @exclude		http://theboard.byu.edu/questions/ask*
// @exclude		http://theboard.byu.edu/search*
// @include		https://theboard.byu.edu*
// @exclude		https://theboard.byu.edu/questions/ask*
// @exclude		https://theboard.byu.edu/search*
// ==/UserScript==

var _postOffsets = [];

main();

function main()
{
	_postOffsets = enumeratePostOffsets();
	document.addEventListener("keypress", handleKeypress, true);
}

function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return curtop;
	}
}

function enumeratePostOffsets()
{
	var posts = document.querySelectorAll(".post");
	var offsets = [];
	var currOffset = 0;
	for (var i = 0; i < posts.length; i++)
	{
		currOffset = findPos(posts[i]);
		//GM_log(currOffset);
		offsets.push(currOffset);
	}
	return offsets;
}

function findAdjacentOffsetsToCurrent()
{
	var currScroll = window.scrollY;
	var prev = 0;
	var next = window.scrollMaxY;
	var numPosts = _postOffsets.length;
	
	for (var i = 0; i < numPosts; i++)
	{
		var offset = _postOffsets[i];
		//Find the lowest offset that is greater than currScroll for next
		if (offset > currScroll && offset < next)
		{
			next = offset;
			prev = (i - 2) < 0 ? 0 : _postOffsets[i-2];
			//GM_log("current: " + currScroll + " next: " + next + " prev: " + prev + " i: " + i);
			break; //We can stop here since _postOffsets is sorted
		}
	}
	
	var lastPos = _postOffsets[numPosts - 1];
	if (currScroll > lastPos) 
	{
		//The current scroll position was greater than the end of the list.
		prev = lastPos;
	}
	else if (currScroll == lastPos)
	{
		//The current scroll position is equal to the end of the list.
		prev = _postOffsets[numPosts - 2]
	}
	
	//GM_log("current: " + currScroll + " next: " + next + " prev: " + prev);
	return {prev: prev, next: next};
}

function handleKeypress(ev)
{
	if (ev.target.tagName == "INPUT" || ev.target.tagName == "TEXTAREA")
	{
		return;
	}
	var adjOffsets = findAdjacentOffsetsToCurrent();
	switch (ev.which)
	{
		case 110: //n
			window.scroll(0, Math.max(0, adjOffsets.next));
			break;
		case 112: //p
			window.scroll(0, Math.max(0, adjOffsets.prev));
			break;
		default:
			break;
	}
	//GM_log("pressed key: " + ev.which);
}

