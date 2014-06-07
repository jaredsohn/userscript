/**
 *
 * This is a Greasemonkey script and must be run using Greasemonkey 0.8 or newer, or Google Chrome.
 *
 * @author Meitar Moscovitz <meitar@maymay.net>
 */
// ==UserScript==
// @name           Eyes of Arcadia
// @version        0.9.3.3
// @namespace      http://maybemaimed.com/playground/eyes-of-arcadia/
// @updateURL      https://userscripts.org/scripts/source/130861.user.js
// @description    Automatically tests various social networks for user profiles whose names match the profile you're currently viewing. (Must be logged in to some networks for users on that network to be found. Not guaranteed to find the same human, but it works often.)
// @include        http://www.okcupid.com/profile/*
// @include        https://fetlife.com/users/*
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @include        http://*.livejournal.com/profile*
// @include        https://*.wordpress.com/*
// @include        http://*.wordpress.com/*
// @exclude        https://*.wordpress.com/wp-admin*
// @exclude        http://*.wordpress.com/wp-admin*
// @include        http://*.tumblr.com/*
// @exclude        http://www.tumblr.com/*
// @include        https://plus.google.com/*
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// ==/UserScript==

ARCADIA = {};
ARCADIA.CONFIG = {
    'debug': false // switch to true to debug.
};

// Utility debugging function.
ARCADIA.log = function (msg) {
    if (!ARCADIA.CONFIG.debug) { return; }
    GM_log('EYES OF ARCADIA: ' + msg);
};

// Initializations.
ARCADIA.Networks = {};
ARCADIA.found_urls = {};
ARCADIA.init = function () {
    for (var k in ARCADIA.Networks) {
        ARCADIA.found_urls[k] = {
            'href': undefined,
            'injected': false
        };
    }
    ARCADIA.main();
};
window.addEventListener('load', ARCADIA.init);

// TODO: Is it possible to split these out into their own files in Greasemonkey?

ARCADIA.Networks.Tumblr = {
    // TODO: Support Tumblr's "custom" domains.
    //       See: http://www.tumblr.com/docs/en/api/v2
    'profile_url_match': 'tumblr.com',
    'profile_url_api'  : 'http://', // the API here is just the domain name
    'user_is_subdomain': true,
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing Tumblr.successFunction()');
        if (200 === response.status || 301 === response.status) {
            ARCADIA.found_urls['Tumblr'].href = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing Tumblr.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var container;
        if (document.getElementById('eyes-of-arcadia-container')) {
            container = document.getElementById('eyes-of-arcadia-container')
        } else {
            container = document.createElement('div');
            container.id = 'eyes-of-arcadia-container';
            container.style.position = 'fixed';
            container.style.top = '25px';
            container.style.right = '0';
        }
        var a = document.createElement('a');
        a.href = link_url;
        a.innerHTML = net_name;
        a.style.display = 'block';
        a.style.backgroundColor = 'green';
        a.style.color = 'white';
        a.style.textAlign = 'center';
        a.style.padding = '10px 5px';
        a.style.margin = '5px';
        container.appendChild(a);
        document.body.appendChild(container);
    },
    'getProfileName': function () {
        return window.location.host.split('.')[0];
    }
};

