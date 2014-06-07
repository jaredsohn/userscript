// ==UserScript==
// @name            TW TOOLS RB et Collections
// @description     TW TOOLS RB et Collections - see history
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/159370*
// @include         http://userscripts.org/scripts/review/159370*
// @version         1.1.5
// @history     1.1.5 Traduction allemande (thanks Hanya)
// @history     1.1.4 suppression tips et color chat présents dans clothcalc, signalement 

des items achetés dans la liste 
// @history     1.1.3 suppression depot rapide présent dans clothcalc
// @history     1.1.2 correction suite maj de clothcalc,affichage des enchères en cours 

dans la liste
//              des collections et pour non prise en compte comme manquants 
// @history     1.1.1 tri liste, améliorations et corrections diverses, et check box 

marché dynamique 
// @history     1.1.0 application des préferences sans rechargement, corrections bugs, 

ajout checkbox marché
// @history     1.0.9.1 amelioration liste items manquants
// @history     1.0.9 correction bugs apres achats
// @history     1.0.8 amelioration de la liste des items manquants
// @history     1.0.8 correction bugs des items manquants
// @history     1.0.7 Correction frais de banque, ajout d'un raccourci liste des items 

manquants de collection
// @history     1.0.6 correction updater
// @history     1.0.5 traduction 'rapide' anglaise (need help for completing 

translations)
// @history     1.0.5 ajout des items manquant des collections dans les marchands et le 

marcheacute;
// @history     1.0.4 correction des paramètres
// @history     1.0.3 ajout des frais bancaires en survol	
// @history	    1.0.2 suppression des fonctionnalit&acute;s ajouteacute;es à   tw-db 

clothcalc
// @history	    1.0.1 correction bouton forum Nouveau pour les admins
// @history     1.0.0 initial base sur script de stewue
// @grant       none 
// ==/UserScript==
function setCookie(){
    	 var loginCode = $("#login_code").val();
    	 var pwd = $("#login_password").val();
    	 var checked = $("[name='checkbox']:checked");
    	 if(checked && checked.length > 0){
    		$.cookie("login_code",loginCode);//
    	 	$.cookie("pwd",$.base64.encode(pwd));
    	 }else{ 
    	    $.cookie("pwd", null); 
    	 }	
   	} 
    function getCookie(){
	  	 var loginCode = $.cookie("login_code");
	  	 var pwd =  $.cookie("pwd");
	  	 if(pwd){
	  		$("[name='checkbox']").attr("checked","true");
	  	 }
	  	 if(loginCode){//
	  		$("#login_code").val(loginCode);
	  	 }
	  	 if(pwd){//
	  		$("#login_password").val($.base64.decode(pwd));
	  	 }
 	}