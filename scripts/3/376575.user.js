// ==UserScript==
// @name        Fast-PC Pharaon
// @namespace   http://pharaon-2.sso.francetelecom.fr/pharaon/index.jsp*
// @include     http://pharaon-2.sso.francetelecom.fr/pharaon/index.jsp*
// @version     1.6.10
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==


//Déclaration du gassi à modifier
//gassi = "MQKL7216";
//TEST3


//Variables infobulle
var IB=new Object;
var posX=0;posY=0;
var xOffset=10;yOffset=10;

//Changement de la police
//$(document.body).css('font-size','13px');

//Lancement du script
window.onload = creationBouton();

/**************************************\
* Crée le bouton
\**************************************/
function creationBouton(){
    //On crée d'abord le ul
    var ul = document.createElement('UL');
    ul.setAttribute("class","menu-list");
	ul.setAttribute("Style","z-index:1000");
    document.body.appendChild(ul);
    
    //On crée ensuite le li
    var li = document.createElement('LI');
    ul.appendChild(li);
    
    //On crée le div
    var div = document.createElement('DIV');
    li.appendChild(div);
    
    //On crée le lien
    var a = document.createElement('a');
    var nom = document.createTextNode("Fast-PC");
    a.appendChild(nom);
    a.setAttribute("href","#");
    a.setAttribute("tabindex","0");
    a.setAttribute("title","Fast-Pc");
    div.appendChild(a);
        
    //On crée le submenu ul
    var ul2 = document.createElement('UL');
    att2 = document.createAttribute("class");
    att2.value="submenu-list";
	ul2.setAttribute("Style","z-index:1000");
    ul2.setAttributeNode(att2);
    div.appendChild(ul2);
     
    // On crée le lien du li
    var li4 = document.createElement('LI');
    ul2.appendChild(li4); 
    var a3 = document.createElement('a');
    var nom3 = document.createTextNode("Actualiser le CRA");
    a3.appendChild(nom3);
        
    //Action du lien
    a3.addEventListener('click', function() {
        recherche();
    }, true);
    
    var tab3 = document.createAttribute("tabindex");
    tab3.value="0";
    a3.setAttributeNode(tab3);
    
    var title3 = document.createAttribute("title");
    title3.value="Charger les informations";
    a3.setAttributeNode(title3);
    
    li4.appendChild(a3);
    
     //On crée le lien du li de cap-pc
    var li5 = document.createElement('LI');
    ul2.appendChild(li5); 
    var a4 = document.createElement('a');
    var nom4 = document.createTextNode("Ouvrir CAP-PC sur la demande ouverte");
    a4.appendChild(nom4);
        
    //Action du lien
    a4.addEventListener('click', function() {
        getCapPcInfo();
    }, true);
    
    var tab4 = document.createAttribute("tabindex");
    tab4.value="0";
    a4.setAttributeNode(tab4);
    
    var title4 = document.createAttribute("title");
    title4.value="Liens vers Cap-pc";
    a4.setAttributeNode(title4);
    
    li5.appendChild(a4);
    
     //On crée le lien pour modifier une adresse
    var li6 = document.createElement('LI');
    ul2.appendChild(li6); 
    
    var a5 = document.createElement('a');
    var nom5 = document.createTextNode("Modifier une demande");
    a5.appendChild(nom5);
        
    //Action du lien
    a5.addEventListener('click', function() {
        modif();
    }, true);
    
    a5.setAttribute("tabindex","0");
    a5.setAttribute("title","Modifier l'adresse d'une demande");
    
    li6.appendChild(a5);
			
	//On crée le lien TEST
	// var li7 = document.createElement('LI');
    // ul2.appendChild(li7);
	
    // var a6 = document.createElement('a');
    // var nom6 = document.createTextNode("TEST");
    // a6.appendChild(nom6);
    // var h3 = document.createAttribute("href");
    // h3.value=adresse+"&macro=phar&DEMREF=111111&COMPTE=DOC.VT&UF=ETU";
    // a6.setAttributeNode(h3);
   
    // a6.setAttribute("tabindex","0");
    // a6.setAttribute("title","TEST");
	// a6.setAttribute("target","_blank");
  
    // li7.appendChild(a6);
	
	// Mettre à jour la liste des demandes passives
	var liDMAA = document.createElement('LI');
    ul2.appendChild(liDMAA);
	
    var aDMAA = document.createElement('a');
    var nomDMAA = document.createTextNode("Maj requête Fast-pc");
    aDMAA.appendChild(nomDMAA);
	//Action du lien
    aDMAA.addEventListener('click', function() {
		// On crée le bouton
        creeBoutonDMAA();
    }, true);
    
    aDMAA.setAttribute("tabindex","0");
    aDMAA.setAttribute("title","Maj requête Fast-pc");
  
    liDMAA.appendChild(aDMAA);
	
	//////////////////////////////////////////////Deuxieme bouton
	//On crée ensuite le li
    var li2 = document.createElement('LI');
    ul.appendChild(li2);
    
    //On crée le div
    var div2 = document.createElement('DIV');
    li2.appendChild(div2);
	// On crée le lien pour le bouton
    var a65 = document.createElement('a');
    var nom65 = document.createTextNode("Liens");
    a65.appendChild(nom65);
    a65.setAttribute("href","#");
    a65.setAttribute("tabindex","0");
    a65.setAttribute("title","Liens");
    div2.appendChild(a65);
	
	 //On crée le submenu ul
    var ulBouton2 = document.createElement('UL');
    att2 = document.createAttribute("class");
    att2.value="submenu-list";
	ulBouton2.setAttribute("Style","z-index:1000");
    ulBouton2.setAttributeNode(att2);
    div2.appendChild(ulBouton2);

	//Ouvrir Fast-PC
    var li3 = document.createElement('LI');
    var a2 = document.createElement('a');
    var nom2 = document.createTextNode("Ouvrir Fast-Pc");
    a2.appendChild(nom2);
    a2.setAttribute("href","http://127.0.0.1/fast-pc/");
    a2.setAttribute("tabindex","0");
	a2.setAttribute("target","_blank");
    a2.setAttribute("title","Ouvrir Fast-Pc");
    li3.appendChild(a2);
	ulBouton2.appendChild(li3);
	
	//Ouvrir CAP-PC
    var liCap = document.createElement('LI');
    var aCap = document.createElement('a');
    var nomCap = document.createTextNode("Ouvrir Cap-Pc");
    aCap.appendChild(nomCap);
    aCap.setAttribute("href","http://62.161.10.71/");
    aCap.setAttribute("tabindex","0");
	aCap.setAttribute("target","_blank");
    aCap.setAttribute("title","Ouvrir Fast-Pc");
    liCap.appendChild(aCap);
	ulBouton2.appendChild(liCap);
	
	//Ouvrir 42C
	var adresse ="http://puv-emu.sso.francetelecom.fr/intranex/emulator/intranexTag.jsp?role=PUV-03%20RBK-PRD-ZACHARIE-S4-ua&sm_universalid=&ftlogin=xxxxxxxx&fttypelogin=GENERIC&ftintranexconnection=PUV%20Zacharie_DED_Sud_Est&login=login&password=Password&confirm=new%20password%20again&success=GASSI_USER&expired=New%20password&rejected=You%20entered%20an%20invalid%20login%20name%20or%20password&ftrolelabel=Zacharie+%2842C-20H-GPC%29+SUD-EST&ftusercredentials=&JAVAVENDOR=Sun+Microsystems+Inc.&JAVAVERSION=1.6.0_16&TYPEJVM=3&sm_universalid1=xxxxxxxx";
	var li42c = document.createElement('LI');		
    var a42c = document.createElement('a');
    var nom42c = document.createTextNode("Ouvrir 42C");
    a42c.appendChild(nom42c);
	a42c.setAttribute("href",adresse);
    a42c.setAttribute("tabindex","0");
    a42c.setAttribute("title","42C");
	a42c.setAttribute("target","_blank");
    li42c.appendChild(a42c);
	ulBouton2.appendChild(li42c);
	
	//////////////////////////////////////////////Troisiéme bouton
	//On crée ensuite le li
    var li3 = document.createElement('LI');
    ul.appendChild(li3);
    
    //On crée le div
    var div3 = document.createElement('DIV');
    li3.appendChild(div3);
	// On crée le lien pour le bouton
    var a66 = document.createElement('a');
    var nom66 = document.createTextNode("Autre");
    a66.appendChild(nom66);
    a66.setAttribute("href","#");
    a66.setAttribute("tabindex","0");
    a66.setAttribute("title","Autre");
    div3.appendChild(a66);
	
	 //On crée le submenu ul
    var ulBouton3 = document.createElement('UL');
    att3 = document.createAttribute("class");
    att3.value="submenu-list";
	ulBouton3.setAttribute("Style","z-index:1000");
    ulBouton3.setAttributeNode(att3);
    div3.appendChild(ulBouton3);
	
	//Taille de la police
		//Label
		var liPolice = document.createElement('LI');
		var lPolice = document.createElement('label');
		var nomPolice = document.createTextNode("Taille de la police     ");
		lPolice.appendChild(nomPolice);
		liPolice.appendChild(lPolice);
		ulBouton3.appendChild(liPolice);
		//Choix
		var select = document.createElement('select');
		select.setAttribute("id","fastPolice");
		var option11 = document.createElement("option");
		option11.text = "11";
		var option12 = document.createElement("option");
		option12.text = "12";
		var option13 = document.createElement("option");
		option13.text = "13";
		var option14 = document.createElement("option");
		option14.text = "14";
		var option15 = document.createElement("option");
		option15.text = "15";
		select.add(option11);
		select.add(option12);
		select.add(option13);
		select.add(option14);
		select.add(option15);
		liPolice.appendChild(select);
		
		select.addEventListener('change', function() {
			t = $( "#fastPolice option:selected" ).text();
			$(document.body).css('font-size',t+'px');
		}, true);

}  

