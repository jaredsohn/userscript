// coding: utf-8
// ==UserScript==
// @name           Ikariam Museum Helper
// @namespace      museum-helper.ikariam
// @version        1
// @author         mierda
// @description    none of your business
// @include        http://s*.ikariam.*/*museum*
// ==/UserScript==

function suggest_treaties(){
	var suggestion_thead;
	var suggestion_tbody;
	var suggestion_table;
	var suggestion_field;
	var suggestion_list;
	var suggestion_head;
	var ver_sugerencias;
	var suggestion_row;
	var cityformfields;
	var subelement;
	var mainview;
	var cityform;
	var treaties;
	var element;
	var cityid;

	cityform        = document.getElementById('changeCityForm');
	cityformfields  = cityform.getElementsByTagName('input');
	ver_sugerencias = document.getElementById('ver_sugerencias');

	for(x = 0 ; x < cityformfields.length ; x++){
		if(cityformfields[x].getAttribute('name') == 'id'){
			cityid = cityformfields[x].getAttribute('value');
			break;
		}
	}

	mainview        = document.getElementById('mainview');
	suggestion_list = document.getElementById('suggestion_list');

	if(suggestion_list == null){
		data = 'city_id=' + cityid;

		GM_xmlhttpRequest({
					method:  'POST',
					url:     'http://200.80.42.195/tratados/alpha/suggest.php',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data:    encodeURI(data),
					onload:  function(xhr)  {
									if(xhr.responseText == '1'){
										alert('ERROR : ' + xhr.responseText); 
									}else{
										suggestion_list = document.createElement('div');
										suggestion_list.setAttribute("id",    "suggestion_list"); 
										suggestion_list.setAttribute("class", "contentBox01h"); 
										suggestion_list.innerHTML = '<h3 class="header"><span class="textLabel">Sugerencias</span></h3>';

										suggestion_list_content = document.createElement('div');
										suggestion_list_content.setAttribute("id",    "suggestion_list_content"); 
										suggestion_list_content.setAttribute("class", "content"); 

										suggestion_table = document.createElement('table');
										suggestion_table.cellpadding = 0; 
										suggestion_table.cellspacing = 0; 

////////////////
										suggestion_thead = document.createElement('thead');

										suggestion_row = document.createElement('tr');

										suggestion_head = document.createElement('th');
										suggestion_head.setAttribute("scope", "col");
										suggestion_head.setAttribute("class", "empty"); 
	
										suggestion_row.appendChild(suggestion_head);

										suggestion_head = document.createElement('th');
										suggestion_head.setAttribute("scope", "col");
										suggestion_head.setAttribute("class", "player");
										suggestion_head.innerHTML = 'Nombre del jugador';

										suggestion_row.appendChild(suggestion_head);

										suggestion_head = document.createElement('th');
										suggestion_head.setAttribute("scope", "col");
										suggestion_head.setAttribute("class", "player"); 
										suggestion_head.innerHTML = 'Alianza';

										suggestion_row.appendChild(suggestion_head);

										suggestion_head = document.createElement('th');
										suggestion_head.setAttribute("scope", "col");
										suggestion_head.setAttribute("class", "player"); 
										suggestion_head.innerHTML = 'Lugares';

										suggestion_row.appendChild(suggestion_head);

										suggestion_head = document.createElement('th');
										suggestion_head.setAttribute("scope", "col");
										suggestion_head.setAttribute("class", "actions"); 
										suggestion_head.innerHTML = 'Acciones';

										suggestion_row.appendChild(suggestion_head);

										suggestion_head = document.createElement('th');
										suggestion_head.setAttribute("scope", "col");
										suggestion_head.setAttribute("class", "empty"); 

										suggestion_row.appendChild(suggestion_head);

										suggestion_thead.appendChild(suggestion_row);
////////////////

										tratados = xhr.responseText.split("\n");

										suggestion_tbody = document.createElement('tbody');
										for(x = 0 ; x < tratados.length - 1 ; x++){
											tratado = tratados[x].split(",");

											suggestion_row = document.createElement('tr');
											if(x % 2){
												suggestion_row.setAttribute("class", "alt"); 
											}

											suggestion_field = document.createElement('td');
											suggestion_field.setAttribute("class", "empty"); 

											suggestion_row.appendChild(suggestion_field);

											suggestion_field = document.createElement('td');
											suggestion_field.setAttribute("class", "player"); 
											suggestion_field.innerHTML = tratado[3];
						
											suggestion_row.appendChild(suggestion_field);

											suggestion_field = document.createElement('td');
											suggestion_field.setAttribute("class", "player"); 
											suggestion_field.innerHTML = tratado[2];

											suggestion_row.appendChild(suggestion_field);

											suggestion_field = document.createElement('td');
											suggestion_field.setAttribute("class", "player"); 
											suggestion_field.innerHTML = tratado[1];

											suggestion_row.appendChild(suggestion_field);

											element       = document.createElement('a');
											element.href  = '?view=sendIKMessage&receiverId=' + tratado[0] + '&msgType=77';
											element.title = 'Enviar tratado';
											element.setAttribute("class", "writeMsg");

											subelement      = document.createElement('img');
											subelement.src  = 'skin/interface/icon_message_write.gif';
											subelement.alt  = 'Enviar tratado';
											element.appendChild(subelement);

											suggestion_field = document.createElement('td');
											suggestion_field.setAttribute("class", "actions"); 
											suggestion_field.appendChild(element);

											suggestion_row.appendChild(suggestion_field);

											suggestion_field = document.createElement('td');
											suggestion_field.setAttribute("class", "empty"); 

											suggestion_row.appendChild(suggestion_field);

											suggestion_tbody.appendChild(suggestion_row);
										}

										elements = document.getElementsByTagName('div');

										for(x = 0 ; x < elements.length ; x++){
											if(elements[x].getAttribute('class') == 'contentBox01h'){
												subelements = elements[x].getElementsByTagName('h3');
												if(subelements.length > 0){
													if(subelements[0].innerHTML == '<span class="textLabel">Socio</span>'){
														elements[x].style.display = 'none';
														break;
													}
												}
											}
										}

										suggestion_table.appendChild(suggestion_thead);

										suggestion_table.appendChild(suggestion_tbody);

										suggestion_list_content.appendChild(suggestion_table);

										suggestion_list.appendChild(suggestion_list_content);

										mainview.appendChild(suggestion_list);

									}
								}
				 });
		ver_sugerencias.innerHTML     = 'Ver tratados';
	}else{
		if(suggestion_list.style.display == 'none'){
			ver_sugerencias.innerHTML     = 'Ver tratados';
			suggestion_list.style.display = '';

			elements = document.getElementsByTagName('div');

			for(x = 0 ; x < elements.length ; x++){
				if(elements[x].getAttribute('class') == 'contentBox01h'){
					subelements = elements[x].getElementsByTagName('h3');
					if(subelements.length > 0){
						if(subelements[0].innerHTML == '<span class="textLabel">Socio</span>'){
							elements[x].style.display = 'none';
							break;
						}
					}
				}
			}
		}else{
			ver_sugerencias.innerHTML     = 'Ver sugerencias';
			suggestion_list.style.display = 'none';

			elements = document.getElementsByTagName('div');

			for(x = 0 ; x < elements.length ; x++){
				if(elements[x].getAttribute('class') == 'contentBox01h'){
					subelements = elements[x].getElementsByTagName('h3');
					if(subelements.length > 0){
						if(subelements[0].innerHTML == '<span class="textLabel">Socio</span>'){
							elements[x].style.display = '';
							break;
						}
					}
				}
			}
		}
	}
}

