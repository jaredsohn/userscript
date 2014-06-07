   1. // Orkut - Miniatura de fotos trancadas
   2. // version 0.1.2 BETA
   3. // 2008-01-04
   4. // Copyright (c) 2007, Leandro Koiti Sato
   5. // Released under the GPL license
   6. // http://www.gnu.org/copyleft/gpl.html
   7. //
   8. // --------------------------------------------------------------------
   9. //
  10. // ==UserScript==
  11. // @name           View Locked Album in Orkut Style
  12. // @include        http://www.orkut.com/*
  13. // ==/UserScript==
  14.
  15. /* www.orkut.com --------------------------------------------------------------------
  16.     Changelog
  17.     --------------------------------------------------------------------
  18.
  19. 0.1.2 - 2008-01-04
  20. -------------------
  21.   alterado para funcionar corretamente com as mudanças de nomenclatura e
  22.   estrutura do álbum do orkut.
  23.   agora exibe fotos tanto no Album.aspx quanto no AlbumList.aspx
  24.  
  25. 0.1.1 - 2007-12-05
  26. -------------------
  27.   bugfix: quando a pessoa definia scrapbook privado, o script nao funcionava
  28.
  29.   adicionado a variavel "giveUp" para definir quantos erros de carregamento
  30.   consecutivos devem ocorrer para o script desistir de procurar mais fotos.
  31.
  32. 0.1  - 2007-11-25
  33. ------------------
  34.   versao inicial
  35.
  36.     --------------------------------------------------------------------
  37. */
  38.
  39.
  40.
  41. // --------------------------------------------------------------------
  42. // Configuracoes
  43. // --------------------------------------------------------------------
  44. var giveUp = 5; //numero de erros consecutivos para desistir de procurar mais fotos,
  45.                 //padrao = 5;
  46.
  47. // --------------------------------------------------------------------
  48.
  49.
  50.
  51. function getUID () {
  52.   url = document.location.href;
  53.   re = /\.aspx\?uid=\d+/
  54.   var result = null;
  55.   try {
  56.     result = url.match(re);
  57.     result = result[0].substring(10);
  58.   } catch (e) {}
  59.   return(result);
  60. }
  61.
  62. function getPhotoId (foto_link){
  63.     x = foto_link.split("/");
  64.     return(x[x.length-1]);
  65. }
  66.
  67. function notAlbum() {
  68.
  69.     ub = document.evaluate("//a[contains(@class,'userbutton')]", document, null, 7,null);
  70.     for (i=0;i<ub.snapshotLength;i++) {
  71.         a = ub.snapshotItem(i).title;
  72.         if (ub.snapshotItem(i).href == "javascript:void(0)" && a == "fotos" || a == "photos") {
  73.             ub.snapshotItem(i).href = "http://www.orkut.com/AlbumList.aspx?uid=" + getUID();
  74.             ub.snapshotItem(i).removeAttribute("onclick");
  75.         }
  76.     }
  77.
  78.     ht = document.evaluate("//a[contains(@class,'ht')]", document, null, 7,null);
  79.     for (i=0;i<ht.snapshotLength;i++) {
  80.         if (ht.snapshotItem(i).href.indexOf("#") > -1) {
  81.             html = ht.snapshotItem(i).innerHTML;
  82.             if (html.indexOf("fotos") > -1 || html.indexOf("photos") > -1) {
  83.                 ht.snapshotItem(i).href = "http://www.orkut.com/AlbumList.aspx?uid=" + getUID();
  84.                 ht.snapshotItem(i).removeAttribute("onclick");
  85.             }
  86.             break;
  87.         }
  88.     }
  89. }
  90.
  91. function display(foto_link) {
  92.     footer = document.getElementById("footer");
  93.
  94.     img = new Image();
  95.     i=1;
  96.     errors = 0; //consecutive load errors
  97.     nLoaded = 0; //number of loaded pictures
  98.     img.addEventListener('load', function () {
  99.         errors = 0;
 100.         nLoaded++;
 101.         if ((nLoaded %3) - 1 == 0) {
 102.         div = document.createElement("div");
 103.         div.className = "listlight";
 104.         footer.parentNode.insertBefore(div, footer);
 105.         }
 106.
 107.         dv = document.createElement("div");
 108.         dv.className = "tripler ac oh";
 109.         dv.style.width = "32%";
 110.
 111.         im = document.createElement("img");
 112.         im.src = this.src;
 113.         im.className = "photothumb";
 114.         p = document.createElement("p");
 115.         p.className = "para nobot";
 116.         div.appendChild(dv);
 117.         dv.appendChild(im);
 118.         dv.appendChild(p);
 119.         ++i;
 120.         this.src = "http://img3.orkut.com/images/milieu/" + i + "/0/" + getPhotoId(foto_link);
 121.     }
 122.     , false);
 123.
 124.     img.addEventListener('error', function () {
 125.         errors++;
 126.         if (errors >= giveUp)
 127.             return;
 128.         if (i<=100) {
 129.             i++;
 130.             this.src = "http://img3.orkut.com/images/milieu/" + i + "/0/" + getPhotoId(foto_link);
 131.         }
 132.     }
 133.     , false);
 134.
 135.     img.src = "http://img3.orkut.com/images/milieu/" + i + "/0/" + getPhotoId(foto_link);
 136.
 137. }
 138.
 139.
 140. //window.addEventListener('load', function(event) {
 141. setTimeout(function() {
 142.     address = document.location.href.toLowerCase();
 143.     lbox = document.getElementById("lbox");
 144.
 145.     if (address.indexOf("album.aspx") == -1 && address.indexOf("albumlist.aspx") == -1)
 146.         notAlbum();
 147.     else
 148.     if (lbox == null) {
 149.         GM_xmlhttpRequest({
 150.                         method: 'GET',
 151.                         url: 'http://www.orkut.com/FriendsList.aspx?uid=' + getUID(),
 152.                         onreadystatechange: function(responseDetails) {
 153.                             if (responseDetails.readyState == 4) {
 154.                                 foto = new String(responseDetails.responseText.match(/https?:\/\/img\d+\.orkut\.com\/images\/medium\/.+\.jpg/gim));
 155.                                 display(foto);
 156.
 157.                             }
 158.                         }
 159.                     });
 160.     }
 161.
 162.
 163. //}, false);
 164. },300);