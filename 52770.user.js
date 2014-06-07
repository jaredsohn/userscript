// ==UserScript==
// @name		DS Übersicht Icons
// @description	Fuegt hinter die Dorflinks einen Rekrutieren und einen Hauptgebaeude Button
// @author 
// @namespace http://skzanderson.redio.de/
// @include        http://de*.die-staemme.de/*overview_villages*
// @include        http://de*.ds.ignames.net/*overview_villages*
// @Version	Version 1.1
// ==/UserScript==
try
{

	if(/screen=map/.test(location.href)) 
   {
	  throw "exit";
	 }

var icons = {
		main: 	'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMA'+
      'AA7EAAAOxAGVKw4bAAABXUlEQVQI12NggIFLx1Zu6Yw4sXUqAwZggbMeHV5/48ZdwadPT2ydKiqvrqzj'+
      'ApdihFDXz249v6KXk4352fvvHCyM4tLSIjq2Ft7ZCEXLSp3ef/31/ftPKRHe379/s7KycrIxv/v8Y9fF'+
      '1+XtbUZWQcy1acFffv4W4fgrwMv57M3n/0zMLIz/3n79zcHCeOXui+e3r0+eNZFx/+al9y+f5RcR/nJt'+
      'BysrKwMDw/uvvwS52Z69+Xzk8tNP336JioowMjAwnNi9nIGB4drp0zcuneTn41Lk/8vAwLDn5L13334x'+
      'MDCwc/MxMTAwWLhGPr5+kl9EmIGBgUtQ4cLjn8/efObg4fz07RcDA4OAmBwjcnjMayuSUJC7efGqur72'+
      'liUz3379LyAmJybIy4gWbtfPbmVjZ3//9veq6S3mTl5axgaaxt5MaIo0jb0hwSgpryWvbqRp7M2AB5w5'+
      'uB3OBgBU3IPo6Y0YYgAAAABJRU5ErkJggg==',
		recrut: 'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMA'+
      'AA7EAAAOxAGVKw4bAAABMUlEQVQI12PunNQiIip85eI1BmwgIi40NjmKWURU2NBEH6u60OggcwuTs6cv'+
      'MF+5eE1YWEhDS01MTPjalRtwFQEhvroGOtcuX1u2cBUzAwPD1UvXhIQFdQx1pKUkL1+8ysDAEBoVpGuo'+
      'c+Py9eWL1zAwMDBD9N24elNcQkxbX0tCUkxTR0PPSPfWtVsQFQhFDAwMVy9dFxMTVddSl1eUv3LhyrKF'+
      'q+BSTMgu/ff/PycX57dv39B8wAihiuNdnv0X1NLTvHbp+t+//3QNda5fvi7J8K534R4GBgYWuHI1Sd7r'+
      'l24sX7SagYHh////WrICX168Q1hXHO/CwMDw5cUjSUaoqBzrpy8vHsGlGIvjXRS1Le5fPQExGRnApZit'+
      'DJQ+vH6CqYKBgeH4xXuaUmwMDAwA6Cdy0l35vjsAAAAASUVORK5CYII=',
		group: 	'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMA'+
      'AAsTAAALEwEAmpwYAAABiElEQVQI13XQT0tUYRiG8fv8HZ3QYshsMTFMtIkWicmARLZzJUEEFbTqE7iN'+
      'VgUF0SoocOUmAlE0KIQwxAiFESKjidqMCUF6hkk9E2PO6X3f57lbROCm6wNci59H8tlyi4QVJwqnaqw4'+
      'USeaGSuOohoCUPJKpQf/6c70eghAVAHMrU86cVbdvu1YsVZcZrNbw/etlRCAsQIgal2OgG6g999jMBlP'+
      'Xj+86b8FySevkr2OJTm90iBJcrba+LX1olWbZ3szrc2GAKyoknPVZhD4z1ebgY+CWcrSutnNx57p6T3u'+
      'A8iMU0Uu9nIR4sgbyT+6WCl35TYOHUsb75+OTzV8ANYpybFzfV2hN5SvHj51Kduc8CO7vVIzA7f34mII'+
      'wKkCWPy4rcnirv/hSPdOEDP7WaqfuVEqFEW++AA6v42S6cL10fPDwbeNtYWtdzPNhNdKJ4oAPDAEIMK7'+
      'U/WjX3+Yz/PlsxfWJh+/Kd7bedkGPgFotTOP5F+VqyOFwZP9ldPl/fT72IPaQfQ/tvfcfHdKv1sAAAAA'+
      'SUVORK5CYII=',
		market:	'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMA'+
      'AA7EAAAOxAGVKw4bAAABx0lEQVQI1wG8AUP+AQAAAAAAANjKsdPArefd1PXu6fr5+w0UGBsmLi5AUyk4'+
      'UQAAAAIAAADRvqLBp44CAgRGYoMfLjogLz5KZoUCAgTBpYvPvKIAAAAC2suyzrig5NfMCREaKDdLCQsQ'+
      'CQwQKDhNERgd6+HXxK6Y18mvAaWCUwkLEA4VGc64qCk8S/Pr4fj2+xkjJ9fGtzFHW+3l3/j18ATx6OI2'+
      'Y2YlM0e1mXHayr0A/fn6+Prz7uYkNUhBWXzazLm5nHoBh1YcHCo5Cw0Q9PDo6d/X9e/p+/r8ChEYGCEq'+
      'Ehca9fLv4tTEAgMCAQAAAAAAAAMEAwQEA+7x/fT3AQwMBgkKBQMEAwUGBQABAwILEhg1S2RSc5sNFR//'+
      'AgccHhkcHxoBBAkQGCFObpgxRmAQFhoBo39SCQ4XDhQVz7mlKz1N7OTc/v4AFR0k18S0MUhc9u/q+fXs'+
      'AjRJW+nezserkTJGWUxpkAoOGBAUGU1qkDFGWMuxluzl2y1DWQIpOFM7UmsaJzLy7ObYybX59vD18u/Y'+
      'ybXy7OYZIy00SV4pN1EBAAAAAAAA2cqy0sCs6t/V9vDqAAAACxEXFiErLkBTJjVOAAAAUTO14Djxs6IA'+
      'AAAASUVORK5CYII=',
    center: 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
			'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVHjaYvz//z8DCBy5++3/z98QNgi8'+
			'/fidIcxchJEBDTCCNIAUc7MzMXCzIuRfffnL8OzNNwxNTHtvfAUrFuZiBgt8BdoCwmI8zAxSIlwM'+
			'Ezdc/4+sgQVEgEz+8fsfRPHPfxCNPxnAmtABE4yBrBhZDEMDyHPoAOT5n1gUw20AeRDmYZhCIaBz'+
			'3gHFsYbSqpNv/gvzc4IVwQBI8ZUbjxhMn3WB+VZZ8xnhGkAAPTRAwJZxP5j+8fQ0w90rRxlip91i'+
			'hGvABhZnqf1X1rFm4JA2hWtiYsADQCaCFIEUo/iBEADZBDMAIMAAitCChPuM2X0AAAAASUVORK5C'+
			'YII=',
		place:	'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMA'+
      'AA7EAAAOxAGVKw4bAAABYElEQVQI10XQu0oDURAG4H/PHrMRNRZGckFRENRKomARyIMo+Ao+gNiJlXba'+
      'CoI2YqEIAQsrEWy8kDIgQbxFs0nM5mQ3u+e2sViNU838fMPAGAAAXJydvHy8aaVNaiLsAQAxtNLpzMTq'+
      'ypoB4PjoQKleo9ngMsBfKRlIpTOp7GgiQQE8V0ou9wBQQgGoUCkhZCiFkI1mBYAR7W1srtv19/LTY2p8'+
      'EgDnzGHtoeFMOpk8OiwaAPb2dwHcP167npMayw4Pjrh+h7ktk1pLuQIhpgng8vIqtzRPyQDrfMesuEkt'+
      'rSUXASG05QTbWzskOjc7szA9NQfgq1a5fSi+Vss+9xcXCvnlPIBfJFTPJIRzFrPI3U09ZhHOmUmIUL1/'+
      'JIXLhXZY+/y0BOD8tOSwNhdaChcAjdBnrUrjcaG6/T8J1XWF57DmP5JSAPAD3Ud+oFUQRDnpp8z3bDvs'+
      'j7YdMt+L+h8WR7ibb1pTIAAAAABJRU5ErkJggg=='
	};
	function checkpa(){
	var Ergebnis = (document.getElementById("menu_row2").childNodes.length >= 10) ? true : false;
	return Ergebnis;
	}
	

	
	function dsrbCreateButton(url, icon, text) 
	{
		var link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('style', 'margin-left: 5px;');
		link.setAttribute('title', text);
		var img = document.createElement('img');
		img.setAttribute('src', icon);
		img.setAttribute('alt', text);
		link.appendChild(img);
		return link;
	};
	
	function CreateButtons(node) {
		var vilidpattern = /village=(\d+)&/;
		var m;
		
		m = vilidpattern.exec(node.href);
		var vilid = {own: m[1] };
		m = /(t=\d+&)/.exec(node.href);
		var uv = '';
		if(m) 
		 {
		   uv = m[1];
		 }
		
		//einzufï¿½gende Links erstellen
		var troops = dsrbCreateButton('game.php?' + uv + 'village='+ vilid.own + '&screen=main', icons.main, 'Hauptgebï¿½ude');
		var train  = dsrbCreateButton('game.php?' + uv + 'village=' + vilid.own + '&screen=train', icons.recrut, 'Rekrutieren');
		var group  = dsrbCreateButton('javascript:popup_scroll("groups.php?' + uv + '&mode=village&village_id=' + vilid.own + '", 300, 400);', icons.group, 'Gruppe ï¿½ndern');
		var market = dsrbCreateButton('game.php?' + uv + 'village=' + vilid.own + '&screen=market', icons.market, 'Markt');
		var place  = dsrbCreateButton('game.php?' + uv + 'village=' + vilid.own + '&screen=place', icons.place, 'Platz');
	  var center = dsrbCreateButton('game.php?village=' + vilid.own + '&screen=map', icons.center, 'Auf Karte zentrieren');		
		
		//Links hinter dem Dorf-Link einfï¿½gen einfach mit // ausblenden wenn nicht erwï¿½nscht
	  node.parentNode.insertBefore(center, node.nextSibling);		
		node.parentNode.insertBefore(group, node.nextSibling);
		node.parentNode.insertBefore(train, node.nextSibling);
		node.parentNode.insertBefore(market, node.nextSibling);
		node.parentNode.insertBefore(place, node.nextSibling);
		node.parentNode.insertBefore(troops, node.nextSibling);
	};

	function check_url(node)
	{
		var Ergebnis=true;
		//alert(node.firstChild.nodeValue);
		if ((/.+overview_.+/.test(node.href)) ||  (/\S+/.test(node.firstChild.nodeValue)))
		 {
			Ergebnis=false;
		 }
		return Ergebnis;		
	}
	
	if(checkpa())
	{
	var cut=false;
		var nodes = document.getElementsByTagName('a');
		for(var i = 0; i < nodes.length; i++) {
			if((/village=\d+&screen=overview/.test(nodes[i].href)) && (check_url(nodes[i]))) {
			CreateButtons(nodes[i]);
			cut=true;
			}
		}
		if (cut) {cutName();}
		
	}
	

	
} catch(err) {
	// be silent on errors
}