/**************************************\
* Fonction qui affiche le cra pharaon
\**************************************/
function recherche(){
    var recherchePop = document.getElementById('popup-cra');
	if(document.getElementById('popup-cra')!= undefined){
		if(recherchePop.length == 0){
			// Previens l'utilisateur que le cra n'existe pas
			alert("La fenêtre du cra est introuvable");
		}else{
			//On récupérer le tableau principale
			var tableauPrincipale = document.getElementsByClassName('gwt-TabPanel noImg order-adresse-eqt tabBarItem-aladresse');
			//alert("nombre de result-table"+tableauPrincipale.length);
			if(tableauPrincipale.length != 1){
				alert("La fenêtre cra n'est pas chargée correctement");
			}else{
				//On récupére le div
				var divSup = document.getElementsByClassName('gwt-TabPanelBottom');
				//On parcours par noeud
				if (divSup[0].hasChildNodes()) {
					//alert("divSup a "+divSup[0].hasChildNodes().length+" enfants, félicitation !!");
					// On va chercher le 4éme div
					var div = divSup[0].childNodes.item(4);
					//alert(div.innerHTML);
					if(div.hasAttribute("style")){
						var attr = div.getAttributeNode("style");
						if(attr.value.indexOf("display: none") != -1){
							alert("L'onglet PC n'est pas séléctionné");
						}else{
							//On test d'abord si les boutons sont deja présent
							if(document.getElementById('fastpc_iframe_cra') != undefined){
								divSup[0].removeChild(document.getElementById('fastpc_iframe_cra'));
							}
							
							//On récupere les élements
							var blocSugg = document.getElementsByClassName('suggest-panel filters');
							var divTab = blocSugg[0].getElementsByTagName("DIV");
							//On récupére ND
							var demande = document.getElementsByClassName("pharaon-disclosure-panel-open");
							var dem = demande[0].textContent.substring(8,20); 
							//BASE
							var base = divTab[2].getElementsByClassName('gwt-SuggestBox')[0].value;
							base = base.substr(0,2);
							//COMMUNE
							var commune = divTab[3].getElementsByClassName('gwt-SuggestBox')[0].value;
							commune = commune.substr(0,5);
							//VOIE
							var voie = divTab[4].getElementsByClassName('gwt-SuggestBox')[0].value;
							voie = voie.substr(0,4);
							//NUMERO
							var numero = divTab[5].getElementsByClassName('gwt-SuggestBox')[0].value;
														
							//On crée la frame							
							//div.setAttribute("style","display:none;");
							var iframe = document.createElement('iframe');
							iframe.setAttribute("ID","fastpc_iframe_cra");
							iframe.setAttribute("style","width:800px; height:500px; border :none;");
							iframe.src = returnFastCra(dem,base,commune,voie,numero);
							
							divSup[0].appendChild(iframe);
						}                   
					}else{
						alert("La fenêtre cra n'est pas chargée correctement");
					}
				}else{
					alert("La fenêtre cra n'est pas chargée correctement");
				}
			}        
		}
	}else{
		// Previens l'utilisateur que le cra n'existe pas
		alert("La fenêtre du cra est introuvable");
	}
}

