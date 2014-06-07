// ==UserScript==
// @name           Mais vendidos
// @namespace      http://*.mercadolivre.*
// @description    Colocar os mais vendidos no topo!
// @include        http://*.mercadolivre.*
// ==/UserScript==

var divGeral  = document.getElementById('cont_row_gal');
var listaNodos = new Array();
var listaNodosZero = new Array();

if(divGeral){	
	var linhas = document.getElementsByClassName('row');
	//var linhas  = divGeral.childNodes;
	var tamanho = linhas.length;
	
	//for (i = 0; i < tamanho; i++) 	alert(linhas[i].childNodes[3].className +'\n'+ i);
	
	 for (i = 0; i < tamanho; i++) {
		try{
			var linha = linhas[i];
			if(linha){
				var div2 = linha.childNodes[3];
				var div3 = div2.childNodes[5];
				var er = new RegExp("[0-9]+");
				var texto = div3.textContent;
				
				//Adiciona nas listas se tiver algum número
				if(er.test(texto)){
					var resultado  = er.exec(texto);
					listaNodos.push(linha);

				}else {
					listaNodosZero.push(linha);
				}
			}
		}catch(e){alert(e);}		
	}	
	
		for (i = 0; i < tamanho; i++)  {
			var linhas2 = document.getElementsByClassName('row');
			divGeral.removeChild(linhas2[0]);
		}
			
		listaNodos.sort(function s(a, b){		
			var er = new RegExp("[0-9]+");
			var aa =  a.childNodes[3].childNodes[5].textContent ;
			var bb = b.childNodes[3].childNodes[5].textContent;
			
			aa = er.exec(aa);
			bb = er.exec(bb);

			return aa - bb;			
		});
		
		//alert(listaNodos.length);
		tamanho = listaNodos.length;
		for (i = 0; i < tamanho; i++)  {
			divGeral.appendChild(listaNodos.pop());
		}
		//alert(listaNodosZero.length);
		tamanho = listaNodosZero.length;
		for (i = 0; i < tamanho; i++)  {
			divGeral.appendChild(listaNodosZero.pop());
		}
}
