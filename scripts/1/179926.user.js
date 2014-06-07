// ==UserScript==
// @name           Easy Flickr Download Fixed
// @version        1.2.2
// @namespace      http://www.facebook.com/codered.tr
// @copyright      Fixed and improved by Anwar Ben Tanfous @ http://www.freelancer.com/u/eagleeyez.html
// @copyright      Based on Tran Nguyen Hai Thanh Script @ http://twitter.com/CoderedTr
// @include        http://www.flickr.com/photos/*
// @grant         GM_addStyle
// ==/UserScript==

var url = window.location + "";


var rsTest = url.search('(flickr.com/photos)');
var original_check = document.getElementById("nav-bar-lightbox");


if (rsTest !== "-1" && original_check !== null) {

    var tmpVal;
    var tmpOriLink;
    var original_test = original_check.href + "";

    var linkSize = new Array();
    var sizeWidth = new Array();
    var images = document.getElementsByTagName('link');

    for (var i = 0; i < images.length; i++) {
        if (images[i].rel == "image_src") {
            var imageUrl = images[i].href;
            break;
        }

    }

    var original_check_2 = document.getElementsByTagName('option');
    for (var i = 0; i < original_check_2.length; i++) {
        if (original_check_2[i].value == "Original") {
            tmpOriLink = "original";
            break;
        }

    }


    var strImageUrl = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    strImageUrl = strImageUrl.split('_');

    var photoID = strImageUrl[0];


    GM_xmlhttpRequest({
        method: "GET",
        url: "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a92ca91f5ae7169183f07aa41c173b31&photo_id=" + photoID + "&format=json&nojsoncallback=1",

        onload: function(request) {

            var rspJson = JSON.parse(request.responseText);

            if (rspJson.stat == "ok") {
                for (var i = 0; i < rspJson.sizes.size.length; i++) {
                    var sizeImg = rspJson.sizes.size[i];

                    linkSize[i] = sizeImg.source + "";

                    if (linkSize[i].search("zz=1") != "-1") {

                        oldLink = linkSize[i].split(".jpg?zz=1");
                        linkSize[i] = oldLink[0] + "_d.jpg?zz=1";

                    }
                    else {

                        linkSize[i] = linkSize[i].substr(0, linkSize[i].length - 4) + "_d.jpg";
                        sizeWidth[i] = sizeImg.width + "";
                    }

                }

                var numLink = linkSize.length - 1;

                function addButton(textName, numImgLink) {

                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    var span = document.createElement('span');

                    li.appendChild(a);
                    a.appendChild(span);
                    document.getElementById('button-bar').insertBefore(li, document.getElementById('button-bar-options').parentNode.nextSibling);

                    a.setAttribute('class', 'Butt ywa-track');
                    a.setAttribute('href', linkSize[numImgLink]);
                    span.appendChild(document.createTextNode(textName));

                }


                if (linkSize[numLink].search("o_d.jpg") !== -1 && sizeWidth[numLink] !== sizeWidth[numLink - 1]) {

                    addButton("Original", numLink);
                    addButton("Download", numLink - 1);
                    tmpVal = "original";

                } else if (linkSize[numLink].search("o_d.jpg") !== -1 && sizeWidth[numLink] == sizeWidth[numLink - 1]) {

                    addButton("Download", numLink);
                    tmpVal = "original";
                }

                if (tmpOriLink == "original" && tmpVal !== "original") {


                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    var span = document.createElement('span');

                    li.appendChild(a);
                    a.appendChild(span);
                    document.getElementById('button-bar').insertBefore(li, document.getElementById('button-bar-options').parentNode.nextSibling);

                    if (tmpOriLink == "original" && original_test.search("sizes/l/") != "-1") {
                        original_test = original_test.split("sizes/l/");
                        original_test = original_test[0] + "sizes/o/" + original_test[1];
                    }

                    a.setAttribute('class', 'Butt ywa-track');
                    a.setAttribute('href', original_test);
                    span.appendChild(document.createTextNode("Original"));

                }

                if (linkSize[numLink].search("o_d.jpg") == -1) {

                    addButton("Download", numLink);
                }
				linkSize = null;
				sizeWidth = null;
            }
        }
    });
}
GM_addStyle(".super-liquid.extras #nav-bar-lightbox {    background-position: -4px -634px;} .super-liquid.extras #nav-bar-lightbox { bottom: 0; opacity: 1; right: 0; top: 0;} .yui3-popover-arrow {display: none;}");