/*
 *================||FASTREPLY||================


 *==================||INFO:||==================
 *
 * Version: 0.1.0 BETA
 *
 * Author: Caminhoneta Walton			
 *
 *
 * Ideia do Link, que fez o primeiro Fast Reply 
 * , porem nunca o vi em funcionamento.
 *
 * Alem disso, os Scripts funcionam de maneiras 
 * totalmente diferentes, e por este motivo nao
 * inclui o nome do Autor do primeiro FastReply
 * no cabecalho do Script.
 *
 * O Script vem equipado com alerta de atualiza
 * -coes,  que avisa automaticamente sempre que  
 * uma nova versao do Script for lancada.
 *
 *==================|||||||||==================
 

 *==================||HIST:||==================
 *
 * # Version: 0.1.0 BETA
 *
 *   Author: Caminhoneta Walton			
 *
 *   Info: Primeira versao do Script.
 *
 *   - Suporte aos idiomas portugues e ingles.
 *   - Scroll pro final da pagina, ao responder 
 *     ou ao ir pra ultima pagina de um topico.
 *   - Cancelar nao limpa o conteudo do post.
 *   - Alerta de atualizacao.
 *
 *==================|||||||||==================
 

 *==================||BUGS:||==================
 *
 * Incompatibilidade com o Script 'Barra de For
 * -matacao', do Link.
 *
 * Incompatibilidade com o Script 'OTB by Greas
 * e Monkey', do Sergio.
 *
 * Um pouco lento, mas devido a internet do PC.
 *
 *==================|||||||||==================


 *================|||||||||||||================
*/
// ==UserScript==

// @name           FastReply
// @author         Caminhoneta Walton /* http://www.orkut.com/Profile.aspx?uid=17925467362667401152 */
// @description    Responda topicos rapidamente! Ao clicar em Responder, o Script vai abrir uma caixa onde voce digita sua mensagem, sem mudar de pagina! Alem disso, voce sera redirecionado para a ultima pagina ao responder um topico.
// @include        *.orkut.com/CommMsgs.aspx*

// ==/UserScript==







var sc = function sc(){



function B(){

self.scrollBy(0,999999999);

	function D() {

		var c = document.getElementById('FR');

		if (c) {

  			document.getElementById('FR').style.display = 'none'

			document.getElementById('footer').style.display = ''
		
			document.getElementById('b' + i ).setAttribute("onclick","A(this)")
			
		}

	}


	
	function C(d){

  		document.getElementById('FR').style.display = 'none'

		document.getElementById('footer').style.display = ''

		d = d.split("?")
		d = d[1].split("&")
		d = "http://www.orkut.com/CommMsgs?" + d[0] + "&" + d[1] + "&na=2"
		location = d

	}



	if( !String(FR.location.href).match(/CommMsgPost.aspx/gi) ) {

		C(location.href)

	}



	if( !FR.document.body.innerHTML.match(/Digite o texto conforme mostrado na caixa a seguir:/gi) && !FR.document.body.innerHTML.match(/Enter the text as it is shown in the box below:/gi) ) {

		FR.document.getElementById('messageBody').focus()

		FR.document.getElementById('b0').addEventListener('click', function(event) {
			D()
			event.stopPropagation()
			event.preventDefault()
			}, true)

	} else {

		FR.document.getElementById('b0').addEventListener('click', function(event) {
			FR.history.go(-1)
			event.stopPropagation()
			event.preventDefault()
			}, true)

	}



	FR.document.getElementById('header').style.display = 'none'
	FR.document.getElementById('footer').style.display = 'none'
	FR.document.getElementsByTagName('table')[3].style.display = 'none'
	FR.document.getElementsByTagName('img')[7].style.display = 'none'

}








function A(a, l){

	a.setAttribute("onclick","")

	b = document.getElementById('footer')

	b.style.display = 'none'



	if( !document.getElementById('FR') ) {

		l = l.split("?")
		l = l[1].split("&")
		l = "http://www.orkut.com/CommMsgPost?" + l[0] + "&" + l[1]

		newElement = document.createElement('y');
		newElement.innerHTML = "<iframe name='FR' onload='B()' align='right' id='FR' style='border:0;height:490;width:765' src='" + l + "'</iframe>"
		
		b.parentNode.insertBefore(newElement, b.nextSibling);

	} else {

		document.getElementById('FR').style.display = ''

		B()

	}

}



if( location.href.match(/&na=2/gi) ) {

	self.scrollBy(0,999999999);

}




function Y() {

y = FastReply
v = 0.1
z = FastReply_v
w = "FastReply"

if ( v < z ) {
document.body.innerHTML = "<b><a class='H' href='" + y + "'title='Clique para atualizar o Script " + w + "'><blink>Atualize seu script!</blink></a></b>"+document.body.innerHTML;
}

}

V()


for( i = 0 ; i <= 12 ; i++ ) {

	if( document.getElementById('b' + i).innerHTML.match(/responder/gi) || document.getElementById('b' + i).innerHTML.match(/reply/gi) ) {

		document.getElementById('b' + i ).setAttribute("onclick","A(this, location.href)")
		break
	}

}


}
sc=String(sc);
sc=sc.substring(16,sc.length-2);
script=document.createElement('script');
script.textContent=sc;
document.getElementsByTagName('head')[0].appendChild(script);