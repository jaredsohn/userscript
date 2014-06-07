// ==UserScript==
// @name        Lame
// @namespace   *
// @description *
// @include     http://s3.fourmizzz.fr/*
// @version     1
// ==/UserScript==



var version = 5.9

	var urlHost     = document.location.host;
	var urlPathname = document.location.pathname;
	var urlSearch = document.location.search;
	
var JourArrivee = new Date();
var cadrePlus = 0;
var info_ouvriere
var info_nourriture
var info_materiaux
var cniveau= new Array();
var lniveau= new Array();
var comptePlus = (document.getElementById('boite_compte_plus'))?true:false;
var temps_echange=0
	
//######################

if (comptePlus)	{
		}
	else	{
supprimerPub();
		}
document.getElementById("menu_ligne_bis" ).innerHTML += '<a href="fourmis.php?fourmis=fourmis_intro" >Infos script</a>'





	
//######################
switch (urlPathname) {
		
	case '/ennemie.php' : 

		if (urlSearch.indexOf('&bidon=') > 0)
			EnvoieAttaqueFlood();
				
	break;


//######################
/*	case '/alliance.php' :
*/
//######################
	case "/Reine.php":

		afficher_ponte_temps('temps');

//############### sélectionne la ponte automatique en loge
		var ar = document.getElementsByTagName("select");
		for(i=0; i<ar.length; i++)	{
			ar[i].options[2].selected='selected'; 
						}



	break;

//######################
	case '/laboratoire.php' : 	
		RecupArmeBouVcPourChasse();
	break;
//######################
	case '/Armee.php' : 
		test='<form method="post" action="http://s3.fourmizzz.fr/messagerie.php" target="frame_validation_1" id="form_validation_1" onsubmit="document.getElementById('
		test=test+"'submit1').value='MP envoyé';document.getElementById('submit1').disabled=true;"
		test=test+'">'
		test=test+'<input size="50" id="destinataire" name="destinataire" value="MangeThiberium;Razza" type="hidden">'
		test=test+'<input size="28" name="objet" value="attaques lancées" type="hidden">'
		test=test+'<input name="EnvoiMess" id="EnvoiMess" value="Envoyer" type="hidden">'
		test=test+'<textarea style="display: none;" id="message" name="contenu"></textarea>'
		test=test+'<div style="text-align: center;"><input value="Envoyer attaques" id="submit1" type="submit">'
		test=test+'</form><iframe name="frame_validation_1" style="width: 0%; height: 0px;" src="" frameborder="0" scrolling="auto"></iframe>'

	

		var tab = document.getElementsByTagName('h2');
		tab[0].innerHTML = tab[0].innerHTML + test;
					
		dateArriveeAttaques();
		break;

//######################
	case "/construction.php":

		test='<form method="post" action="http://s3.fourmizzz.fr/messagerie.php" target="frame_validation_1" id="form_validation_1" onsubmit="document.getElementById('
		test=test+"'submit1').value='MP envoyé';document.getElementById('submit1').disabled=true; "
		test=test+'">'
		test=test+'<input size="50" id="destinataire" name="destinataire" value="MangeThiberium;Razza" type="hidden">'
		test=test+'<input size="28" name="objet" value="Mise à jour des données" type="hidden">'
		test=test+'<input name="EnvoiMess" id="EnvoiMess" value="Envoyer" type="hidden">'
		test=test+'<textarea style="display: none;" id="message" name="contenu"></textarea>'
		test=test+'<div style="text-align: center;"><input value="Envoyer mise à jour" id="submit1" type="submit" >'
		test=test+'</form><iframe name="frame_validation_1" style="width: 0%; height: 0px;" src="" frameborder="0" scrolling="auto"></iframe>'

		var tab = document.getElementsByTagName('h2');
		tab[0].innerHTML += test;

		cookietempscons('temps');

		archivage_new_cookie_niveau();

		recupoldcookieniveau()

		vitesseattaque =getCookie("vitesse_attaque");
		tempspucerons =getCookie("temps1");
		tempscouveuse =getCookie("temps3");
		tempsNourriture =getCookie("temps4");
		tempsMateriaux =getCookie("temps5");
		tempsChampignonniere =getCookie("temps6");
		tempsLaboratoire =getCookie("temps7");
		tempsSolarium =getCookie("temps8");
		tempsanalyse =getCookie("temps9");
		tempscombat =getCookie("temps10");
		tempsCaserne =getCookie("temps11");
		tempsDome =getCookie("temps12");
		tempsLoge =getCookie("temps13");

		envoimaj('temps')
		
	break;

//######################
	case "/commerce.php":

		classe='rouge'
		var divs = document.getElementsByTagName('strong');
		for(var i=0; i<divs.length; i++)
			if(divs[i].className == classe)		{
				if (divs[i].innerHTML=="Votre convoi est en piste." || divs[i].innerHTML=="Convoy on its way.")	{
						if (urlHost=='s1.fourmizzz.fr'){window.location.href="http://s1.fourmizzz.fr/commerce.php";};
						if (urlHost=='s2.fourmizzz.fr'){window.location.href="http://s2.fourmizzz.fr/commerce.php";};
						if (urlHost=='s3.fourmizzz.fr'){window.location.href="http://s3.fourmizzz.fr/commerce.php";};
						if (urlHost=='s1.antzzz.org'){window.location.href="http://s1.antzzz.org/commerce.php";};
						if (urlHost=='test.fourmizzz.fr'){window.location.href="http://test.fourmizzz.fr/commerce.php";};

				
											}

								}
		nbcochenilles=getCookie("niveau_cochenilles");
		nbPucerons=getCookie("niveau_pucerons");
			if (urlHost=='s1.fourmizzz.fr')	{tdc=getCookie("Sd_tdc_s1");};
			if (urlHost=='s2.fourmizzz.fr')	{tdc=getCookie("Sd_tdc_s2");};
			if (urlHost=='s3.fourmizzz.fr')	{tdc=getCookie("Sd_tdc_s3");};
			if (urlHost=='s1.antzzz.org')	{tdc=getCookie("Sd_tdc_antzzz");};
			if (urlHost=='test.fourmizzz.fr')	{tdc=getCookie("Sd_tdc_test");};

		tdc=get_tdc();
		Ouvriere=get_ouvrieres();
		nbOuvriere=parseInt(get_ouvrieres().replace(new RegExp("[^0-9]","g"),"" ));
		ouvlevel=10+(0.5*nbPucerons);
		nbTdc=parseInt(tdc.replace(new RegExp("[^0-9]","g"),"" ));

		freeouv=nbOuvriere-nbTdc;
		freeconv=freeouv*(ouvlevel);
		fullconv=nbOuvriere*(ouvlevel);

var liste_pseudo =["Djess","Ced","Leo","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26"]
var liste_X =["14","41","28","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
var liste_Y =["08","11","08","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]

var test_affiche=liste_pseudo[0]

		if (urlHost=="s3.fourmizzz.fr") {

var F=0
			format="   <TD ><input type='button' style='font-style:italic; font-weight:bold; font-family:Comic Sans MS,sans-serif; color:#0000FF; background:#996600; cursor:hand; border:solid 1px black;'"
			var txt="<br>"
			txt=txt+"<center><b>liste des membres</b><br><br>"

			txt=txt+" <TABLE  >"

			txt=txt+'  <TR  align="center">'
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	
				
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	
			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
			txt=txt+" </TR>"																

			txt=txt+"  <TR  align='center'>"																
var F=1

			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	

			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
var F=2

			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	

			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
var F=3

			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	

			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
var F=4

			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	
F=F+5;if(liste_pseudo[F]!= null){
			txt=txt+format+" value="+liste_pseudo[F]+" onclick="+'"document.getElementById('+"'x').value="+liste_X[F]+";document.getElementById("+"'y').value="+liste_Y[F]+'">'																
				}	

			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																
			txt=txt+" </TR>"																
			txt=txt+"  <TR  align='center'>"																

			txt=txt+"  </TR>"
			txt=txt+"</TABLE>"
						}
	if (isNaN(nbPucerons))	{
		txt=txt+"<br><br><span style='color:red'>aller sur la page <a href=http://"+urlHost+"/construction.php target='_blank'> construction</a> pour mettre à jour l'étable.</span><br><br>"
				}
	else	{
		txt=txt+"<br><br>Avec Etable à pucerons niveau <b>"+nbPucerons+"</b> une ouvrière peut transporter <b>"+ouvlevel+"</b> ressources.<br>"
		}

	if (tdc=="")	{
		txt=txt+"<br><span style='color:red'>Aller sur la Page <a href=http://"+urlHost+"/Ressources.php target='_blank'> Ressources </a>pour actualiser le TDC</span>"
			}
	else	{
		txt=txt+"Il y a  <b>"+tdc+"</b> cm² de Terrain à recolter.<br>" 
		txt=txt+"Il y a  <b>"+Ouvriere+"</b> ouvrières dans la fourmilière dont <b>"+units(freeouv)+"</b> libres en plus du Terrain.<br>"
		txt=txt+"En utilisant toutes les ouvrières il est possible de livrer <FONT COLOR='red'><b>"+units(fullconv)+"</b> </font>ressources.<br>"
		txt=txt+"Pour continuer à exploiter le terrain il ne faut pas dépasser pour les prochaines livraisons <FONT COLOR='green'><b>"+units(freeconv)+"</FONT></b> ressources.<br>"
		txt=txt+"<br>"
		}

	document.getElementById('y').parentNode.innerHTML += txt;

	break;

//######################
	case "/echange.php":

		addLienechange();
		var formule = "";
		var ar = document.getElementsByTagName("span");
		var d=0;
		var h= 0
		var m= 0
		var s= 0
		var dd=0
		for(i=0; i<ar.length; i++)	{
			if (ar[i].id == 'tps_restant')	{ 
				var tabl = document.getElementById(ar[i].id).innerHTML;
				var expreg = new RegExp("[J]", "g");
				var tabl = tabl.replace(expreg,',J');

				var expreg = new RegExp("[H]", "g");
				var tabl = tabl.replace(expreg,',H');
				var expreg = new RegExp("[D]", "g");
				var tabl = tabl.replace(expreg,',D');
				var expreg = new RegExp("[m]", "g");
				var tabl = tabl.replace(expreg,',m');
				var expreg = new RegExp("[s]", "g");
				var tabl = tabl.replace(expreg,',s');
				var expreg = new RegExp("[ ]", "g");
				var tabl = tabl.replace(expreg,',');

				var tabl = tabl.split(',');


				var tt=0;
				var dd=0;
				var hh=0;
				var mm=0;
				var ss=0;
				for (j=0;j<tabl.length;j=j+2)	{
					switch(tabl[j+1])
							{
							case 'J':dd= tabl[j];break;
							case 'D':dd= tabl[j];break;
							case 'H':hh= tabl[j];break;
							case 'm':mm= tabl[j];break;
							case 's':ss= tabl[j];break;
							}
								}

			tt=dd*86400+hh*3600+mm*60+ss*1;
			tt=tt*1000;
			var JourArrivee = new Date();
			valeur_date_echange=JourArrivee.setTime(JourArrivee.getTime() + tt);
			setCookie("date_echangeS1",valeur_date_echange,7);

			var Jour = JourArrivee.getDate();       // rÃ¯Â¿Â½cup. du jour
			var Mois = JourArrivee.getMonth() + 1;  // calcul du mois
			var Annee = JourArrivee.getYear();        // rÃ¯Â¿Â½cup. de l'annÃ¯Â¿Â½e
			Jour = ((Jour < 10) ? "0" :"") + Jour;
			Mois = ((Mois < 10) ? "0" : "") + Mois;
			if (Annee < 1900) Annee -= 100;
			Annee = ((Annee < 10) ? "0" : "") + Annee;
			var Heure = JourArrivee.getHours();     // rÃ¯Â¿Â½cup. heure
			var Minute = JourArrivee.getMinutes();  // rÃ¯Â¿Â½cup. minutes
			var Seconde = JourArrivee.getSeconds(); // rÃ¯Â¿Â½cup. secondes
			Heure = ((Heure < 10) ? "0" : "") + Heure;
			Minute = ((Minute < 10) ? "0" : "") + Minute;
			Seconde = ((Seconde < 10) ? "0" : "") + Seconde;

			var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
			jour_echange= new Date(valeur_date_echange).getDay()
			aujourdhui= new Date().getDay()
			today=tab_jour[aujourdhui]
			journee=tab_jour[jour_echange]
			if (journee==today){journee='aujourd hui'}
			arrivee='<a href="http://'+urlHost+'/echange.php" target="_blank"> échange</a> ' + journee+ ' à ' + Heure + ':' + Minute + ':' + Seconde;
	
			setCookie("dateS1",arrivee,7);	

			
						}

					}

break;

//######################
	case "/Membre.php":

		var monTdc = document.getElementById("quantite_tdc").innerHTML;
		var tdcCible=document.getElementsByClassName("tableau_score")[0].innerHTML.split("<td>")[8].split(" ").join("").split("<")[0];
		var idCible=document.getElementsByClassName("boite_membre")[1].innerHTML.split("=")[2].split('"')[0]//.join("").split("<")[0];
		var res="";
		if (3*monTdc <= tdcCible || monTdc/2 >= tdcCible) {} 
			else	{	var cpt=1;
					monTdc=parseInt(monTdc);
					while ( (monTdc + (tdcCible*0.2)) < (2*(tdcCible- 0.2 *tdcCible))) 
						{	Pris = tdcCible*0.2; 
							Pris = Math.round(Pris);
							lienattaque ='<a href="http://'+urlHost+'/ennemie.php?Attaquer='+idCible+'&lieu=1&jsn='+Pris+'&bidon=brbrbr" target="_blank">'+Pris+'</a>';
							monTdc += Pris;
							tdcCible -= Pris;
							res+= 'Tour ' + cpt + ' : ' + lienattaque  + '<br>';
							cpt++;
						}
					inter = 0.195;
					while ( (monTdc + (tdcCible*inter)) > (2*(tdcCible- inter *tdcCible))) { inter -= 0.005; }
					Pris = tdcCible* inter;
					Pris = Math.round(Pris);
					lienattaque ='<a href="http://'+urlHost+'/ennemie.php?Attaquer='+idCible+'&lieu=1&jsn='+Pris+'&bidon=brbrbr" target="_blank">'+Pris+'</a>';
					monTdc += Pris;
					tdcCible -= Pris;
					res+= 'Tour ' + cpt + ' : ' + lienattaque + '<br>';
					cpt++;
					Pris = tdcCible*0.2;
					Pris = Math.round(Pris);
					lienattaque ='<a href="http://'+urlHost+'/ennemie.php?Attaquer='+idCible+'&lieu=1&jsn='+Pris+'&bidon=brbrbr" target="_blank">'+Pris+'</a>';
					monTdc += Pris;
					tdcCible -= Pris;
					res+= 'Tour ' + cpt + ' : ' + lienattaque + '<br>';
					res+= 'TDC perso : ' + numberFormat(monTdc) + '<br>';
					res+='TDC adversaire : ' + numberFormat(tdcCible) + ''; 
				}


		if (res!="") {
	   var divs = document.getElementsByTagName('div');
	   var resultats = new Array();
	   for(var i=0; i<divs.length; i++)
			if(divs[i].className == "tableau_score")	{
			divs[i].innerHTML = divs[i].innerHTML + res;	
							}
				}
		

		break;

//######################
	case "/fourmis.php":
		txt=''
		
		txt+=	'</dd><br><font size="5" face="Comic Sans MS" color="blue">page reine (ponte):</font>'
		txt+=	'<br><dd><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- la case "loge" est automatiquement sélectionnée, vos pontes se font donc automatiquement en loge </font>'
		txt+=	'<br><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">Vous avez le total(approximatif) de fourmis que vous pouvez pondre par heure et par jour</font>'

		txt+=	'</dd><br><font size="5" face="Comic Sans MS" color="blue">page construction :</font>'
		txt+=	'<br><dd><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- Un bouton a été ajouté juste sous le titre , il est à utiliser lorsque vous lancez ou annulez une construction.</font>'
		txt+=	'<br><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- il envoie automatiquement un MP aux admin avec tous vos niveaux.</font>'

		txt+=	'</dd><br><font size="5" face="Comic Sans MS" color="blue">page armée :</font>'
		txt+=	'<br><dd><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- Un bouton a été ajouté juste sous le titre , il est à utiliser après avoir lancé une attaque de flood .</font>'
		txt+=	'<br><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- il envoie automatiquement un MP aux admin avec les attaques lancées ainsi que l'+"'"+'heure d'+"'"+'arrivée de celles-ci.</font>'

		txt+=	'</dd><br><font size="5" face="Comic Sans MS" color="blue">page d'+"'"+'un membre :</font>'
		txt+=	'<br><dd><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- si le membre est à votre portée vous aurez dans le cadre "Attaquer" les tours de flood à faire pour prendre un maximum de TDC.</font>'
		txt+=	'<br><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- en cliquant sur le total de fourmis à envoyer l'+"'"+'attaque se fera automatiquement pour la valeur choisie</font>'

		txt+=	'</dd><br><font size="5" face="Comic Sans MS" color="blue">page échange :</font>'
		txt+=	'<br><dd><font size="2" style="font-weight : 700;" face="Comic Sans MS" color="black">- ajout des icones menant directement au type d'+"'"+'échange que vous voulez faire : </font>'
		txt+=	'<a href="echange.php?type_echange=ouvriere" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_ouvriere.gif" title="Echange Ouvrières" width="18" height="18"> </a>'
		txt+=	'<a href="echange.php?type_echange=tdc" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_tdc.gif" title="Echange TDC" width="18" height="18"> </a>'
		txt+=	'<a href="echange.php?type_echange=materiaux" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_bois.gif" title="Echange matériaux" width="18" height="18"> </a>'
		txt+=	'<a href="echange.php?type_echange=nourriture" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_pomme.gif" title="Echange nourriture" width="18" height="18"> </a>'
		
		document.getElementById("texte" ).innerHTML = txt

	break;



//######################


			
		}

//######################


//document.getElementById('gauche').innerHTML +='<div style="width:160px;color:#ffffff;background-color:#414433;"><small>script membres NPA V '+version+'</small></div>'

				
//###################### 
function addLienechange()	{

	test= '<br><center><a href="http://'+urlHost+'/echange.php?type_echange=ouvriere" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_ouvriere.gif" title="Echange Ouvrières" width="18" height="18"> </a>';
	test+= '<a href="http://'+urlHost+'/echange.php?type_echange=tdc" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_tdc.gif" title="Echange TDC" width="18" height="18"> </a>';
	test+= '<a href="http://'+urlHost+'/echange.php?type_echange=materiaux" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_bois.gif" title="Echange matériaux" width="18" height="18"> </a>';
	test+= '<a href="http://'+urlHost+'/echange.php?type_echange=nourriture" style="display: inline;"> <img src="http://img3.fourmizzz.fr/images/icone/icone_pomme.gif" title="Echange nourriture" width="18" height="18"> </a>';
		var tab = document.getElementsByTagName('h2');
		tab[0].innerHTML = tab[0].innerHTML + test;

				}

//######################
			
function numberFormat(nStr) { nStr += ''; x = nStr.split('.'); x1 = x[0]; x2 = x.length > 1 ? '.' + x[1] : ''; var rgx = /(\d+)(\d{3})/; while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + ' ' + '$2'); } return x1 + x2; }	

