// ==UserScript==
// @name           facebook.com - external apps blocker
// @author         Justin Wheeler
// @version        3.37
// @description    blocks all external apps stories (ie. quizzes) on homepage, and profiles.
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @include        http://www.facebook.com/*
// ==/UserScript==

var script_id      = 46009;
var script_version = '3.37';

var blacklist = new Array(
    "facebook.com/apps",
    "quiz.applatform.com",
    "yoville.com",
    "apps.facebook.com",
    "apps.new.facebook.com",
    "bigprize.com",
    "thebizmeet.com",
    "twitter.com/chanelle1905",
    "friend.ly",
    "360elite4free.com",
    "11831_105302089483231_100000103201699_133845_8196890_s.jpg",
    "/apps/application.php",
    "articleget.cn",
    "articleget,cn",
    "rifftrax.com%252Fsweepstakes",
    "futureshop.ca/give",
    "HomeMoneyMake dot com",
    "homemoneymake.com",
    '<div class="UITitle UITitle_h5">Sponsored</div>',
    'frolt.com',
    'FarmVille Photos',
    'facebook.com/TexasHoldEm',
    'facebook.com/pages/FarmVille',
    'FarmVille Cash Photos'
);

var app_whitelist = new Array(
    '4620273157',      // facebook for palm os.
    '115463795461',    // twitter status update
    '8109791468',      // status shuffle
    '6628568379',      // facebook for iphone
    '2254487659',      // facebook for blackberry.
    '74769995908',     // facebook for android
    '5747726667',      // facebook for xbox
    '128581025231',    // marketplace postings
    '2231777543',      // facebook for twitter
    '21370137768',     // flickr image uploading
    '146139331013',    // tweetdeck for iphone
    '8324839461',      // loopt
    '56212371378',     // tweetdeck
    '10732101402',     // ping.fm
    '183319479511',    // hootsuite
    '2915120347',      // mobile web
    '2915120374',      // mobile web
    '350685531728',    // facebook for android
    '1394457661837',   // text message updates
    '135488932982',    // smart twitter
    '38997159460',     // photobucket.
    '247431880944',    // droid,
    '6195724695',      // windows phone
    '162843607082809', // mypad for ipad
    '131732509879',    // twitterfeed
    '10754253724',     // iphoto updater
    '101622214608'     // aperture uploader
);

var whitelist = new Array(
    'Photos</h5>' // Facebook Photos
);

function in_list( list, text, prefix ) {
    for (var host_idx = 0; host_idx < list.length; host_idx++) {    
        if (text.toUpperCase().indexOf(prefix.toUpperCase() + list[ host_idx ].toUpperCase()) >= 0)
            return 1;
    }

    return 0;
}

function should_be_wiped( html ) {
    if ( html.match(/and get.*(?:farm\s*ville|mafia\s*wars)/i) ) {
	    return 1;
    }

    if ( !in_list( blacklist, html, "" ) ) {
        return 0;
    }

    if ( in_list( app_whitelist, html, "/apps/application.php?id=" ) ) {
        return 0;
    }

    if ( in_list( whitelist, html, "" ) ) {
        return 0;
    }

    return 1;
}
    
function check_page() {
    check_contents( document.getElementsByTagName('div') );
    check_contents( document.getElementsByTagName('li')  );

    return;
}

function check_contents( stories ) {
    var count = stories.length;

    for (var i = count - 1; i >= 0; i--) {
        if (   stories[i].id.indexOf("div_story_") == 0
            || stories[i].className == 'box'
            || stories[i].className.indexOf('uiStreamStory') >= 0
            || stories[i].className.indexOf('album') >= 0
            || stories[i].className.indexOf('UIHomeBox_Sponsored') >= 0) {

            if ( should_be_wiped( stories[i].innerHTML ) ) {
                stories[i].style.display = 'none';
                // For Debugging
                //stories[i].style.border = "1px solid red";

                var children = stories[i].parentNode.childNodes.length;

                for (var cur_child = 0; cur_child <= children; cur_child++) {
                    var this_one = stories[i].parentNode.childNodes[ cur_child     ];
                    var next_one = stories[i].parentNode.childNodes[ cur_child + 1 ];

                    if (this_one == stories[i]
                     && next_one
                     && next_one.innerHTML.indexOf("more similar stories") > 0) {
                        next_one.style.display = 'none';
                        //next_one.style.border = "1px solid red";
                    }
                }
            }
        }
    }
}

var page_length;

function wipe_apps() {
    if (page_length != document.getElementsByTagName('body')[0].innerHTML.length) {
        page_length = document.getElementsByTagName('body')[0].innerHTML.length;

        var ad_column = document.getElementsByClassName('adcolumn');

        if (ad_column.length) {
            for (var cur_col = 0; cur_col < ad_column.length; cur_col++) {
                //ad_column[cur_col].style.border = '1px solid red';
                ad_column[cur_col].style.display = 'none';
            }
        }

        if (document.getElementById('pagelet_connectbox')) {
            document.getElementById('pagelet_connectbox').style.display = 'none';
        }

        check_page();
    }
}

var timer;

window.addEventListener("load",  function () { timer = setTimeout( wipe_apps, 1000 ) }, true);
window.addEventListener('scroll', function () { clearTimeout( timer ); timer = setTimeout( wipe_apps, 500 ) }, true);

autoUpdate(script_id, script_version);
