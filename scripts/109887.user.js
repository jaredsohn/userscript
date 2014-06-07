// ==UserScript==
// @name الأوامر على القرية من عدة أماكن .. في منتدى القبيلة أو البريد أو بروفايل اللاعب ..
// @description Fügt hinter Links zu Dörfern Buttons hinzu
// @author Michael Richter
// @namespace http://osor.de/
// @include http://ae*.tribalwars.ae/game.php*
// ==/UserScript==
// -----------------------------------------------------------------------------
// center icon by Mark James, http://www.famfamfam.com/lab/icons/silk/

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function() {

	if(/screen=map/.test(location.href)) {
	  return;
	}
	
	var icons = {
		center: 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
			'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVHjaYvz//z8DCBy5++3/z98QNgi8'+
			'/fidIcxchJEBDTCCNIAUc7MzMXCzIuRfffnL8OzNNwxNTHtvfAUrFuZiBgt8BdoCwmI8zAxSIlwM'+
			'Ezdc/4+sgQVEgEz+8fsfRPHPfxCNPxnAmtABE4yBrBhZDEMDyHPoAOT5n1gUw20AeRDmYZhCIaBz'+
			'3gHFsYbSqpNv/gvzc4IVwQBI8ZUbjxhMn3WB+VZZ8xnhGkAAPTRAwJZxP5j+8fQ0w90rRxlip91i'+
			'hGvABhZnqf1X1rFm4JA2hWtiYsADQCaCFIEUo/iBEADZBDMAIMAAitCChPuM2X0AAAAASUVORK5C'+
			'YII=',
		overview: 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
			'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEYSURBVHjaYvr//z8DKZiFAQpuXtjz/9qe'+
			'FQzfX9xl4JRQZpA2dGAwc45hZEADLOiKn3/8ycDw8RqYDQT/+YUlGNQNXOAaGUHW9KZa/ZfkZ0cx'+
			'CaQRJIZuG/Ovp5f+K/P/RlHIy8ECxiCwfOtJhiN79jAoKYs3SCvpNbIERAQxPHv4nOHu8fVgE0EY'+
			'7CwoEObnYXj78QvDrPZmsBMZb5zf/R/E2rZ8BViB+N+7KLYdufAQxalMIA+BPOwVGcGgqK7O8JJZ'+
			'mUHFMxms+Pr9t3CFmgbmDHZOngxMIE5gyRxGkMaApFJGkCZQyDAJacEVwoC1mwNEA3JcaBoZgp0H'+
			'0ohsupmlJYSDL1ZB/ls/t+s/shg4HkgBAAEGAIt+s+W6POI5AAAAAElFTkSuQmCC',
		troops: 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
			'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVHjaYvz//z8DKYAJmXP/5pn/IIxP'+
			'AwsyZ9XUfjAdll34X1HdhBFmyNQZi8Hi2RmxDCwlhflgE789us5w59EzsMTDp1UMXHKa/2VlZBjk'+
			'FBQYQDSGk4AKGJDZIEViokJwMRibKSzYE8y4dGQvmNazcUYxEaaYg5sP4gczGw+QW//DNCADmCIQ'+
			'4OdmZAD5C+zpL1++MKjISWGY+uPrJ4ZXr9+B+ZFxyYxwP7x89REsGJKaBnbO4ydP4AoxgvXUkR3/'+
			'D29cySAvLcrg5BHC6OQBkQCJ3733FKwZ2U8sx09ehrhX3gDFJJDfzGwYGCzMz/x//foNQsPNY7vB'+
			'DF1tRaxOAHlUUR3BBwgwAEYlXJRjpIvlAAAAAElFTkSuQmCC'
	};

	var dsrbCreateButton = function(url, icon, text) {
		var link = document.createElement('a');
		link.href = url;
		link.setAttribute('style', 'margin-left: 5px;');
		link.title = text;
		var img = document.createElement('img');
		img.src = icon;
		img.alt = text;
		link.appendChild(img);
		return link;
	};
	
	var dsrbAddButtons = function(node) {
		var coordpattern = /\((\d+)\|(\d+)\) K\d+$/;
		var vilidpattern1 = /village=(\d+)/;
		var vilidpattern2 = /id=(\d+)/;
		var m;
		if(m = coordpattern.exec(node.textContent)) {
			var coords = [m[1], m[2]];
		} else if(node.parentNode.nextSibling) {
		  var coords = node.parentNode.nextSibling.textContent.split('|');
		}
		m1 = vilidpattern1.exec(node.href);
		m2 = vilidpattern2.exec(node.href);
		var vilid = {own: m1[1], target: m2[1]};
		m = /(t=\d+&)/.exec(node.href);
		var uv = '';
		if(m) {
			uv = m[1];
		}

		var overview = dsrbCreateButton('game.php?' + uv + 'village=' + vilid.target + '&screen=overview', icons.overview, 'Dorf-Übersicht');
		if(coords) {
			var center = dsrbCreateButton('game.php?' + uv + 'village=' + vilid.own + '&screen=map&x=' + coords[0] + '&y=' + coords[1], icons.center, 'أظهر القرية على الخريطة');
		}
		var troops = dsrbCreateButton('game.php?' + uv + 'village=' + vilid.own + '&screen=place&mode=command&target=' + vilid.target, icons.troops, 'الهجوم على القرية');

		node.parentNode.insertBefore(troops, node.nextSibling);
		if(coords) {
			node.parentNode.insertBefore(center, node.nextSibling);
		}
		node.parentNode.insertBefore(overview, node.nextSibling);
	};

	var nodes = document.getElementsByTagName('a');
	for(var i = 0; i < nodes.length; i++) {
		if(/village=\d+/.test(nodes[i].getAttribute('href')) && /screen=info_village/.test(nodes[i].getAttribute('href')) && /id=\d+/.test(nodes[i].getAttribute('href'))) {
			dsrbAddButtons(nodes[i]);
		}
	}
	
})();