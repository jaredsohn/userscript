// ==UserScript==
// @name         PSPK's Fast Profile Links!
// @author	  Praveen (PSPK) from Chennai, India!
// @description   Makes the Fast Links [SAMV] Below & Among Every Profile!!!
// @include       http://www.orkut.co*

// ==/UserScript==

var preto	   = "black";
var azul	    = "blue";
var azul_links    = "#0047BE";
var azulmarinho   = "#0000AA";
var verdeescuro   = "#007000";
var cinzaescuro   = "#444444";
var vermelho	= "red";
var roxoescuro    = "#9900dd";
var pink	    = "#FF00FF";
var marrom	  = "#A34567";
var vinho		= "#CC0099"





	var fs_quantos = 10	     ;  
	var fs_link_album = 1 		; 
	var fs_link_videos = 1 		;  
	var fs_link_mensagem = 1 	;  
	var fs_link_gerenciar = 0 	;  
	var fs_links_minusculas = 0 	;  
	var fs_show_link_textos = 0 	;  

	var fs_suas_comunas = new Array(
		"NNNNNN" ,  
		"NNNNNN") ; 


   	



	var fs_cor_scrap = verdeescuro ; 
	var fs_cor_album = roxoescuro ; 
	var fs_cor_mensagem = marrom  ; 
	var fs_cor_videos = cinzaescuro    ; 
	var fs_cor_gerenciar = azulmarinho  ; 