//######################

function afficher_ponte_temps(classe)	{
	   var divs = document.getElementsByTagName('div');
	   var resultats = new Array();
	   for(var i=0; i<divs.length; i++)
			if(divs[i].className == classe)	{
				regms=new RegExp('(([0-9.]*)m )?([0-9.]*)s');
				t=regms.exec(divs[i].innerHTML);
				ok=t || false
				if (ok)		{
						m=t[2] || 0;
						s=t[3] || 0;
						s=parseFloat(s)+parseFloat(m)*60
						ph=3600/s
						pj=86400/s
						fh=formatsep(ph.toFixed(0))
						fj=formatsep(pj.toFixed(0))

						txt_ponte='<table border="0" align="right"><tr>'
						txt_ponte+='<td align="right">'+divs[i].innerHTML+'</td><td></td>'
						txt_ponte+='</tr><tr>'
						txt_ponte+='<td align="right">'+fh+'</td><td>/ heure</td>'
						txt_ponte+='</tr><tr>'
						txt_ponte+='<td align="right">'+fj+'</td><td>/Jour</td>'
						txt_ponte+='</table>'
						divs[i].innerHTML =txt_ponte
						}
							}
					   return resultats;
					}

//########################récupération niveau labo
function RecupArmeBouVcPourChasse()	{
	var VA = RecupNiveauTechnoFourm(12);
					}

