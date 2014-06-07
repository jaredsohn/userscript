// ==UserScript==
// @name           link_to_favstar_from_manamerit
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add links to Favstar from each quoted tweets on manamerit. / "さまざまなめりっと"で引用されている各つぶやきにFavstarへの個別リンクを付けます。
// @include        http://blog.livedoor.jp/manamerit/*
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
    icon.style.border = 0;
    var a = document.createElement('a');
    a.appendChild(icon); //document.createTextNode('star'));
    var br = document.createElement('br');
    var linksArray = new Array();
    var links = document.links;
    for (var i = 0; i < links.length; i++) {
        linksArray.push(links[i]);
    }
    for (var i = 0; i < linksArray.length; i++) {
        if (linksArray[i].innerHTML == 'link') {
            var spl = linksArray[i].href.split('/');
            spl[2] = 'ja.favstar.fm/users';
            var aclone = a.cloneNode(true);
            aclone.href = spl.join('/');
            var parent = linksArray[i].parentNode;
            parent.insertBefore(br.cloneNode(true), parent.firstChild);
            parent.insertBefore(aclone, parent.firstChild);
        }
    }
})();