// @Obsolete
function afficherFast(button){
    //CENTRE ZONE PC 
    var centre = button.getAttributeNode("centre").value;
    var zone = button.getAttributeNode("zone").value;
    var pc = button.getAttributeNode("pc").value;
    //alert("Centre : "+centre+" Zone : "+zone+" PC : "+pc);
    
    //DEMANDE
    var text = document.getElementsByClassName('pharaon-disclosure-panel-open')[0].textContent;
    var demande = text.substring(8,20);
   
    //GASSI
   

    //Supprime si elle existe deja
    if(document.getElementById("fastpc_div")){
        var element = document.getElementById("fastpc_div");
        element.parentNode.removeChild(element);
    }
   
    //On cree l'iframe
    var iframe = document.createElement('iframe');
    iframe.setAttribute("ID","fastpc_iframe");
    iframe.style.border="none";
    iframe.style.height ="300px";
    iframe.style.width ="98.4%";
    //iframe.src = "http://127.0.0.1/index.php?CENTRE="+centre+"&ZONE="+zone+"&PC="+pc+"&ND="+demande+"&TYPE_PROCEDURE=Etude v2&GASSI="+gassi+"&PHARAON=INT2";
    iframe.src = returnFast(demande,centre,zone,pc);
   
   //On cree le div
    var div = document.createElement('div');
    div.setAttribute("class","suggest-panel");
    div.setAttribute("id","fastpc_div");
    div.appendChild(iframe);
    document.getElementsByClassName('dialogMiddleCenterInner dialogContent')[0].appendChild(div);
}

