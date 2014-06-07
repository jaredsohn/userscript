// ==UserScript==
// @name           Atmosphir Forum Adjustments
// @namespace      scupizzaboy
// @include        http://beta.atmosphir.com/atmosphir/forum*
// ==/UserScript==


// VERSION 1.1a

// xpath query function
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// style function
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var all, catDiv, friDiv, avDiv, textDiv, discLink, discList;

// move catergoies below friends
all = xpath("//div[@class='categories']");
catDiv = all.snapshotItem(0);
all = xpath("//div[@class='friends']");
friDiv = all.snapshotItem(0);
if (catDiv && friDiv) friDiv.parentNode.insertBefore(catDiv, friDiv.nextSibling);

// insert All Discussions link
if (catDiv) {
    discList = document.createElement('li');
    discLink = document.createElement('a');
    discLink.setAttribute('href', 'http://beta.atmosphir.com/atmosphir/forum');
    discLink.appendChild(document.createTextNode('All Discussions'));
    discList.appendChild(discLink);
    all = catDiv.getElementsByTagName('ul');
    if (all) {
        all = all[0].getElementsByTagName('li');
        if (all) {
            all[0].parentNode.insertBefore(discList, all[0]);
        }
    }
}