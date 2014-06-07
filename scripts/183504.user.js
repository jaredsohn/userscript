// ==UserScript==
// @name       Obrus!
// @version    0.5
// @description  Librus w obrusie
// @match      https://dziennik.librus.pl/*
// @copyright  2012+, You
// ==/UserScript==
unsafeWindow.lama = function () {
    document.title = "OBRUS - e-Dziennik";
    setTimeout(function () {
        $("#snHeadLogo").each(function () {
            var current = $(this);
            current.attr('src', "https://i.imgur.com/XqYgYS1.png");
            return false;
        });
    }, 100);
};
setInterval(function () {
    lama();
}, 1);