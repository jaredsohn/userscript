// ==UserScript==
// @name           DS Filtern von Spyberichten - Ressis werden angezeigt
// @description    Filtert unwichtiges bei Spähberichten weg
// @author         pinjam
// @include        http://de*.die-staemme.de/game.php?*screen=report&mode=all&view=*
// ==/UserScript==



function ausblenden()
	{
		var h4 = document.getElementsByTagName("h4").length;
		for(i=0; i<h4; i++)
		{
			if (check.checked==true)
				{document.getElementsByTagName("h4")[i].style.display = 'none';}
			else
				{document.getElementsByTagName("h4")[i].style.display = 'block';}
		}
		
		var h3 = document.getElementsByTagName("h3").length;
		var holz = document.getElementsByTagName("img").length;
		var a = 0;
		for(i=0; a<2; i++)
		{
			if (document.getElementsByTagName("img")[i].getAttribute("src").indexOf("holz") != -1)
			{
				var holzbild = document.getElementsByTagName("img")[i];
				a++;
			}
			
		}
		for(i=0; i<h3; i++)
		{
			if (check.checked==true)
			{
				document.getElementsByTagName("h3")[i].style.display = 'none';
				document.getElementsByTagName("br")[i].style.visibility = 'hidden';
				document.getElementsByClassName("luck")[0].parentNode.parentNode.style.display = 'none';
				document.getElementsByClassName("center")[0].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
				holzbild.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
			}	
			else
			{
				document.getElementsByTagName("h3")[i].style.display = 'block';
				document.getElementsByTagName("br")[i].style.display = 'block';
				document.getElementsByClassName("luck")[0].parentNode.parentNode.style.display = 'table';
				document.getElementsByClassName("center")[0].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'table';
				holzbild.parentNode.parentNode.nextSibling.nextSibling.style.display = 'table';
			}
		}
		
	};
	
function getLevelOfBuilding(name) {
	function _evaluate(path, context) {
		if(!context) {
			var context = document;
		}
		
		var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var	nodes = [];
		for(var x = 0; x < XPath.snapshotLength; x++) {
			nodes.push(XPath.snapshotItem(x));
		}
		
		return nodes;
	}
	
	try {
		var cell = _evaluate('//th[contains(.,"ude:")]/following::td')[0];
		var reg = new RegExp(name + " <B>\\(Stufe (\\d+)\\)<\\/B>", "i");
		var level = cell.innerHTML.match(reg)[1];
		
		return level;
	} catch(e) {
		return 0;
	}
}
	
if (document.getElementById("label").previousSibling.previousSibling.getAttribute("src").indexOf("blue") != -1){
	var div = document.createElement('div');
	var check = document.createElement('input');
	check.setAttribute('type', 'checkbox');
	check.checked = true;
	ausblenden();
	check.addEventListener('click', ausblenden, false);
	div.setAttribute('style', 'padding: 3px; white-space:nowrap; text-align:center; font-weight:bold');
	div.appendChild(check);
	div.appendChild(document.createTextNode('Unwichtiges ausblenden --- Wallstufe: '));
	div.appendChild(document.createTextNode(getLevelOfBuilding("Wall")));
	document.getElementsByTagName('h3')[0].parentNode.insertBefore(div,document.getElementsByTagName('h3')[0]);
}

;