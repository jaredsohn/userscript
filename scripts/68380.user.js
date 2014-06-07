// ==UserScript==
// @name           Στατιστικά Συμμαχίας
// @namespace      vulca, Dahakaa
// @version        0.7.1
// @ 1st author    Vulca
// @ edited by     Dahakaa
// @description    Υπολογίζει την πρόοδο των μελών συμμαχίας
// @include       http://*.ogame.*/game/index.php?page=network&*
// ==/UserScript==


	if (document.getElementById('playerName')) // Si c'est un univers Redesign
	{
		var Version = '0.7.1'
		var AJours = GM_getValue("aJours",true);
	
		function addPoints(nombre)
		{
			if (nombre<1000) {return nombre;} 
			else 
			{
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '-';
				}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			}
		}
		
		function plus(nb)
		{
			if(nb<0) return addPoints(nb);
			else return '+'+addPoints(nb);
		}
		
		function enregistre()
		{
			for (var i =1 ; i< document.getElementsByClassName('members zebra bborder')[0].getElementsByTagName('tr').length ; i++)
			{
				infoJoueur = document.getElementsByClassName('members zebra bborder')[0].getElementsByTagName('tr')[i];
				
				points=infoJoueur.getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, "");
				coord = infoJoueur.getElementsByTagName('a')[0].innerHTML;
				classement = infoJoueur.getElementsByTagName('span')[0].innerHTML.replace( /[^0-9-]/g, "");
			
				GM_setValue('infoJoueur'+serveur+coord , points+';'+classement); // enregistre	
				
			}
			
			var date = new Date()+ '';
			var dates = date.split(/ /);
			GM_setValue('date'+serveur ,dates[2]+' '+dates[1]);
		}
			
		var serveur = location.href.split('/')[2];
		
		var infoJoueur=new Array();
		var pseudo=new Array();
		var coord = new Array();
		var points=new Array();
		var oldRang=new Array();
		var newRang = new Array();
		var pointsSauvegarde=new Array();
		var classement =new Array();
		var classementSauvegarde=new Array();
		
		// affichage
		var sp1 = document.createElement("span");
		sp1.setAttribute("id", "allistat");
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content);		
		sp2 = document.getElementsByTagName("table")[3];		
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = '<table  style="width:675px; margin:auto;"><span style="text-align:center;"> <input id="enregistre" value="Σβήσιμο ιστορικού" style="background-color:transparent; border: solid black 1px; color:#CCCCCC;" /> <input id="boutonBBcode" value="Εμφάνιση BBcode" style="background-color:transparent; border: solid black 1px; color:#CCCCCC;" /></span></table>';
		if (!AJours) tableau.innerHTML += '<br/><a id="MaJ" href="http://userscripts.org/scripts/source/68380.user.js">Υπάρχει νέα έκδοση. Κάντε κλικ για εγκατάσταση</a>';
		
		document.getElementById('allistat').insertBefore(tableau, document.getElementById('allistat').firstChild);
		
		
		if (GM_getValue('date'+serveur ,'') =='') enregistre();
		
		// enregistrement si clique sur le bouton 
		document.getElementById("enregistre").addEventListener("click", function(event)
		{
			if(confirm('Réinitialiser les progressions ?')) 
			 {
				enregistre();
			}
		
		}, true);
		
		
		

		//Export BBcode si clique sur le bouton
		document.getElementById("boutonBBcode").addEventListener("click", function(event) 		
		{
			var bbcode = '[b] Πρόοδος της συμμαχίας από τις ' +GM_getValue('date'+serveur ,'') +'[/b]\n\n';
			
			for (var i =1 ; i< document.getElementsByClassName('members zebra bborder')[0].getElementsByTagName('tr').length ; i++)
			{
				infoJoueur = document.getElementsByClassName('members zebra bborder')[0].getElementsByTagName('tr')[i];
				pseudo[i] = infoJoueur.getElementsByTagName('td')[0].innerHTML.replace(/(^\s*)|(\s*$)/g,'');
				points[i]=parseInt(infoJoueur.getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, ""));
				coord[i] = infoJoueur.getElementsByTagName('a')[0].innerHTML;
				classement[i] = infoJoueur.getElementsByTagName('span')[0].innerHTML.replace( /[^0-9-]/g, "");
			
				pointsSauvegarde[i] = parseInt(GM_getValue('infoJoueur'+serveur+coord[i] , '0;0').split(';')[0]);
				classementSauvegarde[i] = parseInt(GM_getValue('infoJoueur'+serveur+coord[i] , '0;0').split(';')[1]);
				
				if (pointsSauvegarde[i]==0) 
				{
					pointsSauvegarde[i] = points[i];
					classementSauvegarde[i]=classement[i] ; 
					GM_setValue('infoJoueur'+serveur+coord[i] , points[i]+';'+classement[i]); // enregistre	
				}
			}
			for (var i =1 ; i< pseudo.length ; i++)
			{
				newRang[i]=1;oldRang[i]=1;
				
				for (var j =1 ; j< pseudo.length ; j++)
				{
					if (points[i]- pointsSauvegarde[i] < points[j]- pointsSauvegarde[j]) newRang[i]++;
					if (points[i] < points[j]) oldRang[i]++;

				}
				

				if(classementSauvegarde[i]-classement[i] > 0) var couleur = 'green';
				else if(classementSauvegarde[i]-classement[i] < 0) var couleur = 'red';
				else var couleur = 'none';
				
				if(points[i]- pointsSauvegarde[i] > 0) var couleur2 = 'green';
				else if(points[i]- pointsSauvegarde[i] < 0) var couleur2 = 'red';
				else var couleur2 = 'none';
				
				bbcode +=  oldRang[i]+' 	-[b]	'	 + pseudo[i]+'->[/b]	 '+addPoints(points[i])+'	πόντοι [b]->[/b] [color='+couleur+'][b]Κατάταξη[/b] :	'+classement[i]+'	 ( 	'+plus(classementSauvegarde[i]-classement[i])+'	 )[/color] [b]->[/b] [color='+couleur2+'][b]πρόοδος[/b] : 	 '+ plus(points[i]- pointsSauvegarde[i])+'points soit	 '+plus(parseInt((points[i]-pointsSauvegarde[i])/points[i]*10000)/100)+ '%[/color][b]->πρόοδος κατάταξης : 	'+newRang[i]+' 	[/b] \n'  ;
			
			}alert(bbcode);	
			
		}, true);


	if (!AJours)
	{
		/* ******************************A Jours apres clique ********************************/
		document.getElementById("MaJ").addEventListener("click", function(event) 
		{
			GM_setValue("aJours",true);
			GM_setValue("dateMaJ",Date.parse(new Date()) / 1000);
		}, true);
	}
	
	// recherche des MaJ
	
	if (parseInt(GM_getValue("dateMaJ",0))+3600*23 < Date.parse(new Date()) / 1000 ) 
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://vulca.evoserv.net/script/versionAllistat.txt',
					
					onload: function(response) 
					{
						var Derniere_Version = response.responseText;
						Derniere_Version=Derniere_Version+'';
						Version=Version+'';
						
						if (Derniere_Version != Version && Derniere_Version.length < 10 && Derniere_Version.length > 2 ) 
						{					
							GM_setValue("aJours",false);
							GM_setValue("dateMaJ",Date.parse(new Date()) / 1000);
						}
						else 
						{			
							GM_setValue("aJours",true);
							GM_setValue("dateMaJ",Date.parse(new Date()) / 1000);
						}
					}
				});		
			}
	
	
	}
	





