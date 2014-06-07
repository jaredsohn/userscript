//Script by Pamplix

// ==UserScript==
// @name		  OGame ES - Espionaje de lunas y recogida de escombros
// @namespace	 OGEDLYRDE
// @description   Espionaje directo de lunas y recogida de escombros desde el mený Galaxia, sýlo para OGame Espaýa 
// @include	   http://*/game/galaxy.php?session=*
// @exclude	   
// ==/UserScript==    

element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
galaxia = element.value;

element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
sistema = element.value;

		  tas = document.getElementsByTagName('font');
		  for (var i = tas.length-1; i >= 0; i--) {
			  textos = tas[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
			  cod = "[" + galaxia +':'+ sistema +":";
			  pos = textos.substr(textos.indexOf(cod) + cod.length,4);
			  while (pos.indexOf("]") != -1){
					pos = pos.substr(0, pos.length - 1);
					};
			  if(tas[i].innerHTML == 'Espiar'){
				  cont = parseInt(pos);
				  cont += 2;
				  aux = document.evaluate('/html/body/center/table/tbody/tr[' + cont + ']/th[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				  textos = aux.innerHTML;
				  cod = 'doit(6, ' + galaxia + ', ' + sistema + ', ' + pos + ', 1, ';
				  cant = textos.substr(textos.indexOf(cod) + cod.length,4);
				  while (cant.indexOf(")") != -1){
					  cant = cant.substr(0, cant.length - 1);
					  };
				  viejo = '<font color="#808080">Espiar</font>';
				  nuevo = '<a href="#" onclick="doit(6, ' + galaxia + ', ' + sistema + ', ' + pos + ', 3, ' + cant + ')">Espiar</a>';
			  }else if(tas[i].innerHTML == 'Recolectar'){
					  met = textos.indexOf('<th>',textos.indexOf('<th>',textos.indexOf('<th>')+1)+1);
					  metal = parseInt(textos.substring(met+4,textos.indexOf('</th>',met+4)).replace(/[\s\.]/gi,''));
					  krs = textos.indexOf('<th>',textos.indexOf('<th>',met+1)+1);
					  kristal = parseInt(textos.substring(krs+4,textos.indexOf('</th>',krs+4)).replace(/[\s\.]/gi,''));
					  viejo = '<font color="#808080">Recolectar</font>';
					  nuevo = '<a href="#" onclick="doit(8, ' + galaxia + ', ' + sistema + ', ' + pos + ', 2, ' + Math.ceil((kristal+metal)/20000) + ')">Recolectar</a>';
					};
				tas[i].parentNode.innerHTML = tas[i].parentNode.innerHTML.replace(viejo,nuevo);
				
			  };





