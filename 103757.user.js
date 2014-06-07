// ==UserScript==
// @name The-West kereskedő gomb
// @description Egy új, kereskedő gomb jelenik meg a főmenüben, így sokkal egyszerűbben lehet azt elérni
// @author hepike
// @namespace http://google.com
// @include http://*.the-west.*/game.php*
// @include http://*.thewest.*/game.php*
// @include http://*.the-west.*/forum.php*
// ==/UserScript==

function getItemTraderVersion() {
	return "1.0";
}

function init() {
  /* Load Itemtrader to refresh offering */
 
  /* Insert Button */
  ItemTrader.addButton();
}
//http://users.atw.hu/h15/hepike/j/kereskedo.jpg
function addButton() {
  var menuElem = new Element('div',{'id':'menu_item_trader', styles:{background:'url(http://h15.mine.nu/hepike/kereskedo2.jpg) 0px 0px'}});
  menuElem.innerHTML = '<a href="#" onclick="AjaxWindow.show(\'item_trader\',{action:\'index\',h:h});">' +
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