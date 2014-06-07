/**
 *
 * This is a Greasemonkey script and must be run using Greasemonkey 0.8 or newer.
 *
 * After installing, go to about:config in your browser's address bar and
 * filter the preferences to "Block Tumblr content sources", revealing
 * string setting. Double-click the "Value" column and enter a list of URLs or
 * URL fragments, separated by commas (no spaces). These are matched against
 * the content sources of Tumblr posts and used to hide them. For instance, to
 * block content from all of CNN.com and all of your least-favorite Tumblr user
 * use the following string:
 *
 *     cnn.com,hideme.tumblr.com
 *
 *
 * @author Meitar Moscovitz <meitar@maymay.net>
 */
// ==UserScript==
// @name           Block Tumblr content sources
// @namespace      maybemaimed.com
// @description    Allows you to block certain content from appearing on your Dashboard based on its Source.
// @include        http://www.tumblr.com/dashboard*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Create block list prefernce if not already set.
if (GM_getValue('block_list') === null) {
    GM_setValue('block_list', '');
}

// User will go and edit this variable.

// Collect array of all URLs to block.
var block_list = GM_getValue('block_list');

// Process block list variable into regex
re_block_list = new RegExp('(' + block_list.replace(/,/g, '|') + ')', 'i');

// Grab all the pieces of content.
$('#posts .not_mine .source_url a').each(function () {
    if ($(this).attr('href').match(re_block_list)) {
        $(this).closest('.not_mine').hide();
    }
});
