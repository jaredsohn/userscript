// ==UserScript==
// @name           Script ReStore redesign
// @namespace      vulca
// @version        0.8
// @author         vulca
// @description    Pour stoquer et trier facilement vos RC
// @include        http://*.ogame*/game/index.php?page=messages*
// ==/UserScript==

	function Insert(where, what, avec) 
	{
		var Object = document.createElement(what);
		where.appendChild(Object);
		Object.innerHTML = avec;
	}
	
	function stripHTML(txt)
	{ 
		return txt.replace(/<\S[^><]*>/g, "")
	}
	if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
	else 											{var FireFox = false;var nomScript='ScriptReStore';}
	// Google Chrome
	if(!GM_getValue) 
	{
		function GM_getValue(key,defaultVal) 
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key, value);
		}	
	}

	if (!(document.getElementById('playerName'))) // Si ancienne version
	{
	
		var MatchTab = location.href.match('uni([0-9]{1,2}).ogame.fr.game.index.php.page=([a-zA-Z0-9_]+)(?:&dsp=1)?(?:&no_header=1)?&session=([a-z0-9]{12})(?:&mode=([a-zA-Z0-9]+))?');
		var uni = MatchTab[1];
		var session = MatchTab[3];

		if ((GM_getValue(nomScript+'pseudo'+uni,0))==0)
		{
			alert("c'est votre première utilisation du script \n\n Vous devez entrer vos identifiants RE-Store \n(Merci de NE PAS utiliser les mêmes identifiants que sur Ogame");
			var pseudo = prompt("Entrer votre pseudo RE-Store", GM_getValue(nomScript+'pseudo'+uni,''));
			var mdp = prompt("Entrer votre mot de passe RE-Store", GM_getValue(nomScript+'mdp'+uni,''));
		
			GM_setValue(nomScript+'pseudo'+uni,pseudo);
			GM_setValue(nomScript+'mdp'+uni,mdp);
			document.location.href=location.href;
		}


		var pageMessage = document.getElementById("content").innerHTML;
		

		pageMessage = stripHTML(pageMessage);
		
		while ( pageMessage.indexOf('<',0) >=0)
		{
			var deb = pageMessage.indexOf('<',0);
			var fin = pageMessage.indexOf('>',0);	
			var efface = pageMessage.substring(deb,fin+1);
			pageMessage = pageMessage.replace(efface,'');
		}


		
		
		var affiche ='<input  type="submit" id="coche" value="Sélectionner les RE Cochés" />';
		affiche+='<input  type="submit" id="decoche" value="Sélectionner les RE non Cochés" />';
		affiche+='<form  style="text-align:center;" action="http://vulca.evoserv.net/restore/index.php" target="_restore" method="post">';
		affiche+='<textarea style="display:none;" name="message" id="ameliorer">'+pageMessage+'</textarea>';
		affiche+= '<input style="display:none;" type="text" name="pseudo" value="'+GM_getValue(nomScript+'pseudo'+uni,'')+'"/>';
		affiche+= '<input style="display:none;" name="mdp" value="'+GM_getValue(nomScript+'mdp'+uni,'')+'"/>';
		
		affiche+= '<input style="display:none;" name="session" value="'+session+'"/>';
		affiche+= '<input style="display:none;" name="uni" value="'+uni+'"/>';

		
		affiche+= '<br/><input style="display:none;" type="text" name="script" value="script re store" />';
		affiche+='<input  type="submit" value="Envoyez les RE vers RE_Store" /></form>';
		
		affiche+='<a href="'+location.href+'&modifReStore=1">Modifier vos identifiants RE-Store</a><br/><br/>';

		
		
		Insert( document.getElementById("content").getElementsByClassName("header")[0], 'th', affiche);

		document.getElementById("coche").addEventListener("click", function(event) 
		{
			var Re_coche = '';
			for (var j =0; j< document.getElementById("content").getElementsByTagName("tr").length ; j++)
			{
				var coche = document.getElementById("content").getElementsByTagName("tr")[j].getElementsByTagName("input");

				for (var i=0 ; i< coche.length ; i++)
				{
				
					if(coche[i].checked == true )
					{
						var Re = document.getElementById("content").getElementsByTagName("tr")[j+1].innerHTML;
						
						Re = stripHTML(Re);
							
						while ( Re.indexOf('<',0) >=0)
						{
							var deb = Re.indexOf('<',0);
							var fin = Re.indexOf('>',0);	
							var efface = Re.substring(deb,fin+1);
							
							Re = Re.replace(efface,'');
						}
						Re_coche += Re;
					}
				}
			}
			
			document.getElementById("ameliorer").innerHTML = Re_coche;
		
		}, true);
		
		
		
		document.getElementById("decoche").addEventListener("click", function(event) 
		{
			var Re_coche = '';
			for (var j =0; j< document.getElementById("content").getElementsByTagName("tr").length ; j++)
			{
				var coche = document.getElementById("content").getElementsByTagName("tr")[j].getElementsByTagName("input");

				for (var i=0 ; i< coche.length ; i++)
				{
				
					if(coche[i].checked == false )
					{
						var Re = document.getElementById("content").getElementsByTagName("tr")[j+1].innerHTML;
						
						Re = stripHTML(Re);
							
						while ( Re.indexOf('<',0) >=0)
						{
							var deb = Re.indexOf('<',0);
							var fin = Re.indexOf('>',0);	
							var efface = Re.substring(deb,fin+1);
							
							Re = Re.replace(efface,'');
						}
						Re_coche += Re;
					}
				}
			}
			
			document.getElementById("ameliorer").innerHTML = Re_coche;
		
		}, true);

		if ((location.href.indexOf('&modifReStore=1',0))>=0)
		{
			var pseudo = prompt("Entrer votre nouveau pseudo RE-Store", GM_getValue(nomScript+'pseudo'+uni,''));
			var mdp = prompt("Entrer votre nouveau mot de passe RE-Store", GM_getValue(nomScript+'mdp'+uni,''));

			GM_setValue(nomScript+'pseudo'+uni,pseudo);
			GM_setValue(nomScript+'mdp'+uni,mdp);
			document.location.href=location.href.replace('&modifReStore=1','');
		}
		
	}
	
	
	
	else // Si univers redesign
	{
		var uni =  location.href.split('/')[2]; 

		var session = location.href.substring(location.href.indexOf('session=')+8,location.href.length) ;

		if ((GM_getValue(nomScript+'pseudo'+uni,'') =='')|| GM_getValue(nomScript+'mdp'+uni,'')=='')
		{
			alert("c'est votre première utilisation du script \n\n Vous devez entrer vos identifiants RE-Store \n(Merci de NE PAS utiliser les mêmes identifiants que sur Ogame");
			var pseudo = prompt("Entrer votre pseudo RE-Store", GM_getValue(nomScript+'pseudo'+uni,''));
			var mdp = prompt("Entrer votre mot de passe RE-Store", GM_getValue(nomScript+'mdp'+uni,''));
		
			GM_setValue(nomScript+'pseudo'+uni,pseudo);
			GM_setValue(nomScript+'mdp'+uni,mdp);
			
			document.location.href=location.href;
		}

		function affiche_script() 
		{
			var table = document.getElementById("inhalt").getElementsByTagName("table")[0];
			if (!table || table.getAttribute("done14111") == "done") return;
			table.setAttribute("done14111","done");
		
		
		var pageMessage = document.getElementById("inhalt").innerHTML;
		

		pageMessage = stripHTML(pageMessage);
		
		while ( pageMessage.indexOf('<',0) >=0)
		{
			var deb = pageMessage.indexOf('<',0);
			var fin = pageMessage.indexOf('>',0);	
			var efface = pageMessage.substring(deb,fin+1);
			pageMessage = pageMessage.replace(efface,'');
		}

		pageMessage = pageMessage.replace(/ActivitéActivitéActivité signifie que le joueur scanné était actif sur la planète au moment du scan ou qu`un autre joueur a eu un contact de flotte avec cette planète à ce moment là.Le scanner des sondes n`a pas détecté d`anomalies atmosphériques sur cette planète. Une activité sur cette planète dans la dernière heure peut quasiment être exclue./g,'').replace(/`/g,"'");
	//alert(pageMessage);	
		var affiche ='<div id="restore" style="text-align:center;" >';
		
	//	affiche +='<input  type="submit" id="coche" value="Sélectionner les RE Cochés" />';
	//	affiche+='<input  type="submit" id="decoche" value="Sélectionner les RE non Cochés" />';
		affiche+='<form  style="text-align:center;" action="http://vulca.evoserv.net/restore/index.php" target="_restore" method="post">';
		affiche+='<textarea style="display:none;" name="message" id="ameliorer">'+pageMessage+'</textarea>';
		affiche+= '<input style="display:none;" type="text" name="pseudo" value="'+GM_getValue(nomScript+'pseudo'+uni,'')+'"/>';
		affiche+= '<input style="display:none;" name="mdp" value="'+GM_getValue(nomScript+'mdp'+uni,'')+'"/>';
		affiche+= '<input style="display:none;" name="redesign" value="redesign"/>';
		affiche+= '<input style="display:none;" name="session" value="'+session+'"/>';
		affiche+= '<input style="display:none;" name="uni" value="'+uni+'"/>';

		
		affiche+= '<br/><input style="display:none;" type="text" name="script" value="script re store" />';
		affiche+='<input  type="submit" value="Envoyez les RE vers RE_Store" /></form>';
		
		affiche+='<a href="'+location.href+'&modifReStore=1">Modifier vos identifiants RE-Store</a></div>';

		
		
		//Insert( document.getElementById("showSpyReportsNow"), 'span', affiche);

		if(!document.getElementById('restore'))
		{
			var tableau = document.createElement("span");
				tableau.innerHTML = affiche;
				document.getElementById('vier').insertBefore(tableau, document.getElementById('vier').firstChild);
		}
		
	/*	document.getElementById("coche").addEventListener("click", function(event) 
		{
			var Re_coche = '';
			for (var j =0; j< document.getElementById("content").getElementsByTagName("tr").length ; j++)
			{
				var coche = document.getElementById("content").getElementsByTagName("tr")[j].getElementsByTagName("input");

				for (var i=0 ; i< coche.length ; i++)
				{
				
					if(coche[i].checked == true )
					{
						var Re = document.getElementById("content").getElementsByTagName("tr")[j+1].innerHTML;
						
						Re = stripHTML(Re);
							
						while ( Re.indexOf('<',0) >=0)
						{
							var deb = Re.indexOf('<',0);
							var fin = Re.indexOf('>',0);	
							var efface = Re.substring(deb,fin+1);
							
							Re = Re.replace(efface,'');
						}
						Re_coche += Re;
					}
				}
			}
			
			document.getElementById("ameliorer").innerHTML = Re_coche;
		
		}, true);
		
		
		
		document.getElementById("decoche").addEventListener("click", function(event) 
		{
			var Re_coche = '';
			for (var j =0; j< document.getElementById("content").getElementsByTagName("tr").length ; j++)
			{
				var coche = document.getElementById("content").getElementsByTagName("tr")[j].getElementsByTagName("input");

				for (var i=0 ; i< coche.length ; i++)
				{
				
					if(coche[i].checked == false )
					{
						var Re = document.getElementById("content").getElementsByTagName("tr")[j+1].innerHTML;
						
						Re = stripHTML(Re);
							
						while ( Re.indexOf('<',0) >=0)
						{
							var deb = Re.indexOf('<',0);
							var fin = Re.indexOf('>',0);	
							var efface = Re.substring(deb,fin+1);
							
							Re = Re.replace(efface,'');
						}
						Re_coche += Re;
					}
				}
			}
			
			document.getElementById("ameliorer").innerHTML = Re_coche;
		
		}, true);
*/
		if ((location.href.indexOf('&modifReStore=1',0))>=0)
		{
			var pseudo = prompt("Entrer votre nouveau pseudo RE-Store", GM_getValue(nomScript+'pseudo'+uni,''));
			var mdp = prompt("Entrer votre nouveau mot de passe RE-Store", GM_getValue(nomScript+'mdp'+uni,''));

			GM_setValue(nomScript+'pseudo'+uni,pseudo);
			GM_setValue(nomScript+'mdp'+uni,mdp);
			document.location.href=location.href.replace('&modifReStore=1','');
		
		}
		
	}
		
		setInterval(affiche_script,700);
	}
	
	
	
	
	
	
	
	
	
	
	
	