// ==UserScript==
// @name        gladiatus_messagerie

// @namespace   http://s*.gladiatus.fr/game/index.php?mod=messages*
// @include     http://s*.gladiatus.fr/game/index.php?mod=messages*
// @downloadURL    https://userscripts.org/scripts/source/158136.user.js
// @updateURL      http://userscripts.org/scripts/source/158136.meta.js
// @version     1.502
// ==/UserScript==


if(window.location.href.indexOf("mod=messages&submod=messageNew")!=-1){
	if(GM_getValue("reponse_to_do")==1){
		GM_setValue("reponse_to_do","0");
		for(i=0;i<document.getElementsByTagName("input").length;i++){
			if(document.getElementsByTagName("input")[i].getAttribute("name")=="messageRecipient"){
				document.getElementsByTagName("input")[i].value=GM_getValue("reponse_to");
			}
		}
		
	}

}


for(i=0;i<document.getElementsByTagName("div").length;i++){
	if(document.getElementsByTagName("div")[i].getAttribute("class")){
		if(document.getElementsByTagName("div")[i].getAttribute("class")=="title2_inner"){
		table_mail = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0];
		table_mail.setAttribute("style","");
		table_mail.setAttribute("width","100%");
			for(j=0;j<table_mail.getElementsByTagName("tr").length;j++){
				if(1==1){
					if(table_mail.getElementsByTagName("tr")[j].getElementsByTagName("td")[0].getElementsByTagName("input")[0]){
						if(table_mail.getElementsByTagName("tr")[j].getElementsByTagName("td")[0].getElementsByTagName("input")[0].getAttribute("type")){
							if(table_mail.getElementsByTagName("tr")[j].getElementsByTagName("td")[0].getElementsByTagName("input")[0].getAttribute("type")=="checkbox"){
								inner = table_mail.getElementsByTagName("tr")[j].innerHTML;
								ligne = table_mail.getElementsByTagName("tr")[j];
								ligne.setAttribute("id","msg_"+get_id_msg(i,j));
								
								if(GM_getValue(get_id_msg(i,j))!="1"){
								ligne.setAttribute("class","new_mail");
								}else{
								ligne.setAttribute("class","mail");
								}
								
								
								id_exp = "expediteur_"+i+j;
								tr_message= document.createElement("tr");
								tr_message.setAttribute("id","mess_"+get_id_msg(i,j));
								tr_message.setAttribute("class","hidden");
								
								tr_reponse = document.createElement("tr");
								tr_reponse.setAttribute("id","rep_"+get_id_msg(i,j));
								tr_reponse.setAttribute("class","hidden");
								tr_reponse.innerHTML = "<td colspan=4 width=100%>"+get_reponse(i,j)+"</td>";
								
								tr_message.innerHTML="<td colspan=4 width=100% id=message_orig"+i+j+">"+get_msg(i,j)+"</td>";
								contenu = "<td width=15%><input type=checkbox name='x[]' value="+get_id_msg(i,j)+">"
								if(GM_getValue(get_id_msg(i,j))!="1"){
								contenu += "new";
								}
								
								contenu += "<input type=hidden name='y[]' value="+get_id_msg(i,j)+"></td><td width=35%>"+get_date(i,j)+"</td><td width=30%><b id="+id_exp+">"+get_expediteur(i,j)+"</b></td><td width=30%>"+get_msg_type(i,j)+"</td>";
								ligne.innerHTML = contenu;
								// ligne.innerHTML= "<td width=5%>";
								// if(GM_getValue(get_id_msg(i,j))!="1"){
								// ligne.innerHTML += "<b>!!</b>";
								// }
								// ligne.innerHTML += "<input type=checkbox name='x[]' value="+get_id_msg(i,j)+"><input type=hidden name='y[]' value="+get_id_msg(i,j)+"></td><td width=35%>"+get_date(i,j)+"</td><td width=30%><b id="+id_exp+">"+get_expediteur(i,j)+"</b></td><td width=30%>"+get_msg_type(i,j)+"</td>";
								table_mail.getElementsByTagName("tr")[j].parentNode.insertBefore(tr_message,document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j+1]);
								
								
								
								
								
								table_mail.getElementsByTagName("tr")[j].parentNode.insertBefore(tr_reponse,table_mail.getElementsByTagName("tr")[j+2]);
								
								document.getElementById("msg_"+get_id_msg(i,j)).addEventListener("click",function(){
									
									if(document.getElementById("mess_"+this.id.split("msg_")[1]).getAttribute("class")=="hidden"){
										this.setAttribute("class","mail");
										document.getElementById("mess_"+this.id.split("msg_")[1]).setAttribute("class","visible");
										document.getElementById("rep_"+this.id.split("msg_")[1]).setAttribute("class","visible");
										GM_setValue(this.id.split("msg_")[1],"1");
										
									}
									else{
										document.getElementById("mess_"+this.id.split("msg_")[1]).setAttribute("class","hidden");
										document.getElementById("rep_"+this.id.split("msg_")[1]).setAttribute("class","hidden");
									}
								
								
								
								},true);
								if(document.getElementById("reponse_"+get_id_msg(i,j))){
									document.getElementById("reponse_"+get_id_msg(i,j)).addEventListener("click",function(i,j){
										
										expe = this.getAttribute("reponse_to");
										
										
										GM_setValue("reponse_to_do","1");
										GM_setValue("reponse_to",expe);
										
										window.location=""+get_base()+"mod=messages&submod=messageNew&sh="+get_sh()+"";
									
									},true);
								}
								if(document.getElementById("rep_alli_"+get_id_msg(i,j))){
									document.getElementById("rep_alli_"+get_id_msg(i,j)).addEventListener("click",function(){
										window.location=""+get_base()+"mod=guild&submod=adminMail&sh="+get_sh()+"";
									
									
									},true);
								}
							}
							
						}
					}
				}
			}
		}
	
	}
}



