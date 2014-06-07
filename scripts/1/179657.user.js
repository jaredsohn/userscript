// ==UserScript==
// @name        google-scholar.js
// @namespace   https://github.com/organizations/gdut
// @match http://scholar.google.com/scholar*
// @match http://scholar.google.com/scholar.bib*
// @include http://scholar.google.com/scholar*
// @include http://scholar.google.com/scholar.bib*
// @version     0.0.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
    var utils = {
        tmpl: function(str, data) {
            var re = /\{\{([\w ]+)\}\}/, ret = str;
            var r;

            while ((r = re.exec(ret)) !== null) {
                ret = ret.replace(r[0], data[r[1].trim()]);
            }

            return ret;
        },

        createElement: function(raw) {
            var fake = document.createElement('div');
            fake.innerHTML = raw;
            return fake.childNodes[0];
        }
    };

    // 将按钮添加到搜索结果中
    var inject = function() {
        /**
         * 解析搜索结果
         *
         * @param raw 搜索结果的 block node
         * @return
         *  url: 原始地址
         *  id: bib 的 info id
         */
        var parse = function(raw) {
            var pattern = /.*gs_ocit\(\{\}.*'(.*)',.*/,
                url, id;

            url = raw.querySelector('.gs_ri .gs_rt a');
            url = (url) ? (url.href) : (null);

            id = pattern.exec(raw.innerHTML);
            id = (id) ? (id[1]) : (null);

            return {
                'url': url,
                'id': id
            };
        };

        var button = '<a href="#" data-id={{ id }} data-url={{ url }} ' +
            'class="google-scholar-js-cite">Import cite into BibTeX</a>',
            searchResults = document.querySelectorAll('.gs_r'),
            i;

        for (i = searchResults.length - 1;i >= 0;i--) {
            var current = searchResults[i],
                meta = parse(current);

            if (!meta.url || !meta.id) continue;

            current.querySelector('.gs_ri .gs_fl').appendChild(
                utils.createElement(utils.tmpl(button, meta))
            );
        }
    };

    // 绑定点击事件
    var bind = function() {
        var buttons = document.querySelectorAll('.google-scholar-js-cite'),
            i;

        var importCite = function(e) {
            e.preventDefault();

            var element = e.target,
                origin_url = element.getAttribute('data-url'),
                url = utils.tmpl(
                    'http://scholar.google.com/scholar.bib?q=info:{{ id }}' +
                    ':scholar.google.com/&output=citation',
                    {id: element.getAttribute('data-id')}
                ),
                tmpl = utils.tmpl('},\n  url={{{url}}}\n}', {url: origin_url});

            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(resp) {
                    if (resp.status < 200 || resp.status > 300) return;

                    alert(resp.responseText.replace('}\n}', tmpl));
                }
            });
        };

        for (i = buttons.length - 1;i >= 0;i--) {
            buttons[i].onclick = importCite;
        }
    };


    // kick off
    (function() {
        if (document.location.pathname !== '/scholar') {
            return;
        }

        inject();
        bind();
    })(); 
})();

