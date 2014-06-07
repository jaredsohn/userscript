// CPH tools
// version 1.2
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CPH Tools", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CPH tools
// @namespace     http://xd-blog.com.ar/
// @description   agrega funcionalidad a portalhacker.net
// @include       http://portalhacker.net/*
// @include       http://www.portalhacker.net/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// ==/UserScript==
//
// Changelog:
// 2011-05-23 0.1 privado
// 2011-12-13 0.2 primera version publica
// 2011-12-16 0.3 se puede usar google para buscar en el foro && gorrito navideños
// 2012-04-03 0.4 agrega un dropdown para mandar temas a las faqs
// 2012-12-15 0.5 @grant none
//                se reorganizó el codigo
//                se agregaron mas opciones de configuracion
//                se elimina texto de la pagina que solo ocupa espacio
//                pone un link a los temas recientes arriba a la derecha
// 2012-12-15 0.6 Mejor manejo de errores
//                Se eliminan unos cosos feos del theme
//                Se arregló un bug en makeSpace()
// 2012-12-16 1.0 Acomodada la funcion sendToFaqs()
//                Se arregló un bug en makeSpace()
//                Se configura desde el link abajo de todo
// 2012-12-16 1.1 Se acomodó la apariencia que se rompia en makeSpace()
//                Se cambió la apariencia del menu de opciones
// 2014-03-16 1.2 Se actualizó el link del logo

try{
	if (GM_getValue('cambiarLogo', true)) {
		if (nearChristmas()) {
			changeLogo('http://i.imgur.com/oJkrW.png');
		} else {
			changeLogo('http://i.imgur.com/k11Mnox.png');
		}
	}
}catch(e){}

try{
	changeSearchEngine(GM_getValue('buscador', 'DuckDuckGo'));
}catch(e){}

try{
	if (GM_getValue('hacerEspacio', true)) makeSpace();
}catch(e){}

try{
	if (GM_getValue('linkAMensajesRecientes', true)) addRecentMessagesLink();
}catch(e){}

try{
	addFAQsDropdown();
}catch(e){}

try{
	addConfigurationLink();
}catch(e){}

/*
 * Devuelve true si estamos entre el 15 y el 31 de diciembre
 * Se usa para saber si hay que poner el logo de navidad
 */
function nearChristmas(){
	var fecha = new Date ();
	return ((fecha.getMonth() == 11) && (fecha.getDate() > 15));
}

/*
 * Cambia el logo por otro que se ve mejor
 */
function changeLogo(url){
	//Sacamos el logo viejo (document.getElementById('logo').firstChild.nextSibling es el <a>)
	var logoLink = document.getElementById('logo').firstChild.nextSibling;
	logoLink.style.backgroundImage = 'url()';
	//Eliminamos el margen
	logoLink.style.top=0;
	//Creamos el nuevo y lo metemos como hijo del <a>
	var newLogo = document.createElement('img');
	newLogo.setAttribute('src', url);
	logoLink.appendChild(newLogo)
}



/*
 * Cambia el buscador por ddg o google
 */
function changeSearchEngine(searchEngine) {
	if (searchEngine != 'SMF'){
		var form = document.getElementById('searcharea').firstChild.nextSibling;
		form.action='https://duckduckgo.com/';
		document.getElementsByName('search')[0].name='q';
		if (searchEngine == 'DuckDuckGo') {
		  form.addEventListener('submit', function (){document.getElementsByName('q')[0].value=document.getElementsByName('q')[0].value + ' site:portalhacker.net';}, false);
		} else if (searchEngine == 'Google') {
		  form.addEventListener('submit', function (){document.getElementsByName('q')[0].value=document.getElementsByName('q')[0].value + ' site:portalhacker.net !g';}, false);
		}
	}
}



/*
 * Elimina cosas que no sirven
 */
