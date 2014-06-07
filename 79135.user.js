// ==UserScript==
// @name           twitter_to_favstar
// @version        2.0.2
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add links to Favstar for each tweet on Twitter. / Twitterの各つぶやきにFavstarへのリンクを追加します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function () {
    if (document.getElementById('doc')) { // New Twitter case
        var icon = 'data:image/x-icon;base64,'+
          'AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEA'+
          'AAAAAADRdBoA0XUdAADd/AAAbuMAb0spAAU+0gB1SiYAAHvmAAB+5gCVXTEAplkTAACI6QDHbRgA'+
          'yG0YAKtcEwAAxvcAzHAYAACb7ADPdR4AAKXvAACs8gC9ZhYAvmYWAL1nGQAAsvIAwmkWAL9rHADA'+
          'axwASGtvAACH5wAAv/UAAIjqAMZuHAAAyfgAyXEcANBzGQAAnu0AAGfiAM90HADQdBwABIi1AACo'+
          '8AC0aB0At2caAAB05QAJNs4AALXzAMBrHQDFbBcAAL/2AMZsFwDEbh0AxW4dAAFW3QAAkesAAGXU'+
          'AMpxHQDMcBoAtWIVAADc/AC9ZRUAvGobAAFM2wAAh+kAAIrpAFGViwDKbxgAy3AbAAJf3gAAmuwA'+
          'znQeAAI9wQC2ZRYAALHyAAVA0wDAaBYAAIDnAMBpGQCnd0MAAL71AAFP3AAgMWgAxG0cAACN6gDG'+
          'cBwAr14UAACX7QDOchkAznMcAKOHagAAt/MAv2odAMJrFwAAhugAxWsXAMJtHQABVd0AAJPrAIpO'+
          'HADIcB0AAlvdAMlwHQAA0fkAAWLgAH9VOgDNcx0A0nYdAABv4wABb+MABGzjALllGAAAqvEAAUjb'+
          'AAC99ADEbBsAyW4YAK1dEwDNchsADsD0AADU+gAAo+8AAKbvANJ2HgC8ZxYAv2cWAL5oGQDCbBwA'+
          'mWMvAADK+ACsXxoAzXEZAABo4gAAa+IAAW7iAACp8AAA4f4AALPzAL9nFwC+aR0AAILoAAJK2gDD'+
          'ahcAAIXoAMFsHQDHbx0AJVSeAMtyHQDNcRoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAWzw8WxU8W1s8gYo8F1s8PC8WLy8WfS8WCi1uFi8vFi98fI9NfI+PDgVKVYmPfHyPS0dRYjoa'+
          'dIxkRGhfX0t+XxkJYFA+cDVnbIWRUhkZUlI0M20DhINrCB0dNxuNcjSNkJB/Cz9Ai1NhjkwlBjSQ'+
          'XmMyMEURJCQkJCQ2XQcsBDBlDSApeYaGhoaGE3hWH1mQc3McbxguLi4uLohJTgxzOEIgFFpxHh4e'+
          'Hk92IpJCQ5IQKDEPIYCAgICAQWk5EGlpdXUqXJKTe3d3ZitGgnVGghISVxISV1c9AjtUWFcSElcB'+
          'IyMBJyMBAUiHJiMjASMjegABegAAegAAPXoAenoAagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
        var a = document.createElement('a');
        a.className = 'favstar-link';
        a.innerHTML = '<span><i style=\'background-image: url("' + icon + '")\'></i><b>Favstar</b></span>';
        document.addEventListener('DOMNodeInserted', function (e) {
            if (e.target.nodeType != 1) {
                return;
            }
            var tweetActions = e.target.getElementsByClassName('tweet-actions');
            for (var i = -1, ta; ta = tweetActions[++i]; ) {
                var children = ta.childNodes;
                for (var j = -1, child; child = children[++j]; ) {
                    if (child.className == 'favstar-link') {
                        return;
                    }
                }
                var tweetId = ta.getAttribute('data-tweet-id');
                var screenName = ta.getElementsByClassName('reply-action')[0].getAttribute('data-screen-name');
                var aclone = a.cloneNode(true);
                aclone.addEventListener('click', function (e) { e.stopPropagation(); }, false);
                aclone.href = ['http://ja.favstar.fm/users', screenName, 'status', tweetId].join('/');
                ta.insertBefore(aclone, ta.firstChild);
            }
        }, false);
    } else { // Old Twitter case
        function addLinks(dom) {
            var entryDates = dom.getElementsByClassName('entry-date');
            for (var i = -1, edate; edate = entryDates[++i]; ) {
                var urls = edate.href.split('/');
                urls[0] = 'http:';
                urls[2] = 'favstar.fm/users';
                var span = document.createElement('span');
                span.innerHTML = ['[<a href="', urls.join('/'), '">favstar</a>]'].join('');
                edate.parentNode.appendChild(span);
            }
        }
        addLinks(document);
        document.addEventListener('AutoPagerize_DOMNodeInserted', function (e) {
            addLinks(e.target);
        }, false);
    }
})();
