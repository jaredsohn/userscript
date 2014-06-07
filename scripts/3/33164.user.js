// ==UserScript==
// @name Orkut - Resposta Rápida
// @author Luiz Fernando da Silva Armesto 
// @version 0.2
// @description Inclui um campo de resposta nos tópicos dos fórums
// @ujs:category general: plus
// @ujs:published 01/01/2006 
// @ujs:modified 29/08/2007 - 20:41 (Horário de Brasilia)
// @ujs:documentation 
// @ujs:download http://my.opera.com/Luiz%20Fernando/homes/files/Orkut_RespostaRapida.js
// @include http://*orkut.com*
// ==/UserScript==


/* 
 * Esse script pode ser utilizado livremente.
 */
if(location.hostname.indexOf('orkut.com') > -1) { // Verifica se é o site do Orkut
	addEventListener('DOMContentLoaded',function(e){
		var versao = "0.2";
		
		if(location.href.toLowerCase().indexOf("commmsgs.aspx") >-1) {
			
			if(window.parent.document.getElementById("RRiframe") && window.parent.document.getElementById("RRiframe").location !="about:blank") {
				window.parent.location.reload();
			}else {
				var botao= window.parent.document.selectSingleNode('//table[@class="module"]/tbody/tr/td[@class="boxmidlrg"]/div[@class="parabtns"]/span[@class="grabtn"]/a[@class="btn"][contains(@href, "/CommMsgPost.aspx")]');
				try {
					var RR_frame = document.createElement('iframe');
					RR_frame.style.width = "0px";
					RR_frame.style.height = "0px";
					RR_frame.style.border = "0px solid transparent";
					RR_frame.id = "RRiframe";
					RR_frame.scrolling = "auto";
					botao.parentNode.parentNode.parentNode.appendChild(RR_frame,botao);
					RR_frame.parentNode.insertBefore(document.createElement('br'),RR_frame);
					botao.onclick = "document.getElementById('RRiframe').location.href='" + botao.href+"'; return false; ";
				} catch(e) {}
			}
		}else if(location.href.toLowerCase().indexOf("community.aspx") > -1 && window.parent.document.getElementById("RRiframe")) {
			location.href=window.parent.document.selectSingleNode('//a[@class="btn"][contains(@href, "/CommMsgPost.aspx")]');
		}
		
		if((location.href.toLowerCase().indexOf("commmsgpost.aspx") >-1 || location.href.toLowerCase().indexOf("commbond.aspx") >-1 || location.href.toLowerCase().indexOf("communityjoin.aspx") >-1)  && window.parent.location.href.toLowerCase().indexOf("commmsgs.aspx") >-1) {
		    var mbox = document.getElementById("mboxfull")||document.getElementById("mbox");
			if(mbox!=null){
				tabela=mbox.getElementsByTagName("table")[0];
				document.getElementById("footer").style.display="none";
				tabela.style.position = "absolute";
				tabela.style.top = "-1px";
				tabela.style.left = "-1px";
				window.parent.document.getElementById("RRiframe").scrolling ='no'
				window.parent.document.getElementById("RRiframe").style.width = 765;//(tabela.clientWidth - 5);
				window.parent.document.getElementById("RRiframe").style.height = 600;//(tabela.clientHeight - 30);

				if(location.href.toLowerCase().indexOf("communityjoin.aspx") > -1)
					tabela.style.width = tabela.clientWidth + 1 + "px";
					
				var obj = document.getElementsByTagName("a");
				for(var i = 0; i < obj.length; i++) {
					if(obj[i].href.indexOf("CommunityJoin.aspx") == -1)
						obj[i].target = "_parent";
						
					if(obj[i].href.indexOf("Community.aspx") > -1) {
						obj[i].onclick = "javascript: void(window.parent.document.getElementById('RRiframe').style.height= '0px')";
						obj[i].href = "javascript: void(0)";
					}
				}
			}
		}
		
	}, false);
}

/*
 Changelog:
  0.0.6
 Bugfix (mudança no layout do orkut)
 
 0.0.4
 Incluido suporte para comunidades que o usuário não é participante
 
 0.0.1 
 Primeira versão


*/