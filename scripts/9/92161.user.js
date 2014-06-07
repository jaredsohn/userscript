// ==UserScript==
// @name           Days of the Week
// @namespace      http://userscripts.org/users/79156
// @include        http://www.nesba.com/Info/TrackEvents.htm
// @include        http://www.nesba.com/Info/TrackEvents.htm?*
// @include        https://www.nesba.com/MemberServices/MemberTrackEvents.htm
// @include        https://www.nesba.com/MemberServices/MemberTrackEvents.htm?*
// ==/UserScript==

(function () {
  var dayNames = ['Su', 'M', 'T', 'W', 'R', 'F', 'Sa'];

  function addDaysOfTheWeek() {
    var rows = document.evaluate("//tr[contains(@class, 'NListItem')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < rows.snapshotLength; i++) {
      var row = rows.snapshotItem(i);
      var tds = row.getElementsByTagName('td')
      for(var j = 0; j < tds.length; j++) {
        var td = tds[j];
        var parts = td.textContent.split("/");
        if(parts.length != 3)
          continue;
        var day = (new Date(parts[2], parseInt(parts[0])-1, parts[1])).toDateString().split(" ")[0];
        td.innerHTML = day + '&nbsp;' + parts[0] + '/' + parts[1] + '/' + parts[2].substr(2);
        break;
      }
    }
  }

  addDaysOfTheWeek();
})();
