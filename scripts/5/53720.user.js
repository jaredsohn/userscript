// ==UserScript==
// @name           DPRAnnoyances
// @namespace      com.ap
// @include        http://forums.dpreview.com/*
// @include        http://www.dpreview.com/*
// ==/UserScript==

document.getElementById("wbContent").style.display="none";
document.getElementById("wbLoading").style.display="none";

function addTheme(gmTheme) {
        for (i in gmTheme.styles) {
            GM_addStyle(gmTheme.styles[i]);
        }
}

function GMTheme(name, styles){
    this.name=name;
    this.styles=styles;
}

GMTheme.HIDE_ANNOYANCES = new GMTheme("Default",[
        'div#wbLoading { display: none; }',
        'div#wbContent { display: none; }'
]);

addTheme(GMTheme.HIDE_ANNOYANCES);
