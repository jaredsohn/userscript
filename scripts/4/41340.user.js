// ==UserScript==
// @name            One DRL One Domain
// @namespace       http://rainux.org/
// @description     DRL 域名太多，hxxp 和 _http 链接又非常流行，导致论坛的镜像自动识别功能基本用不上。此脚本会自动将其它镜像域名的 URL 重定向到某个常用域名上。
// @include         https://d4e.org/*
// @include         https://cnc.d4e.org/*
// @include         https://sh.d4e.org/*
// @include         https://www.d4e.org/*
// @include         https://dream4ever.org/*
// @include         https://c.dream4ever.org/*
// @include         https://cnc.dream4ever.org/*
// @include         https://cnc2.dream4ever.org/*
// @include         https://cnc2.mirror.dream4ever.org/*
// @include         https://cs.dream4ever.org/*
// @include         https://mirror.dream4ever.org/*
// @include         https://sc.dream4ever.org/*
// @include         https://sh.dream4ever.org/*
// @include         https://www.dream4ever.org/*
// ==/UserScript==

(function() {
    var drlDomain;
    drlDomain = GM_getValue('drlDomain', undefined);

    if (!drlDomain) {
        drlDomain = 'www.d4e.org';
        GM_setValue('drlDomain', drlDomain);
    }

    if (window.location.hostname != drlDomain) {
        window.location.hostname = drlDomain;
        return;
    }
}
)();
