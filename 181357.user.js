// ==UserScript==
// @name        DealApp : Créateur de Deals
// @namespace   dealabs_deal
// @description Publication d'un deal sur le site de Dealabs depuis les sites de vente
// @include     *
// @version     1.3b
// @grant       none
// ==/UserScript==

//Sites sur lesquels on chargera tout
var sites = ['amazon','fnac','topachat','rueducommerce','auchan'];
var d = document;
var site = d.location.href.split("/")[2].split(".")[1];
//Récupération des paramètres passés en GET dans l'URL
function getUrlParam(VarSearch){
        var SearchString = window.location.search.substring(1);
        var VariableArray = SearchString.split('&');
        for(var i = 0; i < VariableArray.length; i++){
            var KeyValuePair = VariableArray[i].split('=');
            if(KeyValuePair[0] == VarSearch){
                return KeyValuePair[1];
            }
        }
    }

//Gestion sur Dealabs
if((site=='dealabs')&&(getUrlParam("titre").length!=0)) {
    //Récupération des éléments nécessaire à la création du deal
    var url = getUrlParam("url");
    var titre = getUrlParam("titre");
    var prix = getUrlParam("prix");
    var port = getUrlParam("port");
    var categorie = getUrlParam("categorie");
    var subcategorie = getUrlParam("subcategorie");
    var image = getUrlParam("image");
    var description = getUrlParam("description");
    
    function ChangeImageDeal(){
        d.querySelector('input[name=image_url]').value = unescape(image); //Ajout de l'image du deal
        d.querySelector('input[name=image_url]').onchange();
    }

    if((prix=='gratuit')&&(prix!='null')) d.querySelector('#act_gratuit_3').click(); //Activation onglet gratuit si nécessaire
    if(titre!='null') d.querySelector('input[name=title]').value = unescape(titre); //Ajout du titre
    if(url!='null') {
        d.querySelector('input[name=url]').value = unescape(url); //Ajout de l'URL du deal
        d.querySelector('input[name=url]').onchange();
        }
    if(prix!='null') d.querySelector('input[name=price]').value = unescape(prix); //Insertion du prix 
    if(port!='null') d.querySelector('input[name=shipping_cost]').value = unescape(port);//Insertion des frais de port si gratuit
    if(categorie!='null'){
        d.querySelector('select[name=category]').value = categorie; //Réglage de la catégorie
        d.querySelector('select[name=category]').onchange();
        d.querySelector('select[name=subcategory]').value = subcategorie; //Réglage de la sous catégorie
    }
    if(description!='null') d.querySelector('#deal_desc').value = unescape(description);    
    if(image!='null') setTimeout(ChangeImageDeal, 10000); 
}

