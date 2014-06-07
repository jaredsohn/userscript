// ==UserScript==
// @name        	IKFirmasIlegales
// @namespace   	http://www.userscripts.org
// @description 	Marcador de Firmas Ilegales.
// @version     	1.1
// @date        	2009-06-28
// @require		http://userscripts.org/scripts/source/57756.user.js
// @include     	http://board.ikariam.*
// Historial de cambios
// @history		1.1 06/11/10 -Change: Nuevo peso para las firmas.
// @history		1.0 16/02/10 -Add: Nuevo menú opciones.
// @history		1.0 -Add: Autoreport y autoaviso.
// @history		1.0 -Add: Variables de hilo y de peso. (por defecto: null y 35 Kb).
// @history		1.0 -Change: Orden del historial.
// @history        	0.8 10/02/10 -Add: Añadido nuevo sistema de comprobación "Script Updater", los créditos en los metatags.
// @history        	0.8 -Change: Cambio de nombre del script y del historial.
// @history        	0.8 -Change: Nueva captura de firmas, tomando únicamente firmas y no posts completos.
// @history        	0.7 06/02/10 -Change: Cambiado el peso máximo, para ikariam.pe
// @history        	0.7 -Change: Cambiadas las medidas, para ikariam.pe
// @history        	0.6 05/09/09 -Fix: Modificado el tag id que traía algunos problemas, aunque sigue fallando con ciertos dominios.
// @history        	0.6 -Fix: Ahora marca las firmas en los MP.
// @history        	0.5 18/08/09 -Fix: Arreglado el problema de cache de Mozilla que no ponía los bordes correspondientes a la imagen.
// ==/UserScript==

/*
*Comprobación de nuevas versiones.
*/
var version = Number(1.1);
ScriptUpdater.check(52535,version);

/*
*Primera vez, reenvío a las opciones del script.
*/

//Variable de primera corrida.
var firstTime = GM_getValue('firstTime',Boolean(false));
var loc = location.href.split('?');
if (!firstTime) {
	GM_setValue('on',Number(0));
	GM_setValue('firstTime',Boolean(true));
	//Reenvío a página de opciones e información.
	location.href = loc[0] + "?page=LoginLog&ikfi=1&first=true";
}

/*
*Opciones del script.
*/

