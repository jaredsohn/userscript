// ==UserScript==
// @name        PDHO Flair Linker
// @namespace   http://sharparam.com/
// @description Finds flairs on /r/PaydayTheHeistOnline and makes them link to profiles
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.meta.js
// @include     http://www.reddit.com/r/paydaytheheistonline*
// @include     http://reddit.com/r/paydaytheheistonline*
// @include     https://pay.reddit.com/r/paydaytheheistonline*
// @version     1.4.1
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==

/* 
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 by Adam Hellberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var flairs = document.querySelectorAll('span.flair');

// Below is experimental regex that should catch more flairs
//var steam_re = /(?:(?:https?:\/\/)?www\.)?(?:steam|pc)(?:community\.com\/?(?:(id|profiles)\/?)?|[\s\-_]*id)?[\/:\s\|]*(.{2,}?)(?:[\/|:\-\[(] ?(?:\/?(?:ghost|enforcer|tech|mm|master))+[\[)]?)?$/i

var profile_regex = /((?:(?:http:\/\/)?www\.)?steam(?:community\.com\/)?(?: ?id)?|pc|ps[n3]?|x?360|xbox(?:360)?|gt|gamertag)[\s:\-|_\/\\]*(.+?)(?: ?[\/|:\-\[(] ?(?:\/?(?:ghost|enforcer|tech|mm|master))+[\[)]?)?$/i

var steam_profiles_regex = /steamcommunity\.com\/profiles\/(\d+)/i

function get_text(e) {
    return e.innerText || e.textContent;
}

function set_text(e, t) {
    if (e.innerText)
        e.innerText = t;
    else
        e.textContent = t;
}

function flair_to_link(flair_index, text, url, c) {
    var a = document.createElement('a');
    a.href = url;
    a.className += c;
    var a_text = document.createTextNode(text);
    a.appendChild(a_text);
    set_text(flairs[flair_index], '');
    flairs[flair_index].appendChild(a);
}

var platforms = {
    steam: 1,
    xbox: 2,
    psn: 3
};

var parser = new DOMParser();

for (var i = 0; i < flairs.length; i++) {
    var text = get_text(flairs[i]);
    var match = profile_regex.exec(text);
    if (match == null || match.length < 3)
        continue;
    var platform = match[1];
    var name = encodeURIComponent(match[2]);
    var url = null;
    var search_url = null;
    var poll_url = null;
    var accept = null;
    var profile_class = null;
    var search_class = null;

    if (platform.match(/^s|^pc|^w|^h/i)) {
        platform = platforms.steam;
        var profiles_match = steam_profiles_regex.exec(text);
        var type = 'id';
        if (profiles_match != null && profiles_match.length >= 2) {
            type = 'profiles';
            name = profiles_match[1];
        }
        url = 'http://steamcommunity.com/' + type + '/' + name;
        search_url = 'http://steamcommunity.com/actions/SearchFriends?K=' + name;
        poll_url = url + '?xml=1';
        accept = 'text/xml';
        profile_class = 'steam-profile-link';
        search_class = 'steam-profile-search-link';
    } else if (platform.match(/^[x3g]/i)) {
        platform = platforms.xbox;
        url = 'https://live.xbox.com/Profile?gamertag=' + name;
        search_url = url;
        poll_url = 'https://www.xboxleaders.com/api/2.0/profile.json?gamertag=' + name;
        accept = 'text/json';
        profile_class = 'xbox-profile-link';
        search_class = 'xbox-profile-search-link';
    } else if (platform.match(/^p/i)) {
        platform = platforms.psn;
        url = 'http://psnprofiles.com/' + name;
        search_url = url;
        profile_class = 'psn-profile-link';
    } else
        continue; // Unknown platform

    if (poll_url === null) // Can't verify profile, link directly
        flair_to_link(i, text, url, profile_class);
    else
        (function(flair_index, flair_text, profile_url, search_url, platform, p_c, s_c) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: poll_url,
                accept: accept,
                onreadystatechange: function(response) {
                    if (response.readyState != 4)
                        return;

                    var validProfile = false;

                    if (platform == platforms.steam) {
                        var doc = parser.parseFromString(response.responseText, 'text/xml');
                        var validProfile = doc.documentElement.nodeName == 'profile';
                    } else if (platform == platforms.xbox) {
                        var data = JSON.parse(response.responseText);
                        var validProfile = data.status == 'success';
                    }

                    flair_to_link(flair_index, flair_text, validProfile ? profile_url : search_url, validProfile ? p_c : s_c);
                }
            });
        })(i, text, url, search_url, platform, profile_class, search_class);
}