if(sites.indexOf(site)!='-1'){    
    /******************************* Fonctions pour le script **********************************************/   
    function dealabsCompileURL(url,titre,prix,port,categorie,subcategorie,image,description){
    var lien = dealabsURL;//Création du lien pour Dealabs
        lien += '?url='+escape(url);
        lien += '&titre='+escape(titre);
        lien += '&prix='+escape(prix.replace(/[^0-9.,]+/g,''));
        lien += '&port='+escape(port);
        lien += '&categorie='+categorie;
        lien += '&subcategorie='+subcategorie;
        lien += '&image='+escape(image);
        lien += '&description='+escape(description);
        return lien;
    }
    
    function DealabsBlocPartage(width, lien){
        var dealabsBarre = d.createElement('div');
        dealabsBarre.setAttribute('id','dealabsBarre');
        dealabsBarre.setAttribute('style','width: 57px; height: 57px; position: fixed; bottom: 0; right: 0; z-index: 100;');
        
        var dealabsDealData = d.createElement('a');
        dealabsDealData.setAttribute('target','_blank');
        dealabsDealData.setAttribute('href',lien);
        
        var dealabsBouton = d.createElement('img');
        dealabsBouton.setAttribute('src',dealabsIMG);
        dealabsBouton.setAttribute('width',width+'px');
        
        dealabsDealData.appendChild(dealabsBouton);
        dealabsBarre.appendChild(dealabsDealData);
        
        d.querySelector('body').appendChild(dealabsBarre);
    }
    
    function trouvePrix(site){
        switch(site){
            case 'amazon':
                var prix = d.querySelector('#actualPriceValue').textContent.split(" ")[1]; //Prix
                if(prix == '') prix = 'gratuit'; //Si gratuit
            break;
            case 'fnac':
                var prix = d.querySelector('a[data-basketlink]').getAttribute('onclick').split(",")[1];
            break;
            default:
                prix = null;
            break;
        }
        return prix;
    }
    /******************************* Fin des fonction **********************************************/
    //Variables globales pour les magasins
    var dealabsURL = 'http://www.dealabs.com/deals/post';
    var dealabsIMG = 'http://www.dealabs.com/images/apple-touch-icon.png'; //Image à montrer sur la page 
    
    //Gestion des sites de vente
    var prix = null;
    var url = null;
    var titre = null;
    var port = null;
    var categorie = null;
    var subcategorie = null;
    var image = null;
    var description = null;
    var lien = null;
    
    prix = d.querySelector('[itemprop=price]');
    prix = (prix != null) ? prix.textContent : trouvePrix(site);
    url = d.querySelector('[rel=canonical]');
    url = (url != null) ? url.getAttribute('href') : url;
    
    if(site=='fnac') {
        titre = d.querySelector('span[itemprop=name]'); //Titre
        titre = (titre != null) ? titre.textContent.trim() : null;
        image = d.querySelector('#imgMainVisual');
        image = (image != null) ? image.getAttribute('src') : null;//Image
        port = d.querySelector('span[class="rouge gras"]');
        if(port != null) {
            port = port.textContent;
            port = (port.search(/gratuite/i)!='-1') ? 0 : port.replace(/[^0-9.,]+/g,'');
            }
    }
    
    if(site=='topachat') {
        description = d.querySelector('#descriptif-produit'); //'.short-descr'
        description = (description != null) ? description.textContent.trim().replace(/\s{2,}/g,' ') : null;
        image = d.querySelector('meta[property="og:image"]');
        image = (image != null) ? image.getAttribute('content') : null;
        port = d.querySelector('div[class="small delivery"]');
        if(port != null) {
            port = port.textContent;
            port = (port.search(/offerte/i)!='-1') ? 0 : port.replace(/[^0-9.,]+/g,'') ;
        }
    }
    
    if(site=='amazon') {
        titre = d.querySelector('#btAsinTitle').textContent.trim(); //Titre
        port = d.querySelector('#actualPriceExtraMessaging').textContent; //Frais de port
        if(port.search(/gratuite/i)!='-1') port='0'; //Livraison gratuite
        image = (d.querySelector('#main-image').getAttribute('src')!= undefined) ? d.querySelector('#main-image').getAttribute('src') : d.querySelector('#prodImage').getAttribute('src'); 
        description = d.querySelector('.productDescriptionWrapper');
        description = (description != null) ? description.textContent.trim() : '';
        //Gestion des catégories
        var AMZcat = d.querySelector('#nav-subnav').getAttribute('data-category'); 
        switch(AMZcat) {
            case 'dvd': //DVD & BluRay
                categorie=5;
                subcategorie=11;
            break;
            case 'books': //Livres
            case 'digital-text': //Kindle
                categorie=7;
                subcategorie=14;
            break;
            case 'hi': //Bricolage
                categorie=23;
                subcategorie=27;
            break;
            case 'electronics': //Téléphone
                categorie=2;
                subcategorie=4;
            break;
            case 'photo': //Photo et caméscopes
                categorie=5;
                subcategorie=10;
            break;
            case 'home-theater': //TV & Vidéo
                categorie=5;
                subcategorie=9;
            break;
            default: 
             categorie=0;
             subcategorie=0;
            break;
        }
    }
    lien = dealabsCompileURL(url,titre,prix,port,categorie,subcategorie,image,description); 
    DealabsBlocPartage(57,lien);
}