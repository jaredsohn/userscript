// ==UserScript==
// @name           Motherless enhancer
// @description    Video download feature (working as of March 2013) and small enhancements
// @namespace      nipsden.blogspot.com
// @include        http://motherless.com/*
// @version        2013-03-13.1
// @require        http://sizzlemctwizzle.com/updater.php?id=106396&days=7&uso
// ==/UserScript==

// Changes:
// 2013-03-13.1: Replaced the direct video download button with a link
// 2012-10-26.1: Initial support for Motherless' new design
// 2011-11-26.1: Initial support for Motherless' overhaul
// 2011-10-14.1: Highlight the "Our Friends" block of external links to better differentiate it
// 2011-08-22.2: More fixes
// 2011-08-22.1: Fix infinite loop
// 2011-07-22.3: Back to old version numbers, this should be enough to trigger an auto update
// 1.1.2 (2011-07-22): Auto-updates
// 1.1.1 (2011-07-22): Change version to test auto update
// 2011-07-22.2: Remove contextual ads from comments too
// 2011-07-22: Remove contextual ads
// 2011-07-08: First version

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

// Video download
if (unsafeWindow.__fileurl) {
	var file = unsafeWindow.__fileurl;
	GM_log('Video location: '+file+'\n@'+window.location.href);

	var btn = document.getElementById('button-download');
	var dummy = document.createElement('SPAN');
	//dummy.innerHTML = '<button class="control-button download" id="button-download-true"><img src="/images/icons/download.png" />Download (really)</button>';
	dummy.innerHTML = '<a class="control-button download" id="button-download-true" href="'+file+'?start=0"><img src="/images/icons/download.png" />Download (really)</a>';
	var newBtn = dummy.firstChild;
	var ref = document.getElementById('dim');
	ref.parentNode.insertBefore(newBtn, ref.nextSibling);
	//newBtn.addEventListener('click', function() { window.location=file+'?start=0'; });	
	//newBtn.setAttribute('title', file);
}

// TO-DO: Is this required (Fall 2012)?
// "Pop underline" removal ("contextual" ads)
function removeContextualAds() {
	$('.pop.underline').each(function() {
		var p = this.parentNode;
		var r = document.createElement('SPAN');
		r.innerHTML = this.innerHTML;
		p.replaceChild(r, this);
	});
}

// Animated Strip
//xpath('//p[@class="ellipsis"]//strong[text()=Favorited
var vp = false
var $ = unsafeWindow.$;
var bindStripTries = 0;
function bindStripMod() {
	bindStripTries++;
	var rel = $('#content-jumplinks .media-linked a.plain.gold');
	// Adding this function directly might fail since it will sometimes run before motherless' own,
	// making it useless.
	// Adding it in the window event 'load' won't help either, instead retry a few times
	if (!rel || rel.length < 1) {
		// Let's try again
		if (bindStripTries <= 3) {
			GM_log('Strip not ready, strike '+bindStripTries+'\n@'+window.location.href);
			setTimeout ( bindStripMod, 500 );
		}
		else {
			GM_log("Failed to attach the strip modification");
		}
		return;
	}
	var faved = rel.parents('div.media-linked');
	if (!faved || faved.length != 1) {
		GM_log("Page structure unexpected");
		return;
	}
	$(faved).find('.video_strip').each(function () {
		var bi = $(this).css('background-image');
		if (!bi) return;
		var m = bi.match(/url\("?([^"\)]*).*\)/)
		if (!m) return;
		var stim = m[1];
		var anim = m[1].replace('-strip.jpg', '.gif');
		$(this).hover(function hIn() {
			this.style.backgroundImage = 'url('+anim+')';
		}, function hOut() {
			this.style.backgroundImage = 'url('+stim+')';
		});
	})
}

// TO-DO: Is this required in the new (Fall 2012) design?
var bindCommentsTries = 0;
function bindCommentsMod() { // Dynamic ad removal (in comments)
	bindCommentsTries++;
	var rel = $('#content-comments .media-comment-contents');
	// Adding this function directly might fail since it will sometimes run before motherless' own,
	// making it useless.
	// Adding it in the window event 'load' won't help either, instead retry a few times
	if (!rel || rel.length < 1) {
		// Let's try again
		if (bindCommentsTries <= 3) {
			GM_log('Comments not ready, strike '+bindCommentsTries+'\n@'+window.location);
			setTimeout ( bindCommentsMod, 500 );
		}
		else {
			GM_log("Failed to attach the comments modification");
		}
		return;
	}
	removeContextualAds();
}

// "Our Friends" block
var bindOurFriendsTries = 0;
function bindOurFriendsMod() { // Dynamic modification of the "Our Friends" block
	var x=xpath('//span[text()="Our Friends"]/..');
	if (x.snapshotLength != 1) {
		if (bindOurFriendsTries <= 3) {
			GM_log('"Our Friends" not ready, strike '+bindOurFriendsTries+'\n@'+window.location);
			bindOurFriendsTries++;
			setTimeout(bindOurFriendsMod, 500);
		}
		else {
			GM_log('"Our Friends" block couldn\'t be recognized, won\'t try to fix it');
		}
		return;
	}
	var of=x.snapshotItem(0);
	var cssRules = {
		background: '#332'
	};
	$(of).css(cssRules);
	$(of).find('.tiny_thumb a').each(function x() {
		var href=$(this).attr('href').replace('http://', '');
		$('<span style="font-size:x-small;">'+href+'</a>').appendTo($(this));
	});
}

removeContextualAds(); // Static (e.g. boards)
$('#content-jumplinks').viewPoint(bindStripMod);
$('#content-jumplinks').viewPoint(bindOurFriendsMod);
$('#content-comments').viewPoint(bindCommentsMod);
