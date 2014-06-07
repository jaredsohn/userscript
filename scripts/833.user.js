// ==UserScript==
// @name        dieselsweeties
// @description Diesel sweeties
// @include     http://www.dieselsweeties.com/archive.php*
// @include     http://dieselsweeties.com/archive.php*
// ==/UserScript==
var search = window.location.search;
if (search.substring(0,6) == "?hipng")
{
	var Titles, thisTitle;
Titles = document.evaluate(
    '//b',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisTitle = Titles.snapshotItem(1);
document.title = 'diesel sweeties: ' + thisTitle.textContent;
} else if (search.substring(0,2) == "?s")
{
var Titles, thisTitle;
Titles = document.evaluate(
    '//b',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisTitle = Titles.snapshotItem(0);
document.title = 'diesel sweeties: ' + thisTitle.textContent;
}