//
// You need Greasemonkey to use this: http://www.greasespot.net
//
// ==UserScript== 
// @name          View on Flickriver
// @description	  Adds links connecting various Flickr photo pages to corresponding Flickriver.com views
// @author        Alex Sirota (http://iosart.com/)
// @namespace     http://www.flickriver.com/tools/gm/
// @include       http://*flickr.com/photos*
// @include       http://*flickr.com/people*
// @include       http://*flickr.com/groups*
// @include       http://*flickr.com/explore*
// ==/UserScript==

//
// "View on Flickriver" Greasemonkey script v1.2
// 
// Written by Alex Sirota (http://iosart.com/), May 2007
//
// Copyright Alex Sirota (c) 2007
// 


(function() {
    function getFirstElementByClassName(className, contextElem) {
          if (typeof contextElem == 'undefined') {
                contextElem = document;
          }

          var elem = document.evaluate(
                        "//*[@class='" + className + "']",
                        contextElem,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null);
          return elem.snapshotLength > 0 ? elem.snapshotItem(0) : null;
    }

    function isUserPage(url) {
        if (
            url.match(/photos\/([^/]+)\/?$/) ||
            url.match(/people\/([^/]+)\/?$/) ||
            url.match(/photos\/([^/]+)\/popular-interesting\/?$/) ||
            url.match(/photos\/([^/]+)\/sets\/?$/) ||
            url.match(/photos\/([^/]+)\/tags\/?$/) ||
            url.match(/photos\/([^/]+)\/sets\/([^/]+)\/?$/) ||
            url.match(/photos\/([^/]+)\/tags\/([^/]+)\/?$/) ||
            url.match(/photos\/([^/]+)\/favorites\/?$/) ||
            url.match(/photos\/([^/]+)\/friends\/?$/)
           ) return true;
        return false;
    }

    function isGlobalPhotosPage(url) {
        if (
            url.match(/photos\/?$/) ||
            url.match(/photos\/tags\/([^/]+)\/?$/) ||
            url.match(/photos\/tags\/interesting\/?$/)
           ) return true;

        return false;
    }

    function isPhotoPage(url) {
        if (
            url.match(/photos\/([^/]+)\/([0-9]+)\/?$/) ||
            url.match(/photos\/([^/]+)\/([0-9]+)\/in\/[^/]+\/?$/)
           ) return true;

        return false;
    }

    function isGroupPage(url) {
        if (
             url.match(/groups\/([^/]+)\/?$/) ||
             url.match(/groups\/([^/]+)\/pool\/?$/)
           ) return true;
        return false;
    }

    function isExplorePage(url) {
        if (
             url.match(/explore\/?$/) 
           ) return true;
        return false;
    }


    function tryAddToExtras(link) {
        var extrasElem = getFirstElementByClassName('Extras');
        if (extrasElem) {
            link.style.fontSize = '14px';
            link.style.fontWeight = 'bold';
            extrasElem.appendChild(document.createElement('br'));
            extrasElem.appendChild(link);
            return true;
        }
        return false;
    }

    function tryAddToLinks(link) {
       	var extrasElem = getFirstElementByClassName('LinksNew');
        if (extrasElem) {
        		link.style.borderLeft = '1px dotted #DADADA;'
        		link.style.marginLeft = '5px';
        		link.style.paddingLeft = '5px';
            link.style.fontSize = '12px';
            extrasElem.appendChild(link);
            return true;
        }
        return false;
    }

    function shouldAddToPhotoPage() {
        var descriptionElem = getFirstElementByClassName('photoDescription');   
        if (!descriptionElem) return true;
    
        if (descriptionElem.innerHTML.match(/flickriver\.com/)) return false;

        return true;
    }

    function tryAddToPhotoPage(link) {
        var elem = document.getElementById('DiscussPhoto');
        if (!elem) return false;
        var p = document.createElement('p');
        p.appendChild(link);
        elem.parentNode.insertBefore(p, elem);
        return true;
    }

    function tryAddToGlobalPhotosPage(link) {
        var elem = document.getElementById('Hint');
        if (!elem) return false;
        var p = document.createElement('p');
        link.style.fontWeight = 'bold';
        p.appendChild(link);
        elem.appendChild(p);
        return true;
    }

    function tryAddToSubNav(link) {
        var subNavElem = document.getElementById('SubNav');
        if (!subNavElem) return false;
        var linksElem = getFirstElementByClassName('Links', subNavElem);
        if (!linksElem) return false;

        var img = linksElem.getElementsByTagName('img');
        if (img && img.length) {
                linksElem.appendChild(img[0].cloneNode(true));
        }

        linksElem.appendChild(link);
        return true;
    }

    function tryAddToExplorePage() {
        var elem = document.getElementById('exploreMap');
        if (!elem) return false;
        var p = document.createElement('p');
        link.style.fontSize = '14px';
        link.style.fontWeight = 'bold';
        p.appendChild(link);
        elem.parentNode.insertBefore(p, elem);
        return true;
    }

    function enhancePersonMenu(bMine) {
        var menuId = bMine ? 'person_menu_you_div' : 'person_menu_other_div';
        var menu = document.getElementById(menuId);
        var div = document.createElement('div');
        div.className = 'menu_item_line_above';
        var a = document.createElement('a');
        a.className = 'block';
        a.id = bMine ? 'personmenu_your_flickriver_link' : 'personmenu_flickriver_link';
        a.href = '#';
        a.innerHTML = 'View on Flickriver';
        div.appendChild(a);
        menu.appendChild(div);

        if (bMine) {
            var myPhotosLink = document.getElementById('personmenu_your_photos_link');
            var href = myPhotosLink.href;
            if (href.match(/^http:\/\//)) {
                href = href.replace(/flickr.com/, 'flickriver.com' );
            } else {
                href = 'http://www.flickriver.com' + href;
            }
            a.href = href;
            // if adding to my menu, there's nothing left to do
            return;
        }

        // link updater
        var photosLink = document.getElementById('personmenu_photos_link');
        function updateLink() {
            var href = photosLink.href;
            href = href.replace(/flickr.com/, 'flickriver.com' );
            href += 'popular-interesting/';
            a.href = href;
        }
        photosLink.addEventListener('DOMAttrModified', function() { updateLink() }, false);
    }

    // start 

    // enhance person menus
    try {
        enhancePersonMenu(true);
    } catch(e) {}
    try {
        enhancePersonMenu(false);
    } catch(e) {}

    // add flickriver links to the page
    var url = location.href;
    var linkUrl = url.replace(/\?.*$/, '');
    linkUrl = linkUrl.replace(/flickr/, 'flickriver');

    var link = document.createElement('a');
    link.setAttribute('href', linkUrl);
    link.setAttribute('target', '_blank');
    link.innerHTML = 'View on Flickriver';

    if (isUserPage(url)) {
	      if ( !tryAddToExtras(link) )
	        tryAddToLinks(link);
        return;
    }

    if (isPhotoPage(url)) {
        if (shouldAddToPhotoPage()) {
            tryAddToPhotoPage(link);
        }
        return;
    }

    if (isGlobalPhotosPage(url)) {
        tryAddToGlobalPhotosPage(link);
        return;
    }

    if (isGroupPage(url)) {
        if (!tryAddToExtras(link)) {
            tryAddToSubNav(link);
        }
        return;
    }

    if (isExplorePage(url)) {
        tryAddToExplorePage(link);
        return;
    }

})();
