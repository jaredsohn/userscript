// ==UserScript==
// @name moodle.hu-berlin.de Frameset
// @version 0.0.5
// @include *moodle.hu-berlin.de*
// ==/UserScript==


if (document.getElementsByTagName("frameset")[0].rows && document.location.href.indexOf('moodle.hu-berlin.de'))
{
var _iRow = "90,100%";
document.getElementsByTagName ("frameset")[0].rows = _iRow;
}
