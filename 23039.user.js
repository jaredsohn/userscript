// ==UserScript==
// @name           CurataGS
// @namespace      curatags
// @description    Inlatura site-urile care fac SEO SPAM din lista Google cu rezultatele cautarii 
// @include        http://www.google.ro/search*
// @include        http://www.google.com/search*
// ==/UserScript==

//
//  Poti controla singur ce site-uri sunt excluse. De asemenea, poti adauga site-uri noi.
//
//  Daca nu esti familiarizat cu JavaScript, inainte de a introduce un site nou, 
//  observa cum sunt scrise site-urile de mai jos.
//
//  Domeniul site-ului (nume.extensie) se introduce intre ghilimele ("). 
//  Nu uita sa adaugi virgula (,) 
//
//  Ulitima inregistrare nu trebuie sa aiba virgula (,) 
//

var SpamSites = Array(
      //Site-uri recunoscute ca facand SEO SPAM (adaugati // in fata pentru a dezactiva stergerea)
      "anunturipenet.ro",
      "bloglog.ro",
      "cauti.ro",
      "clubafaceri.ro",
      "directorfirme.ro",
      "event365.ro",
      "ghidafaceri.ro",
      "hopa.ro",
      "infoportal.ro",
      "lemmefind.ro",
      "linkweb.ro",
      "pescurt.ro",
      "rss.astazi.ro",
      "seo-portal.ro",
      "stiri.romstiri.com",
      "topbiz.ro",
      "traficdublu.ro",
      "xtravagant.exif.ro", 
      "bizoo.ro",
      "ghidafaceri.ro",
      "laromani.com",
      "kaboo.ro",
      "topsiteuri.ro",
      "execom.ro",
      

      // Site-uri care pot uneori sa incomodeze (inlaturati // pentru a activa stergerea)
      //"price.ro",
      //"shopmania.ro",
      //"buyfast.ro",
      //"smartbuy.ro",
      //"compari.ro",
      //"micapublicitate.net",
      //"romaniamall.ro",
      //"computersales.ro",
      //"ghidul.ro",
      
      

      // Site-uri straine care fac SEO SPAM (adaugati // in fata pentru a dezactiva stergerea)
      "ciao.co.uk",
      "bizrate.com",
      "shopbot.com.au",
      "pricerunner.co.uk",
      "pricespy.co.nz",
      "kelkoo.co.uk",
      "myshopping.com.au",
      "idealo.co.uk",
      "saveabuck.com.au" //ultima inregistrare nu trebuie sa aiba virgula la sfarsit (,)
);
      

//
//  De aici incolo nu mai modifica nimic
//
conditie = "//a[";
for (j in SpamSites)
{
      conditie = conditie + "contains(@href,'"+SpamSites[j]+"') or ";
}
conditie = conditie + "1=0]/ancestor::div[@class='g']";
var snapFilter = document.evaluate(conditie, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//alert ("Am prins " +snapFilter.snapshotLength+" linkuri");
for (var i = snapFilter.snapshotLength - 1; i >= 0; i--) {
      var elmFilter = snapFilter.snapshotItem(i);
      elmFilter.parentNode.removeChild(elmFilter);
}