ARCADIA.Networks.WordPress = {
    'profile_url_match': 'wordpress.com',
    'profile_url_api'  : 'https://public-api.wordpress.com/rest/v1/sites/',
    'user_is_subdomain': true,
    'http_request_method': 'GET',
    'successFunction': function (response) {
        ARCADIA.log('executing WordPress.successFunction()');
        if (200 === response.status) {
            if (ARCADIA.Networks['WordPress'].second_try) {
                ARCADIA.found_urls['WordPress'].href = 'https://' + ARCADIA.nickname.replace(/(-|_)+/, '') + '.wordpress.com/';
            } else {
                ARCADIA.found_urls['WordPress'].href = 'https://' + ARCADIA.nickname + '.' + ARCADIA.Networks['WordPress'].profile_url_match + '/';
            }
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        } else if (404 === response.status && !ARCADIA.Networks['WordPress'].second_try) {
            // Try again, but this time remove any dashes and underscores.
            ARCADIA.Networks['WordPress'].second_try = true;
            var x = ARCADIA.nickname.replace(/(-|_)+/, '') + '.wordpress.com';
            GM_xmlhttpRequest({
                method: ARCADIA.Networks['WordPress'].http_request_method,
                url: ARCADIA.Networks['WordPress'].profile_url_api + x,
                onload: ARCADIA.Networks['WordPress'].successFunction
            });
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing WordPress.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var container;
        if (document.getElementById('eyes-of-arcadia-container')) {
            container = document.getElementById('eyes-of-arcadia-container')
        } else {
            container = document.createElement('div');
            container.id = 'eyes-of-arcadia-container';
            container.style.position = 'fixed';
            container.style.top = '30px';
            container.style.right = '0';
        }
        var a = document.createElement('a');
        a.href = link_url;
        a.innerHTML = net_name;
        a.style.display = 'block';
        a.style.backgroundColor = 'green';
        a.style.color = 'white';
        a.style.textAlign = 'center';
        a.style.padding = '10px 5px';
        a.style.margin = '5px';
        container.appendChild(a);
        document.body.appendChild(container);
    },
    'getProfileName': function () {
        return window.location.host.split('.')[0];
    }
};

ARCADIA.Networks.Google_Plus = {
    'profile_url_match': 'plus.google.com',
    'profile_url_api'  : 'https://profiles.google.com/',
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing Google_Plus.successFunction()');
        if (/plus\.google\.com\/[0-9]+/.test(response.finalUrl)) {
            ARCADIA.found_urls['Google_Plus'].href = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing Google_Plus.injectButtonHTML(' + link_url + ',' + net_name + ')');
        var a = document.createElement('a');
        a.className = 'a-gb a-f-e h-gb-LX FT';
        a.setAttribute('rel', 'me');
        a.setAttribute('href', link_url);
        a.setAttribute('role', 'tab');
        a.innerHTML = '<div class="a-gb-aa">' + net_name + '</div>';
        var node = document.querySelector('div[role=tablist]');
        node.appendChild(a);
    },
    'getProfileName': function () {
        // TODO: Figure out how to get profile username/info off Google Plus profiles.
    }
};

ARCADIA.Networks.LiveJournal = {
    'profile_url_match': 'livejournal.com',
    'profile_url_api'  : 'https://www.livejournal.com/userinfo.bml?user=',
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing LiveJournal.successFunction()');
        if (/livejournal\.com\/profile/.test(response.finalUrl)) {
            ARCADIA.found_urls['LiveJournal'].href = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing LiveJournal.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.innerHTML = net_name;
        tr.appendChild(th);
        var td = document.createElement('td');
        var a = document.createElement('a');
        a.className = 'url';
        a.setAttribute('rel', 'me');
        a.setAttribute('href', link_url);
        a.innerHTML = 'Eyes of Arcadia found a ' + net_name + ' profile with this name.';
        td.appendChild(a);
        tr.appendChild(td);
        var node = document.querySelector('.userinfo tr:last-child');
        node.parentNode.appendChild(tr);
    },
    'getProfileName': function () {
        ARCADIA.log('executing LiveJournal.getProfileName()');
        return document.querySelector('.ljuser').getAttribute('lj:user');
    }
};

ARCADIA.Networks.Twitter = {
    'profile_url_match': 'https://twitter.com/',
    'profile_url_api'  : 'https://twitter.com/',
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing Twitter.successFunction()');
        if (200 === response.status) {
            ARCADIA.found_urls['Twitter'].href = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing Twitter.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var li   = document.createElement('li');
        var span = document.createElement('span');
        span.className = 'label';
        span.innerHTML = net_name;
        li.appendChild(span);
        var a = document.createElement('a');
        a.setAttribute('href', link_url);
        a.innerHTML = link_url.substring(0, 17) + '...'; // That's just how Twitter does it.
        li.appendChild(a);
        var node = document.getElementById('bio');
        node.insertBefore(li, node);
    },
    // TODO: Refactor to use the actual Twitter API?
    //       Currently, this is loading too soon and as a result no profile is found.
    'getProfileName': function () {
        ARCADIA.log('executing Twitter.getProfileName()');
        var screen_name = document.querySelector('.screen-name');
        if (screen_name) {
            return screen_name.childNodes[1];
        } else {
            return window.location.pathname.substring(1, window.location.pathname.length);
        }
    }
};

ARCADIA.Networks.OkCupid = {
    'profile_url_match': 'http://www.okcupid.com/profile/',
    'profile_url_api'  : 'http://www.okcupid.com/profile/',
    'http_request_method': 'GET',
    'successFunction': function (response) {
        ARCADIA.log('executing OkCupid.successFunction()');
        if (/"screenname"/.test(response.responseText)) {
            ARCADIA.found_urls['OkCupid'].href = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing OkCupid.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var p = document.createElement('p');
        p.setAttribute('class', 'btn small green woo');
        p.setAttribute('onmousedown', "util.toggleClass(this, 'active')");
        p.setAttribute('onmouseup', "util.toggleClass(this, 'active')");
        p.setAttribute('onmouseover', "util.toggleClass(this, 'hover')");
        p.setAttribute('onmouseout', "util.toggleClass(this, 'hover')");
        var a = document.createElement('a');
        a.setAttribute('href', link_url);
        a.innerHTML = net_name;
        p.appendChild(a);
        var node = document.querySelector('p.message').nextElementSibling;
        node.parentNode.insertBefore(p, node);
    },
    'getProfileName': function () {
        return document.getElementById('basic_info_sn').innerHTML;
    }
};

ARCADIA.Networks.FetLife = {
    'profile_url_match': 'https://fetlife.com/',
    'profile_url_api'  : 'https://fetlife.com/',
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing FetLife.successFunction()');
        if (/user/.test(response.finalUrl)) {
            ARCADIA.found_urls['FetLife'].href = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.matchHost(ARCADIA.Networks[k].profile_url_match)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u].href && (false === ARCADIA.found_urls[u].injected)) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing FetLife.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var el = document.createElement('div');
        el.setAttribute('class', 'button');
        var a = document.createElement('a');
        a.setAttribute('href', link_url);
        a.setAttribute('style', 'background-color: #64A730;');
        a.innerHTML = net_name;
        el.appendChild(a);
        var node = document.querySelector('.button').nextElementSibling;
        node.parentNode.insertBefore(el, node);
    },
    'getProfileName': function () {
        return document.querySelector('h2').textContent.match(/\w+/)[0];
    }
};

