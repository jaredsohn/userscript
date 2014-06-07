// ==UserScript==
// @name           Global SRDBroke Ban Button
// @description    Adds a button underneath a user to ban them from r/SRDBroke. Shamelessly stolen and retooled from http://userscripts.org/scripts/show/134344. TODO There's some weird ass shit with SubredditDrama's CSS that interferes with this script. FIX IT.
// @include      http://*.reddit.com/*
// ==/UserScript==

// TODO There's some weird ass shit with SubredditDrama's CSS that interferes with this script. FIX IT.

// reddit uses jQuery so just steal that
var $ = unsafeWindow.jQuery; // unsafeWindow is bad!~

function get_form(subr, username, userid) {
    return '<form class="toggle remove-button" method="post" action="/post/friend" onsubmit="return false;"><input type="hidden" name="action" value="add"><input type="hidden" name="container" value="'+subr+'"><input type="hidden" name="type" value="banned"><input type="hidden" name="name" value="'+username+'"><input type="hidden" name="id" value="'+userid+'"><span class="option main active"><a class="togglebutton" onclick="return toggle(this)" href="#">BEN THIS MOTHAFUCKA</a></span><span class="option error">are you sure? <a class="yes" onclick="var _r = reddit.post_site; reddit.post_site = \'srdbroke\'; post_form(this.parentNode.parentNode, \'friend\'); reddit.post_site = _r;" href="javascript:void(0)">yis</a> / <a class="no" onclick="return toggle(this)" href="javascript:void(0)">naw</a> / <a class="unban" onclick="var _r = reddit.post_site; reddit.post_site = \'srdbroke\'; change_state(this, \'unfriend\', function(form){$(form).find(\'.error\').not(\'.status\').hide();$(form).find(\'.status\').html(\'submitting...\').show();}); reddit.post_site = _r;" href="javascript:void(0);">unben</a></span><span class="status" style="display:none;font-size:8pt;">banned</span><span class="error USER_DOESNT_EXIST field-name" style="display:none"></span></form>';
}

function run_banbutton() {

    var subr = "t5_2uw8y";

    $('.entry ul.buttons').each(function (index, el) {
        var author = $(el).parent().children('.tagline').find('.author:first');
        var author_name = author.text();
        var classes = author.attr('class').split(' ');
        for (var i=0;i<classes.length;i++) {
            if (classes[i].indexOf('id-') == 0) {
                author_id = classes[i].replace('id-', '');
            }
        }

        var banEl = $(el).children('li:contains("reply")');
        if (banEl.length != 0) {
            banEl.before('<li>'+get_form(subr, author_name, author_id)+'</li>');
        }
        else {
            $(el).children('li').last().after('<li>'+get_form(subr, author_name, author_id)+'</li>');
        }
    });
}

document.addEventListener('load', run_banbutton(), true);