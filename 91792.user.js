// ==UserScript==
// @name           GA Show Starred Profiles by Default
// @namespace      http://pa-th.net
// @author         Tharuka Pathirana (inspired by the Chris Egner's Show 100 script)
// @version        1.0
// @include        https://www.google.com/analytics/settings*
// ==/UserScript==

if ((window.location.href.match(/settings\/(\?|#|home)/) || window.location.href.match(/settings\/$/)) && !window.location.href.match(/filter=/) )  {
    if (!window.location.href.match(/scid=/)) {
        setTimeout(function () {
            var tables = document.getElementsByTagName('table');
            for (i=0; i<tables.length;i++) {
                if (tables[i].id.match(/^profile/)) {
                    tables[i].getElementsByClassName('gwt-Hyperlink')[0].firstChild.setAttribute("onClick",
                        "window.location = '" + tables[i].getElementsByClassName('gwt-Hyperlink')[0].firstChild.href.replace(/#/,'?').replace(/&/,'#')
                        + (window.location.hash ? "&filter=star'" : "#filter=star'") );
                    tables[i].getElementsByClassName('gwt-Hyperlink')[0].firstChild.href =
                        tables[i].getElementsByClassName('gwt-Hyperlink')[0].firstChild.href.replace(/#/,'?').replace(/&/,'#')
                        + (window.location.hash ? "&filter=star" : "#filter=star");
                }
            }
        },2000);
    } else {
        // document.getElementsByClassName('gami-profile-btns')[0].getElementsByTagName('a')[1].click();
        window.location.hash = window.location.hash ? window.location.hash + "&filter=star" : "filter=star";
    }
}