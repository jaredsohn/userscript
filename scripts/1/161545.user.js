// ==UserScript==
// @id             
// @name           Fallen London / Echo Bazaar Restore Old Favicon (Chrome Version)
// @version        1.0
// @namespace      
// @author         Saharan
// @description    Replaces the current generic Storynexus favicon with the Fallen-London-specific candle favicon that was in use from October 2009 through to August 2012. Does not work in Firefox.
// @include        http*://*.fallenlondon.com/Gap/Load*
// @include        http*://fallenlondon.com/Gap/Load*
// @include        http*://fallenlondon.storynexus.com*
// @run-at         document-start
// ==/UserScript==


var head = document.getElementsByTagName('head')[0];
var candle = document.createElement('link');
candle.setAttribute('type', 'image/x-icon');
candle.setAttribute('rel', 'shortcut icon');
candle.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALlSURBVHjaYmBgYODlYAAIICDJcOP6FYAAYoAAgABivLvai5eZCSCAoLz///8DSYAAYgTiwzls0qEZT1/LAAQQAxzwMTAABBCIyvWS2NTmDGQABBCDiZH+45f3Hr96B+QABBCLr7vVgx4rYT4mIAcggBDIXkfg/8+3DZGKEC5AALEAcYy7ha44E+O/P3+YuJQVtE8cXWZhbQkQQCBdj37yBph+FhRjfvp8G7uKJeuT5UBBgABiBuJ3H7/o/L3P++6ZOPsThjNLlQ0NuhefAQgghB2MjAzsIIMZ2IBsBgaAAIKKMjExLm30uL6rU0uOFyICEEAMYEUMXGyMVzZX///92VGLEyIOEAAZAOb/A/4AAPLXrOzHwURkf/r27N3R5QYWGeHg4AIIZHmWC5d1bvpPJr2fDNyW2r9vPPhw9vwVgAACOZddQO7n2U0fX19/cqKE5e+LNVsOAQUBAghkxbOLBwX+v3zPuE+J6cefMyvfvn0LFAQIIJCOS6+FH969L/7j+u+H127fe54cGwIUBAggZgYMwMvJYq8nUlOaLsry9s+fX28///73n4EB5jmAAEJlAVVzsWR7SV1cVwKMvF8fbq5vtHIzEkU2DiCAQG4C6mdjYkqKDRNg/7ftwNFvDJy/WcQY/v9lYubmFFU1sVb8yvng6NGjEA0AAQR1UkqEZ3sYs5oKj75NvORfJtH/rz+/eXr31I7Hf6R0VaQKQpTZxQwOHTkOVAkQQJCAZThy8dGXKEfmrzc0ZC4zaFow87sx/H/NIiimwSQt8n3Xr89vDh27ClEJEEBQDSGehmxfb72/fVXg97fLVzew235XVfjB/vTUg7tvJOSZbvwyOHbyLEQlQABBnXTzyVdNCeFPd8/zMv3++uIju5IU76fbzE/v8r278/39WzkjhxM3vz969BCoEiCAoDZ8//bl7S+ef28YfjO+/PKayfzTna/Pb3x48fbR829cvGy/3v2/duM2RCVAgAEAH40LLl2z5+MAAAAASUVORK5CYII=');
head.appendChild(candle);