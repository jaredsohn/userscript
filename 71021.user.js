// ==UserScript==
// @name           pixiv_favorite_users_direct_remover
// @version        1.1.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    remove favorite users from their profile pages
// @include        http://www.pixiv.net/member.php?id=*
// @include        http://www.pixiv.net/member_illust.php?id=*
// ==/UserScript==
(function () {
    if (document.getElementsByClassName("profile_bt").length == 0) {
        var div = document.createElement("div");
        var ul = document.createElement("ul");
        ul.className = "profile_bt";
        var li = document.createElement("li");
        li.style.borderBottom = "1px solid rgb(183, 183, 183)";
        var a = document.createElement("a");
        a.href=location.href;
        a.innerHTML = "お気に入りから外す";
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var getter = new XMLHttpRequest();
            getter.open('GET', 'http://www.pixiv.net/bookmark.php');
            getter.onreadystatechange = function () {
                if (getter.readyState == 4 && getter.status == 200) {
                    var id = location.href.split('?')[1].split('=')[1];
                    var tt = getter.responseText.match(/<input[^>]+name="tt"[^>]+value="([0-9a-f]+)">/)[1];
                    var request = new XMLHttpRequest();
                    request.open('POST', 'http://www.pixiv.net/bookmark_setting.php');
                    request.onreadystatechange = function () {
                        if (request.readyState == 4 && request.status == 200) {
                            location.reload();
                        }
                    };
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.send('type=user&tt=' + tt + '&id%5B%5D=' + id + '&del=%E3%80%80%E5%A4%96%E3%80%80%E3%81%99%E3%80%80');
                }
            };
            getter.send(null);
        }, false);
        li.appendChild(a);
        ul.appendChild(li);
        div.appendChild(ul);
        document.getElementById("leftcolumn").insertBefore(div, document.getElementById("profile").nextSibling);
    }
})();
