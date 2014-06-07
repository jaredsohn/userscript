// ==UserScript==
// @name Yahoo Mail Cleanup
// @description Clean up the new Yahoo Mail to maximize the viewing space.
// @namespace
// @include http://*.mail.yahoo.com/neo/*
// @include https://*.mail.yahoo.com/neo/*
// @match http://*.mail.yahoo.com/neo/*
// @match https://*.mail.yahoo.com/neo/*
// @author WankaUSR
// @version 1.2.2
// @date 2014-4-17
// ==/UserScript==

(function () {

//updated 17 Apr 2014

add = document.getElementById("theAd");
add.parentNode.removeChild(add);

main = document.getElementById("shellcontent");
main.setAttribute("style", "width: 86%;");
main.addEventListener ('DOMAttrModified', OnAttrModified, false);

document.styleSheets[document.styleSheets.length -1].insertRule("#slot_MB { display:none;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#slot_mbrec { display:none;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#yucs-top-bar { display:none;}", 0);

//2011
document.styleSheets[document.styleSheets.length -1].insertRule("#uh h1 { display:none;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#yuhead-promo { display:none;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#trendmastr-main { display:none;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh .upsell { display:none ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh div.right { right:13% ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh .links { right:-145px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh #search { margin-top:0px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh #search { display:none ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#yuhead-search { margin-top:0px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".nav-bar { top:40px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #main { top:70px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #shellnavigation { top:105px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #shellcontent { top:105px;right:0px; !important}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #toolbar { width: 100%;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".fresh-toolbar { width: 100%;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll .withouttoolbar #shellcontent { top:70px;}", 0);

function OnAttrModified (event) {

            if ('attrChange' in event) {
                switch (event.attrChange) {
                case MutationEvent.MODIFICATION:
					document.getElementById("shellcontent").setAttribute("style", "width: 86%;");
                    break;

                };
            }
        }

})();