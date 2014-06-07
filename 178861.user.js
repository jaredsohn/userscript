// ==UserScript==
// @name        Renderosity - Direct Image Links
// @namespace   http://userscripts.org/users/23652
// @description Makes the image links go directly to the large images
// @include     http://www.renderosity.com/mod/gallery/browse.php?*
// @include     http://www.renderosity.com/mod/gallery/search.php?*
// @copyright   JoeSimmons
// @version     1.0.3
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @require     https://github.com/joesimmons/jsl/raw/master/jsl.ajax.js
// @downloadURL http://userscripts.org/scripts/source/178861.user.js
// @updateURL   http://userscripts.org/scripts/source/178861.meta.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Make sure the page is not in a frame
if (window.self !== window.top) { return; }

JSL.runAt('interactive', function () {

    var rUrl = /url\(([^\)]+)/;
    var rId = /image_id=(\d+)/;
    var rSuffix = /\.(jpg|png|gif)$/;

    function getOtherFileTypes(url) {
        var suffixes = ['.jpg', '.png', '.gif'],
            thisSuffix = url.match(rSuffix)[1];

        suffixes.splice( suffixes.indexOf(thisSuffix), 1 );

        return suffixes;
    }

    function imgErrorHandler(event) {
        var element = event.target,
            img = JSL(element),
            thisUrl = img.attribute('src'),
            thisUrl, theseSuffixes, thisUrlNoSuffix;

        if (element.tagName === 'IMG') {
            // make a string of this url without the suffix
            thisUrlNoSuffix = thisUrl.replace(rSuffix, '');

            // make an array of possible file types, excluding this image's type
            theseSuffixes = getOtherFileTypes(thisUrl);

            // send requests for the other file types
            JSL.each(theseSuffixes, function (thisSuffix) {
                JSL.ajax(thisUrlNoSuffix + thisSuffix, {
                    method : 'HEAD',
                    context : img,
                    onload : function (resp) {
                        if (resp.status !== 404) {
                            this.parent('a').attribute('href', resp.url);
                            this.attribute('src', resp.url);
                        }
                    },
                });
            });
        }
    }

    // remove all the '(contains ***)' text
    JSL.addStyle('' +
        'i.text-warning, i.text-warning ~ br { ' +
            'display: none !important; ' +
        '}' +
    '');

    // make direct image links
    JSL('a[href*="image_id="] div.img-polaroid[style*="thumb_"]').each(function () {
        var theDiv = JSL(this),
            thisUrl = theDiv.attribute('style').match(rUrl);

        if ( thisUrl && ( thisUrl = thisUrl[1] ) ) { // note: intentional assignment
            // make the direct link
            thisUrl = thisUrl.replace('thumb_', 'file_');

            // set the direct url on the hyperlink
            theDiv.parent('a').attribute('href', thisUrl);

            // replace the div element that shows the thumbnail
            // with an <img> tag of the full image
            theDiv.replace('<img src="' + thisUrl + '" style="height: 200px; font-size: 20pt;" class="full_size" alt="[MISSING IMAGE]" />');
        }
    });

    // unblock content advisory images
    JSL('div.img-polaroid[style*="custom_advisory"]').each(function () {
        var theDiv = JSL(this),
            parentA = theDiv.parent('a'),
            thisId = parentA.attribute('href').match(rId),
            thisUrl;

        if (thisId && ( thisId = thisId[1] ) ) { // note: intentional assignment
            // create the image url from the image id and folder id
            thisUrl = 'http://www.renderosity.com/mod/gallery/media/folder_' + (parseInt(thisId.substring(0, 3), 10) + 1) + '/file_' + thisId + '.jpg';

            // set the direct url on the hyperlink
            parentA.attribute('href', thisUrl);

            // replace the div element that shows the thumbnail
            // with an <img> tag of the full image
            theDiv.replace('<img src="' + thisUrl + '" style="height: 200px; font-size: 20pt;" class="full_size" alt="[MISSING IMAGE]" />');
        }
    });

    JSL('img.full_size').addEvent('error', imgErrorHandler);

});