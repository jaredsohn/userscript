// ==UserScript==
// @name		DS ï¿½bersicht-Produktion Erweiterung
// @description	Fï¿½gt hinter die Dorflinks einen Rekrutieren und einen Hauptgebï¿½ude Button
// @author	Hedri (editiertes Skript von Michael Richter)
// @include        http://de*.die-staemme.de/*overview_villages*
// @Version	Version 0.11_05022008
// ==/UserScript==
try
{

	if(/screen=map/.test(location.href)) {
	  throw "exit";
	}

var icons = {
		main: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb'+
			'2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFpnVCUDQayLWVrZqFZ1VGtqaQlWo8q5Jwj3dlnoZyy'+
			'Lun3dS8dlg7zMG3jGE11821tIlYoXA9083LYj4ghWZFhVsx0sapzsaufWZTr3tFVz8ov7OlQioUnW49akopAAAA9oF/P'+
			'gAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAAAoElEQVR42lzP6w6DIAwF4AMIchPEG5c5ef+3HL'+
			'rEmZ0fTfqlSVvUv+As20jNE8zo3jc18D2yuAl1E4AIF+kTegjnEATy+yixQVpChhM5iECIjRUvxURAI7iZ7IXCp0lK16bW'+
			'lZwB11oqu6zA3NrStbW9Z1Zq6w6yk05el1bFB8mPVLoULzDUKDbNKUW+fSeqp2awnHlj8PvTsPvbZz4CDABklhNNuD'+
			'NyQQAAAABJRU5ErkJggg%3D%3D',
		recrut: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2'+
			'Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFwradsqaOi39xxsCwKR4rjZWIo5V4f3BTcnxwl5yRpZyOzcWu1sy0'+
			'0Mexk4l9lp2OkJiKm4pqurWr1Muz3dK42M61mqCRlJuN0sivhY+Cf3Vwl42Dc19EeG1mjYN7AAAAg3R8aAAAACB0Uk5T////////'+
			'/////////////////////////////////wBcXBvtAAAAhklEQVR42kzPVxaDIBBA0VGqYAIoiKY4+99lqBr+3mWAAywk4LVmsgBhce2t2aQ'+
			'hWNlFM7l5wIeVZu0dELBL7QxVcs9YoUjrClkOU7oDO+Q/pIFo7yOBt0sNbxOjiOVZ8axw0pH7NOi+VCUARd+4py2/+xcdCLiPuj7'+
			'rT8FhcHB/P8VPgAEAd7IVfpMZXvYAAAAASUVORK5CYII%3D',
		center: 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
			'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVHjaYvz//z8DCBy5++3/z98QNgi8'+
			'/fidIcxchJEBDTCCNIAUc7MzMXCzIuRfffnL8OzNNwxNTHtvfAUrFuZiBgt8BdoCwmI8zAxSIlwM'+
			'Ezdc/4+sgQVEgEz+8fsfRPHPfxCNPxnAmtABE4yBrBhZDEMDyHPoAOT5n1gUw20AeRDmYZhCIaBz'+
			'3gHFsYbSqpNv/gvzc4IVwQBI8ZUbjxhMn3WB+VZZ8xnhGkAAPTRAwJZxP5j+8fQ0w90rRxlip91i'+
			'hGvABhZnqf1X1rFm4JA2hWtiYsADQCaCFIEUo/iBEADZBDMAIMAAitCChPuM2X0AAAAASUVORK5C'+
			'YII=',
		market:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJb'+
			'WFnZVJlYWR5ccllPAAAAGBQTFRF////3dG3gUsNeUMGwqyKfEcLmG022cyw2cuvkGMrd0EGp4RWrY1jf0kKiFsqkWYxgk0OhlERXi4'+
			'GxbGQnHpUjmIwpIFVt5x1d0ILybeboX5TvaJ5mnE9nHVFjV8plGgygV9qHgAAAAF0Uk5TAEDm2GYAAAC3SURBVHjaJE/bFsIgDEv'+
			'LxW04LiJM0cH//6Ud5qVN2pyTAADpYVhtRRMmlhbPvPr8Necy+bprYBRAsxeFXNqedAmyvU7CwdqpRraQi3dtDgwnJ9WsryyPNYCz'+
			'2Nqe+OLIO6IfYYRoNuPLCH1HEsHa9HgkKxgGcVoMc3R/y3gK31opVYlSLY7Xu6lKoZCMN39AX8OVUAaoxi7BsPQo0csVPa23Wabym'+
			'XvPZ3S3f12pH1NiO+v/BBgAxssLPv1EMKUAAAAASUVORK5CYII%3D',
		place:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZV'+
			'JlYWR5ccllPAAAAMBQTFRF1Muye310W11Fi4uHXmFMZmliREgmcnJbUlY8p6ikmZqav7edsa6ohIZ/tK6Va2xbkpGKbXRpc3Rq2tC3bXBWZ2p'+
			'RY2ZRO0Ef0sivBw8GysKqFh8QRk04lZaUo6KcmJmSkpOLS08uLDUSenpldnhugIF3aWlWNT0VeXttlJSOl5iaj4+In56bm5d+YWRYICkdWFxad'+
			'nhhwbuoUVYwJS4hSU5DjYx1dXJjb3Bhzca0f4V8lpeYgn9skJGIIiwJAAAAzf/u6wAAAEB0Uk5T/////////////////////////////////////////////////////'+
			'///////////////////////////////AMJ7sUQAAADcSURBVHjaJM7pdoIwEAXgJAQIiIBgRRukYY0sgtQu6Trv/1YN9P6Zc74zZ+4ggNhzO9ftuq+zEwMgA'+
			'O9J9EKEoeh7R4OTDcLYLqkxbjMHed/zPJdlOdv7B50WoTfLsgqZyELnlyIEz5f0kDDCcoukdKOPxmKirLHfG/I6/cQaPi6BYgelGjJS87jUin2dq8COa'+
			'EDC9Y+h6lkuJTGxylZwcZjfN/49qKNhhTYyEh/gOuLdeQWDb5MjgE/Nl7UFMP+UC5CRV48LVCdc6OGz28n8h2nH9cY1vXENfwIMANJ7ITutzy+iA'+
			'AAAAElFTkSuQmCC'
	};
	function checkpa(){
	var Ergebnis = (document.getElementById("menu_row2").childNodes.length >= 10) ? true : false;
	return Ergebnis;
	}
	

	
	function dsrbCreateButton(url, icon, text) {
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
		
		//einzufï¿½gende Links erstellen
		var troops = dsrbCreateButton('game.php?village='+ vilid.own + '&screen=main', icons.main, 'Hauptgebï¿½ude');
		var train = dsrbCreateButton('game.php?village=' + vilid.own + '&screen=train', icons.recrut, 'Rekrutieren');
		var center = dsrbCreateButton('game.php?village=' + vilid.own + '&screen=map', icons.center, 'Auf Karte zentrieren');
		var market = dsrbCreateButton('game.php?village=' + vilid.own + '&screen=market', icons.market, 'Markt');
		var place = dsrbCreateButton('game.php?village=' + vilid.own + '&screen=place', icons.place, 'Versammlungsplatz');
		
		
		//Links hinter dem Dorf-Link einfï¿½gen
		node.parentNode.insertBefore(center, node.nextSibling);
		node.parentNode.insertBefore(train, node.nextSibling);
		node.parentNode.insertBefore(market, node.nextSibling);
		node.parentNode.insertBefore(place, node.nextSibling);
		node.parentNode.insertBefore(troops, node.nextSibling);
	};

	function cutName()
	{
	var m;
	var coordpattern = /(\S.+)\((\d+)\|(\d+)\) K\d+$/;
	
		var span_nodes = document.getElementsByTagName('span');
		for(var i = 0; i < span_nodes.length; i++)
		{
		if( m = coordpattern.exec(span_nodes[i].firstChild.data))
			{
			span_nodes[i].firstChild.data=m[1];
			}
		}
	}
	
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