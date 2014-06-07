// ==UserScript==
// @name         deck view: link to mkm/mcm when clicking on card image
// @description  magiccards.info
// @version      0.0.1
// @icon         https://raw2.github.com/solygen/userscripts/master/doc/icon/icon_032.png
// @namespace    https://github.com/solygen/userscripts
// @repository   https://github.com/solygen/userscripts.git
// @license      MIT
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
//
// @include      http://magiccards.info/*.html
// @include      http://magiccards.info/query?*
//
// @updateURL    https://rawgithub.com/solygen/userscripts/master/scripts-min/magiccards.info/detail-view-min.user.js
// @downloadURL  https://rawgithub.com/solygen/userscripts/master/scripts-min/magiccards.info/detail-view-min.user.js
// @homepage     https://github.com/solygen/userscripts
//
// ==/UserScript==

(function () {

    'use strict';

    var cardname, images, container, link,
        url = ((navigator.language || navigator.userLanguage) === 'de' ? 'http://www.magickartenmarkt.de' : 'http://www.magiccardmarket.eu'),
        query = '/?mainPage=showSearchResult&searchFor=',
        getImages = function () {
            var list = document.getElementsByTagName('img'),
                images = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].getAttribute('src').indexOf('jpg') >= 0) {
                    images.push(list[i]);
                }
            }
            return images;
        },
        // copyToClipboard = function () {
        //     window.prompt ('Copy to clipboard: Ctrl+C, Enter', name);
        // },
        enter = function () {
                this.setAttribute('style', 'opacity: 0.90; border: 1px solid black');
            },
        leave = function () {
                this.setAttribute('style', 'opacity: 1; border: 1px solid black');
            };

    //get image
    images = getImages();

    //process each card image
    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        //add hover effect
        $(image).hover(enter, leave);

        //gather data
        cardname = image.getAttribute('alt');
        container = image.parentNode;

        //create link and flag url for mkm/mcm user script
        link = document.createElement('a');
        link.href = url + query + cardname + '&redirect=true&referrer=solygen';
        link.title = url;

        //create dom hierarchy (container > link > image)
        link.appendChild(image);
        container.appendChild(link);
    }

    // in case you would leave this field blank, please add my username. There are absolutly no disadvantages for you.
    if ($('input[name="reg_referrer"]').length) {
        var input = $('input[name="reg_referrer"]');
        input.val('solygen');
    }

})();