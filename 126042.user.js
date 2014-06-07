// ==UserScript==
// @name       mb: add lines to timeline graph
// @namespace  http://ianmcorvidae.net/
// @version    0.3
// @description  Add custom lines to MB timeline graph, with a nice shiny little box (uses the database statistic names, though, so you'll need to know those)
// @match      http://*musicbrainz.org/statistics/timeline/*
// @match      https://*musicbrainz.org/statistics/timeline/*
// @include    http://*musicbrainz.org/statistics/timeline/*
// @include    https://*musicbrainz.org/statistics/timeline/*
// @copyright  2012+, Ian McEwen
// ==/UserScript==

function add_interactive_graph_control() {
          var line = document.createElement('tr');
          line.innerHTML = '<th>Add a line:</th><td><form id="add-line-form" action="" method="get"><input id="add-line-input" type="text" name="id" style="width: 100%"></input><input type="submit" value="Go"></input></form></td></tr>'
          document.getElementById('graph-controls').firstChild.nextSibling.appendChild(line);
          document.getElementById('add-line-form').onsubmit = function () {
              var line = document.getElementById('add-line-input').value;
              MB.Timeline.addControls(line);
              window.location.hash = location.hash + '+';
              return false;
          }
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ add_interactive_graph_control +')();'));
document.body.appendChild(script);