// ==UserScript==
// @name          Indisponivel
// @description	  Interface Alternativa
// @include       http://disponivel.com/*
// @include        http://*.disponivel.com/*
// ==/UserScript==

const StringMagica = 'levinopsid';
const AutoNavegaTimeout = 3000;
const NomeAutoNav = 'chkAutoNav';

/*
	ESTRUTURA DE UMA PÁGINA DE PERFIL
	
	http://somos2safados.disponivel.com/
		<frame name="head" 
			src="http://disponivel.com/relacionamento/headf.asp"
			>
			
		<frame name="conteudo"
			src="http://disponivel.com/relacionamento/perfil.asp?nome=somos2safados&codigo="
			>
			
			<iframe name="album"
				src="http://disponivel.com/relacionamento/album.asp?end=http://1.disponivel.com/serv/serv20/img/p735627-395969.jpg"
				>
			
			<!-- FOTOS -->
			<a target="album"
				href="http://disponivel.com/relacionamento/album.asp?end=http://1.disponivel.com/serv/serv20/img/p735627-395969.jpg"
				> Foto Principal </a>
			<a target="FrmFotos"
				href="http://disponivel.com/relacionamento/perfilnfotos1.asp?conta=1&codigo=395969&album=1&apelido=Somos2Safados"
				> Ver + </a>
			<iframe name="FrmFotos"
				src="http://disponivel.com/relacionamento/perfilnfotos1.asp?codigo=395969&apelido=Somos2Safados&conta=1&principal=http://1.disponivel.com/serv/serv20/img/p735627-395969.jpg"
				>
				
				<a target="album"
					href="http://disponivel.com/relacionamento/album.asp?codap=395969&foton=960571&numero=433&apelido=Somos2Safados&t=n&album=s&arqu=433872831-395969.jpg&servidor=21"
					> <img/> </a>
				...
				
				# Ver + #
				1: href = http://disponivel.com/relacionamento/perfilnfotos1.asp?intPagina=1&codigo=395969&conta=&album=1&apelido=Somos2Safados
				2: href = http://disponivel.com/relacionamento/perfilnfotos1.asp?intPagina=2&codigo=395969&conta=&album=1&apelido=Somos2Safados
				...
			
			<!-- VÍDEOS -->
			<a target="FrmVideos"
				href="http://disponivel.com/relacionamento/perfilnvideos1.asp?codigo1=395969&apelido1=Somos2Safados&conta=1"
				> Ver + </a>
			<iframe name="FrmVideos"
				src="http://disponivel.com/relacionamento/perfilnvideos1.asp?codigo=395969&apelido=Somos2Safados&conta=1"
				>
				
				<a target="album"
					href="http://disponivel.com/relacionamento/video.asp?codap=395969&codigo=%202448&apelido=Somos2Safados&arquivo=590087395969.wmv&fs=2"
					> <img/> </a>
				...
				
				# Ver + #
				1: href = http://disponivel.com/relacionamento/perfilnvideos1.asp?intPagina=1&codigo1=395969&conta=1&album=&apelido1=Somos2Safados
				2: href = http://disponivel.com/relacionamento/perfilnvideos1.asp?intPagina=2&codigo1=395969&conta=1&album=&apelido1=Somos2Safados
				...
			
			<!-- FAVORITOS -->
			<a target="FrmFavoritos"
				href="http://disponivel.com/relacionamento/perfilfav.asp?codigo=395969&apelido=Somos2Safados&conta=1"
				> Ver + </a>
			<iframe name="FrmFavoritos"
				src="http://disponivel.com/relacionamento/perfilnfavoritos.asp?codigo=395969&apelido=Somos2Safados&conta=1"
				>
				
				<a target="_top"
					href="http://blacksarado1.disponivel.com/"
					> <img/> </a>
				...
				
				# Ver + #
				1: href = http://disponivel.com/relacionamento/perfilfav.asp?intPagina=1&codigo=395969&conta=&album=&apelido=Somos2Safados
				2: href = http://disponivel.com/relacionamento/perfilfav.asp?intPagina=2&codigo=395969&conta=&album=&apelido=Somos2Safados
				...
*/
var m;


