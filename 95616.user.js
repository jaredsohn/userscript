// ==UserScript==
// @name            FacebookUserScriptNuovo
// @namespace       
// @description     Modifica Facebook
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

//Colora lo sfondo
function sfondo() 
{
    document.body.style.backgroundColor = "#CCFFCC";
    var contentCol = document.getElementById("contentCol");
    if (contentCol)
        contentCol.style.backgroundColor = "#FFFFCC";

    //Colora area richieste
    var contentArea = document.getElementById("contentArea");
    if ((contentArea) && (contentArea.childNodes[0]) && (typeof(contentArea.childNodes[0]) != 'undefined') && (contentArea.childNodes[0].className == "pts uiBoxWhite topborder"))
        contentArea.childNodes[0].style.backgroundColor = "#FFFFCC"; //giallo
    
    //Nel profilo, colora sezione della foto personale
    if (document.getElementById("pagelet_header")) //se ci si trova nella pagina profilo
    {
        var allImg, thisImg;
        allImg = xpath("//div[@class='profile-picture']");
        for (var i = 0; i < allImg.snapshotLength; i++) 
        {
            thisImg = allImg.snapshotItem(i);
            if (thisImg)
                thisImg.style.backgroundColor = "#CCFFCC"; //verde
        }
    }
    
    //Nella pagina richieste, colora lo sfondo dei suggerimenti di pagina
    var fbpage_fan_confirm = document.getElementById("fbpage_fan_confirm");
    if (fbpage_fan_confirm)
        fbpage_fan_confirm.style.backgroundColor = "#FFFFCC";
        
    var allImg, thisImg;
    allImg = xpath("//div[@class='confirm']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.style.backgroundColor = "#FFFFCC";
    }

    //Nella pagina messaggi (nuova impaginazione)
    var MessagingFrame = document.getElementById("MessagingFrame");
    if (MessagingFrame)
        if ((MessagingFrame.childNodes[0]) && (typeof (MessagingFrame.childNodes[0]) != "Undefinied"))
            MessagingFrame.childNodes[0].style.backgroundColor = "#FFFFCC";
}

//HomePage
function homeLista() 
{
    var mostraTutti = document.getElementById("fbGroupActions"); //elemento 'Mostra tutti' nella sezione dei gruppi - elemento 'a'
    //Lista sinistra
    var ULapp = document.getElementById("fbCoreAppsNav"); //tutta la colonna di sinistra
    if (ULapp) //se non è null
        if (document.getElementById("bookmarks_menu")) //se non è stato eliminato
        {
            var allItem, thisItem;
            allItem = xpath("//a[@class='item']");
            
            for (var i = 0; i < allItem.snapshotLength; i++)
            {
                thisItem = allItem.snapshotItem(i);
                if (thisItem)
                {
                    thisItem.parentNode.style.display = 'inline'; //lo rende visibile, per gli elementi della lista che sono nascosti
                    ULapp.appendChild(thisItem.parentNode); //lo appende alla nuova lista
                }
            }//for

            if (mostraTutti) //se nella lista c'è l'elemento 'Mostra tutti'
            {
                var li = document.createElement('li');
                li.appendChild(mostraTutti);
                ULapp.appendChild(li); //lo appende alla medesima lista
                if ((typeof(mostraTutti.childNodes[0].childNodes[1]) != 'undefined') && (mostraTutti.childNodes[0].childNodes[1]))
                    mostraTutti.childNodes[0].childNodes[1].textContent = "Mostra tutti miei gruppi/See all groups"; //come ultimo elemento della lista mette 'Mostra tutti miei gruppi'
            }          

            var pagelet_groups_nav = document.getElementById("pagelet_groups_nav");
            if (pagelet_groups_nav)
                pagelet_groups_nav.style.display = 'hidden';

            var pagelet_apps_nav = document.getElementById("pagelet_apps_nav");
            if (pagelet_apps_nav)
                pagelet_apps_nav.style.display = 'hidden';
                
            var bookmarks_menu = document.getElementById("bookmarks_menu");
            if (bookmarks_menu)
                bookmarks_menu.parentNode.removeChild(bookmarks_menu);          
        }//if ULapp
}

//Menù in alto a destra nella Home
function menuHome() 
{
    //Sposta 'Modifica il mio profilo' dalla posizione in alto a sinistra, al menù a sinistra della pagina
    var pagelet_welcome_box = document.getElementById("pagelet_welcome_box");
    var menuDx = document.getElementById("pageNav"); //UL pageNav -> li, li, li, li (lista Home, Profilo, Account)

    if ((menuDx) && (menuDx.childNodes.length <= 5)) //se non è null e se nella lista sono presenti meno di 5 elementi
    {
        if ((pagelet_welcome_box) && (typeof(pagelet_welcome_box.childNodes[0]) != 'undefined')) //se non è null
        {
            var li = document.createElement('li'); //crea nuovo elemento lista
            var ModPro = pagelet_welcome_box.childNodes[0].childNodes[0].childNodes[1].childNodes[1]; //prende nodo A ('Modifica il mio profilo')
            li.appendChild(ModPro); //li->A->#text
            menuDx.appendChild(li); //UL pageNav -> li, li, li, li, li(nuovo nodo)
        } //if pagelet_welcome_box
    } //if menuDx

    //Elimina la sezione ImmagineProfilo-NomeCognome-ModificaMioProfilo
    if (pagelet_welcome_box)
        pagelet_welcome_box.parentNode.removeChild(pagelet_welcome_box);

    //Cambia il nome del link "Account" in "Account menù"
    var account = document.getElementById("navAccountLink");
    if (account)
        account.textContent = "Menù account";

    //Elimina Foto-NomeCognome nel menù Account (ridondante, apre la pagina del profilo)
    var navAccountInfo = document.getElementById("navAccountInfo");
    if (navAccountInfo)
        navAccountInfo.parentNode.removeChild(navAccountInfo);
}

