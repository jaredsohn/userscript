// ==UserScript==
// @name           Navigation v7 multi
// @namespace      http://www.ego-shooters.net/forum/ NewMan, mod leonbuzz
// @description    Neue Navigationsleiste mit den wichtigsten links by newman fuer alle by Boggler
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @exclude					*gang*
// @exclude					*login*
// @exclude					*logout*
// @exclude					*itemsale*
// @exclude					*messages*
// @exclude					*city*
// @exclude					*change_please*
// @exclude					*highscore*
// @exclude					*profil/bande:*
// @version				v8	leonbuzz: ajout de la liste d'exclusion + ajout link pet
// ==/UserScript==
var navi_div = document.getElementById('tabnav');
url = document.URL;
try{
	if(url.indexOf("skills") != -1 && document.getElementsByClassName("b25 last")[0].getElementsByClassName("submenu")[0].getElementsByClassName("btn4")[0].getAttribute("href") == "/skills/"){
		document.getElementsByClassName("b25 last")[0].getElementsByClassName("submenu")[0].getElementsByClassName("btn4")[0].setAttribute("href", "/skills/pet/");
		document.getElementsByClassName("b25 last")[0].getElementsByClassName("submenu")[0].getElementsByClassName("btn4")[0].innerHTML = "Animal";
	}
}catch(err){}
var profil_id = 0;
try{
	if(document.getElementsByTagName('body')[0].innerHTML.indexOf("profil/id") != -1){
		profil_id = document.getElementById('my-profile').innerHTML.split("profil/id:")[1].split("/")[0];
	}
}catch(err){}
if(url.indexOf("gang") == -1 && url.indexOf("city") == -1 && url.indexOf("messages") == -1 && url.indexOf("highscore") == -1 && url.indexOf("news") == -1 && url.indexOf("downloads") == -1 && url.indexOf("help") == -1){ 
	var navi_ul = navi_div.getElementsByTagName('ul');
	var navi_li = navi_ul[0].getElementsByTagName('li');
}else{
	var newul = document.createElement('ul');
	newul.innerHTML = '<li><a href="/news/"><span class="btn-right"><span class="btn-left">News</span></span></a></li><li><a href="/overview/"><span class="btn-right"><span class="btn-left">Aperçu</span></span></a></li><li><a href="/skills/pet/"><span class="btn-right"><span class="btn-left">Animal</span></span></a></li><li><a href="/activities/"><span class="btn-right"><span class="btn-left">Action</span></span></a></li><li><a href="/stock/"><span class="btn-right"><span class="btn-left">Inventaire</span></span></a></li>';
	navi_div.appendChild(newul);
	if(url.indexOf("messages") != -1 || url.indexOf("highscore") != -1){
		newul.setAttribute("id" , "nav-1");
		var navi_li = document.getElementById("nav-1").getElementsByTagName('li');
	}else if(url.indexOf("news") != -1 || url.indexOf("downloads") != -1 || url.indexOf("help") != -1){
		newul.setAttribute("id" , "nav-2");
		var navi_li = document.getElementById("nav-2").getElementsByTagName('li');
	}else{
		newul.setAttribute("id" , "newman_navi");
		newul.setAttribute("style" , "position: absolute; top:-21px; left:30px;");
		var navi_li = document.getElementById("newman_navi").getElementsByTagName('li');
	}
	
	newul.setAttribute("class" , "hmenu zabsolute");
	
	
	
}
for(x=0; x <=navi_li.length-1; x++){
	try{
		navi_li[x].getElementsByTagName('a')[0].style.width = "65.6px";
		navi_li[x].getElementsByTagName('span')[0].style.width = "65.6px";
		navi_li[x].getElementsByTagName('span')[1].style.width = "65.6px";
		navi_li[x].style.width = "65.6px";
	} catch (err){
		break;
	}
}//Copyright by NewMan
if(navi_li[0].getAttribute("class") == "active" && url.indexOf("news") == -1){
	navi_li[0].setAttribute("class", "");
}else if(navi_li[0].getAttribute("class") != "active" && url.indexOf("news") != -1){
	navi_li[0].setAttribute("class", "active");
}
navi_li[0].getElementsByTagName('span')[1].innerHTML = 'News';
navi_li[0].getElementsByTagName('a')[0].setAttribute("href" , "/news/");

