// ==UserScript==
// @name           Flattr Integration for Twitter
// @namespace      hege.cc/userscripts
// @description    Shows a flattr-button for users, who have registered their twitter profile on flattr
// @match          *://twitter.com/*
// @version        1.3
// ==/UserScript==


function compat_wrapper(){


function with_jQuery(callback)
{
	try{
		unsafeWindow;
	}catch(e){
		unsafeWindow = window;
	}

	if( !unsafeWindow.jQuery )
		window.setTimeout(function(){with_jQuery(callback)}, 100);
	else
	{
		callback(unsafeWindow.jQuery);
	}
}


//var FLATTR_BADGE = '<img title="Flattr this" src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr User" class="tweet-flattr-button"/>'
var TWEET_FLATTR_BADGE = '<i class="flattr-button tweet-flattr-button with-ics"></i><b>Flattr</b>';
var USER_FLATTR_BADGE = '<i class="flattr-button user-flattr-button" ></i>Flattr';
var FLATTR_THING_BASE_URI='https://flattr.com/submit/auto?url=';

var s = document.createElement('script');
s.type = "text/javascript";
s.innerHTML = flattr_click.toString();
document.head.appendChild(s);

with_jQuery(function($){
	$(document.head).append('<style>'+
	'.flattr-button { background-image: url(https://flattr.com/_img/icons/flattr_logo_16.png)!important; background-color: inherit!important; padding-left:20px; height:16px;}\n' + 
	'.tweet-flattr-button { margin-bottom: -4px; }\n' + 
	'.user-flattr-button { margin: -1px; background-position: 0pt -1px; }\n' +
	'.action-flattr-container { }\n'  +
	'.open .original-tweet .stream-item-header .action-flattr-container { display: none; }\n'+
	'\n'+
	'#flattr-overlay {'+
	' position: fixed;'+
	' width: 100%;'+
	' height: 100%;'+
	' top: 0px;'+
	' left: 0px;'+
	' z-index: 10000;'+
	' text-align: center;'+
	'}\n'+
	'#flattr-overlay > div {'+
	' background: black;'+
	' opacity: 0.85;'+
	' width: 100%;'+
	' height: 100%;'+
	' position: absolute;'+
	' top: 0px;'+
	' z-index: -10;'+
	'}\n'+
	'#flattr-frame{'+
	' width: 680px; '+
	' height: 440px; '+
	' top: 100px;' +
	' position: relative;'+
	'}\n'+
	'</style>');

	$(document).on('DOMNodeInserted', function(event){
		$(event.target).find('.tweet, .profile-card-inner').andSelf().each(function(){
			if( !this.getAttribute('data-screen-name') ) {
				return;
			}

			var tweet_id = this.getAttribute('data-tweet-id');
			var link = "http://twitter.com/#!/" + this.getAttribute('data-screen-name') +
							(tweet_id ? '/status/'+tweet_id : '');

			if( $(this).hasClass('tweet') ) {
				add_tweet_flattr_button($(this), link);
			} else {
				add_user_flattr_button($(this), link);
			}
		});

		$(event.target).find('.profile-modal-header-inner').each(function(){
			var link = String($(this).find('a')[0]).replace(/^.*\//, "http://twitter.com/#!/");
			add_user_flattr_button($(this), link)
		});
	});

	function add_tweet_flattr_button(element, url)
	{
		element.find('ul.js-actions:not(:has(li.action-flattr-container))').prepend(
				'<li class="action-flattr-container"><a class="with-icn" onclick="return flattr_click(this);"'+
				'href="'+FLATTR_THING_BASE_URI+encodeURIComponent(url)+'" target="_blank">'+TWEET_FLATTR_BADGE+'</a></li>');
	}

	function add_user_flattr_button(element, url)
	{
		element.find('.username').append('<span style="display: inline;" class="follow-status">'+
				'<a href="'+FLATTR_THING_BASE_URI+encodeURIComponent(url)+'" onclick="return flattr_click(this)" target="_blank">'+
				USER_FLATTR_BADGE+
				'</a></span>');
	}


	$(document).keypress(function(event){
		if(event.which==0)
			$("#flattr-overlay").remove()
	});


	return 0;
});

function flattr_click(link){
	$(document.body).append('<div id="flattr-overlay" onclick="document.body.removeChild(this);">'+
				'<iframe id="flattr-frame" src="'+link.href+'" /><div></div></div>');
	return false;
}

} // compat_wrapper()

try {
	// we are not running inside GreaseMonkey
	if( unsafeWindow===window ) // usafeWindow should be undefined or === window
		throw "not GreaseMonkey"

	compat_wrapper();
}
catch (e) {
	// other browsers

	var s = document.createElement('script');
	s.type = "text/javascript";
	s.id = "flattr-integration-for-twitter";
	s.innerHTML = '('+compat_wrapper.toString()+')()';
	document.head.appendChild(s);
}