/**************************************\
* Fonction qui recupére l'adresse pour ouvrir
* Cap-pc
\**************************************/
function getCapPcInfo(){
    // On récupére la demande
    var demande = document.getElementsByClassName("pharaon-disclosure-panel-open");
    if(demande.length==0){
        alert("Aucune demande n'est ouverte");
    }else{
        var dem = demande[0].textContent.substring(8,20); 
        // On récupére l'adresse
        var blocDemande = document.getElementsByClassName("bloc-demande-reference");
        if(blocDemande.length ==0){
            alert("Erreur"); 
        }else{
            var blocField = blocDemande[0].getElementsByTagName("fieldset");
            if(blocField.length ==0){
                alert("Erreur");
            }else{
                var content = blocField[0].getElementsByTagName("p");
                var adresse="";
                for (var i=0;i<content.length;i++){
                   adresse = adresse+content[i].textContent[0];
                    for(var t=1;t<content[i].textContent.length;t++){
                        //alert(content[i].textContent.charAt(t)+" et son code est : "+content[i].textContent.charCodeAt(t));
                        if(content[i].textContent.charCodeAt(t)== 160 || 
                                content[i].textContent.charCodeAt(t)== 10 || 
                                    content[i].textContent.charCodeAt(t)== 09){ //si c'est un espace
                            //alert("c'est un espace");
                            if(content[i].textContent.charCodeAt(t-1)!== 160 && 
                                content[i].textContent.charCodeAt(t-1)!== 10 && 
                                    content[i].textContent.charCodeAt(t-1)!== 09 ){
                                //On l'ajoute car précédé d'un caractére
                                adresse = adresse+content[i].textContent.charAt(t);
                            }
                        }else{
                            //alert("On l'ajoute car c'est un caractére");
                            adresse = adresse+content[i].textContent.charAt(t);
                        }
                    }
                }
            }
        }
    }
    //On traite l'adresse pour supprimer le (0074)
    adresse = adresse.substring(0,adresse.indexOf("("))+adresse.substring(adresse.indexOf(")")+1);
    //On traite pour la virgule
    adresse = adresse.substring(0,adresse.indexOf(","))+adresse.substring(adresse.indexOf(",")+1);
        
    //On traite l'adresse avec les données
    //cappc = cappc+"?ND="+dem+"&ADRESSE="+adresse+"&GASSI="+gassi
    
    ouvertureCapPC(dem,adresse);
    
    
}

/**************************************\
* Fonction qui ouvre un lien vers cap-pc
\**************************************/
function ouvertureCapPC(dem,adresse){
    //On cherche le nom et le prénom
    var phrase = document.getElementsByClassName("username")[0].textContent;
    phrase = phrase.substring(10);
    var nom = phrase.substring(phrase.indexOf(" ")+1, phrase.length);
    var prenom = phrase.substring(0,phrase.indexOf(" "));
   
    var url = "http://psrparis.si.francetelecom.fr/allix/index.php?nom="+nom+"&prenom="+prenom+"&mail=&alliance=&telephone=&ND="+dem+"&TO=CAP"+"&ADRESSE="+adresse;
    
    //On ouvre le lien
    window.open(url,fullscreen="yes");
}

