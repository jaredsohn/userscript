// ==UserScript==
// @name           TF2Outpost Enhanced
// @description    Enhances TF2Outpost by displaying trade descriptions on the search page
// @version        1.4.3
// @updateURL      http://userscripts.org/scripts/source/178396.user.js
// @include        http://www.tf2outpost.com/search*
// @match          http://www.tf2outpost.com
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @require        http://github.com/andris9/jStorage/raw/master/jstorage.js
// @require        https://raw.github.com/krisk/fuse/master/fuse.min.js
// @grant          GM_xmlhttpRequest
// @author         MickeyXD AKA SoullessWaffle
// @homepage       http://stackoverflow.com/users/1233003/mickeyxd
// @license        (CC) Attribution Non-Commercial Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

//For future use
function Levenshtein(s, t) {
    // degenerate cases
    if (s === t) {
        return 0;
    }
    if (s.length === 0) {
        return t.length;
    }
    if (t.length === 0) {
        return s.length;
    }
    // create two work vectors of integer distances
    var v0 = new Array(t.length + 2).join('0').split('').map(parseFloat),
        v1 = new Array(t.length + 2).join('0').split('').map(parseFloat);
    // initialize v0 (the previous row of distances)
    // this row is A[0][i]: edit distance for an empty s
    // the distance is just the number of characters to delete from t
    for (var i = 0; i < v0.length; i++) {
        v0[i] = i;
    }
    for (var i = 0; i < s.length; i++) {
        // calculate v1 (current row distances) from the previous row v0
        // first element of v1 is A[i+1][0]
        //   edit distance is delete (i+1) chars from s to match empty t
        v1[0] = i + 1;
        // use formula to fill in the rest of the row
        for (var j = 0; j < t.length; j++) {
            var cost = (s[i] === t[j]) ? 0 : 1;
            v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
        }
        // copy v1 (current row) to v0 (previous row) for next iteration
        for (var j = 0; j < v0.length; j++) {
            v0[j] = v1[j];
        }
    }
    return v1[t.length];
}

function str2html(str) {
    var tmp = (typeof str === 'string') ? str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\n/g, '<br/>') : str;
    return tmp;
}

$(document).ready(function () {
    console.log(JSON.parse($.jStorage.get('query')));
    if (window.location.href.match(/tf2outpost\.com\/search$/) !== null && window.location.href.match(/tf2outpost\.com\/search$/).length > 0){ //For future use
        $('input[type="submit"][class="submit"][name="submit"][value="Search"]').on('click', function () {
            var $tradebox = $('div.trade'),
                items = {};
            $tradebox.children('div.contents').children('ul#has').children('li:not(.blank)').each(function (it) {
                var img = $(this).children('a[href="javascript:;"]').children('span').children('img'),
                    src = img.attr('src'),
                    game = img.attr('alt');
                items[it] = {};
                items[it].image = src;
                items[it].item = game;
            });
            $.jStorage.set('query', JSON.stringify(items));
        });
    } else {
        var $trades = $('.trades.module'),
            len = $trades.children().length,
            ready = 0,
            items = JSON.parse($.jStorage.get('query')),
            index = {};
        $trades.children().each(function (it) {
            var name = 'trade_' + it;
            index[name] = {};
            index[name].id = $(this).attr('data-tradeid');
            index[name].link = '/trade/' + index[name].id;
            index[name].nick = $(this).find('strong:eq(0)').text();
            GM_xmlhttpRequest({
                method: 'GET',
                url: index[name].link,
                timeout: 10000,
                onload: function (response) {
                    index[name].desc = $(response.responseText).find('.post_data:eq(0)').children('.contents:eq(0)').text();
                    ready++;
                    var appendable = str2html(index[name].desc).replace(/(TF)?((\d+([,\.]\d+)?[ \t]*?((k(ey)?(s|z)?)|(r(ef(ined( met(al)?)?)?)?(s|z)?)|(rec(laimed( met(al)?)?)?(s|z)?))([, \t]*?\d([,\.]\d+)?[ \t]*?((r(ef(ined( met(al)?)?)?)?(s|z)?))|(rec(laimed( met(al)?)?)?(s|z)?))?(?=\W|_))|(\d[ \t]*?scr(\.|ap)?))/gi, '<span id="tf2oe_matched">$&</span>');
                    $trades.children('[data-tradeid=' + index[name].id + ']').children('.contents').append('<br/><div id="desc" style="width: 100%; word-wrap: break-word;"></div>').children('#desc').append(appendable).find('span#tf2oe_matched').css('color','#ff5e4d');
                },
                onerror: function () {
                    index[name].desc = '';
                    ready++;
                },
                ontimeout: function () {
                    index[name].desc = '';
                    ready++;
                }
            });
        });
        var check = setInterval(function () {
            if (ready === len) {
                console.log('TF2Outpost Enhancer: All descriptions loaded.');
                clearInterval(check);
            }
        }, 1000);
    }
});