// ==UserScript==
// @name           colorier cdr galaxie
// @namespace      snaquekiller
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// @version        0.1
// @creator       snaquekiller
// ==/UserScript==

var option1 = 0;//0 pour cdr total (metal+cristal), 1 pour juste metal, 2 juste pour cristal, 3 pour metal(variable cdr1) ou cristal(variable cdr2)
var cdr1 = 1000; // pour tous ce qui est au debut sauf cristal
var cdr2 = 1000; // pour le ou cristal.



var url = location.href;
var sans_page = location.href.split('page=')[0];
var serveur = url.split('/')[2];
var session = document.location.href.replace(/^.*&session=([0-9a-f]*).*$/i,"$1");// id of the sesions


function rajout_lien_recycler(){
			var nb_cristal;
			var nb_metal;
			var id;
			for(var k=1;k<15;k++)
			{
				id = 'debris'+k;
				if(document.getElementById(id))
				{
					nb_metal = parseInt(document.getElementById(id).getElementsByClassName('debris-content')[0].innerHTML.replace( /[^0-9-]/g, ""));
					nb_cristal = parseInt(document.getElementById(id).getElementsByClassName('debris-content')[1].innerHTML.replace( /[^0-9-]/g, ""));
					if((option1 == 0 && (nb_metal + nb_cristal)>cdr1) ||(option1 == 1 && (nb_metal)>cdr1) ||(option1 == 2 && (nb_cristal)> cdr1) || (option1 == 3 && (nb_metal>cdr1 || nb_cristal> cdr2))){
						document.getElementsByClassName('debris')[(k-1)].setAttribute('style','background-color: #FC0202;');
					}
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
	}));

