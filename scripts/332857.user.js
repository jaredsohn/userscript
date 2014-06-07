// ==UserScript==
// @name        Shoutbox Mod
// @namespace   sbmod
// @include     http://www.rune-server.org/forum.php*
// @include		http://www.rune-server.org/infernoshout.php?do=detach
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require     http://pastebin.com/raw.php?i=f9AE3BRe
// @require     http://userscripts.org/scripts/source/179307.user.js
// @version     1
// ==/UserScript==

$('<link rel="stylesheet" href="http://lokeshdhakar.com/projects/lightbox2/css/lightbox.css" media="screen" />').appendTo('head');

IS = unsafeWindow.InfernoShoutbox;

IS.addons = [];
IS.addons['SB_Ignore'] = new SB_Ignore();

IS.isMod = false;
IS.viewing_user = false;
IS.panelUser = {
    id: null,
    username: null
};
IS.actions = [];

IS.actions.push({
    id: "PrivateMessage",
    name: "Private Message",
    mod: false,
    click: function (shoutbox) {
        var message = prompt('Enter a message to send to ' + shoutbox.panelUser.username + ':', '');
        if (message != "" && message != null) {
            shoutbox.post_shout('/pm ' + shoutbox.panelUser.id + ';' + message);
        }
    }
}, {
    id: "ViewProfile",
    name: "View Profile",
    mod: false,
    click: function (shoutbox) {
		// shoutbox.post_shout('[user]' + shoutbox.panelUser.username + '[/user]');
        myWindow = window.open('http://www.rune-server.org/member.php?u=' + shoutbox.panelUser.id, '', 'width=auto,height=auto');
        myWindow.focus();
    }
}, {
    id: "ForumMessage",
    name: "Forum Message",
    mod: false,
    click: function (shoutbox) {
        myWindow = window.open('http://www.rune-server.org/private.php?do=newpm&u=' + shoutbox.panelUser.id, '', 'width=auto,height=auto');
        myWindow.focus();
    }
}, {
    id: "PruneUser",
    name: "Prune",
    mod: true,
    click: function (shoutbox) {
        shoutbox.post_shout('/prune ' + shoutbox.panelUser.id);
    }
}, {
    id: "ModCPProfile",
    name: "ModCP Profile",
    mod: true,
    click: function (shoutbox) {
        myWindow = window.open('http://www.rune-server.org/mcp/index.php?loc=user.php%3Fdo%3Dviewuser%26u%3D' + shoutbox.panelUser.id, '', 'width=auto,height=auto');
        myWindow.focus();
    }
}, {
	id: "SBIgnore",
	name: "Ignore",
	mod: false,
	click: function (shoutbox) {
		if (typeof shoutbox.addons['SB_Ignore'] == "undefined")
			return true;
		
		var sb_ignore = shoutbox.addons['SB_Ignore'];
		
		sb_ignore.handle({
			id: shoutbox.panelUser.id,
			name: shoutbox.panelUser.username
		}, 'add');
		shoutbox.fetch_shouts();
	}   
});

IS.idlecheck = function () {}

IS.loadActions = function () {
    var page = 1;
    var maxPerPage = 5;
    // var lastPage = Math.ceil(IS.actions.length % maxPerPage);

    $('<ul id="SBM_CommandList_1"></ul>').appendTo('#SBM_CommandList');

	var rows = 0;
	
    for (var i = 0; i < IS.actions.length; i++) {
        var action = IS.actions[i];
        if (action.mod && IS.isMod == false) continue;

        if (rows != 0 && rows % maxPerPage == 0) {
            $('<li><a id="' + id + '" href="#" onclick="InfernoShoutbox.change_panel_page(' + (page + 1) + ');" style="text-align: center;">Next Page</a></li>').appendTo('#SBM_CommandList_' + page);
            page++;
            $('<ul id="SBM_CommandList_' + page + '"></ul>').hide().appendTo('#SBM_CommandList');
        }

        var id = 'SBM_Command_' + action.id;
        $('<li><a id="' + id + '" href="#" onclick="InfernoShoutbox.actions[' + i + '].click(InfernoShoutbox);" style="text-align: center;">' + action.name + '</a></li>').appendTo('#SBM_CommandList_' + page);

        if (rows == (IS.actions.length - 1) && page != 1) {
            $('<li><a id="' + id + '" href="#" onclick="InfernoShoutbox.change_panel_page(1);" style="text-align: center;">First Page</a></li>').appendTo('#SBM_CommandList_' + page);
        }
		
		rows++;
    }
    $('#SBM_CommandList a').click(function (e) {
        e.preventDefault();
    });
}

IS.change_panel_page = function (id) {
    $('ul[id^=SBM_CommandList_]').hide();
    $('#SBM_CommandList_' + id).show();
}

IS.getOffsetY = function (a) {
    for (var b = 0; null != a;) b += a.offsetTop, a = a.offsetParent;
    return b
}