function update_treaties(){
	var cityformfields;
	var cityform;
	var elements;
	var treaties;
	var cityid;

	slots          = document.getElementById('slots');
	slots          = slots.value;

	cityform       = document.getElementById('changeCityForm');
	cityformfields = cityform.getElementsByTagName('input');

	for(x = 0 ; x < cityformfields.length ; x++){
		if(cityformfields[x].getAttribute('name') == 'id'){
			cityid = cityformfields[x].getAttribute('value');
			break;
		}
	}

	elements = document.getElementsByTagName('a');
	treaties = '';

	for(x = 0 ; x < elements.length ; x++){
		if(elements[x].getAttribute('class') == 'writeMsg'){
			treaties += elements[x].getAttribute('href').substring("?view=sendIKMessage&receiverId=".length, elements[x].getAttribute('href').length) + ',';
		}
	}

	data = 'city_id=' + cityid + '&slots=' + slots + '&treaties=' + treaties;
	GM_xmlhttpRequest({
				method:  'POST',
				url:     'http://200.80.42.195/tratados/alpha/update.php',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data:    encodeURI(data),
				onload:  function(xhr)  {
								if(xhr.responseText != '0')
									alert('ERROR : ' + xhr.responseText); 
								else
									alert('DATOS ACTUALIZADOS'); 
							}
			 });
}

var x;
var DivAssignCulturalGoods;
var DivAssignCulturalGoodsContents;

DivAssignCulturalGoods		= document.getElementById('assignCulturalGoods');
DivAssignCulturalGoodsContents	= DivAssignCulturalGoods.getElementsByTagName('*');
       
for(x = 0 ; x < DivAssignCulturalGoodsContents.length ; x++){
	if(DivAssignCulturalGoodsContents[x].getAttribute('class') == 'content'){
		var w = document.createElement('div');
		w.setAttribute("style", "height: 1px;"); 

		var z = document.createElement('div');
		z.setAttribute("style", "height: 1px;"); 

		var p = document.createElement('div');
		p.setAttribute("class", "centerButton");
		p.setAttribute("style", "height: 20px;"); 

		var k = document.createElement('div');
		k.setAttribute("class", "centerButton");
		k.setAttribute("style", "height: 20px;"); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var o = document.createTextNode('Libres : ');

		var q = document.createElement('input');
		q.setAttribute("style", "width: 20px; height: 17px; margin-right: 4px; text-align: right;");
		q.type  = 'text';
		q.type  = 'text';
		q.value = '0';
		q.id    = 'slots';

		var m = document.createElement('a');
		m.setAttribute("class", "button");
		m.addEventListener("click", update_treaties, false);
		m.appendChild(document.createTextNode('Actualizar'));

		var i = document.createElement('a');
		i.setAttribute("id",    "ver_sugerencias");
		i.setAttribute("class", "button");
		i.addEventListener("click", suggest_treaties, false);
		i.appendChild(document.createTextNode('Ver sugerencias'));

		p.appendChild(o);
		p.appendChild(q);
		p.appendChild(m);

		k.appendChild(i);

		DivAssignCulturalGoodsContents[x].appendChild(z);
		DivAssignCulturalGoodsContents[x].appendChild(p);
		DivAssignCulturalGoodsContents[x].appendChild(w);
		DivAssignCulturalGoodsContents[x].appendChild(k);

		break;
	}
}
