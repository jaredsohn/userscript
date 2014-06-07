// ==UserScript==
// @name          Binghamton Buwireless Bluesocket Bounce Back
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Return to the previous web page after logging in to buwireless
// @include       https://bluesocket.binghamton.edu/login.pl?*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-02-17 - Started

*/

var form = document.forms.namedItem('bluesocket_u');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  var inputs = form.getElementsByTagName('input');
  var queryParams = [];
  for(var c = inputs.length - 1; c >= 0; c--) {
    queryParams.push(encodeURIComponent(inputs[c].name) + '=' + encodeURIComponent(inputs[c].value));
  }
  var query = queryParams.join('&');

  var http = new XMLHttpRequest;
  http.open(form.method, form.action, true);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      location.href = document.getElementsByName('destination')[0].value;
    }
  }
  http.send(query);
}, false);