var opts = top.location.search.split('&');
//¿Estoy en Extras?
if (loc[1].split('&')[0] == 'page=LoginLog') {
	//Creo botón y lo inserto.
	var menu = document.getElementsByClassName('subTabMenu');
	var contMenu = menu[0].getElementsByClassName('containerHead');
	var ul = contMenu[0].getElementsByTagName('ul');
	var temp = ul[0].cloneNode(true);
	var atemp = temp.getElementsByTagName('a')[0]
	var data = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNC'+
    'qoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI'+
    '/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh5'+
    '46EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW'+
    '9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWAN'+
    'yRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1'+
    'OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfD'+
    'aAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4'+
    'l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC';
	var icon = document.createElement('img');
	icon.src = data;
	atemp.innerHTML = '';
	atemp.appendChild(icon);
	atemp.innerHTML += ' <span>Opciones IKfi</span></a>';
	atemp.href= '/index.php?page=LoginLog&ikfi=1';
	ul[0].parentNode.appendChild(temp);
	if (opts[1] == 'ikfi=1') {
		if ((opts[2] != undefined) && (opts[2].split('=')[0] == 'link')) {
			//Se usó send.
			GM_setValue(0,unescape(opts[2].split('=')[1]));
			GM_setValue(1,Number(opts[3].split('=')[1]));
			GM_setValue('on',Number(opts[4].split('=')[1]));
		} 

		/*
		*Panel de Opciones.
		*/
		var tContMenu = document.getElementsByClassName('border tabMenuContent')[0];
		var title = tContMenu.getElementsByClassName('subHeadline')[0];
		title.innerHTML = '';
		title.appendChild(icon);
		title.innerHTML += " Opciones de IkFirmas Ilegales";
		var contMenu = tContMenu.getElementsByClassName('tabMenuContent')[0];
		var panel = document.createElement("div"), child;
		panel.className = "container-1";
		child = '<form method="GET"><fieldset><legend><label for="opcionesIKfi">Opciones Generales</label></legend>' +
		'<div class="formElement"><div class="formFieldLabel"><label for="Opciones Generales">' + 
		'<input type="hidden" name="page" value="LoginLog"/><input type="hidden" name="ikfi" value="1"/>' +
		'Link interno para Firmas Ilegales</label></div><div class="formField"><input type="text" class="inputText" ' + 
		'name="link" value="' + GM_getValue(0,'') + '" id="link" /></div><div class="formElement"><div class="formFieldLabel">' +
		'<label for="Peso Imagen">Peso máximo de la Imagen</label></div><div class="formField">' +
		'<input type="text" class="inputText" name="peso" value="' + GM_getValue(1,'') + '" id="peso" /></div>' +
		'<div class="formFieldLabel"><label for="Encendido">Encendido</label></div><div class="formField">' +
		'<input type="radio" class="radio" name="turn" value="1" id="turn"';
	 	if (GM_getValue('on',0) == 1) { 
			child += ' checked=yes ';
		}
		child += ' /> on <br>' +
		'<input type="radio" class="radio" name="turn" value="0" id="turn"';
		if (GM_getValue('on',0) == 0) { 
			child += ' checked=yes ';
		}
		child += ' /> off <br>' +
		'</div></div></fieldset><div class="formSubmit"><input type="submit" accesskey="s" value="Enviar" />' +
		'<input type="reset" accesskey="r" value="Reset" /></div>';
		panel.innerHTML = child;
		contMenu.innerHTML = '';
		contMenu.appendChild(panel);
		if ((!GM_getValue(0)) || (!GM_getValue(1))) {
			var flecha = 'data:image/gif;base64,'+
    'R0lGODlhLAEsAfEDAP///wCAAAAAAMDAwCH5BAkoAAMAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAA'+
    'LAEsAQAC/pyPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqX'+
    'zKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoOEhYaHiImKi4'+
    'yNjo+AgZKTlJWWl5iZmpucnZ6fkJGio6SlpqeoqaqrrK2ur6ChsrO0tba3uLm6u7y9vr+wscLDxM'+
    'XGx8jJysvMzc7PwMHS09TV1tfY2drb3N3e39DR4uPk5ebn6Onq6+zt7u/g4fL38KMN9TX2/Pgz8g'+
    'oJ+DD4AAf/9qAAg4kGDBGPwOJvQXYEDEhS4QPpxIscXB/o0PB/ZTmBEFv44XQ6Y4OMAhyYETMZok'+
    'gXJlx5cmUAqUmbAfzRE2ceYEubODzZs+PboMmiFfzKIsgSJNio/pT4lPoUaVmvNoVQk2P2JtuhXD'+
    '0q8enYZ90JPsTK1nF6RVy1JnWwdD4c6c20BpPakBilLFq+CtzwB9Zf4FjGBjSr6Efbo9kC8l5MkG'+
    'IlumLLky5suaO2f+zBn05tGeQ5smHagrVsKNDSfWWxl2StkoZ8e+bTt37d20e+Pm/du3buHAh2uO'+
    '7GdsUdatVyY2Dr24dOLUg1uPXh379em3lSa/ypR5c5KTs3PXjv68evPst5vPzUfwYPGF7dq/jz+/'+
    'fv16/uqGpz/efgIOSGCBZOURkFfzAVifgQ4+CKGAEbHlRkOMMdhghBpuyCFOcs0REFELYthhiSaa'+
    'eFiFCV6IYYYnvgijfhS2odyILcaIY474pciGfDi1KJ6OQg7pl1lq+CgTkEESyWSTZak422pKTkll'+
    'lVZeiWWWWmL5o5FmrPjflmKOSWaZZorpIURrWBjmmW6+CWecXDq25mwi/ihnnnruKadjM4IxlIJ4'+
    '8klooYZa+WOPe7F4aKOOOrocGkiu9GillhZK5xmTknRpp57C6ZgAf2rhX5ufnorqnJR+aRujqb4K'+
    '642ZhsHmcrHeiit9afLIRa025gosrH4CauedSQaL/mysXdIqmbGUJgttqrt6oZeU0V7rqV+jUrGo'+
    'qdh+C2mSH/Yq6KDgntvorF5Yi267mA77BbvuztunuF5mIS+9+po5LRgR5btvwFrC62+5xwqMcJaD'+
    'leHiwQk/POWu21pBEMAQX8xcqGT0ZfCzGH+ccZL3dvGvxSAj3K8ZDTt88sPamlGxyS3TSzDD/nw1'+
    's8viriEqzjkL/PIaK3P6874aq8Hx0B0VrW/KatwsM9PQ1syG0hdJje6yb8TsKpBOfi2kThOP0XPU'+
    'S4KNNoy8Im0AWVWmDbeJHNNh9dVKxo33huNuLbbZdecN+I5jwyyR2YEfXuDeb0wEtbdnIw45foM/'+
    '/t0x0QxGjvl9isOB0d8sAZh56HDpwbXjop++nJp5cOxzyJT23FfssM8ue+2032577rjvrnvvvP/u'+
    'e/DA97w5Ho2bqnHFbS8vl/LNM+989NBP/3z10ltP/fXaZ8899qr3EeCITFHlPOMGmP8XQeivzzz7'+
    'crmvfvvyvz9//PTfb3/+58tv/x8Kec4aD/0LMQgoi5SORkAETGg16kqgAvJTGAcm4Gae85AEG1BB'+
    'ThUvgYy7z4QuOMHz2WWDIITI6EbGQZ2oZW4gxGDhsCK2FkLgQDJsAAVhOLkL1i2HEmwJX2r4APX5'+
    'BYgRMGGaeHjB45WEiBMwInmYKAEn/gSJPTzAk/FYCEUI/Ks5WbwABUnYxQKKcG1htGEZz4jGNKpx'+
    'jWxsoxvfCMc4ynGOdKyjHe+IxzzqcY987KMf/wjIQApykIQspCEPichEKnKRjGykIx8JyUhKcpKU'+
    'rKQlL4nJTGpyk5zspCc/CcpQinKUpCylKU+JylSqcpWsbKUrXwnLWMpylrSspS1victc6nKXvOyl'+
    'L0lRAAAh+QQJKAACACwAAAAALAEsAYMAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAE/lDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqP'+
    'yKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaH'+
    'iImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/A'+
    'wcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5'+
    '+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePriBDihxJsqTJkyhTqlzJ'+
    'sqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavX'+
    'r2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5Aj'+
    'S55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt21QjAAA7';
			var icon2 = document.createElement('img');
			icon2.id = 'flecha';
			icon2.src = flecha;
			icon2.height = 25;
			icon2.width = 25;
			ul[1].appendChild(icon2);
		}
		if (opts[2] == 'first=true') {
			//función de cierre
			unsafeWindow.cerrarVentana = function() {
				location.href= location.href.split('&first=true')[0];
			}
			//función showLink
			unsafeWindow.showLink = function() {
				document.getElementById('closeL').style.visibility = "visible";
			}
			nodoFirst = document.createElement("div");
			nodoFirst.setAttribute("id", "first");
			document.getElementsByTagName("body")[0].appendChild(nodoFirst);
			//Styles.
			GM_addStyle("#first { background: #DEA959; position:fixed; width:510px; left:250px; height:400px; top:100px; z-index: 50; border:1px black solid;}");
			GM_addStyle("#fhead { background: #DEA959; height:30px; width:510px; position:absolute; left:0px; top:0px; line-height:38px; font-weight:bold; font-size:11px;} ");
			GM_addStyle("#ffoot { background: #DEA959; width:510px; height:3px; position:absolute; bottom:0px; left:0px;}");
			GM_addStyle("#firstText { text-align: left; position: absolute; top:30px; left:30px; right:30px; bottom:30px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
			//Fin Styles.
			var myHTML = '<div id="fhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/scripts/show/52535">Ikariam Firmas Ilegales v' + version + '</a></div>';
			myHTML += '<div id="firstText">Gracias por instalar Ikariam Firmas Ilegales. <br><br>' +
			'El script está desactivado por defecto (off) hasta que añadas el link al hilo de firmas ilegales en las opciones, y lo actives (on), pero siempre podrás acceder ' +
			'a las opciones en los extras de tu perfil (donde indica la flecha verde).<br><br>' + 
			'IMPORTANTE: Para el correcto funcionamiento del script, es necesario esperar dos alerts (ventanas de atención) al reportar una firma. Sino, el script fallará.<br>' +
			'El script añade un botón llamado FirmaIlegal con el cual se puede reportar una firma.<br>' + 
			'Al hacer click en el mismo, se envía un mp al usuario infractor y se postea en el hilo de firmas ilegales. Con dos alerts, somos avisados de ello.<br>' +
			'El script remarca con:<br> Rojo: las firmas excededidas en ancho/alto. <br>Amarillo: las que exceden peso. <br>Cyan: las que exceden ambas.<br>' + 
			'<br><br>Lea el contenido de la ayuda, en 20 segundos podrá cerrar esta ventana.<br>' +
			'<div style="visibility: hidden;" id="closeL">He leído todo el contenido. <a href="#" onClick="cerrarVentana()">Cerrar Ventana</a>.</div>' + 
			'</div>';
			myHTML += '<div id="ffoot"></div>';
			document.getElementById("first").innerHTML = myHTML;
			setTimeout("showLink()",20000);

		}
	}
}

//Apagado del Script.
if (GM_getValue('on') == 0) {
return
}


/*
* Obtención de variables
*/
var check = 0;
var arrLang = new Array(2);
arrLang[0] = 'Escriba el hilo de reporte de firmas';
arrLang[1] = 'Escriba el peso máximo de la firma (en KB).';
for (i = 0; i< arrLang.length; i++){
	if ((!GM_getValue(i)) || (GM_getValue(i) == '')) {
		check += setVar(i,prompt(arrLang[i],''))
	}
	else {
		check++;
	}
}
if (check < arrLang.length) {
	//Apago el script.
	GM_setValue('on',0);
	//Aviso al usuario de ello.
	alert('Completa todos los campos necesarios para el funcionamiento del script.\n Script apagado.\n Podrás encenderlo desde: Mi Perfil -> Extras -> Opciones IKfi')
	//Redirecciono
	return location.href = 'http://' + location.host + '/index.php?page=LoginLog&ikfi=1';
}

/*
* Funciones.
*/

function makeReport () {
	function sendMP (MP,user) {
		var url = 'http://' + location.host + '/index.php?form=PMNew';
        	http = new XMLHttpRequest();
	        http.open("GET",url,true);
	        http.setRequestHeader('Host',location.host);
	        http.setRequestHeader('User-agent','Mozilla/4.0 (compatible) Greasemonkey');
        	http.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml,text/html');
	        http.onreadystatechange = function() {
        	        if (this.readyState == 4) {
                	    if (this.status == 200) {
                        	var resp = this.responseText;
	                        idHash = resp.split('idHash" value="',-1);
        	                idHash= idHash[1].split('" />',1);
                	        session = resp.split('"s" value="',-1);
                        	session = session[1].split('" />',1);
	                        makePost(idHash,session,user);  
        	            }
                	}
	        }
        	http.send('');  
	        function makePost (idHash,session,user) {
			//var url = 'http://' + location.host + '/index.php?form=PMNew';
	        	var boundary = (new Date).getTime();
        		var sep = String("---------------------------");
	        	var sep2 = String("--");
        		var post = sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="recipients"\n\n';
	        	post += user;
	        	post += '\n' + sep + sep2 + boundary + '\n';      
	        	post += 'Content-Disposition: form-data; name="blindCopies"\n\n';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="subject"\n\n';
	        	post += 'Firma Ilegal';
	        	post += '\n' + sep + sep2 + boundary + '\n';        
	        	post += 'Content-Disposition: form-data; name="text"\n\n';
	        	post += MP;
		        post += '\n' + sep + sep2 + boundary + '\n';        
		        post += 'Content-Disposition: form-data; name="mce_editor_0_fontNameSelect"\n\n';
		        post += '\n' + sep + sep2 + boundary + '\n';
			post += 'Content-Disposition: form-data; name="mce_editor_0_fontSizeSelect"\n\n';
		        post += '0';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="wysiwygEditorHeight"\n\n';
		        post += '241';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="wysiwygEditorMode"\n\n';
		        post += '1';
        		post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="parseURL"\n\n';
		        post += '1';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="enableSmilies"\n\n';
		        post += '1';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="enableBBCodes"\n\n';
		        post += '1';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="showSignature"\n\n';
		        post += '1';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="upload[]"; filename=""\n';
		        post += 'Content-Type: application/octet-stream\n\n';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="activeTab"\n\n';
		        post += 'smiles';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="send"\n\n';
		        post += 'Enviar';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="pmID"\n\n';
		        post += '0';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="forwarding"\n\n';
		        post += '0';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="reply"\n\n';
        		post += '0';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="replyToAll"\n\n';
		        post += '0';
        		if (session != 'Enviar') {
			        post += '\n' + sep + sep2 + boundary + '\n';
			        post += 'Content-Disposition: form-data; name="s"\n\n';
			        post += session;
		        }
        		post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="idHash"\n\n';
		        post += idHash;
		        post += '\n' + sep + sep2 + boundary + sep2;
	        	var http = new XMLHttpRequest();
		        http.open("POST",url,true);
		        http.setRequestHeader('Host',location.host);
	        	http.setRequestHeader('User-agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 (.NET CLR 3.5.30729)');
		        http.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
		        http.setRequestHeader('Accept-Language','es,es-es;q=0.8,en-us;q=0.5,en;q=0.3');
	        	http.setRequestHeader('Accept-Encoding','gzip,deflate');
	        	http.setRequestHeader('Accept-Charset','ISO-8859-1,utf-8;q=0.7,*;q=0.7'); 
		        http.setRequestHeader('Keep-Alive','300');
        		http.setRequestHeader('Connection','keep-alive');
		        http.setRequestHeader('Cookie',document.cookie);
        		http.setRequestHeader('Content-type', 'multipart/form-data; boundary=' + sep + boundary);
	        	http.setRequestHeader('Content-length', post.length);
	        	http.send(post);
		        http.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 302) {
        	                		alert('Mp Enviado');
			                }
        			        if (this.status != 200) {
                				alert("AddPost GMScript: Error " + this.status + " cargando " + url);
					}
	                	else {
        	                	alert('Mp Enviado');
	        	        	}
        	        	}
        		}    
	       }
	}
	function addPost (MP,postit,rUri) {
    		var url = "http://" + location.host + "/index.php?form=PostAdd&threadID=" + rUri;
		http = new XMLHttpRequest();
		http.open("GET",url,true);
		http.setRequestHeader('Host',location.host);
		http.setRequestHeader('User-agent','Mozilla/4.0 (compatible) Greasemonkey');
		http.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml,text/html');
		http.onreadystatechange = function() {
	                if (this.readyState == 4) {
        	            if (this.status == 200) {
                	        var resp = this.responseText;
                        	idHash = resp.split('idHash" value="',-1);
	                        idHash= idHash[1].split('" />',1);
        	                session = resp.split('"s" value="',-1);
                	        session = session[1].split('" />',1);
                        	makePost(idHash,session);  
	                    }
        	        }
        	}
		http.send('');  
		function makePost(idHash,session) {
			var boundary = (new Date).getTime();
			var sep = String("---------------------------");
		        var sep2 = String("--");
		        var post = sep + boundary + '\n';
     	   		post += 'Content-Disposition: form-data; name="subject"\n\n';
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="text"\n\n';
		        post += postit;
	       	 	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="mce_editor_0_fontNameSelect"\n\n';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="mce_editor_0_fontSizeSelect"\n\n';
	        	post += '0';
		        post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="wysiwygEditorHeight"\n\n';
		        post += '241';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="wysiwygEditorMode"\n\n';
	        	post += '1';
		        post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="parseURL"\n\n';
		        post += '1';
        		post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="enableSmilies"\n\n';
	        	post += '1';
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="enableBBCodes"\n\n';
		        post += '1';
        		post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="showSignature"\n\n';
	        	post += '1';
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="subscription"\n\n';
		        post += '1';
        		post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="upload[]"; filename=""\n';
		       	post += 'Content-Type: application/octet-stream\n\n';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="pollQuestion"\n\n';
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="pollOptions"\n\n';
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="endTimeDay"\n\n';
	        	post += '0';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="endTimeMonth"\n\n';
        		post += '0';
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="endTimeYear"\n\n';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="endTimeHour"\n\n';
		        post += '0';
        		post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="endTimeMinutes"\n\n';
		        post += '0';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="choiceCount"\n\n';
		        post += '1';
        		post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="activeTab"\n\n';
        		post += 'smilies';
	        	post += '\n' + sep + sep2 + boundary + '\n';
	        	post += 'Content-Disposition: form-data; name="send"\n\n';
		        post += 'Enviar';
	        	post += '\n' + sep + sep2 + boundary + '\n';
		        post += 'Content-Disposition: form-data; name="postID"\n\n';
        		post += '0';
		        if (session != 'Enviar') {  
        			post += '\n' + sep + sep2 + boundary + '\n';
			        post += 'Content-Disposition: form-data; name="s"\n\n';
			        post += session;
	        	}
		        post += '\n' + sep + sep2 + boundary + '\n';
        		post += 'Content-Disposition: form-data; name="idHash"\n\n';
	        	post += idHash;
	        	post += '\n' + sep + sep2 + boundary + sep2;
		        var http = new XMLHttpRequest();
        		http.open("POST",url,true);
		        http.setRequestHeader('Host',location.host);
        		http.setRequestHeader('User-agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 (.NET CLR 3.5.30729)');
	        	http.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
	        	http.setRequestHeader('Accept-Language','es,es-es;q=0.8,en-us;q=0.5,en;q=0.3');
		        http.setRequestHeader('Accept-Encoding','gzip,deflate');
        		http.setRequestHeader('Accept-Charset','ISO-8859-1,utf-8;q=0.7,*;q=0.7'); 
		        http.setRequestHeader('Keep-Alive','300');
        		http.setRequestHeader('Connection','keep-alive');
	        	http.setRequestHeader('Cookie',document.cookie);
	        	http.setRequestHeader('Content-type', 'multipart/form-data; boundary=' + sep + boundary);
		        http.setRequestHeader('Content-length', post.length);
        		http.send(post);
		        http.onreadystatechange = function() {
        		        if (this.readyState == 4) {
	        	            if (this.status == 302) {
	        	                alert('El post ha sido exitoso');
		                    }
        		            if (this.status != 200) {
                		        alert("AddPost GMScript: Error " + this.status + " cargando " + url);
					}
	        	            else {
		                        alert('Post Publicado');
        	            		}
                		}
	        	}    
    		}
	}
	function sendMPAndPost (i,link,rUri) {
		//regex de usuario e ID
		var regex3 = '.*page=User&amp;userID=(.*)" title="Ver perfil de  »(.*)«".*'; 
		//usuarios
		var posters = document.getElementsByClassName('messageInner messageLeft dividers'); 
		//panel izquierdo
		var panel = posters[i].childNodes[3]; 
		var user = panel.getElementsByClassName('userName')[0].innerHTML.match(regex3)[2];
		var motivo = prompt("¿Por qué motivo reportas la firma de " + user + "?\nEl motivo que ingreses abajo será enviado al MP del usuario.\nPara no reportar la firma, haz click en cancelar","Sobrepasa las medidas máximas: 500px. x 150px. Peso: 40 KB's"); 
		if (motivo) {
			//usuario
			var yo = document.getElementById('userNote').innerHTML.match('.*Registrado como  <a href=".*">(.*)</a>.*')[1];
			//panel derecho e inferior
		    	var panel2 = posters[i].childNodes[5]; 
		    	//regex de imágenes
		    	var regex2 = '.*<img( style="border: 15px solid (yellow|red|cyan);")? src="(.*)\?ikfi=.*" class="resizeImage".*';
		    	var sign = panel2.getElementsByClassName('signature')[0].innerHTML.match(regex2)[3];
	    		sign = sign.replace("\?","");
		    	var userID = panel.getElementsByClassName('userName')[0].innerHTML.match(regex3)[1];
		    	var MP = 'Hola, ' + user + '. Este MP es para notificarte de que tu firma es ilegal.\n';
    			MP += 'Motivo: ' + motivo + '\n';
		    	MP += 'Tienes 24 horas para modificarla antes de que lo haga un miembro del team.\n';
    			MP += 'Gracias.\n';
	    		MP += 'Atte. ' + yo + '.';
	    		var postit = '[u]User[/u]: [url=http://' + location.host + '/index.php?page=User&userID=' + userID + ']' + user + '[/url]\n';
		    	postit += '[u]Motivo[/u]: ' + motivo + '.\n';
    			postit += '[u]Link[/u]: http://' + location.host + '/index.php?page=Thread&postID=' + link + '#post' + link + '\n';
		    	postit += '[u]MP[/u]:\n';
    			postit += '[quote]' + MP + '[/quote]\n\n';
	    		postit += '[u]Firma[/u]: [img]' + sign + '[/img]\n';
	    		postit += '\nReportado mediante [url=http://' + location.host + '/index.php?page=Thread&threadID=22228]IKFirmasIlegales v 1.0[/url] ©CopyRight by [url=http://board.ikariam.pe/index.php?form=PMNew&userID=8293]HuMoR[/url].';
		    	sendMP(MP,user);
    			addPost(MP,postit,rUri);
		}
	}

	//Escribo las funciones
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = sendMPAndPost;
	document.body.appendChild(script);
	//Fin escritura de una función
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = addPost;
	document.body.appendChild(script);
	//Fin escritura de una función
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = sendMP;
	document.body.appendChild(script);
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.innerHTML = 'var rUri =' + String(GM_getValue(0));
	document.body.appendChild(script);
	//Fin funciones.

	//usuarios
	var posters = document.getElementsByClassName('messageInner messageLeft dividers');
	//regex del # post
	var regex = '.*page=Thread&amp;postID=(.*)#post.*'; 
	//cantidad
	var n = posters.length; 
	var regexUri = ".*(thread|post)ID=(.*)(#.*)?";
	var rUri = GM_getValue(0).match(regexUri)[2];
	//recorro todos los usuarios y para cada uno...
	for (i = 0; i < n; i++) { 
	    	//panel derecho e inferior
	    	var panel2 = posters[i].childNodes[5]; 
	    	//Link al post
	    	var link = panel2.getElementsByClassName('messageCount')[0].innerHTML.match(regex)[1];
	    	var list = panel2.getElementsByClassName('smallButtons')[0].getElementsByTagName('ul')[0];
	    	var nuevo = document.createElement('li');
	    	nuevo.innerHTML = '<a href="#post' + link + '" onClick="sendMPAndPost(' + i + ',' + link + ',' + rUri + ');"><img src="icon/postReportS.png" alt="Reportar Firma Ilegal" /> <span>Firma Ilegal</span></a>';
	    	list.appendChild(nuevo, list.firstChild);
	}
}

