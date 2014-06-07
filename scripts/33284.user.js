// Antoids' KoL Scripts
// 
// ==UserScript==
// @name           Antoids' Stolen Fishcake Script
// @namespace      http://userscripts.org/scripts/show/33284
// @include        *forums.kingdomofloathing.com*
// @description    Version 1.0
// ==/UserScript==

// ---------------------------------------------------------------------------
// This script summarizes bullshit. You can add people to the list directly below here. 
// ---------------------------------------------------------------------------

// Baleet list
var baleet = new Array(
    "Antoids"
);

// You can add new things to say here.
var summaries = new Array(
    "Use the microwave!"

);

var fishcake = "<br>_________________<br>" + '<img src="data:image/jpeg;base64,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" width="240" height="160">';

// To disable images, uncomment this line:
// var fishcake = "";

var spans = document.getElementsByTagName("span");
for (var i = 0; i < spans.length; i++)
{
    var span = spans[i];
    if (span.getAttribute("class") == "name")
    {
        var poster = span.firstChild.nextSibling.innerHTML; 
        for (var b = 0; b < baleet.length; b++)
        {
            if (poster != baleet[b]) continue;

            var textNode = span.parentNode.parentNode;

            // If you wanted to just remove these posts entirely, then
            // uncomment these two lines:

            // textNode.innerHTML = "";
            // break;

            var bodySpans = textNode.getElementsByTagName("span");
            
            for (var j = 0; j < bodySpans.length; j++)
            {
                var post = bodySpans[j];
                if (post.getAttribute("class") != "postbody") continue;

                var text = summaries[Math.floor(
                    Math.random()*summaries.length)];
                post.parentNode.innerHTML = "<span class=postbody>" + 
                    text + fishcake + "</span>";
                break;
            }
            break;
        }
    }
    else if (span.getAttribute("class") == "genmed")
    {
        var somebodyWrote = span.firstChild.innerHTML;
        if (!somebodyWrote) continue;
        var poster = somebodyWrote.substring(0, somebodyWrote.length - 7);
        for (var b = 0; b < baleet.length; b++)
        {
            if (poster != baleet[b]) continue;

            var textNode = span.parentNode.parentNode.parentNode;

            var tds = textNode.getElementsByTagName("td");
            for (var j = 0; j < tds.length; j++)
            {
                var post = tds[j];
                if (post.getAttribute("class") != "quote") continue;

                post.innerHTML = summaries[Math.floor(
                    Math.random()*summaries.length)];
                break;
            }

            break;
        }
    }
}