//Eliminazione immagini 'Home'
function homeImmagini() 
{
    //Elimina le immagini piccole nella Home dei profili
    var allImg, thisImg;
    allImg = xpath("//a[@class='profilePicLink UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allImg.snapshotLength; i++) 
    {
        thisImg = allImg.snapshotItem(i);
        if (thisImg)
            thisImg.parentNode.removeChild(thisImg); //4.9 Removing an element
    }

    //Elimina le immagini piccole nei commenti ai post nella Home
    var allImgII, thisImgII;
    allImgII = xpath("//a[@class='actorPic UIImageBlock_Image UIImageBlock_SMALL_Image']");
    for (var i = 0; i < allImgII.snapshotLength; i++) 
    {
        thisImgII = allImgII.snapshotItem(i);
        if (thisImgII)
            thisImgII.parentNode.removeChild(thisImgII); //4.9 Removing an element
    }

    allImgII = xpath("//a[@class='actorPhoto UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allImgII.snapshotLength; i++) 
    {
        thisImgII = allImgII.snapshotItem(i);
        if (thisImgII)
            thisImgII.parentNode.removeChild(thisImgII); //4.9 Removing an element
    }
    
    //Elimina le immagini piccole nei commenti ai link nella Home     
    var allImgIII, thisImgIII;
    allImgIII = xpath("//a[@class='UIImageBlock_Image UIImageBlock_SMALL_Image']");
    for (var i = 0; i < allImgIII.snapshotLength; i++) 
    {
        thisImgIII = allImgIII.snapshotItem(i);
        if (thisImgIII)
            thisImgIII.parentNode.removeChild(thisImgIII); //4.9 Removing an element
    }

    //Elimina le immagini piccole nella Home riferito ai compleanni
    var allImgIV, thisImgIV;
    allImgIV = xpath("//a[@class='external UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allImgIV.snapshotLength; i++) 
    {
        thisImgIV = allImgIV.snapshotItem(i);
        if (thisImgIV)
            thisImgIV.parentNode.removeChild(thisImgIV); //4.9 Removing an element
    }

    //Elimina le immagini nella Home dei profili nei commenti degli stati di altri utenti
    var allImgV, thisImgV;
    allImgV = xpath("//a[@class='UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allImgV.snapshotLength; i++) 
    {
        thisImgV = allImgV.snapshotItem(i);
        if (thisImgV)
            thisImgV.parentNode.removeChild(thisImgV); //4.9 Removing an element
    }

    //Elimina la lista delle immagini dei profili nel caso 'ha stretto amicizia con..' e 'ha cambiato immagine profilo..'
    var allListaImm, thisListaImm;
    allListaImm = xpath("//div[@class='uiFacepile uiFacepileLarge']"); //grandi
    for (var i = 0; i < allListaImm.snapshotLength; i++) 
    {
        thisListaImm = allListaImm.snapshotItem(i);
        if (thisListaImm)
            thisListaImm.parentNode.removeChild(thisListaImm); //4.9 Removing an element
    }

    var allListaImmI, thisListaImmI;
    allListaImmI = xpath("//div[@class='uiFacepile uiFacepileMedium']"); //medie
    for (var i = 0; i < allListaImmI.snapshotLength; i++) 
    {
        thisListaImmI = allListaImmI.snapshotItem(i);
        if (thisListaImmI)
            thisListaImmI.parentNode.removeChild(thisListaImmI); //4.9 Removing an element
    }

    allListaImmI = xpath("//div[@class='UIImageBlockTemplate_Image UIImageBlockTemplate_MED_Image']"); //immagini amici pagina Profilo
    for (var i = 0; i < allListaImmI.snapshotLength; i++) 
    {
        thisListaImmI = allListaImmI.snapshotItem(i);
        if (thisListaImmI)
            thisListaImmI.parentNode.removeChild(thisListaImmI); //4.9 Removing an element
    }

    //Elimina le immagini in 'è stato taggato nell'album di..' - immagini del profilo
    var allImmTag, thisImmTag;
    allImmTag = xpath("//a[@class='uiPhotoThumb UIImageBlock_Image UIImageBlock_MED_Image']");
    for (var i = 0; i < allImmTag.snapshotLength; i++) 
    {
        thisImmTag = allImmTag.snapshotItem(i);
        if (thisImmTag)
            thisImmTag.parentNode.removeChild(thisImmTag); //4.9 Removing an element
    }

    //Elimina le immagini in 'è stato taggato nell'album di..' -1-
    var allImmTagI, thisImmTagI;
    allImmTagI = xpath("//a[@class='uiPhotoThumb uiAttachmentMedia']");
    for (var i = 0; i < allImmTagI.snapshotLength; i++) 
    {
        thisImmTagI = allImmTagI.snapshotItem(i);
        if (thisImmTagI)
            thisImmTagI.parentNode.removeChild(thisImmTagI); //4.9 Removing an element
    }

    //Elimina le immagini in 'è stato taggato nell'album di..' -2-
    var allImmTagII, thisImmTagII;
    allImmTagII = xpath("//a[@class='mls uiPhotoThumb mls mls uiAttachmentMedia']");
    for (var i = 0; i < allImmTagII.snapshotLength; i++) 
    {
        thisImmTagII = allImmTagII.snapshotItem(i);
        if (thisImmTagII)
            thisImmTagII.parentNode.removeChild(thisImmTagII); //4.9 Removing an element
    }
}

//Eliminazione immagini pagina 'Amici'
function amiciImmagini() 
{
    //Elimina nella pagina "Amici" la sezione centrale 'Amici con nuove foto'
    var fotoProfilo = document.getElementById("pagelet_friends_recentlyupdated");
    if ((fotoProfilo) && (fotoProfilo.childNodes[0]) && (typeof (fotoProfilo.childNodes[0]) != 'undefined'))
    {
        fotoProfilo.childNodes[0].parentNode.removeChild(fotoProfilo.childNodes[0]);
        fotoProfilo.id = "Aggiornati_recente";
    }
    
    //Rimuove le immagini dei profili aggiornati di recente e in 'Eventi'
    var allImm, thisImm;
    allImm = xpath("//a[@class='UIImageBlock_Image UIImageBlock_ENT_Image']"); //elimina anche le immagini in 'Eventi'
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.parentNode.removeChild(thisImm); //4.9 Removing an element
    }
}

//Eliminazione immagini pagina 'Applicazioni'
function applicazioniImmagini() 
{
    //Immagini in 'Le tue applicazioni' e 'Applicazioni degli amici'
    var allImm, thisImm;
    allImm = xpath("//a[@class='UIImageBlock_Image UIImageBlock_ICON_Image']");

    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.parentNode.removeChild(thisImm); //4.9 Removing an element
    }
}

//Pagina 'Conferma richieste' e pagina 'Messaggi'
function immConfRichiestePage() 
{
    var allTD, thisTD;
    allTD = xpath("//td[@class='image']"); //immagini grandi nella pagine delle richieste dei gruppi e dei suggerimenti di pagine
    for (var i = 0; i < allTD.snapshotLength; i++) 
    {
        thisTD = allTD.snapshotItem(i);
        if (thisTD)
            thisTD.parentNode.removeChild(thisTD); //4.9 Removing an element
    }
    
    var allImm, thisImm;
    allImm = xpath("//a[@class='pts UIImageBlock_Image UIImageBlock_ICON_Image']"); //immagini piccole richieste
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.parentNode.removeChild(thisImm); //4.9 Removing an element
    }

    //Elimina immagini dalla pagina Messaggi con nuova impaginazione
    allImm = xpath("//img[@class='uiProfilePhoto UIImageBlock_Image UIImageBlock_MED_Image uiProfilePhotoLarge img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.parentNode.removeChild(thisImm); //4.9 Removing an element
    }
    
    //Nei messaggi da multipli mittenti
    allImm = xpath("//img[@class='uiProfilePhoto uiProfilePhotoLarge img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.parentNode.removeChild(thisImm); //4.9 Removing an element
    }
}

//Colora di rosso i nomi nelle intestazioni h6
function col_h6() 
{
    var allh6, thish6;
    allh6 = xpath("//div[@class='actorName actorDescription']"); //cambiamenti di stato, pubblicazione link, pubblicazione video
    for (var i = 0; i < allh6.snapshotLength; i++) 
    {
        thish6 = allh6.snapshotItem(i);
        if ((thish6) && (typeof (thish6.childNodes[0]) != "undefined") && (thish6.childNodes[0].nodeName == 'A'))
            thish6.childNodes[0].style.color = "red"; //thish6 è un 'div', il suo nodo figlio 0 è un 'a'
    }

    var allName, thisName;
    allName = xpath("//a[@class='passiveName']"); //cambiamenti di stato, pubblicazione link, pubblicazione video
    for (var i = 0; i < allName.snapshotLength; i++) 
    {
        thisName = allName.snapshotItem(i);
        if (thisName)
            thisName.style.color = "red"; //thisName è un 'a'
    }

    var allS, thisS;
    allS = xpath("//span[@class='actorName']"); //seleziona le strutture nomeA -> nomeB (quando un utente scrive sulla bacheca di un altro)
    for (var i = 0; i < allS.snapshotLength; i++) 
    {
        thisS = allS.snapshotItem(i);
        if ((thisS) && (typeof (thisS.childNodes[0]) != "undefined") && (typeof (thisS.childNodes[2]) != "undefined"))
            if ((thisS.childNodes[0].nodeName == 'A') && (thisS.childNodes[2].nodeName == 'A')) 
            {
                thisS.childNodes[0].style.color = "red"; //span di classe actorName ha 3 figli: 'a'(nomeA) 'i'(->) 'a'(nomeB) 
                thisS.childNodes[2].style.color = "red"; //con childNodes[0] e childNodes[2] seleziono i due nomi
            }
    }

    var allA, thisA;
    allA = xpath("//a[@class='actorName']"); //seleziona le strutture nomeA tramite nomeB (quando un utente condivide un link di un altro)
    for (var i = 0; i < allA.snapshotLength; i++) 
    {
        thisA = allA.snapshotItem(i);
        if (thisA) 
        {
            thisA.style.color = "red"; //div di classe actorDescription ha 3 figli: 'a'(nomeA) '#text'('tramite') 'a'(nomeB) 
            thisA.style.color = "red";
        }
    }
}

//Sistemazione delle sezioni sottostanti ciscun post (Mi piace . Commenta . Condividi . ecc)
function sezioneCommentaCondividi() 
{
    //Le sezioni sottostanti ciscu tipo di post fanno parte delle class 'UIActionLinks UIActionLinks_bottom',
    //'UIActionLinks UIActionLinks_bottom UIIntentionalStory_Info', 'add_friend', 'uiTextSubtitle comment_like_2008242'
    //'UIActionLinks UIActionLinks_title', 'UIImageBlock_Content UIImageBlock_ICON_Content', 'uiTextSubtitle commentActions'
    //Eliminazione dei punti separatori nelle sezioni    
    var allSpan, thisSpan;
    allSpan = xpath("//span[@class='UIActionLinks UIActionLinks_bottom']"); //-1-
    for (var i = 0; i < allSpan.snapshotLength; i++) 
    {
        thisSpan = allSpan.snapshotItem(i);
        if (thisSpan)
            eliminaPuntoSeparatore(thisSpan); //richiama la funzione che per ciascuna sezione rimuove i punti separatori (altrimenti letti dallo screenreadea 'punto')
    }

    allSpan = xpath("//span[@class='UIActionLinks UIActionLinks_bottom UIIntentionalStory_Info']"); //-2-
    for (var i = 0; i < allSpan.snapshotLength; i++) 
    {
        thisSpan = allSpan.snapshotItem(i);
        if (thisSpan)
            eliminaPuntoSeparatore(thisSpan);
    }

    allSpan = xpath("//span[@class='add_friend']"); //-3-
    for (var i = 0; i < allSpan.snapshotLength; i++) 
    {
        thisSpan = allSpan.snapshotItem(i);
        if (thisSpan)
            eliminaPuntoSeparatore(thisSpan);
    }

    allSpan = xpath("//span[@class='uiTextSubtitle comment_like_2008242']"); //-4-
    for (var i = 0; i < allSpan.snapshotLength; i++) 
    {
        thisSpan = allSpan.snapshotItem(i);
        if (thisSpan)
            eliminaPuntoSeparatore(thisSpan);
    }

    allSpan = xpath("//span[@class='UIActionLinks UIActionLinks_title']"); //-5-
    for (var i = 0; i < allSpan.snapshotLength; i++) 
    {
        thisSpan = allSpan.snapshotItem(i);
        if (thisSpan)
            eliminaPuntoSeparatore(thisSpan);
    }

    var allDiv, thisDiv;
    allDiv = xpath("//div[@class='UIImageBlock_Content UIImageBlock_ICON_Content']"); //-6-
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            eliminaPuntoSeparatore(thisDiv);
    }

    allDiv = xpath("//div[@class='uiTextSubtitle commentActions']"); //-7-
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            eliminaPuntoSeparatore(thisDiv);
    }

    allDiv = xpath("//div[@class='UIActionLinks UIActionLinks_bottom groupMallFeedback fsm fwn fcg']"); //-8- //Nei nuovi gruppi
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            eliminaPuntoSeparatore(thisDiv);
    }

    allDiv = xpath("//div[@class='mts mts mts UIActionLinks UIActionLinks_bottom groupMallFeedback fsm fwn fcg']"); //-9- //Nei nuovi gruppi
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            eliminaPuntoSeparatore(thisDiv);
    }

    allDiv = xpath("//span[@class='feedback_toggle_link']"); //-9- //Nei post condivisi
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv)
            eliminaPuntoSeparatore(thisDiv);
    }
    
    var q = document.getElementById("q");
    if ((q) && (q.value == "Ricerca")) //se la lingua è italiano
    {    
        //Sostituisce l'icona del pollice su con 'Piace a' nei commenti dei post
        var allImm, thisImm;
        allImm = xpath("//I[@class='cmt_like_icon img spritemap_aanaup sx_32c14b']"); //-1-
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img spritemap_aanaup sx_6a64d7']"); //-2-
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img spritemap_aanaup sx_32c14b']"); //-3- //nei commenti ai post nei nuovi gruppi
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_aanaup sx_6a64d7']"); //-4- //sotto i video
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_8eh8aa sx_f4e9be']"); //-5- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//img[@class='cmt_like_icon img']"); //-6- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }
        
        //Sostituisce l'icona del pollice su più grande con 'Piace a' nei post condivisi
        allImm = xpath("//I[@class='mls img spritemap_aanaup sx_6a64d7']"); //-1-
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='mls img sp_aanaup sx_6a64d7']"); //-2- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='mls img sp_8eh8aa sx_f4e9be']"); //-3- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='mls img sp_6447d4 sx_950f7f']"); //-4- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//img[@class='cmt_like_icon img']"); //-5- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_cwqcqa sx_98f278']"); //-6- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='mls img sp_cwqcqa sx_98f278']"); //-7- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }
        
        //Sostituisce l'icona del fumetto su più grande con 'Commentato da' nei post condivisi
        allImm = xpath("//I[@class='img spritemap_aanaup sx_6c7de3']"); //-1-
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Commentato da ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_aanaup sx_6c7de3']"); //-2- //sotto i video
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Commentato da ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_8ruzz5 sx_477283']"); //-3- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Commentato da ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_5dozpq sx_014474']"); //-4- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Commentato da ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='mls img sp_8dfqpl sx_4ac53f']"); //-5- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//img[@class='img']"); //-6- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if ((thisImm) && (thisImm.parentNode.className == "uiBlingBox feedbackBling")) 
            {
                var testo = document.createTextNode("Commentato da ");
                thisImm.parentNode.insertBefore(testo, thisImm);
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_8dfqpl sx_4ac53f']"); //-7- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Piace a ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }
    } //if lingua italiano

    if ((q) && (q.value == "Search")) //se la lingua è inglese
    {
        allImm = xpath("//I[@class='mls img sp_8dfqpl sx_4ac53f']"); //-1- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Like It ");
                thisImm.parentNode.insertBefore(testo, thisImm);
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//img[@class='img']"); //-2- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if ((thisImm) && (thisImm.parentNode.className == "uiBlingBox feedbackBling"))
            {
                var testo = document.createTextNode("Comments ");
                thisImm.parentNode.insertBefore(testo, thisImm);
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_8dfqpl sx_4ac53f']"); //-3- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Like It ");
                thisImm.parentNode.insertBefore(testo, thisImm);
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='img sp_cwqcqa sx_98f278']"); //-4- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Like It ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        }

        allImm = xpath("//I[@class='mls img sp_cwqcqa sx_98f278']"); //-5- //nuova impaginazione
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm) 
            {
                var testo = document.createTextNode("Like It ");
                thisImm.parentNode.insertBefore(testo, thisImm); //inserisce prima
                thisImm.parentNode.removeChild(thisImm);
            }
        } 
    } //if lingua inglese
        
    //Modifica del tasto 'Commenta' in 'Commenta cliccabile' (letto dallo screen reader)
    var allLink, thisLink;
    allLink = xpath("//label[@class='comment_link']");
    for (var i = 0; i < allLink.snapshotLength; i++) 
    {
        thisLink = allLink.snapshotItem(i);
        thisLink.style.color = "#461B7E"; //colora 'Commenta' di viola per rendere più chiara la visione della sezione
        if ((thisLink) && (thisLink.id != "comment_link_cliccabile")) 
        {
            newElem = document.createElement('a'); //nuovo elemento 'a'
            thisLink.parentNode.insertBefore(newElem, thisLink.nextSibling); //inserisce dopo
            newElem.appendChild(thisLink); //il commento diventa così alla lettura dello screen reader 'commento cliccabile'
            thisLink.id = "comment_link_cliccabile"; //cambia l'id per evitare che ad ogni caricamento i commenti già esaminati vengano cambiati di nuovo
        }
    }

    allLink = xpath("//label[@class='uiLinkButton comment_link']"); //tasto "Commenta" nelle pagine dei nuovi gruppi
    for (var i = 0; i < allLink.snapshotLength; i++) 
    {
        thisLink = allLink.snapshotItem(i);
        thisLink.style.color = "#461B7E"; //colora 'Commenta' di viola per rendere più chiara la visione della sezione
        if ((thisLink) && (thisLink.id != "comment_link_cliccabile")) 
        {
            newElem = document.createElement('a'); //nuovo elemento 'a'
            thisLink.parentNode.insertBefore(newElem, thisLink.nextSibling); //inserisce dopo
            newElem.appendChild(thisLink); //il commento diventa così alla lettura dello screen reader 'commento cliccabile'
            thisLink.id = "comment_link_cliccabile"; //cambia l'id per evitare che ad ogni caricamento i commenti già esaminati vengano cambiati di nuovo
        }
    }

    //Elimina il link nell'espressione '__ minuti fa' in tutte le pagine
    //Per tutti gli elementi di tipo 'abbr'(abbreviations) se non hanno la classe specificata, la etichetto come 'timestamp'
    var allAbbr, thisAbbr;
    allAbbr = document.getElementsByTagName('ABBR');
    for (var i = 0; i < allAbbr.length; i++) 
    {
        thisAbbr = allAbbr[i];
        if (!thisAbbr.className) //se è null
            thisAbbr.className = "timestamp";
    }

    //Per ogni abbr, controlla se il suo nodo padre è un 'a' (quindi un link); nel caso lo sia elimina il link e attacca 'abbr' al nodo padre ancora superiore
    var allTimeStamp, thisTimeStamp;
    allTimeStamp = xpath("//ABBR[@class='timestamp']");
    for (var i = 0; i < allTimeStamp.snapshotLength; i++) 
    {
        thisTimeStamp = allTimeStamp.snapshotItem(i);
        if (thisTimeStamp)
            if (thisTimeStamp.parentNode.nodeName == 'A') //SPAN -> A -> ABBR >>>>> SPAN -> ABBR
            {
                var a = thisTimeStamp.parentNode;
                thisTimeStamp.parentNode.parentNode.appendChild(thisTimeStamp); //seleziona thisTimeStamp e lo sposta
                a.parentNode.removeChild(a);
                thisTimeStamp.style.color = "blue"; //colora di blue l'espressione '__ minuti fa' solo nel caso in cui prima fossero link
            }
    }
}