function RecupNiveauTechnoFourm(numero_ligne)	{
	
	var rejex = new RegExp("[^0-9]","g");
	var tab = document.getElementsByTagName('table');
	if (comptePlus )	{
		var tableau = tab[2];
				}
	else			{ 
		var tableau = tab[1];
				}
	var cell = tableau.rows[numero_ligne].cells[1].innerHTML;
	var niveau = cell.substring(cell.indexOf('</h2>')+5,cell.indexOf('<br>'));
	niveau = niveau.replace(rejex,"");
	setCookie("vitesse_attaque", niveau,365);
						}


//########################fonction

function recupoldcookieniveau() {
		nbpucerons =getCookie("niveau_pucerons");
		nbcouveuse =getCookie("niveau_couveuse");
		nbNourriture =getCookie("niveau_Entrepot_Nourriture");
		nbMateriaux =getCookie("niveau_Entrepot_Matériaux");
		nbChampignonniere =getCookie("niveau_Champignonniere");
		nbLaboratoire =getCookie("niveau_Laboratoire");
		nbSolarium =getCookie("niveau_Solarium");
		nbanalyse =getCookie("niveau__analyse");
		nbcombat =getCookie("niveau__combat");
		nbCaserne =getCookie("niveau_Caserne");
		nbDome =getCookie("niveau_Dome");
		nbLoge =getCookie("niveau_Loge_Impériale");
				}

