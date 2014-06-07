// ==UserScript==
// @name           Preview Ultimo Post
// @namespace      http://userscripts.org/scripts/show/100240
// @description    Mostra rapidamente posts de cada tópico em comunidades do Orkut.
// @author         Ravan (uid=15743442514574636747)
// @version        0.5
// @include        http*://*.orkut.*/CommTopics?cmm=*
// @include        http*://*.orkut.*/Community?cmm=*
// ==/UserScript==



/*  Configuração */
iniciar_Maximizado = false;


/* 
	Baseado no script 'Prévia do Tópico' do Fr4nk (uid=8057530411904348432)
	http://paste.pocoo.org/raw/354338/#.user.js
 */

var oF = (this.orkutFrame || window);

GM_addStyle(".imgLoading { position: relative; left: 275px; top: 35px; }\
			 .imgLoadingBig { position: relative; left: 375px; top: 45%; }\
			 .imgBtn { height: 20px; width: 20px; cursor: pointer }\
			 .Btns { float: right; width: 82px; height: 20px; border: 2px solid #02679C;\
				border-top-left-radius: 10px; border-top-right-radius: 10px;\
				border-bottom: none; background-color: #FFFFFF; text-align: center; }\
			 .posts { overflow: auto; height: 95%; min-height: inherit; max-height:\
				95%; border: 2px solid #02679C; background-color: #F5F5F5; }\
			 .listitem { overflow: visible !important; }\
			 .preview { position: absolute; height: auto; min-height: 120px; max-height:\
				320px;	width: 600px; }\
			 .previewBig { width: 800px; height: 90%; max-height: 90%; }\
			 .previewTitle { float: left; color: white; font-size: 16px; width: auto;\
				background-color: #02679C; padding-left: 14px; padding-right: 14px;\
				cursor: move; -moz-user-select: none; }");				

/* Fechar Previews com Esc */
oF.addEventListener('keypress', function(e){
	if(e.keyCode==27){
		$$('.preview').forEach(function(d){
			d.style.display = "none";
		});
		startPos = null;
	}
}, true);
oF.addEventListener('mouseup', function(){
	startPos = null;
}, false);
				
Array.filter(oF.document.getElementsByTagName("a"),
	function(h) { 
		return /cmm=\d+&tid=\d+/(h)
	}).forEach(function(a) { 
		var l = document.createElement('a');
		l.innerHTML = "→";
		l.href = "javascript:void(0);";
		l.title = "Visualizar tópico";
		l.addEventListener('click', function(Event) {
			mostraDiv(a.href,a.innerHTML);
		}, false);
		a.parentNode.appendChild(l);
	})
	
	
function mostraDiv(href,titulo){
	if(preview = document.getElementById("preview"+href)) {
		preview.style.display = "block";
	} else {
		var small = !iniciar_Maximizado;
		/* cria div principal */
		var d = criaElemento('div','preview'+(small?'':' previewBig'));
		d.className;
		d.id = "preview"+href;
				
		/* cria sub-divs */
		var a = criaElemento('div','Btns previewTitle');
		a.innerHTML = titulo;
		
		/* drag and drop */
		startPos = null;
		a.addEventListener('mousedown', function(Event) {
			startPos = [Event.clientX,Event.clientY];
		}, false);
		a.addEventListener('mousemove', function(Event) {
			if(startPos) {
				this.parentNode.style.left = parseInt(this.parentNode.style.left) + (Event.clientX - startPos[0]) + 'px';
				this.parentNode.style.top  = parseInt(this.parentNode.style.top)  + (Event.clientY - startPos[1]) + 'px';
				startPos = [Event.clientX,Event.clientY];
			}	
		}, false);
		a.addEventListener('mouseup', function() {
			startPos = null;
		}, false);
		/* fim drag and drop */
		
		var b = criaElemento('div','Btns');
		var c = document.createElement('div');
		c.style.clear = "both";
		var p = criaElemento('div','posts');
		
		d.appendChild(a);
		d.appendChild(b);
		d.appendChild(c);
		d.appendChild(p);
		
		/* cria botões do menu */
		var refresh = criaElemento('img','imgBtn');
		var view 	= criaElemento('img','imgBtn');
		var zoom  	= criaElemento('img','imgBtn');
		var cancel  = criaElemento('img','imgBtn');
		refresh.src = refreshButton;
		refresh.title = "Recarregar";
		zoom.src  = small?zoomInButton:zoomOutButton;
		zoom.title = small?"Expandir":"Contrair";
		cancel.src  = cancelButton;
		cancel.title = "Fechar";
		view.src    = viewButton;
		var aView   = document.createElement('a');
		aView.href  = href+"&na=2";
		aView.title = "Ir para última página";
		aView.appendChild(view);

		/* Ação do Botão: Fechar */
		cancel.addEventListener('click', function() {
			ocultaDiv(href);
		}, false);
		/* Ação do Botão: Zoom */
		zoom.addEventListener('click', function() {
			if(small) { 
				this.src = zoomOutButton;
				this.title = "Contrair";
				d.className += " previewBig";
				i.className = "imgLoadingBig";
				small = false;
			} else {
				this.src = zoomInButton;
				this.title = "Expandir";
				d.className = "preview";
				i.className = "imgLoading";
				small = true;
			}
			posta(d,p,i,href,small);
		}, false);
		/* Ação do Botão: Recarregar */
		refresh.addEventListener('click', function() {
			posta(d,p,i,href,small);
		}, false);
		
		/* Troque a ordem para trocar a ordem dos botões */
		b.appendChild(refresh); // Botão Recarregar
		b.appendChild(aView);	// Botão Última página
		b.appendChild(zoom);	// Botão Zoom
		b.appendChild(cancel);	// Botão Fechar
	
		/* cria imagem de loading */
		var i = criaElemento('img','imgLoading'+(small?'':'Big'));
		i.src = 'http://static3.orkut.com/img/castro/loading4.png';
		
		oF.document.body.appendChild(d);
		posta(d,p,i,href,small);
	}
}

