// ==UserScript==
// @name           Solar Combat Armory
// @namespace      http://azrael.awardspace.co.uk/
// @description    Automatically puts a number in the biggest weapon box.
// @include        http://www.solarcombat.net/armory.php*
// @include        http://solarcombat.net/armory.php*
// ==/UserScript==
function comma(number)  {
  number = '' + number;
  if (number.length > 3) {
    var mod = number.length % 3;
    var output = (mod > 0 ? (number.substring(0,mod)) : '');
    for (i=0 ; i < Math.floor(number.length / 3); i++) {
      if ((mod == 0) && (i == 0))
        output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
      else
        output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return (output);
  }
  else return number;
}
//==find amount of personnel
tds = document.getElementsByTagName('td')
for (i=50; i<tds.length; i++) {
  switch (tds[i].innerHTML) {
    case "<b>Trained Attack Soldiers:</b>" :
      attackers = tds[i+1].innerHTML;
    break;
    case "<b>Trained Defense Soldiers:</b>" :
      defenders = tds[i+1].innerHTML;
    break;
    case "<b>Untrained Soldiers</b>" :
      untrained = tds[i+1].innerHTML;
    break;
    case "<b>Spies:</b>" :
      spies = tds[i+1].innerHTML;
    break;
    case "<b>Sentries:</b>" :
      sentries = tds[i+1].innerHTML;
    break;
} }

//==multiply them to genereate the income
attackers = (attackers.replace(/,/gi,"")) * 25;
defenders = (defenders.replace(/,/gi,"")) * 25;
untrained = (untrained.replace(/,/gi,"")) * 25;
spies     = (spies.replace(/,/gi,"")) * 12.5;
sentries  = (sentries.replace(/,/gi,"")) * 12.5;

income = attackers + defenders + untrained + spies + sentries;
gold = document.getElementsByTagName('font')[3].innerHTML.replace(/\D/gi,'');
form = document.forms.namedItem('buyform');
script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = ' \
function maxbuy(input,price) { \n\
  gold = document.getElementsByTagName(\'font\')[3].innerHTML.replace(/\\D/gi,\'\'); \n\
  input.value = Math.floor(gold / price); \n\
} ';
document.getElementsByTagName('head')[0].appendChild(script);

buttons = new Array(); inputs = new Array(); dbuttons = new Array(); dinputs = new Array();
for (i = 0; i < 9; i++) { // insert max buttons for attack weapons
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
  buttons[i].href = 'javascript: maxbuy(document.forms["buyform"].buy_w'+i+','+cost+')';
  inputs[i] = form.elements.namedItem('buy_w'+i);
  inputs[i].size = 5;
  inputs[i].value = '';
  inputs[i].parentNode.insertBefore(buttons[i],inputs[i].nextSibling)
  if (i > 0) {
    dbuttons[i-1] = document.createElement('a');
    dbuttons[i-1].innerHTML = ' max';
    dbuttons[i-1].href = 'javascript: maxbuy(document.forms["buyform"].buy_dw'+(i-1)+','+cost+')';
    dinputs[i-1] = form.elements.namedItem('buy_dw'+(i-1));
    dinputs[i-1].size = 5;
    dinputs[i-1].value = '';
    dinputs[i-1].parentNode.insertBefore(dbuttons[i-1],dinputs[i-1].nextSibling)
} }

//==display some stats
document.getElementsByTagName("td")[33].innerHTML = '<strong>Armory Stats</strong<br /> \n\
Income: <br /><font color="#ff0000">'+comma(income)+'</font><br /> \n\
';
