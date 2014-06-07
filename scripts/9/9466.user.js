// ==UserScript==
// @name          FotoTickr Link
// @description	  This script adds a link to the user's FotoTickr page (http://www.fototickr.com/). It is almost entirely based on netomer's scout link gm script.
// @author        Gary Cohen
// @version       2.0
// @namespace     http://www.fototickr.com/gm/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/groups/*
// @include       http://www.flickr.com/groups/*
// @exclude       http://www.flickr.com/photos/friends/*
// ==/UserScript==

(function() {

/* begin scragz' GM utility functions */
var _gt = function(e) { return document.getElementsByTagName(e); }
var _gi = function(e) { return document.getElementById(e); }
var _ce = function(e) { return document.createElement(e); }
var _ct = function(e) { return document.createTextNode(e); }
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
}
var xpath = function(query, startingPoint)
{
    if (startingPoint == null) {
        startingPoint = document;
    }
    var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return retVal;
}
var xpathFirst = function(query, startingPoint)
{
    var res = xpath(query, startingPoint);

    if (res.snapshotLength == 0) return false;
    else return res.snapshotItem(0);
}
var swapNode = function(node, swap)
{
    var nextSibling = node.nextSibling;
    var parentNode = node.parentNode;
    swap.parentNode.replaceChild(node, swap);
    parentNode.insertBefore(swap, nextSibling);
}
var addGlobalStyle = function(css)
{
    var head, style;
    head = _gt('head')[0];
    if (!head) { return; }
    style = _ce('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
/* end scragz' GM utility functions */

var userId; // fake static
var getUserId = function()
{
    if (userId) return userId;
    var subNav, widget, buddyImage, userIdMatch;
    if (subNav = _gi('SubNav')) {
        buddyImage = subNav.rows[0].cells[0].getElementsByTagName('img')[0];
    } else if (widget = xpathFirst("//div[@class='Widget']")) {
        buddyImage = widget.getElementsByTagName('img')[0];
    }

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

    userId = false;
    return userId;
}

var username; // fake static
var getUsername = function()
{
    if (username) return username;
    if (getIsItMe()) return getMyUsername();
    var header, headerMatch;
    if (header = _gt('h1')) {
        // headerMatch = /\s*<a href="[^"]+">(.*)('s|') photos.*/gi.exec(header[0].innerHTML);
        headerMatch = /\s*(.*)('s|') photos.*/gi.exec(header[0].innerHTML);
        // GM_log(headerMatch);
        if (headerMatch) {
            username = headerMatch[1];
            return username;
        } else {
            username = false;
        }
    } else {
        username = false;
    }
    return username;
}

var myUsername; // fake static
var getMyUsername = function()
{
    if (myUsername) return myUsername;
    var whoIs;
    if (whoIs = _gc('Pale')) {
        myUsername = whoIs[0].innerHTML;
        return myUsername;
    } else {
        myUsername = false;
    }
    return myUsername;
}

var isItMe; // fake static
var getIsItMe = function()
{
    if (isItMe) return isItMe;
    var header;
    if ((header = _gt('h1')) && header[0].innerHTML.match(/\s*Your photos\s*/)) isItMe = true;
    else isItMe = false;

    return isItMe;
}

var subMenu = false; // fake static
var appendSubMenuLink = function(label, href, nosep)
{
    if (!subMenu) subMenu = xpathFirst("//table[@id='SubNav']//p[@class='LinksNewP']//span[@class='LinksNew']");
    if (!subMenu) return false;

	var space = ' ';
	if (getIsItMe()) { space = " "; }

    if (typeof href == 'function') {
        link = _ce('a');
        link.href = '';
        link.addEventListener('click', href, true);
        link.innerHTML = label;
    } else {
        link = _ce('a');
        link.href = href;
		link.target = "_blank";
        link.innerHTML = space + label;
    }
	
    span = _ce('span');
    span.appendChild(link)
    
    if (!nosep) {
        img = _ce('img');
        img.src = '/images/subnavi_dots.gif';
        img.alt = '';
        img.width = '1';
        img.height = '11';

        subMenu.appendChild(img);
    }
    
    subMenu.appendChild(span);
}

var appendSubMenuNewline = function()
{
    if (!subMenu) subMenu = xpathFirst("//table[@id='SubNav']//p[@class='LinksNewP']//span[@class='LinksNew']");
    if (!subMenu) return false;

    // subMenu.appendChild(_ce('br'));
}

var go = function()
{
    // the include wildcards match too many pages. we don't want individual photo pages or some other sub pages.
    //var noPhotosRE = /.*\/photos\/([^\/]+)(\/|\/sets\/|\/tags\/|\/archives\/.*|\/favorites\/)/gi;
    //if (!document.location.href.match(noPhotosRE)) return;

    // nevermind the above; any page with the subnav should be fine
    if (!_gi('SubNav')) return;

    if (getUserId()) {
        GM_log("getIsItMe(): "+getIsItMe());
        GM_log("getMyUsername(): "+getMyUsername());
        GM_log("getUsername(): "+getUsername());
        appendSubMenuNewline();
		
		var photoRE = /.*\/photos\/([^\/]*)(\/)?$/gi;
		var groupRE = /.*\/groups\/([^\/]*)\/pool(\/)?$/gi;
		
		if ( document.location.href.match(photoRE) ) {
			appendSubMenuLink( 'Ticker', 'http://www.fototickr.com/gm/?gm=true&userID=' + getUserId(), !getIsItMe() );
		}
		else if (document.location.href.match(groupRE) ) {
			appendSubMenuLink( 'Ticker', 'http://www.fototickr.com/gm/?gm=true&groupID=' + getUserId(), false );
		}
    } else {
        GM_log("Could not determine user's ID.");
    }
}

go();

})();