IS.getOffsetX = function (a) {
    for (var b = 0; null != a;) b += a.offsetLeft, a = a.offsetParent;
    return b
}

IS.open_panel = function (userid, username) {
    $('td[id^=SBM_UserInfo_]').html('Loading...');

    $.get('http://www.rune-server.org/member.php?u=' + userid, function (data) {
        $(data).find('#view-stats_mini').find('.blockrow,.member_blockrow').find('dl').each(function (index) {
            text = unsafeWindow.PHP.trim($(this).find('dd').text());
            switch (unsafeWindow.PHP.trim($(this).find('dt').text())) {
            case 'Join Date':
                $('#SBM_UserInfo_RegDate').html(text);
                break;
            case 'Current Activity':
                currentActivity = text.length > 10 ? "<abbr title=\"" + text + "\">" + text.substr(0, 10) + "...</abbr>" : text;
                $('#SBM_UserInfo_CurrentActivity').html(currentActivity);
                break;
            case 'Last Activity':
                lastActive = text.length > 10 ? "<abbr title=\"" + text + "\">" + text.substr(0, 10) + "...</abbr>" : text;
                $('#SBM_UserInfo_LastActive').html(lastActive);
                break;
            }
			
			if ($('#SBM_UserInfo_CurrentActivity').text() == 'Loading...') {
				$('#SBM_UserInfo_CurrentActivity').html('N/A');
			}
        });
    });

    $('#SBM_Panel').show();
    IS.reposition_panel();

    IS.panelUser.id = userid;
    IS.panelUser.username = username;

    if (username.length > 9) {
        username = "<abbr title=\"" + username + "\">" + username.substr(0, 9) + "..</abbr>";
    }

    $('#SBM_UserInfo_Username').html(username);
    $('#SBM_UserInfo_Userid').html(userid);
    setTimeout(function () {
        IS.viewing_user = true;
    }, 300);
    return false;
}

IS.reposition_panel = function () {
    var f = document.getElementById("collapse_shoutbox");
    $("#SBM_Panel").offset({
        top: IS.getOffsetY(f) + 100,
        left: IS.getOffsetX(f) - (150 + $("#SBM_Panel").width() / 1.70)
    });
}

IS.post_shout = function (message) {
    IS.shout.ajax = new unsafeWindow.vB_AJAX_Handler(true);
    IS.shout.ajax.onreadystatechange(IS.shout_posted);
    IS.shout.ajax.send('infernoshout.php', 'do=shout&message=' + unsafeWindow.PHP.urlencode(message) + '&');
}

IS.shout = function () {
    if (IS.posting_shout) {
        IS.show_notice('A previous message is still being submitted.');
        return false;
    }
	
    message = IS.editor.value;

    if (message.indexOf("/") == 0) {
        var command = message.substring(1);

        if (command.indexOf("ignore") == 0) {			
			IS.addons['SB_Ignore'].handle({
				id: 0,
				name: command.substring(7)
			}, 'add');
			
			IS.fetch_shouts();
        } else if (command.indexOf("unignore") == 0) {
			IS.addons['SB_Ignore'].handle({
				id: 0,
				name: command.substring(9)
			}, 'delete');
			
			IS.fetch_shouts();
        } else {
            IS.posting_shout = true;
			IS.set_loader('');
			IS.post_shout(message);
        }
    } else {
        message = IS.shout_params.prefix + message + IS.shout_params.suffix;

        IS.posting_shout = true;
        IS.set_loader('');
        IS.post_shout(message);
    }

    IS.clear();
    return false;
}

