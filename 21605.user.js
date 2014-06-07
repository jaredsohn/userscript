// ==UserScript==
// @name          Flickr More User Links
// @description	  Adds useful links to external services to the user sub-menu. Based on Browse by Interesting script by steeev and Scout Link by netomer.
// @version       0.9
// @author        scragz
// @namespace     http://scragz.com/
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// ==/UserScript==

/* begin configuration */
var config = {
    showOnPhotoPage: true,
    showPopularLink: true,
    showScoutLink: true,
    showLeechLink: true,
    showYourFavsOfTheirs: true,
    showTheirFavsOfYours: true
};
/* end configuration */

(function() {

/* begin scragz' GM utility functions */
var _gt = function(e) { return document.getElementsByTagName(e); };
var _gi = function(e) { return document.getElementById(e); };
var _ce = function(e) { return document.createElement(e); };
var _ct = function(e) { return document.createTextNode(e); };
var _gc = function(clsName)
{
    var elems = document.getElementsByTagName('*');
    var j = 0;
    var arr = new Array();
    for (var i=0; (elem = elems[i]); i++) {
        if (elem.className == clsName) {
            arr[j] = elem;
            j++;
        }
    }
    return (arr.length > 0) ? arr : false;
};
var xpath = function(query, startingPoint)
{
    if (startingPoint == null) {
        startingPoint = document;
    }
    var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return retVal;
};
var xpathFirst = function(query, startingPoint)
{
    var res = xpath(query, startingPoint);

    if (res.snapshotLength == 0) return false;
    else return res.snapshotItem(0);
};
var swapNode = function(node, swap)
{
    var nextSibling = node.nextSibling;
    var parentNode = node.parentNode;
    swap.parentNode.replaceChild(node, swap);
    parentNode.insertBefore(swap, nextSibling);
};
var addGlobalStyle = function(css)
{
    var head, style;
    head = _gt('head')[0];
    if (!head) { return; }
    style = _ce('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
/* end scragz' GM utility functions */

/* variables we need to scrape off the page */
var userId = false; // fake static
var getUserId = function()
{
    if (userId) return userId;
    var subNav, widget, buddyImage, userIdMatch;
    if (subNav = _gi('SubNav')) {
        buddyImage = subNav.rows[0].cells[0].getElementsByTagName('img')[0];
    } else if (widget = xpathFirst("//div[@class='Widget']")) {
        buddyImage = widget.getElementsByTagName('img')[0];
    }

    if (buddyImage) {
        userIdMatch = /buddyicons\/(.*)\.jpg/gi.exec(buddyImage.src);

        if (userIdMatch) {
            userId = userIdMatch[1];
            return userId;
        }

        userIdMatch = /images\/buddyicon\.jpg\?(.*)/gi.exec(buddyImage.src);

        if (userIdMatch) {
            userId = userIdMatch[1];
            return userId;
        }

        return userId;
    }
    
    // new photo page
    var userP;
    if (userP = xpathFirst("//p[@class='flickr-user']")) {
        userId = userP.getAttribute('nsid');
        return userId;
    }
    
    return userId;
};
var username = false; // fake static
var getUsername = function()
{
    if (username) return username;
    var container, nameMatch;
    if (container = (xpathFirst("//table[@id='SubNav']//h1//a[@href!='/upgrade/']") || xpathFirst("//table[@id='SubNav']//h1"))) {
        nameMatch = /\s*(.*)('s|') photos.*/gi.exec(container.innerHTML);
        if (nameMatch) {
            username = nameMatch[1];
            return username;
        }
    } else if (container = xpathFirst("//div[@id='photo-story-attribution']//strong[@class='username']/a")) { // new photo page
        username = container.innerHTML;
        return username;
    }
    return username;
};
var myUsername = false; // fake static
var getMyUsername = function()
{
    if (myUsername) return myUsername;
    var whoIs;
    if (whoIs = _gc('Pale')) {
        myUsername = whoIs[0].innerHTML;
        return myUsername;
    } else if (whoIs = _gc('ywa-track')) { // new photo page
        myUsername = whoIs[0].innerHTML;
        return myUsername;
    }
    return myUsername;
};
var isItMe = false; // fake static
var getIsItMe = function()
{
    if (isItMe) return isItMe;
    // var header;
    // if ((header = _gt('h1')) && header[0].innerHTML.match(/\s*Your photos\s*/)) isItMe = true;
    isItMe = getUsername() == getMyUsername();
    return isItMe;
};
/* /variables we need to scrape off the page */

/* working with photostream-type pages */
var subNav = xpathFirst("//table[@id='SubNav']//span[@class='LinksNew']"); // fake static
var appendSubNavLink = function(label, href)
{
    if (!subNav) return false;

    var span, link;
    if (typeof href == 'function') {
        link = _ce('a');
        link.href = '';
        link.addEventListener('click', href, true);
        link.innerHTML = label;
    } else {
        link = _ce('a');
        link.href = href;
        link.innerHTML = label;
    }

    var span = _ce('span');
    span.appendChild(link);
    subNav.appendChild(span);
};
var subNavPrep = function()
{
    if (!subNav) return false;

    subNav.appendChild(_ce('br'));
};
/* /working with photostream-type pages */

/* working with new photo page */
// they made this way too annoying to add new items to
// var buttonBar = xpathFirst("//ul[@id='button-bar']"); // fake static
// var appendButtonBarItem = function()
// {
//     if (!buttonBar) return false;
//     
//     var last, divider;
//     if ( (last = xpathFirst("//li[@class='last']", buttonBar)) && (divider = xpathFirst("//li[@class='divider']", buttonBar)) ) {
//         last.removeAttribute('class');
//         buttonBar.appendChild(divider.cloneNode(true));
//         moreItem = last
//     }
// }
var photoNav = xpathFirst("//div[@id='nav']"); // fake static
var photoNavInside = false; // fake static
var appendPhotoNavLink = function(label, href)
{
    if (!photoNavInside) return false;

    var span, link;
    if (typeof href == 'function') {
        link = _ce('a');
        link.href = '';
        link.addEventListener('click', href, true);
        link.innerHTML = label;
    } else {
        link = _ce('a');
        link.href = href;
        link.innerHTML = label;
    }

    var span = _ce('span');
    span.appendChild(link);
    photoNavInside.appendChild(span);
};
var photoNavPrep = function()
{
    if (!photoNav) return false;

    photoNavInside = _ce('div');
    photoNavInside.setAttribute('id', '_more_user_links_photoNavInside');
    addGlobalStyle("#_more_user_links_photoNavInside { clear:both; border-top:1px solid #FFF; padding: 5px 0; font-size:12px; } #_more_user_links_photoNavInside span { border-right:1px dotted #DADADA; margin:0 5px 0 0; padding:0 5px 0 0; } #photo { margin-top: 25px; }");
    /*
        #_more_user_links_photoNavInside {
            font-size:12px;
        }
        #_more_user_links_photoNavInside span {
            border-right:1px dotted #DADADA;
            margin:0 5px 0 0;
            padding:0 5px 0 0;
        }
    */
    
    photoNav.appendChild(photoNavInside);
};
/* /working with new photo page */

/* decide what to show */
var doShowPopularLink = function()
{
    return config.showPopularLink && !getIsItMe();
};
var doShowScoutLink = function()
{
    return config.showScoutLink;
};
var doShowLeechLink = function()
{
    return config.showLeechLink;
};
var doShowYourFavsOfTheirs = function()
{
    return config.showYourFavsOfTheirs && !getIsItMe() && getMyUsername() && getUsername();
};
var doShowTheirFavsOfYours = function()
{
    return config.showTheirFavsOfYours && !getIsItMe() && getMyUsername() && getUsername();
};
/* /decide what to show */

/* links */
var popularLink = function()
{
    return 'http://interestingby.isaias.com.mx/pm.php?id=' + getUserId() + '&theme=white';
};
var scoutLink = function()
{
    return 'http://flagrantdisregard.com/flickr/scout.php?username=' + getUserId() + '&sort=date&year=0';
};
var leechLink = function()
{
    // return 'http://www.flickrleech.net/nsid/' + getUserId();
    return 'http://www.darckr.com/username?submit=display+user&username=' + getUserId();
};
var yourFavsOfTheirsLink = function()
{
    return 'http://flagrantdisregard.com/flickr/favorites.php?user1=' + getUserId() + '&user2=' + getMyUsername() + '&button=Go';
};
var theirFavsOfYoursLink = function()
{
    return 'http://flagrantdisregard.com/flickr/favorites.php?user1=' + getMyUsername() + '&user2=' + getUserId() + '&button=Go';
};
/* /links */

(function() {
    if (getUserId()) {
        // any page with the subnav should be fine
        if (_gi('SubNav')) { // photos, sets, tags, favorites, archives
            if (getUserId()) {
                // GM_log("getUserId(): "+getUserId());
                // GM_log("getIsItMe(): "+getIsItMe());
                // GM_log("getMyUsername(): "+getMyUsername());
                // GM_log("getUsername(): "+getUsername());
                subNavPrep();
                if (doShowPopularLink()) appendSubNavLink('Popular', popularLink());
                if (doShowScoutLink()) appendSubNavLink('Scout', scoutLink());
                if (doShowLeechLink()) appendSubNavLink('Leech', leechLink());
                if (doShowYourFavsOfTheirs()) appendSubNavLink(getUsername() + '\'s&nbsp;Fav\'d&nbsp;by&nbsp;You', yourFavsOfTheirsLink());
                if (doShowTheirFavsOfYours()) appendSubNavLink('Yours&nbsp;Fav\'d&nbsp;by&nbsp;' + getUsername(), theirFavsOfYoursLink());
            }
        } else if (config.showOnPhotoPage && _gi('button-bar')) { // photo page    
            GM_log("getUserId(): "+getUserId());
            GM_log("getIsItMe(): "+getIsItMe());
            GM_log("getMyUsername(): "+getMyUsername());
            GM_log("getUsername(): "+getUsername());
            photoNavPrep();
            if (doShowPopularLink()) appendPhotoNavLink('Popular', popularLink());
            if (doShowScoutLink()) appendPhotoNavLink('Scout', scoutLink());
            if (doShowLeechLink()) appendPhotoNavLink('Leech', leechLink());
            if (doShowYourFavsOfTheirs()) appendPhotoNavLink(getUsername() + '\'s&nbsp;Fav\'d&nbsp;by&nbsp;You', yourFavsOfTheirsLink());
            if (doShowTheirFavsOfYours()) appendPhotoNavLink('Yours&nbsp;Fav\'d&nbsp;by&nbsp;' + getUsername(), theirFavsOfYoursLink());
        }
    } else {
        GM_log("Could not determine user's ID.");
    }
})();

})();
