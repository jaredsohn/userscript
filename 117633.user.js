// ==UserScript==
// @name           phpmyadmin index highlighter
// @author         ameboide
// @namespace      http://userscripts.org/scripts/show/117633
// @description    Highlights index fields, adds a link to the related table to foreign keys
// @include        */phpmyadmin/tbl_properties_structure.php*
// @include        */phpmyadmin/tbl_structure.php*
// @include        */phpmyadmin/db_structure.php*
// ==/UserScript==

//campos['nombre_del_campo'] = td
var listaCampos = document.querySelectorAll('#tablestructure tbody th');
var campos = {};
for(var i=0; i<listaCampos.length; i++){
	var campo = listaCampos[i];
	var txt = campo.textContent.trim();
	campos[txt] = campo;

	//id sin indice -> rojo claro / codigo sin indice -> rojo oscuro
	if(txt.match(/^id_|_id$/i)) campo.style.color = '#f00';
	else if(txt.match(/^codigo_|_codigo$/i)) campo.style.color = '#800';
}

//idx -> azul oscuro
var idxs = document.querySelectorAll('#table_indexes tbody tr:not(.tblFooters) td:last-of-type');
for(i=0; i<idxs.length; i++){
	var campo = campos[idxs[i].textContent.trim()];
	if(campo) campo.style.color = '#008';
}

var urlBase = document.querySelector('[href^="tbl_relation.php"]').href;

var matches = document.location.href.match(/\/(\w+\.php).*token=(\w+)/);
var url = matches[1];
var token = matches[2];

//FK -> link azul claro
function rellenar(claves){
	for(var campo in claves){
		if(!campos[campo]) continue;

		var s = claves[campo].split('.');
		var db = s[0];
		var tabla = s[1];
		var campo_fk = s[2];

		var a = document.createElement('a');
		a.href = url+'?db='+db+'&token='+token+'&table='+tabla;
		a.title = tabla+' . '+campo_fk;
		a.id = 'link_fk_' + campo;
		a.innerHTML = ' -&gt;';

		var link_viejo = document.getElementById(a.id);
		if(link_viejo) campos[campo].removeChild(link_viejo);

		campos[campo].appendChild(a);
		campos[campo].style.color = '#00f';
	}
}

//si ya habia visitado esta tabla, tengo las claves foraneas guardadas
var codigo_cache = document.location.host + ' : ' +
	urlBase.match(/(\?|&)db=(\w+)/)[2] + ' . ' +
	urlBase.match(/(\?|&)table=(\w+)/)[2];

var cache = GM_getValue(codigo_cache, null);
if(cache) rellenar(JSON.parse(cache));

//leer la pag de las claves foraneas (si estaba cacheado, leo igual para actualizar)
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if (xhr.readyState == 4 && xhr.status == 200){
		try{
			var div = document.createElement('div');
			div.innerHTML = xhr.responseText;

			var claves = {};

			var opts = div.querySelectorAll('select[name^="destination"] option[selected]');
			for(var i=0; i<opts.length; i++){
				var opt = opts[i];
				var val = opt.value;

				while(opt.nodeName != 'TR') opt = opt.parentNode;
				var campo = opt.firstElementChild.textContent.trim();

				claves[campo] = val;
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
xhr.open('GET', urlBase, true);
xhr.send(null);