IS.fetch_shouts = function () {
    if (IS.posting_shout && !IS.force_fetch) {
        if (IS.failure_count('posting_shout')) {
            IS.posting_shout = false;
        }

        return false;
    }

    if (IS.fetching_shouts) {
        if (IS.failure_count('fetching_shouts')) {
            IS.fetching_shouts = false;
        }

        return false;
    }

    if (IS.idle && IS.loaded) {
        IS.show_notice('You are currently idle in the shoutbox. Click <a href="?" onclick="return IS.unidle();">here</a> to un-idle yourself.');
        clearTimeout(IS.kill_notice); // Don't hide this notice
        return false;
    }

    IS.fetching_shouts = true;
    IS.force_fetch = false;
    IS.loaded = true;

    IS.set_loader('');

    $.get("infernoshout.php", 'do=messages' + ((IS.detached) ? '&detach=true' : '') + '&fetchtype=' + IS.shout_params.fetchtype + '&', function (data) {
        resp = data.split(IS.parsebreaker);
        object = $('<div>').html(resp[0]);
		
		object.find("a").each(function () {
			var link = $(this);

			if (link.attr('href') != '#')
				return true;

			for (var i = 0; i < IS.addons['SB_Ignore'].getUsers().length; i++) {
				if (unsafeWindow.PHP.trim(link.text()) == IS.addons['SB_Ignore'].getUsers()[i].name) {
                    var obj = $('<div/>');
                    obj.attr('class', 'smallfont').css({'padding-top': '1px', 'padding-bottom': '1px'});
                    obj.append('[');
                    obj.append(link.parent().find('*[class="time"]').clone(true));
                    obj.append('] ');
					obj.append(link.clone(true));
                    obj.append(': This message is hidden because <b>' + IS.addons['SB_Ignore'].getUsers()[i].name + '</b> is on your <a href=http://www.rune-server.org/profile.php?do=ignorelist>ignore list</a>.');
					link.parent().replaceWith(obj);
					break;
				}
			}
		});
		
		object.find('a').each(function () {
            obj = $(this);
			
			if (obj.attr('href') == '#') { // Link it to a username
				var onclick = obj.attr('onclick');
				var userid = onclick.substring(39, onclick.indexOf("'", 39));
				var username = unsafeWindow.PHP.trim(obj.text());

				obj.attr('onclick', 'return InfernoShoutbox.open_panel(\'' + userid + '\', \'' + username + '\');');
			} else {
				var link = obj.attr('href');
			
				if (link.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) == null) {
					return true;
				}
				
				obj.attr('data-lightbox', "sb-gallery");
			}
        });

        object.find('span').each(function () {
            if ($(this).css('text-shadow') != "none")
                $(this).css('text-shadow', '');
        });

        IS.update_shouts(object.html());
        if (resp[1]) {
            IS.activity.innerHTML = resp[1];
        }
        // Posting a shout now finishes here, when shouts have been refetched
        if (IS.posting_shout) {
            IS.posting_shout = false;
        }

        IS.set_loader('none');
        IS.fetching_shouts = false;
    });
}

window.onresize = function () {
    IS.reposition_panel();
};

$('\
<div id="SBM_Panel"> \
	<div id="SBM_UserInfo"> \
		<div class="SBM_Content"> \
			<div style="text-align: center; font: bold 9pt verdana,geneva,lucida,\'lucida grande\',arial,helvetica,sans-serif; border-bottom: 1px solid #3D3D3D;">User Info</div> \
			<table cols="2" style="width: 100%"> \
				<tr> \
					<td>Username: </td> \
					<td id="SBM_UserInfo_Username">&nbsp;</td> \
				</tr> \
				<tr> \
					<td>User ID: </td> \
					<td id="SBM_UserInfo_Userid">&nbsp;</td> \
				</tr> \
				<tr> \
					<td>Date <abbr title="Registered">Reg.</abbr>: </td> \
					<td id="SBM_UserInfo_RegDate">&nbsp</td> \
				</tr> \
				<tr> \
					<td>Last Activity: </td> \
					<td id="SBM_UserInfo_LastActive">&nbsp</td> \
				</tr> \
				<tr> \
					<td>Current Activity: </td> \
					<td id="SBM_UserInfo_CurrentActivity">&nbsp</td> \
				</tr> \
			</table> \
		</div> \
	</div> \
	<div id="SBM_Commands"> \
		<div class="SBM_Content"> \
			<div style="text-align: center; font: bold 9pt verdana,geneva,lucida,\'lucida grande\',arial,helvetica,sans-serif; border-bottom: 1px solid #3D3D3D;">Actions</div> \
			<div id="SBM_CommandList"> \
			</div> \
		</div> \
	</div> \
</div> \
<style> \
	#SBM_Panel { \
		height: auto; \
		width: 350px; \
		color: white; \
	} \
	#SBM_UserInfo { \
		background: #008BEC; \
		float: left; \
		width: 50%; \
		height: auto; \
	} \
	#SBM_Commands { \
		background: #007AB5; \
		float: right; \
		width: 50%; \
		height: auto; \
	} \
	.SBM_Content { \
		margin: 2px 2px 2px 2px; \
	} \
	#SBM_CommandList { \
		list-style: none; \
		width: auto; \
		margin: 0px; \
		padding: 0px; #00C1E8; \
		color: #00C1E8; \
		background: #007AB5; \
		opacity: 0.8; \
	} \
	\
	#SBM_CommandList a { \
		color: #FFFFFF; \
		text-decoration: none; \
		padding: 5px; \
		padding-left: 10px; \
		padding-right: 10px; \
		border-bottom: 1px #5FD2B5 dotted; \
		display: block; \
	} \
	 \
	#SBM_CommandList a:hover { \
		color: #35D2AB; \
		text-decoration: none; \
		background: #00A67C; \
	} \
</style>').appendTo('body');

$('body').click(function (e) {
    if ($('#SBM_Panel').has(e.target).length === 0 && IS.viewing_user == true) {
        if ($(e.target).closest('a').attr('href') != "undefined" && $(e.target).closest('a').attr('href') != "#") {
            $('#SBM_Panel').fadeOut('slow', function () {
                IS.viewing_user = false;
            });
        }
    }
});

setTimeout(function () {
	IS.loadActions();
	IS.addons['SB_Ignore'].showNotices = true;
	IS.addons['SB_Ignore'].load();
}, 300);

$('#SBM_Panel').hide();