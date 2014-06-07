// ==UserScript==
// @name           phpmyadmin relation links
// @author         ameboide
// @namespace      http://userscripts.org/scripts/show/118889
// @description    When browsing data, adds a link to foreign key values to open the related row. When looking at the table structure, highlights index fields and adds a link to the related table for foreign keys
// @version        1.01
// @include        */phpmyadmin/*
// ==/UserScript==
function $(q, elem){
	if(!elem) elem = document;
	return elem.querySelector(q);
}

function $$(q, elem){
	if(!elem) elem = document;
	return elem.querySelectorAll(q);
}

var urls = ['tbl_change', 'tbl_select'];
for(var i=0; i<urls.length; i++){
	var omnipresente = urls[i];
	var urlBase = $('[href*="'+omnipresente+'.php?"]');
	if(urlBase) break;
}
if(urlBase){
	urlBase = urlBase.href;

	//retorna el ancestro mas cercano de ese tipo
	function ancestro(nodo, tag){
		while(nodo && nodo.nodeName != tag.toUpperCase()) nodo = nodo.parentNode;
		return nodo;
	}

	//usa los datos de las FK para linkear (primero con lo cacheado, despues actualiza el cache)
	function ejecutar(rellenar){
		//si ya habia visitado esta tabla, tengo las claves foraneas guardadas
		var codigo_cache = document.location.host + ' : ' +
			urlBase.match(/(\?|&)db=(\w+)/)[2] + ' . ' +
			urlBase.match(/(\?|&)table=(\w+)/)[2];

		var cache = GM_getValue(codigo_cache, null);
		try{ if(cache) rellenar(JSON.parse(cache)); }
		catch(e){}

		//leer la pag de las claves foraneas (si estaba cacheado, leo igual para actualizar)
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 && xhr.status == 200){
				try{
					var div = document.createElement('div');
					div.innerHTML = xhr.responseText;

					var claves = {};

					var opts = $$('select[name^="destination"] option[selected]', div);
					for(var i=0; i<opts.length; i++){
						var opt = opts[i];
						var tr = ancestro(opt, 'tr');

						var fk = opt.value.replace(/`/g, '').split('.');
						var ondel = $('select[name^="on_delete"] option[selected]', tr);
						var onup = $('select[name^="on_update"] option[selected]', tr);

						claves[tr.firstElementChild.textContent.trim()] = {
							db: fk[0],
							tabla: fk[1],
							campo: fk[2],
							ondel: ondel ? ondel.value : '',
							onup: onup ? onup.value : ''
						};
					}

					var claves_str = JSON.stringify(claves);
					//si no es lo mismo q tenia cacheado, vuelvo a rellenar con la info nueva
					if(claves_str != cache){
						//workaround para error raro
						setTimeout(function() {
							GM_setValue(codigo_cache, claves_str);
						}, 0);
						rellenar(claves);
					}
				}
				catch(e){}
			}
		}
		xhr.open('GET', urlBase.replace(omnipresente, 'tbl_relation'), true);
		xhr.send(null);
	}

	var listaCampos = $$('#tablestructure tbody th');
	if(listaCampos.length){ //estoy en la estructura de la tabla
		//tds_campos['nombre_del_campo'] = td
		var tds_campos = {};
		for(var i=0; i<listaCampos.length; i++){
			var campo = listaCampos[i];
			var txt = campo.textContent.trim();
			tds_campos[txt] = campo;

			//id sin indice -> rojo claro / codigo sin indice -> rojo oscuro
			if(txt.match(/^id_|_id$/i) || txt.match(/^Id[A-Z]|[A-Z]Id$/)) campo.style.color = '#f00';
			else if(txt.match(/^codigo_|_codigo$|^codigo$/i) || txt.match(/^Codigo[A-Z]|[A-Z]Codigo$|Cod[A-Z]|[A-Z]Cod/)) campo.style.color = '#800';
		}

		//idx -> azul oscuro
		var idxs = $$('#table_indexes tbody tr:not(.tblFooters) td:last-of-type');
		if(!idxs.length){
			var edit = $('[href^="tbl_indexes.php"]');
			if(edit) idxs = $$('td:nth-of-type(6)', ancestro(edit, 'tr').parentNode);
		}
		for(i=0; i<idxs.length; i++){
			var campo = tds_campos[idxs[i].textContent.trim()];
			if(campo) campo.style.color = '#008';
		}

		var matches = $('a.tabactive').href.match(/\/(\w+\.php).*token=(\w+)/);
		var url = matches[1];
		var token = matches[2];

		//FK -> link azul claro
		ejecutar(function(claves){
			for(var campo in claves){
				if(!tds_campos[campo]) continue;
				var fk = claves[campo];

				var a = document.createElement('a');
				a.href = url+'?db='+fk.db+'&token='+token+'&table='+fk.tabla;
				a.title = fk.tabla+' . '+fk.campo+
					(fk.ondel?' [DEL: '+fk.ondel+']':'')+
					(fk.onup?' [UP: '+fk.onup+'] ':'');
				a.id = 'link_fk_' + campo;
				a.innerHTML = ' &gt; ['+fk.tabla+
					(fk.ondel?' D:'+fk.ondel[0]:'')+
					(fk.onup?' U:'+fk.onup[0]:'')+']';
				a.style.cssFloat = 'left';
				a.style.fontSize = 'xx-small';

				var link_viejo = document.getElementById(a.id);
				if(link_viejo) tds_campos[campo].removeChild(link_viejo);

				tds_campos[campo].appendChild(a);
				tds_campos[campo].style.color = '#00f';
			}
		});
	}
	else if($('#table_results')){ //estoy viendo los datos
		//indices['nombre_campo'] = indice_del_td_con_el_valor
		var indices = {};
		var ths = $$('th', $('#table_results th:not([colspan])').parentNode);
		for(var i=0, idx=0; i<ths.length; i++){
			var th = ths[i];
			var colspan = th.getAttribute('colspan');
			if(colspan){
				idx += parseInt(colspan);
				continue;
			}

			var a = $('a', th);
			var campo = a ? a : th.childNodes[0];
			indices[campo.textContent.trim()] = ++idx;
		}

		//FK -> link a un select * from fk.tabla where fk.campo = valor
		ejecutar(function(claves){
			for(var campo in claves){
				var idx = indices[campo];
				if(!idx) continue;
				var fk = claves[campo];

				var url = urlBase.replace(omnipresente, 'sql')
					.replace(/(db=)\w+/, '$1'+fk.db)
					.replace(/(table=)\w+/, '$1'+fk.tabla) +
					'&show_query=1&sql_query=' +
					encodeURI("SELECT * FROM "+fk.tabla+" WHERE "+fk.campo+" = '-valor-'");

				//reemplazar los valores por links q entregan la fila asociada
				var tds = $$('#table_results td:nth-of-type('+idx+')');
				for(var j=0; j<tds.length; j++){
					var td = tds[j];
					if(td.innerHTML.trim() == '<i>NULL</i>') continue;

					td.innerHTML = '<a href="'+url.replace('-valor-', td.textContent)+
						'" title="'+fk.tabla+' . '+fk.campo+'">'+td.textContent+'</a>';
				}
			}
		});
	}
}