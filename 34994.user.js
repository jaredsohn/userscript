// ==UserScript==
// @name           Solar Combat Armoury Working Version: Era Beta 6 | Era 6
// @namespace      http://userscripts.org/iDavey2008
// @description    Adds Max Buttons to Armoury
// @include        http://www.screloaded.com/armory.php*
// @include        http://screloaded.com/armory*
// ==/UserScript==


gold = parseInt(document.getElementsByTagName('font')[2].innerHTML.replace(/\D/gi,'')) + parseInt(document.getElementsByTagName('font')[3].innerHTML.replace(/\D/gi,''));
form = document.forms.namedItem('buyform');
script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = ' \
function maxbuy(input,price,gold) { \n\
  input.value = Math.floor(gold / price); \n\
} ';
document.getElementsByTagName('head')[0].appendChild(script);
tds = document.getElementsByTagName('td')
for (i=15; i<30; i++) {
  switch (tds[i].innerHTML) {
    case "Gold:" :
      gold = tds[i+1].innerHTML.replace(/\D/gi,'');
   break;
} }

buttons = new Array(); inputs = new Array(); dbuttons = new Array(); dinputs = new Array();
for (i = 0; i < 9; i++) { // Values set to Space Marines, adjust according to race 
  switch(i) {
    case 0: cost = 1900; break;
    case 1: cost = 3500; break;
    case 2: cost = 15000; break;
    case 3: cost = 50000; break;
    case 4: cost = 225000; break;
    case 5: cost = 400000; break;
    case 6: cost = 750000; break;
    case 7: cost = 1800000; break;
    case 8: cost = 3500000; break;
    default: cost = 1; break;
  }
  buttons[i] = document.createElement('a');
  buttons[i].innerHTML = ' max';
  buttons[i].href = 'javascript: maxbuy(document.forms["buyform"].buy_w'+i+','+cost+', '+gold+')';
  inputs[i] = form.elements.namedItem('buy_w'+i);
  inputs[i].size = 5;
  inputs[i].value = '';
  inputs[i].parentNode.insertBefore(buttons[i],inputs[i].nextSibling)
  if (i > 0) {
    dbuttons[i-1] = document.createElement('a');
    dbuttons[i-1].innerHTML = ' max';
    dbuttons[i-1].href = 'javascript: maxbuy(document.forms["buyform"].buy_dw'+(i-1)+','+cost+', '+gold+')';
    dinputs[i-1] = form.elements.namedItem('buy_dw'+(i-1));
    dinputs[i-1].size = 5;
    dinputs[i-1].value = '';
    dinputs[i-1].parentNode.insertBefore(dbuttons[i-1],dinputs[i-1].nextSibling)
} }