//Elimina il punto separatore (richiamata nella funzione sezioneCommentaCondividi())
function eliminaPuntoSeparatore(thisElem) 
{
    var childs = thisElem.childNodes.length; //numero di nodi figli di ciascuna sezione passata come parametro
    for (var j = 0; j < childs; j++)
        if ((typeof(thisElem.childNodes[j]) != "undefined") && (thisElem.childNodes[j].nodeName == "#text")) //il controllo 'undefined' è necessario perchè rimuovendo degli elementi il numero childs decresce quindi può esserci un errore di 'undefined'
            if (thisElem.childNodes[j].nodeValue == " · ") //se è un '#text' ed ha valore '.' allora va rimosso
                thisElem.childNodes[j].parentNode.removeChild(thisElem.childNodes[j]);
}

//Eliminazione di alcune sezioni nella colonna destra della Home e dei Link/Eventi
function pagineColDestra()
{
    //Elimina la sezione 'Sponsorizzata' in Home
    var sponsorizzata = document.getElementById("pagelet_adbox");
    var sponsorizzataAggiuntiva = document.getElementById("pagelet_netego_ads");
        
    if (sponsorizzata)
        sponsorizzata.parentNode.removeChild(sponsorizzata);
        
    if (sponsorizzataAggiuntiva)
        sponsorizzataAggiuntiva.parentNode.removeChild(sponsorizzataAggiuntiva);

    //Nelle pagine di Link, Eventi e Note rimuove la sezione a destra delle sponsorizzazioni e di altre sezioni
    var allDiv, thisDiv;
    allDiv = xpath("//div[@class='ego_section']"); //div (class mbl..) -> div (class ego_section) -> div -> div -> a, div -> H4 (in Link, Eventi, pagine Profilo)
                                                   //div (class mbl..) -> div (class ego_section) -> div -> div -> div -> H4 (in Note)
    for (var i = 0; i < allDiv.snapshotLength; i++) 
    {
        thisDiv = allDiv.snapshotItem(i);
        if (thisDiv) //caso Link ed Eventi
        {
            if ((typeof(thisDiv.childNodes[0]) != 'undefined') && (typeof(thisDiv.childNodes[0].childNodes[0]) != 'undefined') && (typeof (thisDiv.childNodes[0].childNodes[0].childNodes[1]) != 'undefined')) 
                if ((typeof(thisDiv.childNodes[0].childNodes[0].childNodes[1].childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].childNodes[0].childNodes[1].childNodes[0].nodeName == "H4")) 
                {
                    var testoH4 = thisDiv.childNodes[0].childNodes[0].childNodes[1].childNodes[0].textContent;
                    if (((testoH4 == "Sponsorizzata") || (testoH4 == "Sponsored") || (testoH4 == "Sponsorizzate")) && (thisDiv.parentNode))
                        thisDiv.parentNode.removeChild(thisDiv);
                }
        
            if ((typeof(thisDiv.childNodes[0]) != 'undefined') && (typeof(thisDiv.childNodes[0].childNodes[0]) != 'undefined') && (typeof (thisDiv.childNodes[0].childNodes[0].childNodes[0]) != 'undefined'))
                if ((typeof(thisDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeName == "H4")) 
                {
                    var testoH4 = thisDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0].textContent;
                    if (((testoH4 != "Connettiti") || (testoH4 != "Get connected")) && ((testoH4 != "Poke") || (testoH4 != "Pokes")) && (!document.getElementById("pagelet_header"))) //se c'è la 'pagelet_header' ci si trova nella pagina profilo utente non amico, quindi l'intestazione 'Tu e ____' non va cancellata
                        thisDiv.parentNode.removeChild(thisDiv);
                    if (((testoH4 == "Album fotografici dei tuoi amici") || (testoH4 == "Foto degli amici") || (testoH4 == "Friends' photo albums")) && (thisDiv.parentNode))
                        thisDiv.parentNode.removeChild(thisDiv);
                }
        }
    } //for

    //Rimuove i loghi nelle sezioni rimanenti nella colonna destra
    var allImm, thisImm;
    allImm = xpath("//a[@class='ego_image ego_image_small UIImageBlock_Image UIImageBlock_SMALL_Image']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.parentNode.removeChild(thisImm);
    }

    //Rimuove colonna inserzioni
    var inserzioni = document.getElementById("sidebar_ads");
    if (inserzioni)
        inserzioni.parentNode.removeChild(inserzioni);

    //Rimuove la sezione pubblicitaria a destra dalla pagina di ricerca
    var pagelet_search_ads = document.getElementById("pagelet_search_ads2");
    if (pagelet_search_ads)
        pagelet_search_ads.parentNode.removeChild(pagelet_search_ads);

    //Rimuove immagini piccole degli amici che parteciperanno ad un determinato evento ma non fanno parte della sezione chat a sinistra
    var allImmA, thisImmA;
    allImmA = xpath("//a[@class='uiTooltip link']");

    for (var i = 0; i < allImmA.snapshotLength; i++) 
    {
        thisImmA = allImmA.snapshotItem(i); //se non fanno parte della sezione chat (ovvero se non hanno il nodo padre LI e il nodo padre della class che identifica la lista della chat sulla sinistra)
        if ((thisImmA) && (thisImmA.parentNode.className != "uiFacepileItem uiListItem  uiListHorizontalItemBorder uiListHorizontalItem chatOnline"))
            thisImmA.parentNode.removeChild(thisImmA); //4.9 Removing an element
    }

    //Nella Home nella colonna di destra visualizza tutti gli inviti a eventi nascosti (senza dover premete il tasto 'mostra tutti'
    var allDivNasc, thisDivNasc;
    allDivNasc = xpath("//div[@class='UIUpcoming_Item hidden_elem']"); //elementi nascosti

    for (var i = 0; i < allDivNasc.snapshotLength; i++) 
    {
        thisDivNasc = allDivNasc.snapshotItem(i);
        if (thisDivNasc)
            thisDivNasc.className = "UIUpcoming_Item"; //cambia il nome della classe (diventano della stessa classe degli elementi non nascosti)
        if (i == (allDivNasc.snapshotLength - 1)) //se thisDivNasc è l'ultimo nodo figlio (cioè il contatore 'i' è arrivato al totale - 1 perchè si parte da zero)
            if ((thisDivNasc.parentNode.lastChild) && (typeof(thisDivNasc.parentNode.lastChild) != 'undefined')) //se non è null o undefined
                thisDivNasc.parentNode.parentNode.lastChild.removeChild(thisDivNasc.parentNode.lastChild); //rimuove l'ultimo nodo figlio di thisDivNasc.parentNode
    }
}

