// ==UserScript==
// @name           The-West Crafting button
// @namespace      Crafting,button,the,west
// @include        http://*.the-west.*/game.php*
// @author         Taubda
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
  var menuElem = new Element('div',{'id':'menu_item_trader', styles:{background:'url(http://img832.imageshack.us/img832/4442/ustalik.png) 0px 0px'}});
  menuElem.innerHTML = '<a href="#" onclick="Crafting.open();">' +
                       '  <img src=\"images/main/menu_highlight.png\" style=\"filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;\"/>' +
                       '  <span>H&auml;ndler</span>' +
                       '</a>';
  menuElem.injectAfter($('menu_inventory'));
  var marginTop =  parseInt($('workbar_left').getStyle('margin-top')) + 27;
  $('workbar_left').setStyle('margin-top', marginTop + 'px');
}

/*http://img849.imageshack.us/img849/3886/crafting2c.png*/


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