// ==UserScript==
// @name                DC ImagePreview
// @namespace           http://jihoonc.pe.kr
// @description         Show image thumbnails on DCinside gallery list pages.
// @include             http://*dcinside.com/*
// ==/UserScript==

dc_previewimage = {
    init : function() {
        var snapResults = document.evaluate("//a[contains(@href, '/list.php?id=')]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
            var elm = snapResults.snapshotItem(i);
            if (elm.href.match("view_comment") != null) {
                continue;
            }
            dc_previewimage.get_link(elm);
        }
    },

    get_link : function (elm) {
        GM_xmlhttpRequest ({
            method: 'GET',
            url: elm.href,
            onload: function (responseDetails) {
                //console.log ('Request for '+elm.href+' returned ' + responseDetails.status + ' ' + responseDetails.statusText);
                dc_previewimage.process_page(responseDetails.responseText, elm);
            }
        });
    },

    process_page : function(html, elem) {
        var imagesRegex = new RegExp("<img[^>]+src=([^>\\s]+)", "gi");
        var imageLink;
        while (1) {
            imageLink = imagesRegex.exec(html);
            if (imageLink == null) {
                break;
            }
            if (imageLink[1].match("wstatic.dcinside.com")) {
                continue;
            }
            if (imageLink[1].match("dclogo.jpg")) {
                continue;
            }
            if (imageLink[1].match("bt_scrap.gif")) {
                continue;
            }
            if (imageLink[1].match("but_fav_gall")) {
                continue;
            }
            if (imageLink[1].match("images/fav_selector.gif")) {
                continue;
            }
            if (imageLink[1].match("static/skin")) {
                continue;
            }
            if (imageLink[1].match("zzbang.dcinside.com")) {
                // default zzalbang
                continue;
            }
            elem.innerHTML += "&nbsp;<img src=" + imageLink[1] + " height='40px' border='0px'/>&nbsp;";
        }
    }
};

dc_previewimage.init();