//Elimina le immagini nell'area Messaggi
function immMessaggi() 
{
    //Rimuove le immagini profili nell'area Messaggi
    allImm = xpath("//TD[@class='icon']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            if ((thisImm.parentNode) && (typeof(thisImm.parentNode) != 'undefined'))
            thisImm.parentNode.removeChild(thisImm);
    }

    //Rimuove le immagini profili nell'area Messaggi, nella conversazione
    allImm = xpath("//div[@class='GBThreadMessageRow_Image']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            if ((thisImm.parentNode) && (typeof(thisImm.parentNode) != 'undefined'))
            thisImm.parentNode.removeChild(thisImm);
    }
}

//Apporta modifiche alle pagine e inserzioni
function pagineInser() 
{
    var profile_name = document.getElementById("profile_name");
    if (profile_name) //le pagine vecchia impostazione hanno 'profile_name'
    {
        //Dopo l'eliminazione della colonna destra, la pagina si sposta tutta a destra; in questo modo viene allineata a sinistra (funzione float serve per l'allineamento, siccome float è parola riservata si usa cssFloat)
        var right_column = document.getElementById("right_column");
        if (right_column)
            right_column.style.cssFloat = "left";
        
        //Colora settori
        //1.Post
        var parteCentraleDiv = document.getElementById("profile_minifeed");
        if (parteCentraleDiv) //se non è null
        {
            var childsCentr = parteCentraleDiv.childNodes.length;
            for (var k = 0; k < childsCentr; k++)
                parteCentraleDiv.childNodes[k].style.backgroundColor = "#CCFFCC";
        }

        //2.Div della story
        var allDiv, thisDiv;
        allDiv = xpath("//div[@class='UIStream']"); //Div class UIStream -> Div, Div, ..., Div della story
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if (thisDiv) 
            {
                var childs = thisDiv.childNodes.length; //numero di nodi figli (div della story)
                for (var j = 0; j < childs; j++)
                    if ((thisDiv.childNodes[j]) && (typeof(thisDiv.childNodes[j]) != 'undefined'))
                        if (thisDiv.childNodes[j].nodeName == "DIV")
                        thisDiv.childNodes[j].style.backgroundColor = "#CCFFCC";
            } //if
        } //for
    
        //Colora lo sfondo della pagina
        allDiv = xpath("//div[@class='profile_top_wash']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if (thisDiv) 
                    thisDiv.childNodes[i].style.backgroundColor = "#CCFFCC";
        }

        //Elimina le immagini nella bacheca della pagina
        var allImm, thisImm;
        allImm = xpath("//a[@class='UIIntentionalStory_Pic']");
        for (var i = 0; i < allImm.snapshotLength; i++) 
        {
            thisImm = allImm.snapshotItem(i);
            if (thisImm)
                thisImm.parentNode.removeChild(thisImm);
        }
    
        //Appende sotto l'intestazione H1 la sezione "Condividi/Share" per scrivere post in una pagina
        var feedwall_with_composer = document.getElementById("feedwall_with_composer");
        if ((feedwall_with_composer) && (feedwall_with_composer.childNodes[0]) && (typeof (feedwall_with_composer.childNodes[0] != 'undefined'))) 
        {
                var composer = feedwall_with_composer.childNodes[0];
                profile_name.parentNode.parentNode.appendChild(composer);
        }
    }//if profile_name
}

//Sistemazione colonna sinistra nelle pagine dei profili (di pagine o gruppi, profili con vecchia impostazione)
function colSinistraProfilo() 
{
    if (document.getElementById("profile_name"))
    {
        //Numera nel Dom i div di classe profile_actions
        var allProfileActions, thisProfileActions;
        allProfileActions = xpath("//div[@class='profile_actions']");
        for (var i = 0; i < allProfileActions.snapshotLength; i++) 
        {
            thisProfileActions = allProfileActions.snapshotItem(i);
            if (thisProfileActions)
                thisProfileActions.id = "ProfiloActions" + i;
        }

        //Una volta numerati seleziona quello che m'interessa (0)
        var ProfiloActions0 = document.getElementById("ProfiloActions0");
        if ((ProfiloActions0) && (!document.getElementById("ListaAzioni")))
        {
            if ((ProfiloActions0.childNodes[0]) && (typeof(ProfiloActions0.childNodes[0]) != 'undefined'))
                if ((typeof (ProfiloActions0.childNodes[0].childNodes[0]) != 'undefined') && (ProfiloActions0.childNodes[0].childNodes[0].nodeName != "H5")) //se non è null e non è ancora stata aggiunta l'intestazione (e di conseguenza nemmeno la lista)
                {
                    //Aggiunge un'intestazione alla sezione lista nella pagina profilo a sinistra
                    var H5Int = document.createElement('H5'); //crea un elemento H5
                    H5Int.className = "box_header UITitle UITitle_h5"; //definisce la classe uguale a quella delle altre intestazioni H5
                    H5Int.appendChild(document.createTextNode("Actions List/Lista azioni")); //indica il nome della sezione
                    H5Int.id = "ListaAzioni";
                    var divIns = document.createElement('div')
                    divIns.className = "uiHeaderTopAndBottomBorder mbm pbs uiSideHeader mbm"; //crea un Div grigio nel quale inserisce l'H5
                    divIns.appendChild(H5Int);
                    ProfiloActions0.appendChild(divIns);
                }  
            //Crea la lista con la funzione creaLista()
            var ul = creaLista();
            ProfiloActions0.appendChild(ul); //la appende sotto il div ProfiloActions0
        }//ProfiloActions0      
    }//if profile_name
}