function makeSpace(){
	//saca el h2 que dice "Tambien puedes publicar tus dudas en:"
	document.getElementById('toolbar').firstChild.nextSibling.nextSibling.nextSibling.style.display = 'none';
	//saca el rectangulo negro que dice portal hacker
	//solo en el index, adentro de los posts es util
	var div = document.getElementsByClassName('navigate_section')[0]
	if (div.firstChild.nextSibling.childNodes.length < 4){
		div.style.display = 'none';
	}
	//saca los cosos redondeados de alrededor del textbox de respuesta
	//va al final porque puede dar error si no estan
	var upperframe = document.getElementsByClassName('upperframe')[0];
	//en el index el upperframe es de las clases upperframe y clear. Si se lo elimina se rompe todo.
	if (upperframe.className.indexOf('clear') == -1) {
		upperframe.style.display = 'none';
	} else {
		upperframe.className = 'clear';
		upperframe.style.display = 'block';
	}
	document.getElementsByClassName('lowerframe')[0].style.display = 'none';
	//Al eliminar el upperframe queda todo pegado. Agregamos padding.
	document.getElementsByClassName('innerframe')[0].style.paddingTop = '9px';
}



/*
 * Agrega un link a los mensajes recientes
 */
function addRecentMessagesLink(){
	var link = document.createElement('a');
	link.innerHTML = 'Mensajes recientes.';
	link.href = 'http://www.portalhacker.net/index.php?action=recent';
	var container = document.getElementsByClassName('reset')[0];
	container.insertBefore(link, container.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
}



/*
 * Dropdown para mandar temas a las faqs
 */
function sendToFaqs(){
    function secondHandler() { //handles the post
    	if(request.readyState === 4){
			if (request.status != 200) {  
	  			alert('Me parece que no se pudo mandar el post a las faqs :(');
			}else{
	  			alert('Post enviado a las faqs :)');  
			}
      	}
    }

	function firstHandler(){ //handles the get
	    if(request.readyState === 4){
	      	if (request.status != 200) {  
				alert('Me parece que no se pudo mandar el post a las faqs :(');
	      	}else{
				regexp = new RegExp('<input type="hidden" name="(.*?)" value="(.*?)" />', 'g');
				var tmp = regexp.exec(request.responseText);
				var arreglo = [];
				while (tmp !== null){
					arreglo.push([tmp[1], tmp[2]]);
					tmp = regexp.exec(request.responseText);
				}
				arreglo.pop(); arreglo.pop(); arreglo.pop();
				arreglo.shift(); arreglo.shift(); 
				arreglo.push(['post', 'Publicar']);
				arreglo.push(['message', '[url='+location.href+']'+document.title+'[/url]']);
				var fd = new FormData;
				for (var i=0; i < arreglo.length; i++){
					fd.append(arreglo[i][0], arreglo[i][1]);
				}
				
				request = new XMLHttpRequest();
				request.onreadystatechange = secondHandler;
				request.open('POST', 'http://www.portalhacker.net/index.php/action,post2.html', true);
				request.send(fd);
	      	}
	    }
	}

  	request = new XMLHttpRequest();
  	request.onreadystatechange = firstHandler;
  	request.open('GET', 'http://www.portalhacker.net/index.php/topic,' + document.getElementById('caja').value + '.0.html/', true);
  	request.send(null);
}

function addFAQsDropdown(){
	if (location.href.search('topic') != -1){ //si es un topic
	  var faqs = [['Enviar a las FAQs', 'NULL'],
		      ['Hacking General', '138025'],
		      ['Seguridad a Nivel Web', '64762'],
		      ['Ingeniería Inversa', '73400'],
		      ['Seguridad', '88758'],
		      ['Criptografía', '151769'],
		      ['Estudio y Desarrollo de Malware', '140135'],
		      ['Programación en general', '146528'],
		      ['Algoritmia y matemática', '108076'],
		      ['Visual Basic 6.0 y anteriores', '68907'],
		      ['JAVA', '105458'],
		      ['Python', '136744'],
		      ['ASM', '148828'],
		      ['Desarrollo Web', '26688'],
		      ['GNU/Linux', '82644']];
		      
	  var caja = document.createElement('select');
	  caja.addEventListener('change', sendToFaqs);
	  caja.style.cssFloat = 'right';
	  caja.style.marginRight = '10px';
	  caja.id = 'caja';
	  for ($i=0; $i<faqs.length; $i++){
	    var opcion = new Option(faqs[$i][0], faqs[$i][1]);
	    caja.appendChild(opcion);
	  }
	  document.getElementById('bodyarea').firstChild.nextSibling.firstChild.nextSibling.appendChild(caja);
	}
}



/*
 * Permite configurar el plugin
 */
function addConfigurationLink(){
	var a = document.createElement('a');
	a.innerHTML = 'Configurar cph tools.'
	a.className = 'new_win';
	a.href = 'javascript:void(0);';
	a.onclick = createConfigurationDialog;
	var div = document.createElement('div');
	div.id = 'configurar';
	div.appendChild(a);
	document.getElementsByClassName('copyright')[0].appendChild(div);
}

function createConfigurationDialog() {
    GM_addStyle(
        '#configcontainer { position:fixed; top:0; left:0; right:0; bottom:0; z-index:1000; }'+
        '#config { text-align: left; width:400px; padding:10px; margin:40px auto 0; ' +
        'background: none repeat scroll 0 0 #151515;' +
    	'border: 1px solid #444444; -moz-border-radius: 5px; ' +
        '}' +
        '#config input, #config select {float: right}' +
        '#config label { display:block }'
    );

    var div = document.createElement('div');
    div.id = 'configcontainer';
    div.innerHTML =
        '<div id="config">' +
	        '<h2 style="margin-bottom:10px;">&raquo; Configurar CPH tools</h2>' +
	        '<div style="font-size:12px;">' +
		        '<label>Cambiar logo por otro que se ve mejor<input id="cambiarLogo" type="checkbox"' + (GM_getValue('cambiarLogo', true) ? ' checked="checked" ' : '') + '></label>' +
		        '<label>Hacer espacio eliminando elementos que no se usan<input id="hacerEspacio" type="checkbox"' + (GM_getValue('hacerEspacio', true) ? ' checked="checked" ' : '') + '></label>' +
		        '<label>Agregar un link a los mensajes recientes arriba de todo<input id="linkAMensajesRecientes" type="checkbox"' + (GM_getValue('linkAMensajesRecientes', true) ? ' checked="checked" ' : '') + '></label>' +
		        '<label>Usar buscador<select id="buscador">' + 
		        	'<option' + (GM_getValue('buscador', 'DuckDuckGo') == 'SMF' ? ' selected="selected"' : '') + '>SMF</option>' +
		        	'<option' + (GM_getValue('buscador', 'DuckDuckGo') == 'DuckDuckGo' ? ' selected="selected"' : '') + '>DuckDuckGo</option>' +
		        	'<option' + (GM_getValue('buscador', 'DuckDuckGo') == 'Google' ? ' selected="selected"' : '') + '>Google</option>' +
		        '</select></label>' +
		        '<div class="clear"></div>' +
		        '<div style="text-align:center; margin-top=10px;"><input type="button" style="float:none;" onclick="document.location.reload();" value="Cerrar" /></div>'+
		    '</div>' +
        '</div>';
    document.getElementById('configurar').appendChild(div);
    
    addListener('cambiarLogo');
    addListener('hacerEspacio');
    addListener('linkAMensajesRecientes');
    addListener('buscador');
}

function addListener(id) {
    var element = document.getElementById(id);
    if (element.nodeName == 'SELECT') {
    	element.addEventListener('change', function(){GM_setValue(id, this.value);});
    } else if (element.nodeName == 'INPUT' && element.type == 'checkbox') {
    	element.addEventListener('click', function(){GM_setValue(id, this.checked);});    	
    } else {
    	console.log('Modificar addListener');
    }
}
