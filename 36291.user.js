// ==UserScript==
// @name           Space Kimchi
// @namespace      something_awful
// @description    Replaces Space Kimchi posts with a random entry from FOLDOC
// @include        http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

var KIMCHI_ID = 108706;

function get_post(profile_link)
{
	var node = profile_link;
	while (node.getAttribute ('class') != 'post') { node = node.parentNode; }
	return node;
}

function get_foldoc(node)
{
    GM_xmlhttpRequest({
        "method": "get",
        "url": "http://foldoc.org/?action=Random",
        "onload": function(response) {
            var page = response.responseText;
            page = page.replace(/(.|\n)*?<br>/,"");
            page = page.replace(/Try this search on(.|\n)*/,"");
            node.innerHTML=page;;
        }
    });
}

var profile_links = document.evaluate(
	"//ul[@class='profilelinks']/li/a[contains(concat(@href, 'END'), 'action=getinfo&userid=" + KIMCHI_ID + "END')]",
	document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<profile_links.snapshotLength; i++)
{
	var post = get_post(profile_links.snapshotItem(i));
	var body = post.getElementsByClassName("postbody")[0];
	body.innerHTML = "Loading...";
	get_foldoc(body);
}
