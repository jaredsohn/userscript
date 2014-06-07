// ==UserScript==
// @name        Light Pager
// @namespace   qixinglu.com
// @description Append next page content to current page.
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @include     http:///localhost/*
// ==/UserScript==

/* tools function */

var convert2RegExp = function(pattern) {
    var firstChar = pattern.charAt(0);
    var lastChat = pattern.charAt(pattern.length - 1);
    if (firstChar + lastChat === '//') {
        return new RegExp(pattern.substr(1, -1));
    } else {
        pattern = '^' + pattern.replace(/\*/g, '.*') + '$';
        return new RegExp(pattern);
    }
};

/* eXtend querySelector */

var querySelectorLast = function(element, selector) {
    var nodes = element.querySelectorAll(selector);
    if (nodes.length === 0) {
        return null;
    }
    return nodes[nodes.length - 1];
};

var queryXSelectorAll = function(element, xselector) {
    if (xselector.indexOf(':contains') !== -1) {
        var parts = xselector.split(':contains');
        var selector = parts[0];
        var text = parts[1].slice(2, -2);

        var nodes = element.querySelectorAll(selector);
        var filtered_nodes = [];
        var i, node;
        for (i = 0; i < nodes.length; i += 1) {
            node = nodes[i];
            if (node.textContent.indexOf(text) !== -1) {
                filtered_nodes.push(node);
            }
        }
        return filtered_nodes;

    } else if (xselector.indexOf(':eq') !== -1) {
        var parts = xselector.split(':eq');
        var selector = parts[0];
        var text = parts[1].slice(1, -1);
        var index = parseInt(text);

        var nodes = element.querySelectorAll(selector);
        if (index < 0) {
            index = nodes.length + index;
        }
        return [nodes[index]];
    }

    return element.querySelectorAll(xselector);
};

var queryXSelector = function(element, xselector) {
    var nodes = queryXSelectorAll(element, xselector);
    var node = nodes[0];
    if (node !== undefined) {
        return node;
    } else {
        return null;
    }
};

var queryXSelectorLast = function(element, xselector) {
    var nodes = queryXSelectorAll(element, selector);
    if (nodes.length === 0) {
        return null;
    }
    return nodes[nodes.length - 1];
};

/* ligher pager core */

