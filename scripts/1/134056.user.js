// ==UserScript==
// @name        Facebook Gif animator
// @namespace   http://resesona.wordpress.com
// @author      Alberto Res <albertoxm@gmail.com>
// @description Shows animated Gifs on comments instead of a static ones
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @version     1.12
// ==/UserScript==
(function(d) {
    
    var css = ".uiStreamAttachments .external img{max-height:280px; max-width:280px;} .externalShareImage .img{max-height:240px; max-width:240px;}";
    
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }

    function replace(elements)
    {
        var allimgGif, thisDiv, postGif, originalURL, extension;

        allimgGif = document.evaluate(
        "//a[@class='external UIImageBlock_Image UIImageBlock_MED_Image']",
        elements,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

        for (var i = 0; i < allimgGif.snapshotLength; i++) {
                thisDiv = allimgGif.snapshotItem(i);
                originalURL = thisDiv.href;
                extension = originalURL.substring(originalURL.length-3,originalURL.length);
                if (extension == 'gif'||extension == 'GIF') {
                    thisDiv.children[0].src = originalURL;
                }
            }

        postGif = document.evaluate(
        "//a[@class='externalShareUnit hasImage']",
        elements,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

        for (var i = 0; i < postGif.snapshotLength; i++) {
                thisDiv = postGif.snapshotItem(i);
                originalURL = thisDiv.href;
                extension = originalURL.substring(originalURL.length-3,originalURL.length);
                if (extension == 'gif'||extension == 'GIF') {
                    thisDiv.children[0].children[0].src = originalURL;
                }
            }
    }
    
    var content = d.getElementById('content');
    replace(content);
    
    function afterDomNodeInserted(e)
    {
        target = e.target;

        if ((target.nodeName == 'LI') ||
            (target.nodeName == 'DIV') ||
            (target.nodeName == 'UL')
        ) {
            replace(target);
        }

        return false;
    }


    function photoBoxUpdated(e)
    {
        target = e.relatedNode;

        if (target.id == 'fbPhotoSnowboxFeedback') {
            replace(g(
                '#fbPhotoSnowboxCaption, span.commentBody',
                d.getElementById('fbPhotoSnowbox')
            ));
        }

        return false;
    }

    window.setTimeout(function () {
        d.addEventListener(
            'DOMNodeInserted',
            afterDomNodeInserted,
            false
        );

        if (!!(PhotoBox = d.getElementById('fbPhotoSnowbox'))) {
            PhotoBox.addEventListener(
                'DOMNodeInserted',
                photoBoxUpdated,
                false
            );
        }

    }, 2000);

})(document);