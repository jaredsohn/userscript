// ==UserScript==
// @name           Forum Sorter
// @namespace      http://blog.ksmaze.com
// @description    Do autosort by method
// @version 2.5
// @userscript  http://userscripts.org/scripts/show/102700
// @include        *forumdisplay*
// @include        *forum-*
// ==/UserScript==
function init() {
    var tmp = GM_getValue('autosort');
    if (!tmp)
        tmp = 'd';
    GM_setValue('autosort', window.prompt('Enter the method of sort \n d = date \n r = latest reply \n vt = view times\n rt = reply times', tmp).toLowerCase());
}

function valid() {
    var copyright = document.getElementById("copyright");

    if (copyright != null) {
        if (copyright.innerHTML != null)
            copyright = copyright.innerHTML;
		if (copyright.innerText != null)
            copyright = copyright.innerText;
        if (copyright.indexOf("Discuz! X2") > -1){
            return 4;
        } else if (copyright.indexOf("Discuz! X") > -1) {
            return 1;
        } else if (copyright.indexOf("Discuz") > -1) {
            return 2;
        } else if (copyright.indexOf("vBulletin") > -1) {
            return 3;
        }
    } else {
        var k_metas = document.getElementsByTagName("meta");
        for (var i = 0; i < k_metas.length; i++) {
            if (k_metas[i].content.indexOf("Discuz! X2") > -1){
                return 4;
            } else if (k_metas[i].content.indexOf("Discuz! X") > -1) {
                return 1;
            } else if (k_metas[i].content.indexOf("Discuz!") > -1) {
                return 2;
            } else if (k_metas[i].content.indexOf("vBulletin") > -1) {
                return 3;
            }
        }
        var k_typetext = document.body.innerText;
        if (k_typetext.indexOf("Discuz! X2") > -1){
            return 4;
        } else if (k_typetext.indexOf("Discuz! X") > -1) {
            return 1;
        } else if (k_typetext.indexOf("Discuz!") > -1) {
            return 2;
        } else if (k_typetext.indexOf("vBulletin") > -1) {
            return 3;
        }
    } 
    return 0;
}

function defaultsort() {
    var target_href = document.location.href;
    var method = GM_getValue('autosort');
    var sort_method = "dateline";
    switch (method) {
    case 'd':
        sort_method = "dateline";
        break;
    case 'r':
        sort_method = "lastpost";
        break;
    case 'vt':
        sort_method = "views";
        break;
    case 'rt':
        sort_method = "replies";
        break;
    }
    var pattern = new RegExp("(.*/)forumdisplay[.]php[?]fid=([0-9]+)$", "i");
    var query = '&filter=0&orderby=' + sort_method + '&ascdesc=DESC';
    var pre_com = "forumdisplay.php?fid=";
    var validtype = valid();
    switch (validtype) {
    case 1:
        if (target_href.indexOf("forumdisplay") > -1)
            pattern = new RegExp("(.*/)forumdisplay[.]php[?]fid=([0-9]+)&?$", "i");
        else if (target_href.indexOf("forum-") > -1)
            pattern = new RegExp("(.*/)forum-([0-9]+)-[0-9]+[.]html$", "i");
        pre_com = "forum-forumdisplay-fid-";
        query = '-filter-author-orderby-' + sort_method + '.html';
        break;
    case 2:
        if (target_href.indexOf("forumdisplay") > -1)
            pattern = new RegExp("(.*/)forumdisplay[.]php[?]fid=([0-9]+)&?$", "i");
        else if (target_href.indexOf("forum-") > -1)
            pattern = new RegExp("(.*/)forum-([0-9]+)-[0-9]+[.]html$", "i");
        pre_com = "forumdisplay.php?fid=";
        query = '&filter=0&orderby=' + sort_method + '&ascdesc=DESC';
        break;
    case 3:
        pattern = new RegExp("(.*/)forumdisplay[.]php[?]f=([0-9]+)$", "i");
        pre_com = "forumdisplay.php?f=";
        query = '&pp=20&sort=' + sort_method + '&order=desc&daysprune=-1';
        break;
    case 4:
        if (target_href.indexOf("forumdisplay") > -1)
            pattern = new RegExp("(.*/)forumdisplay[.]php[?]fid=([0-9]+)&?$", "i");
        else if (target_href.indexOf("forum-") > -1)
            pattern = new RegExp("(.*/)forum-([0-9]+)-[0-9]+[.]html$", "i");
        pre_com = "forum.php?mod=forumdisplay&fid=";
        query = '&filter=author&&orderby=' + sort_method;
        break;
    default:
        return;
    }
    if (pattern.test(target_href)) {
        window.setTimeout(function () {
                var base_url = pattern.exec(target_href)[1];
                var id = pattern.exec(target_href)[2];
                location.href = base_url + pre_com + id + query;
            }, 1000);
    }
}

defaultsort();
GM_registerMenuCommand('Autosort method', init);
