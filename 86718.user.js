// ==UserScript==
// @name           Transit Redesign Ogame Calculator Modified
// @namespace      benneb_mod
// @include        http://*.ogame.*/game/index.php?page=overview*
// ==/UserScript==
//alert(screen.width);
	var url = location.href;
	var server = url.match(/[a-z0-9]{4,10}\.ogame\.[a-z]{2,4}/gi);
	var text = new Array();
	
	text = 
		{
			attaque : 'Attacks',
			transport : 'Transport ',
			calculer : 'Caculate transit',
			metal : 'metal',
			cristal : 'cristal',
			deut : 'deut',
			total : 'Total',
			deplacer : 'lets move TROC',
			detail : 'Pour avoir un calcul par type de deplacement',
			compter : 'To count the resources of the selected colony',
			afficher : 'To always display the result (slower)',
			chargement : 'Shipment:</th>'
		};
		
	if(navigator.language == 'fr')
	{
		text = 
		{
			attaque : 'Attaques',
			transport : 'Transports',
			calculer : 'Calculer le transit',
			metal : 'metal',
			cristal : 'cristal',
			deut : 'deut',
			total : 'Total',
			deplacer : 'Permet de déplacer TROC',
			detail : 'Pour avoir un calcul par type de deplacement',
			compter : 'Pour compter les ressources de la colonie selectionnée',
			afficher : 'Pour toujours afficher le resultat (ralentissement)',
			chargement : 'Chargement:</th>'
		};
	}
	if(navigator.language == 'sp')
	{
		text = 
		{
			attaque : 'Attacks',
			transport : 'Transport ',
			calculer : 'Recargar Recursos',
			metal : 'Metal',
			cristal : 'Cristal',
			deut : 'Deuterio',
			total : 'Total',
			deplacer : 'Mover TROC',
			detail : 'Pour avoir un calcul par type de deplacement',
			compter : 'Sumar recursos de la colonia seleccionada',
			afficher : 'Mostrar siempre el resultado (mas lento)',
			chargement : 'Carga:</th>'
		};
	}
	if(navigator.language == 'de')
	{
		text =
		{
			attaque : 'Attacks',
			transport : 'Transport ',
			calculer : 'Transit neu berechnen',
			metal : 'Metall',
			cristal : 'Kristal',
			deut : 'Deut',
			total : 'Total',
			deplacer : 'TROC verschieben',
			detail : 'Pour avoir un calcul par type de deplacement',
			compter : 'Ress der aktuellen Kolonie zaehlen',
			afficher : 'Ergebnis immer anzeigen (langsamer)',
			chargement : 'Ladung:</th>'
		};
	}
		
	var maDiv = document.createElement("div");
	
	var styles = new Array();
	styles = {	links : "",	rechts : "position:relative",	myPlanets : "position:absolute; right:120px;  top:150px",	info : "position:absolute; left:-140px;	top:150px" };
	var paren = "info";
	var pos_s = "g2";
	var pos = GM_getValue("pos_"+server);
	if( typeof(pos) == 'undefined')
	{
		pos = "g2";
		GM_setValue("pos_"+server, "g2");
	}
	else
	{
		switch(pos) 
		{
			case ("g1"): paren = "info"; maDiv.setAttribute("style", styles.info); break;
			case ("g2"): paren = "links"; maDiv.setAttribute("style", styles.links); break;
			case ("d1"): paren = "rechts"; maDiv.setAttribute("style", styles.rechts); break;
			case ("d2"): paren = "myPlanets"; maDiv.setAttribute("style", styles.myPlanets); break;
		}
	}
	var rpl = GM_getValue("rpl_"+server);
	if( typeof(rpl) == 'undefined')
	{
		rpl = false;
		GM_setValue("rpl_"+server, false);
	}
	var detail = GM_getValue("detail_"+server);
	if( typeof(detail) == 'undefined')
	{
		detail = false;
		GM_setValue("detail_"+server, false);
	}
	var reload = GM_getValue("reload_"+server);
	if( typeof(reload) == 'undefined')
	{
		reload = false;
		GM_setValue("reload_"+server, false);
	}
	var inner =
	"<table cellspacing='10px' cellpadding='5px'  style='border: 1px solid yellow; color:limegreen;text-align:right; font-size:8pt'>"+
	
	"<tr><td title='Transit Redesign Ogame Calculator'><img title='"+text.calculer+"' style='vertical-align:middle;' src='img/icons/refresh.gif' id='refresh' /></td><td>";
	if(detail)
	{
		inner += text.attaque;
	}
	else
	{
		inner += "TROC";
	}
	inner += "</td></tr>"+
	"<tr><td>m</td><td id='metalA'>0</td></tr>"+
	"<tr><td>c</td><td id='cristalA'>0</td></tr>"+
	"<tr><td>d</td><td id='deutA'>0</td></tr>"+
	"<tr><td>"+text.total+"</td><td id='totalA'>0</td></tr>";
	if(detail)
	{
	inner += "<tr><td></td><td>"+text.transport+"</td></tr>"+
		"<tr><td>m</td><td id='metalT'>0</td></tr>"+
		"<tr><td>c</td><td id='cristalT'>0</td></tr>"+
		"<tr><td>d</td><td id='deutT'>0</td></tr>"+
		"<tr><td>"+text.total+"</td><td id='totalT'>0</td></tr>";
	}
	inner += "<tr><td><img width='25px' height='20px' title='"+text.deplacer+"'  id='move' src='img/navigation/navi_ikon_overview_c.gif' /></td><td>"+
	"<img width='15px' height='15px' title='"+text.compter+"' id='rpl' src='";
	if(rpl)
		inner += "img/layout/check.gif";
	else
		inner += "img/layout/none.gif";
	
	inner += "' />"+
	"<img width='15px' height='15px' title='"+text.detail+"' id='detail' src='";
	if(detail)
		inner += "img/layout/check.gif";
	else
		inner += "img/layout/none.gif";
	
	inner += "' />"+
	"<img width='15px' height='15px' title='"+text.afficher+"' id='reload' src='";
	if(reload)
		inner += "img/layout/check.gif";
	else
		inner += "img/layout/none.gif";
	
	inner += "' /></td></table>"; 
	maDiv.innerHTML = inner;	
	box = document.getElementById(paren);
	box.appendChild(maDiv); 
	function move(){
		
		var box = "";
		var posEnCour = GM_getValue("pos_"+server);
		if(screen.width > 1280)
		{
			switch(posEnCour) 
			{
				case ("g1"): pos_s = "g2"; paren = "links"; maDiv.setAttribute("style", styles.links); break;
				case ("g2"): pos_s = "d1"; paren = "rechts"; maDiv.setAttribute("style", styles.rechts);  break;
				case ("d1"): pos_s = "d2"; paren = "myPlanets"; maDiv.setAttribute("style", styles.myPlanets); break;
				case ("d2"): pos_s = "g1"; paren = "info"; maDiv.setAttribute("style", styles.info);  break;
			}
		}
		else
		{
			switch(posEnCour) 
			{
				case ("g2"): pos_s = "d1"; paren = "rechts"; maDiv.setAttribute("style", styles.rechts);  break;
				case ("d1"): pos_s = "g2"; paren = "links"; maDiv.setAttribute("style", styles.links); break;
			}
		
		}
		GM_setValue("pos_"+server, pos_s);
		box = document.getElementById(paren);
		box.appendChild(maDiv); 
	}
	
	document.getElementById("refresh").addEventListener("click", test, true);
	document.getElementById("move").addEventListener("click", move, true); 
	
	function bind(id,bool)
	{
		var id_ = document.getElementById(id);
		id_.addEventListener("click", 
		function(event){
			if(bool){
				id_.setAttribute("src","img/layout/none.gif");
			}
			else{
				id_.setAttribute("src","img/layout/check.gif");
			}
			GM_setValue(id+"_"+server, !bool);
			bind(id,!bool);
		}, true);
	}
	bind("rpl",rpl);
	bind("reload",reload);
	bind("detail",detail);
	
	function format(x) {
		if (x==0) {return x;} else {
			var str = x.toString(), n = str.length;

			if (n <4) {return x;} else {
				return ((n % 3) ? str.substr(0, n % 3) + ' ' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join(' ');
			}
		}
	}
	function calcul(r,elem)
	{
		return format(parseInt(replaceA(r.textContent,' ')) + parseInt(replaceA(elem.innerHTML,'.')));
	}
	function replaceA(elem, car)
	{
		return elem.replace(car,'').replace(car,'').replace(car,'');
	}
	var mA = document.getElementById('metalA');
	var cA = document.getElementById('cristalA');
	var dA = document.getElementById('deutA');
	var tA = document.getElementById('totalA');
	
	var mT = document.getElementById('metalT');
	var cT = document.getElementById('cristalT');
	var dT = document.getElementById('deutT');
	var tT = document.getElementById('totalT');
	
	function aaaaa(id, session, mission)
	{
		var xhr= new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					var contenu = xhr.responseText;
					contenu = contenu.split(text.chargement);
					if( contenu[1] != null ){
						contenu = contenu[1].substr(10,contenu[1].length);
						var doc = document.implementation.createDocument ('http://www.w3.org/1999/xhtml', 'html',  null);
						doc.documentElement.innerHTML = '<body><table>'+contenu+'</body>';
						var elem = doc.getElementsByClassName('value');
						if(detail)
						{
							if(mission == "icon-angriff" || mission == "icon-tf-abbauen")
							{
								mA.textContent = calcul( mA, elem[0] );
								cA.textContent = calcul( cA, elem[1] );
								dA.textContent = calcul( dA, elem[2] );
								tA.textContent = format(parseInt(replaceA(mA.textContent," ")) + parseInt(replaceA(cA.textContent," ")) + parseInt(replaceA(dA.textContent," ")));
							}
							else
							{
								mT.textContent = calcul( mT, elem[0] );
								cT.textContent = calcul( cT, elem[1] );
								dT.textContent = calcul( dT, elem[2] );
								tT.textContent = format(parseInt(replaceA(mT.textContent," ")) + parseInt(replaceA(cT.textContent," ")) + parseInt(replaceA(dT.textContent," ")));
							}
						}
						else
						{
								mA.textContent = calcul( mA, elem[0] );
								cA.textContent = calcul( cA, elem[1] );
								dA.textContent = calcul( dA, elem[2] );
								tA.textContent = format(parseInt(replaceA(mA.textContent," ")) + parseInt(replaceA(cA.textContent," ")) + parseInt(replaceA(dA.textContent," ")));
						}
					}
				} 
			} 
		}; 
		xhr.open('GET','index.php?page=eventListTooltip&session='+session+'=1&eventID='+id, true);                
		xhr.send(null); 
	}
	
	function test()
	{
		var myf = document.getElementById('iframeEventBox');
		myf = myf.contentWindow.document || myf.contentDocument;
		var elem = myf.getElementsByClassName('tipsTitleArrowClose');
		if(detail)
		{
			if(rpl)
			{
				mT.textContent = format(parseInt(replaceA(document.getElementById('resources_metal').textContent,'.')));
				cT.textContent = format(parseInt(replaceA(document.getElementById('resources_crystal').textContent,'.')));
				dT.textContent = format(parseInt(replaceA(document.getElementById('resources_deuterium').textContent,'.')));
				tT.textContent = format(parseInt(replaceA(mT.textContent," ")) + parseInt(replaceA(cT.textContent," ")) + parseInt(replaceA(dT.textContent," ")));
			}
			else
			{
				mT.textContent = cT.textContent = dT.textContent = tT.textContent = '0';
			}
			mA.textContent = cA.textContent = dA.textContent = tA.textContent = '0';
		}
		else
		{
			if(rpl)
			{
				mA.textContent = format(parseInt(replaceA(document.getElementById('resources_metal').textContent,'.')));
				cA.textContent = format(parseInt(replaceA(document.getElementById('resources_crystal').textContent,'.')));
				dA.textContent = format(parseInt(replaceA(document.getElementById('resources_deuterium').textContent,'.')));
				tA.textContent = format(parseInt(replaceA(mA.textContent," ")) + parseInt(replaceA(cA.textContent," ")) + parseInt(replaceA(dA.textContent," ")));
			}
			else
			{
				mA.textContent = cA.textContent = dA.textContent = tA.textContent = '0';
			}
		}
		//self
		var elem3=myf.getElementById('eventContent');
		var elem2=elem3.getElementsByTagName('td');
		var rich=new Array();
		var rich2=new Array();
		for(var i=0;i<elem2.length;i++){
			if(elem2[i].getAttribute('class')=='icon_movement')rich.push('true');
			else if(elem2[i].getAttribute('class')=='icon_movement_reserve') rich.push('false');
		}
		//self end
		var tab = new Array();
		for (var i = 0; i < elem.length; i++)
		{
			var trouve = false;
			var idsplit = elem[i].getAttribute('href').split('=');
			var id = idsplit[4];
			var session = idsplit[2];
			
			var ligne = myf.getElementById("eventRow-"+id+"");
			
			var mission = ligne.childNodes[5].innerHTML;
			mission = mission.split("/")[2].split(".")[0];
			
			for (var j = 0; j < tab.length; j++)
				{
					if(/*rich[i]=='false'&&*/tab[j] == id-1&&rich2[j]=='true')
					{
						trouve = true;
						break;
					}
				}
			tab.push(id);
			rich2.push(rich[i]);
			if(!trouve)
			{
				//tab.push(id);
				aaaaa(id, session, mission);
			}
			trouve = false;
		}
	}
	if(reload)
	{
		unsafeWindow.$("#iframeEventBox").ajaxSuccess(function(e,xhr,settings)
		{
			test();
		}); 
	}	