/**************************************\
* Crée et retourne l'adresse pour un cra
\**************************************/
function returnFastCra(dem,base,commune,voie,numero){
    //On cherche le nom et le prénom
    var phrase = document.getElementsByClassName("username")[0].textContent;
    phrase = phrase.substring(10);
    var nom = phrase.substring(phrase.indexOf(" ")+1, phrase.length);
    var prenom = phrase.substring(0,phrase.indexOf(" "));
   
    return url = "http://psrparis.si.francetelecom.fr/allix/index.php?nom="+nom+"&prenom="+prenom+"&mail=&alliance=&telephone=&TO=CRA&ND="+dem+"&BASE="+base+"&COMMUNE="+commune+"&VOIE="+voie+"&NUMERO="+numero;
}

/**************************************\
* Crée et retourne l'adresse pour un gis
\**************************************/
function returnFastGis(NDV,nv,commune,ens,bat,esc,etg,log,por,dem){
    //On cherche le nom et le prénom
    var phrase = document.getElementsByClassName("username")[0].textContent;
    phrase = phrase.substring(10);
    var nom = phrase.substring(phrase.indexOf(" ")+1, phrase.length);
    var prenom = phrase.substring(0,phrase.indexOf(" "));
   
	//alert(NDV+" "+nv+" "+commune+" "+ens+" "+bat+" "+esc+" "+etg+" "+log+" "+por+" "+dem);
    return url = "http://psrparis.si.francetelecom.fr/allix/index.php?nom="+nom+"&prenom="+prenom+"&mail=&alliance=&telephone=&TO=GIS&ND="+dem+"&COMMUNE="+commune+"&NVOIE="+nv+"&NDV="+NDV+"&ENS="+ens+"&BAT="+bat+"&ESC="+esc+"&ETG="+etg+"&LOG="+log+"&POR="+por;
}

/**************************************\
* Crée et retourne l'adresse pour un maa
\**************************************/
function returnFastMaa(text){
	//On cherche le nom et le prénom
    var phrase = document.getElementsByClassName("username")[0].textContent;
    phrase = phrase.substring(10);
    var nom = phrase.substring(phrase.indexOf(" ")+1, phrase.length);
    var prenom = phrase.substring(0,phrase.indexOf(" "));
   
	//alert(NDV+" "+nv+" "+commune+" "+ens+" "+bat+" "+esc+" "+etg+" "+log+" "+por+" "+dem);
    return url = "http://psrparis.si.francetelecom.fr/allix/index.php?nom="+nom+"&prenom="+prenom+"&mail=&alliance=&telephone=&TO=MAA&Text="+text;
}

/**************************************\
* Traitement spécial de l'adresse
\**************************************/
function traitementAdresse(adr){
	var adresse= adr.textContent[0];	   
	for(var t=1;t<adr.textContent.length;t++){
		//alert(adr.textContent.charAt(t)+" et son code est : "+adr.textContent.charCodeAt(t));
		if(adr.textContent.charCodeAt(t)== 160 || 
				adr.textContent.charCodeAt(t)== 10 || 
					adr.textContent.charCodeAt(t)== 09 || 
					adr.textContent.charCodeAt(t)== 32){ //si c'est un espace
			//alert("c'est un espace");
			if(adr.textContent.charCodeAt(t-1)!== 160 && 
				adr.textContent.charCodeAt(t-1)!== 10 && 
					adr.textContent.charCodeAt(t-1)!== 09 && 
					adr.textContent.charCodeAt(t-1)!== 32){
				//On l'ajoute car précédé d'un caractére
				adresse = adresse+adr.textContent.charAt(t);
			}
		}else{
			//alert("On l'ajoute car c'est un caractére");
			adresse = adresse+adr.textContent.charAt(t);
		}
	}
	
	//On traite l'adresse pour supprimer le (0074)
    adresse = adresse.substring(0,adresse.indexOf("("))+adresse.substring(adresse.indexOf(")")+1);
    //On traite pour la virgule
    adresse = adresse.substring(0,adresse.indexOf(","))+adresse.substring(adresse.indexOf(",")+1);
	
	return adresse;
}

/**************************************\
* Retourne le code voie d'une adresse
\**************************************/
function returnCodeVoie(adr){
	return codeVoie = adr.substr(adr.indexOf("(")+1,4);
}

/**************************************\
* Retourne le code postale d'une adresse
\**************************************/
function returnCodePostale(adr){
	return codeVoie = adr.substr(adr.indexOf("(")+1,5);
}

