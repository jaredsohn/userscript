// ==UserScript==
// @name           Sorties OVS filtrees en fonction de l'age des organisateurs
// @date           May 2, 2014
// @author         BlazingSun
// @description    Supprimer les sorties OVS organisees en fonction de l'age des organisateurs
// @include        http://*.onvasortir.com/vue_sortie*
// @include        http://*.onvasortir.com/vue_infos.php

// @matches        http://*.onvasortir.com/vue_sortie*
// @matches        http://*.onvasortir.com/vue_infos.php
// @run_at document_end
// ==/UserScript==

//redefinition des methodes pour chrome (partie de code touve sur le web)
if (typeof GM_deleteValue == 'undefined')
{
    GM_getValue = function(name, defaultValue)
    {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type)
        {
            case 'b': return value == 'true';
            case 'n': return Number(value);
            default : return value;
        }
    }

    GM_setValue = function(name, value)
    {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

//la variable bouton recupere l'element bouton qui contient le bouton "Recherche avancée >>" ou "Deviens Membre PREMIUM >>" selon la page
var bouton=document.querySelector('input[value="Recherche avancée >>"]');
if (document.location.href == 'http://paris.onvasortir.com/vue_infos.php')
    bouton=document.querySelector('input[value="Deviens Membre PREMIUM >>"]');
//alert("Debug: "+bouton.parentNode.innerHTML);

//la variable ageSelect1 contient un element liste deroulante pour l'age minimal de notre filtre
//la variable ageSelect2 contient un element liste deroulante pour l'age maximal de notre filtre
var ageSelect1=document.createElement('select'), ageSelect2=document.createElement('select');

//on remplie nos deux listes deroulantes, et on les force sur les valeurs precedemment sauvegardes
for(var i=17; i<100; i++)
{
    if(i == GM_getValue("ageMin", 17)) 
        ageSelect1.innerHTML +='<option value="'+ i +'" selected>De '+ i +' ans </option>';
    else
        ageSelect1.innerHTML +='<option value="'+ i +'">De '+ i +' ans </option>';
    if(i == GM_getValue("ageMax", 99)) 
        ageSelect2.innerHTML +='<option value="'+ i +'" selected>à '+ i +' ans</option>';
    else
        ageSelect2.innerHTML +='<option value="'+ i +'">à '+ i +' ans</option>';
}

//on rajoute nos deux listes deroulantes a la page web avant le bouton
bouton.parentNode.appendChild(ageSelect1);
bouton.parentNode.appendChild(ageSelect2);
bouton.parentNode.insertBefore(ageSelect1,bouton);
bouton.parentNode.insertBefore(ageSelect2,bouton);

//on attribue a nos deux listes deroulantes des actions lorsqu'on leurs selectionne une valeur; sauvegarder nouvelle valeur et rechanger la page si le filtre est actif
ageSelect1.addEventListener('change',function(){
    GM_setValue("ageMin",ageSelect1.options[ageSelect1.selectedIndex].getAttribute('value'));
    if(GM_getValue("etat", false) == true)
        document.location.reload();
},false);
ageSelect2.addEventListener('change',function(){
    GM_setValue("ageMax",ageSelect2.options[ageSelect2.selectedIndex].getAttribute('value'));
    if(GM_getValue("etat", false) == true)
        document.location.reload();
},false);

//on cree un nouveau bouton
var nouveauBouton=document.createElement('input');
nouveauBouton.setAttribute('type','button');
nouveauBouton.setAttribute('value','Activé');
//on attribu a notre bouton une action lorsque l'on clique dessus
nouveauBouton.addEventListener("click",clickButton,false);

//on remplace l'ancien bouton par le notre
bouton.parentNode.replaceChild(nouveauBouton, bouton);

//si le filtre est precedemment active et si l'intervale des ages est correct, alors on filtre directement, sinon non
if(GM_getValue("etat", false) == true && GM_getValue("ageMin", 17) < GM_getValue("ageMax", 99)) 
{
    run();
    nouveauBouton.setAttribute('value','Filtre Activé');
}
else
    nouveauBouton.setAttribute('value','Filtre Non Activé');

//fonction lorsque l'on click sur le bouton
function clickButton()
{
    //si l'on n'a pas active le script precedemment et l'intervale des ages est correct, on l'active et on enregistre son etat, sinon on le desactive et on recharge la page
    if(GM_getValue("etat",false) == false && GM_getValue("ageMin", 17) < GM_getValue("ageMax", 99)) 
    {
        //on sauvegarde le nouvelle etat de filtrage
        GM_setValue("etat", true);
        //on lance notre filtre
        run();
        //on met a jour le texte du bouton
        nouveauBouton.setAttribute('value','Filtre Activé');
        alert('Execution du script "Sorties OVS filtrees en fonction de l\'age des organisateurs"\n\nVous allez filter maintenant les sorties des organisateurs dont l\'age est entre '+GM_getValue("ageMin", 17)+' ans et '+GM_getValue("ageMax", 99)+' ans\n\n\n\nAuteur: BlazingSun (utilisateur OVS Paris)\nPS: Si vous trouvez ce script utile et vous souhaitez remercier pour son travail bénévole son auteur, envoyez-lui un petit message sympa de remerciement sur le site ou payez-lui un coup à boire si vous le rencontrez ;-)\n\nLicence: Copyleft GPLv2');
    }
    else
    {
        //on sauvegarde le nouvelle etat de filtrage
        GM_setValue("etat", false);
        //on recharge la page
        document.location.reload();
    }
}

//on execute le reste du script lorsque l'on appuie sur notre bouton "Sorties -30 ans"
function run()
{
    //la variable toutesLesSorties recupere tous les indentifacateurs de sorties
    var toutesLesSorties = document.querySelectorAll('tr td[style] table tr td img[src^="sortie_"]'); 
    //alert("Debug: "+toutesLesSorties[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('a[onmouseover]').getAttribute('onmouseover'));
    
    //on parcout tous les sorties une a une
    for (var i = 0; i < toutesLesSorties.length; i++)
    {
        //la variable sortie recupere en fonction d'un indentifacateur de sorties toutes les informations sur la sortie
        var sortie = toutesLesSorties[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        //alert("Debug: "+sortie.innerHTML);
        
        //la variable donneesOrganisateur recupere les informations sur l'organisateur de la sortie
        var donneesOrganisateur = sortie.querySelector('a[onmouseover]').getAttribute('onmouseover');   
        //alert("Debug: "+donneesOrganisateur);
        
        //on verifie si l'organisateur a indique son age, sinon on supprime sa sortie de la pageOrganisateur web
        if (donneesOrganisateur.indexOf(' ans') > - 1)
        {
            //la variable ageOrganisateur recupere l'age de l'organisateur de la sortie
            var ageOrganisateur = donneesOrganisateur.substring(donneesOrganisateur.indexOf(' ans<')-2, donneesOrganisateur.indexOf(' ans<'));
            //alert("Debug: "+ageOrganisateur);
            
            //si l'organisateur de la sortie a plus de l'age max, on supprime sa sortie de la page web
            if (ageOrganisateur > GM_getValue("ageMax", 99)) 
            {  
                sortie.parentNode.removeChild(sortie);
                //alert("Debug: "+sortie.innerHTML);
            }
            //si l'organisateur de la sortie a moins de l'age min, on supprime sa sortie de la page web
            if (ageOrganisateur < GM_getValue("ageMin", 17)) 
            {  
                sortie.parentNode.removeChild(sortie);
                //alert("Debug: "+sortie.innerHTML);
            }
        }
        else
        {
            //l'organisateur m'a pas indique son age, on supprime sa sortie de la page web
            sortie.parentNode.removeChild(sortie);
            //alert("Debug: "+sortie.innerHTML);
        }
    }
}
