// ==UserScript==
// @name            XKCD title revealer, clean and simple.
// @namespace       http://xkcd.com/
// @author          ScriptKeeper
// @description     Adds the comic title, below the image, and styles it with CSS... It deliberately does not kill the mouseover text.
// @include         http://xkcd.com/*
// @include         http://www.xkcd.com/*
// ==/UserScript==
//

//window.addEventListener ("load", tweakTheSite_Main, false);
tweakTheSite_Main ();

function tweakTheSite_Main () {
    /*--- The Page is now FUBAR'd.  The title jumps around.  Sometimes it's
        in an img tag, and sometimes a div.  The structure varies as well.
    */
    var zContNode;
    var sTitle          = "**Page layout changed!**";
    var zPayloadImg     = document.querySelector ("#comic > img");
    if (zPayloadImg) {
        sTitle          = zPayloadImg.title  ||  sTitle;
        zContNode       = zPayloadImg.parentNode;
    }
    else {
        zPayloadImg     = document.querySelector ("#comic > a > img");
        if (zPayloadImg) {
            sTitle      = zPayloadImg.title  ||  sTitle;
            zContNode   = zPayloadImg.parentNode.parentNode;
        }
        else {
            var zCoverDiv   = document.querySelector ("div.comic > div.cover");
            if (zCoverDiv) {
                sTitle      = zCoverDiv.title  ||  sTitle;
                zContNode   = zCoverDiv.parentNode;
            }
        }
    }

    if (zContNode) {
        var zTitleDiv   = document.createElement ("div");
        zTitleDiv.appendChild  (document.createTextNode (sTitle) );
        zTitleDiv.setAttribute ('class', 'imageCaption');

        insertAfter (zTitleDiv, zContNode);
    }
    else {
        alert ("From GM: Page layout busted again.");
    }
}


/*--- Standard DOM utility function:
*/
function insertAfter (newElement, targetElement) {
    var parent  = targetElement.parentNode;
    if (parent.lastChild == targetElement)
        parent.appendChild  (newElement);
    else
        parent.insertBefore (newElement, targetElement.nextSibling);
}


GM_addStyle (
    ".imageCaption {                    \
        font-family:    arial;          \
        font-size:      18px;           \
        font-variant:   normal;         \
        line-height:    150%;           \
        margin:         1em 0 0 2em;    \
        padding:        0;              \
        text-align:     left;           \
    }"
);