/**************************************\
* Fonction qui permet le lancement du gis
\**************************************/
function modif(){
	InitBulle("navy","#FFCC66","LightGray",1);
	var demande = document.getElementsByClassName("pharaon-disclosure-panel-open");
    if(demande.length==0){
        alert("Aucune demande n'est ouverte");
    }else{
		var dem = demande[0].textContent.substring(8,20); 
        // On récupére l'adresse
        var blocDemande = document.getElementsByClassName("bloc-demande-reference");
        if(blocDemande.length ==0){
            alert("Erreur"); 
        }else{
			testDemandeOpen();
            //var blocField = blocDemande[0].getElementsByTagName("fieldset");
			var blocField = document.getElementById("fast_div").getElementsByTagName("fieldset");
			if(blocField.length ==0){
                alert("Erreur");
            }else{
				//ADRESSE
                var content = blocField[0].getElementsByTagName("p");
				var codeVoie = returnCodeVoie(content[0].textContent);
				var codePost = returnCodePostale(content[1].textContent);
                var adresse="";
                for (var i=0;i<content.length;i++){
                   adresse = adresse+traitementAdresse(content[i]);
                }
				
				//On va traiter l'adresse pour sortir les infos
					// On test pour un numéro de voix
					//alert(adresse.charCodeAt(2));
					var NDV = adresse.substring(0,adresse.indexOf(String.fromCharCode(160)));
					var regex = new RegExp(/([0-9])/);
					if (regex.test (NDV)) {
						//alert(NDV+" est une voie");
					}else{
						//alert(NDV+" n'est pas un numéro de voie");
						NDV='';
					}
				
				//On vide
				blocField[0].removeChild(content[0]); 
				blocField[0].removeChild(content[0]);
				
				var NDEMOPEN = document.getElementById("fast_div_dem").textContent.substring(8,20);	
								
				//DIV																			NUMERO DANS LA VOIE
				var divNDV = document.createElement('div');
				blocField[0].insertBefore(divNDV,blocField[0].firstChild);
				
				// Ajouter le label du numéro dans la voie
				var labelNdV = document.createElement('label');
				labelNdV.innerHTML = "Numéro dans la voie : ";
				divNDV.appendChild(labelNdV);
				
				// Ajouter le input  du numéro dans la voie
				var spanNDV = document.createElement('span');
				divNDV.appendChild(spanNDV);
				
				var inputNdv = document.createElement('input');
				inputNdv.setAttribute("value",NDV);
				inputNdv.setAttribute("type","text");
				inputNdv.setAttribute("size","45");
				inputNdv.setAttribute("id","fast_ndvoie_"+NDEMOPEN);
				spanNDV.appendChild(inputNdv);
				
				
				
				//DIV																			NUMERO DE VOIE	
				var div = document.createElement('div');
				blocField[0].insertBefore(div,blocField[0].firstChild);
				
				//Ajouter le label du numéro de voie
				var labelNv = document.createElement('label');
				labelNv.innerHTML = "Numéro de voie <font color='#ff6600'>*</font> : ";
				div.appendChild(labelNv);
				
				labelNv.onmouseover = function() {
					AffBulle("<ul>Entrer uniquement le code Rivoli</ul>");
				}
				
				labelNv.onmouseout = function() {
					HideBulle();
				}
								
				var span = document.createElement('span');
				div.appendChild(span);
				
				//Ajouter le input  du numéro de voie
				var inputNv = document.createElement('input');
				inputNv.setAttribute("value",codeVoie);
				inputNv.setAttribute("type","text");
				inputNv.setAttribute("size","45");
				inputNv.setAttribute("id","fast_nvoie_"+NDEMOPEN);
				span.appendChild(inputNv);
				
				
				//Ajouter le label de la commune												COMMUNE
				//DIV
				var div3 = document.createElement('div');
				blocField[0].insertBefore(div3,blocField[0].firstChild);
				
				var labelCo = document.createElement('label');
				labelCo.innerHTML = "Commune <font color='#ff6600'>*</font> : ";
				div3.appendChild(labelCo);
				
				labelCo.onmouseover = function() {
					AffBulle("Entrer uniquement le code Rivoli");
				}
				
				labelCo.onmouseout = function() {
					HideBulle();
				}
												
				var span = document.createElement('span');
				div3.appendChild(span);
				
				//Ajouter le input de la commune
				var inputlabelCo = document.createElement('input');
				inputlabelCo.setAttribute("value",codePost);
				inputlabelCo.setAttribute("type","text");
				inputlabelCo.setAttribute("size","45");
				inputlabelCo.setAttribute("id","fast_commune_"+NDEMOPEN);
				span.appendChild(inputlabelCo);
					
            }
			
			//LES DIV
			var div = blocField[0].getElementsByTagName("DIV");
			for(var i=3;i<div.length;i++){
				var span = div[i].getElementsByTagName("SPAN");
				var label = div[i].getElementsByTagName("LABEL")[0].textContent.trim();
				label = label.substring(0,label.length-2);
				var text = span[0].textContent;
				
				span[0].innerHTML =""; 
				//Ajouter le input
				var input = document.createElement('input');
				input.setAttribute("value",text);
				input.setAttribute("type","text");
				input.setAttribute("size","45");
				input.setAttribute("id","fast_"+label+"_"+NDEMOPEN);
				span[0].appendChild(input);
			}
			
			//Le bouton
			var input = document.createElement('input');
			input.setAttribute("value","Modifier la demande et refaire l'étude");
			input.setAttribute("type","button");
			input.setAttribute("class","standard-button");
			blocField[0].appendChild(input);
						
			input.addEventListener('click', function() {
				
				var NDV =  document.getElementById("fast_ndvoie_"+NDEMOPEN).value;
				var nv = document.getElementById("fast_nvoie_"+NDEMOPEN).value;
				var commune = document.getElementById("fast_commune_"+NDEMOPEN).value;
				var ens = document.getElementById("fast_Ensemble_"+NDEMOPEN).value;
				var bat = document.getElementById("fast_Bâtiment_"+NDEMOPEN).value;
				var esc = document.getElementById("fast_Escalier_"+NDEMOPEN).value;
				var etg = document.getElementById("fast_Etage_"+NDEMOPEN).value;
				var log = document.getElementById("fast_Logo_"+NDEMOPEN).value;
				var por = document.getElementById("fast_Porte_"+NDEMOPEN).value;
				
				//On test d'abord si la frame est deja présent
				if(document.getElementById('fastpc_iframe_gis') != undefined){
					$( "#fastpc_iframe_gis" ).remove();
				}
				
				//On crée la frame							
				var iframe = document.createElement('iframe');
				iframe.setAttribute("ID","fastpc_iframe_gis");
				iframe.setAttribute("style","width:800px; height:500px; border :none;");
				iframe.src = returnFastGis(NDV,nv,commune,ens,bat,esc,etg,log,por,NDEMOPEN);
				
				blocField[0].appendChild(iframe);
				
			}, true);
        }
    }
  
}

