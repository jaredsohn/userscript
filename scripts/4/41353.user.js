// ==UserScript==
// @name          livedoor Reader extensions
// @namespace     http://userstyles.org
// @description   libedoor Reader extensions
// @author        drry
// @include       http://reader.livedoor.com/reader/
// @modifiedby    gotin
// ==/UserScript==
var css =
<><![CDATA[
@namespace url(http://www.w3.org/1999/xhtml);
ins > p,
ins > div,
ins > blockquote,
ins > dl,
ins > ol,
ins > ul,
ins > table {
 background: rgb(224, 255, 224);
 padding:5px;
}
ins > p::before,
ins > div::before,
ins > blockquote::before,
ins > dl::before,
ins > ol::before,
ins > ul::before,
ins > table::before {
 font-size: smaller;
 display: block;
}

blockquote {
 background: rgb(224, 224, 255);
padding:5px;
 border:1px dashed #333333
}

blockquote::before {
 font-size: smaller;
 display: block;
}

pre {
 font-family: monospace;
}

span.widget_modified_on {
 font-weight: bolder;
}

small.category::before {
 content: "[";
}

small.category::after {
 content: "]";
}
/**
 * based on http://www.lucky-bag.com/archives/2006/08/my-user-stylesheets.html
 */
div.item_info {
 text-indent: -3em;
}

div.item_info a {
 visibility: hidden;
}

div.item_info a::after {
 font-size: smaller;
 visibility: visible;
 content: attr(href);
};
]]></>

if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.innerHTML = css;
        heads[0].appendChild(node);
    }
}
