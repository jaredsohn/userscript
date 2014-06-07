// ==UserScript==
// @name           expand facebook
// @namespace      expand.facebook
// @include        http://www.facebook.com*
// @version        1.0.0
// @description    Facebookのフィードでまとめられているものを展開する 
// ==/UserScript==
(function() {
    var d = document;

    function expandFeed() {
        var divs = d.getElementsByClassName('uiStreamCollapsed');
        for (var i = 0, n = divs.length; i < n; i++) {
            var childs = divs[i].childNodes;
            for (var j = 0, m = childs.length; j < m; j++) {
                if (childs[j].tagName == 'A') {
                    var e = d.createEvent('MouseEvents');
                    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    childs[j].dispatchEvent(e);
                }
            }
        }
    }

    function expandComment() {
        var comments = d.getElementsByName('view_all[1]');
        for (var i = 0, n = comments.length; i < n; i++) {
            comments[i].click();
        }
    }

    function onscroll() {
        var area = d.getElementById('expand.facebook.area');
        if (area) {
            area.style.top = pageYOffset+"px";
        }
    }

    var nav = d.getElementById('pagelet_welcome_box');
    if (!nav) {
        return;
    }

    var linkArea = d.createElement('div');
    linkArea.style.right = 0;
    linkArea.style.top = 0;
    linkArea.style.position = 'absolute';
    linkArea.style.backgroundColor = '#D8DFEA';
    linkArea.id = 'expand.facebook.area';

    var feedDiv = d.createElement('div');
    feedDiv.style.fontWeight = 'bolder';
    feedDiv.style.padding = '5px';
    var feedLink = d.createElement('a');
    feedLink.innerHTML = 'フィードを展開';
    feedLink.addEventListener('click', expandFeed, false);
    feedDiv.appendChild(feedLink);
    linkArea.appendChild(feedDiv);

    var commentDiv = d.createElement('div');
    commentDiv.style.fontWeight = 'bolder';
    commentDiv.style.padding = '5px';
    var commentLink = d.createElement('a');
    commentLink.innerHTML = 'コメントを展開';
    commentLink.addEventListener('click', expandComment, false);
    commentDiv.appendChild(commentLink);
    linkArea.appendChild(commentDiv);

    d.getElementById('content').appendChild(linkArea);

    window.addEventListener("scroll", onscroll, false);

})();