function setVar(varnombre, varvalor) {
	if ((varvalor == null) || (varvalor == '')) {
		GM_setValue(varnombre, '');
		return 0
	}
	else {
		GM_setValue(varnombre, varvalor);
		return 1
	}
}


function getSizeImg(objectIMG) {
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://compactador.com.ar/FIsizeIMG.php?url=' + objectIMG.src,
    headers: {
        'User-agent': 'GreaseMonkey',
        'Accept': 'text/html',
    },
    onreadystatechange: function(resDet) {
	if (resDet.readyState == 4) {
		kb = resDet.responseText;
		wh = objectIMG.width;
		ht = objectIMG.height;
		var med,pes;
		al = new Date();
		al = al.getTime();
		if ((wh > 500) || (ht > 150)) {
			med = 1;
		}
		if (kb > GM_getValue(1)) {
			pes = 1;	
		}		
		if ((med) && (pes)) {
			objectIMG.style.border = '15px solid cyan';
			objectIMG.src = objectIMG.src + "?ikfi=" + al + ".jpg";
		}
		else if (med) {
			objectIMG.style.border = '15px solid red';
			objectIMG.src = objectIMG.src + "?ikfi=" + al + ".jpg";
			}
			else if (pes) {
				objectIMG.style.border = '15px solid yellow';
				objectIMG.src = objectIMG.src + "?ikfi=" + al + ".jpg";
				}
	}
}
});

}

function checkSig() {
	c = document.evaluate('//div[@class="signature"]//img',document,null,6,null);
	for (var i = 0; i < c.snapshotLength; i++) {
		img = c.snapshotItem(i);
		path = img.src;
		board = path.substr(0, 21)
		if ((board != "http://board.ikariam.") && (board != "http://nw.gameforge.d")) {
			getSizeImg(img);
		}
	}
}

var loc = document.location.href;
var pattern = '.*page=(.*)&(thread|post|pm)ID.*';
var matches = loc.match(pattern);
if (matches) {
	if ((matches[1] == 'Thread') || (matches[1] == 'PMView')) {
		checkSig();
		makeReport()
	}
}
