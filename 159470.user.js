// ==UserScript==
// @name        favoris_VP
// @namespace   pyroscript_preselection des amis en VP
// @include     http://*.equideow.com/marche/vente/vendre*
// @version     1
// ==/UserScript==
var joueurId = document.getElementById('menu-profil').getElementsByTagName('a')[3].href.split('=')[1] ;
var joueurMonde = document.location.host.split('.')[0] ;

// preselection des ventes reserv?
if (document.getElementById('venteBoxReserveeJoueur'))
	{
	var ami1 = GM_getValue(joueurId+'_'+joueurMonde+'_preselectAmis1' , '') ;
	var ami2 = GM_getValue(joueurId+'_'+joueurMonde+'_preselectAmis2' , '') ;
	var ami3 = GM_getValue(joueurId+'_'+joueurMonde+'_preselectAmis3' , '') ;
	
	var amisHtml = '' ;
	amisHtml = amisHtml+'<div><span id="delAmi1" style="color:red;" title="supprimer">[x]</span> <span id="modAmi1" style="color:green;" title="modifier">[&crarr;]</span> <span id="nomAmi1" onclick="document.getElementById(\'vendreChevalReservation\').value=this.innerHTML;">'+ami1+'</span></div>' ;
	amisHtml = amisHtml+'<div><span id="delAmi2" style="color:red;" title="supprimer">[x]</span> <span id="modAmi2" style="color:green;" title="modifier">[&crarr;]</span> <span id="nomAmi2" onclick="document.getElementById(\'vendreChevalReservation\').value=this.innerHTML;">'+ami2+'</span></div>' ;
	amisHtml = amisHtml+'<div><span id="delAmi3" style="color:red;" title="supprimer">[x]</span> <span id="modAmi3" style="color:green;" title="modifier">[&crarr;]</span> <span id="nomAmi3" onclick="document.getElementById(\'vendreChevalReservation\').value=this.innerHTML;">'+ami3+'</span></div>' ;
	
	var reserveeBox = document.getElementById('venteBoxReserveeJoueur') ;
	
	var amisBox = document.createElement('div') ;
	amisBox.setAttribute('style','width:230px;color:navy;text-decoration:underline;margin:0 12px 0;cursor:pointer;') ;
	amisBox.innerHTML = amisHtml ;
	reserveeBox.parentNode.appendChild(amisBox) ;
	
	var saut = document.createElement('br') ;
	document.getElementById('vendreChevalReservation').parentNode.insertBefore(saut,document.getElementById('vendreChevalReservation')) ;
	
	document.getElementById('delAmi1').addEventListener("click", 
		function(event)
			{
			GM_deleteValue(joueurId+'_'+joueurMonde+'_preselectAmis1') ;
			document.getElementById('nomAmi1').innerHTML = '' ;
			}, true);
	
	document.getElementById('modAmi1').addEventListener("click", 
		function(event)
			{
			GM_setValue(joueurId+'_'+joueurMonde+'_preselectAmis1',prompt("entrez le nom de votre ami")) ;
			document.getElementById('nomAmi1').innerHTML = GM_getValue(joueurId+'_'+joueurMonde+'_preselectAmis1','') ;
			}, true);

	document.getElementById('delAmi2').addEventListener("click", 
		function(event)
			{
			GM_deleteValue(joueurId+'_'+joueurMonde+'_preselectAmis2') ;
			document.getElementById('nomAmi2').innerHTML = '' ;
			}, true);
	
	document.getElementById('modAmi2').addEventListener("click", 
		function(event)
			{
			GM_setValue(joueurId+'_'+joueurMonde+'_preselectAmis2',prompt("entrez le nom de votre ami")) ;
			document.getElementById('nomAmi2').innerHTML = GM_getValue(joueurId+'_'+joueurMonde+'_preselectAmis2','') ;
			}, true);
			
	document.getElementById('delAmi3').addEventListener("click", 
		function(event)
			{
			GM_deleteValue(joueurId+'_'+joueurMonde+'_preselectAmis3') ;
			document.getElementById('nomAmi3').innerHTML = '' ;
			}, true);
	
	document.getElementById('modAmi3').addEventListener("click", 
		function(event)
			{
			GM_setValue(joueurId+'_'+joueurMonde+'_preselectAmis3',prompt("entrez le nom de votre ami")) ;
			document.getElementById('nomAmi3').innerHTML = GM_getValue(joueurId+'_'+joueurMonde+'_preselectAmis3','') ;
			}, true);
	}
	
// modification du design
var imgHorse = document.getElementById('marche-noir-cheval-image') ;
var imgParent = imgHorse.parentNode ;
imgParent.removeChild(imgHorse) ;

imgHorse.removeAttribute('width') ;
imgHorse.removeAttribute('height') ;

imgParent.insertBefore(imgHorse,imgParent.firstChild) ;
document.getElementById('marche-noir-cheval-image').setAttribute('style','float:left;width:75px;height:75px;margin-right:15px;') ;

document.getElementById('vendreCheval').parentNode.setAttribute('style','clear:both;') ;
document.getElementById('page-contents').getElementsByTagName('img')[0].setAttribute('style','margin:-11px -14px auto auto;width:300px;') ;