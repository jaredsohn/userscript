// ==UserScript==
// @name           clixsense auto-click script - v0.3.3
// @namespace      http://userscripts.org/scripts/show/22272
// @include        https://www.clixsense.com/browse.php
// @Description    This script browses through clixsense ads and automatically clicks them for you.  It starts five minutes after you confirm execution.  The script waits anywhere from 60 seconds to 5 minutes between clicks.  This script is released under GPL License 3.0 and under the MIT License.
// ==/UserScript==

/* Settings */
minimum_wait = 60;     // 30 seconds is the absolute minimum.  I like a little buffer.
maximum_wait = 2 * 60; // 2 minutes

/* Declaration of global variables */
waiting_time = 0;
clix_links = document.getElementsByTagName('a');
sponsor_links = new Array();
sponsor_target = new Array();
sponsor_link_number = new Array();

my_div = document.createElement('div');
my_div.innerHTML = '<div style="height: 60px; width: 150px; ' +
        'background-color: #99FFCC; z-index: 100; position: fixed;' +
        'padding: 5px; opacity: .4;' + 
        'right: 10px; bottom: 10px;" id="my_div">' + 
        '' + 
        '</div>';

document.body.insertBefore(my_div, document.body.firstChild);
countdown_div = document.getElementById('my_div');

for (var i = 0; i < clix_links.length; i++) {
    if (clix_links[i].href.search(/browse.php\?launch/i) != -1) {
        sponsor_links.push(clix_links[i].href);
        sponsor_target.push(clix_links[i].target);
        sponsor_link_number.push(i);
    }
}

if (sponsor_links.length > 10) {
    if (confirm("There are more than 10 advertising links contained on this page.\r\nclixsense may be checking for a script.  Do you want to continue?")) 
        waiting_time = Math.floor(Math.random() * maximum_wait) + minimum_wait;
} else if (sponsor_links.length > 0) {
    if (confirm("clixsense GreaseMonkey script found " + sponsor_links.length + " links.  Click okay if you want to run this script.")) 
        waiting_time = Math.floor(Math.random() * maximum_wait) + minimum_wait;
} else {
    return false;
}

update_time();


/* FUNCTIONS */

function update_time() {
    waiting_time--;
    var min = Math.floor(waiting_time / 60);
    var seconds = waiting_time % 60;
    
    if (waiting_time == 0) {
        open_random_link();
    } else {
        countdown_div.innerHTML = "Time remaining:: " + min + ":" + seconds;
        if (seconds < 10)
            countdown_div.innerHTML = "Time remaining:: " + min + ":0" + seconds;
        else
            countdown_div.innerHTML = "Time remaining:: " + min + ":" + seconds;
             
        window.setTimeout(update_time, 100);
    }
}

function find_sponsor_table(url_target) {
    tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].innerHTML.search(/<table/i) == -1) {
            if (tables[i].innerHTML.search(url_target) != -1) {
                tables[i].style.display = 'none';
            }
        }
    }
}

function open_random_link() {
    var link_href = "";
    var link_target = "";
    var blank_regexp = new RegExp(/^\s*$/);

    if (sponsor_links.length > 0) {
        do {
            var link_number = Math.floor(Math.random() * sponsor_links.length);
            link_href = sponsor_links.splice(link_number, 1);
            link_target = sponsor_target.splice(link_number, 1);
        } while ((blank_regexp.exec(link_href) != null) && (sponsor_links.length > 0));

        if (blank_regexp.exec(link_href) != null) {
            alert("All links used up.");
        } else {
            window.open(link_href, link_target); 
            find_sponsor_table(link_target);

            waiting_time = Math.floor(Math.random() * maximum_wait) + minimum_wait;
            update_time();
        }
    } else {
        countdown_div.innerHTML = "All links visited.  <a href='javascript:window.location.reload(true);'>Reload</a>";
    }
}