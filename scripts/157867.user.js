// ==UserScript==
// @name          Light GitHub Favicon
// @version       1.0
// @description   replace the GitHub favicon with a light version for dark Firefox themes
// @author        Evan Coury
// @namespace     http://evan.pro/
// @include       https://github.com/*
// @include       https://*.github.com/*
// ==/UserScript==

var link  = document.createElement('link');
link.type = 'image/png';
link.rel  = 'shortcut icon';
link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYFJREFUeNqM098rQ2EYwPGziY3IzeJijZgaV278KmlFpsRcuFAuLeFv8RcoJUtqhbhQ5GbcsEIuSKv5UVJ+G00R2/F9t+fodNqapz47O0/vec7zvud9NV3XNYsuzCOOFyRxiWX0W8fb1I9EOWYxjROsI440mjCIHsnP4CH7lFSqwDaeEcjTlaEdCZyiRuXs8nb15k4MwIcAnHCjTv53oA8jcr+IElW1Tc9FEHb8yP2VzP8N1/iUfD1akMGoJgt2LC024l0vHGn4ZewKdtUU/FiTqYRQpRUOuyyyighaVcKFc0k2aMXDI9cEHKqADRlJ3v6jwL21pVd45T6MjyIFwnJVX+dbFYhhCKVqW2AYW38bJRdJRDGODckFsxuNleyVFe5GCBMow4Jp9Xckp5m+1hcmjcQqLuDBHA6RMhW4QbWMrUQMR3AaBVw4ky2qNpYbB5YCDnixh0f4sufI1FYtNqW1JenIiKScxpR012w8l+/AjCGKO9muKp6wjynLWmi/AgwAaeUU1t5lRsgAAAAASUVORK5CYII=';
document.getElementsByTagName('head')[0].appendChild(link);