// ==UserScript==
// @name           Add_calil's_link_to_amazon's_link
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    Amazonの書籍リンクにカーリルのリンクもくっつける
// @include        http*://*
// @exclude        http://www.amazon.co.jp/*
// @exclude        http://calil.jp/*
// @version        1.0
// ==/UserScript==

(function() {
    function $x(exp) {return document.evaluate(exp,document,null,7,null);}
    var link = $x('//a[contains(@href, "http://www.amazon.co.jp/")]');
    var amazon_link;
    var isbn_bk = 0;
    var isbn;
    for (var i=0; i<link.snapshotLength; i++) {
        amazon_link = link.snapshotItem(i);
        if (amazon_link.href.match(/\/([0-9]{9}[0-9X])([^0-9A-Z]|$)/)) {
            isbn = RegExp.$1;
            if (isbn_bk != isbn) {
                isbn_bk = isbn;
                
                var img = document.createElement('img');
                var calil_link = document.createElement('a');
                
                calil_link.href = 'http://calil.jp/book/' + isbn;
                calil_link.target = "_blank";
                
                //img.src = "http://gae.calil.jp/public/img/run.gif";
                img.src = "data:image/gif;base64,R0lGODdhDwAPAOfXAAAAADMAAGYAAJkAAMwAAP8AAAAzADMzAGYzAJkzAMwzAP8zAABmADNmAGZmAJlmAMxmAP9mAAC"
                         +"ZADOZAGaZAJmZAMyZAP%2BZAADMADPMAGbMAJnMAMzMAP%2FMAAD%2FADP%2FAGb%2FAJn%2FAMz%2FAP%2F%2FAAAAMzMAM2YAM5kAM8wAM%2F8AM"
                         +"wAzMzMzM2YzM5kzM8wzM%2F8zMwBmMzNmM2ZmM5lmM8xmM%2F9mMwCZMzOZM2aZM5mZM8yZM%2F%2BZMwDMMzPMM2bMM5nMM8zMM%2F%2FMMwD%2FM"
                         +"zP%2FM2b%2FM5n%2FM8z%2FM%2F%2F%2FMwAAZjMAZmYAZpkAZswAZv8AZgAzZjMzZmYzZpkzZswzZv8zZgBmZjNmZmZmZplmZsxmZv9mZgCZZjOZZ"
                         +"maZZpmZZsyZZv%2BZZgDMZjPMZmbMZpnMZszMZv%2FMZgD%2FZjP%2FZmb%2FZpn%2FZsz%2FZv%2F%2FZgAAmTMAmWYAmZkAmcwAmf8AmQAzmTMzm"
                         +"WYzmZkzmcwzmf8zmQBmmTNmmWZmmZlmmcxmmf9mmQCZmTOZmWaZmZmZmcyZmf%2BZmQDMmTPMmWbMmZnMmczMmf%2FMmQD%2FmTP%2FmWb%2FmZn%2"
                         +"Fmcz%2Fmf%2F%2FmQAAzDMAzGYAzJkAzMwAzP8AzAAzzDMzzGYzzJkzzMwzzP8zzABmzDNmzGZmzJlmzMxmzP9mzACZzDOZzGaZzJmZzMyZzP%2BZz"
                         +"ADMzDPMzGbMzJnMzMzMzP%2FMzAD%2FzDP%2FzGb%2FzJn%2FzMz%2FzP%2F%2FzAAA%2FzMA%2F2YA%2F5kA%2F8wA%2F%2F8A%2FwAz%2FzMz%2F"
                         +"2Yz%2F5kz%2F8wz%2F%2F8z%2FwBm%2FzNm%2F2Zm%2F5lm%2F8xm%2F%2F9m%2FwCZ%2FzOZ%2F2aZ%2F5mZ%2F8yZ%2F%2F%2BZ%2FwDM%2FzPM%"
                         +"2F2bM%2F5nM%2F8zM%2F%2F%2FM%2FwD%2F%2FzP%2F%2F2b%2F%2F5n%2F%2F8z%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAA"
                         +"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                         +"AAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFEADYACwAAAAADwAPAAAISwCvCbx2oeDAgwgjXIhwcOEFhA4dIhz4MKLCi"
                         +"QsJKnTI8OBGhR8NNmRYcGNGjBYfTtRYcuVIkRtXcnTZsKBKmtEcRqMpUCLNjwcDAgAh%2BQQFEADYACwBAAAADgAPAAAIXQCxCRyI7UKECwQLErzGs"
                         +"OG1CwYTFowoEGK0iQcNQhSYUaPHiRc9ZoxwDdtBbA5LZoy2kaBIlA4HjqwosWAEmCYRonR5kyHECxcTRrzWsebQgzeFHmy4MaVDjTcDAgAh%2BQQFE"
                         +"ADYACwBAAAADgAPAAAIVgCxCRx4raDBg9cGKrwQ4cJBhQIRFrwgsCFDhw8jXLvIMGJBbBYbhryAUWBHkhY7YjuIsiVBgyBJrpQI0%2BJHkhJjaqRpk"
                         +"CROnteixYwGdGNDmBBDHgwIACH5BAUQANgALAIAAAANAA8AAAhWALFdiIDtmsGDBwVeuFAQYUKC2CI6RLgwYoSJCRVewHhNIcFoExdGWDgR20iIDRF"
                         +"q7HiSYUSLAzuaVBlR5DWRL19Gs7nQZU6FIEf%2BFHjR4MJoKUNCDAgAOw%3D%3D";
                img.title = "カーリルで図書館の蔵書検索"
                img.setAttribute('style', 'border-style:none;'); 
                
                calil_link.appendChild(img);
                //amazon_link.parentNode.insertBefore(calil_link, amazon_link.nextsibling);
                amazon_link.appendChild(calil_link);
            }
        }
    }
})();