//Crea la lista nella colonna di sinistra (richiamata nella funzione colSinistraProfilo())
function creaLista() 
{
    //Seleziono gli elementi da mettere in lista che sono 'a' di class ' profile_action actionspro_a' o ' action actionspro_a'
    var ul = document.createElement('ul');
    var allAction, thisAction;
    allAction = xpath("//a[@class=' profile_action actionspro_a']");
    for (var i = 0; i < allAction.snapshotLength; i++) 
    {
        thisAction = allAction.snapshotItem(i);
        if (thisAction) 
        {
            var li = document.createElement('li');
            li.appendChild(thisAction);
            ul.appendChild(li);
        }
    }

    var allActionI, thisActionI;
    allActionI = xpath("//a[@class=' action actionspro_a']"); //come 'crea un badge del profilo' (secondary actions)
    for (var i = 0; i < allActionI.snapshotLength; i++) 
    {
        thisActionI = allActionI.snapshotItem(i);
        if (thisActionI) 
        {
            var li2 = document.createElement('li');
            li2.appendChild(thisActionI);
            ul.appendChild(li2);
            thisActionI.className = ' profile_action actionspro_a'; //modifica la class, così la formattazione diviene tutta uguale
        }
    }

    var allH4, thisH4; //aggiungo in lista le sezioni H4 (es. num amici, num pagine, ecc)
    allH4 = xpath("//H4[@class='box_header clearfix']"); //nel Dom si ha H4 -> SPAN -> A oppure H4 -> SPAN -> #text, A
    for (var i = 0; i < allH4.snapshotLength; i++) 
    {//for
        thisH4 = allH4.snapshotItem(i);
        if (thisH4)
            if ((typeof(thisH4.childNodes[0]) != "undefined") && (thisH4.childNodes[0].nodeName == "SPAN")) //thisH4.childNodes[0] = SPAN
            {//if1
                if ((typeof(thisH4.childNodes[0].childNodes[0]) != "undefined") && (thisH4.childNodes[0].childNodes[0].nodeName == "A")) //thisH4.childNodes[0].childNodes[0] = A
                { //H4 -> SPAN -> A -> #text
                    var a = thisH4.childNodes[0].childNodes[0]; //thisH4.childNodes[0].childNodes[0] = A
                    var li3 = document.createElement('li');
                    li3.appendChild(a);
                    ul.appendChild(li3);
                    a.className = ' profile_action actionspro_a'; //Formattazione uguale a quella degli altri elementi della lista
                }
                //else if tratta il caso in cui dopo l'intestazione H4 si ha ad es 'num di numTot link' oppure 'num di numTot album' (nella lista aggiungerà numTot album, numTot link, ecc)
                else if ((typeof(thisH4.childNodes[0].childNodes[1]) != "undefined") && (thisH4.childNodes[0].childNodes[1].nodeName == "A")) 
                { //H4 -> SPAN -> #text, A -> #text
                    var a = thisH4.childNodes[0].childNodes[1]; //thisH4.childNodes[0].childNodes[1] = A
                    var li3 = document.createElement('li');
                    li3.appendChild(a);
                    ul.appendChild(li3);
                    a.className = ' profile_action actionspro_a'; //per la formattazione
                }
            } //if1
            //else if1 tratta il caso in cui si abbia H4 -> SMALL -> A ('mostra tutto'); (si ha nelle proprie pagine in cui la sezione 'piace a num amici' non è link, c'è solo il link in H4 'mostra tutto')
            else if ((typeof(thisH4.childNodes[0]) != "undefined") && (thisH4.childNodes[0].nodeName == "SMALL")) 
            {
                if ((typeof(thisH4.childNodes[0].childNodes[0]) != "undefined") && (thisH4.childNodes[0].childNodes[0].nodeName == "A"))
                    if (thisH4.parentNode.parentNode.firstChild.nodeName == "H5") 
                    {
                        var a = thisH4.childNodes[0].childNodes[0];
                        var testoH5 = thisH4.parentNode.parentNode.firstChild.textContent; //al posto di 'mostra tutto' metto il testo riportato nell'intestazione H5 (ad es. 'piace a num persone') che però non è link
                        a.textContent = testoH5; //il testo del link prende come valore il testo H5
                        var li4 = document.createElement('li');
                        li4.appendChild(a);
                        ul.appendChild(li4);
                        a.className = ' profile_action actionspro_a'; //per la formattazione
                    }
                else if (thisH4.parentNode.firstChild.nodeName == "H5") 
                {
                    var a = thisH4.childNodes[0].childNodes[0];
                    var testoH5 = thisH4.parentNode.firstChild.textContent; //al posto di 'mostra tutto' metto il testo riportato nell'intestazione H5 (ad es. 'Insights') che però non è link
                    a.textContent = testoH5; //il testo del link prende come valore il testo H5
                    var li4 = document.createElement('li');
                    li4.appendChild(a);
                    ul.appendChild(li4);
                    a.className = ' profile_action actionspro_a'; //per la formattazione
                }
            } //elseif1
    } //for i

    //Aggiunge alla lista il link 'Suggerisci amici' (nelle pagine dei profili di altri utenti)
    var profile_action_suggest_friends = document.getElementById("profile_action_suggest_friends");
    if (profile_action_suggest_friends) //se non è null
    {
        var liSugg = document.createElement('li');
        liSugg.appendChild(profile_action_suggest_friends);
        ul.appendChild(liSugg);
        profile_action_suggest_friends.className = ' profile_action actionspro_a'; //per la formattazione
    }

    //Rende visibili tutte le informazioni personali del box 'Informazioni'    
    var allInfo, thisInfo;
    allInfo = xpath("//dl[@class='info']");
    for (var i = 0; i < allInfo.snapshotLength; i++) 
    {
        thisInfo = allInfo.snapshotItem(i);
        if (thisInfo) 
        {
            var childs = thisInfo.childNodes.length; //numero di nodi figli (numero delle informazioni da visualizzare)
            for (var j = 0; j < childs; j++)
                thisInfo.childNodes[j].style.display = 'inline'; //rende visibile
        }
    }

    //Rimuove il tasto box editor in 'Informazioni' (il tasto serve a modificare la modalità di visualizzazione delle informazioni, ma sono già state rese tutte visibili)
    var info = document.getElementById("basic_info_summary_box");
    if (info) //se info non è null
    {
        var nodiFigli = info.childNodes.length; //numero di nodi figli di 'Informazioni' da controllare
        for (var i = 0; i < nodiFigli; i++)
            if (typeof(info.childNodes[i]) != "undefined") //può essere undefined il nodo figlio dopo un'eliminazione
            if ((info.childNodes[i].className == "box_editor ") || (info.childNodes[i].className == "box_editor hidden_elem"))
            info.childNodes[i].parentNode.removeChild(info.childNodes[i]); //rimuove il box editor individuato
    } //if info

    //Elimina la colonna di sinistra che contiene tutti i box        
    var colonSinis = document.getElementById("boxes_left");
    if (colonSinis) //se non è null
        colonSinis.parentNode.removeChild(colonSinis);

    //Elementi della propria pagina Profilo
    var caricaImm = document.getElementById("profile_picture_upload"); //-1-
    if (caricaImm) //se non è null
    {
        var li4 = document.createElement('li');
        li4.appendChild(caricaImm); //caricaImm = A    
        caricaImm.className = ' profile_action actionspro_a';
        caricaImm.textContent = "Carica un'immagine per il profilo";
        ul.appendChild(li4); //appende alla lista ul di prima
    }

    var rimuoviImm = document.getElementById("profile_picture_remove"); //-2-
    if (rimuoviImm) //se non è null
    {
        var li1 = document.createElement('li');
        li1.appendChild(rimuoviImm); //rimuoviImm = A
        rimuoviImm.className = ' profile_action actionspro_a';
        rimuoviImm.textContent = "Rimuovi l'immagine profilo";
        ul.appendChild(li1);
    }

    var divCambiaImm = document.getElementById("edit_profilepicture");
    if (divCambiaImm) //se non è null
        divCambiaImm.style.display = "none"; //nasconde il menù 'Cambia immagine'

    return ul; //restituisce la lista
}

//Avvisa gli utenti non vedenti che è stato aperto un nuovo form alla pressione di determinati pulsanti
function formAperti() 
{
    var allA, thisA;
    allA = document.getElementsByTagName('a');
    var numero = allA.length; //numero di 'a'
    for (var i = 0; i < numero; i++) 
    { //-1- 'condividi'
        thisA = allA[i];
        if (thisA.textContent == "Condividi") //tra tutti gli 'a' controllo che sia il link 'condividi'
        {
            thisA.className = 'LinkCondividi';
            thisA.addEventListener('click', avvisa, true); //al click sulla scritta 'condividi' si apre un messaggio di avviso che è stato aperto un form di conferma
        }
    }

    allA = xpath("//a[@class='mlm uiTooltip mlm mlm hideButton mlm uiCloseButton uiCloseButton uiCloseButton']"); //tasti rimuovi
    for (var i = 0; i < allA.snapshotLength; i++) 
    { //-2- 'rimuovi'
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.addEventListener('click', avvisa, true); //al click sulla 'X' del tasto rimuovi si apre un messaggio di avviso dell'apertura di un nuovo form         
    }

    allA = xpath("//a[@class='uiCloseButton uiCloseButton uiCloseButton']"); //tasti rimuovi amici
    for (var i = 0; i < allA.snapshotLength; i++) 
    { //-3- 'rimuovi amici'
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.addEventListener('click', avvisa, true); //al click sulla 'X' del tasto rimuovi si apre un messaggio di avviso dell'apertura di un nuovo form         
    }

    allA = xpath("//a[@class='uiButton']"); //tasti 'aggiungi agli amici'
    for (var i = 0; i < allA.snapshotLength; i++) 
    { //-4- 'aggiungi agli amici'
        thisA = allA.snapshotItem(i);
        if (thisA)
            thisA.addEventListener('click', avvisa, true); //al click sul tasto 'aggiungi agli amici' si apre un messaggio di avviso dell'apertura di un nuovo form         
    }

    //-5- 'aggiungi agli amici'
    if (document.getElementById("profile_connect"))
        document.getElementById("profile_connect").addEventListener('click', avvisa, true); //al click sul tasto 'aggiungi agli amici' si apre un messaggio di avviso dell'apertura di un nuovo form
}

//Funzione richiamata da formAperti()
function avvisa() 
{
    alert("Form di conferma aperto!");
}

//Specifica l'attributo ALT nelle immagini
function immaginiALT() 
{
    var allImm, thisImm;
    allImm = xpath("//img[@class='img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            if ((typeof (thisImm.parentNode) != "undefined") && (thisImm.parentNode.nodeName == "SPAN"))
            thisImm.setAttribute('ALT', 'Icona Applicazione');
        else if ((typeof (thisImm.parentNode) != "undefined") && (thisImm.parentNode.nodeName == "A") && (thisImm.parentNode.className == "uiPhotoThumb UIMediaItem_Wrapper"))
            thisImm.setAttribute('ALT', 'Immagine taggata');
        else if ((typeof (thisImm.parentNode) != "undefined") && (thisImm.parentNode.nodeName == "A") && (thisImm.parentNode.className == "uiVideoThumb"))
            thisImm.setAttribute('ALT', 'Video');
    }

    allImm = xpath("//img[@class='staticAppIcon UIImageBlock_Image UIImageBlock_ICON_Image']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Icona Applicazione Statica');
    }

    allImm = xpath("//img[@class='mll pls loader img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Loading');
    }

    allImm = xpath("//img[@class='loadingIndicator img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Loading');
    }

    allImm = xpath("//img[@class='icon UIImageBlock_Image UIImageBlock_ICON_Image img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Icona Chat');
    }

    allImm = xpath("//img[@class='UIImageBlock_Image UIImageBlock_ICON_Image img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Icona');
    }

    allImm = xpath("//img[@class='profileImage UIImageBlock_Image UIImageBlock_SMALL_Image img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Immagine Profilo');
    }

    allImm = xpath("//img[@class='uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Foto Profilo');
    }

    allImm = xpath("//img[@class='jewelLoading img']");
    for (var i = 0; i < allImm.snapshotLength; i++) 
    {
        thisImm = allImm.snapshotItem(i);
        if (thisImm)
            thisImm.setAttribute('ALT', 'Loading notifications');
    }
}

//Associa il titolo alle icone in 'Invia nuovo messaggio'
function iconeBottoni() 
{
    var allA, thisA;
    allA = xpath("//a[@class='uiTooltip uiButton uiButtonSuppressed uiButtonNoText']");
    for (var i = 0; i < allA.snapshotLength; i++) 
    {
        thisA = allA.snapshotItem(i);
        if (thisA) 
        {
            testo = thisA.childNodes[2].childNodes[0].textContent; //testo dello span che indica a cosa si riferisce quella determinata icona
            if ((testo) && (typeof(testo) != 'undefined'))
                thisA.setAttribute('title', testo); //attribuisce il titolo all'icona
        }
    }
}

