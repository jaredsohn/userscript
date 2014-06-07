// ==UserScript==
// @name       NRK OL uten chat
// @namespace  http://nrk.no/ol2012/
// @version    0.1
// @description  Mulighet for å skjule chatten og heller vise stor video.
// @match      http://nrk.no/ol2012*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var state = false
var rotate = '-moz-transform:rotate(-90deg); -moz-transform-origin: bottom right; -webkit-transform: rotate(-90deg); -webkit-transform-origin: bottom right; -o-transform: rotate(-90deg); -o-transform-origin: bottom right;';

$('body').prepend('<div id="close-chat" class="pa-submit" style="position: absolute; top: 300px; right: 0; margin: 0; ' + rotate + '">Skjul chatten</div>');

$('#close-chat').on('click', function () {
  if (state) {
    $(this).text('Skjul chatten')
    $('#container .channel-chooser-wrapper .section.widget .fr').show();
    $('#container .channel-chooser-wrapper .section.widget .fl').removeClass('g100').addClass('g66');
  }
  else {
    $(this).text('Vis chatten')
    $('#container .channel-chooser-wrapper .section.widget .fr').hide();
    $('#container .channel-chooser-wrapper .section.widget .fl').removeClass('g66').addClass('g100');
  }

  state = !state
});