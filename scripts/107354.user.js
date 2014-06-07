// ==UserScript==
// @name           Hootsuite Custom Filter
// @author         Eric Anderson
// @version        1.00
// @description    Attempts to create a custom filter for a particular tab
// @include        http://hootsuite.com/dashboard#/tabs?id=5938651
// ==/UserScript==

var script_id      = 107354;
var script_version = '1.00';

var excludelist = new Array(
    "The Car Connection",
    "Motor Trend Magazine",
);


function in_list( list, text, prefix ) {
    for (var host_idx = 0; host_idx < list.length; host_idx++) {    
        if (text.toUpperCase().indexOf(prefix.toUpperCase() + list[ host_idx ].toUpperCase()) >= 0)
            return 1;
    }

    return 0;
}

function should_be_wiped( html ) {
    if ( !in_list( excludelist, html, "" ) ) {
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