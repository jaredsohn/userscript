// ==UserScript==
// @name           Mercado>Speed 3x NET
// @namespace      http://userscripts.org/users/23652
// @description    Replaces text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://speed.travian.net/build.php?*gid=17*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.51
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

/*
textNodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var searchRE = new RegExp('475','gi');
var replace = '555';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}

var searchRE = new RegExp('var carry = 6000','gi');
var replace = 'var carry = 40000';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}
*/

var madera = 0;
var barro = 0;
var hierro = 0;
var cereal = 0;
var total = 0;
var comerciantes = 0;
var maximacarga = 0;

var TDs = document.getElementsByTagName('td');
for (var i=0; i<TDs.length; i++)
{
    if (TDs[i].hasAttribute('id'))
	{
		if (TDs[i].getAttribute('id') == 'l4')
		{
			madera = TDs[i].innerHTML.split('/')[0];
		}
		if (TDs[i].getAttribute('id') == 'l3')
		{
			barro = TDs[i].innerHTML.split('/')[0];
		}
		if (TDs[i].getAttribute('id') == 'l2')
		{
			hierro = TDs[i].innerHTML.split('/')[0];
		}
		if (TDs[i].getAttribute('id') == 'l1')
		{
			cereal = TDs[i].innerHTML.split('/')[0];
		}
    }
    if (TDs[i].hasAttribute('class'))
	{
		if (TDs[i].getAttribute('class') == 'mer')
		{
			comerciantes = TDs[i].innerHTML.split(' ')[1].split('/')[0];
		}
	}
}

var As = document.getElementsByTagName('a');
for (var i=0; i<As.length; i++)
{
    if (As[i].hasAttribute('onMouseUp'))
	{
		if (As[i].getAttribute('onMouseUp') == 'add_res(1);')
		{
			carga = As[i].innerHTML.replace("(", "").replace(")", "");
		}
    }
}

maximacarga = comerciantes * carga;
total = parseFloat(madera) + parseFloat(barro) + parseFloat(hierro);
var ok = 'no';
var saldo = 0;

totalmax = total;
while( ok == 'no' )
{
	if (totalmax < maximacarga)
	{
		document.getElementsByName('r1')[0].value = madera - saldo;
		document.getElementsByName('r2')[0].value = barro - saldo;
		document.getElementsByName('r3')[0].value = hierro - saldo;
		//document.getElementsByName('r4')[0].value="123";
		ok = 'si';
	}
	saldo = saldo + 1000;
	totalmax = total - ( saldo * 3 );
}

document.getElementsByName('x')[0].value = 120;
document.getElementsByName('y')[0].value = 178;