function pegaPosts(href, ultimo){
	with(new XMLHttpRequest) { 
		open("GET", /CommMsgs[^\n]+$/(href+'&na=2'), 0);
		send();
		posts = responseText.match(/(\<div class="listitem"\>(.|\n)*)\<div class="listdivi"/gim)[0]; 
		if(ultimo)
			return posts.substr(posts.lastIndexOf('<div class="listitem">'));
		else return posts;
	}
}

function posta(divPai,divPost,img,link,ultimo){
	divPost.innerHTML = "";
	divPost.appendChild(img);
	posicionaObj(divPai);
	divPost.innerHTML = pegaPosts(link,ultimo);
	posicionaObj(divPai);
}

function ocultaDiv(href){
	document.getElementById("preview"+href).style.display = "none";
}

function posicionaObj(obj){
	obj.style.top  = (oF.document.body.offsetHeight - obj.clientHeight)/2 + oF.pageYOffset;
	obj.style.left = (oF.document.body.offsetWidth - obj.clientWidth)/2;
}

function criaElemento(tipo,classe){
	var el = document.createElement(tipo);
	el.className = classe;
	return el;
}

/* 
	Get Elements By CSS Selector
	Fonte:
	http://wiki.greasespot.net/Get_Elements_By_CSS_Selector
 */
function $$(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null);
  var result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
}

/* Imagens em Base64 */

cancelButton = "data:image/png;base64,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";

refreshButton = "data:image/png;base64,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";

viewButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAcTSURBVHjaxJdpjJ1VGcd/57zbvXNnptNlhkJh2sFudLDYJUwtFIpx6ALaKBEDiBrRBOOSEIJRRPlGDOgHMWpkCQHFGCgCgYCpAjXYKVBoaekCtkxphg7tdKYzd+Yu73LOefxwhzrQmXbKF07y5Nz33Pe97+8+/2c5R4kIn+bQfMrD//jCrNY5rLnqmnYvCO9USl8sIgXgdG7S2vP6bZbdLhX7d5Sa1MsffPDukwGmN5/Vni80vFiNk5a6fEAuipiMTCOl8nTP9x9zofqWS+2jqE/ogUsv77yjWo1bLl62mK9/9SqiMMSdBsD3fZ54+nn+uXmLF+XDhwEmC3ESgLHSUSjkuebLa5jaNGXSWi5f8lkGh4bZsWuP5+f9SUOcBCAijVEYUleX//D6xHcKGKuvE0GhUAp8DCuWtON5mtd3vDVpCH+cNSciOCcfAdBaAYqdPRWe3DHI1u4yhwdTtFa0zYhY0FilY6Zh1fJ2PAWvbN/tBXnvtBD+RGRj/7nWmiPFlNs2vs9ft/TjhjMINeQ8EHhr3zCIIprqce2FhpsvXoRW0PXG6SH8U+kj4tBasbe3wpd+d4Du/SWazs5x45UzuXpxE+dNDXAODvTFPL59kI2vHufPWxw7j8Jv1i5CEF55Y4/nj4U4Ew8opegdSthw7366u8t0rpzOA9+eQ+u06CP3ts/Ks2HJVG754ky++UA3uw6UuX0T3HvVIrLMsW3nHi/MBQ+jVYzoJyZXCUcl+NnGwxx4t8yVK6bzzI/m0Totor8iHByC94agZxiOloVqJiybXcemW+czvy3Ptv2Ov+wUOi9bziUdywE8FfDL4vARf6jYy1Cxd2IAASJfseNQiUe6BmicmeP335hNFCj2DzgOFaGUCrGpWSmB3hIMVh2zmkLuvWE2hPDEPo+mcz7D9deso1CoQ5ycWx81NDVEjTREjaf2QOAJz75ZhGHDjSumMbcl5L3jhvdHBGMdmXUkVkiMnJg/KEElMaxpb2B1eyNHPojpOlAi0G40j5WEUU7CKE8Y5ScGUECSObYerECoWdPeAGI4WBQS46gaRyWrWXXMXEodR8o16da0N0Lm6Hq3BCK1BJBabH1oEwahUlBODIeLGeQ8zmvyqMaGwWqtFhinCDR4Cjyt0KoGbQV8JYAwq8kHT3F4MMNYO6aSTSYLBHCCHn3AGIu1llKqEFGEFgKt8DR46v8ARiBUAqIxtuZ2rQRxbsJ2eooghNYmH6qOd47GFHyHJ4bjsWUkcQwnlpHEMjxqxcQyWLVEygKO/X0xOGibEZzphkQhImglXHp+Dqzw1M4RFMLCKRnF2HC8YijGhmJsR2fDQMXirKG13lAcznhm1wjUeayelyMz9kRaT3pHVEkMaxflKEwP2Li9xAvvVPhcC3TMSBlODEdLlmNly7GK5UjJYq2hoyWjOQ9d76Xs7olBQ1d3FY2bcI8yIUCcOebN0Hzn8/VQsnz/b33895ilc7bi2raMRU0ZM6KMlihj6bSMr8zJWDAV9g0Ig6qOmzrPBgV3PDnArzYNkvfduP3InzAGnWMkttz2hXpeP5SwdXeV9X/8gLs3TGPdBREXNgupFZSC0Nf0l4Vn38noVzl6RzJWLmwis8IjLx7hrk0VLmloZam3F4OA0jU7VS9wzpFmlsgTHryuie8+Bl1vVbn2/qN0zM/TOT/HrEYPJ9A9YHhuX5V9h1Ouv3wmKy6Ywtt9CUvmTiE2wmMv97GluhgbQRvvYrIMbFyLuI/v977345/31dfXNf/wpusIwwBjLLlAYQT+8J8K979WYeCYhUyo5amAA/L6hKBfW9XCkrmNHBrMmDUlYPuBIk9t7Qel0VH4E1757T28+RDWmHE88OFvOodzFhFHNa0VnFsvz3PD0ohtPRnbejJ6i4LW0DZNc1lbyGs9GXc9X+bxl/tIrdDe1sDbfTHzW+tZb4TntvXjxLubwjm9NC9+dHwJBK0UCIK1DufcqCQwZKA+UKxbEHD1wgArNV6talVw5WwNCHc9X+bprmMkVljQWuDtvoS2cwusTh2bdx2HhRt+yry1R4F/6XHK8HCSpqRpRhgEqNHSrJRCKYUVqKTCSCJUUqE85nMphVtW5fnF+npA84/X+tl9cISzGjwOF1Pmtxaoy3ng3Fx0sGxcD/ieejVO0rZNL3XRuXolQeBzJse3NIObO3yqicevN8ML2wdJjLDwvAJ7D5WoJA4U72Nl77hBuHhZR/uqK9a9lCRJcxSFRGHImZ4flYK859hcnE1XfBGIJZ9TxMloT1D2B4j9k9y30p7kgYG+vj2VcukKPwrvTDOzMs3MFGpxfkajBCz19ulcFB/7d3pRXI3981HSA9wDch9qonaswJlsTxLoWzylLwmUP1M+AYAARrSeow/2bKe1PETzEox5E89/aWxJVJ/28fx/AwA8IKgRz3eHAQAAAABJRU5ErkJggg==";

zoomInButton = "data:image/png;base64,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";

zoomOutButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAcFSURBVHjaxJdbjFVXGcd/a629zzkzZ4bLDMxAoCB0uLVgKRWkgoA1GEVoUekDkpAaHoTE6JPGNDGpTRqejG1NvPtgNbEvNhZMUyMWkECRS8olDAxDEQaGYYYZZuZc922tz4d9mGEabjY0/ZJ/9jl7Z+/vd77vW/+9jhIRPs3wAJR6qfZVw9MBtK2CukngBGyYA7MYLV9A+08CeeAmNn4f4TBKzmAyoHwYPg0nz8G5DHD/HybyUgpwl5iA4nt42a3EModIAHc7+zZ8Eow6BvJL4E8fuwKgR884C7AGZX5FGM/HKJa2NbBqbiNzW3NkjaIUOU5eqbKvo+B1dleXo1lOVm8GtwOxl0GR6oEByunBz8HExzZRP/HPVOPsmoXj+MmGaTwzv/GON1cix1vHBnl5dzed18KvMWH2XhrLX8d0n8UmD1aCdAh1qrWvrmLHmYAXjsiLf70i1kktnCTWSTV2UomcRIkT50YuSl8xlg2vdQhbjwo72jtZ9J2WkWfeQyKCEhHUutcBxtO68Bgyru3HG1rZ+a1HACFKhP6qopKkJTUqlW+gwRcaMqCUIkyE9a+dZ8+ZMgRdbzJ0efP92iDvfL8GsP00aPUi1eCVlfPz7P/hfLRyFEK4PKyxkib0NGiV6taj632YXC8Yrbg6GLHkp+3cqADGW4Ow/54Av15Um764Ukdc3aa08PJzU9FaKIeOcwNQjgUnQuKE2I4qcamGAqGvDM45pk/M8oO1rRBEYIPtxBWIq3fXyPir6hMkzH5yVj2r5uRxScylYSiEaZLI3kkQOUgc3KhAKRTAsmXZRBrG+SCyCl1uRBe5q0ZWQZJZiQir5zRgDBTKjqtFhRMwWhBJP7uRFig0gtLgnBBbuFERGnzHzGafhdPrONxZmcrFA/Mp9hy9exO+XAPI+oupCnMm+4ClEAqF0JH1FFd6Q64NhnhajSRXKjW6+qxm0fQ8RiuGAiHOO7I5zaPNPofPJoq2rz4KcvT+PiDkUZAxgHOEiaUcASi6boZcHQjIGIVSKcSt8I3ikeYs+awBEaxzgCNjVOrExq97QCNiAIFC1YJzeGIJk7Tss1pyTBnvo7XCqNEWAOR8hdaKQmjxc4A4sI5iaEFrKF4fwob3SL+kBhAGh9G5bae6AyRxNPgOT1mGQ0WdB3U5g6cURtf6r6DGQCmyRBZm5AWNUA4S2q+HYHRC98kOyr33APhGDSAjh3DYfZ0Vc6OUkPccbeOEvd0a64OnR5ObWvK0FQorkNHCtHqHpw0fdAWc7wlBu07avnRhhHRMjL4r0mVocx0YPrh0PeStk0WyvmLB+ISZeUt/xVGKHOXIjlEpchQCSzG0LGpKaPAcIsIv9g2QhA6U2ktkIkLNWBkIHUTF2wByDRa/4ef4HjvfvUnXoKXOh7XTIxZMSBgOLANVYShwDIWOwUAYqDgSZ1nRmtDWYFEIPWVFT8Xc2gs8i5YVaGGsAF0Ccy6thYiglmxNYR7f9C6ZGWufmefxlxdayBlHNUy4VNK0D2r6g7TkeQ9mNAqPTxSacmC0oT8y7O/JkPEMv91zlQOnByGrB3DyHHBwtPwaGAJ9AfnN9hqAmpxeW/ajGXx27X4S+5kvzs3w+qZm5k3WhJElto7QgojCM5A1Ct/TKG3oqXr884rhekkYn1M01Wt+v6eHQ2cGIWsGcO42iDsCvFKjC2FN0wLmfO5vxHVzmxoV313RyDefqGPmREPOSwfQiaISC+29lt8dLNBV9tiyeiqDVUshcOQziua84Y29PRw5NwwZfRvEWICaD8SjtlDtOUtQXE19/c9uVuy3d74zxKv/LvBYq8+sJo+sB8VQON+f0NEbI7WtmhVh86oplGOht2Qpx47nV07BChzvGG4mo98eW4mxRnRbiwygriNuC4o/kHXbqhErj18KZxy/GIJIWgZDgpZOfDmAMhv/0z7ckjh4fkULlcjRV0yoxI6NyydjnXCis1CDYAyEdx+nfI8keg/8Rojn4Wdno1QeZ4dwtgOrOhEXY/QfyerdxzuGm6wTNj49mWosKUTkWLdsElaE0x8Wm/G8t4H14A4/CMCtKCLuGCLHUCq1XHGgTOonwiGsPEtG7zrRWWhyAuuWTqISO/pKCdXE8ZWnJmEdtF8qNeM1vomb8xQwoB/O3wsFwsEaxM1TFwrsPnKDSfWanK/oKyZcHIxYs7iJaS05sGYmTNjwkf34Q4jbIM58WOQfx/tpadDUZxS9hZhS7Jg1tQ6cA8XShw/wEYiz/y3xr+M3mdJomD0pQ87Alb4AjIa4eur/mYGPB+HrXR1d5aZiYJnVmuNKf0BXbwCofoqlXZ8cwC2IxK1Hqzeu3QjarvVWb+3pu4nsNvrzPZ8sgAJieR/s58np9Wi9jDA5gc/fUeY6RkZfRp9m/G8AXtLSEcSGijEAAAAASUVORK5CYII=";