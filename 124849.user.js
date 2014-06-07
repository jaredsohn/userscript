// ==UserScript==
// @name            FrozenFace
// @version         5.11
// @description     给百度贴吧添加一些有意思的功能
// @author          xStone
// @include         http://tieba.baidu.com/*
// @exclude         http://tieba.baidu.com/i/*
// @exclude         http://tieba.baidu.com/club/*
// @exclude         http://tieba.baidu.com/shipin/*
// @exclude         http://tieba.baidu.com/bakan*
// @exclude         http://tieba.baidu.com/daquan*
// @exclude         http://tieba.baidu.com/f/tupian*
// @exclude         http://tieba.baidu.com/tb/editor/*
// @exclude         http://tieba.baidu.com/*postBrowserBakan*
// ==/UserScript==

// 此脚本在 百度貼吧(tieba.baidu)修正器 的基础上修改而成，
// 版权归原作者 SoIN 所有。


(function() {

    // 当前网页类型：1，贴吧主题页；2，贴吧阅读页。
    var this_page = 1;
    if (location.href.search(/tieba\.baidu\.com\/p\/(.*)/i) != -1 ||
        location.href.search(/tieba\.baidu\.com\/f.*\?z=(.*)/i) != -1 ||
        location.href.search(/tieba\.baidu\.com\/f.*\?kz=(.*)/i) != -1 ||
        location.href.search(/tieba\.baidu\.com\/f.*\?ct=(.*)/i) != -1) {
        this_page = 2;
    }

    // 参数：1，打开此选项；0，关闭此选项。
    if (typeof GM_getValue('reply_float') === 'undefined') { // 回复框浮动
        GM_setValue('reply_float', '1');
    }
    var reply_float = GM_getValue('reply_float');

    if (typeof GM_getValue('last_page_channel') === 'undefined') { // 尾页直达
        GM_setValue('last_page_channel', '1');
    }
    if (typeof GM_getValue('last_page_channel_fuzzy') === 'undefined') { // 尾页模糊方案
        GM_setValue('last_page_channel_fuzzy', '1');
    }
    var last_page_channel       = GM_getValue('last_page_channel');
    var last_page_channel_fuzzy = GM_getValue('last_page_channel_fuzzy');

    if (typeof GM_getValue('old_post_detector') === 'undefined') { // 坟帖侦测
        GM_setValue('old_post_detector', '1');
    }
    if (typeof GM_getValue('old_post_detector_time_small') === 'undefined') { // 小型坟贴月份下限，默认为一个月
        GM_setValue('old_post_detector_time_small', '1');
    }
    if (typeof GM_getValue('old_post_detector_time_large') === 'undefined') { // 大型坟贴月份下限，默认为六个月
        GM_setValue('old_post_detector_time_large', '6');
    }
    var old_post_detector            = GM_getValue('old_post_detector');
    var old_post_detector_time_small = GM_getValue('old_post_detector_time_small');
    var old_post_detector_time_large = GM_getValue('old_post_detector_time_large');

    // 辅助变量
    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
    var XPList  = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

    // 辅助函数
    function find(xpath, xpres) {
        var result = document.evaluate(xpath, document, null, xpres, null);
        if (xpres == XPFirst) { return result.singleNodeValue; }
        else if (xpres == XPList && result.snapshotLength > 0) { return result; }
        else { return false; }
    }

    // 执行主体
    setTimeout(function() {
        if (reply_float == 1) { fun_ReplyFloat(); }
        if (this_page == 1 && last_page_channel == 1) { fun_LastPageChannel(); }
        if (this_page == 2 && old_post_detector == 1) { fun_OldPostdetector(); }
    }, 0);

    // 功能函数
    function fun_ReplyFloat() { // 回复框浮动
        var editor = find('//div[@id="editor"]', XPFirst);
        if (!editor) { return; }

        fun_ReplySimplify();
        fun_ReplyMinimized();
        var editor_overlay = find('//div[@class="tb-editor-overlay"]', XPFirst);
        if (editor_overlay) {
            editor_overlay.addEventListener('DOMAttrModified', function(event) {
                if (event.attrName == 'style') {
                    fun_ReplyFineTuning(event.newValue);
                }
            }, false);
        }

        function fun_ReplySimplify() { // 回复框简化
            function fun_SimlifyElement(elementXPATH) {
                var element = find(elementXPATH, XPFirst);
                if (!element) { return; }
                element.setAttribute('style', 'margin:0px;padding:0px;width:0px;height:0px;');
                element.innerHTML = '';
            }
            fun_SimlifyElement('//div[@class="new_tiezi_tip"]');
            fun_SimlifyElement('//td[contains(text(), "标　题:")]');
            fun_SimlifyElement('//td[contains(text(), "内　容:")]');
            fun_SimlifyElement('//td[contains(text(), "用户名:")]');
            fun_SimlifyElement('//label[contains(text(), "验证码:")]');

            var edit_parent = find('//div[@id="edit_parent"]', XPFirst);
            if (edit_parent) {
                edit_parent.setAttribute('style', 'margin:8px 8px 6px 4px;padding:0px;');
            }
        }
        function fun_ReplyMinimized() { // 回复框最小化
            var mark  = '';
                mark += '<div id="cMark" style="position:fixed;bottom:0px;right:0px;z-index:999;">';
                mark += '    <table id="cLink" cellpadding="0" cellspacing="0" width="100%" height="100%" style="border-width:1px 0px 0px 1px;border-style:solid;background:#FCFCFC;">';
                mark += '        <tr>';
                mark += '            <td onclick="if(document.getElementById(\'cLinkContent\').style.display!=\'none\'){document.getElementById(\'cLinkContent\').style.display=\'none\';document.getElementById(\'menuSwitch\').innerHTML=\'<<\';}else{document.getElementById(\'cLinkContent\').style.display=\'table-cell\';document.getElementById(\'menuSwitch\').innerHTML=\'>>\';}">';
                mark += '                <div style="width:18px;height:36px;line-height:36px;" id="menuSwitch" onMouseOver="document.getElementById(\'cLinkContent\').style.display=\'table-cell\';document.getElementById(\'menuSwitch\').innerHTML=\'>>\';"><<</div>';
                mark += '            </td>';
                mark += '            <td id="cLinkContent" style="display:none;">';
                mark += '            </td>';
                mark += '        </tr>';
                mark += '    </table>';
                mark += '</div>';
            var body = document.getElementsByTagName('body');
            if (body.length > 0) {
                var mark_node       = document.createElement('div');
                mark_node.innerHTML = mark;
                body[0].appendChild(mark_node);

                var edit_form = find('//div[@id="editor"]//form[contains(@id,"pt")]', XPFirst);
                if (edit_form) {
                    edit_form.setAttribute('style', 'position:static;margin:0px;padding:0px;background:#FCFCFC;');
                    var cLinkContent = find('//td[@id="cLinkContent"]', XPFirst);
                    if (cLinkContent) {
                        cLinkContent.appendChild(edit_form);
                    }
                }

                var css  = '@namespace url(http://www.w3.org/1999/xhtml);';
                    css += '.tb-editor-editarea{max-height:400px !important;}';
                GM_addStyle(css);

                if (this_page == 2) {
                    var replays = [];

                    var replay = find('//a[@class="j_quick_reply"]', XPFirst);
                    if (replay) { replays.push(replay); }

                    replay = find('//a[@class="p_reply_first"]', XPFirst);
                    if (replay) { replays.push(replay); }

                    for (var i = 0; i < replays.length; i++) {
                        replays[i].setAttribute('onclick', 'document.getElementById("cLinkContent").style.display="table-cell";document.getElementById("menuSwitch").innerHTML=">>";');
                    }
                }
            }
        }
        function fun_ReplyFineTuning(style_value) { // 回复框微调
            if (style_value.match('none')) {
                var mark = find('//div[@id="cMark"]', XPFirst);
                if (!mark) { return; }
                mark.setAttribute('style', 'position:fixed;bottom:0;right:0;z-index:999;');
                return;
            }
            if (style_value.match('block')) {
                var numbers = style_value.match(/\d+/g);
                if (numbers && numbers[3]) {
                    var height = numbers[3];
                    var replay_height = 268;
                    var mark = find('//div[@id="cMark"]', XPFirst);
                    if (!mark) { return; }
                    mark.style.marginBottom = ( height - replay_height > 0 ? height - replay_height : 0) + 'px';
                }
            }
        }
    }

    function fun_LastPageChannel() { // 尾页直达
        var css  = '@namespace url(http://www.w3.org/1999/xhtml);';
            css += 'a[class=LastPageButtton]{font-size:100%; text-shadow:0 .5px .5px rgba(0, 0, 0, .8);}';
            css += 'a[class=LastPageButtton]:hover{transition:color .5s ease-in-out, border .25s ease-in-out;}';
        GM_addStyle(css);

        var contet_wrap = find('//div[@id="contet_wrap"]', XPFirst);
        if (!contet_wrap) { return; }
        if (last_page_channel_fuzzy) {
            fun_addLastPageButtonsFuzzily();
            contet_wrap.addEventListener('DOMNodeInserted', function(event) {
                if (event.target.id == 'thread_list') {
                    setTimeout(function(){ fun_addLastPageButtonsFuzzily(); }, 0);
                }
            }, false);
        } else {
            fun_addLastPageButtonsExactly();
            contet_wrap.addEventListener('DOMNodeInserted', function(event) {
                if (event.target.id == 'thread_list') {
                    setTimeout(function(){ fun_addLastPageButtonsExactly(); }, 0);
                }
            }, false);
        }

        function fun_addLastPageButtonsFuzzily() { // 尾页模糊方案
            var threads = find('//div[@class="threadlist_li_right"]', XPList);  // 新版贴吧
            if (!threads) {
                var threads = find('//td[@class="thread_title"]//a', XPList);   // 旧版贴吧
                if (!threads) { return; }
                for (var i = 0; i < threads.snapshotLength; i++) {
                    fun_addLastPageButtonOld(threads.snapshotItem(i));
                }
            } else {
                for (var i = 0; i < threads.snapshotLength; i++) {
                    fun_addLastPageButtonNew(threads.snapshotItem(i));
                }
            }

            function fun_addLastPageButtonNew(item) { // 新版贴吧
                var data = item.parentNode.getAttribute('data-field').slice(1, -1).split(',');
                var replay_number = data[1].match(/\d+/)[0];
                if (replay_number <= 30) { return; }
                var last_page_button = document.createElement('a');
                last_page_button.innerHTML = '&nbsp;o O' ;
                last_page_button.setAttribute('class', 'LastPageButtton');
                last_page_button.setAttribute('style', 'cursor:pointer');
                last_page_button.addEventListener('click', function() {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url   : 'http://tieba.baidu.com/p/' + data[0].match(/\d+/)[0],
                        onload: function(response) {
                            var last_page = response.responseText.match(/<a[^a#]+>尾页<\/a>/);
                            if (last_page) {
                                var href = last_page[0].match(/\/p\/\d+\?pn=\d+/)[0];
                                GM_openInTab('http://tieba.baidu.com' + href);
                            } else {
                                GM_openInTab('http://tieba.baidu.com/p/' + data[0].match(/\d+/)[0]);
                            }
                        }
                    });
                });
                node = item.children[0].children[0];
                node.insertBefore(last_page_button, node.children[1]);
            }
            function fun_addLastPageButtonOld(item) { // 旧版贴吧
                var replay_number = item.parentNode.parentNode.getAttribute('replay');
                if (replay_number <= 30) { return; }
                var last_page_button = document.createElement('a');
                last_page_button.innerHTML = '&nbsp;o O' ;
                last_page_button.setAttribute('class', 'LastPageButtton');
                last_page_button.setAttribute('style', 'cursor:pointer');
                last_page_button.addEventListener('click', function(event) {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url   : 'http://tieba.baidu.com' + item.getAttribute('href'),
                        onload: function(response) {
                            var last_page = response.responseText.match(/<a[^a#]+>尾页<\/a>/);
                            if (last_page) {
                                var href      = last_page[0].match(/\/p\/\d+\?pn=\d+/)[0];
                                GM_openInTab('http://tieba.baidu.com' + href);
                            } else {
                                GM_openInTab('http://tieba.baidu.com' + item.getAttribute('href'));
                            }
                        }
                    });
                });
                item.parentNode.appendChild(last_page_button);
            }
        }

        function fun_addLastPageButtonsExactly() { // 尾页精确方案
            var threads = find('//div[@class="threadlist_li_right"]', XPList);  // 新版贴吧
            if (!threads) {
                var threads = find('//td[@class="thread_title"]//a', XPList);   // 旧版贴吧
                if (!threads) { return; }
                for (var i = 0; i < threads.snapshotLength; i++) {
                    fun_addLastPageButtonOld(threads.snapshotItem(i));
                }
            } else {
                for (var i = 0; i < threads.snapshotLength; i++) {
                    fun_addLastPageButtonNew(threads.snapshotItem(i));
                }
            }

            function fun_addLastPageButtonNew(item) { // 新版贴吧
                var data = item.parentNode.getAttribute('data-field').slice(1, -1).split(',');
                var replay_number = data[1].match(/\d+/)[0];
                if (replay_number <= 30) { return; }
                GM_xmlhttpRequest({
                    method: 'GET',
                    url   : 'http://tieba.baidu.com/p/' + data[0].match(/\d+/)[0],
                    onload: function(response) {
                        var last_page = response.responseText.match(/<a[^a#]+>尾页<\/a>/);
                        if (!last_page) { return; }
                        var href = last_page[0].match(/\/p\/\d+\?pn=\d+/)[0];
                        var last_page_button = document.createElement('a');
                        last_page_button.innerHTML = '&nbspJmp:&nbsp;' + href.match(/\d+/g)[1];
                        last_page_button.setAttribute('class', 'LastPageButtton');
                        last_page_button.setAttribute('target', '_blank');
                        last_page_button.setAttribute('href',  href);
                        node = item.children[0].children[0];
                        node.insertBefore(last_page_button, node.children[1]);
                    }
                });
            }
            function fun_addLastPageButtonOld(item) { // 旧版贴吧
                var replay_number = item.parentNode.parentNode.getAttribute('replay');
                if (replay_number <= 30) { return; }
                GM_xmlhttpRequest({
                    method: 'GET',
                    url   : 'http://tieba.baidu.com' + item.getAttribute('href'),
                    onload: function(response) {
                        var last_page = response.responseText.match(/<a[^a#]+>尾页<\/a>/);
                        if (!last_page) { return; }
                        var href      = last_page[0].match(/\/p\/\d+\?pn=\d+/)[0];
                        var last_page_button = document.createElement('a');
                        last_page_button.innerHTML = '&nbspJmp:&nbsp;' + href.match(/\d+/g)[1];
                        last_page_button.setAttribute('class', 'LastPageButtton');
                        last_page_button.setAttribute('target', '_blank');
                        last_page_button.setAttribute('href',  href);
                        item.parentNode.appendChild(last_page_button);
                    }
                });
            }
        }
    }

    function fun_OldPostdetector() { // 坟帖侦测
        var p_tail_node = find('//ul[@class="p_tail"]', XPFirst);
        p_tail_node.addEventListener('DOMNodeInserted', function(event) {
            var node = event.target.childNodes[0];
            if (node.innerHTML.indexOf('-') != -1) {
                setTimeout(function(){ fun_DisplayOldPostMessage(node); }, 0);
                p_tail_node.removeEventFilter('DOMNodeInserted', function(){}, false);
            }
        }, false);

        function fun_DisplayOldPostMessage(post_date_node) {
            // 年、月、日差值计算
            var year, month, day;
            var post_time = new Date(post_date_node.innerHTML.replace(/\-/g,'/'));
            var now_time  = new Date();
            if ((now_time.getMonth() > post_time.getMonth()) ||
                (now_time.getMonth() == post_time.getMonth() && now_time.getDate() >= post_time.getDate())) {
                year = now_time.getFullYear() - post_time.getFullYear();
            } else {
                year = now_time.getFullYear() - post_time.getFullYear() - 1;
            }
            if (now_time.getDate() >= post_time.getDate()) {
                month = (now_time.getMonth() - post_time.getMonth() + 12) % 12;
            } else {
                month = (now_time.getMonth() - post_time.getMonth() + 12 - 1 ) % 12;
            }
            day = (now_time.getDate() - post_time.getDate() + 31 ) % 31;

            // 坟贴信息提示
            var is_old_post = false;
            var showtext    = '';
            showtext       += '&nbsp;&nbsp;注意！！这是超过';
            showtext       += year ? year + '年' : '';
            showtext       += month ? month + '个月' : '';
            showtext       += day ? '又' + day + '天' : '';
            if (12 * year + month >= old_post_detector_time_large) {
                showtext   += '的(大型)坟贴哦!';
                is_old_post = true;
            } else if (month >= old_post_detector_time_small) {
                showtext += '的(小型)坟贴哦!';
                is_old_post = true;
            }
            if (is_old_post) {
                show_position = find('//h1[@class="core_title_txt"]', XPFirst);
                if (show_position) {
                    show_position.innerHTML += '<font style="font-size:110%;color:#FF0000;text-shadow:0 1px 1px rgba(0,0,0,.7);text-decoration:blink;">' + showtext + '</font>';
                }
            }
        }
    }

})();
