// ==UserScript==
// @name           Spiegel.de Fotostrecke Auf Einer Seite
// @namespace      https://github.com/muescha/SpiegelDeFotostrecke
// @description    Zeigt die Fotostrecke auf einer Seite an.
// @include        http://www.spiegel.de/fotostrecke/*
// @version        1.3
// ==/UserScript==

window.spiegelDeFotostrecke = {

    genImageId:function (imageId) {
        return "image" + imageId;
    },

    getImage:function (imageId, url) {
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          onload: function(response) {
              spiegelDeFotostrecke.extractImage(imageId, response.responseText);
          }
        });
    },

    extractImage:function (imageId, html) {

        var htmlImage       = html.replace(/(\r|\n)/g, '').replace(/^.+<div class="biga-image" style="width:\d*px;">(.+?)<\/div>.+/, '$1');

        // Ziemlich unscharfer Selektor, aber es scheint tatsächlich nur ein <p> im Dokument zu geben
        var htmlDescription = html.replace(/(\r|\n)/g, '').replace(/^.+<p>(.+?)<\/p>.+/, '$1');

        var divImage = document.createElement('div');
        divImage.innerHTML = htmlImage;
        var image = divImage.getElementsByTagName("img")[0];

        var div = document.getElementById(spiegelDeFotostrecke.genImageId(imageId));
        div.style.textAlign = "center";
        div.style.marginTop = "50px";
        div.innerHTML = "<p><strong>Nr. " + imageId + "</strong></p>" + htmlDescription;
        div.insertBefore(image, div.getElementsByTagName("p")[0]);

    },

    getPageInfo:function () {
        var insertBeforeElement = document.getElementsByClassName("biga-nav-after")[0];
        var vonBisText          = document.getElementsByClassName("biga-control")[0].textContent.replace(/(\r|\n|\s)/g, '');
        var currentPage         = vonBisText.replace(/(\d*)von(.\d*)/, '$1') - 0;
        var maxPages            = vonBisText.replace(/(\d*)von(.\d*)/, '$2') - 1;
        var url                 = document.location.href;

        return {
            insertBeforeElement : insertBeforeElement,
            currentPage         : currentPage,
            maxPages            : maxPages,
            url                 : url
        };
    },

    init:function () {
        var pageInfo = spiegelDeFotostrecke.getPageInfo();

        if (pageInfo.currentPage == 1) {

            for (var imageId = 2; imageId < pageInfo.maxPages + 2; imageId++) {

                var div = document.createElement('div');
                div.id = spiegelDeFotostrecke.genImageId(imageId);
                pageInfo.insertBeforeElement.parentNode.insertBefore(div, pageInfo.insertBeforeElement);

                var newUrl = pageInfo.url.replace(/\.html/g, "-" + imageId + ".html");
                spiegelDeFotostrecke.getImage(imageId, newUrl);

            }

        } else {
            console.log("not on page 1!");
        }

    }
};

spiegelDeFotostrecke.init();
