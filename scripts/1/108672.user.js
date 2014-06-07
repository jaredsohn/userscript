// ==UserScript==
// @name            IMDb Video Direct Link
// @namespace       muckl.com
// @description     Provides direct access to the video file or stream by displaying a link in the sidebar on the video page.
// @include         http://*.imdb.*/video/imdb/vi*/
// @include         http://*.imdb.*/video/screenplay/vi*/
// @include         http://*.imdb.*/title/tt*/videogallery*
// @copyright       2011, Muckl (http://userscripts.org/users/Muckl)
// @license         GPL (http://www.gnu.org/copyleft/gpl.html)
// @version         0.0.2
// ==/UserScript==

/**

   ChangeLog        [REL] v0.0.2 [2011-07-30]
                    [FIX] Minor changes and improvements.
                    [CHG] Improved configuration: no more page reload after changing a setting.
                    [ADD] Include URL matching videogallery subpage, for promotional purposes.
                    [REL] v0.0.1 (initial release) [2011-07-30]

   DevLog           [ADD] Support for 480p and 720p page layout (and check if video/stream URL is changed).
                    [ADD] Display extra download/stream link in table underneath player.
                    [ADD] Translations for international IMDb sites.
                    [ADD] Error management.

**/

// global variables
var CFG = {MSEC: {key: 'conf_delay_msec', def: 500}, TRIES: {key: 'conf_max_tries', def: 40}}, 
    LANG = {com: {conf_delay_msec_l: 'Delay', conf_delay_msec_t: 'Delay between tries in milliseconds? (default: {d})\n\n[positive integer]', conf_max_tries_l: 'Tries', conf_max_tries_t: 'How many tries until abortion? (default: {d})\n\n[positive integer]', download: 'Download', stream: 'Stream', video: 'this video', link: ' Link', save_stream: 'Use \'\'rtmpdump\'\' or \'\'VLC media player\'\' to save the streamed video on your HDD.', failed: 'Function wait() terminated after {t} delays of {m} milliseconds each.', promo: 'Display direct links to video files or<br>streams on the single video pages'}, 
            de:  {conf_delay_msec_l: 'Wartezeit', conf_delay_msec_t: 'Wartezeit zwischen Versuchen in Millisekunden? (Standard: {d})\n\n[positive Ganzzahl]', conf_max_tries_l: 'Versuche', conf_max_tries_t: 'Wie viele Versuche bis zum Abbruch? (Standard: {d})\n\n[positive Ganzzahl]', download: 'Downloade', stream: 'Streame', video: 'dieses Video', link: '-Link', save_stream: 'Benutze \'\'rtmpdump\'\' oder \'\'VLC media player\'\', um den Video-Stream auf der Festplatte abzuspeichern.', failed: 'Funktion wait() abgebrochen nach {t} Verzögerungen von je {m} Millisekunden.', promo: 'Zeige Direkt-Links zu Video-Dateien<br>oder -Streams auf den einzelnen Video-Seiten an'}}, 
    TLD = document.location.host.split('.')[2], LNG = (LANG[TLD] === undefined) ? LANG.com : LANG[TLD];

// get it going
if (document.location.href.indexOf('/video/') > -1) {
    initConfig();
    wait(function () {
            try {
                var data = parseQuery(document.getElementById('video-player-container').contentDocument.getElementById('player').getAttribute('flashvars'));
                return data;
            } catch (e) { return false; }
        }, 
        function (data) {
            var url = unescape(data.file + ((typeof data.id === 'string') ? '/' + data.id : '')), prot = url.split(':')[0].toUpperCase(), 
                type = LNG.download, title = '', sbar = document.getElementById('sidebar');
            switch (prot) {
                case 'HTTP': case 'HTTPS': case 'FTP': case 'FTPS': break;
                default: type = LNG.stream; title = ' style="cursor: help;" title="' + LNG.save_stream + '" onclick="return false;"';
            }
            sbar.insertBefore(createElement('div', { className: (TLD === 'com') ? 'social_networking' : 'aux-content-widget-2', style: 'margin-bottom: 7px;', 
                innerHTML: '<strong>' + type + '</strong> ' + LNG.video + ': <a href="' + url + '" target="_blank"' + title + '>' + prot + LNG.link + '</a>' }
            ), sbar.getElementsByTagName('DIV')[0]);
        },
        CFG.MSEC.val, 
        CFG.TRIES.val, 
        function () {
            GM_log(LNG.failed.replace(/{t}/, CFG.TRIES.val).replace(/{m}/, CFG.MSEC.val));
        }
    );
} else {
    var sbar = document.getElementById('sidebar');
    sbar.insertBefore(createElement('div', { className: 'aux-content-widget-2', style: 'margin-bottom: 7px;', 
        innerHTML: '<small><a href="http://userscripts.org/scripts/show/108672" target="_blank" style="display: block; padding-left: 20px; ' + 
            'background: transparent url(http://userscripts.org/images/script_icon.png) no-repeat left center;">' + LNG.promo + '</a></small>' }
    ), sbar.getElementsByTagName('DIV')[0]);
}

// retrieve stored configuration & create menu entries
function initConfig() {
    var setting, stored;
    for (setting in CFG) {
        stored = GM_getValue(CFG[setting].key, CFG[setting].def);
        CFG[setting].val = stored;
        regMenuCmd(setting);
    }
}
function regMenuCmd(setting) {
    GM_registerMenuCommand('IMDb Video Direct Link: ' + LNG[CFG[setting].key + '_l'], function () {
        try {
            var uv = parseInt(prompt(LNG[CFG[setting].key + '_t'].replace(/{d}/, CFG[setting].def), String(CFG[setting].val)).toLowerCase());
            if (typeof uv === typeof CFG[setting].val) {
                GM_setValue(CFG[setting].key, uv);
                CFG[setting].val = uv;
            }
        } catch (e) {}
    });
}

// helper functions
function wait(check, call, msec, tries, failed) {
    var result = check();
    if (result) call(result);
    else if (tries > 0) window.setTimeout(wait, msec, check, call, msec, (tries - 1), failed);
    else if (typeof failed === 'function') failed();
}
function parseQuery(d, s) {
    if (!d || typeof d !== 'string') return false;
    if (d.indexOf('?') >= 0) d = d.split('?')[1];
    var r = {}, p, k, v, i;
    d = d.replace(/\+/g, ' ').split(s || '&');
    for (i = 0; i < d.length; i += 1) {
        p = d[i].split('=');
        k = decodeURIComponent(p[0]);
        v = decodeURIComponent(p[1]);
        r[k] = (p.length === 1) ? '' : v;
    }
    return r;
}
function createElement(t, o) {
    var r = window.document.createElement(t), p, i;
    if (o) {
        for (p in o) {
            if (p.indexOf('on') === 0) r.addEventListener(p.substring(2), o[p], false);
            else if (p === 'kids' && (p = o[p])) for (i = 0; i < p.length; i += 1) r.appendChild(p[i]);
            else if (',style,accesskey,id,name,src,href,for'.indexOf(',' + p.toLowerCase()) > -1) r.setAttribute(p, o[p]);
            else r[p] = o[p];
        }
    }
    return r;
}