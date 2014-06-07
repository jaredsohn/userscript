// ==UserScript==
// @name           d_meter_review_compressor
// @version        3.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    読書メーターで「読書したみんな」内のコメントの無いユーザを隠し、「今読んでいるみんな」などのセクションを折りたたみます。
// @include        http://book.akahoshitakuya.com/b/*
// ==/UserScript==
(function () {
    var hideSections = /^(積読中の|読みたいと思った|今読んでいる|読書した)みんな/;
    var h2Nodes = document.getElementsByTagName('h2');
    for (var i = -1, h2; h2 = h2Nodes[++i]; ) {
        var title = h2.textContent;
        if (!title.match(hideSections)) {
            continue;
        }
        h2.addEventListener('mouseover', function (e) {
            this.style.backgroundColor = '#EEEEEE';
        }, false);
        h2.addEventListener('mouseout', function (e) {
            this.style.backgroundColor = '#FFFFFF';
        }, false);
        var inner = h2.parentNode;
        if (title.indexOf('読書したみんな')) {
            with(inner.style) {
                marginBottom = paddingBottom = '0';
            }
            var children = inner.childNodes;
            for (var j = 0, child; child = children[++j]; ) {
                child.style.display = 'none';
            }
            h2.addEventListener('click', function (e) {
                var inner = this.parentNode;
                var mode = ~~(inner.style.marginBottom == '5px');
                with(inner.style) {
                    marginBottom = paddingBottom = ['5px', '0'][mode];
                }
                var children = inner.childNodes;
                for (var i = 0, child; child = children[++i]; ) {
                    child.style.display = ['block', 'none'][mode];
                }
            }, false);
        } else {
            var defaultClass = h2.className;
            function compress (node) {
                var mode = ~~(node.className.split(' ').indexOf('compressed') != -1);
                var inner = node.parentNode;
                var children = inner.childNodes;
                for (var j = -1, child; child = children[++j]; ) {
                    if (child.className && !child.className.indexOf('tr_bgs')
                        && !child.getElementsByClassName('log_list_user_image').length) {
                        child.style.display = ['none', 'block'][mode];
                    }
                }
                node.className = [defaultClass, ['compressed', ''][mode]].join(' ');
            }
            compress(h2);
            h2.addEventListener('click', function (e) {compress(this);}, false);
        }
    }
})();