function addFastScrapLinks() {

if(document.getElementById('fs_adicionou')) { return; }

var suacomuna = false;

if( fs_link_gerenciar == 1){

	 if ( fs_suas_comunas[0] == ""){
	 	window.alert("Informe o cmm da(s) sua(s) comunidade(s) no script \nFastScrapBook Plus para mostrar o link gerencial!")
 		return;
	 }

	for(var i=0; i<fs_suas_comunas.length; i++)
	if( location.href.indexOf("cmm=" + fs_suas_comunas[i]) > -1)
		{
		suacomuna =  fs_suas_comunas[i];
		break;
		}
}

var home_p, ger = false, ilocation = location.href.toLowerCase();

var pg_recados = ilocation.indexOf("scrapbook.aspx") > -1;
var pg_home =  ilocation.indexOf("home.aspx") > -1;
var pg_comuna =  ilocation.indexOf("community.aspx") > -1 ;
var pg_comunas =  ilocation.indexOf("communities.aspx") > -1 ;
var pg_alltopics =  ilocation.indexOf("topics.aspx") > -1 ;
var pg_forum =  ilocation.indexOf("msgs.aspx") > -1 ;
var pg_perfil = ilocation.match(/profile[^f]?\.aspx/);
var pg_fans = ilocation.match(/profilef\.aspx/);
var pg_amigos =  ilocation.indexOf("friends.aspx") > -1 ;
var pg_list_amigos =  ilocation.indexOf("friendslist.aspx") > -1 ;
var pg_album =  ilocation.match(/\.orkut\.com.*album.*\.aspx.*/);
var pg_msg =  ilocation.match(/\.orkut\.com.*messages\.aspx.*/);
var pg_aprove = ilocation.match(/.*commapprove\.aspx.*/);
var pg_enquete = ilocation.match(/.*commpollresults.*/);
var pg_favoritos = ilocation.match(/marks\.aspx.*/);
var pg_videos = ilocation.match(/favoritevideos\.aspx/)

if( suacomuna){

	var temp = suacomuna;
	suacomuna = false;

	if(pg_comuna){
	 for(var i=0; i<document.images.length; i++)
	 {
	 if(document.images[i].src.toLowerCase().indexOf('http://images3.orkut.com/img/i_letter.gif') > -1){
		ger = true;
		suacomuna = temp;
		break;
	  }
	 }
	}

 fs_link_gerenciar = ( ger ? 1 : 0);

}

if( pg_home){
	var x = 4, y = document.getElementsByTagName('table');
	for( var z = 4; z < y.length; z++){
		var zs = y[z].innerHTML.toLowerCase();
		if( zs.indexOf('<table') != -1 &&
			(zs.indexOf('<table') != zs.indexOf('<table class=\"u\"'))
			) continue;
		if( y[z].innerHTML.indexOf('em-vind') > -1 || y[z].innerHTML.indexOf('elcome') > -1 )
			{ x = z; break;}
	}

	home_p = x;

	var tp_tb = document.getElementsByTagName('table')[x];
	if( tp_tb.innerHTML && tp_tb.innerHTML.indexOf('em-vind') == -1 && tp_tb.innerHTML.indexOf('elcom') == -1)
	{
	  home_p++;
	}
} 


var links = document.links;

for (var j=links.length -1; j >= 0; j--) {

 var tpt = getTable( links[j]);
 if( tpt == document.getElementsByTagName('table')[3] && ! (pg_recados || pg_album || pg_aprove)) { continue;}

 var adbr =  ( pg_recados || pg_album || pg_fans || pg_videos ) && links[j].innerHTML.match(/^\s+<img.{2,100}\s*$/);

 if( links[j].innerHTML.match(/<a\s/)){
	  links[j].innerHTML =  links[j].innerHTML.replace(/<a[^>]+>/, '');
	  links[j].innerHTML =  links[j].innerHTML.replace(/<\/a>/, '');
	}	

 var linkdata = links[j].getAttribute("href");

 if(linkdata != null){

	var linkparts = linkdata.split("?");

    if ( linkdata.match(/profile\.aspx\?uid/gi) ) {
	
	
	var s = links[j].innerHTML;
	
	s = s.replace(/^\s+|\s+$/, '');
	
	if( s.length == 0 || s.match(/\/medium\//gi) || 
	 	s.match(/p_profile.gif/gi) ) continue;
		
	var iht;
		
	if( ! s.match(/[<>]/)) iht = 0; 
	else if( s.match(/<img.+>[\W]*$/i)) iht = 1 ; 
	else if( s.match(/<img.+>.*[\r\n]*\w+[\r\n]*\w*/i))  iht = 2; 
 
	var match_texto= ( iht == 0 && ! ( pg_aprove || pg_album) && ( pg_home || pg_comuna || pg_msg || 
			!( pg_fans || pg_amigos || pg_recados || (pg_forum && fs_show_link_textos == 0)) ||
			(pg_forum && fs_show_link_textos != 0)));

	var match_imagem= (iht > 0 && ! pg_enquete && ! pg_favoritos &&  ( pg_fans || pg_aprove || pg_msg ||
			!( pg_comuna || pg_perfil || pg_home || (pg_forum && fs_show_link_textos != 0))));

	if( match_texto || match_imagem ){
			
	  var fsp = document.createElement("span");
	  fsp.setAttribute("style", "color:#6666CC");
	  fsp.innerHTML = " [";
	  var sep = "&nbsp;" ;
	
	  var scrapslink = document.createElement("a");
    	  scrapslink.href="http://www.orkut.com/ScrapBook.aspx?" + linkparts[1] + (fs_quantos >= 20 ? "&pageSize=" + fs_quantos : '');
    	  scrapslink.title="Scrapbook";
	  scrapslink.style.textDecoration = "none";
	  scrapslink.style.color = fs_cor_scrap;

		if( navigator.language.indexOf("pt") > -1)
		  scrapslink.appendChild(document.createTextNode( fs_links_minusculas == 0 ? "R":  "r"));
		else
	  	  scrapslink.appendChild(document.createTextNode( fs_links_minusculas == 0 ? "S":  "s"));

	  fsp.appendChild(scrapslink);

		if( fs_link_album == 1){
	  	var albumlink = document.createElement("a");
		albumlink.href="http://www.orkut.com/AlbumList.aspx?" + linkparts[1];
		albumlink.title="Album";
		albumlink.style.textDecoration = "none";
		albumlink.style.color = fs_cor_album;
		if( fs_links_minusculas == 0)
			albumlink.appendChild( document.createTextNode( fs_link_mensagem == 1 ? "A" : "A" ));
		else
			albumlink.appendChild( document.createTextNode( fs_link_mensagem == 1 ? "a" : "a" ));

		fsp.innerHTML += sep;
		fsp.appendChild(albumlink);
		  }


		  if( fs_link_mensagem == 1){
		var msglink = document.createElement("a");
		msglink.href="http://www.orkut.com/Messages.aspx?a=Compose&" + linkparts[1];
		msglink.title="Messages";
		msglink.style.textDecoration = "none";
		msglink.style.color = fs_cor_mensagem;
	  	msglink.appendChild(document.createTextNode( fs_links_minusculas == 0 ? "M" :  "m" ));
		fsp.innerHTML += sep;
		fsp.appendChild(msglink);
		  }

		  if( fs_link_videos == 1){
		var vidlink = document.createElement("a");
		vidlink.href="http://www.orkut.com/FavoriteVideos.aspx?" + linkparts[1];
		vidlink.title="Videos";
		vidlink.style.textDecoration = "none";
		vidlink.style.color = fs_cor_videos;
	  	vidlink.appendChild(document.createTextNode( fs_links_minusculas == 0 ? "V" :  "v" ));
		fsp.innerHTML += sep;
		fsp.appendChild(vidlink);
		  }

		if( suacomuna && fs_link_gerenciar == 1){
		var gerlink = document.createElement("a");
		gerlink.href="http://www.orkut.com/CommMemberManage.aspx?cmm=" + suacomuna +  "&" + linkparts[1];
		gerlink.title="Message";
		gerlink.style.textDecoration = "none";
		gerlink.style.color = fs_cor_gerenciar;
	  	gerlink.appendChild(document.createTextNode( fs_links_minusculas == 0 ? "G" :  "g" ));
		fsp.innerHTML += sep;
		fsp.appendChild(gerlink);
		  }

		fsp.innerHTML += "]";
 		
 		if(adbr){
		fsp.innerHTML = "<br><br><br><br>" + fsp.innerHTML;
		links[j].parentNode.parentNode.style.height='190px';
		links[j].parentNode.parentNode.style.backgroundPosition='top center';
		}
		
  		if(match_imagem && links[j].innerHTML.match(/<img.+>/i))
		links[j].parentNode.insertBefore( fsp, links[j].nextSibling);
		else
  		if(match_texto && ! links[j].innerHTML.match(/[<>]/))
		links[j].parentNode.insertBefore( fsp, links[j].nextSibling);
		
		
		if( pg_forum) links[j].parentNode.insertBefore( document.createElement("br") , links[j].nextSibling);
	  }
	}
   }
 }

 var fs_adicionou = document.createElement("div");
 fs_adicionou.id = "fs_adicionou";
 document.body.appendChild(fs_adicionou);
}

if(!document.getElementById('fs_adicionou')) addFastScrapLinks();
 
function getTable( filho ){
  var tf = filho;
  while(tf && tf.tagName != "TABLE") tf = tf.parentNode;
  return tf;
 }