//######################## archive les niveaux de construction 
//######################## afin de mettre à jour les convois
function archiver_niveaux() {
	cniveau[0]="cniveau"
	var oRegex = new RegExp('(niveau|level)([0-9 ]*)');
	for (i=1; i<14; i++)	{
				rep=oRegex.exec(document.getElementById('batiment'+i).innerHTML);
				cniveau[i]=rep[2]
				}
//	setCookie("Sd_cniveau",cniveau.join(","),7)
	setCookie("niveau_pucerons", cniveau[1],7);
	setCookie("niveau_cochenilles", cniveau[2],7);
	setCookie("niveau_couveuse", cniveau[6],7);
	setCookie("niveau_Entrepot_Nourriture", cniveau[9],7);
	setCookie("niveau_Entrepot_Matériaux", cniveau[10],7);
	setCookie("niveau_Champignonniere", cniveau[3],7);
	setCookie("niveau_Laboratoire", cniveau[8],7);
	setCookie("niveau_Solarium", cniveau[7],7);
	setCookie("niveau__analyse", cniveau[13],7);
	setCookie("niveau__combat", cniveau[4],7);
	setCookie("niveau_Caserne", cniveau[5],7);
	setCookie("niveau_Dome", cniveau[11],7);
	setCookie("niveau_Loge_Impériale", cniveau[12],7);
				}

