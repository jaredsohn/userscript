// ==UserScript==
// @name        Only Show This User Posts
// @namespace   qixinglu.com
// @description Only show the user posts you just want to read
// @grant       GM_info
// @grant       GM_addStyle
// @include     http:///localhost/*
// ==/UserScript==

/* tools function */

var convert2RegExp = function(pattern) {
    var firstChar = pattern.charAt(0);
    var lastChat = pattern.charAt(pattern.length - 1);
    if (firstChar + lastChat === '//') {
        return new RegExp(s.substr(1, -1));
    } else {
        pattern = '^' + pattern.replace(/\*/g, '.*') + '$';
        return new RegExp(pattern);
    }
};

var create_element_from_string = function(text) {
    var tag;
    if (text.indexOf('<td') === 0) {
        tag = 'tr';
    } else if (text.indexOf('<li') === 0) {
        tag = 'ul';
    } else {
        tag = 'div';
    }
    var parent_element = document.createElement(tag);
    parent_element.innerHTML = text;
    return parent_element.firstChild;
}

/* ostup core */

var ostup = function(site) {
    var setup_site_default = function() {
        if (site.showOnlyLabel === undefined) {
            site.showOnlyLabel = 'only show this user';
        }
        if (site.showAllLabel === undefined) {
            site.showAllLabel = 'only all users';
        }
        if (site.positionInsert === undefined) {
            site.positionInsert = false;
        }
    }

    var runtime = {
        hide_index: -1,
        post_display: 'block'
    }

    var add_custom_style = function() {
        if (site.style !== undefined) {
            GM_addStyle(site.style);
        }
    }

    var setup_post_display = function() {
        post = document.querySelector(site.post);
        if (post !==  null) {
            runtime.post_display = window.getComputedStyle(post).display;
        }

    }

    var change_display = function(elements, start, length, value) {
        var end = start + length;
        for (var i = start; i < end; i += 1) {
            elements[i].style.display = value;
        }
    }

    var do_filter = function() {

        var posts = document.querySelectorAll(site.post);
        var usernames = document.querySelectorAll(site.username);
        var multiple = posts.length / usernames.length;

        var show_only = function() {
            var hide_username = usernames[runtime.hide_index].textContent;
            for (var i = 0; i < usernames.length; i += 1) {
                var username = usernames[i];
                if (username.textContent !== hide_username) {
                    change_display(posts, i * multiple, multiple, 'none');
                }
            }
        };

        var show_all = function() {
            for (var i = 0; i < posts.length; i += 1) {
                change_display(posts, i, multiple, runtime.post_display);
            }
        };

        if (runtime.hide_index === -1) {
            show_all(posts);
        } else {
            show_only(posts);
        }
    };

    var get_button_text = function() {
        return runtime.hide_index === -1 ? site.showOnlyLabel : site.showAllLabel;
    };

    var update_buttons = function() {
        var button_text = get_button_text();
        var buttons = document.querySelectorAll('a.ostup');
        for (var i = 0; i < buttons.length; i += 1) {
            buttons[i].textContent = button_text;
        }
    };

    var add_buttons = function() {

        var button_html = '<a class="ostup" href="javascript:void(0)"></a>';

        var create_click_callback = function(i) {
            return function() {
                runtime.hide_index = runtime.hide_index === -1 ? i : -1;
                update_buttons();
                do_filter();
            }
        }

        var positions = document.querySelectorAll(site.position);
        for (var i = 0; i < positions.length; i += 1) {
            var position = positions[i];
            if (site.positionInsert) {
                var button = position.parentNode.querySelector('a.ostup');
            } else {
                var button = position.querySelector('a.ostup');
            }
            if (button !== null) {
                continue;
            }
            button = create_element_from_string(button_html);
            button.textContent = get_button_text();
            button.addEventListener('click', create_click_callback(i));

            if (site.container !== undefined) {
                var container = create_element_from_string(site.container);
                container.appendChild(button);
                button = container;
            }
            if (site.positionInsert) {
                position.parentNode.insertBefore(container, position.nextSibling);
            } else {
                position.appendChild(button);
            }
        }
    };

    var control = {
        add_buttons: add_buttons,
        do_filter: do_filter
    };

    add_custom_style();
    setup_post_display();
    add_buttons();
    return control;
}

/* rule setup functions */

var select_site = function(sites) {
    var url = location.href;
    var i, j, reg, site, urls;
    for (i = 0; i < sites.length; i += 1) {
        site = sites[i];

        // if is not a array, convert it to
        urls = (typeof(site.url) === 'string') ? [site.url] : site.url;

        // start to find with site to use
        for (j = 0; j < urls.length; j += 1) {
            reg = convert2RegExp(urls[j]);
            if (reg.test(url)) {
                return site;
            }
        }
    }
    return null;
};

// only run as main file
if (GM_info.script.name === 'Only Show This User Posts') {
    var site = select_site(SITES);
    if (site !== null) {
        var control = ostup(site);
        document.addEventListener("LightPagerAppended", function() {
            control.add_buttons();
            control.do_filter();
        });
    }
}
