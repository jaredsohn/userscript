// ==UserScript==
// @name        Page Title Shortener
// @namespace   PageTitleShortener
// @description Shortens a webpage's title based on user-defined rules. Useful for sites such as wikis that have long titles.
// @copyright   Kha0sK1d
// @license     Attribution-NonCommercial 3.0 United States (CC BY-NC 3.0 US); http://creativecommons.org/licenses/by-nc/3.0/us/
// @version     1.0
// @date        12/23/2012
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js 
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

/* 
 * =============================================================================
 * README
 * =============================================================================
 *
 * After installation, follow these steps:
 * 1) Go to Firefox's about:config page (type "about:config" into the address bar).
 * 2) Right-click anywhere and choose the menu option to create a new string.
 * 3) Give the preference name "extensions.greasemonkey.scriptvals.PageTitleShortener/Page Title Shortener.data"
 * 4) Set the value to the rules you want. Use the data format below. See the example or refer to http://www.json.org/ for more help.
 * 5) Add the website URL regex to the list of included pages via the Greasemonkey add-on page options. This list must be kept in sync with changes you make to the data preference variable.
 *
 * Data format - JSON array format with field values as follows:
 * 0 = wesite URL match (regex)
 * 1 = text want to replace (regex)
 * 2 = text to replace with (plaintext)
 *
 * Example:
 *  - extensions.greasemonkey.scriptvals.PageTitleRewriter/Page Title Shortener.data = [["darksoulswiki.wikispaces.com", "Dark Souls Wiki -", "DS: "]]
 *
 * NOTE: If the data is incorrectly formatted, the script may crash.
 * =============================================================================
 */

setGMValueIfUnset();
 
var tData = getData();

var tTitleOriginal = document.title;
var tUrl = document.URL;

var tFoundElement = null;

for (var i = 0; i < tData.length; ++i)
{
   if (tUrl.search(tData[i][0]) != -1)
   {
      tFoundElement = tData[i];
      rewriteTitle(tFoundElement);
      // NOTE: Don't break because we could apply multiple rewrites.
   }
}

//------------------------------------------------------------------------------

function getData()
{
   var tJsonString = GM_getValue("data", "[]");
   
   var tData = $.evalJSON(tJsonString);
   
   return tData;
}

//------------------------------------------------------------------------------

function rewriteTitle(aElement)
{
   var tTextToReplace = new RegExp(aElement[1]);
   var tTextToReplaceWith = aElement[2];
   
   var tTitleNew = tTitleOriginal.replace(tTextToReplace, tTextToReplaceWith);
   document.title = tTitleNew;
}

//------------------------------------------------------------------------------

function setGMValueIfUnset()
{
   var tVal = GM_getValue("data", "unset");
   
   if (tVal == "unset")
   {
      GM_setValue("data", "[]");
   }
}