if(navi_li[2].getAttribute("class") == "active" && url.indexOf("skills") == -1){
	navi_li[2].setAttribute("class", "");
}else if(navi_li[2].getAttribute("class") != "active" && url.indexOf("skills") != -1){
	navi_li[2].setAttribute("class", "active");
}
navi_li[2].getElementsByTagName('span')[1].innerHTML = 'Lavoir';
navi_li[2].getElementsByTagName('a')[0].setAttribute("title" , "Lavoir");
navi_li[2].getElementsByTagName('a')[0].setAttribute("href" , "/city/washhouse/");

if(navi_li[3].getAttribute("class") == "active" && url.indexOf("activities") == -1){
	navi_li[3].setAttribute("class", "");
}else if(navi_li[3].getAttribute("class") != "active" && url.indexOf("activities") != -1){
	navi_li[3].setAttribute("class", "active");
}

if((navi_li[4].getAttribute("class") == "active" && url.indexOf("stock") == -1) || url.indexOf("stock/plunder") != -1){
	navi_li[4].setAttribute("class", "");
}else if(navi_li[4].getAttribute("class") != "active" && url.indexOf("stock") != -1 && url.indexOf("stock/plunder") == -1){
	navi_li[4].setAttribute("class", "active");
}
for(i=0;i<=6;i++){
	var newli = document.createElement('li');
	try{
		navi_ul[0].appendChild(newli);
	}catch(err){
		if(url.indexOf("messages") != -1 || url.indexOf("highscore") != -1){
			document.getElementById("nav-1").appendChild(newli);
		}else if(url.indexOf("news") != -1 || url.indexOf("downloads") != -1 || url.indexOf("help") != -1){
			document.getElementById("nav-2").appendChild(newli);
		}else{
			document.getElementById("newman_navi").appendChild(newli);
		}
	}

}
//Copyright by NewMan
if(url.indexOf("fight/overview") != -1){
	navi_li[5].setAttribute("class", "active");
}
navi_li[5].innerHTML = '<a href="/stock/armoury/" title="Armes" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Armes</span></span></a>';

if(url.indexOf("city/weapon_store/def") != -1){
	navi_li[6].setAttribute("class", "active");
}
navi_li[6].innerHTML = '<a href="/city/weapon_store/def/" title="Armes de défense" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Défense</span></span></a>';

if(url.indexOf("city/games") != -1){
	navi_li[7].setAttribute("class", "active");
}
navi_li[7].innerHTML = '<a href="/city/home/" title="Domicile" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Domicile</span></span></a>';

if(url.indexOf("/pet/") != -1){
	navi_li[8].setAttribute("class", "active");
}
navi_li[8].innerHTML = '<a href="/skills/pet/" title="Animal" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Animal</span></span></a>';

if(url.indexOf("messages") != -1){
	navi_li[9].setAttribute("class", "active");
}
navi_li[9].innerHTML = '<a href="/gang/credit/" title="Caisse" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Caisse</span></span></a>';

if(url.indexOf("stock/plunder") != -1){
	navi_li[10].setAttribute("class", "active");
}
navi_li[10].innerHTML = '<a href="/stock/plunder/" title="Plunder" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Babioles</span></span></a>';


if(profil_id != 0){
	if(url.indexOf("profil/id") != -1){
		navi_li[11].setAttribute("class", "active");
	}
	navi_li[11].innerHTML = '<a href="/profil/id:'+profil_id+'/" title="Profil anschaun" style="width: 65.6px;"><span class="btn-right" style="width: 65.6px;"><span class="btn-left" style="width: 65.6px;">Profil</span></span></a>';
}