// ==UserScript==
// @name List Challenges TODO
// @description Display incomplete list items at the top of list challenges.
// @namespace ffx
// @version 1
// @match http://www.listchallenges.com/100foods/
// @match http://www.listchallenges.com/bannedbookschallenge/
// @match http://www.listchallenges.com/beerlistchallenge/
// @match http://www.listchallenges.com/booklistchallenge/
// @match http://www.listchallenges.com/candylistchallenge/
// @match http://www.listchallenges.com/foodlistchallenge/
// @match http://www.listchallenges.com/gamelistchallenge/
// @match http://www.listchallenges.com/horrormovies/
// @match http://www.listchallenges.com/icecreamchallenge/
// @match http://www.listchallenges.com/movielistchallenge/
// @match http://www.listchallenges.com/romcomchallenge/
// @match http://www.listchallenges.com/travellistchallenge/
// @match http://www.listchallenges.com/ustravelerchallenge/
// @match http://www.listchallenges.com/worldtravelerchallenge/
// ==/UserScript==

function main() {
  var list = document.getElementById('ctl00_C_PList');
  if (list === null) {
    return;
  }

  var tbody = list.getElementsByTagName('tbody')[0];
  var rows = tbody.getElementsByTagName('tr');
  var todo = [];
  var done = [];

  for (var i = rows.length - 1; i >= 0; i--) {
    var checkbox = rows[i].getElementsByTagName('input')[0];
    if (checkbox.checked) {
      done.unshift(tbody.removeChild(rows[i]));
    }
  }

  for (var i = 0; i < done.length; i++) {
    tbody.appendChild(done[i]);
  }
}

main();
