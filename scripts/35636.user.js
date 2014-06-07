// ==UserScript==
// @name          Habrahabr.ru Blog Filter
// @namespace      HabrIgnore
// @include        http://habrahabr.ru/*
// @include        http://*.habrahabr.ru/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { jQuery = unsafeWindow.jQuery; jQuery.noConflict(); main(); }
}
GM_wait();

var saveConfDelimiter = ',';
var bannedBlogs = GM_getValue('b_bannedBlogs', '').split(saveConfDelimiter);

function toggleBannedBlogsVisibility(show)
{
	for (i = 0; i < bannedBlogs.length; i++) {
		if (bannedBlogs[i] != ''){
			toggleBlogVisibility(bannedBlogs[i], show, 1);
		}
	}
}

function toggleBlogVisibility(blogName, show, mode){
	var target = jQuery('div.hentry:has(a[href=' + blogName + '])');
	if (show)
		target.show();
	else
		target.hide(mode);
}

function isBanned(blogName)
{
	for (i = 0; i < bannedBlogs.length; i++) {
		if (bannedBlogs[i] == blogName)
			return true;
	}
	return false;
}

function main() {
	if (get_IgnoreMode())
		toggleBannedBlogsVisibility(false);
	
	var divBan = document.createElement('div');
	 jQuery(divBan).css({
		height: '10px',
		width: '10px',
		position: 'absolute',
		display: 'none',
	});
	 jQuery(divBan).html('<a class="button" id="aBanBlogButton" style="text-decoration: none;" href="javascript:void(0);" title="Drop!" >X</a>');
	document.body.appendChild(divBan);
	
	var aBan = document.getElementById('aBanBlogButton');
	aBan.addEventListener('click', function () {
		var blogName = divBan.target.href;
		if (isBanned(blogName)) {
			for (i = bannedBlogs.length - 1; i >= 0 ; i--) {
				if (bannedBlogs[i] == blogName)
					bannedBlogs.splice(i, 1);
			}
		}
		else {
			toggleBlogVisibility(blogName, false, 'normal');
			bannedBlogs.push(blogName);
		}

		 jQuery(divBan).hide();
		GM_setValue('b_bannedBlogs', bannedBlogs.join(saveConfDelimiter));
	}, false);
	
	
	var t;
	function onLeave()
	{
		t = setTimeout(function() {  jQuery(divBan).hide(); }, 500); 
	}

	function onEnter()
	{
		if (t != null) 
			clearTimeout(t);
			
		 jQuery(divBan).show(); 
		
		if (this != divBan)
		{
			jQuery(divBan).css('top', this.offsetTop - 10); 
			jQuery(divBan).css('left', this.offsetLeft); 

			divBan.target = this;
			 jQuery(aBan).text(isBanned(divBan.target.href) ? "+" : "X");
		}
	}

	 jQuery(divBan).bind("mouseenter", onEnter);
	 jQuery(divBan).bind("mouseleave",  onLeave);

	 jQuery('.blog').bind("mouseenter", onEnter);
	 jQuery('.blog').bind("mouseleave",  onLeave);
}

function set_IgnoreMode(value){
	GM_setValue('readerIgnoreMode', value)
}

function get_IgnoreMode() {
	return GM_getValue('readerIgnoreMode', true)
}

GM_registerMenuCommand("Habr -> Hide banned blogs", function(){
	set_IgnoreMode(true);
	toggleBannedBlogsVisibility(false);
});

GM_registerMenuCommand("Habr -> Show all blogs", function(){
	set_IgnoreMode(false);
	toggleBannedBlogsVisibility(true);
});
