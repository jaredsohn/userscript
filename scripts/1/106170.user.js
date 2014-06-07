// ==UserScript==
// @name           IMDb Arithmetic Mean
// @namespace      muckl.com
// @description    Shows arithmetic mean from ratings page on the main title and the combined view.
// @include        http://*.imdb.*/title/tt*/
// @include        http://*.imdb.*/title/tt*/?c=1
// @include        http://*.imdb.*/title/tt*/combined
// @include        http://*.imdb.*/title/tt*/combined?c=1
// @include        http://*.imdb.*/title/tt*/maindetails
// @include        http://*.imdb.*/title/tt*/maindetails?c=1
// @include        http://*.imdb.*/title/tt*/ratings
// @include        http://*.imdb.*/title/tt*/ratings?c=1
// @copyright      2011, Muckl (http://userscripts.org/users/Muckl)
// @license        GPL (http://www.gnu.org/copyleft/gpl.html)
// @version        0.2.1
// ==/UserScript==

/**

   ChangeLog       [REL] v0.2.1 [2011-07-20]
                   [FIX] New and improved include URLs.
                   [REL] v0.2.0 [2011-07-11]
                   [ADD] Clicking arithmetic mean re-fetches it (new layout and old layout without extra stars).
                   [CHG] Replaced re-fetch link with icon (old layout with extra stars).
                   [ADD] French, Italian, Spanish and Portuguese translations - hopefully correct ;-)
                   [ADD] Option to always fetch the rating by setting UPDATE to zero.
                   [REL] v0.1.2 [2011-07-06]
                   [FIX] Bug in regular expression.
                   [REL] v0.1.1 [2011-07-05]
                   [FIX] Day counter before re-fetch link didn't work properly.
                   [REL] v0.1.0 (first public) [2011-07-05]
                   [ADD] Re-fetch link for manually updating arithmetic mean (only in old layout with extra stars).
                   [ADD] Save values locally, updated according to user-defined time period.
                   [ADD] Support for international sites.
                   [REL] v0.0.2 (private) [2011-05-29]
                   [FIX] Now works properly with Top 250 movies.
                   [REL] v0.0.1 (initial release) (private) [2011-04-11]

   DevLog          [ADD] Error management.

**/

/////////////////////////////////////////////////////////////////////////////////////
//                    CONFIG BLOCK WITH USER PARAMETERS                            //
/////////////////////////////////////////////////////////////////////////////////////

// Show extra stars for arithmetic mean in old layout and combined view OR not.
var STARS = true; // [true OR false]

// Days after the locally stored value is updated. Use 0 to disable storage.
var UPDATE = 7; // [non-negative integer]

/////////////////////////////////////////////////////////////////////////////////////
//                   END OF CONFIG BLOCK, SCRIPT STARTS                            //
/////////////////////////////////////////////////////////////////////////////////////

// global variables
var LOC = document.location, TT = LOC.href.match(new RegExp('\\/title\\/(tt\\d{7,})\\/'))[1], 
    NOW = new Date().getTime(), DATA = GM_getValue(TT, '|'), DIFF = (NOW - DATA.split('|')[0]) / 86400000, 
    OLD = $('tn15rating'), TLD = LOC.host.split('.')[2], 
    LANG = {com: {ari: 'Arithmetic mean',       wei: 'wavg', up: 'updated {t}',      td: 'today',        yd: 'yesterday', dys: '{d} days ago',         re: 're-fetch it now'}, 
            de:  {ari: 'Arithmetisches Mittel', wei: 'ØP',   up: '{t} aktualisiert', td: 'heute',        yd: 'gestern',   dys: 'vor {d} Tagen',        re: 'jetzt neu holen'}, 
            fr:  {ari: 'Moyenne arithmétique',  wei: 'ØP',   up: 'actualisée {t}',   td: 'aujourd\'hui', yd: 'hier',      dys: '{d} jours auparavant', re: 're-chercher maintenant'}, 
            it:  {ari: 'Media aritmetica',      wei: 'ØP',   up: 'aggiornato {t}',   td: 'oggi',         yd: 'ieri',      dys: '{d} giorni fa',        re: 'ri-prenderlo ora'}, 
            es:  {ari: 'Media Aritmética',      wei: 'ØP',   up: 'actualizado {t}',  td: 'hoy',          yd: 'ayer',      dys: 'hace {d} días',        re: 'volver a buscarlo ahora'}, 
            pt:  {ari: 'Média Aritmética',      wei: 'ØP',   up: 'atualizado {t}',   td: 'hoje',         yd: 'ontem',     dys: 'há {d} dias',          re: 'buscá-la agora'}}, 
    LNG = (LANG[TLD] === undefined) ? LANG.com : LANG[TLD];

// get it going
if (LOC.pathname.split('/')[3] !== 'ratings') {
    if (UPDATE === 0 || DIFF > UPDATE) {
        fetchRating();
    } else {
        insertMean(DATA.split('|')[1]);
    }
}