var light_pager = function(site) {

    var setup_site_default = function() {
        if (site.separate === undefined) {
            site.separate = false;
        }
        if (site.separateCSS === undefined) {
            var css = '.lp-sep {' +
                      '    background-color: #FFE7D3;' +
                      '    clear: both; line-height: 22px;' +
                      '    margin: 10px 0;' +
                      '    text-align: center;' +
                      '}';
            site.separateCSS = css;
        }
        if (site.separateInside === undefined) {
            site.separateInside = true;
        }
        if (site.loadingHTML === undefined) {
            var html = 'Loading: <a href="${url}">${current} / ${total}<a/>';
            site.loadingHTML = html;
        }
        if (site.loadedHTML === undefined) {
            var html = 'Page: <a href="${url}">${current} / ${total}<a/>';
            site.loadedHTML = html;
        }
        if (site.height === undefined) {
            site.height = 0.9;
        }
        if (site.count === undefined) {
            site.count = 9;
        }
    };

    var setup_site_absolute = function() {
        if (site.height <= 1) {
            if (window.scrollMaxY === 0) {
                site.height = window.innerHeight * (1 - site.height);
            } else {
                site.height = window.scrollMaxY * (1 - site.height);
            }
        }
        if (site.count <= 0) {
            site.count = 9999; // not really endless
        }
    };

    var reach_append_height = function() {
        // some page create by javascript, no height before it created.
        if (window.scrollMaxY === 0) {
            return false;
        }
        var current_height = window.scrollMaxY - window.scrollY;
        return site.height > current_height;
    };

    var dispatch_appended_event = function(count, url) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("LightPagerAppended", false, true);
        evt.count = count
        evt.url = url;
        document.dispatchEvent(evt);
    };

    var get_document_mimetype = function() {
        var mime_type = document.contentType;
        mime_type += '; charset=' + document.characterSet;
        return mime_type;
    };

    var get_next_append_url = function(the_document, selector) {
        var next_url_node = queryXSelector(the_document, site.next);
        if (next_url_node === null) {
            return null;
        }
        var href = next_url_node.getAttribute('href');
        if (href === '#') {
            return null;
        }
        if (href.indexOf('javascript:') === 0) {
            return null;
        }
        // return full url
        return next_url_node.href;
    };

    var get_position_node = function() {
        if (site.position !== undefined) {
            var position_node = querySelectorLast(document, site.position);
        } else {
            var last_content_node = querySelectorLast(document, site.content);
            var position_node = last_content_node.nextSibling;
        }
        return position_node;
    };

    var get_separate_position_node = function() {
        return get_position_node();
    }

    var get_content_position_node = function() {
        var position_node = get_position_node();
        if (site.separate && !site.separateInside) {
            position_node = position_node.nextSibling;
        }
        return position_node;
    };

    var create_separate_node = function(HTML) {
        var index = runtime.appended_count;
        var url = runtime.next_append_url;
        var node = document.createElement('div');
        node.className = 'lp-sep';
        var html = HTML.replace('${current}', index + 2);
        html = html.replace('${total}', site.count + 1);
        node.innerHTML = html.replace('${url}', url);
        return node;
    };

    var create_loading_separate_node = function() {
        var node = create_separate_node(site.loadingHTML);
        node.classList.add('lp-loading');
        return node;
    };

    var create_loaded_separate_node = function() {
        var node = create_separate_node(site.loadedHTML);
        node.classList.add('lp-loaded');
        return node;
    };

    var add_custom_style = function() {
        var css_list = [site.separateCSS];
        if (site.hidden !== undefined) {
            css_list.push(site.hidden + ' { display: none; }');
        }
        if (site.style !== undefined) {
            css_list.push(site.style);
        }
        GM_addStyle(css_list.join("\n"));
    };

    var add_loading_separate_node = function() {
        var separate_node = create_loading_separate_node();
        if (site.separateInside) {
            var last_content_node = querySelectorLast(document, site.content);
            var position_node = last_content_node.lastChild;
        } else {
            var position_node = get_separate_position_node();
        }
        if (position_node === null) {
            querySelectorLast(document, site.content).parentNode
                .appendChild(separate_node);
        } else {
            position_node.parentNode
                .insertBefore(separate_node, position_node);
        }
    };

    var add_loaded_separate_node = function(temp_content_nodes) {
        var separate_node = create_loaded_separate_node();
        if (site.separateInside) {
            var position_node = temp_content_nodes[0].firstChild;
        } else {
            var position_node = get_separate_position_node();
        }
        if (position_node === null) {
            querySelectorLast(document, site.content).parentNode
                .appendChild(separate_node);
        } else {
            position_node.parentNode
                .insertBefore(separate_node, position_node);
        }
    }

    var add_order_classname = function() {
        var content_nodes = document.querySelectorAll(site.content);
        for (var i = 0; i < content_nodes.length; i += 1) {
            content_node = content_nodes[i];
            content_node.classList.add("lp-first");
            content_node.classList.add("lp-last");
        }
    };

    var remove_loading_separate_nodes = function() {
        var nodes = document.querySelectorAll('div.lp-sep.lp-loading');
        for (var i = 0; i < nodes.length; i += 1) {
            var node = nodes[i];
            node.parentNode.removeChild(node);
        }
    };

    var remove_last_classname = function() {
        var content_nodes = document.querySelectorAll('.lp-last');
        for (var i = 0; i < content_nodes.length; i += 1) {
            content_node = content_nodes[i];
            content_node.classList.remove("lp-last");
        }
    };

    var runtime = {
        appending: false, // lock
        mime_type: get_document_mimetype(),
        appended_count: 0,
        next_append_url: get_next_append_url(document, site.next)
    };

    var append_next_callback = function(response) {
        var temp_document = document.createElement('html');
        temp_document.innerHTML = response.responseText;
        var next_append_url = get_next_append_url(temp_document, site.next);
        var temp_content_nodes = temp_document.querySelectorAll(site.content);

        if (site.separate) {
            remove_loading_separate_nodes();
            add_loaded_separate_node(temp_content_nodes);
        }

        remove_last_classname();

        var position_node = get_content_position_node();
        var i, temp_content_node;
        for (i = 0; i < temp_content_nodes.length; i += 1) {
            temp_content_node = temp_content_nodes[i];
            temp_content_node.classList.add("lp-last");

            if (position_node === null) {
                querySelectorLast(document, site.content).parentNode
                    .appendChild(temp_content_node);
            } else {
                position_node.parentNode
                    .insertBefore(temp_content_node, position_node);
            }
        }

        runtime.appended_count += 1;
        runtime.next_append_url = next_append_url;
        runtime.appending = false;

        dispatch_appended_event(runtime.appended_count, response.finalUrl);
    };

    var append_next = function() {
        runtime.appending = true;
        var has_remain_count = runtime.appended_count >= site.count;
        var has_next_url = runtime.next_append_url === null;
        if (has_remain_count || has_next_url) {
            stop_scroll_listener();
            return;
        }

        if (site.separate) {
            add_loading_separate_node();
        }

        GM_xmlhttpRequest({
            method: "GET",
            overrideMimeType: runtime.mime_type,
            url: runtime.next_append_url,
            onload: function(response) {
                try {
                    append_next_callback(response);
                } catch (e) {
                    stop_scroll_listener();
                }
            }
        });
    };

    var scroll_listener = function() {
        if (runtime.appending) {
            return;
        }
        if (reach_append_height()) {
            append_next();
        }
    };

    var start_scroll_listener = function() {
        if (reach_append_height()) {
            append_next();
        }
        window.addEventListener("scroll", scroll_listener, false);
    };

    var stop_scroll_listener = function() {
        runtime.appending = false;
        window.removeEventListener("scroll", scroll_listener, false);
    };

    var control = {
        'start_paging' : function() {
            runtime.appended_count = 0;
            start_scroll_listener();
        },
        'continue_paging' : function() {
            start_scroll_listener();
        },
        'stop_paging' : function() {
            stop_scroll_listener();
        }
    };

    setup_site_default();
    setup_site_absolute();
    add_order_classname();
    add_custom_style();
    start_scroll_listener();
    return control;
};

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

var setup_site_global = function(site, global) {
    if (site.separate === undefined && global.separate !== undefined) {
        site.separate = global.separate;
    }
    if (site.loadingHTML === undefined && global.loadingHTML !== undefined) {
        site.loadingHTML = global.loadingHTML;
    }
    if (site.loadedHTML === undefined && global.loadedHTML !== undefined) {
        site.loadedHTML = global.loadedHTML;
    }
    if (site.height === undefined && global.height !== undefined) {
        site.height = global.height;
    }
    if (site.count === undefined && global.count !== undefined) {
        site.count = global.count;
    }
};

var register_menus = function(control) {
    GM_registerMenuCommand("Start", control.start_paging, "s");
    GM_registerMenuCommand("Continue", control.continue_paging, "c");
    GM_registerMenuCommand("Stop", control.stop_paging, "t");
};
