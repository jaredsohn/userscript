// ==UserScript==
// @name           InsertImageToPage
// @namespace      http://sji-app/stravovani/
// @description    Vloží obrázek z adresáře k odkazu
// @include        http://sji-app/stravovani/*
// @version        1.3
// ==/UserScript==
// Nefunguje uplne spravne, nekdy se stane ze obrazek existuje, ale vyhodnoti se ze ne - mozna to bude kesi
function ImageExist(url) {
    var img = new Image();
    img.src = url;
    return img.height != 0;
}
///////////////////////////////////////////////////////////////////////////////////
function UpravNazev(link) {
    return link.substr(0, link.lastIndexOf(','));
}
///////////////////////////////////////////////////////////////////////////////////
function AddUrlToName(nazev) {
    return 'http://dev-tester/obedy/_small_' + nazev + '.jpg';
}

function AddGoogleLink(nazev) {
    
    var imageGoogle = document.createElement('img');
    imageGoogle.src = "http://dev-tester/obedy/google.png";
    imageGoogle.height = "8";
    imageGoogle.align = "right";

    var linkSerch = document.createElement("a");
    linkSerch.href = "http://www.google.cz/search?tbm=isch&q=" + nazev;
    linkSerch.innerHTML = "";    
    linkSerch.appendChild(imageGoogle);

    //elLabel.appendChild(document.createElement('div'));
    
    elLabel.appendChild(linkSerch);    
}


///////////////////////////////////////////////////////////////////////////////////
function addImage() {
    
    //var elmNewdiv = document.createElement("div");    
    //elmNewdiv.setAttribute('style', 'text-align: center;');        
    //elmNewdiv.appendChild(elmNewLink);
    // obrázek
    var elmNewImage = document.createElement('img');
    elmNewImage.src = link;
    //elmNewImage. = "100";
    elmNewImage.align = "right";

    var elmNewLink = document.createElement('a');
    elmNewLink.href = link.replace('_small_', '');
    elmNewLink.target = '_blank';
    elmNewLink.appendChild(elmNewImage);
    if (elLabel != null) {
        elLabel.parentNode.insertBefore(elmNewLink, elLabel);
    }    
}

///////////////////////////////////////////////////////////////////////////////////
// projde všechny zadané elementy 
var listImput, elLabel;
listImput = document.evaluate(
    "//label[contains(@for,'DruhyJidel_')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < listImput.snapshotLength; i++) {
    elLabel = listImput.snapshotItem(i);
    var listStrong = elLabel.getElementsByTagName('strong');
    var nazevJidla = listStrong[0].firstChild.nodeValue;
    var link = AddUrlToName(nazevJidla)

    var imageExist = ImageExist(link);
    GM_log(link + ' Status: ' + imageExist.toString());

    AddGoogleLink(nazevJidla);

    addImage();

    if (!imageExist) {        
        // Pokud obrázek neexistuje, uprav název - odstraní text za čárkou
        nazevJidla = UpravNazev(nazevJidla);
        link = AddUrlToName(nazevJidla);
        if (nazevJidla != '') {
            
                addImage();
            }
                       

        if (!imageExist) {                    
            nazevJidla = UpravNazev(nazevJidla);
            link = AddUrlToName(nazevJidla);
            if (nazevJidla != '') {
                addImage();
            }                     
        }        
    }

}
// Link greasemonkey:
// http://ondrej.jikos.cz/vyuka/swi117/2008/greasemonkey.html
// http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started
// http://www.tvorba-webu.cz/dom/getelementsbytagname.php
// http://wiki.greasespot.net/API_reference


