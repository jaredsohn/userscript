// ==UserScript==
// @name            FB CUSTOM for JPN
// @namespace       https://www.facebook.com/chroru
// @description     名前のさんを削除＆いいねを (´З｀) フッフー♪に変更。 
// @include         https://facebook.com/*
// @include         https://*.facebook.com/*
// @include         http://facebook.com/*
// @include         http://*.facebook.com/*
// @exclude         
// @version         0.3.0
// ==/UserScript==


(function () {
    /**
     * 投稿者名の敬称を書き換える
     */
    function updateNameTitle(rootElement) {
        if (rootElement.nodeType === 1) {
            // 「さん」を書き換え
            Array.prototype.map.call(rootElement.getElementsByClassName('actorName actorDescription'), function (element) {
                element.childNodes[1].nodeValue = ' ';
            });
        }
    }

    /**
     * いいね！を書き換える
     */
    function updateLikeLink(rootElement) {
        if (rootElement.nodeType === 1) {
            // 「いいね！」を書き換え
            Array.prototype.map.call(rootElement.getElementsByClassName('default_message'), function (element) {
                var node = element.childNodes[0];

                if (node) {
                    node.nodeValue = node.nodeValue.replace(/いいね！/, '(´З｀) フッフー♪');
                }
            });

            // 「いいね！を取り消す」を書き換え
            Array.prototype.map.call(rootElement.getElementsByClassName('saving_message'), function (element) {
                var node = element.childNodes[0];

                if (node) {
                    node.nodeValue = node.nodeValue.replace(/いいね！/, '(´З｀) フッフー♪');
                }
            });
        }
    }

    function update(rootElement) {
        updateNameTitle(rootElement);
        updateLikeLink(rootElement);
    }

    function onDOMNodeInserted(e) {
        //var s = new Date().getTime();

        update(e.target);

        //console.log("onDOMNodeInserted took: " + (new Date().getTime() - s) + "ms");
    }

    // DOM追加イベントを監視
    document.addEventListener('DOMNodeInserted', onDOMNodeInserted, false);

    // 追加済みのエレメントを更新
    update(document.body);
}());
