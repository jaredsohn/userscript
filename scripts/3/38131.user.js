// ==UserScript==
// @name           XTube - Exclude Amateur and Sponsored Videos
// @description    Hides videos which require payment to view.  (Amateur Videos, and Sponsored Users such as 'xtubehouse')
// @author         Signe - http://www.cothlamadh.net/
// @namespace      http://www.cothlamadh.net/greasemonkey
// @include        http://www.xtube.com/
// @include        http://www.xtube.com/?*
// @include        http://www.xtube.com/*.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @version        1.0.20110706
// ==/UserScript==

/**
 * VERSION HISTORY
 *
 * 1.0.20110706
 *      Upgrade jQuery to 1.6 for performance
 *      Updates to adapt to website changes
 * 1.0.20100621
 *      Converted script to use JQuery for easier element selection and looping
 *      Default to removing detected videos completely (optional - change "removeElements" to 0 to disable)
 *      Fix detection of videos in the 'Related Videos' section of the watch page
 *      Disable 'results.php' section unless someone can provide a case I can test with
 * 1.0.20091220
 *      Fix for new front page format
 * 1.0.20091128
 *      Add filtering for new video_search page results
 * 1.0.20091025
 *      Add Advanced Search page results, videos from xxxvids
 * 1.0.20090629
 *      Sponsored vids are removed from the "related videos" sidebar
 * 1.0.20090626
 *      Refinements, and visual modification of the hidden videos
 * 1.0.20090619
 *      Use a different search method, and remove xtubehouse videos
 * 1.0.20090124
 *      Updated to work with XTube's new UI
 */

/**
 * User Options
 */

// Should detected amateur and sponsor videos be removed from the page, or simple replaced with text?  Default to remove.
var removeElements = 1;

// Additional users can be added to the sponsored list by adding "|username" immediately before the closing parenthesis.
var sponsoredRegex = /(xtubehouse|xtube_sponsor|xxxvids|pornhub|tube8)/;
var amateurRegex = /\/watch.php\?v=.*__(&|$)/;

/**
 * DO NOT EDIT BELOW THIS POINT UNLESS YOU KNOW WHAT YOU'RE DOING
 */
 
/**
 * Include JQuery dynamically (Opera Support)
 */
if (typeof $ != 'function') {
    // create script
    var newscript = document.createElement('script');
    newscript.setAttribute('type', 'text/javascript');
    newscript.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js');
    document.getElementsByTagName('head')[0].appendChild(newscript);
}

/**
 *  Add GM_* function aliases if they're not already present
 */
