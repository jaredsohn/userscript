// ==UserScript==
// @name           GeminiAttachmentImages
// @namespace      Gemini
// @description    Show image in attachments [Gemini]
// @include        */issue/ViewIssue.aspx?*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (i=0; i<links.length; i++) {
	var el = links[i];
	if (el.title == "Download attachment") {
            var txt = new String(el.innerHTML);
            while (txt.indexOf(".")>=0) {
                ind = txt.indexOf(".");
                txt = txt.substr(ind+1);
            }
            txt = txt.toLowerCase();
            if (txt=="bmp" || txt=="jpg" || txt=="gif" || txt=="png") {
                var lnk = document.createElement("img");
                lnk.src = el.href;
                links[i].parentNode.insertBefore(lnk, links[i].nextSibling);
                var elm = document.createElement("br");
                links[i].parentNode.insertBefore(elm, links[i].nextSibling);
            }
        }
}

