// ==UserScript==
// @name           LDR show SBM comments
// @namespace      http://shinten.info/
// @include        http://reader.livedoor.com/reader/
// @resource       styles http://svn.coderepos.org/share/lang/javascript/userscripts/ldr_show_sbm_comments/styles.css
// @require        http://svn.coderepos.org/share/lang/javascript/jsdeferred/trunk/jsdeferred.userscript.js
// @require        http://fastladder.googlecode.com/svn/trunk/fastladder/public/js/common.js
// ==/UserScript==

(function () {

GM_addStyle(GM_getResourceText('styles'));

window.addEventListener('load', function () { with (D()) {
    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var cache = new Cache();

    if (GM_getValue('hide', false)) addClass('right_body', 'nocomment');

    w.Keybind.add('n', function () {
        var item = w.get_active_item(true);
        if (!item) return;

        var item_link = item.link;
        var item_id   = item.id;
        var url       = encodeURIComponent(item_link.replace(/%23/g, '#').unescapeHTML());
        var elem      = $('sbm_' + item_id);

        var hatena = {
            api : 'http://b.hatena.ne.jp/entry/json/?url=',
            parseResponse : function (req) {
                var o = new Function('return ' + req.responseText)();
                return (o && o.count > 0) ? o.bookmarks.map(hatena.makeComment) : [];
            },
            makeTag : function (tags, id) {
                return tags.map(function (tag) {
                    tag = tag.escapeHTML() || '';
                    return [
                        '<span class="sbm_tag">',
                        '<a href="http://b.hatena.ne.jp/', id, '/', tag, '/">', tag, '</a>',
                        '</span>'
                    ].join('');
                }).join(',');
            },
            makeComment : function (o) {
                var id   = o.user;
                var dt   = new DateTime(o.timestamp);
                var com  = (o.comment.length > 0) ? '' : 'out';
                var tags = hatena.makeTag(o.tags, id);
                return {
                    sort_key : dt.valueOf(),
                    comment : [
                        '<div class="flat_menu sbm_comment hatebu with', com, '_comment">',
                            '<span class="date">', dt.ymd_jp(), ' ', dt.hms(), '</span>',
                            '<a href="http://b.hatena.ne.jp/', id, '/">',
                            '<img src="http://www.hatena.ne.jp/users/', id.substr(0, 2), '/', id, '/profile_s.gif" width="16" height="16">', id, '</a> ',
                            tags, o.comment,
                        '</div>'
                    ].join('')
                };
            }
        };

        var livedoor = {
            api : 'http://api.clip.livedoor.com/json/comments?all=1&link=',
            parseResponse: function (req) {
                var o = new Function('return ' + req.responseText)();
                return (o.isSuccess) ? o.Comments.map(livedoor.makeComment) : [];
            },
            makeTag : function (tags, id) {
                return tags.map(function (tag) {
                    tag = tag.escapeHTML() || '';
                    return [
                        '<span class="sbm_tag">',
                        '<a href="http://clip.livedoor.com/clips/', id, '/tag/', tag, '">', tag, '</a>',
                        '</span>'
                    ].join('');
                }).join(',');
            },
            makeComment : function (o) {
                var id   = o.livedoor_id;
                var dt   = new DateTime(o.created_on * 1000);
                var com  = (o.notes.length > 0) ? '' : 'out';
                var tags = livedoor.makeTag(o.tags, id);
                return {
                    sort_key : dt.valueOf(),
                    comment : [
                        '<div class="flat_menu sbm_comment ldc with', com, '_comment">',
                            '<span class="date">', dt.ymd_jp(), ' ', dt.hms(), '</span>',
                            '<a href="http://clip.livedoor.com/clips/', id, '">',
                            '<img src="http://image.profile.livedoor.jp/icon/', id, '_16.gif" width="16" height="16">', id, '</a> ',
                            tags, o.notes.escapeHTML(),
                        '</div>'
                    ].join('')
                };
            }
        };


        if (elem) {
            elem.parentNode.removeChild(elem);
        }
        else if (cache.has(item_id)) {
            showComments(cache.get(item_id));
        }
        else {
            w.LoadEffect.Start();

            parallel([
                xhttp.get(hatena.api + url).next(hatena.parseResponse),
                xhttp.get(livedoor.api + url).next(livedoor.parseResponse)
            ]).next(function (o) {
                w.LoadEffect.Stop();

                var comments = merge(o).sort(function (a, b) {
                    return b.sort_key - a.sort_key;
                }).map(function (c) { return c.comment }).join('\n');

                cache.set(item_id, comments);

                showComments(comments);
            }).error(function (e) {
                alert(e);
            });
        }

        function showComments (comments) {
            var d = $N('div', {
                id    : 'sbm_' + item_id,
                style : 'display: block;',
                class : 'sbm_comments'
            });
            d.innerHTML = comments;
//            d.innerHTML = '<h2 class="flat_menu sbm_comment">SBM Comments</h2>' + comments;

            try { $('item_' + item_id).appendChild(d); } catch (e) {}
        }
    });

    w.register_command('tc|togglecomment', function () {
        toggleClass('right_body', 'nocomment');
        w.message(
            (hasClass('right_body', 'nocomment') ? 'Hide' : 'Show') + ' without comment'
        );
        setTimeout(function () {
            GM_setValue('hide', !GM_getValue('hide', false));
        }, 0);
    });

}}, true);

function merge (obj) {
    var tmp = [];
    for (var key in obj) tmp = tmp.concat(obj[key]);
    return tmp;
}

})();
