// ==UserScript==
// @name           The-West Tüccar
// @namespace      www.the-west.org
// @include        http://*.the-west.*/game.php*
// @author         JoeSmith
// @version        1.0
// ==/UserScript==

function getItemTraderVersion() {
	return "1.0";
}

function init() {
  /* Load Itemtrader to refresh offering */
  AjaxWindow.show('item_trader', {action: 'index', h: h});
  AjaxWindow.close('item_trader');
  /* Insert Button */
  ItemTrader.addButton();
}

function addButton() {
  var menuElem = new Element('div',{'id':'menu_item_trader', styles:{background:'url(http://i649.photobucket.com/albums/uu217/JohnCooperED/traderbutton.jpg) 0px 0px'}});
  menuElem.innerHTML = '<a href="#" onclick="AjaxWindow.show(\'item_trader\', {action: \'index\', h: h});">' +
                       '  <img src=\"images/main/menu_highlight.png\" style=\"filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;\"/>' +
                       '  <span>H&auml;ndler</span>' +
                       '</a>';
  menuElem.injectAfter($('menu_inventory'));
  var marginTop =  parseInt($('workbar_left').getStyle('margin-top')) + 27;
  $('workbar_left').setStyle('margin-top', marginTop + 'px');
}




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