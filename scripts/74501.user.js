// ==UserScript==
// @name           mixi_voice_filter
// @version        1.2.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    mixiボイスから指定したユーザの書き込みを取り除きます
// @include        http://mixi.jp/
// @include        http://mixi.jp/home.pl*
// @include        http://mixi.jp/recent_voice.pl*
// ==/UserScript==
(function () {
    var filterList = ["アリス", "ボブ"]; // 発言消したい人のニックネーム一覧
    
    if (location.href.indexOf('http://mixi.jp/recent_voice.pl') == 0) {
        // mixiボイス画面の処理
        var voices = document.getElementsByClassName('archive');
        var voiceNum = voices.length;
        
        var filtered = [];
        for (var i = 0; i < voiceNum; i++) {
            if (filterList.indexOf(voices[i].getElementsByClassName("nickname")[0].value) != -1) {
                filtered.push(voices[i]);
            }
        }
        filtered.forEach(function (e) e.style.display = 'none');
        var li = document.createElement('li');
        li.innerHTML = (voiceNum - filtered.length) + '/' + voiceNum;
        li.style.fontWeight = 'bold';
        li.addEventListener('click', function (e) {
            e.preventDefault();
            var oldStyle = filtered[0].style.display;
            var newStyle = (oldStyle == 'none') ? 'block' : 'none';
            for (var i = 0; i < filtered.length; i++) {
                filtered[i].style.display = newStyle;
            }
            li.innerHTML = (voiceNum - (oldStyle == 'none' ? 0 : filtered.length)) + '/' + voiceNum;
        }, false);
        var ul = document.getElementsByClassName('selectTab02')[0].getElementsByTagName('ul')[0];
        ul.insertBefore(li, ul.firstChild);
    } else {
        // ホーム画面の処理
        var voices = document.getElementsByClassName('voiceList')[0].getElementsByClassName('commentRow');
        for (var i = 0; i < voices.length; i++) {
            if (filterList.indexOf(voices[i].getElementsByClassName('name')[0].textContent) != -1) {
                voices[i].style.display = 'none';
            }
        }
    }
})();
