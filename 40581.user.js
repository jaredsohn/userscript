// ==UserScript==
// @author         Mitsuhiro Setoguchi
// @name           Google Reader Remove Ads
// @namespace      http://matatabi.homeip.net
// @description    Ban Ads in Google Reader
// @include        http://www.google.tld/reader/*
// ==/UserScript==

// If you want to modify prefixes, you can do it from about:config.
// I show you how to configure below.
//
//  1. Input "about:config" into the location bar of Firefox.
//  2. Filter by
//      "greasemonkey.scriptvals.http://matatabi.homeip.net"
//     and you will find
//      "Google Reader Remove Ads.ad_title_prefixes"
//      "Google Reader Remove Ads.ad_url_prefixes"
//  3. Change them as you like.
//      - ad_title_prefixes:
//        List of prefixes of entry title like ["PR", "AD"].
//        These are used to match the entry titles.
//      - ad_url_prefixes:
//        list of prefixes of URLs like
//         ["http://spam.example.com/", "http://feedads.example.com/"].
//        These are used to match imgs, anchors, and iframes.

var title_prefixes = [];
var url_prefixes = [];
var n_divs = 0;

function init() {
    // Add style for AD entry
    GM_addStyle('div.ad_entry {height: 0px}');

    // Getting title prefixes and save them
    if (GM_getValue('ad_title_prefixes'))
	title_prefixes = eval(GM_getValue('ad_title_prefixes'));
    else
	title_prefixes = ['PR', 'AD'];
    GM_setValue('ad_title_prefixes', title_prefixes.toSource());

    // Getting URL prefixes and save them
    if (GM_getValue('ad_url_prefixes'))
	url_prefixes = eval(GM_getValue('ad_url_prefixes'));
    else
	url_prefixes = ['http://match.seesaa.jp/',
			'http://feedads.g.doubleclick.net/',
			'http://feedads.googleadservices.com/',
			'http://pagead2.googlesyndication.com/',
			'http://googleads.g.doubleclick.net/',
			'http://pagead2.googlesyndication.com/',
			'http://rss.rssad.jp'];
    GM_setValue('ad_url_prefixes', url_prefixes.toSource());
}

function check_title(div) {
    // Selecting anchor tag of entry title
    var title_anc = div.getElementsByClassName('entry-title-link')[0];

    // Comparing with each title prefix and title
    for (var i=0; i<title_prefixes.length; i++)
	if (title_anc.text.search(title_prefixes[i]) == 0) {
	    // If one prefix matches, hide by setting height 0px.
	    div.className += ' ad_entry';
	    var msg = 'Hide "' + title_anc.text + '(' + title_anc.href + ')"';
	    GM_log(msg);
	    break;
	}
}

function check_body(div) {
    // Selecting item body div
    var item_body = div.getElementsByClassName('item-body')[0];

    // Selecting tags to hide
    // iframes
    var nodes = item_body.getElementsByTagName('iframe');
    for (var i=0; i<nodes.length; i++) {
	if (nodes[i].style.display == 'none')
	    continue;

	for (var j=0; j<url_prefixes.length; j++)
	    if (nodes[i].src.indexOf(url_prefixes[j]) == 0) {
		nodes[i].style.display = 'none';
		GM_log('Hid iframe of ' + nodes[i].src);
		break;
	    }
    }

    // anchors
    nodes = item_body.getElementsByTagName('a');
    for (var i=0; i<nodes.length; i++) {
	if (nodes[i].style.display == 'none')
	    continue;

	for (var j=0; j<url_prefixes.length; j++)
	    if (nodes[i].href.indexOf(url_prefixes[j]) == 0) {
		nodes[i].style.display = 'none';
		GM_log('Hid anchor to ' + nodes[i].href);
		break;
	    }
    }

    // imgs
    nodes = item_body.getElementsByTagName('img');
    for (var i=0; i<nodes.length; i++) {
	if (nodes[i].style.display == 'none')
	    continue;

	for (var j=0; j<url_prefixes.length; j++)
	    if (nodes[i].src.indexOf(url_prefixes[j]) == 0) {
		nodes[i].style.display = 'none';
		GM_log('Hid image of ' + nodes[i].src);
		break;
	    }
    }
}

function ban_ads() {
    // Selecting div tags of each entries
    var myquery = '//div[@id="entries"]' +
	'/div[(contains(concat(" ", normalize-space(@class), " "), "entry"))' +
	' and not(contains(@class, "ad_entry"))]';
    var divs = document.evaluate(myquery, document, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // If number of divs changes, check anchors of divs.
    if (n_divs != divs.snapshotLength) {
	n_divs = divs.snapshotLength;
	for (var i=0; i<n_divs; i++) {
	    check_title(divs.snapshotItem(i));
	    check_body(divs.snapshotItem(i));
	}
    }
}

function wait() {
    // Waiting for being loaded all contents.
    if (document.body.className.indexOf('loaded') > 0) {
	ban_ads();
	setTimeout(wait, 5000);
    } else
	setTimeout(wait, 100);
}

init();
wait();
