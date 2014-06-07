// ==UserScript==
// @name        Ar-8.com Links Fixer مصلح اخطاء روابط المنتدى
// @author      NA1F/نايف الرشيدي
// @description إصلاح اخطاء روابط منتدى ترافيان العربي
// @namespace   http://userscripts.org/users/119605
// @include     http://*ar-8.com*/*
// @version     1.0.0.2
// ==/UserScript==
(function () {
    if (location.href.indexOf('ar-8.com') === -1) return;
    var Posts = document.getElementById('posts')
    if (!Posts) Posts = document.getElementById('post');
    var Links = Posts.querySelectorAll('a[href*="travian"][href*="html"],a[href*="user!!!!!!s.org"],code,pre');
    var Length = Links.length, Link, Text, Href, Post, Tag,
        script = /(!!!!!!|%21%21%21%21%21%21)/g,
        thread = 'ar-8.com/vb/showthread.php?t=',
        travian = /travian\d+\.html/;
    var i = 0;
    while (i < Length) {
        Link = Links[i];
        Text = Link.textContent;
        Tag = Link.tagName.toLowerCase();
        if (Tag === 'a') {
            Href = Link.getAttribute('href');
            if (travian.test(Href)) {
                Post = Href.split('travian')[1].split('.')[0];
                Link.setAttribute('href', 'showthread.php?t=' + Post);
                if (travian.test(Text))
                    Link.textContent =
                        ((Text.indexOf('http') != -1) ? 'http://' : '') +
                        ((Text.indexOf('www.') != -1) ? 'www.' : '') +
                        thread + Post;
                if (!Link.title) Link.setAttribute('title', 'تم إصلاح الرابط');
            }
            else if (script.test(Href)) {
                Link.setAttribute('href', Link.href.replace(script, 'script'));
                if (script.test(Text)) Link.textContent = Text.trim().replace(script, 'script');
            };
        }
        else if (Tag === 'code' || Tag === 'pre') {
            if (travian.test(Text)) {
                Post = Text.split('travian')[1].split('.')[0];
                Link.textContent = ((Text.indexOf('http') != -1) ? 'http://' : '') + ((Text.indexOf('www.') != -1) ? 'www.' : '') + thread + Post;
            }
            else if (script.test(Text)) Link.textContent = Text.trim().replace(script, 'script');
        };
        i++;
    };
})();