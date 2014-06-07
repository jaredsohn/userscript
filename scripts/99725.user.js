// ==UserScript==
// @name           torrent411
// @namespace      t411
// @include        http://www.torrent411.com/*
// @author         exystence
// ==/UserScript==


/*********************************************************************************************
 * O P T I O N S    D U    S C R I P T                                                       *
 *                                                vous pouvez modifier les options suivantes *
 *********************************************************************************************/

// afficher ou cacher les filtres par défaut (page browse.php)
var afficher_les_filtres = true;

// changer les images de catégories des torrents (toutes pages)
var changer_les_images = true;

// modifier l'apparence des tableaux de torrents
var modifier_les_tableaux = true;

/*********************************************************************************************
 * Fin des options                                   NE RIEN MODIFIER AU DELA DE CETTE LIGNE *
 *********************************************************************************************/


/*********************************************************************************************
 * cache les filtres au chargement de la page.                                               *
 *********************************************************************************************/
function cacher_filtres(){
	if(afficher_les_filtres && /browse[.]php/.test(document.location)){
		var elem = document.getElementById("filtres_form");
		if(elem){
			elem.style.display = "none";
		}
	}
}

/*********************************************************************************************
 * ajoute les liens "Afficher les filtres" et "Cacher les filtres" sur la page browse.php    *
 *********************************************************************************************/
function ajouter_options(){
	if(/browse[.]php/.test(document.location)){
		for (i = 0; i < document.forms.length; i++){
			if(/http:\/\/(www\.)?torrent411.com\/browse.php/.test(document.forms[i].action)){
				document.forms[i].setAttribute("id","filtres_form");
				var text = document.createTextNode("Cacher les filtres");
				var node = document.createElement("a");
				node.setAttribute("href","javascript:document.getElementById('filtres_form').style.display='none';void(0);");
				node.appendChild(text);
				document.getElementById('filtres_form').appendChild(node);
				var text = document.createTextNode(" Afficher les filtres");
				var node = document.createElement("a");
				node.setAttribute("href","javascript:document.getElementById('filtres_form').style.display='block';void(0);");
				node.setAttribute("id","filtres_switch");
				node.appendChild(text);
				document.getElementById('infobar').appendChild(node);
			}	
		}
	}
}

/*********************************************************************************************
 * ajoute les liens internes vers les catégories de torrents (pages week.php et day.php)     *
 *********************************************************************************************/
function liste_categories(){
	if(/(day[.]php|week[.]php)/.test(document.location)){
		var tab = document.getElementsByClassName('f-content')[0].getElementsByClassName("ttable_headouter");
		if(tab){
			var node = document.createElement("div");
			node.setAttribute("id","list_categories");
			node.setAttribute("style","clear:both;");
			document.getElementsByClassName("ftm")[0].appendChild(node);
			var last;
			for(i = 0; i < tab.length; i++){
				var link = tab[i].getElementsByClassName("ttable_col1")[0].getElementsByTagName("a")[0];
				var elem = link.getElementsByTagName("img")[0];
				var url = elem.alt.split(":")[0];
				if(last != url){
					link.setAttribute("name",url);
					var node = document.createElement("a");
					var img  = document.createElement("img");
					node.setAttribute("href","#"+url);
					img.setAttribute("src",elem.src);
					img.setAttribute("alt",url);
					node.appendChild(img);
					document.getElementById("list_categories").appendChild(node);
					var text = document.createTextNode(" ");
					document.getElementById("list_categories").appendChild(text);
					last = url;
				}
			}
		}
	}
}

/*********************************************************************************************
 * change les images des catégories pour les rendre plus lisibles (sur toutes les pages)     *
 *********************************************************************************************/
