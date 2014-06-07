// ==UserScript==
// @name           reddit.com - Subreddit Styles
// @namespace      v2
// @include        *.reddit.com/r/*
// @run-at document-start
// ==/UserScript==

function main()
{
	var	k = 'ss-'+reddit.post_site,
        v = localStorage.getItem( k )||0;

    // Add buttons
	$('div.titlebox span.fancy-toggle-button').after(' \
		<span style="" class="fancy-toggle-button toggle"><a tabindex="100" href="javascript:void(0)" style="margin-left:-5px" class="custom-css active remove">css</a></span> \
		<span style="" class="fancy-toggle-button toggle"><a tabindex="100" href="javascript:void(0)" style="margin-left:-5px" class="custom-flair active remove">flair</a></span> \
		<span style="" class="fancy-toggle-button toggle"><a tabindex="100" href="javascript:void(0)" style="margin-left:-5px" class="custom-thumbs active remove">thumbs</a></span><div />');

    // Add button actions
	$('a.custom-css').click(function(){v^=1});
	$('a.custom-flair').click(function(){v^=2});
	$('a.custom-thumbs').click( function(){v^=4});
	$('a[class|="custom"]').click(function(){localStorage.setItem(k,v);set()});

	function set(){

        // Get bitmask values
        var	c = !(v&1),
			f = !(v&2),
			t = !(v&4);

        // Show hide things.
		$('span.flair').css('display',f?'inline-block':'none' );
		$('a.thumbnail').css('display',t?'block':'none' );
		document.styleSheets[1].disabled = !c;

        // Set button state
		$('a.custom-css' ).toggleClass('add',!c);
		$('a.custom-flair').toggleClass('add',!f);
		$('a.custom-thumbs').toggleClass('add',!t);
	};
    set();

	// Add callbacks for flowwit script
	window.flowwit=window.flowwit||[];window.flowwit.push(set);
}

// Add script to the page.
document.addEventListener('DOMContentLoaded',function(e){var s=document.createElement('script');s.textContent="("+main.toString()+')();';document.head.appendChild(s)});



// Add CSS as soon as the head element exists (prevents jumping).
(function loadcss(){
    if(!document.styleSheets||!document.styleSheets[1])return setTimeout(loadcss);
    var k='ss-'+location.pathname.match(/\/r\/(\w+)/)[1],v=localStorage.getItem(k)||0;
    document.styleSheets[1].disabled = !!(v&1);
    var s=document.createElement('style');s.textContent='span.flair{display:'+(!(v&2)?'inline-block':'none')+'}a.thumbnail{display:'+(!(v&4)?'block':'none')+'}';document.head.appendChild(s);
})();