// ==UserScript==
// @name           duyuru troll destroyer
// @description    engelli kullanicinin duyurularini gizler
// @version        0.1
// @author         wide (ntpl ve ocanal'a teşekkürler)
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://www.eksiduyuru.com/*
// ==/UserScript==

    function Duyuru() {
      var Ayarlar = {
     //engellenecek kullanıcılar virgülle ayırılmalı
        engelliListesi : ["ssg,kanzuk"],
    };

      // XPath wrapper
    function xpath(xpath, element) {
          if (!element)
              element = document;
          return document.evaluate(xpath, element, null,
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    //butun dokuman icinde ara
    var div_el = xpath("//div[@class='entry0']"); 
    
    for (var i = 0; i < div_el.snapshotLength; i++) {
        var a_el = xpath(".//ul/li[1]/a[1]", div_el.snapshotItem(i)); //div_el ve altinda ara
        var kullanici = a_el.snapshotItem(0).innerHTML;
		
		if (EngelliMi(kullanici)) {
			  div_el.snapshotItem(i).style.display = 'none';  
		} 
    }
      
    function EngelliMi(kullanici) {
          for (var i = 0; i < Ayarlar.engelliListesi.length; i++) {
              if (Ayarlar.engelliListesi[i].toLowerCase() == kullanici.toLowerCase())
                  return true; 
          }
          return false; 
      }
   }
	
   Duyuru();