if (typeof GM_addStyle != 'function') {
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

// Set the styling for the hideSponsored divs, and get rid of the stupid 'other sites' bar at the top of every page
GM_addStyle('div.hideSponsored { color: black; text-align: center; } #ph_net_bar { display: none !important; }');

// Prevent the stupid popunders from getting a chance to run
unsafeWindow.aweGetCookie = function() {
    return 1;
}
unsafeWindow.getCookie = function() {
    return 1;
}

// Counters
var sponsoredTotal = 0;
var amateurTotal = 0;


/**
 * Each page has a slightly different layout that needs to be accounted for
 */
if (document.URL.indexOf('results.php') != -1 || document.URL.indexOf('results_as_vs.php') != -1) {

    alert('This section is disabled because I could no longer find a way to make it appear on the site. ' +
            'If you see this message, please provide me with a link that I can use for testing on the script ' +
            'feedback page.');
    window.open('http://userscripts.org/scripts/discuss/38131', '_blank');
    return;
} else if (document.URL.indexOf('watch.php') != -1) {
    $('div#related table tr img').each(
        function() {
            if (amateurRegex.test($(this).parent().attr('href'))) {
                amateurTotal++;
                if (removeElements) {
                    $(this).parents('tr').remove();
                } else {
                    $(this).parents('div.shadow_sr').html("<div class='hideSponsored'>Amateur Video</div>");
                }
            }
        }
    );

    $('div#related table tr a.username').each(
        function() {
            if (sponsoredRegex.test($(this).text())) {
                sponsoredTotal++;
                if (removeElements) {
                    $(this).parents('tr').parent().remove();
                } else {
                    var matches = sponsoredRegex.exec($(this).html());
                    $(this).parents('div.shadow_sr').html("<div class='hideSponsored'>Sponsored Video by <a href='" + $(this).attr('href') + "'>" + matches[1] + "</a></div>");
                }
            }
        }
    );
    $('div#related table').append('<tr><td colspan="2">Sponsored Removed: ' + sponsoredTotal + '<br/>Amateur Removed: ' + amateurTotal +'</td></tr>');
} else if (document.URL.indexOf('video_search.php') != -1) {
    $('div.content_d img.imgBrdr').each(
        function() {
            if (amateurRegex.test($(this).parent().attr('href'))) {
                amateurTotal++;
                if (removeElements) {
                    $(this).parents('div.content_d').parent().remove();
                } else {
                    $(this).parents('div.content_d').html("<div class='hideSponsored'><a href='" + $(this).parent().attr('href') + "'>Amateur Video</a></div>");
                }
            }
        }
    );

    $('div.content_d a.username').each(
        function() {
            if (sponsoredRegex.test($(this).attr('href'))) {
                sponsoredTotal++;
                if (removeElements) {
                    $(this).parents('div.content_d').parent().remove();
                } else {
                    var matches = sponsoredRegex.exec($(this).attr('href'));
                    $(this).parents('div.content_d').html("<div class='hideSponsored'>Sponsored Video by <a href='" + $(this).attr('href') + "'>" + matches[1] + "</a></div>");
                }
            }
        }
    );

    // Eliminate the useless breaks that prevent the cells from flowing
    $('div.content > br.clear').remove();
    $('div.content').append('<div>Sponsored Removed: ' + sponsoredTotal + '<br/>Amateur Removed: ' + amateurTotal +'</div>');
} else if (document.URL.indexOf('subscription.php') != -1) {
    // GM_addStyle('#content #subscribe-left #bhead .album { overflow: visible; }');

    $('div.item img').each(
        function() {
            if (amateurRegex.test($(this).parent().attr('href'))) {
                amateurTotal++;
                if (removeElements) {
                    $(this).parents('div.item').remove();
                } else {
                    $(this).parents('div.item').html("<div class='item hideSponsored'>Amateur or Sponsored Video</div>");
                }
            }
        }
    );
    $('div#content').append('<br/><div>Amateur Removed: ' + amateurTotal +'</div>');
} else {
    $("div.name_d:contains('Our Friends')").parent().parent().parent().remove();
    $("div.name_d:contains('Viral Videos')").parent().parent().parent().remove();

    $('div.content_d a > img').each(
        function() {
            if (amateurRegex.test($(this).parent().attr('href'))) {
                amateurTotal++;
                if (removeElements) {
                    $(this).parents('div.content_d').parent().remove();
                } else {
                    $(this).parents('div.content_d').html("<div class='hideSponsored'><a href='" + $(this).parent().attr('href') + "'>Amateur Video</a></div>");
                }
            }
        }
    );

    $('div.content_d a.username').each(
        function() {
            if (sponsoredRegex.test($(this).attr('href'))) {
                sponsoredTotal++;
                if (removeElements) {
                    $(this).parents('div.content_d').parent().remove();
                } else {
                    var matches = sponsoredRegex.exec($(this).attr('href'));
                    $(this).parents('div.content_d').html("<div class='hideSponsored'>Sponsored Video by <a href='" + $(this).attr('href') + "'>" + matches[1] + "</a></div>");
                }
            }
        }
    );
    $('div.left-side > div.content').append('<div>Sponsored Removed: ' + sponsoredTotal + '<br/>Amateur Removed: ' + amateurTotal +'</div>');
}

