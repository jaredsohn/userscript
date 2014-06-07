// ==UserScript==
// @name           Twitter Quick Removing
// @namespace      http://sakuratan.biz/
// @description    Extends Twitter following page to remove users who don't follow you
// @include        http://twitter.com/following
// @include        http://twitter.com/following?*
// @include        http://twitter.com/*/following
// @include        http://twitter.com/*/following?*
// @include        https://twitter.com/following
// @include        https://twitter.com/following?*
// @include        https://twitter.com/*/following
// @include        https://twitter.com/*/following?*
// ==/UserScript==

(function() {
    if (location.pathname.search(/^\/([^\/]+)\/following$/) >= 0) {
	var meta = document.getElementsByTagName('meta');
	for (var i = 0; i < meta.length; ++i) {
	    if (meta[i].name == 'session-user-screen_name') {
		if (meta[i].content != RegExp.$1)
		    return;
		break;
	    }
	}
    }

    var removing_ids = [];
    var following_count = parseInt(unsafeWindow.$('#following_count').text().replace(/,/g, ''));

    var bulk_remove_button = document.createElement('input');
    bulk_remove_button.type = 'button';
    bulk_remove_button.disabled = true;
    bulk_remove_button.style.color = 'gray';
    bulk_remove_button.cursor = 'default';

    function refresh_button() {
	var n = removing_ids.length;
	bulk_remove_button.value = 'Remove ' + n + ' ' + (n > 1 ? 'users' : 'user');
	if (n > 0) {
	    bulk_remove_button.disabled = false;
	    bulk_remove_button.style.color = 'black';
	    bulk_remove_button.style.cursor = 'pointer';
	} else {
	    bulk_remove_button.disabled = true;
	    bulk_remove_button.style.color = 'gray';
	    bulk_remove_button.style.cursor = 'default';
	}
    }

    function enqueue(id) {
	if (!id) {
	    return;
	}
	for (var i = 0; i < removing_ids; ++i) {
	    if (removing_ids[i] == id) {
		return;
	    }
	}
	removing_ids.push(id);
	refresh_button();
    }

    function dequeue(id) {
	for (var i = 0; i < removing_ids.length; ++i) {
	    if (removing_ids[i] == id) {
		removing_ids.splice(i, 1);
		refresh_button();
		return;
	    }
	}
    }

    function remove(id) {
	var twttr = unsafeWindow.twttr;
	unsafeWindow.$.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/friendships/destroy/" + id.replace(/^user_/, ''),
	    data: {
		authenticity_token: unsafeWindow.twttr.form_authenticity_token,
		twttr:true
	    },
	    success: function(data) {
		if (data.success) {
		    unsafeWindow.$('#' + id).fadeOut('medium');
		    --following_count;
		    var s = ('' + following_count).replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1,");
		    unsafeWindow.$('#following_count').text(s);
		    dequeue(id);
		    if (removing_ids.length == 0) {
			refresh_button();
		    }
		} else {
		    unsafeWindow.twttr.error();
		}
	    }
	});
    }

    function start() {
	if (!confirm('Do you really want to remove following users?')) {
	    return;
	}
	bulk_remove_button.disabled = true;
	bulk_remove_button.style.color = 'gray';
	bulk_remove_button.style.cursor = 'default';
	for (var i = 0; i < removing_ids.length; ++i) {
	    remove(removing_ids[i]);
	}
    }

    function create_toggle_callback(id) {
	return function() {
	    var obj = unsafeWindow.$(this);
	    var mesg = obj.text();
	    if (mesg == 'Remove') {
		if (document.getElementById(id).className.search(/\bdirect-messageable\b/) >= 0) {
		    obj.text('Followed');
		} else {
		    obj.text('Keep');
		}
		obj.css('color', '#aaaaaa');
		dequeue(id);
	    } else {
		obj.text('Remove');
		obj.css('color', 'black');
		enqueue(id);
	    }
	};
    }

    function ui_init() {
	bulk_remove_button.addEventListener('click', start, false);

	var list = unsafeWindow.$('.user');
	for (var i = 0; i < list.length; ++i) {
	    var dom = list.get(i);
	    var direct_message = (dom.className.search(/\bdirect-messageable\b/) >= 0);
	    var span = unsafeWindow.$('<span class="is-following"></span>');
	    var a = unsafeWindow.$('<a class="quick_removing_link" style="cursor:pointer;font-weight:bold;text-decoration:none"></a>');
	    if (direct_message) {
		span.append(document.createElement('i'));
		a.css('color', '#aaaaaa');
		a.text('Followed');
	    } else {
		a.css('color', 'black');
		a.text('Remove');
		enqueue(dom.id);
	    }
	    a.click(create_toggle_callback(dom.id));
	    span.append(a);
	    unsafeWindow.$('.is-relationship', list[i]).append(span);
	}

	if (removing_ids.length == 0) {
	    refresh_button();
	}
	var wrapper = unsafeWindow.$('<div style="margin-top:1em"></div>');
	wrapper.append(unsafeWindow.$(bulk_remove_button));
	unsafeWindow.$('#pagination').after(wrapper);
    }

    ui_init();
})();
