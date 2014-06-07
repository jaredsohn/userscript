// ==UserScript==
// @name           OGame - Recolectar y espiar Lunas desde vision general+Ranking en Galaxia Resaltado
// @namespace      http://*ogame*/*
// @include        http://*.ogame.*/game/*
// ==/UserScript==

//Basado en un script que encontre no me acuerdo donde, por eso la mayor parte del merito de este
//script no es mio, solo agrege lo de los espionajes a las lunas y recoleccion de escombros en vision general
//Contacto: gastonmura@hotmail.com

const cnst_ranking = ' en el ranking '

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	// gracias SpitFire: http://userscripts.org/scripts/show/8555
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	  
}



(function(){

    if (location.href.search('galaxy') != -1 ) {
		
		
		//agregar el rango como parte del nombre
		var publi = document.getElementsByTagName ('th');
		var sMember;
		var iRank;
		var sTemp;
		
		for (var i = publi.length - 1; i >= 0; i--) {
			
			var luna="Luna";
			var reco="Recolectar";
			var planeta="Planeta";
			
					
			// espionaje a lunas		
			if(publi[i].innerHTML.search(luna)!=-1)
			{
			var tmp=publi[i].innerHTML;
			var rgx = /(\d+):(\d+):(\d+)/;
	        if(rgx.test(tmp)) 
			{
		     tmpo = tmp.replace(rgx, '$1' + ',' + '$2' + ',' + '$3');
	         var coord=tmpo.match(/\d+,\d+,\d+/g);
			 var pongoFun="doit(6, "+coord+", 3, 4)";
			  viejo = 'Espiar';
nuevo = "<a style=\\'cursor:pointer\\'  onclick=\\'" + pongoFun + "\\'>Espiar</a>";
			 publi[i].innerHTML=publi[i].innerHTML.replace(viejo,nuevo);
			}
			
			}
			
			// recolectar escombros
			
			if(publi[i].innerHTML.search(reco)!=-1)
			{
			var tmpr=publi[i].innerHTML.replace(/\./g,'');
			
			
					// saco coordenadas de todos los planetas
					if(publi[i-2].innerHTML.search(planeta)!=-1)
					{
					var tmpp=publi[i-2].innerHTML;
					var rgxp = /(\d+):(\d+):(\d+)/;
					
					if(rgxp.test(tmpp)) 
					{
					 tmpop = tmpp.replace(rgxp, '$1' + ',' + '$2' + ',' + '$3');
					 var coordp=tmpop.match(/\d+,\d+,\d+/g);
					}
							
					}
			
			
			var escM = /Metal:\<\/th\>\<th\>([0-9]+)\<\/th\>\<\/tr\>/;
			var escC = /Cristal:\<\/th\>\<th\>([0-9]+)\<\/th\>\<\/tr\>/;
			
	        if(escM.test(tmpr)) 
			{
		     tmpM = tmpr.replace(escM,' '+'$1'+' ');
			 var coorM=tmpM.match(/( [0-9]+ )/g);
			}
			
			if(escC.test(tmpr)) 
			{
		     tmpC = tmpr.replace(escC,' '+'$1'+' ');
   			 var coorC=tmpC.match(/( [0-9]+ )/g);
			}
			 
			 suma=parseInt(coorM)+parseInt(coorC);
			 reciclas=Math.round(suma/20000)+1;
			 //alert("Escombros "+suma+" , numero de reciclas "+reciclas);
			 var pongoFunR="doit(8, "+coordp+", 2, "+reciclas+")";
			 viejoR = 'Recolectar';
			 
			 
			 			 
nuevoR = "<a style=\\'cursor:pointer\\'  onclick=\\'" + pongoFunR + "\\'>Recolectar</a>";
			 publi[i].innerHTML=publi[i].innerHTML.replace(viejoR,nuevoR);
			
			
			}
			
			
			if ((publi[i].width == 150) && (publi[i].innerHTML.length > 100)) {
				sMember = publi[i].getElementsByTagName('span')[0].innerHTML;
				sTemp = publi[i].innerHTML.search(sMember) + sMember.length + cnst_ranking.length;
				iRank = publi[i].innerHTML.slice(sTemp, publi[i].innerHTML.search('</td>'));
				
				sTemp = publi[i].getElementsByTagName('span');
				sTemp = sTemp[sTemp.length - 1];
				
                if(iRank > 1 && iRank < 200)
				{
				publi[i].innerHTML += '<font color=\'#FF0000\' size=1> ' + iRank + '</font>';  
				}
				if(iRank > 200 && iRank < 400)
				{
				publi[i].innerHTML += '<font color=\'#FFcc00\' size=1> ' + iRank + '</font>';  
				}
                if(iRank > 400 && iRank < 600)
                {
				publi[i].innerHTML += '<font color=\'#00DAB9\' size=1> ' + iRank + '</font>';  
				}
				if(iRank > 600 && iRank < 5000)
                {
				publi[i].innerHTML += '<font color=\'#00DDff\' size=1> ' + iRank + '</font>';  
				}	
			}
		}
	}
})();