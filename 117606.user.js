// ==UserScript==
// @id             restoregoogleplusblackfavicon
// @name           Restore Google Plus Black Favicon
// @namespace      http://userscripts.org/users/376607/
// @description    Restore the original black favicon for Google+.
// @version        1.0
// @date           2011-11-08
// @include        http://plus.google.*
// @include        https://plus.google.*
// ==/UserScript==

head = document.getElementsByTagName('head')[0];
oldFaviconLink = head.getElementsByTagName('link')[0];
if(oldFaviconLink.rel=="shortcut icon"){
newFaviconLink = document.createElement('link');
newFaviconLink.type = 'image/png';
newFaviconLink.rel = 'shortcut icon';
newFaviconLink.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVlJREFUOI2lk7FKA0EQhr/Zu0IhR84X0EqwtEwjmMo0FkHSWPgEaYJYqCBYeY8SUl8RnyHYCr6CB8ba292x0F1zHkbEgyt2bvabf/6fE1XlP08KUBXFTVUUtwBnp0+Nhof9g6/mWnjergDY2Lu+2tw9vxNV5THPo4x1gORNqHaqeN46fhFRVXq9niZJgjHmV8nee5xzOOdYLBaSAmRZxl8A1lqstQAYgJ+MLMuSsizXAtMACK+IxI9hShiw2hdqaZDlvUdEvgEcQKypauz13jcVBMBsNlsB1ABMp9NYGw6HbYBzLk6pa7t255BACwCQJAn9/mFMYz6/B2AwOMJ7j6qS53mMMgKstdGYPM8xxiAi1PXHCuFSiDCoaCgIPhhjImC5fP1cq26Y11IQAKtmigij0QkA3W63lUCI0QCMx+NL51xDnrWWLMvodDqxFsxTVSaTyQWA/Pd3fgfj1BrwVg9KewAAAABJRU5ErkJggg%3D%3D';

head.replaceChild(newFaviconLink, oldFaviconLink);
}