// ==UserScript==
// @name          Flickr Remove "from Yahoo!"
// @description   Removes "from Yahoo!" from Flickr logo.
// @namespace     http://codefairy.org/ns/userscripts
// @include       http://www.flickr.com/*
// @version       0.1
// @license       MIT License
// @work          Greasemonkey
// @work          GreaseKit
// @work          Google Chrome
// ==/UserScript==

new function() {

var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAAAeCAMAAAAVZbA2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA9lBMVEUAY9wPbN4fduAvgOI/ieRPk+Zfnehvpup/sO2Ouu+ew/GuzfO+1/XO4Pfe6vnu9Pv4AJL4QZ35QYD5QZL5T4z5T5L5T535W7H5Zoz5ZpL5ecP5ec/5gbX5gcP5gc/5ibH5kNf5pOL5q+b5t+36QZ36cID6cJL6kJL7kIb7l5j7l6z7x+37zN/7zPH71vT8kIz87df88f789v79wqf90b791sf93+r99tf+D4v+H5P+L5r+P6L+T6r+b7n+f8H+ntD+vt/+zuf+27X+3u7+7cv+7vb+8cv+9vf++tf+/tv+/uL+/u3+/vH+/vf+/vv+/v7/AIT/QKMrpqVOAAACAElEQVRIx73X52KCMBAA4DAUpBC69957Dyva2r179v1fpgQuEAI4WvT+GHMJnxEuRgJhOGWVsFAdv62HEfTbQVDIDiMcaUG3QXAe4WED2NhkCT1smjnTO6TzPDPiiDMAj8Yce993rzJgD2cp7N4N0Ktgn+h1eD7/5sWPZsrrEAPxKFtx195ds/nEXi82p+dPgLByxetrrC3VQ6qgrZKCo02a9ChuEyW/3fBYNABuqi0//J6zkf3L8+FTIkf7ercUYaiVTOvxFcBjSst7qgWvvvexfjy5tXK/3JPnluWhQpoXVTAUvUbI/QA8zr2Nbay+zvbklUi+R3Hlwa6LXrUVee9TVwvba8+LvXimNDSR1rCGXcFrxR4cLR187o4eEvas4fwKa7u5nsvvnWLY1B4qJzz+WRyQvWuvxryvnfGZib2O9ZBxgzQsfiqkHf6RQfLqD9GT/f3SRf0JnpZcQqL+MFcCyav3Wu+CR6RrCmn8plVX9h7+75kZnnSByEst7w+ene/psndTgJe1Ps5W+uDpGZ6JG49CC/T4IqwMj59ItAI9Xn8KB2lGvZvFedH+QjR/J7IM1RTSUdIpzEscq7AzTltErMFCPCi38UDFXqM4TziGpz0+S/i9/bcHtprrRc8v+0lq7+HBg2/E4v+V1PnFNnBv1g2aTPNp7F14fvFuU94vx8E+E7hWXrMAAAAASUVORK5CYII=';

var $ = function(selector) {
	return document.querySelector(selector);
};

var img = $('#FlickrLogo') || $('#head-logo img');
img.src = logo;
img.width = 111;

};
