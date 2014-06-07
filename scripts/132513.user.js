// ==UserScript==
// @id             delicious.nico.thumb
// @name           delicious nico thumb
// @version        1.0
// @namespace      http://efcl.info/
// @author         azu
// @description    deliciousでニコニコ動画のサムネイルを表示する
// @include        http://delicious.com/*/
// @run-at         document-end
// ==/UserScript==
(function(){
    function getNicoThumbURL(videoURL){
        var match = videoURL.match(/^http:\/\/(?:www\.nicovideo\.jp\/watch|nico\.ms)\/[a-z][a-z](\d+)$/);
        if (!match){
            return;
        }
        var id = match[1];
        var host = parseInt(id, "10") % 4 + 1;
        return 'http://tn-skr' + host + '.smilevideo.jp/smile?i=' + id;

    }

    function addThumb(elem){
        var bookmarkURL = getURL(elem);
        var refImg = getElementForInsert(elem);
        var thumbURL = getNicoThumbURL(bookmarkURL);
        if (thumbURL){
            refImg.src = thumbURL;
        }
    }

    function getURL(elem){
        var action = elem.getElementsByClassName("action")[0];
        if (!action){
            throw new Error("action node not found");
        }
        return action.getAttribute("href");
    }

    function getElementForInsert(elem){
        var thumbElem = elem.getElementsByClassName("thumb")[0];
        if (!thumbElem){
            throw new Error("thumbElem node not found");
        }
        var imgElem = thumbElem.getElementsByTagName("img")[0];
        if(!imgElem){
            var newImage = document.createElement("img");
            var delayDiv = thumbElem.firstElementChild;
            thumbElem.replaceChild(newImage, delayDiv);
            return newImage;
        }
        return imgElem;
    }

    function delegateMain(node){
        var bookmarks = node.getElementsByClassName("link");
        for (var i = 0, len = bookmarks.length; i < len; i++){
            var bookmark = bookmarks[i];
            addThumb(bookmark);
        }

    }

    document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt){
        var node = evt.target;
        // var requestURL = evt.newValue;
        // var parentNode = evt.relatedNode;
        delegateMain(node);
    }, false);


    delegateMain(document);
})();