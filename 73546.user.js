// ==UserScript==
// @name           niconico myvideo search
// @namespace      http://web.zgo.jp/
// @description    投稿動画から作者のMyvideoを探す
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
(function() {
    var videoTitle = document.getElementsByClassName('video_title')[0];
    if (!videoTitle) return;
    var videoUserId = unsafeWindow.so.variables.videoUserId;// 投稿者のID
    var userVideoURL = "http://www.nicovideo.jp/user/" + videoUserId + "/video";
    window.gm_nicoUserId = videoUserId;
    // get→inssert
    getUserVideo(userVideoURL, insertLink);

    // ユーザー投稿動画一覧が公開されているか
    // 公開されているならcallbackを実行
    function getUserVideo(userVideoURL, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: userVideoURL,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
            },
            onload: function(responseDetails) {
                var DOMHTML = createDocumentFromString(responseDetails.responseText);
                if (isOpendVideo(DOMHTML)) {
                    callback();
                    return true;
                } else {
                    return false;
                }
            },
            onerror :function() {
                GM_log("通信エラー myvideo")
            }
        });

    }

    // class="noList" をみて公開か判定
    // 公開ならtrue,非公開ならfalse
    function isOpendVideo(doc) {
        var cntBody = doc.getElementById("myContBody");
        return !cntBody.classList.contains("noList");
    }

    // タイトルの横へ挿入
    function insertLink() {
        var span = document.createElement('span');
        span.style.cssText = 'font-size:small; margin-top:4px; line-height:1.25;';
        span.innerHTML = '　<a href="http://www.nicovideo.jp/user/' + videoUserId + '/video">公開投稿動画</a>';
        videoTitle.appendChild(span); // insert position
    }

    function createDocumentFromString(source) {
        var doc;
        try {
            doc = document.cloneNode(false);
            doc.appendChild(doc.importNode(document.documentElement, false));
        } catch(e) {
            doc = document.implementation.createHTMLDocument ?
                    document.implementation.createHTMLDocument('hogehoge') :
                    document.implementation.createDocument(null, 'html', null);
        }
        var range = document.createRange();
        range.selectNodeContents(document.documentElement);
        var fragment = range.createContextualFragment(source);
        var headChildNames = {title: true, meta: true, link: true, script: true, style: true, /*object: true,*/ base: true/*, isindex: true,*/};
        var child, head = doc.getElementsByTagName('head')[0] || doc.createElement('head'),
                body = doc.getElementsByTagName('body')[0] || doc.createElement('body');
        while ((child = fragment.firstChild)) {
            if (
                    (child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
                            (child.nodeType === doc.TEXT_NODE && /\S/.test(child.nodeValue))
                    )
                break;
            head.appendChild(child);
        }
        body.appendChild(fragment);
        doc.documentElement.appendChild(head);
        doc.documentElement.appendChild(body);
        return doc;
    }
})();