// ==UserScript==
// @name          del.icio.us >> ma.gnolia
// @namespace     http://www.chapnickman.com/greasemonkey/magnolia/
// @description   Adds "Copy this link to Ma.gnolia" in del.icio.us
// @version       1.0.5
// @include       http://del.icio.us/*
// @include       http://ma.gnolia.com/*
// ==/UserScript==

if (location.href.toString().match(/^http:\/\/del.icio.us\/.*?/i)) {
    var posts = getNodes("//li[@class='post']", document);

    for (var i = 0; i < posts.snapshotLength; i++) {
        var post = posts.snapshotItem(i);
        
        var url = ""
        var title = ""
        var extended = ""
        var tags = ""
        var metaNode = null;
        
        for (var j = 0; j < post.childNodes.length; j++) {
            var childNode = post.childNodes[j];
            
            switch (childNode.className) {
            case 'desc':
                url = childNode.firstChild.href;
                title = childNode.firstChild.innerHTML;
                break;
            case 'extended':
                extended = childNode.innerHTML;
                break;
            case 'meta':
                metaNode = childNode;
                tags = getTags(metaNode);
                break;
            }
        }
        
        var magnoliaURL = ' ... <a title="Copy this to Ma.gnolia" href="'
            + 'http://ma.gnolia.com/bookmarklet/add?' 
            + 'url='  + encodeURIComponent(url)
            + '&title=' + encodeURIComponent(title)
            + '&description=' + encodeURIComponent(extended)
            + '&tags=' + encodeURIComponent(tags)
            + '">&raquo; ma.gnolia</a>';
            
        if (metaNode.innerHTML.indexOf("ma.gnolia.com") < 0)
            metaNode.innerHTML += magnoliaURL;
    }
}
else if (location.href.toString().match(/^http:\/\/ma.gnolia.com\/.*?/i)) {
    if (getParam("title"))
        document.getElementById("title").value = decodeURIComponent(getParam("title"));
        
    if (getParam("description"))
        document.getElementById("description").value = decodeURIComponent(getParam("description"));
}

function getNodes(what, where) {
	return document.evaluate(what, where, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getParam(key) {
    var toReturn = null;
    var regex = new RegExp("[\\?\\&]" + key + "=([^&$]+)[&$]", "i");
    var match = regex.exec(location.href.toString());
    
    if (match.length > 0 && match[1] != null && match[1].length > 0)
        toReturn = match[1]
        
    return toReturn;
}

function getTags(tagNode) {
    var toReturn = new Array();
    
    for (var i = 0; i < tagNode.childNodes.length; i++) {
        if (tagNode.childNodes[i].className == 'tag') {
            toReturn[toReturn.length] = tagNode.childNodes[i].innerHTML;
        }
    }
    
    return toReturn.join(", ");
}
