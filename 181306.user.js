// ==UserScript==
// @name        Release24.pl Helper
// @version     0.2
// @include     http://release24.pl/*
// @description Adds links next to episode description for quick search on The Pirate Bay and for copying raw episode number
// ==/UserScript==
(function () {
    var elements = document.querySelectorAll('.wpis .seriale');
    for (var i = 0; i < elements.length; i++) {
        var episodeText = elements[i].firstElementChild.text,
        matches = episodeText.match(/\"(.*)\" \[(.*)\](.*)/i);
        episodeTitle = matches[1] + ' ' + matches[2];
        var el = document.createElement('a');
        el.setAttribute('href', 'javascript:void(0)');
        el.setAttribute('style', 'display: inline; color: #FF7E00 !important; font-size: 11px;');
        el.innerHTML = '&nbsp;[# Kopiuj do schowka #]';
        el.addEventListener('click', function () {
            var episodeText = this.parentNode.firstElementChild.text,
            matches = episodeText.match(/\"(.*)\" \[(.*)\](.*)/i);
            episodeTitle = matches[1] + ' ' + matches[2]
            window.prompt('Skopiuj do schowka: ', String(episodeTitle));
        });
        var tpbButton = document.createElement('a');
        tpbButton.setAttribute('href', 'http://thepiratebay.se/search/' + escape(episodeTitle));
        tpbButton.setAttribute('target', '__blank');
        tpbButton.setAttribute('style', 'display: inline; color: #FF7E00 !important; font-size: 11px;');
        tpbButton.innerHTML = '&nbsp;[# Szukaj na TPB #]';
        elements[i].appendChild(tpbButton);
        elements[i].appendChild(el);
    }
}());
