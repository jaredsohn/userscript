// ==UserScript==
// @name           just4tgm
// @namespace      lishi & bellaLI!
// @description    improve tgmol forum reading
// @include        http://forum.tgmonline.it/*
// @include        http://forumtgmonline.futuregamer.it/*
// ==/UserScript==



var sLocation = window.location.href.toString();

var sMarkAsRemovable = 'rgb(255, 0, 0)';
var sMarkAsResizable = 'rgb(0, 255, 255)';


//recupera il riferimento ad un oggetto, interrogando il DOM secondo la query specificata
function getFirstXPath(sQuery) {
    var objs = document.evaluate(sQuery, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return objs.snapshotItem(0);
    }

//rimuove (nasconde) l'oggetto specificato
function objectRemove(oObj) {
    if (oObj) {
        oObj.style.backgroundColor=sMarkAsRemovable;
        oObj.style.display='none';
        }
    //else alert('oggetto da rimuovere non trovato');
    }

//stringe e/o centra l'oggetto specificato
function objectResize(oObj) {
    if (oObj) {
        //oObj.style.backgroundColor=sMarkAsResizable;
        oObj.style.width=sDesiredWidth;
        oObj.style.margin='0 auto 0 auto';
        }
    //else alert('oggetto da ridimensionare non trovato');
    }



//prima di fare qualsiasi cosa recupero i puntamenti ai singoli oggetti altrimenti la query ritorna 
//risultati non prevedibili (a seconda che abbia già tolto questo o quell'altro)

var oHeader     = getFirstXPath("/html/body/div[1]");                                       //header pagina
var oDestra     = getFirstXPath("/html/body/table/tbody/tr/td[2]");                         //banner a destra degli elenchi sezione/topic
var oPanel      = getFirstXPath("/html/body/table[1]");                                     //controlli forum
var oPosts      = document.getElementById("posts");                                         //lista post forum
var oSponsors   = getFirstXPath("/html/body/div[2]/table/tbody/tr/td/div/div/div/div[2]");  //sponsored links
var oRules      = getFirstXPath("/html/body/table[2]");                                     //sezione regole, quick-reply e jump-menu
var oRules2     = getFirstXPath("/html/body/table[3]");                                     //sezione regole nella modalità di reply avanzata
var oDisclaimer = getFirstXPath("/html/body/form[1]");                                      //sezione disclaimer vbulletin
var oKelkoo     = document.getElementById("kk-widget");                                     //annunci a fondo pagina
var oSprea      = document.getElementById("footer");                                        //logo sprea

var oSinglePost = getFirstXPath("/html/body/form[1]");                                      //header pagina



//ROBA DA TOGLIERE /////////////////////////////////////////////////////////////////////////////////
if (sLocation.indexOf('showpost.php')==-1 && sLocation.indexOf('getsmilies')==-1) {
    objectRemove(oHeader);
    objectRemove(oDestra);
    objectRemove(oSponsors);
    objectRemove(oKelkoo);
    objectRemove(oSprea);
    objectRemove(oDisclaimer);
    }


//ROBA DA STRINGERE E/O CENTRARE ///////////////////////////////////////////////////////////////////
if (sLocation.indexOf('showpost.php')==-1 && sLocation.indexOf('getsmilies')==-1) {
    objectResize(oPanel);
    objectResize(oPosts);
    objectResize(oRules);
    objectResize(oRules2);
    }
else objectResize(oSinglePost);