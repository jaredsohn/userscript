// ==UserScript==
// @name           Likes Facebook ñ_ñ 2.0
// @namespace      LikesFacebookBeltran
// @description    Likes Masivos *w*
// @include        http://www.facebook.com/*
// @exclude     http://www.facebook.com/widgets/*
// @exclude     http://www.facebook.com/plugins/*
// @exclude     http://www.facebook.com/sharer/*
// @exclude     http://www.facebook.com/connect/*
// @exclude     http://www.facebook.com/?sk=inbox
// @exclude     http://www.facebook.com/home.php?sk=other
// @exclude     http://www.facebook.com/?sk=events
// @exclude     http://www.facebook.com/?sk=ru
// @exclude     http://www.facebook.com/?sk=questions
// @exclude     http://www.facebook.com/?sk=media
// @exclude     http://www.facebook.com/friends/*
// @exclude     http://www.facebook.com/editaccount.php
// @exclude     http://www.facebook.com/settings/*
// @exclude     http://www.facebook.com/privacy
// ==/UserScript==

//==============
//==AlonzoB=====
//==============
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= "0.85";
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://img850.imageshack.us/img850/7233/bd3143b0e1d3642ca24293a.png' width='16' height='16' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#333333\" href=\"/Alonso.Beltran02\" title=\"Ubuntu Beltran! :D\">Ubuntu Beltran</a>"
	
	body.appendChild(div);
}

// ==============
// ==Publicaciones=
//==============
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.75;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='publicaciones()'>Publicaciones</a>"
	
	body.appendChild(div);
	
	unsafeWindow.publicaciones = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Comentarios==
//==============
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.75;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='comentarios()'>Comentarios</a>"
	
	body.appendChild(div);
	
	unsafeWindow.comentarios = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("stat_elem") >= 0)
				if(buttons[i].getAttribute("title") == "Me gusta este comentario")
					buttons[i].click();
		}
		
	};
}
