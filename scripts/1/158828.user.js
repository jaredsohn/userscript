// ==UserScript==
// @name        tooltips_glad
// @namespace   glad
// @include     http://s*.gladiatus.fr/game/index.php*
// @downloadURL    https://userscripts.org/scripts/source/158828.user.js
// @updateURL      https://userscripts.org/scripts/source/158828.meta.js
// @version     1.60
// ==/UserScript==


//recup chemin imgs
//{
	src = document.getElementsByTagName("body")[0].getElementsByTagName("script")[0].getAttribute("src").split("/")[0];
	// alert(src);
	GM_setValue("folder",src);
	

//}

//recup de la vie
//{
tab = document.getElementById("header_values_xp_bar").getAttribute("onmouseover").split("<td ");
// alert(tab[2]);
xp_temp = tab[2].split("nowrap\\'>");
xp = xp_temp[1].split("</td>")[0];
//}


function get_inv_position(){
	if(window.location.toString().indexOf("inv=")!=-1){
	inv_position = window.location.toString().split("inv=")[1].split("&")[0];
	}
	else{
	inv_position=0;
	}
	return inv_position;
}

function get_base(){
	base = window.location.toString().split("/")
 return 'http://'+base[2]+'/game/index.php?';
}


function get_sh(){
	id = window.location.toString().split("sh=");
	// alert(id[1]);
	return id[1];
}

//recup de la vie
//{
tab = document.getElementById("header_values_hp_bar").getAttribute("onmouseover").split("<td ");
// alert(tab[2]);
vie_temp = tab[2].split("nowrap\\'>");
vie = vie_temp[1].split("</td>")[0];
//}


//tableau de liens
//{
tableau = "<table>";
tableau += "<tr>";
tableau += "<td class=submenuitem >";
tableau += "vie : "+vie+" ";
tableau += "</td>";
tableau += "<td >";

tableau += "</td>";
tableau += "<td class=submenuitem>";
tableau += "XP : "+xp+"";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=marche_guilde class=icone src="+GM_getValue("folder")+"/img/powerups/powerup_1.gif title='marché de guilde'>";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=message_guilde class=icone src="+GM_getValue("folder")+"/img//premium/token/13.jpg title='écrire a la guilde'>";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=guilde_co class=icone src="+GM_getValue("folder")+"/img/logo/0/tmp/8-7.png title='membres de guilde'>";
tableau += "</td>";
tableau += "<td >";
tableau += "&#160&#160&#160&#160&#160&#160&#160";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=vente_alchi class=icone src="+GM_getValue("folder")+"/img//premium/token/18.jpg title='vente alchimiste'>";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=vente_armure class=icone src="+GM_getValue("folder")+"/img/npc/merc/4.jpg title='vente armures'>";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=vente_arme class=icone src="+GM_getValue("folder")+"/img/ui/quest/icon_expedition_active.jpg title='vente armes'>";
tableau += "</td>";

tableau += "<td >";
tableau += "<img id=vente_marchandise class=icone src="+GM_getValue("folder")+"/img/powerups/powerup_2.gif title='vente marchandise'>";
tableau += "</td>";
tableau += "<td >";
tableau += "<img id=vente_mercenaire class=icone src="+GM_getValue("folder")+"/img/powerups/powerup_3.gif title='vente mercenaire'>";
tableau += "</td>";
tableau += "<td style='z-index:10;border: 3px solid rgb(0,0,0);;background-color:rgb(0,0,0);'>";
tableau += "<img id=vente_mercenaire2 class=icone src="+GM_getValue("folder")+"/img/powerups/powerup_3.gif title='vente mercenaire II'>";

tableau += "</td>";
tableau += "<td >";
tableau += "&#160&#160&#160&#160&#160&#160&#160";
tableau += "</td>";



tableau += "</tr>";
tableau += "</table>";







//}



tool_box = document.createElement("div");
tool_box.setAttribute("class","tool_box");

tool_box.innerHTML=tableau;
document.getElementById("container_game").insertBefore(tool_box,document.getElementById("main"));




//-----------------------------------------------------------------------------------------------
//div style
//-----------------------------------------------------------------------------------------------
//{
style = "div.tool_box{";
style += "position:absolute;";
style += "top:110px;left:210px;";
// style += "background-color:rgb(140,48,10);"
style += "width:500px;"
style += "z-index:1000;"
style += "";
style += "}";
style += "";
style += "img.icone{";
style += "border-top:solid 3px rgb(140,48,10);";
style += "border-left:solid 3px rgb(140,48,10);";
style += "border-right:solid 3px rgb(140,48,10);";
style += "border-bottom:solid 3px rgb(140,48,10);";
style += "cursor:pointer;";
style += "width:20px;";
style += "height:20px;";
style += "";
style += "";
style += "";
style += "}";
style += "img.icone:hover{";
style += "border-top:solid 3px rgb(0,0,0);";
style += "border-left:solid 3px rgb(0,0,0);";
style += "border-right:solid 3px rgb(0,0,0);";
style += "border-bottom:solid 3px rgb(0,0,0);";
style += "width:21px;";
style += "height:21px;";
style += "";
style += "";
style += "cursor:pointer;";
style += "}";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";
style += "";


//}
balise_style = document.createElement("style");
balise_style.setAttribute("type","text/css");
balise_style.innerHTML=style;
document.getElementsByTagName("head")[0].insertBefore(balise_style,document.getElementsByTagName("head")[0].firstChild);






document.getElementById("vente_arme").addEventListener("click",function(){
window.location.href=get_base()+"mod=inventory&subsub=2&sub=1&inv="+get_inv_position()+"&doll=1&sh="+get_sh();
},true)

document.getElementById("vente_armure").addEventListener("click",function(){
window.location.href=get_base()+"mod=inventory&subsub=2&sub=2&inv="+get_inv_position()+"&doll=1&sh="+get_sh();
},true)

document.getElementById("message_guilde").addEventListener("click",function(){
// window.location.href=get_base()+"mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh="+get_sh();
window.location=""+get_base()+"mod=guild&submod=adminMail&sh="+get_sh()+"";
},true)

document.getElementById("vente_alchi").addEventListener("click",function(){
window.location.href=get_base()+"mod=inventory&subsub=2&sub=4&inv="+get_inv_position()+"&doll=1&sh="+get_sh();
},true)

document.getElementById("vente_marchandise").addEventListener("click",function(){
window.location.href=get_base()+"mod=inventory&subsub=2&sub=3&inv="+get_inv_position()+"&doll=1&sh="+get_sh();
},true)

document.getElementById("vente_mercenaire").addEventListener("click",function(){
window.location.href=get_base()+"mod=inventory&subsub=2&sub=5&inv="+get_inv_position()+"&doll=1&sh="+get_sh();
},true)

document.getElementById("vente_mercenaire2").addEventListener("click",function(){
window.location.href=get_base()+"mod=inventory&subsub=1&sub=5&inv="+get_inv_position()+"&doll=1&sh="+get_sh();
},true)

document.getElementById("marche_guilde").addEventListener("click",function(){
window.location.href=get_base()+"mod=guild_market&sh="+get_sh();
},true)

document.getElementById("guilde_co").addEventListener("click",function(){
window.location.href=get_base()+"mod=guild&submod=memberList&i=15&sh="+get_sh();
},true)



