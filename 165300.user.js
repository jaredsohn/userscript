// ==UserScript==
// @name            tieba_float
// @version         1.0
// @description     百度贴吧悬浮编辑窗 
// @author          shaoyou11
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
            
})();

/*
Exception: GM_getValue is not defined
@Scratchpad/7:33
@Scratchpad/7:21
*/
/*
Exception: GM_getValue is not defined
@Scratchpad/10:33
@Scratchpad/10:21
*/