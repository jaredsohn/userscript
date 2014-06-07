// ==UserScript==
// @name           imgur direct links
// @description    Replaces imgur landing page links with direct links to the images.
// @include        *
// ==/UserScript==

function fixURL(e) {
    var id = e.href.substr(-5);
    var json = "http://imgur.com/api/stats/"+id+".json";
    GM_xmlhttpRequest({
        method: "GET",
        url: json,
        onload: function(response) {
            var data = eval("("+response.responseText+")");
            switch(data.stats.type) {
            case "image/jpeg":
                e.href += ".jpg";
                break;
            case "image/png":
                e.href += ".png";
                break;
            case "image/gif":
                e.href += ".gif";
                break;
            //otherwise just don't bother fixing the url
            }
        }
    });
}

(function() {
var allLinks = document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
    var link = allLinks[i];
	var href = link.href;
	if(href.match(/imgur\.com\/[A-Za-z0-9]{5}$/))
	{
        fixURL(link);
	}
}
})();