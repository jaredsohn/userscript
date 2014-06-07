// ==UserScript==
// @name           GoogleLabs FollowFinder
// @namespace      http://kinrowan.net
// @description    FollowCost for Google Labs FollowFinder. Based heavily on Follow Cost for Twitter profiles [http://userscripts.org/scripts/show/42691]
// @include        http://followfinder.googlelabs.com/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function updateFollowCost() {

	if($('.twerson')) {

		var tw = $('.twerson');

		tw.each( function() {

			var username = $(this).find(".username").text().substr(1);
			var unamenode = $(this).find(".username");

			$.getJSON("http://followcost.com/" + username + ".json?callback=?", function(json) {
				var markup = "&nbsp;<span class='wrapper' style='font-size: small;'>(<span class='label'>Follow Cost</span> <a href='http://followcost.com/" + username +"' class='url' rel='nofollow'>" + json.milliscobles_all_time + " m&Sigma;</a>)</span>"
				unamenode.html( unamenode.html() + markup );
			});

		});

  }
}

function GM_wait()
{

    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery;letsJQuery();
    }
}

function letsJQuery()
{
  updateFollowCost();
}

if(navigator.appVersion.match('AppleWebKit')) {
  updateFollowCost();
} else {
  GM_wait();
}