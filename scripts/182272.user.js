// ==UserScript==
// @name        WKW Forum
// @namespace   WKW Forum
// @description Fügt neue nützliche Links ein (Sprungmarken)
// @include     http://www.wer-kennt-wen.de*
// @updateURL   http://userscripts.org/scripts/review/182272
// @require     http://userscripts.org/scripts/source/183527.user.js 
// @version     2013.18.11.3
// @grant       none
// ==/UserScript==

var url = document.URL;

document.getElementById("notification-conversations").addEventListener("click",warte,false);


function warte(){
    setTimeout(function(){watchload();}, 100);
}

function watchload(){
    var A = document.getElementsByTagName("a");
    var swirl=$x('/html/body/div[2]/header/div[2]/ul/li/div/ul/li/img', XPathResult.FIRST_ORDERED_NODE_TYPE);

    if (swirl) {warte()};
    for (var x = 0; x < A.length; x++) {
        thisA = A[x];
        if ( thisA.href == "http://www.wer-kennt-wen.de/club/my/index/list/unread" ) {
            thisA.href = "http://www.wer-kennt-wen.de/clubs/myClubs/list/unread";
        } 
    }
}

if ( url.indexOf("forum") >-1 ) {

    var paginator = document.getElementsByClassName("paginator");
    var clubURL = document.getElementById("profileImageHuge").href;
    
    var wkwTinyScrollbar = document.getElementById("profileImageHuge");
    var anker = document.createElement("a");
    anker.name = "anfang";
    wkwTinyScrollbar.parentNode.insertBefore(anker, wkwTinyScrollbar.nextSibling);
    
    
    
    var span = document.createElement('span');
    span.setAttribute('style','display: block; center; margin: 1rem 0rem 0rem;');
    
    var linkOben = document.createElement('a');
    linkOben.setAttribute('href' , '#anfang');
    linkOben.setAttribute('style','float: right;');
    linkOben.appendChild(document.createTextNode('Nach oben'));
    
    var forum = document.createElement('a');
    forum.setAttribute('href' , clubURL);
    forum.setAttribute('style','float: left;');
    forum.appendChild(document.createTextNode('Forenübersicht'));
    
    var br = document.createElement('br');
    
    paginator[0].insertBefore(span, paginator[0].lastChild);
    span.parentNode.insertBefore(br, span.nextSibling);
    span.parentNode.insertBefore(linkOben, span.nextSibling);
    span.parentNode.insertBefore(forum, span.nextSibling);
    
    ///////////////////////////////////////////////////////////////
    
    var url = document.URL;
    var maxAnz = document.getElementsByClassName("m-s");
    var vorClass = "button next-page is-inactive";
    var vorHref = "javascript://";
    var zurueckClass = "button prev-page is-inactive";
    var zurueckHref = "javascript://";
    var titelZ = "";
    var titelV = "";
    
    if (maxAnz){
        var jumpURL = "http://www.wer-kennt-wen.de/forum/showThread/"+url.substring(45,57)+"/page/";
        var maxAnz = parseInt(maxAnz[1].lastChild.data);
        var aktSeiteV = parseInt(url.substr(url.lastIndexOf("/")+1));
        var aktSeiteZ = parseInt(url.substr(url.lastIndexOf("/")+1));
        if(url.substr(url.lastIndexOf("/")+1)==url.substring(45,57)){aktSeiteV=1;aktSeiteZ=1}
        if(url.substr(url.lastIndexOf("/")+1)==""){aktSeiteV=1;aktSeiteZ=1}
        if(url.substr(url.lastIndexOf("/")+1)=="last"){aktSeiteV=maxAnz;aktSeiteZ=maxAnz}
        var testVor = maxAnz-aktSeiteV;
        var testZurueck = aktSeiteZ-=5;
    }
    
    if ( testVor >= 5 ){
        var vorClass = "button next-page";
        var vorSite = aktSeiteV+=5;
        var vorHref = jumpURL+''+vorSite;
        var titelV = "Vor zur Seite "+vorSite;
    }
    
    if ( testZurueck >= 0 ){
        var zurueckClass = "button prev-page";
        var zurueckSite = aktSeiteZ;
        var zurueckHref = jumpURL+''+zurueckSite;
        var titelZ = "Zurück zur Seite "+zurueckSite;
    }
    
    
    var vorBTN = document.getElementsByClassName("button next-page");
    var vor = document.createElement('a');
    var vor2 = document.createElement('a');
    vor.innerHTML = '<a style="margin-left: 0.5rem;" aria-label="5 Seiten vor" title="'+titelV+'" href="'+vorHref+'" class="'+vorClass+'"><i class="ui-icon-wkw-arrow-right" aria-hidden="true"></i>5<i class="ui-icon-wkw-arrow-right" aria-hidden="true"></i></a>';
    vor2.innerHTML = '<a style="margin-left: 0.5rem;font-size: 1.3rem;" aria-label="5 Seiten vor" title="'+titelV+'" href="'+vorHref+'" class="'+vorClass+'"><i class="ui-icon-wkw-arrow-right" aria-hidden="true"></i>5<i class="ui-icon-wkw-arrow-right" aria-hidden="true"></i></a>';
    vorBTN[0].parentNode.insertBefore(vor, vorBTN[0].nextSibling);
    vorBTN[2].parentNode.insertBefore(vor2, vorBTN[2].nextSibling);
    
    var zurueckBTN = document.getElementsByClassName("button prev-page");
    var zurueck = document.createElement('a');
    var zurueck2 = document.createElement('a');
    zurueck.innerHTML = '<a style="margin-right: 0.5rem;" aria-label="5 Seiten zurück" title="'+titelZ+'" href="'+zurueckHref+'" class="'+zurueckClass+'"><i aria-hidden="true" class="ui-icon-wkw-arrow-left"></i>5<i class="ui-icon-wkw-arrow-left" aria-hidden="true"></i></a>';
    zurueck2.innerHTML = '<a style="margin-right: 0.5rem;font-size: 1.3rem;" aria-label="5 Seiten zurück" title="'+titelZ+'" href="'+zurueckHref+'" class="'+zurueckClass+'"><i aria-hidden="true" class="ui-icon-wkw-arrow-left"></i>5<i class="ui-icon-wkw-arrow-left" aria-hidden="true"></i></a>';
    zurueckBTN[0].parentNode.insertBefore(zurueck, zurueckBTN[0]);
    zurueckBTN[2].parentNode.insertBefore(zurueck2, zurueckBTN[2]);

}






