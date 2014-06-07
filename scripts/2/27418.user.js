// ==UserScript==
// @name           Detikinet - Toggle Left Sidebar
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://www.detikinet.com/*/idkanal/*
// @include        http://detikinet.com/*/idkanal/*
// @include        http://www.detiksport.com/*/idkanal/*
// @include        http://detiksport.com/*/idkanal/*
// @description    Serong kiri, serong kanan
// ==/UserScript==

var berita, petunjuk, petunjukS, petunjukI, link, linkS;

berita = document.getElementById("isiberita");
if (!berita) return;

var serongKiri = GM_getValue("serongKiri", false);
if (serongKiri) {
  var kiri = document.getElementById("kiriisi");
  var kanan = document.getElementById("kananisi");
  kiri.style.display = "none";
  kanan.style.width = "871px";
  kanan.style.cssFloat = "right";
}

petunjuk = document.evaluate("./div[@class='petunjuk']",
                              berita, null, 9, null).singleNodeValue;

berita.appendChild(petunjuk.cloneNode(true));
berita.lastChild.style.marginTop = "20px";
berita.style.paddingBottom = "0";

petunjukS = document.evaluate("./div[@class='petunjuk']",
                              berita, null, 6, null)

for (var i = 0; i < petunjukS.snapshotLength; i++) {
  petunjukI = petunjukS.snapshotItem(i);
  link = petunjukI.insertBefore(document.createElement("a"),
                                petunjukI.firstChild);
  link.href = "#";
  link.title = serongKiri ? "Tampilkan menu kiri": "Sembunyikan menu kiri";
  link.textContent = serongKiri ? "\u003e\u003e\u003e": "\u003c\u003c\u003c";
  link.style.cssFloat = "left";
  link.addEventListener("click", function(e) {
    e.preventDefault();
    var kiri = document.getElementById("kiriisi");
    var kanan = document.getElementById("kananisi");
    var linkS = document.evaluate(".//div[@class='petunjuk']/a[@href='#']",
                                  kanan, null, 6, null);

    if (kiri.style.display == "none") {
      kiri.removeAttribute("style");
      kanan.removeAttribute("style");
      for (var i = 0; i < linkS.snapshotLength; i++) {
        linkS.snapshotItem(i).textContent = "\u003c\u003c\u003c";
        linkS.snapshotItem(i).title = "Sembunyikan menu kiri";
      }
      GM_setValue("serongKiri", false);
    } else {
      kiri.style.display = "none";
      kanan.style.width = "871px";
      kanan.style.cssFloat = "right";
      for (var i = 0; i < linkS.snapshotLength; i++) {
        linkS.snapshotItem(i).textContent = "\u003e\u003e\u003e";
        linkS.snapshotItem(i).title = "Tampilkan menu kiri";
      }
      GM_setValue("serongKiri", true);
    }
  }, false);
}