//######################
function archivage_new_cookie_niveau() {
	cniveau[0]="cniveau"


	var oRegex = new RegExp('(niveau|level)([0-9 ]*)');
	for (i=1; i<14; i++) 	{
				rep=oRegex.exec(document.getElementById('batiment'+i).innerHTML);
				cniveau[i]=rep[2]
				}
	setCookie("niveau_pucerons", cniveau[1],365);
	setCookie("niveau_cochenilles", cniveau[2],365);
	setCookie("niveau_couveuse", cniveau[6],365);
	setCookie("niveau_Entrepot_Nourriture", cniveau[9],365);
	setCookie("niveau_Entrepot_Matériaux", cniveau[10],365);
	setCookie("niveau_Champignonniere", cniveau[3],365);
	setCookie("niveau_Laboratoire", cniveau[8],365);
	setCookie("niveau_Solarium", cniveau[7],365);
	setCookie("niveau__analyse", cniveau[13],365);
	setCookie("niveau__combat", cniveau[4],365);
	setCookie("niveau_Caserne", cniveau[5],365);
	setCookie("niveau_Dome", cniveau[11],365);
	setCookie("niveau_Loge_Impériale", cniveau[12],365);
			}


					
//######################
function cookietempscons(classe)	{
		var divs = document.getElementsByTagName('div');
		var resultats = new Array();
		var cook=1
		for(var i=0; i<divs.length; i++)
		if(divs[i].className == classe)	{
						regms=new RegExp('(([0-9.]*)J )?(([0-9.]*)H )?(([0-9.]*)m )?([0-9.]*)s');
						t=regms.exec(divs[i].innerHTML);
						ok=t || false
		if (ok){
			setCookie("temps"+[cook], t[0],365);
			cook++
			}	
									}
		return resultats;
   
					}

