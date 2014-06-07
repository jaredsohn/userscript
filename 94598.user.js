//
// ==UserScript==
// @name          VkPopularMentionsHider
// @namespace     http://*.vkontakte.ru/
// @namespace     http://*.vk.com/
// @description   Hide Mentions and Popular tabs at newsfeed
// @include       http://*.vkontakte.ru/*
// @include       http://*.vk.com/*
// @include       http://vkontakte.ru/*
// @include       http://vk.com/*
// ==/UserScript==


(function() {
    function hide() {
        var xpath = document.evaluate('//div[@id="filter_popular"] | //div[contains(@onclick, "feed?section=popular")]', document, null, null,null);
        while(elem = xpath.iterateNext()) {
            elem.style.display = 'none';
        }
    }
    setInterval(function() {
        hide();
    }, 1000);
    hide();
})();
