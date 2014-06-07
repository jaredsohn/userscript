// ==UserScript==
// @name            DZ_Smilies
// @author          aa65535
// @version         1.10
// @lastmodified    2013-12-26 15:08:57
// @run-at          document-end
// @description     可以附加额外的自定义表情(Discuz论坛通用)
// @namespace       Rin Satsuki
// @updateURL       http://userscripts.org/scripts/source/186719.meta.js
// @downloadURL     http://userscripts.org/scripts/source/186719.user.js
// @include         http://*/*
// @copyright       2013+ Rin Satsuki
// ==/UserScript==

(function($) {
    if (!$('append_parent')) {
        return;
    }
    var curdomain = (function(a) {
        var i, l, b = a.split('.').reverse(),
        c = (/^(asia|biz|cc|cn|co|com|gov|info|me|mobi|name|net|org|so|tel|tv)$/);
        for (i = 0, l = b.length; i < l; i++) {
            if (!c.test(b[i])) {
                return b[i];
            }
        }
    } (location.host));
    function Smilies(mode) {
        this.mode = mode;
        this.init();
    }
    Smilies.prototype = {
        init: function() {
            var i, preli,
            o = this,
            cf = o.getId(),
            li = o.getLi(cf.key),
            style = document.createElement('style');
            if ($(cf.key + 'stype_999')) {
                return;
            }
            style.type = 'text/css';
            style.textContent = '#' + cf.id + 'smiliesdiv_tb{width:305px !important;}';
            Smilies.prototype.smiliesArray = o.getArray(40);
            li.addEventListener('click', function() {
                GM_setValue(curdomain + '_is_current', true);
                o.Switch(cf.id, -1, cf.key);
            });
            $(cf.id + 'smiliesdiv').appendChild(style);
            $(cf.id + 'smiliesdiv_tb').querySelector('ul').appendChild(li);
            if (GM_getValue(curdomain + '_is_current') && o.smiliesArray.length > 0) {
                $(cf.key + 'stype_' + unsafeWindow.CURRENTSTYPE).className = '';
                li.className = 'current';
                unsafeWindow.CURRENTSTYPE = 999;
                o.Switch(cf.id, -1, cf.key);
            }
            function switchCurrent() {
                if (GM_getValue(curdomain + '_is_current')) {
                    GM_setValue(curdomain + '_is_current', false);
                }
            }
            preli = li.parentNode.childNodes;
            for (i = 0; i < preli.length; i++) {
                if (preli[i].nodeType === 1 && preli[i].id !== cf.key + 'stype_999') {
                    preli[i].addEventListener('click', switchCurrent);
                }
            }
        },
        getId: function() {
            var o = this,
            map = {
                editor: ['e_', ''],
                fastpost: ['fastpost', 'fastpost'],
                pm: ['reply', 'reply'],
                post: ['post', 'post'],
            };
            return {
                id: map[o.mode][1],
                key: map[o.mode][0]
            };
        },
        getLi: function(key) {
            var div = document.createElement('div');
            key += 'stype_';
            div.innerHTML = '<li id="' + key + '999" onclick="if(CURRENTSTYPE){$(\'' + key +
                '\'+CURRENTSTYPE).className=\'\'}this.className=\'current\';CURRENTSTYPE=999;' +
                'doane(event)"><a href="javascript:;" hidefocus="true">自定义</a></li>';
            return div.firstChild;
        },
        getArray: function(maxlen) {
            var A = [], len, page, start, end, t, i;
            if (!GM_getValue('custom_smilies')) {
                return [];
            }
            t = GM_getValue('custom_smilies').replace(/\s+/g, '\n').split('\n')
            .filter(function(url) {
                return (/^https?\:\/\/\S+$/).test(url);
            });
            len = t.length;
            page = Math.ceil(len / maxlen);
            for (i = 0; i < page; i++) {
                start = i * maxlen;
                end = start + maxlen < len ? start + maxlen : len;
                A[i] = t.slice(start, end);
            }
            return A;
        },
        Switch: function(id, page, key) {
            var o = this, smiliesdata, smiliespage, maxp, len, i, j, s;
            maxp = o.smiliesArray.length;
            if (maxp == 0) {
                o.addSml();
                return;
            }
            page = page == -1 ? (GM_getValue(curdomain + '_smilies_page') || 1) : page;
            page = parseInt(page || maxp, 10);
            if (page > maxp) {
                page = 1;
            }
            if (page < 1) {
                page = maxp;
            }
            GM_setValue(curdomain + '_smilies_page', page);
            smiliesdata = '<table id="' + id +
                'smiliesdiv_table" cellpadding="0" cellspacing="0"><tr>';
            len = o.smiliesArray[page - 1].length;
            for (i = j = 0; i < len; i++) {
                if(j > 7) {
                    smiliesdata += '<tr>';
                    j = 0;
                }
                s = o.smiliesArray[page - 1][i];
                smiliesdata += s ? ('<td onmouseover="smilies_preview(\'' + key +
                    '\', \'' + id + 'smiliesdiv\', this, 85)" onclick="' +
                    (unsafeWindow.seditor_insertunit !== undefined ? ('seditor_insertunit(\'' +
                    key + '\', \'[img]' + s + '[/img] \')') : ('insertSmiley(\'cs_' +
                    page + i + '\')')) + '"><img id="smilie_cs_' + page + i + '" src="' +
                    s + '" width="20" height="20" alt="[img]' + s + '[/img]" />') : '';
                if (page >= maxp && i == len -1) {
                    if (j > 6) {
                        smiliesdata += '<tr>';
                        j++;
                    }
                    smiliesdata += '<td><span id="' + id + 'sml_add" style="display:' +
                        'inline-table;margin:0;padding:0;width:20px;height:20px;bord' +
                        'er:0;cursor:pointer;background:url(data:image/png;base64,iV' +
                        'BORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAABlBMVEXL6vpku' +
                        'N8gWfYMAAAAKklEQVR4Xm3MMQ0AAAgDwUpAIlJwgFUclHSCBIabmi/IQsCG' +
                        'X0n5t92S1XJZFdll4vgzAAAAAElFTkSuQmCC)" title="添加表情">';
                }
                j++;
            }
            smiliesdata += '</table>';
            smiliespage = maxp > 1 ? ('<div class="z"><a href="javascript:;" id="' +
                id + 'sml_prev_page">上页</a><a href="javascript:;" id="' + id +
                'sml_next_page">下页</a></div>' + page + '/' + maxp) : '';
            $(id + 'smiliesdiv_data').innerHTML = smiliesdata;
            $(id + 'smiliesdiv_page').innerHTML = smiliespage;
            if (maxp > 1) {
                $(id + 'sml_prev_page').onclick = function(e) {
                    e.preventDefault();
                    this.onclick = null;
                    o.Switch(id, page - 1, key);
                };
                $(id + 'sml_next_page').onclick = function(e) {
                    e.preventDefault();
                    this.onclick = null;
                    o.Switch(id, page + 1, key);
                };
            }
            if ($(id + 'sml_add')) {
                $(id + 'sml_add').onclick = function() {
                    o.addSml();
                };
            }
        },
        addSml: function() {
            var o = this, smilies = '', textarea, i;
            if (o.smiliesArray.length > 0) {
                smilies = o.smiliesArray.reduce(function(pre, cur) {
                    return pre.concat(cur);
                }).join('\n');
            }
            textarea = '<style type="text/css">.c.altw{width:512px}.alert_info' +
                '{background:0;padding:6px}</style><textarea id="custom_smilie' +
                's" style="height:128px;width:99%;">' + smilies + '</textarea>';
            unsafeWindow.showDialog(textarea, 'notice', '添加表情');
            $('fwin_dialog_submit').onclick = function() {
                this.onclick = null;
                var cs = $('custom_smilies').value.replace(/\s+/g, '\n').trim();
                GM_setValue('custom_smilies', cs);
                Smilies.prototype.smiliesArray = o.getArray(40);
                unsafeWindow.hideMenu('fwin_dialog', 'dialog');
            };
        },
    };
    setTimeout(function() {
        var i,
            pm,
            len,
            post,
            addli,
            editor,
            fastres,
            fastpost;
        if (unsafeWindow.smilies_array === undefined) {
            return;
        }
        addli = function() {
            setTimeout(function() {
                if (!$('postsml')) {
                    addli();
                } else {
                    setTimeout(function() {
                        post = new Smilies('post');
                    }, 500);
                }
            }, 100);
        };
        if ($('replysmiliesdiv')) {
            pm = new Smilies('pm');
        }
        if ($('smiliesdiv')) {
            editor = new Smilies('editor');
        }
        if ($('fastpostsmiliesdiv')) {
            fastpost = new Smilies('fastpost');
            fastres = document.querySelectorAll('.fastre');
            for (i = 0, len = fastres.length; i < len; i++) {
                fastres[i].addEventListener('click', addli);
            }
        }
    }, 500);
} (function(id) {
    return document.getElementById(id);
}));
