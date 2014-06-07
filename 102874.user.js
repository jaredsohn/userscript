// ==UserScript==
// @name           Rajout lien galaxy
// @namespace      snaquekiller
// @include        http://uni*.ogame.*/game/index.php?page=galaxy*
// @description        permet de rajouter un lien recycler et espionner dans la galaxy
// ==/UserScript==

var url = location.href;
var sans_page = location.href.split('page=')[0];
var serveur = url.split('/')[2];
var session = document.location.href.replace(/^.*&session=([0-9a-f]*).*$/i,"$1");// id of the sesions
var test = document.getElementById('officers').getElementsByTagName('img')[0].src.indexOf('/game/img/layout/commander_ikon.gif') != -1;


		function rajout_lien_recycler(){
		var test = document.getElementById('officers').getElementsByTagName('img')[0].src.indexOf('/game/img/layout/commander_ikon.gif') != -1;
			var coordone;
				var galaxie = '';
				var systeme = '';
				var planette = '';
			var nb_recyclot = '';
			var rajout;
			var id;
			for(var k=1;k<15;k++)
			{
				id = 'debris'+k;
				if(document.getElementById(id))
				{
					if(test){
					coordone = document.getElementById(id).getElementsByClassName('ListImage')[0].getElementsByTagName('span')[0].innerHTML.split(':');
						galaxie = (coordone[0]).replace( /[^0-9-]/g, "");
						systeme = (coordone[1]).replace( /[^0-9-]/g, "");
						planette = (coordone[2]).replace( /[^0-9-]/g, "");
						nb_recyclot = document.getElementById(id).getElementsByClassName('debris-recyclers')[0].innerHTML.replace( /[^0-9-]/g, "");
					}
					rajout = '<a href="'+ sans_page +'page=fleet1&session='+session +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette +'&ship_209='+ nb_recyclot + '&type=2&mission=8">Recyler fleet</a>'; 
					var sp1 = document.createElement('li');
					sp1.innerHTML = rajout;
					document.getElementById(id).getElementsByClassName('ListLinks')[0].appendChild(sp1);
				}
			}
		}
		
	function rajout_lien_lune_espionner(){
		var test = document.getElementById('officers').getElementsByTagName('img')[0].src.indexOf('/game/img/layout/commander_ikon.gif') != -1;

			var coordone;
				var galaxie = '';
				var systeme = '';
				var planette = '';
				var nb_sonde = '';//4?
				var mission = '';//epionner ? = 6
			var rajout;
			var id;
			for(var k=1;k<15;k++)
			{
				id = 'moon'+k;
				if(document.getElementById(id))
				{
				if(test){
					coordone = document.getElementById(id).getElementsByClassName('ListImage')[0].getElementsByTagName('span')[0].innerHTML.split(':');
						galaxie = (coordone[0]).replace( /[^0-9-]/g, "");
						systeme = (coordone[1]).replace( /[^0-9-]/g, "");
						planette = (coordone[2]).replace( /[^0-9-]/g, "");
						mission = '6';
						nb_sonde = '4';
					}
					rajout = '<a href="'+ sans_page +'page=fleet1&session='+session +'&galaxy='+ galaxie
						+ '&system='+ systeme + '&position='+ planette +'&ship_210='+ nb_sonde +'&type=1&mission='+mission +'">'
						+ 'Espionner via fleet1</a>'; 
					var sp1 = document.createElement('li');
					sp1.innerHTML = rajout;
					document.getElementById(id).getElementsByClassName('ListLinks')[0].appendChild(sp1);
				}
			}
		}
		
			function safeWrap(f)
			{
				return function()
				{
					setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
				};
			}
			//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
			unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings)
			{
				//l'url de la requête ajax contient page=galaxyContent
				if (settings.url.indexOf("page=galaxyContent") == -1) return;

				// Taper votre code a executer ici
				rajout_lien_recycler();
				rajout_lien_lune_espionner();
			}));