//Struttura nuovi gruppi
function nuoviGruppi() 
{
    var pagelet_group_header = document.getElementById("pagelet_group_header");
    if (pagelet_group_header) //se siamo nella struttura dei gruppi nuovi (i vecchi gruppi hanno 'profile_name')
    {//if pagelet_group_header
        //Rimuove il logo del lucchetto
        var allIm, thisIm;
        allIm = xpath("//I[@class='mhs mhs img sp_5z7q49 sx_cd025c']");
        for (var i = 0; i < allIm.snapshotLength; i++) 
        {
            thisIm = allIm.snapshotItem(i);
            if (thisIm)
                thisIm.parentNode.removeChild(thisIm);
        }
        
        //Elimina le immagini profilo nelle pagine dei nuovi gruppi
        var allA, thisA;
        allA = xpath("//a[@class='mall_profile_pic_link UIImageBlock_Image UIImageBlock_MED_Image']");
        for (var i = 0; i < allA.snapshotLength; i++) 
        {
            thisA = allA.snapshotItem(i);
            if (thisA)
                thisA.parentNode.removeChild(thisA);
        }

        //Rimuove le immagini sotto 'Membri'
        var allDiv, thisDiv;
        allDiv = xpath("//div[@class='phs']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if ((thisDiv) && (typeof(thisDiv.childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].className == 'uiFacepile uiFacepileMedium mbm'))
                thisDiv.parentNode.removeChild(thisDiv);
        }

        //Rimuove le immagini nella schermata 'Mostra tutto' - 'Membri'
        var allImg, thisImg;
        allImg = xpath("//img[@class='uiProfilePhoto uiProfilePhotoLarge img']");
        for (var i = 0; i < allImg.snapshotLength; i++) 
        {
            thisImg = allImg.snapshotItem(i);
            if (thisImg)
                thisImg.parentNode.removeChild(thisImg);
        }

        //Elimina immagini profilo utenti aggiunti al gruppo
        allDiv = xpath("//div[@class='uiFacepile uiFacepileMedium pts']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if ((thisDiv) && (typeof(thisDiv.childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].className == 'uiList uiListHorizontal clearfix'))
                thisDiv.parentNode.removeChild(thisDiv);
        }
    
        //Elimina punti separatori nelle sezioni 'Commenta . Condividi . Mi piace . ecc'
        var allSez, thisSez;
        allSez = xpath("//div[@class='uiTextSubtitle UIActionLinks UIActionLinks_bottom groupMallFeedback']"); //-1-
        for (var i = 0; i < allSez.snapshotLength; i++) 
        {
            thisSez = allSez.snapshotItem(i);
            if (thisSez)
            {
                var nodi = thisSez.childNodes.length;
                for (var j = 0; j < nodi; j++)
                    if ((typeof(thisSez.childNodes[j]) != 'undefined') && (thisSez.childNodes[j]) && (thisSez.childNodes[j].nodeValue == " · "))
                        thisSez.childNodes[j].parentNode.removeChild(thisSez.childNodes[j]);
            }        
        }

        allSez = xpath("//div[@class='uiTextSubtitle mts mts UIActionLinks UIActionLinks_bottom groupMallFeedback']"); //-2-
        for (var i = 0; i < allSez.snapshotLength; i++) 
        {
            thisSez = allSez.snapshotItem(i);
            if (thisSez)
            {
                var nodi = thisSez.childNodes.length;
                for (var j = 0; j < nodi; j++)
                    if ((typeof(thisSez.childNodes[j]) != 'undefined') && (thisSez.childNodes[j]) && (thisSez.childNodes[j].nodeValue == " · "))
                        thisSez.childNodes[j].parentNode.removeChild(thisSez.childNodes[j]);
            }
        }

        allSez = xpath("//div[@class='uiTextSubtitle commentActions']"); //-3- //sezione sotto i commenti ai post
        for (var i = 0; i < allSez.snapshotLength; i++) 
        {
            thisSez = allSez.snapshotItem(i);
            if (thisSez)
                if ((thisSez.childNodes[1]) && (typeof(thisSez.childNodes[1]) != 'undefined') && (thisSez.childNodes[1].nodeName == "SPAN")) 
                {
                    var nodi = thisSez.childNodes[1].childNodes.length;
                    for (var j = 0; j < nodi; j++)
                        if ((typeof (thisSez.childNodes[1].childNodes[j]) != 'undefined') && (thisSez.childNodes[1].childNodes[j]) && (thisSez.childNodes[1].childNodes[j].nodeValue == " · "))
                            thisSez.childNodes[1].childNodes[j].parentNode.removeChild(thisSez.childNodes[1].childNodes[j]);
                }
        }
        
        //Aggiunge intestazioni H6 in ogni post nella bacheca del gruppo
        var allDiv, thisDiv;
        allDiv = xpath("//span[@class='prs fwb']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if ((thisDiv) && (thisDiv.childNodes[0]) && (typeof(thisDiv.childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].nodeName == "A"))
            {
                var a_sel = thisDiv.childNodes[0];
                var int_H6 = document.createElement("H6");
                int_H6.appendChild(a_sel);
                thisDiv.appendChild(int_H6);
            }
        }

        //Titolo del gruppo è div di class='fsxl fwb' (solo 1 div) - lo inserisce in un'intestazione H1
        allDiv = xpath("//div[@class='mls fsxl fwb']");
        for (var i = 0; i < allDiv.snapshotLength; i++) 
        {
            thisDiv = allDiv.snapshotItem(i);
            if ((thisDiv) && (thisDiv.childNodes[0]) && (typeof(thisDiv.childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].nodeName == "#text"))
            {
                var testo_sel = thisDiv.childNodes[0];
                var int_H1 = document.createElement("H1");
                int_H1.appendChild(testo_sel);
                thisDiv.appendChild(int_H1);
                int_H1.style.fontSize = 25 + "px";
                if ((thisDiv.childNodes[0]) && (typeof(thisDiv.childNodes[0]) != 'undefined') && (thisDiv.childNodes[0].nodeName == "SPAN"))
                    thisDiv.appendChild(thisDiv.childNodes[0]); //sposta lo SPAN sotto l'intestazione H1
            }
        }
    
        //Appende la sezione "Condividi/Share", per scrivere qualcosa nella bacheca del gruppo, sotto l'intestazione H1 (titolo del gruppo)
        var pagelet_group_composer = document.getElementById("pagelet_group_composer");
        if (pagelet_group_composer)
            pagelet_group_header.parentNode.appendChild(pagelet_group_composer);

        //Rimuove logo del gruppo
        var allImg, thisImg;
        allImg = xpath("//img[@class='uiProfilePhoto groupProfilePic uiProfilePhotoLarge img']");
        for (var i = 0; i < allImg.snapshotLength; i++) 
        {
            thisImg = allImg.snapshotItem(i);
            if ((thisImg) && (thisImg.parentNode) && (typeof(thisImg.parentNode) != 'undefined') && (thisImg.parentNode.nodeName == "A"))
                thisImg.parentNode.parentNode.removeChild(thisImg.parentNode);
        }

        //Sposta il pulsante "Modifica impostazioni" sotto l'intestazione H1
        var rfloat1 = document.getElementById("rfloat1");
        if (rfloat1)
            rfloat1.parentNode.appendChild(rfloat1);

        //Assegna un id al pulsante "Edit settings/Modifica impostazioni"
        allPul = xpath("//div[@class='groupProfileHeaderButtons rfloat']");
        for (var i = 0; i < allPul.snapshotLength; i++) 
        {
            thisPul = allPul.snapshotItem(i);
            if (thisPul)
                thisPul.id = "Pulsante" + i;
        }

        //Sposta il pulsante di "Edit settings/Modifica impostazioni" (id Pulsante0) sotto l'intestazione H1
        var Pulsante0 = document.getElementById("Pulsante0");
        if (Pulsante0)
            pagelet_group_header.parentNode.appendChild(Pulsante0);
        
    }//if pagelet_group_header
}

//Crea intestazione sopra la lista della colonna di sinistra e sopra la chat
function creaIntestazione() 
{
    //Crea una nuova intestazione H1 (la precedente era H1 -> A con un logo, non letta dallo screen reader su Mozilla)
    var pageHead = document.getElementById("pageHead"); //tutta la riga (da i tre pulsanti, al campo ricerca, al menù)
    if ((pageHead) && (!document.getElementById("FacebookHome"))) //se non è null e non è stata ancora inserita l'intestazione 'FacebookHome'
    {
        var NewDiv = document.createElement('div');
        NewDiv.id = "DivH1";
        NewDiv.className = "ptm clearfix";
        var newH1 = document.createElement('H1');
        newH1.textContent = "Facebook"; //nuova intestazione H1 (che si chiama 'Facebook')
        newH1.style.fontSize = 25 + "px"; //imposta la grandezza del carattere
        newH1.id = "FacebookHome";

        NewDiv.appendChild(newH1); //appende l'H1 nel nuovo div creato      
        pageHead.parentNode.insertBefore(NewDiv, pageHead); //lo posiziona prima di tutta l'intera riga
    }

    var pageLogo = document.getElementById("pageLogo"); //id dell'H1 
    var jewelCase = document.getElementById("jewelCase"); //div dei tre pulsanti 'messaggi -richieste - notifiche'
    if ((pageLogo) && (jewelCase)) //se non sono null (quindi se pageLogo non è stato ancora eliminato)
        if (typeof (pageLogo.childNodes[0]) != 'undefined') 
        {
            var aH1 = pageLogo.childNodes[0]; //link a Facebook Home
            aH1.appendChild(document.createTextNode("Facebook Home")); //chiama 'Facebook Home' il link (messo al posto del logo)
            jewelCase.parentNode.insertBefore(aH1, jewelCase); //inserisce l'intestazione prima dei tre pulsanti 'messaggi -richieste - notifiche'
            pageLogo.parentNode.removeChild(pageLogo); //rimuove il logo
        }

    //Sposta l'intestazione H2 'Notizie' sopra 'Notizie più polorari - Più recenti'
    var allH2, thisH2;
    allH2 = xpath("//H2[@class='uiHeaderTitle']");
    for (var i = 0; i < allH2.snapshotLength; i++) 
    {
        thisH2 = allH2.snapshotItem(i);
        if ((thisH2) && ((thisH2.textContent == "Notizie") || (thisH2.textContent == "News Feed")) && (thisH2.id != "Notizie")) 
        {
            var divDaSpostare = thisH2.parentNode.parentNode.childNodes[0]; //nel DOM: Div -> Div(divDaSpostare), Div -> H2 -> I, #text
            if ((divDaSpostare) && (typeof(thisH2.parentNode.parentNode.childNodes[0]) != 'undefined')) 
            {
                divDaSpostare.id = "popolari_recenti";
                thisH2.parentNode.parentNode.appendChild(divDaSpostare);
                thisH2.id = "Notizie"; //cambia l'id, non ripete l'operazione
            }
        }
    }

    //Cambia i testi di 'Notizie più popolari - Più recenti' in base a quale contenuti si stanno visualizzando
    var popolari_recenti = document.getElementById("popolari_recenti");
    if ((thisH2) && (typeof(thisH2) != "undefined") && (thisH2.textContent == "Notizie")) //se è in italiano (c'è solo un'H2)
        if (popolari_recenti)
        {
            if ((popolari_recenti.childNodes[1].nodeName  == "#text") && (popolari_recenti.childNodes[1].nodeValue == " · "))
                popolari_recenti.childNodes[1].parentNode.removeChild(popolari_recenti.childNodes[1]);
            if ((popolari_recenti.childNodes[0]) && (typeof(popolari_recenti.childNodes[0]) != 'undefined'))
            {
                if (popolari_recenti.childNodes[0].nodeName == "#text")
                    popolari_recenti.childNodes[0].textContent = "Stai visualizzando le notizie più popolari";
                else if ((popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0]) && (typeof(popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0]) != 'undefined') && (popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0].nodeName == "SPAN"))
                    popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent = "Stai visualizzando recenti";     
            }
        }

    if ((thisH2) && (typeof (thisH2) != "undefined") && (thisH2.textContent == "News Feed")) //se è in inglese (c'è solo un'H2)
        if (popolari_recenti) 
        {
            if ((popolari_recenti.childNodes[1].nodeName == "#text") && (popolari_recenti.childNodes[1].nodeValue == " · "))
                popolari_recenti.childNodes[1].parentNode.removeChild(popolari_recenti.childNodes[1]);
            if ((popolari_recenti.childNodes[0]) && (typeof (popolari_recenti.childNodes[0]) != 'undefined')) 
            {
                if (popolari_recenti.childNodes[0].nodeName == "#text")
                    popolari_recenti.childNodes[0].textContent = "You are in Top News";
                else if ((popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0]) && (typeof (popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0]) != 'undefined') && (popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0].nodeName == "SPAN"))
                    popolari_recenti.childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent = "You are in Most Recent";
            }
        }
        
    //Aggiunge il testo 'Campo ricerca' prima dello spazio editabile destinato alla ricerca
    var headNav = document.getElementById("headNav");
    if ((headNav) && (typeof (headNav.childNodes[0]) != 'undefined') && (headNav.childNodes[0].textContent != "Campo ricerca / Text box search: ")) 
    {
        var testo = document.createTextNode("Campo ricerca / Text box search: "); //crea nodo di testo
        var nuovoDiv = document.createElement('div');
        nuovoDiv.appendChild(testo);
        nuovoDiv.setAttribute("style", "font-size:0px");
        var nodoDopo = headNav.childNodes[0]; //indica quale deve essere il nodo dopo il nuovoDiv
        if ((nodoDopo) && (typeof(headNav.childNodes[0]) != 'undefined'))
            nodoDopo.parentNode.insertBefore(nuovoDiv, nodoDopo); //lo inserisce prima del nodoDopo
    }
}