//style
//{
global_style = "tr.hidden{";
global_style += "display: none;";
global_style += "}";
global_style += "tr.visible{";
global_style += "display:visible;";
global_style += "background-color:rgb(234,200,150);";
global_style += "}";
global_style += "tr.new_mail{";
global_style += "border:1px solid black;";
global_style += "cursor:pointer;";
global_style += "background-color:rgb(190,130,60);";
global_style += "";
global_style += "";
global_style += "";
global_style += "}";

global_style += "tr.new_mail:hover{";
global_style += "border-top:2px solid rgb(215,160,90);";
global_style += "border-left:2px solid rgb(215,160,90);";
global_style += "border-right:2px solid rgb(215,160,90);";
global_style += "border-bottom:2px solid rgb(215,160,90);";
global_style += "cursor:pointer;";
global_style += "background-color:rgb(150,90,20);";
global_style += "";
global_style += "";
global_style += "";
global_style += "}";
global_style += "tr.mail{";
global_style += "border:1px solid black;";
global_style += "cursor:pointer;";
global_style += "background-color:rgb(204,170,120);";
global_style += "";
global_style += "";
global_style += "";
global_style += "}";

global_style += "tr.mail:hover{";
global_style += "border-top:2px solid rgb(215,160,90);";
global_style += "border-left:2px solid rgb(215,160,90);";
global_style += "border-right:2px solid rgb(215,160,90);";
global_style += "border-bottom:2px solid rgb(215,160,90);";
global_style += "cursor:pointer;";
global_style += "background-color:rgb(225,160,90);";
global_style += "";
global_style += "";
global_style += "";
global_style += "}";
global_style += "";
global_style += "input.button{";
global_style += "background-color:rgb(215,160,90);";
global_style += "font-weight:bold;";
global_style += "";
global_style += "";
global_style += "";
global_style += "";
global_style += "cursor:pointer";
global_style += "}";
global_style += "input.button:hover{";
global_style += "background-color:rgb(195,140,70);";
global_style += "font-weight:bold;";
global_style += "";
global_style += "";
global_style += "";
global_style += "cursor:pointer";
global_style += "}";


//}



balise_style = document.createElement("style");
balise_style.setAttribute("type","text/css");
balise_style.innerHTML=global_style;

document.getElementsByTagName("head")[0].insertBefore(balise_style,document.getElementsByTagName("head")[0].firstChild);



function get_reponse(i,j){
	
	if(get_msg_type(i,j)=="Alliance"){
		res= "<input type=button class=button value=repondre id=reponse_"+get_id_msg(i,j)+"  reponse_to=\""+get_expediteur(i,j)+"\" >&#160&#160&#160&#160&#160&#160&#160";
		res += "<input type=button class=button value='repondre a tous' id=rep_alli_"+get_id_msg(i,j)+">";
		
	}
	else if(get_msg_type(i,j)=="perso"){
		res= "<input type=button class=button value=repondre id=reponse_"+get_id_msg(i,j)+" reponse_to=\""+get_expediteur(i,j)+"\"> ";
	}
	else{
	res = "";
	}
	
	return res;
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

function get_msg(i,j){
	if(get_msg_type(i,j)=="Système"| get_msg_type(i,j)=="guerre de guilde" | get_msg_type(i,j)=="Vente" ){
	res = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML;
	}
	else if(get_msg_type(i,j)=="perso"){
	res = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].getElementsByTagName("textarea")[0].innerHTML;
	// alert(msg);
	}
	else if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2]){
	res = "";
	msg = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML.split("<br>");
	for(k=0;k<msg.length;k++){
		if(k>0){
			res +=msg[k]+"<br>";
		}
	}
	}
	else{
	return "";
	}
	return res;
}

function get_expediteur(i,j){

	if(get_msg_type(i,j)=="perso"){
		h_ref = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("a")[0].getAttribute("href");
		name = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("a")[0].innerHTML;
		expe = name;
	}
	else if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2]){
		if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML.split("de la part de: ")[1]){
			expe = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML.split("de la part de: ")[1].split("<br>")[0];
		}
		else {
			expe="systeme";
		}
	}


	return expe;
}



function get_msg_type(i,j){

if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2]){
	
	if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].firstChild.nodeName=="TABLE"){
		res = "perso";
		// alert("perso");
	}
	else if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML.indexOf("Message d`alliance")>-1){
		res = "Alliance";
	}
	
	
	else if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML.indexOf("attaque contre la guilde ")>-1){
		res = "guerre de guilde";
	}
	else if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[2].innerHTML.indexOf("Vous avez vendu ")>-1){
		res = "Vente";
	}
	else{
		
		res = "Système";
	}
	return res;
}


}

function get_date(i,j){
if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[1]){
date = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[1].innerHTML;
}
return date;
}

function get_id_msg(i,j){

if(document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[0].getElementsByTagName("input")[0]){
id = document.getElementsByTagName("div")[i].getElementsByTagName("table")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[0].getElementsByTagName("input")[0].getAttribute("value");
}
// alert(id);
return id;

}




















