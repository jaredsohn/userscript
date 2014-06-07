// ==UserScript==
// @name          SubDivX Siguiente Capitulo
// @namespace     http://divideandconquer.com.ar
// @description	  Agrega links al capitulo siguiente y a la temporada siguiente
// @include       http://www.subdivx.com/*
// ==/UserScript==

(function() 
{
	function selectNodes(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	      result[x] = nodes.snapshotItem(x);
	   
	   return result;
	}
	
	doc = window.document;
   	var subdivxResults = selectNodes(doc, doc.body, "//DIV[contains(@id,'menu_titulo_buscador')]");
   	var subdivxChapterNames = selectNodes(doc, doc.body, "//A[contains(@href,'X6X')][contains(@href,'.html')]");
	for(var i=0;i<subdivxChapterNames.length;i++){
		var divxmatch = subdivxChapterNames[i].href.match( /X6X(.*?)X/ );
		if(divxmatch){
			var fullChapterName=subdivxChapterNames[i].innerHTML;
			var regexp = new RegExp('(.+)\\s[Ss](\\d\\d?)[eE](\\d\\d?)$');
			var matchGroups = regexp.exec(fullChapterName);
			if(matchGroups!=null){
				var serie=matchGroups[1];
				var temporada=parseInt(matchGroups[2],10);
				var capitulo=parseInt(matchGroups[3],10);
				var capituloSig=capitulo+1;
				capitulo= (capitulo<=9)?'0'+capitulo:capitulo;
				capituloSig=(capituloSig<=9)?'0'+capituloSig:capituloSig;
				var temporadaSig=temporada+1;
				temporada = (temporada<=9)?'0'+temporada:temporada;
				temporadaSig=(temporadaSig<=9)?'0'+temporadaSig:temporadaSig;
				var anchorCapSig = '<a class="titulo_menu_izq" href="http://www.subdivx.com/index.php?buscar='+serie+'+S'+temporada+'E'+capituloSig+'&accion=5&masdesc=&subtitulos=1&realiza_b=1">'+serie+' S'+temporada+'E'+capituloSig+'</a>';
				var anchorTempSig = '<a class="titulo_menu_izq" href="http://www.subdivx.com/index.php?buscar='+serie+'+S'+temporadaSig+'E01&accion=5&masdesc=&subtitulos=1&realiza_b=1">'+serie+' S'+temporadaSig+'E01</a>';
				for (var y=0; y<subdivxResults.length; y++){
					subdivxResults[y].innerHTML=subdivxResults[y].innerHTML+" -> "+anchorCapSig+" -> "+anchorTempSig;
				}
			}
			return;
		}
	}
   
})();