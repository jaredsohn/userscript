// ==UserScript==
// @name           togetter_to_favstar
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Link each posts on Togetter to Favstar. / Togetter上の各ポストをFavstarへリンクします。
// @include        http://togetter.com/li/*
// ==/UserScript==
(function () {
    var icon = document.createElement('img');
    icon.src = 'data:image/x-icon;base64,'+
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
    icon.style.paddingRight = '2px';
    var abase = document.createElement('a');
    abase.appendChild(icon);
    var statusNodes = document.getElementsByClassName('tweet_box')[0].getElementsByClassName('status');
    for (var i = 0; i < statusNodes.length; i++) {
        var linkNode = statusNodes[i].getElementsByTagName('a')[0];
        var statusLink = linkNode.href.split('/');
        statusLink[2] = 'favstar.fm/users';
        var a = abase.cloneNode(true);
        a.href = statusLink.join('/');
        statusNodes[i].insertBefore(a, linkNode);
    }
})();