/**************************************\
* Test et marque la demande ouverte
\**************************************/
function testDemandeOpen(){
	$(".bloc-demande-reference").parent().parent().each(function(){
		if($(this).attr("style") == "display: none;"){
			$(this).attr("id","fast_div_pas");
			$(this).parent().find("h2").attr("id","fast_div_pas_dem");
		}else{
			$(this).attr("id","fast_div");
			$(this).parent().find("h2").attr("id","fast_div_dem");
		}
	});	
		
}

/**************************************\
* Remplace un caractére dans une chaine
\**************************************/
function remplace(chaine, position, caractere) {
	return chaine.substring(0,position-1) + caractere +chaine.substring(position);
}

/**************************************\
* Crée le bouton pour MAA
\**************************************/
function creeBoutonDMAA(){
	// var input = document.createElement('input');
	// input.setAttribute("value","test");
	// input.setAttribute("type","text");
	// input.setAttribute("size","45");
	//input.setAttribute("id","fast_"+label+"_"+NDEMOPEN);
	if($("#fast-pc_maa").length){
		// On supprime le div
		$("#fast-pc_maa2").remove();
		$("#fast-pc_maa").remove();
		creeBoutonDMAA();
	}else{
				
		// On ajoute la fonction du 2er bouton
		// On crée le string
		var text2 = '';
		
		$(".result-table").find('td').each(function(){
			var t = $(this).text();
			for(var i=0;i<t.length;i++){
				if(t.charCodeAt(i)== 160 || 
                   t.charCodeAt(i)== 10  || 
                   t.charCodeAt(i)== 09  || 
                   t.charCodeAt(i)== 32){
					//alert("Test "+t[i-1]+" "+t[(i+1)]);
					//alert(t.charCodeAt(i-9));
					t = remplace(t, i+1, "_");
					//alert(t);
				}
			}
			text2 += t+";";
		});
		
		// On enleve les 120 premiers
		text2 = text2.substring(117);
		
		// On rajoute le code pour faire juste la recherche de pc
		text2 += "&MEA=OFF";
			
		// On crée le 2éme bouton (avant car prepend)
		$(".result-table").parent().prepend("<a class=\"standard-button\" tabindex=\"0\" type=\"button\" title=\"Lancer la recherche de pc\" id=\"fast-pc_maa2\" href="+returnFastMaa(text2)+" target=\"_blank\" style=\"margin:5px ; padding: 4px;\">Recherche F-PC</button>");
		text2='';
		// On ajoute la fonction du 1er bouton
		// On crée le string
		var text = '';
		
		$(".result-table").find('td').each(function(){
			var t = $(this).text();
			for(var i=0;i<t.length;i++){
				if(t.charCodeAt(i)== 160 || 
                   t.charCodeAt(i)== 10  || 
                   t.charCodeAt(i)== 09  || 
                   t.charCodeAt(i)== 32){
					//alert("Test "+t[i-1]+" "+t[(i+1)]);
					//alert(t.charCodeAt(i-9));
					t = remplace(t, i+1, "_");
					//alert(t);
				}
			}
			text += t+";";
		});
		
		// On enleve les 120 premiers
		text = text.substring(117);
		
		// On crée le 1er lien
		$(".result-table").parent().prepend("<a class=\"standard-button\" tabindex=\"0\" type=\"button\" title=\"Lancer l'étude automatique Fast-pc\" id=\"fast-pc_maa\" target=\"_blank\" href="+returnFastMaa(text)+" style=\"margin:5px ; padding: 4px;\">Etude F-PC</button>");
		text ='';
	}
}

