// ==UserScript==
// @name           Facebook Timeline Remover
// @namespace      Iguessyuhknowmeh
// @description    Share it With Your friends & family .
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
// Version 2011.12.25




if (typeof (GM_addStyle) == 'undefined') {
    function GM_addStyle(styles) {
        var S = document.createElement('style');
        S.type = 'text/css';
        var T = '' + styles + '';
        T = document.createTextNode(T);
        S.appendChild(T);
        document.body.appendChild(S);
        return;
    }
}

GM_addStyle("#pagelet_side_ads { display: none;}");
GM_addStyle("#fbTimelineSideAds { display: none;}");
GM_addStyle("#ego_column { display: none;}");
GM_addStyle("#ego_section { display: none;}");
GM_addStyle("#ego_unit { display: none;}");