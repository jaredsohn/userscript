// ==UserScript==
// @name           TEST
// @version        0.2
// @license        GPLv3 : http://www.gnu.org/licenses/gpl-3.0.txt
// @author         TEST
// @description    TEST
// @include        https://www.google.com/analytics/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/gierschv/jQuery-plugin-fireEvent/master/jquery.fireEvent.js
// ==/UserScript==



function drawVisualization() {
  var data = new google.visualization.DataTable();
  data.addRows(1);
  data.setValue(0, 0, new Date(2008, 1 ,1));
  
  
  var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
      document.getElementById('visualization'));
  alert(annotatedtimeline );
  annotatedtimeline.draw(data, {'displayAnnotations': true});
}
