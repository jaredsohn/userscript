// ==UserScript== 
// @name          Siplycua
// @namespace     http://userscripts.org
// @description   Para eliminiar la verborrea
// @include       https://sicua.uniandes.edu.co/*
// @include       http://sicua.uniandes.edu.co/*
// ==/UserScript== 



//<td><b><a href="/SCRIPT/200820_MATE1105_04/scripts/serve_home" onmouseover="window.status='200820_MATE1105_04 - ALGEBRA LINEAL 1';return true" onmouseout="window.status='';return true">200820_MATE1105_04 - ALGEBRA LINEAL 1</a></b><br>&nbsp;&nbsp;Profesor:&nbsp;Profesor<br>&nbsp;&nbsp;Tipo de usuario:&nbsp;Alumno</td>

(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    	node = textnodes.snapshotItem(i); 
	if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue)){
    		s = node.data; 


	s = s.replace( /profesor/ig, "");
	s = s.replace( /tipo de usuario/ig, "");
	s = s.replace( /alumno/ig, "");
	s = s.replace( /<br>/ig, "");
	s = s.replace( /:/ig, "");
	s = s.replace( /novedades/ig, "");
	s = s.replace( /200820_/ig, "");



    		node.data = s; 
	}
} 


//ELIMINA TODOS LOS <BR> FASTIDIOSOS

      var tds = document.getElementsByTagName('td');
      for( var i = 0; i < tds.length; i++ )
      {
	if(tds[i].innerHTML.search(/200810/i) != -1){
		//document.write("<p>"+i+"</p>");
	}

        	var spans = tds[i].getElementsByTagName('br'); 
		for( var j = 0; j < spans.length; j++ ) {
            		spans[j].parentNode.removeChild(spans[j]);
		}
      }


})();