//Crea intestazione alle liste nella Home
function intestazioneListe() 
{
    var Notizie = document.getElementById("Notizie"); //per controllare la lingua di Facebook
    var Pulsante0 = document.getElementById("Pulsante0"); //per controllare la lingua di Facebook
    var MessagingReturnLink = document.getElementById("MessagingReturnLink"); //per controllare la lingua
    
    //Intestazione per la lista
    var colonSin = document.getElementById("pagelet_navigation"); //seleziona tutta la colonna di sinstra
    if ((colonSin) && (!document.getElementById("Lista"))) //se non è stata ancora inserita l'intestazione 'Lista'
        if ((colonSin.childNodes[0]) && (typeof(colonSin.childNodes[0]) != 'undefined')) //se non è null e undefined
        {//if 
            var divInt = document.createElement("div"); //crea un elemento Div
            divInt.className = "uiHeaderTopAndBottomBorder mbm pbs uiSideHeader mbm"; //definisce la classe uguale a quella degli altri box di H4 ('Eventi', 'Richieste', ..)
            var H4Int = document.createElement('H4'); //crea un elemento H4
            H4Int.className = "uiHeaderTitle"; //definisce la classe uguale a quella delle altre intestazioni H4

            if (((Notizie) && (Notizie.textContent == "Notizie")) || ((Pulsante0) && (Pulsante0.textContent == "Modifica impostazioni")) || ((MessagingReturnLink) && (MessagingReturnLink.textContent == "Messaggi"))) //se è in italiano (si controlla anche Pulsante0 e Messagges perchè si potrebbe essere nella pagina di un gruppo nuovo o dei messaggi nuovi)
                H4Int.appendChild(document.createTextNode("Lista")); //indica il nome della sezione
            if (((Notizie) && (Notizie.textContent == "News Feed")) || ((Pulsante0) && (Pulsante0.textContent == "Edit settings")) || ((MessagingReturnLink) && (MessagingReturnLink.textContent == "Messages"))) //se è in inglese (si controlla anche Pulsante0 e Messages perchè si potrebbe essere nella pagina di un gruppo nuovo o dei messaggi nuovi)
                H4Int.appendChild(document.createTextNode("List")); //indica il nome della sezione
                
            H4Int.id = "Lista";            
            divInt.appendChild(H4Int); //crea Div -> H4

            var listaDiv = document.getElementById("sideNav"); //lista degli elementi (Div -> UL -> LI, LI, ..)
            if (listaDiv)
                listaDiv.parentNode.insertBefore(divInt, listaDiv);
        } //if

    //Stessa modifica per la chat    
    var divChat = document.getElementById("presence"); //il div presence è il nodo precedente a quello della chat (che ha id variabile), quindi per accedere al Div della chat si va dal presence al parentNode al childNodes[2]
    if ((divChat) && (!document.getElementById("Chat"))) //se non è stata inserita l'intestazione 'Chat'
        if ((divChat.parentNode.childNodes[2]) && (typeof(divChat.parentNode.childNodes[2]) != 'undefined')) //se non è null o undefined
        {//if1
            var divIntI = document.createElement("div"); //crea un elemento Div
            divIntI.className = "uiHeaderTopAndBottomBorder mbm pbs uiSideHeader mbm"; //definisce la classe uguale a quella degli altri box di H4 ('Eventi', ecc)
            var H4IntI = document.createElement('H4'); //crea un elemento H4
            H4IntI.className = "uiHeaderTitle"; //definisce la classe uguale a quella delle altre intestazioni H4
            H4IntI.appendChild(document.createTextNode("Chat")); //indica il nome della sezione
            H4IntI.id = "Chat";
            divIntI.appendChild(H4IntI); //crea Div -> H4

            divChat.parentNode.childNodes[2].appendChild(divIntI); //DOM Div Chat (id variabile) -> Div (divIntI)
            var blocco = divChat.parentNode.childNodes[2].childNodes[0]; //il primo nodo figlio della chat (viene selezionato per essere posto dopo l'intestazione)
            if ((blocco) && (typeof(blocco) != 'undefined'))
                divChat.parentNode.childNodes[2].appendChild(blocco); //seleziona primo nodo figlio della chat nel DOM
            if (typeof (divChat.parentNode.childNodes[2]) != 'undefined')
                divChat.parentNode.childNodes[2].style.height = "60px"; //modifica l'altezza del Div per riuscire a visualizzare anche l'intestazione        
        } //if1

    //Crea intestazione H4 per la chat facilitata
    var chatFriendsOnline = document.getElementById("chatFriendsOnline");
    if ((chatFriendsOnline) && (!document.getElementById("IntestAggiunta")))//se non è null chatFriendsOnline e se è null l'intestazione H4 (cioè non è stata ancora inserita quindi non si trova nel documento un elemento con id "IntestAggiunta")
    {
        var intH4 = document.createElement('H4'); //crea H4
        var DivInt = document.createElement('div'); //crea div

        if ((Notizie) && (Notizie.textContent == "Notizie")) //se è in italiano
            intH4.textContent = "Chat facilitata"; //titolo intestazione
        if ((Notizie) && (Notizie.textContent == "News Feed")) //se è in inglese
            intH4.textContent = "Simple Chat"; //titolo intestazione
                
        intH4.className = "uiHeaderTitle"; //classe delle intestazioni (grassetto)
        DivInt.className = "uiHeaderTopAndBottomBorder mbm pbs uiSideHeader mbm"; //classe dei div che contengono intestazioni (div grigio)
        DivInt.appendChild(intH4); //appende l'intestazione al div
        intH4.id = "IntestAggiunta"; //valorizza l'id dell'intestazione H4
        if (chatFriendsOnline.parentNode)
            chatFriendsOnline.parentNode.insertBefore(DivInt, chatFriendsOnline); //inserisce prima della chat sulla sinistra
    }
}

