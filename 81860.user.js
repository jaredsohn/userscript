// ==UserScript==
// @id           gaPGTitleSegmentation@erikvold.com
// @name         Google Analytics Page Title Segmentation
// @namespace    gaPGTitleSegmentation
// @include      https://www.google.com/analytics/reporting/*
// @datecreated  2010-07-19
// @lastupdated  2010-07-19
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will add the option to segment by 'Page Title' in Google Analytics.
// ==/UserScript==

(function(d){
  var addHammer = function() {
    if (d.getElementById('ev-pgTitleSegItem')) return;

    var sourceSeg = d.evaluate("//div[@id='SegmentDropdown1_listing']//ul/li/a[contains(text(), 'Source')]", d, null, 9, null).singleNodeValue;
    if (!sourceSeg) return;

    var newLi = d.createElement('li');
    var newA = d.createElement('a');

    newA.setAttribute("id", "ev-pgTitleSegItem");
    newA.setAttribute("href", 'javascript:analytics.PropertyManager._getInstance()._broadcastChange("segment_by","page_title", "1")');
    newA.innerHTML = 'Page Title';

    newLi.appendChild(newA);

    sourceSeg.parentNode.parentNode.insertBefore(newLi, sourceSeg.parentNode);
  };

  d.addEventListener("DOMNodeInserted", addHammer, false);

  addHammer();
})(document);
