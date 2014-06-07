// ==UserScript==
// @name           favstar_auto_retry_faving
// @namespace      http://d.hatena.ne.jp/phithon/
// @version        1.0.0
// @description    Hide delay alert and retry faving automatically. / Favstarの連続ふぁぼ時の警告を隠し、自動でリトライします。
// @include        http://favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://es.favstar.fm/*
// @include        http://ja.favstar.fm/*
// ==/UserScript==
(function () {
    location.href = 'javascript:void (' + function () {
        slow_down_your_faving = function (id) {
            setTimeout(function () {
                new Ajax.Request('/tweets/' + id + '/fav', {
                  asynchronous : true,
                  evalScripts : true,
                  method : 'post',
                  parameters : 'authenticity_token=' + encodeURIComponent(fs_form_authenticity_token)
                });
            }, 1000);
        }
    } + ')()';
})();
