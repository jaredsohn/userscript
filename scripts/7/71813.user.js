// ==UserScript==
// @name        UTM Stripper
// @namespace   http://userscripts.org/scripts/show/71813
// @description Strips Urchin Tracker Module (UTM) tags from visited URLs
// @why         UTM makes URLs way too long, possibly confuses URL-sharing sites
// @note        UTM Stripper does NOT prevent analytics data from being sent out. This script only runs after a page has loaded WITH the UTM tags in place. 
// @copyright   2010+, Michael Gram, http://userscripts.org/scripts/show/71813
// @license     GPLv3--http://www.gnu.org/copyleft/gpl.html
// @license     Creative Commons--http://creativecommons.org/licenses/by-nc-sa/3.0
// @version     1.0.2
// @include     http://*.tld/*utm_source*
// ==/UserScript==

function stripUTM()
{
var utm_href = window.location.href

var utm_index = utm_href.indexOf("?utm_source")

if (utm_index == -1)
    {
    utm_index = utm_href.indexOf("&utm_source")
    }

var new_href = utm_href.substr(0, utm_index)

window.location.href = new_href
}

window.setTimeout(stripUTM,0)