//Sistemazione pagina del profilo utente
function pageProfilo() 
{
    //Espande i post con 'Mostra tutto'
    var allSpanShow, thisSpanShow;
    allSpanShow = xpath("//span[@class='text_exposed_show']");
    for (var i = 0; i < allSpanShow.snapshotLength; i++) 
    {
        thisSpanShow = allSpanShow.snapshotItem(i);
        if (thisSpanShow)
            thisSpanShow.style.display = 'inline';
    }

    //Elimina '...' prima di 'Mostra tutto'
    var allSpanHide, thisSpanHide;
    allSpanHide = xpath("//span[@class='text_exposed_hide']");
    for (var i = 0; i < allSpanHide.snapshotLength; i++) 
    {
        thisSpanHide = allSpanHide.snapshotItem(i);
        if (thisSpanHide)
            thisSpanHide.parentNode.removeChild(thisSpanHide);
    }

    //Elimina 'Mostra tutto'
    var allMT, thisMT;
    allMT = xpath("//span[@class='text_exposed_link']");
    for (var i = 0; i < allMT.snapshotLength; i++) 
    {
        thisMT = allMT.snapshotItem(i);
        if (thisMT)
            thisMT.parentNode.removeChild(thisMT);
    }
    
    if (!document.getElementById("profile_name")) //se siamo nella nuova impaginazione
    {// if profile_name
        //Inserisce intestazione H1 nelle pagine profilo utente
        pagelet_byline = document.getElementById("pagelet_byline"); //div che contiene tutte le informazioni
        var profile_stream = document.getElementById("profile_stream"); //span 'condividi: stato - foto - ...'
        if (pagelet_byline)
        {
            var allSpan, thisSpan;
            allSpan = xpath("//span[@class='profileName ginormousProfileName fwb']"); //nome e cognome dell'utente
            for (var i = 0; i < allSpan.snapshotLength; i++) 
            {
                thisSpan = allSpan.snapshotItem(i);
                if (thisSpan)       
                {
                    var testo = thisSpan.childNodes[0]; //seleziona nome e cognome
                    var divNew = document.createElement('div');
                    var H1New = document.createElement('H1');
                    H1New.style.fontSize = 25 + "px";
                    divNew.appendChild(H1New);
                    H1New.appendChild(testo); //crea una struttura del tipo Div -> H1 -> #text (nome e cognome)
                    thisSpan.parentNode.replaceChild(divNew, thisSpan);
                }
            }
            if (profile_stream)
                pagelet_byline.parentNode.appendChild(profile_stream); //lo appende sotto le informazioni dell'utente
        }//if pagelet_byline
    
        //Elimina la barra delle foto nei profili utente
        pagelet_photo_bar = document.getElementById("pagelet_photo_bar");
        if (pagelet_photo_bar)
            pagelet_photo_bar.parentNode.removeChild(pagelet_photo_bar);
    
        //Numera la sezione dei pulsanti    
        var allDivButt, thisDivButt;
        allDivButt = xpath("//div[@class='rfloat']");
        for (var i = 0; i < allDivButt.snapshotLength; i++) 
        {
            thisDivButt = allDivButt.snapshotItem(i);
            if (thisDivButt)
                thisDivButt.id = "rfloat" + i; //associa un id
        }
    
        //'rfloat1' div dei pulsanti 'Modifica profilo' nel profilo proprio, 'Invia messaggio' - 'Manda poke' nei profili di altri utenti
        var pulsanti = document.getElementById("rfloat1");
        if ((pulsanti) && (profile_stream))
            profile_stream.parentNode.appendChild(pulsanti);
    
        //Se ci si trova nella pagina del profilo di un utente di cui non si è amici ('profile_connect' è il tasto 'Aggiungi agli amici'
        var profile_connect = document.getElementById("profile_connect");
        if (profile_connect)
            profile_connect.parentNode.appendChild(pulsanti); //si spostano i pulsanti sotto l'intestazione H1; con la if precedente non si spostavano poiche è nel profilo di un utente non amico è null 'profile_stream'
    
        //Sistemazione lista destra pagina profilo
        var allUL, thisUL;
        allUL = xpath("//UL[@class='uiList ego_unit']"); //lista a destra (sotto sezione 'Tu e AltroUtente)
        for (var i = 0; i < allUL.snapshotLength; i++) 
        {
            thisUL = allUL.snapshotItem(i);
            thisUL.id = "UL" + i;
            if (thisUL)
            {
                var childs = thisUL.childNodes.length; //numero di nodi figli della lista UL (elementi LI)
                for (var j = 0; j < childs; j++) //per ogni nodo figlio della lista controlla la classe; rimangono solo gli elementi della lista che non siano foto o immagini
                    if ((typeof(thisUL.childNodes[j]) != 'undefined') && (thisUL.childNodes[j].className != "pts inCommonSectionList uiListItem  uiListVerticalItemBorder") && (thisUL.childNodes[j].className != "inCommonSectionList uiListItem  uiListVerticalItemBorder")) //classe di 'Num foto con te', 'Num amici in comune', ecc.
                        thisUL.childNodes[j].parentNode.removeChild(thisUL.childNodes[j]);                                                                                                                                                                                     //classe ('___ è amico in comune') nelle pagine di profili utenti non amici
            }
        }
    
        //Nasconde il bottone 'Cambia immagine'      
        var allA, thisA;
        allA = xpath("//a[@class='edit_profilepicture']");
        for (var i = 0; i < allDivButt.snapshotLength; i++) 
        {
            thisA = allA.snapshotItem(i);
            if (thisA)
                thisA.style.display = 'none';
        }

        //Sposta il pulsante "Modifica il mio profilo" sotto l'intestazione H1
        var rfloat1 = document.getElementById("rfloat1");
        if (rfloat1)
            rfloat1.parentNode.appendChild(rfloat1);
        
        //Sposta la sezione "Condividi/Share" per scrivere qualcosa in bacheca, sotto l'intestazione H1
        var profile_stream_composer = document.getElementById("profile_stream_composer");
        if (profile_stream_composer)
            rfloat1.parentNode.appendChild(profile_stream_composer);           
    }//if profile_name
}

//Intestazioni nelle pagine dei profili con nuova impaginazione
function listaNuovaImpaginazione() 
{
    var rfloat1 = document.getElementById("rfloat1"); //per il controllo della lingua
    
    if (!document.getElementById("profile_name")) //se è nuova impaginazione
    {
        var sideNav = document.getElementById("sideNav"); //'pagelet_fbx_navigation' è presente nella pagina dei profili
        if ((sideNav) && (sideNav.parentNode.parentNode.id == "pagelet_fbx_navigation") && (document.getElementById("DivNew") == null)) //'DivNew'==null ovvero non è stato ancora aggiunto il nuovo Div con l'intestazione
        {
            var H4Nuova = document.createElement("H4");
            H4Nuova.className = "uiHeaderTitle";
            
            if ((rfloat1) && (rfloat1.textContent == "Edit Profile")) //se è in inglese
                H4Nuova.appendChild(document.createTextNode("List"));
            if ((rfloat1) && (rfloat1.textContent == "Modifica profilo")) //se è in italiano
                H4Nuova.appendChild(document.createTextNode("Lista"));
                
            var DivNew = document.createElement("div");
            DivNew.setAttribute('id', 'DivNew');
            DivNew.className = "uiHeaderTopAndBottomBorder mbm pbs uiSideHeader mbm"; //stessa formattazione delle altre intestazioni H4
            DivNew.appendChild(H4Nuova);
            sideNav.parentNode.insertBefore(DivNew,sideNav);
        }
        
        //Intestazione H4 per la lista nella colonna di sinistra in basso ('suggerisci' - 'rimuovi' - ecc.) 
        var pagelet_footer = document.getElementById("pagelet_footer"); //'pagelet_footer' è presente nelle pagine dei profili
        if (document.getElementById("pagelet_left_column"))
            var pagelet_left_column = document.getElementById("pagelet_left_column").childNodes[0]; //colonna di sinistra
        if ((pagelet_footer) && (pagelet_left_column) && (pagelet_left_column.childNodes.length <= 3)) //se i nodi figli della colonna di sinistra sono <=3 significa che l'intestazione non è ancora stata inserita
        {
            var H4Nuova = document.createElement("H4");
            H4Nuova.className = "uiHeaderTitle";
            H4Nuova.appendChild(document.createTextNode("Azioni"));
            var DivNew = document.createElement("div");
            DivNew.className = "uiHeaderTopAndBottomBorder mbm pbs uiSideHeader mbm"; //stessa formattazione delle altre intestazioni H4
            DivNew.appendChild(H4Nuova);
            pagelet_footer.parentNode.insertBefore(DivNew,pagelet_footer);
        }
    }//if profile_name
}

//Sistemazione delle pagine degli eventi
function pagineEventi()
{
    var event_profile_header = document.getElementById("event_profile_header");
    //Eliminazione delle liste con immagini dei partecipanti, dei forse e dei non partecipanti
    if (event_profile_header) //se siamo in una pagina di un evento ('event_profile_header' è l'intestazione dell'evento)
    {//if event_profile_header
        var allUL, thisUL;
        allUL = xpath("//UL[@class='uiList uiListHorizontal clearfix']"); //liste dei forse parteciperanno, di quelli in attesa di risposta e dei non parteciperanno
        for (var i = 0; i < allUL.snapshotLength; i++) 
        {
            thisUL = allUL.snapshotItem(i);
            if (thisUL)
                thisUL.parentNode.removeChild(thisUL);  
        }
        
        allUL = xpath("//UL[@class='uiList mts prs']"); //liste dei partecipanti
        for (var i = 0; i < allUL.snapshotLength; i++) 
        {
            thisUL = allUL.snapshotItem(i);
            if (thisUL)
                thisUL.parentNode.removeChild(thisUL);  
        }      
    }//if event_profile_header       
}

//Rimuove le immagini nella pagina info dei profili
function immaginiProfilo()
{
    if (document.getElementById("pagelet_header")) //se ci si trova nelle pagine profili
    {
        var allImg, thisImg;
        allImg = xpath("//img[@class='cropped img']");
        for (var i = 0; i < allImg.snapshotLength; i++) 
        {
            thisImg = allImg.snapshotItem(i);
            if (thisImg)
                thisImg.parentNode.parentNode.removeChild(thisImg.parentNode); //anche il div che contiene l'immagine
        }
    
        allImg = xpath("//img[@class='img']");
        for (var i = 0; i < allImg.snapshotLength; i++) 
        {
            thisImg = allImg.snapshotItem(i);
            if ((thisImg) && (thisImg.parentNode) && (thisImg.parentNode.className == "fbProfileScalableThumb photo"))
                thisImg.parentNode.parentNode.removeChild(thisImg.parentNode); //anche il div che contiene l'immagine
        }
    }//if pagelet_header
}

document.addEventListener('load', sfondo, true);
document.addEventListener('load', menuHome, true);
document.addEventListener('load', homeLista, true); //lista home nuova impaginazione
document.addEventListener('load', homeImmagini, true);
document.addEventListener('load', amiciImmagini, true);
document.addEventListener('load', applicazioniImmagini, true);
document.addEventListener('load', immConfRichiestePage, true);
document.addEventListener('load', col_h6, true);
document.addEventListener('load', sezioneCommentaCondividi, true);
document.addEventListener('load', pagineColDestra, true);
document.addEventListener('load', immMessaggi, true);
document.addEventListener('load', pagineInser, true); //pagine vecchia impostazione
document.addEventListener('load', colSinistraProfilo, true); //profili o gruppi vecchia impaginazione
document.addEventListener('load', formAperti, true);
document.addEventListener('load', immaginiALT, true);
document.addEventListener('load', nuoviGruppi, true); //gruppi nuova impostazione
document.addEventListener('load', creaIntestazione, true); //intestazione alta della Home (link 'facebook home', jewels, 'notizie popolari - recenti', 'campo ricerca')
document.addEventListener('load', pageProfilo, true); //profili
document.addEventListener('load', listaNuovaImpaginazione, true); //profili
document.addEventListener('load', pagineEventi, true);
document.addEventListener('load', immaginiProfilo, true); //profili nuova impaginazione
document.addEventListener('load', intestazioneListe, true); //crea H4 in Home ('Lista', 'Chat', 'Chat facilitata')