// ==UserScript==
// @name		Shoutbox Ignore
// @namespace	sbignore
// @include		*rune-server.org/forum.php
// @include		*rune-server.org/forum.php#*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require		http://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @version		1
// ==/UserScript==

InfernoShoutbox.ignoredUsers = new Array();

InfernoShoutbox.idlecheck = function () {}

InfernoShoutbox.add_ignore = function (username) {
    username = PHP.trim(username.toLowerCase());
    InfernoShoutbox.ignoredUsers.push(username);
    InfernoShoutbox.update_ignore_cookie();
}

InfernoShoutbox.del_ignore = function (username) {
    $.each(InfernoShoutbox.ignoredUsers, function (index) {
        if (this.toLowerCase() == username.toLowerCase()) {
            InfernoShoutbox.ignoredUsers.splice(index, 1);
            InfernoShoutbox.update_ignore_cookie();
        }
    });
}

InfernoShoutbox.update_ignore_cookie = function () {
    $.cookie('sb_ignored_users', InfernoShoutbox.ignoredUsers.toString(), {
        expires: 365
    });
}

InfernoShoutbox.load_ignore_users_from_cookie = function () {
    if (typeof $.cookie('sb_ignored_users') == "undefined") {
        $.cookie('sb_ignored_users', '', {
            expires: 365
        });
    }

    $.each($.cookie('sb_ignored_users').split(','), function () {
        if (this.length > 0)
            InfernoShoutbox.ignoredUsers.push(this.toLowerCase());
    });

    if (InfernoShoutbox.ignoredUsers.toString().length > 0)
        InfernoShoutbox.show_notice('Ignored users: ' + InfernoShoutbox.ignoredUsers.toString());
}

InfernoShoutbox.post_shout = function (message) {
    InfernoShoutbox.shout.ajax = new vB_AJAX_Handler(true);
    InfernoShoutbox.shout.ajax.onreadystatechange(InfernoShoutbox.shout_posted);
    InfernoShoutbox.shout.ajax.send('infernoshout.php', 'do=shout&message=' + PHP.urlencode(message) + '&');
}

InfernoShoutbox.shout = function () {
    if (InfernoShoutbox.posting_shout) {
        InfernoShoutbox.show_notice('A previous message is still being submitted.');
        return false;
    }
    message = InfernoShoutbox.editor.value;

    if (message.indexOf("/") == 0) {
        var command = message.substring(1);

        if (command.indexOf("ignore") == 0) {
            InfernoShoutbox.add_ignore(command.substring(7));
            InfernoShoutbox.show_notice(command.substring(7) + " added to ignore list. /unignore " + command.substring(7) + " to unignore user.");
        } else if (command.indexOf("unignore") == 0) {
            InfernoShoutbox.del_ignore(command.substring(9));
            InfernoShoutbox.show_notice("Unignored " + command.substring(9));
        } else {
            InfernoShoutbox.show_notice('Command "' + command + ' does not exist."');
        }
    } else {
        message = InfernoShoutbox.shout_params.prefix + message + InfernoShoutbox.shout_params.suffix;

        InfernoShoutbox.posting_shout = true;
        InfernoShoutbox.set_loader('');
        InfernoShoutbox.post_shout(message);
    }

    InfernoShoutbox.clear();
    return false;
}

InfernoShoutbox.fetch_shouts = function () {
    if (InfernoShoutbox.posting_shout && !InfernoShoutbox.force_fetch) {
        if (InfernoShoutbox.failure_count('posting_shout')) {
            InfernoShoutbox.posting_shout = false;
        }

        return false;
    }

    if (InfernoShoutbox.fetching_shouts) {
        if (InfernoShoutbox.failure_count('fetching_shouts')) {
            InfernoShoutbox.fetching_shouts = false;
        }

        return false;
    }

    if (InfernoShoutbox.idle && InfernoShoutbox.loaded) {
        InfernoShoutbox.show_notice('You are currently idle in the shoutbox. Click <a href="?" onclick="return InfernoShoutbox.unidle();">here</a> to un-idle yourself.');
        clearTimeout(InfernoShoutbox.kill_notice); // Don't hide this notice
        return false;
    }

    InfernoShoutbox.fetching_shouts = true;
    InfernoShoutbox.force_fetch = false;
    InfernoShoutbox.loaded = true;

    InfernoShoutbox.set_loader('');

    $.get("infernoshout.php", 'do=messages' + ((InfernoShoutbox.detached) ? '&detach=true' : '') + '&fetchtype=' + InfernoShoutbox.shout_params.fetchtype + '&', function (data) {
        resp = data.split(InfernoShoutbox.parsebreaker);
        object = $('<div>').html(resp[0]);

        object.find('a[href="#"]').each(function () {
            obj = $(this);
            $.each(InfernoShoutbox.ignoredUsers, function () {
                if (PHP.trim(obj.text().toLowerCase()) == this.toLowerCase()) {
                    obj.parents('div').remove();
                }
            });
        });

        InfernoShoutbox.update_shouts(object.html());
        if (resp[1]) {
            InfernoShoutbox.activity.innerHTML = resp[1];
        }
        // Posting a shout now finishes here, when shouts have been refetched
        if (InfernoShoutbox.posting_shout) {
            InfernoShoutbox.posting_shout = false;
        }

        InfernoShoutbox.set_loader('none');
        InfernoShoutbox.fetching_shouts = false;
    });
}

InfernoShoutbox.load_ignore_users_from_cookie();