// ==UserScript==
// @name          vk-fix-width
// @description   When Opera window is scaled, VK.com/vkontakte.ru layout is wrong (wide margins, horizontal scroll). VK layout scripts use window.innerWidth, which gives bad result when Opera window is scaled. This script should fix this.
// @author        konstantin.pelepelin
// @include       http://vkontakte.ru/*
// @include       http://vk.com/*
// ==/UserScript==

(function () {
    var modifyOnBodyResize = function (e) {
        if (e.element.text.search(/onBodyResize/) !== -1) {
            e.element.text = e.element.text.replace(/w(?:indow)?\.innerWidth/g , '(0)').replace(/w(?:indow)?\.innerHeight/g , '(0)');
        }
    };

    window.opera.addEventListener('BeforeScript', modifyOnBodyResize, false);
})();

