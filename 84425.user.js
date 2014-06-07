// ==UserScript==
// @name		Cinestar Reservation Injection
// @namespace		lorus.org
// @description		Injects back the reservation button on pages, where it was disabled by cinestar
// @include		*.global-ticketing.com/gt/selectseats?*
// @include		*.global-ticketing.com/gt/placement?*
// ==/UserScript==

/* FUCK CINESTAR
  FUCK YOU FOR
    - disabling reservation on some shows
    - forcing us to buy the tickets for this shows
    - your fucking system fee, when buying a ticket
  FUCK
*/

var fonts = document.getElementsByTagName('font');

for (i=0;i<fonts.length;i++) {
    comp = "Für diesen Film ist keine Reservierung möglich, bzw. stehen keine reservierbaren Plätze mehr zur Verfügung. Bitte nutzen Sie den Online-Kauf.<br>";
    if (fonts[i].innerHTML == comp) {
      docking = i;
      break;
    }
}

fonts[docking].innerHTML = 'Ich m&ouml;chte nur reservieren und hole die Karten sp&auml;testens 30 Minuten vor Beginn ab.<br />';

submit = document.createElement('input');
submit.setAttribute('class','sbt',0);
submit.setAttribute('type','submit',0);
submit.setAttribute('value','Reservieren',0);
submit.setAttribute('style','',0);
submit.setAttribute('name','ReserveTickets',0);

fonts[docking].parentNode.insertBefore(submit, fonts[docking].nextSibling);

injectText = document.createElement('font');
injectText.setAttribute('font', 'face', 0);
injectText.setAttribute('size', '-1', 0);
injectText.setAttribute('color', '#9a302e', 0);
injectText.setAttribute('style', 'font-size: 9px;', 0);
injectText.innerHTML = '<br>(Injected by <a href="http://lorus.org/blog/" target="_blank">Lorus</a>)<br>';
submit.parentNode.insertBefore(injectText, submit.nextSibling);