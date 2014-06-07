// ==UserScript==
// @name            Ipo
// @namespace       
// @description     Ipovedenti - Sfondo chiaro, caratteri scuri
// @include         http://www.facebook.com/*
// @include         http://www.facebook.it/*
// @include         http://facebook.it/*
// @include         http://facebook.com/*
// ==/UserScript==

//
//****Definizione delle funzioni****
//

//Funzione document.evaluate generale
function xpath(query) 
{
    return document.evaluate(
                            query,
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
}

//Aggiunge un foglio di stile che sovrascrive gli stili esistenti
function addGlobalStyle(css) //4.13 Adding CSS styles
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head)
        return;
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function elimina() 
{
    //Rimuove le icone piccole (es. quella dell'IPhone sotto gli stati, ecc.)
    var allImg, thisImg;
    allImg = xpath("//img[@class='UIImageBlock_Image UIImageBlock_ICON_Image img']");
    for (var i = 0; i < allImg.snapshotLength; i++)
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg); //4.9 Removing an element
    }

    allImg = xpath("//img[@class='img']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        //Elimina foto del profilo personale, freccia piccola a fianco di 'Account', logo fb in fondo, foto piccole in 'Persone che potresti conoscere', foto piccole eventi, immagini piccole in pagina 'Richieste per applicazioni'
        if ((thisImg) && ((thisImg.parentNode.id == "navAccountLink") || (thisImg.parentNode.className == "fbxWelcomeBoxBlock UIImageBlock_Image UIImageBlock_MED_Image") || (thisImg.parentNode.className == "imgWrap") || (thisImg.parentNode.className == "ego_image ego_image_small UIImageBlock_Image UIImageBlock_SMALL_Image") || (thisImg.parentNode.className == "UIImageBlock_Image UIImageBlock_ENT_Image") || (thisImg.parentNode.className == "pts UIImageBlock_Image UIImageBlock_ICON_Image")))
            thisImg.parentNode.removeChild(thisImg); //4.9 Removing an element
    }

    //Rimuove immagini profilo in 'Le tue applicazioni'
    allImg = xpath("//img[@class='mrs dashboard_image img']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg); //4.9 Removing an element
    }

    //Rimuove immagini profilo in 'Applicazioni degli amici'
    allImg = xpath("//img[@class='mrs img']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg); //4.9 Removing an element
    }
    
    //Rimuove l'icona piccola a fianco della chat
    allImg = xpath("//img[@class='icon UIImageBlock_Image UIImageBlock_ICON_Image img']");
    for (var i = 0; i < allImg.snapshotLength; i++)
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg); //4.9 Removing an element
    }
    
    //Rimuove foto del profilo nei post pubblicati sia in Home che nelle pagine Profilo
    allImg = xpath("//img[@class='uiProfilePhoto profilePic uiProfilePhotoLarge img']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg);
    }

    //Rimuove immagini profilo in menù messaggi
    allImg = xpath("//img[@class='profileImage UIImageBlock_Image UIImageBlock_SMALL_Image img']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg);
    }
    
    //Rimuove immagini profilo in menù notifiche
    allImg = xpath("//img[@class='uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img']");
    for (var i = 0; i < allImg.snapshotLength; i++)
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg);
    }
    
    //Rimuove le icone a fianco delle liste
    var allI, thisI;
    allI = document.getElementsByTagName('I');
    for (var i = 0; i < allI.length; i++) 
    {
        thisI = allI[i];
        if ((thisI) && (thisI.parentNode.className == "imgWrap") && (thisI.parentNode.nodeName == "SPAN"))
        {
            var daElimSpan = thisI.parentNode;
//            daElimSpan.parentNode.removeChild(daElimSpan);
            daElimSpan.style.display = 'none';
        }
//        if (thisI)
//            thisI.parentNode.removeChild(thisI);
    }

    var allI, thisI;
    allI = document.getElementsByTagName('I');
    for (var i = 0; i < allI.length; i++) 
    {
        thisI = allI[i];
        if (thisI)
            thisI.parentNode.removeChild(thisI);
    }
    
    //Rimuove le immagine del profilo piccole su messaggi
    allTD = xpath("//td[@class='icon']");
    for (var i = 0; i < allTD.snapshotLength; i++) 
    {
        thisTD = allTD.snapshotItem(i);
        if (thisTD)
            thisTD.parentNode.removeChild(thisTD);
    }
    
    //Rimuove lista immagini piccole e medie nella Home (NomeCognome e altre __ persone hanno cambiato la propria immagine o hanno stretto amicizia con NomeCognome e altre __ persone)
    var allDiv, thisDiv;
    allDiv = xpath("//div[@class='uiFacepile uiFacepileLarge']"); //-1-
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }

    allDiv = xpath("//div[@class='uiFacepile uiFacepileMedium']"); //-2-
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }

    //Rimuove immagine piccola in 'Pagine e inserzioni'
    allDiv = xpath("//div[@class='profile_img']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }
   
    //Rimuove immagini in 'Profilo' di utente non amico
    allDiv = xpath("//div[@class='fbProfileScalableThumb photo']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }
    
    //Rimuove le immagini piccole nei commenti a link condivisi nella Home
    var allA, thisA;
    allA = xpath("//a[@class='UIImageBlock_Image UIImageBlock_SMALL_Image']");
    for (var i = 0; i < allA.snapshotLength; i++) 
    {
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.parentNode.removeChild(thisA);
    }
    
    //Rimuove le immagini profilo degli amici nella lista sulla sinistra in Profilo
    allA = xpath("//a[@class='UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allA.snapshotLength; i++) 
    {
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.parentNode.removeChild(thisA);
    }

    //Rimuove le immagini dei profili piccole nei commenti
    allA = xpath("//a[@class='actorPic UIImageBlock_Image UIImageBlock_SMALL_Image']");
    for (var i = 0; i < allA.snapshotLength; i++) 
    {
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.parentNode.removeChild(thisA);
    }
    
    //Rimuove nei nuovi gruppi le immagini profilo utenti piccole
    allA = xpath("//a[@class='mall_profile_pic_link UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allA.snapshotLength; i++) 
    {
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.parentNode.removeChild(thisA);
    }  
    
    //Aumenta l'altezza dei Div che contengono nome e cognomi di amici nella lista sinistra della pagina Profilo
    var allDiv, thisDiv;
    allDiv = xpath("//div[@class='profileFriendsText']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.style.maxHeight = '70px';
    }
    
    //Aumenta l'altezza del Div che contiene i dettagli del profilo di utenti anche non amici
    allDiv = xpath("//div[@class='mediaPageName']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.style.maxHeight = '70px';
    }

    //Aumenta l'altezza del Div che contiene i dettagli del profilo di utenti anche non amici
    allDiv = xpath("//div[@class='profileTemplateContent profileFriendsContent']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.style.maxHeight = '300px';
    }

    //Rimuove immagini Pagina Profilo
    allDiv = xpath("//div[@class='UIImageBlockTemplate_Image UIImageBlockTemplate_MED_Image']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }

    //Rimuove immagini della lista amici in comune
    allDiv = xpath("//ul[@class='uiList uiListHorizontal clearfix']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }

    //Rimuove immagini degli sponsor
    allDiv = xpath("//a[@class='emuEvent1 fbEmuLink image UIImageBlock_Image UIImageBlock_SMALL_Image']");
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            thisDiv.parentNode.removeChild(thisDiv);
    }
    
    //Se ci si trova in un gruppo nuovo elimina la lista delle piccole immagini profilo sulla destra degli utenti che appartengono al gruppo
    //e le immpagini piccole profilo lista degli amici aggiunti al gruppo
    if (document.getElementById("pagelet_group_header"))
    {
        allDiv = xpath("//div[@class='uiFacepile uiFacepileMedium mbm']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if (thisDiv)
                thisDiv.parentNode.removeChild(thisDiv);
        }
    
        allDiv = xpath("//div[@class='uiFacepile uiFacepileMedium mvm']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if (thisDiv)
                thisDiv.parentNode.removeChild(thisDiv);
        }
    } //if
    
    //Se ci si trova in una pagina Profilo con nuova impaginazione elimina foto piccole a sinistra
    if (document.getElementById("pagelet_byline"))
    {
        var allLi, thisLi;
        allLi = xpath("//LI[@class='uiListItem  uiListVerticalItemBorder']");
        for (var i = 0; i < allLi.snapshotLength; i++) 
        {
            thisLi = allLi.snapshotItem(i);
            if ((thisLi) && (thisLi.parentNode.className == "uiList ego_unit"))
                thisLi.parentNode.removeChild(thisLi);
        }
    } //if
    
    //Elimina sezione 'Amici con nuove foto del profilo' in 'Amici'
    var pagelet_friends_recentlyupdated = document.getElementById("pagelet_friends_recentlyupdated");
    if ((pagelet_friends_recentlyupdated) && (pagelet_friends_recentlyupdated.childNodes[0]) && (typeof(pagelet_friends_recentlyupdated.childNodes[0] != 'undefined')))
    {
        var daElim = pagelet_friends_recentlyupdated.childNodes[0];
        daElim.parentNode.removeChild(daElim);
        pagelet_friends_recentlyupdated.id = "pagelet_friends_mod";
    }
}

addGlobalStyle(
'h1, h2, h3, h4, h5, h6, li, span {' +
'  font-size: 18px ! important;' +
'  line-height: 18px ! important;' +
'  font-weight: bold ! important;' +
'  font-family: Arial ! important;' +
'  color: black ! important;' +
'}' +
'h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, span:hover, li:hover {' +
'  background-color: yellow ! important;' +
'  color: black ! important;' +
'}');

addGlobalStyle(
'a {' +
'  font-size: 18px ! important;' +
'  line-height: 18px ! important;' +
'  font-weight: bold ! important;' +
'  font-family: Arial ! important;' +
'  color: #150567 ! important;' + //#150567 = blu scuro
'}' +
'  a:hover {' +
'  background-color: yellow ! important;' +
'  color: red ! important;' +
'}');

addGlobalStyle(
'label {' +
'  font-size: 18px ! important;' +
'  line-height: 18px ! important;' +
'  font-weight: bold ! important;' +
'  font-family: Arial ! important;' +
'  color: #150567 ! important;' +
'}' +
'  label:hover {' +
'  color: red ! important;' +
'}');

addGlobalStyle(
'input {' +
'  font-size: 18px ! important;' +
'  line-height: 18px ! important;' +
'  font-weight: bold ! important;' +
'  font-family: Arial ! important;' +
'  color: #150567 ! important;' +
'}');

addGlobalStyle(
'div {' +
'  font-size: 18px ! important;' +
'  line-height: 18px ! important;' +
'  font-weight: bold ! important;' +
'  font-family: Arial ! important;' +
'  color: black ! important;' +
'}');

addGlobalStyle(
'td {' +
'  font-size: 18px ! important;' +
'  color: black ! important;' +
'}');

document.addEventListener('load', elimina, true);