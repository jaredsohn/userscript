// ==UserScript==
// @name           pixiv_bookmarks_auto_tagging
// @version        2.1.6
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add bookmark tags automatically and hides the bookmark if it contains particular tags on pixiv. / pixivでブックマーク時に自動でタグ付けを行い、特定のタグを含んでいる場合は自動で非公開にします。
// @include        http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=*
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==
(function() {
    var autoTaggingKey = 'a'; // イラスト画面でオートブックマークに割り当てるキー
    var hidingList = ['R-18']; // 非公開ブックマークする条件となるタグ(正規表現可)のリスト
    var matchList = { // 追加するタグ : [追加する条件となるタグ(正規表現可)のリスト]
        "VOCALOID" : ["初音ミク"],
        "とらドラ!" : ["とらドラ！", "川嶋亜美"],
        "ひぐらしのなく頃に" : ["ひぐらし"],
        "聖剣伝説" : [/聖剣伝説\d*/],
        "それでも町は廻っている" : ["それ町"],
        "アイドルマスター" : ["アイマス", "アイドルマスター2"],
        "ドラクエ" : ["ドラゴンクエスト", /dq\d*/i],
        "ペルソナ3" : [/P3P?/i],
        "ローゼンメイデン" : ["翠星石"],
        "ゼロの使い魔" : ["ルイズ"],
        "涼宮ハルヒの憂鬱" : ["涼宮ハルヒの消失"],
        "エヴァ" : [/(エ|ヱ)ヴァ(ンゲリ(オ|ヲ)ン)?/],
        "Steins;Gate" : ["シュタゲ", "シュタインズゲート"],
        "けいおん!" : [/けいおん!*/],
    };
    var disableKey = false;
    // checks if the target string array contains certain string
    var contains = function(strArray, elem) {
        for (var i = 0; i < strArray.length; i++) {
            if (typeof(elem) == 'string') {
                if (strArray[i].toLowerCase() == elem.toLowerCase()) {
                    return true;
                }
            } else if (strArray[i].match(elem)) {
                return true;
            }
        }
        return false;
    }
    // picks up the tags from the target area
    var getTags = function(dom, idx) {
        var tagAreas = dom.getElementsByClassName('bookmark_recommend_tag');
        if (tagAreas.length == 1) {
            var userTagExists = dom.getElementsByClassName('tagCloud').length != 0;
            if (userTagExists + idx == 1) {
                return [];
            }
            idx = 0;
        }
        var links = tagAreas[idx].getElementsByTagName('a');
        var tags = [];
        for (var i = 0; i < links.length; i++) {
            tags.push(links[i].firstChild.data);
        }
        return tags;
    }
    // check if the illust should be hided.
    var isHided = function (illustTags) {
        for (var i = 0; i < hidingList.length; i++) {
            if (contains(illustTags, hidingList[i])) {
                return true;
            }
        }
        return false;
    };
    // return tag list for each bookmark
    var getInputTags = function (illustTags, myTags) {
        var inputTags = [];
        for (var i = 0; i < myTags.length; i++) {
            if (contains(illustTags, myTags[i]) && !contains(inputTags, myTags[i])) {
                inputTags.push(myTags[i]);
            }
        }
        for (var i in matchList) {
            if (contains(inputTags, i)) { // duplication check
                continue;
            }
            for (var j = 0; j < matchList[i].length; j++) {
                if (contains(illustTags, matchList[i][j])) {
                    inputTags.push(i);
                    break;
                }
            }
        }
        return inputTags;
    };
    if (location.href.indexOf('http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=') == 0) {
        window.scroll(0, 350);
        var illustTags = getTags(document, 0);
        var myTags = getTags(document, 1);
        document.getElementById(isHided(illustTags) ? 'res1' : 'res0').checked = true;
        document.getElementById('input_tag').value = getInputTags(illustTags, myTags).join(' ');
    } else {
        var button = document.createElement('button');
        with (button.style) {
            border = 'none';
            borderLeft = '1px solid #EEEEEE';
            MozBorderRadius = '6px';
            WebkitBorderRadius = '6px';
            padding = '0 3px';
            background = '#DDDDDD';
        }
        button.innerHTML = '自動ブックマーク';
        var params = location.href.split('?')[1].split('&');
        var illustId = params.filter(function (e) {return e.split('=')[0]=='illust_id';})[0].split('=')[1];
        var requestBookmark = function (tags, hide) {
            var req = new XMLHttpRequest();
            req.open('POST', 'http://www.pixiv.net/bookmark_add.php');
            req.onreadystatechange = function () {
                if (req.readyState != 4) {
                } else if (req.status != 200) {
                    button.innerHTML = '失敗しました';
                    button.disabled = disableKey = false;
                } else {
                    var category = tags.length ? ('"' + tags.join('", "') + '"') : '未分類';
                    var scope = hide ? '非公開' : '公開';
                    button.innerHTML = category + 'で' + scope + 'ブックマークしました';
                    button.disabled = disableKey = false;
                }
            };
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            var tt = document.getElementsByName('tt')[0].value;
            var tag = encodeURIComponent(tags.join(' '));
            var restrict = hide ? 1 : 0;
            var data = 'mode=add&tt=' + tt + '&id=' + illustId + '&type=illust&restrict=' + restrict + '&tag=' + tag + '&comment=';
            req.send(data);
        };
        var autoTagging = function () {
            button.disabled = disableKey = true;
            button.innerHTML = 'タグ取得中...';
            var req = new XMLHttpRequest();
            req.open('GET', 'http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=' + illustId);
            req.onreadystatechange = function () {
                if (req.readyState != 4) {
                } else if (req.status != 200) {
                    button.innerHTML = '失敗しました';
                    button.disabled = disableKey = false;
                } else {
                    var rsHTML = document.createElement('div');
                    rsHTML.innerHTML = req.responseText;
                    var illustTags = getTags(rsHTML, 0);
                    var myTags = getTags(rsHTML, 1);
                    var inputTags = getInputTags(illustTags, myTags);
                    button.innerHTML = 'ブックマーク中...';
                    requestBookmark(inputTags, isHided(illustTags));
                }
            };
            req.send(null);
        };
        button.addEventListener('click', autoTagging, false);
        var li = document.createElement('li');
        with(li.style) {
            borderLeft = '1px solid #EEEEEE';
            padding = '0 0 0 5px';
        }
        li.appendChild(button);
        var ul = document.getElementsByClassName('share-button')[0];
        ul.appendChild(li);
        var INPUTS = ['INPUT', 'TEXTAREA'];
        document.addEventListener('keydown', function (e) {
            var pressed = String.fromCharCode(e.which).toLowerCase();
            pressed = (e.ctrlKey ? 'C-' : '') + (e.altKey ? 'A-' : '') + (e.shiftKey ? 'S-' : '') + pressed;
            if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == autoTaggingKey) {
                e.preventDefault();
                if (!disableKey) {
                    autoTagging();
                }
            }
        }, false);
    }
})();
