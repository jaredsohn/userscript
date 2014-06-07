// ==UserScript==
// @id             aff-video-visualizer
// @name           Adult Friend Finder Video Visualizer
// @version        0.6.1
// @namespace      masprivilegiado
// @author         Sindri is Horny
// @description    This tool permits to see videos from other members even as being a standard member only.
// @match          http://adultfriendfinder.com/*
// @homepage       https://sites.google.com/site/masprivilegiado/adult-friend-finder
// @updateURL      https://userscripts.org/scripts/source/151379.meta.js
// @run-at         document-end
// ==/UserScript==

///////////////
// Changelog //
///////////////
/* <UL>
<LI><B>0.5</B> - First beta release.
<LI><B>0.6</B> - Changed way of code inyection to be compatible with Chrome/Chromium.
</UL> */

/////////////
// Roadmap //
/////////////
/* <UL>
<LI> Open videos in own overlayed layer.
<LI> Handle dynamic content more efficient.
<LI> Use AFFs own video player?
</UL> */

function Main($)
{
    'use strict';
    jQuery.noConflict();

    function ConstructVideoUrl(url)
    {
	var ids = url.substring(url.lastIndexOf('/') + 1).split('.', 2);

	return 'http://adultFriendFinder.com/go/page/member_profile_video_new_window.html?&video=http://adultfriendfinder.com/ffadult/video/intros_flvs_1000/' 
	    + ids[1].replace(/_[a-z]/, '').slice(-3) + '/' + ids[0] + '.' + ids[1].replace(/_[a-z]/, '') + '.flv';
    }

    function ChangeVideoUrl(event)
    {
	$(event.target).parent('A').attr('href', ConstructVideoUrl(event.target.src));
    }

    function ChangeVideoUrls()
    {
	// Search all video URLs and change them
	$('IMG[src*="ffadult/video/intros_thumbs"]').each(function(index)
							  {
							      $(this).parent('A').attr('href', ConstructVideoUrl($(this).attr('src')));
							  });
    }

    $('BODY').on('mouseenter', 'IMG[src*="ffadult/video/intros_thumbs"]', function(event) { ChangeVideoUrl(event); });

    //ChangeVideoUrls();
}

// This is a userscript pattern to allow writing Chrome- and Firefox-friendly scripts which depend on one or more external scripts.
// Also included is support for including third-party scripts inside your userscript, but separately from your own code.
// http://userscripts.org/scripts/review/123588

function ThirdParty($)
{
    'use strict';
    jQuery.noConflict();

    // Put third-party non-jQuery functions here.  They'll be wrapped into the 
    // jQuery prototype in a moment.

    var sayHello = function (who) {
        alert('Hello ' + who + '!');
    }

    jQuery.extend({
        // If you have any non-jQuery functions, they need to be wrapped in here.
        sayHellow: function(who) {
                return sayHello('World');
        }
    });

    // Put third-party jQuery plugins, extensions, etc. here
}

!function Loader(i)
{
    var script
    , requires = [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js',
		   'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'
    ]
    , head = document.getElementsByTagName('head')[0]
    , makeScript = function () {
        script = document.createElement('script');
        script.type = 'text/javascript';
    }
    , loadLocal = function (fn) {
        makeScript();
        script.textContent = '(' + fn.toString() + ')(jQuery);';
        head.appendChild(script);
    }
    ;
    (function (i) {
//        makeScript();
//        script.src = requires[i];
//        script.addEventListener('load', function () {
//            ++i !== requires.length ? Loader(i) : (//loadLocal(ThirdParty), 
//						   loadLocal(Main));
//        }, true);
//        head.appendChild(script);
	loadLocal(Main);
    })(i || 0);
}();
