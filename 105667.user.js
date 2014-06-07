// ==UserScript==
// @name           IPB Thread Updater
// @author         ameboide
// @version        2011.07.05
// @namespace      http://userscripts.org/scripts/show/105667
// @description    shows new posts while reading a thread
// @include        http://*/index.php?showtopic=*
// ==/UserScript==

//configuraciones
	try{
		//fix para usar data persistente sin pseudogreasemonkey
		if (!GM_getValue || GM_getValue.toString().indexOf("not supported")>-1) {
			GM_getValue=function (key,def) {
				if(!localStorage || !localStorage.hasOwnProperty(key)) return def;
				var val = localStorage[key];
				return val !== undefined ? val : def;
			};
			GM_setValue=function (key,value) {
				if(!localStorage) return null;
				return localStorage[key]=value;
			};
		}
	}catch(e){}

	var conf = {
		notifAlert: GM_getValue('notifAlert', false),
		notifTip: GM_getValue('notifTip', true),
		activo: GM_getValue('activo', false),
		segs: GM_getValue('segs', 23),
		pregSegs: GM_getValue('pregSegs', false)
	};

//constantes
	var url = document.location.href.match(/^.+\?/)[0];
	var id = document.location.href.match(/showtopic=(\d+)/)[1];
	var st = document.location.href.match(/st=(\d+)/);
	st = st ? Number(st[1]) : 0;

	var subforo = document.querySelector('#navstrip a:last-of-type').href;

	var reNum = new RegExp('who_posted\\('+id+'\\);">(\\d+)');

	var selPosts = '.ipbtable[cellspacing="1"]';
	var contPosts = document.querySelector(selPosts).parentNode;

	var textoBotonActivo = 'Stop watching this thread for updates';
	var textoBotonInactivo = 'Watch this thread for updates';

	var activo = conf.activo;

//interfaz conf
	var divConf = document.createElement('div');
	var br = document.querySelector('#ipbwrapper>br');
	br.parentNode.insertBefore(divConf, br);

	var boton = document.createElement('button');
	boton.style.width = '400px';
	textoBoton();
	divConf.appendChild(boton);
	boton.addEventListener('click', function(){
		if(activo){
			activo = false;
			textoBoton();
		}
		else{
			var val = conf.pregSegs ? prompt('Interval between checks (in seconds)', conf.segs) : conf.segs;
			if(val === null) return;
			if(val>0) conf.segs = val;
			GM_setValue('segs', conf.segs);
			document.getElementById('TU_lbl_pregSegs').lastChild.textContent =
				'Change checking interval ('+conf.segs+' seconds)';

			activo = true;
			textoBoton();
			revisar();
		}
	}, true);

	checkbox('activo', 'Start turned on by default');
	checkbox('notifAlert', 'Alert on new posts');
	checkbox('notifTip', 'Show notification on new posts');
	checkbox('pregSegs', 'Change checking interval ('+conf.segs+' seconds)');

	function checkbox(nombre, texto){
		var cb = document.createElement('input');
		cb.type = 'checkbox';
		cb.checked = conf[nombre];
		var lbl = document.createElement('label');
		lbl.id = 'TU_lbl_'+nombre;
		lbl.appendChild(cb);
		lbl.appendChild(document.createTextNode(texto));
		cb.addEventListener('click', function(evt){
			var val = evt.target.checked == true;
			conf[nombre] = val;
			GM_setValue(nombre, val);
		}, true);

		divConf.appendChild(lbl);
	}

	function textoBoton(extra){
		boton.innerHTML = (activo ? textoBotonActivo : textoBotonInactivo) + (extra ? ' ' + extra : '');
	}

//inicializar notificador
	var divNotif = document.createElement('div');
	var spanNotif = document.createElement('span');
	var txtNotif = document.createElement('a');
	var xNotif = document.createElement('span');

	divNotif.style.display = 'none';
	divNotif.style.position = 'fixed';
	divNotif.style.textAlign = 'center';
	divNotif.style.top = '0px';
	divNotif.style.width = '100%';
	divNotif.style.padding = '23px';
	divNotif.style.fontSize = '23px';

	spanNotif.style.padding = '23px';

	xNotif.innerHTML = '[X]';
	xNotif.style.cursor = 'pointer';
	xNotif.addEventListener('click', function(evt){
		divNotif.style.display = 'none';
		evt.stopPropagation();
		return false;
	}, true);

	document.body.appendChild(divNotif);
	divNotif.appendChild(spanNotif);
	spanNotif.appendChild(txtNotif);
	spanNotif.appendChild(document.createTextNode(' '));
	spanNotif.appendChild(xNotif);
	var nots = 0;

	function notificar(num, id){
		if(conf.notifAlert) alert(num + ' new posts in ' + document.title);

		if(conf.notifTip){
			txtNotif.innerHTML = num + ' new posts';
			txtNotif.href = '#'+id;
			spanNotif.style.backgroundColor = '#ff0';
			divNotif.style.display = '';
			nots++;

			setTimeout(function(){
				spanNotif.style.backgroundColor = '#ffb';
			}, 500);
			setTimeout(function(){
				if(!--nots) divNotif.style.display = 'none';
			}, 6000);
		}
	}

//aca empieza el script de verdad...
	function revisar(){
		if(!activo) return;

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				try{
					if(xhr.status == 200){
						var ultimo = document.querySelectorAll(selPosts).length + st;
						var num = xhr.responseText.match(reNum);
						num = num ? Number(num[1])+1 : 0;
						if(num > ultimo) agregarNuevos(ultimo);
					}
					else{ //wtf?
					}
				}catch(e){}

				textoBoton();
				if(activo) setTimeout(revisar, conf.segs*1000);
			}
		}

		xhr.open('GET', subforo, true);
		xhr.send(null);

		textoBoton('(checking)');
	}

	function agregarNuevos(inicio){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				if(xhr.status == 200){
					var div = document.createElement('div');
					div.innerHTML = xhr.responseText;
					var posts = div.querySelectorAll(selPosts);
					for(var i=0; i<posts.length; i++) contPosts.appendChild(posts[i]);
					notificar(posts.length, posts[0].querySelector('a[name^=entry]').getAttribute('name'));
				}
				else{ //wtf?
				}
				textoBoton();
			}
		}

		xhr.open('GET', url + 'showtopic=' + id + '&st=' + inicio, true);
		xhr.send(null);

		textoBoton('(updating)');
	}

if(activo) revisar();