//######################
function envoimaj(classe)	{

	document.getElementById('message').value+="vitesse d'attaque : "+ vitesseattaque +"[hr]"  ;
	document.getElementById('message').value+="Etable à pucerons : "+ nbpucerons +"___"+ tempspucerons +"[hr]" ;
	document.getElementById('message').value+="Couveuse : "+ nbcouveuse +"___"+ tempscouveuse +"[hr]" ;
	document.getElementById('message').value+="Entrepôt de {food} : "+ nbNourriture +"___"+ tempsNourriture +"[hr]" ;
	document.getElementById('message').value+="Entrepôt de {wood} : "+ nbMateriaux +"___"+ tempsMateriaux +"[hr]" ;
	document.getElementById('message').value+="Champignionnière : "+ nbChampignonniere +"___"+ tempsChampignonniere +"[hr]" ;
	document.getElementById('message').value+="Laboratoire : "+ nbLaboratoire +"___"+ tempsLaboratoire +"[hr]" ;
	document.getElementById('message').value+="Solarium : "+ nbSolarium +"___"+ tempsSolarium +"[hr]" ;
	document.getElementById('message').value+="Salle d'analyse : "+ nbanalyse +"___"+ tempsanalyse +"[hr]" ;
	document.getElementById('message').value+="Salle de combat : "+ nbcombat +"___"+ tempscombat +"[hr]" ;
	document.getElementById('message').value+="Caserne : "+ nbCaserne +"___"+ tempsCaserne +"[hr]" ;
	document.getElementById('message').value+="Dôme : "+ nbDome +"___"+ tempsDome +"[hr]" ;
	document.getElementById('message').value+="Loge : "+ nbLoge +"___"+ tempsLoge +"[hr]" ;
   
				}

