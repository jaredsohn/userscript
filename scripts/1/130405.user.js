// ==UserScript==
// @name          Debian Mass Spam
// @author        Luca Falavigna <dktrkranz@debian.org>
// @version       0.1
// @license       GPL-3+
// @namespace     http://www.debian.org
// @description	  Nominate all messages with keyboard shortcuts
// @include       https://lists.debian.org/cgi-bin/review/review2.pl*
// ==/UserScript==

var regex = new RegExp('Keys: .* respectively', 'g');
var desc = 'Keys: <b>j</b>/<b>k</b> move down/up, \
            <b>a</b>/<b>s</b>/<b>d</b>/<b>f</b> mark current entry as \
            Unsure/Ham/Inappropriate/Spam respectively, \
            <b>z</b>/<b>x</b>/<b>c</b>/<b>v</b> mark all entries as \
            Unsure/Ham/Inappropriate/Spam respectively';
document.body.innerHTML = document.body.innerHTML.replace(regex, desc);

document.addEventListener('keydown', detectEvent, true);
if(document.captureEvents) document.captureEvents(Event.KEYDOWN);

function detectEvent(e)
{
  var evt = e || window.event;
  var pos = parseInt(window.location.hash.substring(1)) || 10+1;
  var elPrefix = '';

  switch(evt.keyCode) {
    case 74: // j
      pos -= 1;
      if (pos < 1) { pos = 1; }
      break;
    case 75: // k
      pos += 1;
      if (pos > 10) { pos = 10; }
      break;
    case 65: // a
      elPrefix = 'u';
      break;
    case 83: // s
      elPrefix = 'h';
      break;
    case 68: // d
      elPrefix = 'i';
      break;
    case 70: // f
      elPrefix = 's';
      break;
    case 90: // z
      fullPrefix = 'u';
      break;
    case 88: // x
      fullPrefix = 'h';
      break;
    case 67: // c
      fullPrefix = 'i';
      break;
    case 86: // v
      fullPrefix = 's';
      break;
  }

  if (1 <= pos && pos <= 10) {
    window.location.hash = pos;
  }

  if (elPrefix != '') {
    document.getElementById(elPrefix+pos).checked = true;
  }

  if (fullPrefix != '') {
    for (i = 0; i < 10; i++) {
      id = document.getElementById(fullPrefix+i);
      if (id) {
        id.checked = true;
      }
    }
  }

  return document.defaultAction;
}
