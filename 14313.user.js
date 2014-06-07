// ==UserScript==
// @name           LDR show LDC clips
// @namespace      http://shinten.info/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var LDC_API  = 'http://api.clip.livedoor.com/json/comments';
var ALL_CLIP = 0;

GM_addStyle(<><![CDATA[
    .ldc_clip {
        font-size: 12px;
        padding-left: 8px;
        border-top: 1px dotted #ccc;
    }
    .ldc_clip a {
        color: #005bff;
        text-decoration: none;
    }
    .ldc_clip img {
        border: none;
        vertical-align: middle;
        margin: 0px 3px 0px 0px;
    }
    .ldc_clip .date {
        font-size: 11px;
        color: #AAA;
        margin: 0px 3px;
    }
    .ldc_clip .ldc_tag {
        font-size: 11px;
        margin: 0px 2px;
    }
    .ldc_clip .ldc_tag a {
        color: #AAA;
    }
    .with_notes {}
    .without_notes {}
]]></>);

var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
var _onload = w.onload;

var tmpl_clip = [
    '<div class="flat_menu ldc_clip [[ with_notes ]]_notes">',
        '<a href="http://clip.livedoor.com/clips/[[ id ]]">',
        '<img src="http://image.clip.livedoor.com/profile/?viewer_id=[[ id ]]&target_id=[[ id ]]" width="16" height="16">[[ id ]]</a>',
        '<span class="date">[[ date ]]</span>[[ tags ]] [[ notes ]]',
    '</div>'
].join('');

var tmpl_tag = [
    '<span class="ldc_tag">',
        '<a href="http://clip.livedoor.com/clips/[[ id ]]/tag/[[ tag ]]">[[ tag ]]</a>',
    '</span>'
].join('');

var onload = function() { with (w) {
    ScriptLoader.DEBUG = false;
    var loader    = new ScriptLoader(LDC_API);
    var tt_clip   = new Template(tmpl_clip).compile();
    var tt_tag    = new Template(tmpl_tag).compile();
    var ldc_cache = new Cache();

    Keybind.add('L', function () {
        var item = get_active_item(true);
        if (!item) return;

        var item_id = item.id;
        var elem = $('ldc_' + item_id);

        if (ldc_cache.has(item_id)) {
            if (elem) Element.toggle(elem);
            else      show_clips(ldc_cache.get(item_id));
        }
        else {
            LoadEffect.Start();
            loader.get({ link: item.link, all: ALL_CLIP }, function (o) {
                LoadEffect.Stop();
                ldc_cache.set(item_id, o);
                show_clips(o);
            });
        }

        function show_clips (o) {
            if (!o.isSuccess) message('NO CLIP');
            else {
                var clips = o.Comments.map(function (c) {
                    return tt_clip({
                        id  : c.livedoor_id,
                        date: new DateTime(c.created_on * 1000).ymd_jp(),
                        tags: c.tags.map(function (t) {
                            return tt_tag({
                                id : c.livedoor_id,
                                tag: t
                            });
                        }).join(','),
                        notes: c.notes,
                        with_notes: (c.notes.length) ? 'with' : 'without'
                    });
                });
                var div = $N('div', {
                    id: 'ldc_' + item_id,
                    style: 'display: block;'
                });
                div.innerHTML = clips.join('');
                try {
                    $('item_' + item_id).appendChild(div);
                }
                catch (e) {
                }
            }
        }
    });
}};

w.onload = function() {
    _onload();
    onload();
};
