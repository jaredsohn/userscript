// ==UserScript==
// @name         E-UniverS : Supprimer colo
// @namespace    E-UniverS Scripts
// @description	Permet de remplir automatiquement votre mot de passe pour eviter de le saisir a chaque fois que vous desirez supprimer une colonie 
// @author       Max485
// @version 	 0.1
// @include       *beta*e-univers*renommer*
// ==/UserScript==

/*
	Votre mot de passe est enregistré dans les options de GreaseMonkey la premiere fois que vous supprimer une colonie, 
	et les fois d'apres, il se ré-inscrit directement dans les cases lorsque vous vous trouvez sur la page pour 
	renommer / supprimer vos planetes
*/


var form_suppr = document.getElementsByTagName('form')[1]; // On recupere le formulaire correspondant a la suppression des planetes


function GetID(e) // La fonction permettant d'enregistrer le pass
{
	if(form_suppr.getElementsByTagName('input')[0].value == form_suppr.getElementsByTagName('input')[1].value ) // Dans le cas ou les pass corresponde bien, sinon c'est qu'il sont incorrect
	{
		GM_setValue('E-UniverS_Supprimer_colo', form_suppr.getElementsByTagName('input')[0].value);
	}
}	

if (!GM_getValue('E-UniverS_Supprimer_colo', false) ) // Dans le cas ou le pass n'est pas enregistré
{
	// Alors on les enregistre des que le joueur click sur le bouton Supprimer 
	form_suppr.getElementsByTagName('input')[3].addEventListener('click', GetID, false); 
} 
else // Dans le cas ou les identifiant sont enregistrer
{
	form_suppr.getElementsByTagName('input')[0].value = GM_getValue('E-UniverS_Supprimer_colo'); // On ecrit lepass dans la premiere case
	form_suppr.getElementsByTagName('input')[1].value = GM_getValue('E-UniverS_Supprimer_colo'); // Puis on ecrit le pass dans la seconde case

	// On refait l'enregistrement, dans le cas ou le joueur aurait changé de mot de passe
	form_suppr.getElementsByTagName('input')[3].addEventListener('click', GetID, false); 
}

