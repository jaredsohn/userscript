// ==UserScript==
// @name           facebook.com - apps remover
// @version        2.1.7
// @description    remove all apps stories from homepage
// @namespace      Kub4jz.cz
// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/*home.php*
// @match          http://www.facebook.com/*
// @match          http://www.facebook.com/*home.php*

// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http://apps.facebook.com/*
// @exclude        http://facebook.com/apps/*
// ==/UserScript==

var script_id = 49344;
var script_version = '2.1.7';

var gm_class = ' gm_apps_remover';

/**
 *  Filters (Blacklist)
 */

var filters = new Array(
    'facebook.com/apps',
    'apps.facebook.com',
    'quiz.applatform.com',
    'Polaroid Photos',
    'http://myfds.com/',
    'friend.ly',
    'Friends I Like!',
    'Who likes me Photos',
    'My Top Fans'
);

var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABr0lEQVR42qSTsYsTQRTGfxMCNhYBrRTm+oUUdrk7/RMsXBVh7W1mcyQkWsRooxbRk4iXP0CE40qrVIFrNNnCwiJw1RZmIaYRdgu3Ee6ehe4wG++8wg+W2Tffm/d9vJmnBoOBJEnCOrTWPOw+UkX8avelzStxxhhJ01RcpGkqxhg5ORaKzxgjeZ5LnuclrgoQRRFfjr5Z9WveFU5TXq1Wdr+5E4rW+nwHrnIcxxLHcclJFaBWq/H94xtb/fKNVqkfrvJ6XOUcaK0ZDocAtNttABtrrX8XyLKspJplmf0vut3cCcUtvPd2pACqWmv6/f6pymc5cTl1ciz8D1Sj0ZBut8t8PgegXq/j37qttrY3ZTaNlHuNBe5tHHK9c6RsEz3Pw/M8m7C1vWltJUnCaDSy3M/DO8iPi7y+r6SzL6oym0ZqMpn80+ZimbFYZn8OJ+wdfKazLwqgAjAej21yq9ViNo2UW2Djao2nzZv28NdLxnIVAN/3CYKAIAjwfR+gVGSxzHj/4RMP3l3g7m5atucOTK/XKw1Q8ZTX8dcwAfSfPJbnz16oYnXvPwzDM9/IrwEAC2Y0yN4XIUwAAAAASUVORK5CYII=';

var filters_regex = new RegExp(filters.join("|"), 'i');
delete filters;

var stories; var stories_length_before; var apps_count;
var d = 'none';

function remove_external_stories() {

    for (i = stories.length-1; i >= 0; i--) {
        var story = stories.item(i).parentNode;

        if (story.className.indexOf(gm_class) >= 0) {
        	continue;
        }

        story_data = story.getAttribute('data-ft');

        if (story_data == null) continue;

        story_data = eval('(' + story_data + ')');
        story_type = story_data.sty;
        delete story_data;

        if (story_type == 237) {
            story.style.display = d;
            story.className += gm_class;
        }

        /*
        if (attachments = story.getElementsByClassName('uiStreamAttachments').item(0)) {

            var html = attachments.innerHTML;

            if (filters_regex.test(html)) {
                alert(story_type);
                story.style.display = d;
                story.className += gm_class;
            }
        }
        */
	}

    delete story; delete attachments;
}

function check_apps() {

    isBox = createBox();

    if (isBox == false) {
        return false;
    }

    gm_class_length = document.getElementsByClassName(gm_class).length;

    stories = document.getElementsByClassName("UIImageBlock"); // UIStoryAttachment // UIImageBlock

    stories_length = stories.length;

	if (isBox && (gm_class_length != apps_count || stories_length != stories_length_before)) {
        stories_length_before = stories_length;

        remove_external_stories();

        apps_count = document.getElementsByClassName('gm_apps_remover').length;
        document.getElementById('apps_count').innerHTML = apps_count;

        addEvent();
    }

    delete stories;

}

function toggleApps() {

    link = document.getElementById('toggle_apps_link');

    if (link.innerHTML == 'show') { d = 'block'; link.innerHTML = 'hide'; } else { d = 'none'; link.innerHTML = 'show'; }

    app_stories = document.getElementsByClassName('gm_apps_remover');

    for (j = app_stories.length-1; j >= 0; j--) {
        app_stories.item(j).style.display = d;
    }

    delete app_stories;
}

function addEvent() {
    document.getElementById('toggle_apps_link').removeEventListener("click", toggleApps, false);
    document.getElementById('toggle_apps_link').addEventListener("click", toggleApps, false);
}

function createBox() {

    if (!document.getElementById('home_stream')) return false;
    if (document.getElementById('pagelet_appsremoverbox')) return true;

    col = document.getElementById('rightCol');

    box = document.createElement('div');
    box.setAttribute('id', 'pagelet_appsremoverbox');

    //imgWrap = document.querySelectorAll('li#navItem_apps a.item span.imgWrap')[0];

    box.innerHTML += '<img class="img" src="' + icon + '" alt="" title="Apps remover v'+ script_version +'"> ';
    box.innerHTML += 'Application stories: <span id="apps_count">0</span> [<a href="#" id="toggle_apps_link">show</a>]';

    col.appendChild(box);

    addEvent();

    return true;
}

function addStyle(css)
{
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (head = document.getElementsByTagName('head')[0]) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		head.appendChild(style);
	}

    delete head;

    return false;
}

function cssStyles()
{
    // box
    addStyle(
     ' #pagelet_appsremoverbox { background-color: #EFF2F7; line-height: 25px; margin: 10px 0; padding: 0px 5px; }'
    +' #pagelet_appsremoverbox .img { position: relative; top: -1px;  margin-right: 3px; vertical-align: text-top; }'
    );

    return false;
}

function starter() {

    cssStyles();
    check_apps();

    var home_stream;

    if (home_stream = document.getElementById('content')) {
        setTimeout( function () {
            var t;
            home_stream.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout( check_apps, 50 ); }, false);
        }, 500);
    }

    delete home_stream;

    if (typeof autoUpdate == 'function') {
        autoUpdate (script_id, script_version);
    }
}

starter();