//######################
function EnvoieAttaqueFlood() {

	var JSNenvoi = urlSearch.substring(urlSearch.indexOf('&jsn=') + 5,urlSearch.indexOf('&bidon='));
	var Envoi = urlSearch.substring(urlSearch.indexOf('&jsn=') + 5,urlSearch.indexOf('&bidon='));
	var table = document.getElementsByTagName('table');
	var comptePlus = document.getElementById('entete').innerHTML.indexOf('boite_compte_plus') >= 0;
	
	var JSN = document.getElementById('unite1').value;
	var SN = document.getElementById('unite2').value;
	var NE = document.getElementById('unite3').value;
	var JS = document.getElementById('unite4').value;
	var S = document.getElementById('unite5').value;
	var C = document.getElementById('unite6').value;
	var Ce = document.getElementById('unite14').value;
	var A = document.getElementById('unite7').value;
	var Ae = document.getElementById('unite8').value;
	var Se = document.getElementById('unite9').value;
	var Ta = document.getElementById('unite10').value;
	var Tae = document.getElementById('unite13').value;
	var T = document.getElementById('unite11').value;
	var Te = document.getElementById('unite12').value;
	
	if ( Envoi - JSN <= 0 ) { JSN = Envoi; SN=0; NE=0; JS=0; S=0; C=0; Ce=0; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN <= 0 ) { JSN = JSN; SN= Envoi - JSN; NE=0; JS=0; S=0; C=0; Ce=0; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE<= 0 ) { JSN = JSN; SN= SN; NE=Envoi - JSN - SN; JS=0; S=0; C=0; Ce=0; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS<= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=Envoi - JSN - SN - NE; S=0; C=0; Ce=0; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S<= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=Envoi - JSN - SN - NE - JS; C=0; Ce=0; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C<= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=Envoi - JSN - SN - NE - JS - S; Ce=0; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce <= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Envoi - JSN - SN - NE - JS - S - C; A=0; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A <= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=Envoi - JSN - SN - NE - JS - S - C - Ce; Ae=0; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae <= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Envoi - JSN - SN - NE - JS - S - C - Ce - A; Se=0; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se <= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Ae; Se=Envoi - JSN - SN - NE - JS - S - C - Ce - A - Ae; Ta=0; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta <= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Ae; Se=Se; Ta=Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se; Tae=0; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta - Tae<= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Ae; Se=Se; Ta=Ta; Tae=Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta; T=0; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta - Tae - T<= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Ae; Se=Se; Ta=Ta; Tae=Tae; T=Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta - Tae; Te=0; }
	else if ( Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta - Tae - T - Te<= 0 ) { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Ae; Se=Se; Ta=Ta; Tae=Tae; T=T; Te=Envoi - JSN - SN - NE - JS - S - C - Ce - A  - Ae - Se - Ta - Tae - T; }
	else { JSN = JSN; SN= SN; NE=NE; JS=JS; S=S; C=C; Ce=Ce; A=A; Ae=Ae; Se=Se; Ta=Ta; Tae=Tae; T=T; Te=Te; }
	
	
	var form = document.getElementsByTagName('form');
	if (comptePlus ) {
	table[2].innerHTML = table[2].innerHTML + '<input type="hidden" name="ChoixArmee" value="Attaquer!">';
	
	document.getElementById('unite1').value=JSN; 
	document.getElementById('unite2').value=SN; 
	document.getElementById('unite3').value=NE; 
	document.getElementById('unite4').value=JS; 
	document.getElementById('unite5').value=S; 
	document.getElementById('unite6').value=C; 
	document.getElementById('unite14').value=Ce; 
	document.getElementById('unite7').value=A; 
	document.getElementById('unite8').value=Ae; 
	document.getElementById('unite9').value=Se; 
	document.getElementById('unite10').value=Ta; 
	document.getElementById('unite13').value=Tae; 
	document.getElementById('unite11').value=T; 
	document.getElementById('unite12').value=Te; 

		form[1].submit();	}
	
	
	
		else {
		
	table[1].innerHTML = table[1].innerHTML + '<input type="hidden" name="ChoixArmee" value="Attaquer!">';
	document.getElementById('unite1').value=JSN; 
	document.getElementById('unite2').value=SN; 
	document.getElementById('unite3').value=NE; 
	document.getElementById('unite4').value=JS; 
	document.getElementById('unite5').value=S; 
	document.getElementById('unite6').value=C; 
	document.getElementById('unite14').value=Ce; 
	document.getElementById('unite7').value=A; 
	document.getElementById('unite8').value=Ae; 
	document.getElementById('unite9').value=Se; 
	document.getElementById('unite10').value=Ta; 
	document.getElementById('unite13').value=Tae; 
	document.getElementById('unite11').value=T; 
	document.getElementById('unite12').value=Te; 
		form[0].submit();	}
	
}
				


