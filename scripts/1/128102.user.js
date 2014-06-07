// ==UserScript==
// @name           Reddit Ban Button
// @description    Adds a button underneath a user to ban them.
// @include        http://*.reddit.com/*
// @version        2013.01.10
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
    s +=     '<a class="togglebutton" onclick="return toggle(this)" href="#">ban</a>';
    s +=   '</span>';
    s +=   '<span class="option error">are you sure? ';
    s +=     '<a class="yes" onclick="post_form(this.parentNode.parentNode, \'friend\');" href="javascript:void(0)">yes</a>';
    s +=     ' / ';
    s +=     '<a class="no" onclick="return toggle(this)" href="javascript:void(0)">no</a>';
    s +=     ' / ';
    s +=     '<a class="unban" onclick="change_state(this, \'unfriend\', function(form){$(form).find(\'.error\').not(\'.status\').hide();$(form).find(\'.status\').html(\'submitting...\').show();});" href="javascript:void(0);">unban</a>'
    s +=   '</span>';
    s +=   '<span class="status" style="display:none;font-size:8pt;">banned</span>';
    s +=   '<span class="error USER_DOESNT_EXIST field-name" style="display:none"></span>';
    s += '</form>';

    return s;
}

function run_banbutton() {

    if ($('.leavemoderator').length == 0) {
        return false;
    }
    
    try {
        var subr = unsafeWindow.reddit.cur_site; // stop using unsafeWindow!~
    }
    catch (err) {
        return false;
    }
    
    $('.entry ul.buttons').each(function (index, el) {
        // "load more comments" contains an empty ul.buttons which causes an
        // error, so avoid them by checking the length
        if ($(el).html().length !== 0) {
            // author tags in modmail are one level deeper, so we have to use
            // find() instead of the faster children()
            var author = $(el).parent().children('.tagline').find('.author:first');
            
            // messages sent by you in modmail will not have an author link,
            // so do not show them. in some browsers, attr will return either
            // false or undefined, so check for both. oh, and [deleted] users
            // will only have the 'author' class, so make sure what's returned
            // by attr() isn't exactly that.
            if (typeof $(author).attr('class') !== 'undefined'
                && $(author).attr('class') !== false
                && $(author).attr('class') !== 'author') {
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