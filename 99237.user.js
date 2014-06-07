// ==UserScript==
// @name                Demonoid Ad Remover
// @namespace           http://userscripts.org/scripts/show/99237
// @description         Say goodbye to Demonoid's most annoying ads ever. (v1.3)
// @include             http://*demonoid.com/*
// @include             http://*demonoid.cc/*
// @include             http://*demonoid.me/*
// @exclude             http://*demonoid.com/private_message.php*
// @exclude             http://*demonoid.cc/private_message.php*
// @exclue              http://fora.demonoid.com/*
// @version             1.3
// ==/UserScript==

/* CHANGELOG
    [FIX] Works with Demonoid.me
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Ditch "Sponsored Links" from the torrent listings
function sponsoredLinks() {
    var allTds, thisTd;
    allTds = document.evaluate(
        "//td[contains(text(),'Sponsored links')]",document,null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allTds.snapshotLength; i++) {
        thisTd = allTds.snapshotItem(i);
        thisTd.parentNode.parentNode.removeChild(thisTd.parentNode.nextSibling.nextSibling);    // Remove container
        thisTd.parentNode.parentNode.removeChild(thisTd.parentNode);                            // Remove text
    }
}

// Remove <hr> tags
function removeHrTags() {
    var allHrs, thisHr;
    allHrs = document.evaluate(
        "//hr[@style='color: #bcbcbc; width: 100%;']",document,null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allHrs.snapshotLength; i++) {
        thisHr = allHrs.snapshotItem(i);
        thisHr.parentNode.removeChild(thisHr);
    }
}

// Remove BTGuard links
function removeBTGuardLinks() {
    var allLinks, thisLink;
    allLinks = document.evaluate(
        "//a[@href='http://btguard.com/?a=demon']",document,null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling);            // Remove <br> tags
        thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling);                        // Remove <br> tags
        thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.previousSibling.previousSibling);    // Remove <br> tags
        thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.previousSibling);                    // Remove <br> tags
        thisLink.parentNode.parentNode.removeChild(thisLink.parentNode);                                    // Remove BT link
    }
}
// Ditch "Sponsored Links" from torrent pages
function sponsoredLinks_pages() {
    var allSpans, thisSpan;
    allSpans = document.evaluate(
        "//span[contains(text(),'Sponsored links')]",document,null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allSpans.snapshotLength; i++) {
        thisSpan = allSpans.snapshotItem(i);
        thisSpan.parentNode.removeChild(thisSpan);
    }
}

// Remove "Try our toolbar"
function tryOurToolbar() {
    var allImg, thisImg;
    allImg = document.evaluate(
        "//img[@src='http://www.demonoid.com/images/trytoolbar.gif']",document,null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allImg.snapshotLength; i++) {
        thisImg = allImg.snapshotItem(i);
        //thisImg.parentNode.parentNode.removeChild(thisImg.parentNode.nextSibling.nextSibling);
        thisImg.parentNode.parentNode.removeChild(thisImg.parentNode);
    }
}

// Remove Kontera text ads.
// Thanks to 'Grant Goodale' (coding) and 'pulseforce' for the heads up.
function disableTextAds(elm) {
    var target = elm;
    var childNode;
    if (elm.getAttribute('class') == 'kLink') {
        // Kontera triple nests the original content.
        childNode = elm.firstChild.firstChild.firstChild;
    }
    if (childNode) {
        target.parentNode.replaceChild(childNode, target);
    }
}
    
// Remove ads & disclaimer. Next change menu and footer backgrounds.
    var killAds = '.bnnr_top, .ending_disclaimer, .ending_bottom_left, .ending_tile_left, .ending_tile_right, .ending_bottom_right, .ending_tile_bottom ,.user_donation_box, #abb, .pad9px_right, * iframe {display:none; !important}';
    var imageMods = '.menu_tile {background-image: url(data:image\/gif;base64,R0lGODlhAQAfAMQAAAAAAJ6lXbK6abG5aKuyZaqxZK%2B3Z6CnX6atYq%2BwsKiwY7C4aKWkpKSrYay0ZaeuYsXExK62Z5uamru7u5yjXJuiW6OqYJSUlLK7aZ%2BmXp2kXKKpX621ZgAAAAAAAAAAACH5BAAAAAAALAAAAAABAB8AAAUZIIAJw2JEnEMUyoM01nZkQaBRFXBJTDJBIQA7); !important} .ending_top_left {background-image: url(data:image\/jpeg;base64,%2F9j%2F4AAQSkZJRgABAgAAZABkAAD%2F7AARRHVja3kAAQAEAAAAPAAA%2F%2B4ADkFkb2JlAGTAAAAAAf%2FbAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f%2F8AAEQgAIgArAwERAAIRAQMRAf%2FEAH0AAAEFAQEAAAAAAAAAAAAAAAABAwQFBgcCAQEAAwEAAAAAAAAAAAAAAAAAAQIFAxAAAQQAAgcGBAcAAAAAAAAAAQACAwQRBSExQVETFAZhcYESMhUiQtOUkaGCkrIjVBEBAAEEAgMAAAAAAAAAAAAAAAIBEVEDcRMxMgT%2F2gAMAwEAAhEDEQA%2FAHermE139ysh2LNJcMytjdNJ%2FIrJ2e1eVkXjBVBxggOMEBxgg5v1BVMtd2jYthVsqede7ZdWzUgCSyC220ahaj0TDs8x%2BMDYHBZv0QtLlJzmAuKRzAQHMBAcwEGdsRCRhaVsKq3KsxORXZW2I3zZVbwFmOM%2FFG4emaIEhvnbqwOsaNGgjns10lSyWlje2eqLlORtqmcP7ojj5Cfllb6o3djsPwWdPVKPlJvju3qgOO7egOO7egirYVMT1o5QQ4IKr2qzVsczl88tSwNUsD3Ruw72kFLCQc66xYMBbikw%2BaWnUld4ukhc781TrjhJBnvWW2xW%2BwofQUdUcUB771j%2FAKK32FH6CnqjigtF1QECHw8UCH9KDztPpVQftQf%2F2Q%3D%3D); !important} .ending_tile_top {background-image: url(data:image\/gif;base64,R0lGODlhAQAiAMQAAKuwh8rPpqqvhsLHnrC1jLq%2FlrzBmLi9lLa7kr7DmpaWmMfMo6esg8jNpIWEim9vca2yif%2F%2F%2BKChpZydoaithHp6eL%2FEm7K3jpGPmrS5kMXKobW6kcPIn8nOpaSqhF9daCH5BAAAAAAALAAAAAABACIAAAUcYBB0zaJxg5UYxYFs2UVAACBQjBd9T%2BVgiokkBAA7); !important} .ending_top_right {background-image: url(data:image\/jpeg;base64,%2F9j%2F4AAQSkZJRgABAgAAZABkAAD%2F7AARRHVja3kAAQAEAAAAPAAA%2F%2B4ADkFkb2JlAGTAAAAAAf%2FbAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f%2F8AAEQgAIgArAwERAAIRAQMRAf%2FEAIEAAAEFAQEAAAAAAAAAAAAAAAABAwQFBgIHAQEBAQEBAQAAAAAAAAAAAAAAAQIFBAMQAAEDAgIFBw0AAAAAAAAAAAEAAgMEBRETMVESFAYhQSIyQtOUYaHBkrIjgzRUtBVlBxEBAAIABgMAAAAAAAAAAAAAAAECETFREgMTITIE%2F9oADAMBAAIRAxEAPwD13OC5KjOCAzggM4IMN%2FQG7fFFqd%2Bsb93Uro%2FP6Qkkw5Ph%2BlfdGo3gLjtDeAgN4CDuKR8sjIowXPeQ1jRpJPIApEYjGXi4Nu%2FE0kkGDqOhYKOke3tsjc5zn48%2B3I97m%2BQgLrcdNtcETtj2cFtE%2FPdrXHaGe7WgdgFRO4thY57gNp2yNAGkk8wGspFZnIVV54igigmttrk3i4Te6nrYnYxQxnrCGRp6b3dUuHRAxwxJxHu4eDb5nNEO1UDaeFowXqRY4IKv87xl9RTeAoe4WOqukKUX3jHH5im8BQdwnVXSAzUtv9yZl3Cummg07uDlw468pmyzzLUViESqK1wwAANHIqJ4aAgVA16qBRp7KAYtDtAIBB%2F%2F2Q%3D%3D); !important}'
    var otherTweaks = '.user_menu {padding-bottom:1.4em; !important} img[src="/images/download.gif"] {vertical-align:middle; !important}';

// Calls everything together.
document.addEventListener('DOMNodeInserted', function(event) { disableTextAds(event.target); }, true);
addGlobalStyle(killAds + imageMods + otherTweaks);  
sponsoredLinks();
sponsoredLinks_pages();
removeHrTags();
removeBTGuardLinks();
tryOurToolbar();