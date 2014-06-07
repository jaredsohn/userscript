// ==UserScript==
// @name           WM linked Redmine
// @namespace      http://github.com/Tomohiro
// @description    WebMagic に Redmine へのリンクを埋め込む
// @include        http://webmagic.example.com/*
// ==/UserScript==
//
// 設定方法
//   最初に WebMagic と連携する Redmine の URI を設定する必要があるので
//   下記の手順で値を新規作成してください。
//
//     1. ロケーション・バーに about:config と打ち込んで設定画面を表示
//     2. 右クリックから新規作成 -> 文字列を選択
//     3. 設定名に greasemonkey.scriptvals.http://github.com/Tomohiro/WM linked Redmine.redmineURI を入力
//     4. 文字列に Redmine の URI を入力
//
(function() {
    var redmineURI = GM_getValue('redmineURI');
    var content = null;

    switch (true) {
        case /schedule/.test(location.pathname):
            var scheduleId = getFirstElementByXPath('/html/body/table/tbody/tr/td[2]/input[4]');
            var type = getFirstElementByXPath('/html/body/table/tbody/tr/td[2]/input[2]');
            if (scheduleId == null || (type != null && type.value != 'sche_detail')) {
                return;
            }
            content = getFirstElementByXPath('/html/body/table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[6]/td[2]/pre');
            break;
        case /mail_detail/.test(location.href):
            content = getFirstElementByXPath('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td/pre');
            break;
        case /workflow/.test(location.pathname):
            var workflowId = getFirstElementByXPath('/html/body/form/input[3]');
            if (workflowId == null || workflowId.value == '') {
                return;
            }
            content = getFirstElementByXPath('/html/body/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/pre');
            break;
        case /meeting_room/.test(location.pathname):
            var meetId = getFirstElementByXPath('/html/body/table/input[3]');
            if (meetId == null) {
                return;
            }
            content = getFirstElementByXPath('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td/pre');
            break;
        default:
            return;
    }

    var issues = content.innerHTML.match(/#[0-9]+/g);
    if (content == null || issues == null) {
        return;
    }

    var size = issues.length;
    for (var i = 0; i < size; i++) {
        var issue_id = issues[i].replace(/#/, '');
        var link = '<a href="' + redmineURI + '/issues/show/' + issue_id + '" target="_blank">' + issues[i] + '</a>';
        content.innerHTML = content.innerHTML.replace(issues[i], link);
    }

    function getFirstElementByXPath(xpath) {
        var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }
})();