// update locally stored rating
function fetchRating(refetch) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://' + LOC.host + '/title/' + TT + '/ratings',
        onload: function (r) {
            var m = r.responseText.match(new RegExp(LNG.ari.replace(/é/g, '&#xE9;') + ' = ([0-9\\.,]+)\\. ', 'i'));
            if (m !== null) {
                if (UPDATE > 0) GM_setValue(TT, NOW + '|' + m[1]);
                if (refetch === true) {
                    $('gm_imdbari_rld').title = ((OLD === null || STARS !== true) ? LNG.ari + ' - ' : '') + LNG.up.replace(/{t}/, LNG.td) + ', ' + LNG.re;
                    updateMean(m[1]);
                } else {
                    DIFF = 0;
                    insertMean(m[1]);
                }
            }
        }
    });
}

// fetch rating again
function refetchHandler(e) {
    $('gm_imdbari_arival').innerHTML = '<img src="/images/SF8b4c01b86a8bc341ca9daf7aad93d005/rating/spinner.gif" width="12" height="12" />';
    if (OLD !== null && STARS === true) $('gm_imdbari_strs').style.width = '0px';
    fetchRating(true);
    e.preventDefault();
}

// update (re-)fetched rating
function updateMean(val) {
    $('gm_imdbari_arival').innerHTML = val;
    if (OLD !== null && STARS === true) $('gm_imdbari_strs').style.width = (parseFloat(val.replace(/,/, '.')) * 20).toString() + 'px';
}

// display extra rating on page
function insertMean(val) {
    var arival = '<span id="gm_imdbari_arival"></span>/10', 
        nfoTxt = LNG.up.replace(/{t}/, ((DIFF < 1) ? LNG.td : ((parseInt(DIFF) > 1) ? 
                 LNG.dys.replace(/{d}/, parseInt(DIFF)) : LNG.yd))) + ', ' + LNG.re;
    if (OLD === null || STARS !== true) {
    // new layout OR old layout without extra stars
        var sml = document.createElement('small'), bfr;
        sml.innerHTML = '(' + arival + ')';
        sml.title = LNG.ari;
        if (UPDATE > 0) {
            sml.id = 'gm_imdbari_rld';
            sml.title += ' - ' + nfoTxt;
            sml.style.cursor = 'pointer';
            sml.addEventListener('click', refetchHandler, false);
        }
        if (OLD === null) {
        // new layout
            bfr = $C('star-bar-user-rate')[0].nextSibling;
            sml.className = 'mellow';
            sml.style.paddingLeft = '5px';
        } else {
        // old layout without extra stars
            bfr = $C('starbar-meta')[0].getElementsByTagName('A')[0];
            sml.style.paddingRight = '12px';
        }
        bfr.parentNode.insertBefore(sml, bfr);
    } else {
    // old layout with extra stars
        var wei = $C('general', OLD)[0], ari = wei.cloneNode(true), top = $C('starbar-special', ari), 
            weiTxt = wei.getElementsByTagName('H5')[0], meta = $C('starbar-meta', ari)[0];
        $C('inner', ari)[0].id = 'gm_imdbari_strs';
        if (top[0]) top[0].style.display = 'none';
        $C('starbar-votes', ari)[0].style.display = 'none';
        ari.getElementsByTagName('H5')[0].innerHTML = LNG.ari + ':'
        weiTxt.innerHTML = weiTxt.innerHTML.replace(/:/, ' (' + LNG.wei + '):');
        meta.innerHTML = '<b>' + arival + '</b>';
        if (UPDATE > 0) {
            var rld = document.createElement('img');
            rld.id = 'gm_imdbari_rld';
            rld.src = 'data:image/gif;base64,R0lGODlhEAAQAIcAMfLy8llZWaqqqszMzIiIiFtbW11dXeXl5WJiYqioqOTk5F5eXq6urn19fWdnZ21tbW9vb4aGhu7u7mBgYIuLi39%2Ff6Wlpe3t7c7OzsPDw%2BLi4sXFxdzc3ODg4GlpaaysrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAABwhoAAEIHEiwoMGDCAlS6JCwYIAFCSQkHEDAQ4CLEDYcFHCxY4AHGQwOKGAggYaHFi4cbBBAgMAIHBIiCHCg4cCZNQceCDDBIEuXAz8EqCCSJAMFChgYKIBho8eLQA9SdOCAwACbWLMCCAgAOw%3D%3D';
            rld.width = rld.height = '14';
            rld.alt = LNG.re;
            rld.title = nfoTxt;
            rld.style.paddingLeft = '10px';
            rld.style.cursor = 'pointer';
            rld.addEventListener('click', refetchHandler, false);
            meta.appendChild(rld);
        }
        OLD.insertBefore(ari, wei.nextSibling);
    }
    updateMean(val);
}

// helper functions
function $(id) {
    return document.getElementById(id);
}
function $C(s, p, t, x) {
    if ((p || document).getElementsByClassName && t === undefined) {
        var r = (p || document).getElementsByClassName(s);
    } else {
        var o = (p || document).getElementsByTagName(t || '*'), 
            rx = new RegExp('\\b' + s + '\\b'), 
            r = [], i = -1, e, c;
        while ((e = o.item(i += 1))) {
            c = e.getAttributeNode('class');
            if (c && c.specified && rx.test(c.value)) {
                r.push(e);
            }
        }
    }
    return (typeof x === 'number') ? r[x - 1] : r;
}