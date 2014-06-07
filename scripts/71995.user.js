// ==UserScript==
// @name           Atmosphir Forum Adjustments
// @namespace      scupizzaboy
// @include        http://beta.atmosphir.com/atmosphir/forum*
// ==/UserScript==


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

// make avatars bigger
all = xpath("//img[contains(@alt,'avatar')]");
for (var i = 0; i < all.snapshotLength; i++) {
    avDiv = all.snapshotItem(i);
    avDiv.setAttribute('style', 'width: 64px; height: 64px;');
}

// resize text area
all = xpath("//textarea[@class='markItUpEditor']");
textDiv = all.snapshotItem(0);
if (textDiv) textDiv.setAttribute('style', 'border: 1px solid rgb(204, 204, 204); height: 300px; width: 98%;');

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


// add new styles
addGlobalStyle(" #contentArea #right-column .right .categories { margin: 10px 10px 0; color: black;} ");
addGlobalStyle(" #contentArea #right-column .right .categories a { color: #1D83B4; font-weight: bold; } ");
addGlobalStyle(" #contentArea #right-column .right .categories ul { list-style: none outside none; margin: 0; padding: 0; } ");
addGlobalStyle(" #contentArea #right-column .right .categories ul li { margin: 0; padding: 0 0 3px; } ");
addGlobalStyle(" #contentArea #left-column .left .forum-main .inner .main-content { width: 620px; } ");
addGlobalStyle(" #contentArea #left-column .left .forum-main .inner .main-content .post .post-right { width: 546px; } ");
addGlobalStyle(" #contentArea #left-column .left .forum-main .inner .main-content .post .post-left { width: 74px; } ");
addGlobalStyle(" #contentArea #right-column .right .friends .avatar { width: 64px; } ");