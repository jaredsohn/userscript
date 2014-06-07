// ==UserScript==
// @name        EP Status batch remover
// @namespace   org.upsuper.bangumi
// @include     http://bangumi.tv/subject/*
// @include     http://bgm.tv/subject/*
// @include     http://chii.in/subject/*
// @exclude     http://bangumi.tv/subject/*/*
// @exclude     http://bgm.tv/subject/*/*
// @exclude     http://chii.in/subject/*/*
// @version     1
// ==/UserScript==

(function () {
    var DELAY_TIME = 1000;
    function $(q) { return document.querySelector(q); }
    function $a(q) { return document.querySelectorAll(q); }
    if ($('.epStatusTool>a[id^="remove_"]')) {
        var $all = $('a.l[href$="/ep"]');
        var $rmall = document.createElement('a');
        $rmall.textContent = '[撤销]';
        $rmall.href = '#';
        $rmall.className = 'l';
        $rmall.addEventListener('click', function (evt) {
            evt.preventDefault();
            if (confirm('真的撤销所有观看状态吗？')) {
                var $remove = $a('.epStatusTool>a[id^="remove_"]');
                function removeNext(index) {
                    $remove[index].click();
                    setTimeout(function () {
                        index += 1;
                        if (index < $remove.length)
                            removeNext(index);
                    }, DELAY_TIME);
                }
                removeNext(0);
            }
        }, false);
        $all.parentNode.insertBefore($rmall, $all.nextSibling);
    }
})();
