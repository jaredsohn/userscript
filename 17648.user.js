Source for "want to see Orkut Albuns which is locked??"

   1. // ==UserScript==
   2. // @name           Unlock Orkut Albuns
   3. // @namespace      http://greasemonkey.sitesbr.net
   4. // @description    Allows viewing photos even with padlock
   5. // @include        *.orkut.com*profile.aspx*
   6. // ==/UserScript==
   7.
   8. /*
   9. * Autor: Sergio Abreu - Brasil
  10. *
  11. * Criação: 23/12/2007
  12. * Updated: 24/12/2007 01:30h   ::  v 1.2 Bilingual - Português / Inglês
  13. *
  14. */
  15.
  16. function waitToLoad(){
  17.
  18. var db = document.body.innerHTML;
  19. var lg = db.match(/"fotos"/) ? 1 : 0;
  20.
  21. var msg = lg ? "Liberadas pelo Destrava Álbuns, by Sergio Abreu" : "Unlocked by Sergio Abreu's Unlock Album script";
  22. var placa = lg ? "Fotos =]" : "Photos =]";
  23. var voltar = lg ? "Voltar" : "Back";
  24.
  25. if( db.match(/icn_privacy_private/)) {
  26. address = location.href;
  27. var s="", fo = db.match(/http.+medium.+\.jpg/)[0];
  28. for( var i=1; i < 101; i++){
  29. s += "<img onerror='esconde(this)' src='" + fo.replace(/medium/, 'milieu/' + i) + "'>";
  30. }
  31.
  32. var magica = "document.write(\"<html><head><title>"+ msg +"<\/title>" +
  33.     "<scr"+"ipt type='text/javasc"+"ript'>function esconde(o){o.style.display='none';}</sc"+"ript><\/head>"+
  34.     "<body><center><br><br><table border=0 cellspacing=0 cellpadding=0><tr><td>"+
  35.     "<img border=0 src='http://images3.orkut.com/img/bl.gif'></td>"+
  36.     "<td valign='middle' height='20' style='background:url(http://images3.orkut.com/img/bm.gif)'><a href='" + address + "' "+
  37.     "style='height:20px; cursor:pointer;color:black;font-family:arial,verdana;font-size:12px;font-weight:normal;text-decoration:none;'>"+
  38.     voltar+"</a></td>"+
  39.     "<td><img border=0 src='http://images3.orkut.com/img/br.gif'></td></tr></table><br><br>" + s + "<br><br><table border=0 cellspacing=0 cellpadding=0><tr><td>"+
  40.     "<img border=0 src='http://images3.orkut.com/img/bl.gif'></td>"+
  41.     "<td valign='middle' height='20' style='background:url(http://images3.orkut.com/img/bm.gif)'><a href='" + address + "' "+
  42.     "style='height:20px; cursor:pointer;color:black;font-family:arial,verdana;font-size:12px;font-weight:normal;text-decoration:none;'>"+
  43.     voltar+"</a></td>"+
  44.     "<td><img border=0 src='http://images3.orkut.com/img/br.gif'></td></tr></table><\/center><\/body><\/html>\")"
  45.
  46. var bt = document.createElement('div');
  47. bt.setAttribute('style', 'width:50px;  height:auto; margin:3px; padding:3px; border:1px solid #aaaaaa; -moz-border-radius:7px; cursor:pointer; color:red; background:#ffffcc; font-size:9px;');
  48. bt.setAttribute('onclick', magica);
  49. bt.setAttribute('title', msg);
  50. bt.innerHTML = placa;
  51.
  52. var bt2 = document.createElement('div');
  53. bt2.setAttribute('class', 'lf');
  54. bt2.setAttribute('style', 'width:'+(lg?50:60)+'px; margin-top:5px; height:15px; padding:7px 10px 3px 10px; border:1px solid #aaaaaa; -moz-border-radius:7px; cursor:pointer; color:red; background:#ffffcc; font-size:10px;');
  55. bt2.setAttribute('onclick', magica);
  56. bt2.setAttribute('title', msg);
  57. bt2.innerHTML = placa;
  58.
  59. var as, at = document.links;
  60.
  61. as = new Array();
  62.
  63. for( var i=0; i < at.length; i++){
  64. if(at[i].innerHTML.match(/(f|ph)otos/) && at[i].innerHTML.match(/icn_privacy_private/)){ as[ as.length] = at[i];}
  65. if( as.length > 1) break;
  66. }
  67.
  68. as[0].parentNode.replaceChild(bt , as[0]);
  69. as[1].parentNode.replaceChild(bt2, as[1]);
  70. }
  71.
  72. }
  73.
  74. window.addEventListener('load', waitToLoad, false);
  75.
  76. /*
  77. * Now, bilingual: Pt-Br / US
  78. */