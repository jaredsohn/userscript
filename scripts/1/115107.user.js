// ==UserScript==
// @name           EUD Gadget 1.0
// @namespace      http://www.elultimoduelo.com/
// @include        http://*.the-west.*/game.php*
// @author         William Manney
// @version        1.0
// ==/UserScript==

function getItemTraderVersion() {
	return "1.0";
}

function init() {

  /* Insert Button */
  ItemTrader.addButton();
}

function addButton() {
  var menuElem = new Element('div',{'id':'menu_item_trader', styles:{background:'url(http://dl.dropbox.com/u/28407657/EUD%20gadget/EUDbutton1.png) 0px 0px'}});
  menuElem.innerHTML = '<a target="_blank" href="http://www.elultimoduelo.com/">' +
                       '  <img src=\"images/main/menu_highlight.png\" style=\"filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0;\"/>' +
                       '  <span>H&auml;ndler</span>' +
                       '</a>';
  menuElem.injectAfter($('menu_achievement'));
  var marginTop =  parseInt($('workbar_left').getStyle('margin-top')) + 27;
  $('workbar_left').setStyle('margin-top', marginTop + 'px');
}

/*http://dl.dropbox.com/u/28407657/EUD%20gadget/EUDbutton1.png*/


var itemTraderFunctions = ['init', 'addButton']; 
var itemTraderScript = document.createElement('script');
itemTraderScript.type='text/javascript';
itemTraderScript.text =  'if(window.ItemTrader == undefined) {\n';
itemTraderScript.text += '  window.ItemTrader = new Object();\n';

for (var i = 0; i< itemTraderFunctions.length; i++) {
  var itFunction = itemTraderFunctions[i];
  itemTraderScript.text += '  ItemTrader.' + itFunction + ' = ' + eval(itFunction.toString()) + '\n';
};
itemTraderScript.text += '  ItemTrader.init();\n';
itemTraderScript.text += '}';
document.body.appendChild(itemTraderScript);