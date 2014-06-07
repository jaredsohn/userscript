// ==UserScript==
// @name        Rune-Server Shoutbox Ignore
// @namespace   Rune-Server
// @include     *rune-server.org/forum.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     2
// ==/UserScript==

function SB_Ignore() {
    var users = [];
    var console = window.console;
    var InfernoShoutbox = unsafeWindow.InfernoShoutbox;

    this.showNotices = true;

    console.error = function (error) {
        if (typeof InfernoShoutbox == "undefined")
            alert('Error: ' + error);
        else
            InfernoShoutbox.show_notice('<font color="red">' + error + '</font>');
    }


    this.handle = function (userInfo, type) {
        if (type === 'add') {
            this._add(userInfo);
        } else if (type === 'delete') {
            this._delete(userInfo);
        } else {
            console.warn('Invalid ignore type: ' + type);
        }
    }

    this.load = function (update) {
        users = [];
        var instance = this;

        $.get("http://www.rune-server.org/profile.php?do=ignorelist", function (data) {
            var page = $(data);

            var ignoreList = page.find('#ignorelist');

            ignoreList.find('li[id^="user"]').each(function () {
                users.push({
                    id: this.id.replace('user', ''),
                    name: $(this).find('a').text()
                });
            });

            if (instance.showNotices)
                InfernoShoutbox.show_notice('Loaded ' + users.length + ' user(s) to be ignored.');
        }).fail(function () {
            console.error('Unable to load ignore list.');
        });
    }

    this.getUsers = function () {
        return users;
    }

    this._add = function (userInfo) {
        var instance = this;

        $.post('http://www.rune-server.org/profile.php?do=updatelist&userlist=ignore', {
            username: userInfo.name,
            s: '',
            securitytoken: unsafeWindow.SECURITYTOKEN,
            'do': 'updatelist',
            userlist: 'ignore'
        }, function (data) {
            instance.load();

            if (instance.showNotices)
                InfernoShoutbox.show_notice('Added ' + userInfo.name + ' to ignore list.');
        }).fail(function () {
            console.error('Failed to add ' + userInfo.name + ' to ignore list. If you wish to manually do it click <a href="http://www.rune-server.org/profile.php?do=ignorelist">here</a>.');
        });
    }

    this._delete = function (userInfo) {
        InfernoShoutbox.show_notice('To remove someone from your ignore list click <a href="http://www.rune-server.org/profile.php?do=ignorelist" target="_blank">here</a>.');

        /*var instance = this;
		$.post('http://www.rune-server.org/profile.php?do=updatelist&userlist=ignore', {
		}, function(data) {			
			instance.load();
			if (instance.showNotices)
				InfernoShoutbox.show_notice('Removed ' + userInfo.name + ' from ignore list.');
		}).fail(function() {
			console.error('Failed to delete ' + userInfo.name + ' from ignore list. If you wish to manually do it click <a href="http://www.rune-server.org/profile.php?do=ignorelist">here</a>.');
		});*/
    }

    this.removeIgnoredFromDom = function (dom) {
        dom.find("a").each(function () {
            var link = $(this);

            if (link.attr('href') != '#')
                return true;

            for (var i = 0; i < users.length; i++) {
                if (unsafeWindow.PHP.trim(link.text()) == users[i].name) {
                    link.parents('div').remove();
                    break;
                }
            }
        });
        return dom;
    }
}