/**************************************\
* Affiche l'infobulle
\**************************************/
function AffBulle(texte) {
	//contenu="<TABLE border=0 cellspacing=0 cellpadding="+IB.NbPixel+"><TR background-color='"+IB.ColContour+"'><TD><TABLE border=0 cellpadding=2 cellspacing=0 bgcolor='"+IB.ColFond+"'><TR><TD><FONT size='-1' face='arial' color='"+IB.ColTexte+"'>"+texte+"</FONT></TD></TR></TABLE></TD></TR></TABLE>&nbsp;";
	contenu ="<Div style=\"background-color:LightGrey; padding:5px; border-width: 1px; border-style: solid; border-color: #000000; \">"+texte+"</div>";
	var finalPosX=posX-xOffset;
	//alert(finalPosX);
	if (finalPosX<0){
		finalPosX=0;
	}
	document.getElementById("bulle").innerHTML=contenu;
	document.getElementById("bulle").setAttribute("style", "top :"+(posY+yOffset)+"px; left : "+finalPosX+"px; visibility:visible; position:absolute;");
	document.getElementById("bulle").style.visibility="visible";
	
}

/**************************************\
* Retourne la position de la souris
\**************************************/
function getMousePos(e) {
	if (document.all) {
		posX=event.x+document.body.scrollLeft; 
		posY=event.y+document.body.scrollTop;
	}
	else {
		//alert(e.pageX);
		posX=e.pageX; 
		posY=e.pageY; 
	}
}

/**************************************\
* Cache l'infobulle
\**************************************/
function HideBulle() {
	if (document.layers) {document.layers["bulle"].visibility="hide";}
	if (document.all) {document.all["bulle"].style.visibility="hidden";}
	else if (document.getElementById){document.getElementById("bulle").style.visibility="hidden";}
}

/**************************************\
* Initialise l'infobulle
\**************************************/
function InitBulle(ColTexte,ColFond,ColContour,NbPixel) {
	IB.ColTexte=ColTexte;
	IB.ColFond=ColFond;
	IB.ColContour=ColContour;
	IB.NbPixel=NbPixel;
	 if (document.layers) {
		// window.captureEvents(Event.MOUSEMOVE);window.onMouseMove=getMousePos;
		// document.write("<LAYER name='bulle' top=0 left=0 visibility='hide'></LAYER>");
	}
	if (document.all) {
		document.write("<DIV id='bulle' style='position:absolute;top:0;left:0;visibility:hidden'></DIV>");
		document.onmousemove=getMousePos;
	}
	// else if (document.getElementById) {
	document.onmousemove=getMousePos;
	var ph = document.getElementsByClassName("pharaon");
	var bulle = document.createElement('div');
				
	bulle.setAttribute("id","bulle");
	bulle.setAttribute("style","position:absolute;top:0;left:0;visibility:hidden");
	ph[0].appendChild(bulle);
}