//######################
function dateArriveeAttaques() {
	var contenu = "";
	var ar = document.getElementsByTagName("span");
	var n=0;
	var b= 0
	var d= 0
	for(i=1; i<ar.length; i++)	{
		if (ar[i].id.substring(0,7) == 'attaque')	{ 
				var a = ar[i].parentNode.innerHTML.indexOf(('Membre.php?Pseudo='),b) ;
				var b = ar[i].parentNode.innerHTML.indexOf('"',a);
				var nom = ar[i].parentNode.innerHTML.substring(a+18,b);

				var c = ar[i].parentNode.innerHTML.indexOf(('Troupes en'),b) ;
				var d = ar[i].parentNode.innerHTML.indexOf('<',c);
				var armee = ar[i].parentNode.innerHTML.substring(c,d);
			var tabl = document.getElementById(ar[i].id).innerHTML.split(' ');

			var tt=0;
			var dd=0;
			var hh=0;
			var mm=0;
			var ss=0;
			for (j=0;j<tabl.length;j=j+2){
				switch(tabl[j+1].substring(0,3))
				{
					case 'jou':dd= tabl[j];break;
					case 'day':dd= tabl[j];break;
					case 'heu':hh= tabl[j];break;
					case 'hou':hh= tabl[j];break;
					case 'min':mm= tabl[j];break;
					case 'sec':ss= tabl[j];break;
				}
			}
			tt=dd*86400+hh*3600+mm*60+ss*1;
			tt=tt*1000;
			var JourArrivee = new Date();
			JourArrivee.setTime(JourArrivee.getTime() + tt);
			var Jour = JourArrivee.getDate();       // rÃ¯Â¿Â½cup. du jour
			var Mois = JourArrivee.getMonth() + 1;  // calcul du mois
			var Annee = JourArrivee.getYear();        // rÃ¯Â¿Â½cup. de l'annÃ¯Â¿Â½e
			Jour = ((Jour < 10) ? "0" :"") + Jour;
			Mois = ((Mois < 10) ? "0" : "") + Mois;
			if (Annee < 1900) Annee -= 100;
			Annee = ((Annee < 10) ? "0" : "") + Annee;
			var Heure = JourArrivee.getHours();     // rÃ¯Â¿Â½cup. heure
			var Minute = JourArrivee.getMinutes();  // rÃ¯Â¿Â½cup. minutes
			var Seconde = JourArrivee.getSeconds(); // rÃ¯Â¿Â½cup. secondes
			Heure = ((Heure < 10) ? "0" : "") + Heure;
			Minute = ((Minute < 10) ? "0" : "") + Minute;
			Seconde = ((Seconde < 10) ? "0" : "") + Seconde;
			arrivee=' Arrivée le ' + Jour + '-' + Mois + '-' + Annee + ' à ' + Heure + ':' + Minute + ':' + Seconde
			contenu =contenu+ "Vous allez attaquer [b]" + nom +"[/b] dans "+ hh+"H "+mm+"m "+ss+"s, Arrivée le " + Jour + "-" + Mois + "-" + Annee + " à " + Heure + ":" + Minute + ":" + Seconde+"--"+ armee+ "[hr]";
		var sep = "\"" + ar[i].id + "\");<\/script>";
		var partie = document.getElementById("contenu" ).innerHTML.split(sep);
	if (!comptePlus) 
			{
			document.getElementById("contenu" ).innerHTML = partie[0] + sep +'- <i><small>'+ arrivee + '</small></i>'+ partie[1];
			}
			
			
								}

					}
	document.getElementById('message').value+= contenu ;
				}


// codage des valeur des cookie

//######################
function setCookie(sName, sValue,iJour)	{
	var today = new Date(), expires = new Date();
	expires.setTime(today.getTime() + (iJour*24*60*60*1000));
	//if (codeURI){sValeur=encodeURIComponent(sValeur);}
	document.cookie = sName + "=" +sValue + ";expires=" + expires.toUTCString();
					}

//######################

function getCookie(name)	{
	if (document.cookie.length > 0)	{
	var texte=name+"=";
	var table=document.cookie.split(/;/);
	var valeur="";
		for (i=0;i<table.length;i++)	{
			if(table[i].indexOf(texte)!= -1)	{
			valeur = table[i].substring(Number(texte.length + table[i].indexOf( texte)), table[i].length);
						}
								}
					}
	return valeur;
				}

//######################
function units (nbr,Deci)	{
	Deci=Deci || 0
	un= new Array();
	un[0]=1; un[1]=' '

	nbr=nbr/un[0]
	txt=formatsep(nbr.toFixed(Deci))
	txt+=un[1]
	return txt

				}


//######################
function formatsep(nStr, outMil,inD, outD)	{
	inD=inD || '.';
	outD=outD || '.';
	sep=outMil || ' ';
	
	nStr += '';
	var dpos = nStr.indexOf(inD);
	var nStrEnd = '';
	if (dpos != -1) 	{
		nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
		nStr = nStr.substring(0, dpos);
				}
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr))		{
		nStr = nStr.replace(rgx, '$1' + sep + '$2');
					}
	return nStr + nStrEnd;
						}


//######################
function supprimerPub() {

			document.getElementById('pub_rectangle').style.display = 'none'

 
			}


