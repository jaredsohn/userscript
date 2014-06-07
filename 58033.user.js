// ==UserScript==
// @name           Twitter Watching Sidebar
// @namespace      http://sakuratan.biz/
// @description    Watches latest twits of selected users on Twitter sidebar
// @version        0.9.3
// @include        http://twitter.com/
// @include        http://twitter.com/?*
// @include        http://twitter.com/#*
// @include        https://twitter.com/
// @include        https://twitter.com/?*
// @include        https://twitter.com/#*
// ==/UserScript==

(function() {
    // Number of sidebar widgets.
    var max_widgets = 3;

    // Variables for jQuery and Ajax
    var $ = unsafeWindow.$;
    var ajax_data = [];

    // NOTE
    // This userscript using Greek characters for icons.
    // See http://www.alanwood.net/unicode/greek.html for more details.

    //
    // Misc subroutines
    //

    function get_watchings(num) {
	var s = GM_getValue('watching_screen_names'+num, '');
	if (s) {
	    return s.split(/,/);
	} else {
	    return [];
	}
    }

    function set_watchings(num, vars) {
	GM_setValue('watching_screen_names'+num, vars.join(','));
    }

    function add_watching(num, screen_name) {
	var vars = get_watchings(num);
	for (var i = 0; i < vars.length; ++i) {
	    if (vars[i] == screen_name) {
		return false;
	    }
	}
	vars.push(screen_name);
	set_watchings(num, vars);
	return true;
    }

    function remove_watching(num, screen_name) {
	var vars = get_watchings(num);
	var newvars = [];
	for (var i = 0; i < vars.length; ++i) {
	    if (vars[i] != screen_name) {
		newvars.push(vars[i]);
	    }
	}
	set_watchings(num, newvars);
    }

    function do_reply(screen_name, in_reply_to_id) {
	var mesg = '@' + screen_name + ' ';
	if (location.hash == '#inbox') {
	    location.href =
		'/home?status=' + encodeURIComponent(mesg) +
		'&in_reply_to_status_id='+encodeURIComponent(in_reply_to_id) +
		'&in_reply_to=' + encodeURIComponent(screen_name);
	} else {
	    var st = $('#status');
	    st.val(mesg + st.val());
	    $('#in_reply_to_status_id').val(in_reply_to_id);
	    $('#in_reply_to').val(screen_name);
	    st.focus();
	}
    }

    //
    // Add waching twitterer
    //

    function create_watching_list_node(num, index) {
	var node, command_icons, fav_icon;
	var data = ajax_data[num].loaded_tweets[index];

	// List node
	node = $(document.createElement('li'));
	node.css({
	    position: 'relative',
	    margin: '0',
	    padding: '0.5em 0',
	    backgroundColor: 'white',
	    borderBottom: 'dashed 1px #cccccc'
	});

	node.mouseover(function() {
	    command_icons.css('visibility', 'visible');
	    if (fav_icon.attr('title') == 'Favorite this')
		fav_icon.css('visibility', 'visible');
	    node.css('background-color', '#f7f7f7');
	});

	node.mouseout(function() {
	    command_icons.css('visibility', 'hidden');
	    if (fav_icon.attr('title') == 'Favorite this')
		fav_icon.css('visibility', 'hidden');
	    node.css('background-color', 'white');
	});

	// Profile image
	var profile = $(document.createElement('div'));
	profile.css({
	    float: 'left',
	    marginRight: '1em'
	});

	var profile_link = $(document.createElement('a'));
	profile_link.attr('href', 'http://twitter.com/' + data.screen_name);
	profile_link.css({
	    cursor: 'pointer'
	});

	var profile_image = $(document.createElement('img'));
	profile_image.attr({
	    src: (data.prof ? data.prof : 'http://s.twimg.com/a/1252003675/images/default_profile_mini.png'),
	    width: 24,
	    height: 24,
	    border: 0
	});
	profile_image.css('border', 'none');
	profile_link.append(profile_image);

	profile.append(profile_link);
	node.append(profile);

	// Menu icons
	var icons = $(document.createElement('div'));
	icons.css({
	    position: 'absolute',
	    top: '0.5em',
	    right: '0.5em',
	    zIndex: 9999
	});

	var command_icons = $(document.createElement('span'));
	command_icons.css({
	    visibility: 'hidden'
	});

	// Reply icon
	var reply_icon = $(document.createElement('a'));
	reply_icon.attr('title', 'Reply to ' + data.screen_name);
	reply_icon.css({
	    color: '#999999',
	    cursor: 'pointer'
	});
	reply_icon.text('@');
	reply_icon.click(function() {
	    do_reply(data.screen_name, data.id);
	});
	command_icons.append(reply_icon);
	command_icons.append('&nbsp;');

	// Unwatch icon
	var unwatch_icon = $(document.createElement('a'));
	unwatch_icon.attr('title', 'Unwatch ' + data.screen_name);
	unwatch_icon.css({
	    color: '#999999',
	    cursor: 'pointer'
	});
	unwatch_icon.text('\u03a8');
	unwatch_icon.click(function() {
	    window.setTimeout(function() {
		remove_watching(num, data.screen_name);
	    }, 0);
	    node.fadeOut(function() {
		node.remove();
	    });
	});
	command_icons.append(unwatch_icon);

	icons.append(command_icons);
	icons.append(' ');

	// Fav icon
	fav_icon = $(document.createElement('a'));
	fav_icon.css({
	    cursor: 'pointer',
	    paddingLeft: '1px'
	});
	fav_icon.text('\u03dd');
	if (data.fav) {
	    fav_icon.attr({
		title: 'Un-favorite this'
	    });
	    fav_icon.css({
		visibility: 'visible',
		color: '#ff4500'
	    });
	} else {
	    fav_icon.attr({
		title: 'Favorite this'
	    });
	    fav_icon.css({
		visibility: 'hidden',
		color: '#999999'
	    });
	}

	var set_fav = function(res) {
	    fav_icon.attr('title', 'Un-favorite this');
	    fav_icon.css({
		color: '#ff4500'
	    });
	};

	var unset_fav = function(res) {
	    fav_icon.attr('title', 'Favorite this');
	    fav_icon.css({
		color: '#999999'
	    });
	};

	fav_icon.click(function() {
	    var url, onsuccess;
	    var token = $('#authenticity_token').val();

	    if (fav_icon.attr('title') == 'Favorite this') {
		url = 'http://twitter.com/favorites/create/' + data.id;
		onsuccess = set_fav;
	    } else {
		url = 'http://twitter.com/favorites/destroy/' + data.id;
		onsuccess = unset_fav;
	    }

	    $.ajax({
		type: 'POST',
		url: url,
		data: 'authenticity_token=' + encodeURIComponent(token),
		success: onsuccess,
		error: function(res) {
		    alert('Ajax error');
		}
	    });
	});

	icons.append(fav_icon);

	node.append(icons);

	// Link to twitter
	var user_link = $(document.createElement('a'));
	user_link.attr({
	    href: 'http://twitter.com/' + data.screen_name,
	    display: 'inline',
	    padding: '0px'
	});
	user_link.css({
	    fontWeight: 'bold'
	});
	user_link.append(data.screen_name);
	node.append(user_link);
	node.append(document.createElement('br'));

	// Status message
	var status_message = $(document.createElement('span'));
	status_message.css({
	    display: 'inline',
	    padding: '0px'
	});
	status_message.html(data.text + ' ');
	node.append(status_message);

	var brk = $(document.createElement('br'));
	brk.attr('clear', 'both');
	node.append(brk);

	// Status links
	var footer = $(data.footer);
	$('span', footer).attr('class', '');
	var footer_links = $('a', footer);
	footer_links.attr('class', '');
	footer_links.css({
	    color: '#999999',
	    cursor: 'pointer'
	});
	footer.css({
	    fontSize: '90%',
	    color: '#999999',
	});
	node.append(footer);

	return node;
    }

    //
    // Subroutines for Ajax request
    //

    function scroll_down(num) {
	var wrapper = $('#gm-watching-sidebar-wrapper'+num);
	wrapper.removeClass('loading');
	$('.watching-panel', wrapper).slideDown();
    }

    function ajax_data_sort_compar(a, b) {
	if (b.id < a.id) {
	    return -1;
	} else if (b.id > a.id) {
	    return 1;
	} else {
	    return 0;
	}
    }

    function load_done(num, callback) {
	ajax_data[num].loaded_tweets.sort(ajax_data_sort_compar);

	var elems = [];
	if (ajax_data[num].loaded_tweets.length > 0) {
	    for (var i = 0; i < ajax_data[num].loaded_tweets.length; ++i) {
		elems.push(create_watching_list_node(num, i));
	    }
	}

	callback(num, elems);
	ajax_data[num].running = false;
	ajax_data[num].loaded_tweets = [];
    }

    var rc_latest_timeline = /<ol class="statuses" id="timeline"><li class="hentry u-[^\s]* status latest-status" id="([^"]*)"><span class="status-body"><span class="actions"><div><a class="fav-action ((?:non-)?fav)" id="[^"]*" title="[^"]*">&nbsp;&nbsp;<\/a><\/div><\/span><span class="entry-content">(.*?)<\/span>(<a\b.*?>.*?<\/a>)?<span class="meta entry-meta">(.*?)<\/span><ul class="actions-hover">/;

    var rc_profile = /<img\b[^>]*id="profile-image"[^>]*src="(.*?)_bigger(\..*?)"/;

    function load_next(num, screen_names, callback) {
	if (screen_names.length <= 0) {
	    return;
	}

	var screen_name = screen_names.shift();
	var url = 'http://twitter.com/' + screen_name;

	$.ajax({
	    method: 'GET',
	    url: url,
	    success: function(res) {
		var matches = res.match(rc_latest_timeline);
		if (matches != null) {
		    var text = matches[3];
		    if (matches[4]) {
			text += ' ' + matches[4];
		    }
		    var data = {
			screen_name: screen_name,
			text: text,
			id: parseInt(matches[1]),
			footer: matches[5],
			fav: (matches[2] == 'fav')
		    };

		    matches = res.match(rc_profile);
		    if (matches) {
			data.prof = matches[1] + '_mini' + matches[2];
		    }

		    ajax_data[num].loaded_tweets.push(data);

		} else {
		    alert('Error: ' + screen_name + ' is not available or private mode');
		    window.setTimeout(function() {
			remove_watching(num, screen_name);
		    }, 0);
		}

		if (--ajax_data[num].num_screen_names <= 0) {
		    load_done(num, callback);
		}
	    },
	    error: function(res) {
		if (res.status == 404) {
		    alert('Error: ' + screen_name + ' is not available');
		    window.setTimeout(function() {
			remove_watching(num, screen_name);
		    }, 0);
		}

		if (--ajax_data[num].num_screen_names <= 0) {
		    load_done(num, callback);
		}
	    }
	});

	load_next(num, screen_names, callback);
    }

    function load_watchings(num, screen_names, callback) {
	ajax_data[num].running = true;
	if (screen_names.length == 0) {
	    callback(num, []);
	    ajax_data[num].running = false;
	} else {
	    ajax_data[num].num_screen_names = screen_names.length;
	    ajax_data[num].loaded_tweets = [];
	    load_next(num, screen_names, callback);
	}
    }

    //
    // Create sidebar widget
    //

    function replace_watching_list(num, elems) {
	var list = $('#gm-watching-sidebar-wrapper'+num+' ul.watching-list');
	$('li', list).remove();

	if (elems.length > 0) {
	    for (var i = 0; i < elems.length; ++i) {
		list.append(elems[i]);
	    }
	}

	scroll_down(num);
    }

    function create_sidebar_widget(num) {
	var wrapper, title, panel, menu, form, screen_name;

	// Wrapper
	wrapper = $(document.createElement('div'));
	wrapper.attr({
	    id: 'gm-watching-sidebar-wrapper'+num,
	    className: 'collapsible collapsed',
	});
	wrapper.attr({
	    fontSize: '10px',
	});

	// Separator
	wrapper.append(document.createElement('hr'));

	// Title
	title = $(document.createElement('h2'));
	title.attr({
	    className: 'sidebar-title'
	});
	title.text('Watching '+(num+1));

	// slideDown/slideUp when title clicked
	title.click(function() {
	    if (ajax_data[num].running) {
		return;
	    }

	    if (panel.css('display') == 'none') {
		wrapper.addClass('loading');
		wrapper.removeClass('collapsed');
		if (ajax_data[num].initialized) {
		    scroll_down(num);
		} else {
		    ajax_data[num].initialized = true;
		    window.setTimeout(function() {
			load_watchings(num, get_watchings(num),
				       replace_watching_list);
		    }, 0);
		}

	    } else {
		wrapper.addClass('collapsed');
		panel.slideUp();
	    }
	});

	wrapper.append(title);

	// Panel
	panel = $(document.createElement('div'));
	panel.attr({
	    className: 'watching-panel sidebar-menu'
	});
	panel.css({
	    backgroundColor: 'white',
	    margin: '5px 10px',
	    padding: '0.5em 6px',
	    display: 'none',
	    MozBorderRadiusTopleft: '3px',
	    MozBorderRadiusBottomleft: '3px',
	    MozBorderRadiusTopright: '3px',
	    MozBorderRadiusBottomright: '3px'
	});

	// Panel menu
	menu = $(document.createElement('div'));
	menu.css({
	    position: 'relative',
	    lineHeight: '10px',
	    marginBottom: '2px'
	});

	// Icon to open form
	var form_open_icon = $(document.createElement('a'));
	form_open_icon.attr({
	    title: 'Watch new user'
	});
	form_open_icon.css({
	    color: '#999999',
	    cursor: 'pointer'
	});
	form_open_icon.text('\u03c9');

	form_open_icon.click(function() {
	    form.toggle();
	});

	menu.append(form_open_icon);
	menu.append(' ');

	// Reload icon
	var reload_icon = $(document.createElement('a'));
	reload_icon.attr({
	    title: 'Reload'
	});
	reload_icon.css({
	    color: '#999999',
	    cursor: 'pointer'
	});
	reload_icon.text('\u03b6');

	// reload when title double clicked
	reload_icon.click(function() {
	    if (ajax_data[num].running) {
		return;
	    }

	    wrapper.addClass('loading');
	    wrapper.removeClass('collapsed');
	    window.setTimeout(function() {
		load_watchings(num, get_watchings(num), replace_watching_list);
	    }, 0);
	});

	menu.append(reload_icon);

	// Form for adding watching
	form = $(document.createElement('form'));
	form.css({
	    position: 'absolute',
	    top: '12px',
	    left: 0,
	    width: '140px',
	    backgroundColor: 'white',
	    padding: '1em',
	    border: 'solid 1px #999999',
	    display: 'none',
	    zIndex: 10000,
	    MozBorderRadiusTopleft: '3px',
	    MozBorderRadiusBottomleft: '3px',
	    MozBorderRadiusTopright: '3px',
	    MozBorderRadiusBottomright: '3px'
	});

	screen_name = $(document.createElement('input'));
	screen_name.attr({
	    name: 'screen_name',
	    type: 'text',
	    value: '@username'
	});
	screen_name.css({
	    width: '110px',
	    height: '13px',
	    color: '#808080',
	    MozBorderRadiusTopleft: '3px',
	    MozBorderRadiusBottomleft: '3px',
	    MozBorderRadiusTopright: 0,
	    MozBorderRadiusBottomright: 0
	});
	form.append(screen_name);

	// toggle textfield when focus...
	screen_name.focus(function() {
	    if (screen_name.attr('title') == '') {
		screen_name.attr('title', '@username');
		screen_name.val('');
		screen_name.css('color', 'black');
	    }
	});

	var reset_screen_name = function() {
	    screen_name.attr('title', '');
	    screen_name.val('@username');
	    screen_name.css('color',  '#808080');
	};

	// and blur
	screen_name.blur(function() {
	    if (screen_name.attr('title') != '' && screen_name.val() == '') {
		reset_screen_name();
	    }
	});

	var submit_button = $(document.createElement('button'));
	submit_button.attr({
	    type: 'submit'
	});
	submit_button.css({
	    width: '26px',
	    height: '15px',
	    padding: 0,
	    borderLeft: 0,
	    MozBorderRadiusTopleft: 0,
	    MozBorderRadiusBottomleft: 0,
	    MozBorderRadiusTopright: '3px',
	    MozBorderRadiusBottomright: '3px'
	});
	submit_button.text('Add');
	form.append(submit_button);

	// Add new waching user
	form.submit(function() {
	    var val = screen_name.val().replace(/^@/, '');
	    window.setTimeout(function() {
		if (add_watching(num, val)) {
		    screen_name.attr('disabled', true);
		    load_watchings(num, [val], function(num, elems) {
			form.hide();
			screen_name.attr('disabled',  false);
			screen_name.val('');
			reset_screen_name();
			for (var i = 0; i < elems.length; ++i) {
			    list.append(elems[i]);
			}
		    });
		} else {
		    screen_name.val('');
		    screen_name.get(0).blur();
		}
	    }, 0);
	    return false;
	});

	menu.append(form);

	panel.append(menu);

	// Watching list
	var list = $(document.createElement('ul'));
	list.attr('class', 'watching-list');
	list.css('border-top', 'dashed 1px #cccccc');
	panel.append(list);

	wrapper.append(panel);

	return wrapper;
    }

    function init() {
	var prev = $('#following');
	for (var i = 0; i < max_widgets; ++i) {
	    ajax_data.push({
		initalized: false,
		running: false,
		num_screen_names: 0,
		loaded_tweets: 0
	    });
	    var wrapper = create_sidebar_widget(i);
	    prev.after(wrapper);
	    prev = wrapper;
	}
    }

    init();
})();
