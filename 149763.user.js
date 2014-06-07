// ==UserScript==
// @name        Shalenity+
// @namespace   By Little
// @include        *shalenity.com/*
// @version     1
// ==/UserScript==

var alls = document.body.innerHTML;
document.getElementById('blocdroite').innerHTML='<div class="bloc4"><h3>Annonce Shalenity+</h3><div class="texte" id="annoncesh">Rien à annoncer pour le moment</div></div><br />'+document.getElementById('blocdroite').innerHTML;
function annonce(text) {
	document.getElementById('annoncesh').innerHTML=text;
}
if(/(Bonjour|Bonsoir) « <b>(.+)<\/b> »/g.test(alls)) {
	var pseudo = /(Bonjour|Bonsoir) « <b>(.+)<\/b> »/gi.exec(alls);
	pseudo = pseudo[2];
}
var img_del = '<img src="http://image.noelshack.com/fichiers/2012/40/1349545489-supprimer.gif" />';
function addsmileys(link, code) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var text = xhr.responseText;
				if(/\[\](.+)\[\]/gi.test(text)) {
					var error = /\[\](.+)\[\]/gi.exec(text);
					var dol = document.createElement('span');
					dol.innerHTML="<br /><center>" + error[1].fontcolor("red").bold()+"</center>";
					document.getElementById('addsm').insertBefore(dol,null);
				} else if(/\{\}(.+)\{\}/gi.test(text)) {
					var good = /\{\}(.+)\{\}/gi.exec(text);
					var dol = document.createElement('span');
					dol.innerHTML="<br /><center>" + good[1].fontcolor("green").bold()+"</center>";
					document.getElementById('addsm').insertBefore(dol,null);
					document.getElementById('allsm').innerHTML = listsmileys();
				}
			}
	};
	xhr.open("GET", "shalenGM/smileys.php?mode=add&link="+link+"&code="+code, false);
	xhr.send(null);
}
unsafeWindow.addsmileys = function(link,code) { addsmileys(link,code);};
function deletesmiley(id) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var text = xhr.responseText;
			if(/\[\](.+)\[\]/gi.test(text)) {
				var error = /\[\](.+)\[\]/gi.exec(text);
				var dol = document.createElement('span');
				dol.innerHTML="<br /><center>" + error[1].fontcolor("red").bold()+"</center>";
				document.getElementById('allsm').insertBefore(dol,null);
			} else if(/\{\}(.+)\{\}/gi.test(text)) {
				var good = /\{\}(.+)\{\}/gi.exec(text);
				var dol = document.createElement('span');
				dol.innerHTML="<br /><center>" + good[1].fontcolor("green").bold()+"</center>";
				document.getElementById('allsm').innerHTML = listsmileys();
				document.getElementById('allsm').insertBefore(dol,null);
			}
		}
	};
	xhr.open("GET", "shalenGM/smileys.php?mode=del&id="+id, false);
	xhr.send(null);
}
unsafeWindow.deletesmiley = function(id) { deletesmiley(id);};
function listsmileys() {
	var texte = "";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if(xhr.responseText=="") {
					texte = "<center>Vous n'avez ajouté aucun smiley</center><br />";
				} else {
					texte = "<table style='width:100%;border:1px solid black;text-align:center;'>"
								+ '<tr>'
									+ '<th>Image du smiley</th>'
									+ '<th>Code</th>'
									+ '<th>Action</th>'
								+ '</tr>';		
					data = xhr.responseText.split("<br />");
					for(i=0;data[i];i++) {
						if(data[i]!="") {
							texte += "<tr onmouseover='this.style.background=\"#afafaf\"' onmouseout='this.style.background=\"none\"'>";
							datas = data[i].split("<->");
							texte += '<td><img src="'+datas[2]+'" style="max-width:150px;max-height:150px;"/></td>'
									+'<td>'+datas[1]+'</td>'
									+'<td><a style="cursor:pointer" onclick="deletesmiley('+datas[0]+')">'+img_del+'</a></td>'
								+'</tr>';
						}
					}
					texte += "</table>";
				}
			}
	};
	xhr.open("GET", "shalenGM/smileys.php?mode=show&on=up", false);
	xhr.send(null);
	return texte;
}

