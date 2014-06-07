// ==UserScript==
// @name           The West - WR Ally Forum Button
// @namespace      http://wr-ally.forumeiros.com
// @description    Add button for Ally WR - Western Ranch Fórum (v1.1)
// @icon           http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license        GNU Lesser General Public License (LGPL)
// @copyright      2011, Claudiney Walter (The-West BR8,BR10)
// @include        http://br10.the-west.com.br/game.php*
// @author         CWalter
// @version        1.1
//
// @history        1.1 New Button Graphics
// @history        1.0 Creation
// ==/UserScript==

var ally_button = "1.1";

function getItemTraderVersion() {
	return "1.0";
}

function init() {

  /* Insert Button */
  ItemTrader.addButton();
}

function addButton() {
  var menuElem = new Element('div',{'id':'menu_item_trader', styles:{background:'url(http://img692.imageshack.us/img692/4922/wralyworkbarlefts.png) 0px 0px'}});
  menuElem.innerHTML = '<a target="_blank" href="http://wr-ally.forumeiros.com">' +
                       '  <img src=\"images/main/menu_highlight.png\" style=\"filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0;\"/>' +
                       '  <span>H&auml;ndler</span>' +
                       '</a>';
  menuElem.injectAfter($('menu_townforum'));
  var marginTop =  parseInt($('workbar_left').getStyle('margin-top')) + 27;
  $('workbar_left').setStyle('margin-top', marginTop + 'px');
}

/*http://img853.imageshack.us/img853/1347/wralyworkbarright.png*/
/*http://img692.imageshack.us/img692/4922/wralyworkbarlefts.png*/


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