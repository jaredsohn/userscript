// ==UserScript==
// @name        switch
// @namespace   switch_fiche_cheval
// @description Ce script pour le site equideow permet de basculer de la fiche publique du cheval vers sa fiche privee
// @include     http://gaia.equideow.com/elevage/chevaux/cheval?id=*
// @include     http://gaia.equideow.com/elevage/fiche/?id=*
// @version     1.1.1
// ==/UserScript==
var ps_url = document.location ;
var ps_url_id = ps_url.search.split('&')[0].substr(4) ;
var ps_player_monde = ps_url.host.split('.')[0] ;

var regex_url_privee = /\/elevage\/chevaux\/cheval\?id=.*/ ;
var regex_url_public = /\/elevage\/fiche\/\?id=.*/ ;

if (regex_url_privee.test(ps_url.pathname+ps_url.search))
	{
	var ps_insert_pos = document.getElementById('image-body-content').getElementsByClassName('horsename')[0] ;
	var ps_switch_url = 'http://'+ps_player_monde+'.equideow.com/elevage/fiche/?id='+ps_url_id ;
	
	var ps_switch = document.createElement('a') ;
	ps_switch.setAttribute('href',ps_switch_url) ;
	ps_switch.innerHTML = '<img style="width:16px;margin-left:5px;" src="http://'+ps_player_monde+'.equideow.com/media/equideo/image/fonctionnels/32/loupe.png" title="voir la fiche publique" />' ;
	
	ps_insert_pos.appendChild(ps_switch) ;
	}
else if (regex_url_public.test(ps_url.pathname+ps_url.search))
	{
	var ps_owner = document.getElementById('ownerBoite').getElementsByTagName('a')[0].href.split('=')[1] ;
	var ps_player_id = document.getElementById('menu-profil').getElementsByTagName('a')[3].href.split('=')[1] ;

	if (ps_owner == ps_player_id)
		{
		var ps_insert_pos = document.getElementById('imageCheval').getElementsByClassName('horsename')[0] ;
		var ps_switch_url = 'http://'+ps_player_monde+'.equideow.com/elevage/chevaux/cheval?id='+ps_url_id ;
		
		var ps_switch = document.createElement('a') ;
		ps_switch.setAttribute('href',ps_switch_url) ;
		ps_switch.innerHTML = '<img style="width:16px;margin-left:5px;" src="http://'+ps_player_monde+'.equideow.com/media/equideo/image/fonctionnels/32/loupe.png" title="voir la fiche privee" />' ;
		
		ps_insert_pos.appendChild(ps_switch) ;
		}
	}