function showsmileys(t) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if(xhr.responseText!="") {	
					data = xhr.responseText.split("<br />");
					for(i=0;data[i];i++) {
						if(data[i]!="") {
							datas = data[i].split("<->");
							t = t.replace(new RegExp("("+datas[1]+")","g"),'<img src="'+datas[2]+'" style="max-width:150px;max-height:150px;"/>');
						}
					}
				}
			}
	};
	xhr.open("GET", "shalenGM/smileys.php?mode=show", false);
	xhr.send(null);
	return t;
}

function phpliste() {
	var t = "";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if(xhr.responseText!="") {	
					data = xhr.responseText.split("<br />");
					t += '<table>';
					for(i=0;data[i];i++) {
						if(data[i]!="") {
							datas = data[i].split("<->");
							if(i==0) { t+='<tr>'; }
							t += '<td> <img src="'+datas[2]+'" style="max-width:150px;max-height:150px;"/></td><td>'+datas[1]+'</td>';
							if(i!=0&&i%3==0) { t+='</tr><tr>'; }
						}
					}
					t += '</table>';
				}
			}
	};
	xhr.open("GET", "shalenGM/smileys.php?mode=show", false);
	xhr.send(null);
	return t;
}

if(!pseudo) {
	annonce('Shalenity+ necessite d\'être connecté');
} else {
	document.getElementById('menu').innerHTML='<h3 class="first">Shalenity+</h3><ul><li><a href="smileysSH.">Ajout de smileys</a></li></ul><div class="menuBas"></div><br />'+document.getElementById('menu').innerHTML;
	url = /http:\/\/(.{0,5})shalenity.com\/(.+)\.(.*)/gi.exec(document.location.toString());
	switch(url[2]) {
		case 'smileysSH':
			var fieldset, form, legend, label, file, labell, code, valide;
			document.getElementById('intCorps').innerHTML='<div class="bloc1"><h3>Ajout de smileys</h3><div class="texte" id="addsm"></div></div><br />';
			document.getElementById('intCorps').innerHTML+='<div class="bloc1"><h3>Liste de vos smileys</h3><div class="texte" id="allsm"></div></div><br />';
			document.getElementById('addsm').innerHTML = ('Les smileys que vous ajouterez sont visibles pour tous lus utilisateurs de Shalenity+<br /><br />').fontcolor('red').bold();
			document.getElementById('allsm').innerHTML = listsmileys();
			fieldset = document.createElement('fieldset');
			legend = document.createElement('legend');
			legend.innerHTML="Formulaire d'ajout des smileys";
			form = document.createElement('from');
			form.method = "post";
			label = document.createElement('label');
			label.for = "moreover";
			label.innerHTML="Lien du smiley :";
			file = document.createElement('input');
			file.type = "text";
			file.id = "moreover";
			labell = document.createElement('label');
			labell.for = "added";
			labell.innerHTML="Code du smiley :";
			code = document.createElement('input');
			code.type = "text";
			code.id = "added";
			valide = document.createElement('input');
			valide.type = "button";
			valide.value="Valider";
			valide.style.marginLeft="45%";
			valide.setAttribute("onclick","addsmileys(document.getElementById('moreover').value, document.getElementById('added').value);");
			form.insertBefore(label,null);
			form.insertBefore(file,null);
			form.insertBefore(document.createElement('br'),null);
			form.insertBefore(labell,null);
			form.insertBefore(code,null);
			form.insertBefore(document.createElement('br'),null);
			form.insertBefore(valide,null);
			fieldset.insertBefore(legend,null);
			fieldset.insertBefore(form,null);
			fieldset.innerHTML+='<div class="avertissement">Etant donné que vos smileys sont publics, quelques ègles sont à repsecter :'
									+ '<pre style="font-size:1.1em;">'
										+ '<li>   - L\'image doit obligatoirement être hébergée sur Noelshack</li>'
										+ '<li>   - Vous ne pouvez ajouter que 10 smileys par jour</li>'
										+ '<li>   - Le code du smiley doit commencer et finir par ":" et doit être\n     composé uniquement de caractères alphanumériques</li>'
									+ '<pre>'
								+ '</div>';
			document.getElementById('addsm').insertBefore(fieldset, null);
		break;
		
		case 'listeSmileys':
			document.getElementById('intCorps').innerHTML+= '<div class="bloc2"><center><h3>Smileys de Shalenity+</h3></center><div class="texte" id="showsm"></div></div><br />';
			document.getElementById('showsm').innerHTML+= phpliste();			
		break;
	}
	document.getElementById('smileys_GM').innerHTML = showsmileys(document.getElementById('smileys_GM').innerHTML);
	
}