if(document.location.href.match(/\/headf\.asp/)) {
	var node;
	
	node = document.evaluate("//TABLE", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = '100%'
	
	node = document.evaluate("//TABLE//TABLE//TABLE", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = '100%'
	
	node = document.evaluate("//TABLE//TABLE//TABLE//TR[2]/TD", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = '100%'
	
	node = document.evaluate("//TABLE//TABLE//TABLE//TR[2]/TD/TABLE", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = '100%'
	
	node = document.evaluate("//IFRAME", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = '100%'
}


if(document.location.href.match(/\/marquee\.asp/)) {
	// Recria marquee para poder ter 100% de largura  :-O
	var nodes = document.getElementsByTagName('MARQUEE');
	var marquee = nodes.item(0);
	var html = marquee.innerHTML;
	marquee.parentNode.removeChild(marquee);
	
	marquee = document.createElement('MARQUEE');
	marquee.innerHTML = html;
	document.body.appendChild(marquee);
}


m = document.location.href.match(/\/perfil\.asp\?(.+&)?nome=([^&]+)/);
if(m) {
	document.title = m[2] + ' - Disponivel.com';
	
	
	var node;
	
	node = document.evaluate("//TR[2]/TD[2]", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = 354;
	
	node = document.evaluate("//TABLE", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	node.singleNodeValue.width = '100%';
	
	
	var nodes;
	
	nodes = document.evaluate("//IFRAME", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < nodes.snapshotLength; i++) {
		node = nodes.snapshotItem(i);
		node.width = '100%';
		switch(node.name) {
			case 'FrmFavoritos':
				node.height = '138';
				break;
			case 'FrmFotos':
				node.height = '117';
				break;
		}
	}
	
	nodes = document.evaluate("//A[B/text()='Ver +']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < nodes.snapshotLength; i++) {
		node = nodes.snapshotItem(i);
		var url    = node.href;
		var target = node.target;
		
		var frame = document.getElementsByName(target).item(0);
		frame.src = url;
	}
	
	
	nodes = document.evaluate("//A[normalize-space(B/text())='Foto Principal']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < nodes.snapshotLength; i++) {
		node = nodes.snapshotItem(i);
		node.addEventListener('click', function() { desabilitaAutoNav(window); }, true);
	}
}

m = document.location.href.match(/perfil(nfotos1|nvideos1|fav)\.asp/);
//m = document.location.href.match(/perfil(fav)\.asp/);
//m = document.location.href.match(/perfil(nfotos1|nvideos1)\.asp/);
//m = document.location.href.match(/perfil(nfotos1)\.asp/);
if(m  &&  document.location.href.indexOf(StringMagica) < 0) {
	var pagina = m[1];
	
	var xpathLista, xpathLinks;
	if(pagina != 'fav') {
		xpathLista = ".//TR[1]";
		xpathItens = "//A[IMG]";
		xpathLinks = ".//TR[2]";
	} else {
		xpathLista = ".//TABLE[1]/TBODY/TR";
		xpathItens = "//TD/TABLE";
		xpathLinks = ".//TABLE[2]";
	}
	
	var numPaginas = 1;
	var paginasCarregadas = 1;
	var nodes = document.evaluate("//A[contains(@href,'?intPagina=')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		m = node.href.match(/intPagina=(\d+)/);
		if(m) {
			url = node.href + '';
			
			var n = parseInt(m[1]);
			if(n > numPaginas) {
				numPaginas = n;
			}
		}
	}
	
	// Força o número de páginas
//	numPaginas = 2;
	
	
	var links = document.evaluate(xpathLinks, document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(links) {
		links.parentNode.removeChild(links);
	}

/*
	function criaSombra(nodo) {
		nodo.style.zIndex = 2;
		
		var nodoSombra = nodo.cloneNode(true);
		nodoSombra.style.bottom = parseInt(nodoSombra.style.bottom) + 1;
		nodoSombra.style.left   = parseInt(nodoSombra.style.left  ) + 1;
		nodoSombra.style.color = 'rgb(255, 253, 201)';
		nodoSombra.style.zIndex = 1;
		var tmps = nodoSombra.getElementsByTagName('*');
		for(var i = 0; i < tmps.length; i++) {
			// Somente elementos SPAN devem ter sombra
			var tmp = tmps[i];
			if(tmp.tagName == 'INPUT') {
				tmp.style.visibility = 'hidden';
			}
		}
		document.body.appendChild(nodoSombra);
		return nodoSombra;
	}
*/
	
	var rodapeEsquerda;
	var rodapeDireita;
	{
		rodapeEsquerda = document.createElement('TD');
		rodapeEsquerda.align = 'left';
		
		rodapeDireita = document.createElement('TD');
		rodapeDireita.align = 'right';
		
		var tr = document.createElement('TR');
		tr.appendChild(rodapeEsquerda);
		tr.appendChild(rodapeDireita);
		
		var rodape = document.createElement('TABLE');
		rodape.style.position = 'fixed';
		rodape.style.bottom = '0';
		rodape.style.left = '0';
		rodape.style.width = '100%';
		rodape.style.fontFamily = 'Verdana,Arial,Helvetica,sans-serif';
		rodape.style.fontSize = '11px';
		rodape.style.color = 'black';
		
		rodape.appendChild(tr);
		document.body.appendChild(rodape);
	}
/*
	rodapeEsquerda.innerHTML = 'Esquerda';
	rodapeDireita.innerHTML = 'Direita';
*/	
	
	
	var numItens = 0;
	var num = 0;	// Item atual
	
	var preCarregador = new Object();
	if(pagina == 'nfotos1') {
		preCarregador.itensPreCarregados = 0;
		preCarregador.img = new Image();
		preCarregador.atualiza = function() {
			if(preCarregador.itensPreCarregados < numItens) {
				var num = preCarregador.itensPreCarregados + 1;
				GM_log('Pré-carregando imagem ' + num);
				var link = document.getElementById(num);
				var url = link.href;
				var m = url.match('&arqu=([^&]+).*&servidor=([^&]+)');
				preCarregador.img.src = 'http://1.disponivel.com/serv/serv' + m[2] + '/img/' + m[1];
			}
		};
		var preCarregou = function() {
			preCarregador.itensPreCarregados++;
			//GM_log('Pré-carregou imagem ' + preCarregador.itensPreCarregados);
			setTimeout(preCarregador.atualiza, 1);
		};
		preCarregador.img.addEventListener('load', preCarregou, true);
	} else {
		preCarregador.atualiza = function() { /* nada */ };
	}
	
	function preparaItens(doc) {
		var itens = new Array();
		
		var nodes = doc.evaluate(xpathItens, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; i < nodes.snapshotLength; i++) {
			var node = nodes.snapshotItem(i);
			++numItens;
			
			if(pagina != 'fav') {
				node.id = numItens;
				node.addEventListener('click', function(evt) { atualizaAlbum(evt, this.id); }, true);
				
				if(pagina != 'nfotos1') {
					node.addEventListener('click', function() { desabilitaAutoNav(window.parent); }, true);
				}
				
				var img = node.getElementsByTagName('IMG')[0];
				img.style.borderColor = 'white';
				img.border = 2;
			} else {
				var links = doc.evaluate("//A", node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for(var j = 0; j < links.snapshotLength; j++) {
					var link = links.snapshotItem(j);
					link.target = '_top';
				}
			}
			
			itens.push(node);
		}
		
		preCarregador.atualiza();
		
		return itens;
	};
	
	
	var divContador = rodapeDireita;
	
	function atualizaContadores() {
		var strItens = '';
		if(pagina != 'fav') {
			strItens += num + '/';
		}
		strItens += numItens;
		
		var strPaginas = '';
		if(paginasCarregadas < numPaginas) {
			strPaginas += paginasCarregadas + '/';
		}
		strPaginas += numPaginas;
		
		strPaginas = strItens + '[' + strPaginas + ']';
		divContador.innerHTML       = strPaginas;
	}	
	
	
	preparaItens(document);
	atualizaContadores();
	
	
	var slideShow;
	var timeoutSlideShow;
	
	var navega = function(n) {
		atualizaAlbum(null, n);
		window.getSelection().removeAllRanges();
	};
	var navegaAnt  = function() { navega(parseInt(num)-1); };
	var navegaProx = function() { navega(parseInt(num)+1); };
	var autoNavega = function() { if(slideShow.checked) { navegaProx() } };
	
	function atualizaAlbum(evt, n) {
		var link = document.getElementById(num);
		if(link) {
			var img = link.getElementsByTagName('IMG')[0];
			img.style.borderColor = 'white';
		}
		
		num = parseInt(n);
		if(num > numItens) {
			num = 1;
		} else if(num < 1) {
			num = numItens;
		}
//		alert('atualizando para ' + num);
		
		var link = document.getElementById(num);
		var url = link.href;
		
		var frame = window.parent.document.getElementsByName('album').item(0);
		try {
			// Tenta somente recarregar a imagem ou o vídeo em vez de recarregar o frame. 
			var paginaAtual    = extraiPath(frame.src);
			var paginaDesejada = extraiPath(url);
			if(paginaAtual != paginaDesejada) {
				GM_log('Carregando outra página');
				throw 'recarregar frame';
			}
			
			//GM_log('Página desejada já carregada');
			var doc = frame.contentDocument;
			var obj;
			
			switch(pagina) {
				case 'nfotos1':
					obj = doc.getElementsByTagName('IMG')[0];
					var m = url.match('&arqu=([^&]+).*&servidor=([^&]+)');
					url = 'http://1.disponivel.com/serv/serv' + m[2] + '/img/' + m[1];
					break;
					
				case 'nvideos1':
					obj = doc.getElementsByTagName('EMBED')[0];
					var m = url.match('&arquivo=([^&]+)');
					url = 'http://1.disponivel.com/video/' + m[1];
					break;
					
				default:
					alert('????' + pagina + '????');
			}
			
			if(!obj) {
				throw 'recarregar frame';
			}
			
			var novoObj = obj.cloneNode(false);
			if(slideShow  &&  slideShow.checked) {
				var carregou = function() {
					if(timeoutSlideShow) {
						clearTimeout(timeoutSlideShow);
					}
					timeoutSlideShow = setTimeout(autoNavega, AutoNavegaTimeout);
				};
				novoObj.addEventListener('load', carregou, true);
			}
			novoObj.src = url;
			//novoObj.addEventListener('load', listenerRecarrega, true);
			
			obj.parentNode.replaceChild(novoObj, obj);
		} catch(ex if ex == 'recarregar frame') {
			GM_log('Recarregando frame');
			frame.src = url;
		}
		atualizaContadores();
		
		var img = link.getElementsByTagName('IMG')[0];
		img.style.borderColor = 'red';
		
		if(evt) {
			evt.stopPropagation();
			evt.preventDefault();
		} else {
			var maxScrollLeft = document.body.scrollWidth - document.body.clientWidth;
			//	num = 1  ->  scrollLeft = 0
			//	num = numItens  ->  scrollLeft = maxScrollLeft
			document.body.scrollLeft = maxScrollLeft * (num - 1) / (numItens - 1);
		}
	};
	
	if(pagina != 'fav') {
		if(numItens > 1) {
			var nav = rodapeEsquerda;
			
			var a = document.createElement('SPAN');
			a.style.cursor = 'pointer';
			a.addEventListener('click', navegaAnt, true);
			a.textContent = '<Anterior'
			nav.appendChild(a);
			
			nav.appendChild(document.createTextNode(' '));
			
			var a = document.createElement('SPAN');
			a.style.cursor = 'pointer';
			a.addEventListener('click', navegaProx, true);
			a.textContent = 'Seguinte>'
			nav.appendChild(a);
			
			nav.appendChild(document.createTextNode(' '));
			
			if(pagina == 'nfotos1') {
				slideShow = document.createElement('INPUT');
				slideShow.id = NomeAutoNav;
				slideShow.type = 'checkbox';
				var ss = function() {
					if(timeoutSlideShow) {
						clearTimeout(timeoutSlideShow);
					}
					if(slideShow.checked) {
						navegaProx();
					}
				};
				slideShow.addEventListener('click', ss, true);
				nav.appendChild(slideShow);
				
				var texto = document.createElement('SPAN');
				texto.innerHTML = 'auto';
				texto.style.cursor = 'pointer';
				texto.addEventListener('click', function() { slideShow.click(); }, true);
				nav.appendChild(texto);
			}
		}
	}
	
	if(numPaginas > 1) {
		var lista = document.evaluate(xpathLista, document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		
		// Cria IFRAME temporário para carregar as outras páginas
		var frameTemp = document.createElement('IFRAME');
		frameTemp.style.display = 'none';
		document.body.appendChild(frameTemp);
		frameTemp.addEventListener('load',
					function() {
						var contador = document.createElement('TD');
						contador.innerHTML = '<b>' + paginasCarregadas + '</b>';
						lista.appendChild(contador);
						
						var doc = frameTemp.contentDocument;
						if(pagina == 'fav') {
							ajustaLinks(doc);
						}
						
						var novosItens = preparaItens(doc);
						for(var i = 0; i < novosItens.length; i++) {
							var td = document.createElement('TD');
							td.appendChild(novosItens[i]);
							if(pagina != 'fav') {
								td.vAlign = 'top';
							} else {
								td.align  = 'center';
								td.vAlign = 'middle';
								td.width  = '327';
								td.height = '75';
							}
							lista.appendChild(td);
						}
						
						++paginasCarregadas;
						if(paginasCarregadas < numPaginas) {
							setTimeout(
										function() {
											frameTemp.src = document.location.href + '&intPagina=' + (1 + paginasCarregadas) + '&' + StringMagica;
										},
										1);
						} else {
							// Não tem mais páginas pra carregar
							var contador = document.createElement('TD');
							contador.innerHTML = '<b>' + paginasCarregadas + '</b>';
							lista.appendChild(contador);
							setTimeout(
										function() {
											document.body.removeChild(frameTemp);
										},
										1);
						}
						
						atualizaContadores();
					},
					true
				);
		frameTemp.src = document.location.href + '&intPagina=' + (1 + paginasCarregadas) + '&' + StringMagica;
	}
}

function extraiPath(url) {
	var pos = url.indexOf('?');
	if(pos >= 0) {
		return url.substring(0, pos);
	} else {
		return url;
	}
}




var styleObj = document.createElement("STYLE");
styleObj.innerHTML = ".indisponivel { color: black; } .indisponivel:visited{ color: red; }";
document.body.insertBefore(styleObj, document.body.firstChild);



var urlREs = [
			'^http://([^\\.]+)\\.disponivel\\.com/?$',
			'^http://disponivel\\.com/sites/([^\\?]+)',
			'^http://disponivel\\.com/relacionamento/site\\.asp\\?(?:.+&)?apelido=([^&]+)',
			'^http://disponivel\\.com/relacionamento/perfil\\.asp\\?(?:.+&)?nome=([^&]+)',
		];

var caracsSubst = new Array();
caracsSubst['%5f'] = '_';
caracsSubst['%2d'] = '-';

function extraiApelido(url) {
	for(var j = 0; j < urlREs.length; j++) {
		var re = urlREs[j];
		var m = url.match(re);
		
		if(m) {
			var apelido = m[1].toLowerCase();
			for(var c1 in caracsSubst) {
				var c2 = caracsSubst[c1];
				apelido = apelido.replace(c1, c2, 'g');
			}
			
			return apelido;
		}
	}
	
	return null;
}


{
	var apelido = extraiApelido(document.location.href);
	if(apelido) {
		document.title = apelido + ' - Disponivel.com';
	}
}


		
		
/*
{
	var teste = 'http://kadutesaopass.disponivel.com/';
	alert('TESTE: ' + teste.match(urlREs[0]));
}
*/

function ajustaLinks(doc) {
	var nodes = doc.evaluate("//A", doc.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		
		var apelido = extraiApelido(node.href);
		if(apelido) {
			node.target = '_top';
			node.className = 'indisponivel';
			
			//node.href = 'http://' + apelido + '.disponivel.com/';
			node.href = 'http://disponivel.com/sites/' + apelido;
			//node.href = 'http://disponivel.com/relacionamento/site.asp?apelido=' + apelido;
			//node.href = 'http://disponivel.com/relacionamento/perfil.asp?nome=' + apelido;	// Sem cabeçalho
		}
	}
}

ajustaLinks(document);



function desabilitaAutoNav(wnd) {
	var doc = wnd.document.getElementsByName('FrmFotos')[0].contentDocument;
	var chk = doc.getElementById(NomeAutoNav);
	chk.checked = false;
};