ARCADIA.isProfileSubdomain = function () {
    if (3 === window.location.host.split('.').length) {
        return true;
    } else {
        return false;
    }
};
ARCADIA.matchHost = function (str) {
    var x;
    var fqdn = window.location.host;
    var fqdn_parts = fqdn.split('.');
    if (this.isProfileSubdomain()) {
        var subdomain = fqdn.split('.')[0];
        x = fqdn.substring(subdomain.length + 1, fqdn.length);
    } else {
        x = fqdn;
    }
    return str.match(x);
};

ARCADIA.getProfileName = function () {
    this.log('Running on perspective from ' + window.location.host);
    for (var k in this.Networks) {
        if (this.matchHost(this.Networks[k].profile_url_match)) {
            return this.Networks[k].getProfileName();
        }
    }
    return false;
};

// This is the main() function, executed on page load.
ARCADIA.main = function () {
    // Grab the profile's username from this network, bailing if none found.
    this.nickname = this.getProfileName();
    if (!this.nickname) {
        this.log('No profile nickname found. Aborting.');
        return;
    }
    this.log('Found nickname ' + this.nickname);

    // Search for this username on all known networks
    for (var k in this.Networks) {
        // except the current one, obviously.
        if (this.matchHost(this.Networks[k].profile_url_match)) {
            continue;
        }
        var request_uri = this.Networks[k].profile_url_api + this.nickname;
        // Some services, like WordPress & Tumblr, treat subdomains as user IDs.
        if (this.Networks[k].user_is_subdomain) {
            request_uri += '.' + this.Networks[k].profile_url_match;
        }
        GM_xmlhttpRequest({
            method: this.Networks[k].http_request_method,
            url: request_uri,
            onload: this.Networks[k].successFunction
        });
    }
};
