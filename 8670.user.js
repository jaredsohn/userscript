// ==UserScript==
// @name	  OGame FR : Sonder lune + exploiter cdr
// @author 	  Flater & OgamerNL
// @description   OGame FR : Sonder lune + exploiter cdr
// @language FR
// @include	  http://ogame*.de/game/galaxy.php?session=*
// @exclude	   
// ==/UserScript==    


	var element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var galaxy = element.value;
		element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var system = element.value;
	var textobject = document.getElementsByTagName('font');
	var position_lune = document.getElementsByTagName('tbody')[3].getElementsByTagName('tr') ;
	for (h=16;h>1 ;h-- ) {		   
		if (position_lune[h].getElementsByTagName('th')[position_lune[h].getElementsByTagName('th').length-1].getElementsByTagName('img').length >0) {
			var sondes_onclick = position_lune[h].getElementsByTagName('th')[position_lune[h].getElementsByTagName('th').length-1].getElementsByTagName('a')[0].attributes[0].nodeValue ;
			var chaine_onclick = 'javascript:doit(6, '+galaxy+', '+system+', '+(h-1)+', 1, ';
			var nb_sondes = sondes_onclick.substring( chaine_onclick.length , sondes_onclick.length-2);
			}		   
	   }
	
	for (var i = textobject.length - 1; i >= 0; i--) {
		var textcontent = textobject[i].innerHTML;
		if (textobject[i].innerHTML.indexOf(textcontent) != -1){
			var texts = textobject[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
			var location = "[" +galaxy+':'+system+":";
			var met = texts.indexOf('<th>',texts.indexOf('<th>',texts.indexOf('<th>')+1)+1);
			var metal = parseInt(texts.substring(met+4,texts.indexOf('</th>',met+4)).replace(/[\s\.]/gi,''));
			var krs = texts.indexOf('<th>',texts.indexOf('<th>',met+1)+1);
			var kristal = parseInt(texts.substring(krs+4,texts.indexOf('</th>',krs+4)).replace(/[\s\.]/gi,''));
			var pos = texts.substr(texts.indexOf(location) + location.length,4);
			while (pos.indexOf("]") != -1){
				pos = pos.substr(0, pos.length -1);
			};
			
			if(textcontent!="Espionner"){
				textobject[i].parentNode.innerHTML = '<a href="#" onclick="doit(8, '+galaxy+', '+system+', '+pos+', 2, '+Math.ceil((kristal+metal)/20000)+')">'+textcontent+'</a>';
			}else{
				textobject[i].innerHTML = '<a href="#" onclick="doit(6, '+galaxy+', '+system+', '+pos+', 3, '+nb_sondes+')">'+textcontent+'</a>';
			}
		}
	}