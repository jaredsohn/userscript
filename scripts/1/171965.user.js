// ==UserScript==
// @name        Calculadora FEAN
// @namespace   MarkinFurkin
// @author      MarkinFurkin
// @description Cria uma nova coluna chamada "AV3 MÍNIMA" onde faz o cálculo da nota mínima para AV3, na página "BOLETIM VIRTUAL"
// @grant       none
// @include     http://www.energia.com.br/web/pai/?section=childrens&men=2
// @version     2.5.5
// ==/UserScript==
// updates:
// + 1.2:Google Chrome support(jquery removed)
// + 1.5:Alinhamento centralizado das notas
//		 Posicionamento da coluna logo após as notas e media final
// + 2.0:Coloração da cor do nome e MF da matéria em que a MF tenha sido publicada(AZUL:Aprovado,Vermelho:Reprovado)
// 	 	 Cálculo Média Geral das Médias(MG) - Média das Médias
// + 2.0.1:KONAMI CODE, EASTER EGG
// + 2.5.1:MINICALCULADORA
// + 2.5.5:EASTER EGG - 50 cliques, gira tela 90 graus

function trim (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: mdsjack (http://www.mdsjack.bo.it)
  // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: DxGx
  // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // *     example 1: trim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: trim('Hello World', 'Hdle');
  // *     returns 2: 'o Wor'
  // *     example 3: trim(16, 1);
  // *     returns 3: 6
  var whitespace, l = 0,
    i = 0;
  str += '';

  if (!charlist) {
    // default list
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  } else {
    // preg_quote custom list
    charlist += '';
    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function PegarLinhaTabelaNotas(linha, materia)
{
	/*
	 *
	 *	ex: 
	 *		-tabela com 9 linhas(2 TR cabeçalho + 5 TR materias+ 2 TR rodapé(grafico))
	 *		-tabela com 10 linhas(2 TR cabeçalho + 6 TR materias(1 fase)+ 2 TR rodapé(grafico))
	 *
	 */
	linha = (materia)?linha+1:linha;
	tabela = document.getElementsByClassName("listlivre")[0].childNodes[1]; //tabela geral
	return tabela.rows[linha];
}


function montaTD(texto,tipo,MG)
{
	td = document.createElement('td');
	nota_min_av3_inner = '';
	if(tipo == 'title')
	{
		nota_min_av3_inner = "<div title=\"Nota na AV3  mínima necessária\"> "+texto+" </div>";
		td.setAttribute('class',tipo);
		td.setAttribute('rowspan','2');
	}
	else if((tipo =='listnumero1') || (tipo == 'listnumero2'))
	{
		nota_min_av3_inner = texto;
		td.setAttribute('class',tipo);
		if(!MG)
		td.style.textAlign="center";
	}
	td.innerHTML = nota_min_av3_inner;
	return td;
}



function calcularAV3(av1,av2,str)
{
	av3 = (60 - ((3*av1)+(3*av2)))/4;
	if(str)
	{
		av3 = av3.toFixed(2).toString();
		av3 = av3.replace('.',',');
	}
	return av3;
}

function calculaMediaGeral(qnt_materias)
{
	MG = 0;
	estilocss = (qnt_materias % 2 == 0) ? 'listnumero1' : 'listnumero2' ;//if inline
	estilocssNome = (qnt_materias % 2 == 0) ? 'row1' : 'row2' ;//if inline
	for(i=1;i<=qnt_materias;i++)
	{
		av3 = trim(PegarLinhaTabelaNotas(i, true).childNodes[9].innerHTML.replace(',','.'));
		MG +=parseFloat(av3);
	}
	MG /=qnt_materias;
	MG = MG.toFixed(2).toString();
	
	
	//MONTA TR MEDIA GERAL
	linha_rodape = PegarLinhaTabelaNotas(qnt_materias+2,false);
	linha_rodape.cells[0].innerHTML = '&nbsp&nbspMédia Geral';
	linha_rodape.cells[0].setAttribute('class', estilocssNome);
	
	linha_rodape.appendChild(montaTD('--',estilocss,true));
	linha_rodape.appendChild(montaTD('--',estilocss,true));
	linha_rodape.appendChild(montaTD('--',estilocss,true));
	linha_rodape.appendChild(montaTD('<b>'+MG+'</b>',estilocss,true));
}

function montaNota(linha)
{
	estilocss = (linha % 2 == 0) ? 'listnumero2' : 'listnumero1' ;//if inline
	linha_materia = PegarLinhaTabelaNotas(linha,true);
	av1 = parseFloat(trim(linha_materia.cells[1].innerHTML).replace(',','.'));
	av2 = parseFloat(trim(linha_materia.cells[2].innerHTML).replace(',','.'));
	resultado = calcularAV3(av1, av2,true);
	if(resultado == 'NaN')
	{
		resultado = '--';
	}
	td =  montaTD(''+resultado,estilocss,false);
	linha_materia.insertBefore(td, linha_materia.cells[5]);
	
	/*	verificacao se nota AV3 ja foi publicada:
	*	se sim:verifica se nota da AV3 é >= q AV3 MINIMA e Média Final >= 6:
	*		se sim: mudar cor do text do nome da materia e media final p AZUL
	*		se não: mudar cor do text do nome da materia e media final p VERMELHO
	*/
	av3 = trim(linha_materia.cells[3].innerHTML).replace(',','.');
	mf = trim(linha_materia.cells[4].innerHTML).replace(',','.');
	if(!isNaN(av3))
	{
		resultado = resultado.replace(',','.');
		cor = ((parseFloat(av3) >= parseFloat(resultado)) && (parseFloat(mf) >= 6.00)) ? "#0000FF" : "#FF0000" ; //if inline
		linha_materia.cells[0].style.color= cor;// nome materia
		linha_materia.cells[4].style.color= cor;//media final
		linha_materia.cells[0].style.fontWeight = "bold";
		linha_materia.cells[4].style.fontWeight = "bold";
	}
}


//START
function start()
{	
	if(window.location.pathname == '/web/pai/')
	{
		document.oncontextmenu=true;
		document.title += "+++Calculadora FEAN+++";
		tabela = document.getElementsByClassName("listlivre")[0].childNodes[1]; //tabela geral
		qnt_materias = tabela.rows.length-4;// quantidade de materias = total de linhas - menos cabeçalho(2) e rodapé(2)
		td = montaTD('AV3 MÍNIMA','title',false);
		PegarLinhaTabelaNotas(0,false).insertBefore(td, PegarLinhaTabelaNotas(0,false).cells[2]); // jogando TD na TR  secundario cabeçalho
		for(i=1;i<=qnt_materias;i++)
		{
			montaNota(i);
		}
		calculaMediaGeral(qnt_materias);
		miniCAlc();
		cliques = 0;
		graus = 0;
		document.onmousedown= function()
		{
			cliques++;
			if(cliques ==50)
			{
				graus += 90;
				graus = (graus == 360)?0:graus;
				document.body.style.MozTransform = 'rotate('+graus+'deg)';
				document.body.style['-webkit-transform'] = 'rotate('+graus+'deg)';
				cliques = 0;
			}
		};
	}
}

start();

//KONAMI CODE, EASTER EGG
var konamiCodeArray = [],
konamiCodeKey = '38,38,40,40,37,39,37,39,66,65';
document.onkeydown = function(e) 
{
	konamiCodeArray.push(e.keyCode);
	if (konamiCodeArray.toString().indexOf(konamiCodeKey) >= 0) 
	{
		KonamiCode();
		konamiCodeArray = [];
	}
	
};

function KonamiCode()
{
	//document.body.style.MozTransform = 'rotate(180deg)';
	//document.body.style['-webkit-transform'] = 'rotate(180deg)';
	for(i=1;i<=qnt_materias;i++)
	{
		PegarLinhaTabelaNotas(i,true).childNodes[1].style.fontWeight = "bold";
		PegarLinhaTabelaNotas(i,true).childNodes[1].style.color = "#0000FF";
		PegarLinhaTabelaNotas(i,true).childNodes[9].style.fontWeight = "bold";
		PegarLinhaTabelaNotas(i,true).childNodes[9].style.color = "#0000FF";
		for(j=3;j<=11;j+=2)
		{
			inner = (j==11)? '0,00': '10,00';
			PegarLinhaTabelaNotas(i,true).childNodes[j].innerHTML = inner;
		}
		for(j=12;j<=22;j+=2)
		{
			switch(j)
			{
				case 20:
					inner = '100,00';
					break;
				case 22:
					inner = 'AD';
					break;
				default:
					inner = '--';
			}
			PegarLinhaTabelaNotas(i,true).childNodes[j].innerHTML = inner;
		}
	}
	PegarLinhaTabelaNotas((qnt_materias+1),true).cells[4].innerHTML = '<b>10,00</b>';
	document.getElementsByTagName('img')[3].src = 'http://www.cavves.com.br/wp-content/uploads/2009/12/konami-code-300x54.jpg';
	//tabela.innerHTML +="<audio hidden='true' src='http://www.wavsource.com/snds_2013-07-09_2941698662759047/people/women/ahhh.wav' autoplay ></audio>";
	tabela.innerHTML +="<audio hidden='true' src='http://themushroomkingdom.net/sounds/wav/smw/smw_course_clear.wav' autoplay  ></audio>";
}

function miniCAlc()
{
	//ADICIONA FUNÇÃO DE CALCULO MF(NECESSÁRIO PARA Q EVENT ONKEYUP ENCONTRE-A)
	script = document.createElement('script');
	script.innerHTML = "function miniCalculadora(){av1=parseFloat(document.getElementById('miniCalc_av1').value.replace(',','.'));av2=parseFloat(document.getElementById('miniCalc_av2').value.replace(',','.'));av3=parseFloat(document.getElementById('miniCalc_av3').value.replace(',','.'));if((av1>=0&&av1<=10)&&(av2>=0&&av2<=10)&&(av3>=0&&av3<=10)){miniCalc_mf=(av1*3+av2*3+av3*4)/10;miniCalc_mf=miniCalc_mf.toFixed(2).toString().replace('.',',');document.getElementById('miniCalc_mf').innerHTML='Média Final:'+miniCalc_mf}}";
	document.head.appendChild(script);
	//MONTA MINICALCULADORA
	td = document.createElement("td");
	td.setAttribute('valign','top');
	td.innerHTML = "<pre>MINI CALCULADORA<hr>AV1:<input type='text' id='miniCalc_av1' size='5' onkeyup='miniCalculadora()'/><br/>AV2:<input type='text' id='miniCalc_av2' size='5' onkeyup='miniCalculadora()'/><br/>AV3:<input type='text' id='miniCalc_av3' size='5' onkeyup='miniCalculadora()'/><br/><span id='miniCalc_mf'></span></pre>";
	document.getElementById('senha').parentNode.parentNode.appendChild(td);
}