function changer_images(){
	if(changer_les_images){
		for (i = 0; i < document.images.length; i++){
			var img = document.images[i];
			var src = img.src;
			
			if(/musique.gif/.test(src)){
				img.src = "http://img293.imageshack.us/img293/3141/musique.png";
			}else
			if(/tele.gif/.test(src)){
				img.src = "http://img443.imageshack.us/img443/4436/television.png";
			}else
			if(/films.gif/.test(src)){
				img.src = "http://img293.imageshack.us/img293/1408/film.png";
			}else
			if(/events.gif/.test(src)){
				img.src = "http://img199.imageshack.us/img199/3185/evenement.png";
			}else
			if(/appz.gif/.test(src)){
				img.src = "http://img87.imageshack.us/img87/2307/application.png";
			}else
			if(/jeux.gif/.test(src)){
				img.src = "http://img11.imageshack.us/img11/6384/jeuy.png";
			}else
			if(/anime.gif/.test(src)){
				img.src = "http://img704.imageshack.us/img704/3830/animeys.png";
			}else
			if(/consoles.gif/.test(src)){
				img.src = "http://img227.imageshack.us/img227/2736/console.png";
			}else
			if(/xxx.gif/.test(src)){
				img.src = "http://img203.imageshack.us/img203/9990/xxxgk.png";
			}else
			if(/ebooks.gif/.test(src)){
				img.src = "http://img693.imageshack.us/img693/3572/ebook.png";
			}else
			if(/iphone.gif/.test(src)){
				img.src = "http://img687.imageshack.us/img687/9216/iphoneqf.png";
			}else
			if(/ipod.gif/.test(src)){
				img.src = "http://img51.imageshack.us/img51/7285/ipodo.png";
			}else
			if(/docu.gif/.test(src)){
				img.src = "http://img87.imageshack.us/img87/3531/documentaire.png";
			}else
			if(/cell.gif/.test(src)){
				img.src = "http://img210.imageshack.us/img210/1050/cellulaire.png";
			}
		}
	}
}



/*********************************************************************************************
 * modifie l'apparence des tableaux qui listent les torrent pour une meilleure lecture       *
 *********************************************************************************************/
function modifier_tables(){
	if(modifier_les_tableaux && /(day[.]php|week[.]php|browse[.]php|search)/.test(document.location)){
		var tabs = document.getElementsByClassName("ttable_headinner");
		if(tabs){
			for(k = 0; k < tabs.length; k++){
				tabs[k].setAttribute("cellpadding","2");
				var th = tabs[k].getElementsByTagName("th");
				th[1].innerHTML = "Nom du Torrent";
				th[2].innerHTML = "Nfo";
				th[2].setAttribute("width","30px");
				th[3].innerHTML = "Com.";
				th[3].setAttribute("width","30px");
				th[4].setAttribute("width","70px");
				th[5].innerHTML = "Complet";
				th[5].setAttribute("width","60px");
				th[6].innerHTML = "UP (seed)";
				th[6].setAttribute("width","70px");
				th[7].innerHTML = "DL (leech)";
				th[7].setAttribute("width","70px");
				var elmNewContent0 = document.createElement('th');
				elmNewContent0.innerHTML = "ratio";
				elmNewContent0.setAttribute("class","ttable_head");
				th[7].parentNode.insertBefore(elmNewContent0, th[7].parentNode.lastChild.nextSibling);
				// th[8].innerHTML = "ratio";
				var tr = tabs[k].getElementsByTagName("tr");
				for(i = 1; i < tr.length; i++){
					var td = tr[i].getElementsByTagName("td");
					if ((i-1)%5==0){
						var elmNewContent = document.createElement('td');
						var ratio =((tr[i].lastChild).previousElementSibling.innerHTML)/(tr[i].lastChild.innerHTML);
						
						if(ratio<0.025){elmNewContent.setAttribute("class","leechersStyle")}
						ratio = Math.round(ratio*1000)/1000;
						elmNewContent.innerHTML = ratio;
						
						tr[i].insertBefore(elmNewContent, tr[i].lastChild.nextSibling);
					}
					for(j = 0; j < td.length; j++){
						if(i % 2 == 0){
							td[j].setAttribute("style","background-color:#C2CACF; border:none; border-bottom:1px solid #144768;");
						}else{
							td[j].setAttribute("style","background-color:white; border:none; border-bottom:1px solid #144768;");
						}
						
					}
					
				}
			}
		}
	}
}

/*********************************************************************************************
 *                      E X E C U T I O N   D E S   F O N C T I O N S    (main)              *
 *********************************************************************************************/
ajouter_options();
modifier_tables();
changer_images();
cacher_filtres();
liste_categories();