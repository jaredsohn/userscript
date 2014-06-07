// ==UserScript==
// @name           AtheismPlus Ban Button
// @description    Adds a button underneath a user to ban them from AtheismPlus.
// @include        http://*.reddit.com/*
// @version        2012.09.13
// @credit         All credit to FarrahFawcett
// ==/UserScript==

// reddit uses jQuery so just steal that
var $ = unsafeWindow.jQuery; // unsafeWindow is bad!~

function get_form(subr, username, userid) {
    // of course js lacks any sort of sane multiline syntax
    var s = '';
    s += '<form class="toggle remove-button" method="post" action="/post/friend" onsubmit="return false;">';
    s +=   '<input type="hidden" name="action" value="add">';
    s +=   '<input type="hidden" name="type" value="banned">';
    s +=   '<input type="hidden" name="container" value="' + subr + '">';
    s +=   '<input type="hidden" name="name" value="' + username + '">';
    s +=   '<input type="hidden" name="id" value="' + userid + '">';
    s +=   '<span class="option main active">';
    s +=     '<a class="togglebutton" onclick="return toggle(this)" href="#">aban</a>';
    s +=   '</span>';
    s +=   '<span class="option error">are you sure? ';
    s +=     '<a class="yes" onclick="var _r = reddit.post_site; reddit.post_site = \'atheismplus\'; post_form(this.parentNode.parentNode, \'friend\'); reddit.post_site = _r;" href="javascript:void(0)">yis</a>';
    s +=     ' / ';
    s +=     '<a class="no" onclick="return toggle(this)" href="javascript:void(0)">naw</a>';
    s +=     ' / ';
    s +=     '<a class="unban" onclick="var _r = reddit.post_site; reddit.post_site = \'atheismplus\'; change_state(this, \'unfriend\', function(form){$(form).find(\'.error\').not(\'.status\').hide();$(form).find(\'.status\').html(\'submitting...\').show();}); reddit.post_site = _r;" href="javascript:void(0);">unban</a>'
    s +=   '</span>';
    s +=   '<span class="status" style="display:none;font-size:8pt;">banned</span>';
    s +=   '<span class="error USER_DOESNT_EXIST field-name" style="display:none"></span>';
    s += '</form>';

    return s;
}

function run_banbutton() {

    var subr = 't5_2s4m9';
    
    $('.entry ul.buttons').each(function (index, el) {
        // "load more comments" contains an empty ul.buttons which causes an
        // error, so avoid them by checking the length
        if ($(el).html().length !== 0) {
            // author tags in modmail are one level deeper, so we have to use
            // find() instead of the faster children()
            var author = $(el).parent().children('.tagline').find('.author:first');
            
            // messages sent by you in modmail will not have an author link,
            // so do not show them. in some browsers, attr will return either
            // false or undefined, so check for both
            if (typeof $(author).attr('class') !== 'undefined' && $(author).attr('class') !== false) {
                var author_name = author.text();
                var classes = author.attr('class').split(' ');
                for (var i=0; i < classes.length; i++) {
                    if (classes[i].indexOf('id-') == 0) {
                        author_id = classes[i].replace('id-', '');
                    }
                }
                $(el).children('li:first').after('<li>'+get_form(subr, author_name, author_id)+'</li>');
            }
        }
    });
}

run_banbutton();
