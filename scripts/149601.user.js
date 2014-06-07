// ==UserScript==
// @name            贴吧尾页直达
// @version         1.0
// @description     在帖子列表后面加入直达尾页的按钮
// @author          恋LOVE死神
// @include         http://tieba.baidu.com/*
// @grant GM_getValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest 
// @grant GM_setValue
// ==/UserScript==

// 此脚本在 冰凉的小脸 的基础上提取而成，
// 版权归原作者所有。


(function(){

    var last_page_channel = GM_getValue('last_page_channel');

    // 辅助变量
    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
    var XPList  = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

    // 辅助函数
    function find(xpath, xpres) {
        var result = document.evaluate(xpath, document, null, xpres, null);
        if (xpres == XPFirst) {
            return result.singleNodeValue;
        }
        if (xpres == XPList && result.snapshotLength > 0) {
            return result;
        }
        return false;
    }

    //主题函数
    fun_LastPageChannel();

 
    // 尾页直达
    function fun_LastPageChannel(){ 
        var css  = "@namespace url(http://www.w3.org/1999/xhtml);";
            css += 'a[class=LastPageButtton]{font-size:100%;text-shadow:0 .5px .5px rgba(0,0,0,.8);}';
            css += 'a[class=LastPageButtton]:hover{transition:color .5s ease-in-out,border .25s ease-in-out;}';
        GM_addStyle(css);

        function fc1() {
            var f = find('//a[@class="LastPageButtton"]', XPFirst);
            if (f) {
                return;
            }

            var f1 = find('//td[@class="thread_title"]//a', XPList); // 旧版贴吧
            if (f1) {
                for (var i = 0; i < f1.snapshotLength; i++) {
                    var item = f1.snapshotItem(i);
                    function ff1(item, number) {
                        var replay_number = item.parentNode.parentNode.getAttribute('replay');
                        if (replay_number < 30) {
                            return;
                        }
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://tieba.baidu.com' + item.getAttribute('href'),
                            onload: function(response) {
                                var f = find('//a[@id="LastPageButtton' + number + '"]', XPFirst);
                                if (f) {
                                    return;
                                }
                                var last_page = response.responseText.match(/<a[^a#]+>尾页<\/a>/);
                                if (!last_page) {
                                    return;
                                }
                                var href                   = last_page[0].match(/\/p\/\d+\?pn=\d+/)[0];
                                var last_page_button       = document.createElement('a');
                                last_page_button.innerHTML = '>>';
                                last_page_button.setAttribute('class', 'LastPageButtton');
                                last_page_button.setAttribute('id', 'LastPageButtton' + number);
                                last_page_button.setAttribute('target', '_blank');
                                last_page_button.setAttribute('href', href);
                                item.parentNode.appendChild(last_page_button);
                            }
                        });
                    }
                    ff1(item, i);
                }
            }

            f1 = find('//div[@class="threadlist_li_right"]', XPList); // 新版贴吧
            if (f1) {
                for (var i = 0; i< f1.snapshotLength; i++) {
                    var item = f1.snapshotItem(i);
                    function ff2(item, number) {
                        var data          = item.parentNode.getAttribute('data-field').slice(1, -1).split(',');
                        var replay_number = data[1].match(/\d+/)[0];
                        if (replay_number < 30) {
                            return;
                        }
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://tieba.baidu.com/p/' + data[0].match(/\d+/)[0],
                            onload: function(response) {
                                var f = find('//a[@id="LastPageButtton' + number + '"]', XPFirst);
                                if (f) {
                                    return;
                                }
                                var last_page = response.responseText.match(/<a[^a#]+>尾页<\/a>/);
                                if (!last_page) {
                                    return;
                                }
                                href                       = last_page[0].match(/\/p\/\d+\?pn=\d+/)[0];
                                var last_page_button       = document.createElement('a');
                                last_page_button.innerHTML = '>>';
                                last_page_button.setAttribute('class', 'LastPageButtton');
                                last_page_button.setAttribute('id', 'LastPageButtton' + number);
                                last_page_button.setAttribute('target', '_blank');
                                last_page_button.setAttribute('href', href);
                                node = item.children[0].children[0];
                                node.insertBefore(last_page_button, node.children[1]);
                            }
                        });
                    }
                    ff2(item, i);
                }
            }
        }fc1();
        setInterval(fc1, 2000);
    }


})();
