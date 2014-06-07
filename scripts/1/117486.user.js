// ==UserScript==
// @name           eksi sozluk arama tusu ozellestirici
// @description    eksi sozluk arama tusu ozellestirici
// @version        1.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// @include        https://antik.eksisozluk.com/*
// ==/UserScript==

function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.innerHTML = "function ara2(){if (top.sozindex) top.sozindex.location.href = 'index.asp?a=sr&so=y&kw=' + G('t').value; }";
 
  if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
  
var butonlar = xpath(".//table[@class='nav']/tbody/tr/td/a[@title='ara bul']");
if(butonlar.snapshotLength > 0) {
	var aramabut = butonlar.snapshotItem(0);
	aramabut.href = "javascript:ara2();";
	}

	

