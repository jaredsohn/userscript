// ==UserScript==
// @name           ReXiAontipagination 2.0
// @namespace      http://xiaoxiao.cwahi.net
// @description    Ver todos os posts de um tópico na mesma página
// @include        http://*orkut.*/CommMsgs*
// ==/UserScript==

( function () {

function MPosts(url) {
	 ajas = new XMLHttpRequest();
	 ajas.open("GET",url,true);
	 ajas.onreadystatechange=function(){
		if(ajas.readyState==4 && ajas.status==200){
			//cria uma div 'paginv' e guarda o conteúdo do responsetext nela, já tirando o main
			x = document.createElement('div');
			x.style.display="none";
			x.id="paginv";
			x.innerHTML = ajas.responseText.replace(/Main#/gi,"");
			
			//atualiza a QUANTIDADE de posts na página 
			np=ajas.responseText.match(/-(.*?)<\/b> (of|de) <b>/gi)[0];
			npost=document.createElement("span");
			npost.id="npst";
			npost.innerHTML=document.getElementById('npst').innerHTML.replace(/-(.*?)<\/b> (of|de) <b>/gi,np);
			document.getElementsByClassName('boxmidlrg')[0].replaceChild(npost,document.getElementById('npst'));
				//vai incluindo post por post do responsetext na página
			while(x.getElementsByClassName('listitem').length>0){
				document.getElementById('mboxfull').getElementsByClassName('listdivi ln')[1].parentNode.insertBefore(x.getElementsByClassName('listitem')[0], document.getElementById('mboxfull').getElementsByClassName('listdivi ln')[1]);
			}
			
			Ver(x);
		}
	}
	if(ajas){
		ajas.send(null);
	}
}

//code = source do responseText
function Ver(code){
	g=code.getElementsByClassName('rf')[1].getElementsByTagName('a').length-2;
	
	//se ainda dá pra paginar, substitui o link da paginação e chama a função de antipaginar
	if(code.getElementsByClassName('rf')[1].getElementsByTagName('a').length>2){
		link=code.getElementsByClassName('rf')[1].getElementsByTagName('a')[g].href;
		document.getElementsByClassName('rf')[0].getElementsByTagName('a')[j].href=document.getElementsByClassName('rf')[1].getElementsByTagName('a')[j].href=link;
		
		//corrige o Interstitial dos posts na página
		para=code.getElementsByClassName("para");
		for(i=0;i<para.length;i++){
			for(p=0;p<para[i].getElementsByTagName('a').length;p++){
				if(para[i].getElementsByTagName('a')[p].href.match(/Interstitial/gi)){
					inter=para[i].getElementsByTagName('a')[p].href.match(/Interstitial\?u=(.*)&t=[A-Z0-9_-]+$/i)[1];
					para[i].getElementsByTagName('a')[p].href=decodeURIComponent(inter);
				}
			}
		}
		MPosts(link);
	}
}

function ReXiAontipagination(){
	j=document.getElementsByClassName('rf')[1].getElementsByTagName('a').length-2;
	Ver(document);
}

var InitListener=function()
{
	//cria o link na página, clicando nele vai rodar a ReXiAontipagination(), botando o mostrando em tag pra poder ser alterado facilmente
	if(document.getElementsByClassName('rf')[0].getElementsByTagName('a').length && document.getElementsByClassName('rf')[0].getElementsByTagName('a')[document.getElementsByClassName('rf')[0].getElementsByTagName('a').length-1].href.match(/na=2/gi)){
		document.body.innerHTML=document.body.innerHTML.replace(/>\nmostrando <B>/gi,">\n<span id='npst'>mostrando <B>").replace(/<\/b>\n&nbsp;/gi,"</b></span>\n&nbsp;");
		linque=document.createElement("span");
		linque.innerHTML='<a  href="javascript:;">ver todos os posts</a>&nbsp;&nbsp;<span class="grayedout">|</span>&nbsp;';
		linque2=linque.cloneNode(true);
		document.getElementsByClassName('rf')[0].insertBefore(linque, document.getElementsByClassName('rf')[0].childNodes[0]);
		document.getElementsByClassName('rf')[0].getElementsByTagName('a')[0].addEventListener('click', function(Event){
			ReXiAontipagination();
			Event.preventDefault();
		}, false);
		document.getElementsByClassName('rf')[1].insertBefore(linque2, document.getElementsByClassName('rf')[1].childNodes[0]);
		document.getElementsByClassName('rf')[1].getElementsByTagName('a')[0].addEventListener('click', function(Event){
			ReXiAontipagination();
			Event.preventDefault();
		}, false);

	}
}

document.addEventListener('DOMContentLoaded', InitListener, false);

})();