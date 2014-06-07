// ==UserScript==
// @name           dead ken butt
// @namespace      something_awful
// @description    Buttbot over dead ken posts
// @include        http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

var KEN_ID = 152556;

function get_post(profile_link)
{
	var node = profile_link;
	while (node.getAttribute ('class') != 'post') { node = node.parentNode; }
	return node;
}

function get_foldoc(node)
{
    var current = node.firstChild;
    var newText = "";
    while (current) {
        // don't touch quote or anything that's in a tag. Will strip a bunch of shit anyway
        if (current.innerHTML && !current.innerHTML.match(/^\s*$/gi)) {
            if (current.nodeName) {
                n = current.nodeName;
                newText += '<'+n+' class="'+current.className+'">'+current.innerHTML+'</'+n+'>';
            } else {
                newText += current.innerHTML;
            }
            current = current.nextSibling;
            continue;
        // skip whitespace (if it were 'whitenoise' there'd be nothing here)
        } else if (current.nodeName != '#text' || current.nodeValue.match(/^\s*$/gi)) {
            current = current.nextSibling;
            continue;
        }

        // explode words and randomly swap some of them for 'butt'
        text = current.nodeValue.split(/\b([\w]+)\b/);
        for (j in text) {
            if (!text[j].match(/^[^\w]+$/) && Math.floor(Math.random()*10) < 2) {
                newText += 'butt';
            } else {
                newText += text[j];
            }            
        }
        current = current.nextSibling;
    }
   node.innerHTML = newText;
}

var profile_links = document.evaluate(
	"//ul[@class='profilelinks']/li/a[contains(concat(@href, 'END'), 'action=getinfo&userid=" + KEN_ID + "END')]",
	document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<profile_links.snapshotLength; i++)
{
	var post = get_post(profile_links.snapshotItem(i));
	var body = post.getElementsByClassName("postbody")[0];
	get_foldoc(body);
}
